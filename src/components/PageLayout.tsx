/**
 * MaycoleTracker™ Volume XI - Professional Page Layout
 * Consistent layout wrapper for all operational pages
 */

import React from 'react';
import UniversalBackButton from './UniversalBackButton';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  backTo?: string;
  showHomeOption?: boolean;
  className?: string;
}

export default function PageLayout({ 
  children, 
  title, 
  subtitle, 
  showBackButton = true, 
  backTo,
  showHomeOption = true,
  className = '' 
}: PageLayoutProps) {

  return (
    <div className={`min-h-screen bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Universal Back Button - Always show on operational pages */}
        {showBackButton && (
          <UniversalBackButton 
            customBackPath={backTo}
            showHomeOption={showHomeOption}
          />
        )}
        
        {(title || subtitle) && (
          <div className="mb-8">
            {title && (
              <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    {subtitle}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
        
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}