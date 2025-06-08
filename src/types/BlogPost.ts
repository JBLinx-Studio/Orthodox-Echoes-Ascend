
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  publishedAt?: string; // Alternative date format
  imageUrl?: string;
  tags: string[];
  featured: boolean;
  category: string;
  contentType: "article" | "blog" | "book" | "chant" | "liturgy" | "music" | "video" | "prayer" | "doctrine" | "saint" | "icon";
  audioUrl?: string;
  videoUrl?: string;
  likes?: number;
  views?: number;
  draft?: boolean;
  readTime?: number; // Reading time in minutes
  updatedAt?: string; // When the post was last updated
  lastEditedBy?: string; // Who last edited the post
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName?: string; // Icon identifier for the category
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  email?: string;
  content: string;
  createdAt: string;
  approved: boolean;
  parentId?: string; // For nested comments
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role: 'user' | 'admin' | 'moderator';
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}
