
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  User, Settings as SettingsIcon, Bell, Shield, 
  Palette, Volume2, Mail, Lock, Globe, Moon, Sun,
  Download, Upload, Trash2, RefreshCw, Eye, Database,
  Smartphone, Monitor, Tablet, Save, Archive, Clock
} from 'lucide-react';
import { getCurrentUser } from '@/utils/auth-utils';

export default function Settings() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [volume, setVolume] = useState([70]);
  const [fontSize, setFontSize] = useState([16]);
  const [autoSave, setAutoSave] = useState(true);
  const [readingMode, setReadingMode] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        
        // Load saved preferences from localStorage
        const savedPrefs = localStorage.getItem('orthodoxEchoesPreferences');
        if (savedPrefs) {
          const prefs = JSON.parse(savedPrefs);
          setDarkMode(prefs.darkMode ?? true);
          setNotifications(prefs.notifications ?? true);
          setEmailUpdates(prefs.emailUpdates ?? false);
          setSoundEnabled(prefs.soundEnabled ?? true);
          setVolume([prefs.volume ?? 70]);
          setFontSize([prefs.fontSize ?? 16]);
          setAutoSave(prefs.autoSave ?? true);
          setReadingMode(prefs.readingMode ?? false);
          setCompactMode(prefs.compactMode ?? false);
          setAnimationsEnabled(prefs.animationsEnabled ?? true);
        }
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
    const preferences = {
      darkMode,
      notifications,
      emailUpdates,
      soundEnabled,
      volume: volume[0],
      fontSize: fontSize[0],
      autoSave,
      readingMode,
      compactMode,
      animationsEnabled,
      lastSaved: new Date().toISOString()
    };
    
    localStorage.setItem('orthodoxEchoesPreferences', JSON.stringify(preferences));
    toast.success('Preferences saved successfully!');
  };

  const handleExportData = () => {
    const userData = {
      profile: user,
      preferences: {
        darkMode,
        notifications,
        emailUpdates,
        soundEnabled,
        volume: volume[0],
        fontSize: fontSize[0],
        autoSave,
        readingMode,
        compactMode,
        animationsEnabled
      },
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `orthodox-echoes-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Data exported successfully!');
  };

  const handleResetSettings = () => {
    if (confirm('Are you sure you want to reset all settings to default? This action cannot be undone.')) {
      localStorage.removeItem('orthodoxEchoesPreferences');
      setDarkMode(true);
      setNotifications(true);
      setEmailUpdates(false);
      setSoundEnabled(true);
      setVolume([70]);
      setFontSize([16]);
      setAutoSave(true);
      setReadingMode(false);
      setCompactMode(false);
      setAnimationsEnabled(true);
      toast.success('Settings reset to default values');
    }
  };

  const handleClearCache = () => {
    localStorage.removeItem('orthodoxEchoesCache');
    sessionStorage.clear();
    toast.success('Cache cleared successfully!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0d16] to-[#161a26] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Loading sacred settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0d16] to-[#161a26] pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-display text-gold mb-2">Sacred Settings</h1>
            <p className="text-white/70">Customize your Orthodox Echoes experience</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="bg-[#1A1F2C]/70 border border-gold/20 grid grid-cols-2 md:grid-cols-5">
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
                Privacy
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                Advanced
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
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center">
                      <User className="w-10 h-10 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Orthodox Believer'}
                      </h3>
                      <p className="text-white/60">{user?.email || 'guest@orthodox-echoes.com'}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline" className="text-green-400 border-green-400/30">
                          Active Member
                        </Badge>
                        <Badge variant="outline" className="text-gold border-gold/30">
                          Faithful
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <div>
                      <Label htmlFor="parish" className="text-white/90">Home Parish</Label>
                      <Input
                        id="parish"
                        placeholder="Your Orthodox parish"
                        className="bg-[#0C1118] border-gold/30 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="feastDay" className="text-white/90">Patron Saint</Label>
                      <Input
                        id="feastDay"
                        placeholder="Your patron saint"
                        className="bg-[#0C1118] border-gold/30 text-white"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="bg-gold hover:bg-gold/90 text-black">
                      <Save className="w-4 h-4 mr-2" />
                      Update Profile
                    </Button>
                    <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Avatar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-[#1A1F2C]/90 border-gold/20">
                  <CardHeader>
                    <CardTitle className="text-gold flex items-center gap-2">
                      <Palette className="w-5 h-5" />
                      Appearance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {darkMode ? <Moon className="w-5 h-5 text-gold" /> : <Sun className="w-5 h-5 text-gold" />}
                        <div>
                          <Label className="text-white">Dark Mode</Label>
                          <p className="text-sm text-white/60">Sacred darkness theme</p>
                        </div>
                      </div>
                      <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-white">Font Size: {fontSize[0]}px</Label>
                      <Slider
                        value={fontSize}
                        onValueChange={setFontSize}
                        max={24}
                        min={12}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Eye className="w-5 h-5 text-gold" />
                        <div>
                          <Label className="text-white">Reading Mode</Label>
                          <p className="text-sm text-white/60">Optimized for extended reading</p>
                        </div>
                      </div>
                      <Switch checked={readingMode} onCheckedChange={setReadingMode} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Monitor className="w-5 h-5 text-gold" />
                        <div>
                          <Label className="text-white">Compact Mode</Label>
                          <p className="text-sm text-white/60">Denser layout for more content</p>
                        </div>
                      </div>
                      <Switch checked={compactMode} onCheckedChange={setCompactMode} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <RefreshCw className="w-5 h-5 text-gold" />
                        <div>
                          <Label className="text-white">Animations</Label>
                          <p className="text-sm text-white/60">Smooth transitions and effects</p>
                        </div>
                      </div>
                      <Switch checked={animationsEnabled} onCheckedChange={setAnimationsEnabled} />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#1A1F2C]/90 border-gold/20">
                  <CardHeader>
                    <CardTitle className="text-gold flex items-center gap-2">
                      <Volume2 className="w-5 h-5" />
                      Audio & Media
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Volume2 className="w-5 h-5 text-gold" />
                        <div>
                          <Label className="text-white">Sound Effects</Label>
                          <p className="text-sm text-white/60">Sacred sounds and feedback</p>
                        </div>
                      </div>
                      <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-white">Volume: {volume[0]}%</Label>
                      <Slider
                        value={volume}
                        onValueChange={setVolume}
                        max={100}
                        min={0}
                        step={5}
                        className="w-full"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-gold" />
                        <div>
                          <Label className="text-white">Auto-Save</Label>
                          <p className="text-sm text-white/60">Automatically save progress</p>
                        </div>
                      </div>
                      <Switch checked={autoSave} onCheckedChange={setAutoSave} />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Language Preference</Label>
                      <Select defaultValue="english">
                        <SelectTrigger className="bg-[#0C1118] border-gold/30 text-white">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="greek">Ελληνικά (Greek)</SelectItem>
                          <SelectItem value="russian">Русский (Russian)</SelectItem>
                          <SelectItem value="serbian">Српски (Serbian)</SelectItem>
                          <SelectItem value="romanian">Română (Romanian)</SelectItem>
                          <SelectItem value="bulgarian">Български (Bulgarian)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSavePreferences} className="bg-gold hover:bg-gold/90 text-black">
                  <Save className="w-4 h-4 mr-2" />
                  Save All Preferences
                </Button>
                <Button variant="outline" onClick={handleResetSettings} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset to Defaults
                </Button>
              </div>
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
                      <Button onClick={handleExportData} variant="outline" className="border-gold/30 text-gold hover:bg-gold/10">
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <Card className="bg-[#1A1F2C]/90 border-gold/20">
                <CardHeader>
                  <CardTitle className="text-gold flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Advanced Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button onClick={handleExportData} variant="outline" className="border-gold/30 text-gold hover:bg-gold/10">
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                    <Button onClick={handleClearCache} variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear Cache
                    </Button>
                  </div>
                  
                  <div className="bg-gold/10 border border-gold/20 rounded-md p-4">
                    <h4 className="text-gold font-medium mb-2">System Information</h4>
                    <div className="text-sm text-white/70 space-y-1">
                      <p>Version: 2.0.0-beta</p>
                      <p>Last Updated: {new Date().toLocaleDateString()}</p>
                      <p>Cache Size: ~2.3 MB</p>
                      <p>Session Duration: Active</p>
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
