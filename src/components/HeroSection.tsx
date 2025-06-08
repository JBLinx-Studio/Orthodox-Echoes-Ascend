
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, BookOpen, Play, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAudio } from '@/contexts/AudioContext';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { togglePlay, isPlaying, expandPlayer } = useAudio();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center w-full">
      {/* Revolutionary Cathedral Background with Multiple Layers */}
      <div className="absolute inset-0 z-0">
        {/* Primary Cathedral Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&w=2000&q=80)`,
            filter: 'brightness(0.4) contrast(1.2) saturate(1.1)'
          }}
        />
        
        {/* Secondary Parallax Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2000&q=80)`,
            transform: 'scale(1.1)',
            filter: 'brightness(0.3) blur(1px)'
          }}
        />
        
        {/* Tertiary Cathedral Dome Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=2000&q=80)`,
            transform: 'scale(1.2)',
            filter: 'brightness(0.25) blur(2px)'
          }}
        />
        
        {/* Rich Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-byzantine/20 via-transparent to-gold/10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
        
        {/* Divine Light Rays */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-[800px] bg-gradient-to-b from-gold/20 via-gold/5 to-transparent rotate-12 blur-3xl opacity-60"></div>
          <div className="absolute top-20 right-1/3 w-64 h-[600px] bg-gradient-to-b from-white/10 via-gold/8 to-transparent -rotate-6 blur-2xl opacity-40"></div>
          <div className="absolute bottom-0 left-1/2 w-80 h-[400px] bg-gradient-to-t from-byzantine/15 to-transparent blur-3xl opacity-50"></div>
        </div>
        
        {/* Floating Sacred Particles */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gold/40 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                boxShadow: '0 0 6px rgba(212, 175, 55, 0.5)'
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Elegant Content Panel */}
          <div className="relative p-12 text-center rounded-2xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-black/70 via-black/80 to-black/90 border border-gold/30 shadow-2xl">
            {/* Sacred Top Border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-byzantine to-transparent"></div>
            
            {/* Glowing Sacred Symbol */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <span className="text-gold text-6xl filter drop-shadow-2xl animate-pulse" style={{ textShadow: '0 0 30px rgba(212, 175, 55, 0.8)' }}>☦</span>
                <div className="absolute inset-0 animate-spin-slow">
                  <div className="w-20 h-20 border border-gold/20 rounded-full"></div>
                </div>
              </div>
            </motion.div>
            
            {/* Majestic Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-8"
              style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-300 to-gold block mb-3">
                Orthodox Echoes
              </span>
              <span className="text-white text-3xl md:text-4xl lg:text-5xl font-light">
                Where Heaven Meets Earth
              </span>
            </motion.h1>
            
            {/* Ornate Divider */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.8, duration: 1 }}
              className="flex justify-center my-10"
            >
              <div className="relative w-96 h-0.5">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
                <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-6 h-6 border-2 border-gold rounded-full bg-black flex items-center justify-center">
                  <div className="w-2 h-2 bg-gold rounded-full animate-ping"></div>
                </div>
              </div>
            </motion.div>
            
            {/* Inspiring Description */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto font-light leading-relaxed"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
            >
              Discover the profound beauty of Orthodox Christianity through sacred traditions, 
              divine liturgy, and timeless wisdom that has illuminated souls for two millennia.
            </motion.p>
            
            {/* Enhanced Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-byzantine to-byzantine-dark hover:from-byzantine-dark hover:to-byzantine text-white border-2 border-gold/40 shadow-2xl hover:shadow-gold/20 transition-all duration-300 px-8 py-4 text-lg backdrop-blur-sm"
              >
                <Link to="/learn" className="flex items-center">
                  <BookOpen className="mr-3 h-6 w-6" />
                  <span>Begin Your Journey</span>
                  <ChevronRight className="ml-3 h-6 w-6" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-gold/60 text-gold hover:bg-gold/20 hover:border-gold shadow-2xl hover:shadow-gold/30 transition-all duration-300 px-8 py-4 text-lg backdrop-blur-sm"
                onClick={() => {
                  expandPlayer();
                  togglePlay();
                }}
              >
                <div className="mr-3 relative">
                  <Play className={`h-6 w-6 ${isPlaying ? 'animate-pulse' : ''}`} />
                  {isPlaying && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-gold/80 rounded-full animate-ping"></span>
                  )}
                </div>
                <span>{isPlaying ? 'Sacred Chants Playing' : 'Experience Sacred Chants'}</span>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 shadow-2xl transition-all duration-300 px-8 py-4 text-lg backdrop-blur-sm"
              >
                <Link to="/calendar" className="flex items-center">
                  <Calendar className="mr-3 h-6 w-6" />
                  <span>Sacred Calendar</span>
                  <ChevronRight className="ml-3 h-6 w-6" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Floating Orthodox Symbols */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-20 right-20 w-32 h-32 opacity-20 animate-bounce"
        style={{ animationDuration: '6s' }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M50 10 L50 90 M30 30 L70 30" stroke="#D4AF37" strokeWidth="3" filter="url(#glow)" />
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>
      </motion.div>
    </section>
  );
}
