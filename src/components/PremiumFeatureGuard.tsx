import React, { ReactNode } from 'react';
import { useUser } from '../contexts/UserContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { 
  Crown, 
  Lock, 
  Zap, 
  Star, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface PremiumFeatureGuardProps {
  feature: string;
  children: ReactNode;
  fallback?: ReactNode;
  showUpgrade?: boolean;
  title?: string;
  description?: string;
  className?: string;
}

export function PremiumFeatureGuard({ 
  feature, 
  children, 
  fallback,
  showUpgrade = true,
  title,
  description,
  className = ""
}: PremiumFeatureGuardProps) {
  const { user, hasFeature, isPremium } = useUser();

  // If user has access to the feature, render children
  if (hasFeature(feature)) {
    return <>{children}</>;
  }

  // If custom fallback is provided, use it
  if (fallback) {
    return <>{fallback}</>;
  }

  // If showUpgrade is false, render nothing
  if (!showUpgrade) {
    return null;
  }

  // Feature display names and descriptions
  const featureDetails = {
    analytics: {
      name: 'Advanced Analytics',
      description: 'AI-powered insights, predictive analytics, and custom reports',
      icon: <Sparkles className="w-5 h-5" />,
      tier: 'Professional'
    },
    voice_control: {
      name: 'Voice Control',
      description: 'Hands-free inventory management with voice commands',
      icon: <Zap className="w-5 h-5" />,
      tier: 'Professional'
    },
    barcode_scanning: {
      name: 'Barcode Scanning',
      description: 'Quick item identification and inventory updates',
      icon: <Crown className="w-5 h-5" />,
      tier: 'Professional'
    },
    emergency_mode: {
      name: 'Emergency Mode',
      description: 'Crisis management and emergency contact system',
      icon: <Star className="w-5 h-5" />,
      tier: 'Professional'
    },
    multi_location: {
      name: 'Multi-Location Management',
      description: 'Manage inventory across multiple locations',
      icon: <Crown className="w-5 h-5" />,
      tier: 'Enterprise'
    },
    api_access: {
      name: 'API Access',
      description: 'Integrate with external systems and custom applications',
      icon: <Zap className="w-5 h-5" />,
      tier: 'Professional'
    },
    custom_reports: {
      name: 'Custom Reports',
      description: 'Create and export detailed custom reports',
      icon: <Sparkles className="w-5 h-5" />,
      tier: 'Professional'
    },
    bulk_operations: {
      name: 'Bulk Operations',
      description: 'Import/export and bulk update inventory items',
      icon: <Crown className="w-5 h-5" />,
      tier: 'Professional'
    },
    advanced_integrations: {
      name: 'Advanced Integrations',
      description: 'Connect with ERP, accounting, and business systems',
      icon: <Star className="w-5 h-5" />,
      tier: 'Enterprise'
    },
    white_label: {
      name: 'White Label Branding',
      description: 'Customize the app with your own branding',
      icon: <Crown className="w-5 h-5" />,
      tier: 'Enterprise'
    },
    priority_support: {
      name: 'Priority Support',
      description: '24/7 phone support and dedicated account manager',
      icon: <Star className="w-5 h-5" />,
      tier: 'Enterprise'
    }
  };

  const details = (featureDetails as any)[feature] || {
    name: 'Premium Feature',
    description: 'This feature requires a premium subscription',
    icon: <Lock className="w-5 h-5" />,
    tier: 'Professional'
  };

  const isEnterpriseFeature = details.tier === 'Enterprise';

  const handleUpgrade = async () => {
    // In this shimbed environment, trigger a simple UI flow or redirect
    window.location.href = '/subscription';
  };

  return (
    <div className={`premium-feature-guard ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-2 border-dashed border-muted-foreground/30 bg-gradient-to-br from-background to-muted/20">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            
            <CardTitle className="flex items-center justify-center gap-2">
              {details.icon}
              {title || details.name}
              <Badge variant="outline" className="ml-2">
                <Crown className="w-3 h-3 mr-1" />
                {details.tier}
              </Badge>
            </CardTitle>
            
            <p className="text-muted-foreground">
              {description || details.description}
            </p>
          </CardHeader>
          
          <CardContent className="text-center space-y-4">
            {/* Current Plan Status */}
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Current Plan: <Badge variant="outline">{user?.subscription.tier || 'Free'}</Badge>
              </p>
              {user?.subscription.tier === 'free' && (
                <p className="text-xs text-muted-foreground mt-1">
                  Upgrade to unlock premium features
                </p>
              )}
            </div>

            {/* Feature Benefits */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">What you'll get:</h4>
              <div className="grid grid-cols-1 gap-2 text-sm text-muted-foreground">
                {isEnterpriseFeature ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Star className="w-3 h-3 text-orange-500" />
                      <span>Advanced {feature.replace('_', ' ')} capabilities</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Crown className="w-3 h-3 text-purple-500" />
                      <span>Enterprise-grade security & support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-3 h-3 text-blue-500" />
                      <span>Unlimited usage & custom integrations</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <Zap className="w-3 h-3 text-blue-500" />
                      <span>Full {feature.replace('_', ' ')} access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-green-500" />
                      <span>Advanced features & analytics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Crown className="w-3 h-3 text-purple-500" />
                      <span>Priority support included</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Upgrade Button */}
            <Button 
              onClick={handleUpgrade}
              className={`w-full ${isEnterpriseFeature 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
              }`}
            >
              <Crown className="w-4 h-4 mr-2" />
              Upgrade to {details.tier}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            {/* Pricing Info */}
            <p className="text-xs text-muted-foreground">
              {isEnterpriseFeature 
                ? 'Starting at $199/month • Full enterprise features'
                : 'Starting at $89/month • 14-day free trial'
              }
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// Higher-order component for premium features
export function withPremiumFeature<P extends object>(
  Component: React.ComponentType<P>,
  feature: string,
  upgradeProps?: {
    title?: string;
    description?: string;
    showUpgrade?: boolean;
  }
) {
  return function PremiumComponent(props: P) {
    return (
      <PremiumFeatureGuard 
        feature={feature}
        {...(upgradeProps as any)}
      >
        <Component {...props} />
      </PremiumFeatureGuard>
    );
  };
}

// Hook for checking premium features in components
export function usePremiumFeature(feature: string) {
  const { hasFeature, isPremium } = useUser();
  
  return {
    hasAccess: hasFeature(feature),
    isPremium: isPremium(),
    feature
  };
}