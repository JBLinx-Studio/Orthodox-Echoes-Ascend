
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

// Get current user from Supabase session
export const getCurrentUser = async (): Promise<User | null> => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user || null;
};

// Check if the user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  const user = await getCurrentUser();
  return !!user;
};

// Check if the user is an admin
export const isAdmin = async (): Promise<boolean> => {
  const user = await getCurrentUser();
  if (!user) return false;
  
  return user.email === 'admin@orthodoxechoes.com' || 
         user.user_metadata?.role === 'admin';
};

// Get the current authenticated user's display name
export const getUsername = async (): Promise<string> => {
  const user = await getCurrentUser();
  if (!user) return 'Guest';
  
  return user.user_metadata?.full_name || 
         user.user_metadata?.name || 
         user.email?.split('@')[0] || 
         'User';
};

// Get the last login date
export const getLastLogin = async (): Promise<Date | null> => {
  const user = await getCurrentUser();
  if (!user || !user.last_sign_in_at) return null;
  
  return new Date(user.last_sign_in_at);
};

// Format the last login time/date for display
export const formatLastLogin = (date: Date | null): string => {
  if (!date) return 'Never';
  
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } else if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  
  return date.toLocaleDateString([], { 
    month: 'short', 
    day: 'numeric', 
    year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined 
  });
};

// Logout the user
export const logout = async (): Promise<{ error: any }> => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Get user profile data
export const getUserProfile = async () => {
  const user = await getCurrentUser();
  if (!user) return null;
  
  return {
    id: user.id,
    email: user.email,
    name: user.user_metadata?.full_name || user.user_metadata?.name,
    avatar: user.user_metadata?.avatar_url,
    provider: user.user_metadata?.provider,
    created_at: user.created_at,
    last_sign_in: user.last_sign_in_at
  };
};

// Deprecated functions for backwards compatibility
export const login = (username: string, isAdmin: boolean = false): void => {
  console.warn('login() is deprecated. Use Supabase auth methods instead.');
};

export const checkPassword = (password: string): boolean => {
  console.warn('checkPassword() is deprecated. Use Supabase auth methods instead.');
  return false;
};

export const registerUser = (username: string, password: string): void => {
  console.warn('registerUser() is deprecated. Use Supabase auth methods instead.');
};

export const getRegisteredUsers = (): any[] => {
  console.warn('getRegisteredUsers() is deprecated. Use Supabase admin functions instead.');
  return [];
};
