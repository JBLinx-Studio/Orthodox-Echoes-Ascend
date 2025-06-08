
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Clock, Heart, Bookmark, Play, Pause, Volume2 } from 'lucide-react';

const PrayerGuide = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPrayer, setCurrentPrayer] = useState<string | null>(null);

  const morningPrayers = [
    {
      id: 'morning-1',
      title: 'Prayer on Awakening',
      text: 'I thank You, my heavenly Father, through Jesus Christ, Your dear Son, that You have kept me this night from all harm and danger...',
      duration: '2 min',
      category: 'Essential'
    },
    {
      id: 'morning-2',
      title: 'The Jesus Prayer',
      text: 'Lord Jesus Christ, Son of God, have mercy on me, a sinner.',
      duration: '1 min',
      category: 'Core'
    },
    {
      id: 'morning-3',
      title: 'Prayer to the Holy Spirit',
      text: 'O Heavenly King, the Comforter, the Spirit of Truth, Who art everywhere present and fillest all things...',
      duration: '3 min',
      category: 'Essential'
    }
  ];

  const eveningPrayers = [
    {
      id: 'evening-1',
      title: 'Prayer Before Sleep',
      text: 'In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.',
      duration: '2 min',
      category: 'Essential'
    },
    {
      id: 'evening-2',
      title: 'Examination of Conscience',
      text: 'Lord, help me to review this day with honesty and gratitude...',
      duration: '5 min',
      category: 'Reflection'
    }
  ];

  const specialPrayers = [
    {
      id: 'special-1',
      title: 'Prayer for the Departed',
      text: 'Grant rest, O Lord, to the soul of Thy servant who has fallen asleep...',
      duration: '3 min',
      category: 'Memorial'
    },
    {
      id: 'special-2',
      title: 'Prayer for Forgiveness',
      text: 'Almighty and merciful God, You have brought us together in the name of Your Son...',
      duration: '4 min',
      category: 'Penitential'
    }
  ];

  const handlePlayPrayer = (prayerId: string) => {
    if (currentPrayer === prayerId && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentPrayer(prayerId);
      setIsPlaying(true);
    }
  };

  const PrayerCard = ({ prayer }: { prayer: any }) => (
    <Card className="bg-[#1A1F2C]/60 border-gold/20 hover:border-gold/40 transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-gold">{prayer.title}</CardTitle>
          <Badge variant="outline" className="border-byzantine text-byzantine">
            {prayer.category}
          </Badge>
        </div>
        <div className="flex items-center space-x-4 text-sm text-white/60">
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {prayer.duration}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-white/80 mb-4 italic">"{prayer.text}"</p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePlayPrayer(prayer.id)}
            className="border-gold/30 text-gold hover:bg-gold/10"
          >
            {currentPrayer === prayer.id && isPlaying ? (
              <Pause className="w-4 h-4 mr-1" />
            ) : (
              <Play className="w-4 h-4 mr-1" />
            )}
            {currentPrayer === prayer.id && isPlaying ? 'Pause' : 'Listen'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white/60 hover:text-gold"
          >
            <Bookmark className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
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
          <h1 className="orthodox-heading text-5xl md:text-6xl font-bold text-gold mb-6">Prayer Guide</h1>
          <div className="w-24 h-1 bg-byzantine mx-auto mb-6"></div>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Discover the ancient tradition of Orthodox prayer. Build a consistent prayer life with our comprehensive guide to traditional prayers and spiritual practices.
          </p>
        </motion.div>

        <Tabs defaultValue="morning" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-[#1A1F2C]/60">
            <TabsTrigger value="morning" className="text-white">Morning Prayers</TabsTrigger>
            <TabsTrigger value="evening" className="text-white">Evening Prayers</TabsTrigger>
            <TabsTrigger value="special" className="text-white">Special Occasions</TabsTrigger>
            <TabsTrigger value="guide" className="text-white">Prayer Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="morning" className="space-y-6">
            <motion.div 
              className="grid gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-display text-gold mb-4">Morning Prayers</h2>
              <div className="grid gap-4">
                {morningPrayers.map((prayer) => (
                  <PrayerCard key={prayer.id} prayer={prayer} />
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="evening" className="space-y-6">
            <motion.div 
              className="grid gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-display text-gold mb-4">Evening Prayers</h2>
              <div className="grid gap-4">
                {eveningPrayers.map((prayer) => (
                  <PrayerCard key={prayer.id} prayer={prayer} />
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="special" className="space-y-6">
            <motion.div 
              className="grid gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-display text-gold mb-4">Special Occasion Prayers</h2>
              <div className="grid gap-4">
                {specialPrayers.map((prayer) => (
                  <PrayerCard key={prayer.id} prayer={prayer} />
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="guide" className="space-y-6">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-display text-gold mb-4">How to Pray</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-[#1A1F2C]/60 border-gold/20">
                  <CardHeader>
                    <CardTitle className="text-gold">The Jesus Prayer</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-white/80">The most fundamental Orthodox prayer, repeated continuously throughout the day.</p>
                    <div className="bg-[#0c111f]/50 p-4 rounded-lg">
                      <p className="text-gold italic">"Lord Jesus Christ, Son of God, have mercy on me, a sinner."</p>
                    </div>
                    <ul className="space-y-2 text-white/70">
                      <li>• Begin with 10-20 repetitions</li>
                      <li>• Coordinate with your breathing</li>
                      <li>• Practice regularly throughout the day</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-[#1A1F2C]/60 border-gold/20">
                  <CardHeader>
                    <CardTitle className="text-gold">Prayer Schedule</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-white/80">Establish a rhythm of prayer throughout your day.</p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Morning</span>
                        <span className="text-byzantine">6:00 AM - 7:00 AM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Midday</span>
                        <span className="text-byzantine">12:00 PM - 12:15 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Evening</span>
                        <span className="text-byzantine">6:00 PM - 6:30 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Compline</span>
                        <span className="text-byzantine">9:00 PM - 9:15 PM</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PrayerGuide;
