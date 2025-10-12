import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { motion } from 'motion/react';
import { 
  User, 
  Crown, 
  Zap, 
  BarChart3, 
  Package, 
  Phone,
  CreditCard,
  Calendar,
  TrendingUp,
  Settings,
  LogOut
} from 'lucide-react';

export function UserDashboard() {
  // The real UserContext provides a small API; provide safe fallbacks for
  // fields that some older components expect so we can triage without
  // changing the Provider right now.
  const userCtx = useUser() as any;
  const user = userCtx.user as any | null;
  const isPremium = typeof userCtx.isPremium === 'function' ? userCtx.isPremium : () => false;
  const hasFeature = typeof userCtx.hasFeature === 'function' ? userCtx.hasFeature : (_f: string) => false;
  // Legacy helpers — provide noop/fallbacks so UI remains renderable during triage
  const getRemainingTrialDays = typeof userCtx.getRemainingTrialDays === 'function' ? userCtx.getRemainingTrialDays : () => 0;
  const upgradeToPremium = typeof userCtx.upgradeToPremium === 'function' ? userCtx.upgradeToPremium : async () => { /* noop */ };
  const upgradeToEnterprise = typeof userCtx.upgradeToEnterprise === 'function' ? userCtx.upgradeToEnterprise : async () => { /* noop */ };
  const cancelSubscription = typeof userCtx.cancelSubscription === 'function' ? userCtx.cancelSubscription : async () => { /* noop */ };
  const logout = typeof userCtx.logout === 'function' ? userCtx.logout : () => { /* noop */ };
  const loading = !!userCtx.loading;

  const [upgrading, setUpgrading] = useState(false);

  const handleUpgrade = async (tier: 'professional' | 'enterprise') => {
    setUpgrading(true);
    try {
      if (tier === 'professional') {
        await upgradeToPremium();
      } else {
        await upgradeToEnterprise();
      }
    } finally {
      setUpgrading(false);
    }
  };

  const handleCancel = async () => {
    if (confirm('Are you sure you want to cancel your subscription?')) {
      await cancelSubscription();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <User className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">Not Signed In</h3>
          <p className="text-muted-foreground">Please sign in to access your dashboard</p>
        </CardContent>
      </Card>
    );
  }

  const trialDays = getRemainingTrialDays();
  const usagePercentage = (user?.usage?.itemsLimit === -1) ? 0 : (((user?.usage?.itemsUsed ?? 0) / (user?.usage?.itemsLimit ?? 1)) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">User Dashboard</h1>
          <p className="text-muted-foreground">Manage your MaycoleTracker™ account</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Trial Alert */}
  {user?.subscription?.status === 'trial' && trialDays > 0 && (
        <Alert>
          <Calendar className="w-4 h-4" />
          <AlertDescription>
            Your free trial expires in <strong>{trialDays} days</strong>. 
            Upgrade now to continue using premium features.
          </AlertDescription>
        </Alert>
      )}

      {/* Account Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Account Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Member Since</p>
              <p className="font-medium">
                  {new Date(user?.createdAt ?? Date.now()).toLocaleDateString()}
                </p>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5" />
              Subscription
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Current Plan</span>
                <Badge 
                variant={isPremium() ? 'default' : 'outline'}
                className={isPremium() ? 'bg-gradient-to-r from-orange-500 to-pink-500' : ''}
              >
                <Crown className="w-3 h-3 mr-1" />
                {user?.subscription?.tier ?? 'free'}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge variant={
                user?.subscription?.status === 'active' ? 'default' :
                user?.subscription?.status === 'trial' ? 'secondary' : 'destructive'
              }>
                {user?.subscription?.status ?? 'active'}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Monthly Cost</span>
              <span className="font-medium">
                ${user?.subscription?.monthlyPrice ?? 0}/month
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Usage Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Items Used</span>
                <span>
                  {user?.usage?.itemsUsed ?? 0}/{user?.usage?.itemsLimit === -1 ? '∞' : user?.usage?.itemsLimit ?? 0}
                </span>
              </div>
              <Progress value={usagePercentage} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>API Calls</span>
                <span>
                  {user.usage.apiCallsUsed}/{user.usage.apiCallsLimit === -1 ? '∞' : user.usage.apiCallsLimit}
                </span>
              </div>
              <Progress 
                value={user?.usage?.apiCallsLimit === -1 ? 0 : ((user?.usage?.apiCallsUsed ?? 0) / (user?.usage?.apiCallsLimit ?? 1)) * 100} 
                className="h-2" 
              />
            </div>

            <div className="flex justify-between text-sm">
              <span>Storage</span>
              <span>{user?.usage?.storageUsed ?? 0} / {user?.usage?.storageLimit ?? 0}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upgrade Options */}
      {!isPremium() && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Professional Plan */}
          <Card className="border-2 border-blue-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-2 text-sm font-medium">
              Most Popular
            </div>
            <CardHeader className="pt-12">
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-500" />
                Professional
              </CardTitle>
              <div className="text-3xl font-bold">$89<span className="text-sm font-normal">/month</span></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  Advanced Analytics & AI Insights
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  Voice Control & Barcode Scanning
                </li>
                <li className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-purple-500" />
                  Unlimited Inventory Items
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-500" />
                  Priority Support
                </li>
              </ul>

              <Button 
                onClick={() => handleUpgrade('professional')} 
                disabled={upgrading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {upgrading ? 'Upgrading...' : 'Upgrade to Professional'}
              </Button>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-purple-500" />
                Enterprise
              </CardTitle>
              <div className="text-3xl font-bold">$199<span className="text-sm font-normal">/month</span></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-purple-500" />
                  Everything in Professional
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-orange-500" />
                  Multi-Location Management
                </li>
                <li className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-green-500" />
                  White-Label Branding
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-500" />
                  24/7 Dedicated Support
                </li>
              </ul>

              <Button 
                onClick={() => handleUpgrade('enterprise')} 
                disabled={upgrading}
                variant="outline" 
                className="w-full border-purple-500 text-purple-500 hover:bg-purple-50"
              >
                {upgrading ? 'Upgrading...' : 'Upgrade to Enterprise'}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Current Plan Features */}
      {isPremium() && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Your Premium Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(user?.subscription?.features ?? []).map((feature: string, index: number) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                  <Zap className="w-3 h-3 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {isPremium() && (
              <div className="mt-6 pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={handleCancel}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Cancel Subscription
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}