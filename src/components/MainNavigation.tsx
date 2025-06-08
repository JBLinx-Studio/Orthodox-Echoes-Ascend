import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Search, 
  User, 
  Menu, 
  X, 
  BookOpen, 
  Calendar, 
  Users,
  BookmarkIcon,
  Music,
  Edit,
  Image
} from 'lucide-react';
import { AudioControls } from '@/components/AudioControls';

const MainNavItem = ({
  children,
  href,
  active,
  className,
  ...props
}: {
  children: React.ReactNode;
  href: string;
  active?: boolean;
  className?: string;
}) => {
  return (
    <Link
      to={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-gold",
        active ? "text-gold" : "text-gray-200",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export function MainNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? "bg-[#1A1F2C]/95 backdrop-blur-md border-b border-gold/10 py-2" 
        : "bg-transparent py-4"
    )}>
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
          >
            <div className="relative flex items-center justify-center w-10 h-10">
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-byzantine to-byzantine-dark shadow-lg"></span>
              <span className="relative text-white font-display font-bold text-xl">Ω</span>
              <span className="absolute inset-0 rounded-full bg-gold/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </div>
            <div className="font-display text-xl font-semibold">
              <span className="text-white">Orthodox</span>
              <span className="text-gold ml-1">Echoes</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <AudioControls />
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-gray-200 hover:bg-gold/10 hover:text-gold">
                    Faith & Doctrine
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex flex-col justify-end w-full h-full p-6 no-underline rounded-md outline-none select-none bg-gradient-to-b from-byzantine/20 to-byzantine/5 border border-byzantine/10 focus:shadow-md"
                            to="/doctrine"
                          >
                            <BookOpen className="h-6 w-6 text-byzantine mb-2" />
                            <div className="text-lg font-medium text-white mb-2">Core Doctrine</div>
                            <p className="text-sm leading-tight text-gray-400">
                              Explore the foundational beliefs and theology of Orthodox Christianity
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/learn" title="Learning Center" icon={<BookOpen className="h-4 w-4 mr-2 text-gold" />}>
                        Your journey through Orthodox wisdom
                      </ListItem>
                      <ListItem href="/readings" title="Daily Readings" icon={<Calendar className="h-4 w-4 mr-2 text-gold" />}>
                        Scripture and saints of the day
                      </ListItem>
                      <ListItem href="/prayers" title="Prayer Guide" icon={<BookmarkIcon className="h-4 w-4 mr-2 text-gold" />}>
                        Ancient prayers for daily life
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-gray-200 hover:bg-gold/10 hover:text-gold">
                    Tradition
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <ListItem href="/saints" title="Lives of Saints" icon={<Users className="h-4 w-4 mr-2 text-gold" />}>
                        Stories of holiness through the ages
                      </ListItem>
                      <ListItem href="/icons" title="Sacred Iconography" icon={<Image className="h-4 w-4 mr-2 text-gold" />}>
                        Windows into heaven
                      </ListItem>
                      <ListItem href="/calendar" title="Liturgical Calendar" icon={<Calendar className="h-4 w-4 mr-2 text-gold" />}>
                        The rhythm of Orthodox life
                      </ListItem>
                      <ListItem href="/chants" title="Sacred Music" icon={<Music className="h-4 w-4 mr-2 text-gold" />}>
                        Byzantine and Slavonic chant traditions
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-gray-200 hover:bg-gold/10 hover:text-gold">
                    Community
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <ListItem href="/community" title="Community Forum" icon={<Users className="h-4 w-4 mr-2 text-gold" />}>
                        Connect with fellow Orthodox believers
                      </ListItem>
                      <ListItem href="/parishes" title="Find a Parish" icon={<BookmarkIcon className="h-4 w-4 mr-2 text-gold" />}>
                        Locate Orthodox communities near you
                      </ListItem>
                      <ListItem href="/blog" title="Articles & Blog" icon={<Edit className="h-4 w-4 mr-2 text-gold" />}>
                        Spiritual writings and reflections
                      </ListItem>
                      <ListItem href="/support" title="Support Our Mission" icon={<Users className="h-4 w-4 mr-2 text-gold" />}>
                        Help spread Orthodox wisdom
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <MainNavItem href="/contact" active={location.pathname === '/contact'} className="px-3 py-2">
                    Contact
                  </MainNavItem>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          {/* Action buttons with audio controls for mobile */}
          <div className="flex items-center gap-2">
            <div className="md:hidden">
              <AudioControls />
            </div>
            
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-gold hover:bg-gold/10">
              <Search className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-gold hover:bg-gold/10">
              <User className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden text-gray-300 hover:text-gold hover:bg-gold/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1A1F2C]/95 backdrop-blur-md border-t border-gold/10 animate-fade-in">
          <nav className="container px-4 py-5">
            <div className="space-y-6">
              <div>
                <h3 className="text-gold font-display text-sm mb-3">FAITH & DOCTRINE</h3>
                <ul className="space-y-3">
                  <li>
                    <Link to="/doctrine" className="flex items-center text-gray-200 hover:text-gold" onClick={() => setIsMobileMenuOpen(false)}>
                      <BookOpen className="h-4 w-4 mr-2" />
                      <span>Core Doctrine</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/learn" className="flex items-center text-gray-200 hover:text-gold" onClick={() => setIsMobileMenuOpen(false)}>
                      <BookOpen className="h-4 w-4 mr-2" />
                      <span>Learning Center</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/readings" className="flex items-center text-gray-200 hover:text-gold" onClick={() => setIsMobileMenuOpen(false)}>
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Daily Readings</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/prayers" className="flex items-center text-gray-200 hover:text-gold" onClick={() => setIsMobileMenuOpen(false)}>
                      <BookmarkIcon className="h-4 w-4 mr-2" />
                      <span>Prayer Guide</span>
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-gold font-display text-sm mb-3">TRADITION</h3>
                <ul className="space-y-3">
                  <li>
                    <Link to="/saints" className="flex items-center text-gray-200 hover:text-gold" onClick={() => setIsMobileMenuOpen(false)}>
                      <Users className="h-4 w-4 mr-2" />
                      <span>Lives of Saints</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/icons" className="flex items-center text-gray-200 hover:text-gold" onClick={() => setIsMobileMenuOpen(false)}>
                      <Image className="h-4 w-4 mr-2" />
                      <span>Sacred Iconography</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/calendar" className="flex items-center text-gray-200 hover:text-gold" onClick={() => setIsMobileMenuOpen(false)}>
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Liturgical Calendar</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/chants" className="flex items-center text-gray-200 hover:text-gold" onClick={() => setIsMobileMenuOpen(false)}>
                      <Music className="h-4 w-4 mr-2" />
                      <span>Sacred Music</span>
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-gold font-display text-sm mb-3">COMMUNITY</h3>
                <ul className="space-y-3">
                  <li>
                    <Link to="/community" className="flex items-center text-gray-200 hover:text-gold" onClick={() => setIsMobileMenuOpen(false)}>
                      <Users className="h-4 w-4 mr-2" />
                      <span>Community Forum</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/parishes" className="flex items-center text-gray-200 hover:text-gold" onClick={() => setIsMobileMenuOpen(false)}>
                      <BookmarkIcon className="h-4 w-4 mr-2" />
                      <span>Find a Parish</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="flex items-center text-gray-200 hover:text-gold" onClick={() => setIsMobileMenuOpen(false)}>
                      <Edit className="h-4 w-4 mr-2" />
                      <span>Articles & Blog</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="flex items-center text-gray-200 hover:text-gold" onClick={() => setIsMobileMenuOpen(false)}>
                      <Users className="h-4 w-4 mr-2" />
                      <span>Contact Us</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

// Component for navigation menu items
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gold/10 hover:text-gold focus:bg-gold/10 focus:text-gold",
            className
          )}
          {...props}
        >
          <div className="flex items-center text-sm font-medium leading-none text-white">
            {icon}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-400">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
