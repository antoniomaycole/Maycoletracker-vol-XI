/**
 * MaycoleTracker™ Volume XI - Automated Ordering System
 * Revolutionary automated purchasing with supplier integration
 * Features: Auto-ordering, supplier management, purchase optimization, order tracking
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ShoppingCart, Truck, Building2, CheckCircle, AlertTriangle,
  Clock, DollarSign, Package, Users, Zap, Brain, Target, Award, Shield,
  Calendar, Phone, Mail, MapPin, CreditCard, Settings, Download, RefreshCw,
  PlayCircle, PauseCircle, Edit3, Save, X, Plus, Minus, Star, TrendingUp
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  rating: number;
  reliability: number;
  averageDeliveryTime: number; // days
  paymentTerms: string;
  minimumOrder: number;
  bulkDiscounts: Array<{
    quantity: number;
    discount: number;
  }>;
  specialties: string[];
  certifications: string[];
  lastOrderDate: string;
  totalOrderValue: number;
  isPreferred: boolean;
  autoOrderEnabled: boolean;
  orderingMethod: 'api' | 'email' | 'phone' | 'portal';
  apiEndpoint?: string;
  orderTemplate?: string;
}

interface AutoOrderRule {
  id: string;
  productName: string;
  productId: string;
  supplierId: string;
  supplierName: string;
  trigger: 'low_stock' | 'scheduled' | 'demand_based' | 'seasonal';
  triggerValue: number;
  orderQuantity: number;
  maxOrderQuantity: number;
  orderFrequency: number; // days
  isActive: boolean;
  lastOrderDate: string | null;
  nextOrderDate: string;
  costPerUnit: number;
  totalSpent: number;
  ordersPlaced: number;
  successRate: number;
  estimatedDelivery: number; // days
  priority: 'critical' | 'high' | 'medium' | 'low';
  conditions: {
    stockLevel: number;
    demandForecast: number;
    seasonalFactor: number;
    budgetLimit: number;
  };
  notifications: {
    orderPlaced: boolean;
    orderConfirmed: boolean;
    orderDelivered: boolean;
    orderFailed: boolean;
  };
}

interface PendingOrder {
  id: string;
  productName: string;
  supplierId: string;
  supplierName: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  orderDate: string;
  expectedDelivery: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  orderReference: string;
  paymentMethod: string;
  notes: string;
}

const SAMPLE_SUPPLIERS: Supplier[] = [
  {
    id: '1',
    name: 'MedSupply Corp',
    contactPerson: 'Sarah Johnson',
    email: 'orders@medsupply.com',
    phone: '+1-555-0101',
    website: 'https://medsupply.com',
    address: '123 Medical Way, Healthcare City, HC 12345',
    rating: 4.8,
    reliability: 95,
    averageDeliveryTime: 2,
    paymentTerms: 'Net 30',
    minimumOrder: 500,
    bulkDiscounts: [
      { quantity: 1000, discount: 5 },
      { quantity: 5000, discount: 10 },
      { quantity: 10000, discount: 15 }
    ],
    specialties: ['Medical Supplies', 'PPE', 'Pharmaceuticals'],
    certifications: ['FDA Approved', 'ISO 13485', 'GMP Certified'],
    lastOrderDate: '2024-01-10T00:00:00Z',
    totalOrderValue: 125000,
    isPreferred: true,
    autoOrderEnabled: true,
    orderingMethod: 'api',
    apiEndpoint: 'https://api.medsupply.com/orders',
    orderTemplate: 'standard_medical'
  },
  {
    id: '2',
    name: 'Fresh Farm Direct',
    contactPerson: 'Mike Rodriguez',
    email: 'orders@freshfarmdirect.com',
    phone: '+1-555-0202',
    website: 'https://freshfarmdirect.com',
    address: '456 Farm Road, Fresh Valley, FV 67890',
    rating: 4.6,
    reliability: 90,
    averageDeliveryTime: 1,
    paymentTerms: 'COD',
    minimumOrder: 100,
    bulkDiscounts: [
      { quantity: 500, discount: 8 },
      { quantity: 1000, discount: 12 }
    ],
    specialties: ['Organic Produce', 'Fresh Vegetables', 'Seasonal Fruits'],
    certifications: ['USDA Organic', 'Non-GMO', 'Fair Trade'],
    lastOrderDate: '2024-01-12T00:00:00Z',
    totalOrderValue: 84000,
    isPreferred: true,
    autoOrderEnabled: true,
    orderingMethod: 'portal',
    orderTemplate: 'fresh_produce'
  },
  {
    id: '3',
    name: 'SafeGuard Industries',
    contactPerson: 'Jennifer Chen',
    email: 'sales@safeguard.com',
    phone: '+1-555-0303',
    website: 'https://safeguard.com',
    address: '789 Safety Blvd, Protection City, PC 13579',
    rating: 4.4,
    reliability: 88,
    averageDeliveryTime: 5,
    paymentTerms: 'Net 15',
    minimumOrder: 250,
    bulkDiscounts: [
      { quantity: 100, discount: 3 },
      { quantity: 500, discount: 7 }
    ],
    specialties: ['Safety Equipment', 'Construction Gear', 'Industrial Supplies'],
    certifications: ['OSHA Compliant', 'ANSI Certified', 'CE Marked'],
    lastOrderDate: '2024-01-08T00:00:00Z',
    totalOrderValue: 45000,
    isPreferred: false,
    autoOrderEnabled: true,
    orderingMethod: 'email',
    orderTemplate: 'safety_equipment'
  }
];

const SAMPLE_AUTO_RULES: AutoOrderRule[] = [
  {
    id: '1',
    productName: 'N95 Respirator Masks',
    productId: 'prod_001',
    supplierId: '1',
    supplierName: 'MedSupply Corp',
    trigger: 'low_stock',
    triggerValue: 100,
    orderQuantity: 1000,
    maxOrderQuantity: 5000,
    orderFrequency: 14,
    isActive: true,
    lastOrderDate: '2024-01-10T00:00:00Z',
    nextOrderDate: '2024-01-24T00:00:00Z',
    costPerUnit: 2.50,
    totalSpent: 25000,
    ordersPlaced: 10,
    successRate: 100,
    estimatedDelivery: 2,
    priority: 'critical',
    conditions: {
      stockLevel: 50,
      demandForecast: 85,
      seasonalFactor: 1.2,
      budgetLimit: 10000
    },
    notifications: {
      orderPlaced: true,
      orderConfirmed: true,
      orderDelivered: true,
      orderFailed: true
    }
  },
  {
    id: '2',
    productName: 'Fresh Organic Vegetables',
    productId: 'prod_002',
    supplierId: '2',
    supplierName: 'Fresh Farm Direct',
    trigger: 'scheduled',
    triggerValue: 3, // every 3 days
    orderQuantity: 50,
    maxOrderQuantity: 200,
    orderFrequency: 3,
    isActive: true,
    lastOrderDate: '2024-01-14T00:00:00Z',
    nextOrderDate: '2024-01-17T00:00:00Z',
    costPerUnit: 2.80,
    totalSpent: 8400,
    ordersPlaced: 30,
    successRate: 96,
    estimatedDelivery: 1,
    priority: 'high',
    conditions: {
      stockLevel: 20,
      demandForecast: 95,
      seasonalFactor: 1.0,
      budgetLimit: 500
    },
    notifications: {
      orderPlaced: true,
      orderConfirmed: true,
      orderDelivered: true,
      orderFailed: true
    }
  },
  {
    id: '3',
    productName: 'Safety Hard Hats',
    productId: 'prod_003',
    supplierId: '3',
    supplierName: 'SafeGuard Industries',
    trigger: 'low_stock',
    triggerValue: 20,
    orderQuantity: 50,
    maxOrderQuantity: 200,
    orderFrequency: 45,
    isActive: false,
    lastOrderDate: '2024-01-08T00:00:00Z',
    nextOrderDate: '2024-02-22T00:00:00Z',
    costPerUnit: 45.00,
    totalSpent: 4500,
    ordersPlaced: 2,
    successRate: 100,
    estimatedDelivery: 5,
    priority: 'medium',
    conditions: {
      stockLevel: 15,
      demandForecast: 60,
      seasonalFactor: 1.0,
      budgetLimit: 2500
    },
    notifications: {
      orderPlaced: true,
      orderConfirmed: false,
      orderDelivered: true,
      orderFailed: true
    }
  }
];

const SAMPLE_PENDING_ORDERS: PendingOrder[] = [
  {
    id: '1',
    productName: 'N95 Respirator Masks',
    supplierId: '1',
    supplierName: 'MedSupply Corp',
    quantity: 1000,
    unitCost: 2.50,
    totalCost: 2500,
    orderDate: '2024-01-15T09:00:00Z',
    expectedDelivery: '2024-01-17T00:00:00Z',
    status: 'confirmed',
    trackingNumber: 'MS-2024-001234',
    orderReference: 'AUTO-001',
    paymentMethod: 'Net 30',
    notes: 'Automated order - Critical stock level reached'
  },
  {
    id: '2',
    productName: 'Fresh Organic Vegetables',
    supplierId: '2',
    supplierName: 'Fresh Farm Direct',
    quantity: 50,
    unitCost: 2.80,
    totalCost: 140,
    orderDate: '2024-01-15T06:00:00Z',
    expectedDelivery: '2024-01-16T00:00:00Z',
    status: 'shipped',
    trackingNumber: 'FFD-2024-567890',
    orderReference: 'AUTO-002',
    paymentMethod: 'COD',
    notes: 'Scheduled daily order - Fresh produce delivery'
  }
];

export default function AutomatedOrderingSystem() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [suppliers, setSuppliers] = useState<Supplier[]>(SAMPLE_SUPPLIERS);
  const [autoRules, setAutoRules] = useState<AutoOrderRule[]>(SAMPLE_AUTO_RULES);
  const [pendingOrders, setPendingOrders] = useState<PendingOrder[]>(SAMPLE_PENDING_ORDERS);
  const [selectedView, setSelectedView] = useState<'overview' | 'suppliers' | 'rules' | 'orders'>('overview');
  const [editingRule, setEditingRule] = useState<string | null>(null);
  const [editingSupplier, setEditingSupplier] = useState<string | null>(null);
  const [isProcessingOrders, setIsProcessingOrders] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate automated ordering process
    const orderInterval = setInterval(() => {
      processAutomatedOrders();
    }, 60000); // Check every minute

    return () => clearInterval(orderInterval);
  }, [autoRules]);

  const processAutomatedOrders = () => {
    const now = new Date();
    
    autoRules.forEach(rule => {
      if (!rule.isActive) return;
      
      const nextOrderDate = new Date(rule.nextOrderDate);
      
      if (now >= nextOrderDate) {
        // Create automated order
        placeAutomatedOrder(rule);
      }
    });
  };

  const placeAutomatedOrder = (rule: AutoOrderRule) => {
    const supplier = suppliers.find(s => s.id === rule.supplierId);
    if (!supplier) return;

    const newOrder: PendingOrder = {
      id: Date.now().toString(),
      productName: rule.productName,
      supplierId: rule.supplierId,
      supplierName: rule.supplierName,
      quantity: rule.orderQuantity,
      unitCost: rule.costPerUnit,
      totalCost: rule.orderQuantity * rule.costPerUnit,
      orderDate: new Date().toISOString(),
      expectedDelivery: new Date(Date.now() + rule.estimatedDelivery * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      orderReference: `AUTO-${Date.now()}`,
      paymentMethod: supplier.paymentTerms,
      notes: `Automated order triggered by ${rule.trigger} rule`
    };

    setPendingOrders(prev => [newOrder, ...prev]);

    // Update rule statistics
    setAutoRules(prev => prev.map(r => 
      r.id === rule.id 
        ? {
            ...r,
            lastOrderDate: new Date().toISOString(),
            nextOrderDate: new Date(Date.now() + rule.orderFrequency * 24 * 60 * 60 * 1000).toISOString(),
            ordersPlaced: r.ordersPlaced + 1,
            totalSpent: r.totalSpent + newOrder.totalCost
          }
        : r
    ));

    // Send notification (simulate)
    if (rule.notifications.orderPlaced) {
      console.log(`Order placed: ${rule.productName} - ${rule.orderQuantity} units from ${rule.supplierName}`);
      
      // Trigger voice alert if available
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(
          `Automated order placed: ${rule.productName}, quantity ${rule.orderQuantity} units from ${rule.supplierName}. Expected delivery in ${rule.estimatedDelivery} days.`
        );
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const toggleRuleStatus = (ruleId: string) => {
    setAutoRules(prev => prev.map(rule => 
      rule.id === ruleId 
        ? { ...rule, isActive: !rule.isActive }
        : rule
    ));
  };

  const runAllAutomatedOrders = () => {
    setIsProcessingOrders(true);
    
    setTimeout(() => {
      const activeRules = autoRules.filter(rule => rule.isActive);
      activeRules.forEach(rule => {
        // Simulate order placement with 90% success rate
        if (Math.random() > 0.1) {
          placeAutomatedOrder(rule);
        }
      });
      
      setIsProcessingOrders(false);
      try {
        const toast = (window as any).__maycole_toast_provider__;
        const msg = `Processed ${activeRules.length} automated orders successfully!`;
        if (toast && typeof toast.push === 'function') toast.push(msg);
        else console.info(msg);
      } catch (e) { console.info(`Processed ${activeRules.length} automated orders successfully!`); }
    }, 3000);
  };

  const getSupplierReliabilityColor = (reliability: number) => {
    if (reliability >= 95) return 'text-green-600';
    if (reliability >= 85) return 'text-blue-600';
    if (reliability >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-500 text-white';
      case 'shipped': return 'bg-orange-500 text-white';
      case 'delivered': return 'bg-green-500 text-white';
      case 'cancelled': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const activeRulesCount = autoRules.filter(rule => rule.isActive).length;
  const totalOrdersToday = pendingOrders.filter(order => 
    new Date(order.orderDate).toDateString() === new Date().toDateString()
  ).length;
  const totalSpentToday = pendingOrders
    .filter(order => new Date(order.orderDate).toDateString() === new Date().toDateString())
    .reduce((sum, order) => sum + order.totalCost, 0);
  const averageDeliveryTime = suppliers.reduce((sum, supplier) => sum + supplier.averageDeliveryTime, 0) / suppliers.length;

  return (
    <div className="white-background min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate('/main')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={runAllAutomatedOrders}
              disabled={isProcessingOrders}
              className="text-white"
              style={{ background: 'linear-gradient(135deg, #4B0082, #6B46C1)' }}
            >
              {isProcessingOrders ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Run Auto Orders
                </>
              )}
            </Button>
            
            <div className="text-right text-gray-600">
              <div className="text-sm font-medium">
                {currentTime.toLocaleDateString()}
              </div>
              <div className="text-xs opacity-70">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <ShoppingCart className="w-10 h-10 inline mr-3" style={{ color: '#6B46C1' }} />
            Automated Ordering System
          </h1>
          <p className="text-gray-600">Revolutionary automated purchasing with intelligent supplier integration</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: 'overview', name: 'System Overview', icon: Target },
            { id: 'suppliers', name: 'Supplier Management', icon: Building2 },
            { id: 'rules', name: 'Auto-Order Rules', icon: Settings },
            { id: 'orders', name: 'Order Tracking', icon: Package }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedView(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                selectedView === tab.id
                  ? 'text-white border-purple-400'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-purple-300'
              }`}
              style={selectedView === tab.id ? { background: 'linear-gradient(135deg, #4B0082, #6B46C1)' } : {}}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Overview */}
        {selectedView === 'overview' && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="border-gray-200">
                <CardContent className="p-4 text-center">
                  <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{activeRulesCount}</div>
                  <div className="text-sm text-gray-600">Active Rules</div>
                </CardContent>
              </Card>
              <Card className="border-gray-200">
                <CardContent className="p-4 text-center">
                  <ShoppingCart className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{totalOrdersToday}</div>
                  <div className="text-sm text-gray-600">Orders Today</div>
                </CardContent>
              </Card>
              <Card className="border-gray-200">
                <CardContent className="p-4 text-center">
                  <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">${totalSpentToday.toFixed(0)}</div>
                  <div className="text-sm text-gray-600">Spent Today</div>
                </CardContent>
              </Card>
              <Card className="border-gray-200">
                <CardContent className="p-4 text-center">
                  <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{averageDeliveryTime.toFixed(1)}</div>
                  <div className="text-sm text-gray-600">Avg Delivery (days)</div>
                </CardContent>
              </Card>
            </div>

            {/* System Status */}
            <Card className="mb-8 border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center space-x-2">
                  <Brain className="w-5 h-5" style={{ color: '#6B46C1' }} />
                  <span>Intelligent Ordering Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Next Automated Orders</h3>
                    <div className="space-y-3">
                      {autoRules
                        .filter(rule => rule.isActive)
                        .sort((a, b) => new Date(a.nextOrderDate).getTime() - new Date(b.nextOrderDate).getTime())
                        .slice(0, 3)
                        .map((rule) => (
                          <div key={rule.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <div>
                              <div className="font-medium text-blue-800">{rule.productName}</div>
                              <div className="text-sm text-blue-600">{rule.supplierName}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-blue-800">
                                {new Date(rule.nextOrderDate).toLocaleDateString()}
                              </div>
                              <div className="text-xs text-blue-600">
                                {rule.orderQuantity} units
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Recent Orders</h3>
                    <div className="space-y-3">
                      {pendingOrders.slice(0, 3).map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                          <div>
                            <div className="font-medium text-green-800">{order.productName}</div>
                            <div className="text-sm text-green-600">{order.supplierName}</div>
                          </div>
                          <div className="text-right">
                            <Badge className={getOrderStatusColor(order.status)}>
                              {order.status.toUpperCase()}
                            </Badge>
                            <div className="text-xs text-green-600 mt-1">
                              ${order.totalCost}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Top Suppliers</h3>
                    <div className="space-y-3">
                      {suppliers
                        .filter(supplier => supplier.isPreferred)
                        .slice(0, 3)
                        .map((supplier) => (
                          <div key={supplier.id} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                            <div>
                              <div className="font-medium text-purple-800">{supplier.name}</div>
                              <div className="text-sm text-purple-600">{supplier.contactPerson}</div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm text-purple-800">{supplier.rating}</span>
                              </div>
                              <div className={`text-xs ${getSupplierReliabilityColor(supplier.reliability)}`}>
                                {supplier.reliability}% reliable
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Supplier Management */}
        {selectedView === 'suppliers' && (
          <div className="space-y-6">
            {suppliers.map((supplier) => (
              <Card key={supplier.id} className="border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <Building2 className="w-6 h-6 text-blue-600" />
                        <h3 className="text-xl font-semibold text-gray-900">{supplier.name}</h3>
                        {supplier.isPreferred && (
                          <Badge className="bg-yellow-500 text-white">Preferred</Badge>
                        )}
                        {supplier.autoOrderEnabled && (
                          <Badge className="bg-green-500 text-white">Auto-Order</Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4" />
                              <span>{supplier.contactPerson}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4" />
                              <span>{supplier.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4" />
                              <span>{supplier.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4" />
                              <span className="truncate">{supplier.address}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Performance Metrics</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Rating:</span>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span className="font-medium text-gray-900">{supplier.rating}/5</span>
                              </div>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Reliability:</span>
                              <span className={`font-medium ${getSupplierReliabilityColor(supplier.reliability)}`}>
                                {supplier.reliability}%
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Delivery Time:</span>
                              <span className="font-medium text-gray-900">{supplier.averageDeliveryTime} days</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Total Orders:</span>
                              <span className="font-medium text-gray-900">${supplier.totalOrderValue.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Order Details</h4>
                          <div className="space-y-2 text-sm text-gray-600">
                            <div>Min Order: ${supplier.minimumOrder}</div>
                            <div>Payment: {supplier.paymentTerms}</div>
                            <div>Method: {supplier.orderingMethod.toUpperCase()}</div>
                            <div>Last Order: {new Date(supplier.lastOrderDate).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="text-sm font-medium text-gray-700">Specialties:</span>
                          {supplier.specialties.map((specialty, index) => (
                            <Badge key={index} className="bg-blue-100 text-blue-800">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-sm font-medium text-gray-700">Certifications:</span>
                          {supplier.certifications.map((cert, index) => (
                            <Badge key={index} className="bg-green-100 text-green-800">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="ml-6 flex flex-col space-y-2">
                      <Button
                        onClick={() => setEditingSupplier(supplier.id)}
                        size="sm"
                        variant="outline"
                        className="border-gray-300 text-gray-700"
                      >
                        <Edit3 className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => {/* Place order logic */}}
                        size="sm"
                        className="text-white"
                        style={{ background: 'linear-gradient(135deg, #4B0082, #6B46C1)' }}
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Order
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Auto-Order Rules */}
        {selectedView === 'rules' && (
          <div className="space-y-6">
            {autoRules.map((rule) => (
              <Card key={rule.id} className="border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <Settings className="w-6 h-6 text-purple-600" />
                        <h3 className="text-xl font-semibold text-gray-900">{rule.productName}</h3>
                        <Badge className={getPriorityColor(rule.priority)}>
                          {rule.priority.toUpperCase()}
                        </Badge>
                        <Badge className={rule.isActive ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}>
                          {rule.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Rule Configuration</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Trigger:</span>
                              <span className="font-medium text-gray-900 capitalize">{rule.trigger.replace('_', ' ')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Trigger Value:</span>
                              <span className="font-medium text-gray-900">{rule.triggerValue}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Order Quantity:</span>
                              <span className="font-medium text-gray-900">{rule.orderQuantity}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Frequency:</span>
                              <span className="font-medium text-gray-900">{rule.orderFrequency} days</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Performance</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Orders Placed:</span>
                              <span className="font-medium text-gray-900">{rule.ordersPlaced}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Success Rate:</span>
                              <span className="font-medium text-green-600">{rule.successRate}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Total Spent:</span>
                              <span className="font-medium text-gray-900">${rule.totalSpent.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Cost per Unit:</span>
                              <span className="font-medium text-gray-900">${rule.costPerUnit}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Schedule</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Supplier:</span>
                              <span className="font-medium text-gray-900">{rule.supplierName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Last Order:</span>
                              <span className="font-medium text-gray-900">
                                {rule.lastOrderDate ? new Date(rule.lastOrderDate).toLocaleDateString() : 'Never'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Next Order:</span>
                              <span className="font-medium text-blue-600">
                                {new Date(rule.nextOrderDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Delivery:</span>
                              <span className="font-medium text-gray-900">{rule.estimatedDelivery} days</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Current Conditions</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-gray-600">Stock Level:</div>
                            <div className="font-medium text-gray-900">{rule.conditions.stockLevel}</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Demand Forecast:</div>
                            <div className="font-medium text-gray-900">{rule.conditions.demandForecast}%</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Seasonal Factor:</div>
                            <div className="font-medium text-gray-900">{rule.conditions.seasonalFactor}x</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Budget Limit:</div>
                            <div className="font-medium text-gray-900">${rule.conditions.budgetLimit}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="ml-6 flex flex-col space-y-2">
                      <Button
                        onClick={() => toggleRuleStatus(rule.id)}
                        size="sm"
                        className={rule.isActive ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}
                      >
                        {rule.isActive ? (
                          <>
                            <PauseCircle className="w-4 h-4 mr-1" />
                            Disable
                          </>
                        ) : (
                          <>
                            <PlayCircle className="w-4 h-4 mr-1" />
                            Enable
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={() => setEditingRule(rule.id)}
                        size="sm"
                        variant="outline"
                        className="border-gray-300 text-gray-700"
                      >
                        <Edit3 className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => placeAutomatedOrder(rule)}
                        size="sm"
                        className="text-white"
                        style={{ background: 'linear-gradient(135deg, #4B0082, #6B46C1)' }}
                      >
                        <Zap className="w-4 h-4 mr-1" />
                        Order Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Order Tracking */}
        {selectedView === 'orders' && (
          <div className="space-y-6">
            {pendingOrders.map((order) => (
              <Card key={order.id} className="border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <Package className="w-6 h-6 text-green-600" />
                        <h3 className="text-xl font-semibold text-gray-900">{order.productName}</h3>
                        <Badge className={getOrderStatusColor(order.status)}>
                          {order.status.toUpperCase()}
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-800">
                          {order.orderReference}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Order Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Supplier:</span>
                              <span className="font-medium text-gray-900">{order.supplierName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Quantity:</span>
                              <span className="font-medium text-gray-900">{order.quantity} units</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Unit Cost:</span>
                              <span className="font-medium text-gray-900">${order.unitCost}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Total Cost:</span>
                              <span className="font-medium text-green-600">${order.totalCost}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Timeline</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Order Date:</span>
                              <span className="font-medium text-gray-900">
                                {new Date(order.orderDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Expected:</span>
                              <span className="font-medium text-blue-600">
                                {new Date(order.expectedDelivery).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Payment:</span>
                              <span className="font-medium text-gray-900">{order.paymentMethod}</span>
                            </div>
                            {order.trackingNumber && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Tracking:</span>
                                <span className="font-medium text-purple-600">{order.trackingNumber}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Status & Notes</h4>
                          <div className="space-y-2 text-sm">
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <div className="text-gray-700">{order.notes}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="ml-6 flex flex-col space-y-2">
                      <Button
                        onClick={() => {/* Track order logic */}}
                        size="sm"
                        className="text-white"
                        style={{ background: 'linear-gradient(135deg, #4B0082, #6B46C1)' }}
                      >
                        <Truck className="w-4 h-4 mr-1" />
                        Track
                      </Button>
                      {order.status === 'pending' && (
                        <Button
                          onClick={() => {/* Cancel order logic */}}
                          size="sm"
                          variant="outline"
                          className="border-red-300 text-red-700 hover:bg-red-50"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Button
            onClick={() => navigate('/voice-alerts')}
            className="h-16 text-white"
            style={{ background: 'linear-gradient(135deg, #4B0082, #6B46C1)' }}
          >
            <Volume2 className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-semibold">Voice Alerts</div>
              <div className="text-xs opacity-80">Order notifications</div>
            </div>
          </Button>
          
          <Button
            onClick={() => navigate('/spending-reports')}
            className="h-16 text-white"
            style={{ background: 'linear-gradient(135deg, #4B0082, #6B46C1)' }}
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-semibold">Spending Analysis</div>
              <div className="text-xs opacity-80">Cost optimization</div>
            </div>
          </Button>
          
          <Button
            onClick={() => navigate('/supplier-portal')}
            className="h-16 text-white"
            style={{ background: 'linear-gradient(135deg, #4B0082, #6B46C1)' }}
          >
            <Building2 className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-semibold">Supplier Portal</div>
              <div className="text-xs opacity-80">Manage suppliers</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}