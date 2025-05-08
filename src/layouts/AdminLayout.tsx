
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

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0c111f] to-[#1A1F2C]">
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/noise-pattern.png')] opacity-5"></div>
          
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
          <div className="relative flex items-center justify-center w-16 h-16 mx-auto mb-4">
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-byzantine to-byzantine-dark opacity-80"></span>
            <span className="relative text-white font-display font-bold text-3xl">Ω</span>
            <span className="absolute inset-0 rounded-full bg-gold/20 animate-pulse"></span>
          </div>
          <p className="text-gold font-display text-xl">Entering the Sanctuary...</p>
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
        {/* Background pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 20h40M20 0v40" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern)" />
          </svg>
        </div>
        
        {/* Subtle cathedral interior overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1508187542328-cd711238ae69?q=80&w=2070&auto=format&fit=crop)' }}
        ></div>
        
        {/* Light rays */}
        <div className="absolute top-0 left-1/4 w-16 h-screen bg-gold/5 -rotate-12 animate-pulse" style={{animationDuration: "12s"}}></div>
        <div className="absolute top-0 right-1/5 w-24 h-screen bg-byzantine/5 rotate-12 animate-pulse" style={{animationDuration: "15s"}}></div>
      </div>
      
      {children}
    </div>
  );
}
