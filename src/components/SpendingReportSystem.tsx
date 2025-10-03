/**
 * MaycoleTracker™ Volume XI - Advanced Spending Report & Business Necessity Analysis
 * World's most comprehensive spending analysis system with AI-powered business insights
 * Features: Product necessity analysis, ROI scoring, business impact assessment
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, DollarSign, TrendingUp, AlertTriangle, CheckCircle, Package,
  Brain, Target, Award, Shield, Activity, Eye, RefreshCw, Download, Filter,
  Search, Calendar, Building2, Users, BarChart3, Lightbulb, Zap, Calculator
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

interface ProductSpendingAnalysis {
  id: string;
  name: string;
  category: string;
  industry: string;
  totalSpent: number;
  monthlySpend: number;
  yearlySpend: number;
  necessity: 'critical' | 'essential' | 'important' | 'optional';
  businessImpact: number; // 1-100 scale
  roi: number;
  profitability: number;
  supplierName: string;
  supplierReliability: number;
  alternativeSuppliers: number;
  lastOrderDate: string;
  avgOrderFrequency: number; // days
  stockoutRisk: 'high' | 'medium' | 'low';
  replacementCost: number;
  businessDependency: string[];
  revenueContribution: number;
  costTrend: 'increasing' | 'decreasing' | 'stable';
  recommendation: string;
  automatedOrderingEnabled: boolean;
}

interface BusinessNecessityReport {
  industry: string;
  totalProductsAnalyzed: number;
  criticalProducts: number;
  essentialProducts: number;
  totalSpending: number;
  necessarySpending: number;
  wasteSpending: number;
  costOptimizationPotential: number;
  businessContinuityScore: number;
  recommendations: string[];
}

const SAMPLE_SPENDING_DATA: ProductSpendingAnalysis[] = [
  {
    id: '1',
    name: 'N95 Respirator Masks',
    category: 'PPE',
    industry: 'Healthcare',
    totalSpent: 125000,
    monthlySpend: 10500,
    yearlySpend: 126000,
    necessity: 'critical',
    businessImpact: 95,
    roi: 85.0,
    profitability: 42.0,
    supplierName: 'MedSupply Corp',
    supplierReliability: 95,
    alternativeSuppliers: 3,
    lastOrderDate: '2024-01-10T00:00:00Z',
    avgOrderFrequency: 14,
    stockoutRisk: 'low',
    replacementCost: 1.25,
    businessDependency: ['Patient Safety', 'Regulatory Compliance', 'Staff Protection'],
    revenueContribution: 180000,
    costTrend: 'stable',
    recommendation: 'CRITICAL: Maintain current inventory levels. Consider bulk purchasing for 5% cost reduction.',
    automatedOrderingEnabled: true
  },
  {
    id: '2',
    name: 'Premium Coffee Beans',
    category: 'Food Items',
    industry: 'Restaurant',
    totalSpent: 48000,
    monthlySpend: 4000,
    yearlySpend: 48000,
    necessity: 'essential',
    businessImpact: 78,
    roi: 120.0,
    profitability: 65.0,
    supplierName: 'Artisan Coffee Co',
    supplierReliability: 88,
    alternativeSuppliers: 5,
    lastOrderDate: '2024-01-12T00:00:00Z',
    avgOrderFrequency: 7,
    stockoutRisk: 'medium',
    replacementCost: 24.50,
    businessDependency: ['Customer Satisfaction', 'Brand Identity', 'Revenue Stream'],
    revenueContribution: 105600,
    costTrend: 'increasing',
    recommendation: 'ESSENTIAL: High-margin product. Lock in annual contract to avoid 15% price increases.',
    automatedOrderingEnabled: true
  },
  {
    id: '3',
    name: 'Safety Hard Hats',
    category: 'Safety Equipment',
    industry: 'Construction',
    totalSpent: 12000,
    monthlySpend: 1000,
    yearlySpend: 12000,
    necessity: 'critical',
    businessImpact: 92,
    roi: -15.0,
    profitability: -15.0,
    supplierName: 'SafeGuard Industries',
    supplierReliability: 92,
    alternativeSuppliers: 4,
    lastOrderDate: '2024-01-08T00:00:00Z',
    avgOrderFrequency: 45,
    stockoutRisk: 'low',
    replacementCost: 45.00,
    businessDependency: ['Worker Safety', 'OSHA Compliance', 'Legal Requirements', 'Insurance'],
    revenueContribution: 0, // Cost center
    costTrend: 'stable',
    recommendation: 'CRITICAL NECESSITY: Required by law. Negative ROI acceptable for compliance. Essential for business operation.',
    automatedOrderingEnabled: true
  },
  {
    id: '4',
    name: 'Decorative Plants',
    category: 'Office Supplies',
    industry: 'Healthcare',
    totalSpent: 3600,
    monthlySpend: 300,
    yearlySpend: 3600,
    necessity: 'optional',
    businessImpact: 25,
    roi: -85.0,
    profitability: -85.0,
    supplierName: 'GreenSpace Design',
    supplierReliability: 75,
    alternativeSuppliers: 8,
    lastOrderDate: '2024-01-05T00:00:00Z',
    avgOrderFrequency: 30,
    stockoutRisk: 'low',
    replacementCost: 25.00,
    businessDependency: ['Aesthetics', 'Patient Comfort'],
    revenueContribution: 540,
    costTrend: 'stable',
    recommendation: 'NOT NECESSARY: Consider eliminating to save $3,600 annually. Minimal business impact.',
    automatedOrderingEnabled: false
  },
  {
    id: '5',
    name: 'Fresh Organic Vegetables',
    category: 'Food Items',
    industry: 'Restaurant',
    totalSpent: 84000,
    monthlySpend: 7000,
    yearlySpend: 84000,
    necessity: 'essential',
    businessImpact: 85,
    roi: 180.0,
    profitability: 72.0,
    supplierName: 'Farm Fresh Direct',
    supplierReliability: 90,
    alternativeSuppliers: 6,
    lastOrderDate: '2024-01-14T00:00:00Z',
    avgOrderFrequency: 3,
    stockoutRisk: 'high',
    replacementCost: 2.80,
    businessDependency: ['Menu Offerings', 'Food Quality', 'Customer Satisfaction', 'Revenue'],
    revenueContribution: 235200,
    costTrend: 'increasing',
    recommendation: 'ESSENTIAL: High ROI product driving customer satisfaction. Secure seasonal contracts.',
    automatedOrderingEnabled: true
  }
];

export default function SpendingReportSystem() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [spendingData, setSpendingData] = useState<ProductSpendingAnalysis[]>(SAMPLE_SPENDING_DATA);
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedNecessity, setSelectedNecessity] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('businessImpact');
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'necessity' | 'optimization'>('overview');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const generateComprehensiveReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      alert('Comprehensive spending report generated! Check your downloads folder.');
      setIsGenerating(false);
    }, 3000);
  };

  const filteredData = spendingData
    .filter(item => {
      const matchesIndustry = selectedIndustry === 'all' || item.industry.toLowerCase() === selectedIndustry.toLowerCase();
      const matchesNecessity = selectedNecessity === 'all' || item.necessity === selectedNecessity;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesIndustry && matchesNecessity && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'businessImpact':
          return b.businessImpact - a.businessImpact;
        case 'totalSpent':
          return b.totalSpent - a.totalSpent;
        case 'roi':
          return b.roi - a.roi;
        case 'necessity':
          const necessityOrder = { 'critical': 4, 'essential': 3, 'important': 2, 'optional': 1 };
          return necessityOrder[b.necessity] - necessityOrder[a.necessity];
        default:
          return 0;
      }
    });

  const businessReport: BusinessNecessityReport = {
    industry: selectedIndustry === 'all' ? 'Multi-Industry' : selectedIndustry,
    totalProductsAnalyzed: filteredData.length,
    criticalProducts: filteredData.filter(p => p.necessity === 'critical').length,
    essentialProducts: filteredData.filter(p => p.necessity === 'essential').length,
    totalSpending: filteredData.reduce((sum, p) => sum + p.totalSpent, 0),
    necessarySpending: filteredData.filter(p => p.necessity === 'critical' || p.necessity === 'essential').reduce((sum, p) => sum + p.totalSpent, 0),
    wasteSpending: filteredData.filter(p => p.necessity === 'optional' && p.roi < 0).reduce((sum, p) => sum + p.totalSpent, 0),
    costOptimizationPotential: filteredData.reduce((sum, p) => sum + (p.totalSpent * 0.15), 0), // 15% average optimization
    businessContinuityScore: Math.round(filteredData.reduce((sum, p) => sum + p.businessImpact, 0) / filteredData.length),
    recommendations: [
      'Eliminate non-essential spending to save $' + filteredData.filter(p => p.necessity === 'optional' && p.roi < 0).reduce((sum, p) => sum + p.totalSpent, 0).toLocaleString(),
      'Implement automated ordering for critical products to prevent stockouts',
      'Negotiate annual contracts for essential high-volume products',
      'Diversify suppliers for critical products to reduce risk'
    ]
  };

  const getNecessityColor = (necessity: string) => {
    switch (necessity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'essential': return 'bg-orange-500 text-white';
      case 'important': return 'bg-yellow-500 text-white';
      case 'optional': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getROIColor = (roi: number) => {
    if (roi >= 50) return 'text-green-600';
    if (roi >= 0) return 'text-blue-600';
    return 'text-red-600';
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
              onClick={generateComprehensiveReport}
              disabled={isGenerating}
              className="text-white"
              style={{ background: 'linear-gradient(135deg, #4B0082, #6B46C1)' }}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Generate Report
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
            <Calculator className="w-10 h-10 inline mr-3" style={{ color: '#6B46C1' }} />
            Advanced Spending Report & Business Necessity Analysis
          </h1>
          <p className="text-gray-600">AI-powered analysis of product spending and business necessity</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: 'overview', name: 'Business Overview', icon: BarChart3 },
            { id: 'detailed', name: 'Product Analysis', icon: Package },
            { id: 'necessity', name: 'Necessity Matrix', icon: Target },
            { id: 'optimization', name: 'Cost Optimization', icon: TrendingUp }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setViewMode(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                viewMode === tab.id
                  ? 'text-white border-purple-400'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-purple-300'
              }`}
              style={viewMode === tab.id ? { background: 'linear-gradient(135deg, #4B0082, #6B46C1)' } : {}}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Business Overview */}
        {viewMode === 'overview' && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="border-gray-200">
                <CardContent className="p-4 text-center">
                  <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">${businessReport.totalSpending.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Spending</div>
                </CardContent>
              </Card>
              <Card className="border-gray-200">
                <CardContent className="p-4 text-center">
                  <Shield className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{businessReport.criticalProducts}</div>
                  <div className="text-sm text-gray-600">Critical Products</div>
                </CardContent>
              </Card>
              <Card className="border-gray-200">
                <CardContent className="p-4 text-center">
                  <AlertTriangle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">${businessReport.wasteSpending.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Waste Spending</div>
                </CardContent>
              </Card>
              <Card className="border-gray-200">
                <CardContent className="p-4 text-center">
                  <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{businessReport.businessContinuityScore}%</div>
                  <div className="text-sm text-gray-600">Business Continuity</div>
                </CardContent>
              </Card>
            </div>

            {/* Business Necessity Breakdown */}
            <Card className="mb-8 border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center space-x-2">
                  <Brain className="w-5 h-5" style={{ color: '#6B46C1' }} />
                  <span>Business Necessity Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Spending by Necessity</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Critical', value: filteredData.filter(p => p.necessity === 'critical').reduce((sum, p) => sum + p.totalSpent, 0), fill: '#ef4444' },
                            { name: 'Essential', value: filteredData.filter(p => p.necessity === 'essential').reduce((sum, p) => sum + p.totalSpent, 0), fill: '#f97316' },
                            { name: 'Important', value: filteredData.filter(p => p.necessity === 'important').reduce((sum, p) => sum + p.totalSpent, 0), fill: '#eab308' },
                            { name: 'Optional', value: filteredData.filter(p => p.necessity === 'optional').reduce((sum, p) => sum + p.totalSpent, 0), fill: '#6b7280' }
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        />
                        <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">AI Recommendations</h3>
                    <div className="space-y-3">
                      {businessReport.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-blue-800 text-sm">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cost Optimization Potential */}
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span>Cost Optimization Opportunities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      ${businessReport.costOptimizationPotential.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Potential Annual Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {Math.round((businessReport.necessarySpending / businessReport.totalSpending) * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">Necessary Spending</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">
                      {Math.round((businessReport.wasteSpending / businessReport.totalSpending) * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">Waste Spending</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Detailed Product Analysis */}
        {viewMode === 'detailed' && (
          <>
            {/* Filters */}
            <Card className="mb-8 border-gray-200">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search products..."
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
                  </select>
                  <select
                    value={selectedNecessity}
                    onChange={(e) => setSelectedNecessity(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
                  >
                    <option value="all">All Necessity Levels</option>
                    <option value="critical">Critical</option>
                    <option value="essential">Essential</option>
                    <option value="important">Important</option>
                    <option value="optional">Optional</option>
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
                  >
                    <option value="businessImpact">Sort by Business Impact</option>
                    <option value="totalSpent">Sort by Total Spent</option>
                    <option value="roi">Sort by ROI</option>
                    <option value="necessity">Sort by Necessity</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Product List */}
            <div className="space-y-4">
              {filteredData.map((product) => (
                <Card key={product.id} className="border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                          <Badge className={getNecessityColor(product.necessity)}>
                            {product.necessity.toUpperCase()}
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-800">{product.category}</Badge>
                          <Badge className="bg-purple-100 text-purple-800">{product.industry}</Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                          <div>
                            <div className="text-sm text-gray-500">Total Spent</div>
                            <div className="text-lg font-semibold text-gray-900">
                              ${product.totalSpent.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Business Impact</div>
                            <div className="text-lg font-semibold text-gray-900">
                              {product.businessImpact}/100
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">ROI</div>
                            <div className={`text-lg font-semibold ${getROIColor(product.roi)}`}>
                              {product.roi.toFixed(1)}%
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Stockout Risk</div>
                            <Badge className={getRiskColor(product.stockoutRisk)}>
                              {product.stockoutRisk.toUpperCase()}
                            </Badge>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Auto-Order</div>
                            <Badge className={product.automatedOrderingEnabled ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}>
                              {product.automatedOrderingEnabled ? 'Enabled' : 'Disabled'}
                            </Badge>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <div className="text-sm font-medium text-gray-700 mb-2">Business Dependencies:</div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {product.businessDependency.map((dep, index) => (
                              <Badge key={index} className="bg-yellow-100 text-yellow-800">
                                {dep}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-sm font-medium text-gray-700 mb-2">AI Recommendation:</div>
                          <div className="text-sm text-gray-600">{product.recommendation}</div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div>Supplier: {product.supplierName} ({product.supplierReliability}% reliable)</div>
                          <div>{product.alternativeSuppliers} alternative suppliers available</div>
                          <div>Avg order frequency: {product.avgOrderFrequency} days</div>
                        </div>
                      </div>

                      <div className="ml-6 text-center">
                        <div className={`text-3xl font-bold mb-2 ${
                          product.necessity === 'critical' ? 'text-red-600' :
                          product.necessity === 'essential' ? 'text-orange-600' :
                          product.necessity === 'important' ? 'text-yellow-600' :
                          'text-gray-600'
                        }`}>
                          {product.businessImpact}
                        </div>
                        <div className="text-sm text-gray-500">Business Impact</div>
                        {product.necessity === 'critical' && (
                          <Shield className="w-8 h-8 text-red-500 mx-auto mt-2" />
                        )}
                        {product.necessity === 'essential' && (
                          <CheckCircle className="w-8 h-8 text-orange-500 mx-auto mt-2" />
                        )}
                        {product.necessity === 'optional' && product.roi < 0 && (
                          <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mt-2" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Button
            onClick={() => navigate('/business-analytics')}
            className="h-16 text-white"
            style={{ background: 'linear-gradient(135deg, #4B0082, #6B46C1)' }}
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-semibold">Full Analytics</div>
              <div className="text-xs opacity-80">Complete analysis</div>
            </div>
          </Button>
          
          <Button
            onClick={() => navigate('/product-alerts')}
            className="h-16 text-white"
            style={{ background: 'linear-gradient(135deg, #4B0082, #6B46C1)' }}
          >
            <AlertTriangle className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-semibold">Product Alerts</div>
              <div className="text-xs opacity-80">Smart notifications</div>
            </div>
          </Button>
          
          <Button
            onClick={() => navigate('/automated-ordering')}
            className="h-16 text-white"
            style={{ background: 'linear-gradient(135deg, #4B0082, #6B46C1)' }}
          >
            <Zap className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-semibold">Auto-Ordering</div>
              <div className="text-xs opacity-80">Set up automation</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}