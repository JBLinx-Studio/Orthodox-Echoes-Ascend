
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { AudioPlayer } from './AudioPlayer';
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

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePath, setActivePath] = useState('/');
  const isMobile = useIsMobile();

  useEffect(() => {
    setActivePath(window.location.pathname);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-background/95 backdrop-blur-sm shadow-md" : "bg-background"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-byzantine"></span>
                <span className="relative text-white font-display font-bold text-lg">Ω</span>
              </div>
              <span className="font-display text-xl font-bold hidden sm:block">Orthodox Echoes</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "nav-link",
                  activePath === item.path && "active-nav-link"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {!isMobile && <AudioPlayer />}
            
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="mr-1" aria-label="Search">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {MENU_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "text-lg font-medium py-2 border-b border-border",
                    activePath === item.path ? "text-byzantine" : "text-foreground"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {isMobile && (
                <div className="py-3 flex justify-center">
                  <AudioPlayer />
                </div>
              )}
            </nav>
            <div className="mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
