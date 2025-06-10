
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { isAuthenticated, isAdmin } from '@/utils/auth-utils';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  // Check if user is admin
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      const adminStatus = isAdmin();
      
      setIsAuthorized(authenticated && adminStatus);
      setIsLoading(false);
      
      if (!authenticated) {
        navigate('/login');
      } else if (!adminStatus) {
        toast.error("Access Denied", {
          description: "You do not have administrator privileges.",
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
          duration: 5000
        });
        navigate('/');
      }
    };
    
    // Check auth status
    checkAuth();
    
    // Listen for storage events (in case of logout elsewhere)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, [navigate]);

  // Show loading state with cathedral-themed styling
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0c111f] to-[#1A1F2C]">
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* Subtle cross pattern background */}
          <div className="absolute inset-0 bg-[url('/images/noise-pattern.png')] opacity-5"></div>
          
          {/* Orthodox pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                <pattern id="byzantine-cross" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M30,10 L30,50 M15,30 L45,30" stroke="#D4AF37" strokeWidth="2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#byzantine-cross)" />
            </svg>
          </div>
          
          {/* Cathedral light rays */}
          <div className="absolute top-0 left-1/3 w-20 h-screen bg-gold/3 -rotate-6 animate-pulse"></div>
          <div className="absolute top-0 right-1/4 w-32 h-screen bg-gold/2 rotate-12 animate-pulse"></div>
          
          {/* Enhanced candle glow effects */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-byzantine/20 rounded-full filter blur-[80px] opacity-40"></div>
        </div>
        
        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center"
        >
          <div className="relative flex items-center justify-center w-20 h-20 mx-auto mb-6">
            {/* Orthodox cross with glow */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-byzantine/80 to-byzantine-dark/80"></span>
            <span className="relative text-gold font-display font-bold text-4xl">☦</span>
            <span className="absolute inset-0 rounded-full bg-gold/10 animate-pulse"></span>
            
            {/* Candle effect */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-2 h-8 bg-gradient-to-t from-gold/80 via-gold/50 to-white/80 rounded-t-xl animate-[candle-flicker_4s_ease-in-out_infinite]"></div>
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-5 h-5 bg-gold/30 rounded-full blur-md animate-[flame-glow_4s_ease-in-out_infinite]"></div>
          </div>
          <p className="text-gold font-display text-xl mb-2">Entering the Sanctuary</p>
          <div className="flex justify-center space-x-3 mt-3">
            <div className="w-2 h-2 bg-gold/70 rounded-full animate-ping" style={{animationDelay: "0s", animationDuration: "1s"}}></div>
            <div className="w-2 h-2 bg-gold/70 rounded-full animate-ping" style={{animationDelay: "0.3s", animationDuration: "1s"}}></div>
            <div className="w-2 h-2 bg-gold/70 rounded-full animate-ping" style={{animationDelay: "0.6s", animationDuration: "1s"}}></div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="admin-layout min-h-screen bg-gradient-to-b from-[#0c111f] to-[#161a26]">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Cathedral background pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="cathedral-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 20h40M20 0v40" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
                <circle cx="20" cy="20" r="3" fill="none" stroke="#D4AF37" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cathedral-pattern)" />
          </svg>
        </div>
        
        {/* Subtle cathedral interior overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1508187542328-cd711238ae69?q=80&w=2070&auto=format&fit=crop)' }}
        ></div>
        
        {/* Cathedral dome overlay */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[400px] opacity-5">
          <svg viewBox="0 0 100 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,60 C30,0 70,0 100,60" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
            <path d="M10,60 C30,10 70,10 90,60" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
            <path d="M20,60 C30,20 70,20 80,60" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
            <path d="M30,60 C40,30 60,30 70,60" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
            <path d="M40,60 C45,40 55,40 60,60" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
          </svg>
        </div>
        
        {/* Light rays */}
        <div className="absolute top-0 left-1/4 w-16 h-screen bg-gold/5 -rotate-12 animate-pulse" style={{animationDuration: "12s"}}></div>
        <div className="absolute top-0 right-1/5 w-24 h-screen bg-byzantine/5 rotate-12 animate-pulse" style={{animationDuration: "15s"}}></div>
        
        {/* Candle effects */}
        <div className="absolute bottom-10 left-1/4 w-2 h-2 bg-gold/80 rounded-full animate-[candle-flicker_4s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-gold/70 rounded-full animate-[candle-flicker_5s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-40 left-1/2 w-2.5 h-2.5 bg-gold/60 rounded-full animate-[candle-flicker_6s_ease-in-out_infinite]"></div>
      </div>
      
      {children}
    </div>
  );
}
