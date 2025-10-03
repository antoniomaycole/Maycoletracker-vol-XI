/**
 * MaycoleTracker™ vol. XI - Business Control Center
 * Main dashboard with everything at your fingertips for effective business management
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, Settings, Info, Building2, BarChart3, Camera, 
  Calculator, FileText, Users, DollarSign, Globe, 
  Zap, Shield, Crown, Star, TrendingUp, Home,
  PlayCircle, CheckCircle, AlertCircle, Clock,
  ArrowRight, Plus, Search, Menu, X
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import UniversalBackButton from './UniversalBackButton';
import MaycoleTrackerIconButton from './MaycoleTrackerIconButton';

export default function BusinessControlCenter() {
  const navigate = useNavigate();
  const [showQuickMenu, setShowQuickMenu] = useState(false);

  // Industry options for quick access
  const industries = [
    { id: 'healthcare', name: 'Healthcare', icon: '🏥', color: 'bg-red-500', route: '/setup/healthcare' },
    { id: 'restaurant', name: 'Restaurant', icon: '🍽️', color: 'bg-orange-500', route: '/setup/restaurant' },
    { id: 'construction', name: 'Construction', icon: '🏗️', color: 'bg-yellow-500', route: '/setup/construction' },
    { id: 'retail', name: 'Retail', icon: '🛍️', color: 'bg-green-500', route: '/setup/retail' },
    { id: 'manufacturing', name: 'Manufacturing', icon: '🏭', color: 'bg-blue-500', route: '/setup/manufacturing' },
    { id: 'hospitality', name: 'Hospitality', icon: '🏨', color: 'bg-purple-500', route: '/setup/hospitality' },
    { id: 'education', name: 'Education', icon: '🎓', color: 'bg-indigo-500', route: '/setup/education' },
    { id: 'automotive', name: 'Automotive', icon: '🚗', color: 'bg-gray-500', route: '/setup/automotive' },
    { id: 'realestate', name: 'Real Estate', icon: '🏘️', color: 'bg-pink-500', route: '/setup/realestate' }
  ];

  // Core business modules
  const coreModules = [
    {
      title: 'Inventory Management',
      description: 'Complete inventory control system',
      icon: Package,
      color: 'from-blue-600 to-blue-700',
      route: '/dashboard',
      badge: 'Primary',
      badgeColor: 'bg-blue-600'
    },
    {
      title: 'Business Analytics',
      description: 'Advanced business intelligence',
      icon: BarChart3,
      color: 'from-green-600 to-green-700',
      route: '/analytics',
      badge: 'Active',
      badgeColor: 'bg-green-600'
    },
    {
      title: 'Financial Management',
      description: 'Accounting & revenue tracking',
      icon: DollarSign,
      color: 'from-emerald-600 to-emerald-700',
      route: '/calculator',
      badge: 'Ready',
      badgeColor: 'bg-emerald-600'
    },
    {
      title: 'Camera Scanner',
      description: 'Barcode & document scanning',
      icon: Camera,
      color: 'from-purple-600 to-purple-700',
      route: '/camera',
      badge: 'Active',
      badgeColor: 'bg-purple-600'
    },
    {
      title: 'Business Reports',
      description: 'Comprehensive reporting system',
      icon: FileText,
      color: 'from-orange-600 to-orange-700',
      route: '/reports',
      badge: 'Ready',
      badgeColor: 'bg-orange-600'
    },
    {
      title: 'Customer Management',
      description: 'CRM & customer relations',
      icon: Users,
      color: 'from-indigo-600 to-indigo-700',
      route: '/training',
      badge: 'Ready',
      badgeColor: 'bg-indigo-600'
    }
  ];

  // System tools
  const systemTools = [
    {
      title: 'About MaycoleTracker™',
      description: 'Platform info & design leadership',
      icon: Info,
      route: '/about'
    },
    {
      title: 'System Settings',
      description: 'Configuration & preferences',
      icon: Settings,
      route: '/settings'
    },
    {
      title: 'Industry Setup',
      description: 'Configure for your industry',
      icon: Building2,
      route: '/industries'
    },
    {
      title: 'System Recovery',
      description: 'Health check & recovery tools',
      icon: Shield,
      route: '/recovery'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <UniversalBackButton customBackPath="/logo" showHomeOption={false} />
            
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <MaycoleTrackerIconButton 
                  size={32}
                  onClick={() => navigate('/logo')}
                  title="Return to MaycoleTracker™"
                />
                MaycoleTracker™ Business Control Center
              </h1>
              
              <Button
                onClick={() => setShowQuickMenu(!showQuickMenu)}
                className="lg:hidden"
                variant="outline"
                size="sm"
              >
                {showQuickMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Crown className="w-4 h-4" />
            WORLD'S FIRST UNIVERSAL BUSINESS MANAGEMENT PLATFORM
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything at Your Fingertips
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete business operations for 9+ industries with advanced inventory control, 
            analytics, and enterprise-grade management tools.
          </p>
        </div>

        {/* Quick Access - Always Visible */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Button 
            onClick={() => navigate('/about')}
            className="h-16 flex flex-col items-center gap-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            <Info className="w-5 h-5" />
            <span className="text-xs">About</span>
          </Button>
          
          <Button 
            onClick={() => navigate('/industries')}
            className="h-16 flex flex-col items-center gap-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
          >
            <Building2 className="w-5 h-5" />
            <span className="text-xs">Industries</span>
          </Button>
          
          <Button 
            onClick={() => navigate('/dashboard')}
            className="h-16 flex flex-col items-center gap-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
          >
            <Package className="w-5 h-5" />
            <span className="text-xs">Inventory</span>
          </Button>
          
          <Button 
            onClick={() => navigate('/premium')}
            className="h-16 flex flex-col items-center gap-1 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800"
          >
            <Crown className="w-5 h-5" />
            <span className="text-xs">Premium</span>
          </Button>
        </div>

        {/* Industry Quick Setup - Prominently Featured */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-blue-600" />
              Industry Configuration
            </h3>
            <Button 
              onClick={() => navigate('/industries')}
              variant="outline" 
              className="flex items-center gap-2"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
            {industries.map((industry) => (
              <Card 
                key={industry.id}
                className="p-4 hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => navigate(industry.route)}
              >
                <div className="text-center">
                  <div className={`w-12 h-12 ${industry.color} rounded-lg flex items-center justify-center text-white text-xl mb-2 mx-auto group-hover:scale-110 transition-transform`}>
                    {industry.icon}
                  </div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">{industry.name}</h4>
                  <Badge variant="outline" className="text-xs">Configure</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Core Business Modules */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            Core Business Modules
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreModules.map((module) => {
              const IconComponent = module.icon;
              return (
                <Card 
                  key={module.title}
                  className="p-6 hover:shadow-xl transition-all cursor-pointer group"
                  onClick={() => navigate(module.route)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${module.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{module.title}</h4>
                        <Badge className={`${module.badgeColor} text-white text-xs`}>
                          {module.badge}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{module.description}</p>
                      <div className="flex items-center text-blue-600 text-sm font-medium">
                        Launch <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* System Tools & Information */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Settings className="w-6 h-6 text-gray-600" />
            System Tools & Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemTools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Card 
                  key={tool.title}
                  className="p-6 hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => navigate(tool.route)}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors">
                      <IconComponent className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{tool.title}</h4>
                    <p className="text-sm text-gray-600">{tool.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* System Status */}
        <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">System Status: Operational</h4>
                <p className="text-sm text-gray-600">All 17+ business modules active • 9 industries supported • 99.9% uptime</p>
              </div>
            </div>
            <Badge className="bg-green-600 text-white">
              <Star className="w-3 h-3 mr-1" />
              Enterprise Ready
            </Badge>
          </div>
        </Card>

        {/* MaycoleTechnologies™ Subtle Attribution */}
        <div className="border-t border-gray-100 pt-6">
          <div className="flex items-center justify-center gap-3 text-gray-500">
            <Globe className="w-4 h-4" />
            <span className="text-sm">
              Powered by <strong className="text-blue-600">MaycoleTechnologies™</strong> • 
              Innovating in Robotics, Music & Film • 
              <span className="text-xs">maycoletechnologies.com</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}