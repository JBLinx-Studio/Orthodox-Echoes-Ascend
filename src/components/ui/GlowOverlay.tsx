
import React from "react";
import { cn } from "@/lib/utils";

interface GlowOverlayProps {
  className?: string;
  color?: "gold" | "byzantine" | "white";
  intensity?: "low" | "medium" | "high";
}

export function GlowOverlay({
  className,
  color = "gold",
  intensity = "medium"
}: GlowOverlayProps) {
  // Set intensity
  const opacityMap = {
    low: "opacity-10",
    medium: "opacity-20",
    high: "opacity-40"
  };
  // Pick a color glow
  const colorMap = {
    gold: "bg-gold/70",
    byzantine: "bg-byzantine/70",
    white: "bg-white/80"
  };
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 blur-[90px] rounded-full",
        colorMap[color],
        opacityMap[intensity],
        className
      )}
    ></div>
  );
}
