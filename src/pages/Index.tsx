
import { useEffect, useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { FeaturedArticles } from "@/components/FeaturedArticles";
import { SaintsFeatured } from "@/components/SaintsFeatured";
import { PrayerOfTheDay } from "@/components/PrayerOfTheDay";
import { LiturgicalCalendar } from "@/components/LiturgicalCalendar";
import { DonationSection } from "@/components/DonationSection";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    // Enhanced loading with stagger effect
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Parallax effect for background
  const parallaxOffset = scrollPosition * 0.5;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced background with parallax */}
      <div 
        className="fixed inset-0 bg-gradient-to-br from-[#1A1F2C] via-[#2A1810] to-[#1A1F2C] -z-10"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      />
      
      {/* Animated grain overlay */}
      <div className="fixed inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none -z-10">
        <div className="absolute inset-0 bg-repeat animate-grain" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px'
        }} />
      </div>

      {/* Floating orthodox symbols */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute text-gold/5 animate-float-slow"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
              animationDelay: `${i * 2}s`,
              fontSize: `${2 + (i % 3)}rem`,
              transform: `translateY(${parallaxOffset * (0.2 + i * 0.1)}px)`
            }}
          >
            ☦
          </div>
        ))}
      </div>

      {/* Main content with enhanced animations */}
      <main className={`relative transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="animate-fade-in">
          <HeroSection />
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <FeaturesSection />
        </div>
        
        {/* Enhanced grid layout for featured content */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <FeaturedArticles />
              </div>
              <div className="space-y-8">
                <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                  <PrayerOfTheDay />
                </div>
                <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
                  <LiturgicalCalendar />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div className="animate-fade-in" style={{ animationDelay: '1s' }}>
          <SaintsFeatured />
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <DonationSection />
        </div>
      </main>

      {/* Scroll indicator */}
      <div className="fixed bottom-8 right-8 z-40">
        <div className="relative">
          <div 
            className="w-2 h-20 bg-gold/20 rounded-full overflow-hidden"
          >
            <div 
              className="bg-gradient-to-t from-gold to-gold/60 rounded-full transition-all duration-300"
              style={{ 
                height: `${Math.min(100, (scrollPosition / (document.documentElement.scrollHeight - window.innerHeight)) * 100)}%`,
                width: '100%'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
