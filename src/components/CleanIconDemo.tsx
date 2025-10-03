/**
 * Clean Icon Demo Component
 * Showcases the new round, clean MaycoleTracker™ icon
 */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { CleanIcon, AppStoreIcon, FaviconIcon, ButtonIcon } from './MaycoleTrackerIcon';

export function CleanIconDemo() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <CleanIcon size={120} />
        </div>
        <h1 className="text-3xl font-bold">MaycoleTracker™ Clean Round Icon</h1>
        <p className="text-lg text-muted-foreground">
          Perfect round icon button designed specifically for your app's clean interface
        </p>
      </div>

      {/* Size Variations */}
      <Card>
        <CardHeader>
          <CardTitle>Size Variations</CardTitle>
          <CardDescription>Clean icon scales perfectly at any size</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-8 py-8">
            <div className="text-center">
              <CleanIcon size={24} />
              <p className="text-sm mt-2">24px</p>
            </div>
            <div className="text-center">
              <CleanIcon size={32} />
              <p className="text-sm mt-2">32px</p>
            </div>
            <div className="text-center">
              <CleanIcon size={40} />
              <p className="text-sm mt-2">40px</p>
            </div>
            <div className="text-center">
              <CleanIcon size={48} />
              <p className="text-sm mt-2">48px</p>
            </div>
            <div className="text-center">
              <CleanIcon size={64} />
              <p className="text-sm mt-2">64px</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Variations */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Variations</CardTitle>
          <CardDescription>Different variants for different use cases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Header Icon */}
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <CleanIcon size={48} interactive={false} />
              </div>
              <div>
                <h4 className="font-medium">Header Icon</h4>
                <p className="text-sm text-muted-foreground">Non-interactive, perfect for logos</p>
              </div>
            </div>

            {/* Button Icon */}
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <ButtonIcon size={48} interactive={true} />
              </div>
              <div>
                <h4 className="font-medium">Button Icon</h4>
                <p className="text-sm text-muted-foreground">Interactive with hover effects</p>
              </div>
            </div>

            {/* App Store Icon */}
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <AppStoreIcon size={48} />
              </div>
              <div>
                <h4 className="font-medium">App Store</h4>
                <p className="text-sm text-muted-foreground">Premium gradient version</p>
              </div>
            </div>

            {/* Favicon */}
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <FaviconIcon size={48} />
              </div>
              <div>
                <h4 className="font-medium">Favicon</h4>
                <p className="text-sm text-muted-foreground">Optimized for small sizes</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Examples</CardTitle>
          <CardDescription>How to implement in your app</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Header Example */}
          <div className="space-y-3">
            <h4 className="font-semibold">App Header</h4>
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <CleanIcon size={40} />
                <div>
                  <h3 className="font-bold">MaycoleTracker™</h3>
                  <p className="text-sm text-muted-foreground">Inventory Management</p>
                </div>
              </div>
            </div>
            <code className="text-sm bg-muted p-2 rounded block">
              {`<CleanIcon size={40} />`}
            </code>
          </div>

          {/* Button Example */}
          <div className="space-y-3">
            <h4 className="font-semibold">Interactive Button</h4>
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <ButtonIcon size={40} interactive={true} className="cursor-pointer" />
                <span>Click me!</span>
              </div>
            </div>
            <code className="text-sm bg-muted p-2 rounded block">
              {`<ButtonIcon size={40} interactive={true} />`}
            </code>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Icon Features</CardTitle>
          <CardDescription>What makes this icon perfect for your app</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600">✅ Perfect Round Shape</h4>
              <p className="text-sm text-muted-foreground">Clean circular design with no rough edges</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600">✅ Prominent Inner Elements</h4>
              <p className="text-sm text-muted-foreground">Thicker cross lines and larger dots for better visibility</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600">✅ Professional Blue</h4>
              <p className="text-sm text-muted-foreground">Corporate blue color (#3b82f6) that conveys trust</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600">✅ Scalable Vector</h4>
              <p className="text-sm text-muted-foreground">Crisp at any size from 16px to 1024px</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600">✅ Apple Store Ready</h4>
              <p className="text-sm text-muted-foreground">Meets all iOS design guidelines</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600">✅ Clean & Minimal</h4>
              <p className="text-sm text-muted-foreground">Focused on essential logo elements only</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CleanIconDemo;