
import { ReactNode } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AudioProvider } from '@/contexts/AudioContext';
import { FloatingAudioPlayer } from '@/components/audio/FloatingAudioPlayer';
import { EnhancedAudioPlayer } from '@/components/audio/EnhancedAudioPlayer';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <AudioProvider>
      <div className="min-h-screen bg-gradient-to-b from-orthodox-deepblue to-orthodox-navy">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        
        {/* Enhanced Audio Player - Always available when audio context exists */}
        <div className="fixed bottom-4 left-4 z-40">
          <EnhancedAudioPlayer 
            minimized={false}
            className="hidden sm:block" 
          />
        </div>
        
        {/* Floating Audio Player - Mobile and backup */}
        <FloatingAudioPlayer />
      </div>
    </AudioProvider>
  );
}
