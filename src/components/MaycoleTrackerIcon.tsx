/**
 * MaycoleTracker™ Clean Round Icon Component
 * Minimalist, round icon button for Apple Store deployment
 * Clean blue circle with white cross and corner dots - inner logo elements only
 */

import React from 'react';

interface MaycoleTrackerIconProps {
  size?: number;
  className?: string;
  variant?: 'default' | 'app-store' | 'favicon' | 'button' | 'clean';
  interactive?: boolean;
}

export function MaycoleTrackerIcon({ 
  size = 40, 
  className = '',
  variant = 'clean',
  interactive = false
}: MaycoleTrackerIconProps) {
  const baseClass = interactive 
    ? 'transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer' 
    : '';
  
  const combinedClass = `${baseClass} ${className}`.trim();

  // Rich blue color scheme like the logo inner part
  const colors = {
    clean: {
      background: '#1e40af', // Rich, deep blue like logo inner part
      accent: '#ffffff',      // Pure white
      shadow: 'rgba(30, 64, 175, 0.3)'
    },
    default: {
      background: '#1e40af', // Rich blue
      accent: '#ffffff',
      shadow: 'rgba(30, 64, 175, 0.3)'
    },
    'app-store': {
      background: 'url(#appStoreGradient)',
      accent: '#ffffff',
      shadow: 'rgba(30, 64, 175, 0.4)'
    },
    favicon: {
      background: '#1e40af', // Rich blue
      accent: '#ffffff', 
      shadow: 'none'
    },
    button: {
      background: '#1e40af', // Rich blue
      accent: '#ffffff',
      shadow: 'rgba(30, 64, 175, 0.35)'
    }
  };

  const currentColors = colors[variant] || colors.clean;
  const isAppStore = variant === 'app-store';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={combinedClass}
      role="img"
      aria-label="MaycoleTracker App Icon"
      style={{ 
        borderRadius: '50%',
        filter: variant !== 'favicon' ? `drop-shadow(0 2px 8px ${currentColors.shadow})` : 'none'
      }}
    >
      {/* Gradient Definition for App Store */}
      {isAppStore && (
        <defs>
          <linearGradient id="appStoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="50%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
      )}

      {/* Perfect Circle Background - Clean and Round */}
      <circle
        cx="50"
        cy="50"
        r="49"
        fill={currentColors.background}
        stroke="none"
      />

      {/* Logo-style Cross Pattern with Rich Blue Background */}
      {/* Horizontal Line - Bold and Prominent */}
      <rect
        x="20"
        y="46"
        width="60"
        height="8"
        rx="4"
        fill={currentColors.accent}
        opacity="0.98"
      />

      {/* Vertical Line - Bold and Prominent */}
      <rect
        x="46"
        y="20"
        width="8"
        height="60"
        rx="4"
        fill={currentColors.accent}
        opacity="0.98"
      />

      {/* Bolder Sporadic White Dots Close to Cross - Logo Style */}
      {/* Main accent dots near cross endpoints - Bold and Prominent */}
      <circle
        cx="35"
        cy="14"
        r="4"
        fill={currentColors.accent}
        opacity="0.95"
      />

      <circle
        cx="65"
        cy="18"
        r="3.5"
        fill={currentColors.accent}
        opacity="0.9"
      />

      <circle
        cx="14"
        cy="38"
        r="3.5"
        fill={currentColors.accent}
        opacity="0.92"
      />

      <circle
        cx="86"
        cy="62"
        r="4"
        fill={currentColors.accent}
        opacity="0.95"
      />

      <circle
        cx="35"
        cy="86"
        r="3.5"
        fill={currentColors.accent}
        opacity="0.9"
      />

      <circle
        cx="65"
        cy="82"
        r="3"
        fill={currentColors.accent}
        opacity="0.88"
      />

      {/* Secondary accent dots around cross area - Sporadic but close */}
      <circle
        cx="30"
        cy="35"
        r="2.5"
        fill={currentColors.accent}
        opacity="0.85"
      />

      <circle
        cx="70"
        cy="32"
        r="2.8"
        fill={currentColors.accent}
        opacity="0.87"
      />

      <circle
        cx="32"
        cy="68"
        r="2.2"
        fill={currentColors.accent}
        opacity="0.82"
      />

      <circle
        cx="68"
        cy="65"
        r="2.6"
        fill={currentColors.accent}
        opacity="0.86"
      />

      {/* Small detail dots for logo authenticity */}
      <circle
        cx="42"
        cy="28"
        r="1.8"
        fill={currentColors.accent}
        opacity="0.75"
      />

      <circle
        cx="58"
        cy="25"
        r="1.5"
        fill={currentColors.accent}
        opacity="0.7"
      />

      <circle
        cx="25"
        cy="58"
        r="1.8"
        fill={currentColors.accent}
        opacity="0.75"
      />

      <circle
        cx="75"
        cy="55"
        r="1.6"
        fill={currentColors.accent}
        opacity="0.72"
      />

      <circle
        cx="45"
        cy="72"
        r="1.4"
        fill={currentColors.accent}
        opacity="0.68"
      />

      <circle
        cx="55"
        cy="75"
        r="1.7"
        fill={currentColors.accent}
        opacity="0.73"
      />

      {/* WILD Centered Document Box with Bold Lines - BIGGER! */}
      {/* Massive Document Background - Way Bigger and Centered */}
      <rect
        x="35"
        y="32"
        width="30"
        height="36"
        rx="3"
        fill={currentColors.accent}
        opacity="0.98"
        stroke="rgba(30, 64, 175, 0.3)"
        strokeWidth="0.5"
      />
      
      {/* Bold Document Lines - Much More Prominent */}
      <line
        x1="38"
        y1="38"
        x2="62"
        y2="38"
        stroke="#1e40af"
        strokeWidth="1.5"
        opacity="0.9"
      />
      
      <line
        x1="38"
        y1="43"
        x2="58"
        y2="43"
        stroke="#1e40af"
        strokeWidth="1.5"
        opacity="0.85"
      />
      
      <line
        x1="38"
        y1="48"
        x2="61"
        y2="48"
        stroke="#1e40af"
        strokeWidth="1.5"
        opacity="0.9"
      />
      
      <line
        x1="38"
        y1="53"
        x2="56"
        y2="53"
        stroke="#1e40af"
        strokeWidth="1.5"
        opacity="0.8"
      />
      
      <line
        x1="38"
        y1="58"
        x2="60"
        y2="58"
        stroke="#1e40af"
        strokeWidth="1.5"
        opacity="0.85"
      />
      
      <line
        x1="38"
        y1="63"
        x2="59"
        y2="63"
        stroke="#1e40af"
        strokeWidth="1.5"
        opacity="0.8"
      />

      {/* Premium Rich Blue Highlight */}
      <ellipse
        cx="35"
        cy="30"
        rx="15"
        ry="10"
        fill="rgba(255, 255, 255, 0.2)"
        transform="rotate(-25 35 30)"
        opacity="0.9"
      />
      
      {/* Secondary highlight for depth */}
      <ellipse
        cx="42"
        cy="38"
        rx="8"
        ry="6"
        fill="rgba(255, 255, 255, 0.1)"
        transform="rotate(15 42 38)"
        opacity="0.7"
      />
    </svg>
  );
}

// Clean, focused icon variants for common use cases
export function AppStoreIcon({ size = 180, className }: { size?: number; className?: string }) {
  return (
    <MaycoleTrackerIcon 
      size={size} 
      variant="app-store" 
      className={className}
    />
  );
}

export function FaviconIcon({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <MaycoleTrackerIcon 
      size={size} 
      variant="favicon" 
      className={className}
    />
  );
}

export function ButtonIcon({ 
  size = 40, 
  className,
  interactive = false 
}: { 
  size?: number; 
  className?: string;
  interactive?: boolean;
}) {
  return (
    <MaycoleTrackerIcon 
      size={size} 
      variant="clean" 
      className={`rounded-full ${className || ''}`.trim()}
      interactive={interactive}
    />
  );
}

// New clean icon for headers and navigation
export function CleanIcon({ 
  size = 40, 
  className,
  interactive = false 
}: { 
  size?: number; 
  className?: string;
  interactive?: boolean;
}) {
  return (
    <MaycoleTrackerIcon 
      size={size} 
      variant="clean" 
      className={`rounded-full shadow-sm ${className || ''}`.trim()}
      interactive={interactive}
    />
  );
}

// Generate multiple sizes for Apple Store submission
export function generateAppStoreIcons() {
  const sizes = [
    { size: 1024, name: 'AppIcon-1024' },
    { size: 512, name: 'AppIcon-512' },
    { size: 256, name: 'AppIcon-256' },
    { size: 180, name: 'AppIcon-180' },
    { size: 167, name: 'AppIcon-167' },
    { size: 152, name: 'AppIcon-152' },
    { size: 120, name: 'AppIcon-120' },
    { size: 87, name: 'AppIcon-87' },
    { size: 80, name: 'AppIcon-80' },
    { size: 76, name: 'AppIcon-76' },
    { size: 60, name: 'AppIcon-60' },
    { size: 58, name: 'AppIcon-58' },
    { size: 40, name: 'AppIcon-40' },
    { size: 29, name: 'AppIcon-29' },
    { size: 20, name: 'AppIcon-20' }
  ];

  return sizes.map(({ size, name }) => ({
    component: <AppStoreIcon size={size} />,
    name,
    size
  }));
}

// Export individual icon data for manifest.json
export const iconManifest = {
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512.png", 
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/favicon.svg",
      "sizes": "any",
      "type": "image/svg+xml"
    }
  ]
};

export default MaycoleTrackerIcon;