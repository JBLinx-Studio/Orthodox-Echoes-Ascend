
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
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}
