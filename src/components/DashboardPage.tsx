/**
 * DashboardPage Component - Main Dashboard Overview
 * JSX-ready component for comprehensive system overview and quick actions
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Home, 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users, 
  DollarSign,
  BarChart3,
  Truck,
  Settings,
  Bell,
  Calendar,
  Activity,
  Target,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Filter,
  RefreshCw,
  Eye,
  ShoppingCart,
  Warehouse
} from 'lucide-react';

interface DashboardMetrics {
  inventory: {
    totalItems: number;
    lowStock: number;
    outOfStock: number;
    recentMovements: number;
  };
  financial: {
    monthlyRevenue: number;
    revenueChange: number;
    totalValue: number;
    costs: number;
  };
  operations: {
    ordersToday: number;
    fulfillmentRate: number;
    efficiency: number;
    activeUsers: number;
  };
  alerts: number;
}

interface RecentActivity {
  id: string;
  type: 'order' | 'stock' | 'alert' | 'user';
  message: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

interface DashboardPageProps {
  businessConfig?: any;
  className?: string;
}

export function DashboardPage({ businessConfig, className = '' }: DashboardPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    inventory: {
      totalItems: 1247,
      lowStock: 23,
      outOfStock: 5,
      recentMovements: 142
    },
    financial: {
      monthlyRevenue: 45280,
      revenueChange: 12.3,
      totalValue: 187640,
      costs: 32150
    },
    operations: {
      ordersToday: 28,
      fulfillmentRate: 94.2,
      efficiency: 88.5,
      activeUsers: 12
    },
    alerts: 7
  });

  const [recentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'order',
      message: 'New order #ORD-1234 received from Acme Corp',
      timestamp: '2 minutes ago',
      status: 'success'
    },
    {
      id: '2',
      type: 'stock',
      message: 'Printer paper stock level below minimum',
      timestamp: '15 minutes ago',
      status: 'warning'
    },
    {
      id: '3',
      type: 'order',
      message: 'Order #ORD-1231 shipped successfully',
      timestamp: '1 hour ago',
      status: 'success'
    },
    {
      id: '4',
      type: 'alert',
      message: 'System backup completed successfully',
      timestamp: '2 hours ago',
      status: 'info'
    },
    {
      id: '5',
      type: 'user',
      message: 'John Smith logged into the system',
      timestamp: '3 hours ago',
      status: 'info'
    }
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'order': return <ShoppingCart className="w-4 h-4" />;
      case 'stock': return <Package className="w-4 h-4" />;
      case 'alert': return <Bell className="w-4 h-4" />;
      case 'user': return <Users className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getActivityColor = (status: RecentActivity['status']) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={`dashboard-page ${className}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
            <p className="text-lg text-muted-foreground">
              Welcome back! Here's what's happening with your inventory
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Quick Add
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Alerts Section */}
      {metrics.alerts > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Alert className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-700 dark:text-yellow-300">
              You have <strong>{metrics.alerts}</strong> active alerts requiring attention.
              <Button variant="link" className="p-0 h-auto ml-2 text-yellow-700">
                View all alerts
              </Button>
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Key Metrics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {/* Total Inventory Value */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Warehouse className="w-6 h-6 text-blue-600" />
              </div>
              <Badge variant="outline" className="text-green-600 border-green-200">
                +{metrics.financial.revenueChange}%
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Inventory Value</p>
              <p className="text-3xl font-bold">{formatCurrency(metrics.financial.totalValue)}</p>
              <p className="text-sm text-green-600 flex items-center gap-1 mt-2">
                <ArrowUpRight className="w-3 h-3" />
                vs last month
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Total Items */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <Badge variant="outline">
                {metrics.inventory.recentMovements} today
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Items</p>
              <p className="text-3xl font-bold">{metrics.inventory.totalItems.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Across all categories
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Revenue */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <Badge variant="outline" className="text-green-600 border-green-200">
                +{metrics.financial.revenueChange}%
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Monthly Revenue</p>
              <p className="text-3xl font-bold">{formatCurrency(metrics.financial.monthlyRevenue)}</p>
              <p className="text-sm text-green-600 flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3" />
                Strong growth
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Fulfillment Rate */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                {metrics.operations.ordersToday} today
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Order Fulfillment</p>
              <p className="text-3xl font-bold">{metrics.operations.fulfillmentRate}%</p>
              <div className="mt-2">
                <Progress value={metrics.operations.fulfillmentRate} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Stock Status Overview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Stock Status Overview
              </CardTitle>
              <CardDescription>Current inventory health and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* In Stock */}
              <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-medium">Items in Stock</p>
                    <p className="text-sm text-muted-foreground">Good availability</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-green-600">
                  {metrics.inventory.totalItems - metrics.inventory.lowStock - metrics.inventory.outOfStock}
                </span>
              </div>

              {/* Low Stock */}
              <div className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  <div>
                    <p className="font-medium">Low Stock Items</p>
                    <p className="text-sm text-muted-foreground">Need attention</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-yellow-600">
                  {metrics.inventory.lowStock}
                </span>
              </div>

              {/* Out of Stock */}
              <div className="flex items-center justify-between p-4 border rounded-lg bg-red-50 dark:bg-red-950/20">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  <div>
                    <p className="font-medium">Out of Stock</p>
                    <p className="text-sm text-muted-foreground">Immediate action needed</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-red-600">
                  {metrics.inventory.outOfStock}
                </span>
              </div>

              <div className="pt-4">
                <Button className="w-full" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  View Detailed Inventory
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest system events and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <AnimatePresence>
                  {recentActivity.slice(0, 5).map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className={`p-1 rounded-full ${getActivityColor(activity.status)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              <div className="pt-4">
                <Button className="w-full" variant="outline">
                  <Clock className="w-4 h-4 mr-2" />
                  View All Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-blue-50 dark:hover:bg-blue-950/20">
                <Package className="w-6 h-6 text-blue-600" />
                <span className="text-sm">Add Item</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-green-50 dark:hover:bg-green-950/20">
                <ShoppingCart className="w-6 h-6 text-green-600" />
                <span className="text-sm">New Order</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-purple-50 dark:hover:bg-purple-950/20">
                <BarChart3 className="w-6 h-6 text-purple-600" />
                <span className="text-sm">Analytics</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-orange-50 dark:hover:bg-orange-950/20">
                <Truck className="w-6 h-6 text-orange-600" />
                <span className="text-sm">Suppliers</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-red-50 dark:hover:bg-red-950/20">
                <Bell className="w-6 h-6 text-red-600" />
                <span className="text-sm">Alerts</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-gray-50 dark:hover:bg-gray-950/20">
                <Settings className="w-6 h-6 text-gray-600" />
                <span className="text-sm">Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default DashboardPage;