
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { EnhancedAudioPlayer } from '@/components/audio/EnhancedAudioPlayer';
import { toast } from 'sonner';

type AudioContextType = {
  isPlaying: boolean;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  volume: number;
  minimizePlayer: () => void;
  expandPlayer: () => void;
  isMinimized: boolean;
  currentTrackIndex: number;
  setCurrentTrackIndex: (index: number) => void;
  reverbEnabled: boolean;
  toggleReverb: () => void;
  reverbAmount: number;
  setReverbAmount: (amount: number) => void;
  muteAudio: () => void;
  unmuteAudio: () => void;
  isMuted: boolean;
  nextTrack: () => void;
  prevTrack: () => void;
  playlist: typeof AUDIO_TRACKS;
};

// Define audio tracks list with reliable sources
const AUDIO_TRACKS = [
  {
    name: "Cherubic Hymn",
    src: "https://ia800904.us.archive.org/12/items/AgniParthene_201608/Cherubic%20Hymn%20-%20Russian%20Orthodox%20Choir.mp3",
    description: "Traditional Byzantine chant from the Divine Liturgy",
    length: "3:56",
    icon: "🕯️"
  },
  {
    name: "Agni Parthene",
    src: "https://ia800505.us.archive.org/26/items/AgniPartheneversionAbbessKassiani/AgniParthene-versionAbbessKassiani.mp3",
    description: "Beautiful hymn dedicated to the Theotokos by St. Nectarios",
    length: "5:32",
    icon: "✝️"
  },
  {
    name: "Kyrie Eleison",
    src: "https://ia802905.us.archive.org/3/items/YouTube_20180829_94/Kyrie_Eleison_Byzantine_Chant.mp3",
    description: "Lord have mercy, the thrice-sung plea for divine mercy",
    length: "4:20",
    icon: "🙏"
  },
  {
    name: "Byzantine Choir",
    src: "https://ia800906.us.archive.org/14/items/GreekOrthodoxByzantineChant-MusicCollection/Greek%20Orthodox%20Byzantine%20Chant%20-%20Doxology.mp3",
    description: "Traditional Orthodox choir chanting",
    length: "6:10",
    icon: "⭐"
  },
  {
    name: "Paschal Troparion",
    src: "https://ia800901.us.archive.org/25/items/ByzantineChant-MusicOfTheByzantineChurch/ByzantineChant-MusicOfTheByzantineChurch01.mp3",
    description: "Christ is risen from the dead",
    length: "3:47",
    icon: "🔥"
  }
];

const AudioContext = createContext<AudioContextType>({
  isPlaying: false,
  togglePlay: () => {},
  setVolume: () => {},
  volume: 30,
  minimizePlayer: () => {},
  expandPlayer: () => {},
  isMinimized: true,
  currentTrackIndex: 0,
  setCurrentTrackIndex: () => {},
  reverbEnabled: false,
  toggleReverb: () => {},
  reverbAmount: 30,
  setReverbAmount: () => {},
  muteAudio: () => {},
  unmuteAudio: () => {},
  isMuted: false,
  nextTrack: () => {},
  prevTrack: () => {},
  playlist: AUDIO_TRACKS,
});

export const useAudio = () => useContext(AudioContext);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [isMinimized, setIsMinimized] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [reverbEnabled, setReverbEnabled] = useState(true); 
  const [reverbAmount, setReverbAmount] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio element on mount
  useEffect(() => {
    // Create a new audio element
    const audio = new Audio();
    audioRef.current = audio;
    
    // Safely set the source - check if the index is valid before accessing
    if (AUDIO_TRACKS.length > 0) {
      // Ensure currentTrackIndex is valid
      const currentValidIndex = Math.max(0, Math.min(currentTrackIndex, AUDIO_TRACKS.length - 1));
      
      if (currentValidIndex !== currentTrackIndex) {
        console.warn("Track index out of bounds, resetting to valid index:", currentValidIndex);
        setCurrentTrackIndex(currentValidIndex);
      }
      
      // Verify we have a valid track before trying to play it
      if (currentValidIndex >= 0 && currentValidIndex < AUDIO_TRACKS.length) {
        const trackToPlay = AUDIO_TRACKS[currentValidIndex];
        if (trackToPlay && trackToPlay.src) {
          audio.src = trackToPlay.src;
          audio.volume = volume / 100;
          console.log("Audio source set to:", audio.src);
        } else {
          console.error("Invalid track data at index:", currentValidIndex);
          findValidTrackFallback(audio);
        }
      } else {
        console.error("Track index out of bounds:", currentValidIndex);
        findValidTrackFallback(audio);
      }
    } else {
      console.error("Empty playlist");
      toast.error("No audio tracks available");
    }
    
    // Set up audio error handler
    const handleError = (e: ErrorEvent) => {
      console.error("Audio error:", e);
      const trackName = currentTrackIndex >= 0 && currentTrackIndex < AUDIO_TRACKS.length
        ? AUDIO_TRACKS[currentTrackIndex].name 
        : "Unknown track";
      toast.error(`Could not play audio: ${trackName}`);
      setIsPlaying(false);
      
      // Try to play next track automatically after error
      setTimeout(() => {
        nextTrack();
      }, 2000);
    };
    
    if (audioRef.current) {
      audioRef.current.addEventListener('error', handleError as EventListener);
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('error', handleError as EventListener);
      }
    };
  }, []);
  
  // Function to find a valid track as fallback
  const findValidTrackFallback = (audioElement: HTMLAudioElement) => {
    // Try to find a valid track
    const firstValidTrack = AUDIO_TRACKS.findIndex(track => track && track.src);
    if (firstValidTrack >= 0) {
      console.info("Falling back to first valid track at index:", firstValidTrack);
      setCurrentTrackIndex(firstValidTrack);
      audioElement.src = AUDIO_TRACKS[firstValidTrack].src;
    } else {
      console.error("No valid tracks found in playlist");
      toast.error("No valid audio tracks available");
    }
  };
  
  // Handle track changes
  useEffect(() => {
    if (!audioRef.current) return;
    
    // Safely get the current track
    if (AUDIO_TRACKS.length === 0) {
      console.error("Empty playlist");
      return;
    }
    
    const currentValidIndex = Math.max(0, Math.min(currentTrackIndex, AUDIO_TRACKS.length - 1));
    if (currentValidIndex !== currentTrackIndex) {
      console.warn("Track index out of bounds, using:", currentValidIndex);
      setCurrentTrackIndex(currentValidIndex);
    }
    
    // Verify we have a valid track before trying to play it
    if (currentValidIndex >= 0 && currentValidIndex < AUDIO_TRACKS.length) {
      const track = AUDIO_TRACKS[currentValidIndex];
      if (!track || !track.src) {
        console.error("Invalid track data at index:", currentValidIndex);
        const firstValidTrack = AUDIO_TRACKS.findIndex(track => track && track.src);
        if (firstValidTrack >= 0) {
          console.info("Falling back to first valid track");
          setCurrentTrackIndex(firstValidTrack);
          return;
        } else {
          toast.error("No valid audio tracks available");
          return;
        }
      }
      
      audioRef.current.pause();
      audioRef.current.src = track.src;
      audioRef.current.load();
      
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.error("Error playing audio:", err);
            setIsPlaying(false);
            toast.error("Could not play audio. Please try again.");
          });
        }
      }
    } else {
      console.error("Track index out of bounds, no valid track available");
      toast.error("No valid track available");
    }
  }, [currentTrackIndex]);
  
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Pre-check if we have a valid src before attempting to play
      if (!audioRef.current.src || audioRef.current.src === 'about:blank') {
        // Try to set a valid source if missing
        const currentValidIndex = Math.max(0, Math.min(currentTrackIndex, AUDIO_TRACKS.length - 1));
        if (currentValidIndex >= 0 && currentValidIndex < AUDIO_TRACKS.length && AUDIO_TRACKS[currentValidIndex].src) {
          audioRef.current.src = AUDIO_TRACKS[currentValidIndex].src;
          audioRef.current.load();
        } else {
          toast.error("No valid audio source. Please try another track.");
          return;
        }
      }
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
          console.log("Audio playing successfully");
        }).catch(err => {
          console.error("Error playing audio:", err);
          toast.error("Could not play audio. Please try again.");
          
          // Try another track automatically
          setTimeout(() => {
            nextTrack();
          }, 2000);
        });
      }
    }
  };
  
  const updateVolume = (newVolume: number) => {
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };
  
  const minimizePlayer = () => {
    setIsMinimized(true);
  };
  
  const expandPlayer = () => {
    setIsMinimized(false);
  };
  
  const toggleReverb = () => {
    setReverbEnabled(!reverbEnabled);
  };
  
  const muteAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0;
    }
    setIsMuted(true);
  };
  
  const unmuteAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
    setIsMuted(false);
  };
  
  const nextTrack = () => {
    // Safely increment track index with boundary check
    if (AUDIO_TRACKS.length === 0) return;
    const nextIndex = (currentTrackIndex + 1) % AUDIO_TRACKS.length;
    setCurrentTrackIndex(nextIndex);
  };
  
  const prevTrack = () => {
    // Safely decrement track index with boundary check
    if (AUDIO_TRACKS.length === 0) return;
    const prevIndex = (currentTrackIndex - 1 + AUDIO_TRACKS.length) % AUDIO_TRACKS.length;
    setCurrentTrackIndex(prevIndex);
  };
  
  // Update volume when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);
  
  // Handle play/pause when isPlaying changes
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.error("Error playing audio:", err);
          setIsPlaying(false);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  
  // Close player on route change
  useEffect(() => {
    const cleanup = () => {
      if (!isMinimized) {
        setIsMinimized(true);
      }
    };
    
    return cleanup;
  }, []);
  
  return (
    <AudioContext.Provider 
      value={{ 
        isPlaying, 
        togglePlay, 
        setVolume: updateVolume, 
        volume,
        minimizePlayer,
        expandPlayer,
        isMinimized,
        currentTrackIndex,
        setCurrentTrackIndex,
        reverbEnabled,
        toggleReverb,
        reverbAmount,
        setReverbAmount,
        muteAudio,
        unmuteAudio,
        isMuted,
        nextTrack,
        prevTrack,
        playlist: AUDIO_TRACKS
      }}
    >
      {children}
      <EnhancedAudioPlayer 
        autoplay={false}
        initialVolume={volume}
        minimized={isMinimized}
        className="fixed bottom-0 right-0 z-50 w-full md:w-auto md:right-4 md:bottom-4"
      />
    </AudioContext.Provider>
  );
}
