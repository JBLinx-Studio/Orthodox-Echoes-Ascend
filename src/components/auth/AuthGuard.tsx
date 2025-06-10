
import { useState, useEffect, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, isAdmin } from '@/utils/auth-utils';

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
  
  useEffect(() => {
    // Check both authentication and admin status if required
    if (requireAdmin) {
      setIsAuthorized(isAuthenticated() && isAdmin());
    } else {
      setIsAuthorized(isAuthenticated());
    }
  }, [requireAdmin]);
  
  // Show nothing during the initial check
  if (isAuthorized === null) {
    return null;
  }
  
  // Redirect if not authenticated or not admin when required
  if (!isAuthorized) {
    return <Navigate to={redirectTo} replace />;
  }
  
  // Render children if authorized
  return <>{children}</>;
}
