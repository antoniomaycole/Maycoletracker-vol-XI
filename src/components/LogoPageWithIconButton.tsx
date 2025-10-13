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
import './LogoPage.layout.css';
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
            {/* Replaced legacy small SVG logo (black symbol + line) with the real brand component */}
            <div onClick={handleEnterSystem} className="cursor-pointer flex items-center justify-center">
              <MaycoleTrackerBrand />
            </div>

            {/* MaycoleTracker™ Branded Text (kept for accessibility/brand) */}
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
          {/* Caption requested by user — exact wording, placed under the main interactive icon */}
          <div className="w-full flex justify-center mt-3">
            <p className="text-sm sm:text-base font-semibold text-white/90 uppercase text-center">
              WORLD'S FIRST UNIVERSAL BUSINESS MANAGEMENT PLATFORM
            </p>
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