import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from "@/components/ui/switch";
import { toast } from 'sonner';
import { Check, Image, Text, Bold, Italic, Underline, Link as LinkIcon, Tag, X, Music, Video, FileText, Book, Feather } from 'lucide-react';
import { BlogPost, BlogCategory } from '@/types/BlogPost';
import { Link, useNavigate } from 'react-router-dom';

interface BlogPostEditorProps {
  post?: BlogPost;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
  isAdmin?: boolean;
}

const contentTypes = [
  { id: "article", name: "Article", icon: Feather, description: "In-depth theological studies and educational content" },
  { id: "blog", name: "Blog Post", icon: FileText, description: "Personal reflections and spiritual insights" },
  { id: "book", name: "Book/Chapter", icon: Book, description: "Complete works, books, and book chapters" },
  { id: "chant", name: "Sacred Music/Chant", icon: Music, description: "Hymns, chants, and sacred musical content" },
  { id: "liturgy", name: "Video/Liturgy", icon: Video, description: "Educational videos and liturgical recordings" }
];

export function BlogPostEditor({ post, onSave, onCancel, isAdmin = false }: BlogPostEditorProps) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(post?.title || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [author, setAuthor] = useState(post?.author || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(post?.tags || []);
  const [imageUrl, setImageUrl] = useState(post?.imageUrl || '');
  const [isFeatured, setIsFeatured] = useState(post?.featured || false);
  const [category, setCategory] = useState(post?.category || 'theology');
  const [contentType, setContentType] = useState(post?.contentType || 'article');
  const [readTime, setReadTime] = useState(post?.readTime || 5);
  const [isDraft, setIsDraft] = useState(post?.draft || false);
  const [showPreview, setShowPreview] = useState(false);
  const [tagInput, setTagInput] = useState('');
  
  // New fields for different content types
  const [audioUrl, setAudioUrl] = useState(post?.audioUrl || '');
  const [videoUrl, setVideoUrl] = useState(post?.videoUrl || '');
  
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Load categories
  useEffect(() => {
    const savedCategories = localStorage.getItem('orthodoxEchoesCategories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      // Default categories
      const defaultCategories = [
        { id: "liturgy", name: "Liturgy & Worship", slug: "liturgy", description: "Divine Liturgy, prayers, and worship" },
        { id: "saints", name: "Saints & Martyrs", slug: "saints", description: "Lives and teachings of holy saints" },
        { id: "history", name: "Orthodox History", slug: "history", description: "Church history and traditions" },
        { id: "theology", name: "Theology & Doctrine", slug: "theology", description: "Theological discourse and doctrine" },
        { id: "spirituality", name: "Spirituality", slug: "spirituality", description: "Personal spiritual growth" },
        { id: "sacraments", name: "Sacraments", slug: "sacraments", description: "The seven holy sacraments" },
        { id: "music", name: "Sacred Music", slug: "music", description: "Chants, hymns, and sacred music" },
        { id: "icons", name: "Iconography", slug: "icons", description: "Sacred icons and their meanings" },
        { id: "calendar", name: "Liturgical Calendar", slug: "calendar", description: "Feasts, fasts, and celebrations" },
        { id: "community", name: "Community Life", slug: "community", description: "Orthodox community and fellowship" }
      ];
      setCategories(defaultCategories);
    }
  }, []);

  // Get current content type info
  const currentContentType = contentTypes.find(type => type.id === contentType);
  
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
      
      if (!imageUrl) {
        setImageUrl(mockImageUrl);
        toast.success(`Featured image set: "${file.name}"`);
        return;
      }
      
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
  
  const validateForm = () => {
    if (!title.trim()) {
      toast.error(`Please enter a title for your ${currentContentType?.name.toLowerCase() || 'content'}`);
      return false;
    }
    
    if (!excerpt.trim()) {
      toast.error(`Please enter a brief excerpt for your ${currentContentType?.name.toLowerCase() || 'content'}`);
      return false;
    }
    
    if (!author.trim()) {
      toast.error("Please provide an author name");
      return false;
    }
    
    if (!content.trim()) {
      toast.error(`Please add content for your ${currentContentType?.name.toLowerCase() || 'content'}`);
      return false;
    }
    
    return true;
  };
  
  const handleSave = () => {
    if (!validateForm()) return;
    
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    const savedPost: BlogPost = {
      id: post?.id || Date.now().toString(),
      title,
      excerpt,
      content,
      author,
      publishDate: post?.publishDate || formattedDate,
      tags: selectedTags,
      featured: isFeatured,
      imageUrl: imageUrl || undefined,
      category,
      contentType,
      readTime: readTime || 5,
      draft: isDraft,
      updatedAt: formattedDate,
      audioUrl: audioUrl || undefined,
      videoUrl: videoUrl || undefined,
      // Preserve existing data if it's an edit
      likes: post?.likes || 0,
      views: post?.views || 0,
      comments: post?.comments || [],
      publishedAt: isDraft ? undefined : (post?.publishedAt || formattedDate)
    };
    
    onSave(savedPost);
    toast.success(post ? `${currentContentType?.name} updated successfully` : `${currentContentType?.name} created successfully`);
  };

  return (
    <Card className="glass-morphism border-gold/20 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl text-gold flex items-center gap-2">
          {currentContentType && <currentContentType.icon className="h-5 w-5" />}
          {post ? `Edit ${currentContentType?.name}` : `Create New ${currentContentType?.name}`}
        </CardTitle>
        <p className="text-white/60 text-sm">{currentContentType?.description}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="contentType" className="text-white/90">Content Type <span className="text-destructive">*</span></Label>
            <Select value={contentType} onValueChange={setContentType}>
              <SelectTrigger className="bg-[#1A1F2C]/50 border-gold/30">
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                {contentTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4" />
                        <span>{type.name}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="text-white/90">Title <span className="text-destructive">*</span></Label>
            <Input 
              id="title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={`Enter ${currentContentType?.name.toLowerCase()} title`} 
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
              <Select value={category} onValueChange={setCategory}>
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
          
          {/* Content type specific fields */}
          {(contentType === 'chant' || contentType === 'music') && (
            <div className="space-y-2">
              <Label htmlFor="audioUrl" className="text-white/90">Audio URL</Label>
              <Input 
                id="audioUrl" 
                value={audioUrl}
                onChange={(e) => setAudioUrl(e.target.value)}
                placeholder="https://example.com/audio.mp3" 
                className="bg-[#1A1F2C]/50 border-gold/30"
              />
            </div>
          )}
          
          {(contentType === 'liturgy' || contentType === 'video') && (
            <div className="space-y-2">
              <Label htmlFor="videoUrl" className="text-white/90">Video URL</Label>
              <Input 
                id="videoUrl" 
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://example.com/video.mp4" 
                className="bg-[#1A1F2C]/50 border-gold/30"
              />
            </div>
          )}

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
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="readTime" className="text-white/90">
                {contentType === 'chant' || contentType === 'liturgy' ? 'Duration (minutes)' : 'Read Time (minutes)'}
              </Label>
              <Input 
                id="readTime" 
                type="number"
                min="1"
                max="180"
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
                  onChange={handleFileUpload}
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
              placeholder={`Brief summary of the ${currentContentType?.name.toLowerCase()}`} 
              rows={2} 
              className="bg-[#1A1F2C]/50 border-gold/30"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content" className="text-white/90">Content <span className="text-destructive">*</span></Label>
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
                  <LinkIcon className="h-4 w-4" />
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
                  placeholder={`Full ${currentContentType?.name.toLowerCase()} content (HTML supported)`} 
                  rows={10} 
                  className="bg-transparent border-0 rounded-none resize-y min-h-[300px] focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              )}
            </div>
            <p className="text-xs text-white/60 mt-1">
              Use the formatting toolbar above to style your content. HTML tags are supported.
            </p>
          </div>
          
          {isAdmin && (
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="featured"
                  checked={isFeatured}
                  onCheckedChange={setIsFeatured}
                  className="data-[state=checked]:bg-byzantine"
                />
                <Label htmlFor="featured" className="text-white/90">Feature this content on the homepage</Label>
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
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        <Button 
          type="button"
          variant="outline" 
          onClick={onCancel}
          className="border-gold/30 text-gold hover:bg-gold/10"
        >
          Cancel
        </Button>
        <Button 
          type="button"
          className="bg-byzantine hover:bg-byzantine-dark shadow-gold/10 shadow-lg" 
          onClick={handleSave}
        >
          <Check className="h-4 w-4 mr-2" />
          {post ? `Update ${currentContentType?.name}` : `Publish ${currentContentType?.name}`}
        </Button>
      </CardFooter>
    </Card>
  );
}
