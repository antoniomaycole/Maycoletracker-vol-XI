/**
 * IconButton - MaycoleTracker™ Volume XI
 * Your ACTUAL logo design - blue circle, white cross, white document box, white dots
 * Perfect match to your KineticLogo design specifications
 */

import React from 'react';

interface IconButtonProps {
  size?: number;
  onClick?: () => void;
  className?: string;
  'aria-label'?: string;
}

export default function IconButton({ 
  size = 100, 
  onClick, 
  className = '',
  'aria-label': ariaLabel = 'MaycoleTracker™ Logo Button'
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`logo-button ${className}`}
      aria-label={ariaLabel}
      style={{
        background: 'none',
        border: 'none',
        padding: '8px',
        cursor: 'pointer',
        borderRadius: '50%',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: 'translateZ(0)', // GPU acceleration
        willChange: 'transform, box-shadow',
        outline: 'none'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
        e.currentTarget.style.filter = 'drop-shadow(0 8px 16px rgba(0, 123, 255, 0.3))';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.filter = 'none';
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(0.98)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
      }}
      onFocus={(e) => {
        e.currentTarget.style.boxShadow = '0 0 0 4px rgba(255, 255, 255, 0.3), 0 8px 16px rgba(0, 123, 255, 0.4)';
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100"
        style={{
          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
          transition: 'filter 0.3s ease'
        }}
      >
        {/* Blue circle background */}
        <circle 
          cx="50" 
          cy="50" 
          r="50" 
          fill="#007BFF"
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(0, 123, 255, 0.2))'
          }}
        />

        {/* Simple horizontal cross line - no styling */}
        <rect 
          x="20" 
          y="48" 
          width="60" 
          height="4" 
          fill="white"
        />

        {/* Simple vertical cross line - no styling */}
        <rect 
          x="48" 
          y="20" 
          width="4" 
          height="60" 
          fill="white"
        />

        {/* Simple white document box - no styling */}
        <rect 
          x="35" 
          y="35" 
          width="30" 
          height="30" 
          fill="white"
        />

        {/* Uneven white document lines inside the white box */}
        <rect x="38" y="40" width="16" height="1.5" fill="#007BFF" rx="0.75" />
        <rect x="38" y="43" width="22" height="1.5" fill="#007BFF" rx="0.75" />
        <rect x="38" y="46" width="18" height="1.5" fill="#007BFF" rx="0.75" />
        <rect x="38" y="49" width="24" height="1.5" fill="#007BFF" rx="0.75" />
        <rect x="38" y="52" width="14" height="1.5" fill="#007BFF" rx="0.75" />
        <rect x="38" y="55" width="20" height="1.5" fill="#007BFF" rx="0.75" />
        <rect x="38" y="58" width="12" height="1.5" fill="#007BFF" rx="0.75" />

        {/* Sporadic star-like white dots (like stars in sky) - Various sizes and positions - MATCHING MAIN LOGO */}
        <circle cx="25" cy="25" r="1.5" fill="white" opacity="0.9" />
        <circle cx="75" cy="30" r="2.5" fill="white" opacity="0.8" />
        <circle cx="20" cy="75" r="1" fill="white" opacity="0.95" />
        <circle cx="80" cy="70" r="2" fill="white" opacity="0.85" />
        <circle cx="15" cy="40" r="1.2" fill="white" opacity="0.9" />
        <circle cx="85" cy="45" r="1.8" fill="white" opacity="0.8" />
        <circle cx="30" cy="80" r="2.2" fill="white" opacity="0.7" />
        <circle cx="70" cy="15" r="1.3" fill="white" opacity="0.9" />
        <circle cx="12" cy="60" r="0.8" fill="white" opacity="0.95" />
        <circle cx="88" cy="25" r="1.6" fill="white" opacity="0.85" />
        <circle cx="25" cy="12" r="1.1" fill="white" opacity="0.9" />
        <circle cx="75" cy="88" r="2.3" fill="white" opacity="0.75" />
        <circle cx="18" cy="30" r="0.9" fill="white" opacity="0.8" />
        <circle cx="82" cy="60" r="1.4" fill="white" opacity="0.9" />
        <circle cx="35" cy="15" r="1.7" fill="white" opacity="0.85" />

        {/* Subtle inner glow */}
        <circle 
          cx="50" 
          cy="50" 
          r="48" 
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
}