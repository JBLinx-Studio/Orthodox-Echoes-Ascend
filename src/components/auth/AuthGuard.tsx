
import { useState, useEffect, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

interface AuthGuardProps {
  children: ReactNode;
  requireAdmin?: boolean;
  redirectTo?: string;
}

export function AuthGuard({ 
  children, 
  requireAdmin = false, 
  redirectTo = '/login' 
}: AuthGuardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user || null;
      setUser(currentUser);
      
      if (currentUser) {
        // Check admin status if required
        if (requireAdmin) {
          const isUserAdmin = currentUser.email === 'admin@orthodoxechoes.com' || 
                             currentUser.user_metadata?.role === 'admin';
          setIsAuthorized(isUserAdmin);
        } else {
          setIsAuthorized(true);
        }
      } else {
        setIsAuthorized(false);
      }
      
      setIsLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user || null;
      setUser(currentUser);
      
      if (currentUser) {
        if (requireAdmin) {
          const isUserAdmin = currentUser.email === 'admin@orthodoxechoes.com' || 
                             currentUser.user_metadata?.role === 'admin';
          setIsAuthorized(isUserAdmin);
        } else {
          setIsAuthorized(true);
        }
      } else {
        setIsAuthorized(false);
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [requireAdmin]);
  
  // Show loading spinner during the initial check
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0d16] to-[#161a26] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Checking authentication...</p>
        </div>
      </div>
    );
  }
  
  // Redirect if not authorized
  if (!isAuthorized) {
    return <Navigate to={redirectTo} replace />;
  }
  
  // Render children if authorized
  return <>{children}</>;
}
