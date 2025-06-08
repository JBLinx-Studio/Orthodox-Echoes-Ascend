
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { BookOpen, Cross, Crown, Flame, Church, Star } from 'lucide-react';

const CoreDoctrine = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const doctrines = [
    {
      id: 'trinity',
      title: 'The Holy Trinity',
      icon: <Flame className="w-6 h-6" />,
      summary: 'The fundamental Christian doctrine of One God in Three Persons',
      content: 'Orthodox Christianity teaches that God exists as Trinity - Father, Son, and Holy Spirit - three distinct Persons sharing one divine essence. This mystery is central to our faith and worship.',
      keyPoints: [
        'One God, Three Persons',
        'Equal in essence and dignity',
        'Distinct in their relations',
        'Foundation of Christian worship'
      ],
      scripture: 'Matthew 28:19',
      level: 'Fundamental'
    },
    {
      id: 'incarnation',
      title: 'The Incarnation',
      icon: <Cross className="w-6 h-6" />,
      summary: 'God became man in Jesus Christ for our salvation',
      content: 'The Second Person of the Trinity took on human nature, becoming fully God and fully man. Through His life, death, and resurrection, Christ offers salvation to all humanity.',
      keyPoints: [
        'True God and true man',
        'United in one Person',
        'Born of the Virgin Mary',
        'Salvation through His sacrifice'
      ],
      scripture: 'John 1:14',
      level: 'Fundamental'
    },
    {
      id: 'theosis',
      title: 'Theosis (Deification)',
      icon: <Crown className="w-6 h-6" />,
      summary: 'The transformation of the believer into the likeness of God',
      content: 'Orthodox spirituality emphasizes theosis - becoming like God by grace. Through prayer, sacraments, and virtuous living, believers are transformed into the divine likeness.',
      keyPoints: [
        'Participation in divine life',
        'Transformation by grace',
        'Goal of Christian life',
        'Becoming like God by grace'
      ],
      scripture: '2 Peter 1:4',
      level: 'Advanced'
    },
    {
      id: 'church',
      title: 'The Church',
      icon: <Church className="w-6 h-6" />,
      summary: 'The Body of Christ and pillar of truth',
      content: 'The Orthodox Church is the continuation of the apostolic community established by Christ. It preserves the fullness of Christian faith and practice through apostolic succession.',
      keyPoints: [
        'Body of Christ',
        'Apostolic succession',
        'Pillar of truth',
        'Sacramental life'
      ],
      scripture: '1 Timothy 3:15',
      level: 'Intermediate'
    },
    {
      id: 'sacraments',
      title: 'The Seven Sacraments',
      icon: <Star className="w-6 h-6" />,
      summary: 'Mysteries that convey divine grace',
      content: 'Orthodox Christianity recognizes seven sacraments: Baptism, Chrismation, Eucharist, Confession, Ordination, Marriage, and Holy Unction. These are channels of Gods grace.',
      keyPoints: [
        'Seven sacred mysteries',
        'Channels of divine grace',
        'Essential for spiritual life',
        'Administered by the Church'
      ],
      scripture: '1 Corinthians 11:23-26',
      level: 'Intermediate'
    },
    {
      id: 'scripture',
      title: 'Scripture and Tradition',
      icon: <BookOpen className="w-6 h-6" />,
      summary: 'The dual source of divine revelation',
      content: 'Orthodox Christianity holds that divine revelation comes through both Scripture and Tradition. The Church interprets Scripture within the context of apostolic tradition.',
      keyPoints: [
        'Scripture and Tradition together',
        'Church as interpreter',
        'Apostolic continuity',
        'Living tradition'
      ],
      scripture: '2 Thessalonians 2:15',
      level: 'Intermediate'
    }
  ];

  const creeds = [
    {
      title: 'Nicene Creed',
      date: '325/381 AD',
      content: 'I believe in one God, the Father Almighty, Maker of heaven and earth, and of all things visible and invisible...',
      significance: 'Establishes the fundamental beliefs about the Trinity and the nature of Christ.'
    },
    {
      title: 'Apostles Creed',
      date: '2nd-4th Century',
      content: 'I believe in God, the Father almighty, creator of heaven and earth...',
      significance: 'Early summary of Christian faith used in baptism and catechesis.'
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
          <h1 className="orthodox-heading text-5xl md:text-6xl font-bold text-gold mb-6">Orthodox Doctrine</h1>
          <div className="w-24 h-1 bg-byzantine mx-auto mb-6"></div>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Explore the foundational beliefs and theological principles that define Orthodox Christianity. 
            Discover the ancient wisdom that has guided believers for two millennia.
          </p>
        </motion.div>

        <Tabs defaultValue="doctrines" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-[#1A1F2C]/60">
            <TabsTrigger value="doctrines" className="text-white">Core Doctrines</TabsTrigger>
            <TabsTrigger value="creeds" className="text-white">Creeds</TabsTrigger>
            <TabsTrigger value="theology" className="text-white">Theology</TabsTrigger>
          </TabsList>

          <TabsContent value="doctrines">
            <motion.div 
              className="grid gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {doctrines.map((doctrine) => (
                  <Card 
                    key={doctrine.id} 
                    className="bg-[#1A1F2C]/60 border-gold/20 hover:border-gold/40 transition-all cursor-pointer"
                    onClick={() => setSelectedTopic(selectedTopic === doctrine.id ? null : doctrine.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="text-byzantine">{doctrine.icon}</div>
                        <div className="flex-1">
                          <CardTitle className="text-lg text-gold">{doctrine.title}</CardTitle>
                          <Badge variant="outline" className="mt-1 border-byzantine text-byzantine text-xs">
                            {doctrine.level}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/70 text-sm mb-3">{doctrine.summary}</p>
                      
                      {selectedTopic === doctrine.id && (
                        <motion.div 
                          className="mt-4 space-y-4"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="text-white/80 text-sm">{doctrine.content}</p>
                          
                          <div>
                            <h4 className="text-gold text-sm font-semibold mb-2">Key Points:</h4>
                            <ul className="space-y-1">
                              {doctrine.keyPoints.map((point, index) => (
                                <li key={index} className="text-white/70 text-xs">{point}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="pt-2 border-t border-gold/20">
                            <p className="text-byzantine text-xs">Scripture: {doctrine.scripture}</p>
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="creeds">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-display text-gold mb-4">Historical Creeds</h2>
              
              <div className="grid gap-6">
                {creeds.map((creed, index) => (
                  <Card key={index} className="bg-[#1A1F2C]/60 border-gold/20">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-gold">{creed.title}</CardTitle>
                        <Badge variant="outline" className="border-byzantine text-byzantine">
                          {creed.date}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-[#0c111f]/50 p-4 rounded-lg">
                        <p className="text-white/80 italic">"{creed.content}"</p>
                      </div>
                      <p className="text-white/70">{creed.significance}</p>
                      <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10">
                        Read Full Text
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="theology">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-display text-gold mb-4">Theological Principles</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-[#1A1F2C]/60 border-gold/20">
                  <CardHeader>
                    <CardTitle className="text-gold">Apophatic Theology</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80 mb-4">
                      Orthodox theology emphasizes what God is not (apophatic) rather than what God is (cataphatic). 
                      This recognizes the mystery and transcendence of divine nature.
                    </p>
                    <ul className="space-y-2 text-white/70">
                      <li>• God transcends human understanding</li>
                      <li>• Mystery is preserved in theology</li>
                      <li>• Humility before divine truth</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-[#1A1F2C]/60 border-gold/20">
                  <CardHeader>
                    <CardTitle className="text-gold">Divine Energies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80 mb-4">
                      Orthodox theology distinguishes between God's essence (unknowable) and His energies 
                      (through which we experience God). This allows for genuine communion with God.
                    </p>
                    <ul className="space-y-2 text-white/70">
                      <li>• Essence remains unknowable</li>
                      <li>• Energies are God's activity</li>
                      <li>• Basis for theosis</li>
                    </ul>
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

export default CoreDoctrine;
