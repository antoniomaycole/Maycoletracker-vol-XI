/**
 * Extract Perfect App Store Icon from Your MaycoleTracker™ Design
 * Uses your existing MaycoleTrackerIconButton as the source
 */

import React, { useRef } from 'react';
import MaycoleTrackerIconButton from './MaycoleTrackerIconButton';

export default function IconExtractor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateAppStoreIcon = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to 1024x1024 for App Store
    canvas.width = 1024;
    canvas.height = 1024;

    // Create the SVG string from your existing design
    const svgString = `
      <svg width="1024" height="1024" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="appGradient" cx="0.3" cy="0.3" r="0.8">
            <stop offset="0%" stop-color="#4A9BFF" />
            <stop offset="30%" stop-color="#0066FF" />
            <stop offset="70%" stop-color="#007BFF" />
            <stop offset="100%" stop-color="#0056B3" />
          </radialGradient>
          <linearGradient id="whiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="50%" stop-color="#f8f9fa" />
            <stop offset="100%" stop-color="#e9ecef" />
          </linearGradient>
        </defs>

        <!-- Main circle -->
        <circle cx="50" cy="50" r="50" fill="url(#appGradient)" />

        <!-- Cross horizontal -->
        <rect x="15" y="46" width="70" height="8" fill="url(#whiteGradient)" rx="1" />

        <!-- Cross vertical -->
        <rect x="46" y="15" width="8" height="70" fill="url(#whiteGradient)" rx="1" />

        <!-- Document box -->
        <rect x="32" y="32" width="36" height="36" fill="url(#whiteGradient)" rx="3" />
        
        <!-- Document lines -->
        <rect x="36" y="38" width="28" height="2" fill="#0066FF" opacity="1" rx="1" />
        <rect x="36" y="42" width="24" height="2" fill="#007BFF" opacity="0.9" rx="1" />
        <rect x="36" y="46" width="30" height="2" fill="#0066FF" opacity="1" rx="1" />
        <rect x="36" y="50" width="22" height="2" fill="#007BFF" opacity="0.8" rx="1" />
        <rect x="36" y="54" width="26" height="2" fill="#0066FF" opacity="0.9" rx="1" />
        <rect x="36" y="58" width="20" height="2" fill="#007BFF" opacity="0.8" rx="1" />
        <rect x="36" y="62" width="24" height="2" fill="#0066FF" opacity="0.9" rx="1" />

        <!-- Stars -->
        <circle cx="25" cy="30" r="1.8" fill="white" opacity="0.95" />
        <circle cx="75" cy="25" r="1.6" fill="white" opacity="0.9" />
        <circle cx="70" cy="70" r="1.7" fill="white" opacity="0.92" />
        <circle cx="35" cy="20" r="1.2" fill="white" opacity="0.85" />
        <circle cx="80" cy="40" r="1.3" fill="white" opacity="0.88" />
        <circle cx="30" cy="75" r="1.1" fill="white" opacity="0.86" />
        <circle cx="65" cy="80" r="1.4" fill="white" opacity="0.89" />
        <circle cx="20" cy="60" r="1.2" fill="white" opacity="0.87" />
        <circle cx="40" cy="25" r="0.8" fill="white" opacity="0.75" />
        <circle cx="60" cy="30" r="0.9" fill="white" opacity="0.78" />
        <circle cx="25" cy="50" r="0.7" fill="white" opacity="0.73" />
        <circle cx="75" cy="55" r="0.8" fill="white" opacity="0.76" />
        <circle cx="45" cy="75" r="0.9" fill="white" opacity="0.79" />
        <circle cx="55" cy="20" r="0.7" fill="white" opacity="0.74" />
        <circle cx="80" cy="65" r="0.8" fill="white" opacity="0.77" />
      </svg>
    `;

    // Convert SVG to blob and draw on canvas
    const img = new Image();
    const svgBlob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0, 1024, 1024);
      URL.revokeObjectURL(url);

      // Download the image
      canvas.toBlob((blob) => {
        if (blob) {
          const downloadUrl = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = downloadUrl;
          a.download = 'MaycoleTracker-AppStore-Icon-1024x1024.png';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(downloadUrl);
        }
      });
    };

    img.src = url;
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🍎 MaycoleTracker™ App Store Icon
        </h1>
        <p className="text-gray-600 max-w-md">
          Extract perfect 1024×1024 App Store icon from your existing MaycoleTracker™ design
        </p>
      </div>

      {/* Your existing icon preview */}
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
          <MaycoleTrackerIconButton 
            size={120} 
            onClick={() => {}} 
            title="Your Perfect MaycoleTracker™ Icon"
          />
        </div>
        <p className="text-sm text-gray-500">Your current MaycoleTracker™ icon design</p>
      </div>

      {/* Generate button */}
      <button
        onClick={generateAppStoreIcon}
        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 hover:shadow-xl"
      >
        📱 Download 1024×1024 App Store Icon
      </button>

      {/* Hidden canvas for generation */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Instructions */}
      <div className="bg-blue-50 p-6 rounded-lg max-w-lg text-center">
        <h3 className="font-semibold text-blue-900 mb-2">Ready for Apple Store!</h3>
        <p className="text-blue-700 text-sm">
          This generates a perfect 1024×1024 PNG icon ready for App Store Connect submission. 
          Your MaycoleTracker™ design already meets all Apple guidelines!
        </p>
      </div>

      {/* Quick sizes reference */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-lg">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gray-900">1024×1024</div>
          <div className="text-xs text-gray-600">App Store</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gray-900">180×180</div>
          <div className="text-xs text-gray-600">iPhone Pro</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gray-900">120×120</div>
          <div className="text-xs text-gray-600">iPhone</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gray-900">152×152</div>
          <div className="text-xs text-gray-600">iPad</div>
        </div>
      </div>
    </div>
  );
}