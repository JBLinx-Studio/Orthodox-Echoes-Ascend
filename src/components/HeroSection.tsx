
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, BookOpen, Play, Calendar } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAudio } from '@/contexts/AudioContext';
import { motion, AnimatePresence } from 'framer-motion';
import { animations } from '@/utils/animation-utils';
import { OrthodoxIconFrame } from '@/components/ui/orthodox-icon-frame';

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [textReveal, setTextReveal] = useState(false);
  const { togglePlay, isPlaying, expandPlayer } = useAudio();
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Intro sequence
    const sequence = async () => {
      // Start with fade in
      await new Promise(resolve => setTimeout(resolve, 300));
      setIsVisible(true);
      
      // Reveal text after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTextReveal(true);
      
      // Mark intro as complete
      await new Promise(resolve => setTimeout(resolve, 3000));
      setIntroComplete(true);
    };
    
    sequence();
    
    // Effect for parallax scrolling
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY;
        const parallaxElements = containerRef.current.querySelectorAll('.parallax');
        const glowElements = containerRef.current.querySelectorAll('.glow-effect');
        
        parallaxElements.forEach((element) => {
          const speed = parseFloat((element as HTMLElement).dataset.speed || '0.1');
          const yPos = scrollY * speed;
          (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
        });
        
        glowElements.forEach((element) => {
          const intensity = Math.min(1, scrollY / 1000);
          (element as HTMLElement).style.opacity = (0.3 + intensity * 0.7).toString();
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden min-h-[100vh] flex items-center justify-center">
      {/* Enhanced cinematic background elements - positioned to stretch over navbar */}
      <div className="absolute inset-0 z-0" style={{ top: '-80px' }}>
        {/* Dynamic background with parallax effect */}
        <div className="absolute inset-0 bg-[#0a0d16] opacity-80 z-0"></div>
        
        <div className="absolute inset-0 parallax" data-speed="0.05" style={{ top: '-50px', height: 'calc(100% + 100px)' }}>
          <img 
            src="https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-4.0.3&auto=format&fit=crop&q=80" 
            alt="Cathedral background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        {/* Ambient light effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0d16]/20 to-[#0a0d16]/90 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-byzantine/10 via-transparent to-gold/10 z-11"></div>
        
        {/* Dynamic light beams that follow cursor */}
        <div className="absolute top-1/4 -left-[10%] w-[50%] h-[500px] rotate-45 glow-effect bg-gradient-to-r from-gold/5 to-transparent blur-[100px] z-5 animate-[pulse_15s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/3 -right-[10%] w-[40%] h-[400px] -rotate-45 glow-effect bg-gradient-to-l from-byzantine/5 to-transparent blur-[100px] z-5 animate-[pulse_20s_ease-in-out_infinite_reverse]"></div>
        
        {/* Byzantine architectural elements */}
        <div className="absolute bottom-0 inset-x-0 h-40 z-10">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-full opacity-10">
            <path d="M0,0 C150,120 350,0 500,100 C650,200 750,0 900,100 C1050,200 1170,0 1200,80 L1200,120 L0,120 Z" className="fill-gold/20"></path>
          </svg>
        </div>
        
        {/* Floating icons */}
        <div className="absolute inset-0 z-5">
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i}
              className="absolute opacity-10"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                animation: `float ${Math.random() * 10 + 20}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            >
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 10 L50 90 M10 50 L90 50" stroke="#D4AF37" strokeWidth="4" />
              </svg>
            </div>
          ))}
        </div>
        
        {/* Candlelight effects */}
        <div className="absolute inset-0 z-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1"
              style={{
                bottom: `${Math.random() * 20 + 5}%`,
                left: `${Math.random() * 80 + 10}%`,
                background: `radial-gradient(circle, rgba(255,223,0,0.8) 0%, rgba(255,170,0,0.3) 60%, transparent 100%)`,
                boxShadow: '0 0 20px 5px rgba(255,170,0,0.4)',
                animation: `candle-flicker ${Math.random() * 3 + 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-16">
        <AnimatePresence>
          {isVisible && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="max-w-4xl mx-auto relative"
            >
              {/* Dramatic light effect behind content */}
              <div className="absolute inset-0 -z-1 bg-black/40 backdrop-blur-sm rounded-xl"></div>
              <div className="absolute inset-0 -z-1 bg-gradient-to-b from-black/0 via-black/30 to-black/60 rounded-xl"></div>
              
              <div className="relative p-10 text-center rounded-xl overflow-hidden holy-light">
                {/* Top decoration with animation */}
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    transition: { delay: 0.5, duration: 1 } 
                  }}
                  className="flex justify-center mb-8"
                >
                  <div className="relative">
                    <span className="text-gold text-5xl filter drop-shadow-lg animate-[pulse_3s_ease-in-out_infinite]">☦</span>
                    <div className="absolute -inset-4 bg-gold/20 rounded-full blur-xl animate-[pulse_5s_ease-in-out_infinite]"></div>
                  </div>
                </motion.div>
                
                <AnimatePresence>
                  {textReveal && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 2 }}
                    >
                      <motion.h1 
                        className="font-display text-5xl md:text-7xl font-bold text-white mb-8"
                      >
                        <motion.span 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 1 }}
                          className="text-gold block mb-4 filter drop-shadow-lg"
                        >
                          Orthodox Faith
                        </motion.span>
                        <motion.span 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.2, duration: 1.5 }}
                          className="block text-white/90"
                        >
                          Ancient Wisdom for Modern Times
                        </motion.span>
                      </motion.h1>
                      
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="flex justify-center my-8"
                      >
                        {/* Decorative Byzantine divider */}
                        <div className="w-60 h-1 relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/80 to-transparent"></div>
                          <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-8 h-4 overflow-hidden">
                            <div className="w-8 h-8 border-2 border-gold/60 rounded-full"></div>
                          </div>
                          <motion.div 
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 1.8, duration: 1.5 }}
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-gold/80 to-transparent"
                          />
                        </div>
                      </motion.div>
                      
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1 }}
                        className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto font-body leading-relaxed"
                      >
                        Journey through millennia of divine wisdom, sacred traditions, and mystical revelations of the Orthodox faith. Discover the timeless beauty and spiritual depth of Eastern Orthodoxy.
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Interactive Buttons */}
                <AnimatePresence>
                  {introComplete && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="flex flex-col sm:flex-row gap-5 justify-center"
                    >
                      <Button 
                        asChild 
                        size="lg" 
                        className="bg-byzantine hover:bg-byzantine-dark text-white border border-gold/20 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm text-lg"
                      >
                        <Link to="/learn" className="flex items-center">
                          <BookOpen className="mr-3 h-5 w-5" />
                          <span>Explore Teachings</span>
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="border-gold/50 text-gold hover:bg-gold/10 hover:border-gold shadow-lg hover:shadow-xl transition-all backdrop-blur-sm text-lg"
                        onClick={() => {
                          expandPlayer();
                          togglePlay();
                        }}
                      >
                        <div className="mr-3 relative">
                          <Play className={`h-5 w-5 ${isPlaying ? 'animate-pulse' : ''}`} />
                          {isPlaying && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-gold/80 rounded-full animate-ping"></span>
                          )}
                        </div>
                        <span>{isPlaying ? 'Sacred Chants Playing' : 'Listen to Sacred Chants'}</span>
                      </Button>
                      
                      <Button 
                        asChild 
                        variant="outline" 
                        size="lg" 
                        className="border-gold/30 text-gold/90 hover:bg-gold/10 hover:border-gold shadow-lg hover:shadow-xl transition-all backdrop-blur-sm text-lg"
                      >
                        <Link to="/calendar" className="flex items-center">
                          <Calendar className="mr-3 h-5 w-5" />
                          <span>Liturgical Calendar</span>
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Decorative bottom edge */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/50"
      >
        <span className="text-sm mb-2">Explore More</span>
        <div className="w-6 h-9 border-2 border-white/30 rounded-full flex items-start justify-center">
          <motion.div 
            animate={{ 
              y: [0, 10, 0],
            }}
            transition={{ 
              duration: 1.5, 
              ease: "easeInOut", 
              repeat: Infinity,
              repeatType: "loop" 
            }}
            className="w-1.5 h-1.5 bg-white/60 rounded-full mt-1"
          />
        </div>
      </motion.div>
    </section>
  );
}
