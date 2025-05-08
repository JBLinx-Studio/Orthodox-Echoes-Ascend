
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

// Define audio tracks list with reliable sources from St. Anthony's Monastery
const AUDIO_TRACKS = [
  {
    name: "Christ is Risen",
    src: "http://music.samonastery.org/Chrys/0125_Christ_is_Risen.mp3",
    description: "Byzantine Notation - Elizabethan Divine Liturgy",
    length: "1:45",
    icon: "✝️"
  },
  {
    name: "Through the Intercessions",
    src: "http://music.samonastery.org/Chrys/0230_Through.mp3",
    description: "Byzantine Notation - Elizabethan Divine Liturgy",
    length: "1:20",
    icon: "🙏"
  },
  {
    name: "Arise, O God",
    src: "http://music.samonastery.org/Arise,%20O%20God.mp3",
    description: "Instead of Alleluia on Holy Saturday",
    length: "2:30",
    icon: "⭐"
  },
  {
    name: "Cherubic Hymn: Plagal Fifth Mode (Gregory)",
    src: "http://music.samonastery.org/Chrys/0460_Cherubic_Hymn-Mode_5-Gregory.mp3",
    description: "By Hieromonk Gregory",
    length: "5:10",
    icon: "👼"
  },
  {
    name: "Cherubic Hymn: Plagal Fifth Mode (Petros)",
    src: "http://music.samonastery.org/b0475_Cherubic%20Hymn-Mode5-Petros.mp3",
    description: "By Theodore Phokaeus",
    length: "4:25",
    icon: "🕯️"
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

// Custom toast configuration to override the default position
const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
  toast(message, {
    position: "top-center",
    duration: 3000,
    className: `toast-${type}`,
    closeButton: true,
    style: {
      background: type === 'success' ? '#F2FCE2' :
                 type === 'error' ? '#FFDEE2' :
                 type === 'warning' ? '#FEF7CD' : '#FEC6A1',
      color: type === 'success' ? '#2F7C31' :
             type === 'error' ? '#C53030' :
             type === 'warning' ? '#975A16' : '#9C4221',
      border: `1px solid ${
        type === 'success' ? '#C6F6D5' :
        type === 'error' ? '#FED7D7' :
        type === 'warning' ? '#FEFCBF' : '#FED7AA'
      }`,
      fontSize: '0.875rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
    }
  });
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [isMinimized, setIsMinimized] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [reverbEnabled, setReverbEnabled] = useState(false); 
  const [reverbAmount, setReverbAmount] = useState(30);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const reverbNodeRef = useRef<ConvolverNode | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Initialize audio element on mount
  useEffect(() => {
    // Create a new audio element
    const audio = new Audio();
    audio.crossOrigin = "anonymous"; // Enable CORS for all audio loading
    audioRef.current = audio;
    
    // Safely set the source - check if the index is valid before accessing
    if (AUDIO_TRACKS.length > 0) {
      const currentValidIndex = Math.max(0, Math.min(currentTrackIndex, AUDIO_TRACKS.length - 1));
      
      if (currentValidIndex !== currentTrackIndex) {
        console.log("Track index out of bounds, resetting to valid index:", currentValidIndex);
        setCurrentTrackIndex(currentValidIndex);
      }
      
      // Set the audio source
      audio.src = AUDIO_TRACKS[currentValidIndex].src;
      audio.volume = volume / 100;
      audio.preload = "auto";
      audio.load();
      
      console.log("Audio source set to:", audio.src);
      
      // Set up Web Audio API for effects processing
      setupWebAudioAPI();
    }
    
    // Set up audio error handler
    const handleError = (e: Event) => {
      console.error("Audio error:", e);
      const audioElement = e.target as HTMLAudioElement;
      let errorMessage = "Error loading audio";
      
      if (audioElement && audioElement.error) {
        switch (audioElement.error.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            errorMessage = "Audio playback was aborted";
            break;
          case MediaError.MEDIA_ERR_NETWORK:
            errorMessage = "Network error while loading audio. Try again later.";
            break;
          case MediaError.MEDIA_ERR_DECODE:
            errorMessage = "Audio decoding error";
            break;
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMessage = "This audio format is not supported by your browser";
            break;
          default:
            errorMessage = `Unknown audio error with: ${AUDIO_TRACKS[currentTrackIndex].name}`;
        }
      }
      
      showToast(errorMessage, 'error');
      setIsPlaying(false);
      
      // Try to play next track automatically after error
      setTimeout(() => {
        nextTrack();
      }, 2000);
    };
    
    // Set up ended event to play next track
    const handleEnded = () => {
      nextTrack();
    };
    
    // Handle canplaythrough event to know when audio is ready
    const handleCanPlayThrough = () => {
      console.log("Audio can play through");
    };
    
    if (audioRef.current) {
      audioRef.current.addEventListener('error', handleError as EventListener);
      audioRef.current.addEventListener('ended', handleEnded);
      audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('error', handleError as EventListener);
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
      }
      
      // Clean up Web Audio API
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(console.error);
      }
      
      // Clear any pending toasts
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);
  
  // Set up Web Audio API for audio effects
  const setupWebAudioAPI = () => {
    if (!audioRef.current) return;
    
    try {
      // Create audio context
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        console.warn("Web Audio API not supported - reverb effects will not work");
        return;
      }
      
      audioContextRef.current = new AudioContextClass();
      
      // Create source node from audio element
      sourceNodeRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
      
      // Create gain node for volume control
      gainNodeRef.current = audioContextRef.current.createGain();
      
      // Connect source to gain
      sourceNodeRef.current.connect(gainNodeRef.current);
      
      // Connect gain to output (speakers)
      gainNodeRef.current.connect(audioContextRef.current.destination);
      
      // Create reverb node
      reverbNodeRef.current = audioContextRef.current.createConvolver();
      
      // Create a simple impulse response instead of fetching (more reliable)
      createFallbackReverb();
      
      // Set initial volume
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.value = volume / 100;
      }
      
      console.log("Web Audio API setup completed successfully");
    } catch (error) {
      console.error("Error setting up Web Audio API:", error);
    }
  };
  
  // Create a simple impulse response as fallback for reverb
  const createFallbackReverb = () => {
    if (!audioContextRef.current || !reverbNodeRef.current) return;
    
    try {
      const sampleRate = audioContextRef.current.sampleRate;
      const length = 2 * sampleRate; // 2 seconds
      const impulse = audioContextRef.current.createBuffer(2, length, sampleRate);
      const leftChannel = impulse.getChannelData(0);
      const rightChannel = impulse.getChannelData(1);
      
      // Create a simple exponential decay
      for (let i = 0; i < length; i++) {
        const t = i / sampleRate;
        const decay = Math.exp(-t * 3); // Decay factor
        leftChannel[i] = (Math.random() * 2 - 1) * decay;
        rightChannel[i] = (Math.random() * 2 - 1) * decay;
      }
      
      reverbNodeRef.current.buffer = impulse;
      console.log("Created fallback reverb impulse response");
    } catch (error) {
      console.error("Error creating fallback reverb:", error);
    }
  };
  
  // Update the audio routing chain based on effects settings
  const updateAudioChain = () => {
    if (!sourceNodeRef.current || !gainNodeRef.current || !reverbNodeRef.current || !audioContextRef.current) {
      return;
    }
    
    // Disconnect existing connections
    sourceNodeRef.current.disconnect();
    gainNodeRef.current.disconnect();
    
    if (reverbEnabled && reverbNodeRef.current.buffer) {
      // Create wet/dry mix for reverb
      const dryGain = audioContextRef.current.createGain();
      const wetGain = audioContextRef.current.createGain();
      
      // Set wet/dry mix based on reverbAmount
      dryGain.gain.value = 1 - (reverbAmount / 100) * 0.7; // Limit max wet to 70%
      wetGain.gain.value = (reverbAmount / 100) * 0.7;
      
      // Connect source to both wet and dry paths
      sourceNodeRef.current.connect(dryGain);
      sourceNodeRef.current.connect(reverbNodeRef.current);
      reverbNodeRef.current.connect(wetGain);
      
      // Connect both to output via gain node (for volume control)
      dryGain.connect(gainNodeRef.current);
      wetGain.connect(gainNodeRef.current);
      
      // Connect gain to destination
      gainNodeRef.current.connect(audioContextRef.current.destination);
    } else {
      // Simple connection without reverb
      sourceNodeRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(audioContextRef.current.destination);
    }
  };
  
  // Handle track changes
  useEffect(() => {
    if (!audioRef.current) return;
    
    // Safely get the current track
    if (currentTrackIndex >= 0 && currentTrackIndex < AUDIO_TRACKS.length) {
      const wasPlaying = isPlaying;
      
      audioRef.current.pause();
      audioRef.current.src = AUDIO_TRACKS[currentTrackIndex].src;
      audioRef.current.crossOrigin = "anonymous"; // Important for CORS
      audioRef.current.load();
      
      // Resume playback if it was playing
      if (wasPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.error("Error playing audio after track change:", err);
            setIsPlaying(false);
            showToast("Could not play audio. Please try again.", 'error');
          });
        }
      }
    }
  }, [currentTrackIndex]);
  
  // Update reverb effect when enabled/disabled or amount changes
  useEffect(() => {
    updateAudioChain();
    
    if (isPlaying) {
      if (reverbEnabled) {
        showToast("Cathedral Reverb Enabled", 'success');
      } else {
        showToast("Cathedral Reverb Disabled", 'info');
      }
    }
  }, [reverbEnabled, reverbAmount]);
  
  // Toggle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Resume audio context if suspended (required by browsers after user interaction)
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume().catch(console.error);
      }
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
          showToast(`Playing: ${AUDIO_TRACKS[currentTrackIndex].name}`, 'success');
        }).catch(err => {
          console.error("Error playing audio:", err);
          showToast("Could not play audio. Please try again or select another track.", 'error');
        });
      }
    }
  };
  
  // Update volume
  const updateVolume = (newVolume: number) => {
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }
    setVolume(newVolume);
    
    // Update HTML Audio element volume
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
    
    // Update Web Audio API gain node
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = newVolume / 100;
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
    
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = 0;
    }
    
    setIsMuted(true);
    showToast("Audio muted", 'info');
  };
  
  const unmuteAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
    
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume / 100;
    }
    
    setIsMuted(false);
    showToast("Audio unmuted", 'info');
  };
  
  const nextTrack = () => {
    // Safely increment track index with boundary check
    if (AUDIO_TRACKS.length === 0) return;
    const nextIndex = (currentTrackIndex + 1) % AUDIO_TRACKS.length;
    setCurrentTrackIndex(nextIndex);
    showToast(`Now playing: ${AUDIO_TRACKS[nextIndex].name}`, 'info');
  };
  
  const prevTrack = () => {
    // Safely decrement track index with boundary check
    if (AUDIO_TRACKS.length === 0) return;
    const prevIndex = (currentTrackIndex - 1 + AUDIO_TRACKS.length) % AUDIO_TRACKS.length;
    setCurrentTrackIndex(prevIndex);
    showToast(`Now playing: ${AUDIO_TRACKS[prevIndex].name}`, 'info');
  };
  
  // Update volume when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
    
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);
  
  // Handle play/pause when isPlaying changes
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      // Resume audio context if suspended
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume().catch(console.error);
      }
      
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
      
      {/* Add custom styles for the toast notifications */}
      <style jsx global>{`
        /* Toast styles overrides */
        [data-sonner-toaster] {
          --offset: 5rem !important;
          --width: auto !important;
          --min-width: 300px !important;
        }
        
        .toast-success [data-sonner-toast] {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
        }
        
        .toast-error [data-sonner-toast] {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        }
        
        [data-sonner-toast][data-styled=true] {
          padding: 12px 16px !important;
          border-radius: 8px !important;
        }
      `}</style>
    </AudioContext.Provider>
  );
}
