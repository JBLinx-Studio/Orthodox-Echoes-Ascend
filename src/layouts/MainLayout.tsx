
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
        
        {/* Enhanced Audio Player - Desktop version with full features */}
        <div className="fixed bottom-4 left-4 z-40 hidden lg:block">
          <EnhancedAudioPlayer 
            minimized={false}
            className="max-w-sm" 
          />
        </div>
        
        {/* Floating Audio Player - Mobile and tablet */}
        <div className="lg:hidden">
          <FloatingAudioPlayer />
        </div>
      </div>
    </AudioProvider>
  );
}
