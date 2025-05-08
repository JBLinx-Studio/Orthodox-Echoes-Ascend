
import { useState, useEffect } from 'react';

type ScrollPosition = {
  scrollY: number;
  scrollX: number;
  direction: 'up' | 'down' | 'none';
  isScrolled: boolean;
  scrollPercentage: number;
};

export function useScrollPosition(threshold: number = 10): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    scrollX: 0,
    direction: 'none',
    isScrolled: false,
    scrollPercentage: 0,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const updateScrollPosition = () => {
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      const direction = scrollY > lastScrollY ? 'down' : 
                         scrollY < lastScrollY ? 'up' : 'none';
      const isScrolled = scrollY > threshold;
      
      // Calculate scroll percentage
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = documentHeight > 0 
        ? Math.round((scrollY / documentHeight) * 100) 
        : 0;
      
      setScrollPosition({
        scrollY,
        scrollX,
        direction,
        isScrolled,
        scrollPercentage,
      });
      
      lastScrollY = scrollY;
    };
    
    // Initial update
    updateScrollPosition();
    
    window.addEventListener('scroll', updateScrollPosition);
    
    return () => {
      window.removeEventListener('scroll', updateScrollPosition);
    };
  }, [threshold]);
  
  return scrollPosition;
}
