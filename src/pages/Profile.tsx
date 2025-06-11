import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { User, Settings, Clock, Shield, Edit3, Save, X, BookOpen, Heart, MessageSquare } from 'lucide-react';
import { getUsername, getLastLogin, formatLastLogin, logout } from '@/utils/auth-utils';

export default function Profile() {
  const [username, setUsername] = useState('');
  const [lastLogin, setLastLogin] = useState<Date | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const userResult = await getUsername();
        const loginResult = await getLastLogin();
        
        setUsername(userResult);
        setLastLogin(loginResult);
        setEditedName(userResult);
      } catch (error) {
        console.error('Error loading profile:', error);
        toast.error('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    // Placeholder for saving the new username
    setUsername(editedName);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancelClick = () => {
    setEditedName(username);
    setIsEditing(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      window.location.hash = '/login'; // Redirect to login page
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error logging out');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0d16] to-[#161a26] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0d16] to-[#161a26] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-[#1A1F2C]/90 border-gold/20 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-2xl font-bold text-gold flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                Last Login: {formatLastLogin(lastLogin)}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-lg font-semibold text-white">{username}</div>
                <p className="text-sm text-white/60">
                  <User className="w-4 h-4 inline-block mr-1 align-middle" />
                  {username}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-white/90">
                Full Name
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  placeholder="Display name"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  disabled={!isEditing}
                  className="bg-[#0C1118] border-gold/30 text-white placeholder:text-white/50"
                />
                {isEditing ? (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-2">
                    <Button variant="ghost" size="sm" onClick={handleSaveClick}>
                      <Save className="w-4 h-4 text-green-500" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleCancelClick}>
                      <X className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={handleEditClick}
                  >
                    <Edit3 className="w-4 h-4 text-white/50" />
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="secondary" className="justify-start space-x-2">
                <Settings className="w-4 h-4" />
                <span>Account Settings</span>
              </Button>
              <Button variant="secondary" className="justify-start space-x-2">
                <Shield className="w-4 h-4" />
                <span>Privacy & Security</span>
              </Button>
            </div>

            <Button
              variant="destructive"
              className="w-full justify-center"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
