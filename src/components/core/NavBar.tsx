
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { AudioPlayer } from '../AudioPlayer';
import { useIsMobile } from '@/hooks/use-mobile';

const MENU_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'Learn', path: '/learn' },
  { name: 'Doctrine', path: '/doctrine' },
  { name: 'Saints', path: '/saints' },
  { name: 'Calendar', path: '/calendar' },
  { name: 'Community', path: '/community' },
  { name: 'Support', path: '/support' },
];

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePath, setActivePath] = useState('/');
  const isMobile = useIsMobile();

  useEffect(() => {
    setActivePath(window.location.pathname);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500",
        scrolled 
          ? "bg-black/90 backdrop-blur-xl border-b border-gold/30 shadow-2xl py-2" 
          : "bg-gradient-to-b from-black/80 via-black/60 to-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-byzantine to-byzantine-dark shadow-2xl group-hover:shadow-gold/50 transition-all duration-300"></div>
                <span className="relative text-white font-display font-bold text-2xl filter drop-shadow-lg">Ω</span>
                <div className="absolute inset-0 rounded-full bg-gold/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="font-display text-2xl font-bold">
                <span className="text-white group-hover:text-gold transition-colors duration-300">Orthodox</span>
                <span className="text-gold ml-1">Echoes</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "relative text-lg font-medium transition-all duration-300 hover:text-gold",
                  "before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-gold before:transition-all before:duration-300 hover:before:w-full",
                  activePath === item.path 
                    ? "text-gold before:w-full" 
                    : "text-white/90"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {!isMobile && <AudioPlayer />}
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white/80 hover:text-gold hover:bg-gold/10 transition-all duration-300" 
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white/80 hover:text-gold hover:bg-gold/10 transition-all duration-300" 
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="md:hidden text-white/80 hover:text-gold hover:bg-gold/10 transition-all duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-gold/20 animate-fade-in">
          <div className="container mx-auto px-4 py-6">
            <nav className="flex flex-col space-y-6">
              {MENU_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "text-xl font-medium py-3 border-b border-gold/10 transition-all duration-300",
                    activePath === item.path ? "text-gold" : "text-white hover:text-gold"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {isMobile && (
                <div className="py-4 flex justify-center">
                  <AudioPlayer />
                </div>
              )}
            </nav>
            <div className="mt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gold/60" />
                <Input
                  type="search"
                  placeholder="Search sacred texts..."
                  className="pl-10 bg-black/50 border-gold/30 text-white placeholder:text-gray-400 focus:border-gold"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
