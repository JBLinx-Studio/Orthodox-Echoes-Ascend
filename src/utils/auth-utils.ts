import { supabase } from '@/integrations/supabase/client';

// Check if the user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  } catch {
    return false;
  }
};

// Check if the user is an admin (based on email or user metadata)
export const isAdmin = async (): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return false;
    
    // Admin emails - highest rank (both have equal admin rights)
    const adminEmails = [
      'admin@orthodoxechoes.com', 
      'jblinxstudio@gmail.com',
      'EthosofOrthodoxy@Gmail.com'
    ];
    return adminEmails.includes(session.user.email || '') || 
           session.user.user_metadata?.role === 'admin';
  } catch {
    return false;
  }
};

// Get the current authenticated user session
export const getCurrentSession = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch {
    return null;
  }
};

// Get the current authenticated username
export const getUsername = async (): Promise<string> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return 'Guest';
    
    return session.user.user_metadata?.full_name || 
           session.user.email?.split('@')[0] || 
           'User';
  } catch {
    return 'Guest';
  }
};

// Get user role based on email with enhanced hierarchy
export const getUserRole = async (): Promise<'lead_admin' | 'admin' | 'moderator' | 'user'> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return 'user';
    
    // Lead Admin emails - highest rank (both have equal lead admin rights)
    const leadAdminEmails = [
      'jblinxstudio@gmail.com',
      'EthosofOrthodoxy@Gmail.com'
    ];
    
    // Standard Admin emails
    const adminEmails = [
      'admin@orthodoxechoes.com'
    ];
    
    if (leadAdminEmails.includes(session.user.email || '')) {
      return 'lead_admin';
    }
    
    if (adminEmails.includes(session.user.email || '') || 
        session.user.user_metadata?.role === 'admin') {
      return 'admin';
    }
    
    return 'user';
  } catch {
    return 'user';
  }
};

// Check if user is lead admin
export const isLeadAdmin = async (): Promise<boolean> => {
  try {
    const role = await getUserRole();
    return role === 'lead_admin';
  } catch {
    return false;
  }
};

// Get the last login date
export const getLastLogin = async (): Promise<Date | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user?.last_sign_in_at) return null;
    
    return new Date(session.user.last_sign_in_at);
  } catch {
    return null;
  }
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
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

// Get current user data
export const getCurrentUser = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user || null;
  } catch {
    return null;
  }
};

// Check authentication status synchronously (for components that need immediate check)
export const checkAuthStatus = () => {
  // This is a synchronous version that components can use
  // The actual session check should be done with useEffect in components
  return false; // Components should use useEffect to check session
};
