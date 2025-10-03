/**
 * MaycoleTracker™ vol. XI - Enterprise Edition
 * MULTI-INDUSTRY BUSINESS INVENTORY SETUP & CONFIGURATION SYSTEM
 * Complete Business Inventory Configuration for All Industries
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, Settings, CheckCircle, ArrowRight, ArrowLeft, Upload, Download,
  ChefHat, ShoppingCart, Heart, HardHat, Car, Factory, Hotel, GraduationCap,
  Building2, Wrench, Star, Crown, Zap, Users, BarChart3, Database, 
  MapPin, DollarSign, Calendar, AlertCircle, Plus, Trash2, Edit3,
  Save, RefreshCw, Copy, FileText, Globe, Shield, Mic, Camera
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import UniversalBackButton from './UniversalBackButton';

// Industry-specific inventory templates and configurations
const INDUSTRY_CONFIGURATIONS = {
  healthcare: {
    name: 'Healthcare',
    icon: Heart,
    color: 'bg-pink-500',
    categories: [
      'Medical Supplies', 'Pharmaceuticals', 'Equipment', 'PPE', 
      'Diagnostics', 'Surgical Instruments', 'Patient Care Items'
    ],
    defaultItems: [
      { name: 'N95 Masks', category: 'PPE', minStock: 100, unit: 'boxes', priority: 'critical' },
      { name: 'Surgical Gloves', category: 'PPE', minStock: 50, unit: 'boxes', priority: 'high' },
      { name: 'Stethoscope', category: 'Equipment', minStock: 5, unit: 'pieces', priority: 'medium' },
      { name: 'Thermometers', category: 'Diagnostics', minStock: 20, unit: 'pieces', priority: 'high' },
      { name: 'Hand Sanitizer', category: 'Medical Supplies', minStock: 30, unit: 'bottles', priority: 'high' }
    ],
    workflows: ['Patient Care', 'Inventory Audits', 'Compliance Tracking', 'Emergency Restocking'],
    regulations: ['FDA Compliance', 'HIPAA Requirements', 'Safety Protocols'],
    integrations: ['EMR Systems', 'Pharmacy Management', 'Lab Equipment']
  },
  restaurant: {
    name: 'Restaurant',
    icon: ChefHat,
    color: 'bg-red-500',
    categories: [
      'Food Items', 'Beverages', 'Kitchen Equipment', 'Cleaning Supplies', 
      'Disposables', 'Condiments', 'Frozen Items', 'Fresh Produce'
    ],
    defaultItems: [
      { name: 'Tomatoes', category: 'Fresh Produce', minStock: 20, unit: 'lbs', priority: 'high' },
      { name: 'Olive Oil', category: 'Condiments', minStock: 5, unit: 'bottles', priority: 'medium' },
      { name: 'Chicken Breast', category: 'Food Items', minStock: 15, unit: 'lbs', priority: 'high' },
      { name: 'Napkins', category: 'Disposables', minStock: 100, unit: 'packs', priority: 'low' },
      { name: 'Dishwashing Liquid', category: 'Cleaning Supplies', minStock: 10, unit: 'bottles', priority: 'medium' }
    ],
    workflows: ['Daily Prep', 'Weekly Ordering', 'Inventory Counts', 'Waste Tracking'],
    regulations: ['Food Safety', 'Health Department', 'HACCP Standards'],
    integrations: ['POS Systems', 'Supplier Portals', 'Recipe Management']
  },
  construction: {
    name: 'Construction',
    icon: HardHat,
    color: 'bg-orange-500',
    categories: [
      'Tools', 'Materials', 'Safety Equipment', 'Hardware', 
      'Electrical', 'Plumbing', 'Heavy Equipment', 'Consumables'
    ],
    defaultItems: [
      { name: 'Safety Helmets', category: 'Safety Equipment', minStock: 25, unit: 'pieces', priority: 'critical' },
      { name: 'Concrete Mix', category: 'Materials', minStock: 50, unit: 'bags', priority: 'high' },
      { name: 'Power Drill', category: 'Tools', minStock: 3, unit: 'pieces', priority: 'medium' },
      { name: 'Safety Vest', category: 'Safety Equipment', minStock: 20, unit: 'pieces', priority: 'high' },
      { name: 'Nails', category: 'Hardware', minStock: 100, unit: 'lbs', priority: 'medium' }
    ],
    workflows: ['Project Planning', 'Material Ordering', 'Equipment Tracking', 'Safety Inspections'],
    regulations: ['OSHA Compliance', 'Building Codes', 'Environmental Standards'],
    integrations: ['Project Management', 'Equipment Rental', 'Supplier Networks']
  },
  retail: {
    name: 'Retail',
    icon: ShoppingCart,
    color: 'bg-green-500',
    categories: [
      'Products', 'Accessories', 'Display Items', 'Packaging', 
      'Electronics', 'Clothing', 'Home Goods', 'Seasonal Items'
    ],
    defaultItems: [
      { name: 'T-Shirts (Size M)', category: 'Clothing', minStock: 30, unit: 'pieces', priority: 'medium' },
      { name: 'Shopping Bags', category: 'Packaging', minStock: 200, unit: 'pieces', priority: 'low' },
      { name: 'Price Tags', category: 'Display Items', minStock: 500, unit: 'pieces', priority: 'low' },
      { name: 'Wireless Headphones', category: 'Electronics', minStock: 15, unit: 'pieces', priority: 'high' },
      { name: 'Mannequins', category: 'Display Items', minStock: 5, unit: 'pieces', priority: 'low' }
    ],
    workflows: ['Sales Tracking', 'Reorder Management', 'Seasonal Planning', 'Visual Merchandising'],
    regulations: ['Consumer Protection', 'Product Safety', 'Return Policies'],
    integrations: ['POS Systems', 'E-commerce Platforms', 'Payment Processing']
  },
  manufacturing: {
    name: 'Manufacturing',
    icon: Factory,
    color: 'bg-slate-600',
    categories: [
      'Raw Materials', 'Components', 'Tools', 'Finished Goods', 
      'Packaging', 'Quality Control', 'Maintenance Supplies', 'Safety Items'
    ],
    defaultItems: [
      { name: 'Steel Bolts M12', category: 'Raw Materials', minStock: 200, unit: 'pieces', priority: 'medium' },
      { name: 'Machine Oil', category: 'Maintenance Supplies', minStock: 20, unit: 'liters', priority: 'high' },
      { name: 'Circuit Boards', category: 'Components', minStock: 100, unit: 'pieces', priority: 'high' },
      { name: 'Cardboard Boxes', category: 'Packaging', minStock: 500, unit: 'pieces', priority: 'low' },
      { name: 'Safety Goggles', category: 'Safety Items', minStock: 50, unit: 'pieces', priority: 'critical' }
    ],
    workflows: ['Production Planning', 'Quality Control', 'Supply Chain Management', 'Maintenance Scheduling'],
    regulations: ['ISO Standards', 'Environmental Compliance', 'Worker Safety'],
    integrations: ['ERP Systems', 'Production Planning', 'Quality Management']
  },
  automotive: {
    name: 'Automotive',
    icon: Car,
    color: 'bg-blue-600',
    categories: [
      'Parts', 'Fluids', 'Tools', 'Accessories', 
      'Electrical', 'Body Parts', 'Maintenance Items', 'Safety Equipment'
    ],
    defaultItems: [
      { name: 'Engine Oil 5W-30', category: 'Fluids', minStock: 20, unit: 'quarts', priority: 'high' },
      { name: 'Brake Pads', category: 'Parts', minStock: 10, unit: 'sets', priority: 'high' },
      { name: 'Socket Wrench Set', category: 'Tools', minStock: 3, unit: 'sets', priority: 'medium' },
      { name: 'Air Filters', category: 'Parts', minStock: 25, unit: 'pieces', priority: 'medium' },
      { name: 'Car Wax', category: 'Accessories', minStock: 15, unit: 'bottles', priority: 'low' }
    ],
    workflows: ['Service Scheduling', 'Parts Ordering', 'Customer Management', 'Warranty Tracking'],
    regulations: ['EPA Standards', 'DOT Requirements', 'Manufacturer Specifications'],
    integrations: ['Service Management', 'Parts Catalogs', 'Customer Databases']
  },
  hospitality: {
    name: 'Hospitality',
    icon: Hotel,
    color: 'bg-cyan-500',
    categories: [
      'Linens', 'Toiletries', 'Maintenance', 'Food & Beverage', 
      'Guest Supplies', 'Cleaning Products', 'Room Amenities', 'Kitchen Items'
    ],
    defaultItems: [
      { name: 'Bed Sheets', category: 'Linens', minStock: 100, unit: 'sets', priority: 'high' },
      { name: 'Shampoo Bottles', category: 'Toiletries', minStock: 50, unit: 'pieces', priority: 'medium' },
      { name: 'Towels', category: 'Linens', minStock: 200, unit: 'pieces', priority: 'high' },
      { name: 'Coffee Pods', category: 'Food & Beverage', minStock: 500, unit: 'pieces', priority: 'medium' },
      { name: 'Vacuum Cleaners', category: 'Maintenance', minStock: 5, unit: 'pieces', priority: 'low' }
    ],
    workflows: ['Housekeeping', 'Guest Services', 'Maintenance Requests', 'Food & Beverage Management'],
    regulations: ['Health Codes', 'Fire Safety', 'ADA Compliance'],
    integrations: ['Property Management', 'Booking Systems', 'Guest Services']
  },
  education: {
    name: 'Education',
    icon: GraduationCap,
    color: 'bg-purple-500',
    categories: [
      'Supplies', 'Equipment', 'Books', 'Technology', 
      'Furniture', 'Art Supplies', 'Science Equipment', 'Sports Equipment'
    ],
    defaultItems: [
      { name: 'Notebooks', category: 'Supplies', minStock: 200, unit: 'pieces', priority: 'medium' },
      { name: 'Laptops', category: 'Technology', minStock: 10, unit: 'pieces', priority: 'high' },
      { name: 'Textbooks', category: 'Books', minStock: 50, unit: 'pieces', priority: 'high' },
      { name: 'Desks', category: 'Furniture', minStock: 5, unit: 'pieces', priority: 'low' },
      { name: 'Markers', category: 'Supplies', minStock: 100, unit: 'pieces', priority: 'medium' }
    ],
    workflows: ['Curriculum Planning', 'Equipment Maintenance', 'Budget Management', 'Student Services'],
    regulations: ['Educational Standards', 'Safety Requirements', 'Budget Compliance'],
    integrations: ['Student Information Systems', 'Learning Management', 'Financial Systems']
  }
};

interface SetupStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const MultiIndustryInventorySetup = () => {
  const navigate = useNavigate();
  const { industryType } = useParams<{ industryType?: string }>();
  
  const [selectedIndustry, setSelectedIndustry] = useState<string>(industryType || '');
  const [currentStep, setCurrentStep] = useState(0);
  const [setupProgress, setSetupProgress] = useState(0);
  const [businessName, setBusinessName] = useState('');
  const [businessLocation, setBusinessLocation] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [customItems, setCustomItems] = useState<any[]>([]);
  const [isConfiguring, setIsConfiguring] = useState(false);

  const setupSteps: SetupStep[] = [
    { id: 'industry', title: 'Select Industry', description: 'Choose your business type', completed: !!selectedIndustry },
    { id: 'business', title: 'Business Details', description: 'Enter business information', completed: !!businessName },
    { id: 'categories', title: 'Inventory Categories', description: 'Select relevant categories', completed: selectedCategories.length > 0 },
    { id: 'items', title: 'Initial Items', description: 'Add starter inventory items', completed: customItems.length > 0 },
    { id: 'configuration', title: 'System Configuration', description: 'Finalize settings', completed: false },
    { id: 'complete', title: 'Launch System', description: 'Ready to use', completed: false }
  ];

  useEffect(() => {
    if (industryType && INDUSTRY_CONFIGURATIONS[industryType as keyof typeof INDUSTRY_CONFIGURATIONS]) {
      setSelectedIndustry(industryType);
      const config = INDUSTRY_CONFIGURATIONS[industryType as keyof typeof INDUSTRY_CONFIGURATIONS];
      setSelectedCategories(config.categories.slice(0, 4)); // Pre-select top 4 categories
      setCustomItems(config.defaultItems);
      setCurrentStep(1);
    }
  }, [industryType]);

  useEffect(() => {
    const completedSteps = setupSteps.filter(step => step.completed).length;
    setSetupProgress((completedSteps / setupSteps.length) * 100);
  }, [setupSteps]);

  const getIndustryConfig = () => {
    return INDUSTRY_CONFIGURATIONS[selectedIndustry as keyof typeof INDUSTRY_CONFIGURATIONS];
  };

  const handleIndustrySelect = (industry: string) => {
    setSelectedIndustry(industry);
    const config = INDUSTRY_CONFIGURATIONS[industry as keyof typeof INDUSTRY_CONFIGURATIONS];
    if (config) {
      setSelectedCategories(config.categories.slice(0, 4));
      setCustomItems(config.defaultItems);
    }
    setCurrentStep(1);
  };

  const handleNextStep = () => {
    if (currentStep < setupSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinishSetup = async () => {
    setIsConfiguring(true);
    
    // Simulate configuration process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Navigate to the comprehensive inventory system
    navigate('/dashboard');
  };

  const addCustomItem = () => {
    setCustomItems([...customItems, {
      name: '',
      category: selectedCategories[0] || 'General',
      minStock: 10,
      unit: 'pieces',
      priority: 'medium'
    }]);
  };

  const removeCustomItem = (index: number) => {
    setCustomItems(customItems.filter((_, i) => i !== index));
  };

  const updateCustomItem = (index: number, updates: any) => {
    const updated = [...customItems];
    updated[index] = { ...updated[index], ...updates };
    setCustomItems(updated);
  };

  const renderIndustrySelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Select Your Industry</h3>
        <p className="text-gray-600">Choose your business type to get started with pre-configured templates</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(INDUSTRY_CONFIGURATIONS).map(([key, config]) => {
          const Icon = config.icon;
          return (
            <motion.div
              key={key}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                  selectedIndustry === key ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleIndustrySelect(key)}
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-3 rounded-lg ${config.color} text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-semibold text-lg">{config.name}</h4>
                    {selectedIndustry === key && (
                      <CheckCircle className="w-5 h-5 text-blue-500 ml-auto" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      {config.categories.length} categories, {config.defaultItems.length} starter items
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {config.categories.slice(0, 3).map((cat, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">{cat}</Badge>
                      ))}
                      {config.categories.length > 3 && (
                        <Badge variant="outline" className="text-xs">+{config.categories.length - 3} more</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderBusinessDetails = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Business Information</h3>
        <p className="text-gray-600">Tell us about your business to customize your experience</p>
      </div>
      
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-2">Business Name</label>
            <Input
              placeholder="Enter your business name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Location</label>
            <Input
              placeholder="City, State"
              value={businessLocation}
              onChange={(e) => setBusinessLocation(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        
        {selectedIndustry && (
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              {(() => {
                const config = getIndustryConfig();
                const Icon = config?.icon;
                return (
                  <>
                    <div className={`p-3 rounded-lg ${config?.color} text-white`}>
                      {Icon && <Icon className="w-6 h-6" />}
                    </div>
                    <div>
                      <h4 className="font-semibold">{config?.name} Industry</h4>
                      <p className="text-sm text-gray-600">Specialized configuration for your industry</p>
                    </div>
                  </>
                );
              })()}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>Categories:</strong> {getIndustryConfig()?.categories.length}
              </div>
              <div>
                <strong>Starter Items:</strong> {getIndustryConfig()?.defaultItems.length}
              </div>
              <div>
                <strong>Workflows:</strong> {getIndustryConfig()?.workflows.length}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );

  const renderCategorySelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Inventory Categories</h3>
        <p className="text-gray-600">Select the categories relevant to your business</p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {getIndustryConfig()?.categories.map((category, index) => (
            <motion.div
              key={category}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-200 p-4 text-center ${
                  selectedCategories.includes(category) 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
                onClick={() => {
                  if (selectedCategories.includes(category)) {
                    setSelectedCategories(selectedCategories.filter(c => c !== category));
                  } else {
                    setSelectedCategories([...selectedCategories, category]);
                  }
                }}
              >
                <div className="flex items-center justify-center gap-2">
                  <Package className="w-4 h-4" />
                  <span className="font-medium text-sm">{category}</span>
                  {selectedCategories.includes(category) && (
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          Selected {selectedCategories.length} of {getIndustryConfig()?.categories.length} categories
        </div>
      </div>
    </div>
  );

  const renderItemConfiguration = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Initial Inventory Items</h3>
        <p className="text-gray-600">Review and customize your starter inventory items</p>
      </div>
      
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4">
          {customItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                  <div className="md:col-span-2">
                    <Input
                      placeholder="Item name"
                      value={item.name}
                      onChange={(e) => updateCustomItem(index, { name: e.target.value })}
                    />
                  </div>
                  <div>
                    <select
                      value={item.category}
                      onChange={(e) => updateCustomItem(index, { category: e.target.value })}
                      className="w-full p-2 border rounded-md"
                    >
                      {selectedCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Input
                      type="number"
                      placeholder="Min stock"
                      value={item.minStock}
                      onChange={(e) => updateCustomItem(index, { minStock: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <select
                      value={item.priority}
                      onChange={(e) => updateCustomItem(index, { priority: e.target.value })}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeCustomItem(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-center mt-6">
          <Button onClick={addCustomItem} variant="outline" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Custom Item
          </Button>
        </div>
      </div>
    </div>
  );

  const renderFinalConfiguration = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Final Configuration</h3>
        <p className="text-gray-600">Review your setup and configure advanced features</p>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-500" />
              Business Summary
            </h4>
            <div className="space-y-2 text-sm">
              <div><strong>Name:</strong> {businessName || 'Not specified'}</div>
              <div><strong>Industry:</strong> {getIndustryConfig()?.name}</div>
              <div><strong>Location:</strong> {businessLocation || 'Not specified'}</div>
              <div><strong>Categories:</strong> {selectedCategories.length}</div>
              <div><strong>Items:</strong> {customItems.length}</div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-green-500" />
              System Features
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Multi-industry inventory management</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Voice alerts and notifications</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Camera scanner integration</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Advanced analytics dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Real-time stock monitoring</span>
              </div>
            </div>
          </Card>
        </div>
        
        <Card className="p-6">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-500" />
            Advanced Options
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Mic className="w-5 h-5 text-blue-500" />
              <div>
                <div className="font-medium text-sm">Voice Alerts</div>
                <div className="text-xs text-gray-600">Enable voice notifications</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Camera className="w-5 h-5 text-green-500" />
              <div>
                <div className="font-medium text-sm">Barcode Scanner</div>
                <div className="text-xs text-gray-600">Quick item scanning</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <BarChart3 className="w-5 h-5 text-orange-500" />
              <div>
                <div className="font-medium text-sm">Analytics</div>
                <div className="text-xs text-gray-600">Business insights</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderSetupComplete = () => (
    <div className="space-y-6 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
      </motion.div>
      
      <div>
        <h3 className="text-3xl font-bold mb-2">Setup Complete!</h3>
        <p className="text-gray-600 text-lg">
          Your MaycoleTracker™ inventory system is ready to use
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-500">{selectedCategories.length}</div>
              <div className="text-sm text-gray-600">Categories Configured</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">{customItems.length}</div>
              <div className="text-sm text-gray-600">Items Ready to Track</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-500">100%</div>
              <div className="text-sm text-gray-600">System Configured</div>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="space-y-4">
        <Button
          size="lg"
          onClick={handleFinishSetup}
          disabled={isConfiguring}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
        >
          {isConfiguring ? (
            <>
              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
              Configuring System...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 mr-2" />
              Launch MaycoleTracker™ System
            </>
          )}
        </Button>
        
        <div className="flex justify-center gap-4 text-sm">
          <Button variant="outline" onClick={() => navigate('/camera')}>
            <Camera className="w-4 h-4 mr-2" />
            Test Scanner
          </Button>
          <Button variant="outline" onClick={() => navigate('/analytics')}>
            <BarChart3 className="w-4 h-4 mr-2" />
            View Analytics
          </Button>
        </div>
      </div>
    </div>
  );

  const getCurrentStepContent = () => {
    switch (currentStep) {
      case 0: return renderIndustrySelection();
      case 1: return renderBusinessDetails();
      case 2: return renderCategorySelection();
      case 3: return renderItemConfiguration();
      case 4: return renderFinalConfiguration();
      case 5: return renderSetupComplete();
      default: return renderIndustrySelection();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-xl">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold flex items-center gap-3">
                <Package className="w-10 h-10" />
                Multi-Industry Inventory Setup
              </h1>
              <p className="text-blue-100 mt-2 text-lg">
                MaycoleTracker™ Enterprise Edition - Complete Business Configuration System
              </p>
            </motion.div>
            
            <div className="text-right">
              <div className="text-sm text-blue-100 mb-1">Setup Progress</div>
              <div className="flex items-center gap-2">
                <Progress value={setupProgress} className="w-32 h-2" />
                <span className="text-sm font-medium">{Math.round(setupProgress)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Universal Back Button */}
        <UniversalBackButton customBackPath="/logo" showHomeOption={true} />
        
        {/* Step Navigation */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Setup Steps</h3>
            <Badge variant="outline">{currentStep + 1} of {setupSteps.length}</Badge>
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {setupSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                  index === currentStep
                    ? 'bg-blue-500 text-white'
                    : index < currentStep
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                {index < currentStep ? (
                  <CheckCircle className="w-4 h-4" />
                ) : index === currentStep ? (
                  <Settings className="w-4 h-4" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-current" />
                )}
                <span className="font-medium">{step.title}</span>
              </motion.div>
            ))}
          </div>
        </Card>
        
        {/* Main Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-8">
            {getCurrentStepContent()}
          </Card>
        </motion.div>
        
        {/* Navigation Buttons */}
        {currentStep < 5 && (
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePreviousStep}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <Button
              onClick={handleNextStep}
              disabled={
                (currentStep === 0 && !selectedIndustry) ||
                (currentStep === 1 && !businessName) ||
                (currentStep === 2 && selectedCategories.length === 0) ||
                (currentStep === 3 && customItems.length === 0)
              }
              className="gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiIndustryInventorySetup;