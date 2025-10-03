/**
 * SmallLogoIcon - Tiny MaycoleTracker™ logo for header use
 * Simplified version of the main logo for use next to text
 */

import React from 'react';

interface SmallLogoIconProps {
  size?: number;
  className?: string;
}

export default function SmallLogoIcon({ 
  size = 24, 
  className = '' 
}: SmallLogoIconProps) {
  return (
    <div 
      className={className}
      style={{ 
        position: 'relative',
        width: size,
        height: size,
        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
        transition: 'filter 0.3s ease'
      }}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100"
        style={{ display: 'block' }}
      >
      {/* Rich blue circle background */}
      <defs>
        <radialGradient id={`logoGradient-${size}`} cx="0.3" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#0066FF" />
          <stop offset="50%" stopColor="#007BFF" />
          <stop offset="100%" stopColor="#0056B3" />
        </radialGradient>
      </defs>
      <circle 
        cx="50" 
        cy="50" 
        r="50" 
        fill={`url(#logoGradient-${size})`}
      />

      {/* Big white cross - horizontal line */}
      <rect 
        x="15" 
        y="46" 
        width="70" 
        height="8" 
        fill="white"
        rx="1"
      />

      {/* Big white cross - vertical line */}
      <rect 
        x="46" 
        y="15" 
        width="8" 
        height="70" 
        fill="white"
        rx="1"
      />

      {/* White document box within the cross */}
      <rect 
        x="36" 
        y="36" 
        width="28" 
        height="28" 
        fill="white"
        rx="2"
        style={{
          filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))'
        }}
      />

      {/* Document lines inside the white box */}
      <rect x="39" y="41" width="14" height="1.5" fill="#007BFF" rx="0.75" />
      <rect x="39" y="44" width="20" height="1.5" fill="#007BFF" rx="0.75" />
      <rect x="39" y="47" width="16" height="1.5" fill="#007BFF" rx="0.75" />
      <rect x="39" y="50" width="22" height="1.5" fill="#007BFF" rx="0.75" />
      <rect x="39" y="53" width="12" height="1.5" fill="#007BFF" rx="0.75" />
      <rect x="39" y="56" width="18" height="1.5" fill="#007BFF" rx="0.75" />
      <rect x="39" y="59" width="10" height="1.5" fill="#007BFF" rx="0.75" />

      {/* White dots will be rendered as absolutely positioned CSS divs */}
      </svg>
      
      {/* Sporadic star-like white dots (like stars in sky) - Various sizes and positions - MATCHING MAIN LOGO */}
      <div style={{
        width: `${(1.5 / 50) * size}px`,
        height: `${(1.5 / 50) * size}px`,
        borderRadius: '50%',
        backgroundColor: 'white',
        opacity: 0.9,
        position: 'absolute',
        top: `${(25 / 100) * size}px`,
        left: `${(25 / 100) * size}px`
      }} />
      <div style={{
        width: `${(2.5 / 50) * size}px`,
        height: `${(2.5 / 50) * size}px`,
        borderRadius: '50%',
        backgroundColor: 'white',
        opacity: 0.8,
        position: 'absolute',
        top: `${(30 / 100) * size}px`,
        left: `${(75 / 100) * size}px`
      }} />
      <div style={{
        width: `${(1 / 50) * size}px`,
        height: `${(1 / 50) * size}px`,
        borderRadius: '50%',
        backgroundColor: 'white',
        opacity: 0.95,
        position: 'absolute',
        top: `${(75 / 100) * size}px`,
        left: `${(20 / 100) * size}px`
      }} />
      <div style={{
        width: `${(2 / 50) * size}px`,
        height: `${(2 / 50) * size}px`,
        borderRadius: '50%',
        backgroundColor: 'white',
        opacity: 0.85,
        position: 'absolute',
        top: `${(70 / 100) * size}px`,
        left: `${(80 / 100) * size}px`
      }} />
      <div style={{
        width: `${(1.2 / 50) * size}px`,
        height: `${(1.2 / 50) * size}px`,
        borderRadius: '50%',
        backgroundColor: 'white',
        opacity: 0.9,
        position: 'absolute',
        top: `${(40 / 100) * size}px`,
        left: `${(15 / 100) * size}px`
      }} />
      <div style={{
        width: `${(1.8 / 50) * size}px`,
        height: `${(1.8 / 50) * size}px`,
        borderRadius: '50%',
        backgroundColor: 'white',
        opacity: 0.8,
        position: 'absolute',
        top: `${(45 / 100) * size}px`,
        left: `${(85 / 100) * size}px`
      }} />
      <div style={{
        width: `${(2.2 / 50) * size}px`,
        height: `${(2.2 / 50) * size}px`,
        borderRadius: '50%',
        backgroundColor: 'white',
        opacity: 0.7,
        position: 'absolute',
        top: `${(80 / 100) * size}px`,
        left: `${(30 / 100) * size}px`
      }} />
      <div style={{
        width: `${(1.3 / 50) * size}px`,
        height: `${(1.3 / 50) * size}px`,
        borderRadius: '50%',
        backgroundColor: 'white',
        opacity: 0.9,
        position: 'absolute',
        top: `${(15 / 100) * size}px`,
        left: `${(70 / 100) * size}px`
      }} />
      <div style={{
        width: `${(0.8 / 50) * size}px`,
        height: `${(0.8 / 50) * size}px`,
        borderRadius: '50%',
        backgroundColor: 'white',
        opacity: 0.95,
        position: 'absolute',
        top: `${(60 / 100) * size}px`,
        left: `${(12 / 100) * size}px`
      }} />
      <div style={{
        width: `${(1.6 / 50) * size}px`,
        height: `${(1.6 / 50) * size}px`,
        borderRadius: '50%',
        backgroundColor: 'white',
        opacity: 0.85,
        position: 'absolute',
        top: `${(25 / 100) * size}px`,
        left: `${(88 / 100) * size}px`
      }} />
      <div style={{
        width: `${(1.1 / 50) * size}px`,
        height: `${(1.1 / 50) * size}px`,
        borderRadius: '50%',
        backgroundColor: 'white',
        opacity: 0.9,
        position: 'absolute',
        top: `${(12 / 100) * size}px`,
        left: `${(25 / 100) * size}px`
      }} />
      <div style={{
        width: `${(2.3 / 50) * size}px`,
        height: `${(2.3 / 50) * size}px`,
        borderRadius: '50%',
        backgroundColor: 'white',
        opacity: 0.75,
        position: 'absolute',
        top: `${(88 / 100) * size}px`,
        left: `${(75 / 100) * size}px`
      }} />
      <div style={{
        width: `${(0.9 / 50) * size}px`,
        height: `${(0.9 / 50) * size}px`,
        borderRadius: '50%',
        backgroundColor: 'white',
        opacity: 0.8,
        position: 'absolute',
        top: `${(30 / 100) * size}px`,
        left: `${(18 / 100) * size}px`
      }} />
      <div style={{
        width: `${(1.4 / 50) * size}px`,
        height: `${(1.4 / 50) * size}px`,
        borderRadius: '50%',
        backgroundColor: 'white',
        opacity: 0.9,
        position: 'absolute',
        top: `${(60 / 100) * size}px`,
        left: `${(82 / 100) * size}px`
      }} />
      <div style={{
        width: `${(1.7 / 50) * size}px`,
        height: `${(1.7 / 50) * size}px`,
        borderRadius: '50%',
        backgroundColor: 'white',
        opacity: 0.85,
        position: 'absolute',
        top: `${(15 / 100) * size}px`,
        left: `${(35 / 100) * size}px`
      }} />
      <div style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: 'white',
        position: 'absolute',
        top: `${(30 / 100) * size}px`,
        left: `${(35 / 100) * size}px`
      }} />
      <div style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: 'white',
        position: 'absolute',
        top: `${(30 / 100) * size}px`,
        left: `${(65 / 100) * size}px`
      }} />
      <div style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: 'white',
        position: 'absolute',
        top: `${(70 / 100) * size}px`,
        left: `${(35 / 100) * size}px`
      }} />
      <div style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: 'white',
        position: 'absolute',
        top: `${(70 / 100) * size}px`,
        left: `${(65 / 100) * size}px`
      }} />
    </div>
  );
}