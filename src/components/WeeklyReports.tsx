/**
 * MaycoleTracker™ Volume XI - Weekly Reports & Analytics System
 * Comprehensive weekly inventory analysis and business intelligence
 * Features: Automated reports, trend analysis, performance metrics, alerts
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, TrendingUp, TrendingDown, DollarSign, Package,
  AlertTriangle, CheckCircle, Clock, Download, Mail, Share, Printer,
  BarChart3, Users, Target, Award, FileText, Filter, Search, Zap,
  Building2, Eye, RefreshCw, Star, ChevronDown, ChevronUp
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

interface WeeklyReport {
  id: string;
  week: string;
  dateRange: string;
  generatedAt: string;
  industry: string;
  metrics: {
    totalRevenue: number;
    inventoryValue: number;
    itemsProcessed: number;
    efficiency: number;
    alerts: number;
    lowStockItems: number;
    expiringItems: number;
    newSuppliers: number;
  };
  trends: {
    revenueChange: number;
    inventoryChange: number;
    efficiencyChange: number;
    alertsChange: number;
  };
  topProducts: Array<{
    name: string;
    category: string;
    quantity: number;
    value: number;
    trend: 'up' | 'down' | 'stable';
  }>;
  alerts: Array<{
    id: string;
    type: 'critical' | 'warning' | 'info';
    message: string;
    category: string;
    count: number;
  }>;
}

const SAMPLE_WEEKLY_DATA = [
  { week: 'Week 1', revenue: 45000, inventory: 1200, efficiency: 87, alerts: 12 },
  { week: 'Week 2', revenue: 52000, inventory: 1350, efficiency: 89, alerts: 8 },
  { week: 'Week 3', revenue: 48000, inventory: 1180, efficiency: 92, alerts: 5 },
  { week: 'Week 4', revenue: 58000, inventory: 1450, efficiency: 94, alerts: 3 },
  { week: 'Current', revenue: 62000, inventory: 1520, efficiency: 96, alerts: 2 }
];

const SAMPLE_REPORTS: WeeklyReport[] = [
  {
    id: '1',
    week: 'Week 52, 2024',
    dateRange: 'Dec 23 - Dec 29, 2024',
    generatedAt: '2024-12-30T08:00:00Z',
    industry: 'Healthcare',
    metrics: {
      totalRevenue: 62000,
      inventoryValue: 1520000,
      itemsProcessed: 2847,
      efficiency: 96,
      alerts: 2,
      lowStockItems: 12,
      expiringItems: 8,
      newSuppliers: 3
    },
    trends: {
      revenueChange: 12.5,
      inventoryChange: 8.3,
      efficiencyChange: 2.1,
      alertsChange: -60.0
    },
    topProducts: [
      { name: 'N95 Masks', category: 'PPE', quantity: 500, value: 12500, trend: 'up' },
      { name: 'Hand Sanitizer', category: 'Medical Supplies', quantity: 200, value: 1800, trend: 'up' },
      { name: 'Digital Thermometers', category: 'Equipment', quantity: 45, value: 2070, trend: 'stable' },
      { name: 'Disposable Gloves', category: 'PPE', quantity: 1200, value: 3600, trend: 'down' },
      { name: 'Bandages', category: 'Medical Supplies', quantity: 800, value: 1600, trend: 'up' }
    ],
    alerts: [
      { id: '1', type: 'critical', message: 'Surgical instruments below safety stock', category: 'Equipment', count: 1 },
      { id: '2', type: 'warning', message: 'Medications expiring within 30 days', category: 'Pharmaceuticals', count: 8 },
      { id: '3', type: 'info', message: 'New supplier onboarding completed', category: 'Suppliers', count: 3 }
    ]
  },
  {
    id: '2',
    week: 'Week 51, 2024',
    dateRange: 'Dec 16 - Dec 22, 2024',
    generatedAt: '2024-12-23T08:00:00Z',
    industry: 'Healthcare',
    metrics: {
      totalRevenue: 58000,
      inventoryValue: 1450000,
      itemsProcessed: 2634,
      efficiency: 94,
      alerts: 5,
      lowStockItems: 18,
      expiringItems: 12,
      newSuppliers: 1
    },
    trends: {
      revenueChange: 8.7,
      inventoryChange: 5.2,
      efficiencyChange: 1.8,
      alertsChange: -28.6
    },
    topProducts: [
      { name: 'N95 Masks', category: 'PPE', quantity: 450, value: 11250, trend: 'up' },
      { name: 'Hand Sanitizer', category: 'Medical Supplies', quantity: 180, value: 1620, trend: 'stable' },
      { name: 'Digital Thermometers', category: 'Equipment', quantity: 42, value: 1890, trend: 'down' },
      { name: 'Disposable Gloves', category: 'PPE', quantity: 1100, value: 3300, trend: 'up' },
      { name: 'Bandages', category: 'Medical Supplies', quantity: 750, value: 1500, trend: 'stable' }
    ],
    alerts: [
      { id: '1', type: 'critical', message: 'Oxygen concentrators critically low', category: 'Equipment', count: 2 },
      { id: '2', type: 'warning', message: 'PPE supplies below recommended levels', category: 'PPE', count: 15 },
      { id: '3', type: 'warning', message: 'Medications expiring within 30 days', category: 'Pharmaceuticals', count: 12 }
    ]
  }
];

export default function WeeklyReports() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedReport, setSelectedReport] = useState<WeeklyReport | null>(SAMPLE_REPORTS[0]);
  const [reports, setReports] = useState<WeeklyReport[]>(SAMPLE_REPORTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['overview', 'trends']));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const generateNewReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newReport: WeeklyReport = {
        id: Date.now().toString(),
        week: 'Current Week',
        dateRange: 'Dec 30, 2024 - Jan 5, 2025',
        generatedAt: new Date().toISOString(),
        industry: 'Healthcare',
        metrics: {
          totalRevenue: 65000,
          inventoryValue: 1580000,
          itemsProcessed: 2950,
          efficiency: 97,
          alerts: 1,
          lowStockItems: 8,
          expiringItems: 5,
          newSuppliers: 2
        },
        trends: {
          revenueChange: 15.2,
          inventoryChange: 10.1,
          efficiencyChange: 3.2,
          alertsChange: -75.0
        },
        topProducts: [
          { name: 'N95 Masks', category: 'PPE', quantity: 650, value: 16250, trend: 'up' },
          { name: 'Hand Sanitizer', category: 'Medical Supplies', quantity: 220, value: 1980, trend: 'up' },
          { name: 'Digital Thermometers', category: 'Equipment', quantity: 48, value: 2160, trend: 'up' },
          { name: 'Disposable Gloves', category: 'PPE', quantity: 1400, value: 4200, trend: 'up' },
          { name: 'Bandages', category: 'Medical Supplies', quantity: 850, value: 1700, trend: 'stable' }
        ],
        alerts: [
          { id: '1', type: 'warning', message: 'Routine equipment maintenance due', category: 'Equipment', count: 1 }
        ]
      };
      setReports(prev => [newReport, ...prev]);
      setSelectedReport(newReport);
      setIsGenerating(false);
    }, 3000);
  };

  const exportReport = (format: string) => {
    alert(`Exporting ${selectedReport?.week} report in ${format.toUpperCase()} format...`);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSections = new Set(prev);
      if (newSections.has(section)) {
        newSections.delete(section);
      } else {
        newSections.add(section);
      }
      return newSections;
    });
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-100 border-red-500 text-red-800';
      case 'warning': return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      case 'info': return 'bg-blue-100 border-blue-500 text-blue-800';
      default: return 'bg-gray-100 border-gray-500 text-gray-800';
    }
  };

  if (!selectedReport) {
    return <div className="white-background min-h-screen p-6">Loading...</div>;
  }

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
          
          <div className="text-right text-gray-600">
            <div className="text-sm font-medium">
              {currentTime.toLocaleDateString()}
            </div>
            <div className="text-xs opacity-70">
              {currentTime.toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <FileText className="w-10 h-10 inline mr-3 text-blue-600" />
            Weekly Reports & Analytics
          </h1>
          <p className="text-gray-600">Comprehensive weekly inventory analysis and business intelligence</p>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-300"
            />
          </div>
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
          >
            <option value="all">All Industries</option>
            <option value="healthcare">Healthcare</option>
            <option value="restaurant">Restaurant</option>
            <option value="construction">Construction</option>
            <option value="retail">Retail</option>
          </select>
          <Button
            onClick={generateNewReport}
            disabled={isGenerating}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Generate Report
              </>
            )}
          </Button>
          <div className="flex space-x-2">
            <Button onClick={() => exportReport('pdf')} variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
            <Button onClick={() => exportReport('csv')} variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              CSV
            </Button>
          </div>
        </div>

        {/* Report Selection */}
        <Card className="mb-8 border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>Report Selection</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {reports.slice(0, 3).map((report) => (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                    selectedReport.id === report.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-semibold text-gray-900 mb-1">{report.week}</div>
                  <div className="text-sm text-gray-600 mb-2">{report.dateRange}</div>
                  <div className="flex items-center justify-between text-xs">
                    <Badge className="bg-blue-100 text-blue-800">{report.industry}</Badge>
                    <span className="text-gray-500">
                      {report.metrics.efficiency}% efficiency
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Overview Section */}
        <Card className="mb-8 border-gray-200">
          <CardHeader>
            <CardTitle 
              className="text-gray-900 flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection('overview')}
            >
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-green-600" />
                <span>Week Overview - {selectedReport.week}</span>
              </div>
              {expandedSections.has('overview') ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </CardTitle>
          </CardHeader>
          {expandedSections.has('overview') && (
            <CardContent>
              <div className="text-sm text-gray-600 mb-6">
                {selectedReport.dateRange} • Generated: {new Date(selectedReport.generatedAt).toLocaleDateString()}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign className="w-6 h-6 text-green-600" />
                    <div className={`flex items-center space-x-1 text-sm ${getTrendColor(selectedReport.trends.revenueChange)}`}>
                      {getTrendIcon(selectedReport.trends.revenueChange)}
                      <span>{Math.abs(selectedReport.trends.revenueChange)}%</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    ${selectedReport.metrics.totalRevenue.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Revenue</div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Package className="w-6 h-6 text-blue-600" />
                    <div className={`flex items-center space-x-1 text-sm ${getTrendColor(selectedReport.trends.inventoryChange)}`}>
                      {getTrendIcon(selectedReport.trends.inventoryChange)}
                      <span>{Math.abs(selectedReport.trends.inventoryChange)}%</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    ${selectedReport.metrics.inventoryValue.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Inventory Value</div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Target className="w-6 h-6 text-purple-600" />
                    <div className={`flex items-center space-x-1 text-sm ${getTrendColor(selectedReport.trends.efficiencyChange)}`}>
                      {getTrendIcon(selectedReport.trends.efficiencyChange)}
                      <span>{Math.abs(selectedReport.trends.efficiencyChange)}%</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {selectedReport.metrics.efficiency}%
                  </div>
                  <div className="text-sm text-gray-600">Efficiency</div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                    <div className={`flex items-center space-x-1 text-sm ${getTrendColor(selectedReport.trends.alertsChange)}`}>
                      {getTrendIcon(selectedReport.trends.alertsChange)}
                      <span>{Math.abs(selectedReport.trends.alertsChange)}%</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {selectedReport.metrics.alerts}
                  </div>
                  <div className="text-sm text-gray-600">Active Alerts</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{selectedReport.metrics.itemsProcessed}</div>
                  <div className="text-sm text-gray-600">Items Processed</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{selectedReport.metrics.lowStockItems}</div>
                  <div className="text-sm text-gray-600">Low Stock Items</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{selectedReport.metrics.expiringItems}</div>
                  <div className="text-sm text-gray-600">Expiring Soon</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{selectedReport.metrics.newSuppliers}</div>
                  <div className="text-sm text-gray-600">New Suppliers</div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Trends Section */}
        <Card className="mb-8 border-gray-200">
          <CardHeader>
            <CardTitle 
              className="text-gray-900 flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection('trends')}
            >
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span>5-Week Trends</span>
              </div>
              {expandedSections.has('trends') ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </CardTitle>
          </CardHeader>
          {expandedSections.has('trends') && (
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={SAMPLE_WEEKLY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="week" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      color: '#1f2937'
                    }} 
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    fill="url(#colorRevenue)"
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          )}
        </Card>

        {/* Top Products Section */}
        <Card className="mb-8 border-gray-200">
          <CardHeader>
            <CardTitle 
              className="text-gray-900 flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection('products')}
            >
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-600" />
                <span>Top Performing Products</span>
              </div>
              {expandedSections.has('products') ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </CardTitle>
          </CardHeader>
          {expandedSections.has('products') && (
            <CardContent>
              <div className="space-y-4">
                {selectedReport.topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Package className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-600">{product.category}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">${product.value.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">{product.quantity} units</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {product.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600" />}
                      {product.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-600" />}
                      {product.trend === 'stable' && <div className="w-4 h-4 bg-gray-400 rounded-full" />}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>

        {/* Alerts Section */}
        <Card className="mb-8 border-gray-200">
          <CardHeader>
            <CardTitle 
              className="text-gray-900 flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection('alerts')}
            >
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span>Active Alerts & Recommendations</span>
              </div>
              {expandedSections.has('alerts') ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </CardTitle>
          </CardHeader>
          {expandedSections.has('alerts') && (
            <CardContent>
              <div className="space-y-4">
                {selectedReport.alerts.map((alert) => (
                  <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${getAlertColor(alert.type)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-semibold mb-1">{alert.message}</div>
                        <div className="text-sm opacity-80">Category: {alert.category}</div>
                      </div>
                      <Badge className="ml-4">
                        {alert.count} {alert.count === 1 ? 'item' : 'items'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={() => exportReport('pdf')} className="bg-red-600 hover:bg-red-700 text-white">
            <Download className="w-4 h-4 mr-2" />
            Export PDF Report
          </Button>
          <Button onClick={() => exportReport('excel')} className="bg-green-600 hover:bg-green-700 text-white">
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            <Mail className="w-4 h-4 mr-2" />
            Email Report
          </Button>
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            <Share className="w-4 h-4 mr-2" />
            Share Report
          </Button>
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            <Printer className="w-4 h-4 mr-2" />
            Print Report
          </Button>
        </div>
      </div>
    </div>
  );
}