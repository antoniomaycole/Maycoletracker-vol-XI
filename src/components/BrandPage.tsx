import React from 'react';
import { Globe, Zap, Shield, Rocket } from 'lucide-react';
import { Crown, Star, Target, Award } from '@/lib/icons';
import AppHeader from './AppHeader';
import { MaycoleTrackerBrand } from './MaycoleTrackerBrand';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export default function BrandPage() {
  const brandFeatures = [
    {
      icon: Crown,
      title: 'World\'s First',
      description: 'Revolutionary universal business management platform',
      color: 'from-yellow-600 to-yellow-700'
    },
    {
      icon: Globe,
      title: '9+ Industries',
      description: 'Healthcare, retail, manufacturing, hospitality and more',
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: Zap,
      title: 'AI-Powered',
      description: 'Advanced artificial intelligence and automation',
      color: 'from-purple-600 to-purple-700'
    },
    {
      icon: Shield,
      title: 'Enterprise Grade',
      description: 'Secure, scalable, and reliable business solutions',
      color: 'from-green-600 to-green-700'
    },
    {
      icon: Target,
      title: '17+ Modules',
      description: 'Complete business operations coverage',
      color: 'from-red-600 to-red-700'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Professional-grade tools and interfaces',
      color: 'from-indigo-600 to-indigo-700'
    }
  ];

  const subscriptionTiers = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for getting started',
      features: ['Basic dashboard', 'Limited storage', 'Community support'],
      color: 'border-gray-200'
    },
    {
      name: 'Professional',
      price: '$89',
      description: 'For growing businesses',
      features: ['Advanced analytics', 'Unlimited storage', 'Priority support', 'AI features'],
      color: 'border-blue-500',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$199',
      description: 'For large organizations',
      features: ['Custom integrations', 'White labeling', '24/7 support', 'Advanced security'],
      color: 'border-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <AppHeader fontSize={20} />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <div className="mb-8">
            <MaycoleTrackerBrand 
              variant="light" 
              fontSize={32}
              showSubtitle={true}
              showAppStoreButton={true}
              className="justify-center"
            />
          </div>
          
          <div className="mb-6">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-4 py-2 text-sm">
              <Star className="w-4 h-4 mr-2" />
              WORLD'S FIRST UNIVERSAL BUSINESS PLATFORM
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Revolutionary Business Transformation
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            The industry's first AI-powered universal business ecosystem spanning finance, operations, 
            customers, projects, and strategic growth across 9+ industries.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Brand Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why MaycoleTracker™ is Different
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brandFeatures.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <Card key={feature.title} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Select the perfect plan for your business needs. All plans include our core features 
            with different levels of access and support.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {subscriptionTiers.map((tier) => (
              <Card key={tier.name} className={`relative p-6 border-2 ${tier.color}`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-3 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {tier.name}
                  </h3>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {tier.price}
                    <span className="text-lg font-normal text-gray-600">/month</span>
                  </div>
                  <p className="text-gray-600">
                    {tier.description}
                  </p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-green-600"></div>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  tier.popular 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'border-2 border-gray-300 text-gray-700 hover:border-gray-400'
                }`}>
                  Get Started
                </button>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <Card className="p-8 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="text-center">
            <Rocket className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Powered by Cutting-Edge Technology
            </h2>
            <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
              Built with modern technologies including React, TypeScript, AI/ML algorithms, 
              and cloud-native architecture for maximum performance and reliability.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">&lt; 100ms</div>
                <div className="text-sm text-gray-600">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">256-bit</div>
                <div className="text-sm text-gray-600">Encryption</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">ISO 27001</div>
                <div className="text-sm text-gray-600">Certified</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}