
import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';

// Sample playlist data
const DEFAULT_PLAYLIST = [
  {
    name: "Divine Liturgy Cherubic Hymn",
    src: "https://ia800904.us.archive.org/12/items/AgniParthene_201608/Cherubic%20Hymn%20-%20Russian%20Orthodox%20Choir.mp3",
    description: "Traditional Byzantine chant from the Divine Liturgy",
    length: "3:56",
    icon: "🕯️"
  },
  {
    name: "Agni Parthene (O Pure Virgin)",
    src: "https://ia800505.us.archive.org/26/items/AgniPartheneversionAbbessKassiani/AgniParthene-versionAbbessKassiani.mp3",
    description: "Beautiful hymn dedicated to the Theotokos by St. Nectarios",
    length: "5:32",
    icon: "✝️"
  },
  {
    name: "Cherubic Hymn (Bulgarian)",
    src: "https://ia601509.us.archive.org/15/items/CherubicHymnBulgarian/Cherubic%20Hymn%20%28Bulgarian%29.mp3",
    description: "Bulgarian rendition of the mystical Cherubic Hymn",
    length: "3:15",
    icon: "👼"
  },
  {
    name: "Kyrie Eleison (Lord Have Mercy)",
    src: "https://ia802905.us.archive.org/3/items/YouTube_20180829_94/Kyrie_Eleison_Byzantine_Chant.mp3",
    description: "The thrice-sung plea for divine mercy",
    length: "4:20",
    icon: "🙏"
  }
];

interface AudioContextType {
  isPlaying: boolean;
  currentTrack: string | null;
  volume: number;
  isMuted: boolean;
  playTrack: (trackUrl: string) => void;
  pauseTrack: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  
  // Additional properties needed by components
  togglePlay: () => void;
  expandPlayer: () => void;
  minimizePlayer: () => void;
  isMinimized: boolean;
  currentTrackIndex: number;
  setCurrentTrackIndex: (index: number) => void;
  playlist: typeof DEFAULT_PLAYLIST;
  nextTrack: () => void;
  prevTrack: () => void;
  muteAudio: () => void;
  unmuteAudio: () => void;
  reverbEnabled: boolean;
  toggleReverb: () => void;
  reverbAmount: number;
  setReverbAmount: (amount: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [volume, setVolumeState] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [reverbEnabled, setReverbEnabled] = useState(false);
  const [reverbAmount, setReverbAmount] = useState(30);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playTrack = (trackUrl: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    audioRef.current = new Audio(trackUrl);
    audioRef.current.volume = isMuted ? 0 : volume;
    audioRef.current.play();
    
    setCurrentTrack(trackUrl);
    setIsPlaying(true);
    
    audioRef.current.onended = () => {
      setIsPlaying(false);
      setCurrentTrack(null);
      nextTrack();
    };
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseTrack();
    } else {
      if (currentTrackIndex >= 0 && currentTrackIndex < DEFAULT_PLAYLIST.length) {
        playTrack(DEFAULT_PLAYLIST[currentTrackIndex].src);
      }
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVolume;
    }
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (audioRef.current) {
      audioRef.current.volume = newMutedState ? 0 : volume;
    }
  };

  const muteAudio = () => {
    setIsMuted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0;
    }
  };

  const unmuteAudio = () => {
    setIsMuted(false);
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  };

  const nextTrack = () => {
    const newIndex = (currentTrackIndex + 1) % DEFAULT_PLAYLIST.length;
    setCurrentTrackIndex(newIndex);
    if (isPlaying) {
      playTrack(DEFAULT_PLAYLIST[newIndex].src);
    }
  };

  const prevTrack = () => {
    const newIndex = (currentTrackIndex - 1 + DEFAULT_PLAYLIST.length) % DEFAULT_PLAYLIST.length;
    setCurrentTrackIndex(newIndex);
    if (isPlaying) {
      playTrack(DEFAULT_PLAYLIST[newIndex].src);
    }
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

  return (
    <AudioContext.Provider value={{
      isPlaying,
      currentTrack,
      volume,
      isMuted,
      playTrack,
      pauseTrack,
      setVolume,
      toggleMute,
      togglePlay,
      expandPlayer,
      minimizePlayer,
      isMinimized,
      currentTrackIndex,
      setCurrentTrackIndex,
      playlist: DEFAULT_PLAYLIST,
      nextTrack,
      prevTrack,
      muteAudio,
      unmuteAudio,
      reverbEnabled,
      toggleReverb,
      reverbAmount,
      setReverbAmount
    }}>
      {children}
    </AudioContext.Provider>
  );
};

// Export for backward compatibility
export const AudioContextProvider = AudioProvider;
