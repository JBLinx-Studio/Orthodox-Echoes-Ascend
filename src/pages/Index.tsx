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
import { GlassBanner } from '@/components/ui/GlassBanner';
import { GlowOverlay } from '@/components/ui/GlowOverlay';

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

  // New: Panel background blend
  const glassBlend = "backdrop-blur-2xl bg-gradient-to-br from-gold/5 via-[#1C1832]/45 to-byzantine/15 border-gold/25 border rounded-2xl shadow-xl ring-1 ring-gold/10";
  const glowingCard = "cathedral-card glass-blend animate-fade-in group hover:scale-[1.045] transition-all duration-300";
  
  return (
    <div className="min-h-screen flex flex-col relative"
      style={{ background: "linear-gradient(135deg, #15182b 32%, #101725 90%, #150f1a 100%)" }}>
      {/* Animated Glow Layered Cathedral Blend */}
      <GlowOverlay color="gold" intensity="high" className="top-0 left-0 w-full h-[390px]" />
      <GlowOverlay color="byzantine" intensity="medium" className="left-0 top-1/3 w-[600px] h-[420px] opacity-20" />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-gold/20 via-transparent to-byzantine/10 blur-xl animate-pulse" />
        {/* Dome/arches background blending */}
        <div className="absolute bottom-0 left-0 w-full h-1/4 opacity-15 z-0">
          <svg viewBox="0 0 1200 200" preserveAspectRatio="none" width="100%" height="100%">
            <path d="M0,200 C290,80 910,80 1200,200 L1200,200 L0,200 Z" fill="#D4AF37" fillOpacity="0.18" />
          </svg>
        </div>
      </div>
      {/* Hero Section */}
      <HeroSection />

      {/* Faith in Practice glassy mid-banner */}
      <motion.div className="relative z-10 -mt-24 md:mt-0 pb-20">
        <div className="container mx-auto px-4">
          <GlassBanner
            className="byzantine-border bg-gradient-to-b from-gold/5 to-byzantine/5 shadow-xl animate-fade-in"
          >
            <h2 className="font-display text-3xl md:text-4xl text-gold font-extrabold mb-2 tracking-tight">Faith in Practice</h2>
            <div className="inline-flex items-center gap-2 bg-byzantine/20 rounded-full px-6 py-2 shadow-md border border-gold/40 text-gold text-xs uppercase font-medium animate-pulse mb-2">
              ✦ Ancient Roots, Living Tradition ✦
            </div>
            <p className="text-white/80 text-medium max-w-xl mx-auto text-center mb-2">
              Discover how Orthodox Christianity continues to transform lives through timeless wisdom and sacred traditions.
            </p>
          </GlassBanner>
        </div>
      </motion.div>

      {/* Animated section: Faith in Practice grid */}
      <motion.section
        className="py-12 relative"
        style={{ background: "linear-gradient(120deg, #181d2e 70%, #1a1c29 100%)" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <GlowOverlay color="gold" intensity="low" className="top-[20%] left-[10%] w-[260px] h-[180px]" />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14 transition-all">
            <motion.div
              variants={fadeInUp}
              className={glowingCard + " relative border-2 border-gold/20 group"}
              style={{
                background: "linear-gradient(135deg, #221b33 70%, #2d1e3b 100%)",
                boxShadow: "0 6px 30px 0 rgba(212,175,55,0.09), 0 1.5px 7px 0 rgba(155,35,53,.06)"
              }}
            >
              <div className="w-14 h-14 rounded-full mb-3 flex items-center justify-center bg-gold/10 group-hover:bg-gold/30 group-hover:scale-110 transition-all animate-pulse border border-gold/30 shadow-inner">
                <Calendar className="h-8 w-8 text-gold drop-shadow" />
              </div>
              <h3 className="text-2xl font-display text-gold mb-2 font-bold">Liturgical Calendar</h3>
              <p className="text-white/70 mb-4">Follow the ancient rhythm of prayer, feast, and fast that guides Orthodox life throughout the year.</p>
              <Link to="/calendar"
                className="text-gold inline-flex items-center text-base hover:underline focus:outline-none transition-colors"
              >
                View Calendar <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className={glowingCard + " relative border-2 border-gold/30 group"}
              style={{
                background: "radial-gradient(circle at 70% 30%, #322b36 40%, #1f182a 100%)",
                boxShadow: "0 6px 34px 0 rgba(155,35,53,0.14), 0 1.5px 9px 0 rgba(212,175,55,.09)"
              }}
            >
              <div className="w-14 h-14 rounded-full mb-3 flex items-center justify-center bg-gold/10 group-hover:bg-gold/30 group-hover:scale-110 transition-all animate-pulse border border-gold/30 shadow-inner">
                <Users className="h-8 w-8 text-gold drop-shadow" />
              </div>
              <h3 className="text-2xl font-display text-gold mb-2 font-bold">Lives of Saints</h3>
              <p className="text-white/70 mb-4">Explore inspiring stories of holy men and women who exemplify the Orthodox path to sanctity.</p>
              <Link to="/saints"
                className="text-gold inline-flex items-center text-base hover:underline focus:outline-none transition-colors"
              >
                Meet the Saints <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className={glowingCard + " relative border-2 border-gold/30 group"}
              style={{
                background: "radial-gradient(ellipse at top, #332b18 50%, #171728 100%)",
                boxShadow: "0 8px 38px 0 rgba(212,175,55,0.13), 0 2px 15px 0 rgba(212,175,55,.08)"
              }}
            >
              <div className="w-14 h-14 rounded-full mb-3 flex items-center justify-center bg-gold/10 group-hover:bg-gold/30 group-hover:scale-110 transition-all animate-pulse border border-gold/30 shadow-inner">
                <Bookmark className="h-8 w-8 text-gold drop-shadow" />
              </div>
              <h3 className="text-2xl font-display text-gold mb-2 font-bold">Prayer Guide</h3>
              <p className="text-white/70 mb-4">Learn traditional Orthodox prayers and develop a consistent prayer life with our comprehensive guide.</p>
              <Link to="/prayers"
                className="text-gold inline-flex items-center text-base hover:underline focus:outline-none transition-colors"
              >
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
        viewport={{ once: true, margin: "-120px" }}
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
            <div className={"glass-morphism p-8 rounded-xl border-2 border-gold/15 shadow-xl relative overflow-hidden group bg-[#181c21]/80 animate-fade-in transition-all hover:border-gold/50"}>
              <h3 className="text-gold text-xl font-semibold mb-4 flex items-center">
                <Edit className="mr-2 h-5 w-5" />
                From Our Blog
              </h3>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="p-4 bg-[#10141d]/40 rounded-md border border-gold/15 hover:border-gold/45 transition-all shadow-inner">
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
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-gold/15 to-transparent blur-md opacity-80 animate-pulse" />
            </div>
            <GlassBanner className="bg-[#1a1c29]/88 border-2 border-gold/18 animate-fade-in transition-all shadow-md">
              <PrayerOfTheDay />
            </GlassBanner>
            <GlassBanner className="bg-[#1a1c29]/88 border-2 border-gold/15 animate-fade-in transition-all shadow-md">
              <LiturgicalCalendar />
            </GlassBanner>
            <div className="glass-morphism p-8 rounded-xl border-2 border-gold/14 shadow-xl bg-[#191c2d]/85">
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
