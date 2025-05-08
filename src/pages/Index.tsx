
import { HeroSection } from '@/components/HeroSection';
import { FeaturedArticles } from '@/components/FeaturedArticles';
import { FeaturesSection } from '@/components/FeaturesSection';
import { DonationSection } from '@/components/DonationSection';
import { SaintsFeatured } from '@/components/SaintsFeatured';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useAudio } from '@/contexts/AudioContext';
import { PrayerOfTheDay } from '@/components/PrayerOfTheDay';
import { LiturgicalCalendar } from '@/components/LiturgicalCalendar';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Users, Bookmark, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      ease: "easeOut"
    }
  }
};

const Index = () => {
  const { expandPlayer, togglePlay, isPlaying } = useAudio();
  
  useEffect(() => {
    // Welcome toast notification with enhanced options
    const timer = setTimeout(() => {
      toast.success(
        "Welcome to Orthodox Echoes", 
        { 
          description: "Experience sacred traditions and ancient wisdom with divine Byzantine chants.",
          duration: 5000,
          action: {
            label: isPlaying ? "Pause Sacred Chants" : "Play Sacred Chants",
            onClick: () => {
              expandPlayer();
              togglePlay();
            }
          }
        }
      );
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [expandPlayer, togglePlay, isPlaying]);

  return (
    <div className="min-h-screen relative">
      <HeroSection />
      
      {/* Cinematic transition element - dark to light gradient */}
      <div className="relative z-10 h-32 bg-gradient-to-b from-[#0a0d16] to-[#0c111f]/70"></div>
      
      {/* Featured content section with enhanced transitions */}
      <motion.section 
        className="py-16 bg-[#0c111f]/70 relative z-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {/* Cinematic light rays effect - subtle background enhancement */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            className="absolute top-0 -right-[30%] w-[100%] h-[100%] opacity-10"
            style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(212,175,55,0.05) 70%, transparent 90%)',
            }}
            animate={{
              x: ['-10%', '10%', '-10%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          ></motion.div>
        </div>
        
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gold mb-4">Faith in Practice</h2>
            <div className="w-20 h-1 bg-byzantine/70 mx-auto mb-6"></div>
            <p className="text-white/70 max-w-2xl mx-auto">Discover how Orthodox Christianity continues to transform lives through timeless wisdom and sacred traditions.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div 
              variants={fadeInUp}
              className="bg-[#1A1F2C]/60 backdrop-blur-sm rounded-lg border border-gold/10 p-6 shadow-lg hover:border-gold/30 transition-all relative overflow-hidden"
            >
              {/* Subtle backdrop glow effect */}
              <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-gold/5 to-transparent"></div>
              
              <div className="w-12 h-12 rounded-full bg-byzantine/20 mb-4 flex items-center justify-center relative">
                <Calendar className="h-6 w-6 text-gold" />
                <motion.div 
                  className="absolute inset-0 rounded-full border border-gold/30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.1, 0.3] 
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <h3 className="text-xl font-display text-gold mb-3">Liturgical Calendar</h3>
              <p className="text-white/70 mb-4">Follow the ancient rhythm of prayer, feast, and fast that guides Orthodox life throughout the year.</p>
              <Link to="/calendar" className="text-gold inline-flex items-center text-sm hover:underline">
                View Calendar
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="bg-[#1A1F2C]/60 backdrop-blur-sm rounded-lg border border-gold/10 p-6 shadow-lg hover:border-gold/30 transition-all relative overflow-hidden"
            >
              {/* Subtle backdrop glow effect */}
              <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-gold/5 to-transparent"></div>
              
              <div className="w-12 h-12 rounded-full bg-byzantine/20 mb-4 flex items-center justify-center relative">
                <Users className="h-6 w-6 text-gold" />
                <motion.div 
                  className="absolute inset-0 rounded-full border border-gold/30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.1, 0.3] 
                  }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <h3 className="text-xl font-display text-gold mb-3">Lives of Saints</h3>
              <p className="text-white/70 mb-4">Explore the inspiring stories of holy men and women who exemplify the Orthodox path to sanctity.</p>
              <Link to="/saints" className="text-gold inline-flex items-center text-sm hover:underline">
                Meet the Saints
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="bg-[#1A1F2C]/60 backdrop-blur-sm rounded-lg border border-gold/10 p-6 shadow-lg hover:border-gold/30 transition-all relative overflow-hidden"
            >
              {/* Subtle backdrop glow effect */}
              <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-gold/5 to-transparent"></div>
              
              <div className="w-12 h-12 rounded-full bg-byzantine/20 mb-4 flex items-center justify-center relative">
                <Bookmark className="h-6 w-6 text-gold" />
                <motion.div 
                  className="absolute inset-0 rounded-full border border-gold/30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.1, 0.3] 
                  }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <h3 className="text-xl font-display text-gold mb-3">Prayer Guide</h3>
              <p className="text-white/70 mb-4">Learn traditional Orthodox prayers and develop a consistent prayer life with our comprehensive guide.</p>
              <Link to="/prayers" className="text-gold inline-flex items-center text-sm hover:underline">
                Begin Praying
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Cinematic transition element to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0c111f]/90 via-[#0c111f]/70 to-transparent"></div>
      </motion.section>
      
      {/* Blog and sidebar section with improved transitions */}
      <motion.div 
        className="container mx-auto px-4 py-16 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {/* Background subtle elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-64 opacity-10"
               style={{
                 background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.1) 0%, transparent 70%)'
               }}>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-display font-bold text-gold relative orthodox-heading">Latest Articles</h2>
              <Link to="/blog" className="text-gold hover:underline flex items-center">
                View All 
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <FeaturedArticles />
            <div className="mt-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-display font-bold text-gold relative orthodox-heading">Featured Saints</h2>
                <Link to="/saints" className="text-gold hover:underline flex items-center">
                  View All 
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <SaintsFeatured />
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-1 space-y-8"
            variants={fadeInUp}
          >
            {/* More cinematic panels with subtle animations */}
            <div className="bg-[#1A1F2C]/60 backdrop-blur-sm p-6 rounded-lg border border-gold/20 shadow-lg relative overflow-hidden">
              {/* Holy light effect */}
              <motion.div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 70% 30%, rgba(212,175,55,1), transparent 70%)'
                }}
                animate={{
                  opacity: [0.05, 0.1, 0.05]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <h3 className="text-gold text-xl font-semibold mb-4 flex items-center">
                <Edit className="mr-2 h-5 w-5" />
                From Our Blog
              </h3>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div 
                    key={item} 
                    className="p-3 bg-[#0c111f]/40 rounded-md border border-gold/10 hover:border-gold/30 transition-all relative overflow-hidden"
                  >
                    <h4 className="text-white font-medium mb-1">Understanding Orthodox Iconography</h4>
                    <p className="text-white/60 text-sm mb-2 line-clamp-2">Icons serve as windows to heaven, bridging the gap between the divine and earthly realms...</p>
                    <div className="flex justify-between items-center text-xs text-gold/70">
                      <span>Fr. Thomas</span>
                      <span>Read 4 min</span>
                    </div>
                    
                    {/* Subtle hover effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gold/5 opacity-0 transition-opacity"
                      whileHover={{ opacity: 1 }}
                    />
                  </div>
                ))}
              </div>
              <Button asChild className="w-full mt-4 bg-byzantine hover:bg-byzantine-dark text-white">
                <Link to="/blog">
                  Visit Blog
                </Link>
              </Button>
            </div>
            
            <div className="bg-[#1A1F2C]/60 backdrop-blur-sm p-6 rounded-lg border border-gold/20 shadow-lg">
              <PrayerOfTheDay />
            </div>
            
            <div className="bg-[#1A1F2C]/60 backdrop-blur-sm p-6 rounded-lg border border-gold/20 shadow-lg">
              <LiturgicalCalendar />
            </div>
            
            <div className="bg-[#1A1F2C]/60 backdrop-blur-sm p-6 rounded-lg border border-gold/20 shadow-lg relative overflow-hidden">
              {/* Candle flicker effect */}
              <motion.div 
                className="absolute top-6 right-6 w-3 h-3"
                style={{
                  background: 'radial-gradient(circle, rgba(255,170,0,0.8), rgba(212,175,55,0.4) 50%, transparent 80%)',
                  filter: 'blur(3px)'
                }}
                animate={{
                  opacity: [0.7, 0.9, 0.7],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <h3 className="text-gold text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2 text-2xl">☦️</span>
                Sacred Sounds
              </h3>
              <p className="text-white/80 mb-4">
                Experience the timeless beauty of Orthodox chants that have echoed through cathedrals for centuries.
              </p>
              <button 
                onClick={() => {
                  expandPlayer();
                  if (!isPlaying) {
                    togglePlay();
                  }
                }}
                className="w-full py-3 px-4 bg-byzantine/20 hover:bg-byzantine/30 text-gold border border-gold/30 rounded-md transition-all flex items-center justify-center group relative overflow-hidden"
              >
                {/* Shine effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent translate-x-[-100%]"
                  whileHover={{
                    x: ["0%", "100%"]
                  }}
                  transition={{
                    duration: 1.2,
                    ease: "easeInOut"
                  }}
                />
                <span className="mr-2">🎵</span>
                <span>{isPlaying ? "Open Chants Player" : "Listen to Sacred Chants"}</span>
                <motion.span 
                  className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
                  transition={isPlaying ? { duration: 1.5, repeat: Infinity } : {}}
                >
                  →
                </motion.span>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Cinematic transition to features section */}
      <div className="relative h-24 bg-gradient-to-b from-transparent to-[#0c111f]/80"></div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <FeaturesSection />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <DonationSection />
      </motion.div>
    </div>
  );
};

export default Index;
