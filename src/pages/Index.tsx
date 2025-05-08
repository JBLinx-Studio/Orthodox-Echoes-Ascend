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
import { fadeIn, staggerContainer, cinematic } from '@/components/ui/animation';

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
      
      {/* Enhanced cinematic transition with cathedral elements */}
      <motion.div 
        className="relative z-10 h-40 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {/* Gradient transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d16] via-[#0c111f]/95 to-[#0c111f]/85 z-10"></div>
        
        {/* Cathedral arches silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-20 opacity-20 z-20">
          <svg width="100%" height="100%" viewBox="0 0 1200 80" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,80 C50,30 100,10 150,80 C200,30 250,10 300,80 C350,30 400,10 450,80 C500,30 550,10 600,80 C650,30 700,10 750,80 C800,30 850,10 900,80 C950,30 1000,10 1050,80 C1100,30 1150,10 1200,80" 
                  stroke="#D4AF37" strokeWidth="1" fill="none" strokeOpacity="0.3" />
          </svg>
        </div>
        
        {/* Subtle light rays */}
        <motion.div 
          className="absolute inset-0 z-5 opacity-30"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(212,175,55,0.2), transparent 70%)'
          }}
          animate={{
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      {/* Featured content section with enhanced transitions */}
      <motion.section 
        className="py-16 bg-gradient-to-b from-[#0c111f]/85 to-[#0c111f]/90 relative z-0"
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
        
        {/* Cathedral pattern background - very subtle */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
             style={{
               backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='80' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40C20 10 60 10 80 40' stroke='%23D4AF37' stroke-width='.8' fill='none'/%3E%3C/svg%3E\")",
               backgroundSize: "160px 80px"
             }}>
        </div>
        
        <div className="container mx-auto px-4">
          <motion.div variants={fadeIn} className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gold mb-4">Faith in Practice</h2>
            <div className="w-20 h-1 bg-byzantine/70 mx-auto mb-6"></div>
            <p className="text-white/70 max-w-2xl mx-auto">Discover how Orthodox Christianity continues to transform lives through timeless wisdom and sacred traditions.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Keep existing grid items but add variants */}
            <motion.div 
              variants={fadeIn}
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
            
            {/* ... keep existing code (other two grid items) ... */}
            <motion.div 
              variants={fadeIn}
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
              variants={fadeIn}
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
        
        {/* Enhanced transition to next section */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0d16] via-[#0c111f]/90 to-transparent z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        ></motion.div>
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
        
        {/* Cathedral crosses pattern background - extremely subtle */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
             style={{
               backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10v40M15 30h30' stroke='%23D4AF37' stroke-width='1' fill='none'/%3E%3C/svg%3E\")",
               backgroundSize: "120px 120px"
             }}>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2"
            variants={fadeIn}
          >
            <div className="flex items-center justify-between mb-8">
              <motion.h2 
                className="text-3xl font-display font-bold text-gold relative orthodox-heading"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={cinematic.transition}
                viewport={{ once: true }}
              >
                Latest Articles
              </motion.h2>
              <Link to="/blog" className="text-gold hover:underline flex items-center">
                View All 
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="relative">
              {/* Light glow effect behind articles */}
              <motion.div
                className="absolute -top-10 -left-10 w-60 h-60 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)'
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.6, 0.8, 0.6]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <FeaturedArticles />
            </div>
            <div className="mt-16 relative">
              {/* Light glow effect behind saints */}
              <motion.div
                className="absolute -top-10 -right-10 w-60 h-60 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)'
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.6, 0.8, 0.6]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 4
                }}
              />
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
            variants={fadeIn}
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
              
              {/* Corner decorative elements */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/40"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-gold/40"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-gold/40"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/40"></div>
              
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
            
            {/* Keep existing sidebar components but enhance them */}
            <div className="bg-[#1A1F2C]/60 backdrop-blur-sm p-6 rounded-lg border border-gold/20 shadow-lg relative overflow-hidden">
              {/* Corner decorative elements */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/40"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-gold/40"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-gold/40"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/40"></div>
              <PrayerOfTheDay />
            </div>
            
            <div className="bg-[#1A1F2C]/60 backdrop-blur-sm p-6 rounded-lg border border-gold/20 shadow-lg relative overflow-hidden">
              {/* Corner decorative elements */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/40"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-gold/40"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-gold/40"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/40"></div>
              <LiturgicalCalendar />
            </div>
            
            <div className="bg-[#1A1F2C]/60 backdrop-blur-sm p-6 rounded-lg border border-gold/20 shadow-lg relative overflow-hidden">
              {/* Corner decorative elements */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/40"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-gold/40"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-gold/40"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/40"></div>
              
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
      
      {/* Enhanced cinematic transition between sections */}
      <motion.div 
        className="relative h-32 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Gradient transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0d16]/80 to-[#0c111f]/90"></div>
        
        {/* Cathedral decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/20"></div>
        
        {/* Orthodox crosses - very subtle */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <div className="flex space-x-32">
            {[1, 2, 3].map((i) => (
              <svg key={i} width="20" height="20" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M60 10V110M40 30H80M30 40V80H90V40H30Z" stroke="#D4AF37" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ))}
          </div>
        </div>
      </motion.div>
      
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
