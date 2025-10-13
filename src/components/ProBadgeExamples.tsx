import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  ProBadge, 
  ProFeatureBadge, 
  PremiumBadge, 
  EnterpriseBadge, 
  LaunchPhaseBadge 
} from './ProBadge';

/**
 * Pro Badge Usage Examples for MaycoleTracker™
 * Demonstrates all the professional badge variations available
 */
export function ProBadgeExamples() {
  return (
    <div className="space-y-8 p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">MaycoleTracker™ Pro Badge System</h2>
        <p className="text-muted-foreground">
          Professional badges for premium features, launch phase, and enterprise functionality
        </p>
      </div>

      {/* Standard Pro Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Standard Pro Badges</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <ProFeatureBadge />
            <PremiumBadge />
            <EnterpriseBadge />
            <LaunchPhaseBadge />
          </div>
        </CardContent>
      </Card>

      {/* Size Variations */}
      <Card>
        <CardHeader>
          <CardTitle>Size Variations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <ProFeatureBadge />
            <ProFeatureBadge />
            <ProFeatureBadge variant="large" />
          </div>
        </CardContent>
      </Card>

      {/* Icon Variations */}
      <Card>
        <CardHeader>
          <CardTitle>Icon Variations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <ProBadge text="Analytics" icon="crown" />
            <ProBadge text="Voice Control" icon="star" />
            <ProBadge text="Security" icon="shield" />
            <ProBadge text="Performance" icon="zap" />
            <ProBadge text="Clean UI" icon="none" />
          </div>
        </CardContent>
      </Card>

      {/* Custom Colors & Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Color Variants</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <ProBadge text="Default" />
            <ProBadge text="Premium" variant="premium" />
            <ProBadge text="Enterprise" variant="enterprise" />
          </div>
        </CardContent>
      </Card>

      {/* Animated Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Animated Badges (Pulse Effect)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <ProBadge text="New Feature" pulse={true} />
            <ProBadge text="Limited Time" variant="premium" pulse={true} />
            <LaunchPhaseBadge />
          </div>
        </CardContent>
      </Card>

      {/* Real-World Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Real-World Usage Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Feature Card Example */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">Advanced Analytics Dashboard</h4>
              <ProFeatureBadge />
            </div>
            <p className="text-sm text-muted-foreground">
              Get AI-powered insights and predictive analytics for your inventory.
            </p>
          </div>

          {/* Menu Item Example */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">Voice Control System</h4>
              <PremiumBadge icon="star" />
            </div>
            <p className="text-sm text-muted-foreground">
              Control your inventory with hands-free voice commands.
            </p>
          </div>

          {/* Enterprise Feature Example */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">Multi-Location Management</h4>
              <EnterpriseBadge icon="shield" />
            </div>
            <p className="text-sm text-muted-foreground">
              Manage inventory across multiple locations with centralized control.
            </p>
          </div>

          {/* Launch Phase Example */}
          <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-950/20">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">All Premium Features</h4>
              <LaunchPhaseBadge />
            </div>
            <p className="text-sm text-muted-foreground">
              During launch phase, all premium features are available at no cost!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Usage Code Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Code Usage Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg text-sm font-mono space-y-2">
            <div>{`// Basic usage`}</div>
            <div>{`<ProFeatureBadge />`}</div>
            <div>{`<PremiumBadge />`}</div>
            <div>{`<EnterpriseBadge />`}</div>
            <div className="pt-2">{`// Custom variations`}</div>
            <div>{`<ProBadge text="Custom" icon="zap" variant="large" pulse={true} />`}</div>
            <div>{`<LaunchPhaseBadge variant="small" />`}</div>
            <div className="pt-2">{`// In feature lists`}</div>
            <div>{`<div className="flex items-center justify-between">`}</div>
            <div>{`  <span>Analytics Dashboard</span>`}</div>
            <div>{`  <ProFeatureBadge variant="small" />`}</div>
            <div>{`</div>`}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}