
import React, { useEffect, useRef } from "react";

function isMobileDevice() {
  if (typeof window === "undefined") return false;
  return /Mobi|Android|iPhone|iPad|iPod|Opera Mini/i.test(window.navigator.userAgent);
}

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
    // Hide overlay completely for performance/chrome on mobile or users with reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isMobileDevice()) {
      if (darkRef.current) darkRef.current.style.display = "none";
      if (highlightRef.current) highlightRef.current.style.display = "none";
      document.body.classList.remove("panel-lift-active");
      return;
    }

    function getLightProps(mouseX: number, mouseY: number, rect: DOMRect) {
      const cardX = rect.left + rect.width / 2;
      const cardY = rect.top + rect.height / 2;
      const dist = Math.sqrt((mouseX - cardX) ** 2 + (mouseY - cardY) ** 2);
      const maxRadius = Math.max(window.innerWidth, window.innerHeight) / 1.0;
      let cardLift = 0, cardBrightness = 1, emissive = 0, glassGloss = 0.18, glassBlur = 10, glassBgLight = 0, glassPrism = 0, metallicShine = 0;
      if (dist < maxRadius) {
        const light = 1 - Math.min(dist / maxRadius, 1);
        cardLift = 0.16 * Math.pow(light, 1.55) + 0.035 * light;
        cardBrightness = 1.04 + 0.22 * Math.pow(light, 2);
        emissive = 0.27 * Math.pow(light, 1.5) + 0.07 * light;
        glassGloss = 0.23 * light + 0.17;
        glassBlur = 15 + (25 * Math.pow(light, 3));
        glassBgLight = 0.10 + 0.45 * Math.pow(light, 1.6);
        glassPrism = 0.12 * Math.pow(light, 1.5);
        metallicShine = 0.10 * light + 0.09 * Math.pow(light, 2);
      }
      return { cardLift, cardBrightness, emissive, glassGloss, glassBlur, glassBgLight, glassPrism, metallicShine };
    }

    // Throttle mousemove for better perf
    let ticking = false;
    function updatePanels(mouseX?: number, mouseY?: number) {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        let x = mouseX ?? (parseFloat(document.body.style.getPropertyValue("--mouse-x") || "") || window.innerWidth / 2);
        let y = mouseY ?? (parseFloat(document.body.style.getPropertyValue("--mouse-y") || "") || window.innerHeight / 2);
        const selector = [".cathedral-card", ".byzantine-border", ".scroll-parchment"].join(",");
        document.body.classList.add("panel-lift-active");
        document.querySelectorAll<HTMLElement>(selector).forEach(panel => {
          const rect = panel.getBoundingClientRect();
          const { cardLift, cardBrightness, emissive, glassGloss, glassBlur, glassBgLight, glassPrism, metallicShine } = getLightProps(x, y, rect);
          panel.style.setProperty("--card-lift", cardLift.toFixed(3));
          panel.style.setProperty("--card-brightness", cardBrightness.toFixed(3));
          panel.style.setProperty("--emissive-strength", emissive.toFixed(3));
          panel.style.setProperty("--glass-gloss", glassGloss.toFixed(3));
          panel.style.setProperty("--glass-blur", glassBlur.toFixed(1));
          panel.style.setProperty("--glass-bg-light", glassBgLight.toFixed(3));
          panel.style.setProperty("--glass-prism", glassPrism.toFixed(3));
          panel.style.setProperty("--metallic-shine", metallicShine.toFixed(3));
        });
        ticking = false;
      });
    }

    let lastRun = 0;
    function handleMove(e: MouseEvent) {
      const now = performance.now();
      // Only run at ~30fps
      if (now - lastRun < 33) return;
      lastRun = now;
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
      updatePanels(x, y);
    }

    function handleResize() {
      updatePanels();
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("resize", handleResize);

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

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Avoid rendering at all on mobile/reduced-motion
  const show = !(typeof window !== "undefined" && (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || isMobileDevice()));

  if (!show) return null;

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
