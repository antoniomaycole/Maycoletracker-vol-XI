import React from 'react';
import { useUser } from '../contexts/UserContext';
import { PremiumFeatureGuard, usePremiumFeature, withPremiumFeature } from './PremiumFeatureGuard';
import { MonetizationPage } from './MonetizationPage';
import { Analytics } from './Analytics';
import { VoiceControl } from './VoiceControl';
import { Scanner } from './Scanner';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Zap, BarChart3, Mic, QrCode, Users } from 'lucide-react';
import { Crown } from '@/lib/icons';

// Example 1: Basic Premium Conditional Rendering
export function BasicPremiumExample() {
  const { user, isPremium } = useUser();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Premium Conditional</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Original pattern you requested */}
        {user?.isPremium && <MonetizationPage />}
        
        {/* Alternative patterns */}
        {isPremium() ? (
          <div className="text-green-600 font-medium">
            ✅ Premium features enabled
          </div>
        ) : (
          <div className="text-muted-foreground">
            🔒 Upgrade to access premium features
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Example 2: Feature-Specific Conditional Rendering
export function FeatureSpecificExample() {
  const { hasFeature } = useUser();

  return (
    <div className="space-y-4">
      {/* Analytics conditional */}
      {hasFeature('analytics') && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Analytics Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Analytics businessConfig={null} />
          </CardContent>
        </Card>
      )}

      {/* Voice Control conditional */}
      {hasFeature('voice_control') && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="w-5 h-5" />
              Voice Commands Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Voice control is active. Say "Dashboard" to navigate.</p>
          </CardContent>
        </Card>
      )}

      {/* Barcode Scanning conditional */}
      {hasFeature('barcode_scanning') && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              Barcode Scanner Ready
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button>
              <QrCode className="w-4 h-4 mr-2" />
              Start Scanning
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Example 3: Using PremiumFeatureGuard Component
export function GuardedFeaturesExample() {
  return (
    <div className="space-y-6">
      {/* Analytics with upgrade prompt */}
      <PremiumFeatureGuard feature="analytics">
        <Card>
          <CardHeader>
            <CardTitle>Advanced Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p>AI-powered insights and predictive analytics are now available!</p>
          </CardContent>
        </Card>
      </PremiumFeatureGuard>

      {/* Voice Control with custom fallback */}
      <PremiumFeatureGuard 
        feature="voice_control"
        fallback={
          <Card className="opacity-50">
            <CardContent className="p-6 text-center">
              <Mic className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">Voice Control requires Professional plan</p>
            </CardContent>
          </Card>
        }
      >
        <Card>
          <CardHeader>
            <CardTitle>Voice Control Active</CardTitle>
          </CardHeader>
          <CardContent>
            <Button>
              <Mic className="w-4 h-4 mr-2" />
              Start Listening
            </Button>
          </CardContent>
        </Card>
      </PremiumFeatureGuard>

      {/* Multi-location (Enterprise feature) */}
      <PremiumFeatureGuard feature="multi_location">
        <Card>
          <CardHeader>
            <CardTitle>Multi-Location Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage inventory across all your locations from one dashboard.</p>
          </CardContent>
        </Card>
      </PremiumFeatureGuard>
    </div>
  );
}

// Example 4: Using the Hook Pattern
export function HookPatternExample() {
  const analytics = usePremiumFeature('analytics');
  const voiceControl = usePremiumFeature('voice_control');
  const multiLocation = usePremiumFeature('multi_location');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className={analytics.hasAccess ? 'border-green-500' : 'border-muted'}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Analytics
            {analytics.hasAccess ? (
              <Badge variant="default" className="bg-green-500">
                <Zap className="w-3 h-3 mr-1" />
                Active
              </Badge>
            ) : (
              <Badge variant="outline">
                <Crown className="w-3 h-3 mr-1" />
                Locked
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {analytics.hasAccess ? (
            <p className="text-green-600">AI analytics available</p>
          ) : (
            <p className="text-muted-foreground">Upgrade to Professional</p>
          )}
        </CardContent>
      </Card>

      <Card className={voiceControl.hasAccess ? 'border-blue-500' : 'border-muted'}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Voice Control
            {voiceControl.hasAccess ? (
              <Badge variant="default" className="bg-blue-500">
                <Zap className="w-3 h-3 mr-1" />
                Active
              </Badge>
            ) : (
              <Badge variant="outline">
                <Crown className="w-3 h-3 mr-1" />
                Locked
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {voiceControl.hasAccess ? (
            <p className="text-blue-600">Voice commands ready</p>
          ) : (
            <p className="text-muted-foreground">Upgrade to Professional</p>
          )}
        </CardContent>
      </Card>

      <Card className={multiLocation.hasAccess ? 'border-purple-500' : 'border-muted'}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Multi-Location
            {multiLocation.hasAccess ? (
              <Badge variant="default" className="bg-purple-500">
                <Zap className="w-3 h-3 mr-1" />
                Active
              </Badge>
            ) : (
              <Badge variant="outline">
                <Crown className="w-3 h-3 mr-1" />
                Enterprise
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {multiLocation.hasAccess ? (
            <p className="text-purple-600">Multi-site management</p>
          ) : (
            <p className="text-muted-foreground">Upgrade to Enterprise</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Example 5: Higher-Order Component Pattern
const PremiumAnalytics = withPremiumFeature(Analytics, 'analytics', {
  title: 'Premium Analytics Dashboard',
  description: 'Get AI-powered insights and predictive analytics'
});

const PremiumUserManagement = withPremiumFeature(
  () => (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Manage team members and permissions</p>
      </CardContent>
    </Card>
  ),
  'multi_location',
  {
    title: 'Team & User Management',
    description: 'Enterprise-grade user management and permissions'
  }
);

export function HOCPatternExample() {
  return (
    <div className="space-y-6">
      <PremiumAnalytics businessConfig={null} />
      <PremiumUserManagement />
    </div>
  );
}

// Example 6: Complete Usage Showcase
export function CompletePremiumShowcase() {
  const { user, isPremium } = useUser();

  return (
    <div className="space-y-8">
      {/* User Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Current User Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">User</p>
              <p className="font-medium">{user?.name || 'Guest'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Plan</p>
              <Badge variant={isPremium() ? 'default' : 'outline'}>
                <Crown className="w-3 h-3 mr-1" />
                {user?.subscription.tier || 'free'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* All Conditional Patterns */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Premium Conditional Patterns</h3>
        
        <BasicPremiumExample />
        <FeatureSpecificExample />
        <GuardedFeaturesExample />
        <HookPatternExample />
        <HOCPatternExample />
      </div>
    </div>
  );
}