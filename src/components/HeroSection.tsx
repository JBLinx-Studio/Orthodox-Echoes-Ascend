
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, BookOpen, Play, Calendar, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAudio } from '@/contexts/AudioContext';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [particles, setParticles] = useState<Array<{x: number, y: number, size: number, speed: number}>>([]);
  
  useEffect(() => {
    // Generate random particles for background effect
    const newParticles = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 3 + 1
    }));
    setParticles(newParticles);
    
    // Intro sequence
    const sequence = async () => {
      // Start with fade in
      await new Promise(resolve => setTimeout(resolve, 300));
      setIsVisible(true);
      
      // Reveal text after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTextReveal(true);
      
      // Mark intro as complete
      await new Promise(resolve => setTimeout(resolve, 2000));
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
      {/* Cinematic background elements - positioned to cover navbar completely */}
      <div className="absolute inset-0 z-0 -mt-16"> {/* Negative margin to extend behind navbar */}
        {/* Dark base layer */}
        <div className="absolute inset-0 bg-[#0a0d16] opacity-80 z-0"></div>
        
        {/* Parallax cathedral background with improved positioning */}
        <div className="absolute inset-0 parallax" data-speed="0.05" style={{ top: '-80px', height: 'calc(100% + 160px)' }}>
          <img 
            src="https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-4.0.3&auto=format&fit=crop&q=80" 
            alt="Cathedral background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        {/* Enhanced ambient light effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0d16]/20 to-[#0a0d16]/90 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-byzantine/10 via-transparent to-gold/10 z-11"></div>
        
        {/* Enhanced dynamic light beams with animation */}
        <div className="absolute top-1/4 -left-[10%] w-[50%] h-[500px] rotate-45 glow-effect bg-gradient-to-r from-gold/5 to-transparent blur-[100px] z-5 animate-[pulse_15s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/3 -right-[10%] w-[40%] h-[400px] -rotate-45 glow-effect bg-gradient-to-l from-byzantine/5 to-transparent blur-[100px] z-5 animate-[pulse_20s_ease-in-out_infinite_reverse]"></div>
        
        {/* Enhanced volumetric light rays */}
        <div className="absolute top-0 left-1/4 w-1/2 h-[500px] bg-gradient-to-b from-gold/10 to-transparent opacity-30 blur-[80px] z-8 animate-[pulse_25s_ease-in-out_infinite]"></div>
        <div className="absolute top-1/3 right-1/4 w-1/3 h-[300px] bg-gradient-to-l from-byzantine/8 to-transparent opacity-20 blur-[60px] z-9 animate-[pulse_18s_ease-in-out_infinite_1s]"></div>
        
        {/* New divine shaft of light */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[200px] h-[600px] bg-gradient-to-b from-gold/25 via-gold/10 to-transparent opacity-60 blur-[50px] z-5 animate-[pulse_30s_ease-in-out_infinite]"></div>
        
        {/* New animated dust particles */}
        {particles.map((particle, index) => (
          <div
            key={`particle-${index}`}
            className="absolute rounded-full bg-white/30 z-20 pointer-events-none"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.size / 4,
              filter: 'blur(1px)',
              animation: `float ${20 + particle.speed * 10}s linear infinite ${index * -1}s`
            }}
          />
        ))}
        
        {/* New animated Orthodox symbols floating in the background */}
        <div className="absolute inset-0 overflow-hidden z-10 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div 
              key={`symbol-${i}`}
              className="absolute text-gold/20 opacity-30"
              style={{
                top: `${Math.random() * 70 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
                fontSize: `${Math.random() * 40 + 20}px`,
                filter: 'blur(1px)'
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, Math.random() * 10 - 5]
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {["☦", "†", "⍟", "✝", "☧", "⊹", "✙"][Math.floor(Math.random() * 7)]}
            </motion.div>
          ))}
        </div>
        
        {/* Byzantine architectural elements at the bottom */}
        <div className="absolute bottom-0 inset-x-0 h-40 z-10">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-full opacity-10">
            <path d="M0,0 C150,120 350,0 500,100 C650,200 750,0 900,100 C1050,200 1170,0 1200,80 L1200,120 L0,120 Z" className="fill-gold/20"></path>
          </svg>
        </div>
        
        {/* Enhanced candlelight effects */}
        <div className="absolute inset-0 z-6">
          {Array.from({ length: 15 }).map((_, i) => (
            <div 
              key={i}
              className="absolute"
              style={{
                bottom: `${Math.random() * 30 + 5}%`,
                left: `${Math.random() * 80 + 10}%`,
                width: '2px',
                height: '2px',
              }}
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255,223,0,0.8) 0%, rgba(255,170,0,0.3) 60%, transparent 100%)',
                  boxShadow: '0 0 20px 8px rgba(255,170,0,0.4)',
                  animation: `candle-flicker ${Math.random() * 3 + 2}s ease-in-out infinite ${Math.random() * 2}s`,
                }}
              ></div>
              <div 
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-1 h-4 opacity-60"
                style={{
                  background: 'linear-gradient(to top, rgba(255,170,0,0.7), transparent)',
                  filter: 'blur(1px)',
                  animation: `flame-flicker ${Math.random() * 3 + 2}s ease-in-out infinite ${Math.random() * 2}s`,
                }}
              ></div>
            </div>
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
              {/* Enhanced dramatic backdrop with illumination effects */}
              <div className="absolute inset-0 -z-1 bg-black/50 backdrop-blur-md rounded-xl"></div>
              <div className="absolute inset-0 -z-1 bg-gradient-to-b from-black/10 via-black/40 to-black/70 rounded-xl"></div>
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-byzantine/15 to-gold/8 opacity-70"></div>
                <motion.div 
                  className="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] bg-[radial-gradient(circle,rgba(212,175,55,0.05)_0%,transparent_70%)]"
                  animate={{
                    rotate: 360
                  }}
                  transition={{
                    duration: 120,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                ></motion.div>
                
                {/* Animated light rays */}
                <motion.div 
                  className="absolute inset-0 overflow-hidden opacity-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: 0.5, duration: 2 }}
                >
                  <motion.div
                    className="absolute top-0 left-1/2 h-full w-[200px] bg-gradient-to-b from-gold/30 via-gold/5 to-transparent blur-[30px]"
                    animate={{
                      left: ["30%", "70%", "30%"],
                      opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  ></motion.div>
                </motion.div>
              </div>
              
              <div className="relative p-10 text-center rounded-xl overflow-hidden holy-light">
                {/* Enhanced divine symbol with animation */}
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
                    <motion.div 
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [-5, 0, 5, 0, -5]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <span className="text-gold text-5xl filter drop-shadow-lg">☦</span>
                    </motion.div>
                    <motion.div 
                      className="absolute -inset-4 bg-gold/20 rounded-full blur-xl"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    ></motion.div>
                    <motion.div 
                      className="absolute -inset-8 bg-gold/5 rounded-full blur-xl"
                      animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.5, 0.2]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                      }}
                    ></motion.div>
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
                          <span className="relative">
                            Orthodox Faith
                            <motion.span
                              className="absolute -right-6 top-0 text-4xl text-gold/70"
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.7, 1, 0.7]
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 2
                              }}
                            >
                              <Sparkles className="w-5 h-5" />
                            </motion.span>
                          </span>
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
                        {/* Enhanced Byzantine divider with animation */}
                        <div className="w-60 h-1 relative overflow-hidden">
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
                          {/* Enhanced shimmer effect */}
                          <motion.div 
                            className="absolute inset-0 w-full"
                            initial={{ left: "-100%" }}
                            animate={{ left: "200%" }}
                            transition={{ 
                              duration: 2.5, 
                              repeat: Infinity, 
                              repeatDelay: 1.5, 
                              ease: "easeInOut"
                            }}
                          >
                            <div className="absolute top-0 left-[-100%] h-full w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent transform skew-x-30"></div>
                          </motion.div>
                        </div>
                      </motion.div>
                      
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1 }}
                        className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto font-body leading-relaxed relative"
                      >
                        <span className="relative z-10">
                          Journey through millennia of divine wisdom, sacred traditions, and mystical revelations of the Orthodox faith. Discover the timeless beauty and spiritual depth of Eastern Orthodoxy.
                        </span>
                        {/* Subtle illumination behind text */}
                        <span className="absolute inset-0 bg-gold/5 blur-xl rounded-full"></span>
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Enhanced Interactive Buttons with animations */}
                <AnimatePresence>
                  {introComplete && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="flex flex-col sm:flex-row gap-5 justify-center"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          asChild 
                          size="lg" 
                          className="bg-byzantine hover:bg-byzantine-dark text-white border border-gold/20 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm text-lg relative overflow-hidden group"
                        >
                          <Link to="/learn" className="flex items-center">
                            <BookOpen className="mr-3 h-5 w-5" />
                            <span>Explore Teachings</span>
                            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            {/* Subtle hover effect */}
                            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          </Link>
                        </Button>
                      </motion.div>
                      
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="border-gold/50 text-gold hover:bg-gold/10 hover:border-gold shadow-lg hover:shadow-xl transition-all backdrop-blur-sm text-lg relative overflow-hidden group"
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
                          
                          {/* Audio wave visualization */}
                          {isPlaying && (
                            <div className="ml-3 flex items-center gap-0.5">
                              {[1, 2, 3, 4].map((i) => (
                                <div 
                                  key={i} 
                                  className="w-0.5 h-3 bg-gold/80 rounded-full"
                                  style={{
                                    animation: `audioVisualize ${1 + i * 0.2}s ease-in-out infinite alternate`
                                  }}
                                ></div>
                              ))}
                            </div>
                          )}
                          
                          {/* Subtle hover effect */}
                          <span className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        </Button>
                      </motion.div>
                      
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          asChild 
                          variant="outline" 
                          size="lg" 
                          className="border-gold/30 text-gold/90 hover:bg-gold/10 hover:border-gold shadow-lg hover:shadow-xl transition-all backdrop-blur-sm text-lg relative overflow-hidden group"
                        >
                          <Link to="/calendar" className="flex items-center">
                            <Calendar className="mr-3 h-5 w-5" />
                            <span>Liturgical Calendar</span>
                            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            {/* Subtle hover effect */}
                            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          </Link>
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Decorative Byzantine border with animations */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold/20 to-transparent"></div>
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold/20 to-transparent"></div>
                
                {/* Animated corner accents */}
                <motion.div 
                  className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-gold/40"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity }}
                ></motion.div>
                <motion.div 
                  className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-gold/40"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                ></motion.div>
                <motion.div 
                  className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-gold/40"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                ></motion.div>
                <motion.div 
                  className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-gold/40"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 3 }}
                ></motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Enhanced scroll indicator with animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/50"
      >
        <span className="text-sm mb-2">Explore More</span>
        <div className="w-6 h-9 border-2 border-white/30 rounded-full flex items-start justify-center relative overflow-hidden">
          <motion.div 
            animate={{ 
              y: [0, 15, 0],
            }}
            transition={{ 
              duration: 1.5, 
              ease: "easeInOut", 
              repeat: Infinity,
              repeatType: "loop" 
            }}
            className="w-1.5 h-1.5 bg-white/60 rounded-full mt-1"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-gold/10 opacity-40"></div>
        </div>
      </motion.div>
    </section>
  );
}
