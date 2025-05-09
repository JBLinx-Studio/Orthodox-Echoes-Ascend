
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
    <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-[#0a0d16] to-[#161a26]">
      {/* Cathedral background elements */}
      <div className="absolute inset-0 z-0">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('/images/noise-pattern.png')] opacity-5"></div>
        
        {/* Cathedral dome arches */}
        <div className="absolute bottom-0 left-0 right-0 h-60 opacity-10">
          <svg viewBox="0 0 1200 240" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,240 C300,80 900,80 1200,240" stroke="#D4AF37" strokeWidth="1" fill="none" />
            <path d="M150,240 C350,120 850,120 1050,240" stroke="#D4AF37" strokeWidth="1" fill="none" />
            <path d="M300,240 C400,160 800,160 900,240" stroke="#D4AF37" strokeWidth="1" fill="none" />
            <path d="M450,240 C500,200 700,200 750,240" stroke="#D4AF37" strokeWidth="1" fill="none" />
          </svg>
        </div>
        
        {/* Cathedral light rays */}
        <div className="absolute top-0 left-1/3 w-20 h-screen bg-gold/3 -rotate-6 animate-[pulse_12s_ease-in-out_infinite]"></div>
        <div className="absolute top-0 right-1/4 w-32 h-screen bg-gold/2 rotate-12 animate-[pulse_15s_ease-in-out_infinite]"></div>
        <div className="absolute top-0 left-2/3 w-24 h-screen bg-gold/3 -rotate-3 animate-[pulse_10s_ease-in-out_infinite]" style={{animationDelay: "2s"}}></div>
        
        {/* Cathedral cross background */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg width="600" height="600" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10 L50 90 M30 30 L70 30 M25 70 L75 70 M20 50 L80 50" 
                  stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.03"/>
          </svg>
        </div>
        
        {/* Candle effects */}
        <div className="absolute bottom-60 left-1/3 w-2 h-2 bg-gold/70 rounded-full animate-[candle-flicker_4s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-40 right-1/3 w-3 h-3 bg-gold/80 rounded-full animate-[candle-flicker_3s_ease-in-out_infinite]" style={{animationDelay: "0.5s"}}></div>
        <div className="absolute bottom-20 left-1/2 w-2.5 h-2.5 bg-gold/60 rounded-full animate-[candle-flicker_5s_ease-in-out_infinite]" style={{animationDelay: "1.2s"}}></div>
        
        {/* Stained glass light effect */}
        <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-byzantine/10 rounded-full blur-3xl opacity-20 animate-[pulse_10s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold/10 rounded-full blur-3xl opacity-15 animate-[pulse_12s_ease-in-out_infinite]" style={{animationDelay: "2s"}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-16">
        <motion.div 
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={animations.staggerContainer}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Orthodox cross symbol above title */}
          <motion.div 
            variants={animations.fadeIn}
            className="flex justify-center mb-6"
          >
            <span className="text-gold text-4xl">☦</span>
          </motion.div>
          
          <motion.h1 
            variants={animations.fadeIn}
            className="font-display text-4xl md:text-6xl font-bold text-white mb-6"
          >
            <span className="text-gold block mb-2">Orthodox Faith</span>
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
          
          <motion.div 
            variants={animations.fadeIn}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {/* Cathedral-styled buttons */}
            <Button 
              asChild 
              size="lg" 
              className="bg-byzantine hover:bg-byzantine-dark text-white border border-gold/20 shadow-md hover:shadow-lg transition-all"
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
              className="border-gold/50 text-gold hover:bg-gold/10 hover:border-gold shadow-md hover:shadow-lg transition-all"
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
              className="border-gold/30 text-gold/90 hover:bg-gold/10 hover:border-gold shadow-md hover:shadow-lg transition-all"
            >
              <Link to="/calendar" className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                <span>Liturgical Calendar</span>
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Decorative cathedral style footer */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden opacity-20 pointer-events-none">
          <div className="flex justify-center">
            <svg width="800" height="64" viewBox="0 0 800 64" fill="none">
              <path d="M0,64 C200,20 600,20 800,64" stroke="#D4AF37" strokeWidth="1.5" fill="none"/>
              <path d="M0,64 C100,40 200,50 300,40 C400,30 500,50 600,40 C700,30 800,50 800,64" stroke="#D4AF37" strokeWidth="0.8" fill="none"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
