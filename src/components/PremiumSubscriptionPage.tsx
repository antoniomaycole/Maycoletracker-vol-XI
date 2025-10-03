/**
 * MaycoleTracker™ vol. XI - Premium Subscription Plans
 * Professional & Enterprise Editions with 14-Day Free Trial
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Crown, Star, Shield, Check, Zap, Globe, Building2, 
  Users, BarChart3, Camera, Calculator, FileText,
  Mic, Smartphone, Cloud, Lock, ArrowRight, Gift,
  Package, Heart, Factory, GraduationCap, Car, Hotel
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import UniversalBackButton from './UniversalBackButton';
import MaycoleTrackerIconButton from './MaycoleTrackerIconButton';

export default function PremiumSubscriptionPage() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [trialDaysRemaining, setTrialDaysRemaining] = useState(14);
  const [showSuccess, setShowSuccess] = useState(false);

  // Premium subscription plans
  const plans = [
    {
      id: 'free',
      name: 'Free Edition',
      price: '$0',
      period: 'Forever',
      description: 'Perfect for small businesses getting started',
      popular: false,
      features: [
        'Basic Inventory Management',
        'Up to 100 items',
        'Simple Analytics',
        'Camera Scanner',
        'Mobile App Access',
        'Email Support'
      ],
      limitations: [
        'Limited to 1 industry',
        'Basic reporting only',
        'No voice commands',
        'No advanced AI features'
      ],
      buttonText: 'Current Plan',
      buttonClass: 'bg-gray-500',
      industries: 1,
      users: 1,
      storage: '1GB'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$89',
      period: 'per month',
      description: 'Complete business management for growing companies',
      popular: true,
      features: [
        'All 9 Industry Templates',
        'Unlimited Items & Users',
        'Advanced Analytics Dashboard',
        'Voice Command System',
        'AI-Powered Insights',
        'Multi-Location Support',
        'Camera & Barcode Scanner',
        'Financial Management',
        'Customer Relationship Management',
        'Automated Reporting',
        'Priority Support',
        'Mobile & Desktop Apps'
      ],
      limitations: [],
      buttonText: 'Start 14-Day Free Trial',
      buttonClass: 'bg-gradient-to-r from-blue-600 to-blue-700',
      industries: 9,
      users: 25,
      storage: '100GB'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$199',
      period: 'per month',
      description: 'Enterprise-grade solution for large organizations',
      popular: false,
      features: [
        'Everything in Professional',
        'Unlimited Everything',
        'Custom Industry Configuration',
        'Advanced AI & Machine Learning',
        'Enterprise Security & Compliance',
        'Custom Integrations & API',
        'Dedicated Account Manager',
        'White-Label Options',
        'On-Premise Deployment',
        'Advanced Workflow Automation',
        '24/7 Premium Support',
        'Training & Onboarding'
      ],
      limitations: [],
      buttonText: 'Start 14-Day Free Trial',
      buttonClass: 'bg-gradient-to-r from-red-600 to-red-700',
      industries: 'Unlimited',
      users: 'Unlimited',
      storage: '1TB+'
    }
  ];

  // All business agents/modules included
  const businessAgents = [
    { name: 'Inventory Management', icon: Package, description: 'Complete inventory control system' },
    { name: 'Business Analytics', icon: BarChart3, description: 'Advanced intelligence dashboard' },
    { name: 'Financial Calculator', icon: Calculator, description: 'Revenue tracking & calculations' },
    { name: 'Camera Scanner', icon: Camera, description: 'Barcode & document scanning' },
    { name: 'Voice Commands', icon: Mic, description: 'Hands-free operation' },
    { name: 'Business Reports', icon: FileText, description: 'Comprehensive reporting system' },
    { name: 'Customer Management', icon: Users, description: 'CRM & customer relations' },
    { name: 'Recovery System', icon: Shield, description: 'Health check & recovery tools' },
    { name: 'Training Mode', icon: GraduationCap, description: 'Interactive learning system' },
    { name: 'Industry Setup', icon: Building2, description: 'Multi-industry configuration' }
  ];

  // Industries supported
  const industries = [
    { name: 'Healthcare', icon: '🏥' },
    { name: 'Restaurant', icon: '🍽️' },
    { name: 'Construction', icon: '🏗️' },
    { name: 'Retail', icon: '🛍️' },
    { name: 'Manufacturing', icon: '🏭' },
    { name: 'Hospitality', icon: '🏨' },
    { name: 'Education', icon: '🎓' },
    { name: 'Automotive', icon: '🚗' },
    { name: 'Real Estate', icon: '🏘️' }
  ];

  const handlePlanSelection = (planId: string) => {
    setSelectedPlan(planId);
    
    if (planId === 'free') {
      // Already on free plan
      return;
    }
    
    // Start trial
    setShowSuccess(true);
    
    // Voice feedback
    if ('speechSynthesis' in window) {
      const plan = plans.find(p => p.id === planId);
      const utterance = new SpeechSynthesisUtterance(
        `Starting 14-day free trial for MaycoleTracker ${plan?.name} edition`
      );
      utterance.volume = 0.3;
      window.speechSynthesis.speak(utterance);
    }

    // Simulate trial activation
    setTimeout(() => {
      setShowSuccess(false);
      // Navigate to dashboard with trial active
      navigate('/home');
    }, 3000);
  };

  // Trial countdown effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTrialDaysRemaining(prev => Math.max(0, prev - 1));
    }, 86400000); // 24 hours

    return () => clearInterval(interval);
  }, []);

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
        <div className="text-center text-white max-w-lg mx-auto px-4">
          <div className="w-20 h-20 mx-auto mb-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Trial Activated!</h2>
          <p className="text-xl mb-6">
            Your 14-day free trial has been activated. 
            All premium features are now available.
          </p>
          <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full">
            <Gift className="w-5 h-5" />
            <span className="font-semibold">14 Days Free • No Credit Card Required</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <UniversalBackButton customBackPath="/home" showHomeOption={true} />
            
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                <MaycoleTrackerIconButton 
                  size={24}
                  onClick={() => navigate('/logo')}
                  title="Return to MaycoleTracker™"
                />
                Premium Subscription Plans
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Star className="w-4 h-4" />
            UNLOCK THE WORLD'S FIRST UNIVERSAL BUSINESS PLATFORM
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Business Power Level
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            From small businesses to enterprise corporations - MaycoleTracker™ scales with your success. 
            Start your 14-day free trial today, no credit card required.
          </p>

          {/* Trial Banner */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 to-green-200 border border-green-300 px-6 py-3 rounded-xl mb-8">
            <Gift className="w-6 h-6 text-green-700" />
            <div className="text-left">
              <div className="font-bold text-green-800">14-Day Free Trial</div>
              <div className="text-sm text-green-700">No credit card • Full access • Cancel anytime</div>
            </div>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative p-8 hover:shadow-xl transition-all cursor-pointer ${
                plan.popular ? 'ring-2 ring-blue-600 scale-105' : 'hover:scale-102'
              }`}
              onClick={() => handlePlanSelection(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              {/* Plan Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div>
                  <div className="font-bold text-gray-900">{plan.industries}</div>
                  <div className="text-xs text-gray-600">Industries</div>
                </div>
                <div>
                  <div className="font-bold text-gray-900">{plan.users}</div>
                  <div className="text-xs text-gray-600">Users</div>
                </div>
                <div>
                  <div className="font-bold text-gray-900">{plan.storage}</div>
                  <div className="text-xs text-gray-600">Storage</div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <Button 
                className={`w-full ${plan.buttonClass} text-white font-semibold py-3`}
                disabled={plan.id === 'free'}
              >
                {plan.buttonText}
              </Button>
            </Card>
          ))}
        </div>

        {/* Business Agents Included */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            All Business Agents Included
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {businessAgents.map((agent, index) => {
              const IconComponent = agent.icon;
              return (
                <Card key={index} className="p-4 text-center hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">{agent.name}</h4>
                  <p className="text-xs text-gray-600">{agent.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Industries Supported */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-2">
            <Building2 className="w-6 h-6 text-blue-600" />
            9 Industries Ready to Deploy
          </h3>
          
          <div className="grid grid-cols-3 md:grid-cols-9 gap-4">
            {industries.map((industry, index) => (
              <Card key={index} className="p-4 text-center hover:shadow-lg transition-all">
                <div className="text-2xl mb-2">{industry.icon}</div>
                <div className="text-sm font-semibold text-gray-900">{industry.name}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* Enterprise Features */}
        <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 mb-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" />
              Enterprise-Grade Security & Compliance
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <Lock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold">SOC 2 Compliant</div>
              </div>
              <div className="text-center">
                <Cloud className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold">99.9% Uptime</div>
              </div>
              <div className="text-center">
                <Globe className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold">Global CDN</div>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold">End-to-End Encryption</div>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQ Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">How does the 14-day trial work?</h4>
              <p className="text-gray-600 text-sm">
                Full access to all premium features, no credit card required. 
                Cancel anytime during the trial period.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Can I change plans later?</h4>
              <p className="text-gray-600 text-sm">
                Yes! Upgrade or downgrade anytime. Changes take effect immediately 
                with prorated billing.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Is my data secure?</h4>
              <p className="text-gray-600 text-sm">
                Absolutely. We use enterprise-grade encryption, SOC 2 compliance, 
                and regular security audits.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Do you offer support?</h4>
              <p className="text-gray-600 text-sm">
                Yes! Email support for all plans, priority support for Professional, 
                and dedicated account management for Enterprise.
              </p>
            </div>
          </div>
          
          <div className="mt-12">
            <Button 
              onClick={() => navigate('/home')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 text-lg font-semibold"
            >
              Start Your Free Trial Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* MaycoleTechnologies™ Innovation Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-100">
                <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  Innovation from MaycoleTechnologies™
                </h4>
                <p className="text-gray-600 mb-4">
                  MaycoleTracker™ is just the beginning. We're pioneering the future with cutting-edge 
                  innovations across robotics engineering, music production, and film technology.
                </p>
                <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                  <span>🤖 Robotics Solutions</span>
                  <span>🎵 Music Innovation</span>
                  <span>🎬 Film Technology</span>
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  Visit maycoletechnologies.com for upcoming product announcements
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}