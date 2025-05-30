
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { BlogPost } from '@/types/BlogPost';

// Sample blog posts - this would normally be fetched from a database
// Let's use the same data structure as in the Blog page
const ARTICLES: BlogPost[] = [
  {
    id: "1",
    title: "The Divine Liturgy: A Heavenly Experience",
    excerpt: "Exploring the profound mysteries of the Orthodox Divine Liturgy and its celestial symbolism.",
    content: "",
    author: "Fr. Seraphim",
    publishDate: "March 15, 2025",
    imageUrl: "https://images.unsplash.com/photo-1574039677318-3febf1c5c8e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    tags: ["Liturgy", "Worship", "Theology"],
    featured: true,
    category: "liturgy",
    readTime: 8
  },
  {
    id: "2",
    title: "St. Athanasius and the Defense of Orthodoxy",
    excerpt: "How one man's unwavering faith preserved the Orthodox understanding of Christ's divinity.",
    content: "",
    author: "Dr. Timothy Orthodox",
    publishDate: "April 2, 2025",
    imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    tags: ["Saints", "Church History", "Theology"],
    featured: true,
    category: "saints",
    readTime: 12
  },
  {
    id: "3",
    title: "Understanding the Holy Trinity",
    excerpt: "A theological exploration of the Orthodox understanding of the Triune God.",
    content: "",
    author: "Metropolitan Nicholas",
    publishDate: "March 28, 2025",
    imageUrl: "https://images.unsplash.com/photo-1595118216242-53018840a9f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    tags: ["Theology", "Doctrine", "Faith"],
    featured: false,
    category: "theology",
    readTime: 15
  },
  {
    id: "4",
    title: "The Great Schism of 1054",
    excerpt: "Examining the historical and theological factors that led to the divide between East and West.",
    content: "",
    author: "Prof. Alexandra Konstantinidis",
    publishDate: "April 10, 2025",
    imageUrl: "https://images.unsplash.com/photo-1548407260-da850faa41e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    tags: ["Church History", "East-West Schism"],
    featured: true,
    category: "history",
    readTime: 10
  },
  {
    id: "5",
    title: "The Meaning of Orthodox Iconography",
    excerpt: "Exploring the theological significance of icons as windows to heaven.",
    content: "",
    author: "Iconographer Maria",
    publishDate: "March 22, 2025",
    imageUrl: "https://images.unsplash.com/photo-1594822566893-f1e6e0444888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    tags: ["Iconography", "Art", "Theology"],
    featured: true,
    category: "art",
    readTime: 7
  },
  {
    id: "6",
    title: "The Jesus Prayer: Lord Have Mercy",
    excerpt: "Exploring the history, practice, and spiritual benefits of the Jesus Prayer in Orthodox tradition.",
    content: "",
    author: "Hieromonk Gabriel",
    publishDate: "April 5, 2025",
    imageUrl: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Spirituality", "Prayer", "Traditions"],
    featured: false,
    category: "spirituality",
    readTime: 9
  },
];

const CATEGORIES = ['Featured', 'History', 'Theology', 'Liturgy', 'Saints', 'Spirituality'];

interface ArticleCardProps {
  article: BlogPost;
  featured?: boolean;
}

function ArticleCard({ article, featured = false }: ArticleCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden border-none shadow-md transition-all duration-300 hover:shadow-lg bg-card h-full",
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
          <div className="absolute top-2 left-2 bg-byzantine text-white text-xs px-2 py-1 rounded">{article.category}</div>
        </div>
        <CardContent className="p-4 flex flex-col h-full">
          <div className="mb-2 text-sm text-muted-foreground">{article.publishDate}</div>
          <h3 className={cn(
            "font-display font-bold tracking-tight",
            featured ? "text-xl md:text-2xl mb-3" : "text-lg mb-2"
          )}>
            {article.title}
          </h3>
          <p className={cn(
            "text-muted-foreground line-clamp-2",
            featured && "md:line-clamp-4"
          )}>
            {article.excerpt}
          </p>
          <div className="mt-auto pt-4">
            <Button asChild variant="link" className="p-0 h-auto font-medium text-byzantine hover:text-byzantine-dark">
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
  const [currentTab, setCurrentTab] = useState('Featured');
  const [articles, setArticles] = useState<BlogPost[]>(ARTICLES);
  
  useEffect(() => {
    // In a real app, you would fetch the articles from an API
    // For now, we'll just use the sample data
  }, []);
  
  const filteredArticles = articles.filter(article => {
    if (currentTab === 'Featured') return article.featured;
    return article.category.toLowerCase() === currentTab.toLowerCase();
  });
  
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="orthodox-heading text-2xl md:text-3xl font-bold mb-2">Explore Our Articles</h2>
            <p className="text-muted-foreground">Discover the depth and richness of Orthodox teaching and tradition</p>
          </div>
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full md:w-auto">
            <TabsList className="bg-muted/50">
              {CATEGORIES.map(category => (
                <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
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
                featured={index === 0 && currentTab === 'Featured'} 
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-white/60">
              <p>No articles available in this category.</p>
            </div>
          )}
        </div>
        
        <div className="mt-10 text-center">
          <Button asChild variant="outline" className="border-byzantine text-byzantine hover:bg-byzantine/10">
            <Link to="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
