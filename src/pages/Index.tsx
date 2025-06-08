
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
import { ArrowRight, Calendar, Users, Bookmark, Edit, Star, Heart, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
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
      staggerChildren: 0.2
    }
  }
};

const Index = () => {
  const { expandPlayer, togglePlay, isPlaying } = useAudio();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      toast.success(
        "Welcome to Orthodox Echoes", 
        { 
          description: "Experience sacred traditions and divine wisdom through centuries of Orthodox heritage.",
          duration: 6000,
          action: {
            label: isPlaying ? "Pause Sacred Chants" : "Play Divine Chants",
            onClick: () => {
              expandPlayer();
              togglePlay();
            }
          }
        }
      );
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [expandPlayer, togglePlay, isPlaying]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0d16] via-[#0c111f] to-[#161a26]">
      <HeroSection />
      
      {/* Enhanced Featured Content Section */}
      <motion.section 
        className="py-20 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {/* Background Enhancement */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#0c111f]/80 to-black/70"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23D4AF37\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div variants={fadeInUp} className="mb-16 text-center">
            <div className="flex justify-center mb-6">
              <Crown className="h-12 w-12 text-gold animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-gold mb-6">Faith in Practice</h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-byzantine to-transparent mx-auto mb-8"></div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">Discover how Orthodox Christianity continues to transform lives through timeless wisdom, sacred traditions, and divine grace.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
            <motion.div 
              variants={fadeInUp}
              className="group bg-gradient-to-br from-[#1A1F2C]/80 via-[#1A1F2C]/70 to-[#0c111f]/80 backdrop-blur-xl rounded-2xl border border-gold/20 p-8 shadow-2xl hover:border-gold/40 hover:shadow-gold/20 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-byzantine/30 to-byzantine/10 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-2xl font-display text-gold mb-4 group-hover:text-yellow-300 transition-colors">Liturgical Calendar</h3>
              <p className="text-white/70 mb-6 leading-relaxed">Follow the ancient rhythm of prayer, feast, and fast that guides Orthodox life throughout the sacred year.</p>
              <Link to="/calendar" className="text-gold inline-flex items-center font-medium hover:text-yellow-300 transition-colors group">
                View Calendar
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="group bg-gradient-to-br from-[#1A1F2C]/80 via-[#1A1F2C]/70 to-[#0c111f]/80 backdrop-blur-xl rounded-2xl border border-gold/20 p-8 shadow-2xl hover:border-gold/40 hover:shadow-gold/20 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-byzantine/30 to-byzantine/10 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-2xl font-display text-gold mb-4 group-hover:text-yellow-300 transition-colors">Lives of Saints</h3>
              <p className="text-white/70 mb-6 leading-relaxed">Explore the inspiring stories of holy men and women who exemplify the Orthodox path to sanctity and divine grace.</p>
              <Link to="/saints" className="text-gold inline-flex items-center font-medium hover:text-yellow-300 transition-colors group">
                Meet the Saints
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="group bg-gradient-to-br from-[#1A1F2C]/80 via-[#1A1F2C]/70 to-[#0c111f]/80 backdrop-blur-xl rounded-2xl border border-gold/20 p-8 shadow-2xl hover:border-gold/40 hover:shadow-gold/20 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-byzantine/30 to-byzantine/10 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Bookmark className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-2xl font-display text-gold mb-4 group-hover:text-yellow-300 transition-colors">Prayer Guide</h3>
              <p className="text-white/70 mb-6 leading-relaxed">Learn traditional Orthodox prayers and develop a consistent prayer life with our comprehensive spiritual guide.</p>
              <Link to="/prayers" className="text-gold inline-flex items-center font-medium hover:text-yellow-300 transition-colors group">
                Begin Praying
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Enhanced Blog and Sidebar Section */}
      <motion.div 
        className="container mx-auto px-4 py-20 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div 
            className="lg:col-span-2"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-display font-bold text-gold mb-2">Latest Articles</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-byzantine to-gold"></div>
              </div>
              <Link to="/blog" className="text-gold hover:text-yellow-300 transition-colors flex items-center font-medium group">
                View All 
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <FeaturedArticles />
            <div className="mt-20">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-4xl font-display font-bold text-gold mb-2">Featured Saints</h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-byzantine to-gold"></div>
                </div>
                <Link to="/saints" className="text-gold hover:text-yellow-300 transition-colors flex items-center font-medium group">
                  View All 
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <SaintsFeatured />
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-1 space-y-10"
            variants={fadeInUp}
          >
            {/* Enhanced Blog Widget */}
            <div className="bg-gradient-to-br from-[#1A1F2C]/80 via-[#1A1F2C]/70 to-[#0c111f]/80 backdrop-blur-xl p-8 rounded-2xl border border-gold/25 shadow-2xl">
              <h3 className="text-gold text-2xl font-display font-semibold mb-6 flex items-center">
                <Edit className="mr-3 h-6 w-6" />
                From Our Blog
              </h3>
              <div className="space-y-6">
                {[
                  { title: "Understanding Orthodox Iconography", author: "Fr. Thomas", readTime: "4 min" },
                  { title: "The Divine Liturgy Explained", author: "Mother Maria", readTime: "6 min" },
                  { title: "Saints of the Eastern Church", author: "Dr. Constantine", readTime: "5 min" }
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-[#0c111f]/50 rounded-xl border border-gold/15 hover:border-gold/30 transition-all group cursor-pointer">
                    <h4 className="text-white font-medium mb-2 group-hover:text-gold transition-colors">{item.title}</h4>
                    <p className="text-white/60 text-sm mb-3 line-clamp-2">Icons serve as windows to heaven, bridging the gap between the divine and earthly realms through sacred artistry...</p>
                    <div className="flex justify-between items-center text-xs text-gold/70">
                      <span>{item.author}</span>
                      <span>Read {item.readTime}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild className="w-full mt-6 bg-gradient-to-r from-byzantine to-byzantine-dark hover:from-byzantine-dark hover:to-byzantine text-white shadow-lg">
                <Link to="/blog">
                  Visit Blog
                </Link>
              </Button>
            </div>
            
            {/* Enhanced Prayer Widget */}
            <div className="bg-gradient-to-br from-[#1A1F2C]/80 via-[#1A1F2C]/70 to-[#0c111f]/80 backdrop-blur-xl p-8 rounded-2xl border border-gold/25 shadow-2xl">
              <PrayerOfTheDay />
            </div>
            
            {/* Enhanced Calendar Widget */}
            <div className="bg-gradient-to-br from-[#1A1F2C]/80 via-[#1A1F2C]/70 to-[#0c111f]/80 backdrop-blur-xl p-8 rounded-2xl border border-gold/25 shadow-2xl">
              <LiturgicalCalendar />
            </div>
            
            {/* Enhanced Sacred Sounds Widget */}
            <div className="bg-gradient-to-br from-[#1A1F2C]/80 via-[#1A1F2C]/70 to-[#0c111f]/80 backdrop-blur-xl p-8 rounded-2xl border border-gold/25 shadow-2xl">
              <h3 className="text-gold text-2xl font-display font-semibold mb-6 flex items-center">
                <Star className="mr-3 h-6 w-6 animate-pulse" />
                Sacred Sounds
              </h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                Experience the timeless beauty of Orthodox chants that have echoed through sacred cathedrals for millennia.
              </p>
              <button 
                onClick={() => {
                  expandPlayer();
                  if (!isPlaying) {
                    togglePlay();
                  }
                }}
                className="w-full py-4 px-6 bg-gradient-to-r from-byzantine/30 to-byzantine/20 hover:from-byzantine/40 hover:to-byzantine/30 text-gold border-2 border-gold/40 rounded-xl transition-all flex items-center justify-center group hover:scale-105 transform duration-300"
              >
                <span className="mr-3 text-xl">🎵</span>
                <span className="font-medium">{isPlaying ? "Open Chants Player" : "Listen to Sacred Chants"}</span>
                <ArrowRight className="ml-3 h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Enhanced Features and Donation Sections */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
      >
        <FeaturesSection />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
      >
        <DonationSection />
      </motion.div>
    </div>
  );
};

export default Index;
