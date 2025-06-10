
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  currentTrack: string | null;
  volume: number;
  isMinimized: boolean;
  currentTrackIndex: number;
  playlist: Array<{
    name: string;
    icon: string;
    description: string;
    length: string;
    src?: string;
  }>;
  reverbEnabled: boolean;
  reverbAmount: number;
  isMuted: boolean;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTrack: (track: string | null) => void;
  setVolume: (volume: number) => void;
  togglePlay: () => void;
  expandPlayer: () => void;
  minimizePlayer: () => void;
  setCurrentTrackIndex: (index: number) => void;
  toggleReverb: () => void;
  setReverbAmount: (amount: number) => void;
  muteAudio: () => void;
  unmuteAudio: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Default playlist
const defaultPlaylist = [
  {
    name: "Divine Liturgy Cherubic Hymn",
    icon: "🕯️",
    description: "Traditional Byzantine chant from the Divine Liturgy",
    length: "3:56"
  },
  {
    name: "Agni Parthene (O Pure Virgin)",
    icon: "✝️",
    description: "Beautiful hymn dedicated to the Theotokos",
    length: "5:32"
  },
  {
    name: "Kyrie Eleison (Lord Have Mercy)",
    icon: "🙏",
    description: "The thrice-sung plea for divine mercy",
    length: "4:20"
  },
  {
    name: "The Great Doxology",
    icon: "⭐",
    description: "Glory to God in the highest, and on earth peace",
    length: "6:10"
  }
];

interface AudioContextProviderProps {
  children: ReactNode;
}

export function AudioContextProvider({ children }: AudioContextProviderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [volume, setVolume] = useState(70);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [playlist] = useState(defaultPlaylist);
  const [reverbEnabled, setReverbEnabled] = useState(false);
  const [reverbAmount, setReverbAmount] = useState(30);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const expandPlayer = () => {
    setIsMinimized(false);
  };

  const minimizePlayer = () => {
    setIsMinimized(true);
  };

  const toggleReverb = () => {
    setReverbEnabled(!reverbEnabled);
  };

  const muteAudio = () => {
    setIsMuted(true);
  };

  const unmuteAudio = () => {
    setIsMuted(false);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const value = {
    isPlaying,
    currentTrack,
    volume,
    isMinimized,
    currentTrackIndex,
    playlist,
    reverbEnabled,
    reverbAmount,
    isMuted,
    setIsPlaying,
    setCurrentTrack,
    setVolume,
    togglePlay,
    expandPlayer,
    minimizePlayer,
    setCurrentTrackIndex,
    toggleReverb,
    setReverbAmount,
    muteAudio,
    unmuteAudio,
    nextTrack,
    prevTrack,
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

// Export alias for compatibility with existing components
export const useAudio = useAudioContext;
