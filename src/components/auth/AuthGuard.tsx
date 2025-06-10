
import { useState, useEffect, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

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
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setIsAuthorized(false);
          setIsLoading(false);
          return;
        }

        // Check admin status if required
        if (requireAdmin) {
          const adminEmails = ['admin@orthodoxechoes.com', 'jblinxstudio@gmail.com'];
          const isUserAdmin = adminEmails.includes(session.user.email || '') || 
                             session.user.user_metadata?.role === 'admin';
          setIsAuthorized(isUserAdmin);
        } else {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setIsAuthorized(false);
      } else if (event === 'SIGNED_IN' && session) {
        if (requireAdmin) {
          const adminEmails = ['admin@orthodoxechoes.com', 'jblinxstudio@gmail.com'];
          const isUserAdmin = adminEmails.includes(session.user.email || '') || 
                             session.user.user_metadata?.role === 'admin';
          setIsAuthorized(isUserAdmin);
        } else {
          setIsAuthorized(true);
        }
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
          <div className="w-16 h-16 relative flex items-center justify-center mx-auto mb-4">
            <div className="absolute w-16 h-16">
              <div className="absolute inset-0 rounded-full border-2 border-gold/30 animate-spin"></div>
            </div>
            <svg className="w-8 h-8 text-gold relative z-10" viewBox="0 0 32 32" fill="currentColor">
              <g transform="translate(16,16)">
                <rect x="-1" y="-6" width="2" height="12" rx="1"/>
                <rect x="-4" y="-3" width="8" height="2" rx="1"/>
              </g>
            </svg>
          </div>
          <p className="text-white/70">Checking authentication...</p>
        </div>
      </div>
    );
  }
  
  // Redirect if not authenticated or not admin when required
  if (!isAuthorized) {
    return <Navigate to={redirectTo} replace />;
  }
  
  // Render children if authorized
  return <>{children}</>;
}
