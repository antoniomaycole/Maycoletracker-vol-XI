/**
 * SuppliesPage Component - MAYCOLETracker™ Volume XI Enterprise Edition
 * Professional Inventory Management System - Supply Chain Module
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Package2, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  Download,
  Upload,
  BarChart3,
  Calendar,
  MapPin,
  DollarSign,
  Home,
  ArrowLeft,
  QrCode,
  Brain
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Supply {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  unit: string;
  cost: number;
  supplier: string;
  lastOrdered: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'on_order';
  location: string;
  expiryDate?: string;
  notes?: string;
}

interface SuppliesPageProps {
  businessConfig?: any;
  className?: string;
}

export function SuppliesPage({ businessConfig, className = '' }: SuppliesPageProps) {
  const navigate = useNavigate();
  const [supplies, setSupplies] = useState<Supply[]>([
    {
      id: '1',
      name: 'Office Paper A4',
      category: 'Office Supplies',
      currentStock: 150,
      minimumStock: 50,
      maximumStock: 500,
      unit: 'reams',
      cost: 4.99,
      supplier: 'Office Depot',
      lastOrdered: '2024-01-15',
      status: 'in_stock',
      location: 'Storage Room A',
      notes: 'White 80gsm paper'
    },
    {
      id: '2',
      name: 'Printer Ink Cartridges',
      category: 'Technology',
      currentStock: 8,
      minimumStock: 15,
      maximumStock: 50,
      unit: 'units',
      cost: 29.99,
      supplier: 'TechSupply Co',
      lastOrdered: '2024-01-10',
      status: 'low_stock',
      location: 'IT Storage',
      notes: 'Black ink cartridges for HP printers'
    },
    {
      id: '3',
      name: 'Coffee Beans',
      category: 'Kitchen Supplies',
      currentStock: 0,
      minimumStock: 10,
      maximumStock: 100,
      unit: 'lbs',
      cost: 12.99,
      supplier: 'Coffee Direct',
      lastOrdered: '2024-01-08',
      status: 'out_of_stock',
      location: 'Kitchen Pantry',
      expiryDate: '2024-06-30'
    },
    {
      id: '4',
      name: 'Cleaning Supplies Kit',
      category: 'Maintenance',
      currentStock: 25,
      minimumStock: 10,
      maximumStock: 50,
      unit: 'kits',
      cost: 15.99,
      supplier: 'CleanCorp',
      lastOrdered: '2024-01-12',
      status: 'on_order',
      location: 'Janitor Closet',
      notes: 'Includes disinfectant, paper towels, gloves'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentTab, setCurrentTab] = useState('overview');

  // Filter supplies based on search and category
  const filteredSupplies = supplies.filter(supply => {
    const matchesSearch = supply.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supply.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || supply.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate statistics
  const stats = {
    totalSupplies: supplies.length,
    lowStock: supplies.filter(s => s.status === 'low_stock').length,
    outOfStock: supplies.filter(s => s.status === 'out_of_stock').length,
    onOrder: supplies.filter(s => s.status === 'on_order').length,
    totalValue: supplies.reduce((sum, supply) => sum + (supply.currentStock * supply.cost), 0)
  };

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(supplies.map(s => s.category)))];

  const getStatusColor = (status: Supply['status']) => {
    switch (status) {
      case 'in_stock': return 'bg-green-500';
      case 'low_stock': return 'bg-yellow-500';
      case 'out_of_stock': return 'bg-red-500';
      case 'on_order': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: Supply['status']) => {
    switch (status) {
      case 'in_stock': return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'low_stock': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'out_of_stock': return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'on_order': return <Clock className="w-4 h-4 text-blue-600" />;
      default: return <Package2 className="w-4 h-4" />;
    }
  };

  const getStockPercentage = (supply: Supply) => {
    return (supply.currentStock / supply.maximumStock) * 100;
  };

  return (
    <div className={`supplies-page min-h-screen bg-background ${className}`}>
      {/* Navigation Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              size="sm"
              className="btn-on-dark"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button 
              onClick={() => navigate('/main')}
              variant="outline"
              size="sm"
              className="btn-on-dark"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </div>
          <div className="nav-button-grid">
            <Button 
              onClick={() => navigate('/analytics')}
              variant="outline"
              size="sm"
              className="btn-on-dark"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              <span className="text-xs">Analytics</span>
            </Button>
            <Button 
              onClick={() => navigate('/scanner')}
              variant="outline"
              size="sm"
              className="btn-on-dark"
            >
              <QrCode className="w-4 h-4 mr-2" />
              <span className="text-xs">Scanner</span>
            </Button>
            <Button 
              onClick={() => navigate('/ai')}
              variant="outline"
              size="sm"
              className="btn-on-dark"
            >
              <Brain className="w-4 h-4 mr-2" />
              <span className="text-xs">AI Insights</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MAYCOLETracker™ Inventory
              </h1>
              <p className="text-lg text-muted-foreground">
                Volume XI — Professional Supply Chain Management
              </p>
            </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Supply
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Package2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Supplies</p>
                <p className="text-2xl font-bold">{stats.totalSupplies}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.lowStock}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">On Order</p>
                <p className="text-2xl font-bold text-blue-600">{stats.onOrder}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold text-green-600">${stats.totalValue.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Alerts Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Alerts & Notifications</h3>
            <div className="grid gap-4">
              {stats.outOfStock > 0 && (
                <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700 dark:text-red-300">
                    <strong>{stats.outOfStock}</strong> supplies are completely out of stock and need immediate restocking.
                  </AlertDescription>
                </Alert>
              )}
              
              {stats.lowStock > 0 && (
                <Alert className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-700 dark:text-yellow-300">
                    <strong>{stats.lowStock}</strong> supplies are running low and should be reordered soon.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common supply management tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Plus className="w-6 h-6" />
                  Add Supply
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Truck className="w-6 h-6" />
                  Create Order
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <BarChart3 className="w-6 h-6" />
                  View Reports
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Calendar className="w-6 h-6" />
                  Schedule Delivery
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search supplies or suppliers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border rounded-md bg-background"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Supplies List */}
          <div className="grid gap-4">
            <AnimatePresence>
              {filteredSupplies.map((supply, index) => (
                <motion.div
                  key={supply.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(supply.status)}
                          <div>
                            <h3 className="font-semibold">{supply.name}</h3>
                            <p className="text-sm text-muted-foreground">{supply.category}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline"
                            className={`${getStatusColor(supply.status)} text-white border-transparent`}
                          >
                            {supply.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Current Stock</p>
                          <p className="font-semibold">{supply.currentStock} {supply.unit}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Min Stock</p>
                          <p className="font-semibold">{supply.minimumStock} {supply.unit}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Cost</p>
                          <p className="font-semibold">${supply.cost}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Supplier</p>
                          <p className="font-semibold">{supply.supplier}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Stock Level</span>
                          <span>{getStockPercentage(supply).toFixed(1)}%</span>
                        </div>
                        <Progress 
                          value={getStockPercentage(supply)} 
                          className="h-2"
                        />
                      </div>

                      {supply.location && (
                        <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {supply.location}
                        </div>
                      )}

                      {supply.notes && (
                        <p className="text-sm text-muted-foreground mt-2 italic">
                          {supply.notes}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Track your supply orders and deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supplies.filter(s => s.status === 'on_order').map(supply => (
                  <div key={supply.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">{supply.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Ordered from {supply.supplier} on {supply.lastOrdered}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      In Transit
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Supply Trends</CardTitle>
                <CardDescription>Usage patterns over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4" />
                    <p>Chart visualization would go here</p>
                    <p className="text-sm">Showing usage trends and forecasting</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Analysis</CardTitle>
                <CardDescription>Spending breakdown by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories.slice(1).map(category => {
                    const categorySupplies = supplies.filter(s => s.category === category);
                    const totalCost = categorySupplies.reduce((sum, s) => sum + (s.currentStock * s.cost), 0);
                    const percentage = (totalCost / stats.totalValue) * 100;
                    
                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{category}</span>
                          <span>${totalCost.toFixed(2)} ({percentage.toFixed(1)}%)</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}

export default SuppliesPage;