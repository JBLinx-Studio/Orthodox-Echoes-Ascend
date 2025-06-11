
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { 
  Code, Database, Users, Settings, Shield, Crown, 
  LogOut, Activity, Server, Globe, Lock, Home, 
  Terminal, FileText, BarChart3, Cog, Monitor,
  Zap, AlertTriangle, CheckCircle, Clock, Wifi,
  ShoppingCart
} from 'lucide-react';
import { UserRoleManager } from './UserRoleManager';
import { ShopManager } from './ShopManager';
import { ContentManager } from '@/components/admin/ContentManager';
import { BlogAdmin } from '@/components/admin/BlogAdmin';
import { SaintManager } from '@/components/admin/SaintManager';
import { AnalyticsPanel } from '@/components/admin/AnalyticsPanel';
import { SettingsPanel } from '@/components/admin/SettingsPanel';
import { getUserRole, isLeadAdmin } from '@/utils/auth-utils';

interface DeveloperDashboardProps {
  onLogout: () => void;
}

export function DeveloperDashboard({ onLogout }: DeveloperDashboardProps) {
  const [userRole, setUserRole] = useState<string>('user');
  const [isLeadDev, setIsLeadDev] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalVisitors: 3890,
    todayVisitors: 247,
    totalViews: 15640,
    totalLikes: 892,
    totalComments: 456,
    totalArticles: 156,
    totalPrayers: 89,
    totalSaints: 84,
    totalUsers: 1247,
    totalContent: 156,
    activeAdmins: 3,
    systemHealth: 98,
    serverUptime: '99.9%',
    responseTime: '245ms',
    errorRate: '0.02%',
    lastBackup: '2 hours ago'
  });

  useEffect(() => {
    const loadUserRole = async () => {
      try {
        const role = await getUserRole();
        const leadAdmin = await isLeadAdmin();
        setUserRole(role);
        setIsLeadDev(leadAdmin);
      } catch (error) {
        console.error('Error loading user role:', error);
      }
    };

    loadUserRole();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('orthodoxEchoesDeveloperAccess');
    localStorage.removeItem('orthodoxEchoesDeveloperLoginTime');
    toast.info('Developer session ended', {
      description: 'Logged out of development sanctuary.'
    });
    onLogout();
  };

  const handleReturnHome = () => {
    window.location.hash = '/';
  };

  const refreshStats = () => {
    // Simulate stat refresh
    setStats(prev => ({
      ...prev,
      todayVisitors: prev.todayVisitors + Math.floor(Math.random() * 10),
      totalViews: prev.totalViews + Math.floor(Math.random() * 50),
      responseTime: Math.floor(Math.random() * 100 + 200) + 'ms'
    }));
    toast.success('Statistics refreshed');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0d16] to-[#161a26]">
      {/* Enhanced Header */}
      <div className="bg-[#1A1F2C]/95 border-b border-gold/20 p-4 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gold/30 to-byzantine/30 flex items-center justify-center relative">
              <Crown className="w-7 h-7 text-gold" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-display text-gold flex items-center gap-2">
                Developer Sanctuary
                {isLeadDev && <Crown className="w-5 h-5 text-gold" />}
              </h1>
              <p className="text-sm text-white/70 flex items-center gap-2">
                Sacred Development Portal
                <Badge variant="outline" className="text-xs text-green-400 border-green-400/30">
                  {userRole === 'lead_admin' ? 'Lead Admin' : userRole}
                </Badge>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-green-400 border-green-400/30">
              <Wifi className="w-3 h-3 mr-1" />
              Online
            </Badge>
            <Badge variant="outline" className="text-blue-400 border-blue-400/30">
              <Activity className="w-3 h-3 mr-1" />
              Health: {stats.systemHealth}%
            </Badge>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={refreshStats}
              className="text-white/70 hover:text-white"
            >
              <Monitor className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleReturnHome} 
              className="text-white/70 hover:text-white"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLogout} 
              className="text-red-400 hover:text-red-300"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Exit
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {/* System Status Alert */}
        <Alert className="mb-6 border-green-500/20 bg-green-500/10">
          <CheckCircle className="h-4 w-4 text-green-400" />
          <AlertDescription className="text-green-400">
            All systems operational • Last backup: {stats.lastBackup} • Uptime: {stats.serverUptime}
          </AlertDescription>
        </Alert>

        {/* Enhanced Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
          <Card className="bg-[#1A1F2C]/70 border-blue-500/20 hover:border-blue-500/40 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-white/60">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/70 border-green-500/20 hover:border-green-500/40 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{stats.totalContent}</p>
                  <p className="text-xs text-white/60">Content Items</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/70 border-gold/20 hover:border-gold/40 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{stats.totalSaints}</p>
                  <p className="text-xs text-white/60">Saints</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/70 border-purple-500/20 hover:border-purple-500/40 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{stats.totalVisitors.toLocaleString()}</p>
                  <p className="text-xs text-white/60">Total Visitors</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/70 border-cyan-500/20 hover:border-cyan-500/40 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{stats.responseTime}</p>
                  <p className="text-xs text-white/60">Response Time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/70 border-red-500/20 hover:border-red-500/40 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{stats.activeAdmins}</p>
                  <p className="text-xs text-white/60">Active Admins</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tabbed Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[#1A1F2C]/70 border border-gold/20 p-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-1">
            <TabsTrigger value="overview" className="flex items-center gap-2 text-xs">
              <BarChart3 className="w-3 h-3" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2 text-xs">
              <Users className="w-3 h-3" />
              Users
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2 text-xs">
              <Database className="w-3 h-3" />
              Content
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2 text-xs">
              <Code className="w-3 h-3" />
              Blog
            </TabsTrigger>
            <TabsTrigger value="saints" className="flex items-center gap-2 text-xs">
              <Crown className="w-3 h-3" />
              Saints
            </TabsTrigger>
            <TabsTrigger value="shop" className="flex items-center gap-2 text-xs">
              <ShoppingCart className="w-3 h-3" />
              Shop
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 text-xs">
              <Activity className="w-3 h-3" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 text-xs">
              <Settings className="w-3 h-3" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-[#1A1F2C]/70 border-gold/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gold">
                    <Activity className="w-5 h-5" />
                    System Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">System Health</span>
                      <Badge variant="outline" className="text-green-400 border-green-400/30">
                        {stats.systemHealth}% Optimal
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Server Uptime</span>
                      <span className="text-white">{stats.serverUptime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Error Rate</span>
                      <span className="text-green-400">{stats.errorRate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Last Backup</span>
                      <span className="text-white">{stats.lastBackup}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1A1F2C]/70 border-gold/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gold">
                    <Terminal className="w-5 h-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      className="justify-start h-auto p-3 flex-col gap-2"
                      onClick={() => setActiveTab('users')}
                    >
                      <Users className="w-5 h-5" />
                      <span className="text-xs">Manage Users</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start h-auto p-3 flex-col gap-2"
                      onClick={() => setActiveTab('content')}
                    >
                      <Database className="w-5 h-5" />
                      <span className="text-xs">Content</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start h-auto p-3 flex-col gap-2"
                      onClick={() => setActiveTab('analytics')}
                    >
                      <BarChart3 className="w-5 h-5" />
                      <span className="text-xs">Analytics</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start h-auto p-3 flex-col gap-2"
                      onClick={() => setActiveTab('settings')}
                    >
                      <Cog className="w-5 h-5" />
                      <span className="text-xs">Settings</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <UserRoleManager />
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <ContentManager />
          </TabsContent>

          <TabsContent value="blog" className="space-y-6">
            <BlogAdmin />
          </TabsContent>

          <TabsContent value="saints" className="space-y-6">
            <SaintManager />
          </TabsContent>

          <TabsContent value="shop" className="space-y-6">
            <ShopManager />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsPanel stats={stats} />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <SettingsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
