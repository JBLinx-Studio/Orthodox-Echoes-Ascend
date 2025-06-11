
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAudio } from '@/contexts/AudioContext';
import { Play, Pause, Volume2, VolumeX, Music, SkipForward, SkipBack } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Slider } from '@/components/ui/slider';

export function AudioControls() {
  const { 
    isPlaying, 
    togglePlay, 
    expandPlayer, 
    currentTrackIndex,
    playlist,
    isMuted,
    muteAudio,
    unmuteAudio,
    volume,
    setVolume,
    nextTrack,
    prevTrack
  } = useAudio();

  // Handle case where playlist item might be undefined during initial load
  const currentTrack = playlist && playlist[currentTrackIndex] ? playlist[currentTrackIndex] : { icon: "🎵", name: "Loading..." };

  const handleVolumeChange = (value: number[]) => {
    console.log('AudioControls: Volume change to:', value[0]);
    setVolume(value[0]);
  };

  const handleExpandPlayer = () => {
    console.log('AudioControls: Expanding player');
    expandPlayer();
  };

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1F2C]/80 backdrop-blur-md rounded-full border border-gold/30 holy-glow-sm">
      <div className="flex items-center gap-1.5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full text-gold hover:bg-gold/10 hover:text-gold"
                onClick={prevTrack}
              >
                <SkipBack className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Previous chant</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full text-gold hover:bg-gold/10 hover:text-gold"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="h-3.5 w-3.5" />
                ) : (
                  <Play className="h-3.5 w-3.5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isPlaying ? "Pause" : "Play"} sacred chants</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full text-gold hover:bg-gold/10 hover:text-gold"
                onClick={nextTrack}
              >
                <SkipForward className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Next chant</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="w-16 hidden md:block">
        <Slider
          value={[volume]}
          min={0}
          max={100}
          step={1}
          className="cursor-pointer"
          onValueChange={handleVolumeChange}
        />
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-full text-gold hover:bg-gold/10"
              onClick={() => isMuted ? unmuteAudio() : muteAudio()}
            >
              {isMuted ? (
                <VolumeX className="h-3.5 w-3.5" />
              ) : (
                <Volume2 className="h-3.5 w-3.5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isMuted ? "Unmute" : "Mute"} audio</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-full text-gold hover:bg-gold/10"
              onClick={handleExpandPlayer}
            >
              <Music className="h-3.5 w-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Open chants player</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="hidden md:flex items-center space-x-1">
        <div className="max-w-40 truncate text-xs text-gold/80">
          {currentTrack.icon} {currentTrack.name}
        </div>
        
        {isPlaying && (
          <div className="flex items-end h-4 gap-0.5 ml-1">
            <div className="w-0.5 h-2 bg-gold/60 rounded-full animate-pulse"></div>
            <div className="w-0.5 h-3 bg-gold/80 rounded-full animate-pulse" style={{animationDelay: "0.1s"}}></div>
            <div className="w-0.5 h-1.5 bg-gold/60 rounded-full animate-pulse" style={{animationDelay: "0.2s"}}></div>
          </div>
        )}
      </div>
    </div>
  );
}
