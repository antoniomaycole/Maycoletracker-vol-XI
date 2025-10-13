import React from 'react';
import { Shield, Zap } from 'lucide-react';
import { Crown, Star } from '@/lib/icons';

interface ProBadgeProps {
  variant?: 'default' | 'premium' | 'enterprise' | 'small' | 'large';
  icon?: 'crown' | 'star' | 'shield' | 'zap' | 'none';
  text?: string;
  pulse?: boolean;
  className?: string;
  size?: string;
}

export function ProBadge({ 
  variant = 'default', 
  icon = 'crown', 
  text = 'Pro Feature',
  pulse = false,
  className = ''
}: ProBadgeProps) {
  const getIcon = () => {
    if (icon === 'none') return null;
    
    const iconProps = { className: 'pro-badge-icon' };
    
    switch (icon) {
      case 'crown':
        return <Crown {...iconProps} />;
      case 'star':
        return <Star {...iconProps} />;
      case 'shield':
        return <Shield {...iconProps} />;
      case 'zap':
        return <Zap {...iconProps} />;
      default:
        return <Crown {...iconProps} />;
    }
  };

  const getVariantClasses = () => {
    const baseClasses = 'pro-badge pro-badge-with-icon';
    const variantClasses = {
      default: '',
      premium: 'pro-badge-premium',
      enterprise: 'pro-badge-enterprise',
      small: 'pro-badge-small',
      large: 'pro-badge-large'
    };
    
    return `${baseClasses} ${variantClasses[variant] || ''}`;
  };

  return (
    <div className={`${getVariantClasses()} ${pulse ? 'pro-badge-pulse' : ''} ${className}`}>
      {getIcon()}
      {text}
    </div>
  );
}

// Pre-configured badge variants for common use cases
export const ProFeatureBadge = (props: Omit<ProBadgeProps, 'text'>) => (
  <ProBadge text="Pro Feature" {...props} />
);

export const PremiumBadge = (props: Omit<ProBadgeProps, 'text'>) => (
  <ProBadge text="Premium" variant="premium" {...props} />
);

export const EnterpriseBadge = (props: Omit<ProBadgeProps, 'text'>) => (
  <ProBadge text="Enterprise" variant="enterprise" {...props} />
);

export const LaunchPhaseBadge = (props: Omit<ProBadgeProps, 'text' | 'icon' | 'pulse'>) => (
  <ProBadge text="Launch Phase" icon="star" pulse={true} {...props} />
);

// Usage examples:
// <ProFeatureBadge />
// <ProFeatureBadge variant="small" />
// <PremiumBadge icon="star" />
// <EnterpriseBadge icon="shield" />
// <LaunchPhaseBadge variant="small" />
// <ProBadge text="Custom Text" icon="zap" variant="large" pulse={true} />