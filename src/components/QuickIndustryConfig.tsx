/**
 * MaycoleTracker™ vol. XI - Enterprise Edition
 * Quick Industry Configuration - Simple & Fast Setup
 */

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, CheckCircle, Package } from 'lucide-react';

const templates = {
  Restaurant: ['Tomatoes', 'Cheese', 'Napkins'],
  AutoRepair: ['Car Battery', 'Oil Filter', 'Brake Pads'],
  Retail: ['Shirts', 'Shoes', 'Bags'],
  Healthcare: ['Gloves', 'Syringes', 'Bandages'],
  Construction: ['Cement', 'Nails', 'Wood'],
  MusicStudio: ['Microphones', 'Cables', 'Mixers'],
  FaithTech: ['Candles', 'Books', 'Communion Cups'],
};

const QuickIndustryConfig = () => {
  const { industry } = useParams<{ industry: string }>();
  const navigate = useNavigate();
  const inventory = templates[industry as keyof typeof templates] || [];

  if (!industry || !templates[industry as keyof typeof templates]) {
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5" />
                </div>
                <h1 className="text-2xl font-bold">
                  MaycoleTracker<span className="text-xs align-super opacity-75">™</span> Quick Setup
                </h1>
              </div>
              <p className="text-blue-100">
                {industry} inventory configuration - Ready to launch!
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/industries')}
              className="btn-on-dark"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Full Setup
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="space-y-6">
          {/* Quick Summary */}
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Quick {industry} Setup</h2>
                <p className="text-gray-600">Pre-configured inventory items ready to use</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Included Inventory Items:</h3>
                <ul className="space-y-2">
                  {inventory.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Quick Setup Benefits:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Instant {industry.toLowerCase()} configuration</li>
                  <li>• Pre-loaded inventory categories</li>
                  <li>• Ready-to-use dashboard</li>
                  <li>• Add more items anytime</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={() => navigate('/industries')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Choose Different Industry
            </Button>
            
            <Button 
              onClick={() => navigate('/dashboard')}
              className="bg-green-600 hover:bg-green-700 text-white px-8"
            >
              <Package className="w-4 h-4 mr-2" />
              Launch {industry} System
            </Button>
          </div>

          {/* Quick Info */}
          <div className="text-center text-sm text-gray-500">
            <p>
              Your {industry.toLowerCase()} inventory system is ready to use. 
              You can add more items and customize settings from the dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickIndustryConfig;