
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, CalendarDays, MessageSquare, Users, Heart } from 'lucide-react';
import { ContentManager } from './ContentManager';
import { CommentModeration } from './CommentModeration';
import { AnalyticsPanel } from './AnalyticsPanel';
import { BlogAdmin } from './BlogAdmin';
import { SaintManager } from './SaintManager';

export interface AdminDashboardProps {
  onLogout: () => void;
  stats?: {
    totalVisitors: number;
    todayVisitors: number;
    totalViews: number;
    totalLikes: number;
    totalComments: number;
    totalArticles: number;
    totalPrayers: number;
    totalSaints: number;
  };
}

export function AdminDashboard({ onLogout, stats }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Default stats if none provided
  const dashboardStats = stats || {
    totalVisitors: 1254,
    todayVisitors: 65,
    totalViews: 3890,
    totalLikes: 876,
    totalComments: 218,
    totalArticles: 47,
    totalPrayers: 32,
    totalSaints: 84
  };

  const DASHBOARD_STATS = [
    { title: 'Total Articles', value: dashboardStats.totalArticles.toString(), icon: Book, change: '+3 this week' },
    { title: 'User Comments', value: dashboardStats.totalComments.toString(), icon: MessageSquare, change: '+24 this month' },
    { title: 'Active Users', value: dashboardStats.totalVisitors.toString(), icon: Users, change: '+12% growth' },
    { title: 'Donations', value: '$1,875', icon: Heart, change: '+$350 this month' },
  ];

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="orthodox-heading text-3xl font-bold">Administrator Dashboard</h1>
          <p className="text-muted-foreground">Manage content, moderate comments, and monitor site performance</p>
        </div>
        <Button 
          variant="outline"
          className="border-byzantine text-byzantine hover:bg-byzantine/10"
          onClick={onLogout}
        >
          Log Out
        </Button>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {DASHBOARD_STATS.map((stat, i) => (
            <Card key={i} className="border-gold/20 glass-morphism">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-byzantine/10 flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-byzantine" />
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.change}</div>
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Tabs defaultValue="blog" className="space-y-6">
        <TabsList className="bg-muted/50 w-full md:w-auto">
          <TabsTrigger value="blog" className="flex-1 md:flex-none">Blog Management</TabsTrigger>
          <TabsTrigger value="saints" className="flex-1 md:flex-none">Saints Database</TabsTrigger>
          <TabsTrigger value="content" className="flex-1 md:flex-none">Content Management</TabsTrigger>
          <TabsTrigger value="comments" className="flex-1 md:flex-none">Comments</TabsTrigger>
          <TabsTrigger value="analytics" className="flex-1 md:flex-none">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="blog" className="space-y-6">
          <BlogAdmin />
        </TabsContent>
        
        <TabsContent value="saints" className="space-y-6">
          <SaintManager />
        </TabsContent>
        
        <TabsContent value="content" className="space-y-6">
          <ContentManager />
        </TabsContent>
        
        <TabsContent value="comments" className="space-y-6">
          <CommentModeration />
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <AnalyticsPanel stats={dashboardStats} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
