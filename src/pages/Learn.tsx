
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, GraduationCap, FileText, PenTool, BookMarked, MessageCircle, ChevronRight, Star, PlayCircle, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FeaturedCoursesData = [
  {
    id: 1,
    title: "Introduction to Orthodox Christianity",
    description: "A comprehensive overview of Orthodox theology, history, and practices for beginners.",
    image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    lessons: 12,
    duration: "6 weeks",
    level: "Beginner",
    featured: true,
    category: "theology"
  },
  {
    id: 2,
    title: "The Divine Liturgy: Understanding the Service",
    description: "Explore the profound meaning behind every aspect of the Orthodox Divine Liturgy.",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    lessons: 8,
    duration: "4 weeks",
    level: "Intermediate",
    featured: true,
    category: "liturgical"
  },
  {
    id: 3,
    title: "Lives of the Saints: Inspiration for Our Journey",
    description: "Learn from the examples of holy men and women throughout Orthodox history.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    lessons: 15,
    duration: "8 weeks",
    level: "All Levels",
    featured: true,
    category: "saints"
  }
];

const ResourcesData = [
  {
    id: 1,
    title: "Orthodox Prayer Book",
    description: "A collection of essential prayers for daily Orthodox practice.",
    type: "PDF",
    category: "prayer",
    icon: <BookMarked className="text-gold h-6 w-6" />
  },
  {
    id: 2,
    title: "Introduction to Icons",
    description: "Learn the meaning and purpose behind Orthodox iconography.",
    type: "Article",
    category: "iconography",
    icon: <FileText className="text-byzantine h-6 w-6" />
  },
  {
    id: 3,
    title: "Church Fathers Compilation",
    description: "Writings from influential early Church Fathers.",
    type: "E-Book",
    category: "patristics",
    icon: <BookOpen className="text-gold h-6 w-6" />
  },
  {
    id: 4,
    title: "Byzantine Chant Tutorial",
    description: "Introduction to the traditional musical system of the Orthodox Church.",
    type: "Audio",
    category: "music",
    icon: <PlayCircle className="text-byzantine h-6 w-6" />
  },
  {
    id: 5,
    title: "Orthodox Worship: A Glossary",
    description: "Terms and concepts used in Orthodox worship explained.",
    type: "PDF",
    category: "liturgical",
    icon: <BookMarked className="text-gold h-6 w-6" />
  },
  {
    id: 6,
    title: "Great Lent Study Guide",
    description: "Week-by-week guide through the spiritual journey of Great Lent.",
    type: "Document",
    category: "fasting",
    icon: <FileText className="text-byzantine h-6 w-6" />
  }
];

const LearningPathsData = [
  {
    id: 1,
    title: "Orthodox Catechism",
    description: "Structured learning path for those new to the Orthodox faith or seeking to join the Church.",
    steps: ["Introduction to Orthodoxy", "Core Beliefs", "Sacraments", "Prayer Life", "Church History", "Becoming Orthodox"],
    duration: "12 months",
    icon: <GraduationCap className="h-8 w-8 text-gold" />
  },
  {
    id: 2,
    title: "Spiritual Development",
    description: "Guide to growing in Orthodox spirituality through prayer, fasting, and spiritual disciplines.",
    steps: ["Prayer Foundations", "Fasting Practice", "Virtues & Vices", "Spiritual Reading", "Confession", "Theosis"],
    duration: "Ongoing",
    icon: <Star className="h-8 w-8 text-gold" />
  },
  {
    id: 3,
    title: "Liturgical Understanding",
    description: "Deep dive into the services and liturgical life of the Orthodox Church.",
    steps: ["Divine Liturgy", "Vespers & Matins", "Liturgical Calendar", "Feast Days", "Special Services", "Personal Participation"],
    duration: "6 months",
    icon: <BookOpen className="h-8 w-8 text-gold" />
  }
];

function ResourcesSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ResourcesData.map(resource => (
        <Card key={resource.id} className="bg-[#1A1F2C]/70 backdrop-blur-md border-gold/20 overflow-hidden hover:border-gold/40 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-[#1A1F2C] rounded-md border border-gold/10">
                {resource.icon}
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-byzantine/20 text-gold">
                {resource.type}
              </span>
            </div>
            <h3 className="text-lg font-display text-white mb-2">{resource.title}</h3>
            <p className="text-white/70 text-sm mb-4">{resource.description}</p>
            <Button variant="outline" size="sm" className="border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/50 w-full">
              <Download className="h-4 w-4 mr-2" /> Access Resource
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function CourseCard({ course }: { course: any }) {
  return (
    <Card className="overflow-hidden bg-[#1A1F2C]/70 backdrop-blur-md border-gold/20 flex flex-col h-full hover:border-gold/40 transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#0a0d16]/80 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <span className="px-2 py-1 bg-byzantine text-white text-xs rounded-full">{course.level}</span>
        </div>
      </div>
      <CardContent className="flex-grow flex flex-col p-5">
        <h3 className="text-xl font-display text-white mb-2">{course.title}</h3>
        <p className="text-white/70 mb-4 flex-grow">{course.description}</p>
        <div className="flex justify-between items-center text-sm text-white/60 border-t border-gold/10 pt-4 mt-2">
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1" />
            <span>{course.lessons} lessons</span>
          </div>
          <div>{course.duration}</div>
        </div>
        <Button className="mt-4 bg-byzantine hover:bg-byzantine-dark">
          Explore Course
        </Button>
      </CardContent>
    </Card>
  );
}

function LearningPathCard({ path }: { path: any }) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Card className="bg-[#1A1F2C]/70 backdrop-blur-md border-gold/20 overflow-hidden hover:border-gold/40 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-[#1A1F2C] rounded-full border border-gold/10">
            {path.icon}
          </div>
          <div>
            <h3 className="text-xl font-display text-white">{path.title}</h3>
            <p className="text-gold/80 text-sm">{path.duration}</p>
          </div>
        </div>
        
        <p className="text-white/70 mb-4">{path.description}</p>
        
        <Button 
          variant="outline" 
          className="w-full justify-between border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/50 mb-4"
          onClick={() => setExpanded(!expanded)}
        >
          View Path Details
          <ChevronRight className={`h-4 w-4 transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </Button>
        
        {expanded && (
          <div className="mt-4 border-t border-gold/10 pt-4 space-y-2">
            {path.steps.map((step: string, index: number) => (
              <div key={index} className="flex items-center">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-byzantine/20 text-gold flex items-center justify-center text-xs mr-3">
                  {index + 1}
                </div>
                <span className="text-white">{step}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function LearnPage() {
  const [activeTab, setActiveTab] = useState('courses');
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 orthodox-heading">
          Orthodox Learning Center
        </h1>
        <p className="text-white/70 text-lg mb-6">
          Deepen your understanding of Orthodox Christianity through our comprehensive learning resources
        </p>
        <div className="byzantine-border p-6 bg-[#1A1F2C]/60 backdrop-blur-sm mb-6">
          <div className="flex items-center mb-4">
            <GraduationCap className="h-6 w-6 text-gold mr-2" />
            <h2 className="text-xl font-display text-white">Your Learning Journey</h2>
          </div>
          <p className="text-white/80 mb-4">
            Welcome to the Orthodox Echoes Learning Center. Begin or continue your journey in understanding the depth and richness of Orthodox Christianity.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="bg-byzantine hover:bg-byzantine-dark">
              Start Learning
            </Button>
            <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/50">
              Explore Resources
            </Button>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="mb-12">
        <div className="flex justify-center">
          <TabsList className="bg-[#1A1F2C]/50 backdrop-blur-sm border border-gold/20">
            <TabsTrigger value="courses">
              <BookOpen className="h-4 w-4 mr-2" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="resources">
              <FileText className="h-4 w-4 mr-2" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="paths">
              <GraduationCap className="h-4 w-4 mr-2" />
              Learning Paths
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="courses" className="mt-8">
          <div className="mb-8">
            <h2 className="text-3xl font-display font-bold text-white mb-4 orthodox-heading">Featured Courses</h2>
            <p className="text-white/70 mb-6">Enriching courses designed to deepen your Orthodox understanding</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {FeaturedCoursesData.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
            
            <div className="text-center">
              <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/50">
                View All Courses <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="resources" className="mt-8">
          <div className="mb-8">
            <h2 className="text-3xl font-display font-bold text-white mb-4 orthodox-heading">Study Resources</h2>
            <p className="text-white/70 mb-6">Essential materials for your Orthodox education</p>
            
            <ResourcesSection />
          </div>
        </TabsContent>
        
        <TabsContent value="paths" className="mt-8">
          <div className="mb-8">
            <h2 className="text-3xl font-display font-bold text-white mb-4 orthodox-heading">Learning Paths</h2>
            <p className="text-white/70 mb-6">Structured journeys through Orthodox knowledge and practice</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {LearningPathsData.map(path => (
                <LearningPathCard key={path.id} path={path} />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-16 byzantine-border p-8 bg-[#1A1F2C]/60 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-byzantine/20 flex items-center justify-center">
              <MessageCircle className="h-8 w-8 text-gold" />
            </div>
          </div>
          <div className="flex-grow">
            <h3 className="text-2xl font-display text-white mb-2">Have Questions?</h3>
            <p className="text-white/70 mb-4">
              Our community of learners and Orthodox scholars are here to support your journey. Join the discussion or ask for guidance.
            </p>
            <Button className="bg-byzantine hover:bg-byzantine-dark">
              Connect With Mentors
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnPage;
