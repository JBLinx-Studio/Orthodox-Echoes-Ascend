
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
import { isAuthenticated, isAdmin, getUsername, getLastLogin, formatLastLogin, logout } from '@/utils/auth-utils';

export function UserProfileSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [lastLogin, setLastLogin] = useState<Date | null>(null);
  
  useEffect(() => {
    // Check auth status on component mount and set state
    const checkAuthStatus = () => {
      setIsLoggedIn(isAuthenticated());
      setUserIsAdmin(isAdmin());
      setUsername(getUsername());
      setLastLogin(getLastLogin());
    };
    
    checkAuthStatus();
    
    // Add an event listener to check for auth changes (in case of logout elsewhere)
    window.addEventListener('storage', checkAuthStatus);
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);
  
  const handleLogout = () => {
    logout();
    
    setIsLoggedIn(false);
    setUserIsAdmin(false);
    setUsername('');
    setLastLogin(null);
    
    toast.info("Logged out successfully", {
      description: "You have been securely logged out.",
      icon: <LogOut className="h-5 w-5 text-gold" />
    });
  };
  
  if (isLoggedIn) {
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
            {userIsAdmin && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-byzantine rounded-full"></span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-[#1A1F2C] border-gold/20 text-white">
          <DropdownMenuLabel className="flex items-center gap-2">
            {userIsAdmin ? (
              <Shield className="w-4 h-4 text-byzantine" />
            ) : (
              <User className="w-4 h-4 text-gold" />
            )}
            <span>{username}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gold/10" />
          <DropdownMenuItem className="text-gray-300 hover:text-gold cursor-pointer flex items-center">
            <span className="text-xs text-gray-400">Last login: {formatLastLogin(lastLogin)}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gold/10" />
          
          {userIsAdmin && (
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
