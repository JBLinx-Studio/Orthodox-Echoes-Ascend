
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { 
  SaveIcon, 
  Settings, 
  Bell, 
  Shield, 
  Paintbrush, 
  Globe, 
  Database,
  FileText,
  Mail,
  Users,
  HardDrive
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SettingsPanel() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Orthodox Echoes',
    siteDescription: 'Explore the depths of Orthodox Christianity through ancient wisdom, sacred traditions, and mystical revelations.',
    contactEmail: 'admin@orthodoxechoes.com',
    enableRegistration: true,
    enableComments: true,
    moderateComments: true,
    enableLikes: true,
    trackViews: true,
    maintenanceMode: false,
    analyticsEnabled: true,
    featuredPostCount: 3,
    defaultContentLanguage: 'english',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newCommentNotifications: true,
    newUserNotifications: true,
    contentApprovalNotifications: true,
    reportNotifications: true,
    weeklyDigest: false,
    adminLoginAlerts: true,
  });
  
  const [appearance, setAppearance] = useState({
    theme: 'cathedral',
    primaryColor: '#9B2335',
    accentColor: '#D4AF37',
    fontPrimary: 'Playfair Display',
    fontSecondary: 'Source Serif Pro',
    enableAnimations: true,
    enableParallaxEffects: true,
    enableBackgroundMusic: false,
    enableCandles: true,
  });

  const handleSaveGeneral = () => {
    toast.success("General settings saved", {
      description: "Your site settings have been updated successfully."
    });
  };

  const handleSaveNotifications = () => {
    toast.success("Notification settings saved", {
      description: "Your notification preferences have been updated."
    });
  };

  const handleSaveAppearance = () => {
    toast.success("Appearance settings saved", {
      description: "Visual theme and styling preferences have been updated."
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general">
        <TabsList className="mb-6 bg-muted/50">
          <TabsTrigger value="general">
            <Settings className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Paintbrush className="h-4 w-4 mr-2" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Globe className="h-4 w-4 mr-2" />
            Integrations
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card className="border-gold/20">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure core settings for your Orthodox Echoes website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input 
                    id="siteName" 
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input 
                    id="contactEmail"
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={(e) => setGeneralSettings({...generalSettings, contactEmail: e.target.value})}
                  />
                </div>
                
                <div className="space-y-3 md:col-span-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea 
                    id="siteDescription" 
                    rows={3}
                    value={generalSettings.siteDescription}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="defaultLanguage">Default Content Language</Label>
                  <Select 
                    value={generalSettings.defaultContentLanguage}
                    onValueChange={(value) => setGeneralSettings({...generalSettings, defaultContentLanguage: value})}
                  >
                    <SelectTrigger id="defaultLanguage">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="greek">Greek</SelectItem>
                      <SelectItem value="russian">Russian</SelectItem>
                      <SelectItem value="arabic">Arabic</SelectItem>
                      <SelectItem value="romanian">Romanian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="featuredCount">Featured Posts Count</Label>
                  <Input 
                    id="featuredCount" 
                    type="number"
                    min="1"
                    max="10"
                    value={generalSettings.featuredPostCount}
                    onChange={(e) => setGeneralSettings({...generalSettings, featuredPostCount: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              
              <div className="border-t border-border pt-6 mt-6">
                <h3 className="text-lg font-medium mb-4">Feature Toggles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableRegistration" className="cursor-pointer">Enable User Registration</Label>
                      <p className="text-sm text-muted-foreground">Allow new users to create accounts</p>
                    </div>
                    <Switch 
                      id="enableRegistration"
                      checked={generalSettings.enableRegistration}
                      onCheckedChange={(checked) => setGeneralSettings({...generalSettings, enableRegistration: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableComments" className="cursor-pointer">Enable Comments</Label>
                      <p className="text-sm text-muted-foreground">Allow users to comment on articles</p>
                    </div>
                    <Switch 
                      id="enableComments"
                      checked={generalSettings.enableComments}
                      onCheckedChange={(checked) => setGeneralSettings({...generalSettings, enableComments: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="moderateComments" className="cursor-pointer">Moderate Comments</Label>
                      <p className="text-sm text-muted-foreground">Review comments before publishing</p>
                    </div>
                    <Switch 
                      id="moderateComments"
                      checked={generalSettings.moderateComments}
                      onCheckedChange={(checked) => setGeneralSettings({...generalSettings, moderateComments: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableLikes" className="cursor-pointer">Enable Likes</Label>
                      <p className="text-sm text-muted-foreground">Allow users to like content</p>
                    </div>
                    <Switch 
                      id="enableLikes"
                      checked={generalSettings.enableLikes}
                      onCheckedChange={(checked) => setGeneralSettings({...generalSettings, enableLikes: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="trackViews" className="cursor-pointer">Track Views</Label>
                      <p className="text-sm text-muted-foreground">Count article views and track analytics</p>
                    </div>
                    <Switch 
                      id="trackViews"
                      checked={generalSettings.trackViews}
                      onCheckedChange={(checked) => setGeneralSettings({...generalSettings, trackViews: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenanceMode" className="cursor-pointer">Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Temporarily restrict site access</p>
                    </div>
                    <Switch 
                      id="maintenanceMode"
                      checked={generalSettings.maintenanceMode}
                      onCheckedChange={(checked) => setGeneralSettings({...generalSettings, maintenanceMode: checked})}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button onClick={handleSaveGeneral}>
                  <SaveIcon className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card className="border-gold/20">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure when and how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications" className="cursor-pointer">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch 
                    id="emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="newCommentNotifications" className="cursor-pointer">New Comment Notifications</Label>
                    <p className="text-sm text-muted-foreground">When users comment on content</p>
                  </div>
                  <Switch 
                    id="newCommentNotifications"
                    checked={notificationSettings.newCommentNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, newCommentNotifications: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="newUserNotifications" className="cursor-pointer">New User Notifications</Label>
                    <p className="text-sm text-muted-foreground">When new users register</p>
                  </div>
                  <Switch 
                    id="newUserNotifications"
                    checked={notificationSettings.newUserNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, newUserNotifications: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="contentApprovalNotifications" className="cursor-pointer">Content Approval Notifications</Label>
                    <p className="text-sm text-muted-foreground">When content needs approval</p>
                  </div>
                  <Switch 
                    id="contentApprovalNotifications"
                    checked={notificationSettings.contentApprovalNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, contentApprovalNotifications: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="reportNotifications" className="cursor-pointer">Report Notifications</Label>
                    <p className="text-sm text-muted-foreground">When content is reported by users</p>
                  </div>
                  <Switch 
                    id="reportNotifications"
                    checked={notificationSettings.reportNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, reportNotifications: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weeklyDigest" className="cursor-pointer">Weekly Analytics Digest</Label>
                    <p className="text-sm text-muted-foreground">Receive weekly summary of site activity</p>
                  </div>
                  <Switch 
                    id="weeklyDigest"
                    checked={notificationSettings.weeklyDigest}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, weeklyDigest: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="adminLoginAlerts" className="cursor-pointer">Admin Login Alerts</Label>
                    <p className="text-sm text-muted-foreground">When admins log in to the dashboard</p>
                  </div>
                  <Switch 
                    id="adminLoginAlerts"
                    checked={notificationSettings.adminLoginAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, adminLoginAlerts: checked})}
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button onClick={handleSaveNotifications}>
                  <SaveIcon className="h-4 w-4 mr-2" />
                  Save Notification Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card className="border-gold/20">
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the visual theme and style of your Orthodox Echoes website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="theme">Website Theme</Label>
                  <Select 
                    value={appearance.theme}
                    onValueChange={(value) => setAppearance({...appearance, theme: value})}
                  >
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cathedral">Cathedral</SelectItem>
                      <SelectItem value="byzantine">Byzantine</SelectItem>
                      <SelectItem value="monastery">Monastery</SelectItem>
                      <SelectItem value="modern">Modern Orthodox</SelectItem>
                      <SelectItem value="minimalist">Minimalist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="fontPrimary">Primary Font</Label>
                  <Select 
                    value={appearance.fontPrimary}
                    onValueChange={(value) => setAppearance({...appearance, fontPrimary: value})}
                  >
                    <SelectTrigger id="fontPrimary">
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                      <SelectItem value="Georgia">Georgia</SelectItem>
                      <SelectItem value="Garamond">Garamond</SelectItem>
                      <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                      <SelectItem value="Cormorant Garamond">Cormorant Garamond</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex items-center gap-3">
                    <Input 
                      id="primaryColor" 
                      type="color"
                      className="w-12 h-10 p-1"
                      value={appearance.primaryColor}
                      onChange={(e) => setAppearance({...appearance, primaryColor: e.target.value})}
                    />
                    <Input 
                      value={appearance.primaryColor}
                      onChange={(e) => setAppearance({...appearance, primaryColor: e.target.value})}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <div className="flex items-center gap-3">
                    <Input 
                      id="accentColor" 
                      type="color"
                      className="w-12 h-10 p-1"
                      value={appearance.accentColor}
                      onChange={(e) => setAppearance({...appearance, accentColor: e.target.value})}
                    />
                    <Input 
                      value={appearance.accentColor}
                      onChange={(e) => setAppearance({...appearance, accentColor: e.target.value})}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-t border-border pt-6 mt-6">
                <h3 className="text-lg font-medium mb-4">Special Effects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableAnimations" className="cursor-pointer">Enable Animations</Label>
                      <p className="text-sm text-muted-foreground">Page transitions and UI animations</p>
                    </div>
                    <Switch 
                      id="enableAnimations"
                      checked={appearance.enableAnimations}
                      onCheckedChange={(checked) => setAppearance({...appearance, enableAnimations: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableParallaxEffects" className="cursor-pointer">Parallax Effects</Label>
                      <p className="text-sm text-muted-foreground">Subtle scrolling depth effects</p>
                    </div>
                    <Switch 
                      id="enableParallaxEffects"
                      checked={appearance.enableParallaxEffects}
                      onCheckedChange={(checked) => setAppearance({...appearance, enableParallaxEffects: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableBackgroundMusic" className="cursor-pointer">Background Music</Label>
                      <p className="text-sm text-muted-foreground">Ambient Byzantine chants on pages</p>
                    </div>
                    <Switch 
                      id="enableBackgroundMusic"
                      checked={appearance.enableBackgroundMusic}
                      onCheckedChange={(checked) => setAppearance({...appearance, enableBackgroundMusic: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableCandles" className="cursor-pointer">Candle Effects</Label>
                      <p className="text-sm text-muted-foreground">Animated candle flames and glows</p>
                    </div>
                    <Switch 
                      id="enableCandles"
                      checked={appearance.enableCandles}
                      onCheckedChange={(checked) => setAppearance({...appearance, enableCandles: checked})}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button onClick={handleSaveAppearance}>
                  <SaveIcon className="h-4 w-4 mr-2" />
                  Save Appearance Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card className="border-gold/20">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security options to protect your content and users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                      <Shield className="mr-2 h-5 w-5 text-byzantine" />
                      Authentication Settings
                    </h3>
                    <div className="p-4 bg-muted/30 rounded-lg border border-border">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="cursor-pointer">Two-Factor Authentication</Label>
                            <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                          </div>
                          <Switch defaultChecked={true} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="cursor-pointer">Session Timeout</Label>
                            <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                          </div>
                          <Select defaultValue="30">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select minutes" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="15">15 minutes</SelectItem>
                              <SelectItem value="30">30 minutes</SelectItem>
                              <SelectItem value="60">1 hour</SelectItem>
                              <SelectItem value="120">2 hours</SelectItem>
                              <SelectItem value="240">4 hours</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="cursor-pointer">Password Policy</Label>
                            <p className="text-sm text-muted-foreground">Minimum password requirements</p>
                          </div>
                          <Select defaultValue="strong">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select policy" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="basic">Basic (8+ chars)</SelectItem>
                              <SelectItem value="medium">Medium (8+ chars, mixed case)</SelectItem>
                              <SelectItem value="strong">Strong (8+ chars, mixed case, numbers)</SelectItem>
                              <SelectItem value="very-strong">Very Strong (12+ chars, mixed case, numbers, symbols)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-byzantine" />
                      Content Protection
                    </h3>
                    <div className="p-4 bg-muted/30 rounded-lg border border-border">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="cursor-pointer">Content Approval</Label>
                            <p className="text-sm text-muted-foreground">Require approval for new content</p>
                          </div>
                          <Switch defaultChecked={true} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="cursor-pointer">Comment Screening</Label>
                            <p className="text-sm text-muted-foreground">Filter comments for inappropriate content</p>
                          </div>
                          <Switch defaultChecked={true} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="cursor-pointer">Content Backup</Label>
                            <p className="text-sm text-muted-foreground">Regular automatic content backups</p>
                          </div>
                          <Switch defaultChecked={true} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button>
                    <SaveIcon className="h-4 w-4 mr-2" />
                    Save Security Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Settings */}
        <TabsContent value="integrations">
          <Card className="border-gold/20">
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>
                Connect Orthodox Echoes with external services and tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                      <Database className="mr-2 h-5 w-5 text-byzantine" />
                      Active Integrations
                    </h3>
                    <div className="rounded-lg border divide-y">
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <Mail className="h-6 w-6 mr-3 text-blue-500" />
                          <div>
                            <h4 className="font-medium">Email Service</h4>
                            <p className="text-sm text-muted-foreground">Connected to SendGrid</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <Globe className="h-6 w-6 mr-3 text-green-500" />
                          <div>
                            <h4 className="font-medium">Google Analytics</h4>
                            <p className="text-sm text-muted-foreground">Tracking ID: UA-123456789</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <Users className="h-6 w-6 mr-3 text-purple-500" />
                          <div>
                            <h4 className="font-medium">Social Media</h4>
                            <p className="text-sm text-muted-foreground">Facebook, Twitter, Instagram</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <HardDrive className="h-6 w-6 mr-3 text-gray-500" />
                          <div>
                            <h4 className="font-medium">Cloud Storage</h4>
                            <p className="text-sm text-muted-foreground">Connected to AWS S3</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Available Integrations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {['Payment Gateway', 'Translation API', 'Calendar Sync', 'Podcast Service', 'Live Streaming', 'Content CDN'].map((service, index) => (
                        <div key={index} className="p-4 border rounded-lg flex flex-col items-center text-center hover:border-gold/30 transition-colors">
                          <div className="w-12 h-12 bg-muted/50 rounded-full flex items-center justify-center mb-3">
                            <Plus className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <h4 className="font-medium">{service}</h4>
                          <p className="text-sm text-muted-foreground mb-3">Connect this service</p>
                          <Button variant="outline" size="sm" className="mt-auto">Add Integration</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Plus(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
