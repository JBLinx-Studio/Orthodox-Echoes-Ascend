
import { Link } from 'react-router-dom';
import { Mail, Church, Heart, FileText, Settings, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-orthodox-deepblue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-byzantine"></span>
                <span className="relative text-white font-display font-bold text-lg">Ω</span>
              </div>
              <span className="font-display text-xl font-bold">Orthodox Echoes</span>
            </Link>
            <p className="text-sm text-gray-300 mb-4">
              Exploring the ancient traditions and timeless wisdom of Eastern Orthodoxy.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gold transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gold transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gold transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-display text-lg font-semibold mb-4 text-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/learn" className="text-gray-300 hover:text-gold transition-colors">Learn</Link></li>
              <li><Link to="/doctrine" className="text-gray-300 hover:text-gold transition-colors">Doctrine</Link></li>
              <li><Link to="/saints" className="text-gray-300 hover:text-gold transition-colors">Saints</Link></li>
              <li><Link to="/calendar" className="text-gray-300 hover:text-gold transition-colors">Liturgical Calendar</Link></li>
              <li><Link to="/community" className="text-gray-300 hover:text-gold transition-colors">Community</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-display text-lg font-semibold mb-4 text-gold">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/prayers" className="text-gray-300 hover:text-gold transition-colors">Prayer Guide</Link></li>
              <li><Link to="/icons" className="text-gray-300 hover:text-gold transition-colors">Iconography</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-gold transition-colors">FAQs</Link></li>
              <li><Link to="/readings" className="text-gray-300 hover:text-gold transition-colors">Daily Readings</Link></li>
              <li><Link to="/support" className="text-gray-300 hover:text-gold transition-colors">Support Our Work</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-display text-lg font-semibold mb-4 text-gold">Subscribe</h3>
            <p className="text-sm text-gray-300 mb-4">
              Receive updates on our latest content and news.
            </p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-transparent border-orthodox-blue focus:border-gold"
              />
              <Button className="w-full bg-byzantine hover:bg-byzantine-dark">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-orthodox-blue">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/contact" className="text-sm text-gray-300 hover:text-gold flex items-center gap-1">
                <Mail className="h-4 w-4" /> Contact
              </Link>
              <Link to="/parishes" className="text-sm text-gray-300 hover:text-gold flex items-center gap-1">
                <Church className="h-4 w-4" /> Find a Parish
              </Link>
              
              {/* Enhanced Settings Button */}
              <Link to="/settings" className="text-sm text-white hover:text-gold/80 flex items-center gap-1 bg-gold/20 hover:bg-gold/30 px-3 py-1.5 rounded-md border border-gold/30 transition-all shadow-lg">
                <Settings className="h-4 w-4" /> Settings
              </Link>
              
              {/* Enhanced Developer Dashboard Button */}
              <Link to="/developer" className="text-sm text-gold hover:text-gold/80 flex items-center gap-1 bg-gold/30 hover:bg-gold/40 px-3 py-1.5 rounded-md border border-gold/40 transition-all shadow-lg">
                <Shield className="h-4 w-4" /> Dev Dashboard
              </Link>
              
              <a href="/LICENSE.md" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-gold flex items-center gap-1">
                <FileText className="h-4 w-4" /> License
              </a>
              <a href="https://www.buymeacoffee.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-gold flex items-center gap-1">
                <Heart className="h-4 w-4" /> Support
              </a>
            </div>
            <div className="text-sm text-gray-400 flex flex-col md:flex-row items-center gap-2">
              <span>© {currentYear} Orthodox Echoes. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="text-gold">Created by JBLinx Studio</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
