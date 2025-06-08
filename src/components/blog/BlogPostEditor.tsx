import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useEditor } from '@tinymce/tinymce-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

// Updated content type definition to match the usage
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
  
  const editorRef = useEditor();
  
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
    { id: "liturgy", name: "Video", description: "Educational and liturgical videos" },
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
      videoUrl: contentType === 'liturgy' ? videoUrl : undefined,
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
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="bg-[#1A1F2C]/70 border-gold/30"
            />
          </div>
          
          <div>
            <Label htmlFor="author">Author</Label>
            <Input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
              className="bg-[#1A1F2C]/70 border-gold/30"
            />
          </div>

          <div>
            <Label htmlFor="contentType">Content Type</Label>
            <Select value={contentType} onValueChange={(value: ContentType) => setContentType(value)}>
              <SelectTrigger>
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
              <SelectTrigger>
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
          <Label htmlFor="content">Content</Label>
          <Editor
            apiKey="YOUR_API_KEY"
            onInit={(evt, editor) => editorRef.current = editor}
            value={content}
            onEditorChange={(newContent) => setContent(newContent)}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar: 'undo redo | formatselect | ' +
              'bold italic backcolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
        </div>

        {/* Media Upload Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gold">Media Content</h3>
          
          <div>
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
              className="bg-[#1A1F2C]/70 border-gold/30"
            />
          </div>

          {/* Audio Upload for Sacred Music */}
          {contentType === "chant" && (
            <div>
              <Label htmlFor="audioUrl">Audio URL (for chants and hymns)</Label>
              <Input
                id="audioUrl"
                value={audioUrl}
                onChange={(e) => setAudioUrl(e.target.value)}
                placeholder="https://example.com/audio.mp3"
                className="bg-[#1A1F2C]/70 border-gold/30"
              />
            </div>
          )}

          {/* Video Upload */}
          {contentType === "liturgy" && (
            <div>
              <Label htmlFor="videoUrl">Video URL (for liturgical content)</Label>
              <Input
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
            placeholder="Enter tags"
            className="bg-[#1A1F2C]/70 border-gold/30"
          />
        </div>

        {isAdmin && (
          <div className="flex items-center space-x-2">
            <Label htmlFor="featured">Featured</Label>
            <Switch
              id="featured"
              checked={featured}
              onCheckedChange={(checked) => setFeatured(checked)}
            />
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <Button variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button type="submit" className="bg-byzantine hover:bg-byzantine-dark">
            {post ? 'Update Content' : 'Create Content'}
          </Button>
        </div>
      </form>
    </div>
  );
}
