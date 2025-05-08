
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, Play, Calendar } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAudio } from '@/contexts/AudioContext';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroSectionProps {
  className?: string;
}

// Import SVG as React component
const OrthodoxCross = () => (
  <svg width="40" height="40" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold">
    <path d="M60 10V110M40 30H80M30 40V80H90V40H30Z" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function HeroSection({ className }: HeroSectionProps) {
  const [loaded, setLoaded] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const { togglePlay, isPlaying, expandPlayer } = useAudio();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    // Sequence the animations
    const timer1 = setTimeout(() => setLoaded(true), 300);
    const timer2 = setTimeout(() => setRevealed(true), 1200);
    
    // Handle parallax effect
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ marginTop: '-64px' }} // Adjust for navbar height to fill the entire screen
    >
      {/* Extended backdrop that covers the entire hero section including behind navbar */}
      <div className="absolute inset-0 z-0">
        {/* Dark gradient overlay instead of grid texture, more intense at the top */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#0a0d16]/95 via-[#0a0d16]/85 to-[#0a0d16]/75 z-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(10, 13, 22, 0.8) 0%, rgba(10, 13, 22, 0.95) 100%)'
          }}
        ></div>
        
        {/* Cathedral image with parallax effect */}
        <motion.div 
          className="absolute inset-0 w-full h-full z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.5 }}
        >
          <div 
            className="absolute inset-0 w-full h-[120%]"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2000&h=1000')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translateY(${scrollY * 0.2}px)`
            }}
          ></div>
        </motion.div>

        {/* Vignette overlay at edges to create depth */}
        <div className="absolute inset-0 z-20 pointer-events-none" 
             style={{ 
               boxShadow: 'inset 0 0 150px 60px rgba(10,13,22,0.8)',
               background: 'radial-gradient(ellipse at center, transparent 50%, rgba(10,13,22,0.6) 100%)'
             }}>
        </div>

        {/* Cinematic light rays - top ray */}
        <motion.div 
          className="absolute top-0 right-[10%] w-[500px] h-[800px] opacity-30 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(165deg, rgba(212,175,55,0.3) 0%, transparent 60%)',
            filter: 'blur(40px)',
            transform: `translateY(${scrollY * -0.1}px)`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.8, duration: 2 }}
        ></motion.div>
        
        {/* Cinematic light rays - left ray */}
        <motion.div 
          className="absolute top-[20%] left-0 w-[300px] h-[600px] opacity-20 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(225deg, rgba(212,175,55,0.2) 0%, transparent 70%)',
            filter: 'blur(30px)',
            transform: `translateY(${scrollY * -0.15}px)`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 1, duration: 2 }}
        ></motion.div>
        
        {/* Animated dust particles - more optimized for performance */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`dust-${i}`}
              className="absolute w-[1px] h-[1px] rounded-full bg-gold/60"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5 + Math.random() * 5,
                delay: Math.random() * 5,
                ease: "linear"
              }}
            />
          ))}
        </div>
        
        {/* Bottom vignette for transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-[30%] z-20 bg-gradient-to-t from-[#0a0d16] via-[#0a0d16]/90 to-transparent pointer-events-none"></div>
        
        {/* Top vignette over the navbar */}
        <div className="absolute top-0 left-0 right-0 h-[120px] z-20 bg-gradient-to-b from-[#0a0d16] to-transparent pointer-events-none"></div>
      </div>

      {/* Main content */}
      <div className="container relative mx-auto px-4 h-screen flex items-center justify-center z-40 pt-32">
        <motion.div 
          className="max-w-4xl relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="w-full relative rounded-lg overflow-hidden">
            {/* Background panel with proper aesthetics - moved down from buttons */}
            <div className="absolute inset-0 bg-[#0a0d16]/80 backdrop-blur-md z-0"></div>
            
            {/* Beautiful border effect */}
            <div className="absolute inset-0 p-px rounded-lg overflow-hidden pointer-events-none z-10">
              <div className="absolute inset-0 rounded-lg border border-gold/30"></div>
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
              <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-gold/40 via-transparent to-gold/40"></div>
              <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-gold/40 via-transparent to-gold/40"></div>
              
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/60"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/60"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold/60"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/60"></div>
            </div>
            
            {/* Divine light effect */}
            <div className="absolute inset-0 overflow-hidden z-5">
              <motion.div 
                className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] opacity-30"
                style={{
                  background: 'radial-gradient(circle at center, rgba(212,175,55,0.15), transparent 70%)',
                }}
                animate={{
                  rotate: 360
                }}
                transition={{
                  duration: 60,
                  repeat: Infinity,
                  ease: "linear"
                }}
              ></motion.div>
            </div>
            
            {/* Content */}
            <div className="relative z-20 p-10 text-center">
              <motion.div 
                className="mx-auto mb-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: revealed ? 1 : 0.8, opacity: revealed ? 1 : 0 }}
                transition={{ delay: 0.3, duration: 1.5 }}
              >
                <div className="relative inline-block">
                  {/* Beautiful Orthodox Cross SVG */}
                  <div className="mx-auto relative">
                    <motion.div
                      className="absolute inset-0 bg-gold/20 rounded-full filter blur-xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <div className="relative z-10">
                      <OrthodoxCross />
                    </div>
                    <motion.div
                      className="absolute -inset-2 rounded-full"
                      style={{
                        background: "radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)"
                      }}
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </div>
              </motion.div>
              
              <AnimatePresence>
                {revealed && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 1 }}
                    >
                      <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
                        <span className="block text-gold">Orthodox Faith</span>
                        <span className="block text-white/90 mt-2">Ancient Wisdom for Modern Times</span>
                      </h1>
                      
                      {/* Ornate divider */}
                      <div className="flex items-center justify-center w-full my-6">
                        <div className="h-[1px] flex-1 max-w-[100px] bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
                        <div className="mx-4 relative">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 3L14.5 8.5H19.5L15.5 12.5L17.5 18L12 14.5L6.5 18L8.5 12.5L4.5 8.5H9.5L12 3Z" fill="#D4AF37" fillOpacity="0.6" />
                          </svg>
                          <motion.div
                            className="absolute inset-0"
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.6, 1, 0.6]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 3L14.5 8.5H19.5L15.5 12.5L17.5 18L12 14.5L6.5 18L8.5 12.5L4.5 8.5H9.5L12 3Z" fill="#D4AF37" fillOpacity="0.3" />
                            </svg>
                          </motion.div>
                        </div>
                        <div className="h-[1px] flex-1 max-w-[100px] bg-gradient-to-l from-transparent via-gold/30 to-transparent"></div>
                      </div>
                    </motion.div>
                    
                    <motion.p 
                      className="text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto font-body leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 1.2 }}
                    >
                      Journey through millennia of divine wisdom, sacred traditions, and mystical revelations of the Orthodox faith. Discover the timeless beauty and spiritual depth of Eastern Orthodoxy.
                    </motion.p>
                    
                    <motion.div 
                      className="flex flex-col sm:flex-row gap-5 justify-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 1 }}
                    >
                      <Button 
                        asChild 
                        variant="holy"
                        size="lg"
                        className="text-lg group relative"
                      >
                        <Link to="/learn">
                          <BookOpen className="mr-2 h-5 w-5" />
                          <span>Explore Teachings</span>
                          <motion.span 
                            className="absolute inset-0 bg-white/5 rounded-md"
                            initial={{ scale: 0, opacity: 0 }}
                            whileHover={{ 
                              scale: 1, 
                              opacity: 1,
                              transition: { duration: 0.2 }
                            }}
                          />
                        </Link>
                      </Button>
                      
                      <Button 
                        variant="divine" 
                        size="lg"
                        className="text-lg group relative"
                        onClick={() => {
                          expandPlayer();
                          togglePlay();
                        }}
                      >
                        <div className="relative">
                          <Play className="h-5 w-5 mr-2" />
                          {isPlaying && (
                            <motion.span 
                              className="absolute -top-1 -right-1 w-2 h-2 bg-gold rounded-full"
                              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                          )}
                        </div>
                        <span>{isPlaying ? 'Sacred Chants Playing' : 'Listen to Sacred Chants'}</span>
                        
                        {/* Audio visualizer when playing - minimal for performance */}
                        {isPlaying && (
                          <div className="ml-2 flex items-end gap-[2px] h-4">
                            {[1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-[2px] bg-gold rounded-full"
                                animate={{ height: ['20%', '60%', '100%', '60%', '20%'] }}
                                transition={{
                                  duration: 1 + (i * 0.2),
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                                style={{ height: '40%' }}
                              />
                            ))}
                          </div>
                        )}
                        
                        <motion.span 
                          className="absolute inset-0 bg-white/5 rounded-md"
                          initial={{ scale: 0, opacity: 0 }}
                          whileHover={{ 
                            scale: 1, 
                            opacity: 1,
                            transition: { duration: 0.2 }
                          }}
                        />
                      </Button>
                      
                      <Button 
                        asChild 
                        variant="ethereal" 
                        size="lg"
                        className="text-lg group relative"
                      >
                        <Link to="/calendar">
                          <Calendar className="mr-2 h-5 w-5" />
                          <span>Liturgical Calendar</span>
                          <motion.span 
                            className="absolute inset-0 bg-white/5 rounded-md"
                            initial={{ scale: 0, opacity: 0 }}
                            whileHover={{ 
                              scale: 1, 
                              opacity: 1,
                              transition: { duration: 0.2 }
                            }}
                          />
                        </Link>
                      </Button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/50 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <span className="text-gold/60 text-sm mb-2 font-serif">Explore More</span>
        <motion.div 
          className="w-6 h-10 border border-gold/30 rounded-full flex items-center justify-center"
          animate={{
            boxShadow: ['0 0 0 rgba(212,175,55,0)', '0 0 10px rgba(212,175,55,0.3)', '0 0 0 rgba(212,175,55,0)']
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-gold/80 rounded-full"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Candles effect - reduced for performance */}
      <div className="absolute bottom-20 left-20 z-30 pointer-events-none">
        <div className="relative">
          <motion.div
            className="absolute w-3 h-3 rounded-full bg-gradient-to-b from-gold via-orange-300 to-red-300"
            animate={{
              boxShadow: ['0 0 15px 5px rgba(212,175,55,0.4)', '0 0 20px 8px rgba(212,175,55,0.6)', '0 0 15px 5px rgba(212,175,55,0.4)']
            }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-1 h-6"
            style={{ 
              background: 'linear-gradient(to top, rgba(255,170,0,0.7), transparent)',
              filter: 'blur(1px)'
            }}
            animate={{
              height: ['4px', '6px', '4px'],
              width: ['1px', '2px', '1px'],
              filter: ['blur(1px)', 'blur(2px)', 'blur(1px)']
            }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          />
        </div>
      </div>

      {/* Orthodox symbols floating in the background - reduced in number */}
      {revealed && (
        <>
          <motion.div
            className="absolute right-[15%] top-[30%] z-30 pointer-events-none text-gold/20 text-4xl"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 0.2,
              y: [0, -15, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              opacity: { delay: 1.8, duration: 1.5 },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <svg width="40" height="40" viewBox="0 0 120 120" fill="none">
              <path d="M60 10V110M40 30H80M30 40V80H90V40H30Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
            </svg>
          </motion.div>
          
          <motion.div
            className="absolute left-[10%] top-[40%] z-30 pointer-events-none text-gold/15 text-3xl"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 0.15,
              y: [0, -10, 0],
              rotate: [0, -3, 0]
            }}
            transition={{
              opacity: { delay: 2, duration: 1.5 },
              y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 9, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path d="M12 3L14.5 8.5H19.5L15.5 12.5L17.5 18L12 14.5L6.5 18L8.5 12.5L4.5 8.5H9.5L12 3Z" fill="#D4AF37" fillOpacity="0.4" />
            </svg>
          </motion.div>
        </>
      )}
      
      {/* Transition to the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0d16] to-transparent z-40 pointer-events-none"></div>
    </section>
  );
}
