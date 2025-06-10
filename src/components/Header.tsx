
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, X, User, LogOut, Settings, BookOpen, 
  Heart, MessageSquare, Calendar, Music, Users,
  Crown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCurrentUser, logout } from '@/utils/auth-utils';
import { toast } from 'sonner';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error checking user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error logging out');
    }
  };

  const navigationItems = [
    { label: 'Home', href: '/', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'Blog', href: '/blog', icon: <MessageSquare className="w-4 h-4" /> },
    { label: 'Saints', href: '/saints', icon: <Heart className="w-4 h-4" /> },
    { label: 'Prayers', href: '/prayers', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'Calendar', href: '/calendar', icon: <Calendar className="w-4 h-4" /> },
    { label: 'Community', href: '/community', icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1A1F2C]/95 backdrop-blur-md border-b border-gold/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center group-hover:bg-gold/30 transition-colors">
                <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.85 8.3L22 9.3L17 14.3L18.18 21.5L12 18.1L5.82 21.5L7 14.3L2 9.3L9.15 8.3L12 2Z"/>
                </svg>
              </div>
              <div className="absolute inset-0 rounded-full bg-gold/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div>
              <h1 className="text-xl font-display text-gold group-hover:text-gold/90 transition-colors">
                Orthodox Echoes
              </h1>
              <p className="text-xs text-white/60">Ancient Wisdom</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center space-x-2 text-white/80 hover:text-gold transition-colors group"
              >
                <span className="group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Developer Portal Link (Always visible) */}
            <Link to="/developer">
              <Button variant="ghost" size="sm" className="text-gold hover:text-gold/80">
                <Crown className="w-4 h-4 mr-1" />
                Dev Portal
              </Button>
            </Link>

            {!isLoading && (
              <>
                {user ? (
                  <div className="flex items-center space-x-3">
                    <div className="hidden md:flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                        <User className="w-4 h-4 text-gold" />
                      </div>
                      <span className="text-white/80 text-sm">
                        {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="border-gold/30 text-gold hover:bg-gold/10">
                      Sign In
                    </Button>
                  </Link>
                )}
              </>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4 border-t border-gold/20"
            >
              <div className="flex flex-col space-y-3 mt-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="flex items-center space-x-3 text-white/80 hover:text-gold transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
                
                {/* Mobile Developer Portal Link */}
                <Link
                  to="/developer"
                  className="flex items-center space-x-3 text-gold hover:text-gold/80 transition-colors py-2 border-t border-gold/20 pt-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Crown className="w-4 h-4" />
                  <span>Developer Portal</span>
                </Link>

                {user && (
                  <div className="border-t border-gold/20 pt-4">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 text-white/80 hover:text-gold transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                  </div>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
