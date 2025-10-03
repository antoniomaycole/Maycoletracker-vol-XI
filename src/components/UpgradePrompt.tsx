import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { 
  Crown, 
  AlertTriangle, 
  X,
  ArrowUp,
  Zap,
  Star,
  TrendingUp,
  Users,
  Building,
  Sparkles
} from 'lucide-react';
import type { UserSubscription, UsageStats } from './SubscriptionManager';

interface UpgradePromptProps {
  feature: string;
  requiredTier: 'professional' | 'enterprise';
  currentUsage?: UsageStats;
  subscription: UserSubscription | null;
  onUpgrade: () => void;
  onDismiss?: () => void;
  variant?: 'banner' | 'modal' | 'inline' | 'toast';
  description?: string;
  benefits?: string[];
}

export function UpgradePrompt({
  feature,
  requiredTier,
  currentUsage,
  subscription,
  onUpgrade,
  onDismiss,
  variant = 'inline',
  description,
  benefits = []
}: UpgradePromptProps) {
  const [isOpen, setIsOpen] = useState(variant === 'modal');

  const tierInfo = {
    professional: {
      name: 'Professional',
      price: 29,
      icon: Crown,
      color: 'text-amber-500'
    },
    enterprise: {
      name: 'Enterprise',
      price: 99,
      icon: Building,
      color: 'text-purple-500'
    }
  };

  const currentTierInfo = tierInfo[requiredTier];
  const Icon = currentTierInfo.icon;

  const defaultBenefits = {
    professional: [
      'Unlimited inventory items',
      'Advanced analytics & predictions',
      'Multi-location support',
      'QR/Barcode scanning',
      'Up to 5 users',
      'Priority support'
    ],
    enterprise: [
      'Everything in Professional',
      'Unlimited users & locations',
      'API access',
      'Custom integrations',
      'Dedicated support',
      'White-label options'
    ]
  };

  const featureBenefits = benefits.length > 0 ? benefits : defaultBenefits[requiredTier];

  const handleUpgrade = () => {
    onUpgrade();
    if (variant === 'modal') {
      setIsOpen(false);
    }
  };

  const handleDismiss = () => {
    if (onDismiss) onDismiss();
    if (variant === 'modal') {
      setIsOpen(false);
    }
  };

  // Banner variant
  if (variant === 'banner') {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-lg p-4 mb-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full bg-background ${currentTierInfo.color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-medium">Unlock {feature}</h4>
              <p className="text-sm text-muted-foreground">
                {description || `Upgrade to ${currentTierInfo.name} to access this feature`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              ${currentTierInfo.price}/month
            </Badge>
            <Button size="sm" onClick={handleUpgrade}>
              <ArrowUp className="w-4 h-4 mr-2" />
              Upgrade
            </Button>
            {onDismiss && (
              <Button variant="ghost" size="sm" onClick={handleDismiss}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Toast variant
  if (variant === 'toast') {
    return (
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        className="fixed top-4 right-4 z-50 max-w-sm"
      >
        <Card className="shadow-lg border-primary/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className={`w-5 h-5 ${currentTierInfo.color}`} />
                <CardTitle className="text-sm">Upgrade Available</CardTitle>
              </div>
              {onDismiss && (
                <Button variant="ghost" size="sm" onClick={handleDismiss}>
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground mb-3">
              {description || `Unlock ${feature} with ${currentTierInfo.name}`}
            </p>
            <Button size="sm" onClick={handleUpgrade} className="w-full">
              <Sparkles className="w-4 h-4 mr-2" />
              Upgrade Now
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Modal variant
  if (variant === 'modal') {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-3 rounded-full bg-primary/10 ${currentTierInfo.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <DialogTitle>Upgrade to {currentTierInfo.name}</DialogTitle>
                <DialogDescription>
                  Unlock {feature} and many more powerful features
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          
          <div className="space-y-4">
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
            
            <div className="space-y-2">
              <h4 className="font-medium">What you'll get:</h4>
              <ul className="space-y-2">
                {featureBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="font-medium">{currentTierInfo.name} Plan</p>
                <p className="text-sm text-muted-foreground">Everything you need to scale</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">${currentTierInfo.price}</p>
                <p className="text-sm text-muted-foreground">per month</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleDismiss} className="flex-1">
                Maybe Later
              </Button>
              <Button onClick={handleUpgrade} className="flex-1">
                <TrendingUp className="w-4 h-4 mr-2" />
                Upgrade Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Inline variant (default)
  return (
    <Alert className="border-primary/20 bg-primary/5">
      <Icon className={`h-4 w-4 ${currentTierInfo.color}`} />
      <AlertDescription className="flex items-center justify-between">
        <span>
          <strong>{feature}</strong> requires {currentTierInfo.name}. 
          {description && ` ${description}`}
        </span>
        <Button size="sm" onClick={handleUpgrade} className="ml-4">
          <ArrowUp className="w-4 h-4 mr-1" />
          Upgrade
        </Button>
      </AlertDescription>
    </Alert>
  );
}

// Usage Warning Component
export function UsageWarning({
  feature,
  currentUsage,
  limit,
  subscription,
  onUpgrade,
  threshold = 0.8
}: {
  feature: string;
  currentUsage: number;
  limit: number;
  subscription: UserSubscription | null;
  onUpgrade: () => void;
  threshold?: number;
}) {
  const percentage = currentUsage / limit;
  const isNearLimit = percentage >= threshold;
  const isAtLimit = percentage >= 1;

  if (!isNearLimit) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mb-4"
    >
      <Alert className={isAtLimit ? "border-destructive bg-destructive/10" : "border-amber-500 bg-amber-50 dark:bg-amber-500/10"}>
        <AlertTriangle className={`h-4 w-4 ${isAtLimit ? "text-destructive" : "text-amber-500"}`} />
        <AlertDescription className="flex items-center justify-between">
          <span>
            {isAtLimit 
              ? `You've reached your ${feature} limit (${currentUsage}/${limit})`
              : `You're near your ${feature} limit (${currentUsage}/${limit})`
            }
          </span>
          <Button 
            size="sm" 
            variant={isAtLimit ? "destructive" : "outline"}
            onClick={onUpgrade}
          >
            <ArrowUp className="w-4 h-4 mr-1" />
            Upgrade
          </Button>
        </AlertDescription>
      </Alert>
    </motion.div>
  );
}

// Premium Feature Wrapper
export function PremiumFeature({
  subscription,
  requiredTier,
  feature,
  children,
  fallback,
  showUpgradePrompt = true,
  onUpgrade
}: {
  subscription: UserSubscription | null;
  requiredTier: 'professional' | 'enterprise';
  feature: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showUpgradePrompt?: boolean;
  onUpgrade?: () => void;
}) {
  const hasAccess = subscription && 
    (subscription.tier === requiredTier || 
     (requiredTier === 'professional' && subscription.tier === 'enterprise'));

  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  if (showUpgradePrompt && onUpgrade) {
    return (
      <UpgradePrompt
        feature={feature}
        requiredTier={requiredTier}
        subscription={subscription}
        onUpgrade={onUpgrade}
        variant="inline"
      />
    );
  }

  return null;
}