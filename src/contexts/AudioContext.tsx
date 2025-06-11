
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
  seekTo: (time: number) => void;
  duration: number;
  currentTime: number;
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
  const [volume, setVolumeState] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [reverbEnabled, setReverbEnabled] = useState(false);
  const [reverbAmount, setReverbAmount] = useState(30);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  const playTrack = async (trackUrl: string) => {
    console.log('Playing track:', trackUrl);
    
    try {
      // Stop any existing audio first
      if (audioRef.current) {
        if (playPromiseRef.current) {
          await playPromiseRef.current.catch(() => {});
        }
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      
      // Create new audio element
      const audio = new Audio(trackUrl);
      audioRef.current = audio;
      
      // Set up event listeners
      audio.addEventListener('loadedmetadata', () => {
        console.log('Audio metadata loaded, duration:', audio.duration);
        setDuration(audio.duration);
      });
      
      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime);
      });
      
      audio.addEventListener('ended', () => {
        console.log('Track ended, playing next');
        setIsPlaying(false);
        setCurrentTrack(null);
        nextTrack();
      });
      
      audio.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        setIsPlaying(false);
        setCurrentTrack(null);
      });
      
      // Set volume
      audio.volume = isMuted ? 0 : volume / 100;
      
      // Load and play
      audio.load();
      playPromiseRef.current = audio.play();
      
      await playPromiseRef.current;
      console.log('Audio started playing successfully');
      setCurrentTrack(trackUrl);
      setIsPlaying(true);
      
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
      setCurrentTrack(null);
    }
  };

  const pauseTrack = () => {
    console.log('Pausing track');
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    console.log('Toggle play - current state:', isPlaying);
    if (isPlaying) {
      pauseTrack();
    } else {
      if (currentTrackIndex >= 0 && currentTrackIndex < DEFAULT_PLAYLIST.length) {
        playTrack(DEFAULT_PLAYLIST[currentTrackIndex].src);
      }
    }
  };

  const setVolume = (newVolume: number) => {
    console.log('Setting volume to:', newVolume);
    const clampedVolume = Math.max(0, Math.min(100, newVolume));
    setVolumeState(clampedVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : clampedVolume / 100;
    }
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    console.log('Toggle mute to:', newMutedState);
    setIsMuted(newMutedState);
    if (audioRef.current) {
      audioRef.current.volume = newMutedState ? 0 : volume / 100;
    }
  };

  const muteAudio = () => {
    console.log('Muting audio');
    setIsMuted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0;
    }
  };

  const unmuteAudio = () => {
    console.log('Unmuting audio');
    setIsMuted(false);
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  };

  const nextTrack = () => {
    const newIndex = (currentTrackIndex + 1) % DEFAULT_PLAYLIST.length;
    console.log('Next track:', newIndex);
    setCurrentTrackIndex(newIndex);
    if (isPlaying) {
      playTrack(DEFAULT_PLAYLIST[newIndex].src);
    }
  };

  const prevTrack = () => {
    const newIndex = (currentTrackIndex - 1 + DEFAULT_PLAYLIST.length) % DEFAULT_PLAYLIST.length;
    console.log('Previous track:', newIndex);
    setCurrentTrackIndex(newIndex);
    if (isPlaying) {
      playTrack(DEFAULT_PLAYLIST[newIndex].src);
    }
  };

  const expandPlayer = () => {
    console.log('Expanding player');
    setIsMinimized(false);
  };

  const minimizePlayer = () => {
    console.log('Minimizing player');
    setIsMinimized(true);
  };

  const toggleReverb = () => {
    console.log('Toggle reverb to:', !reverbEnabled);
    setReverbEnabled(!reverbEnabled);
  };

  const seekTo = (time: number) => {
    console.log('Seeking to time:', time);
    if (audioRef.current && !isNaN(time) && time >= 0 && time <= duration) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
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
      setReverbAmount,
      seekTo,
      duration,
      currentTime
    }}>
      {children}
    </AudioContext.Provider>
  );
};

// Export for backward compatibility
export const AudioContextProvider = AudioProvider;
