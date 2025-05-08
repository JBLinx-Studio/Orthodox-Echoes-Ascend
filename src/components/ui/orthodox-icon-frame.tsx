
import React from 'react';
import { cn } from '@/lib/utils';

interface OrthodoxIconFrameProps {
  className?: string;
  children: React.ReactNode;
  withBorder?: boolean;
  withGlow?: boolean;
  frameType?: 'simple' | 'ornate' | 'cathedral';
}

export function OrthodoxIconFrame({ 
  className, 
  children, 
  withBorder = true, 
  withGlow = true,
  frameType = 'simple'
}: OrthodoxIconFrameProps) {
  return (
    <div className={cn(
      "relative overflow-hidden",
      frameType === 'simple' && "p-1",
      frameType === 'ornate' && "p-3",
      frameType === 'cathedral' && "p-4",
      withBorder && frameType === 'simple' && "byzantine-border",
      withBorder && frameType === 'ornate' && "byzantine-border border-2 border-gold/30",
      withBorder && frameType === 'cathedral' && "rounded-t-[40px] rounded-b-md border-2 border-gold/40",
      withGlow && "icon-glow",
      className
    )}>
      {withGlow && (
        <div className={cn(
          "absolute inset-0 bg-gold/5 blur-sm",
          frameType === 'simple' && "rounded-sm",
          frameType === 'ornate' && "rounded-md",
          frameType === 'cathedral' && "rounded-t-[40px] rounded-b-md"
        )}></div>
      )}
      
      {frameType === 'cathedral' && (
        <>
          <div className="absolute top-0 left-0 right-0 h-6 bg-gold/10 rounded-t-[40px]">
            <div className="flex justify-center">
              <div className="w-4 h-4 -mt-1 bg-gold/20 rounded-full animate-pulse"></div>
            </div>
          </div>
          {/* Add subtle light rays effect */}
          <div className="absolute top-0 left-1/4 right-0 h-full w-1/2 bg-gradient-to-br from-gold/10 to-transparent opacity-50 blur-md"></div>
        </>
      )}
      
      {frameType === 'ornate' && (
        <>
          <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-gold/60"></div>
          <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-gold/60"></div>
          <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-gold/60"></div>
          <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-gold/60"></div>
          {/* Add subtle animated glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-gold/5 rounded-full blur-xl animate-pulse"></div>
        </>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
      
      {withBorder && frameType === 'simple' && (
        <div className="absolute inset-0 border border-gold/20 rounded-sm pointer-events-none"></div>
      )}
      
      {frameType === 'cathedral' && (
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gold/30"></div>
      )}

      {/* Add subtle pulsating divine light effect */}
      {withGlow && (
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent opacity-20 animate-pulse" style={{animationDuration: '3s'}}></div>
      )}
      
      {/* Add floating dust particles for cathedral ambiance */}
      {frameType === 'cathedral' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({length: 5}).map((_, i) => (
            <div 
              key={i}
              className="absolute w-0.5 h-0.5 bg-gold/40 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationName: 'floatingDust',
                animationDuration: `${Math.random() * 5 + 5}s`,
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}
