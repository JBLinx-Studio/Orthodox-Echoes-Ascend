
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  Code, Database, Users, Settings, Shield, Crown, 
  LogOut, Activity, Server, Globe, Lock, ArrowLeft
} from 'lucide-react';
import { UserRoleManager } from './UserRoleManager';
import { ContentManager } from '@/components/admin/ContentManager';
import { BlogAdmin } from '@/components/admin/BlogAdmin';
import { SaintManager } from '@/components/admin/SaintManager';
import { SettingsPanel } from '@/components/admin/SettingsPanel';

interface DeveloperDashboardProps {
  onLogout: () => void;
}

interface DeveloperStats {
  totalUsers: number;
  totalContent: number;
  totalSaints: number;
  totalVisitors: number;
  activeAdmins: number;
  systemHealth: number;
}

// Simple Analytics Panel for Developer Dashboard
const DeveloperAnalyticsPanel = ({ stats }: { stats: DeveloperStats }) => {
  return (
    <div className="space-y-6">
      <Card className="bg-[#1A1F2C]/70 border-gold/20">
        <CardHeader>
          <CardTitle className="text-gold flex items-center gap-2">
            <Activity className="w-5 h-5" />
            System Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.totalUsers}</div>
              <div className="text-sm text-white/60">Total Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.totalContent}</div>
              <div className="text-sm text-white/60">Content Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.totalSaints}</div>
              <div className="text-sm text-white/60">Saints</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.totalVisitors}</div>
              <div className="text-sm text-white/60">Total Visitors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.activeAdmins}</div>
              <div className="text-sm text-white/60">Active Admins</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.systemHealth}%</div>
              <div className="text-sm text-white/60">System Health</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export function DeveloperDashboard({ onLogout }: DeveloperDashboardProps) {
  const navigate = useNavigate();
  const [stats] = useState<DeveloperStats>({
    totalUsers: 1247,
    totalContent: 156,
    totalSaints: 84,
    totalVisitors: 3890,
    activeAdmins: 3,
    systemHealth: 98
  });

  const handleLogout = () => {
    localStorage.removeItem('orthodoxEchoesDeveloperAccess');
    localStorage.removeItem('orthodoxEchoesDeveloperLoginTime');
    toast.info('Developer session ended', {
      description: 'Returning to the main sanctuary.'
    });
    onLogout();
    navigate('/'); // Navigate to home page
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0d16] to-[#161a26]">
      {/* Header */}
      <div className="bg-[#1A1F2C]/90 border-b border-gold/20 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-gold hover:text-gold/80 hover:bg-gold/10 p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
              <Crown className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h1 className="text-xl font-display text-gold">Developer Sanctuary</h1>
              <p className="text-sm text-white/70">Sacred Development Portal</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-green-400 border-green-400/30">
              <Activity className="w-3 h-3 mr-1" />
              System Health: {stats.systemHealth}%
            </Badge>
            <Button variant="ghost" onClick={handleLogout} className="text-white/70 hover:text-white">
              <LogOut className="w-4 h-4 mr-2" />
              Exit Sanctuary
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-[#1A1F2C]/70 border-gold/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
                  <p className="text-xs text-white/60">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/70 border-gold/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Database className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{stats.totalContent}</p>
                  <p className="text-xs text-white/60">Content Items</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/70 border-gold/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Crown className="w-8 h-8 text-gold" />
                <div>
                  <p className="text-2xl font-bold text-white">{stats.totalSaints}</p>
                  <p className="text-xs text-white/60">Saints</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/70 border-gold/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Globe className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{stats.totalVisitors}</p>
                  <p className="text-xs text-white/60">Visitors</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/70 border-gold/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-red-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{stats.activeAdmins}</p>
                  <p className="text-xs text-white/60">Active Admins</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/70 border-gold/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Server className="w-8 h-8 text-cyan-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{stats.systemHealth}%</p>
                  <p className="text-xs text-white/60">System Health</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="bg-[#1A1F2C]/70 border border-gold/20">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Content Management
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Blog Management
            </TabsTrigger>
            <TabsTrigger value="saints" className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Saints Management
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              System Settings
            </TabsTrigger>
          </TabsList>

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

          <TabsContent value="analytics" className="space-y-6">
            <DeveloperAnalyticsPanel stats={stats} />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <SettingsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
