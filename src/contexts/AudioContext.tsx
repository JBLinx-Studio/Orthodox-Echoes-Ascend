
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  currentTrack: string | null;
  volume: number;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTrack: (track: string | null) => void;
  setVolume: (volume: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

interface AudioContextProviderProps {
  children: ReactNode;
}

export function AudioContextProvider({ children }: AudioContextProviderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.7);

  const value = {
    isPlaying,
    currentTrack,
    volume,
    setIsPlaying,
    setCurrentTrack,
    setVolume,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudioContext() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudioContext must be used within an AudioContextProvider');
  }
  return context;
}
