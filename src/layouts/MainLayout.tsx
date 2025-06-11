
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EnhancedAudioPlayer } from '@/components/audio/EnhancedAudioPlayer';
import { useAudio } from '@/contexts/AudioContext';

export function MainLayout() {
  const { isMinimized } = useAudio();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      
      {/* Enhanced Audio Player */}
      <EnhancedAudioPlayer />
    </div>
  );
}
