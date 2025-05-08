
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from "@/components/ui/switch";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { toast } from 'sonner';
import { Edit, Trash2, Plus, Check, Image, Text, Bold, Italic, Underline, Link, Search, X, Tag } from 'lucide-react';
import { BlogPost, BlogCategory } from '@/types/BlogPost';
import { useLocation } from 'react-router-dom';
import { BlogCategoryManager } from './BlogCategoryManager';

// Get sample blog posts from localStorage or use defaults
const getSavedBlogPosts = (): BlogPost[] => {
  const savedPosts = localStorage.getItem('orthodoxEchoesBlogPosts');
  if (savedPosts) {
    return JSON.parse(savedPosts);
  }
  
  // Sample blog posts for admin panel with category if none saved
  return [
    {
      id: "1",
      title: "The Divine Liturgy: A Heavenly Experience",
      excerpt: "Exploring the profound mysteries of the Orthodox Divine Liturgy and its celestial symbolism.",
      content: "The Divine Liturgy is the primary worship service of the Orthodox Church. The word liturgy derives from a Greek word meaning 'work of the people' and it truly is a communal experience that connects heaven and earth...",
      author: "Fr. Seraphim",
      publishDate: "March 15, 2025",
      imageUrl: "https://images.unsplash.com/photo-1544028598-293b586fde71?q=80&w=1200&auto=format&fit=crop",
      tags: ["Liturgy", "Worship", "Theology"],
      featured: true,
      category: "liturgy",
      readTime: 8
    },
    {
      id: "2",
      title: "St. Athanasius and the Defense of Orthodoxy",
      excerpt: "How one man's unwavering faith preserved the Orthodox understanding of Christ's divinity.",
      content: "St. Athanasius of Alexandria (c. 296-373) is remembered as one of the greatest defenders of Orthodox doctrine in Church history. During the Arian controversy, which threatened to undermine the Church's understanding of Christ's divinity...",
      author: "Dr. Timothy Orthodox",
      publishDate: "April 2, 2025",
      imageUrl: "https://images.unsplash.com/photo-1538370965046-79c0d6907d47?q=80&w=1200&auto=format&fit=crop",
      tags: ["Saints", "Church History", "Theology"],
      featured: true,
      category: "saints",
      readTime: 12
    },
    {
      id: "3",
      title: "Understanding the Holy Trinity",
      excerpt: "A theological exploration of the Orthodox understanding of the Triune God.",
      content: "The doctrine of the Holy Trinity is central to Orthodox theology. While the term 'Trinity' does not appear in Scripture, the concept is deeply rooted in biblical revelation and has been affirmed by the Church throughout its history...",
      author: "Metropolitan Nicholas",
      publishDate: "March 28, 2025",
      imageUrl: "https://images.unsplash.com/photo-1477336229416-9d67406e73bc?q=80&w=1200&auto=format&fit=crop",
      tags: ["Theology", "Doctrine", "Faith"],
      featured: false,
      category: "theology",
      readTime: 15
    },
    {
      id: "4",
      title: "The Great Schism of 1054",
      excerpt: "Examining the historical and theological factors that led to the divide between East and West.",
      content: "The Great Schism of 1054 marked the formal break between the Eastern Orthodox Church and the Roman Catholic Church. This momentous event was the culmination of centuries of growing theological, cultural, and political differences...",
      author: "Prof. Alexandra Konstantinidis",
      publishDate: "April 10, 2025",
      imageUrl: "https://images.unsplash.com/photo-1605648508962-17c1d4604b91?q=80&w=1200&auto=format&fit=crop",
      tags: ["Church History", "East-West Schism"],
      featured: false,
      category: "history",
      readTime: 10
    },
    {
      id: "5",
      title: "The Meaning of Orthodox Iconography",
      excerpt: "Exploring the theological significance of icons as windows to heaven.",
      content: "Icons have been an integral part of Orthodox worship and spirituality since the early days of Christianity. These sacred images are not merely decorative art but serve as windows to heaven, connecting the faithful with the divine reality...",
      author: "Iconographer Maria",
      publishDate: "March 22, 2025",
      imageUrl: "https://images.unsplash.com/photo-1544028599-86b7ecf51c04?q=80&w=1200&auto=format&fit=crop",
      tags: ["Iconography", "Art", "Theology"],
      featured: false,
      category: "art",
      readTime: 7
    }
  ];
};

// Get categories from localStorage
const getSavedCategories = (): BlogCategory[] => {
  const savedCategories = localStorage.getItem('orthodoxEchoesCategories');
  if (savedCategories) {
    return JSON.parse(savedCategories);
  }
  
  // Default categories if none saved
  return [
    { id: "theology", name: "Theology", slug: "theology", description: "Theological discussions and doctrine" },
    { id: "liturgy", name: "Liturgy", slug: "liturgy", description: "Orthodox worship and services" },
    { id: "spirituality", name: "Spirituality", slug: "spirituality", description: "Orthodox spiritual practices" },
    { id: "history", name: "Church History", slug: "history", description: "History of the Orthodox Church" },
    { id: "saints", name: "Saints", slug: "saints", description: "Lives of Orthodox saints" },
    { id: "art", name: "Orthodox Art", slug: "art", description: "Iconography and Orthodox art" }
  ];
};

export function BlogAdmin() {
  const [articles, setArticles] = useState<BlogPost[]>(getSavedBlogPosts());
  const [categories, setCategories] = useState<BlogCategory[]>(getSavedCategories());
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [isEditingArticle, setIsEditingArticle] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<BlogPost | null>(null);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [category, setCategory] = useState('theology');
  const [readTime, setReadTime] = useState(5);
  const [isRichTextExpanded, setIsRichTextExpanded] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  // Check for edit post query parameter
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const editPostId = queryParams.get('editPost');
    
    if (editPostId) {
      const postToEdit = articles.find(article => article.id === editPostId);
      if (postToEdit) {
        handleEditArticle(postToEdit);
      }
    }
  }, [location.search, articles]);

  // Save articles to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('orthodoxEchoesBlogPosts', JSON.stringify(articles));
  }, [articles]);
  
  const handleCategoriesChange = (updatedCategories: BlogCategory[]) => {
    setCategories(updatedCategories);
  };
  
  const handleNewArticle = () => {
    resetForm();
    setIsAddingArticle(true);
    setIsEditingArticle(false);
  };
  
  const handleEditArticle = (article: BlogPost) => {
    setCurrentArticle(article);
    setTitle(article.title);
    setExcerpt(article.excerpt);
    setContent(article.content || '');
    setAuthor(article.author);
    setSelectedTags(article.tags || []);
    setTagInput('');
    setImageUrl(article.imageUrl || '');
    setIsFeatured(article.featured);
    setCategory(article.category || 'theology');
    setReadTime(article.readTime || 5);
    setIsDraft(article.draft || false);
    setIsEditingArticle(true);
    setIsAddingArticle(false);
  };
  
  const resetForm = () => {
    setTitle('');
    setExcerpt('');
    setContent('');
    setAuthor('');
    setSelectedTags([]);
    setTagInput('');
    setImageUrl('');
    setIsFeatured(false);
    setCategory('theology');
    setReadTime(5);
    setIsDraft(false);
    setCurrentArticle(null);
  };
  
  const cancelEdit = () => {
    resetForm();
    setIsAddingArticle(false);
    setIsEditingArticle(false);
  };
  
  const handleAddTag = () => {
    if (tagInput.trim()) {
      if (!selectedTags.includes(tagInput.trim())) {
        setSelectedTags([...selectedTags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleTextFormatting = (format: string) => {
    const textArea = document.getElementById('content') as HTMLTextAreaElement;
    if (!textArea) return;
    
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let formattedText = '';
    let cursorPosition = 0;
    
    switch (format) {
      case 'bold':
        formattedText = `<strong>${selectedText}</strong>`;
        cursorPosition = start + formattedText.length;
        break;
      case 'italic':
        formattedText = `<em>${selectedText}</em>`;
        cursorPosition = start + formattedText.length;
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        cursorPosition = start + formattedText.length;
        break;
      case 'link':
        const url = prompt('Enter URL:', 'https://');
        if (url) {
          formattedText = `<a href="${url}">${selectedText || 'Link text'}</a>`;
          cursorPosition = start + formattedText.length;
        }
        break;
      case 'paragraph':
        formattedText = `<p>${selectedText}</p>`;
        cursorPosition = start + formattedText.length;
        break;
      case 'heading':
        formattedText = `<h2>${selectedText}</h2>`;
        cursorPosition = start + formattedText.length;
        break;
      case 'image':
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
        return;
      default:
        return;
    }
    
    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
    
    // After state update, set cursor position
    setTimeout(() => {
      textArea.focus();
      textArea.setSelectionRange(cursorPosition, cursorPosition);
    }, 0);
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to cloud storage
      // For demo, we'll just create a mock URL
      const mockImageUrl = URL.createObjectURL(file);
      
      // Insert image tag at cursor position
      const textArea = document.getElementById('content') as HTMLTextAreaElement;
      if (textArea) {
        const start = textArea.selectionStart;
        const imageTag = `<img src="${mockImageUrl}" alt="${file.name}" class="w-full h-auto rounded-md my-4" />`;
        const newContent = content.substring(0, start) + imageTag + content.substring(start);
        setContent(newContent);
        
        toast.success(`Image "${file.name}" inserted`, {
          description: "The image has been added to your content."
        });
      }
    }
  };
  
  const handleSaveArticle = () => {
    if (!title || !excerpt || !author || !category) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    if (isAddingArticle) {
      const newArticle: BlogPost = {
        id: Date.now().toString(),
        title,
        excerpt,
        content: content || '',
        author,
        publishDate: formattedDate,
        tags: selectedTags,
        featured: isFeatured,
        imageUrl: imageUrl || undefined,
        category,
        readTime: readTime || 5,
        likes: 0,
        views: 0,
        draft: isDraft,
        comments: [],
        publishedAt: isDraft ? undefined : formattedDate,
        updatedAt: formattedDate
      };
      
      setArticles([...articles, newArticle]);
      toast.success(`Article ${isDraft ? 'saved as draft' : 'published'} successfully`, {
        description: isDraft ? "Your draft has been saved." : "Your article has been published and is now live."
      });
    } else if (isEditingArticle && currentArticle) {
      const updatedArticles = articles.map(article => 
        article.id === currentArticle.id 
          ? {
              ...article,
              title,
              excerpt,
              content: content || article.content || '',
              author,
              tags: selectedTags,
              featured: isFeatured,
              imageUrl: imageUrl || article.imageUrl,
              category,
              readTime: readTime || article.readTime || 5,
              draft: isDraft,
              publishedAt: isDraft ? article.publishedAt : (article.publishedAt || formattedDate),
              updatedAt: formattedDate
            }
          : article
      );
      
      setArticles(updatedArticles);
      toast.success(`Article ${isDraft ? 'saved as draft' : 'updated'} successfully`, {
        description: isDraft ? "Your draft has been saved." : "Your changes have been published and are now live."
      });
    }
    
    resetForm();
    setIsAddingArticle(false);
    setIsEditingArticle(false);
  };
  
  const handleDeleteArticle = (id: string) => {
    if (confirm("Are you sure you want to delete this article? This action cannot be undone.")) {
      setArticles(articles.filter(article => article.id !== id));
      toast.success("Article deleted successfully");
    }
  };
  
  const handleFeatureToggle = (id: string, featured: boolean) => {
    const updatedArticles = articles.map(article => 
      article.id === id ? { ...article, featured } : article
    );
    setArticles(updatedArticles);
    toast.success(`Article ${featured ? 'featured' : 'unfeatured'} successfully`);
  };
  
  const handleDraftToggle = (id: string, draft: boolean) => {
    const updatedArticles = articles.map(article => 
      article.id === id ? { ...article, draft } : article
    );
    setArticles(updatedArticles);
    toast.success(`Article ${draft ? 'moved to drafts' : 'published'} successfully`);
  };
  
  const filteredArticles = articles.filter(article => {
    // First apply category/tab filter
    if (activeTab === 'featured' && !article.featured) return false;
    if (activeTab === 'drafts' && !article.draft) return false;
    
    // Then apply search query if present
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        article.title.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query)) ||
        article.category.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  return (
    <div className="space-y-6">
      {showCategoryManager ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gold">Category Management</h2>
            <Button 
              onClick={() => setShowCategoryManager(false)}
              variant="outline"
              className="border-gold/30 text-gold hover:bg-gold/10"
            >
              Back to Articles
            </Button>
          </div>
          <BlogCategoryManager onCategoriesChange={handleCategoriesChange} />
        </div>
      ) : (
        <Card className="glass-morphism border-gold/20 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl text-gold">Blog Management</CardTitle>
            <div className="flex gap-2">
              <Button 
                onClick={() => setShowCategoryManager(true)} 
                variant="outline"
                className="border-gold/30 text-gold hover:bg-gold/10"
              >
                Manage Categories
              </Button>
              <Button 
                onClick={handleNewArticle} 
                className="bg-byzantine hover:bg-byzantine-dark shadow-gold/10 shadow-lg"
              >
                <Plus className="h-4 w-4 mr-2" /> New Article
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="relative w-full sm:w-auto flex-1">
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[#1A1F2C]/70 border-gold/30"
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
              <div className="text-sm text-white/60">
                {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
              </div>
            </div>
            
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4 bg-[#1A1F2C] border border-gold/20">
                <TabsTrigger value="all">All Articles ({articles.length})</TabsTrigger>
                <TabsTrigger value="featured">Featured ({articles.filter(a => a.featured).length})</TabsTrigger>
                <TabsTrigger value="drafts">Drafts ({articles.filter(a => a.draft).length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                {filteredArticles.length > 0 ? (
                  <div className="rounded-md border border-gold/20 overflow-hidden glass-morphism">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-b bg-[#1A1F2C]/80">
                            <TableHead className="text-white/80">Title</TableHead>
                            <TableHead className="text-white/80">Author</TableHead>
                            <TableHead className="text-white/80">Category</TableHead>
                            <TableHead className="text-white/80">Date</TableHead>
                            <TableHead className="text-white/80">Status</TableHead>
                            <TableHead className="text-right text-white/80">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredArticles.map((article) => (
                            <TableRow key={article.id} className="border-b border-gold/10 hover:bg-gold/5 transition-colors">
                              <TableCell className="text-white/90">
                                <div className="font-medium">{article.title}</div>
                                {article.featured && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gold/20 text-gold font-medium mt-1">
                                    Featured
                                  </span>
                                )}
                              </TableCell>
                              <TableCell className="text-white/70">{article.author}</TableCell>
                              <TableCell>
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-byzantine/20 text-byzantine-light">
                                  {categories.find(c => c.id === article.category)?.name || article.category}
                                </span>
                              </TableCell>
                              <TableCell className="text-white/70">{article.publishDate}</TableCell>
                              <TableCell>
                                {article.draft ? (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-amber-600/20 text-amber-200 font-medium">
                                    Draft
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-green-600/20 text-green-200 font-medium">
                                    Published
                                  </span>
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8 w-8 p-0 text-gold hover:text-gold/80 hover:bg-gold/10"
                                    onClick={() => handleEditArticle(article)}
                                    aria-label="Edit article"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8 w-8 p-0 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                    onClick={() => handleDeleteArticle(article.id)}
                                    aria-label="Delete article"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-white/60 glass-morphism rounded-md border border-gold/10 p-8">
                    <p>No articles found matching your criteria.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="featured">
                {filteredArticles.length > 0 ? (
                  <div className="rounded-md border border-gold/20 glass-morphism">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-b bg-[#1A1F2C]/80">
                            <TableHead className="text-white/80">Title</TableHead>
                            <TableHead className="text-white/80">Author</TableHead>
                            <TableHead className="text-white/80">Category</TableHead>
                            <TableHead className="text-white/80">Date</TableHead>
                            <TableHead className="text-white/80">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredArticles.map((article) => (
                            <TableRow key={article.id} className="border-b border-gold/10 hover:bg-gold/5 transition-colors">
                              <TableCell className="text-white/90">{article.title}</TableCell>
                              <TableCell className="text-white/70">{article.author}</TableCell>
                              <TableCell>
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-byzantine/20 text-byzantine-light">
                                  {categories.find(c => c.id === article.category)?.name || article.category}
                                </span>
                              </TableCell>
                              <TableCell className="text-white/70">{article.publishDate}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8 w-8 p-0 text-gold hover:text-gold/80 hover:bg-gold/10"
                                    onClick={() => handleEditArticle(article)}
                                    aria-label="Edit article"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="h-8 w-8 p-0 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                    onClick={() => handleFeatureToggle(article.id, false)}
                                    aria-label="Remove from featured"
                                  >
                                    Unfeature
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-white/60 glass-morphism rounded-md border border-gold/10 p-8">
                    <p>No featured articles found matching your criteria.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="drafts">
                {filteredArticles.length > 0 ? (
                  <div className="rounded-md border border-gold/20 glass-morphism">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-b bg-[#1A1F2C]/80">
                            <TableHead className="text-white/80">Title</TableHead>
                            <TableHead className="text-white/80">Author</TableHead>
                            <TableHead className="text-white/80">Last Edited</TableHead>
                            <TableHead className="text-white/80">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredArticles.map((article) => (
                            <TableRow key={article.id} className="border-b border-gold/10 hover:bg-gold/5 transition-colors">
                              <TableCell className="text-white/90">{article.title}</TableCell>
                              <TableCell className="text-white/70">{article.author}</TableCell>
                              <TableCell className="text-white/70">{article.updatedAt || article.publishDate}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8 w-8 p-0 text-gold hover:text-gold/80 hover:bg-gold/10"
                                    onClick={() => handleEditArticle(article)}
                                    aria-label="Edit article"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="text-sm text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/10"
                                    onClick={() => handleDraftToggle(article.id, false)}
                                    aria-label="Publish draft"
                                  >
                                    Publish
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-white/60 glass-morphism rounded-md border border-gold/10 p-8">
                    <p>No draft articles found matching your criteria.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
      
      {/* Article Editor Form */}
      {(isAddingArticle || isEditingArticle) && (
        <Card className="glass-morphism border-gold/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-gold">
              {isAddingArticle ? "Create New Article" : "Edit Article"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white/90">Title <span className="text-destructive">*</span></Label>
                <Input 
                  id="title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter article title" 
                  className="bg-[#1A1F2C]/50 border-gold/30"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="author" className="text-white/90">Author <span className="text-destructive">*</span></Label>
                  <Input 
                    id="author" 
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author name" 
                    className="bg-[#1A1F2C]/50 border-gold/30"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-white/90">Category <span className="text-destructive">*</span></Label>
                  <Select 
                    value={category} 
                    onValueChange={setCategory}
                  >
                    <SelectTrigger className="bg-[#1A1F2C]/50 border-gold/30">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags" className="text-white/90">Tags</Label>
                <div className="flex flex-wrap gap-2 p-2 bg-[#1A1F2C]/30 border border-gold/20 rounded-md mb-2">
                  {selectedTags.map((tag) => (
                    <div 
                      key={tag} 
                      className="flex items-center gap-1 px-2 py-1 bg-byzantine/20 text-byzantine-light rounded-full text-sm"
                    >
                      <span>{tag}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-5 w-5 p-0 text-byzantine-light hover:text-white hover:bg-byzantine/30 rounded-full"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex-1 min-w-[180px]">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a tag..."
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="bg-transparent border-0 border-b border-gold/20 rounded-none focus-visible:ring-0 focus-visible:border-gold/50 h-8 px-1"
                      />
                      <Button
                        type="button" 
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-gold hover:text-gold/80 hover:bg-gold/10"
                        onClick={handleAddTag}
                        disabled={!tagInput.trim()}
                      >
                        <Tag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-white/60">
                  Add relevant tags to help readers find your article. Press Enter or click the tag icon to add.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="readTime" className="text-white/90">Read Time (minutes)</Label>
                  <Input 
                    id="readTime" 
                    type="number"
                    min="1"
                    max="60"
                    value={readTime}
                    onChange={(e) => setReadTime(parseInt(e.target.value) || 5)}
                    className="bg-[#1A1F2C]/50 border-gold/30"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="imageUrl" className="text-white/90">Featured Image URL</Label>
                  <div className="flex space-x-2">
                    <Input 
                      id="imageUrl" 
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg" 
                      className="bg-[#1A1F2C]/50 border-gold/30 flex-grow"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="border-gold/30 text-gold hover:bg-gold/10"
                      onClick={() => fileInputRef.current?.click()}
                      aria-label="Upload image"
                    >
                      <Image className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // In a real app, you would upload to cloud storage and get a URL
                          // For this demo, we just set the object URL
                          const mockUrl = URL.createObjectURL(file);
                          setImageUrl(mockUrl);
                          toast.success(`Image "${file.name}" uploaded`);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              
              {imageUrl && (
                <div className="mt-2 rounded-md overflow-hidden h-40 bg-black/20">
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="excerpt" className="text-white/90">Excerpt <span className="text-destructive">*</span></Label>
                <Textarea 
                  id="excerpt" 
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief summary of the article" 
                  rows={2} 
                  className="bg-[#1A1F2C]/50 border-gold/30"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content" className="text-white/90">Content</Label>
                <div className="rounded-md border border-gold/30 bg-[#1A1F2C]/50 overflow-hidden">
                  <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gold/20 bg-[#1A1F2C]/70">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-white/80 hover:text-white hover:bg-gold/10"
                      onClick={() => handleTextFormatting('bold')}
                      aria-label="Bold text"
                    >
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-white/80 hover:text-white hover:bg-gold/10"
                      onClick={() => handleTextFormatting('italic')}
                      aria-label="Italic text"
                    >
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-white/80 hover:text-white hover:bg-gold/10"
                      onClick={() => handleTextFormatting('underline')}
                      aria-label="Underline text"
                    >
                      <Underline className="h-4 w-4" />
                    </Button>
                    <span className="w-px h-5 bg-gold/20 mx-1"></span>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-white/80 hover:text-white hover:bg-gold/10"
                      onClick={() => handleTextFormatting('link')}
                      aria-label="Insert link"
                    >
                      <Link className="h-4 w-4" />
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-white/80 hover:text-white hover:bg-gold/10"
                      onClick={() => handleTextFormatting('image')}
                      aria-label="Insert image"
                    >
                      <Image className="h-4 w-4" />
                    </Button>
                    <span className="w-px h-5 bg-gold/20 mx-1"></span>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="px-2 py-1 text-white/80 hover:text-white hover:bg-gold/10 text-xs"
                      onClick={() => handleTextFormatting('paragraph')}
                      aria-label="Add paragraph"
                    >
                      <Text className="h-4 w-4 mr-1" />
                      Paragraph
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="px-2 py-1 text-white/80 hover:text-white hover:bg-gold/10 text-xs"
                      onClick={() => handleTextFormatting('heading')}
                      aria-label="Add heading"
                    >
                      <span className="font-bold">H</span>
                      Heading
                    </Button>
                    <div className="flex-grow"></div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="px-2 py-1 text-white/80 hover:text-white hover:bg-gold/10 text-xs"
                      onClick={() => setShowPreview(!showPreview)}
                      aria-label={showPreview ? "Edit content" : "Preview content"}
                    >
                      {showPreview ? "Edit" : "Preview"}
                    </Button>
                  </div>
                  
                  {showPreview ? (
                    <div 
                      className="p-4 min-h-[300px] max-h-[600px] overflow-y-auto prose prose-invert prose-gold"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  ) : (
                    <Textarea 
                      id="content" 
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Full article content (HTML supported)" 
                      rows={10} 
                      className="bg-transparent border-0 rounded-none resize-y min-h-[300px] focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  )}
                </div>
                <p className="text-xs text-white/60 mt-1">
                  Use the formatting toolbar above to style your content. HTML tags are supported.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="featured"
                    checked={isFeatured}
                    onCheckedChange={setIsFeatured}
                    className="data-[state=checked]:bg-byzantine"
                  />
                  <Label htmlFor="featured" className="text-white/90">Feature this article on the homepage</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="draft"
                    checked={isDraft}
                    onCheckedChange={setIsDraft}
                    className="data-[state=checked]:bg-amber-600"
                  />
                  <Label htmlFor="draft" className="text-white/90">Save as draft (not publicly visible)</Label>
                </div>
              </div>
              
              <div className="flex justify-end gap-4">
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={cancelEdit}
                  className="border-gold/30 text-gold hover:bg-gold/10"
                >
                  Cancel
                </Button>
                <Button 
                  type="button"
                  className="bg-byzantine hover:bg-byzantine-dark shadow-gold/10 shadow-lg" 
                  onClick={handleSaveArticle}
                >
                  <Check className="h-4 w-4 mr-2" />
                  {isAddingArticle 
                    ? (isDraft ? "Save as Draft" : "Publish Article") 
                    : (isDraft ? "Save Draft" : "Update Article")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
