/**
 * MaycoleTracker™ Analytics Dashboard
 * Professional analytics with enterprise-grade insights and reporting
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useUser } from '../contexts/UserContext';
import { PremiumFeatureGuard } from './PremiumFeatureGuard';
import { ProBadge } from './ProBadge';
import { MaycoleTrackerLogo } from './MaycoleTrackerLogo';

// UI Components
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

// Icons
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Package,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Crown,
  Users,
  ShoppingCart,
  Target,
  Activity
} from 'lucide-react';

// Mock analytics data
const mockAnalytics = {
  overview: {
    totalValue: 15840.50,
    totalItems: 247,
    lowStockItems: 12,
    criticalItems: 3,
    monthlyTrend: 8.5,
    weeklyUsage: 156,
    costSavings: 2340.00,
    efficiency: 94.2
  },
  trends: [
    { month: 'Jan', inventory: 220, usage: 180, cost: 12400 },
    { month: 'Feb', inventory: 235, usage: 195, cost: 13200 },
    { month: 'Mar', inventory: 247, usage: 210, cost: 15840 },
    { month: 'Apr', inventory: 250, usage: 225, cost: 16200 },
    { month: 'May', inventory: 245, usage: 240, cost: 15600 },
    { month: 'Jun', inventory: 260, usage: 255, cost: 17800 }
  ],
  categories: [
    { name: 'Office Supplies', value: 45, cost: 4200, trend: 5.2 },
    { name: 'Health & Safety', value: 28, cost: 3100, trend: -2.1 },
    { name: 'Cleaning Supplies', value: 32, cost: 2800, trend: 8.9 },
    { name: 'Equipment', value: 18, cost: 5740, trend: 12.3 }
  ],
  topSuppliers: [
    { name: 'Office Depot', orders: 23, cost: 4200, reliability: 98.5 },
    { name: 'Safety First Inc', orders: 15, cost: 3100, reliability: 95.2 },
    { name: 'CleanCorp', orders: 18, cost: 2800, reliability: 92.1 },
    { name: 'Equipment Plus', orders: 12, cost: 5740, reliability: 89.7 }
  ],
  recentActivity: [
    { type: 'restock', item: 'Office Paper', quantity: 50, timestamp: '2 hours ago' },
    { type: 'low-stock', item: 'Hand Sanitizer', quantity: 8, timestamp: '4 hours ago' },
    { type: 'order', item: 'Industrial Gloves', quantity: 25, timestamp: '1 day ago' },
    { type: 'critical', item: 'Cleaning Chemicals', quantity: 2, timestamp: '2 days ago' }
  ]
};

const AnalyticsDashboard = () => {
  const { user, isPremium, hasFeature, logUsage } = useUser();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [activeTab, setActiveTab] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Log usage
  useEffect(() => {
    logUsage({
      userId: user?.id || 'anonymous',
      feature: 'Analytics_Dashboard',
      timestamp: Date.now(),
    });
  }, [user, logUsage]);

  // Refresh data simulation
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  // Get trend icon and color
  const getTrendIndicator = (trend: number) => {
    if (trend > 0) {
      return { icon: <TrendingUp className="w-4 h-4" />, color: 'text-green-600' };
    } else if (trend < 0) {
      return { icon: <TrendingDown className="w-4 h-4" />, color: 'text-red-600' };
    }
    return { icon: <Activity className="w-4 h-4" />, color: 'text-gray-600' };
  };

  // Get activity icon
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'restock': return <Package className="w-4 h-4 text-green-600" />;
      case 'low-stock': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'order': return <ShoppingCart className="w-4 h-4 text-blue-600" />;
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-6 h-6 text-primary" />
                <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
                <ProBadge variant="premium" size="small" icon="crown" text="Premium" />
              </div>
              <p className="text-muted-foreground">
                Visualize trends, usage, and operational metrics with professional insights
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select 
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-sm"
                >
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                  <option value="quarter">Last 3 Months</option>
                  <option value="year">Last Year</option>
                </select>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              
              <Button className="btn-primary">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0 }}
              >
                <Card className="card-accent-blue">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Value</p>
                        <p className="text-2xl font-bold">{formatCurrency(mockAnalytics.overview.totalValue)}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <TrendingUp className="w-3 h-3 text-green-600" />
                          <span className="text-xs text-green-600">+{mockAnalytics.overview.monthlyTrend}%</span>
                        </div>
                      </div>
                      <DollarSign className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="card-accent-green">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Items</p>
                        <p className="text-2xl font-bold">{mockAnalytics.overview.totalItems}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span className="text-xs text-muted-foreground">Active</span>
                        </div>
                      </div>
                      <Package className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="card-accent-orange">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Low Stock</p>
                        <p className="text-2xl font-bold text-yellow-600">{mockAnalytics.overview.lowStockItems}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <AlertTriangle className="w-3 h-3 text-yellow-600" />
                          <span className="text-xs text-yellow-600">Attention</span>
                        </div>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="card-accent-purple">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Efficiency</p>
                        <p className="text-2xl font-bold">{mockAnalytics.overview.efficiency}%</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Target className="w-3 h-3 text-purple-600" />
                          <span className="text-xs text-muted-foreground">Excellent</span>
                        </div>
                      </div>
                      <Target className="w-8 h-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Trends</CardTitle>
                  <CardDescription>Monthly inventory levels and usage patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed border-muted">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Interactive Chart</p>
                      <p className="text-sm text-muted-foreground">Real-time inventory trends visualization</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Category Distribution</CardTitle>
                  <CardDescription>Inventory breakdown by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed border-muted">
                    <div className="text-center">
                      <Package className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Pie Chart</p>
                      <p className="text-sm text-muted-foreground">Category-wise distribution analysis</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest inventory movements and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalytics.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <p className="font-medium">{activity.item}</p>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {activity.quantity} • {activity.timestamp}
                        </p>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {activity.type.replace('-', ' ')}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Historical Trends</CardTitle>
                <CardDescription>6-month inventory and cost analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed border-muted">
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground">Advanced Trend Analysis</p>
                    <p className="text-muted-foreground">Interactive charts with forecasting</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockAnalytics.categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {category.name}
                        <div className="flex items-center gap-1">
                          {getTrendIndicator(category.trend).icon}
                          <span className={`text-sm ${getTrendIndicator(category.trend).color}`}>
                            {category.trend > 0 ? '+' : ''}{category.trend}%
                          </span>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Items:</span>
                          <span className="font-semibold">{category.value}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Cost:</span>
                          <span className="font-semibold">{formatCurrency(category.cost)}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 mt-3">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(category.value / 50) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Suppliers Tab */}
          <TabsContent value="suppliers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Suppliers</CardTitle>
                <CardDescription>Performance metrics and reliability scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalytics.topSuppliers.map((supplier, index) => (
                    <motion.div
                      key={supplier.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/20"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{supplier.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {supplier.orders} orders • {formatCurrency(supplier.cost)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Reliability:</span>
                          <Badge variant={supplier.reliability > 95 ? 'default' : 'secondary'}>
                            {supplier.reliability}%
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Premium Features Section */}
        <PremiumFeatureGuard feature="advanced_analytics">
          <Card className="mt-6 border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-purple-600" />
                Advanced Analytics Features
              </CardTitle>
              <CardDescription>
                Enterprise-grade analytics with AI-powered insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border">
                  <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold">Predictive Analytics</h4>
                  <p className="text-sm text-muted-foreground">AI-powered demand forecasting</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold">Trend Analysis</h4>
                  <p className="text-sm text-muted-foreground">Advanced pattern recognition</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold">Custom Reports</h4>
                  <p className="text-sm text-muted-foreground">Tailored business insights</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </PremiumFeatureGuard>

        {/* Usage Tracking Display */}
        <div className="mt-6 text-center">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            ✅ You're experiencing the full MaycoleTracker™ suite. Premium features are open during launch phase.
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;