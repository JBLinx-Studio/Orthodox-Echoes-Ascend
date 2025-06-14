
import React from "react";
import { cn } from "@/lib/utils";

interface GlassBannerProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassBanner({ children, className }: GlassBannerProps) {
  return (
    <div className={cn(
      "backdrop-blur-xl bg-white/5 border border-gold/40 rounded-xl shadow-[0_6px_28px_-3px_rgba(212,175,55,0.13)] p-5 md:p-8 max-w-lg mx-auto flex flex-col items-center",
      "ring-1 ring-gold/10",
      className
    )}>
      {children}
    </div>
  );
}
