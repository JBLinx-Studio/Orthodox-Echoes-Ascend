
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { BlogAdmin } from '@/components/admin/BlogAdmin';
import { AnalyticsPanel } from '@/components/admin/AnalyticsPanel';
import { CommentModeration } from '@/components/admin/CommentModeration';
import { ContentManager } from '@/components/admin/ContentManager';
import { SaintManager } from '@/components/admin/SaintManager';
import { UserManager } from '@/components/admin/UserManager';
import { SettingsPanel } from '@/components/admin/SettingsPanel';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Book, MessageSquare, Users, Heart, Eye, Settings, 
  UserCircle, Bell
} from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const editPostId = queryParams.get('editPost');
  const tabParam = queryParams.get('tab');
  
  // Track visitor and interaction stats for analytics
  const [stats, setStats] = useState({
    totalVisitors: 1254,
    todayVisitors: 65,
    totalViews: 3890,
    totalLikes: 876,
    totalComments: 218,
    totalArticles: 47,
    totalPrayers: 32,
    totalSaints: 84
  });
  
  useEffect(() => {
    // Check authentication status
    const adminStatus = localStorage.getItem('orthodoxEchoesAdmin');
    setIsAuthenticated(adminStatus === 'true');
    setIsLoading(false);
    
    // If there's an editPost query parameter, switch to blog tab
    if (editPostId) {
      setActiveTab('blog');
    }
    
    // If there's a tab query parameter, switch to that tab
    if (tabParam) {
      setActiveTab(tabParam);
    }
    
    // Load site stats from localStorage or API
    const savedStats = localStorage.getItem('orthodoxEchoesStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
    
    // Show welcome toast only if authenticated
    if (adminStatus === 'true') {
      toast.success("Welcome to the Sanctuary", {
        description: "Manage your Orthodox Echoes cathedral with grace.",
        icon: <Bell className="h-5 w-5 text-byzantine" />
      });
    }
  }, [editPostId, tabParam]);

  const handleLogout = () => {
    localStorage.removeItem('orthodoxEchoesAdmin');
    localStorage.removeItem('orthodoxEchoesAdminUser');
    localStorage.removeItem('orthodoxEchoesLastLogin');
    toast.info("Logged out successfully", {
      description: "You have been securely logged out.",
      icon: <UserCircle className="h-5 w-5 text-gold" />
    });
    navigate('/');
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0c111f] to-[#1A1F2C]">
        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center"
        >
          <div className="relative flex items-center justify-center w-16 h-16 mx-auto mb-4">
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-byzantine to-byzantine-dark opacity-80"></span>
            <span className="relative text-white font-display font-bold text-3xl">Ω</span>
            <span className="absolute inset-0 rounded-full bg-gold/20 animate-pulse"></span>
          </div>
          <p className="text-gold font-display text-xl">Entering the Sanctuary...</p>
        </motion.div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="admin-layout min-h-screen bg-gradient-to-b from-[#0c111f] to-[#161a26]">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 20h40M20 0v40" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern)" />
          </svg>
        </div>
        
        {/* Subtle cathedral interior overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1508187542328-cd711238ae69?q=80&w=2070&auto=format&fit=crop)' }}
        ></div>
        
        {/* Light rays */}
        <div className="absolute top-0 left-1/4 w-16 h-screen bg-gold/5 -rotate-12 animate-pulse" style={{animationDuration: "12s"}}></div>
        <div className="absolute top-0 right-1/5 w-24 h-screen bg-byzantine/5 rotate-12 animate-pulse" style={{animationDuration: "15s"}}></div>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="container mx-auto px-4 py-8"
        >
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
            <div className="mb-8 flex justify-between items-center">
              <TabsList className="bg-[#1A1F2C]/70 border border-gold/20">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="blog">Content</TabsTrigger>
                <TabsTrigger value="saints">Saints</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="dashboard">
              <AdminDashboard onLogout={handleLogout} stats={stats} />
            </TabsContent>
            
            <TabsContent value="blog">
              <BlogAdmin />
            </TabsContent>
            
            <TabsContent value="saints">
              <SaintManager />
            </TabsContent>
            
            <TabsContent value="users">
              <UserManager />
            </TabsContent>
            
            <TabsContent value="comments">
              <CommentModeration />
            </TabsContent>
            
            <TabsContent value="analytics">
              <AnalyticsPanel stats={stats} />
            </TabsContent>
            
            <TabsContent value="settings">
              <SettingsPanel />
            </TabsContent>
          </Tabs>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Admin;
