
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCandleProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function AnimatedCandle({ size = 'md', className = '' }: AnimatedCandleProps) {
  const [candlePosition, setCandlePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) - 0.5;
      const y = ((e.clientY - rect.top) / rect.height) - 0.5;
      
      setCandlePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Size variants
  const candleSizes = {
    sm: { height: 'h-10', width: 'w-2', flameSize: 'w-6 h-8' },
    md: { height: 'h-16', width: 'w-3', flameSize: 'w-8 h-12' },
    lg: { height: 'h-24', width: 'w-4', flameSize: 'w-10 h-16' }
  };
  
  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        {/* Candle base */}
        <div className={`${candleSizes[size].width} ${candleSizes[size].height} bg-gradient-to-b from-[#E6D2A4] to-[#D1B982] rounded-lg mx-auto`}></div>
        
        {/* Candle wick */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[2px] h-2 bg-[#333] rounded-full"></div>
        
        {/* Interactive flame */}
        <motion.div 
          className={`candle-flame absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-[90%]`}
          style={{ 
            transform: `translate(-50%, -100%) rotate(${candlePosition.x * 5}deg) skew(${candlePosition.x * 5}deg, ${candlePosition.y * 5}deg)`
          }}
        ></motion.div>
        
        {/* Glow effect */}
        <div className="candle-glow absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px]"></div>
      </div>
    </div>
  );
}
