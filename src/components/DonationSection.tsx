import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function DonationSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden byzantine-border glass-blend border-2 border-gold/20 shadow-xl rounded-2xl bg-gradient-to-br from-gold/8 via-card/80 to-byzantine/4">
          {/* Gold glow and byzantine overlay */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-44 h-44 bg-gold/13 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-9 -ml-10 w-44 h-44 bg-byzantine/12 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 py-10 px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="orthodox-heading text-2xl md:text-3xl font-extrabold text-gold/90 mb-4 drop-shadow">Support Our Mission</h2>
              <p className="text-white/80 mb-6">
                Your generous contribution helps us maintain this resource and continue sharing the depths of Orthodox wisdom with seekers around the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-byzantine hover:bg-byzantine-dark text-white font-bold">
                  <a href="https://www.buymeacoffee.com" target="_blank" rel="noopener noreferrer">
                    Buy Me a Coffee
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold/10 font-semibold">
                  <Link to="/support">Other Ways to Support</Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-[#2a233518] p-6 rounded-lg glass-blend border border-gold/17 shadow-inner">
              <h3 className="font-display text-xl font-medium mb-4 text-byzantine">How Your Support Helps</h3>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-gold/16 flex items-center justify-center mt-1">
                    <span className="text-gold font-bold text-xs">✓</span>
                  </div>
                  <span>Creating new educational content and resources</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-gold/16 flex items-center justify-center mt-1">
                    <span className="text-gold font-bold text-xs">✓</span>
                  </div>
                  <span>Maintaining and improving our website</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-gold/16 flex items-center justify-center mt-1">
                    <span className="text-gold font-bold text-xs">✓</span>
                  </div>
                  <span>Supporting Orthodox ministries and projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-gold/16 flex items-center justify-center mt-1">
                    <span className="text-gold font-bold text-xs">✓</span>
                  </div>
                  <span>Translating materials into multiple languages</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
