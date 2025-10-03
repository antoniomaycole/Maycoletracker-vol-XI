import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ArrowLeft, ChevronLeft, Home } from 'lucide-react';

interface BackButtonProps {
  onBack: () => void;
  onHome?: () => void;
  label?: string;
  showHomeButton?: boolean;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  disabled?: boolean;
}

/**
 * 🎯 MaycoleTracker™ Back Button Component
 * Professional navigation with smooth animations
 */
export const BackButton: React.FC<BackButtonProps> = ({
  onBack,
  onHome,
  label = 'Back',
  showHomeButton = false,
  variant = 'outline',
  size = 'default',
  className = '',
  disabled = false
}) => {
  return (
    <div className="flex items-center gap-2">
      {/* Back Button */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          variant={variant}
          size={size}
          onClick={onBack}
          disabled={disabled}
          className={`flex items-center gap-2 min-w-[100px] ${className}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {label}
        </Button>
      </motion.div>

      {/* Home Button (Optional) */}
      {showHomeButton && onHome && (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="ghost"
            size={size}
            onClick={onHome}
            disabled={disabled}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Home
          </Button>
        </motion.div>
      )}
    </div>
  );
};

/**
 * 🎯 MaycoleTracker™ Breadcrumb Navigation
 * Shows current location and allows navigation
 */
interface BreadcrumbNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
  className?: string;
}

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({
  currentView,
  onNavigate,
  className = ''
}) => {
  const viewLabels = {
    welcome: 'Welcome',
    'main-page': 'System Status',
    launcher: 'Features',
    onboarding: 'Setup',
    'industry-selector': 'Industry',
    'business-config': 'Configuration',
    'main-app': 'Dashboard'
  };

  const viewOrder = ['welcome', 'main-page', 'launcher', 'onboarding', 'industry-selector', 'business-config', 'main-app'];
  const currentIndex = viewOrder.indexOf(currentView);
  const breadcrumbs = viewOrder.slice(0, currentIndex + 1);

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`}>
      {breadcrumbs.map((view, index) => (
        <React.Fragment key={view}>
          {index > 0 && (
            <ChevronLeft className="w-4 h-4 text-muted-foreground rotate-180" />
          )}
          <button
            onClick={() => onNavigate(view)}
            className={`px-2 py-1 rounded-md transition-colors ${
              view === currentView
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
            disabled={view === currentView}
          >
            {viewLabels[view as keyof typeof viewLabels]}
          </button>
        </React.Fragment>
      ))}
    </nav>
  );
};

/**
 * 🎯 MaycoleTracker™ Smart Back Navigation Hook
 * Manages navigation history and back functionality
 */
import { useState, useCallback } from 'react';

export const useBackNavigation = (initialView: string = 'welcome') => {
  const [currentView, setCurrentView] = useState(initialView);
  const [navigationHistory, setNavigationHistory] = useState<string[]>([initialView]);

  const navigateTo = useCallback((view: string) => {
    setCurrentView(view);
    setNavigationHistory(prev => [...prev, view]);
  }, []);

  const goBack = useCallback(() => {
    if (navigationHistory.length > 1) {
      const newHistory = navigationHistory.slice(0, -1);
      const previousView = newHistory[newHistory.length - 1];
      setNavigationHistory(newHistory);
      setCurrentView(previousView);
      return previousView;
    }
    return currentView;
  }, [navigationHistory, currentView]);

  const goHome = useCallback(() => {
    setCurrentView('launcher');
    setNavigationHistory(['launcher']);
  }, []);

  const canGoBack = navigationHistory.length > 1;

  return {
    currentView,
    navigationHistory,
    navigateTo,
    goBack,
    goHome,
    canGoBack
  };
};

export default BackButton;