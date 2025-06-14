
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  theme?: 'light' | 'dark' | 'gold';
  animated?: boolean;
}

export function AnimatedBackground({
  className,
  intensity = 'medium',
  theme = 'gold',
  animated = true
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !animated) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Particle settings based on intensity
    const particleCount = {
      low: 30,
      medium: 60,
      high: 100
    }[intensity];

    // Emissive gold
    const goldMain = 'rgba(212,175,55,1)';
    const goldSoft = 'rgba(212,175,55,0.25)';
    const particleColor = goldMain;
    const bgGlowColor = 'rgba(255, 220, 100, 0.075)';

    // Create particles
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      phase: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = (Math.random() * 4 + 2) * window.devicePixelRatio;
        this.speedX = (Math.random() * 0.5 - 0.25) * window.devicePixelRatio;
        this.speedY = (Math.random() * 0.5 - 0.25) * window.devicePixelRatio;
        this.opacity = Math.random() * 0.6 + 0.4;
        this.phase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX * 0.5;
        this.y += this.speedY * 0.5;
        this.phase += 0.008;

        if (this.x < 0 || this.x > canvas.width) {
          this.speedX = -this.speedX;
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.speedY = -this.speedY;
        }
      }

      draw() {
        if (!ctx) return;
        const modulated = this.opacity * (0.7 + 0.3*Math.sin(this.phase));
        // Draw outer glow (emissive)
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size*1.8, 0, Math.PI*2);
        ctx.globalAlpha = 0.09 * modulated;
        ctx.fillStyle = goldMain;
        ctx.shadowBlur = 22 * window.devicePixelRatio;
        ctx.shadowColor = goldMain;
        ctx.fill();
        ctx.restore();

        // Draw main core
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size*0.7, 0, Math.PI*2);
        ctx.globalAlpha = 0.36 * modulated;
        ctx.fillStyle = goldMain;
        ctx.shadowBlur = 10 * window.devicePixelRatio;
        ctx.shadowColor = goldSoft;
        ctx.fill();
        ctx.restore();
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function connectParticles() {
      if (!ctx) return;

      const maxDistance = 110 * window.devicePixelRatio;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.save();
            ctx.globalAlpha = (1 - distance / maxDistance) * 0.09;
            ctx.strokeStyle = goldMain;
            ctx.shadowBlur = 16 * window.devicePixelRatio;
            ctx.shadowColor = goldMain;
            ctx.lineWidth = 1 * window.devicePixelRatio;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    }

    let lastTimestamp = 0;
    function animate(ts: number) {
      if (ts - lastTimestamp > 1000/60) lastTimestamp = ts;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // BG glow
      // Large soft radial "emission"
      const R = Math.max(canvas.width, canvas.height) * 0.6;
      const grad = ctx.createRadialGradient(
        canvas.width/2, canvas.height/2, R*0.1,
        canvas.width/2, canvas.height/2, R
      );
      grad.addColorStop(0, 'rgba(255,245,180,0.24)');
      grad.addColorStop(0.54, bgGlowColor);
      grad.addColorStop(1, 'rgba(212,175,55,0.01)');
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = grad;
      ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.restore();

      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
      connectParticles();

      // Gloss highlight
      ctx.save();
      ctx.globalAlpha = 0.06;
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.ellipse(
        canvas.width / 2, canvas.height * 0.41,
        canvas.width * 0.23, canvas.height * 0.13,
        Math.PI / 8, 0, 2 * Math.PI
      );
      ctx.fill();
      ctx.restore();

      requestAnimationFrame(animate);
    }

    animate(0);

    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, [animated, intensity, theme]);

  return (
    <div className={cn("fixed inset-0 -z-10 pointer-events-none select-none", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none select-none" tabIndex={-1} aria-hidden />
      {/* SVG invariants and glowing patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-8 pointer-events-none select-none" style={{ mixBlendMode: "lighter" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <filter id="glow" x="-70%" y="-70%" width="240%" height="240%">
              <feGaussianBlur stdDeviation="14" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <pattern id="byzantine-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30,0 L30,60 M0,30 L60,30" stroke="#D4AF37" strokeWidth="0.8" fill="none" filter="url(#glow)" />
              <circle cx="30" cy="30" r="6" fill="none" stroke="#D4AF37" strokeWidth="0.5" filter="url(#glow)" />
              <path d="M20,20 L40,40 M40,20 L20,40" stroke="#D4AF37" strokeWidth="0.5" fill="none" filter="url(#glow)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#byzantine-pattern)" />
        </svg>
      </div>
      {/* Emissive glow overlays */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/20 rounded-full filter blur-[140px] opacity-30 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gold/20 rounded-full filter blur-[100px] opacity-18 pointer-events-none" style={{animationDuration: '8s'}}></div>
      <div className="absolute top-3/4 left-1/4 w-[340px] h-[340px] bg-gold/10 rounded-full filter blur-[70px] opacity-10 pointer-events-none" style={{animationDuration: '10s'}}></div>
      {/* Byzantine cross silhouette */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
        <svg width="600" height="600" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 10 L50 90 M30 30 L70 30 M25 70 L75 70 M20 50 L80 50"
            stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
        </svg>
      </div>
    </div>
  );
}
