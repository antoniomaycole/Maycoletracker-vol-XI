/**
 * LogoPageWithIconButton - MaycoleTracker™ vol. XI Entry Point (Alternative Version)
 * Using your ACTUAL IconButton as the main interactive element
 * Clean version with IconButton as primary logo/button
 * 
 * TO USE THIS VERSION: In App.tsx, change the import from:
 * import LogoPage from './components/LogoPage';
 * TO:
 * import LogoPage from './components/LogoPageWithIconButton';
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogoPage.css';
import IconButton from './IconButton';
import MaycoleTrackerBrand from './MaycoleTrackerBrand';

export default function LogoPageWithIconButton() {
  const navigate = useNavigate();

  const handleEnterSystem = () => {
    navigate('/main');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/10 to-purple-700/20 pointer-events-none" />
      
      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto space-y-8">
        
        {/* Top Section - MaycoleTracker Branding */}
        <div className="space-y-4">
          {/* MaycoleTracker with Small Icon */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {/* Small Logo Icon - Standard App Icon Size */}
            <div 
              onClick={handleEnterSystem}
              className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer transition-all duration-300 hover:scale-105 flex-shrink-0"
              style={{
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                e.currentTarget.style.filter = 'drop-shadow(0 8px 16px rgba(0, 123, 255, 0.3))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))';
              }}
            >
              <svg 
                width="100%" 
                height="100%" 
                viewBox="0 0 100 100"
                style={{
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
                  transition: 'filter 0.3s ease'
                }}
              >
                {/* Blue circle background - EXACT MATCH */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="50" 
                  fill="#007BFF"
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0, 123, 255, 0.2))'
                  }}
                />

                {/* Simple horizontal cross line - EXACT MATCH */}
                <rect 
                  x="20" 
                  y="48" 
                  width="60" 
                  height="4" 
                  fill="white"
                />

                {/* Simple vertical cross line - EXACT MATCH */}
                <rect 
                  x="48" 
                  y="20" 
                  width="4" 
                  height="60" 
                  fill="white"
                />

                {/* Simple white document box - EXACT MATCH */}
                <rect 
                  x="35" 
                  y="35" 
                  width="30" 
                  height="30" 
                  fill="white"
                />

                {/* Uneven white document lines inside the white box - EXACT MATCH */}
                <rect x="38" y="40" width="16" height="1.5" fill="#007BFF" rx="0.75" />
                <rect x="38" y="43" width="22" height="1.5" fill="#007BFF" rx="0.75" />
                <rect x="38" y="46" width="18" height="1.5" fill="#007BFF" rx="0.75" />
                <rect x="38" y="49" width="24" height="1.5" fill="#007BFF" rx="0.75" />
                <rect x="38" y="52" width="14" height="1.5" fill="#007BFF" rx="0.75" />
                <rect x="38" y="55" width="20" height="1.5" fill="#007BFF" rx="0.75" />
                <rect x="38" y="58" width="12" height="1.5" fill="#007BFF" rx="0.75" />

                {/* Sporadic star-like white dots (like stars in sky) - Various sizes and positions */}
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

                {/* Subtle inner glow - EXACT MATCH */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="48" 
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* MaycoleTracker™ Branded Text */}
            <div className="flex items-center justify-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide uppercase">
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent drop-shadow-lg">
                  MaycoleTracker<span className="text-lg sm:text-xl md:text-2xl lg:text-3xl align-super opacity-80">™</span>
                </span>
              </h1>
            </div>
          </div>

          {/* Subtitle */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white/95 tracking-wider uppercase">
            vol. XI - Enterprise Edition
          </h2>
        </div>

        {/* Middle Section - Main Interactive Logo - Standard App Icon Size */}
        <div className="flex justify-center py-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 hover:scale-110 transition-all duration-300">
            <IconButton 
              size={96}
              onClick={handleEnterSystem}
              aria-label="Enter MaycoleTracker™ vol. XI System"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Bottom Section - System Info */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white tracking-wide">
            Inventory Management System
          </h3>
          
          <div className="space-y-2">
            <p className="text-white/90 text-sm sm:text-base">
              🚀 System Ready • All Modules Operational
            </p>
            <p className="text-white/70 text-xs sm:text-sm">
              Click the logo to enter your enterprise system
            </p>
            
            {/* Debug Test Buttons */}
            <div className="mt-4 space-x-2">
              <button 
                onClick={() => navigate('/test')}
                className="btn-on-dark text-xs px-3 py-1"
              >
                🔧 Test Routes
              </button>
              <button 
                onClick={() => navigate('/main')}
                className="btn-on-dark text-xs px-3 py-1"
              >
                📱 Main App
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}