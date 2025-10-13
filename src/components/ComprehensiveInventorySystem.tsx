/**
 * MaycoleTracker™ vol. XI - Enterprise Edition
 * COMPREHENSIVE UNIVERSAL INVENTORY MANAGEMENT SYSTEM
 * Advanced Multi-Industry Inventory Platform with Complete Business Operations
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, Plus, Search, Filter, Mic, Camera, BarChart3, AlertCircle, 
  TrendingUp, Settings, Download, Upload, Scan, Tag, MapPin, Calendar,
  DollarSign, Truck, Users, Clock, Star, Shield, Zap, Building2,
  Archive, RefreshCw, Edit3, Trash2, Eye, CheckCircle, XCircle,
  ArrowUpDown, Grid3X3, List, ShoppingCart, Wrench, ChefHat,
  Heart, HardHat, Car, Factory, Hotel, GraduationCap, Home
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import UniversalBackButton from './UniversalBackButton';

// Enhanced Industry-specific categories
const INDUSTRY_CATEGORIES = {
  healthcare: ['Medical Supplies', 'Equipment', 'Pharmaceuticals', 'PPE', 'Diagnostics'],
  restaurant: ['Food Items', 'Beverages', 'Kitchen Equipment', 'Cleaning Supplies', 'Disposables'],
  construction: ['Tools', 'Materials', 'Safety Equipment', 'Hardware', 'Electrical'],
  retail: ['Products', 'Accessories', 'Display Items', 'Packaging', 'Supplies'],
  manufacturing: ['Raw Materials', 'Components', 'Tools', 'Finished Goods', 'Packaging'],
  automotive: ['Parts', 'Fluids', 'Tools', 'Accessories', 'Safety Equipment'],
  hospitality: ['Linens', 'Toiletries', 'Maintenance', 'Food & Beverage', 'Guest Supplies'],
  education: ['Supplies', 'Equipment', 'Books', 'Technology', 'Furniture'],
  general: ['General Items', 'Supplies', 'Equipment', 'Tools', 'Materials']
};

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  industry: string;
  quantity: number;
  minStock: number;
  maxStock?: number;
  price: number;
  cost?: number;
  location: string;
  supplier?: string;
  sku?: string;
  barcode?: string;
  expiryDate?: string;
  lastUpdated: string;
  lastOrderDate?: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'overstock';
  priority: 'low' | 'medium' | 'high' | 'critical';
  description?: string;
  tags?: string[];
  image?: string;
  reorderPoint?: number;
  leadTime?: number; // days
  unitOfMeasure?: string;
}

// Sample comprehensive inventory data across industries
const initialInventoryData: InventoryItem[] = [
  // Healthcare
  {
    id: '1',
    name: 'N95 Masks',
    category: 'PPE',
    industry: 'healthcare',
    quantity: 50,
    minStock: 100,
    maxStock: 500,
    price: 2.50,
    cost: 1.25,
    location: 'Medical Storage A',
    supplier: 'MedSupply Co.',
    sku: 'N95-001',
    lastUpdated: '2024-01-15',
    status: 'low-stock',
    priority: 'critical',
    description: 'N95 Respirator Masks for medical staff',
    tags: ['medical', 'ppe', 'safety'],
    reorderPoint: 75,
    leadTime: 5,
    unitOfMeasure: 'boxes'
  },
  // Restaurant
  {
    id: '2',
    name: 'Premium Tomatoes',
    category: 'Food Items',
    industry: 'restaurant',
    quantity: 25,
    minStock: 20,
    maxStock: 100,
    price: 4.99,
    cost: 2.50,
    location: 'Walk-in Cooler A',
    supplier: 'Fresh Produce Inc.',
    sku: 'TOM-PREM-001',
    expiryDate: '2024-01-20',
    lastUpdated: '2024-01-15',
    status: 'in-stock',
    priority: 'high',
    description: 'Fresh premium tomatoes for restaurant dishes',
    tags: ['fresh', 'produce', 'perishable'],
    reorderPoint: 15,
    leadTime: 2,
    unitOfMeasure: 'lbs'
  },
  // Construction
  {
    id: '3',
    name: 'Safety Helmets',
    category: 'Safety Equipment',
    industry: 'construction',
    quantity: 15,
    minStock: 25,
    maxStock: 100,
    price: 35.99,
    cost: 18.00,
    location: 'Equipment Storage',
    supplier: 'SafetyFirst Ltd.',
    sku: 'HELM-SF-001',
    lastUpdated: '2024-01-14',
    status: 'low-stock',
    priority: 'critical',
    description: 'OSHA compliant safety helmets',
    tags: ['safety', 'osha', 'protection'],
    reorderPoint: 20,
    leadTime: 7,
    unitOfMeasure: 'pieces'
  },
  // Retail
  {
    id: '4',
    name: 'Premium Headphones',
    category: 'Electronics',
    industry: 'retail',
    quantity: 75,
    minStock: 30,
    maxStock: 200,
    price: 199.99,
    cost: 89.99,
    location: 'Electronics Section',
    supplier: 'TechDistrib Co.',
    sku: 'HEAD-PREM-001',
    barcode: '1234567890123',
    lastUpdated: '2024-01-13',
    status: 'in-stock',
    priority: 'medium',
    description: 'Wireless noise-canceling headphones',
    tags: ['electronics', 'wireless', 'premium'],
    reorderPoint: 25,
    leadTime: 10,
    unitOfMeasure: 'units'
  },
  // Manufacturing
  {
    id: '5',
    name: 'Steel Bolts M12',
    category: 'Raw Materials',
    industry: 'manufacturing',
    quantity: 500,
    minStock: 200,
    maxStock: 2000,
    price: 0.85,
    cost: 0.42,
    location: 'Raw Materials Warehouse',
    supplier: 'SteelCorp Industries',
    sku: 'BOLT-M12-001',
    lastUpdated: '2024-01-12',
    status: 'in-stock',
    priority: 'medium',
    description: 'M12 steel bolts for manufacturing',
    tags: ['steel', 'fastener', 'manufacturing'],
    reorderPoint: 150,
    leadTime: 14,
    unitOfMeasure: 'pieces'
  },
  // Automotive
  {
    id: '6',
    name: 'Engine Oil 5W-30',
    category: 'Fluids',
    industry: 'automotive',
    quantity: 8,
    minStock: 20,
    maxStock: 100,
    price: 24.99,
    cost: 12.50,
    location: 'Fluids Storage',
    supplier: 'AutoParts Direct',
    sku: 'OIL-5W30-001',
    lastUpdated: '2024-01-11',
    status: 'low-stock',
    priority: 'high',
    description: 'Synthetic engine oil 5W-30',
    tags: ['oil', 'synthetic', 'maintenance'],
    reorderPoint: 15,
    leadTime: 3,
    unitOfMeasure: 'quarts'
  }
];

const ComprehensiveInventorySystem = () => {
  const navigate = useNavigate();
  
  // State Management
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventoryData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [sortBy, setSortBy] = useState<keyof InventoryItem>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Voice synthesis function
  const speak = useCallback((text: string) => {
    if (!isVoiceEnabled || !('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = 0.7;
    speechSynthesis.speak(utterance);
  }, [isVoiceEnabled]);

  // Check for alerts and announce
  useEffect(() => {
    if (isVoiceEnabled) {
      const criticalItems = inventory.filter(item => 
        item.status === 'out-of-stock' || 
        (item.status === 'low-stock' && item.priority === 'critical')
      );
      
      if (criticalItems.length > 0) {
        speak(`Alert: ${criticalItems.length} critical inventory items need attention.`);
      }
    }
  }, [inventory, isVoiceEnabled, speak]);

  // Filtering and Sorting Logic
  const filteredAndSortedInventory = React.useMemo(() => {
    let filtered = inventory.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesIndustry = selectedIndustry === 'all' || item.industry === selectedIndustry;
      const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
      const matchesPriority = selectedPriority === 'all' || item.priority === selectedPriority;
      
      return matchesSearch && matchesCategory && matchesIndustry && matchesStatus && matchesPriority;
    });

    // Sort the filtered results defensively (values may be undefined)
    filtered.sort((a, b) => {
      const aValue = a[sortBy] as any;
      const bValue = b[sortBy] as any;
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortOrder === 'asc' ? 1 : -1;
      if (bValue == null) return sortOrder === 'asc' ? -1 : 1;
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [inventory, searchTerm, selectedCategory, selectedIndustry, selectedStatus, selectedPriority, sortBy, sortOrder]);

  // Get unique values for filters
  const categories = ['all', ...Array.from(new Set(inventory.map(item => item.category)))];
  const industries = ['all', ...Array.from(new Set(inventory.map(item => item.industry)))];
  const statuses = ['all', 'in-stock', 'low-stock', 'out-of-stock', 'overstock'];
  const priorities = ['all', 'low', 'medium', 'high', 'critical'];

  // Calculate comprehensive metrics
  const metrics = React.useMemo(() => {
    const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
    const totalValue = inventory.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const totalCost = inventory.reduce((sum, item) => sum + (item.quantity * (item.cost || 0)), 0);
    const lowStockItems = inventory.filter(item => item.status === 'low-stock').length;
    const outOfStockItems = inventory.filter(item => item.status === 'out-of-stock').length;
    const criticalItems = inventory.filter(item => item.priority === 'critical').length;
    const profitMargin = totalValue > 0 ? ((totalValue - totalCost) / totalValue) * 100 : 0;
    
    return {
      totalItems,
      totalValue,
      totalCost,
      lowStockItems,
      outOfStockItems,
      criticalItems,
      profitMargin,
      uniqueProducts: inventory.length,
      averageStockLevel: inventory.length > 0 ? totalItems / inventory.length : 0
    };
  }, [inventory]);

  // Status badge styling
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-green-100 text-green-800 border-green-200';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'out-of-stock': return 'bg-red-100 text-red-800 border-red-200';
      case 'overstock': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Priority badge styling
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Industry icon mapping
  const getIndustryIcon = (industry: string) => {
    switch (industry) {
      case 'healthcare': return <Heart className="w-4 h-4" />;
      case 'restaurant': return <ChefHat className="w-4 h-4" />;
      case 'construction': return <HardHat className="w-4 h-4" />;
      case 'retail': return <ShoppingCart className="w-4 h-4" />;
      case 'manufacturing': return <Factory className="w-4 h-4" />;
      case 'automotive': return <Car className="w-4 h-4" />;
      case 'hospitality': return <Hotel className="w-4 h-4" />;
      case 'education': return <GraduationCap className="w-4 h-4" />;
      default: return <Building2 className="w-4 h-4" />;
    }
  };

  // Toggle sort order
  const handleSort = (field: keyof InventoryItem) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
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
                MaycoleTracker™ Universal Inventory
              </h1>
              <p className="text-blue-100 mt-2 text-lg">
                Advanced Multi-Industry Inventory Management Platform - Enterprise Edition vol. XI
              </p>
              <div className="flex items-center gap-4 mt-3 text-sm">
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span>Real-time Analytics</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>Enterprise Security</span>
                </div>
                <div className="flex items-center gap-1">
                  <Building2 className="w-4 h-4 text-purple-400" />
                  <span>Multi-Industry Support</span>
                </div>
              </div>
            </motion.div>
            
            <div className="flex gap-3">
              <Button 
                onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                className={`${isVoiceEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'} btn-on-dark`}
              >
                <Mic className="w-4 h-4 mr-2" />
                Voice {isVoiceEnabled ? 'ON' : 'OFF'}
              </Button>
              <Button 
                onClick={() => navigate('/camera')}
                className="btn-on-dark"
              >
                <Camera className="w-4 h-4 mr-2" />
                Scanner
              </Button>
              <Button className="btn-on-dark">
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Universal Back Button */}
        <UniversalBackButton customBackPath="/logo" showHomeOption={true} />
        
        {/* Comprehensive Dashboard Metrics */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.totalItems.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">{metrics.uniqueProducts} unique products</p>
              </div>
              <Package className="w-10 h-10 text-blue-600" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-3xl font-bold text-green-600">${metrics.totalValue.toLocaleString()}</p>
                <p className="text-xs text-green-500 mt-1">{metrics.profitMargin.toFixed(1)}% margin</p>
              </div>
              <DollarSign className="w-10 h-10 text-green-600" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-3xl font-bold text-yellow-600">{metrics.lowStockItems}</p>
                <p className="text-xs text-yellow-600 mt-1">Need attention</p>
              </div>
              <AlertCircle className="w-10 h-10 text-yellow-600" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-3xl font-bold text-red-600">{metrics.outOfStockItems}</p>
                <p className="text-xs text-red-600 mt-1">Critical items</p>
              </div>
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Priority</p>
                <p className="text-3xl font-bold text-purple-600">{metrics.criticalItems}</p>
                <p className="text-xs text-purple-600 mt-1">High priority items</p>
              </div>
              <Star className="w-10 h-10 text-purple-600" />
            </div>
          </Card>
        </motion.div>

        {/* Advanced Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="space-y-4">
              {/* Primary Search Bar */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search by name, category, SKU, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 text-lg"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={showFilters ? "default" : "outline"}
                    onClick={() => setShowFilters(!showFilters)}
                    className="h-12"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  <Button
                    variant={viewMode === 'table' ? "default" : "outline"}
                    onClick={() => setViewMode('table')}
                    className="h-12"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'grid' ? "default" : "outline"}
                    onClick={() => setViewMode('grid')}
                    className="h-12"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Advanced Filters */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-4 border-t"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                      <select
                        value={selectedIndustry}
                        onChange={(e) => setSelectedIndustry(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        {industries.map(industry => (
                          <option key={industry} value={industry}>
                            {industry === 'all' ? 'All Industries' : industry.charAt(0).toUpperCase() + industry.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>
                            {category === 'all' ? 'All Categories' : category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        {statuses.map(status => (
                          <option key={status} value={status}>
                            {status === 'all' ? 'All Status' : status.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                      <select
                        value={selectedPriority}
                        onChange={(e) => setSelectedPriority(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        {priorities.map(priority => (
                          <option key={priority} value={priority}>
                            {priority === 'all' ? 'All Priorities' : priority.charAt(0).toUpperCase() + priority.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                      <div className="flex gap-2">
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value as keyof InventoryItem)}
                          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="name">Name</option>
                          <option value="quantity">Quantity</option>
                          <option value="price">Price</option>
                          <option value="lastUpdated">Last Updated</option>
                          <option value="status">Status</option>
                          <option value="priority">Priority</option>
                        </select>
                        <Button
                          variant="outline"
                          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                          className="p-3"
                        >
                          <ArrowUpDown className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>
        </motion.div>

        {/* Results Summary */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Showing {filteredAndSortedInventory.length} of {inventory.length} items</span>
          {selectedItems.length > 0 && (
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {selectedItems.length} selected
            </span>
          )}
        </div>

        {/* Inventory Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {viewMode === 'table' ? (
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedItems(filteredAndSortedInventory.map(item => item.id));
                            } else {
                              setSelectedItems([]);
                            }
                          }}
                        />
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('name')}>
                        <div className="flex items-center gap-2">
                          Item Details
                          <ArrowUpDown className="w-4 h-4" />
                        </div>
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Industry</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('quantity')}>
                        <div className="flex items-center gap-2">
                          Stock
                          <ArrowUpDown className="w-4 h-4" />
                        </div>
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('price')}>
                        <div className="flex items-center gap-2">
                          Value
                          <ArrowUpDown className="w-4 h-4" />
                        </div>
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Location</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {filteredAndSortedInventory.map((item, index) => (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4 px-6">
                            <input 
                              type="checkbox" 
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              checked={selectedItems.includes(item.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedItems([...selectedItems, item.id]);
                                } else {
                                  setSelectedItems(selectedItems.filter(id => id !== item.id));
                                }
                              }}
                            />
                          </td>
                          <td className="py-4 px-6">
                            <div>
                              <div className="font-semibold text-gray-900">{item.name}</div>
                              <div className="text-sm text-gray-600">{item.category}</div>
                              {item.sku && <div className="text-xs text-gray-500">SKU: {item.sku}</div>}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              {getIndustryIcon(item.industry)}
                              <span className="capitalize text-sm">{item.industry}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div>
                              <div className="font-semibold text-gray-900">{item.quantity}</div>
                              <div className="text-xs text-gray-500">Min: {item.minStock}</div>
                              {item.quantity <= item.minStock && (
                                <Progress 
                                  value={(item.quantity / item.minStock) * 100} 
                                  className="w-16 h-2 mt-1"
                                />
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div>
                              <div className="font-semibold text-gray-900">${item.price.toFixed(2)}</div>
                              <div className="text-xs text-gray-500">Total: ${(item.quantity * item.price).toFixed(2)}</div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <MapPin className="w-3 h-3" />
                              {item.location}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="space-y-1">
                              <Badge className={`${getStatusStyle(item.status)} border`}>
                                {item.status.replace('-', ' ')}
                              </Badge>
                              <Badge className={`${getPriorityStyle(item.priority)} border text-xs`}>
                                {item.priority} priority
                              </Badge>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex gap-1">
                              <Button variant="outline" size="sm" className="p-2">
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button variant="outline" size="sm" className="p-2">
                                <Edit3 className="w-3 h-3" />
                              </Button>
                              <Button variant="outline" size="sm" className="p-2 text-red-600 hover:text-red-700">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredAndSortedInventory.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                            <p className="text-sm text-gray-600">{item.category}</p>
                            {item.sku && <p className="text-xs text-gray-500">SKU: {item.sku}</p>}
                          </div>
                          <div className="flex items-center gap-1">
                            {getIndustryIcon(item.industry)}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Stock</span>
                            <span className="font-semibold">{item.quantity}</span>
                          </div>
                          <Progress 
                            value={(item.quantity / (item.maxStock || item.minStock * 2)) * 100} 
                            className="h-2"
                          />
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Value</span>
                            <span className="font-semibold">${(item.quantity * item.price).toFixed(2)}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="space-y-1">
                            <Badge className={`${getStatusStyle(item.status)} border text-xs`}>
                              {item.status.replace('-', ' ')}
                            </Badge>
                            <Badge className={`${getPriorityStyle(item.priority)} border text-xs`}>
                              {item.priority}
                            </Badge>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm" className="p-2">
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm" className="p-2">
                              <Edit3 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Quick Action Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/camera')}>
            <Camera className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Camera Scanner</h3>
            <p className="text-gray-600 text-sm mb-4">Scan barcodes and capture inventory with AI-powered recognition</p>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <Scan className="w-4 h-4 mr-2" />
              Open Scanner
            </Button>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/analytics')}>
            <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
            <p className="text-gray-600 text-sm mb-4">Advanced analytics, forecasting, and business intelligence</p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Upload className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Bulk Import</h3>
            <p className="text-gray-600 text-sm mb-4">Import inventory data from CSV, Excel, or other systems</p>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <Upload className="w-4 h-4 mr-2" />
              Import Data
            </Button>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Download className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Export Reports</h3>
            <p className="text-gray-600 text-sm mb-4">Generate comprehensive reports and export in multiple formats</p>
            <Button className="w-full bg-orange-600 hover:bg-orange-700">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ComprehensiveInventorySystem;