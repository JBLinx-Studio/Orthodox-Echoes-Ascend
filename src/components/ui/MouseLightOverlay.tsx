
import React, { useEffect, useRef } from "react";

/**
 * Major "holy light" overlay:
 * 1. DarknessOverlay: Radial mask, jumbo size, darkens all UI except a huge illuminated zone.
 * 2. HighlightOverlay: BRIGHT, gold, and very large/strong holy light with subtle streaks.
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
      document.body.style.setProperty("--mouse-x", `${x}px`);
      document.body.style.setProperty("--mouse-y", `${y}px`);
    }
    window.addEventListener("mousemove", handleMove);

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

  // Cursor: turning gold star & pointer
  useEffect(() => {
    const styleId = "custom-star-cursor-keyframes";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
      @keyframes rotate-cursor-star {
        100% { transform: rotate(360deg); }
      }
      .star-cursor {
        width:32px;height:32px;pointer-events:none;
        position:fixed;z-index:999999;
        transition:opacity 0.2s;
        will-change:transform,opacity;
        filter: drop-shadow(0 0 8px #ffd900cc) drop-shadow(0 0 22px #ffe34ea0);
        opacity:0.95;
        mix-blend-mode:lighten;
        pointer-events: none;
        left:-32px;top:-32px;
        user-select:none;
        z-index:99999999;
      }
      `;
      document.head.appendChild(style);
    }
    const star = document.createElement("div");
    star.innerHTML = `
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <g>
          <polygon points="16,2 20,12 31,12 22,19 25,30 16,24 7,30 10,19 1,12 12,12"
            fill="#ffe06b" stroke="#eabd23" stroke-width="2" />
          <circle cx="16" cy="16" r="6" fill="#FFF8C5" fill-opacity="0.4"/>
        </g>
      </svg>
    `;
    star.className = "star-cursor";
    star.style.position = "fixed";
    document.body.appendChild(star);

    function cursorAnimHandler(e: MouseEvent) {
      star.style.left = `${e.clientX - 16}px`;
      star.style.top = `${e.clientY - 16}px`;
      star.style.animation = "rotate-cursor-star 2s linear infinite";
    }
    window.addEventListener("mousemove", cursorAnimHandler);

    // Hide system cursor for desktop
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", cursorAnimHandler);
      if (star.parentNode) star.parentNode.removeChild(star);
      document.body.style.cursor = "";
      const style = document.getElementById(styleId);
      if (style) style.remove();
    };
  }, []);

  return (
    <>
      {/* 1. Even bigger darkness vignette, only panel areas stay visible */}
      <div
        ref={darkRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-40 mouse-darkness-overlay"
        style={{
          "--mouse-x": "50vw",
          "--mouse-y": "50vh",
        } as React.CSSProperties}
      />
      {/* 2. Major golden glow highlight with even more coverage */}
      <div
        ref={highlightRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-50 mouse-highlight-overlay enhanced-holy-glow"
        style={{
          "--mouse-x": "50vw",
          "--mouse-y": "50vh",
        } as React.CSSProperties}
      />
    </>
  );
}
