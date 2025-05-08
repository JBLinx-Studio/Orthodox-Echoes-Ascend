
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BlogPost, Comment } from '@/types/BlogPost';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { ArrowLeft, Heart, Share2, Eye, Calendar, Clock, User, MessageSquare, Edit, Trash2 } from 'lucide-react';

interface BlogPostDetailProps {
  post: BlogPost;
  onLike?: () => void;
  onEdit?: (post: BlogPost) => void;
  onDelete?: (postId: string) => void;
}

export function BlogPostDetail({ post, onLike, onEdit, onDelete }: BlogPostDetailProps) {
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [likes, setLikes] = useState(post.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const navigate = useNavigate();

  // Load comments for this post
  useEffect(() => {
    const savedComments = localStorage.getItem('orthodoxEchoesComments');
    if (savedComments) {
      const allComments = JSON.parse(savedComments) as Comment[];
      // Filter comments for this post and that are approved
      const postComments = allComments.filter(
        comment => comment.articleId === post.id && comment.approved
      );
      setComments(postComments);
    }
  }, [post.id]);

  // Check if admin from localStorage
  useEffect(() => {
    const adminStatus = localStorage.getItem('orthodoxEchoesAdmin');
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // Update views count
  useEffect(() => {
    // Get blog posts from localStorage
    const savedPosts = localStorage.getItem('orthodoxEchoesBlogPosts');
    if (savedPosts) {
      const posts = JSON.parse(savedPosts) as BlogPost[];
      
      // Increment view count for this post
      const updatedPosts = posts.map(p => 
        p.id === post.id ? { ...p, views: (p.views || 0) + 1 } : p
      );
      
      // Save back to localStorage
      localStorage.setItem('orthodoxEchoesBlogPosts', JSON.stringify(updatedPosts));
    }
  }, [post.id]);

  const handleLike = () => {
    if (!hasLiked) {
      // Update local state
      setLikes(likes + 1);
      setHasLiked(true);
      
      // Update in localStorage
      const savedPosts = localStorage.getItem('orthodoxEchoesBlogPosts');
      if (savedPosts) {
        const posts = JSON.parse(savedPosts) as BlogPost[];
        const updatedPosts = posts.map(p => 
          p.id === post.id ? { ...p, likes: (p.likes || 0) + 1 } : p
        );
        localStorage.setItem('orthodoxEchoesBlogPosts', JSON.stringify(updatedPosts));
      }
      
      if (onLike) {
        onLike();
      }
      
      toast.success("Thanks for your appreciation!");
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !comment) {
      toast.error("Please fill in your name and comment");
      return;
    }
    
    // Create new comment
    const newComment: Comment = {
      id: Date.now().toString(),
      author: name,
      authorEmail: email || undefined,
      content: comment,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      approved: false, // Comments need approval
      flagged: false,
      article: post.title,
      articleId: post.id
    };
    
    // Add to localStorage
    const savedComments = localStorage.getItem('orthodoxEchoesComments');
    let allComments: Comment[] = [];
    
    if (savedComments) {
      allComments = JSON.parse(savedComments);
    }
    
    allComments.push(newComment);
    localStorage.setItem('orthodoxEchoesComments', JSON.stringify(allComments));
    
    toast.success("Comment submitted for approval", {
      description: "Your comment will be visible after moderation."
    });
    
    setComment('');
    setName('');
    setEmail('');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      })
      .then(() => toast.success("Shared successfully"))
      .catch(() => toast.error("Error sharing"));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(post);
    } else {
      navigate(`/admin?editPost=${post.id}`);
    }
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      if (onDelete) {
        onDelete(post.id);
        navigate('/blog');
        toast.success("Post deleted successfully");
      } else {
        // Handle deletion in localStorage
        const savedPosts = localStorage.getItem('orthodoxEchoesBlogPosts');
        if (savedPosts) {
          const posts = JSON.parse(savedPosts) as BlogPost[];
          const updatedPosts = posts.filter(p => p.id !== post.id);
          localStorage.setItem('orthodoxEchoesBlogPosts', JSON.stringify(updatedPosts));
          navigate('/blog');
          toast.success("Post deleted successfully");
        }
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            className="text-white/70 hover:text-white flex items-center" 
            onClick={() => navigate('/blog')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Articles
          </Button>

          {isAdmin && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-byzantine text-byzantine hover:bg-byzantine/10 flex items-center gap-1.5"
                onClick={handleEdit}
              >
                <Edit className="h-4 w-4" />
                Edit Post
              </Button>
              <Button
                variant="outline"
                className="border-destructive text-destructive hover:bg-destructive/10 flex items-center gap-1.5"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          )}
        </div>
        
        <article className="bg-[#1A1F2C]/40 border border-gold/20 rounded-lg overflow-hidden shadow-xl p-6 md:p-8 glass-morphism space-y-6">
          {post.imageUrl && (
            <div className="relative w-full h-60 md:h-80 -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-6">
              <div className="absolute inset-0">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C] via-transparent to-transparent"></div>
              </div>
            </div>
          )}
          
          <header className="relative space-y-4">
            <h1 className="text-2xl md:text-4xl font-bold orthodox-heading text-gold leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1.5" />
                {post.publishDate}
              </span>
              
              <span className="flex items-center">
                <User className="h-4 w-4 mr-1.5" />
                {post.author}
              </span>
              
              {post.readTime && (
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1.5" />
                  {post.readTime} min read
                </span>
              )}
              
              <span className="flex items-center">
                <Eye className="h-4 w-4 mr-1.5" />
                {post.views || 0} views
              </span>
              
              <span className="flex items-center">
                <Heart className="h-4 w-4 mr-1.5" fill={hasLiked ? "currentColor" : "none"} />
                {likes} likes
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Link 
                  key={tag} 
                  to={`/blog?tag=${tag}`} 
                  className="text-xs px-2.5 py-1 rounded-full bg-byzantine/20 text-byzantine-light hover:bg-byzantine/30 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </header>
          
          <div className="my-6 border-t border-b border-gold/10 py-4">
            <p className="text-lg text-white/90 italic">
              {post.excerpt}
            </p>
          </div>
          
          <div 
            className="prose prose-invert prose-gold max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="flex items-center justify-between pt-6 border-t border-gold/10 mt-8">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline"
                size="sm"
                className={`border-gold/30 ${hasLiked ? 'bg-gold/20 text-gold' : 'text-gold hover:bg-gold/10'}`}
                onClick={handleLike}
                disabled={hasLiked}
              >
                <Heart className="h-4 w-4 mr-1.5" fill={hasLiked ? "currentColor" : "none"} />
                {hasLiked ? 'Liked' : 'Like'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="border-gold/30 text-gold hover:bg-gold/10"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-1.5" />
                Share
              </Button>
            </div>
            
            <div className="text-sm text-white/60">
              Category: 
              <span className="ml-2 text-byzantine-light">{post.category}</span>
            </div>
          </div>

          {post.updatedAt && (
            <div className="text-xs text-white/50 mt-4 italic">
              Last updated: {post.updatedAt}
              {post.lastEditedBy && ` by ${post.lastEditedBy}`}
            </div>
          )}
        </article>
        
        <section className="mt-12">
          <h2 className="text-xl font-bold text-gold mb-4 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Discussion
          </h2>
          
          <Card className="glass-morphism border-gold/20 shadow-lg">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmitComment} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm text-white/90 block">
                      Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full px-3 py-2 rounded-md bg-[#1A1F2C]/50 border border-gold/30 focus:outline-none focus:ring-2 focus:ring-byzantine focus:border-transparent"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm text-white/90 block">
                      Email (optional)
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-3 py-2 rounded-md bg-[#1A1F2C]/50 border border-gold/30 focus:outline-none focus:ring-2 focus:ring-byzantine focus:border-transparent"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email (not published)"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="comment" className="text-sm text-white/90 block">
                    Comment <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    id="comment"
                    className="bg-[#1A1F2C]/50 border-gold/30"
                    placeholder="Share your thoughts..."
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    className="bg-byzantine hover:bg-byzantine-dark shadow-gold/10 shadow-lg"
                  >
                    Submit Comment
                  </Button>
                </div>
              </form>
              
              <div className="mt-8 space-y-6">
                {comments.length > 0 ? (
                  comments.map(comment => (
                    <div 
                      key={comment.id} 
                      className="p-4 rounded-md bg-[#1A1F2C]/60 border border-gold/10"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-white">{comment.author}</h4>
                        <span className="text-sm text-white/60">{comment.date}</span>
                      </div>
                      <p className="text-white/80">{comment.content}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-white/60">
                    <p>Be the first to comment on this article</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </section>
      </motion.div>
    </div>
  );
}
