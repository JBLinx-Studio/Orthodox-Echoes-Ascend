
import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GlobalAudioPlayer } from '@/components/audio/GlobalAudioPlayer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <GlobalAudioPlayer />
    </div>
  );
}

export default MainLayout;
