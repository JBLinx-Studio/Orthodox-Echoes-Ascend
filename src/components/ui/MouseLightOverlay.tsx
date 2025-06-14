
import React, { useEffect, useRef } from "react";

/**
 * Renders a transparent overlay darkening the page,
 * with a bright radial 'light' following your mouse.
 * Uses GPU-accelerated CSS for performance. 
 */
export function MouseLightOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Function to update light position
    function handleMouseMove(e: MouseEvent) {
      const x = e.clientX;
      const y = e.clientY;
      // Move the CSS mask-position to the mouse
      overlay.style.setProperty("--mouse-x", `${x}px`);
      overlay.style.setProperty("--mouse-y", `${y}px`);
    }

    window.addEventListener("mousemove", handleMouseMove);

    // Initialize at center
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    overlay.style.setProperty("--mouse-x", `${vw / 2}px`);
    overlay.style.setProperty("--mouse-y", `${vh / 2}px`);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Hide on small screens
  return (
    <div
      ref={overlayRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 mouse-light-overlay"
      style={{
        // Custom CSS properties for light position
        "--mouse-x": "50vw",
        "--mouse-y": "50vh",
      } as React.CSSProperties}
    />
  );
}
