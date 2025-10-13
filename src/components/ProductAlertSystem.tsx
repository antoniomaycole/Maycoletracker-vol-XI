/**
 * MaycoleTracker™ Volume XI - Product Alert & Replacement System
 * Intelligent alerts for products that need replacement, restocking, or attention
 * Features: Smart notifications, automated reordering, threshold management
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, AlertTriangle, AlertCircle, CheckCircle, Clock, Package,
  TrendingDown, TrendingUp, Calendar, Bell, BellOff, Settings, Zap,
  RefreshCw, Download, Filter, Search, Eye, EyeOff, Shield
} from 'lucide-react';
import { Target } from '../lib/icon-shims';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Progress } from './ui/progress';

interface ProductAlert {
  id: string;
  productName: string;
  category: string;
  alertType: 'low_stock' | 'expiring' | 'out_of_stock' | 'quality_issue' | 'supplier_delay' | 'price_change';
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  currentLevel: number;
  threshold: number;
  recommendedAction: string;
  estimatedCost: number;
  timeframe: string;
  autoReorder: boolean;
  supplierId: string;
  supplierName: string;
  lastUpdated: string;
  trend: 'increasing' | 'decreasing' | 'stable';
  industry: string;
}

const SAMPLE_ALERTS: ProductAlert[] = [
  {
    id: '1',
    productName: 'N95 Respirator Masks',
    category: 'PPE',
    alertType: 'low_stock',
    severity: 'critical',
    description: 'Stock level below critical threshold. Only 48 units remaining.',
    currentLevel: 48,
    threshold: 100,
    recommendedAction: 'Order 500 units immediately',
    estimatedCost: 1250,
    timeframe: 'Immediate',
    autoReorder: true,
    supplierId: 'SUP001',
    supplierName: 'MedSupply Corp',
    lastUpdated: '2024-01-15T14:30:00Z',
    trend: 'decreasing',
    industry: 'healthcare'
  },
  {
    id: '2',
    productName: 'Hand Sanitizer 70% Alcohol',
    category: 'Medical Supplies',
    alertType: 'expiring',
    severity: 'high',
    description: '150 units expiring within 30 days. Total value: $1,350',
    currentLevel: 150,
    threshold: 30,
    recommendedAction: 'Use expiring stock first, implement FIFO rotation',
    estimatedCost: 1350,
    timeframe: '30 days',
    autoReorder: false,
    supplierId: 'SUP002',
    supplierName: 'CleanTech Solutions',
    lastUpdated: '2024-01-15T10:15:00Z',
    trend: 'stable',
    industry: 'healthcare'
  },
  {
    id: '3',
    productName: 'Digital Thermometers',
    category: 'Equipment',
    alertType: 'quality_issue',
    severity: 'medium',
    description: 'Calibration required for 8 units. Last calibration: 6 months ago',
    currentLevel: 8,
    threshold: 180,
    recommendedAction: 'Schedule calibration service',
    estimatedCost: 320,
    timeframe: '2 weeks',
    autoReorder: false,
    supplierId: 'SUP003',
    supplierName: 'TempTech Equipment',
    lastUpdated: '2024-01-15T08:45:00Z',
    trend: 'stable',
    industry: 'healthcare'
  },
  {
    id: '4',
    productName: 'Organic Roma Tomatoes',
    category: 'Food Items',
    alertType: 'expiring',
    severity: 'high',
    description: '25 lbs expiring tomorrow. Estimated waste value: $97.50',
    currentLevel: 25,
    threshold: 2,
    recommendedAction: 'Use in tomorrow\'s specials, discount pricing',
    estimatedCost: 97.50,
    timeframe: '24 hours',
    autoReorder: false,
    supplierId: 'SUP004',
    supplierName: 'Fresh Farm Produce',
    lastUpdated: '2024-01-15T16:20:00Z',
    trend: 'decreasing',
    industry: 'restaurant'
  },
  {
    id: '5',
    productName: 'Safety Hard Hats',
    category: 'Safety Equipment',
    alertType: 'supplier_delay',
    severity: 'medium',
    description: 'Expected delivery delayed by 5 days. May impact project timeline.',
    currentLevel: 12,
    threshold: 50,
    recommendedAction: 'Contact alternative supplier, adjust project schedule',
    estimatedCost: 480,
    timeframe: '5 days',
    autoReorder: false,
    supplierId: 'SUP005',
    supplierName: 'Safety Equipment Inc',
    lastUpdated: '2024-01-15T12:00:00Z',
    trend: 'stable',
    industry: 'construction'
  }
];

export default function ProductAlertSystem() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alerts, setAlerts] = useState<ProductAlert[]>(SAMPLE_ALERTS);
  const [filteredAlerts, setFilteredAlerts] = useState<ProductAlert[]>(SAMPLE_ALERTS);
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoReorderEnabled, setAutoReorderEnabled] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let filtered = alerts;

    if (selectedSeverity !== 'all') {
      filtered = filtered.filter(alert => alert.severity === selectedSeverity);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(alert => alert.alertType === selectedType);
    }

    if (searchTerm) {
      filtered = filtered.filter(alert =>
        alert.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredAlerts(filtered);
  }, [alerts, selectedSeverity, selectedType, searchTerm]);

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const executeRecommendedAction = (alertId: string) => {
    const alert = alerts.find(a => a.id === alertId);
    if (!alert) return;

    // Simulate executing the recommended action
    try {
      const toast = (window as any).__maycole_toast_provider__;
      const msg = 'Executing: ' + alert.recommendedAction;
      if (toast && typeof toast.push === 'function') toast.push(msg);
      else console.info(msg);
    } catch (e) { console.info('Executing: ' + alert.recommendedAction); }
    
    // Mark alert as resolved after action
    setTimeout(() => {
      resolveAlert(alertId);
    }, 1000);
  };

  const toggleAutoReorder = (alertId: string) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === alertId
        ? { ...alert, autoReorder: !alert.autoReorder }
        : alert
    ));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'low_stock': return <Package className="w-4 h-4" />;
      case 'expiring': return <Clock className="w-4 h-4" />;
      case 'out_of_stock': return <AlertTriangle className="w-4 h-4" />;
      case 'quality_issue': return <Shield className="w-4 h-4" />;
      case 'supplier_delay': return <TrendingDown className="w-4 h-4" />;
      case 'price_change': return <TrendingUp className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'decreasing': return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'stable': return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
      default: return null;
    }
  };

  const alertStats = {
    total: alerts.length,
    critical: alerts.filter(a => a.severity === 'critical').length,
    high: alerts.filter(a => a.severity === 'high').length,
    autoReorderEnabled: alerts.filter(a => a.autoReorder).length,
    totalEstimatedCost: alerts.reduce((sum, alert) => sum + alert.estimatedCost, 0)
  };

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
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              variant="outline"
              className={`border-gray-300 ${notificationsEnabled ? 'text-green-700 bg-green-50' : 'text-gray-700'}`}
            >
              {notificationsEnabled ? <Bell className="w-4 h-4 mr-2" /> : <BellOff className="w-4 h-4 mr-2" />}
              Notifications {notificationsEnabled ? 'On' : 'Off'}
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
            <AlertTriangle className="w-10 h-10 inline mr-3 text-red-600" />
            Product Alert & Replacement System
          </h1>
          <p className="text-gray-600">Intelligent monitoring and alerts for products requiring attention</p>
        </div>

        {/* Alert Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="border-gray-200">
            <CardContent className="p-4 text-center">
              <AlertCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{alertStats.total}</div>
              <div className="text-sm text-gray-600">Total Alerts</div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{alertStats.critical}</div>
              <div className="text-sm text-gray-600">Critical</div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4 text-center">
              <AlertCircle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{alertStats.high}</div>
              <div className="text-sm text-gray-600">High Priority</div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4 text-center">
              <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{alertStats.autoReorderEnabled}</div>
              <div className="text-sm text-gray-600">Auto-Reorder</div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">${alertStats.totalEstimatedCost.toFixed(0)}</div>
              <div className="text-sm text-gray-600">Total Impact</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8 border-gray-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300"
                />
              </div>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
              >
                <option value="all">All Types</option>
                <option value="low_stock">Low Stock</option>
                <option value="expiring">Expiring</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="quality_issue">Quality Issue</option>
                <option value="supplier_delay">Supplier Delay</option>
                <option value="price_change">Price Change</option>
              </select>
              <div className="flex space-x-2">
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSeverity('all');
                    setSelectedType('all');
                  }}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Clear Filters
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alert List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <Card key={alert.id} className="border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-2 rounded-lg ${
                        alert.alertType === 'low_stock' ? 'bg-red-100' :
                        alert.alertType === 'expiring' ? 'bg-orange-100' :
                        alert.alertType === 'quality_issue' ? 'bg-yellow-100' :
                        'bg-blue-100'
                      }`}>
                        {getTypeIcon(alert.alertType)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{alert.productName}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-blue-100 text-blue-800">{alert.category}</Badge>
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                          <Badge className="bg-gray-100 text-gray-800">{alert.industry}</Badge>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{alert.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Current Level</div>
                        <div className="flex items-center space-x-2">
                          <Progress 
                            value={(alert.currentLevel / alert.threshold) * 100} 
                            className="flex-1 h-2"
                          />
                          <span className="text-sm font-medium text-gray-900">
                            {alert.currentLevel}/{alert.threshold}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Estimated Cost</div>
                        <div className="text-lg font-semibold text-gray-900">
                          ${alert.estimatedCost.toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Timeframe</div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">{alert.timeframe}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="text-sm font-medium text-gray-700 mb-2">Recommended Action:</div>
                      <div className="text-sm text-gray-600">{alert.recommendedAction}</div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div>Supplier: {alert.supplierName}</div>
                        <div className="flex items-center space-x-1">
                          <span>Trend:</span>
                          {getTrendIcon(alert.trend)}
                        </div>
                        <div>Updated: {new Date(alert.lastUpdated).toLocaleString()}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <label className="flex items-center space-x-1">
                          <input
                            type="checkbox"
                            checked={alert.autoReorder}
                            onChange={() => toggleAutoReorder(alert.id)}
                            className="rounded"
                          />
                          <span className="text-xs">Auto-reorder</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="ml-6 flex flex-col space-y-2">
                    <Button
                      onClick={() => executeRecommendedAction(alert.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Execute Action
                    </Button>
                    <Button
                      onClick={() => resolveAlert(alert.id)}
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Resolve
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <Card className="border-gray-200">
            <CardContent className="p-12 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-gray-900 text-xl font-semibold mb-2">No alerts found</h3>
              <p className="text-gray-600">
                {searchTerm || selectedSeverity !== 'all' || selectedType !== 'all'
                  ? 'No alerts match your current filters.'
                  : 'All products are within normal parameters. Great job!'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}