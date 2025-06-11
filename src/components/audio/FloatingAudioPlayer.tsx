
import React, { useState } from 'react';
import { useAudio } from '@/contexts/AudioContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2,
  Music
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FloatingAudioPlayer() {
  const { 
    isPlaying, 
    togglePlay, 
    currentTrack, 
    nextTrack, 
    prevTrack, 
    volume, 
    isMuted, 
    muteAudio, 
    unmuteAudio 
  } = useAudio();
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Don't show if no track is loaded
  if (!currentTrack && !isPlaying) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Card className="bg-[#1A1F2C]/95 backdrop-blur-md border-gold/20 shadow-2xl">
            <CardContent className="p-0">
              {isExpanded ? (
                <motion.div
                  initial={{ height: 60 }}
                  animate={{ height: 'auto' }}
                  className="w-80"
                >
                  {/* Expanded Player */}
                  <div className="p-4 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Music className="w-5 h-5 text-gold" />
                        <span className="text-sm font-medium text-white">Now Playing</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsExpanded(false)}
                        className="text-white/70 hover:text-gold h-6 w-6 p-0"
                      >
                        <Minimize2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Track Info */}
                    {currentTrack && (
                      <div className="text-center">
                        <h4 className="font-medium text-white text-sm mb-1">
                          {currentTrack.title}
                        </h4>
                        <p className="text-xs text-white/60">
                          {currentTrack.artist || 'Orthodox Chant'}
                        </p>
                      </div>
                    )}

                    {/* Controls */}
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={prevTrack}
                        className="text-white/70 hover:text-gold h-8 w-8 p-0"
                      >
                        <SkipBack className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={togglePlay}
                        className="text-gold hover:text-gold/80 bg-gold/10 h-10 w-10 p-0 rounded-full"
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5 ml-0.5" />
                        )}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={nextTrack}
                        className="text-white/70 hover:text-gold h-8 w-8 p-0"
                      >
                        <SkipForward className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Volume Control */}
                    <div className="flex items-center gap-2 px-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={isMuted ? unmuteAudio : muteAudio}
                        className="text-white/70 hover:text-gold h-6 w-6 p-0"
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </Button>
                      <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gold transition-all duration-200"
                          style={{ width: `${isMuted ? 0 : volume}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Minimized Player */
                <div className="flex items-center gap-3 p-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={togglePlay}
                    className="text-gold hover:text-gold/80 bg-gold/10 h-9 w-9 p-0 rounded-full"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4 ml-0.5" />
                    )}
                  </Button>
                  
                  {currentTrack && (
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-white truncate">
                        {currentTrack.title}
                      </p>
                      <p className="text-xs text-white/60 truncate">
                        {currentTrack.artist || 'Orthodox Chant'}
                      </p>
                    </div>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(true)}
                    className="text-white/70 hover:text-gold h-6 w-6 p-0"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
