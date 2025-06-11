
import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { AudioProvider } from "./contexts/AudioContext";
import { AuthGuard } from "./components/auth/AuthGuard";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Callback from "./pages/Callback";
import Profile from "./pages/Profile";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import PrayerGuide from "./pages/PrayerGuide";
import CoreDoctrine from "./pages/CoreDoctrine";
import DailyReadings from "./pages/DailyReadings";
import LearningCenter from "./pages/LearningCenter";
import Saints from "./pages/Saints";
import SacredIconography from "./pages/SacredIconography";
import DeveloperPortal from "./pages/DeveloperPortal";
import "./styles/audioEffects.css";

// Create more visually appealing placeholder page with cathedral theme
const PlaceholderPage = ({ title }: { title: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    document.title = `${title} | Orthodox Echoes`;
    
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [title]);

  return (
    <div className="container mx-auto px-4 py-24 min-h-[80vh]">
      <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-gold/10 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-gold/20 flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-gold/30 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gold" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12 2L14.85 8.3L22 9.3L17 14.3L18.18 21.5L12 18.1L5.82 21.5L7 14.3L2 9.3L9.15 8.3L12 2Z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 rounded-full bg-gold/5 blur-xl animate-pulse"></div>
          </div>
        </div>
        
        <h1 className="orthodox-heading text-4xl md:text-5xl font-bold text-center mb-6">{title}</h1>
        
        <div className="byzantine-border bg-[#1A1F2C]/80 backdrop-blur-sm p-8 rounded-lg shadow-xl">
          <p className="text-lg text-white/70 mb-6 text-center">
            This section of our spiritual journey is currently being prepared with prayer and reverence. 
            Soon, you will find enriching content about {title.toLowerCase()} here.
          </p>
          
          <div className="flex flex-col items-center mt-8 mb-6">
            <div className="candle-effect relative mb-3">
              <div className="h-16 w-4 bg-gradient-to-t from-gold/70 to-white rounded-full"></div>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-6 h-12 bg-gradient-to-t from-gold/0 via-gold/50 to-gold/0 blur-md animate-flicker"></div>
            </div>
            
            <div className="prayer-fade-in text-gold italic mt-4 mb-6 max-w-xl text-center">
              "Through patience and prayer, all is revealed in God's divine timing."
            </div>
            
            <p className="text-sm text-white/50 text-center">
              We invite you to explore other sections of our website while this page is being illuminated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial loading animation - show Orthodox branding
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#1A1F2C] z-50">
        <div className="text-center">
          <div className="mb-8 relative">
            <div className="w-32 h-32 relative flex items-center justify-center mx-auto">
              {/* Orthodox Cross Animation */}
              <div className="absolute w-32 h-32">
                <div className="absolute inset-0 rounded-full border-2 border-gold/30 animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-2 border-byzantine/40 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
              </div>
              
              {/* Orthodox Cross SVG */}
              <svg className="w-16 h-16 text-gold relative z-10" viewBox="0 0 32 32" fill="currentColor">
                <g transform="translate(16,16)">
                  <rect x="-2" y="-12" width="4" height="24" rx="1"/>
                  <rect x="-8" y="-6" width="16" height="4" rx="1"/>
                  <rect x="-6" y="4" width="12" height="3" rx="1"/>
                  <circle cx="0" cy="-10" r="2" fill="#B8860B"/>
                  <path d="M-1,-8 L1,-8 L1,-6 L-1,-6 Z" fill="#B8860B"/>
                </g>
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full bg-gold/10 blur-xl animate-pulse"></div>
          </div>
          
          <h1 className="text-gold font-display text-4xl mb-2 animate-fade-in">Orthodox Echoes</h1>
          <p className="text-white/70 text-lg mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Ancient Wisdom for Modern Hearts
          </p>
          
          <div className="flex justify-center space-x-3">
            <div className="w-3 h-3 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AudioProvider>
          <Toaster />
          <Sonner />
          <HashRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<Blog />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/prayers" element={<PrayerGuide />} />
                <Route path="/doctrine" element={<CoreDoctrine />} />
                <Route path="/readings" element={<DailyReadings />} />
                <Route path="/learn" element={<LearningCenter />} />
                <Route path="/saints" element={<Saints />} />
                <Route path="/icons" element={<SacredIconography />} />
                <Route path="/calendar" element={<PlaceholderPage title="Liturgical Calendar" />} />
                <Route path="/chants" element={<PlaceholderPage title="Sacred Music" />} />
                <Route path="/community" element={<PlaceholderPage title="Orthodox Community" />} />
                <Route path="/support" element={<PlaceholderPage title="Support Our Mission" />} />
                <Route path="/articles" element={<PlaceholderPage title="Sacred Articles" />} />
                <Route path="/books" element={<PlaceholderPage title="Sacred Library" />} />
                <Route path="/liturgy" element={<PlaceholderPage title="Liturgical Life" />} />
                <Route path="/article/:id" element={<PlaceholderPage title="Article Details" />} />
                <Route path="/faq" element={<PlaceholderPage title="Frequently Asked Questions" />} />
                <Route path="/parishes" element={<PlaceholderPage title="Find a Parish" />} />
                <Route path="/settings" element={<PlaceholderPage title="User Settings" />} />
              </Route>
              
              <Route path="/login" element={<Login />} />
              <Route path="/callback" element={<Callback />} />
              <Route path="/developer" element={<DeveloperPortal />} />
              <Route path="/admin" element={
                <AuthGuard requireAdmin={true}>
                  <Admin />
                </AuthGuard>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </HashRouter>
        </AudioProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
