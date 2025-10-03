/**
 * MaycoleTracker™ vol. XI - Enterprise Business Management Platform
 * Complete Business Operations & Management System
 * PRIMARY FOCUS: Comprehensive Business Management
 * SECONDARY SUPPORT: Inventory & Supply Chain
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, DollarSign, Users, TrendingUp, Package, 
  BarChart3, Scan, Camera, Crown, Shield, Rocket, Star, Globe
} from 'lucide-react';
import AppHeader from './AppHeader';

export default function MainPage() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // PRIMARY BUSINESS MANAGEMENT MODULES
  const businessOperations = [
    {
      id: 'dashboard',
      title: 'Business Dashboard',
      description: 'Complete operations overview & KPIs',
      icon: Building2,
      route: '/dashboard',
      color: 'from-blue-600 to-blue-700',
      priority: 'primary',
      category: 'Operations'
    },
    {
      id: 'finance',
      title: 'Financial Management',
      description: 'Revenue, expenses, cash flow & budgeting',
      icon: DollarSign,
      route: '/finance',
      color: 'from-green-600 to-green-700',
      priority: 'primary',
      category: 'Finance'
    },
    {
      id: 'customers',
      title: 'Customer Management',
      description: 'CRM, leads, sales pipeline & relationships',
      icon: Users,
      route: '/customers',
      color: 'from-purple-600 to-purple-700',
      priority: 'primary',
      category: 'Sales'
    },
    {
      id: 'projects',
      title: 'Project Management',
      description: 'Tasks, workflows, deadlines & collaboration',
      icon: Target,
      route: '/projects',
      color: 'from-orange-600 to-orange-700',
      priority: 'primary',
      category: 'Operations'
    },
    {
      id: 'hr',
      title: 'Human Resources',
      description: 'Staff management, payroll & performance',
      icon: Award,
      route: '/hr',
      color: 'from-pink-600 to-pink-700',
      priority: 'primary',
      category: 'People'
    },
    {
      id: 'sales',
      title: 'Sales & Marketing',
      description: 'Lead generation, campaigns & conversions',
      icon: TrendingUp,
      route: '/sales',
      color: 'from-cyan-600 to-cyan-700',
      priority: 'primary',
      category: 'Sales'
    }
  ];

  // SECONDARY SUPPORTING MODULES (including inventory)
  const supportingSystems = [
    {
      id: 'supply-chain',
      title: 'Supply Chain & Inventory',
      description: 'Procurement, inventory & supplier management',
      icon: Package,
      route: '/inventory',
      color: 'from-indigo-600 to-indigo-700',
      priority: 'secondary',
      category: 'Operations'
    },
    {
      id: 'analytics',
      title: 'Business Intelligence',
      description: 'Advanced analytics & predictive insights',
      icon: BarChart3,
      route: '/analytics',
      color: 'from-emerald-600 to-emerald-700',
      priority: 'secondary',
      category: 'Analytics'
    },
    {
      id: 'compliance',
      title: 'Compliance Center',
      description: 'Regulations, audits & documentation',
      icon: Shield,
      route: '/compliance',
      color: 'from-red-600 to-red-700',
      priority: 'secondary',
      category: 'Legal'
    },
    {
      id: 'scanner',
      title: 'Business Scanner',
      description: 'Documents, QR codes & data capture',
      icon: Scan,
      route: '/scanner',
      color: 'from-violet-600 to-violet-700',
      priority: 'secondary',
      category: 'Tools'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Clean Professional Header */}
      <AppHeader fontSize={20} />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Star className="w-4 h-4" />
            WORLD'S FIRST UNIVERSAL BUSINESS PLATFORM
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Complete Business Management
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Everything you need to run your business efficiently, from finance to operations.
          </p>
          
          <div className="text-right text-sm text-gray-500">
            <div>{currentTime.toLocaleDateString()}</div>
            <div className="font-medium">{currentTime.toLocaleTimeString()}</div>
          </div>
        </div>
      </div>

      {/* Main Business Operations */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Primary Business Management */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Business Management
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessOperations.map((module) => {
              const IconComponent = module.icon;
              return (
                <div
                  key={module.id}
                  onClick={() => navigate(module.route)}
                  className="group cursor-pointer bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${module.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <Star className="w-4 h-4 text-yellow-500" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {module.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {module.description}
                  </p>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(module.route);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Rocket className="w-4 h-4" />
                    Open
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Supporting Systems */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Advanced Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportingSystems.map((system) => {
              const IconComponent = system.icon;
              return (
                <div
                  key={system.id}
                  onClick={() => navigate(system.route)}
                  className="group cursor-pointer bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-purple-300 transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${system.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <Crown className="w-4 h-4 text-purple-500" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {system.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {system.description}
                  </p>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(system.route);
                    }}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    Access
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">17+</div>
              <div className="text-sm text-gray-600">Modules</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">9</div>
              <div className="text-sm text-gray-600">Industries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">AI</div>
              <div className="text-sm text-gray-600">Powered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">24/7</div>
              <div className="text-sm text-gray-600">Available</div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}