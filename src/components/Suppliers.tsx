import React, { useState } from 'react';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ArrowLeft, Users, Star, Clock, DollarSign, TrendingUp, Phone, Mail, Plus } from 'lucide-react';
import { AppScreen } from '../App';

interface SuppliersProps {
  onNavigate: (screen: AppScreen) => void;
}

export function Suppliers({ onNavigate }: SuppliersProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const suppliers = [
    {
      id: '1',
      name: 'Ocean Fresh Seafood',
      category: 'Seafood',
      rating: 4.2,
      deliveryTime: 1.8,
      qualityScore: 4.5,
      priceCompetitiveness: 3.8,
      reliability: 92,
      totalOrders: 24,
      lastDelivery: '2024-12-10',
      phone: '+1 (555) 123-4567',
      email: 'orders@oceanfresh.com',
      address: '123 Harbor St, Seattle, WA',
      certifications: ['FDA Approved', 'Sustainable Fishing'],
      paymentTerms: 'Net 30',
      minimumOrder: 500,
      specialties: ['Wild Salmon', 'Pacific Cod', 'Dungeness Crab'],
      recentIssues: ['Delivery 2 days late on Dec 8'],
      costTrend: 'stable',
      performance: [
        { month: 'Jan', rating: 4.1, cost: 2450 },
        { month: 'Feb', rating: 4.0, cost: 2380 },
        { month: 'Mar', rating: 4.3, cost: 2520 },
        { month: 'Apr', rating: 4.2, cost: 2490 }
      ]
    },
    {
      id: '2',
      name: 'Farm Direct Produce',
      category: 'Produce',
      rating: 4.7,
      deliveryTime: 1.2,
      qualityScore: 4.8,
      priceCompetitiveness: 4.2,
      reliability: 96,
      totalOrders: 18,
      lastDelivery: '2024-12-11',
      phone: '+1 (555) 987-6543',
      email: 'sales@farmdirect.com',
      address: '456 Farm Rd, Yakima, WA',
      certifications: ['Organic Certified', 'Local Producer'],
      paymentTerms: 'Net 15',
      minimumOrder: 200,
      specialties: ['Organic Vegetables', 'Seasonal Fruits', 'Herbs'],
      recentIssues: [],
      costTrend: 'decreasing',
      performance: [
        { month: 'Jan', rating: 4.5, cost: 1850 },
        { month: 'Feb', rating: 4.6, cost: 1820 },
        { month: 'Mar', rating: 4.8, cost: 1790 },
        { month: 'Apr', rating: 4.7, cost: 1760 }
      ]
    },
    {
      id: '3',
      name: 'Specialty Foods Inc',
      category: 'Dry Goods',
      rating: 3.9,
      deliveryTime: 2.1,
      qualityScore: 4.1,
      priceCompetitiveness: 3.5,
      reliability: 88,
      totalOrders: 12,
      lastDelivery: '2024-12-09',
      phone: '+1 (555) 456-7890',
      email: 'orders@specialtyfoods.com',
      address: '789 Industrial Blvd, Portland, OR',
      certifications: ['HACCP Certified'],
      paymentTerms: 'Net 45',
      minimumOrder: 1000,
      specialties: ['Imported Rice', 'Specialty Oils', 'Spices'],
      recentIssues: ['Quality issue with rice batch #R2024-45'],
      costTrend: 'increasing',
      performance: [
        { month: 'Jan', rating: 4.0, cost: 3200 },
        { month: 'Feb', rating: 3.8, cost: 3350 },
        { month: 'Mar', rating: 3.9, cost: 3400 },
        { month: 'Apr', rating: 3.9, cost: 3450 }
      ]
    }
  ];

  const [selectedSupplier, setSelectedSupplier] = useState(suppliers[0]);

  const getPerformanceColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return '📈';
      case 'decreasing': return '📉';
      default: return '➡️';
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          onClick={() => onNavigate('dashboard')}
          variant="ghost"
          size="sm"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          🚚 Supplier Management
        </h1>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{suppliers.length}</div>
                <div className="text-sm text-muted-foreground">Active Suppliers</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold">
                  {(suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length).toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold">
                  {(suppliers.reduce((sum, s) => sum + s.deliveryTime, 0) / suppliers.length).toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">Avg Delivery (days)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">
                  {Math.round(suppliers.reduce((sum, s) => sum + s.reliability, 0) / suppliers.length)}%
                </div>
                <div className="text-sm text-muted-foreground">Avg Reliability</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Suppliers List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Suppliers</CardTitle>
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {suppliers.map((supplier) => (
                <div
                  key={supplier.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedSupplier.id === supplier.id ? 'border-primary bg-primary/5' : 'hover:bg-accent'
                  }`}
                  onClick={() => setSelectedSupplier(supplier)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-sm">{supplier.name}</div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{supplier.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <Badge variant="outline" className="text-xs">
                      {supplier.category}
                    </Badge>
                    <span className="ml-2">{supplier.reliability}% reliable</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Supplier Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{selectedSupplier.name}</span>
              <Badge variant="outline">{selectedSupplier.category}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Contact Information</h4>
                <div className="text-sm space-y-1">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {selectedSupplier.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {selectedSupplier.email}
                  </div>
                  <div className="text-muted-foreground">
                    {selectedSupplier.address}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Business Terms</h4>
                <div className="text-sm space-y-1">
                  <div>Payment: {selectedSupplier.paymentTerms}</div>
                  <div>Minimum Order: ${selectedSupplier.minimumOrder}</div>
                  <div>Last Delivery: {selectedSupplier.lastDelivery}</div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="space-y-4">
              <h4 className="font-medium">Performance Metrics</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getPerformanceColor(selectedSupplier.rating)}`}>
                    {selectedSupplier.rating.toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">Overall Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{selectedSupplier.deliveryTime}</div>
                  <div className="text-sm text-muted-foreground">Avg Days</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{selectedSupplier.qualityScore}</div>
                  <div className="text-sm text-muted-foreground">Quality</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{selectedSupplier.reliability}%</div>
                  <div className="text-sm text-muted-foreground">Reliability</div>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Performance</span>
                    <span>{selectedSupplier.rating.toFixed(1)}/5</span>
                  </div>
                  <Progress value={selectedSupplier.rating * 20} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Price Competitiveness</span>
                    <span>{selectedSupplier.priceCompetitiveness.toFixed(1)}/5</span>
                  </div>
                  <Progress value={selectedSupplier.priceCompetitiveness * 20} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Reliability</span>
                    <span>{selectedSupplier.reliability}%</span>
                  </div>
                  <Progress value={selectedSupplier.reliability} />
                </div>
              </div>
            </div>

            {/* Specialties */}
            <div className="space-y-2">
              <h4 className="font-medium">Specialties</h4>
              <div className="flex flex-wrap gap-2">
                {selectedSupplier.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-2">
              <h4 className="font-medium">Certifications</h4>
              <div className="flex flex-wrap gap-2">
                {selectedSupplier.certifications.map((cert, index) => (
                  <Badge key={index} variant="outline" className="text-green-600 border-green-600">
                    ✓ {cert}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Cost Trend */}
            <div className="space-y-2">
              <h4 className="font-medium">Cost Trend</h4>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getTrendIcon(selectedSupplier.costTrend)}</span>
                <span className="capitalize">{selectedSupplier.costTrend}</span>
                <span className="text-sm text-muted-foreground">
                  over last 4 months
                </span>
              </div>
            </div>

            {/* Recent Issues */}
            {selectedSupplier.recentIssues.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-orange-600">Recent Issues</h4>
                <div className="space-y-1">
                  {selectedSupplier.recentIssues.map((issue, index) => (
                    <div key={index} className="p-2 bg-orange-50 text-orange-800 rounded text-sm">
                      ⚠️ {issue}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button size="sm">
                📞 Contact
              </Button>
              <Button size="sm" variant="outline">
                📊 View History
              </Button>
              <Button size="sm" variant="outline">
                ⭐ Rate Delivery
              </Button>
              <Button size="sm" variant="outline">
                🛒 Place Order
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🧠 AI Supplier Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">🏆 Top Performer</h4>
              <p className="text-sm text-green-700">
                Farm Direct Produce has the highest overall score (4.7/5) with excellent reliability and competitive pricing. Consider increasing orders.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">⚠️ Needs Attention</h4>
              <p className="text-sm text-yellow-700">
                Specialty Foods Inc has increasing costs and delivery issues. Schedule a meeting to discuss improvements or consider alternatives.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">💡 Optimization</h4>
              <p className="text-sm text-blue-700">
                Consolidating orders with top-rated suppliers could save an estimated $300/month and improve delivery consistency.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Button onClick={() => onNavigate('dashboard')} variant="outline">
          🏠 Back to Dashboard
        </Button>
        <Button onClick={() => onNavigate('analytics')} variant="outline">
          📊 View Analytics
        </Button>
        <Button onClick={() => onNavigate('reports')} variant="outline">
          📋 Generate Report
        </Button>
      </div>
    </div>
  );
}