
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
import { Search, Edit, Plus, X, BookOpen, Feather, Library, Music, Video, Heart } from 'lucide-react';

// Get sample blog posts from localStorage or use defaults
const getSavedBlogPosts = (): BlogPost[] => {
  const savedPosts = localStorage.getItem('orthodoxEchoesBlogPosts');
  if (savedPosts) {
    const posts = JSON.parse(savedPosts);
    return posts.filter((post: BlogPost) => !post.draft);
  }
  
  return [
    {
      id: "1",
      title: "The Divine Liturgy: A Heavenly Experience",
      excerpt: "Exploring the profound mysteries of the Orthodox Divine Liturgy and its celestial symbolism.",
      content: `<p>The Divine Liturgy stands at the center of Orthodox Christian worship...</p>`,
      author: "Fr. Seraphim",
      publishDate: "March 15, 2025",
      imageUrl: "https://images.unsplash.com/photo-1574039677318-3febf1c5c8e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      tags: ["Liturgy", "Worship", "Theology"],
      featured: true,
      category: "articles",
      contentType: "article",
      likes: 45,
      views: 234
    },
    {
      id: "2",
      title: "Modern Faith in Ancient Traditions",
      excerpt: "Navigating contemporary life while staying true to Orthodox principles.",
      content: `<p>In our rapidly changing world, Orthodox Christians face unique challenges...</p>`,
      author: "Maria Christodoulou",
      publishDate: "April 5, 2025",
      imageUrl: "https://images.unsplash.com/photo-1595118216242-53018840a9f3?auto=format&fit=crop&w=1170&q=80",
      tags: ["Modern Life", "Spirituality", "Personal Reflection"],
      featured: false,
      category: "blog",
      contentType: "blog",
      likes: 28,
      views: 156
    },
    {
      id: "3",
      title: "The Mystical Theology of St. John Chrysostom",
      excerpt: "Chapter 1: Introduction to the Golden-Mouthed Preacher's Spiritual Teachings",
      content: `<h2>Chapter 1: The Foundation of Mystical Understanding</h2><p>St. John Chrysostom offers profound insights...</p>`,
      author: "Metropolitan Kallistos",
      publishDate: "March 20, 2025",
      imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1170&q=80",
      tags: ["Patristics", "Mystical Theology", "St. John Chrysostom"],
      featured: true,
      category: "books",
      contentType: "book",
      likes: 67,
      views: 445
    },
    {
      id: "4",
      title: "Kyrie Eleison - Ancient Chant",
      excerpt: "Traditional Byzantine chant expressing the cry for God's mercy",
      content: `<p>This ancient chant has been sung in Orthodox churches for centuries...</p>`,
      author: "Byzantine Choir",
      publishDate: "April 1, 2025",
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1170&q=80",
      tags: ["Chant", "Music", "Byzantine"],
      featured: false,
      category: "songs",
      contentType: "chant",
      audioUrl: "/audio/kyrie-eleison.mp3",
      likes: 89,
      views: 312
    },
    {
      id: "5",
      title: "Orthodox Wedding Ceremony Explained",
      excerpt: "Understanding the beautiful symbolism of Orthodox marriage traditions",
      content: `<p>The Orthodox wedding ceremony is rich with ancient traditions...</p>`,
      author: "Fr. Michael",
      publishDate: "March 28, 2025",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1170&q=80",
      tags: ["Marriage", "Sacraments", "Tradition"],
      featured: false,
      category: "videos",
      contentType: "liturgy",
      videoUrl: "/videos/orthodox-wedding.mp4",
      likes: 156,
      views: 678
    }
  ];
};

const getCategories = (): BlogCategory[] => {
  const savedCategories = localStorage.getItem('orthodoxEchoesCategories');
  if (savedCategories) {
    return JSON.parse(savedCategories);
  }
  
  return [
    { id: "articles", name: "Sacred Articles", slug: "articles", description: "In-depth theological studies" },
    { id: "blog", name: "Spiritual Blog", slug: "blog", description: "Personal reflections and insights" },
    { id: "books", name: "Sacred Library", slug: "books", description: "Complete books and works" },
    { id: "songs", name: "Sacred Music", slug: "songs", description: "Chants and hymns" },
    { id: "videos", name: "Visual Teaching", slug: "videos", description: "Educational videos" },
    { id: "prayers", name: "Prayer Collection", slug: "prayers", description: "Traditional prayers" },
    { id: "saints", name: "Lives of Saints", slug: "saints", description: "Hagiographies and stories" },
    { id: "theology", name: "Theology", slug: "theology", description: "Theological discourse" }
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
    
    const adminData = localStorage.getItem('orthodoxEchoesAdmin');
    setIsAdmin(!!adminData);
    
    if (id) {
      const post = posts.find(post => post.id === id);
      if (post) {
        setSelectedPost(post);
        handleViewPost(post.id);
      } else {
        toast.error("Content not found");
        navigate('/blog');
      }
    } else {
      setSelectedPost(null);
    }
  }, [id, navigate]);
  
  const savePosts = (updatedPosts: BlogPost[]) => {
    const savedPosts = localStorage.getItem('orthodoxEchoesBlogPosts');
    if (savedPosts) {
      const allPosts = JSON.parse(savedPosts);
      const draftPosts = allPosts.filter((post: BlogPost) => post.draft);
      const combinedPosts = [...updatedPosts, ...draftPosts.filter((draft: BlogPost) => 
        !updatedPosts.some(post => post.id === draft.id)
      )];
      localStorage.setItem('orthodoxEchoesBlogPosts', JSON.stringify(combinedPosts));
    } else {
      localStorage.setItem('orthodoxEchoesBlogPosts', JSON.stringify(updatedPosts));
    }
  };
  
  const filteredPosts = posts.filter(post => {
    // Apply tab filter
    if (activeTab === 'featured' && !post.featured) return false;
    if (activeTab === 'articles' && post.contentType !== 'article') return false;
    if (activeTab === 'blog' && post.contentType !== 'blog') return false;
    if (activeTab === 'books' && post.contentType !== 'book') return false;
    if (activeTab === 'songs' && post.contentType !== 'chant') return false;
    if (activeTab === 'videos' && post.contentType !== 'liturgy') return false;
    if (activeTab !== 'featured' && activeTab !== 'articles' && activeTab !== 'blog' && 
        activeTab !== 'books' && activeTab !== 'songs' && activeTab !== 'videos') {
      const categorySlug = categories.find(cat => cat.name.toLowerCase() === activeTab.toLowerCase())?.id;
      if (categorySlug && post.category !== categorySlug) return false;
    }
    
    // Apply search filter
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

  const handleLikePost = (postId: string) => {
    const updatedPosts = posts.map(post => 
      post.id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post
    );
    setPosts(updatedPosts);
    savePosts(updatedPosts);
    
    // Update selected post if it's the one being liked
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost({ ...selectedPost, likes: (selectedPost.likes || 0) + 1 });
    }
    
    toast.success("Content liked!", {
      description: "Thank you for your feedback!"
    });
  };

  const handleViewPost = (postId: string) => {
    const updatedPosts = posts.map(post => 
      post.id === postId ? { ...post, views: (post.views || 0) + 1 } : post
    );
    setPosts(updatedPosts);
    savePosts(updatedPosts);
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
    
    toast.success("Content saved successfully!");
  };
  
  const handleCancelEdit = () => {
    if (isEditingPost) {
      setIsEditingPost(false);
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
              Explore our comprehensive collection of Orthodox articles, spiritual blogs, sacred books, hymns, and educational content.
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
          <TabsList className="bg-[#1A1F2C]/70 border border-gold/20 grid-cols-6">
            <TabsTrigger value="featured" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
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
            <TabsTrigger value="songs" className="flex items-center gap-2">
              <Music className="h-4 w-4" />
              Songs
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Videos
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="featured" className="pt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gold mb-4">Featured Content</h2>
              <p className="text-white/60 mb-6">Our most important and inspiring content, carefully selected for spiritual growth.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.filter(post => post.featured).map(post => (
                <BlogPostCard 
                  key={post.id} 
                  post={post} 
                  onLike={() => handleLikePost(post.id)} 
                  onEdit={isAdmin ? handleEditPost : undefined}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="articles" className="pt-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="p-2 bg-gold/10 rounded-lg">
                <Feather className="h-6 w-6 text-gold" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gold">Sacred Articles</h2>
                <p className="text-white/60">In-depth theological studies and scholarly discourse</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.filter(post => post.contentType === 'article').map(post => (
                <BlogPostCard 
                  key={post.id} 
                  post={post} 
                  onLike={() => handleLikePost(post.id)} 
                  onEdit={isAdmin ? handleEditPost : undefined}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="blog" className="pt-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="p-2 bg-byzantine/10 rounded-lg">
                <Edit className="h-6 w-6 text-byzantine" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gold">Spiritual Blog</h2>
                <p className="text-white/60">Personal reflections and contemporary insights</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.filter(post => post.contentType === 'blog').map(post => (
                <BlogPostCard 
                  key={post.id} 
                  post={post} 
                  onLike={() => handleLikePost(post.id)} 
                  onEdit={isAdmin ? handleEditPost : undefined}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="books" className="pt-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="p-2 bg-gold/10 rounded-lg">
                <Library className="h-6 w-6 text-gold" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gold">Sacred Library</h2>
                <p className="text-white/60">Complete books and comprehensive works</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.filter(post => post.contentType === 'book').map(post => (
                <BlogPostCard 
                  key={post.id} 
                  post={post} 
                  onLike={() => handleLikePost(post.id)} 
                  onEdit={isAdmin ? handleEditPost : undefined}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="songs" className="pt-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="p-2 bg-gold/10 rounded-lg">
                <Music className="h-6 w-6 text-gold" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gold">Sacred Music</h2>
                <p className="text-white/60">Byzantine chants and traditional hymns</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.filter(post => post.contentType === 'chant').map(post => (
                <BlogPostCard 
                  key={post.id} 
                  post={post} 
                  onLike={() => handleLikePost(post.id)} 
                  onEdit={isAdmin ? handleEditPost : undefined}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="videos" className="pt-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="p-2 bg-byzantine/10 rounded-lg">
                <Video className="h-6 w-6 text-byzantine" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gold">Visual Teaching</h2>
                <p className="text-white/60">Educational videos and liturgical ceremonies</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.filter(post => post.contentType === 'liturgy').map(post => (
                <BlogPostCard 
                  key={post.id} 
                  post={post} 
                  onLike={() => handleLikePost(post.id)} 
                  onEdit={isAdmin ? handleEditPost : undefined}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
