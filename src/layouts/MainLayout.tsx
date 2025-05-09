
import { Outlet } from 'react-router-dom';
import { NavBar } from '@/components/core/NavBar';
import { Footer } from '@/components/Footer';
import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedBackground } from '@/components/ui/animated-background';

export function MainLayout() {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const location = useLocation();
  const mainContentRef = useRef<HTMLDivElement>(null);
  
  // Reset loading state on route change
  useEffect(() => {
    setIsPageLoading(true);
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Function to handle skip to content link
  const handleSkipToContent = () => {
    if (mainContentRef.current) {
      mainContentRef.current.focus();
      mainContentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#0a0d16] to-[#161a26]">
      {/* Accessibility: Skip to content link */}
      <a href="#main-content" onClick={handleSkipToContent} className="skip-link">
        Skip to content
      </a>
      
      {/* Enhanced animated background with particle effects and soft candle glow */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/noise-pattern.png')] opacity-5"></div>
        <AnimatedBackground />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d16] via-transparent to-transparent"></div>
        
        {/* Enhanced candle glow effects with more dynamics */}
        <div className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full bg-gold/5 blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-1/3 w-48 h-48 rounded-full bg-byzantine/5 blur-3xl animate-pulse" style={{animationDelay: "1.5s"}}></div>
        <div className="absolute top-1/3 left-1/2 w-36 h-36 rounded-full bg-gold/8 blur-3xl animate-pulse" style={{animationDelay: "0.7s"}}></div>
        
        {/* New floating light particles */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-gold/40 animate-ping" style={{animationDuration: "4s"}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-gold/60 animate-ping" style={{animationDuration: "3s"}}></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 rounded-full bg-byzantine/30 animate-ping" style={{animationDuration: "5s"}}></div>
        
        {/* Cathedral light rays */}
        <div className="absolute top-0 left-1/3 w-20 h-screen bg-gold/3 -rotate-6 animate-pulse" style={{animationDuration: "12s"}}></div>
        <div className="absolute top-0 right-1/4 w-32 h-screen bg-gold/2 rotate-12 animate-pulse" style={{animationDuration: "15s"}}></div>
      </div>
      
      <NavBar />
      
      <AnimatePresence mode="wait">
        {isPageLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-40 bg-[#0c111f]/90 backdrop-blur-md"
          >
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full bg-byzantine/30 animate-ping"></div>
                <div className="relative flex items-center justify-center w-16 h-16">
                  <span className="absolute inset-0 rounded-full bg-gradient-to-br from-byzantine to-byzantine-dark opacity-80"></span>
                  <span className="relative text-white font-display font-bold text-3xl">Ω</span>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{animationDelay: "0s"}}></div>
                <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
                <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{animationDelay: "0.4s"}}></div>
              </div>
              <p className="mt-4 text-white/70 text-sm">Loading your spiritual journey...</p>
            </div>
          </motion.div>
        ) : (
          <motion.main 
            id="main-content"
            ref={mainContentRef}
            tabIndex={-1}
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex-1 pt-16 relative z-10 focus:outline-none"
          >
            <Outlet />
            
            {/* Back to top button - appears when scrolled down */}
            <BackToTopButton />
          </motion.main>
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
}

// Back to top button component
function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-byzantine/70 text-white flex items-center justify-center shadow-lg backdrop-blur-sm button-press z-40 hover:bg-byzantine focus-indicator"
          aria-label="Back to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
