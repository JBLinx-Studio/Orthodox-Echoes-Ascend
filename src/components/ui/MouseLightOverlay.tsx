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

  // Cursor: subtle gold star & pointer - reduced intensity
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
        width:24px;height:24px;pointer-events:none;
        position:fixed;z-index:999999;
        transition:opacity 0.2s;
        will-change:transform,opacity;
        filter: drop-shadow(0 0 5px #ffd90070) drop-shadow(0 0 12px #ffe34270);
        opacity:0.82;
        mix-blend-mode:lighten;
        pointer-events: none;
        left:-24px;top:-24px;
        user-select:none;
        z-index:99999999;
      }
      `;
      document.head.appendChild(style);
    }
    const star = document.createElement("div");
    star.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
        <g>
          <polygon points="16,2 20,12 31,12 22,19 25,30 16,24 7,30 10,19 1,12 12,12"
            fill="#ffe06b" stroke="#eabd23" stroke-width="1.5" />
          <circle cx="16" cy="16" r="6" fill="#FFF8C5" fill-opacity="0.3"/>
        </g>
      </svg>
    `;
    star.className = "star-cursor";
    star.style.position = "fixed";
    document.body.appendChild(star);

    function cursorAnimHandler(e: MouseEvent) {
      star.style.left = `${e.clientX - 12}px`;
      star.style.top = `${e.clientY - 12}px`;
      star.style.animation = "rotate-cursor-star 3.2s linear infinite";
    }
    window.addEventListener("mousemove", cursorAnimHandler);

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
      {/* Darkness vignette - much softer */}
      <div
        ref={darkRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-40 mouse-darkness-overlay"
        style={{
          "--mouse-x": "50vw",
          "--mouse-y": "50vh",
        } as React.CSSProperties}
      />
      {/* Subtle golden glow - less intense & larger radius */}
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
