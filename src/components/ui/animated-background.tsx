import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  theme?: 'light' | 'dark' | 'gold';
  animated?: boolean;
}

function isMobileDevice() {
  if (typeof window === "undefined") return false;
  return /Mobi|Android|iPhone|iPad|iPod|Opera Mini/i.test(window.navigator.userAgent);
}

export function AnimatedBackground({
  className,
  intensity = 'medium',
  theme = 'gold',
  animated = true
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const lastVisibilityState = useRef<'visible'|'hidden'>('visible');
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !animated) return;

    // Respect reduced motion if user prefers it
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    // Disable entirely for mobile devices for max perf
    if (isMobileDevice()) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Lowered particle count for better perf on most screens
    const particleCount = {
      low: 18,
      medium: isMobileDevice() ? 15 : 30,
      high: isMobileDevice() ? 25 : 50
    }[intensity];

    const particleColor = {
      light: '#FFFFFF',
      dark: '#1A1F2C',
      gold: '#D4AF37'
    }[theme];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 0.35 - 0.18;
        this.speedY = Math.random() * 0.35 - 0.18;
        this.opacity = Math.random() * 0.4 + 0.15;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) { this.speedX = -this.speedX; }
        if (this.y < 0 || this.y > canvas.height) { this.speedY = -this.speedY; }
      }
      draw() {
        if (!ctx) return;
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function connectParticles() {
      if (!ctx) return;
      const maxDistance = 90;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = particleColor;
            ctx.globalAlpha = opacity * 0.13;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    let running = true;
    function animate() {
      if (!ctx || !running) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
      connectParticles();
      animationRef.current = requestAnimationFrame(animate);
    }

    // Visibility API: pause when tab hidden
    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        running = true;
        if (lastVisibilityState.current !== 'visible') {
          animate();
        }
        lastVisibilityState.current = 'visible';
      } else {
        running = false;
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        lastVisibilityState.current = 'hidden';
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange);

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      running = false;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animated, intensity, theme]);

  return (
    <div className={cn("fixed inset-0 -z-10 overflow-hidden", className)}>
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      {/* Cathedral background pattern with cross motifs */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="byzantine-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30,0 L30,60 M0,30 L60,30" stroke="#D4AF37" strokeWidth="0.8" fill="none" />
              <circle cx="30" cy="30" r="6" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
              <path d="M20,20 L40,40 M40,20 L20,40" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#byzantine-pattern)" />
        </svg>
      </div>
      
      {/* Cathedral dome shapes */}
      <div className="absolute bottom-0 left-0 w-full h-[30%] opacity-10">
        <svg viewBox="0 0 1200 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,200 C300,100 900,100 1200,200 L1200,200 L0,200 Z" fill="#D4AF37" />
        </svg>
      </div>
      
      {/* Light effects resembling stained glass windows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-byzantine/10 rounded-full filter blur-[120px] opacity-30 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gold/10 rounded-full filter blur-[90px] opacity-20 animate-pulse" style={{animationDuration: '8s'}}></div>
      <div className="absolute top-3/4 left-1/4 w-[300px] h-[300px] bg-gold/15 rounded-full filter blur-[60px] opacity-15 animate-pulse" style={{animationDuration: '10s'}}></div>
      
      {/* Byzantine cross silhouette */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
        <svg width="600" height="600" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 10 L50 90 M30 30 L70 30 M25 70 L75 70 M20 50 L80 50" 
                stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      {/* Cathedral arches */}
      <div className="absolute inset-0 flex items-end justify-center opacity-5">
        <svg width="100%" height="30%" viewBox="0 0 1000 200" preserveAspectRatio="none">
          <path d="M0,200 C250,50 750,50 1000,200" fill="none" stroke="#D4AF37" strokeWidth="1" />
          <path d="M200,200 C350,100 650,100 800,200" fill="none" stroke="#D4AF37" strokeWidth="1" />
          <path d="M400,200 C450,150 550,150 600,200" fill="none" stroke="#D4AF37" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}
