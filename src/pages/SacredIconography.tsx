
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Image, Eye, Heart, Star, Palette, BookOpen } from 'lucide-react';

const SacredIconography = () => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null);

  const icons = [
    {
      id: 'christ-pantocrator',
      name: 'Christ Pantocrator',
      period: 'Byzantine',
      significance: 'The most important icon in Orthodox Christianity, showing Christ as ruler of all',
      symbolism: ['Divine and human natures', 'Alpha and Omega', 'Book of life', 'Blessing hand'],
      colors: ['Gold (divinity)', 'Blue (humanity)', 'Red (sacrifice)', 'Brown (earth)'],
      description: 'This icon depicts Christ as Pantocrator (Ruler of All), emphasizing both His divine and human natures. The asymmetrical face represents mercy and judgment.',
      prayerUse: 'Used for contemplation of Christ\'s dual nature and for seeking divine wisdom.',
      location: 'Originally from Saint Catherine\'s Monastery, Sinai'
    },
    {
      id: 'theotokos',
      name: 'Theotokos (Mother of God)',
      period: 'Byzantine',
      significance: 'Icons of the Virgin Mary, emphasizing her role as God-bearer',
      symbolism: ['Three stars (virginity)', 'Maphorion (purple cloak)', 'Christ child', 'Pointing to Christ'],
      colors: ['Purple (royalty)', 'Blue (purity)', 'Gold (divine grace)', 'Red (love)'],
      description: 'Various types exist including Hodegetria (She who shows the way) and Eleousa (Merciful). Each emphasizes different aspects of Mary\'s relationship with Christ.',
      prayerUse: 'Invoked for intercession, protection, and guidance in spiritual life.',
      location: 'Found in churches worldwide, with famous examples in Constantinople and Mount Athos'
    },
    {
      id: 'archangel-michael',
      name: 'Archangel Michael',
      period: 'Byzantine',
      significance: 'Leader of the heavenly hosts and protector of the faithful',
      symbolism: ['Wings (heavenly nature)', 'Sword or spear', 'Scales of justice', 'Orb of authority'],
      colors: ['White (purity)', 'Gold (divine light)', 'Red (divine love)', 'Blue (heavenly realm)'],
      description: 'Often depicted as a warrior angel, Archangel Michael represents God\'s power over evil and his role as guide of souls.',
      prayerUse: 'Invoked for protection against evil, guidance in battle (spiritual and physical), and at the hour of death.',
      location: 'Prominent in Mount Athos monasteries and military chapels'
    }
  ];

  const techniques = [
    {
      id: 'egg-tempera',
      name: 'Egg Tempera',
      description: 'Traditional medium using egg yolk, pigments, and vinegar',
      process: 'Pigments mixed with egg yolk create luminous, long-lasting colors',
      advantages: ['Luminous quality', 'Quick drying', 'Precise detail work', 'Spiritual preparation'],
      spiritualAspect: 'The slow, meditative process aids the iconographer\'s prayer'
    },
    {
      id: 'wood-preparation',
      name: 'Wood Panel Preparation',
      description: 'Sacred preparation of the wooden support',
      process: 'Wood blessed, sanded, sized with rabbit skin glue, and covered with gesso',
      advantages: ['Durability', 'Proper absorption', 'Spiritual foundation', 'Traditional method'],
      spiritualAspect: 'Each step involves prayer and blessing of materials'
    },
    {
      id: 'gilding',
      name: 'Gold Leaf Application',
      description: 'Application of pure gold to represent divine light',
      process: 'Bole application, then delicate laying of gold leaf with special brushes',
      advantages: ['Divine representation', 'Eternal beauty', 'Light reflection', 'Sacred symbolism'],
      spiritualAspect: 'Gold represents the uncreated light of God'
    }
  ];

  const iconTypes = [
    { name: 'Christ Icons', count: 15, description: 'Depictions of our Lord Jesus Christ' },
    { name: 'Theotokos Icons', count: 12, description: 'Icons of the Mother of God' },
    { name: 'Saint Icons', count: 25, description: 'Holy men and women' },
    { name: 'Archangel Icons', count: 8, description: 'Heavenly messengers' },
    { name: 'Feast Day Icons', count: 18, description: 'Major Christian celebrations' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c111f] via-[#1A1F2C] to-[#0c111f] py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="orthodox-heading text-5xl md:text-6xl font-bold text-gold mb-6">Sacred Iconography</h1>
          <div className="w-24 h-1 bg-byzantine mx-auto mb-6"></div>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Enter into the sacred art of Orthodox iconography - windows into heaven that guide us 
            in prayer and contemplation of divine mysteries.
          </p>
        </motion.div>

        <Tabs defaultValue="gallery" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-[#1A1F2C]/60">
            <TabsTrigger value="gallery" className="text-white">Icon Gallery</TabsTrigger>
            <TabsTrigger value="techniques" className="text-white">Techniques</TabsTrigger>
            <TabsTrigger value="symbolism" className="text-white">Symbolism</TabsTrigger>
            <TabsTrigger value="prayer" className="text-white">Prayer Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery">
            <div className="mb-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {iconTypes.map((type, index) => (
                  <Card key={index} className="bg-[#1A1F2C]/60 border-gold/20 text-center">
                    <CardContent className="p-4">
                      <h3 className="text-gold font-semibold">{type.name}</h3>
                      <p className="text-2xl text-white mt-2">{type.count}</p>
                      <p className="text-white/70 text-sm">{type.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {icons.map((icon) => (
                <Card 
                  key={icon.id} 
                  className="bg-[#1A1F2C]/60 border-gold/20 hover:border-gold/40 transition-all cursor-pointer"
                  onClick={() => setSelectedIcon(selectedIcon === icon.id ? null : icon.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <Image className="w-6 h-6 text-byzantine" />
                      <div className="flex-1">
                        <CardTitle className="text-lg text-gold">{icon.name}</CardTitle>
                        <Badge variant="outline" className="mt-1 border-byzantine text-byzantine text-xs">
                          {icon.period}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70 text-sm mb-3">{icon.significance}</p>
                    
                    {selectedIcon === icon.id && (
                      <motion.div 
                        className="mt-4 space-y-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                      >
                        <div>
                          <h4 className="text-gold text-sm font-semibold mb-2">Description:</h4>
                          <p className="text-white/80 text-sm">{icon.description}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-gold text-sm font-semibold mb-2">Symbolism:</h4>
                          <ul className="space-y-1">
                            {icon.symbolism.map((symbol, index) => (
                              <li key={index} className="text-white/70 text-xs">• {symbol}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-gold text-sm font-semibold mb-2">Colors & Meaning:</h4>
                          <ul className="space-y-1">
                            {icon.colors.map((color, index) => (
                              <li key={index} className="text-white/70 text-xs">• {color}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-gold text-sm font-semibold mb-2">Prayer Use:</h4>
                          <p className="text-white/80 text-sm">{icon.prayerUse}</p>
                        </div>
                        
                        <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10 w-full text-xs">
                          <Eye className="w-3 h-3 mr-1" />
                          View Full Icon
                        </Button>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="techniques">
            <div className="space-y-6">
              <h2 className="text-2xl font-display text-gold mb-4">Traditional Iconography Techniques</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {techniques.map((technique) => (
                  <Card 
                    key={technique.id} 
                    className="bg-[#1A1F2C]/60 border-gold/20 hover:border-gold/40 transition-all cursor-pointer"
                    onClick={() => setSelectedTechnique(selectedTechnique === technique.id ? null : technique.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Palette className="w-6 h-6 text-byzantine" />
                        <CardTitle className="text-gold">{technique.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/80 mb-4">{technique.description}</p>
                      
                      {selectedTechnique === technique.id && (
                        <motion.div 
                          className="space-y-4"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                        >
                          <div>
                            <h4 className="text-gold text-sm font-semibold mb-2">Process:</h4>
                            <p className="text-white/80 text-sm">{technique.process}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-gold text-sm font-semibold mb-2">Advantages:</h4>
                            <ul className="space-y-1">
                              {technique.advantages.map((advantage, index) => (
                                <li key={index} className="text-white/70 text-xs">• {advantage}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-gold text-sm font-semibold mb-2">Spiritual Aspect:</h4>
                            <p className="text-white/80 text-sm italic">{technique.spiritualAspect}</p>
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="symbolism">
            <div className="space-y-8">
              <h2 className="text-2xl font-display text-gold mb-4">Sacred Symbolism in Icons</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-[#1A1F2C]/60 border-gold/20">
                  <CardHeader>
                    <CardTitle className="text-gold">Colors in Iconography</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                      <span className="text-white/80">Gold - Divine light and glory</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                      <span className="text-white/80">Blue - Humanity and heavenly realm</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                      <span className="text-white/80">Red - Divine love and martyrdom</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
                      <span className="text-white/80">Purple - Royalty and penitence</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-white rounded-full border"></div>
                      <span className="text-white/80">White - Purity and resurrection</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#1A1F2C]/60 border-gold/20">
                  <CardHeader>
                    <CardTitle className="text-gold">Sacred Gestures</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-white/80 text-sm">
                      <strong className="text-gold">Blessing Hand:</strong> Fingers form IC XC (Jesus Christ)
                    </div>
                    <div className="text-white/80 text-sm">
                      <strong className="text-gold">Praying Hands:</strong> Intercession and worship
                    </div>
                    <div className="text-white/80 text-sm">
                      <strong className="text-gold">Pointing Gesture:</strong> Direction toward Christ
                    </div>
                    <div className="text-white/80 text-sm">
                      <strong className="text-gold">Open Palms:</strong> Receiving divine grace
                    </div>
                    <div className="text-white/80 text-sm">
                      <strong className="text-gold">Crossed Arms:</strong> Humility and death to self
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="prayer">
            <div className="space-y-6">
              <h2 className="text-2xl font-display text-gold mb-4">Praying with Icons</h2>
              
              <Card className="bg-[#1A1F2C]/60 border-gold/20">
                <CardHeader>
                  <CardTitle className="text-gold">How to Pray Before an Icon</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm font-semibold">1</div>
                      <div>
                        <h4 className="text-gold font-semibold">Approach with Reverence</h4>
                        <p className="text-white/80 text-sm">Light a candle and make the sign of the cross</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm font-semibold">2</div>
                      <div>
                        <h4 className="text-gold font-semibold">Venerate the Icon</h4>
                        <p className="text-white/80 text-sm">Kiss the icon or bow before it with humility</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm font-semibold">3</div>
                      <div>
                        <h4 className="text-gold font-semibold">Contemplative Prayer</h4>
                        <p className="text-white/80 text-sm">Gaze upon the icon while reciting prayers or maintaining silence</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm font-semibold">4</div>
                      <div>
                        <h4 className="text-gold font-semibold">Seek Intercession</h4>
                        <p className="text-white/80 text-sm">Ask for prayers and guidance from the saint or Christ depicted</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1A1F2C]/60 border-gold/20">
                <CardHeader>
                  <CardTitle className="text-gold">Traditional Icon Prayers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-[#0c111f]/50 p-4 rounded-lg">
                    <h4 className="text-gold font-semibold mb-2">Before Christ Pantocrator</h4>
                    <p className="text-white/80 italic text-sm">
                      "O Christ our God, You are the image of the invisible Father. Grant that we may see Your divine beauty 
                      reflected in our lives and be transformed by Your grace..."
                    </p>
                  </div>
                  
                  <div className="bg-[#0c111f]/50 p-4 rounded-lg">
                    <h4 className="text-gold font-semibold mb-2">Before the Theotokos</h4>
                    <p className="text-white/80 italic text-sm">
                      "O Mother of God, most pure Virgin, we venerate your holy icon and ask for your intercession. 
                      Lead us to your Son and help us to follow His will in all things..."
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SacredIconography;
