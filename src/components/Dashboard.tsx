import React, { useState } from 'react';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Plus, Package, BarChart3, AlertTriangle, TrendingUp, DollarSign, Users, Building, Crown, Lock, Zap, Share } from 'lucide-react';
import { ShareApp } from './ShareApp';
import { InventoryItem, AppScreen } from '../App';
import { AppIcon } from './AppIcon';
import { PremiumFeature } from './UpgradePrompt';
import { IndustryPills } from './IndustrySelector';
import type { InventoryMetrics } from '../utils/calculations';
import type { BusinessConfig } from './BusinessConfig';
import type { UserSubscription } from './SubscriptionManager';

interface DashboardProps {
  items: InventoryItem[];
  lowStockCount: number;
  onNavigate: (screen: AppScreen) => void;
  onAddItem: () => void;
  trainingMode: boolean;
  inventoryMetrics: InventoryMetrics;
  businessConfig: BusinessConfig | null;
  subscription?: UserSubscription | null;
  onBusinessConfigChange?: (config: BusinessConfig) => void;
}

export function Dashboard({ items, lowStockCount, onNavigate, onAddItem, trainingMode, inventoryMetrics, businessConfig, subscription, onBusinessConfigChange }: DashboardProps) {
  const [showShareDialog, setShowShareDialog] = useState(false);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const lastUpdated = items.length > 0 
    ? new Date(Math.max(...items.map(item => new Date(item.lastUpdated).getTime()))).toLocaleDateString()
    : 'Never';
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const TrainingTooltip = ({ content, children }: { content: string; children: React.ReactNode }) => {
    if (!trainingMode) return <>{children}</>;
    
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {children}
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">{content}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section with subtle background */}
      <div className="bg-gradient-to-br from-white/50 to-blue-50/30 border-b border-border">
        <div className="p-6 max-w-6xl mx-auto">
      {/* Clean Header */}
      <div className="text-center space-y-3">
        <div className="flex justify-center items-center gap-3 relative">
          <AppIcon size={48} />
          <div className="text-left">
            <h1 className="text-primary font-bold tracking-tight">MaycoleTracker</h1>
            <p className="text-xs text-muted-foreground">by MaycoleTechnologies™</p>
          </div>
          
          {/* Share Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowShareDialog(true)}
            className="absolute right-0 flex items-center gap-2"
          >
            <Share className="w-4 h-4" />
            Share App
          </Button>
        </div>
        <div>
          <h2 className="text-foreground">Inventory Management</h2>
          <p className="text-sm text-muted-foreground">
            Trusted by 10,000+ businesses worldwide
          </p>
        </div>

        {/* Industry Quick Selector - Compact */}
        <div className="mt-3">
          <p className="text-xs text-muted-foreground mb-2">
            ✨ Works for your business:
          </p>
          <IndustryPills 
            currentConfig={businessConfig}
            onIndustryChange={(industryType) => {
              onNavigate('business-config');
            }}
          />
        </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 space-y-6 max-w-6xl mx-auto">

      {/* Status Notifications - Minimal */}
      {subscription && subscription.status === 'trial' && (
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Professional Trial</span>
              <Badge variant="outline" className="text-xs">
                {subscription.trialEndDate ? Math.ceil((new Date(subscription.trialEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 0} days
              </Badge>
            </div>
            <Button size="sm" variant="outline" onClick={() => onNavigate('subscription')}>
              Plans
            </Button>
          </div>
        </div>
      )}

      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold text-blue-700">{totalItems.toLocaleString()}</div>
                <p className="text-xs text-blue-600">Total Items</p>
              </div>
              <Package className="w-6 h-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200 shadow-lg hover:shadow-xl transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold text-green-700">
                  {formatCurrency(inventoryMetrics.totalValue)}
                </div>
                <p className="text-xs text-green-600">Total Value</p>
              </div>
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className={`bg-gradient-to-br border-2 shadow-lg hover:shadow-xl transition-all duration-200 ${lowStockCount > 0 ? 'from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 border-red-200' : 'from-emerald-50 to-emerald-100 dark:from-emerald-950/20 dark:to-emerald-900/20 border-emerald-200'}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-lg font-bold ${lowStockCount > 0 ? 'text-red-700' : 'text-emerald-700'}`}>{lowStockCount}</div>
                <p className={`text-xs ${lowStockCount > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                  {lowStockCount === 0 ? 'All Stocked' : 'Low Stock'}
                </p>
              </div>
              {lowStockCount > 0 ? (
                <AlertTriangle className="w-6 h-6 text-red-500" />
              ) : (
                <TrendingUp className="w-6 h-6 text-emerald-500" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold text-purple-700">98%</div>
                <p className="text-xs text-purple-600">Efficiency</p>
              </div>
              <Zap className="w-6 h-6 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Action Buttons */}
      <div className="space-y-4">
        <h3 className="font-medium">Get Started</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TrainingTooltip content="Add new inventory items to your system">
            <Button 
              onClick={onAddItem}
              className="w-full h-16 gap-3 text-left justify-start bg-blue-500 hover:bg-blue-600 text-white border-blue-500 shadow-lg hover:shadow-xl transition-all duration-200"
              size="lg"
            >
              <Plus className="w-5 h-5" />
              <div>
                <div className="font-medium">Add Items</div>
                <div className="text-xs opacity-90">Start tracking inventory</div>
              </div>
            </Button>
          </TrainingTooltip>

          <TrainingTooltip content="View and manage all inventory items">
            <Button 
              onClick={() => onNavigate('inventory')}
              className="w-full h-16 gap-3 text-left justify-start bg-green-500 hover:bg-green-600 text-white border-green-500 shadow-lg hover:shadow-xl transition-all duration-200"
              size="lg"
            >
              <Package className="w-5 h-5" />
              <div>
                <div className="font-medium">Manage Inventory</div>
                <div className="text-xs opacity-90">View and organize items</div>
              </div>
            </Button>
          </TrainingTooltip>

          <TrainingTooltip content="Record usage, receipts, and transactions">
            <Button 
              onClick={() => onNavigate('log-usage')}
              className="w-full h-16 gap-3 text-left justify-start bg-purple-500 hover:bg-purple-600 text-white border-purple-500 shadow-lg hover:shadow-xl transition-all duration-200"
              size="lg"
            >
              <DollarSign className="w-5 h-5" />
              <div>
                <div className="font-medium">Log Activity</div>
                <div className="text-xs opacity-90">Record usage and receipts</div>
              </div>
            </Button>
          </TrainingTooltip>

          <TrainingTooltip content="View comprehensive reports and analytics">
            <Button 
              onClick={() => onNavigate('reports')}
              className="w-full h-16 gap-3 text-left justify-start bg-orange-500 hover:bg-orange-600 text-white border-orange-500 shadow-lg hover:shadow-xl transition-all duration-200"
              size="lg"
            >
              <BarChart3 className="w-5 h-5" />
              <div>
                <div className="font-medium">View Reports</div>
                <div className="text-xs opacity-90">Business insights and trends</div>
              </div>
            </Button>
          </TrainingTooltip>
        </div>
      </div>

      {/* Power Features */}
      <div className="space-y-3">
        <h3 className="font-medium">Power Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <PremiumFeature
            subscription={subscription}
            requiredTier="professional"
            feature="AI Analytics"
            onUpgrade={() => onNavigate('subscription')}
            fallback={
              <Card className="border-dashed border-amber-300 bg-amber-50 dark:bg-amber-950/20">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <BarChart3 className="w-5 h-5 text-amber-600" />
                    <Lock className="w-3 h-3 text-amber-600" />
                  </div>
                  <div className="text-sm font-medium mb-1">AI Analytics</div>
                  <Button size="sm" onClick={() => onNavigate('subscription')} className="bg-amber-500 hover:bg-amber-600 text-white text-xs h-7">
                    Unlock Pro
                  </Button>
                </CardContent>
              </Card>
            }
          >
            <Card className="cursor-pointer hover:shadow-xl shadow-md transition-all duration-200 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 hover:scale-105" onClick={() => onNavigate('analytics')}>
              <CardContent className="p-4 text-center">
                <BarChart3 className="w-5 h-5 mx-auto mb-2 text-blue-600" />
                <div className="text-sm font-medium">AI Analytics</div>
              </CardContent>
            </Card>
          </PremiumFeature>

          <PremiumFeature
            subscription={subscription}
            requiredTier="professional"
            feature="Smart Scanner"
            onUpgrade={() => onNavigate('subscription')}
            fallback={
              <Card className="border-dashed border-amber-300 bg-amber-50 dark:bg-amber-950/20">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-amber-600" />
                    <Lock className="w-3 h-3 text-amber-600" />
                  </div>
                  <div className="text-sm font-medium mb-1">Smart Scanner</div>
                  <Button size="sm" onClick={() => onNavigate('subscription')} className="bg-amber-500 hover:bg-amber-600 text-white text-xs h-7">
                    Unlock Pro
                  </Button>
                </CardContent>
              </Card>
            }
          >
            <Card className="cursor-pointer hover:shadow-xl shadow-md transition-all duration-200 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 border-purple-200 hover:scale-105" onClick={() => onNavigate('scanner')}>
              <CardContent className="p-4 text-center">
                <Zap className="w-5 h-5 mx-auto mb-2 text-purple-600" />
                <div className="text-sm font-medium">Smart Scanner</div>
              </CardContent>
            </Card>
          </PremiumFeature>

          <Card className="cursor-pointer hover:shadow-xl shadow-md transition-all duration-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 hover:scale-105" onClick={() => onNavigate('suppliers')}>
            <CardContent className="p-4 text-center">
              <Users className="w-5 h-5 mx-auto mb-2 text-green-600" />
              <div className="text-sm font-medium">Suppliers</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Status Footer */}
      <div className="pt-4 border-t text-center text-xs text-muted-foreground">
        <p>
          Status: <span className="text-green-600">Operational</span> • 
          Updated: {lastUpdated} • 
          {businessConfig?.businessName || 'Universal Business'}
        </p>
      </div>
      </div>
      </div>
      
      {/* Share Dialog */}
      {showShareDialog && (
        <ShareApp onClose={() => setShowShareDialog(false)} />
      )}
    </div>
  );
}