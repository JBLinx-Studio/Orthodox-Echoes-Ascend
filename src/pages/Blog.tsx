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
import { Search, Edit, Plus, X, BookOpen, Feather, Library, Music, Video, Heart, Crown, Church, Filter } from 'lucide-react';

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
      category: "liturgy",
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
      category: "spirituality",
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
      category: "saints",
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
      category: "music",
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
      category: "sacraments",
      contentType: "liturgy",
      videoUrl: "/videos/orthodox-wedding.mp3",
      likes: 156,
      views: 678
    },
    {
      id: "6",
      title: "The Life of St. Nicholas the Wonderworker",
      excerpt: "Exploring the miraculous life and enduring legacy of this beloved saint",
      content: `<p>St. Nicholas of Myra remains one of the most beloved saints...</p>`,
      author: "Sister Anastasia",
      publishDate: "December 6, 2024",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1170&q=80",
      tags: ["Saints", "Miracles", "History"],
      featured: true,
      category: "saints",
      contentType: "article",
      likes: 234,
      views: 567
    },
    {
      id: "7",
      title: "Orthodox History: The Great Schism",
      excerpt: "Understanding the historical events that shaped Eastern and Western Christianity",
      content: `<p>The Great Schism of 1054 was a pivotal moment in Christian history...</p>`,
      author: "Dr. Constantine Paleologus",
      publishDate: "February 14, 2025",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1170&q=80",
      tags: ["History", "Ecumenism", "Church"],
      featured: false,
      category: "history",
      contentType: "article",
      likes: 89,
      views: 423
    }
  ];
};

const getCategories = (): BlogCategory[] => {
  const savedCategories = localStorage.getItem('orthodoxEchoesCategories');
  if (savedCategories) {
    return JSON.parse(savedCategories);
  }
  
  return [
    { id: "liturgy", name: "Liturgy & Worship", slug: "liturgy", description: "Divine Liturgy, prayers, and worship" },
    { id: "saints", name: "Saints & Martyrs", slug: "saints", description: "Lives and teachings of holy saints" },
    { id: "history", name: "Orthodox History", slug: "history", description: "Church history and traditions" },
    { id: "theology", name: "Theology & Doctrine", slug: "theology", description: "Theological discourse and doctrine" },
    { id: "spirituality", name: "Spirituality", slug: "spirituality", description: "Personal spiritual growth" },
    { id: "sacraments", name: "Sacraments", slug: "sacraments", description: "The seven holy sacraments" },
    { id: "music", name: "Sacred Music", slug: "music", description: "Chants, hymns, and sacred music" },
    { id: "icons", name: "Iconography", slug: "icons", description: "Sacred icons and their meanings" },
    { id: "calendar", name: "Liturgical Calendar", slug: "calendar", description: "Feasts, fasts, and celebrations" },
    { id: "community", name: "Community Life", slug: "community", description: "Orthodox community and fellowship" }
  ];
};

const contentTypes = [
  { id: "featured", name: "All Highlights", icon: Heart, description: "Curated gems across all content" },
  { id: "article", name: "Articles", icon: Feather, description: "In-depth Orthodox teachings" },
  { id: "blog", name: "Blog Posts", icon: Edit, description: "Reflections and spiritual writing" },
  { id: "book", name: "Books", icon: Library, description: "Long-form and ebooks" },
  { id: "chant", name: "Sacred Music", icon: Music, description: "Hymns, chant audio" },
  { id: "liturgy", name: "Videos", icon: Video, description: "Education & liturgical video" }
];

export default function ContentLibrary() {
  const [posts, setPosts] = useState<BlogPost[]>(getSavedBlogPosts());
  const [categories, setCategories] = useState<BlogCategory[]>(getCategories());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeContentType, setActiveContentType] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { id } = useParams<{ id: string }>();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isAddingPost, setIsAddingPost] = useState<boolean>(false);
  const [isEditingPost, setIsEditingPost] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Content Library | Orthodox Echoes";
    const adminData = localStorage.getItem('orthodoxEchoesAdmin');
    setIsAdmin(!!adminData);
    if (id) {
      const post = posts.find(post => post.id === id);
      if (post) {
        setSelectedPost(post);
        handleViewPost(post.id);
      } else {
        toast.error("Content not found");
        navigate('/content-library');
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
    if (activeContentType === 'featured' && !post.featured) return false;
    if (activeContentType !== 'featured' && post.contentType !== activeContentType) return false;
    if (selectedCategory !== 'all' && post.category !== selectedCategory) return false;
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
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost({ ...selectedPost, likes: (selectedPost.likes || 0) + 1 });
    }
    toast.success("You liked this content!");
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
    toast.success("Content saved!");
  };
  const handleCancelEdit = () => {
    if (isEditingPost) {
      setIsEditingPost(false);
    } else {
      setIsAddingPost(false);
      navigate('/content-library');
    }
  };
  const handleDeletePost = (postId: string) => {
    if (confirm("Are you sure you want to delete this content? This action cannot be undone.")) {
      const updatedPosts = posts.filter(post => post.id !== postId);
      setPosts(updatedPosts);
      savePosts(updatedPosts);
      toast.success("Deleted!");
      navigate('/content-library');
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
    <div className="relative min-h-screen py-0">
      {/* Aesthetic Glassy Hero */}
      <div className="relative z-10 w-full px-4 py-16 md:py-28 glass-morphism border border-gold/25 rounded-xl bg-gradient-to-br from-gold/10 via-byzantine/15 to-black/10 shadow-xl animate-fade-in mb-12 overflow-hidden">
        <motion.div 
          className="absolute inset-0 pointer-events-none mix-blend-lighten"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.16 }}
          style={{
            background: 'radial-gradient(ellipse at 28% 20%, #d4af3777 6%, transparent 78%), radial-gradient(ellipse at 88% 70%, #9B233589 8%, transparent 85%)'
          }}
        />
        <div className="flex flex-col items-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gold byzantine-text-gradient mb-3 drop-shadow-lg">Content Library</h1>
          <div className="bg-gold/10 px-6 py-2 rounded-full font-medium uppercase tracking-wider text-gold shadow-inner mb-4">
            Articles • Blogs • Books • Chants
          </div>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl text-center mx-auto mb-3 drop-shadow">
            Dive into the Orthodox Echoes content library—a single destination for spiritual articles, blogs, books, sacred music, and more.<br />
            <span className="text-gold/80 font-semibold">All wisdom in one place.</span>
          </p>
        </div>
      </div>

      {/* Search, Post, and Filtering */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.46 }}
        className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 mb-6"
      >
        <div className="w-full">
          <div className="relative max-w-xl">
            <Input
              placeholder="Search all content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-12 glass-morphism border-gold/20 text-lg"
              aria-label="Search content"
            />
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gold/70" />
            {searchQuery && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
        {isAdmin && (
          <Button 
            onClick={handleAddPost} 
            className="bg-byzantine hover:bg-byzantine-dark shadow-gold/15 shadow-lg whitespace-nowrap mt-2 md:mt-0"
          >
            <Plus className="h-5 w-5 mr-2" /> Add Content
          </Button>
        )}
      </motion.div>

      {/* Content Type Tabs (with Orthodox blend) */}
      <Tabs defaultValue={activeContentType} value={activeContentType} onValueChange={setActiveContentType} className="mb-10">
        <TabsList className="bg-[#1A1F2C]/80 border border-gold/20 glass-blend mx-auto max-w-5xl justify-center gap-2 p-2 rounded-2xl shadow-inner">
          {contentTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <TabsTrigger key={type.id} value={type.id} className="flex items-center gap-2 px-4 rounded-lg font-bold text-lg focus:outline-none transition-all [&[data-state=active]]:bg-gold/20">
                <IconComponent className="h-5 w-5" />
                {type.name}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Show filter for categories (less prominent) */}
        <div className="flex flex-wrap items-center gap-2 justify-center mx-auto my-6 max-w-3xl">
          <Filter className="h-5 w-5 text-gold/70" />
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
            className={selectedCategory === 'all' ? 'bg-gold text-black border-gold' : 'border-gold/40 hover:bg-gold/5'}
          >
            All Topics
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? 'bg-gold text-black border-gold' : 'border-gold/20 hover:bg-gold/10'}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Unified Card Layout with Enhanced Panels and Transitions */}
        {contentTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <TabsContent key={type.id} value={type.id} className="pt-8">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mb-6 flex items-center gap-3"
              >
                <div className="p-3 bg-gold/10 rounded-lg drop-shadow">
                  <IconComponent className="h-7 w-7 text-gold" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gold">{type.name}</h2>
                  <p className="text-white/60">{type.description}</p>
                </div>
              </motion.div>
              
              {filteredPosts.length === 0 ? (
                <div className="flex flex-col items-center py-20">
                  <div className="text-gold/40 mb-4 animate-pulse">
                    <BookOpen className="h-20 w-20 mx-auto drop-shadow" />
                  </div>
                  <h3 className="text-xl font-semibold text-white/80 mb-2">No content found</h3>
                  <p className="text-white/60">
                    {searchQuery ? 'Try adjusting your search terms or filters.' : 'No content available in this section.'}
                  </p>
                </div>
              ) : (
                <div className={`grid gap-7 md:gap-10 ${
                  type.id === 'featured' || type.id === 'book'
                    ? 'grid-cols-1 md:grid-cols-2'
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}>
                  {filteredPosts.map(post => (
                    <motion.div
                      key={post.id}
                      whileHover={{ scale: 1.035, boxShadow: '0 0 24px 8px #D4AF3770' }}
                      className="transition-all duration-250 glass-blend shadow-xl border-2 border-gold/12 hover:border-gold/40 rounded-xl interactive-card"
                    >
                      <BlogPostCard 
                        post={post} 
                        onLike={() => handleLikePost(post.id)} 
                        onEdit={isAdmin ? handleEditPost : undefined}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
