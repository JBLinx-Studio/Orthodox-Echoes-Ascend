
import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';

interface AudioState {
  isPlaying: boolean;
  currentTrack: string | null;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
}

interface AudioContextType extends AudioState {
  play: (trackUrl: string) => void;
  pause: () => void;
  stop: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  seek: (time: number) => void;
  getDuration: () => number;
  getCurrentTime: () => number;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioContextProvider');
  }
  return context;
};

interface AudioContextProviderProps {
  children: ReactNode;
}

export const AudioContextProvider: React.FC<AudioContextProviderProps> = ({ children }) => {
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    currentTrack: null,
    volume: 1,
    isMuted: false,
    isLoading: false,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = (trackUrl: string) => {
    if (audioRef.current) {
      if (audioState.currentTrack !== trackUrl) {
        audioRef.current.src = trackUrl;
        setAudioState(prev => ({ ...prev, currentTrack: trackUrl, isLoading: true }));
      }
      audioRef.current.play();
      setAudioState(prev => ({ ...prev, isPlaying: true }));
    } else {
      audioRef.current = new Audio(trackUrl);
      audioRef.current.volume = audioState.volume;
      audioRef.current.muted = audioState.isMuted;
      
      audioRef.current.addEventListener('loadstart', () => {
        setAudioState(prev => ({ ...prev, isLoading: true }));
      });
      
      audioRef.current.addEventListener('canplay', () => {
        setAudioState(prev => ({ ...prev, isLoading: false }));
      });
      
      audioRef.current.addEventListener('ended', () => {
        setAudioState(prev => ({ ...prev, isPlaying: false }));
      });
      
      audioRef.current.play();
      setAudioState(prev => ({ 
        ...prev, 
        currentTrack: trackUrl, 
        isPlaying: true,
        isLoading: true 
      }));
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setAudioState(prev => ({ ...prev, isPlaying: false }));
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setAudioState(prev => ({ ...prev, isPlaying: false }));
    }
  };

  const setVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    setAudioState(prev => ({ ...prev, volume }));
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioState.isMuted;
    }
    setAudioState(prev => ({ ...prev, isMuted: !prev.isMuted }));
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const getDuration = () => {
    return audioRef.current?.duration || 0;
  };

  const getCurrentTime = () => {
    return audioRef.current?.currentTime || 0;
  };

  const contextValue: AudioContextType = {
    ...audioState,
    play,
    pause,
    stop,
    setVolume,
    toggleMute,
    seek,
    getDuration,
    getCurrentTime,
  };

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
};
