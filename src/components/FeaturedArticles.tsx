
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { BlogPost } from '@/types/BlogPost';
import { Input } from '@/components/ui/input';

// Sample blog posts - this would normally be fetched from a database
// Let's use the same data structure as in the Blog page
const ARTICLES: BlogPost[] = [
  {
    id: "1",
    title: "The Divine Liturgy: A Heavenly Experience",
    excerpt: "Exploring the profound mysteries of the Orthodox Divine Liturgy and its celestial symbolism.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl.",
    author: "Fr. Seraphim",
    publishDate: "March 15, 2025",
    imageUrl: "https://images.unsplash.com/photo-1574039677318-3febf1c5c8e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    tags: ["Liturgy", "Worship", "Theology"],
    featured: true,
    category: "liturgy",
    readTime: 8,
    views: 2453
  },
  {
    id: "2",
    title: "St. Athanasius and the Defense of Orthodoxy",
    excerpt: "How one man's unwavering faith preserved the Orthodox understanding of Christ's divinity.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl.",
    author: "Dr. Timothy Orthodox",
    publishDate: "April 2, 2025",
    imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    tags: ["Saints", "Church History", "Theology"],
    featured: true,
    category: "saints",
    readTime: 12,
    views: 1876
  },
  {
    id: "3",
    title: "Understanding the Holy Trinity",
    excerpt: "A theological exploration of the Orthodox understanding of the Triune God.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl.",
    author: "Metropolitan Nicholas",
    publishDate: "March 28, 2025",
    imageUrl: "https://images.unsplash.com/photo-1595118216242-53018840a9f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    tags: ["Theology", "Doctrine", "Faith"],
    featured: false,
    category: "theology",
    readTime: 15,
    views: 3219
  },
  {
    id: "4",
    title: "The Great Schism of 1054",
    excerpt: "Examining the historical and theological factors that led to the divide between East and West.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl.",
    author: "Prof. Alexandra Konstantinidis",
    publishDate: "April 10, 2025",
    imageUrl: "https://images.unsplash.com/photo-1548407260-da850faa41e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    tags: ["Church History", "East-West Schism"],
    featured: true,
    category: "history",
    readTime: 10,
    views: 2071
  },
  {
    id: "5",
    title: "The Meaning of Orthodox Iconography",
    excerpt: "Exploring the theological significance of icons as windows to heaven.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl.",
    author: "Iconographer Maria",
    publishDate: "March 22, 2025",
    imageUrl: "https://images.unsplash.com/photo-1594822566893-f1e6e0444888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    tags: ["Iconography", "Art", "Theology"],
    featured: true,
    category: "art",
    readTime: 7,
    views: 4562
  },
  {
    id: "6",
    title: "The Jesus Prayer: Lord Have Mercy",
    excerpt: "Exploring the history, practice, and spiritual benefits of the Jesus Prayer in Orthodox tradition.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl.",
    author: "Hieromonk Gabriel",
    publishDate: "April 5, 2025",
    imageUrl: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Spirituality", "Prayer", "Traditions"],
    featured: false,
    category: "spirituality",
    readTime: 9,
    views: 1854
  },
];

const CATEGORIES = ['All', 'Featured', 'History', 'Theology', 'Liturgy', 'Saints', 'Spirituality', 'Art'];
const TYPES = ['All', 'Articles', 'Blogs', 'Books'];

interface ArticleCardProps {
  article: BlogPost;
  featured?: boolean;
}

function ArticleCard({ article, featured = false }: ArticleCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden border-none shadow-md transition-all duration-300 hover:shadow-lg bg-[#1A1F2C]/70 backdrop-blur-sm h-full",
      featured && "md:col-span-2 md:row-span-2"
    )}>
      <div className={cn(
        "grid grid-cols-1",
        featured ? "md:grid-cols-2" : "h-full"
      )}>
        <div className={cn(
          "relative aspect-video overflow-hidden",
          featured ? "md:h-full" : "h-40"
        )}>
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-2 left-2 bg-[#ea384c] text-white text-xs px-2 py-1 rounded">{article.category}</div>
          <div className="absolute bottom-2 right-2 bg-[#1A1F2C]/80 text-white text-xs px-2 py-1 rounded flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {article.views}
          </div>
        </div>
        <CardContent className="p-4 flex flex-col h-full">
          <div className="mb-2 flex justify-between items-center">
            <span className="text-sm text-gold">{article.publishDate}</span>
            <span className="text-xs text-white/60">{article.readTime} min read</span>
          </div>
          
          <h3 className={cn(
            "font-display font-bold tracking-tight text-white",
            featured ? "text-xl md:text-2xl mb-3" : "text-lg mb-2"
          )}>
            {article.title}
          </h3>
          
          <p className={cn(
            "text-gray-300 line-clamp-2",
            featured && "md:line-clamp-4"
          )}>
            {article.excerpt}
          </p>
          
          <div className="mt-2 flex flex-wrap gap-2">
            {article.tags.slice(0, 2).map(tag => (
              <span key={tag} className="bg-[#1A1F2C]/80 text-gold text-xs px-2 py-1 rounded border border-gold/20">
                {tag}
              </span>
            ))}
            {article.tags.length > 2 && (
              <span className="bg-[#1A1F2C]/80 text-gold text-xs px-2 py-1 rounded border border-gold/20">
                +{article.tags.length - 2}
              </span>
            )}
          </div>
          
          <div className="mt-auto pt-4 flex justify-between items-center">
            <span className="text-xs text-white/70">By {article.author}</span>
            <Button asChild variant="link" className="p-0 h-auto font-medium text-gold hover:text-gold-light">
              <Link to={`/blog/${article.id}`} className="flex items-center gap-1">
                Read more <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

export function FeaturedArticles() {
  const [currentCategory, setCurrentCategory] = useState('All');
  const [currentType, setCurrentType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<BlogPost[]>(ARTICLES);
  
  useEffect(() => {
    // In a real app, you would fetch the articles from an API
  }, []);
  
  const filteredArticles = articles.filter(article => {
    // Filter by category
    const categoryMatch = currentCategory === 'All' || 
                          (currentCategory === 'Featured' && article.featured) || 
                          article.category.toLowerCase() === currentCategory.toLowerCase();
    
    // Filter by type (in a real app, you would have a type field)
    // For now, we'll just pretend everything is an article
    const typeMatch = currentType === 'All' || 
                      (currentType === 'Articles' && article.id !== '99') || // Fake condition just for demo
                      (currentType === 'Blogs' && parseInt(article.id) % 2 === 0) || // Even IDs are blogs
                      (currentType === 'Books' && parseInt(article.id) % 3 === 0); // Every third ID is a book
    
    // Filter by search query
    const searchMatch = searchQuery === '' || 
                        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return categoryMatch && typeMatch && searchMatch;
  });
  
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="orthodox-heading text-2xl md:text-3xl font-bold mb-2 text-white">Explore Our Articles</h2>
            <p className="text-gray-300">Discover the depth and richness of Orthodox teaching and tradition</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            {/* Search bar */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search articles..." 
                className="bg-[#1A1F2C]/60 border-gold/20 pl-9 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Content type filter */}
            <Tabs value={currentType} onValueChange={setCurrentType} className="w-full md:w-auto">
              <TabsList className="bg-[#1A1F2C]/70 border border-gold/20">
                {TYPES.map(type => (
                  <TabsTrigger key={type} value={type} className="text-white data-[state=active]:bg-[#ea384c] data-[state=active]:text-white">{type}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        {/* Category tabs */}
        <div className="mb-6 overflow-x-auto">
          <Tabs value={currentCategory} onValueChange={setCurrentCategory} className="w-full">
            <TabsList className="bg-[#1A1F2C]/70 border border-gold/20 mb-6">
              {CATEGORIES.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="text-white data-[state=active]:bg-[#ea384c] data-[state=active]:text-white"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, index) => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                featured={index === 0 && currentCategory === 'Featured'} 
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 glass-panel">
              <p className="text-white/60">No articles available with the current filters.</p>
              <Button 
                className="mt-4 bg-[#ea384c] hover:bg-[#c42e3f]"
                onClick={() => {
                  setCurrentCategory('All');
                  setCurrentType('All');
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
        
        <div className="mt-10 flex justify-between items-center">
          <div>
            <p className="text-white/60 text-sm">Showing {filteredArticles.length} of {ARTICLES.length} articles</p>
          </div>
          
          <div className="flex gap-4">
            <Button asChild variant="outline" className="border-gold/30 text-gold hover:bg-gold/10">
              <Link to="/blog">View All Articles</Link>
            </Button>
            
            <Button className="bg-[#ea384c] hover:bg-[#c42e3f] text-white border border-gold/20">
              <Link to="/blog/new" className="flex items-center gap-1">
                Create New Article
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
