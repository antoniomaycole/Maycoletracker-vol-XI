import React, { memo, useCallback, useState, useEffect } from 'react';
import { AppIcon } from './AppIcon';
import { Button } from './ui/button';
import { Play } from 'lucide-react';

interface AppLauncherProps {
  onLaunchApp: () => void;
  className?: string;
}

export const AppLauncher = memo(function AppLauncher({ onLaunchApp, className = '' }: AppLauncherProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [iconSize, setIconSize] = useState(180);

  useEffect(() => {
    const updateIconSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setIconSize(120); // Small mobile
      } else if (width < 768) {
        setIconSize(140); // Large mobile
      } else if (width < 1024) {
        setIconSize(160); // Tablet
      } else {
        setIconSize(180); // Desktop
      }
    };

    updateIconSize();
    window.addEventListener('resize', updateIconSize);
    return () => window.removeEventListener('resize', updateIconSize);
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const handleLaunch = useCallback(() => {
    console.log('🚀 Launching MaycoleTracker...');
    onLaunchApp();
  }, [onLaunchApp]);

  return (
    <div className={`text-center space-y-6 ${className}`}>
      {/* Enhanced Circular Launch Button */}
      <div className="flex justify-center px-4">
        <button 
          onClick={handleLaunch}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="launch-button-circle relative group p-6 md:p-8 rounded-full transition-all duration-500 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-500/50 border-4 border-blue-200/50 dark:border-blue-700/50 hover:border-blue-400/70 dark:hover:border-blue-500/70"
          aria-label="Launch MaycoleTracker Demo"
        >
          {/* Animated rings */}
          <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
          <div className="absolute -inset-4 md:-inset-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Main app icon with integrated launch text */}
          <AppIcon 
            size={iconSize} 
            className="relative z-10 drop-shadow-2xl group-hover:scale-105 transition-transform duration-500" 
            showLaunchText={true}
            isInteractive={isHovered}
          />
          
          {/* Launch overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Pulsing border effect */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300" style={{ 
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude'
          }} />
        </button>
      </div>
      
      {/* Fallback Launch Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleLaunch}
          size="lg"
          className="h-16 px-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-full"
        >
          <Play className="w-6 h-6 mr-3" />
          ENTER MAYCOLETRACKER
        </Button>
      </div>
    </div>
  );
});