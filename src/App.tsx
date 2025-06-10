
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { AudioContextProvider } from '@/contexts/AudioContext';

// Pages
import Index from '@/pages/Index';
import Blog from '@/pages/Blog';
import Contact from '@/pages/Contact';
import CoreDoctrine from '@/pages/CoreDoctrine';
import DailyReadings from '@/pages/DailyReadings';
import LearningCenter from '@/pages/LearningCenter';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import PrayerGuide from '@/pages/PrayerGuide';
import Profile from '@/pages/Profile';
import SacredIconography from '@/pages/SacredIconography';
import Saints from '@/pages/Saints';
import Settings from '@/pages/Settings';
import DeveloperPortal from '@/pages/DeveloperPortal';
import Admin from '@/pages/Admin';
import Callback from '@/pages/Callback';

// Layouts
import { MainLayout } from '@/layouts/MainLayout';
import { AdminLayout } from '@/layouts/AdminLayout';

import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AudioContextProvider>
        <Router>
          <Routes>
            {/* Main Layout Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Index />} />
              <Route path="blog" element={<Blog />} />
              <Route path="contact" element={<Contact />} />
              <Route path="doctrine" element={<CoreDoctrine />} />
              <Route path="readings" element={<DailyReadings />} />
              <Route path="learn" element={<LearningCenter />} />
              <Route path="prayers" element={<PrayerGuide />} />
              <Route path="icons" element={<SacredIconography />} />
              <Route path="saints" element={<Saints />} />
              <Route path="settings" element={<Settings />} />
              <Route path="developer" element={<DeveloperPortal />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/auth/callback" element={<Callback />} />

            {/* Admin Layout Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Admin />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </AudioContextProvider>
    </QueryClientProvider>
  );
}

export default App;
