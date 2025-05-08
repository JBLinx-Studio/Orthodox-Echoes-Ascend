
import { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Music,
  Maximize2,
  Minimize2,
  Waves,
  Settings2,
  Info,
  SliderHorizontal
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
    setReverbAmount,
    isMuted,
    muteAudio,
    unmuteAudio,
    playlist,
    nextTrack,
    prevTrack
  } = useAudio();
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [isLoading, setIsLoading] = useState(false);
  const [showEffectsPanel, setShowEffectsPanel] = useState(false);
  const [reverbDecay, setReverbDecay] = useState(2.0);
  const [reverbPreDelay, setReverbPreDelay] = useState(0.1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  // Listen for external audio element changes
  useEffect(() => {
    // Find the actual audio element being controlled by AudioContext
    const audioElements = document.getElementsByTagName('audio');
    if (audioElements.length > 0) {
      audioRef.current = audioElements[0];
      
      const updateDuration = () => {
        if (audioRef.current && !isNaN(audioRef.current.duration)) {
          setDuration(formatTime(audioRef.current.duration));
        }
      };
      
      const handleCanPlay = () => {
        setIsLoading(false);
        updateDuration();
      };
      
      const handleLoadStart = () => {
        setIsLoading(true);
      };
      
      audioRef.current.addEventListener('canplay', handleCanPlay);
      audioRef.current.addEventListener('loadstart', handleLoadStart);
      audioRef.current.addEventListener('durationchange', updateDuration);
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('canplay', handleCanPlay);
          audioRef.current.removeEventListener('loadstart', handleLoadStart);
          audioRef.current.removeEventListener('durationchange', updateDuration);
        }
      };
    }
  }, []);

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

  // Set up progress tracking
  useEffect(() => {
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
    
    startProgressTracking();
    
    return () => {
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, []);

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleMute = () => {
    if (isMuted) {
      unmuteAudio();
    } else {
      muteAudio();
    }
  };

  const handleVolumeChange = (newValue: number[]) => {
    const newVolume = newValue[0];
    setVolume(newVolume);
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
  
  const handleReverbAmountChange = (newValue: number[]) => {
    setReverbAmount(newValue[0]);
  };

  const handleReverbDecayChange = (newValue: number[]) => {
    setReverbDecay(newValue[0]);
  };

  const handleReverbPreDelayChange = (newValue: number[]) => {
    setReverbPreDelay(newValue[0]);
  };

  // Custom toast notifications that appear in a better position
  const showCustomToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    // Instead of the built-in toast, we'll use a custom implementation
    // that's handled in the AudioContext to appear at the top center
    const options: any = { type };
    toast(message, options);
  };

  // Render minimal player when minimized
  if (isMinimized) {
    return (
      <div className={cn(
        "flex items-center gap-2 p-3 bg-[#1A1F2C]/95 backdrop-blur-sm rounded-full border border-gold/30 shadow-lg holy-glow-sm",
        className
      )}>
        <span className="text-xs font-medium text-gold/80 max-w-28 truncate mr-1">
          {playlist[currentTrackIndex]?.icon} {playlist[currentTrackIndex]?.name}
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
      "transition-all duration-500 backdrop-filter backdrop-blur-sm overflow-hidden",
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
                  "h-8 w-8 rounded-full hover:bg-gold/10 text-gold/80 transition-all",
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
        
        <Popover>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button
                    variant={reverbEnabled ? "default" : "ghost"}
                    size="icon"
                    className={cn(
                      "h-8 w-8 rounded-full transition-all",
                      reverbEnabled 
                        ? "bg-gold/30 text-gold hover:bg-gold/40" 
                        : "hover:bg-gold/10 text-gold/70 hover:text-gold"
                    )}
                  >
                    <Waves className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Audio Effects</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <PopoverContent className="w-80 p-4" side="top">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm text-gold">Cathedral Reverb</h4>
                <Switch 
                  checked={reverbEnabled} 
                  onCheckedChange={toggleReverb}
                  className="data-[state=checked]:bg-gold"
                />
              </div>
              
              {reverbEnabled && (
                <div className="space-y-3 mt-2 animate-fade-in">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <Label className="text-xs text-gold/80">Reverb Amount</Label>
                      <span className="text-xs text-gold/70">{reverbAmount}%</span>
                    </div>
                    <Slider
                      value={[reverbAmount]}
                      max={100}
                      step={1}
                      onValueChange={handleReverbAmountChange}
                      className="cursor-pointer"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <Label className="text-xs text-gold/80">Decay Time</Label>
                      <span className="text-xs text-gold/70">{reverbDecay.toFixed(1)}s</span>
                    </div>
                    <Slider
                      value={[reverbDecay]}
                      min={0.5}
                      max={8}
                      step={0.1}
                      onValueChange={handleReverbDecayChange}
                      className="cursor-pointer"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <Label className="text-xs text-gold/80">Pre-Delay</Label>
                      <span className="text-xs text-gold/70">{(reverbPreDelay * 1000).toFixed(0)}ms</span>
                    </div>
                    <Slider
                      value={[reverbPreDelay]}
                      min={0}
                      max={0.3}
                      step={0.01}
                      onValueChange={handleReverbPreDelayChange}
                      className="cursor-pointer"
                    />
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-xs text-white/60 italic">
                      Simulates the acoustic environment of a cathedral with natural reverberation.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-gold/10 text-gold/80 transition-all"
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
              <Music className="h-4 w-4 mr-2" />
              Byzantine Sacred Chants
            </span>
            <span className="text-xs text-white/60">{currentTime} / {playlist[currentTrackIndex]?.length || "0:00"}</span>
          </div>
          
          <div className="mb-4">
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary mb-1">
              <div className={cn(
                "absolute h-full transition-all bg-gradient-to-r from-gold/70 to-byzantine/70",
                isPlaying && "progress-pulse"
              )} style={{ width: `${progress}%` }}></div>
              <Slider
                value={[progress]}
                max={100}
                step={0.1}
                onValueChange={handleProgressChange}
                className="cursor-pointer absolute inset-0 opacity-0"
              />
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <div className="text-xs text-gold/80 font-medium max-w-xs truncate">
                Now Playing: {playlist[currentTrackIndex]?.name || "Loading..."}
              </div>
              
              {isPlaying && (
                <div className="audio-visualizer h-4">
                  <div className="audio-bar"></div>
                  <div className="audio-bar"></div>
                  <div className="audio-bar"></div>
                  <div className="audio-bar"></div>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
            {playlist.map((track, index) => (
              <div 
                key={index}
                className={cn(
                  "p-3 rounded-md cursor-pointer transition-all flex items-center justify-between gap-3",
                  currentTrackIndex === index 
                    ? "glass-morphism bg-byzantine/10 border border-byzantine/30" 
                    : "hover:bg-gold/10 border border-transparent"
                )}
                onClick={() => setCurrentTrackIndex(index)}
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
                  <div className="flex items-center space-x-1 h-6 flex-shrink-0">
                    <span className="w-1 h-3 bg-gold rounded-full animate-pulse" style={{animationDelay: "0ms"}}></span>
                    <span className="w-1 h-4 bg-gold rounded-full animate-pulse" style={{animationDelay: "300ms"}}></span>
                    <span className="w-1 h-2 bg-gold rounded-full animate-pulse" style={{animationDelay: "600ms"}}></span>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-4 items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-gold/80 hover:text-gold hover:bg-gold/10 rounded-full"
              onClick={prevTrack}
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            
            <Button
              variant={isPlaying ? "default" : "outline"}
              size="icon"
              className={cn(
                "h-11 w-11 rounded-full transition-all",
                isPlaying 
                  ? "bg-byzantine hover:bg-byzantine-dark text-white" 
                  : "text-gold border-gold hover:bg-gold/10"
              )}
              onClick={togglePlay}
            >
              {isLoading ? (
                <div className="h-5 w-5 rounded-full border-2 border-r-transparent border-current animate-spin"></div>
              ) : isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-gold/80 hover:text-gold hover:bg-gold/10 rounded-full"
              onClick={nextTrack}
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
      
      <style jsx global>{`
        .progress-pulse {
          animation: progressPulse 2s ease-in-out infinite;
        }
        
        @keyframes progressPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .audio-visualizer {
          display: flex;
          align-items: center;
          gap: 2px;
        }
        
        .audio-bar {
          width: 2px;
          height: 12px;
          background-color: #D4AF37;
          border-radius: 1px;
          animation: barAnimation 1.2s ease-in-out infinite;
        }
        
        .audio-bar:nth-child(1) { animation-delay: 0ms; }
        .audio-bar:nth-child(2) { animation-delay: 300ms; }
        .audio-bar:nth-child(3) { animation-delay: 600ms; }
        .audio-bar:nth-child(4) { animation-delay: 900ms; }
        
        @keyframes barAnimation {
          0%, 100% { height: 4px; }
          50% { height: 12px; }
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.3);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.5);
        }
      `}</style>
    </div>
  );
}
