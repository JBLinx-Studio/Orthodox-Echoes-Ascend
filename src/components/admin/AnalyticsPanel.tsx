
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, PieChart } from '@/components/ui/charts';
import { Eye, Users, Heart, MessageSquare, Book, Calendar } from 'lucide-react';

export interface AnalyticsPanelProps {
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

export function AnalyticsPanel({ stats }: AnalyticsPanelProps) {
  // Default stats if none provided
  const analyticsStats = stats || {
    totalVisitors: 1254,
    todayVisitors: 65,
    totalViews: 3890,
    totalLikes: 876,
    totalComments: 218,
    totalArticles: 47,
    totalPrayers: 32,
    totalSaints: 84
  };

  // Sample data for charts
  const visitorData = [
    { name: 'Mon', value: 120 },
    { name: 'Tue', value: 160 },
    { name: 'Wed', value: 190 },
    { name: 'Thu', value: 220 },
    { name: 'Fri', value: 240 },
    { name: 'Sat', value: 280 },
    { name: 'Sun', value: 320 }
  ];

  const contentData = [
    { name: 'Articles', value: analyticsStats.totalArticles },
    { name: 'Comments', value: analyticsStats.totalComments },
    { name: 'Prayers', value: analyticsStats.totalPrayers },
    { name: 'Saints', value: analyticsStats.totalSaints }
  ];

  const engagementData = [
    { name: 'Views', value: analyticsStats.totalViews },
    { name: 'Likes', value: analyticsStats.totalLikes },
    { name: 'Comments', value: analyticsStats.totalComments }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="orthodox-heading text-2xl font-bold">Site Analytics</h2>
          <p className="text-muted-foreground">Monitor website performance and user engagement</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-gold/20 glass-morphism">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <div className="text-sm text-muted-foreground">+12% from last month</div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold">{analyticsStats.totalVisitors.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Visitors</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gold/20 glass-morphism">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <Eye className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-sm text-muted-foreground">+8% from last month</div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold">{analyticsStats.totalViews.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Page Views</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gold/20 glass-morphism">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center">
                <Heart className="h-5 w-5 text-pink-500" />
              </div>
              <div className="text-sm text-muted-foreground">+15% from last month</div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold">{analyticsStats.totalLikes.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Likes</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gold/20 glass-morphism">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Book className="h-5 w-5 text-purple-500" />
              </div>
              <div className="text-sm text-muted-foreground">+3 this week</div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold">{analyticsStats.totalArticles.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Articles</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="visitors" className="space-y-4">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="visitors">Visitors</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="visitors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visitor Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <LineChart 
                  data={visitorData} 
                  categories={['value']} 
                  index="name" 
                  colors={['blue']} 
                  valueFormatter={(value: number) => `${value} visitors`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <PieChart 
                  data={contentData} 
                  category="value" 
                  index="name" 
                  valueFormatter={(value: number) => `${value} items`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <BarChart 
                  data={engagementData} 
                  categories={['value']} 
                  index="name" 
                  colors={['gold']} 
                  valueFormatter={(value: number) => `${value} total`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
