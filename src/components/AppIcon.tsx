import React from 'react';

interface AppIconProps {
  size?: number;
  className?: string;
  showLaunchText?: boolean;
  isInteractive?: boolean;
}

export function AppIcon({ size = 64, className = '', showLaunchText = false, isInteractive = false }: AppIconProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Background Circle */}
        <circle
          cx="32"
          cy="32"
          r="30"
          fill="url(#gradient)"
          stroke="url(#borderGradient)"
          strokeWidth="2"
        />
        
        {/* Main Inventory Box Icon */}
        <rect
          x="18"
          y="20"
          width="28"
          height="18"
          rx="3"
          fill="white"
          fillOpacity="0.9"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
        />
        
        {/* Box Details */}
        <rect x="20" y="22" width="24" height="2" rx="1" fill="rgba(3,2,19,0.6)" />
        <rect x="20" y="26" width="16" height="1.5" rx="0.75" fill="rgba(3,2,19,0.4)" />
        <rect x="20" y="29" width="12" height="1.5" rx="0.75" fill="rgba(3,2,19,0.4)" />
        <rect x="20" y="32" width="20" height="1.5" rx="0.75" fill="rgba(3,2,19,0.4)" />
        
        {/* AI Sparkle Elements */}
        <circle cx="40" cy="16" r="2" fill="white" fillOpacity="0.8" />
        <circle cx="48" cy="24" r="1.5" fill="white" fillOpacity="0.6" />
        <circle cx="44" cy="44" r="1.5" fill="white" fillOpacity="0.6" />
        <circle cx="16" cy="44" r="2" fill="white" fillOpacity="0.8" />
        
        {/* Tech Circuit Lines */}
        <path
          d="M12 32 L18 32 M46 32 L52 32"
          stroke="white"
          strokeWidth="1.5"
          strokeOpacity="0.7"
          strokeLinecap="round"
        />
        <path
          d="M32 12 L32 18 M32 46 L32 52"
          stroke="white"
          strokeWidth="1.5"
          strokeOpacity="0.7"
          strokeLinecap="round"
        />
        

        
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#030213" />
            <stop offset="50%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Favicon version (smaller, simplified)
export function FaviconIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="15" fill="url(#faviconGradient)" />
      <rect x="9" y="10" width="14" height="9" rx="1.5" fill="white" fillOpacity="0.9" />
      <rect x="10" y="11" width="12" height="1" fill="rgba(3,2,19,0.6)" />
      <rect x="10" y="13" width="8" height="0.8" fill="rgba(3,2,19,0.4)" />
      <rect x="10" y="15" width="6" height="0.8" fill="rgba(3,2,19,0.4)" />
      <rect x="10" y="17" width="10" height="0.8" fill="rgba(3,2,19,0.4)" />
      <circle cx="24" cy="8" r="1" fill="white" fillOpacity="0.8" />
      <circle cx="8" cy="24" r="1" fill="white" fillOpacity="0.8" />
      <defs>
        <linearGradient id="faviconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#030213" />
          <stop offset="50%" stopColor="#1e40af" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
    </svg>
  );
}