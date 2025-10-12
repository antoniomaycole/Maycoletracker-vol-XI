/**
 * Inventory Management
 */

import React, { useState, useEffect } from 'react';
import { useToast } from './ui/ToastProvider';
import UniversalBackButton from './UniversalBackButton';
import MaycoleTrackerBrand from './MaycoleTrackerBrand';
import { useNavigate } from 'react-router-dom';
import { 
  Package, Plus, Search, Filter, Camera, Mic, QrCode, Calendar, Clock, 
  Edit3, Trash2, ArrowLeft, Save, Building2, Tag, DollarSign, MapPin,
  AlertCircle, CheckCircle, TrendingUp, Users, BarChart3, Settings
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalValue: number;
  location: string;
  supplier: string;
  dateAdded: string;
  lastUpdated: string;
  expiryDate?: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'expired';
  industry: string;
  barcode?: string;
  description?: string;
  minStockLevel: number;
}

const INDUSTRIES = [
  { id: 'healthcare', name: 'Healthcare', icon: '🏥' },
  { id: 'restaurant', name: 'Restaurant', icon: '🍽️' },
  { id: 'construction', name: 'Construction', icon: '🔨' },
  { id: 'retail', name: 'Retail', icon: '🛍️' },
  { id: 'manufacturing', name: 'Manufacturing', icon: '🏭' },
  { id: 'hospitality', name: 'Hospitality', icon: '🏨' },
  { id: 'education', name: 'Education', icon: '🎓' },
  { id: 'automotive', name: 'Automotive', icon: '🚗' }
];

const CATEGORIES = {
  healthcare: ['Medical Supplies', 'Pharmaceuticals', 'Equipment', 'PPE', 'Consumables'],
  restaurant: ['Food Items', 'Beverages', 'Kitchen Supplies', 'Cleaning', 'Disposables'],
  construction: ['Tools', 'Materials', 'Safety Equipment', 'Hardware', 'Machinery'],
  retail: ['Clothing', 'Electronics', 'Home & Garden', 'Books', 'Sports'],
  manufacturing: ['Raw Materials', 'Components', 'Tools', 'Safety', 'Packaging'],
  hospitality: ['Linens', 'Amenities', 'Food & Beverage', 'Cleaning', 'Furniture'],
  education: ['Supplies', 'Books', 'Technology', 'Furniture', 'Sports Equipment'],
  automotive: ['Parts', 'Fluids', 'Tools', 'Tires', 'Accessories']
};

export default function InventoryPage() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedIndustry, setSelectedIndustry] = useState('healthcare');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'Surgical Masks N95',
      category: 'PPE',
      quantity: 500,
      unitPrice: 2.50,
      totalValue: 1250.00,
      location: 'Storage Room A-1',
      supplier: 'MedSupply Corp',
      dateAdded: '2024-01-15T09:30:00Z',
      lastUpdated: '2024-01-15T09:30:00Z',
      expiryDate: '2026-01-15T00:00:00Z',
      status: 'in-stock',
      industry: 'healthcare',
      barcode: '1234567890123',
      description: 'N95 respiratory protection masks',
      minStockLevel: 100
    },
    {
      id: '2',
      name: 'Organic Tomatoes',
      category: 'Food Items',
      quantity: 25,
      unitPrice: 3.99,
      totalValue: 99.75,
      location: 'Walk-in Cooler',
      supplier: 'Fresh Farm Produce',
      dateAdded: '2024-01-14T14:20:00Z',
      lastUpdated: '2024-01-14T14:20:00Z',
      expiryDate: '2024-01-20T00:00:00Z',
      status: 'low-stock',
      industry: 'restaurant',
      description: 'Fresh organic Roma tomatoes',
      minStockLevel: 50
    }
  ]);

  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    name: '',
    category: '',
    quantity: 0,
    unitPrice: 0,
    location: '',
    supplier: '',
    description: '',
    minStockLevel: 10,
    industry: selectedIndustry,
    status: 'in-stock'
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAddItem = () => {
    const toast = useToast?.();
    if (!newItem.name || !newItem.category || !newItem.quantity) {
      if (toast) toast.push('Please fill in all required fields');
      else console.warn('Please fill in all required fields');
      return;
    }

    const item: InventoryItem = {
      id: Date.now().toString(),
      name: newItem.name!,
      category: newItem.category!,
      quantity: newItem.quantity!,
      unitPrice: newItem.unitPrice || 0,
      totalValue: (newItem.quantity || 0) * (newItem.unitPrice || 0),
      location: newItem.location || 'Default Location',
      supplier: newItem.supplier || 'Unknown Supplier',
      dateAdded: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      status: newItem.quantity! > newItem.minStockLevel! ? 'in-stock' : 'low-stock',
      industry: selectedIndustry,
      description: newItem.description,
      minStockLevel: newItem.minStockLevel || 10
    };

    setInventoryItems([...inventoryItems, item]);
    setNewItem({
      name: '',
      category: '',
      quantity: 0,
      unitPrice: 0,
      location: '',
      supplier: '',
      description: '',
      minStockLevel: 10,
      industry: selectedIndustry,
      status: 'in-stock'
    });
    setIsAddingItem(false);
  };

  const startVoiceRecognition = () => {
    setIsVoiceActive(true);
    // Simulated voice recognition
    setTimeout(() => {
      setIsVoiceActive(false);
      const toast = useToast?.();
      const msg = 'Voice command: "Add new surgical gloves, quantity 200, supplier MedCorp"';
      if (toast) toast.push(msg);
      else console.info(msg);
    }, 3000);
  };

  const openCamera = () => {
    navigate('/camera');
  };

  const openScanner = () => {
    navigate('/scanner-module');
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesIndustry = item.industry === selectedIndustry;
    
    return matchesSearch && matchesCategory && matchesIndustry;
  });

    const handleEditItem = (id: string) => {
      navigate(`/inventory/edit/${id}`);
    };

    const handleReceiveStock = (id: string) => {
      navigate(`/inventory/receive/${id}`);
    };

    const handleConsumeStock = (id: string) => {
      navigate(`/inventory/consume/${id}`);
    };

    const handleDeleteItem = (id: string) => {
      if (!confirm('Delete this item? This action cannot be undone.')) return;
      setInventoryItems((prev) => prev.filter((it) => it.id !== id));
    };

  const industryStats = {
    totalItems: filteredItems.length,
    totalValue: filteredItems.reduce((sum, item) => sum + item.totalValue, 0),
    lowStockItems: filteredItems.filter(item => item.status === 'low-stock').length,
    outOfStockItems: filteredItems.filter(item => item.status === 'out-of-stock').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-green-500';
      case 'low-stock': return 'bg-yellow-500';
      case 'out-of-stock': return 'bg-red-500';
      case 'expired': return 'bg-red-600';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="purple-background min-h-screen">
      <div className="relative z-10 px-4 py-6">

        {/* Universal Back Button */}
        <UniversalBackButton />
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => navigate('/main')}
              className="btn-on-dark flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
            
            <div className="text-right text-white/80">
              <div className="text-sm font-medium">
                {currentTime.toLocaleDateString()}
              </div>
              <div className="text-xs opacity-70">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Title and Industry Selector */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <MaycoleTrackerBrand
                fontSize={28}
                compact={true}
                clickable={false}
              />
              Inventory Management System
            </h1>
            <p className="text-white/70 mb-6">Multi-Industry Product Tracking with Real-Time Analytics</p>
            
            {/* Industry Selector */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {INDUSTRIES.map((industry) => (
                <button
                  key={industry.id}
                  onClick={() => setSelectedIndustry(industry.id)}
                  className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                    selectedIndustry === industry.id
                      ? 'bg-white/20 border-white/40 text-white'
                      : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/15'
                  }`}
                >
                  <span className="mr-2">{industry.icon}</span>
                  {industry.name}
                </button>
              ))}
            </div>
          </div>

          {/* Industry Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/10 border-white/20 backdrop-blur-lg">
              <CardContent className="p-4 text-center">
                <Package className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{industryStats.totalItems}</div>
                <div className="text-white/70 text-sm">Total Items</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 backdrop-blur-lg">
              <CardContent className="p-4 text-center">
                <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">${industryStats.totalValue.toFixed(2)}</div>
                <div className="text-white/70 text-sm">Total Value</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 backdrop-blur-lg">
              <CardContent className="p-4 text-center">
                <AlertCircle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{industryStats.lowStockItems}</div>
                <div className="text-white/70 text-sm">Low Stock</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 backdrop-blur-lg">
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{industryStats.outOfStockItems}</div>
                <div className="text-white/70 text-sm">Out of Stock</div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Button
              onClick={() => setIsAddingItem(true)}
              className="btn-on-dark h-16 flex flex-col items-center justify-center space-y-1"
            >
              <Plus className="w-6 h-6" />
              <span className="text-sm">Add Product</span>
            </Button>
            <Button
              onClick={openCamera}
              className="btn-on-dark h-16 flex flex-col items-center justify-center space-y-1"
            >
              <Camera className="w-6 h-6" />
              <span className="text-sm">Camera Capture</span>
            </Button>
            <Button
              onClick={openScanner}
              className="btn-on-dark h-16 flex flex-col items-center justify-center space-y-1"
            >
              <QrCode className="w-6 h-6" />
              <span className="text-sm">Barcode Scanner</span>
            </Button>
            <Button
              onClick={startVoiceRecognition}
              className={`btn-on-dark h-16 flex flex-col items-center justify-center space-y-1 ${
                isVoiceActive ? 'bg-red-500/30 animate-pulse' : ''
              }`}
            >
              <Mic className="w-6 h-6" />
              <span className="text-sm">{isVoiceActive ? 'Listening...' : 'Voice Control'}</span>
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </div>
              <select
                value={filterCategory}
                aria-label="Filter category"
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              >
                <option value="all">All Categories</option>
                {CATEGORIES[selectedIndustry as keyof typeof CATEGORIES]?.map((category) => (
                  <option key={category} value={category} className="text-black">
                    {category}
                  </option>
                ))}
              </select>
              <Button
                onClick={() => navigate('/analytics')}
                className="btn-on-dark flex items-center justify-center space-x-2"
              >
                <BarChart3 className="w-4 h-4" />
                <span>View Analytics</span>
              </Button>
            </div>
          </div>

          {/* Add Item Form */}
          {isAddingItem && (
            <Card className="bg-white/10 border-white/20 backdrop-blur-lg mb-8">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add New Product</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Product Name *"
                    value={newItem.name || ''}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder-white/50"
                  />
                  <select
                    aria-label="New product category"
                    value={newItem.category || ''}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  >
                    <option value="">Select Category *</option>
                    {CATEGORIES[selectedIndustry as keyof typeof CATEGORIES]?.map((category) => (
                      <option key={category} value={category} className="text-black">
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    type="number"
                    placeholder="Quantity *"
                    value={newItem.quantity || ''}
                    onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 0 })}
                    className="bg-white/10 border-white/20 text-white placeholder-white/50"
                  />
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Unit Price"
                    value={newItem.unitPrice || ''}
                    onChange={(e) => setNewItem({ ...newItem, unitPrice: parseFloat(e.target.value) || 0 })}
                    className="bg-white/10 border-white/20 text-white placeholder-white/50"
                  />
                  <Input
                    type="number"
                    placeholder="Min Stock Level"
                    value={newItem.minStockLevel || ''}
                    onChange={(e) => setNewItem({ ...newItem, minStockLevel: parseInt(e.target.value) || 10 })}
                    className="bg-white/10 border-white/20 text-white placeholder-white/50"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Location"
                    value={newItem.location || ''}
                    onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder-white/50"
                  />
                  <Input
                    placeholder="Supplier"
                    value={newItem.supplier || ''}
                    onChange={(e) => setNewItem({ ...newItem, supplier: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder-white/50"
                  />
                </div>
                
                <Input
                  placeholder="Description"
                  value={newItem.description || ''}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
                
                <div className="flex space-x-4">
                  <Button onClick={handleAddItem} className="btn-primary flex items-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>Save Product</span>
                  </Button>
                  <Button 
                    onClick={() => setIsAddingItem(false)} 
                    className="btn-on-dark"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Inventory Items */}
          <div className="space-y-4">
            <h3 className="text-white text-xl font-semibold mb-4">
              {INDUSTRIES.find(i => i.id === selectedIndustry)?.name} Inventory ({filteredItems.length} items)
            </h3>
            
            {filteredItems.map((item) => (
              <Card key={item.id} className="bg-white/10 border-white/20 backdrop-blur-lg">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-2">{item.name}</h4>
                      <Badge className={`${getStatusColor(item.status)} text-white`}>
                        {item.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                      <p className="text-white/70 text-sm mt-2">{item.description}</p>
                    </div>
                    
                    <div>
                      <div className="text-white/70 text-sm">Category</div>
                      <div className="text-white font-medium">{item.category}</div>
                      <div className="text-white/70 text-sm mt-2">Location</div>
                      <div className="text-white font-medium">{item.location}</div>
                    </div>
                    
                    <div>
                      <div className="text-white/70 text-sm">Quantity</div>
                      <div className="text-white font-medium text-xl">{item.quantity}</div>
                      <div className="text-white/70 text-sm mt-2">Unit Price</div>
                      <div className="text-white font-medium">${item.unitPrice.toFixed(2)}</div>
                    </div>
                    
                    <div>
                      <div className="text-white/70 text-sm">Total Value</div>
                      <div className="text-white font-bold text-xl">${item.totalValue.toFixed(2)}</div>
                      <div className="text-white/70 text-sm mt-2">Added</div>
                      <div className="text-white font-medium text-sm">
                        {new Date(item.dateAdded).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                      <div className="text-white/70">
                        <Clock className="w-4 h-4 inline mr-1" />
                        Updated: {new Date(item.lastUpdated).toLocaleString()}
                      </div>
                      <div className="text-white/70">
                        <Building2 className="w-4 h-4 inline mr-1" />
                        Supplier: {item.supplier}
                      </div>
                      <div className="text-white/70">
                        <Tag className="w-4 h-4 inline mr-1" />
                        Min Stock: {item.minStockLevel}
                      </div>
                    </div>
                  </div>
                    <div className="mt-4 flex items-center justify-end gap-2">
                      <Button onClick={() => handleEditItem(item.id)} className="btn-on-dark px-3 py-1">
                        <Edit3 className="w-4 h-4 inline mr-1" /> Edit
                      </Button>
                      <Button onClick={() => handleReceiveStock(item.id)} className="btn-on-dark px-3 py-1">
                        Receive
                      </Button>
                      <Button onClick={() => handleConsumeStock(item.id)} className="btn-on-dark px-3 py-1">
                        Consume
                      </Button>
                      <Button onClick={() => handleDeleteItem(item.id)} className="btn-on-dark px-3 py-1">
                        <Trash2 className="w-4 h-4 inline mr-1" /> Delete
                      </Button>
                    </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <Card className="bg-white/10 border-white/20 backdrop-blur-lg">
              <CardContent className="p-12 text-center">
                <Package className="w-16 h-16 text-white/50 mx-auto mb-4" />
                <h3 className="text-white text-xl font-semibold mb-2">No items found</h3>
                <p className="text-white/70">
                  Add your first product to get started with inventory tracking.
                </p>
                <Button 
                  onClick={() => setIsAddingItem(true)}
                  className="btn-primary mt-4"
                >
                  Add First Product
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}