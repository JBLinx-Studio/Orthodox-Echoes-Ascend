
import React from 'react';
import { cn } from '@/lib/utils';

interface OrthodoxIconFrameProps {
  className?: string;
  children: React.ReactNode;
  withBorder?: boolean;
  withGlow?: boolean;
}

export function OrthodoxIconFrame({ className, children, withBorder = true, withGlow = true }: OrthodoxIconFrameProps) {
  return (
    <div className={cn(
      "relative overflow-hidden p-1",
      withBorder && "byzantine-border",
      withGlow && "icon-glow",
      className
    )}>
      {withGlow && (
        <div className="absolute inset-0 bg-gold/5 rounded-sm blur-sm"></div>
      )}
      <div className="relative z-10">
        {children}
      </div>
      {withBorder && (
        <div className="absolute inset-0 border-2 border-gold/20 rounded-sm pointer-events-none"></div>
      )}
    </div>
  );
}
