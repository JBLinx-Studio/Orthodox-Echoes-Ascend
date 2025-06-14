
import { HeroSection } from '@/components/HeroSection';
import { FeaturedArticles } from '@/components/FeaturedArticles';
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

// Animation presets
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.28
    }
  }
};

const Index = () => {
  const { expandPlayer, togglePlay, isPlaying } = useAudio();

  useEffect(() => {
    // Welcome toast notification
    const timer = setTimeout(() => {
      toast.success(
        "Welcome to Orthodox Echoes",
        {
          description: "Experience sacred traditions and ancient wisdom with divine Byzantine chants.",
          duration: 5500,
          action: {
            label: isPlaying ? "Pause Sacred Chants" : "Play Sacred Chants",
            onClick: () => {
              expandPlayer();
              togglePlay();
            }
          }
        }
      );
    }, 900);
    return () => clearTimeout(timer);
  }, [expandPlayer, togglePlay, isPlaying]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Upgraded Hero Section */}
      <HeroSection />

      {/* Animated section: Faith in Practice */}
      <motion.section
        className="py-20 relative bg-gradient-to-b from-[#12162a]/80 to-[#171a29]/95"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          {/* BYZANTINE DIVIDER */}
          <div className="flex justify-center mb-10">
            <div className="relative w-64 h-6">
              <svg width="256" height="24" className="absolute inset-0" viewBox="0 0 256 24" fill="none">
                <path d="M0,12 C32,4 64,20 96,12 C128,4 160,20 192,12 C224,4 256,20 256,12" stroke="#D4AF37" strokeWidth="2" fill="none"/>
                <circle cx="128" cy="12" r="4" fill="#D4AF37" opacity="0.3"/>
              </svg>
            </div>
          </div>
          {/* Section Heading */}
          <motion.div variants={fadeInUp} className="mb-14 text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gold mb-4 tracking-tight drop-shadow-lg">
              Faith in Practice
            </h2>
            <div className="mx-auto mb-5 flex justify-center">
              <div className="inline-flex items-center gap-2 bg-byzantine/15 rounded-full px-6 py-2 shadow-md border border-gold/40 text-gold text-sm uppercase font-medium animate-pulse">
                ✦ Ancient Roots, Living Tradition ✦
              </div>
            </div>
            <p className="text-white/80 max-w-2xl mx-auto text-lg font-body">
              Discover how Orthodox Christianity continues to transform lives through timeless wisdom and sacred traditions.
            </p>
          </motion.div>
          {/* Featured grids */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <motion.div variants={fadeInUp}
              className="bg-[#181D2E]/80 rounded-xl p-8 border border-gold/15 shadow-lg hover:border-gold/50 transition-all hover:scale-[1.03] group"
            >
              <div className="w-14 h-14 rounded-full mb-3 flex items-center justify-center bg-gold/10 group-hover:animate-pulse">
                <Calendar className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-2xl font-display text-gold mb-2 font-bold">Liturgical Calendar</h3>
              <p className="text-white/70 mb-4">Follow the ancient rhythm of prayer, feast, and fast that guides Orthodox life throughout the year.</p>
              <Link to="/calendar" className="text-gold inline-flex items-center text-base hover:underline">
                View Calendar <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp}
              className="bg-[#181D2E]/80 rounded-xl p-8 border border-gold/15 shadow-lg hover:border-gold/50 transition-all hover:scale-[1.03] group"
            >
              <div className="w-14 h-14 rounded-full mb-3 flex items-center justify-center bg-gold/10 group-hover:animate-pulse">
                <Users className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-2xl font-display text-gold mb-2 font-bold">Lives of Saints</h3>
              <p className="text-white/70 mb-4">Explore inspiring stories of holy men and women who exemplify the Orthodox path to sanctity.</p>
              <Link to="/saints" className="text-gold inline-flex items-center text-base hover:underline">
                Meet the Saints <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp}
              className="bg-[#181D2E]/80 rounded-xl p-8 border border-gold/15 shadow-lg hover:border-gold/50 transition-all hover:scale-[1.03] group"
            >
              <div className="w-14 h-14 rounded-full mb-3 flex items-center justify-center bg-gold/10 group-hover:animate-pulse">
                <Bookmark className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-2xl font-display text-gold mb-2 font-bold">Prayer Guide</h3>
              <p className="text-white/70 mb-4">Learn traditional Orthodox prayers and develop a consistent prayer life with our comprehensive guide.</p>
              <Link to="/prayers" className="text-gold inline-flex items-center text-base hover:underline">
                Begin Praying <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Blog + Saints Grid */}
      <motion.div
        className="container mx-auto px-4 py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-140px" }}
        variants={staggerContainer}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <motion.div className="lg:col-span-2" variants={fadeInUp}>
            {/* Latest Articles */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gold">Latest Articles</h2>
              <Link to="/blog" className="text-gold hover:underline flex items-center">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <FeaturedArticles />
            {/* Saints Highlighted  */}
            <div className="mt-20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gold">Featured Saints</h2>
                <Link to="/saints" className="text-gold hover:underline flex items-center">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <SaintsFeatured />
            </div>
          </motion.div>
          {/* Sidebar Panel */}
          <motion.div className="lg:col-span-1 space-y-10" variants={fadeInUp}>
            <div className="bg-[#191c2d]/80 backdrop-blur p-8 rounded-xl border border-gold/20 shadow-xl relative overflow-hidden group">
              <h3 className="text-gold text-xl font-semibold mb-4 flex items-center">
                <Edit className="mr-2 h-5 w-5" />
                From Our Blog
              </h3>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="p-4 bg-[#0c111f]/40 rounded-md border border-gold/10 hover:border-gold/30 transition-all shadow-sm">
                    <h4 className="text-white font-medium mb-1">Understanding Orthodox Iconography</h4>
                    <p className="text-white/60 text-xs mb-2 line-clamp-2">Icons serve as windows to heaven, bridging the gap between the divine and earthly realms...</p>
                    <div className="flex justify-between items-center text-xs text-gold/70">
                      <span>Fr. Thomas</span>
                      <span>Read 4 min</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild className="w-full mt-4 bg-byzantine hover:bg-byzantine-dark text-white font-semibold shadow">
                <Link to="/blog">
                  Visit Blog
                </Link>
              </Button>
              {/* Byzantine shimmer effect */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-gold/10 to-transparent blur-md opacity-80 animate-pulse" />
            </div>
            <div className="bg-[#191c2d]/80 backdrop-blur p-8 rounded-xl border border-gold/20 shadow-xl">
              <PrayerOfTheDay />
            </div>
            <div className="bg-[#191c2d]/80 backdrop-blur p-8 rounded-xl border border-gold/20 shadow-xl">
              <LiturgicalCalendar />
            </div>
            <div className="bg-[#191c2d]/80 backdrop-blur p-8 rounded-xl border border-gold/20 shadow-xl">
              <h3 className="text-gold text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2 text-2xl">☦️</span> Sacred Sounds
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
                className="w-full py-3 px-4 bg-byzantine/20 hover:bg-byzantine/30 text-gold border border-gold/30 rounded-md transition-all flex items-center justify-center group font-semibold"
              >
                <span className="mr-2">🎵</span>
                <span>{isPlaying ? "Open Chants Player" : "Listen to Sacred Chants"}</span>
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Divider with glow */}
      <div className="relative">
        <div className="absolute inset-0 flex justify-center">
          <svg width="900" height="20" className="opacity-30" viewBox="0 0 900 20" fill="none">
            <path d="M0,10 Q450,0 900,10" stroke="#D4AF37" strokeWidth="1.5" fill="none"/>
            <path d="M0,10 Q450,20 900,10" stroke="#D4AF37" strokeWidth="0.8" fill="none"/>
          </svg>
        </div>
      </div>

      {/* Featured Donation Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-90px" }}
        transition={{ duration: 0.8 }}
      >
        <DonationSection />
      </motion.div>
    </div>
  );
};

export default Index;

