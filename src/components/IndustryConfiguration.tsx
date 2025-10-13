/**
 * MaycoleTracker™ vol. XI - Enterprise Edition
 * Industry Configuration Pages - Universal Business Setup
 */

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";  
import { MotionDiv } from '@/lib/shims';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  ChefHat, Car, ShoppingCart, Heart, HardHat, Music, Church, Factory, Hotel,
  ArrowLeft, CheckCircle, Settings, Star, Crown, Zap, 
  Users, DollarSign, BarChart3, Package, Calendar, Bell,
  Shield, Globe, ArrowRight, Smartphone
} from 'lucide-react'; 

// Industry configuration data
const industryConfigs = {
  restaurant: {
    name: 'Restaurant Management',
    icon: ChefHat,
    color: 'text-red-500',
    bgGradient: 'from-red-50 to-orange-50',
    primaryColor: 'red',
    description: 'Complete restaurant and food service management solution',
    features: [
      'Menu & Recipe Management',
      'Kitchen Inventory Tracking',
      'Staff Scheduling System',
      'Order Processing & POS',
      'Customer Reservations',
      'Food Cost Analysis',
      'Supplier Management',
      'Health Code Compliance'
    ],
    modules: [
      { name: 'Kitchen Management', icon: ChefHat, enabled: true },
      { name: 'Inventory Control', icon: Package, enabled: true },
      { name: 'Staff Scheduling', icon: Users, enabled: true },
      { name: 'Financial Tracking', icon: DollarSign, enabled: true },
      { name: 'Customer Management', icon: Users, enabled: true },
      { name: 'Analytics Dashboard', icon: BarChart3, enabled: true }
    ],
    setupSteps: [
      'Configure restaurant profile and location',
      'Set up menu categories and items',
      'Add staff members and roles',
      'Configure inventory categories',
      'Set up supplier information',
      'Configure POS integration'
    ]
  },
  autorepair: {
    name: 'Auto Repair Shop',
    icon: Car,
    color: 'text-blue-600',
    bgGradient: 'from-blue-50 to-cyan-50',
    primaryColor: 'blue',
    description: 'Comprehensive automotive service management system',
    features: [
      'Parts Inventory Management',
      'Service Order Tracking',
      'Customer Vehicle Records',
      'Technician Scheduling',
      'Repair Cost Estimation',
      'Warranty Management',
      'Supplier Integration',
      'Service History Tracking'
    ],
    modules: [
      { name: 'Parts Management', icon: Settings, enabled: true },
      { name: 'Service Tracking', icon: Calendar, enabled: true },
      { name: 'Customer Records', icon: Users, enabled: true },
      { name: 'Financial Reports', icon: DollarSign, enabled: true },
      { name: 'Inventory Control', icon: Package, enabled: true },
      { name: 'Analytics Dashboard', icon: BarChart3, enabled: true }
    ],
    setupSteps: [
      'Configure shop profile and services',
      'Set up parts categories and suppliers',
      'Add technician profiles and skills',
      'Configure service types and pricing',
      'Set up customer database',
      'Configure reporting preferences'
    ]
  },
  retail: {
    name: 'Retail Store',
    icon: ShoppingCart,
    color: 'text-emerald-500',
    bgGradient: 'from-emerald-50 to-green-50',
    primaryColor: 'emerald',
    description: 'Advanced retail management and POS solution',
    features: [
      'Product Catalog Management',
      'Multi-Location Inventory',
      'Sales Analytics & Reporting',
      'Customer Loyalty Programs',
      'POS System Integration',
      'E-commerce Sync',
      'Supplier Management',
      'Price Management'
    ],
    modules: [
      { name: 'Product Management', icon: Package, enabled: true },
      { name: 'Sales Tracking', icon: DollarSign, enabled: true },
      { name: 'Customer Management', icon: Users, enabled: true },
      { name: 'Inventory Control', icon: Package, enabled: true },
      { name: 'Analytics Dashboard', icon: BarChart3, enabled: true },
      { name: 'E-commerce Integration', icon: Globe, enabled: false }
    ],
    setupSteps: [
      'Configure store profile and locations',
      'Set up product categories and catalog',
      'Configure pricing and promotions',
      'Set up customer loyalty program',
      'Configure POS system integration',
      'Set up e-commerce synchronization'
    ]
  },
  healthcare: {
    name: 'Healthcare Practice',
    icon: Heart,
    color: 'text-pink-500',
    bgGradient: 'from-pink-50 to-rose-50',
    primaryColor: 'pink',
    description: 'Medical practice and healthcare facility management',
    features: [
      'Medical Supply Inventory',
      'Patient Record Management',
      'Appointment Scheduling',
      'Prescription Tracking',
      'Insurance Processing',
      'Compliance Monitoring',
      'Staff Management',
      'Medical Equipment Tracking'
    ],
    modules: [
      { name: 'Medical Inventory', icon: Package, enabled: true },
      { name: 'Patient Management', icon: Users, enabled: true },
      { name: 'Scheduling System', icon: Calendar, enabled: true },
      { name: 'Compliance Tracking', icon: Shield, enabled: true },
      { name: 'Financial Management', icon: DollarSign, enabled: true },
      { name: 'Analytics Dashboard', icon: BarChart3, enabled: true }
    ],
    setupSteps: [
      'Configure practice profile and specialties',
      'Set up medical supply categories',
      'Add staff and role permissions',
      'Configure patient management system',
      'Set up compliance requirements',
      'Configure insurance and billing'
    ]
  },
  construction: {
    name: 'Construction Company',
    icon: HardHat,
    color: 'text-orange-500',
    bgGradient: 'from-orange-50 to-amber-50',
    primaryColor: 'orange',
    description: 'Construction project and materials management',
    features: [
      'Material Inventory Control',
      'Project Management',
      'Equipment Rental Tracking',
      'Site Management',
      'Cost Estimation',
      'Crew Scheduling',
      'Safety Compliance',
      'Progress Reporting'
    ],
    modules: [
      { name: 'Material Management', icon: Package, enabled: true },
      { name: 'Project Tracking', icon: Calendar, enabled: true },
      { name: 'Crew Management', icon: Users, enabled: true },
      { name: 'Equipment Tracking', icon: Settings, enabled: true },
      { name: 'Financial Management', icon: DollarSign, enabled: true },
      { name: 'Safety Compliance', icon: Shield, enabled: true }
    ],
    setupSteps: [
      'Configure company profile and projects',
      'Set up material categories and suppliers',
      'Add crew members and specialties',
      'Configure equipment and tool tracking',
      'Set up project timelines',
      'Configure safety and compliance'
    ]
  },
  musicstudio: {
    name: 'Music Studio',
    icon: Music,
    color: 'text-purple-500',
    bgGradient: 'from-purple-50 to-violet-50',
    primaryColor: 'purple',
    description: 'Music production and studio management system',
    features: [
      'Equipment Inventory',
      'Session Booking System',
      'Artist Management',
      'Revenue Tracking',
      'Project Management',
      'Equipment Maintenance',
      'Client Communication',
      'Recording Archives'
    ],
    modules: [
      { name: 'Equipment Management', icon: Settings, enabled: true },
      { name: 'Session Booking', icon: Calendar, enabled: true },
      { name: 'Artist Management', icon: Users, enabled: true },
      { name: 'Revenue Tracking', icon: DollarSign, enabled: true },
      { name: 'Project Management', icon: Package, enabled: true },
      { name: 'Analytics Dashboard', icon: BarChart3, enabled: true }
    ],
    setupSteps: [
      'Configure studio profile and rooms',
      'Set up equipment inventory',
      'Add artist and client profiles',
      'Configure session rates and packages',
      'Set up booking calendar',
      'Configure project workflows'
    ]
  },
  faithtech: {
    name: 'Faith & Ministry',
    icon: Church,
    color: 'text-indigo-500',
    bgGradient: 'from-indigo-50 to-blue-50',
    primaryColor: 'indigo',
    description: 'Ministry resources and community management',
    features: [
      'Resource Management',
      'Member Database',
      'Event Planning',
      'Donation Tracking',
      'Volunteer Coordination',
      'Communication Tools',
      'Ministry Analytics',
      'Facility Management'
    ],
    modules: [
      { name: 'Resource Management', icon: Package, enabled: true },
      { name: 'Member Management', icon: Users, enabled: true },
      { name: 'Event Planning', icon: Calendar, enabled: true },
      { name: 'Donation Tracking', icon: DollarSign, enabled: true },
      { name: 'Communication Hub', icon: Bell, enabled: true },
      { name: 'Analytics Dashboard', icon: BarChart3, enabled: true }
    ],
    setupSteps: [
      'Configure ministry profile and vision',
      'Set up member categories and roles',
      'Configure resource categories',
      'Set up event management system',
      'Configure donation and giving',
      'Set up communication preferences'
    ]
  },
  manufacturing: {
    name: 'Manufacturing',
    icon: Factory,
    color: 'text-slate-600',
    bgGradient: 'from-slate-50 to-gray-50',
    primaryColor: 'slate',
    description: 'Production and supply chain management',
    features: [
      'Raw Material Tracking',
      'Production Planning',
      'Quality Control',
      'Supply Chain Management',
      'Equipment Monitoring',
      'Batch Tracking',
      'Compliance Management',
      'Cost Analysis'
    ],
    modules: [
      { name: 'Material Management', icon: Package, enabled: true },
      { name: 'Production Planning', icon: Calendar, enabled: true },
      { name: 'Quality Control', icon: Shield, enabled: true },
      { name: 'Equipment Monitoring', icon: Settings, enabled: true },
      { name: 'Financial Management', icon: DollarSign, enabled: true },
      { name: 'Analytics Dashboard', icon: BarChart3, enabled: true }
    ],
    setupSteps: [
      'Configure manufacturing profile',
      'Set up raw material categories',
      'Configure production workflows',
      'Set up quality control standards',
      'Configure equipment monitoring',
      'Set up compliance requirements'
    ]
  },
  hospitality: {
    name: 'Hospitality',
    icon: Hotel,
    color: 'text-cyan-500',
    bgGradient: 'from-cyan-50 to-teal-50',
    primaryColor: 'cyan',
    description: 'Hotel and hospitality management system',
    features: [
      'Room Management',
      'Guest Services',
      'Housekeeping Coordination',
      'Amenity Tracking',
      'Staff Scheduling',
      'Guest Experience',
      'Revenue Management',
      'Maintenance Tracking'
    ],
    modules: [
      { name: 'Room Management', icon: Package, enabled: true },
      { name: 'Guest Services', icon: Users, enabled: true },
      { name: 'Housekeeping', icon: Calendar, enabled: true },
      { name: 'Staff Management', icon: Users, enabled: true },
      { name: 'Revenue Tracking', icon: DollarSign, enabled: true },
      { name: 'Analytics Dashboard', icon: BarChart3, enabled: true }
    ],
    setupSteps: [
      'Configure hotel profile and amenities',
      'Set up room categories and rates',
      'Configure guest service options',
      'Set up housekeeping workflows',
      'Configure staff roles and scheduling',
      'Set up revenue management'
    ]
  },
  custom: {
    name: 'Custom Business',
    icon: Settings,
    color: 'text-gray-600',
    bgGradient: 'from-gray-50 to-slate-50',
    primaryColor: 'gray',
    description: 'Fully customizable business management solution',
    features: [
      'Custom Module Configuration',
      'Flexible Inventory Categories',
      'Adaptable Workflows',
      'Custom Reporting',
      'Scalable Architecture',
      'Integration Ready',
      'Multi-Industry Support',
      'Enterprise Customization'
    ],
    modules: [
      { name: 'Core Management', icon: Package, enabled: true },
      { name: 'User Management', icon: Users, enabled: true },
      { name: 'Scheduling System', icon: Calendar, enabled: false },
      { name: 'Financial Tracking', icon: DollarSign, enabled: true },
      { name: 'Analytics Dashboard', icon: BarChart3, enabled: true },
      { name: 'Mobile App', icon: Smartphone, enabled: false }
    ],
    setupSteps: [
      'Define business profile and requirements',
      'Configure custom categories and fields',
      'Set up user roles and permissions',
      'Configure custom workflows',
      'Set up integrations and APIs',
      'Configure advanced customizations'
    ]
  }
};

export default function IndustryConfiguration() {
  const { industryType } = useParams<{ industryType: string }>();
  const navigate = useNavigate();
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [setupComplete, setSetupComplete] = useState(false);

  const config = industryConfigs[industryType as keyof typeof industryConfigs];

  if (!config) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Industry Not Found</h2>
          <p className="text-gray-600 mb-6">The requested industry configuration was not found.</p>
          <Button onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const Icon = config.icon;

  const handleModuleToggle = (moduleName: string) => {
    setSelectedModules(prev => 
      prev.includes(moduleName) 
        ? prev.filter(m => m !== moduleName)
        : [...prev, moduleName]
    );
  };

  const handleSetupComplete = () => {
    setSetupComplete(true);
    // In a real app, this would save the configuration and redirect to the dashboard
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm relative">
                    <div className="absolute inset-0 bg-blue-600 rounded-sm transform scale-75"></div>
                  </div>
                </div>
                <span className="font-semibold">MaycoleTracker™</span>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">
              Industry Configuration
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!setupComplete ? (
          <div className="space-y-8">
            {/* Industry Header */}
            <div className={`bg-gradient-to-r ${config.bgGradient} rounded-2xl p-8`}>
              <div className="flex items-center gap-6">
                <div className={`p-4 bg-white rounded-2xl shadow-lg`}>
                  <Icon className={`w-12 h-12 ${config.color}`} />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{config.name}</h1>
                  <p className="text-gray-700 text-lg mb-4">{config.description}</p>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-blue-100 text-blue-800">
                      <Zap className="w-3 h-3 mr-1" />
                      Enterprise Ready
                    </Badge>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Pre-Configured
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800">
                      <Star className="w-3 h-3 mr-1" />
                      Professional
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Overview */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Included Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {config.features.map((feature, index) => (
                  <MotionDiv
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm font-medium">{feature}</span>
                  </MotionDiv>
                ))}
              </div>
            </Card>

            {/* Module Selection */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Configure Modules</h3>
              <p className="text-gray-600 mb-6">
                Select the modules you want to enable for your {config.name.toLowerCase()}. 
                You can always modify these later.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {config.modules.map((module, index) => {
                  const ModuleIcon = module.icon;
                  const isEnabled = module.enabled;
                  const isSelected = selectedModules.includes(module.name);
                  
                  return (
                    <MotionDiv
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card 
                        className={`p-4 cursor-pointer transition-all duration-200 border-2 ${
                          isEnabled || isSelected
                            ? 'border-blue-300 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => !isEnabled && handleModuleToggle(module.name)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <ModuleIcon className={`w-5 h-5 ${
                              isEnabled || isSelected ? 'text-blue-600' : 'text-gray-400'
                            }`} />
                            <span className={`font-medium ${
                              isEnabled || isSelected ? 'text-blue-900' : 'text-gray-600'
                            }`}>
                              {module.name}
                            </span>
                          </div>
                          {isEnabled ? (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              Included
                            </Badge>
                          ) : isSelected ? (
                            <CheckCircle className="w-5 h-5 text-blue-600" />
                          ) : (
                            <div className="w-5 h-5 border-2 border-gray-300 rounded" />
                          )}
                        </div>
                      </Card>
                    </MotionDiv>
                  );
                })}
              </div>
            </Card>

            {/* Setup Steps */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Setup Process</h3>
              <p className="text-gray-600 mb-6">
                Here's what we'll help you configure to get your {config.name.toLowerCase()} up and running:
              </p>
              <div className="space-y-3">
                {config.setupSteps.map((step, index) => (
                  <MotionDiv
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{step}</span>
                  </MotionDiv>
                ))}
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Choose Different Industry
              </Button>
              <Button 
                onClick={handleSetupComplete}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8"
              >
                Complete Setup & Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        ) : (
          /* Setup Complete */
          <MotionDiv
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Setup Complete!</h2>
            <p className="text-gray-600 text-lg mb-6">
              Your {config.name} configuration has been saved. Redirecting to your dashboard...
            </p>
            <div className="w-12 h-12 mx-auto">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </MotionDiv>
        )}
      </div>
    </div>
  );
}