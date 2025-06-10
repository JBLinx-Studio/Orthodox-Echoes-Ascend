
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  User, Settings as SettingsIcon, Bell, Shield, 
  Palette, Volume2, Mail, Lock, Globe, Moon, Sun
} from 'lucide-react';
import { getCurrentUser } from '@/utils/auth-utils';

export default function Settings() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error loading user:', error);
        toast.error('Failed to load user data');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleSavePreferences = () => {
    toast.success('Preferences saved successfully!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0d16] to-[#161a26] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0d16] to-[#161a26] pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-display text-gold mb-2">Settings</h1>
            <p className="text-white/70">Manage your account preferences and application settings</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="bg-[#1A1F2C]/70 border border-gold/20">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <SettingsIcon className="w-4 h-4" />
                Preferences
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Privacy & Security
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card className="bg-[#1A1F2C]/90 border-gold/20">
                <CardHeader>
                  <CardTitle className="text-gold flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
                      <User className="w-8 h-8 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                      </h3>
                      <p className="text-white/60">{user?.email}</p>
                      <Badge variant="outline" className="mt-1 text-green-400 border-green-400/30">
                        Active Member
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="displayName" className="text-white/90">Display Name</Label>
                      <Input
                        id="displayName"
                        placeholder="Your display name"
                        defaultValue={user?.user_metadata?.full_name || ''}
                        className="bg-[#0C1118] border-gold/30 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white/90">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={user?.email || ''}
                        disabled
                        className="bg-[#0C1118] border-gold/30 text-white/50"
                      />
                    </div>
                  </div>

                  <Button className="bg-gold hover:bg-gold/90 text-black">
                    Update Profile
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <Card className="bg-[#1A1F2C]/90 border-gold/20">
                <CardHeader>
                  <CardTitle className="text-gold flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Appearance & Interface
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {darkMode ? <Moon className="w-5 h-5 text-gold" /> : <Sun className="w-5 h-5 text-gold" />}
                      <div>
                        <Label className="text-white">Dark Mode</Label>
                        <p className="text-sm text-white/60">Use dark theme throughout the application</p>
                      </div>
                    </div>
                    <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Volume2 className="w-5 h-5 text-gold" />
                      <div>
                        <Label className="text-white">Sound Effects</Label>
                        <p className="text-sm text-white/60">Enable audio feedback and sacred sounds</p>
                      </div>
                    </div>
                    <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-gold" />
                      <div>
                        <Label className="text-white">Language</Label>
                        <p className="text-sm text-white/60">Application language preference</p>
                      </div>
                    </div>
                    <select className="bg-[#0C1118] border border-gold/30 rounded-md px-3 py-1 text-white">
                      <option>English</option>
                      <option>Greek</option>
                      <option>Russian</option>
                      <option>Serbian</option>
                    </select>
                  </div>

                  <Button onClick={handleSavePreferences} className="bg-gold hover:bg-gold/90 text-black">
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card className="bg-[#1A1F2C]/90 border-gold/20">
                <CardHeader>
                  <CardTitle className="text-gold flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notification Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Bell className="w-5 h-5 text-gold" />
                      <div>
                        <Label className="text-white">Push Notifications</Label>
                        <p className="text-sm text-white/60">Receive notifications for important updates</p>
                      </div>
                    </div>
                    <Switch checked={notifications} onCheckedChange={setNotifications} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gold" />
                      <div>
                        <Label className="text-white">Email Updates</Label>
                        <p className="text-sm text-white/60">Receive daily readings and spiritual content via email</p>
                      </div>
                    </div>
                    <Switch checked={emailUpdates} onCheckedChange={setEmailUpdates} />
                  </div>

                  <Button onClick={handleSavePreferences} className="bg-gold hover:bg-gold/90 text-black">
                    Save Notification Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card className="bg-[#1A1F2C]/90 border-gold/20">
                <CardHeader>
                  <CardTitle className="text-gold flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Privacy & Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-white">Change Password</Label>
                      <p className="text-sm text-white/60 mb-2">Update your account password</p>
                      <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10">
                        <Lock className="w-4 h-4 mr-2" />
                        Change Password
                      </Button>
                    </div>

                    <div>
                      <Label className="text-white">Two-Factor Authentication</Label>
                      <p className="text-sm text-white/60 mb-2">Add an extra layer of security to your account</p>
                      <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10">
                        <Shield className="w-4 h-4 mr-2" />
                        Enable 2FA
                      </Button>
                    </div>

                    <div>
                      <Label className="text-white">Data Export</Label>
                      <p className="text-sm text-white/60 mb-2">Download your personal data and preferences</p>
                      <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10">
                        Export Data
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
