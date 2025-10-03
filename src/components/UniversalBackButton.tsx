/**
 * MaycoleTracker™ Volume XI - Universal Back Button
 * Professional back navigation for all operational pages
 */

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

interface UniversalBackButtonProps {
  customBackPath?: string;
  showHomeOption?: boolean;
  className?: string;
}

export default function UniversalBackButton({ 
  customBackPath, 
  showHomeOption = true,
  className = '' 
}: UniversalBackButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on logo page
  if (location.pathname === '/logo') {
    return null;
  }

  const handleBack = () => {
    if (customBackPath) {
      navigate(customBackPath);
    } else {
      // Smart back navigation
      if (window.history.length > 1) {
        window.history.back();
      } else {
        navigate('/logo');
      }
    }
    
    // Voice feedback
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('Navigating back');
      utterance.volume = 0.3;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleHome = () => {
    navigate('/logo');
    
    // Voice feedback
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('Returning to MaycoleTracker');
      utterance.volume = 0.3;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={`flex items-center space-x-3 mb-6 ${className}`}>
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors group"
        title="Go Back"
      >
        <ArrowLeft className="w-5 h-5 group-hover:transform group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back</span>
      </button>

      {/* Home Button (if enabled and not on logo page) */}
      {showHomeOption && location.pathname !== '/logo' && (
        <>
          <div className="w-px h-6 bg-gray-300"></div>
          <button
            onClick={handleHome}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors group"
            title="Return to MaycoleTracker"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Home</span>
          </button>
        </>
      )}
    </div>
  );
}