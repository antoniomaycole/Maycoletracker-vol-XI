import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MoreVertical, Info, Settings, HelpCircle, Home, ArrowLeft, ChevronLeft } from 'lucide-react';
import MaycoleTrackerIconButton from './MaycoleTrackerIconButton';

interface AppHeaderProps {
  fontSize?: number;
  showNavigation?: boolean;
  onNavigateHome?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ 
  fontSize = 24, 
  showNavigation = true,
  onNavigateHome 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Make name 3 notches bigger as requested
  const brandNameSize = fontSize * 1.5; // 3 notches bigger
  const iconButtonSize = Math.max(32, brandNameSize * 0.8); // Icon button to fit size of text

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleHomeClick = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      navigate('/home');
    }
    setIsMenuOpen(false);
  };

  const handleBrandClick = () => {
    navigate('/brand');
    setIsMenuOpen(false);
  };

  const handleAboutClick = () => {
    navigate('/about');
    setIsMenuOpen(false);
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    setIsMenuOpen(false);
  };

  const handleBackClick = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/home');
    }
  };

  const containerPadding = Math.max(8, brandNameSize * 0.4);
  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  return (
    <div 
      className="flex items-center justify-between w-full bg-gray-100 border-b border-gray-200 relative"
      style={{ 
        padding: `${containerPadding}px ${containerPadding * 2}px`,
        minHeight: `${brandNameSize * 2}px`
      }}
    >
      {/* Left side: Back Button + Brand Name + Store Icon Button */}
      <div className="flex items-center gap-4">
        {/* Back/Previous Button */}
        {!isHomePage && (
          <button
            onClick={handleBackClick}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 transition-all duration-200 mr-2"
            aria-label="Go back to previous page"
            title="Go Back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
        )}

        {/* Brand Name - 3 notches bigger and spaced away from blue boxes */}
        <div className="flex items-center gap-4">
          <span 
            className="font-bold text-gray-900 select-none cursor-pointer hover:text-blue-600 transition-colors"
            onClick={handleBrandClick}
            style={{ 
              fontSize: `${brandNameSize}px`,
              lineHeight: 1.2,
              letterSpacing: '-0.025em'
            }}
            title="MaycoleTracker™ vol. XI - Enterprise Edition"
          >
            MaycoleTracker™ vol. XI
          </span>

          {/* Canonical MaycoleTracker Icon Button (production-grade) */}
          <MaycoleTrackerIconButton
            size={Math.round(iconButtonSize)}
            className="ml-1"
            onClick={() => navigate('/store')}
            title="App Store - MaycoleTracker™ Extensions"
          />
        </div>
      </div>

      {/* Right side: Navigation Menu with Tooltips */}
      {showNavigation && (
        <div className="relative">
          <button
            onClick={handleMenuOpen}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            aria-label="Main Navigation Menu"
            title="Main Menu"
          >
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>

          {/* Dropdown Menu with Tooltips */}
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 z-40"
                onClick={handleMenuClose}
              ></div>
              
              {/* Menu */}
              <div className="absolute right-0 top-12 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button
                  onClick={handleHomeClick}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  title="Go to Home Dashboard"
                >
                  <Home className="w-4 h-4" />
                  <span>Home Dashboard</span>
                </button>
                
                <button
                  onClick={() => {
                    navigate('/dashboard');
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  title="Business Management Dashboard"
                >
                  <Settings className="w-4 h-4" />
                  <span>Business Dashboard</span>
                </button>

                <button
                  onClick={() => {
                    navigate('/analytics');
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  title="Analytics & Statistics"
                >
                  <Info className="w-4 h-4" />
                  <span>Analytics</span>
                </button>
                
                <button
                  onClick={handleAboutClick}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  title="About MaycoleTracker™"
                >
                  <Info className="w-4 h-4" />
                  <span>About</span>
                </button>
                
                <button
                  onClick={handleSettingsClick}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  title="System Settings"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                
                <div className="border-t border-gray-100 my-2"></div>
                
                <button
                  onClick={() => {
                    navigate('/premium');
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  title="Premium Features"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Premium Features</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AppHeader;