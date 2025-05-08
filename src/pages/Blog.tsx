
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { BlogPost } from '@/types/BlogPost';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calendar, Edit, Eye, FileText, Heart, Plus, Search, Tag, User } from 'lucide-react';
import { BlogPostDetail } from '@/components/blog/BlogPostDetail';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { OrthodoxIconFrame } from '@/components/ui/orthodox-icon-frame';

// Sample blog posts
const INITIAL_ARTICLES: BlogPost[] = [
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
    contentType: "article",
    views: 145,
    likes: 37
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
    contentType: "article",
    views: 124,
    likes: 28
  },
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
    contentType: "blog",
    views: 89,
    likes: 19
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
    contentType: "blog",
    views: 62,
    likes: 15
  },
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
    contentType: "book",
    views: 103,
    likes: 24
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
    contentType: "book",
    views: 78,
    likes: 18
  },
];

// All available categories
const CATEGORIES = [
  "liturgy", "art", "saints", "spirituality", "theology", "history", "prayer", 
  "icons", "tradition", "scripture", "church-life", "sacraments", "monasticism"
];

// All available tags
const TAGS = [
  "Liturgy", "Worship", "Theology", "Iconography", "Art", "Saints", "Church History", 
  "Spirituality", "Prayer", "Traditions", "Doctrine", "Faith", "East-West Schism",
  "Scripture", "Monasticism", "Family", "Modern Life", "Patristics"
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

function PostCard({ post, onClick }: { post: BlogPost; onClick: () => void }) {
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
    <motion.div variants={fadeInUp}>
      <Card 
        className="overflow-hidden bg-[#1A1F2C]/70 backdrop-blur-md border-gold/20 hover:border-gold/40 transition-all duration-300 h-full flex flex-col cursor-pointer holy-light"
        onClick={onClick}
      >
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
          {post.featured && (
            <div className="absolute top-2 right-2 bg-gold/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
              Featured
            </div>
          )}
        </div>
        <CardContent className="flex-grow flex flex-col p-5">
          <div className="mb-2 text-sm text-gold/80 flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {post.publishDate}
          </div>
          <h3 className="text-xl font-display text-white mb-3 line-clamp-2 orthodox-heading">
            {post.title}
          </h3>
          <p className="text-white/70 line-clamp-3 mb-4 flex-grow">
            {post.excerpt}
          </p>
          <div className="flex gap-2 flex-wrap mb-3">
            {post.tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="text-xs bg-gold/10 text-gold/80 px-2 py-0.5 rounded-full flex items-center">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
            {post.tags.length > 2 && (
              <span className="text-xs bg-gold/10 text-gold/80 px-2 py-0.5 rounded-full">
                +{post.tags.length - 2}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 pt-3 border-t border-gold/10">
            <div className="text-sm text-white/60 flex items-center">
              <Eye className="w-4 h-4 mr-1 text-white/40" />
              {post.views || 0}
              <Heart className="w-4 h-4 mr-1 ml-3 text-white/40" />
              {post.likes || 0}
            </div>
            <div className="text-sm text-white/60 flex items-center">
              <User className="w-3 h-3 mr-1" />
              {post.author}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ContentSection({ title, description, items, onPostClick }: { 
  title: string; 
  description: string; 
  items: BlogPost[];
  onPostClick: (post: BlogPost) => void;
}) {
  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mb-16"
    >
      <motion.div variants={fadeInUp} className="mb-8">
        <h2 className="text-3xl font-display font-bold text-white mb-2 orthodox-heading">{title}</h2>
        <p className="text-white/70">{description}</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(post => (
          <PostCard key={post.id} post={post} onClick={() => onPostClick(post)} />
        ))}
      </div>
    </motion.div>
  );
}

function BlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [contentTypeFilter, setContentTypeFilter] = useState("all");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  
  // Load posts from localStorage or initialize with sample data
  useEffect(() => {
    const savedPosts = localStorage.getItem('orthodoxEchoesBlogPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(INITIAL_ARTICLES);
      localStorage.setItem('orthodoxEchoesBlogPosts', JSON.stringify(INITIAL_ARTICLES));
    }
    
    // Check if admin
    const adminStatus = localStorage.getItem('orthodoxEchoesAdmin');
    setIsAdmin(adminStatus === 'true');
  }, []);
  
  // Select post from URL parameter
  useEffect(() => {
    if (id) {
      const post = posts.find(p => p.id === id);
      setSelectedPost(post || null);
    } else {
      setSelectedPost(null);
    }
  }, [id, posts]);
  
  const handlePostClick = (post: BlogPost) => {
    navigate(`/blog/${post.id}`);
    
    // Update view count
    const updatedPosts = posts.map(p => 
      p.id === post.id ? { ...p, views: (p.views || 0) + 1 } : p
    );
    setPosts(updatedPosts);
    localStorage.setItem('orthodoxEchoesBlogPosts', JSON.stringify(updatedPosts));
  };
  
  const handleCreateNew = () => {
    navigate('/admin?newPost=true');
    toast.info("Navigating to the admin panel to create a new post");
  };
  
  // Filter and group posts
  const getFilteredPosts = () => {
    return posts.filter(post => {
      const matchesSearch = filter === "" || 
        post.title.toLowerCase().includes(filter.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(filter.toLowerCase()) ||
        post.author.toLowerCase().includes(filter.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()));
      
      const matchesCategory = categoryFilter === "all" || post.category === categoryFilter;
      const matchesType = contentTypeFilter === "all" || post.contentType === contentTypeFilter;
      const matchesFeatured = !showFeaturedOnly || post.featured;
      
      return matchesSearch && matchesCategory && matchesType && matchesFeatured;
    });
  };
  
  const filteredPosts = getFilteredPosts();
  const articles = filteredPosts.filter(post => post.contentType === "article");
  const blogs = filteredPosts.filter(post => post.contentType === "blog");
  const books = filteredPosts.filter(post => post.contentType === "book");
  
  const featuredPosts = filteredPosts.filter(post => post.featured);
  
  // If we have an ID and found the post, show the post detail view
  if (selectedPost) {
    return (
      <BlogPostDetail 
        post={selectedPost}
        onLike={() => {
          // Update likes count
          const updatedPosts = posts.map(p => 
            p.id === selectedPost.id ? { ...p, likes: (p.likes || 0) + 1 } : p
          );
          setPosts(updatedPosts);
          localStorage.setItem('orthodoxEchoesBlogPosts', JSON.stringify(updatedPosts));
        }}
        onEdit={(post) => {
          navigate(`/admin?editPost=${post.id}`);
        }}
        onDelete={(postId) => {
          const updatedPosts = posts.filter(p => p.id !== postId);
          setPosts(updatedPosts);
          localStorage.setItem('orthodoxEchoesBlogPosts', JSON.stringify(updatedPosts));
          navigate('/blog');
          toast.success("Post deleted successfully");
        }}
      />
    );
  }
  
  // Otherwise show the blog listing page
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12 text-center max-w-2xl mx-auto"
      >
        <OrthodoxIconFrame iconType="decorative" size="lg" className="mb-6 mx-auto">
          <div className="flex justify-center">
            <span className="text-gold text-4xl">☦</span>
          </div>
        </OrthodoxIconFrame>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 orthodox-heading">
          Orthodox Wisdom & Reflections
        </h1>
        <p className="text-white/70 text-lg">
          Explore articles, blogs, and books that illuminate the richness of Orthodox Christianity
        </p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-10 flex flex-col md:flex-row justify-between gap-4"
      >
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 h-4 w-4" />
          <Input 
            placeholder="Search posts..." 
            className="pl-10 bg-[#1A1F2C]/40 border-gold/20"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px] bg-[#1A1F2C]/40 border-gold/20">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1F2C]/90 backdrop-blur-md border-gold/20">
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map(category => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={contentTypeFilter} onValueChange={setContentTypeFilter}>
            <SelectTrigger className="w-[140px] bg-[#1A1F2C]/40 border-gold/20">
              <SelectValue placeholder="Content Type" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1F2C]/90 backdrop-blur-md border-gold/20">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="article">Articles</SelectItem>
              <SelectItem value="blog">Blog Posts</SelectItem>
              <SelectItem value="book">Books</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            className={`border-gold/20 ${showFeaturedOnly ? 'bg-gold/20 text-white' : 'bg-transparent text-gold/80'}`}
            onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
          >
            {showFeaturedOnly ? 'All Posts' : 'Featured Only'}
          </Button>
          
          {isAdmin && (
            <Button 
              onClick={handleCreateNew}
              className="bg-byzantine hover:bg-byzantine-dark flex gap-2 items-center ml-auto"
            >
              <Plus className="h-4 w-4" />
              New Content
            </Button>
          )}
        </div>
      </motion.div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-12">
        <div className="flex justify-center">
          <TabsList className="bg-[#1A1F2C]/50 backdrop-blur-sm border border-gold/20">
            <TabsTrigger value="all">All Content</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="mt-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12 bg-[#1A1F2C]/30 backdrop-blur-sm rounded-lg border border-gold/10 p-8">
              <FileText className="w-12 h-12 text-gold/40 mx-auto mb-4" />
              <p className="text-white/60 text-lg">No content matching your filters.</p>
              {filter && <p className="mt-2 text-sm text-white/50">Try adjusting your search criteria.</p>}
              <Button variant="outline" className="mt-4 border-gold/20 text-gold" onClick={() => {
                setFilter('');
                setCategoryFilter('all');
                setContentTypeFilter('all');
                setShowFeaturedOnly(false);
              }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              {articles.length > 0 && (
                <ContentSection 
                  title="Articles" 
                  description="In-depth explorations of Orthodox theology and practice"
                  items={articles}
                  onPostClick={handlePostClick}
                />
              )}
              
              {blogs.length > 0 && (
                <ContentSection 
                  title="Blog Posts" 
                  description="Personal reflections and contemporary Orthodox perspectives"
                  items={blogs}
                  onPostClick={handlePostClick}
                />
              )}
              
              {books.length > 0 && (
                <ContentSection 
                  title="Books" 
                  description="Comprehensive works on Orthodox Christianity"
                  items={books}
                  onPostClick={handlePostClick}
                />
              )}
            </>
          )}
        </TabsContent>
        
        <TabsContent value="articles" className="mt-8">
          {articles.length > 0 ? (
            <ContentSection 
              title="Articles" 
              description="In-depth explorations of Orthodox theology and practice"
              items={articles}
              onPostClick={handlePostClick}
            />
          ) : (
            <div className="text-center py-12 bg-[#1A1F2C]/30 backdrop-blur-sm rounded-lg border border-gold/10 p-8">
              <p className="text-white/60">No articles matching your filters.</p>
              <Button variant="outline" className="mt-4 border-gold/20 text-gold" onClick={() => {
                setFilter('');
                setCategoryFilter('all');
                setShowFeaturedOnly(false);
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="blogs" className="mt-8">
          {blogs.length > 0 ? (
            <ContentSection 
              title="Blog Posts" 
              description="Personal reflections and contemporary Orthodox perspectives"
              items={blogs}
              onPostClick={handlePostClick}
            />
          ) : (
            <div className="text-center py-12 bg-[#1A1F2C]/30 backdrop-blur-sm rounded-lg border border-gold/10 p-8">
              <p className="text-white/60">No blog posts matching your filters.</p>
              <Button variant="outline" className="mt-4 border-gold/20 text-gold" onClick={() => {
                setFilter('');
                setCategoryFilter('all');
                setShowFeaturedOnly(false);
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="books" className="mt-8">
          {books.length > 0 ? (
            <ContentSection 
              title="Books" 
              description="Comprehensive works on Orthodox Christianity"
              items={books} 
              onPostClick={handlePostClick}
            />
          ) : (
            <div className="text-center py-12 bg-[#1A1F2C]/30 backdrop-blur-sm rounded-lg border border-gold/10 p-8">
              <p className="text-white/60">No books matching your filters.</p>
              <Button variant="outline" className="mt-4 border-gold/20 text-gold" onClick={() => {
                setFilter('');
                setCategoryFilter('all');
                setShowFeaturedOnly(false);
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="featured" className="mt-8">
          {featuredPosts.length > 0 ? (
            <ContentSection 
              title="Featured Content" 
              description="Highlighted works from our collection"
              items={featuredPosts}
              onPostClick={handlePostClick}
            />
          ) : (
            <div className="text-center py-12 bg-[#1A1F2C]/30 backdrop-blur-sm rounded-lg border border-gold/10 p-8">
              <p className="text-white/60">No featured content matching your filters.</p>
              <Button variant="outline" className="mt-4 border-gold/20 text-gold" onClick={() => {
                setFilter('');
                setCategoryFilter('all');
                setContentTypeFilter('all');
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Content tags section */}
      <div className="mt-16 mb-10">
        <h3 className="text-2xl font-display font-bold text-gold mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {TAGS.map(tag => (
            <Button 
              key={tag}
              variant="outline" 
              size="sm"
              className="border-gold/20 hover:border-gold/50 text-white/80 hover:text-white"
              onClick={() => setFilter(tag)}
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
