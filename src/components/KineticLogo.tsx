/**
 * KineticLogo Component - MaycoleTracker™ Volume XI
 * ENHANCED 3D/4D DESIGN: Blue circle with white cross, 4 dots, and white square box
 * NEW: Advanced 3D/4D thickness effects with depth and dimensional layers
 */

import React from 'react';

interface KineticLogoProps {
  size?: number;
  className?: string;
  interactive?: boolean;
  enable3D?: boolean;
}

export default function KineticLogo({ 
  size = 220,
  className = '',
  interactive = true,
  enable3D = true
}: KineticLogoProps) {
  const dotRadius = 5;
  const lineWidth = 4;
  const lineLength = 60;

  const baseClass = interactive 
    ? 'transition-all duration-300 hover:scale-105 cursor-pointer' 
    : '';
  
  const combinedClass = `${baseClass} ${className}`.trim();

  // 3D/4D thickness calculations
  const thickness = size * 0.08; // 8% of size for thickness
  const depthOffset = size * 0.04; // 4% of size for depth offset

  return (
    <div 
      className={combinedClass}
      style={{ 
        position: 'relative',
        width: size,
        height: size,
        filter: interactive ? 'drop-shadow(0 8px 32px rgba(0, 123, 255, 0.3))' : 'none',
        transform: enable3D ? 'perspective(1000px) rotateX(5deg) rotateY(-5deg)' : 'none',
        transformStyle: 'preserve-3d'
      }}
      role="img"
      aria-label="MaycoleTracker™ Volume XI Kinetic Logo"
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100"
        style={{ display: 'block', position: 'relative', zIndex: 10 }}
      >
      {/* Enhanced gradients for 3D/4D effects */}
      <defs>
        {/* Main circle gradient with 3D depth */}
        <radialGradient id={`kineticGradient-${size}`} cx="0.3" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#4A9BFF" />
          <stop offset="30%" stopColor="#0066FF" />
          <stop offset="70%" stopColor="#007BFF" />
          <stop offset="100%" stopColor="#0056B3" />
        </radialGradient>
        
        {/* 3D thickness gradient for sides */}
        <linearGradient id={`thicknessGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#004085" />
          <stop offset="50%" stopColor="#0056B3" />
          <stop offset="100%" stopColor="#003570" />
        </linearGradient>
        
        {/* Shadow gradient for depth */}
        <radialGradient id={`shadowGradient-${size}`} cx="0.6" cy="0.6" r="0.8">
          <stop offset="0%" stopColor="rgba(0, 0, 0, 0)" />
          <stop offset="70%" stopColor="rgba(0, 0, 0, 0.1)" />
          <stop offset="100%" stopColor="rgba(0, 0, 0, 0.3)" />
        </radialGradient>

        {/* White element gradients for 3D effect */}
        <linearGradient id={`whiteGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#f8f9fa" />
          <stop offset="100%" stopColor="#e9ecef" />
        </linearGradient>

        {/* Cross thickness gradient */}
        <linearGradient id={`crossThickness-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e9ecef" />
          <stop offset="50%" stopColor="#dee2e6" />
          <stop offset="100%" stopColor="#ced4da" />
        </linearGradient>
      </defs>

      {/* 3D/4D Shadow layer (behind main circle) */}
      {enable3D && (
        <circle 
          cx="54" 
          cy="54" 
          r="48" 
          fill={`url(#shadowGradient-${size})`}
          opacity="0.4"
          style={{ transform: 'translateZ(-20px)' }}
        />
      )}

      {/* 3D/4D Thickness layers for main circle */}
      {enable3D && (
        <>
          {/* Bottom thickness layer */}
          <ellipse 
            cx="52" 
            cy="52" 
            rx="49" 
            ry="47" 
            fill={`url(#thicknessGradient-${size})`}
            opacity="0.8"
            style={{ transform: 'translateZ(-10px)' }}
          />
          
          {/* Middle thickness layer */}
          <ellipse 
            cx="51" 
            cy="51" 
            rx="49.5" 
            ry="48" 
            fill={`url(#thicknessGradient-${size})`}
            opacity="0.6"
            style={{ transform: 'translateZ(-5px)' }}
          />
        </>
      )}

      {/* Main circle with enhanced 3D gradient */}
      <circle cx="50" cy="50" r="50" fill={`url(#kineticGradient-${size})`} style={{ transform: 'translateZ(0px)' }} />

      {/* 3D/4D Enhanced Cross with Thickness */}
      
      {/* Cross thickness layers (3D depth effect) */}
      {enable3D && (
        <>
          {/* Horizontal cross - thickness layers */}
          <rect x="15.5" y="46.5" width="69" height="7" fill={`url(#crossThickness-${size})`} rx="1" opacity="0.7" style={{ transform: 'translateZ(-8px)' }} />
          <rect x="15.2" y="46.2" width="69.5" height="7.5" fill={`url(#crossThickness-${size})`} rx="1" opacity="0.5" style={{ transform: 'translateZ(-12px)' }} />
          
          {/* Vertical cross - thickness layers */}
          <rect x="46.5" y="15.5" width="7" height="69" fill={`url(#crossThickness-${size})`} rx="1" opacity="0.7" style={{ transform: 'translateZ(-8px)' }} />
          <rect x="46.2" y="15.2" width="7.5" height="69.5" fill={`url(#crossThickness-${size})`} rx="1" opacity="0.5" style={{ transform: 'translateZ(-12px)' }} />
        </>
      )}

      {/* Main cross - horizontal line with 3D gradient */}
      <rect x="15" y="46" width="70" height="8" fill={`url(#whiteGradient-${size})`} rx="1" 
            style={{ transform: 'translateZ(2px)', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))' }} />

      {/* Main cross - vertical line with 3D gradient */}
      <rect x="46" y="15" width="8" height="70" fill={`url(#whiteGradient-${size})`} rx="1" 
            style={{ transform: 'translateZ(2px)', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))' }} />

      {/* 3D/4D Enhanced Document Box with thickness */}
      
      {/* Document box thickness layers */}
      {enable3D && (
        <>
          <rect x="37.5" y="37.5" width="25.5" height="25.5" fill={`url(#crossThickness-${size})`} rx="2" opacity="0.6" style={{ transform: 'translateZ(-6px)' }} />
          <rect x="37.3" y="37.3" width="25.8" height="25.8" fill={`url(#crossThickness-${size})`} rx="2" opacity="0.4" style={{ transform: 'translateZ(-10px)' }} />
        </>
      )}

      {/* RESTORED ORIGINAL Document Box - PROPER WIDTH */}
      <rect x="32" y="32" width="36" height="36" fill={`url(#whiteGradient-${size})`} rx="3" 
            style={{
              transform: 'translateZ(8px)',
              filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 12px rgba(255, 255, 255, 0.8))'
            }} />
      
      {/* Enhanced Document Lines with PROPER WIDTH */}
      <rect x="36" y="38" width="28" height="2" fill="#0066FF" opacity="1" rx="1" style={{ transform: 'translateZ(10px)' }} />
      <rect x="36" y="42" width="24" height="2" fill="#007BFF" opacity="0.9" rx="1" style={{ transform: 'translateZ(10px)' }} />
      <rect x="36" y="46" width="30" height="2" fill="#0066FF" opacity="1" rx="1" style={{ transform: 'translateZ(10px)' }} />
      <rect x="36" y="50" width="22" height="2" fill="#007BFF" opacity="0.8" rx="1" style={{ transform: 'translateZ(10px)' }} />
      <rect x="36" y="54" width="26" height="2" fill="#0066FF" opacity="0.9" rx="1" style={{ transform: 'translateZ(10px)' }} />
      <rect x="36" y="58" width="20" height="2" fill="#007BFF" opacity="0.8" rx="1" style={{ transform: 'translateZ(10px)' }} />
      <rect x="36" y="62" width="24" height="2" fill="#0066FF" opacity="0.9" rx="1" style={{ transform: 'translateZ(10px)' }} />

      {/* Beautiful starry sky dots inside the logo - various sizes, no dots outside or too close to edges */}
      {[
        // Large stars (like bright stars in the sky)
        { cx: 25, cy: 30, r: 1.8, opacity: 0.95 },
        { cx: 75, cy: 25, r: 1.6, opacity: 0.9 },
        { cx: 70, cy: 70, r: 1.7, opacity: 0.92 },
        
        // Medium stars 
        { cx: 35, cy: 20, r: 1.2, opacity: 0.85 },
        { cx: 80, cy: 40, r: 1.3, opacity: 0.88 },
        { cx: 30, cy: 75, r: 1.1, opacity: 0.86 },
        { cx: 65, cy: 80, r: 1.4, opacity: 0.89 },
        { cx: 20, cy: 60, r: 1.2, opacity: 0.87 },
        
        // Small stars (like distant stars)
        { cx: 40, cy: 25, r: 0.8, opacity: 0.75 },
        { cx: 60, cy: 30, r: 0.9, opacity: 0.78 },
        { cx: 25, cy: 50, r: 0.7, opacity: 0.73 },
        { cx: 75, cy: 55, r: 0.8, opacity: 0.76 },
        { cx: 45, cy: 75, r: 0.9, opacity: 0.79 },
        { cx: 55, cy: 20, r: 0.7, opacity: 0.74 },
        { cx: 80, cy: 65, r: 0.8, opacity: 0.77 }
      ].map((star, index) => (
        <circle
          key={index}
          cx={star.cx}
          cy={star.cy}
          r={star.r}
          fill="white"
          opacity={star.opacity}
        />
      ))}

      </svg>
    </div>
  );
}

// Enhanced size variants with 3D/4D options
export function KineticLogoSmall({ className, enable3D = true }: { className?: string; enable3D?: boolean }) {
  return <KineticLogo size={120} className={className} enable3D={enable3D} />;
}

export function KineticLogoMedium({ className, enable3D = true }: { className?: string; enable3D?: boolean }) {
  return <KineticLogo size={180} className={className} enable3D={enable3D} />;
}

export function KineticLogoLarge({ className, enable3D = true }: { className?: string; enable3D?: boolean }) {
  return <KineticLogo size={280} className={className} enable3D={enable3D} />;
}

export function KineticLogoHero({ className, enable3D = true }: { className?: string; enable3D?: boolean }) {
  return <KineticLogo size={320} className={className} enable3D={enable3D} />;
}

// Static variant (no interactions, optional 3D)
export function KineticLogoStatic({ 
  size = 220, 
  className, 
  enable3D = false 
}: { 
  size?: number; 
  className?: string; 
  enable3D?: boolean;
}) {
  return <KineticLogo size={size} className={className} interactive={false} enable3D={enable3D} />;
}

// New 3D/4D specific variants
export function KineticLogo3D({ 
  size = 220, 
  className 
}: { 
  size?: number; 
  className?: string; 
}) {
  return <KineticLogo size={size} className={className} enable3D={true} interactive={true} />;
}

export function KineticLogoFlat({ 
  size = 220, 
  className 
}: { 
  size?: number; 
  className?: string; 
}) {
  return <KineticLogo size={size} className={className} enable3D={false} interactive={true} />;
}