/**
 * MaycoleTracker™ vol. XI - Enterprise Edition
 * Simple Industry Configuration - Your Original Clean Approach
 */

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Package, CheckCircle } from 'lucide-react';

const templates = {
  Restaurant: ['Tomatoes', 'Cheese', 'Napkins'],
  AutoRepair: ['Car Battery', 'Oil Filter', 'Brake Pads'],
  Retail: ['Shirts', 'Shoes', 'Bags'],
  Healthcare: ['Gloves', 'Syringes', 'Bandages'],
  Construction: ['Cement', 'Nails', 'Wood'],
  MusicStudio: ['Microphones', 'Cables', 'Mixers'],
  FaithTech: ['Candles', 'Books', 'Communion Cups'],
};

const SimpleIndustryConfig = () => {
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
      {/* Simple Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5" />
                </div>
                <h1 className="text-2xl font-bold">
                  MaycoleTracker<span className="text-xs align-super opacity-75">™</span>
                </h1>
              </div>
              <p className="text-blue-100">
                {industry} Inventory Configuration - Simple Setup
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="btn-on-dark"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Simple Content */}
      <div className="max-w-4xl mx-auto p-8">
        <div className="space-y-6">
          {/* Industry Title */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {industry} Inventory Configuration
            </h2>
            <p className="text-gray-600">
              Pre-configured inventory items for your {industry.toLowerCase()} business
            </p>
          </div>

          {/* Inventory List */}
          <Card className="p-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Included Inventory Items:</h3>
              <ul className="space-y-3">
                {inventory.map((item) => (
                  <li key={item} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-800 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Launch Button */}
          <div className="text-center">
            <Button
              onClick={() => navigate('/dashboard')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-bold"
            >
              <Package className="w-5 h-5 mr-2" />
              Launch Inventory System
            </Button>
          </div>

          {/* Simple Footer */}
          <div className="text-center text-sm text-gray-500 pt-4">
            <p>
              Your {industry.toLowerCase()} inventory is ready to use. Add more items from the dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleIndustryConfig;