/**
 * MaycoleTracker™ Volume XI - Essential Products Intelligence
 * AI-powered essential products analysis and recommendations
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Brain, Package, TrendingUp, AlertTriangle, CheckCircle, 
  ShoppingCart, Star, DollarSign, Clock, Users, Target, Zap, 
  BarChart3, PieChart, Activity, Lightbulb, Award, Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface EssentialProduct {
  id: string;
  name: string;
  category: string;
  industry: string;
  importance: 'critical' | 'high' | 'medium' | 'low';
  currentStock: number;
  recommendedStock: number;
  monthlyUsage: number;
  cost: number;
  supplier: string;
  leadTime: number;
  seasonality: string;
  alternatives: string[];
  businessImpact: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  profitImpact: number;
  customerSatisfaction: number;
  isEssential: boolean;
}

const MOCK_ESSENTIAL_PRODUCTS: EssentialProduct[] = [
  {
    id: 'prod-001',
    name: 'N95 Respirator Masks',
    category: 'Personal Protective Equipment',
    industry: 'Healthcare',
    importance: 'critical',
    currentStock: 150,
    recommendedStock: 500,
    monthlyUsage: 300,
    cost: 2.50,
    supplier: 'MedSupply Direct',
    leadTime: 7,
    seasonality: 'High demand during flu season',
    alternatives: ['KN95 Masks', 'Surgical Masks'],
    businessImpact: 'Critical for patient and staff safety',
    riskLevel: 'critical',
    profitImpact: 85,
    customerSatisfaction: 98,
    isEssential: true
  },
  {
    id: 'prod-002',
    name: 'Fresh Ground Beef',
    category: 'Food Ingredients',
    industry: 'Restaurant',
    importance: 'high',
    currentStock: 25,
    recommendedStock: 50,
    monthlyUsage: 200,
    cost: 8.99,
    supplier: 'Farm Fresh Meats',
    leadTime: 2,
    seasonality: 'Higher demand summer grilling season',
    alternatives: ['Turkey Blend', 'Plant-Based Patties'],
    businessImpact: 'Core menu item, drives 40% of revenue',
    riskLevel: 'high',
    profitImpact: 92,
    customerSatisfaction: 95,
    isEssential: true
  },
  {
    id: 'prod-003',
    name: 'Safety Hard Hats',
    category: 'Safety Equipment',
    industry: 'Construction',
    importance: 'critical',
    currentStock: 45,
    recommendedStock: 100,
    monthlyUsage: 20,
    cost: 25.00,
    supplier: 'Safety First Supply',
    leadTime: 5,
    seasonality: 'Consistent year-round',
    alternatives: ['Bump Caps', 'Climbing Helmets'],
    businessImpact: 'OSHA compliance requirement',
    riskLevel: 'critical',
    profitImpact: 100,
    customerSatisfaction: 100,
    isEssential: true
  },
  {
    id: 'prod-004',
    name: 'POS Receipt Paper',
    category: 'Operational Supplies',
    industry: 'Retail',
    importance: 'high',
    currentStock: 12,
    recommendedStock: 50,
    monthlyUsage: 30,
    cost: 3.25,
    supplier: 'Office Supply Plus',
    leadTime: 3,
    seasonality: 'Higher during holiday seasons',
    alternatives: ['Digital Receipts', 'Email Receipts'],
    businessImpact: 'Required for all transactions',
    riskLevel: 'medium',
    profitImpact: 78,
    customerSatisfaction: 88,
    isEssential: true
  },
  {
    id: 'prod-005',
    name: 'Industrial Lubricants',
    category: 'Maintenance',
    industry: 'Manufacturing',
    importance: 'critical',
    currentStock: 8,
    recommendedStock: 25,
    monthlyUsage: 15,
    cost: 45.00,
    supplier: 'Industrial Solutions Inc',
    leadTime: 10,
    seasonality: 'Consistent usage',
    alternatives: ['Synthetic Oils', 'Bio-based Lubricants'],
    businessImpact: 'Prevents equipment breakdown',
    riskLevel: 'high',
    profitImpact: 95,
    customerSatisfaction: 92,
    isEssential: true
  }
];

export default function EssentialProductsIntelligence() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [products, setProducts] = useState<EssentialProduct[]>(MOCK_ESSENTIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<EssentialProduct | null>(null);
  const [analysisMode, setAnalysisMode] = useState<'overview' | 'critical' | 'recommendations' | 'predictions'>('overview');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const performAIAnalysis = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Voice feedback
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(
          `Essential products analysis complete. Found ${products.filter(p => p.riskLevel === 'critical' || p.riskLevel === 'high').length} high-priority items requiring immediate attention.`
        );
        window.speechSynthesis.speak(utterance);
      }
    }, 3000);
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getStockStatus = (product: EssentialProduct) => {
    const percentage = (product.currentStock / product.recommendedStock) * 100;
    if (percentage < 25) return { status: 'critical', color: 'bg-red-500', text: 'Critical Low' };
    if (percentage < 50) return { status: 'low', color: 'bg-orange-500', text: 'Low Stock' };
    if (percentage < 75) return { status: 'moderate', color: 'bg-yellow-500', text: 'Moderate' };
    return { status: 'good', color: 'bg-green-500', text: 'Good Stock' };
  };

  const criticalProducts = products.filter(p => p.riskLevel === 'critical' || p.importance === 'critical');
  const lowStockProducts = products.filter(p => p.currentStock < p.recommendedStock * 0.5);
  const highImpactProducts = products.filter(p => p.profitImpact > 90);

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
              onClick={performAIAnalysis}
              disabled={isAnalyzing}
              className="text-white"
              style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
            >
              {isAnalyzing ? (
                <>
                  <Activity className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Run AI Analysis
                </>
              )}
            </Button>
            
            <div className="text-right text-gray-600">
              <div className="text-sm font-medium">{currentTime.toLocaleDateString()}</div>
              <div className="text-xs opacity-70">{currentTime.toLocaleTimeString()}</div>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <Brain className="w-10 h-10 inline mr-3" style={{ color: '#007BFF' }} />
            Essential Products Intelligence
          </h1>
          <p className="text-gray-600">AI-powered analysis of critical business inventory and supply recommendations</p>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-gray-200">
            <CardContent className="p-4 text-center">
              <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{products.length}</div>
              <div className="text-sm text-gray-600">Essential Products</div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{criticalProducts.length}</div>
              <div className="text-sm text-gray-600">Critical Items</div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{highImpactProducts.length}</div>
              <div className="text-sm text-gray-600">High Impact</div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4 text-center">
              <ShoppingCart className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{lowStockProducts.length}</div>
              <div className="text-sm text-gray-600">Need Reorder</div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Mode Tabs */}
        <div className="flex space-x-2 mb-6">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'critical', label: 'Critical Items', icon: AlertTriangle },
            { id: 'recommendations', label: 'AI Recommendations', icon: Lightbulb },
            { id: 'predictions', label: 'Predictions', icon: Target }
          ].map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setAnalysisMode(tab.id as any)}
              variant={analysisMode === tab.id ? "default" : "outline"}
              className={`flex items-center space-x-2 ${
                analysisMode === tab.id 
                  ? 'text-white' 
                  : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300'
              }`}
              style={analysisMode === tab.id ? { background: 'linear-gradient(135deg, #007BFF, #0056b3)' } : {}}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </Button>
          ))}
        </div>

        {/* Content based on selected mode */}
        {analysisMode === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Essential Products List */}
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center space-x-2">
                  <Package className="w-5 h-5 text-blue-600" />
                  <span>Essential Products Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {products.map((product) => {
                    const stockStatus = getStockStatus(product);
                    const stockPercentage = (product.currentStock / product.recommendedStock) * 100;
                    
                    return (
                      <div 
                        key={product.id} 
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{product.name}</h4>
                            <p className="text-sm text-gray-600">{product.category}</p>
                          </div>
                          <Badge className={`${getImportanceColor(product.importance)} text-white text-xs`}>
                            {product.importance.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Stock Level</span>
                            <span className={stockStatus.color.replace('bg-', 'text-')}>{stockStatus.text}</span>
                          </div>
                          <Progress value={stockPercentage} className="h-2" />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{product.currentStock} units</span>
                            <span>Target: {product.recommendedStock}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3 text-sm">
                          <span className="text-gray-600">Monthly Usage: {product.monthlyUsage}</span>
                          <span className={`font-medium ${getRiskColor(product.riskLevel)}`}>
                            {product.riskLevel.toUpperCase()} RISK
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Business Impact Analysis */}
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span>Business Impact Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Revenue Impact</h4>
                    <div className="space-y-3">
                      {products.slice(0, 3).map((product) => (
                        <div key={product.id} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{product.name}</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={product.profitImpact} className="w-20 h-2" />
                            <span className="text-sm font-medium">{product.profitImpact}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Customer Satisfaction</h4>
                    <div className="space-y-3">
                      {products.slice(0, 3).map((product) => (
                        <div key={product.id} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{product.name}</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={product.customerSatisfaction} className="w-20 h-2" />
                            <span className="text-sm font-medium">{product.customerSatisfaction}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      AI Insight
                    </h4>
                    <p className="text-sm text-blue-800">
                      Your top 3 essential products contribute 87% of total revenue impact. 
                      Maintaining optimal stock levels for these items is critical for business continuity.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Product Detail Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center justify-between">
                  <span>{selectedProduct.name}</span>
                  <Button
                    onClick={() => setSelectedProduct(null)}
                    variant="outline"
                    size="sm"
                    className="border-gray-300 text-gray-700"
                  >
                    Close
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Industry</label>
                      <p className="text-gray-900">{selectedProduct.industry}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Category</label>
                      <p className="text-gray-900">{selectedProduct.category}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Current Stock</label>
                      <p className="text-gray-900">{selectedProduct.currentStock} units</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Recommended Stock</label>
                      <p className="text-gray-900">{selectedProduct.recommendedStock} units</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Monthly Usage</label>
                      <p className="text-gray-900">{selectedProduct.monthlyUsage} units</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Cost per Unit</label>
                      <p className="text-gray-900">${selectedProduct.cost.toFixed(2)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Supplier</label>
                      <p className="text-gray-900">{selectedProduct.supplier}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Lead Time</label>
                      <p className="text-gray-900">{selectedProduct.leadTime} days</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Business Impact</label>
                    <p className="text-gray-900">{selectedProduct.businessImpact}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Seasonality</label>
                    <p className="text-gray-900">{selectedProduct.seasonality}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Alternatives</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedProduct.alternatives.map((alt, index) => (
                        <Badge key={index} className="bg-gray-100 text-gray-800">
                          {alt}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Profit Impact</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Progress value={selectedProduct.profitImpact} className="flex-1" />
                        <span className="text-sm font-medium">{selectedProduct.profitImpact}%</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Customer Satisfaction</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Progress value={selectedProduct.customerSatisfaction} className="flex-1" />
                        <span className="text-sm font-medium">{selectedProduct.customerSatisfaction}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Button
            onClick={() => navigate('/automated-ordering')}
            className="h-16 text-white"
            style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-semibold">Automated Ordering</div>
              <div className="text-xs opacity-80">Setup smart reordering</div>
            </div>
          </Button>
          
          <Button
            onClick={() => navigate('/voice-alerts')}
            className="h-16 text-white"
            style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
          >
            <AlertTriangle className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-semibold">Voice Alerts</div>
              <div className="text-xs opacity-80">Critical notifications</div>
            </div>
          </Button>
          
          <Button
            onClick={() => navigate('/business-analytics')}
            className="h-16 text-white"
            style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-semibold">Business Analytics</div>
              <div className="text-xs opacity-80">Performance insights</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}