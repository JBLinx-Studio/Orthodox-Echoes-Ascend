
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

// Define audio tracks list with reliable sources that are known to work
const AUDIO_TRACKS = [
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
  },
  {
    name: "Holy God (Trisagion)",
    src: "https://ia801504.us.archive.org/29/items/holy-god-trisagion-hymn-byzantine-chant/Holy%20God%20%28Trisagion%20Hymn%29%20-%20Byzantine%20Chant.mp3",
    description: "The thrice-holy hymn sung during Divine Liturgy",
    length: "2:55",
    icon: "☦️"
  },
  {
    name: "The Great Doxology",
    src: "https://ia800906.us.archive.org/14/items/GreekOrthodoxByzantineChant-MusicCollection/Greek%20Orthodox%20Byzantine%20Chant%20-%20Doxology.mp3",
    description: "Glory to God in the highest, and on earth peace",
    length: "6:10",
    icon: "⭐"
  },
  {
    name: "Paschal Troparion",
    src: "https://ia800901.us.archive.org/25/items/ByzantineChant-MusicOfTheByzantineChurch/ByzantineChant-MusicOfTheByzantineChurch04.mp3",
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
  const [reverbEnabled, setReverbEnabled] = useState(false); 
  const [reverbAmount, setReverbAmount] = useState(30);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const reverbNodeRef = useRef<ConvolverNode | null>(null);
  
  // Initialize audio element on mount
  useEffect(() => {
    // Create a new audio element
    const audio = new Audio();
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
      
      // Preload the audio (but don't autoplay yet)
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
            errorMessage = "Network error occurred while loading audio";
            break;
          case MediaError.MEDIA_ERR_DECODE:
            errorMessage = "Audio decoding error";
            break;
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMessage = "Audio format not supported";
            break;
          default:
            errorMessage = `Unknown audio error with: ${AUDIO_TRACKS[currentTrackIndex].name}`;
        }
      }
      
      toast.error(errorMessage);
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
    
    if (audioRef.current) {
      audioRef.current.addEventListener('error', handleError as EventListener);
      audioRef.current.addEventListener('ended', handleEnded);
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('error', handleError as EventListener);
        audioRef.current.removeEventListener('ended', handleEnded);
      }
      
      // Clean up Web Audio API
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(console.error);
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
      
      // Create reverb node
      reverbNodeRef.current = audioContextRef.current.createConvolver();
      
      // Load impulse response for reverb
      fetch('https://ia601606.us.archive.org/13/items/BabyOceanJoMitchell/saint-marys-abbey_44100.mp3')
        .then(response => {
          if (!response.ok) throw new Error("Failed to load reverb impulse response");
          return response.arrayBuffer();
        })
        .then(arrayBuffer => {
          if (!audioContextRef.current) return;
          return audioContextRef.current.decodeAudioData(arrayBuffer);
        })
        .then(audioBuffer => {
          if (reverbNodeRef.current && audioBuffer) {
            reverbNodeRef.current.buffer = audioBuffer;
            console.log("Reverb impulse response loaded successfully");
            
            // Update audio chain if reverb is enabled
            if (reverbEnabled) {
              updateAudioChain();
            }
          }
        })
        .catch(error => {
          console.error("Error loading reverb impulse response:", error);
          createFallbackReverb();
        });
      
      // Initial connection (without reverb)
      sourceNodeRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(audioContextRef.current.destination);
      
      // Set initial volume
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.value = volume / 100;
      }
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
      audioRef.current.load();
      
      // Resume playback if it was playing
      if (wasPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.error("Error playing audio after track change:", err);
            setIsPlaying(false);
            toast.error("Could not play audio. Please try again.");
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
        toast.success("Cathedral Reverb Enabled", { duration: 2000 });
      } else {
        toast.info("Cathedral Reverb Disabled", { duration: 2000 });
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
          toast.success(`Playing: ${AUDIO_TRACKS[currentTrackIndex].name}`);
        }).catch(err => {
          console.error("Error playing audio:", err);
          toast.error("Could not play audio. Please try again.");
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
    toast.info("Audio muted", { duration: 2000 });
  };
  
  const unmuteAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
    
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume / 100;
    }
    
    setIsMuted(false);
    toast.info("Audio unmuted", { duration: 2000 });
  };
  
  const nextTrack = () => {
    // Safely increment track index with boundary check
    if (AUDIO_TRACKS.length === 0) return;
    const nextIndex = (currentTrackIndex + 1) % AUDIO_TRACKS.length;
    setCurrentTrackIndex(nextIndex);
    toast.info(`Now playing: ${AUDIO_TRACKS[nextIndex].name}`);
  };
  
  const prevTrack = () => {
    // Safely decrement track index with boundary check
    if (AUDIO_TRACKS.length === 0) return;
    const prevIndex = (currentTrackIndex - 1 + AUDIO_TRACKS.length) % AUDIO_TRACKS.length;
    setCurrentTrackIndex(prevIndex);
    toast.info(`Now playing: ${AUDIO_TRACKS[prevIndex].name}`);
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
    </AudioContext.Provider>
  );
}
