
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { MessageSquare, CheckCircle, XCircle, Flag } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Comment } from '@/types/BlogPost';

// Function to get comments from localStorage
const getSavedComments = (): Comment[] => {
  const savedComments = localStorage.getItem('orthodoxEchoesComments');
  if (savedComments) {
    return JSON.parse(savedComments);
  }
  
  // Default mock comments if none in localStorage
  return [
    { 
      id: "1", 
      postId: "1",
      author: 'John D.', 
      content: 'Thank you for this insightful article on the Divine Liturgy. I\'ve learned so much!', 
      createdAt: '2 hours ago',
      approved: true,
      // Legacy properties for backward compatibility
      article: 'The Divine Liturgy: A Heavenly Experience',
      articleId: '1',
      date: '2 hours ago',
      flagged: false 
    },
    { 
      id: "2", 
      postId: "4",
      author: 'Maria S.', 
      content: 'I appreciate the balanced perspective on the historical events surrounding the Great Schism.', 
      createdAt: '1 day ago',
      approved: true,
      // Legacy properties
      article: 'The Great Schism of 1054',
      articleId: '4',
      date: '1 day ago',
      flagged: false 
    },
    { 
      id: "3", 
      postId: "3",
      author: 'Anonymous', 
      content: 'This is completely wrong. Orthodox Christianity is just as misguided as other religions.', 
      createdAt: '3 days ago',
      approved: false,
      // Legacy properties
      article: 'Understanding the Holy Trinity',
      articleId: '3',
      date: '3 days ago',
      flagged: true 
    },
    { 
      id: "4", 
      postId: "5",
      author: 'Peter K.', 
      content: 'Beautiful explanation of iconography! I\'ve been studying this for years and still learned something new.', 
      createdAt: '4 days ago',
      approved: true,
      // Legacy properties
      article: 'The Meaning of Orthodox Iconography',
      articleId: '5',
      date: '4 days ago',
      flagged: false 
    },
    { 
      id: "5", 
      postId: "2",
      author: 'Rebecca L.', 
      content: 'Can you provide more sources for these claims? I\'d like to read more about this topic.', 
      createdAt: '1 week ago',
      approved: true,
      // Legacy properties
      article: 'St. Athanasius and the Defense of Orthodoxy',
      articleId: '2',
      date: '1 week ago',
      flagged: false 
    },
  ];
};

export function CommentModeration() {
  const [comments, setComments] = useState<Comment[]>(getSavedComments());
  
  // Save comments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('orthodoxEchoesComments', JSON.stringify(comments));
  }, [comments]);
  
  const approveComment = (id: string) => {
    setComments(
      comments.map((comment) => 
        comment.id === id ? { ...comment, approved: true, flagged: false } : comment
      )
    );
    toast.success('Comment approved');
  };
  
  const removeComment = (id: string) => {
    setComments(comments.filter((comment) => comment.id !== id));
    toast.success('Comment removed');
  };
  
  const flagComment = (id: string) => {
    setComments(
      comments.map((comment) => 
        comment.id === id ? { ...comment, flagged: true } : comment
      )
    );
    toast.success('Comment flagged for review');
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Comment Moderation</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Flag className="h-4 w-4 text-yellow-500" /> <span className="font-medium">{comments.filter(c => c.flagged).length}</span> flagged comments
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div 
                key={comment.id} 
                className={`p-4 border rounded-md ${comment.flagged ? 'bg-yellow-50 border-yellow-200' : 'bg-card'}`}
              >
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{comment.author}</p>
                        <p className="text-sm text-muted-foreground">
                          {comment.date || comment.createdAt} on <span className="italic">{comment.article || 'Unknown Article'}</span>
                        </p>
                      </div>
                      {comment.flagged && (
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                          Flagged
                        </span>
                      )}
                      {!comment.approved && !comment.flagged && (
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          Pending
                        </span>
                      )}
                    </div>
                    <p className="text-sm mt-2">{comment.content}</p>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  {(comment.flagged || !comment.approved) ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 border-green-200 hover:border-green-300 hover:bg-green-50"
                      onClick={() => approveComment(comment.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" /> Approve
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-yellow-600 border-yellow-200 hover:border-yellow-300 hover:bg-yellow-50"
                      onClick={() => flagComment(comment.id)}
                    >
                      <Flag className="h-4 w-4 mr-1" /> Flag
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive border-destructive/20 hover:border-destructive/30 hover:bg-destructive/10"
                    onClick={() => removeComment(comment.id)}
                  >
                    <XCircle className="h-4 w-4 mr-1" /> Remove
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-white/60">
              <p>No comments to moderate</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
