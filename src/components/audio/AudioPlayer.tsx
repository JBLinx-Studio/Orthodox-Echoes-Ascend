
import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { useAudio } from '@/contexts/AudioContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioPlayerProps {
  minimal?: boolean;
  className?: string;
}

export function AudioPlayer({ minimal = false, className }: AudioPlayerProps) {
  const { 
    isPlaying, 
    togglePlay, 
    volume, 
    setVolume, 
    expandPlayer, 
    currentTrackIndex, 
    playlist,
    nextTrack,
    prevTrack,
    isMuted,
    muteAudio,
    unmuteAudio
  } = useAudio();
  
  const [showControls, setShowControls] = useState(false);
  
  // Handle error conditions gracefully
  const currentTrack = playlist && playlist[currentTrackIndex] ? playlist[currentTrackIndex] : { name: 'Sacred Chant', icon: '🎵' };
  
  const toggleMute = () => {
    if (isMuted) {
      unmuteAudio();
    } else {
      muteAudio();
    }
  };
  
  const handleVolumeChange = (newValue: number[]) => {
    setVolume(newValue[0]);
  };

  // Enhanced mini player with hover expand
  if (minimal) {
    return (
      <div 
        className={cn(
          "relative group",
          className
        )}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <div className="flex items-center gap-1 py-1 px-2 rounded-full border border-gold/20 bg-[#1A1F2C]/60 backdrop-blur-sm transition-all duration-300 hover:border-gold/40 hover:bg-[#1A1F2C]/80">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-gold hover:bg-gold/10 rounded-full"
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isPlaying ? 'Pause' : 'Play'} sacred chant</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <span className="text-xs font-medium text-gold/80 max-w-20 truncate cursor-pointer" onClick={expandPlayer}>
            {currentTrack.name}
          </span>
        </div>
        
        {/* Expanded mini controls that appear on hover */}
        <AnimatePresence>
          {showControls && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 right-0 z-50 py-2 px-3 rounded-lg border border-gold/20 bg-[#1A1F2C]/95 backdrop-blur-md shadow-xl"
            >
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-gold/80 hover:text-gold hover:bg-gold/10 rounded-full"
                  onClick={prevTrack}
                >
                  <SkipBack className="h-3 w-3" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gold hover:bg-gold/10 rounded-full"
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-gold/80 hover:text-gold hover:bg-gold/10 rounded-full"
                  onClick={nextTrack}
                >
                  <SkipForward className="h-3 w-3" />
                </Button>
                
                <div className="h-6 w-px bg-gold/20 mx-1"></div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-gold/80 hover:text-gold hover:bg-gold/10 rounded-full"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                </Button>
                
                <div className="w-16">
                  <Slider
                    value={[volume]}
                    max={100}
                    step={1}
                    onValueChange={handleVolumeChange}
                    className="cursor-pointer"
                  />
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-gold/80 hover:text-gold hover:bg-gold/10 rounded-full"
                  onClick={expandPlayer}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Full player with enhanced styling
  return (
    <div className={cn(
      "flex items-center gap-2 py-2 px-3 rounded-full border border-gold/20 bg-[#1A1F2C]/60 backdrop-blur-sm shadow-lg transition-all duration-300 hover:border-gold/30 hover:bg-[#1A1F2C]/70",
      className
    )}>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-gold hover:bg-gold/10 rounded-full transition-colors"
        onClick={toggleMute}
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </Button>
      
      <div className="w-20">
        <Slider
          value={[volume]}
          max={100}
          step={1}
          onValueChange={handleVolumeChange}
          className="cursor-pointer"
        />
      </div>
      
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-gold/80 hover:text-gold hover:bg-gold/10 rounded-full"
          onClick={prevTrack}
        >
          <SkipBack className="h-3.5 w-3.5" />
        </Button>
        
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
        >
          {isPlaying ? (
            <Pause className="h-4 w-4 mr-1" />
          ) : (
            <Play className="h-4 w-4 mr-1" />
          )}
          {isPlaying ? "Pause" : "Play"}
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-gold/80 hover:text-gold hover:bg-gold/10 rounded-full"
          onClick={nextTrack}
        >
          <SkipForward className="h-3.5 w-3.5" />
        </Button>
      </div>
      
      <span 
        className="text-xs font-medium text-gold/80 max-w-32 truncate cursor-pointer hover:text-gold transition-colors" 
        onClick={expandPlayer}
      >
        {currentTrack.name}
      </span>
    </div>
  );
}
