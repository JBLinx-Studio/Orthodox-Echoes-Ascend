
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, BookOpen, Play, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAudio } from '@/contexts/AudioContext';
import { motion } from 'framer-motion';
import { animations } from '@/utils/animation-utils';
import { OrthodoxIconFrame } from '@/components/ui/orthodox-icon-frame';

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { togglePlay, isPlaying, expandPlayer } = useAudio();
  
  useEffect(() => {
    // Fade in content
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center">
      {/* Cathedral background elements */}
      <div className="absolute inset-0 z-0">
        {/* Content is provided by the AnimatedBackground component */}
        
        {/* Extra mist and glow effects */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#0a0d16] via-[#0a0d16]/60 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-byzantine/5 via-transparent to-gold/10 z-5"></div>
        
        {/* Candle glow spots */}
        <div className="absolute bottom-60 left-1/3 w-3 h-3 bg-gold/20 rounded-full blur-lg animate-pulse z-5"></div>
        <div className="absolute bottom-40 right-1/3 w-4 h-4 bg-gold/15 rounded-full blur-xl animate-pulse z-5" style={{animationDuration: '7s'}}></div>
        <div className="absolute top-1/3 left-1/4 w-5 h-5 bg-gold/10 rounded-full blur-xl animate-pulse z-5" style={{animationDuration: '8s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-16">
        <motion.div 
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={animations.staggerContainer}
          className="max-w-3xl mx-auto"
        >
          {/* Fading UI panel background for content */}
          <div className="absolute inset-0 -z-1 bg-black/40 backdrop-blur-sm rounded-xl"></div>
          
          <div className="relative p-8 text-center rounded-xl overflow-hidden holy-light">
            {/* Byzantine glow effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 bg-gold/10 blur-2xl rounded-full"></div>
            
            {/* Top decoration */}
            <motion.div 
              variants={animations.fadeIn}
              className="flex justify-center mb-6"
            >
              <span className="text-gold text-4xl filter drop-shadow-lg animate-[pulse_3s_ease-in-out_infinite]">☦</span>
            </motion.div>
            
            <motion.h1 
              variants={animations.fadeIn}
              className="font-display text-4xl md:text-6xl font-bold text-white mb-6"
            >
              <span className="text-gold block mb-2 filter drop-shadow-lg">Orthodox Faith</span>
              <span className="block">Ancient Wisdom for Modern Times</span>
            </motion.h1>
            
            <motion.div 
              variants={animations.fadeIn}
              className="flex justify-center my-6"
            >
              {/* Decorative divider with Byzantine design */}
              <div className="w-40 h-1 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/60 to-transparent"></div>
                <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-6 h-3 overflow-hidden">
                  <div className="w-6 h-6 border-2 border-gold/40 rounded-full"></div>
                </div>
              </div>
            </motion.div>
            
            <motion.p 
              variants={animations.fadeIn}
              className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-body leading-relaxed"
            >
              Journey through millennia of divine wisdom, sacred traditions, and mystical revelations of the Orthodox faith. Discover the timeless beauty and spiritual depth of Eastern Orthodoxy.
            </motion.p>
            
            {/* Buttons with enhanced UI */}
            <motion.div 
              variants={animations.fadeIn}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-byzantine hover:bg-byzantine-dark text-white border border-gold/20 shadow-md hover:shadow-lg transition-all backdrop-blur-sm"
              >
                <Link to="/learn" className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  <span>Explore Teachings</span>
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-gold/50 text-gold hover:bg-gold/10 hover:border-gold shadow-md hover:shadow-lg transition-all backdrop-blur-sm"
                onClick={() => {
                  expandPlayer();
                  togglePlay();
                }}
              >
                <div className="mr-2 relative">
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
                className="border-gold/30 text-gold/90 hover:bg-gold/10 hover:border-gold shadow-md hover:shadow-lg transition-all backdrop-blur-sm"
              >
                <Link to="/calendar" className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  <span>Liturgical Calendar</span>
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
            
            {/* Decorative bottom edge */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
          </div>
        </motion.div>
        
        {/* Atmospheric floating icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="absolute -bottom-10 -right-20 w-40 h-40 opacity-10"
          style={{ animation: 'float 8s ease-in-out infinite' }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10 L50 90 M30 30 L70 30" stroke="#D4AF37" strokeWidth="2" />
          </svg>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5 }}
          className="absolute -top-10 -left-10 w-32 h-32 opacity-10"
          style={{ animation: 'float 10s ease-in-out infinite reverse' }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" stroke="#D4AF37" strokeWidth="1.5" />
            <path d="M50 10 L50 90" stroke="#D4AF37" strokeWidth="1.5" />
            <path d="M10 50 L90 50" stroke="#D4AF37" strokeWidth="1.5" />
          </svg>
        </motion.div>
        
        {/* Candle effects */}
        <div className="absolute bottom-5 left-1/4 w-1 h-1 bg-gold animate-[candle-flicker_4s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-5 right-1/4 w-1 h-1 bg-gold animate-[candle-flicker_3s_ease-in-out_infinite]" style={{animationDelay: "1.5s"}}></div>
      </div>
    </section>
  );
}
