/**
 * MaycoleTracker™ vol. XI - Enterprise Edition
 * Inventory Dashboard - Main Interface
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Package, AlertCircle, TrendingUp, Search, Filter, Mic, Settings, Building2, Camera, Scan, BarChart3 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import UniversalBackButton from './UniversalBackButton';

interface InventoryItem {
  id: string;
  item: string; // Using 'item' to match your original structure
  quantity: number;
  category?: string;
  minStock?: number;
  price?: number;
  location?: string;
  lastUpdated?: string;
  status?: 'in-stock' | 'low-stock' | 'out-of-stock';
}

// Your original inventory data + additional items
const initialInventoryData: InventoryItem[] = [
  {
    id: '1',
    item: 'Tomatoes',
    quantity: 2,
    category: 'Produce',
    minStock: 5,
    price: 3.99,
    location: 'Refrigerator A',
    lastUpdated: '2024-01-15',
    status: 'low-stock'
  },
  {
    id: '2',
    item: 'Car Battery',
    quantity: 4,
    category: 'Automotive',
    minStock: 2,
    price: 89.99,
    location: 'Garage Storage',
    lastUpdated: '2024-01-14',
    status: 'in-stock'
  },
  {
    id: '3',
    item: 'Office Chairs',
    quantity: 45,
    category: 'Furniture',
    minStock: 10,
    price: 299.99,
    location: 'Warehouse A',
    lastUpdated: '2024-01-13',
    status: 'in-stock'
  },
  {
    id: '4',
    item: 'Printer Paper',
    quantity: 3,
    category: 'Supplies',
    minStock: 20,
    price: 12.99,
    location: 'Storage Room B',
    lastUpdated: '2024-01-12',
    status: 'low-stock'
  }
];

const InventoryDashboard = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventoryData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);

  // Voice synthesis function (your original functionality)
  const speak = (text: string) => {
    if (!isVoiceEnabled) return;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  // Check for low stock and announce (your original functionality)
  useEffect(() => {
    if (isVoiceEnabled) {
      inventory.forEach(({ item, quantity }) => {
        if (quantity < 5) {
          speak(`${item} is low. Only ${quantity} in stock. Time to order.`);
        }
      });
    }
  }, [inventory, isVoiceEnabled]);

  // Auto-determine status based on quantity
  const getItemStatus = (quantity: number, minStock: number = 5): 'in-stock' | 'low-stock' | 'out-of-stock' => {
    if (quantity === 0) return 'out-of-stock';
    if (quantity < minStock) return 'low-stock';
    return 'in-stock';
  };

  // Filter inventory based on search and category
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || (item.category && item.category.toLowerCase() === selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = ['all', ...Array.from(new Set(inventory.map(item => item.category).filter(Boolean)))];

  // Calculate metrics
  const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockItems = inventory.filter(item => getItemStatus(item.quantity, item.minStock || 5) === 'low-stock').length;
  const outOfStockItems = inventory.filter(item => getItemStatus(item.quantity, item.minStock || 5) === 'out-of-stock').length;
  const totalValue = inventory.reduce((sum, item) => sum + (item.quantity * (item.price || 0)), 0);

  // Status color helper
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'text-green-600 bg-green-100';
      case 'low-stock': return 'text-yellow-600 bg-yellow-100';
      case 'out-of-stock': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Package className="w-8 h-8" />
                MaycoleTracker™ Inventory Dashboard
              </h1>
              <p className="text-blue-100 mt-2">
                Complete inventory management with voice alerts for your business operations
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                className={`${isVoiceEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'} text-white`}
              >
                <Mic className="w-4 h-4 mr-2" />
                Voice {isVoiceEnabled ? 'ON' : 'OFF'}
              </Button>
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                <Plus className="w-4 h-4 mr-2" />
                Add New Item
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Universal Back Button */}
        <UniversalBackButton customBackPath="/logo" showHomeOption={true} />
        
        {/* Dashboard Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-600">{lowStockItems}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">{outOfStockItems}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-green-600">${totalValue.toFixed(2)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Inventory Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Item Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Quantity</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Price</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => {
                  const currentStatus = getItemStatus(item.quantity, item.minStock);
                  return (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{item.item}</td>
                      <td className="py-3 px-4 text-gray-600">{item.category || 'General'}</td>
                      <td className="py-3 px-4 text-gray-900">{item.quantity}</td>
                      <td className="py-3 px-4 text-gray-900">{item.price ? `$${item.price}` : 'N/A'}</td>
                      <td className="py-3 px-4 text-gray-600">{item.location || 'Storage'}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(currentStatus)}`}>
                          {currentStatus.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <Camera className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Camera Scanner</h3>
            <p className="text-gray-600 mb-4 text-sm">Scan barcodes and capture inventory</p>
            <Button 
              onClick={() => navigate('/camera')}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <Scan className="w-4 h-4 mr-2" />
              Open Scanner
            </Button>
          </Card>

          <Card className="p-6 text-center">
            <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Reports</h3>
            <p className="text-gray-600 mb-4 text-sm">View analytics and generate reports</p>
            <Button 
              onClick={() => navigate('/analytics')}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </Card>

          <Card className="p-6 text-center">
            <Package className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Add New Item</h3>
            <p className="text-gray-600 mb-4 text-sm">Quick add new inventory items</p>
            <Button className="w-full">Add Item</Button>
          </Card>

          <Card className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Set Alerts</h3>
            <p className="text-gray-600 mb-4 text-sm">Configure low stock alerts</p>
            <Button variant="outline" className="w-full">Manage Alerts</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;