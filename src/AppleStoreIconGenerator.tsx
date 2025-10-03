/**
 * Apple Store Icon Generator for MaycoleTracker™ vol. XI
 * Creates perfect 1024x1024 App Store icon from your existing design
 * IDENTICAL to your MaycoleTrackerIconButton but optimized for App Store
 */

import React from 'react';

interface AppleStoreIconProps {
  size?: number;
  downloadable?: boolean;
}

export default function AppleStoreIconGenerator({ 
  size = 1024, 
  downloadable = true 
}: AppleStoreIconProps) {
  
  const downloadIcon = () => {
    // Create canvas and draw the icon
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    // Create gradient background
    const gradient = ctx.createRadialGradient(300, 300, 0, 512, 512, 600);
    gradient.addColorStop(0, '#4A9BFF');
    gradient.addColorStop(0.3, '#0066FF');
    gradient.addColorStop(0.7, '#007BFF');
    gradient.addColorStop(1, '#0056B3');
    
    // Draw background circle
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(512, 512, 512, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw white cross (horizontal)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(150, 460, 724, 104);
    
    // Draw white cross (vertical)
    ctx.fillRect(460, 150, 104, 724);
    
    // Draw document box
    ctx.fillRect(312, 312, 400, 400);
    
    // Draw document lines
    const lines = [
      { x: 340, y: 360, w: 340, h: 20 },
      { x: 340, y: 400, w: 280, h: 20 },
      { x: 340, y: 440, w: 360, h: 20 },
      { x: 340, y: 480, w: 240, h: 20 },
      { x: 340, y: 520, w: 320, h: 20 },
      { x: 340, y: 560, w: 200, h: 20 },
      { x: 340, y: 600, w: 280, h: 20 },
    ];
    
    ctx.fillStyle = '#0066FF';
    lines.forEach(line => {
      ctx.fillRect(line.x, line.y, line.w, line.h);
    });
    
    // Add stars
    const stars = [
      { x: 250, y: 300, r: 18 },
      { x: 750, y: 250, r: 16 },
      { x: 700, y: 700, r: 17 },
      { x: 350, y: 200, r: 12 },
      { x: 800, y: 400, r: 13 },
      { x: 300, y: 750, r: 11 },
      { x: 650, y: 800, r: 14 },
      { x: 200, y: 600, r: 12 },
    ];
    
    ctx.fillStyle = '#ffffff';
    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
      ctx.fill();
    });
    
    // Download the image
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'MaycoleTracker-AppStore-Icon-1024x1024.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
      <h1 className="text-2xl font-bold text-gray-900 text-center">
        🍎 Apple Store Icon Generator
      </h1>
      <p className="text-gray-600 text-center max-w-md">
        Generate perfect 1024×1024 App Store icon from your MaycoleTracker™ design
      </p>
      
      {/* Live Preview */}
      <div className="relative">
        <svg
          width={size === 1024 ? 200 : size}
          height={size === 1024 ? 200 : size}
          viewBox="0 0 1024 1024"
          className="rounded-3xl shadow-2xl border-4 border-white"
          style={{
            background: 'linear-gradient(135deg, #4A9BFF 0%, #0066FF 30%, #007BFF 70%, #0056B3 100%)'
          }}
        >
          {/* Gradient definitions */}
          <defs>
            <radialGradient id="appStoreGradient" cx="0.3" cy="0.3" r="0.8">
              <stop offset="0%" stopColor="#4A9BFF" />
              <stop offset="30%" stopColor="#0066FF" />
              <stop offset="70%" stopColor="#007BFF" />
              <stop offset="100%" stopColor="#0056B3" />
            </radialGradient>
          </defs>

          {/* Background circle */}
          <circle 
            cx="512" 
            cy="512" 
            r="512" 
            fill="url(#appStoreGradient)" 
          />

          {/* Main cross - horizontal */}
          <rect 
            x="150" 
            y="460" 
            width="724" 
            height="104" 
            fill="#ffffff" 
            rx="10" 
          />

          {/* Main cross - vertical */}
          <rect 
            x="460" 
            y="150" 
            width="104" 
            height="724" 
            fill="#ffffff" 
            rx="10" 
          />

          {/* Document Box */}
          <rect 
            x="312" 
            y="312" 
            width="400" 
            height="400" 
            fill="#ffffff" 
            rx="30" 
          />
          
          {/* Document Lines */}
          <rect x="340" y="360" width="340" height="20" fill="#0066FF" rx="10" />
          <rect x="340" y="400" width="280" height="20" fill="#007BFF" rx="10" />
          <rect x="340" y="440" width="360" height="20" fill="#0066FF" rx="10" />
          <rect x="340" y="480" width="240" height="20" fill="#007BFF" rx="10" />
          <rect x="340" y="520" width="320" height="20" fill="#0066FF" rx="10" />
          <rect x="340" y="560" width="200" height="20" fill="#007BFF" rx="10" />
          <rect x="340" y="600" width="280" height="20" fill="#0066FF" rx="10" />

          {/* Beautiful starry sky dots */}
          {[
            // Large stars
            { cx: 250, cy: 300, r: 18, opacity: 0.95 },
            { cx: 750, cy: 250, r: 16, opacity: 0.9 },
            { cx: 700, cy: 700, r: 17, opacity: 0.92 },
            
            // Medium stars
            { cx: 350, cy: 200, r: 12, opacity: 0.85 },
            { cx: 800, cy: 400, r: 13, opacity: 0.88 },
            { cx: 300, cy: 750, r: 11, opacity: 0.86 },
            { cx: 650, cy: 800, r: 14, opacity: 0.89 },
            { cx: 200, cy: 600, r: 12, opacity: 0.87 },
            
            // Small stars
            { cx: 400, cy: 250, r: 8, opacity: 0.75 },
            { cx: 600, cy: 300, r: 9, opacity: 0.78 },
            { cx: 250, cy: 500, r: 7, opacity: 0.73 },
            { cx: 750, cy: 550, r: 8, opacity: 0.76 },
            { cx: 450, cy: 750, r: 9, opacity: 0.79 },
            { cx: 550, cy: 200, r: 7, opacity: 0.74 },
            { cx: 800, cy: 650, r: 8, opacity: 0.77 }
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

      {downloadable && (
        <div className="flex flex-col items-center gap-4">
          <button 
            onClick={downloadIcon}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105"
          >
            📱 Download 1024×1024 App Store Icon
          </button>
          
          <div className="text-sm text-gray-500 text-center max-w-md">
            <p>Perfect for:</p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              <span className="px-3 py-1 bg-gray-200 rounded-full text-xs">App Store</span>
              <span className="px-3 py-1 bg-gray-200 rounded-full text-xs">Xcode Project</span>
              <span className="px-3 py-1 bg-gray-200 rounded-full text-xs">TestFlight</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Component for showing all required iOS icon sizes
export function AppleIconSizeGenerator() {
  const sizes = [
    { size: 1024, name: "App Store", use: "App Store Connect" },
    { size: 180, name: "iPhone Pro", use: "iPhone 6s Plus, 7 Plus, 8 Plus" },
    { size: 120, name: "iPhone", use: "iPhone 6, 7, 8, SE (2nd gen)" },
    { size: 152, name: "iPad Pro", use: "iPad Pro (12.9-inch)" },
    { size: 144, name: "iPad", use: "iPad mini, iPad Air" },
    { size: 76, name: "iPad", use: "iPad" },
    { size: 60, name: "iPhone", use: "iPhone Settings" },
    { size: 40, name: "Universal", use: "Universal Settings" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {sizes.map((item) => (
        <div key={item.size} className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg">
          <div 
            className="mb-3 rounded-lg shadow-md overflow-hidden"
            style={{ 
              width: `${Math.min(item.size / 8, 60)}px`, 
              height: `${Math.min(item.size / 8, 60)}px` 
            }}
          >
            <AppleStoreIconGenerator size={Math.min(item.size / 8, 60)} downloadable={false} />
          </div>
          <h3 className="font-semibold text-gray-900">{item.size}×{item.size}</h3>
          <p className="text-sm text-gray-600 text-center">{item.name}</p>
          <p className="text-xs text-gray-500 text-center">{item.use}</p>
        </div>
      ))}
    </div>
  );
}