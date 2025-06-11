
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Code, Database, Settings, Users, BarChart, 
  Shield, LogOut, Terminal, Cpu, HardDrive,
  Activity, Zap, Globe, Server, ArrowLeft, Clock,
  FileText, Music, Calendar, Heart
} from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface DeveloperDashboardProps {
  onLogout: () => void;
}

export function DeveloperDashboard({ onLogout }: DeveloperDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    localStorage.removeItem('orthodoxEchoesDeveloperAccess');
    localStorage.removeItem('orthodoxEchoesDeveloperLoginTime');
    toast.success('Exiting Developer Sanctuary');
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0d16] to-[#161a26] pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" className="text-gold hover:text-gold/80">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-4xl font-display text-gold mb-2">Developer Sanctuary</h1>
                <p className="text-white/70">Sacred development tools and analytics</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" className="border-gold/30 text-gold hover:bg-gold/10">
              <LogOut className="w-4 h-4 mr-2" />
              Exit Sanctuary
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-[#1A1F2C]/70 border border-gold/20 grid grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Content
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                System
              </TabsTrigger>
              <TabsTrigger value="database" className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                Database
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-[#1A1F2C]/90 border-gold/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <Users className="w-8 h-8 text-gold" />
                      <div>
                        <p className="text-2xl font-bold text-white">847</p>
                        <p className="text-sm text-white/60">Daily Visitors</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#1A1F2C]/90 border-gold/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <Activity className="w-8 h-8 text-green-400" />
                      <div>
                        <p className="text-2xl font-bold text-white">99.8%</p>
                        <p className="text-sm text-white/60">Uptime</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#1A1F2C]/90 border-gold/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <Zap className="w-8 h-8 text-blue-400" />
                      <div>
                        <p className="text-2xl font-bold text-white">1.2s</p>
                        <p className="text-sm text-white/60">Load Time</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#1A1F2C]/90 border-gold/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <Globe className="w-8 h-8 text-purple-400" />
                      <div>
                        <p className="text-2xl font-bold text-white">34</p>
                        <p className="text-sm text-white/60">Countries</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-[#1A1F2C]/90 border-gold/20">
                <CardHeader>
                  <CardTitle className="text-gold">System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <span className="text-white">Web Server</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Online</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <span className="text-white">Content Delivery</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <span className="text-white">Audio Streaming</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Ready</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-[#1A1F2C]/90 border-gold/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-gold" />
                      <div>
                        <p className="text-2xl font-bold text-white">127</p>
                        <p className="text-sm text-white/60">Articles</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#1A1F2C]/90 border-gold/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <Users className="w-8 h-8 text-purple-400" />
                      <div>
                        <p className="text-2xl font-bold text-white">365</p>
                        <p className="text-sm text-white/60">Saints</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#1A1F2C]/90 border-gold/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <Music className="w-8 h-8 text-blue-400" />
                      <div>
                        <p className="text-2xl font-bold text-white">89</p>
                        <p className="text-sm text-white/60">Chants</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#1A1F2C]/90 border-gold/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <Heart className="w-8 h-8 text-red-400" />
                      <div>
                        <p className="text-2xl font-bold text-white">156</p>
                        <p className="text-sm text-white/60">Prayers</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="system" className="space-y-6">
              <Card className="bg-[#1A1F2C]/90 border-gold/20">
                <CardHeader>
                  <CardTitle className="text-gold flex items-center gap-2">
                    <Terminal className="w-5 h-5" />
                    System Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-white font-medium">Application Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/60">Version:</span>
                          <span className="text-white">2.1.0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Build:</span>
                          <span className="text-white">20241211.1</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Environment:</span>
                          <span className="text-white">Production</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Framework:</span>
                          <span className="text-white">React + Vite</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-white font-medium">Performance Metrics</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/60">Bundle Size:</span>
                          <span className="text-white">1.8 MB</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">First Paint:</span>
                          <span className="text-white">0.9s</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Lighthouse Score:</span>
                          <span className="text-white">96/100</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Cache Hit Rate:</span>
                          <span className="text-white">92%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="database" className="space-y-6">
              <Card className="bg-[#1A1F2C]/90 border-gold/20">
                <CardHeader>
                  <CardTitle className="text-gold flex items-center gap-2">
                    <HardDrive className="w-5 h-5" />
                    Database Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Database className="w-16 h-16 text-gold/50 mx-auto mb-4" />
                    <h3 className="text-xl text-white mb-2">Database Integration Ready</h3>
                    <p className="text-white/60">Supabase integration configured for future content management</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card className="bg-[#1A1F2C]/90 border-gold/20">
                <CardHeader>
                  <CardTitle className="text-gold flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Developer Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Debug Mode</h4>
                      <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10">
                        Enable Console Logging
                      </Button>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Cache Management</h4>
                      <div className="flex gap-2">
                        <Button variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
                          Clear Cache
                        </Button>
                        <Button variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                          Rebuild Assets
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Session Management</h4>
                      <Button onClick={handleLogout} variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                        End Developer Session
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
