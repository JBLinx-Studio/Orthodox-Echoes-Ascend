
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { isAuthenticated, getUsername, getLastLogin, formatLastLogin, logout } from '@/utils/auth-utils';
import { toast } from 'sonner';
import { User, LogOut, Calendar } from 'lucide-react';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [lastLogin, setLastLogin] = useState<Date | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    
    // Get user info
    setUsername(getUsername());
    setLastLogin(getLastLogin());
  }, [navigate]);
  
  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully", { 
      description: "You have been securely logged out." 
    });
    navigate('/');
  };
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="mb-4 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-byzantine/20 flex items-center justify-center">
              <User className="h-10 w-10 text-gold" />
            </div>
          </div>
          <h1 className="text-3xl font-display text-gold mb-2">Your Profile</h1>
          <p className="text-white/70">Manage your account settings and preferences</p>
        </div>
        
        <Card className="bg-[#1A1F2C]/80 border-gold/20 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-byzantine" />
              Account Information
            </CardTitle>
            <CardDescription>Your personal information and settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Username</p>
                <p className="text-white font-medium">{username}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Last Login</p>
                <p className="text-white font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gold" />
                  {formatLastLogin(lastLogin)}
                </p>
              </div>
            </div>
            
            <div className="border-t border-gold/10 pt-4 mt-4">
              <Button 
                variant="destructive" 
                className="bg-red-700 hover:bg-red-800"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <Button 
            variant="ghost" 
            className="text-white/70 hover:text-gold"
            onClick={() => navigate('/')}
          >
            Return to Sanctuary
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
