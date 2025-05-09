
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, BookOpen, Play, Calendar, Sparkles, Star, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAudio } from '@/contexts/AudioContext';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { OrthodoxIconFrame } from '@/components/ui/orthodox-icon-frame';

interface HeroSectionProps {
  className?: string;
}

// Orthodox symbols for animated floating elements
const orthodoxSymbols = ["☦", "✝", "♱", "✙", "✚", "✛", "✜", "✝", "✞", "✟"];

export function HeroSection({ className }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [textReveal, setTextReveal] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const { togglePlay, isPlaying, expandPlayer } = useAudio();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{x: number, y: number, size: number, speed: number}>>([]);
  const [lightBeams, setLightBeams] = useState<Array<{x: number, width: number, height: number, opacity: number, delay: number}>>([]);
  
  // Parallax scrolling effect
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 150]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 80]);
  const backgroundOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  
  useEffect(() => {
    // Generate random particles for background effect
    const newParticles = Array.from({ length: 70 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 3 + 1
    }));
    setParticles(newParticles);
    
    // Generate light beams
    const newLightBeams = Array.from({ length: 8 }, () => ({
      x: Math.random() * 80 + 10,
      width: Math.random() * 200 + 100,
      height: Math.random() * 500 + 300,
      opacity: Math.random() * 0.2 + 0.05,
      delay: Math.random() * 5
    }));
    setLightBeams(newLightBeams);
    
    // Intro sequence
    const sequence = async () => {
      // Start with fade in
      await new Promise(resolve => setTimeout(resolve, 300));
      setIsVisible(true);
      
      // Reveal text after a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setTextReveal(true);
      
      // Mark intro as complete
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIntroComplete(true);
      
      // Show scroll indicator
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowScrollIndicator(true);
    };
    
    sequence();
    
    // Make sure background extends behind header
    const body = document.querySelector('body');
    if (body) {
      body.style.paddingTop = '0';
    }
    
    // Cleanup
    return () => {
      if (body) {
        body.style.paddingTop = '';
      }
    };
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden min-h-screen flex items-center justify-center pt-16">
      {/* Cinematic background elements - positioned to cover navbar completely */}
      <div className="absolute inset-0 z-0 -mt-16">
        {/* Dark base layer */}
        <motion.div 
          className="absolute inset-0 bg-[#0a0d16] z-0" 
          style={{ opacity: backgroundOpacity }}
        />
        
        {/* Parallax cathedral background with improved positioning */}
        <motion.div 
          className="absolute inset-0" 
          style={{ y: y1, top: '-100px', height: 'calc(100% + 200px)' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-4.0.3&auto=format&fit=crop&q=80" 
            alt="Cathedral background"
            className="w-full h-full object-cover opacity-30"
          />
        </motion.div>
        
        {/* Enhanced ambient light effects with parallax */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0d16]/30 to-[#0a0d16]/95 z-1"
          style={{ y: y3 }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-byzantine/10 via-transparent to-gold/10 z-1"
          style={{ y: y2 }}
        />
        
        {/* Dynamic light beams */}
        {lightBeams.map((beam, index) => (
          <motion.div
            key={`beam-${index}`}
            className="absolute top-0 blur-3xl z-1"
            style={{
              left: `${beam.x}%`,
              width: beam.width,
              height: beam.height,
              background: index % 2 === 0 
                ? 'linear-gradient(to bottom, rgba(155, 35, 53, 0.15), transparent)'
                : 'linear-gradient(to bottom, rgba(212, 175, 55, 0.12), transparent)',
              opacity: 0
            }}
            animate={{
              opacity: [beam.opacity * 0.5, beam.opacity, beam.opacity * 0.7, beam.opacity],
              x: [0, 10, -5, 0],
            }}
            transition={{
              duration: 8,
              delay: beam.delay,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
        
        {/* Divine light shaft */}
        <motion.div 
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[300px] h-[800px] bg-gradient-to-b from-gold/25 via-gold/10 to-transparent opacity-0 blur-3xl z-1"
          animate={{
            opacity: [0, 0.7, 0.4, 0.7, 0],
            scale: [0.8, 1, 0.9, 1, 0.8],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut'
          }}
        />
        
        {/* Animated dust particles */}
        {particles.map((particle, index) => (
          <motion.div
            key={`particle-${index}`}
            className="absolute rounded-full bg-white/30 z-2 pointer-events-none"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.size / 4,
              filter: 'blur(1px)'
            }}
            animate={{
              y: [`${particle.y}%`, `${particle.y - 15}%`, `${particle.y + 5}%`, `${particle.y}%`],
              x: [`${particle.x}%`, `${particle.x + 5}%`, `${particle.x - 10}%`, `${particle.x}%`],
              opacity: [particle.size / 4, particle.size / 3, particle.size / 5, particle.size / 4],
            }}
            transition={{
              duration: 15 + particle.speed * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Animated Orthodox symbols floating in the background */}
        <div className="absolute inset-0 overflow-hidden z-2 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div 
              key={`symbol-${i}`}
              className="absolute text-gold/20"
              style={{
                top: `${Math.random() * 70 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
                fontSize: `${Math.random() * 40 + 20}px`,
                opacity: 0,
                filter: 'blur(1px)'
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0, 0.3, 0],
                rotate: [0, Math.random() * 10 - 5, 0]
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            >
              {orthodoxSymbols[Math.floor(Math.random() * orthodoxSymbols.length)]}
            </motion.div>
          ))}
        </div>
        
        {/* Enhanced candlelight effects */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 z-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div 
              key={i}
              className="absolute"
              style={{
                bottom: `${Math.random() * 70}%`,
                left: `${Math.random() * 90 + 5}%`,
              }}
              animate={{
                opacity: [0.5, 0.8, 0.3, 0.7, 0.5]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2
              }}
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255,223,0,0.8) 0%, rgba(255,170,0,0.3) 60%, transparent 100%)',
                  boxShadow: '0 0 20px 8px rgba(255,170,0,0.4)',
                }}
              />
              <motion.div 
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-1 h-4 opacity-60"
                style={{
                  background: 'linear-gradient(to top, rgba(255,170,0,0.7), transparent)',
                  filter: 'blur(1px)',
                }}
                animate={{
                  height: ['4px', '6px', '3px', '5px', '4px'],
                  width: ['1px', '2px', '1px', '1.5px', '1px']
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Cathedral architecture silhouette at the bottom */}
        <div className="absolute bottom-0 inset-x-0 h-24 z-3 overflow-hidden opacity-70">
          <svg viewBox="0 0 1200 100" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full">
            <path d="M0,100 L0,60 L100,60 L100,40 L120,40 L120,30 L140,40 L160,30 L180,40 L200,60 L300,60 L300,50 L320,50 L320,40 L330,30 L340,40 L350,30 L360,40 L370,50 L400,50 L400,70 L500,70 L500,40 L520,40 L520,20 L530,20 L530,10 L540,20 L550,10 L560,20 L570,40 L600,40 L600,60 L700,60 L700,50 L720,50 L740,30 L760,50 L780,50 L800,60 L900,60 L900,40 L920,40 L940,20 L960,40 L980,30 L1000,40 L1020,30 L1040,40 L1060,50 L1100,50 L1100,65 L1200,65 L1200,100 Z" 
            className="fill-[#0a0d16]"/>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-16 mt-8">
        <AnimatePresence>
          {isVisible && (
            <motion.div 
              ref={contentRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="max-w-5xl mx-auto relative"
            >
              {/* Central divine icon with dramatic lighting */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 1.5, ease: "easeOut" }}
                className="flex justify-center mb-10 relative z-20"
              >
                <div className="relative">
                  <motion.div 
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [-2, 0, 2, 0, -2]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative z-20"
                  >
                    <span className="text-gold text-6xl md:text-7xl filter drop-shadow-lg">☦</span>
                  </motion.div>
                  
                  {/* Animated light glow behind icon */}
                  <motion.div 
                    className="absolute -inset-8 rounded-full blur-3xl z-10"
                    animate={{
                      background: [
                        'radial-gradient(circle, rgba(212,175,55,0.3) 0%, rgba(155,35,53,0.1) 50%, transparent 80%)',
                        'radial-gradient(circle, rgba(212,175,55,0.5) 0%, rgba(155,35,53,0.2) 60%, transparent 90%)',
                        'radial-gradient(circle, rgba(212,175,55,0.3) 0%, rgba(155,35,53,0.1) 50%, transparent 80%)',
                      ],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Divine rays */}
                  <div className="absolute -inset-20 z-0 opacity-70">
                    {Array.from({ length: 12 }).map((_, i) => {
                      const angle = (i * 30) % 360;
                      return (
                        <motion.div
                          key={`ray-${i}`}
                          className="absolute top-1/2 left-1/2 h-1 bg-gold/30 origin-left blur-sm"
                          style={{
                            width: '150px',
                            rotate: `${angle}deg`,
                            transformOrigin: '0 50%',
                            translateX: '-50%',
                            translateY: '-50%',
                          }}
                          animate={{
                            opacity: [0.2, 0.4, 0.2],
                            width: ['130px', '150px', '130px']
                          }}
                          transition={{
                            duration: 3,
                            delay: i * 0.25,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: "easeInOut"
                          }}
                        />
                      );
                    })}
                  </div>
                  
                  {/* Small animated stars */}
                  {Array.from({ length: 6 }).map((_, i) => {
                    const angle = (i * 60) % 360;
                    const distance = 60 + Math.random() * 20;
                    const x = Math.cos(angle * Math.PI / 180) * distance;
                    const y = Math.sin(angle * Math.PI / 180) * distance;
                    return (
                      <motion.div
                        key={`star-${i}`}
                        className="absolute top-1/2 left-1/2 text-gold/60 z-10"
                        style={{ 
                          x, 
                          y,
                          translateX: '-50%',
                          translateY: '-50%',
                          fontSize: `${Math.random() * 10 + 8}px`
                        }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.4, 0.8, 0.4]
                        }}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeInOut"
                        }}
                      >
                        <Star size={12} fill="currentColor" />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
              
              <AnimatePresence>
                {textReveal && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="text-center relative z-20"
                  >
                    {/* Illuminated central panel with main content */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="relative p-8 md:p-12 lg:p-16 rounded-2xl overflow-hidden backdrop-blur-lg"
                    >
                      {/* Glass panel background with animated gradient border */}
                      <motion.div 
                        className="absolute inset-0 bg-[#0a0d16]/50 -z-1"
                        animate={{
                          background: [
                            'radial-gradient(circle at 50% 50%, rgba(10, 13, 22, 0.7) 0%, rgba(10, 13, 22, 0.9) 100%)',
                            'radial-gradient(circle at 30% 70%, rgba(10, 13, 22, 0.7) 0%, rgba(10, 13, 22, 0.9) 100%)',
                            'radial-gradient(circle at 70% 30%, rgba(10, 13, 22, 0.7) 0%, rgba(10, 13, 22, 0.9) 100%)',
                            'radial-gradient(circle at 50% 50%, rgba(10, 13, 22, 0.7) 0%, rgba(10, 13, 22, 0.9) 100%)',
                          ]
                        }}
                        transition={{
                          duration: 15,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Animated borders */}
                      <div className="absolute inset-0 p-0.5 rounded-2xl overflow-hidden">
                        <motion.div 
                          className="absolute inset-0 rounded-2xl opacity-60"
                          animate={{
                            background: [
                              'linear-gradient(90deg, rgba(212,175,55,0.1) 0%, rgba(155,35,53,0.1) 25%, rgba(212,175,55,0.2) 50%, rgba(155,35,53,0.1) 75%, rgba(212,175,55,0.1) 100%)',
                              'linear-gradient(90deg, rgba(212,175,55,0.2) 0%, rgba(155,35,53,0.2) 25%, rgba(212,175,55,0.3) 50%, rgba(155,35,53,0.2) 75%, rgba(212,175,55,0.2) 100%)',
                              'linear-gradient(90deg, rgba(212,175,55,0.1) 0%, rgba(155,35,53,0.1) 25%, rgba(212,175,55,0.2) 50%, rgba(155,35,53,0.1) 75%, rgba(212,175,55,0.1) 100%)',
                            ],
                            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </div>
                      
                      {/* Light beam effect going across panel */}
                      <motion.div
                        className="absolute inset-0 z-10 overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        <motion.div
                          className="absolute top-0 -left-[100%] h-full w-[50%] bg-gradient-to-r from-transparent via-white/10 to-transparent"
                          animate={{ left: ['0%', '100%'] }}
                          transition={{
                            duration: 3,
                            delay: 1,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatDelay: 8
                          }}
                        />
                      </motion.div>
                      
                      {/* Main Title with animated reveal */}
                      <motion.h1 
                        className="relative font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-10 px-4"
                      >
                        <motion.span 
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 1 }}
                          className="block text-gold mb-4 filter drop-shadow-lg"
                        >
                          <span className="relative inline-block">
                            Orthodox Faith
                            <motion.span
                              className="absolute -right-6 top-0 text-4xl text-gold/70"
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.7, 1, 0.7],
                                rotate: [0, 3, 0, -3, 0]
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
                          transition={{ delay: 1, duration: 1.5 }}
                          className="block text-white/90"
                        >
                          Ancient Wisdom for Modern Times
                        </motion.span>
                      </motion.h1>
                      
                      {/* Ornate Divider */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.3, duration: 0.8 }}
                        className="flex justify-center my-8 relative"
                      >
                        <div className="w-72 h-0.5 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/80 to-transparent"></div>
                          <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-8 h-4 overflow-hidden">
                            <div className="w-8 h-8 border-2 border-gold/60 rounded-full"></div>
                          </div>
                          {/* Animated shimmer effect */}
                          <motion.div 
                            className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity, 
                              repeatDelay: 3,
                              ease: "easeInOut"
                            }}
                          />
                        </div>
                      </motion.div>
                      
                      {/* Main Description Text */}
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto font-body leading-relaxed relative"
                      >
                        Journey through millennia of divine wisdom, sacred traditions, and mystical revelations of the Orthodox faith. Discover the timeless beauty and spiritual depth of Eastern Orthodoxy.
                      </motion.p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Enhanced Interactive Buttons with animations */}
              <AnimatePresence>
                {introComplete && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-5 justify-center mt-10 relative z-30"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.6, duration: 0.8 }}
                    >
                      <Button 
                        asChild 
                        variant="divine" 
                        size="xl"
                        className="text-lg relative overflow-hidden group"
                      >
                        <Link to="/learn" className="flex items-center">
                          <BookOpen className="mr-3 h-5 w-5" />
                          <span>Explore Teachings</span>
                          <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          
                          {/* Animated particles inside button */}
                          {Array.from({ length: 3 }).map((_, i) => (
                            <motion.span
                              key={`btnpart-${i}`}
                              className="absolute w-1 h-1 bg-gold/40 rounded-full pointer-events-none"
                              style={{
                                top: `${20 + Math.random() * 60}%`,
                                left: `${20 + Math.random() * 60}%`,
                              }}
                              animate={{
                                y: [0, -10, 0],
                                opacity: [0, 0.8, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.6,
                                ease: "easeInOut",
                              }}
                            />
                          ))}
                        </Link>
                      </Button>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.8, duration: 0.8 }}
                    >
                      <Button 
                        variant="holy" 
                        size="xl" 
                        className="text-lg"
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
                                  animation: `audioVisualize ${0.7 + i * 0.2}s ease-in-out infinite alternate`
                                }}
                              ></div>
                            ))}
                          </div>
                        )}
                      </Button>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2, duration: 0.8 }}
                    >
                      <Button 
                        asChild 
                        variant="ethereal" 
                        size="xl"
                        className="text-lg relative overflow-hidden group"
                      >
                        <Link to="/calendar" className="flex items-center">
                          <Calendar className="mr-3 h-5 w-5" />
                          <span>Liturgical Calendar</span>
                          <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          
                          {/* Animated glow effect */}
                          <motion.div
                            className="absolute inset-0 w-full h-full bg-gold/5 pointer-events-none"
                            animate={{
                              opacity: [0.05, 0.1, 0.05]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        </Link>
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Enhanced scroll indicator with animation */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.6, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center text-white/50 hover:text-white/90 transition-colors cursor-pointer"
            onClick={() => window.scrollTo({
              top: window.innerHeight - 80,
              behavior: 'smooth'
            })}
          >
            <motion.span 
              className="text-sm mb-2 font-medium tracking-wide"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Explore More
            </motion.span>
            <div className="flex flex-col items-center">
              <motion.div 
                className="w-8 h-12 border-2 border-white/30 rounded-full flex items-start justify-center relative overflow-hidden"
                whileHover={{ borderColor: "rgba(255,255,255,0.5)" }}
              >
                <motion.div 
                  animate={{ 
                    y: [0, 20, 0],
                  }}
                  transition={{ 
                    duration: 1.8, 
                    ease: "easeInOut", 
                    repeat: Infinity,
                    repeatType: "loop" 
                  }}
                  className="w-1.5 h-1.5 bg-white/60 rounded-full mt-2"
                />
              </motion.div>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ 
                  duration: 1.5, 
                  ease: "easeInOut", 
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: 0.5 
                }}
              >
                <ChevronDown className="mt-1 text-white/50" size={18} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
