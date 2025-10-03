/**
 * Layout Component for MaycoleTracker™
 * Provides common layout structure for application pages
 */

import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { MaycoleTrackerLogo } from './MaycoleTrackerLogo';

interface LayoutProps {
  children?: React.ReactNode;
  showBackButton?: boolean;
  title?: string;
}

export default function Layout({ children, showBackButton = true, title }: LayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
        {/* Header */}
        {(showBackButton || title) && (
          <header className="bg-card border-b border-border shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                {/* Left side - Back button and title */}
                <div className="flex items-center gap-4">
                  {showBackButton && (
                    <Button
                      onClick={() => navigate('/')}
                      variant="outline"
                      size="sm"
                    >
                      ← Home
                    </Button>
                  )}
                  {title && (
                    <h1 className="text-xl font-bold">{title}</h1>
                  )}
                </div>

                {/* Right side - Logo */}
                <div className="flex items-center gap-3">
                  <MaycoleTrackerLogo size="small" />
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Main Content */}
        <main>
          {children || <Outlet />}
        </main>
      </div>
  );
}