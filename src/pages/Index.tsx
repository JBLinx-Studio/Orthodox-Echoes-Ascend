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

  // Cathedral-style blend for improved immersion
  const cathedralBlend = "glass-blend border-2 border-gold/25 shadow-xl ring-1 ring-gold/15 bg-gradient-to-br from-gold/7 via-byzantine/10 to-black/10 animate-fade-in";
  const goldGlowingCard = "cathedral-card glass-blend border-gold/20 shadow-xl animate-fade-in transition-all hover:scale-[1.045] hover:shadow-2xl hover:border-gold group";
  
  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        background:
          "radial-gradient(ellipse at 30% 0%, #D4AF371b 10%, transparent 48%), radial-gradient(ellipse at 95% 18%, #9B23351A 14%, transparent 56%), linear-gradient(135deg, #15182b 32%, #101725 90%, #150f1a 100%)",
        overflowX: "hidden",
      }}
    >
      {/* Cathedral Layered Glow */}
      <GlowOverlay color="gold" intensity="high" className="top-0 left-0 w-full h-[420px]" />
      <GlowOverlay color="byzantine" intensity="medium" className="left-0 top-1/3 w-[700px] h-[500px] opacity-20" />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-gold/20 via-transparent to-byzantine/10 blur-xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-full h-1/4 opacity-20 z-0">
          <svg viewBox="0 0 1200 200" preserveAspectRatio="none" width="100%" height="100%">
            <path d="M0,200 C290,80 910,80 1200,200 L1200,200 L0,200 Z" fill="#D4AF37" fillOpacity="0.12" />
          </svg>
        </div>
      </div>
      {/* Hero Section */}
      <HeroSection />

      {/* Enhanced Faith in Practice: glass-blend + gold border */}
      <motion.div className="relative z-10 -mt-28 md:mt-0 pb-16">
        <div className="container mx-auto px-4">
          <GlassBanner
            className={cathedralBlend + " bg-gradient-to-b from-gold/6 via-byzantine/9 to-byzantine/7 border-gold/25"}
          >
            <h2 className="font-display text-3xl md:text-4xl text-gold font-extrabold mb-2 tracking-tight drop-shadow glow-shadow">
              Faith in Practice
            </h2>
            <div className="inline-flex items-center gap-2 bg-byzantine/20 rounded-full px-6 py-2 shadow-md border border-gold/40 text-gold text-xs uppercase font-medium animate-pulse mb-2">
              ✦ Ancient Roots, Living Tradition ✦
            </div>
            <p className="text-white/80 text-medium max-w-xl mx-auto text-center mb-2 drop-shadow">
              Discover how Orthodox Christianity continues to transform lives through timeless wisdom and sacred traditions.
            </p>
          </GlassBanner>
        </div>
      </motion.div>

      {/* Faith in Practice "3-columns": cathedral blend, glass-morphism */}
      <motion.section
        className="py-12 relative"
        style={{
          background:
            "linear-gradient(120deg, #181d2e 68%, #1a1c29 100%)"
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <GlowOverlay color="gold" intensity="low" className="top-[22%] left-[9%] w-[230px] h-[160px]" />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-11 mb-14 transition-all">
            {/* Liturgical Calendar */}
            <motion.div
              variants={fadeInUp}
              className={goldGlowingCard + " bg-gradient-to-br from-gold/10 to-byzantine/10"}
              style={{
                background:
                  "linear-gradient(135deg, #221b33 70%, #2d1e3b 100%)",
              }}
            >
              <div className="w-14 h-14 rounded-full mb-3 flex items-center justify-center bg-gold/12 group-hover:bg-gold/30 border border-gold/30 shadow-inner animate-pulse">
                <Calendar className="h-8 w-8 text-gold drop-shadow" />
              </div>
              <h3 className="text-2xl font-display text-gold mb-2 font-bold drop-shadow">Liturgical Calendar</h3>
              <p className="text-white/80 mb-4">Follow the ancient rhythm of prayer, feast, and fast that guides Orthodox life throughout the year.</p>
              <Link to="/calendar"
                className="text-gold inline-flex items-center text-base hover:underline focus:outline-none transition-all"
              >
                View Calendar <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>

            {/* Lives of Saints */}
            <motion.div
              variants={fadeInUp}
              className={goldGlowingCard + " bg-gradient-to-br from-gold/15 to-gold/5"}
              style={{
                background:
                  "radial-gradient(circle at 70% 30%, #322b36 43%, #1f182a 100%)",
              }}
            >
              <div className="w-14 h-14 rounded-full mb-3 flex items-center justify-center bg-gold/12 group-hover:bg-gold/30 border border-gold/30 shadow-inner animate-pulse">
                <Users className="h-8 w-8 text-gold drop-shadow" />
              </div>
              <h3 className="text-2xl font-display text-gold mb-2 font-bold drop-shadow">Lives of Saints</h3>
              <p className="text-white/80 mb-4">Explore inspiring stories of holy men and women who exemplify the Orthodox path to sanctity.</p>
              <Link to="/saints"
                className="text-gold inline-flex items-center text-base hover:underline focus:outline-none transition-colors"
              >
                Meet the Saints <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>

            {/* Prayer Guide */}
            <motion.div
              variants={fadeInUp}
              className={goldGlowingCard + " bg-gradient-to-br from-byzantine/10 to-gold/15"}
              style={{
                background:
                  "radial-gradient(ellipse at top, #332b18 50%, #171728 100%)",
              }}
            >
              <div className="w-14 h-14 rounded-full mb-3 flex items-center justify-center bg-gold/12 group-hover:bg-gold/30 border border-gold/30 shadow-inner animate-pulse">
                <Bookmark className="h-8 w-8 text-gold drop-shadow" />
              </div>
              <h3 className="text-2xl font-display text-gold mb-2 font-bold drop-shadow">Prayer Guide</h3>
              <p className="text-white/80 mb-4">Learn traditional Orthodox prayers and develop a consistent prayer life with our comprehensive guide.</p>
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
