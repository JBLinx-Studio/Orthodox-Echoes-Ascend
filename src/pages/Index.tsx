
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
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
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
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Featured content section */}
      <motion.section 
        className="py-16 bg-[#0c111f]/70"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gold mb-4">Faith in Practice</h2>
            <div className="w-20 h-1 bg-byzantine/70 mx-auto mb-6"></div>
            <p className="text-white/70 max-w-2xl mx-auto">Discover how Orthodox Christianity continues to transform lives through timeless wisdom and sacred traditions.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div 
              variants={fadeInUp}
              className="bg-[#1A1F2C]/60 backdrop-blur-sm rounded-lg border border-gold/10 p-6 shadow-lg hover:border-gold/30 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-byzantine/20 mb-4 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-gold" />
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
              className="bg-[#1A1F2C]/60 backdrop-blur-sm rounded-lg border border-gold/10 p-6 shadow-lg hover:border-gold/30 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-byzantine/20 mb-4 flex items-center justify-center">
                <Users className="h-6 w-6 text-gold" />
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
              className="bg-[#1A1F2C]/60 backdrop-blur-sm rounded-lg border border-gold/10 p-6 shadow-lg hover:border-gold/30 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-byzantine/20 mb-4 flex items-center justify-center">
                <Bookmark className="h-6 w-6 text-gold" />
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
      </motion.section>
      
      {/* Blog and sidebar section */}
      <motion.div 
        className="container mx-auto px-4 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-display font-bold text-gold">Latest Articles</h2>
              <Link to="/blog" className="text-gold hover:underline flex items-center">
                View All 
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <FeaturedArticles />
            <div className="mt-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-display font-bold text-gold">Featured Saints</h2>
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
            <div className="bg-[#1A1F2C]/60 backdrop-blur-sm p-6 rounded-lg border border-gold/20 shadow-lg">
              <h3 className="text-gold text-xl font-semibold mb-4 flex items-center">
                <Edit className="mr-2 h-5 w-5" />
                From Our Blog
              </h3>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="p-3 bg-[#0c111f]/40 rounded-md border border-gold/10 hover:border-gold/30 transition-all">
                    <h4 className="text-white font-medium mb-1">Understanding Orthodox Iconography</h4>
                    <p className="text-white/60 text-sm mb-2 line-clamp-2">Icons serve as windows to heaven, bridging the gap between the divine and earthly realms...</p>
                    <div className="flex justify-between items-center text-xs text-gold/70">
                      <span>Fr. Thomas</span>
                      <span>Read 4 min</span>
                    </div>
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
            
            <div className="bg-[#1A1F2C]/60 backdrop-blur-sm p-6 rounded-lg border border-gold/20 shadow-lg">
              <h3 className="text-gold text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2 text-2xl">☦️</span>
                Sacred Sounds
              </h3>
              <p className="text-white/80 mb-4">
                Experience the timeless beauty of Orthodox chants that have echoed through cathedrals for centuries.
              </p>
              <button 
                onClick={() => {
                  console.log('Sacred Sounds button clicked - expanding player and starting playback');
                  expandPlayer();
                  if (!isPlaying) {
                    togglePlay();
                  }
                }}
                className="w-full py-3 px-4 bg-byzantine/20 hover:bg-byzantine/30 text-gold border border-gold/30 rounded-md transition-all flex items-center justify-center group"
              >
                <span className="mr-2">🎵</span>
                <span>{isPlaying ? "Open Chants Player" : "Listen to Sacred Chants"}</span>
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <FeaturesSection />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <DonationSection />
      </motion.div>
    </div>
  );
};

export default Index;
