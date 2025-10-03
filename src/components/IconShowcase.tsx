/**
 * MaycoleTracker™ Icon Showcase Component
 * Demonstrates all icon variants and sizes for Apple Store deployment
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Download, Copy, Check, Smartphone, Monitor, Settings } from 'lucide-react';
import MaycoleTrackerIcon, { 
  AppStoreIcon, 
  FaviconIcon, 
  ButtonIcon,
  CleanIcon,
  generateAppStoreIcons 
} from './MaycoleTrackerIcon';

export function IconShowcase() {
  const [copiedSizes, setCopiedSizes] = useState<Set<string>>(new Set());

  const handleCopyCode = (code: string, identifier: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSizes(new Set([...copiedSizes, identifier]));
    setTimeout(() => {
      setCopiedSizes(prev => {
        const newSet = new Set(prev);
        newSet.delete(identifier);
        return newSet;
      });
    }, 2000);
  };

  const appStoreIcons = generateAppStoreIcons();

  const usageExamples = [
    {
      title: "App Header",
      code: `<CleanIcon size={40} interactive={false} />`,
      description: "Clean round icon for navigation headers"
    },
    {
      title: "Loading Screen", 
      code: `<AppStoreIcon size={120} />`,
      description: "Large icon with iOS-style gradients"
    },
    {
      title: "Favicon",
      code: `<FaviconIcon size={32} />`, 
      description: "Clean icon for browser tabs"
    },
    {
      title: "Button Icon",
      code: `<ButtonIcon size={40} interactive={true} />`,
      description: "Interactive round button for UI elements"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <AppStoreIcon size={120} />
        </div>
        <h1 className="text-3xl font-bold">MaycoleTracker™ App Icon</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Professional SVG icon designed for Apple Store deployment. 
          Clean blue circle with white cross and corner dots, representing inventory tracking and data management.
        </p>
        <div className="flex justify-center gap-2 flex-wrap">
          <Badge variant="outline">Apple Store Ready</Badge>
          <Badge variant="outline">iOS Guidelines</Badge>
          <Badge variant="outline">SVG Vector</Badge>
          <Badge variant="outline">Multi-Size</Badge>
        </div>
      </div>

      <Tabs defaultValue="variants" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="variants">Icon Variants</TabsTrigger>
          <TabsTrigger value="sizes">Apple Store Sizes</TabsTrigger>
          <TabsTrigger value="usage">Usage Examples</TabsTrigger>
          <TabsTrigger value="export">Export Guide</TabsTrigger>
        </TabsList>

        {/* Icon Variants */}
        <TabsContent value="variants" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Clean Variant */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5" />
                  Clean Round Icon
                </CardTitle>
                <CardDescription>
                  Perfect round icon with clean design and prominent inner elements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center py-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <CleanIcon size={100} />
                </div>
                <div className="space-y-2">
                  <code className="text-sm bg-muted p-2 rounded block">
                    {`<CleanIcon size={100} />`}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopyCode(
                      `<CleanIcon size={100} />`,
                      'clean'
                    )}
                    className="w-full"
                  >
                    {copiedSizes.has('clean') ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copiedSizes.has('clean') ? 'Copied!' : 'Copy Code'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* App Store Variant */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  App Store Variant
                </CardTitle>
                <CardDescription>
                  iOS-style gradients, inner shadows, and highlight effects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center py-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <AppStoreIcon size={100} />
                </div>
                <div className="space-y-2">
                  <code className="text-sm bg-muted p-2 rounded block">
                    {`<AppStoreIcon size={100} />`}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopyCode(
                      `<AppStoreIcon size={100} />`,
                      'app-store'
                    )}
                    className="w-full"
                  >
                    {copiedSizes.has('app-store') ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copiedSizes.has('app-store') ? 'Copied!' : 'Copy Code'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Favicon Variant */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Favicon Variant
                </CardTitle>
                <CardDescription>
                  Optimized for small sizes, browser tabs, and web use
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center py-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <FaviconIcon size={64} />
                </div>
                <div className="space-y-2">
                  <code className="text-sm bg-muted p-2 rounded block">
                    {`<FaviconIcon size={32} />`}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopyCode(
                      `<FaviconIcon size={32} />`,
                      'favicon'
                    )}
                    className="w-full"
                  >
                    {copiedSizes.has('favicon') ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copiedSizes.has('favicon') ? 'Copied!' : 'Copy Code'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Button Variant */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Interactive Button
                </CardTitle>
                <CardDescription>
                  Interactive version with hover effects for UI elements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center py-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <ButtonIcon size={60} interactive={true} />
                </div>
                <div className="space-y-2">
                  <code className="text-sm bg-muted p-2 rounded block">
                    {`<ButtonIcon size={40} interactive={true} />`}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopyCode(
                      `<ButtonIcon size={40} interactive={true} />`,
                      'button'
                    )}
                    className="w-full"
                  >
                    {copiedSizes.has('button') ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copiedSizes.has('button') ? 'Copied!' : 'Copy Code'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Apple Store Sizes */}
        <TabsContent value="sizes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Required Apple Store Icon Sizes</CardTitle>
              <CardDescription>
                All sizes automatically generated from your SVG component
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {appStoreIcons.map(({ name, size }) => (
                  <div
                    key={name}
                    className="flex flex-col items-center p-4 border rounded-lg space-y-2"
                  >
                    <AppStoreIcon size={size > 60 ? 60 : size} />
                    <div className="text-center">
                      <p className="font-medium text-sm">{name}</p>
                      <p className="text-xs text-muted-foreground">{size}×{size}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Usage Examples */}
        <TabsContent value="usage" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {usageExamples.map((example, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{example.title}</CardTitle>
                  <CardDescription>{example.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-center py-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      {example.title === "App Header" && <CleanIcon size={40} />}
                    {example.title === "Loading Screen" && <AppStoreIcon size={80} />}
                    {example.title === "Favicon" && <FaviconIcon size={32} />}
                    {example.title === "Button Icon" && <ButtonIcon size={40} interactive={true} />}
                  </div>
                  <div className="space-y-2">
                    <code className="text-sm bg-muted p-2 rounded block">
                      {example.code}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopyCode(example.code, example.title)}
                      className="w-full"
                    >
                      {copiedSizes.has(example.title) ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copiedSizes.has(example.title) ? 'Copied!' : 'Copy Code'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Export Guide */}
        <TabsContent value="export" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export for Apple Store Submission
              </CardTitle>
              <CardDescription>
                Steps to generate PNG files for App Store deployment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Required Files for Submission:</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <ul className="space-y-1 text-sm font-mono">
                    <li>• AppIcon-1024.png (1024×1024) - <strong>Required for App Store</strong></li>
                    <li>• AppIcon-180.png (180×180) - iPhone App Icon</li>
                    <li>• AppIcon-152.png (152×152) - iPad App Icon</li>
                    <li>• AppIcon-120.png (120×120) - iPhone (older versions)</li>
                    <li>• AppIcon-87.png (87×87) - iPhone Settings</li>
                    <li>• AppIcon-80.png (80×80) - iPhone Spotlight</li>
                    <li>• AppIcon-76.png (76×76) - iPad Standard</li>
                    <li>• AppIcon-58.png (58×58) - iPhone Settings (2x)</li>
                    <li>• AppIcon-40.png (40×40) - Spotlight (2x)</li>
                    <li>• AppIcon-29.png (29×29) - iPad Settings</li>
                    <li>• AppIcon-20.png (20×20) - Notification Base</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Generation Steps:</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1">1</Badge>
                    <div>
                      <p className="font-medium">Use Browser Export</p>
                      <p className="text-sm text-muted-foreground">Right-click each icon size above and "Save as PNG"</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1">2</Badge>
                    <div>
                      <p className="font-medium">Use Development Tools</p>
                      <p className="text-sm text-muted-foreground">Inspect element and export SVG, then convert to PNG</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1">3</Badge>
                    <div>
                      <p className="font-medium">Automated Script</p>
                      <p className="text-sm text-muted-foreground">Run the generateAppStoreIcons() function to create all sizes</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Validation Checklist:</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">1024×1024 PNG file under 1MB</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">No transparency (solid background)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Square aspect ratio maintained</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">High contrast and visibility</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Tested at smallest size (20×20)</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default IconShowcase;