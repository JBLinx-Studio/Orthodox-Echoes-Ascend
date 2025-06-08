import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BlogPost, BlogCategory } from '@/types/BlogPost';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { BlogPostDetail } from '@/components/blog/BlogPostDetail';
import { BlogPostEditor } from '@/components/blog/BlogPostEditor';
import { Search, Edit, Plus, X, BookOpen, Feather, Library } from 'lucide-react';

// Get sample blog posts from localStorage or use defaults
const getSavedBlogPosts = (): BlogPost[] => {
  const savedPosts = localStorage.getItem('orthodoxEchoesBlogPosts');
  if (savedPosts) {
    const posts = JSON.parse(savedPosts);
    // Filter out draft posts for public display
    return posts.filter((post: BlogPost) => !post.draft);
  }
  
  // Sample content with proper categorization
  return [
    {
      id: "1",
      title: "The Divine Liturgy: A Heavenly Experience",
      excerpt: "Exploring the profound mysteries of the Orthodox Divine Liturgy and its celestial symbolism.",
      content: `
        <p>The Divine Liturgy stands at the center of Orthodox Christian worship, representing heaven on earth through sacred ritual and profound symbolism. Dating back to the early Church, it has remained remarkably consistent through the centuries.</p>
        
        <p>When entering an Orthodox church during the Divine Liturgy, one is immediately transported to a different realm. The incense, representing the prayers of the faithful rising to heaven, fills the air. Icons of Christ, the Theotokos, and the saints surround the worshippers, creating a tangible connection between heaven and earth.</p>
        
        <p>The liturgy itself unfolds in a series of carefully choreographed movements, each rich with meaning. The priest, vested in garments representing Christ's glory, leads the faithful through prayers, scripture readings, and ultimately to the Holy Eucharist – the very Body and Blood of Christ.</p>
        
        <p>Through the Divine Liturgy, Orthodox Christians participate in the Heavenly Liturgy, joining with angels and saints in worship before the throne of God. It transcends time, connecting worshippers to the eternal reality of God's Kingdom.</p>
      `,
      author: "Fr. Seraphim",
      publishDate: "March 15, 2025",
      imageUrl: "https://images.unsplash.com/photo-1574039677318-3febf1c5c8e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      tags: ["Liturgy", "Worship", "Theology"],
      featured: true,
      category: "articles",
      contentType: "article"
    },
    {
      id: "2",
      title: "St. Athanasius and the Defense of Orthodoxy",
      excerpt: "How one man's unwavering faith preserved the Orthodox understanding of Christ's divinity.",
      content: `
        <p>St. Athanasius of Alexandria (c. 296-373) stands as one of the most important figures in Christian history, particularly for his steadfast defense of Orthodox doctrine during the Arian controversy.</p>
        
        <p>During a time when the heresy of Arianism—which denied the full divinity of Christ—was gaining widespread acceptance even among church leaders, Athanasius remained unwavering in his commitment to the truth of the Nicene Creed.</p>
        
        <p>As Bishop of Alexandria, Athanasius faced exile five times for his beliefs, earning him the title "Athanasius Contra Mundum" (Athanasius Against the World). Despite overwhelming opposition, he continued to write, teach, and defend the Orthodox understanding of Christ's nature.</p>
        
        <p>His theological work, particularly "On the Incarnation," remains one of the most profound explanations of why God became man. His steadfastness ensured that the Church maintained the full understanding of Christ as both fully God and fully human—essential to our salvation.</p>
        
        <p>St. Athanasius reminds us of the importance of standing firm in truth, even when it seems the entire world stands against us.</p>
      `,
      author: "Dr. Timothy Orthodox",
      publishDate: "April 2, 2025",
      imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      tags: ["Saints", "Church History", "Theology"],
      featured: true,
      category: "articles",
      contentType: "article"
    },
    {
      id: "3",
      title: "Modern Faith in Ancient Traditions",
      excerpt: "Navigating contemporary life while staying true to Orthodox principles.",
      content: `
        <p>In our rapidly changing world, Orthodox Christians face unique challenges in maintaining their faith while engaging with modern society. This personal reflection explores how we can live authentically Orthodox lives in the 21st century.</p>
        
        <p>The beauty of Orthodoxy lies in its timeless wisdom that speaks to every generation. While the world around us transforms, the fundamental truths of our faith remain constant, offering stability and direction in uncertain times.</p>
        
        <p>Through prayer, fasting, and participation in the sacraments, we find ways to sanctify our daily lives, transforming ordinary moments into opportunities for spiritual growth and communion with God.</p>
      `,
      author: "Maria Christodoulou",
      publishDate: "April 5, 2025",
      imageUrl: "https://images.unsplash.com/photo-1595118216242-53018840a9f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      tags: ["Modern Life", "Spirituality", "Personal Reflection"],
      featured: false,
      category: "blog",
      contentType: "blog"
    },
    {
      id: "4",
      title: "The Mystical Theology of St. John Chrysostom",
      excerpt: "Chapter 1: Introduction to the Golden-Mouthed Preacher's Spiritual Teachings",
      content: `
        <h2>Chapter 1: The Foundation of Mystical Understanding</h2>
        
        <p>St. John Chrysostom, known as the Golden-Mouthed preacher, offers us profound insights into the mystical dimensions of Orthodox theology. His homilies and writings reveal a deep understanding of the relationship between divine revelation and human experience.</p>
        
        <p>In this comprehensive study, we explore how Chrysostom's theological method bridges the gap between academic theology and lived spiritual experience. His approach to Scripture interpretation demonstrates how divine truth is not merely intellectual but transformative.</p>
        
        <p>The Archbishop of Constantinople understood that true theology must lead to theosis—the divine transformation of the human person. This book examines how his teachings can guide modern Orthodox Christians toward deeper spiritual maturity.</p>
        
        <h3>The Method of Divine Contemplation</h3>
        
        <p>Chrysostom's approach to divine contemplation was both rigorous and accessible. He believed that every Christian, regardless of their educational background, could access the profound mysteries of faith through humble prayer and careful attention to Scripture...</p>
      `,
      author: "Metropolitan Kallistos",
      publishDate: "March 20, 2025",
      imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      tags: ["Patristics", "Mystical Theology", "St. John Chrysostom"],
      featured: true,
      category: "books",
      contentType: "book"
    },
    {
      id: "5",
      title: "Living the Orthodox Way: A Complete Guide",
      excerpt: "A comprehensive manual for Orthodox Christian living in the modern world",
      content: `
        <h2>Table of Contents</h2>
        
        <h3>Part I: Foundations of Faith</h3>
        <ul>
          <li>Chapter 1: Understanding Orthodox Theology</li>
          <li>Chapter 2: The Holy Trinity and Divine Economy</li>
          <li>Chapter 3: Christ and Salvation</li>
        </ul>
        
        <h3>Part II: Sacramental Life</h3>
        <ul>
          <li>Chapter 4: Baptism and Chrismation</li>
          <li>Chapter 5: The Divine Liturgy</li>
          <li>Chapter 6: Marriage and Monasticism</li>
        </ul>
        
        <h3>Part III: Spiritual Practices</h3>
        <ul>
          <li>Chapter 7: Prayer and Contemplation</li>
          <li>Chapter 8: Fasting and Feasting</li>
          <li>Chapter 9: Reading the Fathers</li>
        </ul>
        
        <p>This comprehensive guide provides practical wisdom for living an authentic Orthodox life, drawing from Scripture, the Church Fathers, and centuries of spiritual tradition...</p>
      `,
      author: "Archimandrite Sophrony",
      publishDate: "February 15, 2025",
      imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      tags: ["Practical Orthodox", "Spiritual Life", "Guide"],
      featured: false,
      category: "books",
      contentType: "book"
    }
  ];
};

// Get categories from localStorage
const getCategories = (): BlogCategory[] => {
  const savedCategories = localStorage.getItem('orthodoxEchoesCategories');
  if (savedCategories) {
    return JSON.parse(savedCategories);
  }
  
  // Default categories
  return [
    { id: "articles", name: "Sacred Articles", slug: "articles" },
    { id: "blog", name: "Spiritual Blog", slug: "blog" },
    { id: "books", name: "Sacred Library", slug: "books" },
    { id: "theology", name: "Theology", slug: "theology" },
    { id: "liturgy", name: "Liturgy", slug: "liturgy" },
    { id: "spirituality", name: "Spirituality", slug: "spirituality" },
    { id: "history", name: "Church History", slug: "history" },
    { id: "saints", name: "Saints", slug: "saints" }
  ];
};

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>(getSavedBlogPosts());
  const [categories, setCategories] = useState<BlogCategory[]>(getCategories());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('featured');
  const { id } = useParams<{ id: string }>();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isAddingPost, setIsAddingPost] = useState<boolean>(false);
  const [isEditingPost, setIsEditingPost] = useState<boolean>(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Sacred Content | Orthodox Echoes";
    
    // Check if user is admin
    const adminData = localStorage.getItem('orthodoxEchoesAdmin');
    setIsAdmin(!!adminData);
    
    if (id) {
      const post = posts.find(post => post.id === id);
      if (post) {
        setSelectedPost(post);
        // Track view
        const updatedPosts = posts.map(p => 
          p.id === post.id ? { ...p, views: (p.views || 0) + 1 } : p
        );
        setPosts(updatedPosts);
        savePosts(updatedPosts);
      } else {
        toast.error("Content not found", {
          description: "The content you're looking for doesn't exist or has been removed."
        });
        navigate('/blog');
      }
    } else {
      setSelectedPost(null);
    }
  }, [id, posts, navigate]);
  
  const savePosts = (updatedPosts: BlogPost[]) => {
    // Get full posts list including drafts
    const savedPosts = localStorage.getItem('orthodoxEchoesBlogPosts');
    if (savedPosts) {
      const allPosts = JSON.parse(savedPosts);
      const draftPosts = allPosts.filter((post: BlogPost) => post.draft);
      
      // Merge published posts with draft posts
      const combinedPosts = [...updatedPosts, ...draftPosts.filter((draft: BlogPost) => 
        !updatedPosts.some(post => post.id === draft.id)
      )];
      
      localStorage.setItem('orthodoxEchoesBlogPosts', JSON.stringify(combinedPosts));
    } else {
      localStorage.setItem('orthodoxEchoesBlogPosts', JSON.stringify(updatedPosts));
    }
  };
  
  const filteredPosts = posts.filter(post => {
    // First apply tab filter
    if (activeTab === 'featured' && !post.featured) return false;
    if (activeTab === 'articles' && post.contentType !== 'article') return false;
    if (activeTab === 'blog' && post.contentType !== 'blog') return false;
    if (activeTab === 'books' && post.contentType !== 'book') return false;
    if (activeTab !== 'featured' && activeTab !== 'articles' && activeTab !== 'blog' && activeTab !== 'books') {
      const categorySlug = categories.find(cat => cat.name.toLowerCase() === activeTab.toLowerCase())?.id;
      if (categorySlug && post.category !== categorySlug) return false;
    }
    
    // Then apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return true;
  });
  
  const featuredPosts = posts.filter(post => post.featured);
  const articlePosts = posts.filter(post => post.contentType === 'article');
  const blogPosts = posts.filter(post => post.contentType === 'blog');
  const bookPosts = posts.filter(post => post.contentType === 'book');

  const handleLikePost = (postId: string) => {
    const updatedPosts = posts.map(post => 
      post.id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post
    );
    setPosts(updatedPosts);
    savePosts(updatedPosts);
    toast.success("Content liked!");
  };
  
  const handleAddPost = () => {
    setIsAddingPost(true);
    setIsEditingPost(false);
    setSelectedPost(null);
  };
  
  const handleEditPost = (post: BlogPost) => {
    setSelectedPost(post);
    setIsEditingPost(true);
    setIsAddingPost(false);
  };
  
  const handleSavePost = (post: BlogPost) => {
    let updatedPosts: BlogPost[];
    
    if (isEditingPost) {
      updatedPosts = posts.map(p => p.id === post.id ? post : p);
      setPosts(updatedPosts);
      savePosts(updatedPosts);
      
      setIsEditingPost(false);
      setSelectedPost(post);
    } else {
      updatedPosts = [...posts, post];
      setPosts(updatedPosts);
      savePosts(updatedPosts);
      
      setIsAddingPost(false);
      setSelectedPost(post);
    }
  };
  
  const handleCancelEdit = () => {
    if (isEditingPost) {
      setIsEditingPost(false);
      // If we were editing an existing post, go back to viewing it
      if (selectedPost) {
        // Maintain the selected post
      } else {
        navigate('/blog');
      }
    } else {
      setIsAddingPost(false);
      navigate('/blog');
    }
  };
  
  const handleDeletePost = (postId: string) => {
    if (confirm("Are you sure you want to delete this content? This action cannot be undone.")) {
      const updatedPosts = posts.filter(post => post.id !== postId);
      setPosts(updatedPosts);
      savePosts(updatedPosts);
      toast.success("Content deleted successfully");
      navigate('/blog');
    }
  };
  
  if (isAddingPost) {
    return (
      <div className="container mx-auto px-4 py-8">
        <BlogPostEditor 
          onSave={handleSavePost} 
          onCancel={handleCancelEdit} 
          isAdmin={isAdmin}
        />
      </div>
    );
  }
  
  if (isEditingPost && selectedPost) {
    return (
      <div className="container mx-auto px-4 py-8">
        <BlogPostEditor 
          post={selectedPost} 
          onSave={handleSavePost} 
          onCancel={handleCancelEdit}
          isAdmin={isAdmin}
        />
      </div>
    );
  }
  
  if (selectedPost) {
    return (
      <BlogPostDetail 
        post={selectedPost} 
        onLike={() => handleLikePost(selectedPost.id)} 
        onEdit={isAdmin ? () => handleEditPost(selectedPost) : undefined}
        onDelete={isAdmin ? () => handleDeletePost(selectedPost.id) : undefined}
      />
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold orthodox-heading text-gold mb-2">Sacred Content Library</h1>
            <p className="text-white/70 max-w-2xl">
              Explore our comprehensive collection of Orthodox articles, spiritual blogs, and sacred books to deepen your understanding of the faith.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-auto">
              <div className="flex">
                <div className="relative flex-grow">
                  <Input
                    placeholder="Search content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10 bg-[#1A1F2C]/70 border-gold/30 min-w-[200px]"
                    aria-label="Search content"
                  />
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gold/60" />
                  {searchQuery && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                      onClick={() => setSearchQuery('')}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
            {isAdmin && (
              <Button 
                onClick={handleAddPost} 
                className="bg-byzantine hover:bg-byzantine-dark shadow-gold/10 shadow-lg whitespace-nowrap"
              >
                <Plus className="h-4 w-4 mr-2" /> New Content
              </Button>
            )}
          </div>
        </div>
        
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="bg-[#1A1F2C]/70 border border-gold/20">
            <TabsTrigger value="featured" className="flex items-center gap-2">
              Featured
            </TabsTrigger>
            <TabsTrigger value="articles" className="flex items-center gap-2">
              <Feather className="h-4 w-4" />
              Articles
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Blog
            </TabsTrigger>
            <TabsTrigger value="books" className="flex items-center gap-2">
              <Library className="h-4 w-4" />
              Books
            </TabsTrigger>
            <TabsTrigger value="theology">Theology</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="spirituality">Spirituality</TabsTrigger>
          </TabsList>
          
          <TabsContent value="featured" className="pt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gold mb-4">Featured Content</h2>
              <p className="text-white/60 mb-6">Our most important and inspiring content, carefully selected for spiritual growth.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.length > 0 ? (
                featuredPosts.map(post => (
                  <BlogPostCard 
                    key={post.id} 
                    post={post} 
                    onLike={() => handleLikePost(post.id)} 
                  />
                ))
              ) : (
                <p className="text-white/70">No featured content available.</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="articles" className="pt-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="p-2 bg-gold/10 rounded-lg">
                <Feather className="h-6 w-6 text-gold" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gold">Sacred Articles</h2>
                <p className="text-white/60">In-depth theological studies and scholarly discourse on Orthodox Christianity</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articlePosts.length > 0 ? (
                articlePosts.map(post => (
                  <BlogPostCard 
                    key={post.id} 
                    post={post} 
                    onLike={() => handleLikePost(post.id)} 
                    onEdit={isAdmin ? handleEditPost : undefined}
                  />
                ))
              ) : (
                <p className="text-white/70">No articles available.</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="blog" className="pt-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="p-2 bg-byzantine/10 rounded-lg">
                <Edit className="h-6 w-6 text-byzantine" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gold">Spiritual Blog</h2>
                <p className="text-white/60">Personal reflections and contemporary insights for modern Orthodox living</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.length > 0 ? (
                blogPosts.map(post => (
                  <BlogPostCard 
                    key={post.id} 
                    post={post} 
                    onLike={() => handleLikePost(post.id)} 
                    onEdit={isAdmin ? handleEditPost : undefined}
                  />
                ))
              ) : (
                <p className="text-white/70">No blog posts available.</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="books" className="pt-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="p-2 bg-gold/10 rounded-lg">
                <Library className="h-6 w-6 text-gold" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gold">Sacred Library</h2>
                <p className="text-white/60">Complete books and comprehensive works on Orthodox theology and tradition</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {bookPosts.length > 0 ? (
                bookPosts.map(post => (
                  <BlogPostCard 
                    key={post.id} 
                    post={post} 
                    onLike={() => handleLikePost(post.id)} 
                    onEdit={isAdmin ? handleEditPost : undefined}
                  />
                ))
              ) : (
                <p className="text-white/70">No books available.</p>
              )}
            </div>
          </TabsContent>
          
          {/* Dynamic category tabs */}
          {['theology', 'history', 'spirituality'].map(categoryName => (
            <TabsContent key={categoryName} value={categoryName} className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map(post => (
                    <BlogPostCard 
                      key={post.id} 
                      post={post}
                      onLike={() => handleLikePost(post.id)}
                      onEdit={isAdmin ? handleEditPost : undefined}
                    />
                  ))
                ) : (
                  <p className="text-white/70">No content available in this category.</p>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </div>
  );
}
