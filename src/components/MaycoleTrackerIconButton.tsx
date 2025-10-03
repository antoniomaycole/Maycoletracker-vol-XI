/**
 * MaycoleTracker™ Icon Button - 100% IDENTICAL to KineticLogo Brand
 * Professional App Store Style Icon Button
 * PERFECT BRAND REPRESENTATION: Same gradients, cross, document box, and starry sky dots
 * IDENTICAL STRUCTURE: Matches every element of the main KineticLogo component
 */

import React from 'react';

interface MaycoleTrackerIconButtonProps {
  size?: number;
  onClick?: () => void;
  className?: string;
  title?: string;
  disabled?: boolean;
}

export default function MaycoleTrackerIconButton({ 
  size = 40, 
  onClick, 
  className = '',
  title = 'MaycoleTracker™ App',
  disabled = false
}: MaycoleTrackerIconButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`app-store-icon-button ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${size * 0.2}px`,
        padding: 0,
        border: '2px solid rgba(255, 255, 255, 0.2)',
        background: 'linear-gradient(135deg, #007BFF 0%, #0056b3 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: `
          0 ${size * 0.1}px ${size * 0.4}px rgba(0, 123, 255, 0.25),
          0 ${size * 0.05}px ${size * 0.2}px rgba(0, 123, 255, 0.15),
          inset 0 1px 0 rgba(255, 255, 255, 0.2)
        `,
        backdropFilter: 'blur(10px)',
        position: 'relative',
        overflow: 'hidden',
        opacity: disabled ? 0.6 : 1
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(-1px) scale(1.05)';
          e.currentTarget.style.boxShadow = `
            0 ${size * 0.2}px ${size * 0.6}px rgba(0, 123, 255, 0.35),
            0 ${size * 0.1}px ${size * 0.3}px rgba(0, 123, 255, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.3)
          `;
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = `
            0 ${size * 0.1}px ${size * 0.4}px rgba(0, 123, 255, 0.25),
            0 ${size * 0.05}px ${size * 0.2}px rgba(0, 123, 255, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.2)
          `;
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }
      }}
      onMouseDown={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(0) scale(0.95)';
        }
      }}
      onMouseUp={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(-1px) scale(1.05)';
        }
      }}
    >
      {/* Shine effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
          transition: 'left 0.5s ease',
          pointerEvents: 'none'
        }}
        className="shine-effect"
      />
      
      {/* MaycoleTracker™ Logo Icon - 100% IDENTICAL to KineticLogo */}
      <svg
        width={size * 0.7}
        height={size * 0.7}
        viewBox="0 0 100 100"
        style={{
          filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))',
          position: 'relative',
          zIndex: 1,
          display: 'block'
        }}
      >
        {/* Gradient definitions - IDENTICAL to KineticLogo */}
        <defs>
          {/* Main circle gradient with 3D depth - IDENTICAL */}
          <radialGradient id={`iconKineticGradient-${size}`} cx="0.3" cy="0.3" r="0.8">
            <stop offset="0%" stopColor="#4A9BFF" />
            <stop offset="30%" stopColor="#0066FF" />
            <stop offset="70%" stopColor="#007BFF" />
            <stop offset="100%" stopColor="#0056B3" />
          </radialGradient>
          
          {/* White element gradients for 3D effect - IDENTICAL */}
          <linearGradient id={`iconWhiteGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#f8f9fa" />
            <stop offset="100%" stopColor="#e9ecef" />
          </linearGradient>
        </defs>

        {/* Main circle with enhanced 3D gradient - IDENTICAL to KineticLogo */}
        <circle 
          cx="50" 
          cy="50" 
          r="50" 
          fill={`url(#iconKineticGradient-${size})`} 
        />

        {/* Main cross - horizontal line with 3D gradient - IDENTICAL */}
        <rect 
          x="15" 
          y="46" 
          width="70" 
          height="8" 
          fill={`url(#iconWhiteGradient-${size})`} 
          rx="1" 
          style={{ 
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))' 
          }} 
        />

        {/* Main cross - vertical line with 3D gradient - IDENTICAL */}
        <rect 
          x="46" 
          y="15" 
          width="8" 
          height="70" 
          fill={`url(#iconWhiteGradient-${size})`} 
          rx="1" 
          style={{ 
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))' 
          }} 
        />

        {/* RESTORED ORIGINAL Document Box - PROPER WIDTH - IDENTICAL */}
        <rect 
          x="32" 
          y="32" 
          width="36" 
          height="36" 
          fill={`url(#iconWhiteGradient-${size})`} 
          rx="3" 
          style={{
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2)) drop-shadow(0 0 6px rgba(255, 255, 255, 0.4))'
          }} 
        />
        
        {/* Enhanced Document Lines with PROPER WIDTH - IDENTICAL */}
        <rect x="36" y="38" width="28" height="2" fill="#0066FF" opacity="1" rx="1" />
        <rect x="36" y="42" width="24" height="2" fill="#007BFF" opacity="0.9" rx="1" />
        <rect x="36" y="46" width="30" height="2" fill="#0066FF" opacity="1" rx="1" />
        <rect x="36" y="50" width="22" height="2" fill="#007BFF" opacity="0.8" rx="1" />
        <rect x="36" y="54" width="26" height="2" fill="#0066FF" opacity="0.9" rx="1" />
        <rect x="36" y="58" width="20" height="2" fill="#007BFF" opacity="0.8" rx="1" />
        <rect x="36" y="62" width="24" height="2" fill="#0066FF" opacity="0.9" rx="1" />

        {/* Beautiful starry sky dots - IDENTICAL POSITIONING AND SIZES */}
        {[
          // Large stars (like bright stars in the sky) - IDENTICAL
          { cx: 25, cy: 30, r: 1.8, opacity: 0.95 },
          { cx: 75, cy: 25, r: 1.6, opacity: 0.9 },
          { cx: 70, cy: 70, r: 1.7, opacity: 0.92 },
          
          // Medium stars - IDENTICAL
          { cx: 35, cy: 20, r: 1.2, opacity: 0.85 },
          { cx: 80, cy: 40, r: 1.3, opacity: 0.88 },
          { cx: 30, cy: 75, r: 1.1, opacity: 0.86 },
          { cx: 65, cy: 80, r: 1.4, opacity: 0.89 },
          { cx: 20, cy: 60, r: 1.2, opacity: 0.87 },
          
          // Small stars (like distant stars) - IDENTICAL
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
    </button>
  );
}

// Export different sizes as convenience components
export function MaycoleTrackerIconButtonSmall(props: Omit<MaycoleTrackerIconButtonProps, 'size'>) {
  return <MaycoleTrackerIconButton {...props} size={32} />;
}

export function MaycoleTrackerIconButtonMedium(props: Omit<MaycoleTrackerIconButtonProps, 'size'>) {
  return <MaycoleTrackerIconButton {...props} size={40} />;
}

export function MaycoleTrackerIconButtonLarge(props: Omit<MaycoleTrackerIconButtonProps, 'size'>) {
  return <MaycoleTrackerIconButton {...props} size={48} />;
}