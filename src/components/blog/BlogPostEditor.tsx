
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from "@/components/ui/switch"
import { toast } from 'sonner';
import { BlogPost } from '@/types/BlogPost';

interface BlogPostEditorProps {
  post?: BlogPost;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
  isAdmin: boolean;
}

// Updated content type definition to match the BlogPost type
type ContentType = "article" | "blog" | "book" | "chant" | "liturgy" | "music" | "video" | "prayer" | "doctrine" | "saint" | "icon";

export function BlogPostEditor({ post, onSave, onCancel, isAdmin }: BlogPostEditorProps) {
  const [title, setTitle] = useState(post?.title || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [author, setAuthor] = useState(post?.author || '');
  const [imageUrl, setImageUrl] = useState(post?.imageUrl || '');
  const [tags, setTags] = useState(post?.tags?.join(', ') || '');
  const [featured, setFeatured] = useState(post?.featured || false);
  const [category, setCategory] = useState(post?.category || 'spirituality');
  const [contentType, setContentType] = useState<ContentType>(post?.contentType as ContentType || 'article');
  const [audioUrl, setAudioUrl] = useState(post?.audioUrl || '');
  const [videoUrl, setVideoUrl] = useState(post?.videoUrl || '');
  
  const categories = [
    { id: "liturgy", name: "Liturgy & Worship" },
    { id: "saints", name: "Saints & Martyrs" },
    { id: "history", name: "Orthodox History" },
    { id: "theology", name: "Theology & Doctrine" },
    { id: "spirituality", name: "Spirituality" },
    { id: "sacraments", name: "Sacraments" },
    { id: "music", name: "Sacred Music" },
    { id: "icons", name: "Iconography" },
    { id: "calendar", name: "Liturgical Calendar" },
    { id: "community", name: "Community Life" }
  ];

  const contentTypes = [
    { id: "article", name: "Article", description: "In-depth theological studies and educational content" },
    { id: "blog", name: "Blog Post", description: "Personal reflections and spiritual insights" },
    { id: "book", name: "Book", description: "Complete works and comprehensive studies" },
    { id: "chant", name: "Sacred Music", description: "Chants, hymns, and liturgical music" },
    { id: "video", name: "Video", description: "Educational and liturgical videos" },
    { id: "prayer", name: "Prayer", description: "Traditional and contemporary prayers" },
    { id: "doctrine", name: "Doctrine", description: "Orthodox theological teachings" },
    { id: "saint", name: "Saint Biography", description: "Lives and teachings of Orthodox saints" },
    { id: "icon", name: "Iconography", description: "Sacred icons and their spiritual meanings" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content || !author) {
      toast.error("Please fill in all required fields.");
      return;
    }
    
    const newPost: BlogPost = {
      id: post?.id || Date.now().toString(),
      title,
      excerpt,
      content,
      author,
      publishDate: post?.publishDate || new Date().toLocaleDateString(),
      imageUrl,
      tags: tags.split(',').map(tag => tag.trim()),
      featured,
      category,
      contentType,
      audioUrl: contentType === 'chant' ? audioUrl : undefined,
      videoUrl: contentType === 'video' ? videoUrl : undefined,
      likes: post?.likes || 0,
      views: post?.views || 0
    };
    
    onSave(newPost);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gold">{post ? 'Edit Content' : 'Create New Content'}</h2>
        <p className="text-white/70">
          {post ? 'Modify the content details below.' : 'Enter the details for your new content.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="bg-[#1A1F2C]/70 border-gold/30"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="author">Author *</Label>
            <Input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
              className="bg-[#1A1F2C]/70 border-gold/30"
              required
            />
          </div>

          <div>
            <Label htmlFor="contentType">Content Type</Label>
            <Select value={contentType} onValueChange={(value: ContentType) => setContentType(value)}>
              <SelectTrigger className="bg-[#1A1F2C]/70 border-gold/30">
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                {contentTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    <div>
                      <div className="font-medium">{type.name}</div>
                      <div className="text-sm text-gray-500">{type.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(value) => setCategory(value)}>
              <SelectTrigger className="bg-[#1A1F2C]/70 border-gold/30">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="excerpt">Excerpt</Label>
          <Input
            type="text"
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Enter a brief excerpt"
            className="bg-[#1A1F2C]/70 border-gold/30"
          />
        </div>

        <div>
          <Label htmlFor="content">Content *</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your content here... You can use HTML formatting."
            className="bg-[#1A1F2C]/70 border-gold/30 min-h-[400px]"
            required
          />
          <p className="text-sm text-white/50 mt-2">
            You can use HTML tags for formatting (e.g., &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;)
          </p>
        </div>

        {/* Media Upload Section */}
        <div className="space-y-4 border border-gold/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gold">Media Content</h3>
          
          <div>
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              type="url"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="bg-[#1A1F2C]/70 border-gold/30"
            />
          </div>

          {/* Audio Upload for Sacred Music */}
          {contentType === "chant" && (
            <div>
              <Label htmlFor="audioUrl">Audio URL (for chants and hymns)</Label>
              <Input
                type="url"
                id="audioUrl"
                value={audioUrl}
                onChange={(e) => setAudioUrl(e.target.value)}
                placeholder="https://example.com/audio.mp3"
                className="bg-[#1A1F2C]/70 border-gold/30"
              />
            </div>
          )}

          {/* Video Upload */}
          {contentType === "video" && (
            <div>
              <Label htmlFor="videoUrl">Video URL</Label>
              <Input
                type="url"
                id="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://example.com/video.mp4"
                className="bg-[#1A1F2C]/70 border-gold/30"
              />
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="theology, spirituality, saints"
            className="bg-[#1A1F2C]/70 border-gold/30"
          />
        </div>

        {isAdmin && (
          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={featured}
              onCheckedChange={(checked) => setFeatured(checked)}
            />
            <Label htmlFor="featured">Mark as Featured Content</Label>
          </div>
        )}

        <div className="flex justify-end space-x-4 pt-6 border-t border-gold/20">
          <Button variant="ghost" onClick={onCancel} type="button">
            Cancel
          </Button>
          <Button type="submit" className="bg-byzantine hover:bg-byzantine-dark">
            {post ? 'Update Content' : 'Create Content'}
          </Button>
        </div>
      </form>
    </div>
  );
}
