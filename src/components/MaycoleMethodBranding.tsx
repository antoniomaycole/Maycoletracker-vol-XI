/**
 * MAYCOLE Method™ Branding Component
 * Consistent branding display for the MAYCOLE Method™ throughout the application
 */

import React from 'react';

interface MaycoleMethodBrandingProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'minimal' | 'badge' | 'hero';
  className?: string;
  showPulse?: boolean;
  showDescription?: boolean;
}

export function MaycoleMethodBranding({ 
  size = 'medium',
  variant = 'default',
  className = '',
  showPulse = true,
  showDescription = false
}: MaycoleMethodBrandingProps) {
  const sizeClasses = {
    small: 'text-xs',
    medium: 'text-sm', 
    large: 'text-base'
  };

  const baseClasses = "flex items-center gap-2 font-medium";
  
  switch (variant) {
    case 'minimal':
      return (
        <span className={`${sizeClasses[size]} text-amber-700 dark:text-amber-300 ${className}`}>
          Powered by the MAYCOLE Method<span className="tm-small">™</span>
        </span>
      );

    case 'badge':
      return (
        <div className={`inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800 rounded-lg ${className}`}>
          <div className={`w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full ${showPulse ? 'maycole-brand-pulse' : ''}`}></div>
          <span className={`${sizeClasses[size]} font-medium text-amber-700 dark:text-amber-300`}>
            Powered by the MAYCOLE Method<span className="tm-small">™</span>
          </span>
        </div>
      );

    case 'hero':
      return (
        <div className={`text-center ${className}`}>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 backdrop-blur-xl border border-amber-300/30 rounded-full mb-2">
            <div className={`w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full ${showPulse ? 'maycole-brand-pulse' : ''}`}></div>
            <span className={`${sizeClasses[size]} font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent maycole-brand-glow`}>
              Powered by the MAYCOLE Method<span className="tm-small">™</span>
            </span>
          </div>
          {showDescription && (
            <p className="text-xs text-muted-foreground mt-2">
              Advanced AI-Powered Inventory Intelligence
            </p>
          )}
        </div>
      );

    default:
      return (
        <div className={`${baseClasses} ${className}`}>
          <div className={`w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full ${showPulse ? 'maycole-brand-pulse' : ''}`}></div>
          <span className={`${sizeClasses[size]} text-amber-700 dark:text-amber-300`}>
            Powered by the MAYCOLE Method<span className="tm-small">™</span>
          </span>
          {showDescription && (
            <span className="text-xs text-muted-foreground ml-2">
              • AI-Powered Intelligence
            </span>
          )}
        </div>
      );
  }
}

// Install branding component
interface InstallBrandingProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  showPulse?: boolean;
  version?: string;
}

export function InstallMAYCOLETrackerBranding({ 
  size = 'medium',
  className = '',
  showPulse = true,
  version = 'Vol XI'
}: InstallBrandingProps) {
  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-lg',
    large: 'text-xl'
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div className={`w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full ${showPulse ? 'animate-pulse' : ''}`}></div>
      <span className={`${sizeClasses[size]} font-semibold text-white`}>
        Install MAYCOLETracker<span className="tm-medium">™</span> {version}
      </span>
    </div>
  );
}

// Compact footer branding
export function FooterMaycoleMethodBranding({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800 rounded-lg ${className}`}>
      <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full maycole-brand-pulse"></div>
      <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
        Powered by the MAYCOLE Method<span className="tm-small">™</span>
      </span>
    </div>
  );
}

// Export all components
export default MaycoleMethodBranding;