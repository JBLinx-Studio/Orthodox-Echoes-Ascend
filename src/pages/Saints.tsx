
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Crown, Calendar, Search, Heart, Star, BookOpen } from 'lucide-react';

const Saints = () => {
  const [selectedSaint, setSelectedSaint] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [todaysSaint, setTodaysSaint] = useState<any>(null);

  const saints = [
    {
      id: 'nicholas',
      name: 'Saint Nicholas the Wonderworker',
      title: 'Archbishop of Myra',
      feastDay: 'December 6',
      era: '270-343 AD',
      region: 'Asia Minor',
      patronage: ['Children', 'Sailors', 'Merchants'],
      life: 'Saint Nicholas was known for his generosity and care for the poor. Born to wealthy parents, he used his inheritance to help those in need, including the famous story of providing dowries for three poor sisters.',
      miracles: ['Calming storms at sea', 'Healing the sick', 'Protecting children'],
      teachings: 'Known for his humility, generosity, and fierce defense of Orthodox doctrine against Arianism.',
      icon: '👑',
      significance: 'One of the most beloved saints in Orthodox Christianity, known worldwide as the inspiration for Santa Claus.'
    },
    {
      id: 'mary',
      name: 'Saint Mary of Egypt',
      title: 'The Penitent',
      feastDay: 'April 1',
      era: '344-421 AD',
      region: 'Egypt',
      patronage: ['Penitents', 'Desert Monastics'],
      life: 'After a life of sin, Mary experienced a miraculous conversion at the Holy Sepulchre and spent 47 years in the desert in prayer and penance.',
      miracles: ['Walking on water', 'Levitation during prayer', 'Prophetic visions'],
      teachings: 'The power of repentance and the transformative nature of genuine prayer and asceticism.',
      icon: '🌟',
      significance: 'Patron saint of penitents and example of Gods mercy and the possibility of radical transformation.'
    },
    {
      id: 'john-chrysostom',
      name: 'Saint John Chrysostom',
      title: 'Archbishop of Constantinople',
      feastDay: 'November 13',
      era: '349-407 AD',
      region: 'Constantinople',
      patronage: ['Preachers', 'Orators'],
      life: 'Known as the "Golden-mouthed" for his eloquent preaching, John Chrysostom was a fearless defender of justice and reformer of the church.',
      miracles: ['Healing through prayer', 'Prophetic dreams', 'Divine protection from enemies'],
      teachings: 'Famous for his homilies on Scripture and his emphasis on care for the poor and social justice.',
      icon: '📖',
      significance: 'One of the Three Holy Hierarchs and Doctor of the Church, renowned for his preaching and biblical commentaries.'
    },
    {
      id: 'sergius',
      name: 'Saint Sergius of Radonezh',
      title: 'Abbot and Wonderworker',
      feastDay: 'September 25',
      era: '1314-1392 AD',
      region: 'Russia',
      patronage: ['Russia', 'Students', 'Ecology'],
      life: 'Founded the Trinity Lavra and revived Russian monasticism. Known for his humility, mystical experiences, and role in Russian spiritual renewal.',
      miracles: ['Raising the dead', 'Multiplying food', 'Taming wild bears'],
      teachings: 'Emphasized the Trinity, unity, and the importance of monasticism in spiritual life.',
      icon: '🐻',
      significance: 'Patron saint of Russia and key figure in Russian Orthodox spirituality and culture.'
    }
  ];

  const saintCategories = [
    { name: 'Martyrs', count: 45, description: 'Those who died for the faith' },
    { name: 'Monastics', count: 32, description: 'Desert fathers and mothers' },
    { name: 'Hierarchs', count: 28, description: 'Bishops and church leaders' },
    { name: 'Wonderworkers', count: 25, description: 'Saints known for miracles' },
    { name: 'Royal Saints', count: 12, description: 'Saintly rulers and nobility' }
  ];

  useEffect(() => {
    // Simulate today's saint
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    setTodaysSaint(saints[dayOfYear % saints.length]);
  }, []);

  const filteredSaints = saints.filter(saint =>
    saint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    saint.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c111f] via-[#1A1F2C] to-[#0c111f] py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="orthodox-heading text-5xl md:text-6xl font-bold text-gold mb-6">Lives of Saints</h1>
          <div className="w-24 h-1 bg-byzantine mx-auto mb-6"></div>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Discover the inspiring lives of Orthodox saints who have illuminated the path of faith 
            through their devotion, miracles, and unwavering commitment to Christ.
          </p>
        </motion.div>

        {todaysSaint && (
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gradient-to-r from-byzantine/20 to-gold/10 border-gold/30">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6 text-gold" />
                  <CardTitle className="text-gold">Saint of the Day</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{todaysSaint.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{todaysSaint.name}</h3>
                    <p className="text-white/70">{todaysSaint.title}</p>
                    <p className="text-byzantine">Feast Day: {todaysSaint.feastDay}</p>
                  </div>
                </div>
                <p className="text-white/80 mt-4">{todaysSaint.life.substring(0, 200)}...</p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <Tabs defaultValue="saints" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-[#1A1F2C]/60">
            <TabsTrigger value="saints" className="text-white">All Saints</TabsTrigger>
            <TabsTrigger value="categories" className="text-white">Categories</TabsTrigger>
            <TabsTrigger value="calendar" className="text-white">Calendar</TabsTrigger>
            <TabsTrigger value="prayers" className="text-white">Prayers</TabsTrigger>
          </TabsList>

          <TabsContent value="saints">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                <Input
                  placeholder="Search saints by name or title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-[#1A1F2C]/60 border-gold/20 text-white"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSaints.map((saint) => (
                <Card 
                  key={saint.id} 
                  className="bg-[#1A1F2C]/60 border-gold/20 hover:border-gold/40 transition-all cursor-pointer"
                  onClick={() => setSelectedSaint(selectedSaint === saint.id ? null : saint.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{saint.icon}</div>
                      <div className="flex-1">
                        <CardTitle className="text-lg text-gold">{saint.name}</CardTitle>
                        <p className="text-white/70 text-sm">{saint.title}</p>
                        <Badge variant="outline" className="mt-1 border-byzantine text-byzantine text-xs">
                          {saint.era}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70 text-sm mb-3">Feast Day: {saint.feastDay}</p>
                    
                    {selectedSaint === saint.id && (
                      <motion.div 
                        className="mt-4 space-y-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                      >
                        <div>
                          <h4 className="text-gold text-sm font-semibold mb-2">Life & Legacy:</h4>
                          <p className="text-white/80 text-sm">{saint.life}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-gold text-sm font-semibold mb-2">Known Miracles:</h4>
                          <ul className="space-y-1">
                            {saint.miracles.map((miracle, index) => (
                              <li key={index} className="text-white/70 text-xs">• {miracle}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-gold text-sm font-semibold mb-2">Patronage:</h4>
                          <div className="flex flex-wrap gap-1">
                            {saint.patronage.map((patron, index) => (
                              <Badge key={index} variant="outline" className="border-gold/30 text-gold text-xs">
                                {patron}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10 w-full text-xs">
                          Read Full Biography
                        </Button>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {saintCategories.map((category, index) => (
                <Card key={index} className="bg-[#1A1F2C]/60 border-gold/20 hover:border-gold/40 transition-all cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-gold flex items-center justify-between">
                      {category.name}
                      <Badge variant="outline" className="border-byzantine text-byzantine">
                        {category.count}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70">{category.description}</p>
                    <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10 mt-4">
                      Explore {category.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar">
            <Card className="bg-[#1A1F2C]/60 border-gold/20">
              <CardHeader>
                <CardTitle className="text-gold">Liturgical Calendar of Saints</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4">
                  Follow the Orthodox liturgical calendar to commemorate saints throughout the year.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-[#0c111f]/50 rounded-lg">
                    <h3 className="text-gold font-semibold">This Month</h3>
                    <p className="text-2xl text-white mt-2">12</p>
                    <p className="text-white/70 text-sm">Saints to commemorate</p>
                  </div>
                  <div className="text-center p-4 bg-[#0c111f]/50 rounded-lg">
                    <h3 className="text-gold font-semibold">This Week</h3>
                    <p className="text-2xl text-white mt-2">3</p>
                    <p className="text-white/70 text-sm">Major feast days</p>
                  </div>
                  <div className="text-center p-4 bg-[#0c111f]/50 rounded-lg">
                    <h3 className="text-gold font-semibold">Today</h3>
                    <p className="text-2xl text-white mt-2">1</p>
                    <p className="text-white/70 text-sm">Saint to remember</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prayers">
            <div className="space-y-6">
              <Card className="bg-[#1A1F2C]/60 border-gold/20">
                <CardHeader>
                  <CardTitle className="text-gold">Prayers to the Saints</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-[#0c111f]/50 p-4 rounded-lg">
                    <h3 className="text-gold font-semibold mb-2">General Prayer to All Saints</h3>
                    <p className="text-white/80 italic">
                      "O ye saints of God, who have fought the good fight and have received the crown of righteousness, 
                      we humbly beseech you to intercede for us before the throne of grace..."
                    </p>
                  </div>
                  
                  <div className="bg-[#0c111f]/50 p-4 rounded-lg">
                    <h3 className="text-gold font-semibold mb-2">Prayer for Saints' Intercession</h3>
                    <p className="text-white/80 italic">
                      "Holy saints of God, pray for us that we may be found worthy of the promises of Christ. 
                      Guide us in our daily struggles and help us to follow your example of virtue and devotion..."
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

export default Saints;
