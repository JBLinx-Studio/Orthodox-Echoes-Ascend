
import React, { useEffect, useRef } from "react";
import { Star } from "lucide-react";

/**
 * A global, performant "divine illumination" overlay.
 * Shows:
 *  - Global gold light/dark radial gradients blending with all content.
 *  - Mouse pointer becomes a luminous, gently rotating star casting soft glows.
 *  - Panels (via :root or [data-emissive]) will react to the star ("emissive-strength").
 * No per-panel mouse tracking, no lag!
 */
export function MouseLightOverlay() {
  const pointerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let starAngle = 0;
    let frameId: number;
    let ticking = false;

    function setVars(x: number, y: number) {
      document.documentElement.style.setProperty("--mouse-x", `${x}px`);
      document.documentElement.style.setProperty("--mouse-y", `${y}px`);
      // Calculate "proximity" for panel highlight strength, global
      // E.g. as mouse is in center, stronger
      const dx = x - window.innerWidth / 2;
      const dy = y - window.innerHeight / 2;
      const dist = Math.sqrt(dx * dx + dy * dy);
      // Max proximity in px: 0 (center) to ~800 (corners on FHD). Map to 0.35..0.68
      const pct = 1.0 - Math.min(dist / 800, 1.0);
      document.documentElement.style.setProperty(
        "--emissive-strength",
        (0.35 + 0.33 * pct).toString()
      );
    }

    const handleMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      setVars(lastX, lastY);
      if (pointerRef.current && !ticking) {
        requestAnimationFrame(() => {
          if (pointerRef.current) {
            pointerRef.current.style.transform = `translate(${lastX}px,${lastY}px) rotate(${starAngle}deg)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    function animate() {
      starAngle += 1;
      if (pointerRef.current) {
        pointerRef.current.style.transform = `translate(${lastX}px,${lastY}px) rotate(${starAngle}deg)`;
      }
      frameId = requestAnimationFrame(animate);
    }

    // Initialize to center
    setVars(lastX, lastY);
    animate();
    window.addEventListener("mousemove", handleMove);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  // Radial glows: one dark overlay, one gold highlight, both soft blend
  return (
    <>
      {/* The soft darkness for candle-lit effect */}
      <div
        className="mouse-darkness-overlay pointer-events-none"
        aria-hidden="true"
        style={{
          // Fallback to center if no JS
          background:
            "radial-gradient(420px 320px at var(--mouse-x, 50vw) var(--mouse-y, 50vh), rgba(40, 33, 13, 0.01) 0%, rgba(20, 18, 8, 0.15) 50%, rgba(10, 7, 3, 0.84) 92%, rgba(8, 6, 2, 0.94) 100%)",
          opacity: 0.93,
        }}
      />
      {/* Divine gold illumination highlight */}
      <div
        className="mouse-light-overlay pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(360px 280px at var(--mouse-x, 50vw) var(--mouse-y, 50vh), rgba(240,220,100,0.18) 0%, rgba(212,175,55,0.09) 45%, rgba(120,104,30,0.05) 80%, rgba(6,4,1,0.00) 100%)",
          opacity: 0.72,
          mixBlendMode: "screen",
        }}
      />
      {/* Gold star pointer, above everything */}
      <div
        ref={pointerRef}
        style={{
          left: "-24px",
          top: "-24px",
        }}
        className="fixed z-[10000] pointer-events-none"
        aria-hidden="true"
      >
        <Star
          size={48}
          color="#D4AF37"
          fill="rgba(212,175,55,0.48)"
          style={{
            filter:
              "drop-shadow(0 0 28px #D4AF3780) blur(0.5px) brightness(1.15)",
            transition: "filter 0.12s",
            mixBlendMode: "screen",
          }}
          className="animate-[icon-glow_3s_ease-in-out_infinite]"
        />
      </div>
    </>
  );
}
