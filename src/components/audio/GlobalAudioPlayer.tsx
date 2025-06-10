
import React, { useState, useEffect } from 'react';
import { EnhancedAudioPlayer } from './EnhancedAudioPlayer';
import { useAudio } from '@/contexts/AudioContext';
import { Button } from '@/components/ui/button';
import { Music } from 'lucide-react';

export function GlobalAudioPlayer() {
  const { isPlaying, currentTrack, expandPlayer, isMinimized } = useAudio();
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [floatingPlayerVisible, setFloatingPlayerVisible] = useState(false);
  
  // Show floating button when player is minimized and something is/was playing
  useEffect(() => {
    if (currentTrack && isMinimized) {
      setShowFloatingButton(true);
    } else {
      setShowFloatingButton(false);
    }
  }, [currentTrack, isMinimized]);

  const handleOpenPlayer = () => {
    expandPlayer();
    setFloatingPlayerVisible(true);
  };

  if (!currentTrack && !isPlaying) {
    return null;
  }

  return (
    <>
      {/* Floating button to open the player */}
      {showFloatingButton && !floatingPlayerVisible && (
        <div className="fixed right-4 bottom-4 z-50">
          <Button 
            onClick={handleOpenPlayer}
            className="rounded-full h-12 w-12 bg-byzantine hover:bg-byzantine-dark shadow-lg flex items-center justify-center"
          >
            <Music className={`h-5 w-5 ${isPlaying ? 'animate-pulse' : ''}`} />
          </Button>
        </div>
      )}
      
      {/* Floating player */}
      {floatingPlayerVisible && !isMinimized && (
        <div className="fixed right-4 bottom-16 z-50 shadow-2xl">
          <EnhancedAudioPlayer className="w-[350px] md:w-[450px]" />
        </div>
      )}
    </>
  );
}
