
import { supabase } from '@/integrations/supabase/client';

// Check if the user is authenticated
export const isAuthenticated = (): boolean => {
  // This will be handled by the component that checks the session
  return false; // Components should use useEffect to check session
};

// Check if the user is an admin
export const isAdmin = (): boolean => {
  // This will be determined by user metadata or a separate check
  return false; // Components should check user metadata
};

// Get the current authenticated username
export const getUsername = (): string => {
  return 'Guest'; // Components should get this from session
};

// Get the last login date
export const getLastLogin = (): Date | null => {
  return null; // This will come from session metadata
};

// Format the last login time/date for display
export const formatLastLogin = (date: Date | null): string => {
  if (!date) return 'Never';
  
  const today = new Date();
  if (date.toDateString() === today.toDateString()) {
    return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  
  return date.toLocaleDateString();
};

// Logout the user
export const logout = async (): Promise<void> => {
  await supabase.auth.signOut();
};

// Login the user (for backwards compatibility)
export const login = (username: string, isAdmin: boolean = false): void => {
  // This is now handled by Supabase auth
  console.log('Login should use Supabase auth methods');
};

// Check if the password is correct for admin (deprecated)
export const checkPassword = (password: string): boolean => {
  // This should be handled by Supabase auth
  return false;
};

// Register a new user (deprecated - use Supabase auth)
export const registerUser = (username: string, password: string): void => {
  console.log('Registration should use Supabase auth methods');
};

// Get all registered users (for admin dashboard)
export const getRegisteredUsers = (): any[] => {
  // This would need to be implemented with Supabase admin functions
  return [];
};
