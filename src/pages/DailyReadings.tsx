
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Calendar, BookOpen, Cross, Crown, Clock, Star } from 'lucide-react';

const DailyReadings = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedReading, setSelectedReading] = useState<string | null>(null);

  // Mock data for daily readings
  const todaysReadings = {
    date: currentDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    liturgicalSeason: 'Ordinary Time',
    feastDay: 'Feast of St. Nicholas the Wonderworker',
    epistle: {
      reference: 'Hebrews 13:17-21',
      text: 'Obey your leaders and submit to them, for they are keeping watch over your souls, as those who will have to give an account...',
      theme: 'Obedience and Leadership'
    },
    gospel: {
      reference: 'Luke 6:17-23',
      text: 'And he came down with them and stood on a level place, with a great crowd of his disciples...',
      theme: 'The Beatitudes'
    },
    oldTestament: {
      reference: 'Proverbs 10:6-8',
      text: 'Blessings are on the head of the righteous, but the mouth of the wicked conceals violence...',
      theme: 'Wisdom and Righteousness'
    },
    psalm: {
      reference: 'Psalm 37:30-31',
      text: 'The mouth of the righteous speaks wisdom, and his tongue talks of judgment. The law of his God is in his heart...',
      theme: 'The Righteous'
    }
  };

  const saints = [
    {
      name: 'St. Nicholas the Wonderworker',
      title: 'Archbishop of Myra',
      feast: 'December 6',
      icon: '🎄',
      description: 'Known for his generosity and miraculous deeds, patron saint of children and sailors.',
      lifeSummary: 'Born in the 3rd century, St. Nicholas became famous for his charitable giving and protection of the innocent.',
      significance: 'His feast day marks the beginning of the Christmas season in many Orthodox traditions.'
    },
    {
      name: 'St. Ambrose of Milan',
      title: 'Bishop and Doctor of the Church',
      feast: 'December 7',
      icon: '📖',
      description: 'Renowned teacher and defender of Orthodox faith against Arianism.',
      lifeSummary: 'A powerful bishop who stood against emperors when they violated Christian principles.',
      significance: 'His hymns and theological writings greatly influenced liturgical worship.'
    }
  ];

  const reflections = [
    {
      title: 'On Generosity and Giving',
      author: 'St. John Chrysostom',
      text: 'Not to enable the poor to share in our goods is to steal from them and deprive them of life. The goods we possess are not ours, but theirs.',
      theme: 'Charity'
    },
    {
      title: 'On Prayer and Contemplation',
      author: 'St. Maximus the Confessor',
      text: 'Prayer is the raising of the mind and heart to God. It is a conversation with God, in which we speak to Him and He speaks to us.',
      theme: 'Prayer'
    }
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
          <h1 className="orthodox-heading text-5xl md:text-6xl font-bold text-gold mb-6">Daily Readings</h1>
          <div className="w-24 h-1 bg-byzantine mx-auto mb-6"></div>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Nourish your soul with daily Scripture readings, lives of saints, and spiritual reflections 
            from the Orthodox tradition.
          </p>
          <div className="mt-6 flex items-center justify-center space-x-4">
            <Badge variant="outline" className="border-gold text-gold text-lg px-4 py-2">
              <Calendar className="w-4 h-4 mr-2" />
              {todaysReadings.date}
            </Badge>
            <Badge variant="outline" className="border-byzantine text-byzantine text-lg px-4 py-2">
              {todaysReadings.liturgicalSeason}
            </Badge>
          </div>
        </motion.div>

        <Tabs defaultValue="readings" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-[#1A1F2C]/60">
            <TabsTrigger value="readings" className="text-white">Scripture Readings</TabsTrigger>
            <TabsTrigger value="saints" className="text-white">Saints of the Day</TabsTrigger>
            <TabsTrigger value="reflections" className="text-white">Spiritual Reflections</TabsTrigger>
            <TabsTrigger value="calendar" className="text-white">Liturgical Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="readings">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {todaysReadings.feastDay && (
                <Card className="bg-gradient-to-r from-gold/10 to-byzantine/10 border-gold/30">
                  <CardHeader>
                    <CardTitle className="text-gold flex items-center">
                      <Crown className="w-6 h-6 mr-2" />
                      {todaysReadings.feastDay}
                    </CardTitle>
                  </CardHeader>
                </Card>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-[#1A1F2C]/60 border-gold/20">
                  <CardHeader>
                    <CardTitle className="text-gold flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Epistle Reading
                    </CardTitle>
                    <Badge variant="outline" className="w-fit border-byzantine text-byzantine">
                      {todaysReadings.epistle.reference}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-[#0c111f]/50 p-4 rounded-lg mb-4">
                      <p className="text-white/80 italic">"{todaysReadings.epistle.text}"</p>
                    </div>
                    <p className="text-white/70 text-sm mb-3">
                      <strong>Theme:</strong> {todaysReadings.epistle.theme}
                    </p>
                    <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10">
                      Read Full Passage
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-[#1A1F2C]/60 border-gold/20">
                  <CardHeader>
                    <CardTitle className="text-gold flex items-center">
                      <Cross className="w-5 h-5 mr-2" />
                      Gospel Reading
                    </CardTitle>
                    <Badge variant="outline" className="w-fit border-byzantine text-byzantine">
                      {todaysReadings.gospel.reference}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-[#0c111f]/50 p-4 rounded-lg mb-4">
                      <p className="text-white/80 italic">"{todaysReadings.gospel.text}"</p>
                    </div>
                    <p className="text-white/70 text-sm mb-3">
                      <strong>Theme:</strong> {todaysReadings.gospel.theme}
                    </p>
                    <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10">
                      Read Full Passage
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-[#1A1F2C]/60 border-gold/20">
                  <CardHeader>
                    <CardTitle className="text-gold flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Old Testament
                    </CardTitle>
                    <Badge variant="outline" className="w-fit border-byzantine text-byzantine">
                      {todaysReadings.oldTestament.reference}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-[#0c111f]/50 p-4 rounded-lg mb-4">
                      <p className="text-white/80 italic">"{todaysReadings.oldTestament.text}"</p>
                    </div>
                    <p className="text-white/70 text-sm mb-3">
                      <strong>Theme:</strong> {todaysReadings.oldTestament.theme}
                    </p>
                    <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10">
                      Read Full Passage
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-[#1A1F2C]/60 border-gold/20">
                  <CardHeader>
                    <CardTitle className="text-gold flex items-center">
                      <Star className="w-5 h-5 mr-2" />
                      Psalm
                    </CardTitle>
                    <Badge variant="outline" className="w-fit border-byzantine text-byzantine">
                      {todaysReadings.psalm.reference}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-[#0c111f]/50 p-4 rounded-lg mb-4">
                      <p className="text-white/80 italic">"{todaysReadings.psalm.text}"</p>
                    </div>
                    <p className="text-white/70 text-sm mb-3">
                      <strong>Theme:</strong> {todaysReadings.psalm.theme}
                    </p>
                    <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10">
                      Read Full Psalm
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="saints">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid gap-6">
                {saints.map((saint, index) => (
                  <Card key={index} className="bg-[#1A1F2C]/60 border-gold/20">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">{saint.icon}</div>
                        <div>
                          <CardTitle className="text-gold text-xl">{saint.name}</CardTitle>
                          <p className="text-byzantine">{saint.title}</p>
                          <Badge variant="outline" className="mt-1 border-gold text-gold">
                            Feast Day: {saint.feast}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-white/80">{saint.description}</p>
                      <div className="bg-[#0c111f]/50 p-4 rounded-lg">
                        <h4 className="text-gold font-semibold mb-2">Life Summary:</h4>
                        <p className="text-white/70 text-sm">{saint.lifeSummary}</p>
                      </div>
                      <div>
                        <h4 className="text-gold font-semibold mb-2">Significance:</h4>
                        <p className="text-white/70 text-sm">{saint.significance}</p>
                      </div>
                      <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10">
                        Read Full Biography
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="reflections">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid gap-6">
                {reflections.map((reflection, index) => (
                  <Card key={index} className="bg-[#1A1F2C]/60 border-gold/20">
                    <CardHeader>
                      <CardTitle className="text-gold">{reflection.title}</CardTitle>
                      <p className="text-byzantine">by {reflection.author}</p>
                      <Badge variant="outline" className="w-fit border-byzantine text-byzantine">
                        {reflection.theme}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-[#0c111f]/50 p-6 rounded-lg">
                        <p className="text-white/80 italic text-lg leading-relaxed">
                          "{reflection.text}"
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="calendar">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-[#1A1F2C]/60 border-gold/20">
                <CardHeader>
                  <CardTitle className="text-gold">This Week in the Orthodox Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-[#0c111f]/50 p-4 rounded-lg">
                        <h4 className="text-gold font-semibold">December 6</h4>
                        <p className="text-white/80">St. Nicholas the Wonderworker</p>
                        <Badge variant="outline" className="mt-1 border-byzantine text-byzantine text-xs">
                          Great Feast
                        </Badge>
                      </div>
                      <div className="bg-[#0c111f]/50 p-4 rounded-lg">
                        <h4 className="text-gold font-semibold">December 7</h4>
                        <p className="text-white/80">St. Ambrose of Milan</p>
                        <Badge variant="outline" className="mt-1 border-gold text-gold text-xs">
                          Saint's Day
                        </Badge>
                      </div>
                      <div className="bg-[#0c111f]/50 p-4 rounded-lg">
                        <h4 className="text-gold font-semibold">December 8</h4>
                        <p className="text-white/80">Nativity Fast continues</p>
                        <Badge variant="outline" className="mt-1 border-purple-400 text-purple-400 text-xs">
                          Fasting Period
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DailyReadings;
