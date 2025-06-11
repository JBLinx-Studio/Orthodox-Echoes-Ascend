
import { useState, useEffect } from 'react';
import { DeveloperLogin } from '@/components/dev/DeveloperLogin';
import { DeveloperDashboard } from '@/components/dev/DeveloperDashboard';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DeveloperPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if developer is already authenticated
    const devAccess = localStorage.getItem('orthodoxEchoesDeveloperAccess');
    const loginTime = localStorage.getItem('orthodoxEchoesDeveloperLoginTime');
    
    if (devAccess === 'true' && loginTime) {
      const timeElapsed = Date.now() - parseInt(loginTime);
      const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours
      
      if (timeElapsed < sessionDuration) {
        setIsAuthenticated(true);
      } else {
        // Session expired
        localStorage.removeItem('orthodoxEchoesDeveloperAccess');
        localStorage.removeItem('orthodoxEchoesDeveloperLoginTime');
      }
    }
    
    setIsLoading(false);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0d16] to-[#161a26] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Initializing developer portal...</p>
        </div>
      </div>
    );
  }

  // Back to Home button for both login and dashboard views
  const BackToHomeButton = () => (
    <div className="fixed top-4 left-4 z-50">
      <Button
        asChild
        variant="outline"
        size="sm"
        className="bg-[#1A1F2C]/80 backdrop-blur-sm border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/50"
      >
        <Link to="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
      </Button>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <>
        <BackToHomeButton />
        <DeveloperLogin onSuccess={handleLoginSuccess} />
      </>
    );
  }

  return (
    <>
      <BackToHomeButton />
      <DeveloperDashboard onLogout={handleLogout} />
    </>
  );
}
