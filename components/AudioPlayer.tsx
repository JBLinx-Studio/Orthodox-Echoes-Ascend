
import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music, SkipForward, SkipBack, PlayCircle, PauseCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AUDIO_TRACKS = [
  {
    name: "Byzantine Chant - Traditional",
    src: "https://soundbible.com/mp3/medieval-music-tavern-town-folk-ancient-world-royalty-free-music-113842.mp3",
    description: "Ancient Byzantine liturgical chant",
    length: "2:48"
  },
  {
    name: "Agni Parthene (O Pure Virgin)",
    src: "https://ia800505.us.archive.org/26/items/AgniPartheneversionAbbessKassiani/AgniParthene-versionAbbessKassiani.mp3",
    description: "Traditional Marian hymn by St. Nectarios of Aegina",
    length: "5:32"
  },
  {
    name: "Cherubic Hymn",
    src: "https://ia601509.us.archive.org/15/items/CherubicHymnBulgarian/Cherubic%20Hymn%20%28Bulgarian%29.mp3",
    description: "Bulgarian rendition of the Cherubic Hymn",
    length: "3:15"
  },
  {
    name: "Lord Have Mercy (Kyrie Eleison)",
    src: "https://ia903409.us.archive.org/5/items/lord-have-mercy-byzantine-chant/Lord%20Have%20Mercy%20-%20Byzantine%20Chant.mp3",
    description: "The timeless plea for divine mercy",
    length: "4:20"
  },
  {
    name: "Holy God (Trisagion)",
    src: "https://ia801504.us.archive.org/29/items/holy-god-trisagion-hymn-byzantine-chant/Holy%20God%20%28Trisagion%20Hymn%29%20-%20Byzantine%20Chant.mp3",
    description: "The thrice-holy hymn sung during Divine Liturgy",
    length: "2:55"
  },
  {
    name: "The Great Doxology",
    src: "https://ia800106.us.archive.org/18/items/TheGreatDoxologyByzantineChant_201803/The%20Great%20Doxology%20%28Byzantine%20Chant%29.mp3",
    description: "Glory to God in the highest, and on earth peace",
    length: "6:10"
  }
];

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const previousVolume = useRef(volume);
  const progressInterval = useRef<number | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(AUDIO_TRACKS[currentTrackIndex].src);
    audioRef.current.volume = volume / 100;
    
    // Add event listeners
    const audioElement = audioRef.current;
    
    const handleCanPlay = () => {
      setIsLoading(false);
      if (isPlaying) {
        audioElement.play().catch(handlePlayError);
      }
    };
    
    const handleLoadStart = () => {
      setIsLoading(true);
    };
    
    const handleEnded = () => {
      nextTrack();
    };
    
    const handleDurationChange = () => {
      if (audioElement.duration) {
        setDuration(formatTime(audioElement.duration));
      }
    };
    
    audioElement.addEventListener('canplay', handleCanPlay);
    audioElement.addEventListener('loadstart', handleLoadStart);
    audioElement.addEventListener('ended', handleEnded);
    audioElement.addEventListener('durationchange', handleDurationChange);
    
    // Set up progress tracking
    startProgressTracking();
    
    // Cleanup on unmount
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.removeEventListener('canplay', handleCanPlay);
        audioElement.removeEventListener('loadstart', handleLoadStart);
        audioElement.removeEventListener('ended', handleEnded);
        audioElement.removeEventListener('durationchange', handleDurationChange);
      }
      
      stopProgressTracking();
    };
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const startProgressTracking = () => {
    if (progressInterval.current) {
      window.clearInterval(progressInterval.current);
    }
    
    progressInterval.current = window.setInterval(() => {
      if (audioRef.current && !audioRef.current.paused) {
        const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(currentProgress || 0);
        setCurrentTime(formatTime(audioRef.current.currentTime));
      }
    }, 1000);
  };

  const stopProgressTracking = () => {
    if (progressInterval.current) {
      window.clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const handlePlayError = (error: any) => {
    console.error("Error playing audio:", error);
    toast.error("Could not play audio. Please try again or select another track.");
    setIsPlaying(false);
  };

  const loadTrack = (index: number) => {
    if (!audioRef.current) return;
    
    const wasPlaying = isPlaying;
    audioRef.current.pause();
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime("0:00");
    
    audioRef.current.src = AUDIO_TRACKS[index].src;
    setCurrentTrackIndex(index);
    
    if (wasPlaying) {
      audioRef.current.play().catch(handlePlayError);
      setIsPlaying(true);
    }
    
    toast.info(`Now playing: ${AUDIO_TRACKS[index].name}`);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      toast.info("Chant paused");
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(handlePlayError);
      toast.success(`Playing: ${AUDIO_TRACKS[currentTrackIndex].name}`);
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(previousVolume.current);
    } else {
      previousVolume.current = volume;
      setVolume(0);
    }
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (newValue: number[]) => {
    const newVolume = newValue[0];
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleProgressChange = (newValue: number[]) => {
    if (!audioRef.current) return;
    
    const newProgress = newValue[0];
    const newTime = (audioRef.current.duration / 100) * newProgress;
    audioRef.current.currentTime = newTime;
    setProgress(newProgress);
    setCurrentTime(formatTime(newTime));
  };

  const nextTrack = () => {
    const newIndex = (currentTrackIndex + 1) % AUDIO_TRACKS.length;
    loadTrack(newIndex);
  };

  const prevTrack = () => {
    const newIndex = (currentTrackIndex - 1 + AUDIO_TRACKS.length) % AUDIO_TRACKS.length;
    loadTrack(newIndex);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={cn(
      "transition-all duration-500 overflow-hidden holy-light",
      isExpanded 
        ? "bg-orthodox-blue/90 backdrop-blur-sm rounded-lg border border-gold/30 shadow-lg" 
        : "bg-muted/50 rounded-full"
    )}>
      <div className={cn(
        "flex items-center gap-2 p-2",
        isExpanded && "border-b border-gold/20 pb-3"
      )}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-byzantine hover:text-byzantine-light hover:bg-gold/10 transition-all"
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
              : "text-byzantine border-byzantine hover:bg-byzantine/10"
          )}
          onClick={togglePlay}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="h-4 w-4 rounded-full border-2 border-r-transparent border-white animate-spin mr-1"></div>
          ) : isPlaying ? (
            <PauseCircle className="h-4 w-4 mr-1" />
          ) : (
            <PlayCircle className="h-4 w-4 mr-1" />
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
                  "h-8 w-8 rounded-full hover:bg-gold/10 text-byzantine transition-all",
                  isExpanded && "bg-gold/10"
                )}
                onClick={toggleExpand}
              >
                <Music className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isExpanded ? "Collapse" : "Expand"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {isExpanded && (
        <div className="p-3 animate-fade-in">
          <div className="text-sm font-medium text-gold mb-2 flex justify-between items-center">
            <span>Sacred Chants Collection</span>
            <span className="text-xs text-muted-foreground">{currentTime} / {AUDIO_TRACKS[currentTrackIndex].length}</span>
          </div>
          
          <div className="mb-3">
            <Slider
              value={[progress]}
              max={100}
              step={0.1}
              onValueChange={handleProgressChange}
              className="cursor-pointer"
            />
            
            <div className="flex justify-between items-center mt-1">
              <div className="text-xs text-gold/70 font-medium max-w-xs truncate">
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
          
          <div className="space-y-2 max-h-44 overflow-y-auto pr-1 custom-scrollbar">
            {AUDIO_TRACKS.map((track, index) => (
              <div 
                key={index}
                className={cn(
                  "p-2 rounded-md cursor-pointer transition-all flex items-center justify-between",
                  currentTrackIndex === index 
                    ? "bg-byzantine/20 border border-byzantine/30" 
                    : "hover:bg-gold/10 border border-transparent"
                )}
                onClick={() => loadTrack(index)}
              >
                <div>
                  <div className={cn(
                    "font-medium",
                    currentTrackIndex === index ? "text-gold" : "text-foreground"
                  )}>
                    {track.name}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    {track.description}
                    <span className="text-gold/60">· {track.length}</span>
                  </div>
                </div>
                {currentTrackIndex === index && isPlaying && (
                  <div className="audio-visualizer h-4">
                    <div className="audio-bar"></div>
                    <div className="audio-bar"></div>
                    <div className="audio-bar"></div>
                    <div className="audio-bar"></div>
                    <div className="audio-bar"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-byzantine hover:text-byzantine-light hover:bg-gold/10"
              onClick={prevTrack}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-byzantine hover:text-byzantine-light hover:bg-gold/10"
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="w-80">
                  <p className="mb-2 text-sm">These chants are traditional Orthodox music, carefully selected to enhance your spiritual experience.</p>
                  <p className="text-xs text-muted-foreground">Audio files sourced from public archives and royalty-free collections.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-byzantine hover:text-byzantine-light hover:bg-gold/10"
              onClick={nextTrack}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
