
import { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Music,
  Info,
  Maximize2,
  Minimize2,
  Headphones,
  Waves
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useAudio } from '@/contexts/AudioContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Import audio files
// These files use publicly available Byzantine chants from Internet Archive
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
    name: "The Great Doxology",
    src: "https://ia800906.us.archive.org/14/items/GreekOrthodoxByzantineChant-MusicCollection/Greek%20Orthodox%20Byzantine%20Chant%20-%20Doxology.mp3",
    description: "Glory to God in the highest, and on earth peace",
    length: "6:10",
    icon: "⭐"
  },
  {
    name: "Orthodox Christian Chant",
    src: "https://ia800901.us.archive.org/25/items/ByzantineChant-MusicOfTheByzantineChurch/ByzantineChant-MusicOfTheByzantineChurch01.mp3",
    description: "Ancient Byzantine chant tradition",
    length: "5:23",
    icon: "☦️"
  },
  {
    name: "Paschal Troparion",
    src: "https://ia800901.us.archive.org/25/items/ByzantineChant-MusicOfTheByzantineChurch/ByzantineChant-MusicOfTheByzantineChurch04.mp3",
    description: "Christ is risen from the dead",
    length: "3:47",
    icon: "🔥"
  },
  {
    name: "Axion Estin (It is Truly Meet)",
    src: "https://ia800901.us.archive.org/25/items/ByzantineChant-MusicOfTheByzantineChurch/ByzantineChant-MusicOfTheByzantineChurch05.mp3",
    description: "Hymn to the Theotokos sung during Divine Liturgy",
    length: "4:32",
    icon: "👑"
  }
];

interface EnhancedAudioPlayerProps {
  autoplay?: boolean;
  initialVolume?: number;
  className?: string;
  minimized?: boolean;
}

export function EnhancedAudioPlayer({ 
  autoplay = false,
  initialVolume = 40,
  className,
  minimized: externalMinimized
}: EnhancedAudioPlayerProps) {
  const { 
    isPlaying, 
    togglePlay, 
    volume, 
    setVolume,
    isMinimized, 
    minimizePlayer, 
    expandPlayer,
    currentTrackIndex,
    setCurrentTrackIndex,
    reverbEnabled,
    toggleReverb,
    reverbAmount,
    setReverbAmount
  } = useAudio();
  
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const reverbNodeRef = useRef<ConvolverNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const previousVolumeRef = useRef(volume);

  // Create audio context for effects processing
  useEffect(() => {
    // Only create AudioContext after user interaction to avoid autoplay policy issues
    const setupAudioContext = () => {
      if (!audioContextRef.current && audioRef.current) {
        try {
          // Create audio context
          const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
          audioContextRef.current = new AudioContext();
          
          // Create source node from audio element
          sourceNodeRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
          
          // Create gain node for volume control
          gainNodeRef.current = audioContextRef.current.createGain();
          
          // Connect source to gain
          sourceNodeRef.current.connect(gainNodeRef.current);
          
          // Connect gain to output (speakers)
          gainNodeRef.current.connect(audioContextRef.current.destination);
          
          // Set initial volume
          if (gainNodeRef.current) {
            gainNodeRef.current.gain.value = volume / 100;
          }
          
          // Create reverb node (we'll load the impulse response later)
          reverbNodeRef.current = audioContextRef.current.createConvolver();
          
          // Load impulse response
          fetch('https://ia601606.us.archive.org/13/items/BabyOceanJoMitchell/saint-marys-abbey_44100.mp3')
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => audioContextRef.current?.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
              if (reverbNodeRef.current) {
                reverbNodeRef.current.buffer = audioBuffer;
                console.log("Reverb impulse response loaded successfully");
              }
            })
            .catch(error => {
              console.error("Error loading reverb impulse response:", error);
              // Use a simple fallback impulse response
              createFallbackReverb();
            });
            
          document.removeEventListener('click', setupAudioContext);
          document.removeEventListener('touchstart', setupAudioContext);
        } catch (error) {
          console.error("Error setting up Web Audio API:", error);
        }
      }
    };
    
    // Create a simple impulse response as fallback
    const createFallbackReverb = () => {
      if (!audioContextRef.current || !reverbNodeRef.current) return;
      
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
    };
    
    document.addEventListener('click', setupAudioContext);
    document.addEventListener('touchstart', setupAudioContext);
    
    return () => {
      document.removeEventListener('click', setupAudioContext);
      document.removeEventListener('touchstart', setupAudioContext);
      
      // Clean up audio context
      if (audioContextRef.current?.state !== 'closed') {
        audioContextRef.current?.close();
      }
    };
  }, [volume]);

  // Update reverb effect when enabled/disabled
  useEffect(() => {
    if (!sourceNodeRef.current || !gainNodeRef.current || !reverbNodeRef.current || !audioContextRef.current) {
      return;
    }
    
    // Disconnect existing connections
    sourceNodeRef.current.disconnect();
    
    if (reverbEnabled) {
      // Create a wet/dry mix for reverb
      const dryGain = audioContextRef.current.createGain();
      const wetGain = audioContextRef.current.createGain();
      
      // Set wet/dry mix based on reverbAmount
      dryGain.gain.value = 1 - (reverbAmount / 100) * 0.7; // Limit max wet to 70%
      wetGain.gain.value = (reverbAmount / 100) * 0.7;
      
      // Connect source to both wet and dry paths
      sourceNodeRef.current.connect(dryGain);
      sourceNodeRef.current.connect(reverbNodeRef.current);
      reverbNodeRef.current.connect(wetGain);
      
      // Connect both to output
      dryGain.connect(gainNodeRef.current);
      wetGain.connect(gainNodeRef.current);
      
      // Connect gain to destination
      gainNodeRef.current.connect(audioContextRef.current.destination);
      
      toast.success("Cathedral Reverb Enabled", { duration: 2000 });
    } else {
      // Simple connection without reverb
      sourceNodeRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(audioContextRef.current.destination);
      
      if (isPlaying) {
        toast.info("Cathedral Reverb Disabled", { duration: 2000 });
      }
    }
  }, [reverbEnabled, reverbAmount, isPlaying]);

  // Initialize audio player
  useEffect(() => {
    const audio = new Audio();
    audio.src = AUDIO_TRACKS[currentTrackIndex].src;
    audioRef.current = audio;
    
    const handleCanPlayThrough = () => {
      setIsLoading(false);
      if (autoplay) {
        void audio.play().catch(handlePlayError);
        togglePlay();
      }
      audio.volume = isMuted ? 0 : volume / 100;
    };
    
    const handleLoadStart = () => {
      setIsLoading(true);
    };
    
    const handleEnded = () => {
      nextTrack();
    };
    
    const handleDurationChange = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(formatTime(audio.duration));
      }
    };
    
    // Handle audio errors with specific error messages
    const handleAudioError = (event: Event) => {
      console.error("Audio error:", event);
      const audioElement = event.target as HTMLAudioElement;
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
            errorMessage = `Unknown audio error: ${AUDIO_TRACKS[currentTrackIndex].name}`;
        }
      }
      
      toast.error(errorMessage);
      setIsLoading(false);
      
      // Try next track automatically
      setTimeout(() => {
        nextTrack();
      }, 2000);
    };
    
    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('error', handleAudioError);
    
    // Load audio metadata
    audio.load();
    
    // Set up progress tracking
    startProgressTracking();
    
    return () => {
      stopProgressTracking();
      audio.pause();
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('error', handleAudioError);
    };
  }, [currentTrackIndex, autoplay, volume, isMuted, togglePlay]);

  // Update volume when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
    
    // Update audio context gain if available
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  // Handle external minimized state changes
  useEffect(() => {
    if (externalMinimized !== undefined) {
      if (externalMinimized) {
        minimizePlayer();
      } else {
        expandPlayer();
      }
    }
  }, [externalMinimized, minimizePlayer, expandPlayer]);

  // Handle play/pause state changes
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(handlePlayError);
      }
      
      // Resume audio context if suspended
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const startProgressTracking = () => {
    if (progressIntervalRef.current) {
      window.clearInterval(progressIntervalRef.current);
    }
    
    progressIntervalRef.current = window.setInterval(() => {
      if (audioRef.current && !audioRef.current.paused) {
        const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        if (!isNaN(currentProgress)) {
          setProgress(currentProgress);
          setCurrentTime(formatTime(audioRef.current.currentTime));
        }
      }
    }, 1000);
  };

  const stopProgressTracking = () => {
    if (progressIntervalRef.current) {
      window.clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handlePlayError = (error: any) => {
    console.error("Error playing audio:", error);
    toast.error("Could not play audio. Please try another track.");
    togglePlay();
    
    // Try next track automatically
    setTimeout(() => {
      nextTrack();
    }, 2000);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      setVolume(previousVolumeRef.current);
      audioRef.current.volume = previousVolumeRef.current / 100;
      setIsMuted(false);
      toast.info("Audio unmuted", { duration: 2000 });
    } else {
      previousVolumeRef.current = volume;
      audioRef.current.volume = 0;
      setVolume(0);
      setIsMuted(true);
      toast.info("Audio muted", { duration: 2000 });
    }
  };

  const handleVolumeChange = (newValue: number[]) => {
    const newVolume = newValue[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
    setIsMuted(newVolume === 0);
    
    if (newVolume === 0) {
      toast.info("Audio muted", { duration: 2000 });
    } else if (isMuted) {
      toast.info("Audio unmuted", { duration: 2000 });
    }
  };

  const handleProgressChange = (newValue: number[]) => {
    if (!audioRef.current || !audioRef.current.duration) return;
    
    const newProgress = newValue[0];
    const newTime = (audioRef.current.duration / 100) * newProgress;
    
    if (!isNaN(newTime)) {
      audioRef.current.currentTime = newTime;
      setProgress(newProgress);
      setCurrentTime(formatTime(newTime));
    }
  };

  const loadTrack = (index: number) => {
    if (!audioRef.current) return;
    
    const wasPlaying = isPlaying;
    if (isPlaying) {
      togglePlay();
    }
    audioRef.current.pause();
    setProgress(0);
    setCurrentTime("0:00");
    setDuration("0:00");
    setIsLoading(true);
    
    setCurrentTrackIndex(index);
    audioRef.current.src = AUDIO_TRACKS[index].src;
    audioRef.current.load();
    
    const handleCanPlayThroughAfterLoad = () => {
      setIsLoading(false);
      if (wasPlaying) {
        void audioRef.current?.play().catch(handlePlayError);
        if (!isPlaying) {
          togglePlay();
        }
        toast.success(`Now playing: ${AUDIO_TRACKS[index].name}`, { duration: 3000 });
      } else {
        toast.info(`Ready to play: ${AUDIO_TRACKS[index].name}`, { duration: 3000 });
      }
      
      if (audioRef.current) {
        audioRef.current.removeEventListener('canplaythrough', handleCanPlayThroughAfterLoad);
      }
    };
    
    audioRef.current.addEventListener('canplaythrough', handleCanPlayThroughAfterLoad);
  };

  const nextTrack = () => {
    const newIndex = (currentTrackIndex + 1) % AUDIO_TRACKS.length;
    loadTrack(newIndex);
  };

  const prevTrack = () => {
    const newIndex = (currentTrackIndex - 1 + AUDIO_TRACKS.length) % AUDIO_TRACKS.length;
    loadTrack(newIndex);
  };
  
  const handleReverbAmountChange = (newValue: number[]) => {
    setReverbAmount(newValue[0]);
  };

  // Render minimal player when minimized
  if (isMinimized) {
    return (
      <div className={cn(
        "fixed bottom-4 right-4 z-40 flex items-center gap-2 p-3 bg-[#1A1F2C]/95 backdrop-blur-sm rounded-full border border-gold/30 shadow-lg holy-glow-sm",
        className
      )}>
        <span className="text-xs font-medium text-gold/80 max-w-28 truncate mr-1">
          {AUDIO_TRACKS[currentTrackIndex].icon} {AUDIO_TRACKS[currentTrackIndex].name}
        </span>
        
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full text-gold hover:text-gold hover:bg-gold/10"
          onClick={togglePlay}
        >
          {isLoading ? (
            <div className="h-4 w-4 rounded-full border-2 border-r-transparent border-gold animate-spin"></div>
          ) : isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full text-gold hover:text-gold hover:bg-gold/10"
          onClick={expandPlayer}
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className={cn(
      "transition-all duration-500 backdrop-filter backdrop-blur-sm holy-light overflow-hidden",
      isExpanded 
        ? "bg-[#1A1F2C]/95 rounded-lg border border-gold/30 shadow-2xl" 
        : "bg-[#1A1F2C]/90 rounded-full border border-gold/20 shadow-lg",
      className
    )}>
      <div className={cn(
        "flex items-center gap-2 p-3",
        isExpanded && "border-b border-gold/20 pb-3"
      )}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-byzantine hover:text-gold hover:bg-gold/10"
                onClick={toggleMute}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isMuted ? "Unmute" : "Mute"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="w-20">
          <Slider
            value={[volume]}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="cursor-pointer"
          />
        </div>
        
        <Button
          variant={isPlaying ? "default" : "outline"}
          size="sm"
          className={cn(
            "text-xs h-8 rounded-full transition-all",
            isPlaying 
              ? "bg-byzantine hover:bg-byzantine-dark text-white" 
              : "text-gold border-gold hover:bg-gold/10"
          )}
          onClick={togglePlay}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="h-4 w-4 rounded-full border-2 border-r-transparent border-white animate-spin mr-1"></div>
          ) : isPlaying ? (
            <Pause className="h-4 w-4 mr-1" />
          ) : (
            <Play className="h-4 w-4 mr-1" />
          )}
          {isLoading ? "Loading" : isPlaying ? "Pause" : "Play"}
        </Button>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 rounded-full hover:bg-gold/10 text-byzantium transition-all",
                  isExpanded && "bg-gold/10"
                )}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <Music className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isExpanded ? "Collapse player" : "Expand player"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={reverbEnabled ? "default" : "ghost"}
                size="icon"
                className={cn(
                  "h-8 w-8 rounded-full transition-all",
                  reverbEnabled 
                    ? "bg-gold/30 text-gold hover:bg-gold/40" 
                    : "hover:bg-gold/10 text-byzantium hover:text-gold"
                )}
                onClick={toggleReverb}
              >
                <Waves className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{reverbEnabled ? "Disable Cathedral Reverb" : "Enable Cathedral Reverb"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-gold/10 text-byzantium transition-all"
                onClick={minimizePlayer}
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Minimize player</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {isExpanded && (
        <div className="p-4 animate-fade-in">
          <div className="text-sm font-medium text-gold mb-3 flex justify-between items-center">
            <span className="flex items-center">
              <Headphones className="h-4 w-4 mr-2" />
              Sacred Chants Collection
            </span>
            <span className="text-xs text-white/60">{currentTime} / {AUDIO_TRACKS[currentTrackIndex].length}</span>
          </div>
          
          <div className="mb-4">
            <Slider
              value={[progress]}
              max={100}
              step={0.1}
              onValueChange={handleProgressChange}
              className="cursor-pointer"
            />
            
            <div className="flex justify-between items-center mt-2">
              <div className="text-xs text-gold/80 font-medium max-w-xs truncate">
                Now Playing: {AUDIO_TRACKS[currentTrackIndex].name}
              </div>
              
              {isPlaying && (
                <div className="flex space-x-1 items-center">
                  <span className="w-1 h-3 bg-gold rounded-full animate-pulse" style={{animationDelay: "0ms"}}></span>
                  <span className="w-1 h-4 bg-gold rounded-full animate-pulse" style={{animationDelay: "300ms"}}></span>
                  <span className="w-1 h-2 bg-gold rounded-full animate-pulse" style={{animationDelay: "600ms"}}></span>
                </div>
              )}
            </div>
          </div>
          
          {reverbEnabled && (
            <div className="mb-4 glass-morphism p-3 rounded-md">
              <Label className="text-xs text-gold/80 mb-2 block">Cathedral Reverb Amount</Label>
              <div className="flex items-center gap-3">
                <Waves className="h-3 w-3 text-gold/60" />
                <Slider
                  value={[reverbAmount]}
                  max={100}
                  step={1}
                  onValueChange={handleReverbAmountChange}
                  className="cursor-pointer"
                />
                <span className="text-xs text-gold/70 min-w-8">{reverbAmount}%</span>
              </div>
            </div>
          )}
          
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
            {AUDIO_TRACKS.map((track, index) => (
              <div 
                key={index}
                className={cn(
                  "p-3 rounded-md cursor-pointer transition-all flex items-center justify-between gap-3",
                  currentTrackIndex === index 
                    ? "glass-morphism bg-byzantine/10 border border-byzantine/30" 
                    : "hover:bg-gold/10 border border-transparent"
                )}
                onClick={() => loadTrack(index)}
              >
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-byzantine/10 text-gold">
                  {track.icon}
                </div>
                <div className="flex-grow min-w-0">
                  <div className={cn(
                    "font-medium truncate",
                    currentTrackIndex === index ? "text-gold" : "text-white"
                  )}>
                    {track.name}
                  </div>
                  <div className="text-xs text-white/60 truncate flex items-center gap-1">
                    {track.description}
                    <span className="inline-flex items-center text-gold/60">· {track.length}</span>
                  </div>
                </div>
                {currentTrackIndex === index && isPlaying && (
                  <div className="audio-visualizer h-6 flex-shrink-0">
                    <div className="audio-bar"></div>
                    <div className="audio-bar"></div>
                    <div className="audio-bar"></div>
                    <div className="audio-bar"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-byzantium hover:text-gold hover:bg-gold/10 rounded-full"
              onClick={prevTrack}
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-byzantium hover:text-gold hover:bg-gold/10 rounded-full"
                  >
                    <Info className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="w-80 p-4">
                  <p className="mb-2 text-sm">These sacred chants have been part of Orthodox worship for centuries, carrying the spiritual essence of the faith through melodic prayer.</p>
                  <p className="text-xs text-muted-foreground">Audio files sourced from public archives and Orthodox monasteries.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-byzantium hover:text-gold hover:bg-gold/10 rounded-full"
              onClick={nextTrack}
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
