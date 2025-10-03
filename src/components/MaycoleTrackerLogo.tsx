/**
 * MaycoleTracker™ Logo Component
 * Consistent trademark styling across the application
 */

import React from 'react';

interface MaycoleTrackerLogoProps {
  size?: 'small' | 'medium' | 'large' | 'hero';
  className?: string;
  showTrademark?: boolean;
}

export function MaycoleTrackerLogo({ 
  size = 'medium', 
  className = '', 
  showTrademark = true 
}: MaycoleTrackerLogoProps) {
  const trademarkClass = {
    small: 'tm-small',
    medium: 'tm-medium', 
    large: 'tm-large',
    hero: 'tm-large'
  }[size];

  return (
    <span className={className}>
      MaycoleTracker{showTrademark && <span className={trademarkClass}>™</span>}
    </span>
  );
}

// Alternative component for when you need just the trademark symbol
export function TrademarkSymbol({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) {
  const trademarkClass = {
    small: 'tm-small',
    medium: 'tm-medium',
    large: 'tm-large'
  }[size];

  return <span className={trademarkClass}>™</span>;
}

// Higher-order component to wrap text with proper trademark styling
export function withTrademark<T extends object>(
  Component: React.ComponentType<T>,
  size: 'small' | 'medium' | 'large' = 'medium'
) {
  return function TrademarkWrapper(props: T) {
    return (
      <Component {...props}>
        {/* This will need to be customized based on the component's children */}
      </Component>
    );
  };
}