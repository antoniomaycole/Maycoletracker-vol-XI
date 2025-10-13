/**
 * MaycoleTracker™ vol. XI - Enterprise Edition
 * PROMOTIONS & EXTENSIONS CENTER - Universal Business Platform Subscriptions
 * Premium Upgrade Offers, Extensions, and Marketing Hub
 */

import React, { useState } from 'react';
import { Zap, Gift, TrendingUp, Users, Building2, Sparkles, CheckCircle, ArrowRight, Megaphone, Trophy, Rocket, Heart, Shield, Diamond } from 'lucide-react';
import { Crown, Star } from '@/lib/icons';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  interval: 'monthly' | 'yearly';
  popular?: boolean;
  features: string[];
  businessFocus: number;
  inventorySupport: number;
  maxUsers: number | 'unlimited';
  maxIndustries: number | 'all';
  support: string;
  color: string;
}

interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  validUntil: string;
  type: 'upgrade' | 'feature' | 'addon' | 'limited';
  badge?: string;
  originalPrice: number;
  salePrice: number;
}

interface Extension {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  downloads: number;
  popular?: boolean;
}

// MaycoleTracker™ Subscription Tiers
const subscriptionTiers: SubscriptionTier[] = [
  {
    id: 'free',
    name: 'Free Starter',
    price: 0,
    interval: 'monthly',
    features: [
      'Basic inventory tracking (15% support)',
      'Single industry focus',
      'Up to 2 users',
      'Basic reporting',
      'Email support',
      'Web access only'
    ],
    businessFocus: 60,
    inventorySupport: 40,
    maxUsers: 2,
    maxIndustries: 1,
    support: 'Email',
    color: 'gray'
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 89,
    originalPrice: 129,
    interval: 'monthly',
    popular: true,
    features: [
      'Universal business operations (85% focus)',
      'Advanced inventory support (15%)',
      'Up to 3 industries',
      'Voice command system',
      'Camera/scanner integration',
      'Up to 25 users',
      'Advanced analytics',
      'Priority support',
      'Mobile + Web access',
      'Custom workflows'
    ],
    businessFocus: 85,
    inventorySupport: 15,
    maxUsers: 25,
    maxIndustries: 3,
    support: 'Priority',
    color: 'blue'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    originalPrice: 299,
    interval: 'monthly',
    features: [
      'Complete universal platform (85% business)',
      'Full inventory support (15%)',
      'All 9+ industries supported',
      'Advanced voice & AI agents',
      'Premium scanner technology',
      'Unlimited users',
      'Real-time collaboration',
      'Custom integrations',
      'White-label options',
      '24/7 dedicated support',
      'Advanced security',
      'Multi-location support'
    ],
    businessFocus: 85,
    inventorySupport: 15,
    maxUsers: 'unlimited',
    maxIndustries: 'all',
    support: '24/7 Dedicated',
    color: 'purple'
  }
];

// Special Promotions
const currentPromotions: Promotion[] = [
  {
    id: '1',
    title: 'New Year Enterprise Upgrade',
    description: 'Upgrade to Enterprise and save 33% for the first 6 months',
    discount: 33,
    validUntil: '2024-02-29',
    type: 'upgrade',
    badge: 'LIMITED TIME',
    originalPrice: 299,
    salePrice: 199
  },
  {
    id: '2',
    title: 'Professional Plan Flash Sale',
    description: 'Get Professional features at 31% off regular price',
    discount: 31,
    validUntil: '2024-02-15',
    type: 'upgrade',
    badge: 'FLASH SALE',
    originalPrice: 129,
    salePrice: 89
  },
  {
    id: '3',
    title: 'Voice & AI Add-on Special',
    description: 'Advanced voice command system - 50% off for new subscribers',
    discount: 50,
    validUntil: '2024-03-31',
    type: 'addon',
    badge: 'NEW FEATURE',
    originalPrice: 49,
    salePrice: 24
  }
];

// Platform Extensions
const platformExtensions: Extension[] = [
  {
    id: '1',
    name: 'Advanced Healthcare Module',
    description: 'Specialized tools for healthcare inventory, patient management, and compliance',
    price: 79,
    category: 'Industry Specific',
    rating: 4.9,
    downloads: 1247,
    popular: true
  },
  {
    id: '2',
    name: 'Restaurant Management Suite',
    description: 'Complete restaurant operations including POS, kitchen management, and staff scheduling',
    price: 69,
    category: 'Industry Specific',
    rating: 4.8,
    downloads: 2156
  },
  {
    id: '3',
    name: 'Construction Project Tracker',
    description: 'Project management, equipment tracking, and workforce coordination for construction',
    price: 89,
    category: 'Industry Specific',
    rating: 4.7,
    downloads: 892
  },
  {
    id: '4',
    name: 'Multi-Location Sync Pro',
    description: 'Real-time synchronization across unlimited business locations',
    price: 59,
    category: 'Enterprise Tools',
    rating: 4.9,
    downloads: 1689,
    popular: true
  }
];

const AdvertisementPage = () => {
  const [tiers] = useState<SubscriptionTier[]>(subscriptionTiers);
  const [promotions] = useState<Promotion[]>(currentPromotions);
  const [extensions] = useState<Extension[]>(platformExtensions);
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'promotions' | 'extensions' | 'marketplace'>('subscriptions');

  const getPromotionBadgeColor = (type: string) => {
    switch (type) {
      case 'upgrade': return 'bg-green-100 text-green-800';
      case 'feature': return 'bg-blue-100 text-blue-800';
      case 'addon': return 'bg-purple-100 text-purple-800';
      case 'limited': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierColor = (color: string) => {
    switch (color) {
      case 'gray': return 'border-gray-200 bg-gray-50';
      case 'blue': return 'border-blue-200 bg-blue-50 ring-2 ring-blue-500';
      case 'purple': return 'border-purple-200 bg-purple-50';
      default: return 'border-gray-200 bg-white';
    }
  };

  const getTierButtonColor = (color: string) => {
    switch (color) {
      case 'gray': return 'bg-gray-600 hover:bg-gray-700';
      case 'blue': return 'bg-blue-600 hover:bg-blue-700';
      case 'purple': return 'bg-purple-600 hover:bg-purple-700';
      default: return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  const formatDaysRemaining = (validUntil: string) => {
    const today = new Date();
    const endDate = new Date(validUntil);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} days left` : 'Expired';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Enterprise Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white p-6 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-96 h-96 rounded-full bg-white -top-48 -right-48"></div>
          <div className="absolute w-64 h-64 rounded-full bg-white -bottom-32 -left-32"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold flex items-center gap-3">
                <Gift className="w-10 h-10" />
                MaycoleTracker<span className="tm-standard">TM</span> Promotions & Extensions
              </h1>
              <p className="text-indigo-100 mt-2 text-lg">
                Upgrade Your Universal Business Management Platform
              </p>
              <div className="flex items-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>Premium Subscriptions Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-yellow-400" />
                  <span>Professional $89 | Enterprise $199</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span>Limited Time Offers</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold flex items-center gap-2">
                <Diamond className="w-4 h-4" />
                Upgrade Now
              </Button>
              <Button className="bg-white text-indigo-600 hover:bg-indigo-50 flex items-center gap-2">
                <Gift className="w-4 h-4" />
                View Offers
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Special Promotions Banner */}
        <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-lg p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-red-500/20 animate-pulse"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  Limited Time: New Year Enterprise Sale!
                </h2>
                <p className="text-lg">Save up to 33% on Professional and Enterprise plans. Upgrade to the world's first universal business platform.</p>
                <p className="text-sm mt-2 opacity-90">Offer expires February 29th, 2024</p>
              </div>
              <div className="text-right">
                <Button className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-8 py-3">
                  Claim Offer
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Card className="p-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'subscriptions'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Crown className="w-4 h-4" />
              Subscription Plans
            </button>
            <button
              onClick={() => setActiveTab('promotions')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'promotions'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Gift className="w-4 h-4" />
              Special Offers
            </button>
            <button
              onClick={() => setActiveTab('extensions')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'extensions'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Zap className="w-4 h-4" />
              Platform Extensions
            </button>
            <button
              onClick={() => setActiveTab('marketplace')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'marketplace'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Industry Marketplace
            </button>
          </div>
        </Card>

        {/* Subscription Plans Tab */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your MaycoleTracker<span className="tm-standard">TM</span> Plan</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Transform your business with the world's first universal business management platform. 
                <strong className="text-indigo-600"> 85% Business Operations Focus</strong> | 
                <strong className="text-gray-500"> 15% Inventory Support</strong>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tiers.map((tier) => (
                <Card key={tier.id} className={`p-8 relative ${getTierColor(tier.color)} transition-all hover:shadow-lg`}>
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-bold text-gray-900">${tier.price}</span>
                      <span className="text-gray-600">/{tier.interval}</span>
                      {tier.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">${tier.originalPrice}</span>
                      )}
                    </div>
                    {tier.originalPrice && (
                      <p className="text-sm text-green-600 font-medium mt-1">
                        Save ${tier.originalPrice - tier.price}/month
                      </p>
                    )}
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center p-3 bg-white/50 rounded-lg border">
                        <div className="font-bold text-indigo-600">{tier.businessFocus}%</div>
                        <div className="text-gray-600">Business Ops</div>
                      </div>
                      <div className="text-center p-3 bg-white/50 rounded-lg border">
                        <div className="font-bold text-gray-600">{tier.inventorySupport}%</div>
                        <div className="text-gray-600">Inventory</div>
                      </div>
                    </div>
                    
                    <ul className="space-y-3">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className={`w-full py-3 ${getTierButtonColor(tier.color)} text-white`}>
                    {tier.price === 0 ? 'Get Started Free' : 'Upgrade Now'}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Special Offers Tab */}
        {activeTab === 'promotions' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Exclusive Limited-Time Offers</h2>
              <p className="text-lg text-gray-600">Don't miss these special deals on premium features and upgrades</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {promotions.map((promo) => (
                <Card key={promo.id} className="p-6 border-2 border-dashed border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <Badge className={`${getPromotionBadgeColor(promo.type)} font-bold`}>
                      {promo.badge}
                    </Badge>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">-{promo.discount}%</div>
                      <div className="text-sm text-gray-600">{formatDaysRemaining(promo.validUntil)}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{promo.title}</h3>
                  <p className="text-gray-600 mb-4">{promo.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-lg line-through text-gray-500">${promo.originalPrice}</span>
                      <span className="text-2xl font-bold text-green-600 ml-2">${promo.salePrice}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                    Claim This Offer
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Extensions Tab */}
        {activeTab === 'extensions' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Extensions & Add-ons</h2>
              <p className="text-lg text-gray-600">Extend your MaycoleTracker<span className="tm-standard">TM</span> with specialized industry modules and advanced features</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {extensions.map((extension) => (
                <Card key={extension.id} className="p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-gray-900">{extension.name}</h3>
                      {extension.popular && (
                        <Badge className="bg-green-100 text-green-800">Popular</Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">${extension.price}</div>
                      <div className="text-sm text-gray-600">one-time</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{extension.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {extension.rating}/5.0
                    </span>
                    <span>{extension.downloads.toLocaleString()} installs</span>
                    <Badge variant="outline">{extension.category}</Badge>
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    Install Extension
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Industry Marketplace Tab */}
        {activeTab === 'marketplace' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Industry-Specific Solutions</h2>
              <p className="text-lg text-gray-600">Discover specialized tools and templates for your industry</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 text-center hover:shadow-lg transition-all border-2 border-blue-200">
                <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Healthcare Suite</h3>
                <p className="text-gray-600 mb-4">Complete healthcare management with patient records, compliance, and inventory</p>
                <Button className="w-full">Explore Healthcare</Button>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-all border-2 border-green-200">
                <Megaphone className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Restaurant Management</h3>
                <p className="text-gray-600 mb-4">POS systems, kitchen management, staff scheduling, and inventory tracking</p>
                <Button className="w-full">Explore Restaurant</Button>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-all border-2 border-yellow-200">
                <Building2 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Construction Projects</h3>
                <p className="text-gray-600 mb-4">Project management, equipment tracking, workforce coordination</p>
                <Button className="w-full">Explore Construction</Button>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-all border-2 border-purple-200">
                <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Retail Operations</h3>
                <p className="text-gray-600 mb-4">Multi-location retail management, customer tracking, sales analytics</p>
                <Button className="w-full">Explore Retail</Button>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-all border-2 border-indigo-200">
                <Rocket className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Manufacturing</h3>
                <p className="text-gray-600 mb-4">Production planning, quality control, supply chain management</p>
                <Button className="w-full">Explore Manufacturing</Button>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-all border-2 border-pink-200">
                <Trophy className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Hospitality</h3>
                <p className="text-gray-600 mb-4">Hotel management, guest services, reservation systems, housekeeping</p>
                <Button className="w-full">Explore Hospitality</Button>
              </Card>
            </div>
          </div>
        )}

        {/* Call to Action Footer */}
        <Card className="p-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of businesses using MaycoleTracker<span className="tm-standard">TM</span> vol. XI Enterprise Edition
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3">
              Start Free Trial
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-3">
              Schedule Demo
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdvertisementPage;