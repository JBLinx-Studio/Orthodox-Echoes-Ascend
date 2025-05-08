
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Edit, Trash2, Plus, ArrowUp, FileText, Book, FileSymlink, Copy, Link2, MessageCircle, Clock, Tag, User } from 'lucide-react';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { BlogPost, BlogCategory } from '@/types/BlogPost';

// Define the content item type to fix TypeScript errors
interface ContentItem {
  id: string;
  title: string;
  type: string;
  content: string;
  author: string;
  lastModified: string;
  category?: string;
  status?: string;
  date?: string;
  imageUrl?: string;
  contentType?: "blog" | "article" | "prayer" | "book" | "doctrine";
  tags?: string[];
}

const MOCK_ARTICLES: ContentItem[] = [
  { 
    id: "1", 
    title: 'The Divine Liturgy: A Heavenly Experience', 
    type: 'article', 
    content: 'Lorem ipsum dolor sit amet...', 
    category: 'Liturgy', 
    status: 'Published', 
    date: 'Mar 15, 2025',
    lastModified: 'Apr 15, 2025',
    author: 'Fr. John',
    contentType: 'article',
    tags: ['liturgy', 'worship']
  },
  { 
    id: "2", 
    title: 'St. Athanasius and the Defense of Orthodoxy', 
    type: 'article', 
    content: 'Lorem ipsum dolor sit amet...', 
    category: 'Saints', 
    status: 'Published', 
    date: 'Apr 2, 2025',
    lastModified: 'Apr 12, 2025',
    author: 'Dr. Timothy',
    contentType: 'blog',
    tags: ['saints', 'history']
  },
  { 
    id: "3", 
    title: 'Understanding the Holy Trinity', 
    type: 'article', 
    content: 'Lorem ipsum dolor sit amet...', 
    category: 'Theology', 
    status: 'Draft', 
    date: 'Mar 28, 2025',
    lastModified: 'Apr 8, 2025',
    author: 'Metropolitan Nicholas',
    contentType: 'doctrine',
    tags: ['theology', 'trinity']
  },
  { 
    id: "4", 
    title: 'The Great Schism of 1054', 
    type: 'article', 
    content: 'Lorem ipsum dolor sit amet...', 
    category: 'History', 
    status: 'Published', 
    date: 'Apr 10, 2025',
    lastModified: 'Apr 15, 2025',
    author: 'Prof. Alexandra',
    contentType: 'book',
    tags: ['history', 'church history']
  },
  { 
    id: "5", 
    title: 'The Meaning of Orthodox Iconography', 
    type: 'article', 
    content: 'Lorem ipsum dolor sit amet...', 
    category: 'Theology', 
    status: 'Review', 
    date: 'Mar 22, 2025',
    lastModified: 'Apr 5, 2025',
    author: 'Iconographer Maria',
    contentType: 'article',
    tags: ['iconography', 'art']
  },
];

const CONTENT_TYPES = [
  { value: 'blog', label: 'Blog Post', icon: <FileText className="h-4 w-4 mr-2" /> },
  { value: 'article', label: 'Article', icon: <FileSymlink className="h-4 w-4 mr-2" /> },
  { value: 'prayer', label: 'Prayer', icon: <Book className="h-4 w-4 mr-2" /> },
  { value: 'book', label: 'Book', icon: <Book className="h-4 w-4 mr-2" /> },
  { value: 'doctrine', label: 'Doctrine', icon: <FileText className="h-4 w-4 mr-2" /> },
];

export function ContentManager() {
  const [articles, setArticles] = useState<ContentItem[]>(MOCK_ARTICLES);
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ContentItem | null>(null);
  const [activeFilterTab, setActiveFilterTab] = useState('all');
  const [searchText, setSearchText] = useState('');
  
  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('article');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [contentType, setContentType] = useState<"blog" | "article" | "prayer" | "book" | "doctrine">("article");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isDraft, setIsDraft] = useState(false);
  
  // Filter content based on active tab and search text
  const filteredArticles = articles.filter(article => {
    // First apply tab filter
    if (activeFilterTab !== 'all' && article.contentType !== activeFilterTab) {
      return false;
    }
    
    // Then apply search filter
    if (searchText) {
      const query = searchText.toLowerCase();
      return (
        article.title.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query) ||
        (article.tags && article.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    return true;
  });
  
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this content?')) {
      setArticles(articles.filter(article => article.id !== id));
      toast.success('Content deleted successfully');
    }
  };
  
  const handleEdit = (article: ContentItem) => {
    setEditingArticle(article);
    setTitle(article.title);
    setContent(article.content);
    setType(article.type);
    setAuthor(article.author);
    setImageUrl(article.imageUrl || '');
    setContentType(article.contentType || 'article');
    setTags(article.tags || []);
    setIsAddingArticle(false);
  };
  
  const handleNewArticle = () => {
    resetForm();
    setIsAddingArticle(true);
    setEditingArticle(null);
  };
  
  const resetForm = () => {
    setTitle('');
    setContent('');
    setType('article');
    setAuthor('');
    setImageUrl('');
    setContentType('article');
    setTags([]);
    setTagInput('');
    setIsDraft(false);
  };
  
  const handleSave = () => {
    if (!title || !content || !author) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    if (editingArticle) {
      // Update existing article
      const updatedArticles = articles.map(article => 
        article.id === editingArticle.id 
          ? {
              ...article,
              title,
              content,
              type,
              author,
              lastModified: formattedDate,
              imageUrl: imageUrl || undefined,
              contentType,
              tags,
              status: isDraft ? 'Draft' : 'Published'
            } 
          : article
      );
      
      setArticles(updatedArticles);
      toast.success('Content updated successfully');
    } else {
      // Add new article
      const newArticle: ContentItem = {
        id: (articles.length + 1).toString(),
        title,
        content,
        type,
        author,
        date: formattedDate,
        lastModified: formattedDate,
        imageUrl: imageUrl || undefined,
        contentType,
        tags,
        status: isDraft ? 'Draft' : 'Published'
      };
      
      setArticles([...articles, newArticle]);
      toast.success('New content created successfully');
    }
    
    resetForm();
    setIsAddingArticle(false);
    setEditingArticle(null);
  };
  
  const handleCancel = () => {
    resetForm();
    setIsAddingArticle(false);
    setEditingArticle(null);
  };
  
  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl">Content Management</CardTitle>
          <Button onClick={handleNewArticle} className="bg-byzantine hover:bg-byzantine-dark">
            <Plus className="h-4 w-4 mr-2" /> New Content
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <Tabs defaultValue="all" value={activeFilterTab} onValueChange={setActiveFilterTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Content</TabsTrigger>
                {CONTENT_TYPES.map(type => (
                  <TabsTrigger key={type.value} value={type.value} className="flex items-center">
                    {type.icon} {type.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          
          <div className="mb-6">
            <div className="relative">
              <Input
                placeholder="Search content..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-10"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchText && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full aspect-square rounded-l-none"
                  onClick={() => setSearchText('')}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Button>
              )}
            </div>
          </div>
          
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-4 text-left font-medium">Title</th>
                    <th className="py-3 px-4 text-left font-medium">Type</th>
                    <th className="py-3 px-4 text-left font-medium">Author</th>
                    <th className="py-3 px-4 text-left font-medium">Status</th>
                    <th className="py-3 px-4 text-left font-medium">Last Modified</th>
                    <th className="py-3 px-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                      <tr key={article.id} className="border-b">
                        <td className="py-3 px-4 flex items-center gap-2">
                          {article.contentType === 'blog' && <FileText className="h-4 w-4 text-blue-400" />}
                          {article.contentType === 'article' && <FileSymlink className="h-4 w-4 text-green-400" />}
                          {article.contentType === 'prayer' && <Book className="h-4 w-4 text-amber-400" />}
                          {article.contentType === 'book' && <Book className="h-4 w-4 text-purple-400" />}
                          {article.contentType === 'doctrine' && <FileText className="h-4 w-4 text-red-400" />}
                          {article.title}
                        </td>
                        <td className="py-3 px-4 capitalize">{article.contentType || article.type}</td>
                        <td className="py-3 px-4">{article.author}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            article.status === 'Published' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400' 
                              : article.status === 'Draft'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-800/20 dark:text-amber-400'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400'
                          }`}>
                            {article.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">{article.lastModified}</td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleEdit(article)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive/90"
                            onClick={() => handleDelete(article.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-muted-foreground">
                        {searchText ? (
                          <div>
                            <p>No content matching your search criteria</p>
                            <Button 
                              variant="link" 
                              onClick={() => setSearchText('')} 
                              className="mt-2"
                            >
                              Clear search
                            </Button>
                          </div>
                        ) : (
                          <p>No content available. Create your first piece of content!</p>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {(isAddingArticle || editingArticle) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{editingArticle ? 'Edit Content' : 'Create New Content'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Enter content title" 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contentType">Content Type <span className="text-red-500">*</span></Label>
                  <Select value={contentType} onValueChange={(value: any) => setContentType(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {CONTENT_TYPES.map(type => (
                        <SelectItem key={type.value} value={type.value} className="flex items-center">
                          <div className="flex items-center">
                            {type.icon} {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="author">Author <span className="text-red-500">*</span></Label>
                  <Input 
                    id="author" 
                    value={author} 
                    onChange={(e) => setAuthor(e.target.value)} 
                    placeholder="Content author" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="isDraft">Publication Status</Label>
                  <div className="flex items-center h-10 space-x-2">
                    <Switch 
                      id="isDraft" 
                      checked={isDraft} 
                      onCheckedChange={setIsDraft}
                    />
                    <Label htmlFor="isDraft" className="text-sm cursor-pointer">
                      {isDraft ? 'Save as Draft' : 'Publish Immediately'}
                    </Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex flex-wrap gap-2 p-2 border rounded-md mb-2">
                  {tags.map((tag) => (
                    <div 
                      key={tag} 
                      className="flex items-center gap-1 px-2 py-1 bg-muted rounded-full text-sm"
                    >
                      <span>{tag}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-5 w-5 p-0 rounded-full"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </Button>
                    </div>
                  ))}
                  <div className="flex-1 min-w-[180px]">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a tag..."
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="h-8"
                      />
                      <Button
                        type="button" 
                        variant="outline"
                        size="sm"
                        className="h-8"
                        onClick={handleAddTag}
                        disabled={!tagInput}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="featuredImage">Image URL (optional)</Label>
                <Input 
                  id="featuredImage" 
                  value={imageUrl} 
                  onChange={(e) => setImageUrl(e.target.value)} 
                  placeholder="https://example.com/image.jpg" 
                />
                
                {imageUrl && (
                  <div className="mt-2 h-40 rounded-md overflow-hidden">
                    <img 
                      src={imageUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Content <span className="text-red-500">*</span></Label>
                <Textarea 
                  id="content" 
                  value={content} 
                  onChange={(e) => setContent(e.target.value)} 
                  placeholder="Full content text" 
                  rows={15} 
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  You can use HTML tags for formatting. For example, <code>&lt;p&gt;</code> for paragraphs, <code>&lt;h2&gt;</code> for headings, <code>&lt;img&gt;</code> for images, etc.
                </p>
              </div>
              
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                <Button className="bg-byzantine hover:bg-byzantine-dark" onClick={handleSave}>
                  {editingArticle ? 'Update Content' : 'Create Content'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
