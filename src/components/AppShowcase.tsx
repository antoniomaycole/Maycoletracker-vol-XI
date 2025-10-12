import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AppIcon } from './AppIcon';
import { ShareApp } from './ShareApp';
import { AppLauncher } from './AppLauncher';
import { MaycoleTrackerLogo } from './MaycoleTrackerLogo';
import { 
  Share, 
  Download, 
  Star, 
  Play, 
  Users, 
  TrendingUp, 
  Award,
  Smartphone,
  Monitor,
  Globe,
  Zap,
  Shield,
  Building
} from 'lucide-react';

interface AppShowcaseProps {
  onLaunchApp: () => void;
}

export function AppShowcase({ onLaunchApp }: AppShowcaseProps) {
  const [showShareDialog, setShowShareDialog] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        
        {/* Enhanced App Launcher */}
        <AppLauncher onLaunchApp={onLaunchApp} className="mb-12" />
          
        <div className="text-center space-y-6 mb-12">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              <MaycoleTrackerLogo size="hero" />
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Enterprise Inventory Management System
            </p>
            <p className="text-sm text-muted-foreground">
              by <span className="font-semibold">MaycoleTechnologies™</span>
            </p>
          </div>

          {/* Key Stats */}
          <div className="flex justify-center gap-8 flex-wrap">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">10,000+</div>
              <div className="text-xs text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">4.9⭐</div>
              <div className="text-xs text-muted-foreground">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">50+</div>
              <div className="text-xs text-muted-foreground">Industries</div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={onLaunchApp}
              size="lg"
              className="w-full sm:w-auto h-14 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" />
              Launch App
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowShareDialog(true)}
              className="w-full sm:w-auto h-14 px-8 border-2 hover:bg-accent/50 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Share className="w-5 h-5 mr-2" />
              Share App
            </Button>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">AI-Powered</h3>
              <p className="text-sm text-muted-foreground">
                Predictive analytics and smart recommendations powered by artificial intelligence
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Multi-Industry</h3>
              <p className="text-sm text-muted-foreground">
                Adapts to restaurants, construction, medical, retail, hotels, and more
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Enterprise-Grade</h3>
              <p className="text-sm text-muted-foreground">
                Professional security, performance optimization, and reliability
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Technology Stack */}
        <Card className="mb-12 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border shadow-xl">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center mb-8">Built with Modern Technology</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-lg">R</span>
                </div>
                <div className="font-semibold">React 18</div>
                <div className="text-xs text-muted-foreground">Modern UI Framework</div>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-lg">TS</span>
                </div>
                <div className="font-semibold">TypeScript</div>
                <div className="text-xs text-muted-foreground">Type Safety</div>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-cyan-500 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-lg">TW</span>
                </div>
                <div className="font-semibold">Tailwind v4</div>
                <div className="text-xs text-muted-foreground">Modern CSS</div>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center mx-auto">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <div className="font-semibold">PWA</div>
                <div className="text-xs text-muted-foreground">Progressive Web App</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Industry Adaptations */}
        <Card className="mb-12 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-200">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center mb-8">Works for Every Industry</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Restaurants", icon: "🍕", desc: "Food inventory & expiration tracking" },
                { name: "Construction", icon: "🏗️", desc: "Tool & material management" },
                { name: "Medical", icon: "🏥", desc: "Supply & compliance tracking" },
                { name: "Retail", icon: "🛍️", desc: "Product & sales management" },
                { name: "Hotels", icon: "🏨", desc: "Amenity & supply tracking" },
                { name: "Manufacturing", icon: "🔧", desc: "Raw material management" },
                { name: "Electronics", icon: "⚡", desc: "Component tracking" },
                { name: "Custom", icon: "🎯", desc: "Any business type" }
              ].map((industry, index) => (
                <div key={index} className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="text-3xl mb-2">{industry.icon}</div>
                  <div className="font-semibold text-sm">{industry.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{industry.desc}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center space-y-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 shadow-2xl">
          <h3 className="text-3xl font-bold">Ready to Transform Your Business?</h3>
          <p className="text-lg opacity-90">
            Join thousands of businesses using MaycoleTracker for intelligent inventory management
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onLaunchApp}
              size="lg"
              variant="secondary"
              className="h-12 px-8 bg-white text-blue-600 hover:bg-gray-100 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" />
              Open App
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open('https://github.com/your-username/maycoletracker', '_blank')}
              className="h-12 px-8 border-2 border-white text-white hover:bg-white/10 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Share className="w-5 h-5 mr-2" />
              View Source
            </Button>
          </div>
          
          {/* Open Source Information */}
          <div className="mt-6 pt-4 border-t border-white/20 space-y-2 opacity-90">
            <div className="text-sm font-medium">Open Source Project</div>
            <div className="text-xs opacity-75">
              Built with React 18 • TypeScript • Tailwind v4 • Progressive Web App
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 space-y-4">
          <div className="flex justify-center items-center gap-2 text-muted-foreground">
            <Award className="w-4 h-4" />
            <span className="text-sm">Enterprise-grade software by MaycoleTechnologies™</span>
          </div>
          <div className="flex justify-center gap-6 text-xs text-muted-foreground">
            <span>🔒 Secure</span>
            <span>📱 Mobile-First</span>
            <span>🌐 Progressive Web App</span>
            <span>🤖 AI-Powered</span>
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