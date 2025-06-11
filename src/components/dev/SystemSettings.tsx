
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  Settings, Shield, Database, Globe, Bell, Mail, 
  Server, Lock, Key, Wifi, Home, Save, RefreshCw,
  AlertTriangle, CheckCircle, Info, Zap
} from 'lucide-react';

export function SystemSettings() {
  const [settings, setSettings] = useState({
    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordMinLength: 8,
    requirePasswordChange: false,
    
    // System Settings
    maintenanceMode: false,
    enableCaching: true,
    autoBackup: true,
    backupFrequency: 'daily',
    
    // Email Settings
    emailNotifications: true,
    adminAlerts: true,
    userWelcomeEmails: true,
    
    // API Settings
    rateLimit: 1000,
    apiTimeout: 30,
    enableApiLogs: true,
    
    // Content Settings
    autoModeration: true,
    allowComments: true,
    maxFileSize: 10,
    
    // Performance
    enableCompression: true,
    cdnEnabled: true,
    optimizeImages: true
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully', {
      description: 'All system settings have been updated.'
    });
  };

  const handleResetSettings = () => {
    if (confirm('Reset all settings to default values?')) {
      // Reset logic here
      toast.info('Settings reset to defaults');
    }
  };

  const handleReturnHome = () => {
    window.location.hash = '/';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display text-gold">System Settings</h2>
          <p className="text-white/70">Configure system-wide settings and preferences</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleResetSettings}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSaveSettings} className="bg-byzantine hover:bg-byzantine-dark">
            <Save className="w-4 h-4 mr-2" />
            Save All
          </Button>
          <Button variant="ghost" onClick={handleReturnHome} className="text-white/70 hover:text-white">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </div>
      </div>

      {/* Status Alert */}
      <Alert className="border-blue-500/20 bg-blue-500/10">
        <Info className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-400">
          System configuration changes may require a restart to take full effect.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="security" className="space-y-6">
        <TabsList className="bg-[#1A1F2C]/70 border border-gold/20">
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Server className="w-4 h-4" />
            System
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Wifi className="w-4 h-4" />
            API
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-[#1A1F2C]/60 border-gold/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gold">
                  <Lock className="w-5 h-5" />
                  Authentication Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Two-Factor Authentication</Label>
                    <p className="text-sm text-white/60">Require 2FA for admin accounts</p>
                  </div>
                  <Switch 
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white">Session Timeout (minutes)</Label>
                  <Input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                    className="bg-[#0C1118] border-gold/30"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white">Minimum Password Length</Label>
                  <Input
                    type="number"
                    value={settings.passwordMinLength}
                    onChange={(e) => handleSettingChange('passwordMinLength', parseInt(e.target.value))}
                    className="bg-[#0C1118] border-gold/30"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Force Password Changes</Label>
                    <p className="text-sm text-white/60">Require periodic password updates</p>
                  </div>
                  <Switch 
                    checked={settings.requirePasswordChange}
                    onCheckedChange={(checked) => handleSettingChange('requirePasswordChange', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1A1F2C]/60 border-gold/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gold">
                  <Key className="w-5 h-5" />
                  Access Control
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-yellow-500/20 bg-yellow-500/10">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  <AlertDescription className="text-yellow-400">
                    Advanced security settings require careful consideration before modification.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-2">
                  <Label className="text-white">IP Whitelist</Label>
                  <Input
                    placeholder="192.168.1.0/24, 10.0.0.0/8"
                    className="bg-[#0C1118] border-gold/30"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white">Failed Login Attempts</Label>
                  <Input
                    type="number"
                    defaultValue={5}
                    className="bg-[#0C1118] border-gold/30"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-[#1A1F2C]/60 border-gold/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gold">
                  <Server className="w-5 h-5" />
                  System Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Maintenance Mode</Label>
                    <p className="text-sm text-white/60">Temporarily disable public access</p>
                  </div>
                  <Switch 
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Enable Caching</Label>
                    <p className="text-sm text-white/60">Improve performance with caching</p>
                  </div>
                  <Switch 
                    checked={settings.enableCaching}
                    onCheckedChange={(checked) => handleSettingChange('enableCaching', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Automatic Backups</Label>
                    <p className="text-sm text-white/60">Schedule regular data backups</p>
                  </div>
                  <Switch 
                    checked={settings.autoBackup}
                    onCheckedChange={(checked) => handleSettingChange('autoBackup', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1A1F2C]/60 border-gold/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gold">
                  <Database className="w-5 h-5" />
                  Database Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">98.5%</div>
                    <div className="text-sm text-white/60">DB Health</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">2.1GB</div>
                    <div className="text-sm text-white/60">Size</div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  <Database className="w-4 h-4 mr-2" />
                  Run Maintenance
                </Button>
                
                <Button variant="outline" className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Backup Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Additional tabs for email, api, content, and performance settings */}
        <TabsContent value="email" className="space-y-6">
          <Card className="bg-[#1A1F2C]/60 border-gold/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gold">
                <Mail className="w-5 h-5" />
                Email Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Email Notifications</Label>
                  <p className="text-sm text-white/60">Send system notifications via email</p>
                </div>
                <Switch 
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Admin Alerts</Label>
                  <p className="text-sm text-white/60">Critical system alerts to administrators</p>
                </div>
                <Switch 
                  checked={settings.adminAlerts}
                  onCheckedChange={(checked) => handleSettingChange('adminAlerts', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card className="bg-[#1A1F2C]/60 border-gold/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gold">
                <Wifi className="w-5 h-5" />
                API Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Rate Limit (requests/hour)</Label>
                <Input
                  type="number"
                  value={settings.rateLimit}
                  onChange={(e) => handleSettingChange('rateLimit', parseInt(e.target.value))}
                  className="bg-[#0C1118] border-gold/30"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Enable API Logs</Label>
                  <p className="text-sm text-white/60">Log all API requests for debugging</p>
                </div>
                <Switch 
                  checked={settings.enableApiLogs}
                  onCheckedChange={(checked) => handleSettingChange('enableApiLogs', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card className="bg-[#1A1F2C]/60 border-gold/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gold">
                <Database className="w-5 h-5" />
                Content Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Auto Moderation</Label>
                  <p className="text-sm text-white/60">Automatically moderate user content</p>
                </div>
                <Switch 
                  checked={settings.autoModeration}
                  onCheckedChange={(checked) => handleSettingChange('autoModeration', checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Max File Size (MB)</Label>
                <Input
                  type="number"
                  value={settings.maxFileSize}
                  onChange={(e) => handleSettingChange('maxFileSize', parseInt(e.target.value))}
                  className="bg-[#0C1118] border-gold/30"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="bg-[#1A1F2C]/60 border-gold/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gold">
                <Zap className="w-5 h-5" />
                Performance Optimization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Enable Compression</Label>
                  <p className="text-sm text-white/60">Compress responses for faster loading</p>
                </div>
                <Switch 
                  checked={settings.enableCompression}
                  onCheckedChange={(checked) => handleSettingChange('enableCompression', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">CDN Enabled</Label>
                  <p className="text-sm text-white/60">Use content delivery network</p>
                </div>
                <Switch 
                  checked={settings.cdnEnabled}
                  onCheckedChange={(checked) => handleSettingChange('cdnEnabled', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Optimize Images</Label>
                  <p className="text-sm text-white/60">Automatically optimize uploaded images</p>
                </div>
                <Switch 
                  checked={settings.optimizeImages}
                  onCheckedChange={(checked) => handleSettingChange('optimizeImages', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
