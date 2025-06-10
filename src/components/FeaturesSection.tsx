
import { Book, Calendar, Church, Heart, Users, FileText, BookOpen, Scroll, Crown, Feather, Library } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { OrthodoxIconFrame } from '@/components/ui/orthodox-icon-frame';

const CONTENT_FEATURES = [
  {
    icon: Feather,
    title: 'Sacred Articles',
    description: 'In-depth theological studies, doctrinal explanations, and scholarly discourse on Orthodox Christianity.',
    link: '/articles',
    gradient: 'from-gold/20 to-byzantine/10',
    iconColor: 'text-gold'
  },
  {
    icon: Scroll,
    title: 'Spiritual Blog',
    description: 'Personal reflections, contemporary insights, and spiritual guidance for modern Orthodox living.',
    link: '/blog',
    gradient: 'from-byzantine/20 to-gold/10',
    iconColor: 'text-byzantine'
  },
  {
    icon: Library,
    title: 'Sacred Library',
    description: 'Complete books, manuscripts, and comprehensive works on Orthodox theology and tradition.',
    link: '/books',
    gradient: 'from-gold/15 to-byzantine/15',
    iconColor: 'text-gold'
  }
];

const SPIRITUAL_FEATURES = [
  {
    icon: Church,
    title: 'Liturgical Life',
    description: 'Understand the beauty and meaning behind Orthodox liturgical traditions and worship.',
    link: '/liturgy',
    gradient: 'from-byzantine/10 to-gold/5',
    iconColor: 'text-byzantine'
  },
  {
    icon: Calendar,
    title: 'Orthodox Calendar',
    description: 'Stay updated with feast days, saints commemorations, and fasting periods throughout the year.',
    link: '/calendar',
    gradient: 'from-gold/10 to-byzantine/5',
    iconColor: 'text-gold'
  },
  {
    icon: Crown,
    title: 'Lives of Saints',
    description: 'Discover the holy lives and teachings of Orthodox saints throughout history.',
    link: '/saints',
    gradient: 'from-byzantine/15 to-gold/10',
    iconColor: 'text-byzantine'
  }
];

const COMMUNITY_FEATURES = [
  {
    icon: Users,
    title: 'Orthodox Community',
    description: 'Connect with fellow seekers and believers in our global Orthodox community.',
    link: '/community',
    gradient: 'from-gold/10 to-byzantine/10',
    iconColor: 'text-gold'
  },
  {
    icon: Heart,
    title: 'Support Our Mission',
    description: 'Help us continue spreading Orthodox teachings through your generous support.',
    link: '/support',
    gradient: 'from-byzantine/10 to-gold/10',
    iconColor: 'text-byzantine'
  }
];

export function FeaturesSection() {
  return (
    <section className="py-24 relative">
      {/* Enhanced Byzantine background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d16] via-[#111725] to-[#0a0d16]"></div>
      <div className="absolute inset-0 bg-[url('/images/byzantine-pattern.svg')] opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Royal header section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="flex justify-center mb-6">
            <OrthodoxIconFrame frameType="cathedral" withGlow={true} className="p-4">
              <Crown className="w-12 h-12 text-gold" />
            </OrthodoxIconFrame>
          </div>
          
          <h2 className="orthodox-heading text-4xl md:text-5xl font-bold mb-6 text-gold">
            Sacred Resources & Wisdom
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed font-body">
            Discover the profound depths of Orthodox Christianity through our carefully curated collection 
            of scholarly articles, spiritual reflections, and sacred texts.
          </p>
        </div>
        
        {/* Content Library Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mb-4">
              Sacred Content Library
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore our comprehensive collection of Orthodox Christian literature and spiritual guidance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CONTENT_FEATURES.map((feature, index) => (
              <div 
                key={index} 
                className="cathedral-card group hover:transform hover:scale-105 transition-all duration-500"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
                
                <div className="relative p-8">
                  <div className="flex justify-center mb-6">
                    <OrthodoxIconFrame frameType="ornate" withGlow={true} className="p-3">
                      <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                    </OrthodoxIconFrame>
                  </div>
                  
                  <h3 className="font-display text-xl font-bold mb-4 text-center text-gold group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 mb-6 text-center leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="text-center">
                    <Button 
                      asChild 
                      variant="outline" 
                      className="border-gold/30 hover:bg-gold/10 hover:border-gold text-gold hover:text-white transition-all duration-300"
                    >
                      <Link to={feature.link} className="flex items-center gap-2">
                        Explore Collection
                        <BookOpen className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Spiritual Life Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mb-4">
              Spiritual Life & Tradition
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Immerse yourself in the rich traditions and spiritual practices of Orthodox Christianity
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SPIRITUAL_FEATURES.map((feature, index) => (
              <div 
                key={index} 
                className="cathedral-card group hover:transform hover:scale-105 transition-all duration-500"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
                
                <div className="relative p-8">
                  <div className="flex justify-center mb-6">
                    <OrthodoxIconFrame frameType="simple" withGlow={true} className="p-3">
                      <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                    </OrthodoxIconFrame>
                  </div>
                  
                  <h3 className="font-display text-xl font-bold mb-4 text-center text-gold group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 mb-6 text-center leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="text-center">
                    <Button 
                      asChild 
                      variant="ghost" 
                      className="text-gold hover:text-white hover:bg-gold/10 transition-all duration-300"
                    >
                      <Link to={feature.link}>
                        Learn more →
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Community & Support Section */}
        <div>
          <div className="text-center mb-12">
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mb-4">
              Community & Mission
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join our growing community and help spread Orthodox wisdom throughout the world
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {COMMUNITY_FEATURES.map((feature, index) => (
              <div 
                key={index} 
                className="cathedral-card group hover:transform hover:scale-105 transition-all duration-500"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
                
                <div className="relative p-8">
                  <div className="flex justify-center mb-6">
                    <OrthodoxIconFrame frameType="cathedral" withGlow={true} className="p-3">
                      <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                    </OrthodoxIconFrame>
                  </div>
                  
                  <h3 className="font-display text-xl font-bold mb-4 text-center text-gold group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 mb-6 text-center leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="text-center">
                    <Button 
                      asChild 
                      className="bg-byzantine hover:bg-byzantine-dark border-gold/30 hover:border-gold text-white transition-all duration-300"
                    >
                      <Link to={feature.link} className="flex items-center gap-2">
                        {index === 0 ? 'Join Community' : 'Support Mission'}
                        <Heart className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
