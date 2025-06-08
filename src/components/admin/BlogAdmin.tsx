import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Edit, Trash2, Plus } from 'lucide-react';
import { BlogPost } from '@/types/BlogPost';

// Mock data for demonstration
const MOCK_ARTICLES: BlogPost[] = [
  {
    id: "1",
    title: 'The Divine Liturgy: A Heavenly Experience',
    excerpt: 'Exploring the profound mysteries of the Orthodox Divine Liturgy and its celestial symbolism.',
    content: 'Full content here...',
    author: 'Fr. John',
    publishDate: 'Mar 15, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1574039677318-3febf1c5c8e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    tags: ['liturgy', 'worship'],
    featured: true,
    category: 'Liturgy',
    contentType: 'liturgy',
    readTime: 8
  },
  {
    id: "2",
    title: 'St. Athanasius and the Defense of Orthodoxy',
    excerpt: 'How one man\'s unwavering faith preserved the Orthodox understanding of Christ\'s divinity.',
    content: 'Full content here...',
    author: 'Dr. Timothy',
    publishDate: 'Apr 2, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    tags: ['saints', 'history'],
    featured: true,
    category: 'Saints',
    contentType: 'saint',
    readTime: 12
  },
  {
    id: "3",
    title: 'Understanding the Holy Trinity',
    excerpt: 'A theological exploration of the Orthodox understanding of the Triune God.',
    content: 'Full content here...',
    author: 'Metropolitan Nicholas',
    publishDate: 'Mar 28, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1595118216242-53018840a9f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    tags: ['theology', 'trinity'],
    featured: false,
    category: 'Theology',
    contentType: 'doctrine',
    readTime: 15
  },
  {
    id: "4",
    title: 'The Great Schism of 1054',
    excerpt: 'Examining the historical and theological factors that led to the divide between East and West.',
    content: 'Full content here...',
    author: 'Prof. Alexandra',
    publishDate: 'Apr 10, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1548407260-da850faa41e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    tags: ['history', 'church history'],
    featured: false,
    category: 'History',
    contentType: 'book',
    readTime: 10
  },
  {
    id: "5",
    title: 'The Meaning of Orthodox Iconography',
    excerpt: 'Exploring the theological significance of icons as windows to heaven.',
    content: 'Full content here...',
    author: 'Iconographer Maria',
    publishDate: 'Mar 22, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1594822566893-f1e6e0444888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    tags: ['iconography', 'art'],
    featured: false,
    category: 'Theology',
    contentType: 'icon',
    readTime: 7
  },
];

export function BlogAdmin() {
  const [articles, setArticles] = useState<BlogPost[]>(MOCK_ARTICLES);
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [editingArticle, setEditingArticle] = useState<BlogPost | null>(null);
  
  // Form state
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');
  
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      setArticles(articles.filter(article => article.id !== id));
      toast.success('Article deleted successfully');
    }
  };
  
  const handleEdit = (article: BlogPost) => {
    setEditingArticle(article);
    setTitle(article.title);
    setExcerpt(article.excerpt);
    setContent(article.content);
    setAuthor(article.author);
    setCategory(article.category);
    setImageUrl(article.imageUrl || '');
    setTags(article.tags.join(', '));
    setIsAddingArticle(false);
  };
  
  const handleNewArticle = () => {
    resetForm();
    setIsAddingArticle(true);
    setEditingArticle(null);
  };
  
  const resetForm = () => {
    setTitle('');
    setExcerpt('');
    setContent('');
    setAuthor('');
    setCategory('');
    setImageUrl('');
    setTags('');
  };
  
  const handleSave = () => {
    if (!title || !excerpt || !content || !author || !category) {
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
              excerpt,
              content,
              author,
              category,
              imageUrl: imageUrl || undefined,
              tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
              publishDate: formattedDate,
              featured: article.featured,
              contentType: article.contentType,
              readTime: Math.ceil(content.split(' ').length / 200)
            } 
          : article
      );
      
      setArticles(updatedArticles);
      toast.success('Article updated successfully');
    } else {
      // Add new article
      const newArticle: BlogPost = {
        id: (articles.length + 1).toString(),
        title,
        excerpt,
        content,
        author,
        publishDate: formattedDate,
        imageUrl: imageUrl || undefined,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        featured: false,
        category,
        contentType: 'article',
        readTime: Math.ceil(content.split(' ').length / 200)
      };
      
      setArticles([...articles, newArticle]);
      toast.success('New article created successfully');
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl">Blog Management</CardTitle>
          <Button onClick={handleNewArticle} className="bg-byzantine hover:bg-byzantine-dark">
            <Plus className="h-4 w-4 mr-2" /> New Article
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-4 text-left font-medium">Title</th>
                    <th className="py-3 px-4 text-left font-medium">Author</th>
                    <th className="py-3 px-4 text-left font-medium">Category</th>
                    <th className="py-3 px-4 text-left font-medium">Date</th>
                    <th className="py-3 px-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article) => (
                    <tr key={article.id} className="border-b">
                      <td className="py-3 px-4">{article.title}</td>
                      <td className="py-3 px-4">{article.author}</td>
                      <td className="py-3 px-4">{article.category}</td>
                      <td className="py-3 px-4">{article.publishDate}</td>
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {(isAddingArticle || editingArticle) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{editingArticle ? 'Edit Article' : 'Create New Article'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Enter article title" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Input 
                  id="excerpt" 
                  value={excerpt} 
                  onChange={(e) => setExcerpt(e.target.value)} 
                  placeholder="Enter article excerpt" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content" 
                  value={content} 
                  onChange={(e) => setContent(e.target.value)} 
                  placeholder="Enter article content" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input 
                  id="author" 
                  value={author} 
                  onChange={(e) => setAuthor(e.target.value)} 
                  placeholder="Enter article author" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input 
                  id="category" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  placeholder="Enter article category" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input 
                  id="imageUrl" 
                  value={imageUrl} 
                  onChange={(e) => setImageUrl(e.target.value)} 
                  placeholder="Enter article image URL" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input 
                  id="tags" 
                  value={tags} 
                  onChange={(e) => setTags(e.target.value)} 
                  placeholder="Enter article tags (comma separated)" 
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="ghost" onClick={handleCancel}>Cancel</Button>
                <Button className="bg-byzantine hover:bg-byzantine-dark" onClick={handleSave}>
                  {editingArticle ? 'Update Article' : 'Create Article'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
