import React, { useEffect, useRef } from "react";

/**
 * Immersive cathedral mouse light effect!
 * - Global darkness mask with light following cursor
 * - Glowy golden highlight under mouse
 * - Panels & content subtly "catch" and reflect/cast light!
 */
export function MouseLightOverlay() {
  const darkRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Helper for realistic distance-based light falloff
    function getLightProps(mouseX: number, mouseY: number, rect: DOMRect) {
      // Center of the panel/card
      const cardX = rect.left + rect.width / 2;
      const cardY = rect.top + rect.height / 2;
      // Euclidean distance from mouse to panel center
      const dist = Math.sqrt((mouseX - cardX) ** 2 + (mouseY - cardY) ** 2);

      // Light size parameters (tweak for realism/perf!)
      const maxRadius = Math.max(window.innerWidth, window.innerHeight) / 1.2; // physically plausible
      // Card "lift": how much it glows/floats visually
      let cardLift = 0;
      // Brightness: how much the card color is lifted
      let cardBrightness = 1;
      // Emissive: reflective accents, icons, borders
      let emissive = 0;

      if (dist < maxRadius) {
        // Soft quadratic falloff for realism
        const light = 1 - Math.min(dist / maxRadius, 1);
        // The closer you are, the more lift & brightness & emissive
        cardLift = 0.13 * light ** 2 + 0.03 * light;        // subtle lift, squared falloff
        cardBrightness = 1.01 + 0.21 * light ** 1.5;        // not too much, or it's blinding
        emissive = 0.16 * light ** 2 + 0.03 * light;        // glowy border, accents
      }
      return { cardLift, cardBrightness, emissive };
    }

    function updatePanels(mouseX?: number, mouseY?: number) {
      // If not supplied, get from CSS variable (for resize!), fallback to center of window.
      let x = mouseX ?? parseFloat(document.body.style.getPropertyValue("--mouse-x") || '') || window.innerWidth / 2;
      let y = mouseY ?? parseFloat(document.body.style.getPropertyValue("--mouse-y") || '') || window.innerHeight / 2;
      // All "panel" selectors that should reflect the light
      const selector = [
        ".cathedral-card",
        ".byzantine-border",
        ".scroll-parchment"
      ].join(",");

      document.body.classList.add("panel-lift-active");
      document.querySelectorAll<HTMLElement>(selector).forEach(panel => {
        const rect = panel.getBoundingClientRect();
        const { cardLift, cardBrightness, emissive } = getLightProps(x, y, rect);
        panel.style.setProperty("--card-lift", cardLift.toFixed(3));
        panel.style.setProperty("--card-brightness", cardBrightness.toFixed(3));
        panel.style.setProperty("--emissive-strength", emissive.toFixed(3));
      });
    }

    function handleMove(e: MouseEvent) {
      const x = e.clientX;
      const y = e.clientY;
      [darkRef, highlightRef].forEach(ref => {
        if (ref.current) {
          ref.current.style.setProperty("--mouse-x", `${x}px`);
          ref.current.style.setProperty("--mouse-y", `${y}px`);
        }
      });
      // Pass mouse pos via CSS for e.g. accent icons
      document.body.style.setProperty("--mouse-x", `${x}px`);
      document.body.style.setProperty("--mouse-y", `${y}px`);
      updatePanels(x, y);
    }

    // Keep everything updating on resize
    function handleResize() {
      updatePanels();
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("resize", handleResize);

    // Init to center (prevents dark boot flicker)
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
    updatePanels(vw, vh);

    // Clean up
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Disable on mobile for perf
  return (
    <>
      <div
        ref={darkRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-40 mouse-darkness-overlay"
        style={{
          "--mouse-x": "50vw",
          "--mouse-y": "50vh",
        } as React.CSSProperties}
      />
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
