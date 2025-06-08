
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, BookOpen, Play, Calendar, Star } from 'lucide-react';
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
      {/* Revolutionary Multi-Layer Cathedral Background */}
      <div className="absolute inset-0 z-0">
        {/* Primary Cathedral Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&w=2000&q=80)`,
            filter: 'brightness(0.3) contrast(1.3) saturate(1.2)'
          }}
        />
        
        {/* Secondary Parallax Cathedral Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2000&q=80)`,
            transform: 'scale(1.1)',
            filter: 'brightness(0.25) blur(1px) sepia(0.2) hue-rotate(20deg)'
          }}
        />
        
        {/* Tertiary Orthodox Architecture Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=2000&q=80)`,
            transform: 'scale(1.2)',
            filter: 'brightness(0.2) blur(2px) saturate(1.5)'
          }}
        />
        
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/70 to-black/90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-byzantine/30 via-transparent to-gold/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/30 to-black/80"></div>
        
        {/* Divine Light Rays Enhancement */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-[900px] bg-gradient-to-b from-gold/30 via-gold/8 to-transparent rotate-12 blur-3xl opacity-70"></div>
          <div className="absolute top-20 right-1/3 w-80 h-[700px] bg-gradient-to-b from-white/15 via-gold/10 to-transparent -rotate-8 blur-2xl opacity-50"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-[500px] bg-gradient-to-t from-byzantine/20 to-transparent blur-3xl opacity-60"></div>
          <div className="absolute top-1/2 left-1/6 w-64 h-[600px] bg-gradient-to-b from-gold/20 via-transparent to-gold/10 rotate-45 blur-4xl opacity-40"></div>
        </div>
        
        {/* Floating Sacred Particles */}
        <div className="absolute inset-0">
          {[...Array(35)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gold/50 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${Math.random() * 4 + 3}s`,
                boxShadow: '0 0 8px rgba(212, 175, 55, 0.6)'
              }}
            />
          ))}
        </div>

        {/* Ethereal Mist Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent opacity-30 animate-pulse" style={{animationDuration: '4s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          {/* Completely Redesigned Content Panel */}
          <div className="relative p-16 text-center rounded-3xl overflow-hidden backdrop-blur-2xl bg-gradient-to-br from-black/80 via-black/90 to-black/95 border-2 border-gold/40 shadow-2xl">
            {/* Enhanced Sacred Borders */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-gold via-byzantine to-transparent opacity-80"></div>
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-byzantine via-gold to-transparent opacity-80"></div>
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-transparent via-gold via-byzantine to-transparent opacity-80"></div>
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-b from-transparent via-byzantine via-gold to-transparent opacity-80"></div>
            
            {/* Glowing Sacred Symbol */}
            <motion.div 
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex justify-center mb-10"
            >
              <div className="relative">
                <span className="text-gold text-7xl filter drop-shadow-2xl animate-pulse" style={{ textShadow: '0 0 40px rgba(212, 175, 55, 0.9), 0 0 80px rgba(212, 175, 55, 0.5)' }}>☦</span>
                <div className="absolute inset-0 animate-spin-slow">
                  <div className="w-24 h-24 border-2 border-gold/30 rounded-full"></div>
                </div>
                <div className="absolute inset-0 animate-ping">
                  <div className="w-24 h-24 border border-gold/20 rounded-full"></div>
                </div>
              </div>
            </motion.div>
            
            {/* Majestic Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="font-display text-5xl md:text-7xl lg:text-9xl font-bold mb-10"
              style={{ textShadow: '0 6px 30px rgba(0,0,0,0.9)' }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold block mb-4 animate-pulse">
                Orthodox Echoes
              </span>
              <span className="text-white text-3xl md:text-5xl lg:text-6xl font-light tracking-wide">
                Sacred Traditions Eternal
              </span>
            </motion.h1>
            
            {/* Ornate Divider */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 1, duration: 1.2 }}
              className="flex justify-center my-12"
            >
              <div className="relative w-full max-w-lg h-1">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
                <div className="absolute left-1/2 -translate-x-1/2 -top-3 w-8 h-8 border-2 border-gold rounded-full bg-black flex items-center justify-center">
                  <Star className="w-4 h-4 text-gold animate-spin" style={{animationDuration: '8s'}} />
                </div>
                <div className="absolute left-1/4 -translate-x-1/2 -top-2 w-4 h-4 border border-gold/60 rounded-full bg-black/80 animate-pulse"></div>
                <div className="absolute right-1/4 translate-x-1/2 -top-2 w-4 h-4 border border-gold/60 rounded-full bg-black/80 animate-pulse"></div>
              </div>
            </motion.div>
            
            {/* Inspiring Description */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="text-xl md:text-3xl text-gray-100 mb-14 max-w-4xl mx-auto font-light leading-relaxed tracking-wide"
              style={{ textShadow: '0 3px 15px rgba(0,0,0,0.7)' }}
            >
              Journey through two millennia of sacred wisdom, divine liturgy, and timeless Orthodox traditions that illuminate the soul and bridge heaven to earth.
            </motion.p>
            
            {/* Enhanced Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-8 justify-center"
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-byzantine via-byzantine-dark to-byzantine hover:from-byzantine-dark hover:to-byzantine text-white border-2 border-gold/50 shadow-2xl hover:shadow-gold/30 transition-all duration-500 px-10 py-6 text-xl backdrop-blur-sm hover:scale-105 transform"
              >
                <Link to="/learn" className="flex items-center">
                  <BookOpen className="mr-4 h-7 w-7" />
                  <span>Begin Sacred Journey</span>
                  <ChevronRight className="ml-4 h-7 w-7" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-gold/70 text-gold hover:bg-gold/30 hover:border-gold shadow-2xl hover:shadow-gold/40 transition-all duration-500 px-10 py-6 text-xl backdrop-blur-sm hover:scale-105 transform"
                onClick={() => {
                  expandPlayer();
                  togglePlay();
                }}
              >
                <div className="mr-4 relative">
                  <Play className={`h-7 w-7 ${isPlaying ? 'animate-pulse' : ''}`} />
                  {isPlaying && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold/90 rounded-full animate-ping"></span>
                  )}
                </div>
                <span>{isPlaying ? 'Sacred Chants Playing' : 'Experience Divine Chants'}</span>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-2 border-white/40 text-white hover:bg-white/20 hover:border-white/60 shadow-2xl transition-all duration-500 px-10 py-6 text-xl backdrop-blur-sm hover:scale-105 transform"
              >
                <Link to="/calendar" className="flex items-center">
                  <Calendar className="mr-4 h-7 w-7" />
                  <span>Sacred Calendar</span>
                  <ChevronRight className="ml-4 h-7 w-7" />
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
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute bottom-32 right-32 w-40 h-40 opacity-15 animate-bounce"
        style={{ animationDuration: '8s' }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M50 10 L50 90 M30 30 L70 30" stroke="#D4AF37" strokeWidth="4" filter="url(#heavenlyGlow)" />
          <defs>
            <filter id="heavenlyGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.5 }}
        className="absolute top-32 left-32 w-32 h-32 opacity-10 animate-pulse"
        style={{ animationDuration: '6s' }}
      >
        <div className="w-full h-full border-4 border-gold/40 rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
      </motion.div>
    </section>
  );
}
