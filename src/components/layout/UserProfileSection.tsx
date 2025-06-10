
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, Settings, User, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export function UserProfileSection() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      
      // Check if user is admin (you can customize this logic)
      if (session?.user?.email === 'admin@orthodoxechoes.com') {
        setIsAdmin(true);
      }
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      
      // Check if user is admin
      if (session?.user?.email === 'admin@orthodoxechoes.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);
  
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast.error('Error signing out');
      return;
    }
    
    setUser(null);
    setIsAdmin(false);
    
    toast.info("Logged out successfully", {
      description: "You have been securely logged out.",
      icon: <LogOut className="h-5 w-5 text-gold" />
    });
  };
  
  if (user) {
    const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
    
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative text-gray-300 hover:text-gold hover:bg-gold/10"
            aria-label="User menu"
          >
            <User className="h-5 w-5" />
            {isAdmin && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-byzantine rounded-full"></span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-[#1A1F2C] border-gold/20 text-white">
          <DropdownMenuLabel className="flex items-center gap-2">
            {isAdmin ? (
              <Shield className="w-4 h-4 text-byzantine" />
            ) : (
              <User className="w-4 h-4 text-gold" />
            )}
            <span>{displayName}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gold/10" />
          
          {isAdmin && (
            <DropdownMenuItem asChild>
              <Link to="/admin" className="cursor-pointer flex items-center text-gray-300 hover:text-gold">
                <Shield className="mr-2 h-4 w-4" />
                <span>Admin Dashboard</span>
              </Link>
            </DropdownMenuItem>
          )}
          
          <DropdownMenuItem asChild>
            <Link to="/profile" className="cursor-pointer flex items-center text-gray-300 hover:text-gold">
              <User className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <Link to="/settings" className="cursor-pointer flex items-center text-gray-300 hover:text-gold">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className="bg-gold/10" />
          <DropdownMenuItem 
            onClick={handleLogout}
            className="cursor-pointer flex items-center text-gray-300 hover:text-red-400"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="text-gray-300 hover:text-gold hover:bg-gold/10"
      aria-label="Login"
      asChild
    >
      <Link to="/login">
        <User className="h-5 w-5" />
      </Link>
    </Button>
  );
}
