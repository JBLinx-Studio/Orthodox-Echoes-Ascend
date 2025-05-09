
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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Particle settings based on intensity
    const particleCount = {
      low: 15,
      medium: 30,
      high: 50
    }[intensity];
    
    // Color settings based on theme
    const particleColor = {
      light: '#FFFFFF',
      dark: '#1A1F2C',
      gold: '#D4AF37'
    }[theme];
    
    // Create particles
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
        this.size = Math.random() * 3 + 0.5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.3 + 0.1;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0 || this.x > canvas.width) {
          this.speedX = -this.speedX;
        }
        
        if (this.y < 0 || this.y > canvas.height) {
          this.speedY = -this.speedY;
        }
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
      
      const maxDistance = 100;
      
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = particleColor;
            ctx.globalAlpha = opacity * 0.15;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }
    
    function animate() {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
      
      connectParticles();
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, [animated, intensity, theme]);
  
  return (
    <div className={cn("fixed inset-0 -z-10 overflow-hidden", className)}>
      {/* Rich cathedral image background */}
      <div className="absolute inset-0 z-[-15]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070a14]/80 via-[#0a0d16]/90 to-[#101423]/95"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-1.2.1')] bg-cover bg-center bg-no-repeat opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d16] via-[#0a0d16]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-byzantine/10 via-transparent to-gold/5"></div>
      </div>
      
      <canvas ref={canvasRef} className="absolute inset-0 z-[-5]" />
      
      {/* Light effects resembling stained glass windows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-byzantine/5 rounded-full filter blur-[120px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gold/5 rounded-full filter blur-[90px] opacity-15 animate-pulse" style={{animationDuration: '8s'}}></div>
      <div className="absolute top-3/4 left-1/4 w-[300px] h-[300px] bg-gold/8 rounded-full filter blur-[60px] opacity-15 animate-pulse" style={{animationDuration: '10s'}}></div>
      
      {/* Cathedral dome shapes with reduced opacity */}
      <div className="absolute bottom-0 left-0 w-full h-[20%] opacity-5 z-[-10]">
        <svg viewBox="0 0 1200 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,200 C300,100 900,100 1200,200 L1200,200 L0,200 Z" fill="#D4AF37" />
        </svg>
      </div>
      
      {/* Cathedral arches with reduced visibility */}
      <div className="absolute inset-0 flex items-end justify-center opacity-3 z-[-10]">
        <svg width="100%" height="30%" viewBox="0 0 1000 200" preserveAspectRatio="none">
          <path d="M0,200 C250,50 750,50 1000,200" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
          <path d="M200,200 C350,100 650,100 800,200" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
          <path d="M400,200 C450,150 550,150 600,200" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
        </svg>
      </div>
      
      {/* Floating dust particles effect */}
      <div className="absolute inset-0 z-[-8]">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full bg-gold/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.1,
              animation: `floatingDust ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}
