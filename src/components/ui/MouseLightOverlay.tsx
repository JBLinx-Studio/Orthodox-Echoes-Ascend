
import React, { useEffect, useRef } from "react";

/**
 * Contains two overlay layers:
 * 1. DarknessOverlay: Radial mask darkens the entire UI except where the cursor glows.
 * 2. HighlightOverlay: Subtle golden soft highlight that “lifts” the content just under the mouse.
 */
export function MouseLightOverlay() {
  const darkRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      const x = e.clientX;
      const y = e.clientY;
      [darkRef, highlightRef].forEach(ref => {
        if (ref.current) {
          ref.current.style.setProperty("--mouse-x", `${x}px`);
          ref.current.style.setProperty("--mouse-y", `${y}px`);
        }
      });
      // Expose CSS variables for child panels (e.g. raised effect)
      document.body.style.setProperty("--mouse-x", `${x}px`);
      document.body.style.setProperty("--mouse-y", `${y}px`);
    }
    window.addEventListener("mousemove", handleMove);
    // Init (center)
    const vw = window.innerWidth / 2;
    const vh = window.innerHeight / 2;
    [darkRef, highlightRef].forEach(ref => {
      if (ref.current) {
        ref.current.style.setProperty("--mouse-x", `${vw}px`);
        ref.current.style.setProperty("--mouse-y", `${vh}px`);
      }
    });
    document.body.style.setProperty("--mouse-x", `${vw}px`);
    document.body.style.setProperty("--mouse-y", `${vh}px`);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Disable on mobile (matches CSS media query)
  return (
    <>
      {/* 1. Big darkness vignette except center */}
      <div
        ref={darkRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-40 mouse-darkness-overlay"
        style={{
          "--mouse-x": "50vw",
          "--mouse-y": "50vh",
        } as React.CSSProperties}
      />
      {/* 2. Bright gold highlight, above panels, below nav */}
      <div
        ref={highlightRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-50 mouse-highlight-overlay"
        style={{
          "--mouse-x": "50vw",
          "--mouse-y": "50vh",
        } as React.CSSProperties}
      />
    </>
  );
}
