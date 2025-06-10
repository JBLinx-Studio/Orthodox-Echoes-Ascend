
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
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
  readTime?: number;
  updatedAt?: string;
  lastEditedBy?: string;
  publishedAt?: string;
  comments?: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName?: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  approved: boolean;
  flagged?: boolean;
  articleId: string;
  article?: string;
  authorEmail?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: "user" | "admin" | "moderator" | "contributor";
  avatar?: string;
  bio?: string;
  isActive: boolean;
  displayName?: string;
  joinDate?: string;
  lastActive?: string;
  avatarUrl?: string;
}
