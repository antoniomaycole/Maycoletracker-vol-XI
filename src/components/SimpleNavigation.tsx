/**
 * Simple Navigation Header - No complex dependencies
 * Bulletproof navigation that won't break
 */

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Package, BarChart3, Scan, Camera, Mic, Brain, Info } from 'lucide-react';
import { Crown } from '@/lib/icons';

export default function SimpleNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  // Only show navigation on non-logo pages
  if (location.pathname === '/') {
    return null;
  }

  const navItems = [
    { path: '/main', icon: Home, label: 'Main' },
    { path: '/inventory', icon: Package, label: 'Inventory' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/scanner', icon: Scan, label: 'Scanner' },
    { path: '/camera', icon: Camera, label: 'Camera' },
    { path: '/voice', icon: Mic, label: 'Voice' },
    { path: '/ai', icon: Brain, label: 'AI' },
    { path: '/premium', icon: Crown, label: 'Premium' },
    { path: '/about', icon: Info, label: 'About' },
  ];

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="font-bold text-gray-900">MaycoleTracker™</span>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => navigate('/main')}
              className="text-gray-600 hover:text-gray-900"
            >
              <Home className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}