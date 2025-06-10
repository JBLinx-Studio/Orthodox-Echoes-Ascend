
/**
 * Navigation configuration for the entire application
 * This centralizes all navigation links, making them easier to maintain
 */

import { 
  BookOpen, 
  Calendar, 
  Users, 
  BookmarkIcon, 
  Music, 
  Edit, 
  Image, 
  Home, 
  Info, 
  Heart,
  Crown,
  Feather,
  Library,
  Church,
  Scroll
} from 'lucide-react';

export type NavigationItem = {
  name: string;
  path: string;
  icon: any;
  description?: string;
  children?: NavigationItem[];
};

export type NavigationCategory = {
  name: string;
  items: NavigationItem[];
};

// Main navigation items
export const mainNavItems: NavigationItem[] = [
  { name: "Home", path: "/", icon: Home },
  { name: "Articles", path: "/articles", icon: Feather },
  { name: "Blog", path: "/blog", icon: Scroll },
  { name: "Books", path: "/books", icon: Library },
  { name: "Community", path: "/community", icon: Heart },
  { name: "Contact", path: "/contact", icon: Info },
];

// Categories for dropdown menus and mobile navigation
export const navigationCategories: NavigationCategory[] = [
  {
    name: "Sacred Content",
    items: [
      { name: "Sacred Articles", path: "/articles", icon: Feather, description: "In-depth theological studies and scholarly discourse" },
      { name: "Spiritual Blog", path: "/blog", icon: Scroll, description: "Personal reflections and contemporary insights" },
      { name: "Sacred Library", path: "/books", icon: Library, description: "Complete books and comprehensive works" },
      { name: "Daily Readings", path: "/readings", icon: Calendar, description: "Scripture and saints of the day" },
    ]
  },
  {
    name: "Faith & Doctrine",
    items: [
      { name: "Learning Center", path: "/learn", icon: BookOpen, description: "Your journey through Orthodox wisdom" },
      { name: "Core Doctrine", path: "/doctrine", icon: BookOpen, description: "Explore the foundational beliefs and theology" },
      { name: "Prayer Guide", path: "/prayers", icon: BookmarkIcon, description: "Ancient prayers for daily life" },
      { name: "Sacred Iconography", path: "/icons", icon: Image, description: "Windows into heaven" },
    ]
  },
  {
    name: "Tradition & Liturgy",
    items: [
      { name: "Lives of Saints", path: "/saints", icon: Crown, description: "Stories of holiness through the ages" },
      { name: "Liturgical Life", path: "/liturgy", icon: Church, description: "Beauty and meaning of Orthodox worship" },
      { name: "Liturgical Calendar", path: "/calendar", icon: Calendar, description: "The rhythm of Orthodox life" },
      { name: "Sacred Music", path: "/chants", icon: Music, description: "Byzantine and Slavic chant traditions" },
    ]
  },
  {
    name: "Community",
    items: [
      { name: "Orthodox Community", path: "/community", icon: Users, description: "Connect with fellow Orthodox believers" },
      { name: "Find a Parish", path: "/parishes", icon: BookmarkIcon, description: "Locate Orthodox communities near you" },
      { name: "Support Our Mission", path: "/support", icon: Heart, description: "Help spread Orthodox wisdom" },
    ]
  }
];

// All flattened navigation items for search and sitemap
export const allNavigationItems: NavigationItem[] = [
  ...mainNavItems,
  ...navigationCategories.flatMap(category => category.items)
];

// Get navigation item by path
export const getNavigationItemByPath = (path: string): NavigationItem | undefined => {
  return allNavigationItems.find(item => item.path === path);
};

// Get breadcrumb items based on current path
export const getBreadcrumbItems = (path: string): NavigationItem[] => {
  const segments = path.split('/').filter(Boolean);
  const items: NavigationItem[] = [{ name: "Home", path: "/", icon: Home }];
  
  let currentPath = "";
  segments.forEach(segment => {
    currentPath += `/${segment}`;
    const item = getNavigationItemByPath(currentPath);
    if (item) {
      items.push(item);
    }
  });
  
  return items;
};
