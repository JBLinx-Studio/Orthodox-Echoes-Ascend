import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Search, 
  Menu, 
  X, 
  BookOpen, 
  Calendar, 
  Users,
  BookmarkIcon,
  Music,
  Edit,
  Image,
  Home,
  Info,
  Heart,
  ChevronDown,
  Feather,
  Library
} from 'lucide-react';
import { AudioPlayer } from '@/components/audio/AudioPlayer';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfileSection } from '@/components/layout/UserProfileSection';

const MainNavItem = ({
  children,
  href,
  active,
  className,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  href: string;
  active?: boolean;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <Link
      to={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-gold",
        active ? "text-gold" : "text-gray-200",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </Link>
  );
};

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Calculate scroll progress percentage
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Category definitions with icons - updated to reflect unified content
  const categories = [
    { name: "Sacred Content", path: "/blog", icon: <BookOpen className="h-5 w-5 mr-2" />, description: "Articles, blogs, and books" },
    { name: "Faith & Doctrine", path: "/doctrine", icon: <BookOpen className="h-5 w-5 mr-2" /> },
    { name: "Saints & Tradition", path: "/saints", icon: <Users className="h-5 w-5 mr-2" /> },
    { name: "Prayer & Worship", path: "/prayers", icon: <BookmarkIcon className="h-5 w-5 mr-2" /> },
    { name: "Sacred Arts", path: "/icons", icon: <Image className="h-5 w-5 mr-2" /> },
    { name: "Liturgical Life", path: "/calendar", icon: <Calendar className="h-5 w-5 mr-2" /> },
    { name: "Sacred Music", path: "/chants", icon: <Music className="h-5 w-5 mr-2" /> },
    { name: "Community", path: "/community", icon: <Heart className="h-5 w-5 mr-2" /> },
    { name: "About Us", path: "/about", icon: <Info className="h-5 w-5 mr-2" /> },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? "bg-[#1A1F2C]/95 backdrop-blur-md border-b border-gold/10 py-2" 
        : "bg-transparent py-4"
    )}>
      {/* Scroll progress indicator */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-gold" style={{ width: `${scrollProgress}%` }}></div>
      
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
          >
            <motion.div 
              className="relative flex items-center justify-center w-10 h-10"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-byzantine to-byzantine-dark shadow-lg"></span>
              <span className="relative text-white font-display font-bold text-xl">Ω</span>
              <span className="absolute inset-0 rounded-full bg-gold/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </motion.div>
            <div className="font-display text-xl font-semibold">
              <span className="text-white">Orthodox</span>
              <span className="text-gold ml-1">Echoes</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <MainNavItem href="/" active={location.pathname === '/'} className="px-3 py-2">
                    <Home className="w-4 h-4 mr-1 inline-block" />
                    Home
                  </MainNavItem>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-gray-200 hover:bg-gold/10 hover:text-gold">
                    Sacred Content
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex flex-col justify-end w-full h-full p-6 no-underline rounded-md outline-none select-none bg-gradient-to-b from-byzantine/20 to-byzantine/5 border border-byzantine/10 focus:shadow-md"
                            to="/blog"
                          >
                            <BookOpen className="h-6 w-6 text-byzantine mb-2" />
                            <div className="text-lg font-medium text-white mb-2">Content Library</div>
                            <p className="text-sm leading-tight text-gray-400">
                              Explore articles, blogs, and books all in one place
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/articles" title="Sacred Articles" icon={<Feather className="h-4 w-4 mr-2 text-gold" />}>
                        In-depth theological studies
                      </ListItem>
                      <ListItem href="/blog" title="Spiritual Blog" icon={<Edit className="h-4 w-4 mr-2 text-gold" />}>
                        Personal reflections and insights
                      </ListItem>
                      <ListItem href="/books" title="Sacred Library" icon={<Library className="h-4 w-4 mr-2 text-gold" />}>
                        Complete books and works
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-gray-200 hover:bg-gold/10 hover:text-gold">
                    Faith & Doctrine
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <ListItem href="/learn" title="Learning Center" icon={<BookOpen className="h-4 w-4 mr-2 text-gold" />}>
                        Your journey through Orthodox wisdom
                      </ListItem>
                      <ListItem href="/doctrine" title="Core Doctrine" icon={<BookOpen className="h-4 w-4 mr-2 text-gold" />}>
                        Foundational beliefs and theology
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
                        Byzantine and Slavic chant traditions
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <MainNavItem href="/community" active={location.pathname === '/community'} className="px-3 py-2">
                    Community
                  </MainNavItem>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <MainNavItem href="/contact" active={location.pathname === '/contact'} className="px-3 py-2">
                    Contact
                  </MainNavItem>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            {/* Include AudioPlayer component here */}
            <div className="ml-4">
              <AudioPlayer minimal={true} />
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-300 hover:text-gold hover:bg-gold/10"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
            
            {/* Replace user button with profile section */}
            <UserProfileSection />
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="lg:hidden text-gray-300 hover:text-gold hover:bg-gold/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="lg:hidden bg-[#1A1F2C]/95 backdrop-blur-md border-t border-gold/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="container px-4 py-5">
              <div className="space-y-4">
                <div className="flex items-center justify-center mb-4">
                  <AudioPlayer minimal={true} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <MainNavItem href="/" active={location.pathname === '/'} className="flex items-center py-2 text-base gold-hover-gleam" onClick={() => setIsMobileMenuOpen(false)}>
                    <Home className="h-5 w-5 mr-2" />
                    <span>Home</span>
                  </MainNavItem>
                  
                  {categories.map((category) => (
                    <div key={category.name}>
                      <MainNavItem
                        href={category.path}
                        active={location.pathname.startsWith(category.path)}
                        className="flex items-center py-2 text-base gold-hover-gleam"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {category.icon}
                        <span>{category.name}</span>
                      </MainNavItem>
                    </div>
                  ))}
                </div>
                
                {/* Quick links section */}
                <div className="mt-6 pt-4 border-t border-gold/10">
                  <h3 className="text-gold text-xs uppercase tracking-wider mb-3">Quick Links</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="border-gold/20 hover:bg-gold/5 text-white" asChild>
                      <Link to="/prayers">Today's Prayer</Link>
                    </Button>
                    <Button variant="outline" size="sm" className="border-gold/20 hover:bg-gold/5 text-white" asChild>
                      <Link to="/readings">Daily Reading</Link>
                    </Button>
                    <Button variant="outline" size="sm" className="border-gold/20 hover:bg-gold/5 text-white" asChild>
                      <Link to="/blog">Latest Content</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Page Breadcrumbs - shows when scrolled */}
      {isScrolled && location.pathname !== '/' && (
        <div className="container mx-auto px-4">
          <div className="text-xs text-gold/70 py-1 flex items-center">
            <Link to="/" className="hover:text-gold">Home</Link>
            <ChevronDown className="h-3 w-3 mx-1 rotate-270" />
            <span className="text-gold">{location.pathname.split('/')[1].charAt(0).toUpperCase() + location.pathname.split('/')[1].slice(1)}</span>
          </div>
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
