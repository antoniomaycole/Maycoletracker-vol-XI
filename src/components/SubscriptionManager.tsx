import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Check, 
  Crown, 
  Zap, 
  Building, 
  Users, 
  BarChart3, 
  Shield, 
  Headphones,
  CreditCard,
  AlertTriangle,
  X,
  ArrowUp
} from 'lucide-react';
import { ProfessionalFooter } from './ProfessionalFooter';

export interface SubscriptionTier {
  id: 'free' | 'professional' | 'enterprise';
  name: string;
  price: number;
  billingPeriod: 'month' | 'year';
  description: string;
  features: string[];
  limits: {
    items: number;
    users: number;
    locations: number;
    apiCalls: number;
    storage: string;
  };
  popular?: boolean;
}

export interface UserSubscription {
  tier: 'free' | 'professional' | 'enterprise';
  status: 'active' | 'trial' | 'expired' | 'cancelled';
  startDate: string;
  endDate?: string;
  trialEndDate?: string;
  isTrialUsed: boolean;
}

export interface UsageStats {
  items: number;
  users: number;
  locations: number;
  apiCalls: number;
  storageUsed: number; // in MB
}

interface SubscriptionManagerProps {
  onNavigate: (screen: string) => void;
  currentUsage: UsageStats;
  onSubscriptionChange: (subscription: UserSubscription) => void;
}

const subscriptionTiers: SubscriptionTier[] = [
  {
    id: 'free',
    name: 'Starter',
    price: 0,
    billingPeriod: 'month',
    description: 'Essential features for small operations',
    features: [
      'Up to 50 inventory items',
      'Core inventory tracking',
      'Basic reporting dashboard',
      'Single location management',
      '1 user account',
      'Community support',
      'Mobile responsive interface'
    ],
    limits: {
      items: 50,
      users: 1,
      locations: 1,
      apiCalls: 100,
      storage: '100MB'
    }
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 29,
    billingPeriod: 'month',
    description: 'Complete solution for growing enterprises',
    features: [
      'Unlimited inventory items',
      'AI-powered predictive analytics',
      'Multi-location management',
      'Advanced supplier analytics',
      'Smart scanning (QR/Barcode/Voice)',
      'Up to 5 team members',
      'Priority support & training',
      'Industry-specific customization',
      'Automated reordering rules',
      'Cost optimization engine',
      'Advanced reporting suite'
    ],
    limits: {
      items: -1, // unlimited
      users: 5,
      locations: 5,
      apiCalls: 1000,
      storage: '1GB'
    },
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    billingPeriod: 'month',
    description: 'Enterprise-grade solution for large organizations',
    features: [
      'Everything in Professional',
      'Unlimited users & locations',
      'Custom enterprise configurations',
      'Full API access & webhooks',
      'Dedicated phone & email support',
      'Enterprise integrations (ERP/WMS)',
      'Custom reporting & dashboards',
      'Dedicated success manager',
      '99.9% SLA guarantee',
      'White-label branding options',
      'Advanced security & compliance'
    ],
    limits: {
      items: -1,
      users: -1,
      locations: -1,
      apiCalls: -1,
      storage: '10GB'
    }
  }
];

export function SubscriptionManager({ onNavigate, currentUsage, onSubscriptionChange }: SubscriptionManagerProps) {
  const [currentSubscription, setCurrentSubscription] = useState<UserSubscription | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier | null>(null);

  useEffect(() => {
    // Load subscription from localStorage
    const savedSubscription = localStorage.getItem('maycoletraker-subscription');
    if (savedSubscription) {
      setCurrentSubscription(JSON.parse(savedSubscription));
    } else {
      // Set default free tier
      const defaultSubscription: UserSubscription = {
        tier: 'free',
        status: 'active',
        startDate: new Date().toISOString(),
        isTrialUsed: false
      };
      setCurrentSubscription(defaultSubscription);
      localStorage.setItem('maycoletraker-subscription', JSON.stringify(defaultSubscription));
    }
  }, []);

  const getCurrentTier = () => {
    if (!currentSubscription) return subscriptionTiers[0];
    return subscriptionTiers.find(tier => tier.id === currentSubscription.tier) || subscriptionTiers[0];
  };

  const isAtLimit = (feature: keyof UsageStats) => {
    const currentTier = getCurrentTier();
    const limit = currentTier.limits[feature];
    if (limit === -1) return false; // unlimited
    
    if (feature === 'storage') {
      const limitMB = parseInt(limit.replace('MB', '').replace('GB', '')) * (limit.includes('GB') ? 1024 : 1);
      return currentUsage.storageUsed >= limitMB;
    }
    
    return currentUsage[feature] >= limit;
  };

  const getUsagePercentage = (feature: keyof UsageStats) => {
    const currentTier = getCurrentTier();
    const limit = currentTier.limits[feature];
    if (limit === -1) return 0; // unlimited
    
    if (feature === 'storage') {
      const limitMB = parseInt(limit.replace('MB', '').replace('GB', '')) * (limit.includes('GB') ? 1024 : 1);
      return Math.min((currentUsage.storageUsed / limitMB) * 100, 100);
    }
    
    return Math.min((currentUsage[feature] / limit) * 100, 100);
  };

  const startTrial = (tierId: 'professional' | 'enterprise') => {
    if (currentSubscription?.isTrialUsed) return;
    
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 14); // 14-day trial
    
    const newSubscription: UserSubscription = {
      tier: tierId,
      status: 'trial',
      startDate: new Date().toISOString(),
      trialEndDate: trialEndDate.toISOString(),
      isTrialUsed: true
    };
    
    setCurrentSubscription(newSubscription);
    localStorage.setItem('maycoletraker-subscription', JSON.stringify(newSubscription));
    onSubscriptionChange(newSubscription);
    setShowUpgradeModal(false);
  };

  const simulateSubscription = (tierId: 'professional' | 'enterprise') => {
    // In a real app, this would integrate with Stripe/Paddle
    const newSubscription: UserSubscription = {
      tier: tierId,
      status: 'active',
      startDate: new Date().toISOString(),
      isTrialUsed: currentSubscription?.isTrialUsed || false
    };
    
    setCurrentSubscription(newSubscription);
    localStorage.setItem('maycoletraker-subscription', JSON.stringify(newSubscription));
    onSubscriptionChange(newSubscription);
    setShowUpgradeModal(false);
  };

  const currentTier = getCurrentTier();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Professional Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building className="w-8 h-8 text-primary" />
            <h1 className="text-primary">MaycoleTraker Plans</h1>
          </div>
          <p className="text-muted-foreground mb-2">Enterprise-grade inventory management solutions</p>
          <p className="text-sm text-muted-foreground">
            Trusted by Fortune 500 companies and growing businesses worldwide
          </p>
        </div>

        {/* Current Plan Status */}
        {currentSubscription && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {currentTier.id === 'enterprise' ? <Building className="w-5 h-5" /> :
                       currentTier.id === 'professional' ? <Crown className="w-5 h-5" /> :
                       <Zap className="w-5 h-5" />}
                      Current Plan: {currentTier.name}
                      {currentSubscription.status === 'trial' && (
                        <Badge variant="secondary">Trial</Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      {currentSubscription.status === 'trial' 
                        ? `Trial ends ${new Date(currentSubscription.trialEndDate!).toLocaleDateString()}`
                        : currentTier.description}
                    </CardDescription>
                  </div>
                  {currentTier.id === 'free' && (
                    <Button onClick={() => setShowUpgradeModal(true)}>
                      <ArrowUp className="w-4 h-4 mr-2" />
                      Upgrade
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Usage Stats */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Items</span>
                      <span className="text-sm text-muted-foreground">
                        {currentUsage.items}/{currentTier.limits.items === -1 ? '∞' : currentTier.limits.items}
                      </span>
                    </div>
                    <Progress 
                      value={getUsagePercentage('items')} 
                      className={`h-2 ${isAtLimit('items') ? 'bg-destructive/20' : ''}`}
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Users</span>
                      <span className="text-sm text-muted-foreground">
                        {currentUsage.users}/{currentTier.limits.users === -1 ? '∞' : currentTier.limits.users}
                      </span>
                    </div>
                    <Progress 
                      value={getUsagePercentage('users')} 
                      className={`h-2 ${isAtLimit('users') ? 'bg-destructive/20' : ''}`}
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Locations</span>
                      <span className="text-sm text-muted-foreground">
                        {currentUsage.locations}/{currentTier.limits.locations === -1 ? '∞' : currentTier.limits.locations}
                      </span>
                    </div>
                    <Progress 
                      value={getUsagePercentage('locations')} 
                      className={`h-2 ${isAtLimit('locations') ? 'bg-destructive/20' : ''}`}
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Storage</span>
                      <span className="text-sm text-muted-foreground">
                        {currentUsage.storageUsed}MB/{currentTier.limits.storage}
                      </span>
                    </div>
                    <Progress 
                      value={getUsagePercentage('storage')} 
                      className={`h-2 ${isAtLimit('storage') ? 'bg-destructive/20' : ''}`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {subscriptionTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`relative ${tier.popular ? 'ring-2 ring-primary shadow-lg' : ''} ${currentTier.id === tier.id ? 'border-primary' : ''}`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    {tier.id === 'enterprise' ? <Building className="w-8 h-8" /> :
                     tier.id === 'professional' ? <Crown className="w-8 h-8" /> :
                     <Zap className="w-8 h-8" />}
                  </div>
                  <CardTitle>{tier.name}</CardTitle>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold">${tier.price}</span>
                    <span className="text-muted-foreground">/{tier.billingPeriod}</span>
                  </div>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {currentTier.id === tier.id ? (
                    <Button disabled className="w-full">Current Plan</Button>
                  ) : currentTier.id === 'free' && tier.id !== 'free' ? (
                    <div className="space-y-2">
                      {!currentSubscription?.isTrialUsed && (
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => startTrial(tier.id as 'professional' | 'enterprise')}
                        >
                          Start 14-Day Trial
                        </Button>
                      )}
                      <Button 
                        className="w-full"
                        onClick={() => simulateSubscription(tier.id as 'professional' | 'enterprise')}
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Subscribe Now
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      className="w-full"
                      onClick={() => simulateSubscription(tier.id as 'professional' | 'enterprise')}
                    >
                      {tier.price < currentTier.price ? 'Downgrade' : 'Upgrade'}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Features Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Feature Comparison</CardTitle>
            <CardDescription>Compare all features across our plans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Feature</th>
                    {subscriptionTiers.map(tier => (
                      <th key={tier.id} className="text-center py-2">{tier.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Inventory Items</td>
                    <td className="text-center py-2">50</td>
                    <td className="text-center py-2">Unlimited</td>
                    <td className="text-center py-2">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Users</td>
                    <td className="text-center py-2">1</td>
                    <td className="text-center py-2">5</td>
                    <td className="text-center py-2">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Advanced Analytics</td>
                    <td className="text-center py-2"><X className="w-4 h-4 mx-auto text-muted-foreground" /></td>
                    <td className="text-center py-2"><Check className="w-4 h-4 mx-auto text-green-500" /></td>
                    <td className="text-center py-2"><Check className="w-4 h-4 mx-auto text-green-500" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">API Access</td>
                    <td className="text-center py-2"><X className="w-4 h-4 mx-auto text-muted-foreground" /></td>
                    <td className="text-center py-2"><X className="w-4 h-4 mx-auto text-muted-foreground" /></td>
                    <td className="text-center py-2"><Check className="w-4 h-4 mx-auto text-green-500" /></td>
                  </tr>
                  <tr>
                    <td className="py-2">Support</td>
                    <td className="text-center py-2">Email</td>
                    <td className="text-center py-2">Priority Email</td>
                    <td className="text-center py-2">Phone + Email</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Professional Footer */}
        <ProfessionalFooter />

        {/* Back Button */}
        <div className="flex justify-center mt-8">
          <Button variant="outline" onClick={() => onNavigate('dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}

// Usage Limit Hook
export function useUsageLimits(currentUsage: UsageStats, subscription: UserSubscription | null) {
  const currentTier = subscription ? 
    subscriptionTiers.find(tier => tier.id === subscription.tier) || subscriptionTiers[0] :
    subscriptionTiers[0];

  const checkLimit = (feature: keyof UsageStats) => {
    const limit = currentTier.limits[feature];
    if (limit === -1) return { allowed: true, remaining: -1 };
    
    if (feature === 'storage') {
      const limitMB = parseInt(limit.replace('MB', '').replace('GB', '')) * (limit.includes('GB') ? 1024 : 1);
      return {
        allowed: currentUsage.storageUsed < limitMB,
        remaining: limitMB - currentUsage.storageUsed
      };
    }
    
    return {
      allowed: currentUsage[feature] < limit,
      remaining: limit - currentUsage[feature]
    };
  };

  return {
    checkLimit,
    currentTier,
    isAtLimit: (feature: keyof UsageStats) => !checkLimit(feature).allowed
  };
}

// Premium Feature Guard Component
export function PremiumFeatureGuard({ 
  feature, 
  requiredTier, 
  children, 
  fallback,
  subscription 
}: {
  feature: string;
  requiredTier: 'professional' | 'enterprise';
  children: React.ReactNode;
  fallback?: React.ReactNode;
  subscription: UserSubscription | null;
}) {
  const hasAccess = subscription && 
    (subscription.tier === requiredTier || 
     (requiredTier === 'professional' && subscription.tier === 'enterprise'));

  if (hasAccess) {
    return <>{children}</>;
  }

  return fallback || (
    <Alert>
      <Crown className="h-4 w-4" />
      <AlertDescription>
        This feature requires a {requiredTier} subscription. 
        <Button variant="link" className="p-0 h-auto ml-1">
          Upgrade now
        </Button>
      </AlertDescription>
    </Alert>
  );
}