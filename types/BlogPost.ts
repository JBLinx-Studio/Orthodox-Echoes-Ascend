
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
  readTime?: number;
  category: string;
  comments?: Comment[];
  likes?: number;
  views?: number;
  draft?: boolean;
  publishedAt?: string;
  updatedAt?: string;
  related?: string[];
  lastEditedBy?: string;
  contentType?: "blog" | "article" | "prayer" | "book" | "doctrine" | "saint" | "liturgy" | "icon" | "chant";
  seriesName?: string; // For grouping content into series
  version?: number; // For tracking versions
  contributors?: string[]; // Multiple contributors
  references?: Reference[]; // For theological references
  readingLevel?: "beginner" | "intermediate" | "advanced"; // Content difficulty
  feastDay?: string; // For saints and feast days
  liturgicalSeason?: "ordinary" | "advent" | "christmas" | "lent" | "easter" | "pentecost"; // Liturgical season
  audienceType?: "general" | "clergy" | "monastics" | "scholars" | "families" | "youth"; // Target audience
  audioUrl?: string; // For chants and audio content
  videoUrl?: string; // For video content
  locationData?: LocationData; // For pilgrimage sites and parishes
}

export interface LocationData {
  name: string;
  address?: string;
  city?: string;
  country?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  openingHours?: string;
  website?: string;
  phoneNumber?: string;
  historicalSignificance?: string;
}

export interface Reference {
  id: string;
  title: string;
  author?: string;
  source: string;
  url?: string;
  description?: string;
  type?: "scripture" | "patristic" | "academic" | "tradition" | "council" | "liturgical";
  year?: number;
  quote?: string;
}

export interface Comment {
  id: string;
  author: string;
  authorEmail?: string;
  content: string;
  date: string;
  approved: boolean;
  flagged?: boolean;
  replies?: Comment[];
  articleId?: string;
  article?: string;
  authorImage?: string;
  upvotes?: number;
  downvotes?: number;
  edited?: boolean;
  lastEditDate?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  iconName?: string;
  color?: string;
  postCount?: number;
  parentCategory?: string;
  subcategories?: string[];
  featured?: boolean;
  imageUrl?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
  role: "user" | "contributor" | "moderator" | "admin";
  joinDate: string;
  lastActive?: string;
  favoriteArticles?: string[];
  bookmarks?: string[];
  comments?: number;
  likes?: number;
  following?: string[];
  followers?: number;
  settings?: UserSettings;
  readingHistory?: ReadingHistoryItem[];
}

export interface UserSettings {
  emailNotifications: boolean;
  darkMode: boolean;
  fontSize: "small" | "medium" | "large";
  language: "english" | "greek" | "russian" | "arabic" | "romanian";
  calendar: "new" | "old";
}

export interface ReadingHistoryItem {
  contentId: string;
  title: string;
  contentType: string;
  dateViewed: string;
  percentComplete?: number;
}

export interface SiteStatistics {
  totalVisitors: number;
  activeUsers: number;
  totalPageViews: number;
  popularContent: PopularContentItem[];
  visitorsOverTime: PeriodData[];
  visitorsByRegion: RegionData[];
  visitorsByDevice: DeviceData[];
  contentEngagement: EngagementData[];
}

export interface PopularContentItem {
  id: string;
  title: string;
  type: string;
  views: number;
  likes: number;
  comments: number;
}

export interface PeriodData {
  date: string;
  value: number;
}

export interface RegionData {
  region: string;
  visitors: number;
}

export interface DeviceData {
  deviceType: "desktop" | "mobile" | "tablet";
  percentage: number;
}

export interface EngagementData {
  contentType: string;
  averageTimeSpent: number;
  completionRate: number;
}
