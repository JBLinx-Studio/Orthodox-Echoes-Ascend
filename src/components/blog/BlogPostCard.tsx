
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '@/types/BlogPost';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Clock, Eye, Edit } from 'lucide-react';

interface BlogPostCardProps {
  post: BlogPost;
  onLike?: () => void;
  onEdit?: (post: BlogPost) => void;
}

export function BlogPostCard({ post, onLike, onEdit }: BlogPostCardProps) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem('orthodoxEchoesAdmin');
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onLike) onLike();
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onEdit) onEdit(post);
  };

  return (
    <Card className="overflow-hidden border border-gold/20 bg-[#1A1F2C]/40 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <Link to={`/blog/${post.id}`} className="block">
        <div className="relative aspect-video w-full overflow-hidden">
          {post.imageUrl ? (
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-byzantine/20 to-gold/20 flex items-center justify-center">
              <span className="text-xl font-display text-gold/60">Orthodox Echoes</span>
            </div>
          )}
          
          <div className="absolute top-0 left-0 w-full p-3 flex justify-between items-start">
            <span className="text-xs bg-byzantine text-white px-2 py-1 rounded">
              {post.category}
            </span>
            
            {post.featured && (
              <span className="text-xs bg-gold/80 text-black px-2 py-1 rounded">
                Featured
              </span>
            )}
          </div>
        </div>
      </Link>
      
      <CardContent className="py-4 flex-grow">
        <div className="flex justify-between items-center text-sm text-white/60 mb-2">
          <span>{post.publishDate}</span>
          
          <div className="flex items-center gap-3">
            {post.readTime && (
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {post.readTime} min
              </span>
            )}
            
            {post.views !== undefined && (
              <span className="flex items-center">
                <Eye className="h-3 w-3 mr-1" />
                {post.views}
              </span>
            )}
          </div>
        </div>
        
        <Link to={`/blog/${post.id}`} className="block group">
          <h3 className="text-xl font-bold orthodox-heading text-gold mb-2 group-hover:text-gold/80 transition-colors">
            {post.title}
          </h3>
          
          <p className="text-white/70 line-clamp-3 mb-4">
            {post.excerpt}
          </p>
        </Link>
      </CardContent>
      
      <CardFooter className="border-t border-gold/10 pt-4 pb-5 flex justify-between">
        <Button asChild variant="link" className="p-0 h-auto font-medium text-byzantine hover:text-byzantine-dark">
          <Link to={`/blog/${post.id}`} className="flex items-center">
            Read more <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
        
        <div className="flex gap-2">
          {isAdmin && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-byzantine/70 hover:text-byzantine hover:bg-byzantine/10 rounded-full"
              onClick={handleEdit}
              aria-label="Edit article"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-gold/70 hover:text-gold hover:bg-gold/10 rounded-full"
            onClick={handleLike}
            aria-label="Like article"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
