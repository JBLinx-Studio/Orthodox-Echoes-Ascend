
import { Book, Calendar, Church, Heart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const FEATURES = [
  {
    icon: Book,
    title: 'Rich Learning Resources',
    description: 'Explore in-depth articles, videos, and guides on Orthodox theology, history, and practices.',
    link: '/learn'
  },
  {
    icon: Church,
    title: 'Liturgical Life',
    description: 'Understand the beauty and meaning behind Orthodox liturgical traditions and worship.',
    link: '/liturgy'
  },
  {
    icon: Calendar,
    title: 'Orthodox Calendar',
    description: 'Stay updated with feast days, saints commemorations, and fasting periods throughout the year.',
    link: '/calendar'
  },
  {
    icon: Users,
    title: 'Community Connection',
    description: 'Connect with fellow seekers and believers in our online Orthodox community.',
    link: '/community'
  },
  {
    icon: Heart,
    title: 'Support Our Mission',
    description: 'Help us continue spreading Orthodox teachings through your generous donations.',
    link: '/support'
  }
];

export function FeaturesSection() {
  return (
    <section className="py-16 bg-orthodox-blue text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display text-3xl font-bold mb-4 text-gold">What We Offer</h2>
          <p className="text-lg text-gray-300">
            Discover the many resources and opportunities available to deepen your understanding of Orthodox Christianity.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <div 
              key={index} 
              className="bg-orthodox-deepblue p-6 rounded-lg border border-gold/20 hover:border-gold/50 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-byzantine rounded-full flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2 text-gold">{feature.title}</h3>
              <p className="text-gray-300 mb-4">{feature.description}</p>
              <Button asChild variant="link" className="text-gold hover:text-gold/80 p-0">
                <Link to={feature.link}>Learn more →</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
