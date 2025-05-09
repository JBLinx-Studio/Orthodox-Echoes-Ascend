
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, BookOpen, Play, Calendar } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAudio } from '@/contexts/AudioContext';
import { motion } from 'framer-motion';
import { animations } from '@/utils/animation-utils';

interface HeroSectionProps {
  className?: string;
}

// Cathedral images for parallax effect
const cathedralImages = [
  "https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=2000&q=80"
];

export function HeroSection({ className }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { togglePlay, isPlaying, expandPlayer } = useAudio();
  const [scrollPosition, setScrollPosition] = useState(0);
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY * 0.3); // Reduced multiplier for smoother effect
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    // Fade in content with a slight delay for better perceived performance
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    
    // Preload images for smoother experience
    cathedralImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Calculate dynamic styles for the parallax images
  const getParallaxStyle = (index: number) => {
    const baseDelay = index * 0.2;
    const baseOpacity = 0.7 - (index * 0.15);
    const baseScale = 1 + (index * 0.05);
    
    return {
      opacity: baseOpacity,
      transform: `translateY(${scrollPosition / (index + 2)}px) scale(${baseScale})`,
      zIndex: -10 - index,
      transition: `transform 0.3s ease-out, opacity 0.5s ease-out ${baseDelay}s`
    };
  };

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center w-full">
      {/* Dynamic Cathedral Background with Parallax Effect */}
      <div className="absolute inset-0 z-0" ref={parallaxRef}>
        {/* Add multiple cathedral images with parallax effect */}
        {cathedralImages.map((src, index) => (
          <div 
            key={index} 
            className="absolute inset-0 bg-center bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${src})`,
              ...getParallaxStyle(index)
            }}
          />
        ))}
        
        {/* Overlay gradient for consistent dark appearance */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d16]/90 via-[#0a0d16]/85 to-[#0a0d16]/95 z-5"></div>
        
        {/* Light rays effect */}
        <div className="absolute inset-0 overflow-hidden z-[1]">
          <div className="absolute -top-20 left-1/3 w-80 h-[600px] bg-gold/5 rotate-[20deg] blur-3xl transform-gpu"></div>
          <div className="absolute top-40 right-1/5 w-60 h-[400px] bg-byzantine/5 -rotate-[15deg] blur-3xl transform-gpu"></div>
        </div>
        
        {/* Dynamic dust particles */}
        <div className="absolute inset-0 z-[2]">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[1px] h-[1px] bg-gold/30 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3 + 0.1,
                boxShadow: '0 0 3px 1px rgba(212, 175, 55, 0.3)',
                animation: `floatingDust ${Math.random() * 20 + 20}s linear infinite`,
                animationDelay: `${Math.random() * 10}s`,
                transform: `scale(${Math.random() * 2 + 0.5})`
              }}
            />
          ))}
        </div>
        
        {/* Extra mist and glow effects */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#0a0d16] via-[#0a0d16]/60 to-transparent z-10"></div>
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#0a0d16] via-[#0a0d16]/80 to-transparent z-10"></div>
        
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
          {/* Enhanced dark panel background that covers full content */}
          <div className="absolute inset-0 -z-1 bg-black/80 backdrop-blur-md rounded-xl shadow-2xl"></div>
          
          <div className="relative p-8 text-center rounded-xl overflow-hidden holy-light">
            {/* Byzantine glow effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 bg-gold/10 blur-2xl rounded-full"></div>
            
            {/* Top decoration */}
            <motion.div 
              variants={animations.fadeIn}
              className="flex justify-center mb-8"
            >
              <span className="text-gold text-5xl filter drop-shadow-lg animate-[pulse_3s_ease-in-out_infinite]">☦</span>
            </motion.div>
            
            <motion.h1 
              variants={animations.fadeIn}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            >
              <span className="text-gold block mb-2 filter drop-shadow-lg">Orthodox Faith</span>
              <span className="block">Ancient Wisdom for Modern Times</span>
            </motion.h1>
            
            <motion.div 
              variants={animations.fadeIn}
              className="flex justify-center my-8"
            >
              {/* Decorative divider with enhanced Byzantine design */}
              <div className="w-60 h-1 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/80 to-transparent"></div>
                <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-8 h-4 overflow-hidden">
                  <div className="w-8 h-8 border-2 border-gold/70 rounded-full"></div>
                </div>
              </div>
            </motion.div>
            
            <motion.p 
              variants={animations.fadeIn}
              className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-body leading-relaxed"
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
                className="bg-byzantine hover:bg-byzantine-dark text-white border border-gold/30 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm"
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
                className="border-gold/50 text-gold hover:bg-gold/10 hover:border-gold shadow-lg hover:shadow-xl transition-all backdrop-blur-sm"
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
                className="border-gold/30 text-gold/90 hover:bg-gold/10 hover:border-gold shadow-lg hover:shadow-xl transition-all backdrop-blur-sm"
              >
                <Link to="/calendar" className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  <span>Liturgical Calendar</span>
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
            
            {/* Enhanced decorative bottom edge */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
          </div>
        </motion.div>
        
        {/* Atmospheric floating icons with better performance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute -bottom-10 -right-20 w-40 h-40 opacity-10"
          style={{ animation: 'float 8s ease-in-out infinite' }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M50 10 L50 90 M30 30 L70 30" stroke="#D4AF37" strokeWidth="2" />
          </svg>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute -top-10 -left-10 w-32 h-32 opacity-10"
          style={{ animation: 'float 10s ease-in-out infinite reverse' }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="50" cy="50" r="40" stroke="#D4AF37" strokeWidth="1.5" />
            <path d="M50 10 L50 90" stroke="#D4AF37" strokeWidth="1.5" />
            <path d="M10 50 L90 50" stroke="#D4AF37" strokeWidth="1.5" />
          </svg>
        </motion.div>
      </div>
      
      {/* Add cathedral-themed styles to global CSS */}
      <style jsx global>{`
        @keyframes floatingDust {
          0% {
            transform: translate(0, 0);
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            transform: translate(${Math.random() > 0.5 ? '-' : ''}${Math.random() * 100 + 50}px, -${Math.random() * 200 + 100}px);
            opacity: 0;
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>
    </section>
  );
}
