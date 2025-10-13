/**
 * Business Dashboard
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, ArrowLeft, TrendingUp, TrendingDown, DollarSign, Users,
  Target, Calendar, Clock, AlertTriangle, CheckCircle, Package,
  BarChart3, Award, Star, Crown, Zap, Brain, Activity, Settings,
  Bell, Mail, Phone, MapPin, Globe, Shield, Rocket, FileText
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import MaycoleTrackerBrand from './MaycoleTrackerBrand';
import UniversalBackButton from './UniversalBackButton';
import SystemStatusWidget from './SystemStatusWidget';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell
} from 'recharts';

interface BusinessMetric {
  id: string;
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  category: string;
  icon: any;
  color: string;
}

interface RecentActivity {
  id: string;
  type: 'sale' | 'project' | 'customer' | 'finance' | 'hr' | 'alert';
  title: string;
  description: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  status: 'completed' | 'pending' | 'urgent';
}

interface BusinessAlert {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  actionRequired: boolean;
}

export default function BusinessDashboard() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Business Performance Metrics
  const businessMetrics: BusinessMetric[] = [
    {
      id: 'revenue',
      title: 'Monthly Revenue',
      value: '$247,830',
      change: 18.5,
      trend: 'up',
      category: 'Finance',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      id: 'customers',
      title: 'Active Customers',
      value: 1847,
      change: 12.3,
      trend: 'up',
      category: 'Sales',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      id: 'projects',
      title: 'Active Projects',
      value: 23,
      change: 8.7,
      trend: 'up',
      category: 'Operations',
      icon: Target,
      color: 'text-purple-600'
    },
    {
      id: 'efficiency',
      title: 'Team Efficiency',
      value: '94.2%',
      change: 3.1,
      trend: 'up',
      category: 'HR',
      icon: Award,
      color: 'text-orange-600'
    },
    {
      id: 'inventory',
      title: 'Inventory Turnover',
      value: '8.3x',
      change: 5.4,
      trend: 'up',
      category: 'Supply Chain',
      icon: Package,
      color: 'text-indigo-600'
    },
    {
      id: 'satisfaction',
      title: 'Customer Satisfaction',
      value: '4.8/5',
      change: 2.1,
      trend: 'up',
      category: 'Service',
      icon: Star,
      color: 'text-yellow-600'
    }
  ];

  // Recent Business Activities
  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'sale',
      title: 'Major Contract Signed',
      description: 'Healthcare client - $45K annual contract secured',
      timestamp: '2 hours ago',
      priority: 'high',
      status: 'completed'
    },
    {
      id: '2',
      type: 'project',
      title: 'Project Milestone Reached',
      description: 'Construction project 85% complete, ahead of schedule',
      timestamp: '4 hours ago',
      priority: 'medium',
      status: 'completed'
    },
    {
      id: '3',
      type: 'customer',
      title: 'New Customer Onboarded',
      description: 'Restaurant chain added to CRM system',
      timestamp: '6 hours ago',
      priority: 'medium',
      status: 'completed'
    },
    {
      id: '4',
      type: 'finance',
      title: 'Invoice Payment Received',
      description: 'Manufacturing client paid $23,500 invoice',
      timestamp: '8 hours ago',
      priority: 'low',
      status: 'completed'
    },
    {
      id: '5',
      type: 'alert',
      title: 'Inventory Low Stock Alert',
      description: 'Medical supplies below minimum threshold',
      timestamp: '12 hours ago',
      priority: 'high',
      status: 'urgent'
    }
  ];

  // Business Alerts
  const businessAlerts: BusinessAlert[] = [
    {
      id: '1',
      type: 'warning',
      title: 'Cash Flow Attention Required',
      message: 'Large payment due next week - ensure adequate liquidity',
      timestamp: '1 hour ago',
      priority: 'high',
      actionRequired: true
    },
    {
      id: '2',
      type: 'success',
      title: 'Sales Target Exceeded',
      message: 'Q4 sales goal achieved 2 weeks early',
      timestamp: '3 hours ago',
      priority: 'medium',
      actionRequired: false
    },
    {
      id: '3',
      type: 'info',
      title: 'System Maintenance Scheduled',
      message: 'Planned maintenance this weekend - minimal downtime expected',
      timestamp: '1 day ago',
      priority: 'low',
      actionRequired: false
    }
  ];

  // Sample chart data
  const revenueData = [
    { month: 'Jan', revenue: 185000, projects: 18, customers: 1650 },
    { month: 'Feb', revenue: 192000, projects: 21, customers: 1720 },
    { month: 'Mar', revenue: 215000, projects: 19, customers: 1780 },
    { month: 'Apr', revenue: 238000, projects: 23, customers: 1847 },
  ];

  const CHART_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'sale': return DollarSign;
      case 'project': return Target;
      case 'customer': return Users;
      case 'finance': return BarChart3;
      case 'hr': return Award;
      case 'alert': return AlertTriangle;
      default: return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'sale': return 'text-green-600 bg-green-100';
      case 'project': return 'text-purple-600 bg-purple-100';
      case 'customer': return 'text-blue-600 bg-blue-100';
      case 'finance': return 'text-orange-600 bg-orange-100';
      case 'hr': return 'text-pink-600 bg-pink-100';
      case 'alert': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Business Dashboard Header */}
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <UniversalBackButton />
            
            <div className="text-center">
              <MaycoleTrackerBrand 
                variant="light" 
                showSubtitle={true} 
                showAppStoreButton={true}
                iconSize={36}
              />
              <p className="text-blue-100 mt-1 text-sm">🌍 World's First Universal Business Command Center</p>
            </div>
            
            <div className="text-right text-sm">
              <div className="text-blue-100">{currentTime.toLocaleDateString()}</div>
              <div className="text-white font-medium">{currentTime.toLocaleTimeString()}</div>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold mb-3 flex items-center justify-center gap-3">
              <Building2 className="w-10 h-10" />
              🌍 Revolutionary Business Operations Dashboard
            </h1>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto">
              <strong>Industry-First:</strong> Real-time AI-powered oversight of all business operations, 
              performance metrics, and strategic indicators - powered by revolutionary universal business intelligence
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Key Business Metrics */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <BarChart3 className="w-7 h-7 text-blue-600" />
              Key Performance Indicators
            </h2>
            
            <div className="flex gap-2">
              {['7d', '30d', '90d', '1y'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedTimeframe(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedTimeframe === period
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessMetrics.map((metric) => {
              const IconComponent = metric.icon;
              return (
                <Card key={metric.id} className="maycole-card hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center`}>
                        <IconComponent className={`w-6 h-6 ${metric.color}`} />
                      </div>
                      <Badge className={getPriorityBadge('low')}>{metric.category}</Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900">{metric.title}</h3>
                      <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                        <div className={`flex items-center gap-1 ${
                          metric.trend === 'up' ? 'text-green-600' : 
                          metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {metric.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : metric.trend === 'down' ? (
                            <TrendingDown className="w-4 h-4" />
                          ) : (
                            <Activity className="w-4 h-4" />
                          )}
                          <span className="text-sm font-medium">
                            {metric.change > 0 ? '+' : ''}{metric.change}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Business Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Revenue Trend */}
          <Card className="maycole-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Revenue Growth Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => [`$${value?.toLocaleString()}`, 'Revenue']} />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke={CHART_COLORS[0]} 
                      fillOpacity={0.6} 
                      fill={CHART_COLORS[0]} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Project & Customer Growth */}
          <Card className="maycole-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Projects & Customer Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="projects" fill={CHART_COLORS[4]} />
                    <Bar dataKey="customers" fill={CHART_COLORS[1]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Recent Business Activities */}
          <Card className="maycole-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Recent Business Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const IconComponent = getActivityIcon(activity.type);
                  const colorClass = getActivityColor(activity.type);
                  
                  return (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`w-10 h-10 rounded-lg ${colorClass} flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900 truncate">{activity.title}</h4>
                          <Badge className={getPriorityBadge(activity.priority)}>{activity.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                        <span className="text-xs text-gray-500">{activity.timestamp}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Business Alerts */}
          <Card className="maycole-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-orange-600" />
                Business Alerts & Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {businessAlerts.map((alert) => (
                  <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                    alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                    alert.type === 'error' ? 'border-red-500 bg-red-50' :
                    alert.type === 'success' ? 'border-green-500 bg-green-50' :
                    'border-blue-500 bg-blue-50'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{alert.title}</h4>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityBadge(alert.priority)}>{alert.priority}</Badge>
                        {alert.actionRequired && (
                          <Badge className="bg-red-100 text-red-800">Action Required</Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                    <span className="text-xs text-gray-500">{alert.timestamp}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Status Widget */}
          <SystemStatusWidget />
        </div>

        {/* Quick Actions Panel */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-3">
            <Rocket className="w-8 h-8 text-blue-600" />
            Quick Business Actions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              onClick={() => navigate('/finance')}
              className="btn-primary flex items-center justify-center gap-2 h-14"
            >
              <DollarSign className="w-5 h-5" />
              Financial Review
            </Button>
            
            <Button 
              onClick={() => navigate('/customers')}
              className="btn-primary flex items-center justify-center gap-2 h-14"
            >
              <Users className="w-5 h-5" />
              Customer Outreach
            </Button>
            
            <Button 
              onClick={() => navigate('/projects')}
              className="btn-primary flex items-center justify-center gap-2 h-14"
            >
              <Target className="w-5 h-5" />
              Project Check-in
            </Button>
            
            <Button 
              onClick={() => navigate('/analytics')}
              className="btn-primary flex items-center justify-center gap-2 h-14"
            >
              <Brain className="w-5 h-5" />
              Deep Analytics
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}