import { Outlet } from 'react-router-dom';
import { NavBar } from '@/components/core/NavBar';
import { Footer } from '@/components/Footer';
import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { MouseLightOverlay } from "@/components/ui/MouseLightOverlay";

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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#070a12] to-[#11131c]">
      {/* 1. Mouse Light system (darkening + golden highlight overlays) */}
      <MouseLightOverlay />
      
      {/* Accessibility: Skip to content link */}
      <a href="#main-content" onClick={handleSkipToContent} className="skip-link">
        Skip to content
      </a>
      
      {/* Enhanced cathedral background - Fixed z-index */}
      <div className="fixed inset-0 z-0">
        {/* Base texture */}
        <div className="absolute inset-0 bg-[url('/images/noise-pattern.png')] opacity-5"></div>
        
        {/* Animated particles and patterns */}
        <AnimatedBackground intensity="medium" theme="gold" />
        
        {/* Cathedral vignette effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070a12] via-transparent to-transparent"></div>
        <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.93)]"></div>
        
        {/* Enhanced candle glow effects with more dynamics */}
        <div className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full bg-gold/5 blur-3xl animate-[pulse_4s_ease-in-out_infinite]"></div>
        <div className="absolute top-40 right-1/3 w-48 h-48 rounded-full bg-byzantine/5 blur-3xl animate-[pulse_5s_ease-in-out_infinite]" style={{animationDelay: "1.5s"}}></div>
        <div className="absolute top-1/3 left-1/2 w-36 h-36 rounded-full bg-gold/8 blur-3xl animate-[pulse_6s_ease-in-out_infinite]" style={{animationDelay: "0.7s"}}></div>
        
        {/* Candle flickering effects */}
        <div className="absolute bottom-40 right-1/3 w-3 h-3 bg-gold/70 rounded-full animate-[candle-flicker_4s_ease-in-out_infinite]"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-gold/60 rounded-full animate-[candle-flicker_3s_ease-in-out_infinite]" style={{animationDelay: "0.5s"}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-gold/60 rounded-full animate-[candle-flicker_5s_ease-in-out_infinite]" style={{animationDelay: "1.2s"}}></div>
        
        {/* Cathedral light rays */}
        <div className="absolute top-0 left-1/3 w-20 h-screen bg-gold/3 -rotate-6 animate-[pulse_12s_ease-in-out_infinite]"></div>
        <div className="absolute top-0 right-1/4 w-32 h-screen bg-gold/2 rotate-12 animate-[pulse_15s_ease-in-out_infinite]"></div>
        <div className="absolute top-0 left-2/3 w-24 h-screen bg-gold/3 -rotate-3 animate-[pulse_10s_ease-in-out_infinite]" style={{animationDelay: "2s"}}></div>
        
        {/* Icon glow effects */}
        <div className="absolute top-60 left-20 w-20 h-20 rounded-full bg-byzantine/10 blur-xl animate-[pulse_7s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-80 right-40 w-24 h-24 rounded-full bg-byzantine/10 blur-xl animate-[pulse_9s_ease-in-out_infinite]"></div>
      </div>
      
      {/* NavBar with proper z-index */}
      <div className="relative z-50">
        <NavBar />
      </div>
      
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
              {/* Enhanced Orthodox loading symbol */}
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full bg-byzantine/30 animate-ping"></div>
                <div className="relative flex items-center justify-center w-16 h-16">
                  <span className="absolute inset-0 rounded-full bg-gradient-to-br from-byzantine to-byzantine-dark opacity-80"></span>
                  <span className="relative text-white font-display font-bold text-3xl">☦</span>
                </div>
                {/* Added candle glow effect */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1.5 h-6 bg-gradient-to-t from-gold via-gold/70 to-white/80 rounded-full animate-[candle-flicker_3s_ease-in-out_infinite]"></div>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-3 h-3 bg-gold/30 rounded-full blur-md animate-[pulse_2s_ease-in-out_infinite]"></div>
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
            {/* Byzantine-style page decoration */}
            <div className="absolute top-0 left-0 right-0 h-6 overflow-hidden opacity-20 pointer-events-none">
              <div className="flex justify-center">
                <svg width="800" height="24" viewBox="0 0 800 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0,12 C100,4 200,20 300,12 C400,4 500,20 600,12 C700,4 800,20 800,12" stroke="#D4AF37" strokeWidth="1.5" fill="none"/>
                  <path d="M0,12 C100,20 200,4 300,12 C400,20 500,4 600,12 C700,20 800,4 800,12" stroke="#D4AF37" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>
            </div>
            
            <Outlet />
            
            {/* Back to top button - appears when scrolled down */}
            <BackToTopButton />
          </motion.main>
        )}
      </AnimatePresence>
      
      {/* Footer with proper z-index */}
      <div className="relative z-20">
        <Footer />
      </div>
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
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-byzantine/70 text-white flex items-center justify-center shadow-lg backdrop-blur-sm button-press z-30 hover:bg-byzantine focus-indicator border border-gold/30"
          aria-label="Back to top"
        >
          {/* Orthodox cross icon */}
          <span className="text-gold text-xl">☦</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
