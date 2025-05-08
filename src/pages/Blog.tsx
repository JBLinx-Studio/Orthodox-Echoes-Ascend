
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
import { Search, Edit, Plus, X } from 'lucide-react';

// Get sample blog posts from localStorage or use defaults
const getSavedBlogPosts = (): BlogPost[] => {
  const savedPosts = localStorage.getItem('orthodoxEchoesBlogPosts');
  if (savedPosts) {
    const posts = JSON.parse(savedPosts);
    // Filter out draft posts for public display
    return posts.filter((post: BlogPost) => !post.draft);
  }
  
  // Sample blog posts
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
      category: "liturgy"
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
      category: "saints"
    },
    {
      id: "3",
      title: "Understanding the Holy Trinity",
      excerpt: "A theological exploration of the Orthodox understanding of the Triune God.",
      content: `
        <p>The doctrine of the Holy Trinity is central to Orthodox Christianity, yet it remains one of the most profound mysteries of our faith. The Triune God—Father, Son, and Holy Spirit—is one God in three Persons, a reality that transcends human understanding yet is essential for salvation.</p>
        
        <p>Orthodox theology approaches the Trinity not as a problem to be solved, but as a mystery to be experienced. The Church Fathers used various analogies to help explain this reality, though all analogies ultimately fall short of capturing the fullness of God's being.</p>
        
        <p>Unlike Western approaches that often begin with God's essence, Orthodox theology emphasizes the three Persons while affirming their complete unity of essence. The Father is unbegotten, the Son is eternally begotten of the Father, and the Holy Spirit eternally proceeds from the Father.</p>
        
        <p>This understanding is not merely academic but deeply practical. Through Baptism and Chrismation, Orthodox Christians enter into communion with the Trinity. In prayer and worship, we experience the distinct work of each Person while encountering the one God.</p>
        
        <p>The Trinity reveals that God is inherently relational, existing as a communion of love. This has profound implications for human relationships and community, showing that we too are created for communion with God and one another.</p>
      `,
      author: "Metropolitan Nicholas",
      publishDate: "March 28, 2025",
      imageUrl: "https://images.unsplash.com/photo-1595118216242-53018840a9f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      tags: ["Theology", "Doctrine", "Faith"],
      featured: false,
      category: "theology"
    },
    {
      id: "4",
      title: "The Great Schism of 1054",
      excerpt: "Examining the historical and theological factors that led to the divide between East and West.",
      content: `
        <p>The Great Schism of 1054 marked the formal separation between the Eastern Orthodox and Roman Catholic Churches, a division that continues to this day. While often attributed to a single moment when Pope Leo IX's representatives placed a bull of excommunication on the altar of Hagia Sophia, the schism was actually the culmination of centuries of growing theological, cultural, and political differences.</p>
        
        <p>Several key issues contributed to the divide. Theologically, the addition of the "filioque" clause to the Nicene Creed by the Western Church (stating that the Holy Spirit proceeds from both the Father "and the Son") was rejected by the East as an unauthorized alteration to a universal creed and a theological error.</p>
        
        <p>Questions of authority also played a central role. The Pope's claims to universal jurisdiction over the entire Church conflicted with the Eastern understanding of church governance, which emphasized conciliarity and the equality of the ancient Patriarchates.</p>
        
        <p>Cultural and linguistic differences amplified these tensions. As Latin became dominant in the West while Greek remained the language of theology in the East, communication became more difficult, and different emphases in theological approach emerged.</p>
        
        <p>The schism represents one of the most significant fractures in Christian history, leaving a legacy that continues to shape both Eastern Orthodoxy and Roman Catholicism. Modern ecumenical efforts have sought to heal this ancient wound, though substantial differences remain.</p>
      `,
      author: "Prof. Alexandra Konstantinidis",
      publishDate: "April 10, 2025",
      imageUrl: "https://images.unsplash.com/photo-1548407260-da850faa41e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      tags: ["Church History", "East-West Schism"],
      featured: false,
      category: "history"
    },
    {
      id: "5",
      title: "The Meaning of Orthodox Iconography",
      excerpt: "Exploring the theological significance of icons as windows to heaven.",
      content: `
        <p>Orthodox icons are not mere religious art or decorations but are central to Orthodox spirituality and theology. Often described as "windows to heaven," icons make present the realities they depict and serve as points of encounter with the divine.</p>
        
        <p>The theological foundation for iconography rests in the Incarnation of Christ. Because God became visible in the person of Jesus Christ, He can and should be depicted in sacred art. When we venerate icons, we are not worshipping the material object but rather honoring the person represented, with the veneration passing to the prototype.</p>
        
        <p>Icons follow strict canonical traditions that have developed over centuries. Their non-naturalistic style is intentional—they represent spiritual rather than physical reality. The reverse perspective, stylized features, and golden backgrounds all point to the transfigured state of those depicted.</p>
        
        <p>In Orthodox homes and churches, icons create sacred space. The iconostasis (icon screen) in Orthodox churches stands not as a barrier but as a representation of the meeting of heaven and earth, populated by Christ, the Theotokos, and the saints who intercede for us.</p>
        
        <p>Through their silent presence, icons teach theology, guide prayer, and remind us that we are never alone in our spiritual journey, but always surrounded by "so great a cloud of witnesses" (Hebrews 12:1).</p>
      `,
      author: "Iconographer Maria",
      publishDate: "March 22, 2025",
      imageUrl: "https://images.unsplash.com/photo-1594822566893-f1e6e0444888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      tags: ["Iconography", "Art", "Theology"],
      featured: false,
      category: "art"
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
    { id: "theology", name: "Theology", slug: "theology" },
    { id: "liturgy", name: "Liturgy", slug: "liturgy" },
    { id: "spirituality", name: "Spirituality", slug: "spirituality" },
    { id: "history", name: "Church History", slug: "history" },
    { id: "saints", name: "Saints", slug: "saints" },
    { id: "art", name: "Orthodox Art", slug: "art" }
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
    document.title = "Blog | Orthodox Echoes";
    
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
        toast.error("Article not found", {
          description: "The article you're looking for doesn't exist or has been removed."
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
    if (activeTab !== 'featured' && activeTab !== 'recent') {
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

  const handleLikePost = (postId: string) => {
    const updatedPosts = posts.map(post => 
      post.id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post
    );
    setPosts(updatedPosts);
    savePosts(updatedPosts);
    toast.success("Article liked!");
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
    if (confirm("Are you sure you want to delete this article? This action cannot be undone.")) {
      const updatedPosts = posts.filter(post => post.id !== postId);
      setPosts(updatedPosts);
      savePosts(updatedPosts);
      toast.success("Article deleted successfully");
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
            <h1 className="text-3xl md:text-4xl font-bold orthodox-heading text-gold mb-2">Orthodox Insights</h1>
            <p className="text-white/70 max-w-2xl">
              Explore articles on Orthodox theology, spirituality, history, and contemporary issues to deepen your understanding of the faith.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-auto">
              <div className="flex">
                <div className="relative flex-grow">
                  <Input
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10 bg-[#1A1F2C]/70 border-gold/30 min-w-[200px]"
                    aria-label="Search articles"
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
                <Plus className="h-4 w-4 mr-2" /> New Article
              </Button>
            )}
          </div>
        </div>
        
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="bg-[#1A1F2C]/70 border border-gold/20">
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="theology">Theology</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="spirituality">Spirituality</TabsTrigger>
            {categories.map(category => 
              category.name.toLowerCase() !== 'theology' && 
              category.name.toLowerCase() !== 'history' && 
              category.name.toLowerCase() !== 'spirituality' && (
                <TabsTrigger key={category.id} value={category.name.toLowerCase()}>
                  {category.name}
                </TabsTrigger>
              )
            )}
          </TabsList>
          
          <TabsContent value="featured" className="pt-6">
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
                <p className="text-white/70">No featured articles available.</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="recent" className="pt-6">
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
                <p className="text-white/70">No articles found matching your search.</p>
              )}
            </div>
          </TabsContent>
          
          {/* Dynamic category tabs based on the selected tab */}
          {Array.from(new Set([...categories.map(c => c.name.toLowerCase()), 'theology', 'history', 'spirituality'])).map(categoryName => (
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
                  <p className="text-white/70">No articles available in this category.</p>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </div>
  );
}
