
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, BookOpen, Play, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAudio } from '@/contexts/AudioContext';
import { motion } from 'framer-motion';
import { animations } from '@/utils/animation-utils';

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
    <section className="relative overflow-hidden min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-[#0a0d16] to-[#161a26]">
      <div className="absolute inset-0 bg-black/30 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10 py-16">
        <motion.div 
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={animations.staggerContainer}
          className="max-w-3xl mx-auto text-center"
        >
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
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/60 to-transparent"></div>
          </motion.div>
          
          <motion.p 
            variants={animations.fadeIn}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Journey through millennia of divine wisdom, sacred traditions, and mystical revelations of the Orthodox faith.
          </motion.p>
          
          <motion.div 
            variants={animations.fadeIn}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-byzantine hover:bg-byzantine-dark text-white"
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
              className="border-gold text-gold hover:bg-gold/10"
              onClick={() => {
                expandPlayer();
                togglePlay();
              }}
            >
              <Play className={`mr-2 h-5 w-5 ${isPlaying ? 'animate-pulse' : ''}`} />
              <span>{isPlaying ? 'Sacred Chants Playing' : 'Listen to Sacred Chants'}</span>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-gold/50 text-gold/90 hover:bg-gold/10">
              <Link to="/calendar" className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                <span>Liturgical Calendar</span>
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
