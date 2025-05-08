import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BlogPost } from '@/types/BlogPost';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, Edit, FileText } from 'lucide-react';

// Sample blog posts
const ARTICLES: BlogPost[] = [
  {
    id: "1",
    title: "The Divine Liturgy: A Heavenly Experience",
    excerpt: "Exploring the profound mysteries of the Orthodox Divine Liturgy and its celestial symbolism.",
    content: "Full article content here...",
    author: "Fr. Seraphim",
    publishDate: "March 15, 2025",
    imageUrl: "https://images.unsplash.com/photo-1574039677318-3febf1c5c8e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    tags: ["Liturgy", "Worship", "Theology"],
    featured: true,
    category: "liturgy",
    readTime: 8,
    contentType: "article"
  },
  {
    id: "5",
    title: "The Meaning of Orthodox Iconography",
    excerpt: "Exploring the theological significance of icons as windows to heaven.",
    content: "Full article content here...",
    author: "Iconographer Maria",
    publishDate: "March 22, 2025",
    imageUrl: "https://images.unsplash.com/photo-1594822566893-f1e6e0444888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    tags: ["Iconography", "Art", "Theology"],
    featured: true,
    category: "art",
    readTime: 7,
    contentType: "article"
  },
];

const BLOGS: BlogPost[] = [
  {
    id: "2",
    title: "St. Athanasius and the Defense of Orthodoxy",
    excerpt: "How one man's unwavering faith preserved the Orthodox understanding of Christ's divinity.",
    content: "Full blog content here...",
    author: "Dr. Timothy Orthodox",
    publishDate: "April 2, 2025",
    imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    tags: ["Saints", "Church History", "Theology"],
    featured: true,
    category: "saints",
    readTime: 12,
    contentType: "blog"
  },
  {
    id: "6",
    title: "The Jesus Prayer: Lord Have Mercy",
    excerpt: "Exploring the history, practice, and spiritual benefits of the Jesus Prayer in Orthodox tradition.",
    content: "Full blog content here...",
    author: "Hieromonk Gabriel",
    publishDate: "April 5, 2025",
    imageUrl: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Spirituality", "Prayer", "Traditions"],
    featured: false,
    category: "spirituality",
    readTime: 9,
    contentType: "blog"
  },
];

const BOOKS: BlogPost[] = [
  {
    id: "3",
    title: "Understanding the Holy Trinity",
    excerpt: "A theological exploration of the Orthodox understanding of the Triune God.",
    content: "Full book content here...",
    author: "Metropolitan Nicholas",
    publishDate: "March 28, 2025",
    imageUrl: "https://images.unsplash.com/photo-1595118216242-53018840a9f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    tags: ["Theology", "Doctrine", "Faith"],
    featured: false,
    category: "theology",
    readTime: 15,
    contentType: "book"
  },
  {
    id: "4",
    title: "The Great Schism of 1054",
    excerpt: "Examining the historical and theological factors that led to the divide between East and West.",
    content: "Full book content here...",
    author: "Prof. Alexandra Konstantinidis",
    publishDate: "April 10, 2025",
    imageUrl: "https://images.unsplash.com/photo-1548407260-da850faa41e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    tags: ["Church History", "East-West Schism"],
    featured: true,
    category: "history",
    readTime: 10,
    contentType: "book"
  },
];

function PostCard({ post }: { post: BlogPost }) {
  const navigate = useNavigate();
  
  const getContentTypeIcon = () => {
    switch (post.contentType) {
      case 'article':
        return <FileText className="h-4 w-4 text-gold mr-2" />;
      case 'blog':
        return <Edit className="h-4 w-4 text-gold mr-2" />;
      case 'book':
        return <BookOpen className="h-4 w-4 text-gold mr-2" />;
      default:
        return <FileText className="h-4 w-4 text-gold mr-2" />;
    }
  };
  
  return (
    <Card className="overflow-hidden bg-[#1A1F2C]/70 backdrop-blur-md border-gold/20 hover:border-gold/40 transition-all duration-300 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#0a0d16]/90 to-transparent h-16" />
        <div className="absolute top-2 left-2 flex items-center bg-byzantine/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
          {getContentTypeIcon()}
          <span className="capitalize">{post.contentType}</span>
        </div>
      </div>
      <CardContent className="flex-grow flex flex-col p-5">
        <div className="mb-2 text-sm text-gold/80">{post.publishDate}</div>
        <h3 className="text-xl font-display text-white mb-3 line-clamp-2 relative orthodox-heading">
          {post.title}
        </h3>
        <p className="text-white/70 line-clamp-3 mb-4 flex-grow">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gold/10">
          <div className="text-sm text-white/60">
            By {post.author}
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/50"
            onClick={() => navigate(`/blog/${post.id}`)}
          >
            Read More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ContentSection({ title, description, items }: { title: string, description: string, items: BlogPost[] }) {
  return (
    <div className="mb-16">
      <div className="mb-8">
        <h2 className="text-3xl font-display font-bold text-white mb-2 orthodox-heading">{title}</h2>
        <p className="text-white/70">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

function BlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  
  // If we have an ID, show a single post
  if (id) {
    // Find the post from any category
    const post = [...ARTICLES, ...BLOGS, ...BOOKS].find(post => post.id === id);
    
    if (!post) {
      return (
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Post not found</h2>
            <Button onClick={() => navigate('/blog')}>
              Back to Blog
            </Button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button 
          variant="outline" 
          className="mb-6 border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/50"
          onClick={() => navigate('/blog')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all posts
        </Button>
        
        <div className="bg-[#1A1F2C]/70 backdrop-blur-md border border-gold/20 rounded-lg overflow-hidden">
          <div className="h-64 md:h-80 relative">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#0a0d16] via-[#0a0d16]/70 to-transparent h-32">
            </div>
          </div>
          
          <div className="p-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center bg-byzantine/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                {post.contentType === 'article' && <FileText className="h-4 w-4 text-white mr-1" />}
                {post.contentType === 'blog' && <Edit className="h-4 w-4 text-white mr-1" />}
                {post.contentType === 'book' && <BookOpen className="h-4 w-4 text-white mr-1" />}
                <span className="capitalize">{post.contentType}</span>
              </div>
              <span className="text-sm text-gold/80">{post.publishDate}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 orthodox-heading">
              {post.title}
            </h1>
            
            <div className="flex items-center text-white/60 mb-6">
              <span>By {post.author}</span>
              <span className="mx-2">•</span>
              <span>{post.readTime} min read</span>
            </div>
            
            <div className="prose prose-invert max-w-none">
              {/* Placeholder content since we don't have real content */}
              <p className="text-white/80 leading-relaxed">
                In the rich tapestry of Orthodox Christian tradition, {post.title.toLowerCase()} stands as a profound testament to the depth and beauty of our faith. This {post.contentType} explores the theological, historical, and spiritual dimensions of this topic with reverence and scholarly insight.
              </p>
              <p className="text-white/80 leading-relaxed mt-4">
                {post.excerpt} Through careful examination of patristic sources and liturgical practices, we can gain a deeper understanding of how this aspect of Orthodox life connects us to the apostolic faith and the communion of saints across time.
              </p>
              <p className="text-white/80 leading-relaxed mt-4">
                As we contemplate these sacred mysteries, we are invited into a deeper relationship with Christ and His Church. The wisdom of the Holy Fathers provides guidance for our spiritual journey, illuminating the path of theosis—our deification through God's grace.
              </p>
              <p className="text-white/80 leading-relaxed mt-4">
                May this humble exploration serve to enrich your faith and deepen your appreciation for the inexhaustible treasures of Orthodox Christianity.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-8">
              {post.tags.map(tag => (
                <span 
                  key={tag} 
                  className="bg-gold/10 text-gold px-3 py-1 text-sm rounded-full hover:bg-gold/20 transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Otherwise show the blog listing page
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 orthodox-heading">
          Orthodox Wisdom & Reflections
        </h1>
        <p className="text-white/70 text-lg">
          Explore articles, blogs, and books that illuminate the richness of Orthodox Christianity
        </p>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-12">
        <div className="flex justify-center">
          <TabsList className="bg-[#1A1F2C]/50 backdrop-blur-sm border border-gold/20">
            <TabsTrigger value="all">All Content</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="books">Books</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="mt-8">
          <ContentSection 
            title="Articles" 
            description="In-depth explorations of Orthodox theology and practice"
            items={ARTICLES} 
          />
          <ContentSection 
            title="Blog Posts" 
            description="Personal reflections and contemporary Orthodox perspectives"
            items={BLOGS} 
          />
          <ContentSection 
            title="Books" 
            description="Comprehensive works on Orthodox Christianity"
            items={BOOKS} 
          />
        </TabsContent>
        
        <TabsContent value="articles" className="mt-8">
          <ContentSection 
            title="Articles" 
            description="In-depth explorations of Orthodox theology and practice"
            items={ARTICLES} 
          />
        </TabsContent>
        
        <TabsContent value="blogs" className="mt-8">
          <ContentSection 
            title="Blog Posts" 
            description="Personal reflections and contemporary Orthodox perspectives"
            items={BLOGS} 
          />
        </TabsContent>
        
        <TabsContent value="books" className="mt-8">
          <ContentSection 
            title="Books" 
            description="Comprehensive works on Orthodox Christianity"
            items={BOOKS} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default BlogPage;
