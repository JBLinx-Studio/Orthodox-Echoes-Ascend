
import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAdmin } from '@/utils/auth-utils';

export function AdminLayout() {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const adminStatus = await isAdmin();
        setIsAuthorized(adminStatus);
      } catch (error) {
        console.error('Admin check error:', error);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, []);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
}

export default AdminLayout;
