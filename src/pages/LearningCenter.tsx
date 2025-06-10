
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Clock, CheckCircle, Star, Target, Users } from 'lucide-react';

const LearningCenter = () => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const courses = [
    {
      id: 'basics',
      title: 'Orthodox Christianity Basics',
      level: 'Beginner',
      duration: '4 weeks',
      progress: 75,
      description: 'An introduction to Orthodox Christian faith, history, and practices.',
      modules: [
        { title: 'What is Orthodox Christianity?', completed: true, duration: '30 min' },
        { title: 'The Trinity and Incarnation', completed: true, duration: '45 min' },
        { title: 'Scripture and Tradition', completed: true, duration: '40 min' },
        { title: 'The Sacraments', completed: false, duration: '50 min' },
        { title: 'Orthodox Worship', completed: false, duration: '35 min' }
      ],
      instructor: 'Fr. Michael Thompson'
    },
    {
      id: 'liturgy',
      title: 'Understanding the Divine Liturgy',
      level: 'Intermediate',
      duration: '6 weeks',
      progress: 25,
      description: 'Deep dive into the meaning and symbolism of Orthodox worship.',
      modules: [
        { title: 'History of the Liturgy', completed: true, duration: '45 min' },
        { title: 'The Liturgy of the Word', completed: false, duration: '50 min' },
        { title: 'The Liturgy of the Faithful', completed: false, duration: '55 min' },
        { title: 'Sacred Vessels and Vestments', completed: false, duration: '40 min' },
        { title: 'Liturgical Music', completed: false, duration: '45 min' }
      ],
      instructor: 'Deacon Sarah Williams'
    },
    {
      id: 'prayer',
      title: 'The Orthodox Way of Prayer',
      level: 'Beginner',
      duration: '3 weeks',
      progress: 90,
      description: 'Learn traditional Orthodox prayers and develop a personal prayer life.',
      modules: [
        { title: 'The Jesus Prayer', completed: true, duration: '40 min' },
        { title: 'Daily Prayer Cycle', completed: true, duration: '35 min' },
        { title: 'Fasting and Prayer', completed: true, duration: '30 min' },
        { title: 'Icons and Prayer', completed: true, duration: '25 min' }
      ],
      instructor: 'Mother Catherine'
    },
    {
      id: 'theology',
      title: 'Orthodox Theology and Doctrine',
      level: 'Advanced',
      duration: '8 weeks',
      progress: 10,
      description: 'Advanced study of Orthodox theological principles and Church Fathers.',
      modules: [
        { title: 'Patristic Foundations', completed: true, duration: '60 min' },
        { title: 'Christology and Trinity', completed: false, duration: '70 min' },
        { title: 'Theosis and Salvation', completed: false, duration: '65 min' },
        { title: 'Ecclesiology', completed: false, duration: '55 min' },
        { title: 'Eschatology', completed: false, duration: '50 min' }
      ],
      instructor: 'Dr. Alexander Petrov'
    }
  ];

  const studyPaths = [
    {
      title: 'New to Orthodoxy',
      description: 'Perfect for those exploring Orthodox Christianity for the first time',
      courses: ['basics', 'prayer'],
      duration: '7 weeks',
      icon: <Star className="w-6 h-6" />
    },
    {
      title: 'Deepening Faith',
      description: 'For those wanting to grow deeper in Orthodox understanding',
      courses: ['liturgy', 'theology'],
      duration: '14 weeks',
      icon: <Target className="w-6 h-6" />
    },
    {
      title: 'Leadership Preparation',
      description: 'Comprehensive preparation for church leadership roles',
      courses: ['basics', 'liturgy', 'theology'],
      duration: '18 weeks',
      icon: <GraduationCap className="w-6 h-6" />
    }
  ];

  const resources = [
    {
      title: 'Orthodox Study Bible',
      type: 'Scripture',
      description: 'Complete Bible with Orthodox commentary and study notes',
      access: 'Free Download'
    },
    {
      title: 'Philokalia Digital Library',
      type: 'Patristic Texts',
      description: 'Collection of spiritual writings from Orthodox Church Fathers',
      access: 'Online Reading'
    },
    {
      title: 'Orthodox Catechism',
      type: 'Teaching Material',
      description: 'Comprehensive guide to Orthodox faith and practice',
      access: 'PDF Download'
    },
    {
      title: 'Audio Lectures Series',
      type: 'Multimedia',
      description: 'Over 100 hours of Orthodox theology lectures',
      access: 'Streaming'
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
          <h1 className="orthodox-heading text-5xl md:text-6xl font-bold text-gold mb-6">Learning Center</h1>
          <div className="w-24 h-1 bg-byzantine mx-auto mb-6"></div>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Embark on your spiritual journey with comprehensive courses, study materials, 
            and guided paths to deepen your understanding of Orthodox Christianity.
          </p>
        </motion.div>

        <Tabs defaultValue="courses" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-[#1A1F2C]/60">
            <TabsTrigger value="courses" className="text-white">Courses</TabsTrigger>
            <TabsTrigger value="paths" className="text-white">Study Paths</TabsTrigger>
            <TabsTrigger value="resources" className="text-white">Resources</TabsTrigger>
            <TabsTrigger value="progress" className="text-white">My Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <Card 
                    key={course.id} 
                    className="bg-[#1A1F2C]/60 border-gold/20 hover:border-gold/40 transition-all"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-gold mb-2">{course.title}</CardTitle>
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline" className="border-byzantine text-byzantine">
                              {course.level}
                            </Badge>
                            <Badge variant="outline" className="border-gold text-gold">
                              <Clock className="w-3 h-3 mr-1" />
                              {course.duration}
                            </Badge>
                          </div>
                          <p className="text-white/70 text-sm">{course.description}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm text-white/60 mb-2">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-white/60 text-sm">
                          <strong>Instructor:</strong> {course.instructor}
                        </p>
                        <div className="space-y-2">
                          <h4 className="text-gold text-sm font-semibold">Course Modules:</h4>
                          {course.modules.slice(0, 3).map((module, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <CheckCircle className={`w-4 h-4 ${module.completed ? 'text-green-500' : 'text-gray-500'}`} />
                              <span className={module.completed ? 'text-white/80' : 'text-white/60'}>
                                {module.title}
                              </span>
                              <span className="text-white/40 text-xs">({module.duration})</span>
                            </div>
                          ))}
                          {course.modules.length > 3 && (
                            <p className="text-white/40 text-xs">
                              +{course.modules.length - 3} more modules
                            </p>
                          )}
                        </div>
                        <Button 
                          className="w-full bg-byzantine hover:bg-byzantine-dark text-white"
                          onClick={() => setSelectedCourse(course.id)}
                        >
                          {course.progress > 0 ? 'Continue Course' : 'Start Course'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="paths">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid gap-6">
                {studyPaths.map((path, index) => (
                  <Card key={index} className="bg-[#1A1F2C]/60 border-gold/20">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="text-gold">{path.icon}</div>
                        <div>
                          <CardTitle className="text-gold">{path.title}</CardTitle>
                          <p className="text-white/70">{path.description}</p>
                          <Badge variant="outline" className="mt-2 border-byzantine text-byzantine">
                            {path.duration} total
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <h4 className="text-gold font-semibold">Included Courses:</h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {path.courses.map((courseId) => {
                            const course = courses.find(c => c.id === courseId);
                            return (
                              <div key={courseId} className="bg-[#0c111f]/50 p-3 rounded-lg">
                                <p className="text-white/80 font-medium">{course?.title}</p>
                                <p className="text-white/60 text-sm">{course?.duration}</p>
                              </div>
                            );
                          })}
                        </div>
                        <Button variant="outline" className="w-full border-gold/30 text-gold hover:bg-gold/10">
                          Start Learning Path
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="resources">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                {resources.map((resource, index) => (
                  <Card key={index} className="bg-[#1A1F2C]/60 border-gold/20">
                    <CardHeader>
                      <CardTitle className="text-gold">{resource.title}</CardTitle>
                      <Badge variant="outline" className="w-fit border-byzantine text-byzantine">
                        {resource.type}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/80 mb-4">{resource.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-sm">{resource.access}</span>
                        <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10">
                          Access Resource
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="progress">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-[#1A1F2C]/60 border-gold/20">
                <CardHeader>
                  <CardTitle className="text-gold">Your Learning Journey</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gold mb-2">3</div>
                      <p className="text-white/70">Courses Enrolled</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-byzantine mb-2">47</div>
                      <p className="text-white/70">Hours Completed</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gold mb-2">12</div>
                      <p className="text-white/70">Certificates Earned</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-[#1A1F2C]/60 border-gold/20">
                <CardHeader>
                  <CardTitle className="text-gold">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="text-white/80">Completed "The Jesus Prayer" module</p>
                        <p className="text-white/50 text-sm">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Star className="w-5 h-5 text-gold" />
                      <div>
                        <p className="text-white/80">Earned certificate in "Orthodox Prayer"</p>
                        <p className="text-white/50 text-sm">1 week ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-byzantine" />
                      <div>
                        <p className="text-white/80">Joined study group discussion</p>
                        <p className="text-white/50 text-sm">2 weeks ago</p>
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

export default LearningCenter;
