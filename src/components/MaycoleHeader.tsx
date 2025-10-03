/**
 * MaycoleHeader - Header component with small logo icon and brand text
 * Features: Small logo icon button on left side of "MaycoleTracker" text
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import SmallLogoIcon from './SmallLogoIcon';

interface MaycoleHeaderProps {
  showBackButton?: boolean;
  onBack?: () => void;
  className?: string;
}

export default function MaycoleHeader({ 
  showBackButton = false, 
  onBack,
  className = '' 
}: MaycoleHeaderProps) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={`w-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 p-4 ${className}`}>
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Left side - Logo Icon + Brand Text */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-3 group transition-all duration-300 hover:scale-105"
            aria-label="Return to MaycoleTracker™"
          >
            <SmallLogoIcon 
              size={32} 
              className="transition-all duration-300 group-hover:drop-shadow-lg" 
            />
            <div className="flex flex-col">
              <h1 className="text-white font-bold text-xl leading-tight tracking-tight">
                MaycoleTracker<span className="tm-small">™</span>
              </h1>
              <p className="text-purple-100 text-xs opacity-90 leading-none mt-1">
                Volume XI Enterprise
              </p>
            </div>
          </button>
        </div>

        {/* Right side - Back button if needed */}
        {showBackButton && (
          <button
            onClick={handleBackClick}
            className="btn-on-dark px-4 py-2 text-sm font-medium"
            aria-label="Go back"
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}