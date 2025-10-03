/**
 * MaycoleTracker™ vol. XI - Enterprise Edition
 * Enhanced Industry Selector for Universal Business Platform
 * Serving 9+ Industries with Complete Configuration System
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import UniversalBackButton from './UniversalBackButton';
import { 
  ChefHat,           // Restaurant
  ShoppingCart,      // Retail  
  Heart,             // Healthcare
  HardHat,           // Construction
  Car,               // AutoRepair
  Music,             // MusicStudio
  Church,            // FaithTech
  Factory,           // Manufacturing
  Stethoscope,       // Advanced Healthcare
  Building2,         // Real Estate
  GraduationCap,     // Education
  Hotel,             // Hospitality
  ArrowRight,
  CheckCircle,
  Settings,
  Star,
  Crown,
  Zap
} from 'lucide-react';

// MaycoleTracker™ Enterprise Industry Configuration
const industries = [
  {
    id: 'restaurant',
    name: 'Restaurant',
    icon: ChefHat,
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-950/20',
    borderColor: 'border-red-200 dark:border-red-800',
    selectedColor: 'bg-red-500 text-white',
    description: 'Food service & kitchen management',
    features: ['Menu Management', 'Inventory Tracking', 'Staff Scheduling', 'Order Processing'],
    example: 'Fresh Ingredients, Kitchen Supplies, Beverages',
    tier: 'professional',
    popularity: 95
  },
  {
    id: 'autorepair',
    name: 'Auto Repair',
    icon: Car,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    selectedColor: 'bg-blue-600 text-white',
    description: 'Automotive service & parts management',
    features: ['Parts Inventory', 'Service Tracking', 'Customer Records', 'Repair Scheduling'],
    example: 'Engine Parts, Tools, Fluids, Tires',
    tier: 'professional',
    popularity: 88
  },
  {
    id: 'retail',
    name: 'Retail',
    icon: ShoppingCart,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    selectedColor: 'bg-emerald-500 text-white',
    description: 'Product sales & inventory management',
    features: ['Product Catalog', 'Sales Tracking', 'Customer Management', 'POS Integration'],
    example: 'Clothing, Electronics, Accessories',
    tier: 'enterprise',
    popularity: 92
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: Heart,
    color: 'text-pink-500',
    bgColor: 'bg-pink-50 dark:bg-pink-950/20',
    borderColor: 'border-pink-200 dark:border-pink-800',
    selectedColor: 'bg-pink-500 text-white',
    description: 'Medical supplies & patient management',
    features: ['Medical Inventory', 'Patient Records', 'Appointment Scheduling', 'Compliance Tracking'],
    example: 'Medications, Medical Equipment, PPE',
    tier: 'enterprise',
    popularity: 85
  },
  {
    id: 'construction',
    name: 'Construction',
    icon: HardHat,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    borderColor: 'border-orange-200 dark:border-orange-800',
    selectedColor: 'bg-orange-500 text-white',
    description: 'Construction materials & project management',
    features: ['Material Tracking', 'Project Management', 'Equipment Rental', 'Site Monitoring'],
    example: 'Tools, Concrete, Lumber, Equipment',
    tier: 'professional',
    popularity: 78
  },
  {
    id: 'musicstudio',
    name: 'Music Studio',
    icon: Music,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    borderColor: 'border-purple-200 dark:border-purple-800',
    selectedColor: 'bg-purple-500 text-white',
    description: 'Music production & equipment management',
    features: ['Equipment Tracking', 'Session Booking', 'Artist Management', 'Revenue Tracking'],
    example: 'Instruments, Audio Equipment, Accessories',
    tier: 'professional',
    popularity: 72
  },
  {
    id: 'faithtech',
    name: 'Faith & Ministry',
    icon: Church,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/20',
    borderColor: 'border-indigo-200 dark:border-indigo-800',
    selectedColor: 'bg-indigo-500 text-white',
    description: 'Ministry resources & community management',
    features: ['Resource Management', 'Member Tracking', 'Event Planning', 'Donation Management'],
    example: 'Books, Audio/Video, Event Supplies',
    tier: 'professional',
    popularity: 65
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    icon: Factory,
    color: 'text-slate-600',
    bgColor: 'bg-slate-50 dark:bg-slate-950/20',
    borderColor: 'border-slate-200 dark:border-slate-800',
    selectedColor: 'bg-slate-600 text-white',
    description: 'Production & supply chain management',
    features: ['Raw Materials', 'Production Planning', 'Quality Control', 'Supply Chain'],
    example: 'Raw Materials, Components, Finished Goods',
    tier: 'enterprise',
    popularity: 82
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    icon: Hotel,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-50 dark:bg-cyan-950/20',
    borderColor: 'border-cyan-200 dark:border-cyan-800',
    selectedColor: 'bg-cyan-500 text-white',
    description: 'Hotel & service industry management',
    features: ['Room Management', 'Guest Services', 'Housekeeping', 'Amenity Tracking'],
    example: 'Linens, Toiletries, Maintenance Supplies',
    tier: 'enterprise',
    popularity: 75
  }
];

interface EnhancedIndustrySelectorProps {
  showHeader?: boolean;
  compact?: boolean;
  onIndustrySelect?: (industryId: string) => void;
  className?: string;
}

export default function EnhancedIndustrySelector({ 
  showHeader = true, 
  compact = false, 
  onIndustrySelect,
  className = ""
}: EnhancedIndustrySelectorProps) {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const handleIndustrySelect = (industryId: string) => {
    setSelectedIndustry(industryId);
    if (onIndustrySelect) {
      onIndustrySelect(industryId);
    }
    // Navigate to configuration page
    navigate(`/configure/${industryId}`);
  };

  const displayIndustries = showAll ? industries : industries.slice(0, 6);
  const sortedIndustries = [...displayIndustries].sort((a, b) => b.popularity - a.popularity);

  const getTierBadge = (tier: string) => {
    if (tier === 'enterprise') {
      return (
        <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs">
          <Crown className="w-3 h-3 mr-1" />
          Enterprise
        </Badge>
      );
    } else if (tier === 'professional') {
      return (
        <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs">
          <Star className="w-3 h-3 mr-1" />
          Professional
        </Badge>
      );
    }
    return null;
  };

  if (compact) {
    return (
      <div className={`space-y-4 ${className}`}>
        {showHeader && (
          <div className="text-center">
            <h3 className="font-semibold text-lg">Select Your Business Type</h3>
            <p className="text-sm text-gray-600">
              Choose your industry for an optimized MaycoleTracker™ experience
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {sortedIndustries.slice(0, 6).map((industry) => {
            const Icon = industry.icon;
            const isSelected = selectedIndustry === industry.id;
            
            return (
              <motion.button
                key={industry.id}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleIndustrySelect(industry.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-center relative overflow-hidden ${
                  isSelected 
                    ? `${industry.selectedColor} shadow-lg scale-105` 
                    : `${industry.bgColor} ${industry.borderColor} hover:shadow-md hover:scale-102`
                }`}
              >
                <div className="relative z-10">
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? 'text-white' : industry.color}`} />
                  <div className={`font-medium text-sm ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                    {industry.name}
                  </div>
                  {isSelected && (
                    <CheckCircle className="w-4 h-4 text-white mx-auto mt-1" />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Universal Back Button */}
      <UniversalBackButton customBackPath="/home" showHomeOption={true} />
      
      {showHeader && (
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm relative">
                <div className="absolute inset-0 bg-blue-600 rounded-sm transform scale-75"></div>
              </div>
            </div>
            <h2 className="text-2xl font-bold">
              MaycoleTracker<span className="text-xs align-super opacity-75">™</span>
            </h2>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Universal Business Management Platform</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select your industry to get started with a pre-configured business management solution. 
              Each industry template includes specialized features, inventory categories, and workflows.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-blue-500" />
              <span>9+ Industries</span>
            </div>
            <div className="flex items-center gap-1">
              <Crown className="w-4 h-4 text-red-500" />
              <span>Enterprise Ready</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Production Ready</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {sortedIndustries.map((industry, index) => {
            const Icon = industry.icon;
            const isSelected = selectedIndustry === industry.id;
            
            return (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl border-2 relative overflow-hidden ${
                    isSelected 
                      ? `${industry.borderColor} ${industry.bgColor} shadow-lg scale-105` 
                      : `border-gray-200 hover:${industry.borderColor} hover:${industry.bgColor} hover:shadow-lg`
                  }`}
                  onClick={() => handleIndustrySelect(industry.id)}
                >
                  {/* Popularity Indicator */}
                  <div className="absolute top-3 right-3">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{industry.popularity}%</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl ${industry.bgColor} ${industry.borderColor} border`}>
                          <Icon className={`w-6 h-6 ${industry.color}`} />
                        </div>
                        {isSelected && (
                          <CheckCircle className={`w-6 h-6 ${industry.color}`} />
                        )}
                      </div>
                      {getTierBadge(industry.tier)}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-lg">{industry.name}</h4>
                        <p className="text-sm text-gray-600">{industry.description}</p>
                      </div>

                      <div className="space-y-2">
                        <h5 className="font-medium text-sm text-gray-700">Key Features:</h5>
                        <div className="grid grid-cols-2 gap-1">
                          {industry.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-1 text-xs text-gray-600">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                          <span className="font-medium">Examples:</span> {industry.example}
                        </p>
                      </div>
                    </div>

                    <motion.div 
                      className="mt-4 flex items-center gap-2 text-blue-600"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm font-medium">Configure Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {!showAll && industries.length > 6 && (
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => setShowAll(true)}
            className="gap-2"
          >
            View All {industries.length} Industries
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {showAll && (
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => setShowAll(false)}
            className="gap-2"
          >
            Show Popular Industries
          </Button>
        </div>
      )}

      {/* Custom Configuration Option */}
      <div className="border-t pt-6">
        <Card className="border-dashed border-2 border-gray-300 hover:border-blue-400 transition-colors">
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Custom Business Configuration</h4>
              <p className="text-gray-600">
                Don't see your specific industry? Create a fully customized solution tailored to your unique business needs.
              </p>
            </div>
            <Button 
              onClick={() => handleIndustrySelect('custom')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Settings className="w-4 h-4 mr-2" />
              Create Custom Configuration
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Quick Industry Pills for Navigation
export function IndustryQuickSelect({ onSelect }: { onSelect: (industryId: string) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {industries.slice(0, 7).map((industry) => {
        const Icon = industry.icon;
        
        return (
          <motion.button
            key={industry.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(industry.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs border transition-all duration-200 ${industry.borderColor} ${industry.bgColor} ${industry.color} hover:shadow-sm`}
          >
            <Icon className="w-3 h-3" />
            {industry.name}
          </motion.button>
        );
      })}
    </div>
  );
}