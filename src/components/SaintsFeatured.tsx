
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const FEATURED_SAINTS = [
  {
    name: "St. John Chrysostom",
    title: "The Golden-Mouthed",
    dates: "c. 347-407 AD",
    icon: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=500&q=80",
    description: "Archbishop of Constantinople, renowned for his preaching and public speaking, as well as his denunciation of abuse of authority in the Church and government.",
    feast: "November 13",
    quote: "In the matter of piety, poverty serves us better than wealth, and work better than idleness, especially since wealth becomes an obstacle even for those who do not devote themselves to it."
  },
  {
    name: "St. Mary of Egypt",
    title: "The Repentant",
    dates: "c. 344-421 AD",
    icon: "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?w=500&q=80",
    description: "A desert ascetic who, after a life of sin, repented and spent 47 years in solitude, becoming one of the most revered female saints in Eastern Orthodoxy.",
    feast: "April 1",
    quote: "Having been a sinful woman, I now cling wholly to God. I am not trustworthy in my own judgment, but the Lord has taken pity on my soul."
  },
  {
    name: "St. Gregory Palamas",
    title: "Archbishop of Thessalonica",
    dates: "1296-1359 AD",
    icon: "https://images.unsplash.com/photo-1507651195142-3a14adc4a1f8?w=500&q=80",
    description: "Monk, theologian, and defender of Hesychasm—the practice of inner stillness and repetitive prayer that leads to knowledge of God.",
    feast: "Second Sunday of Great Lent",
    quote: "The knowledge of created things is one thing, and that of divine things another; the latter surpasses the former as much as the sun outshines the stars."
  }
];

export function SaintsFeatured() {
  const [activeSaint, setActiveSaint] = useState(0);
  
  return (
    <section className="relative py-20 overflow-hidden">
      {/* New layered gold/gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/13 via-[#1A1F2C] to-byzantine/9" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNEMUFGMzYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINHY0SDB2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10 bg-repeat"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h6 className="text-gold font-medium text-sm mb-2 tracking-wider uppercase">Lives of the Saints</h6>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white drop-shadow mb-4 glow-shadow">Holy Inspirations</h2>
          <div className="h-1 w-20 bg-byzantine/55 mx-auto rounded"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-9">
          {FEATURED_SAINTS.map((saint, index) => (
            <Card 
              key={index}
              className={`overflow-hidden group transition duration-500 shadow-xl border-2
                ${index === activeSaint 
                  ? 'bg-gold/16 border-gold-strong ring-2 ring-gold/50 shadow-gold/20' 
                  : 'bg-[#232233]/45 border-gold/11 hover:bg-gold/7 hover:border-gold/35'}
              `}
              onClick={() => setActiveSaint(index)}
              style={{
                cursor: "pointer",
                filter: index === activeSaint ? "brightness(1.07)" : undefined,
              }}
            >
              <div className="aspect-[3/2] overflow-hidden relative animate-fade-in">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{backgroundImage: `url(${saint.icon})`}}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C] to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-2xl font-bold text-white mb-1">{saint.name}</h3>
                  <p className="text-gold/95 text-sm">{saint.title} • {saint.dates}</p>
                </div>
              </div>
              
              <div className="p-5">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <span className="text-sm text-white/70">Feast Day:</span>
                    <span className="ml-2 text-gold font-bold">{saint.feast}</span>
                  </div>
                  {index === activeSaint && (
                    <span className="inline-block px-2 py-1 bg-byzantine/20 border border-byzantine/35 rounded-full text-xs text-byzantine-light">
                      Featured
                    </span>
                  )}
                </div>
                
                <p className="text-white/80 text-sm mb-4">{saint.description}</p>
                
                <blockquote className="border-l-2 border-gold/50 pl-4 italic text-base text-white/90 mb-4">
                  "{saint.quote}"
                </blockquote>
                
                <Button asChild variant="outline" size="sm" className="w-full mt-2 border-gold/60 text-gold hover:bg-gold/10">
                  <Link to="/saints" className="flex items-center justify-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Read Full Life
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold/10 px-8 font-semibold shadow">
            <Link to="/saints">Explore All Saints</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

