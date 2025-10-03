/**
 * Advanced Particle System Component - FIXED LAYERS
 * Creates spectacular particle effects for MaycoleTechnologies™
 * Fixed z-index layering and added atomic variant
 */

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

interface ParticleSystemProps {
  width?: number;
  height?: number;
  particleCount?: number;
  colors?: string[];
  variant?: 'floating' | 'orbiting' | 'exploding' | 'flowing' | 'magnetic' | 'atomic';
  speed?: number;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({
  width = 400,
  height = 300,
  particleCount = 50,
  colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'],
  variant = 'floating',
  speed = 1,
  size = 'medium',
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  const getSizeMultiplier = () => {
    switch (size) {
      case 'small': return 0.5;
      case 'large': return 2;
      default: return 1;
    }
  };

  const createParticle = (index: number): Particle => {
    const sizeMultiplier = getSizeMultiplier();
    const centerX = width / 2;
    const centerY = height / 2;
    
    switch (variant) {
      case 'orbiting':
        const angle = (index / particleCount) * Math.PI * 2;
        const radius = 50 + Math.random() * 100;
        return {
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          vx: Math.sin(angle) * speed * 0.5,
          vy: -Math.cos(angle) * speed * 0.5,
          size: (2 + Math.random() * 4) * sizeMultiplier,
          opacity: 0.6 + Math.random() * 0.4,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 0,
          maxLife: 1000 + Math.random() * 2000
        };
      
      case 'exploding':
        const explosionAngle = Math.random() * Math.PI * 2;
        const explosionSpeed = 1 + Math.random() * 3;
        return {
          x: centerX,
          y: centerY,
          vx: Math.cos(explosionAngle) * explosionSpeed * speed,
          vy: Math.sin(explosionAngle) * explosionSpeed * speed,
          size: (1 + Math.random() * 6) * sizeMultiplier,
          opacity: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 0,
          maxLife: 500 + Math.random() * 1000
        };
      
      case 'flowing':
        return {
          x: -10,
          y: Math.random() * height,
          vx: 1 + Math.random() * 2 * speed,
          vy: (Math.random() - 0.5) * 0.5 * speed,
          size: (2 + Math.random() * 4) * sizeMultiplier,
          opacity: 0.4 + Math.random() * 0.6,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 0,
          maxLife: 3000 + Math.random() * 2000
        };
      
      case 'magnetic':
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          size: (1 + Math.random() * 3) * sizeMultiplier,
          opacity: 0.3 + Math.random() * 0.7,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 0,
          maxLife: 2000 + Math.random() * 3000
        };
      
      case 'atomic':
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed * 2,
          vy: (Math.random() - 0.5) * speed * 2,
          size: (1 + Math.random() * 2) * sizeMultiplier,
          opacity: 0.5 + Math.random() * 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 0,
          maxLife: 3000 + Math.random() * 2000
        };
      
      default: // floating
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          size: (2 + Math.random() * 3) * sizeMultiplier,
          opacity: 0.4 + Math.random() * 0.6,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 0,
          maxLife: 4000 + Math.random() * 2000
        };
    }
  };

  const updateParticle = (particle: Particle): Particle => {
    const newParticle = { ...particle };
    
    // Update position
    newParticle.x += newParticle.vx;
    newParticle.y += newParticle.vy;
    newParticle.life += 16; // Assume 60fps
    
    // Variant-specific behaviors
    switch (variant) {
      case 'orbiting':
        const centerX = width / 2;
        const centerY = height / 2;
        const distFromCenter = Math.sqrt(
          Math.pow(newParticle.x - centerX, 2) + 
          Math.pow(newParticle.y - centerY, 2)
        );
        if (distFromCenter > 150) {
          const angle = Math.atan2(newParticle.y - centerY, newParticle.x - centerX);
          newParticle.vx = Math.sin(angle) * speed * 0.5;
          newParticle.vy = -Math.cos(angle) * speed * 0.5;
        }
        break;
      
      case 'magnetic':
        // Attraction to mouse
        const dx = mouseRef.current.x - newParticle.x;
        const dy = mouseRef.current.y - newParticle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100 && dist > 0) {
          const force = (100 - dist) / 1000;
          newParticle.vx += (dx / dist) * force;
          newParticle.vy += (dy / dist) * force;
        }
        // Damping
        newParticle.vx *= 0.98;
        newParticle.vy *= 0.98;
        break;
      
      case 'exploding':
        newParticle.vy += 0.05; // Gravity
        newParticle.vx *= 0.99; // Air resistance
        newParticle.vy *= 0.99;
        break;
      
      case 'flowing':
        if (newParticle.x > width + 10) {
          newParticle.x = -10;
          newParticle.y = Math.random() * height;
        }
        break;
      
      case 'atomic':
        // Atomic particles bounce around more energetically
        if (newParticle.x < 0 || newParticle.x > width) newParticle.vx *= -0.8;
        if (newParticle.y < 0 || newParticle.y > height) newParticle.vy *= -0.8;
        newParticle.x = Math.max(0, Math.min(width, newParticle.x));
        newParticle.y = Math.max(0, Math.min(height, newParticle.y));
        break;
    }
    
    // Boundary handling for floating particles
    if (variant === 'floating') {
      if (newParticle.x < 0 || newParticle.x > width) newParticle.vx *= -1;
      if (newParticle.y < 0 || newParticle.y > height) newParticle.vy *= -1;
      newParticle.x = Math.max(0, Math.min(width, newParticle.x));
      newParticle.y = Math.max(0, Math.min(height, newParticle.y));
    }
    
    // Update opacity based on life
    const lifeRatio = newParticle.life / newParticle.maxLife;
    if (lifeRatio > 0.7) {
      newParticle.opacity = (1 - lifeRatio) * 3; // Fade out in last 30% of life
    }
    
    return newParticle;
  };

  const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.save();
    ctx.globalAlpha = particle.opacity;
    ctx.fillStyle = particle.color;
    ctx.shadowColor = particle.color;
    ctx.shadowBlur = particle.size * 2;
    
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Add inner glow
    ctx.globalAlpha = particle.opacity * 0.5;
    ctx.shadowBlur = particle.size * 4;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas completely for crisp particles
    ctx.clearRect(0, 0, width, height);
    
    // Update and draw particles
    particlesRef.current = particlesRef.current.map((particle, index) => {
      const updatedParticle = updateParticle(particle);
      
      // Respawn particle if it died
      if (updatedParticle.life > updatedParticle.maxLife) {
        return createParticle(index);
      }
      
      drawParticle(ctx, updatedParticle);
      return updatedParticle;
    });
    
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Initialize particles
    particlesRef.current = Array.from({ length: particleCount }, (_, i) => createParticle(i));
    
    // Mouse tracking for magnetic effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    
    if (variant === 'magnetic') {
      canvas.addEventListener('mousemove', handleMouseMove);
    }
    
    // Start animation
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (variant === 'magnetic') {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [width, height, particleCount, variant, speed, size]);

  // Extract z-index from className for proper layering
  const getZIndexFromClassName = (className: string): number => {
    if (className.includes('opacity-60')) return 5;
    if (className.includes('opacity-40')) return 4;
    if (className.includes('opacity-20')) return 2;
    if (className.includes('opacity-15')) return 1;
    if (className.includes('opacity-10')) return 0;
    return 1; // default
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`pointer-events-none ${className}`}
      style={{
        background: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: getZIndexFromClassName(className)
      }}
    />
  );
};

export default ParticleSystem;