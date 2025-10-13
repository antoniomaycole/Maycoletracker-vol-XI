/**
 * MaycoleTracker™ Sealed Brand Component
 * Icon + Name always together, responsive scaling
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';

interface MaycoleTrackerBrandProps {
  fontSize?: number;
  variant?: 'light' | 'dark' | 'horizontal';
  showSubtitle?: boolean;
  showAppStoreButton?: boolean;
  className?: string;
  clickable?: boolean;
  compact?: boolean;
  onClick?: () => void;
  // Added for compatibility with various callers
  iconSize?: number;
  size?: 'small' | 'medium' | 'large' | string;
  navigateTo?: string;
}

export function MaycoleTrackerBrand({
  fontSize = 24,
  variant = 'dark',
  showSubtitle = false,
  showAppStoreButton = false,
  className = '',
  clickable = true,
  compact = false,
  onClick,
  iconSize: propIconSize,
  size,
  navigateTo
}: MaycoleTrackerBrandProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!clickable) return;
    if (onClick) {
      onClick();
    } else {
      // prefer navigateTo prop if provided
      if (navigateTo && typeof navigateTo === 'string') {
        navigate(navigateTo);
      } else {
        navigate('/');
      }
    }
  };

  // Calculate responsive sizes based on fontSize
  const iconSize = Math.max(16, (propIconSize ?? fontSize * 0.75));
  const containerGap = compact ? fontSize * 0.4 : fontSize * 0.5;
  
  const textColor = variant === 'light' ? 'text-white' : 'text-gray-900';
  const subtitleColor = variant === 'light' ? 'text-blue-100' : 'text-gray-600';

  return (
    <div
      className={`maycole-brand-sealed flex items-center select-none ${className} ${
        clickable ? 'cursor-pointer hover:opacity-80 transition-opacity duration-200' : ''
      }`}
      onClick={handleClick}
      style={{ gap: `${containerGap}px` }}
    >
      {/* MaycoleTracker™ Icon - Always Left */}
      <div
        className="maycole-brand-icon flex-shrink-0 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center"
        style={{ 
          width: `${iconSize * 1.6}px`, 
          height: `${iconSize * 1.6}px`,
          borderRadius: `${Math.max(4, iconSize * 0.2)}px`
        }}
      >
        <div
          className="bg-white rounded-sm relative"
          style={{ 
            width: `${iconSize}px`, 
            height: `${iconSize}px`,
            borderRadius: `${Math.max(2, iconSize * 0.1)}px`
          }}
        >
          <div 
            className="absolute inset-0 bg-blue-600 rounded-sm flex items-center justify-center"
            style={{ 
              transform: 'scale(0.75)',
              borderRadius: `${Math.max(1, iconSize * 0.08)}px`
            }}
          >
            <div
              className="bg-white rounded-sm"
              style={{ 
                width: `${iconSize * 0.25}px`, 
                height: `${iconSize * 0.25}px`,
                borderRadius: `${Math.max(1, iconSize * 0.05)}px`
              }}
            ></div>
          </div>
          {/* Sporadic dots */}
          <div
            className="absolute bg-white rounded-full"
            style={{ 
              width: `${Math.max(2, iconSize * 0.08)}px`, 
              height: `${Math.max(2, iconSize * 0.08)}px`,
              top: `${iconSize * 0.15}px`,
              right: `${iconSize * 0.15}px`
            }}
          ></div>
          <div
            className="absolute bg-white rounded-full"
            style={{ 
              width: `${Math.max(2, iconSize * 0.08)}px`, 
              height: `${Math.max(2, iconSize * 0.08)}px`,
              bottom: `${iconSize * 0.15}px`,
              left: `${iconSize * 0.15}px`
            }}
          ></div>
          <div
            className="absolute bg-white rounded-full"
            style={{ 
              width: `${Math.max(2, iconSize * 0.08)}px`, 
              height: `${Math.max(2, iconSize * 0.08)}px`,
              top: `${iconSize * 0.15}px`,
              left: `${iconSize * 0.15}px`
            }}
          ></div>
        </div>
      </div>

      {/* Brand Text - Always Right of Icon */}
      <div className="flex flex-col min-w-0">
        <div className={`maycole-brand-text ${textColor} flex items-center`}>
          <span 
            className="font-bold"
            style={{ 
              fontSize: `${fontSize}px`,
              lineHeight: 1.2,
              letterSpacing: '-0.025em'
            }}
          >
            MaycoleTracker
          </span>
          <span 
            className="font-normal opacity-75"
            style={{ 
              fontSize: `${fontSize * 0.4}px`,
              verticalAlign: 'super',
              marginLeft: `${fontSize * 0.05}px`,
              lineHeight: 0
            }}
          >
            ™
          </span>
        </div>
        {showSubtitle && !compact && (
          <div 
            className={`${subtitleColor} font-medium`}
            style={{ 
              fontSize: `${fontSize * 0.6}px`,
              marginTop: `${fontSize * 0.1}px`,
              lineHeight: 1.2
            }}
          >
            vol. XI - Enterprise Edition
          </div>
        )}
      </div>

      {/* App Store Button */}
      {showAppStoreButton && !compact && (
        <button 
          className="app-store-icon-button flex-shrink-0 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 hover:scale-105"
          style={{ 
            width: `${iconSize * 1.4}px`, 
            height: `${iconSize * 1.4}px`,
            marginLeft: `${fontSize * 0.3}px`,
            borderRadius: `${Math.max(4, iconSize * 0.15)}px`
          }}
          onClick={(e) => {
            e.stopPropagation();
            window.open('https://apps.apple.com/app/maycoletracker', '_blank');
          }}
          aria-label="Download from App Store"
        >
          <svg
            width={iconSize * 0.6}
            height={iconSize * 0.6}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
              fill="currentColor"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

// Icon-only version for compact spaces
export function MaycoleTrackerIcon({ 
  iconSize = 32,
  className = '',
  clickable = true,
  onClick
}: {
  iconSize?: number;
  className?: string;
  clickable?: boolean;
  onClick?: () => void;
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!clickable) return;
    if (onClick) {
      onClick();
    } else {
      navigate('/');
    }
  };

  return (
    <div
      className={`maycole-brand-icon flex-shrink-0 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center ${className} ${
        clickable ? 'cursor-pointer hover:opacity-80 transition-opacity duration-200' : ''
      }`}
      onClick={handleClick}
      style={{ 
        width: `${iconSize * 1.6}px`, 
        height: `${iconSize * 1.6}px`,
        borderRadius: `${Math.max(4, iconSize * 0.2)}px`
      }}
    >
      <div
        className="bg-white rounded-sm relative"
        style={{ 
          width: `${iconSize}px`, 
          height: `${iconSize}px`,
          borderRadius: `${Math.max(2, iconSize * 0.1)}px`
        }}
      >
        <div 
          className="absolute inset-0 bg-blue-600 rounded-sm flex items-center justify-center"
          style={{ 
            transform: 'scale(0.75)',
            borderRadius: `${Math.max(1, iconSize * 0.08)}px`
          }}
        >
          <div
            className="bg-white rounded-sm"
            style={{ 
              width: `${iconSize * 0.25}px`, 
              height: `${iconSize * 0.25}px`,
              borderRadius: `${Math.max(1, iconSize * 0.05)}px`
            }}
          ></div>
        </div>
        {/* Sporadic dots */}
        <div
          className="absolute bg-white rounded-full"
          style={{ 
            width: `${Math.max(2, iconSize * 0.08)}px`, 
            height: `${Math.max(2, iconSize * 0.08)}px`,
            top: `${iconSize * 0.15}px`,
            right: `${iconSize * 0.15}px`
          }}
        ></div>
        <div
          className="absolute bg-white rounded-full"
          style={{ 
            width: `${Math.max(2, iconSize * 0.08)}px`, 
            height: `${Math.max(2, iconSize * 0.08)}px`,
            bottom: `${iconSize * 0.15}px`,
            left: `${iconSize * 0.15}px`
          }}
        ></div>
        <div
          className="absolute bg-white rounded-full"
          style={{ 
            width: `${Math.max(2, iconSize * 0.08)}px`, 
            height: `${Math.max(2, iconSize * 0.08)}px`,
            top: `${iconSize * 0.15}px`,
            left: `${iconSize * 0.15}px`
          }}
        ></div>
      </div>
    </div>
  );
}

export default MaycoleTrackerBrand;