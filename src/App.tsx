
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AudioProvider } from "@/contexts/AudioContext";
import { MainLayout } from "@/layouts/MainLayout";
import Index from "./pages/Index";
import Saints from "./pages/Saints";
import PrayerGuide from "./pages/PrayerGuide";
import LearningCenter from "./pages/LearningCenter";
import Blog from "./pages/Blog";
import SacredIconography from "./pages/SacredIconography";
import CoreDoctrine from "./pages/CoreDoctrine";
import DailyReadings from "./pages/DailyReadings";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Callback from "./pages/Callback";
import NotFound from "./pages/NotFound";
import DeveloperPortal from "./pages/DeveloperPortal";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AudioProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Index />} />
                <Route path="saints" element={<Saints />} />
                <Route path="prayers" element={<PrayerGuide />} />
                <Route path="learning" element={<LearningCenter />} />
                <Route path="blog" element={<Blog />} />
                <Route path="iconography" element={<SacredIconography />} />
                <Route path="doctrine" element={<CoreDoctrine />} />
                <Route path="readings" element={<DailyReadings />} />
                <Route path="contact" element={<Contact />} />
                <Route path="admin" element={<Admin />} />
                <Route path="settings" element={<Settings />} />
                <Route path="profile" element={<Profile />} />
                <Route path="login" element={<Login />} />
                <Route path="callback" element={<Callback />} />
                <Route path="developer" element={<DeveloperPortal />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AudioProvider>
    </QueryClientProvider>
  );
}

export default App;
