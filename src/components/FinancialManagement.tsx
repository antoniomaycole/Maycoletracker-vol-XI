/**
 * Financial Management
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DollarSign, ArrowLeft, TrendingUp, TrendingDown, PieChart, BarChart3,
  CreditCard, Building, Receipt, Calculator, Calendar, Download,
  AlertTriangle, CheckCircle, Target, Crown, Zap, FileText,
  Upload, Settings, Bell, Star, Award, Briefcase, Globe
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import MaycoleTrackerBrand from './MaycoleTrackerBrand';
import UniversalBackButton from './UniversalBackButton';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell
} from 'recharts';

interface FinancialMetric {
  id: string;
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  period: string;
  icon: any;
  color: string;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  status: 'completed' | 'pending' | 'scheduled';
  reference?: string;
}

interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  remaining: number;
  percentage: number;
  status: 'on-track' | 'over-budget' | 'under-budget';
  color: string;
}

export default function FinancialManagement() {
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');
  const [activeTab, setActiveTab] = useState('overview');

  // Financial Metrics
  const financialMetrics: FinancialMetric[] = [
    {
      id: 'revenue',
      title: 'Total Revenue',
      value: '$324,650',
      change: 24.5,
      trend: 'up',
      period: 'This Month',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      id: 'expenses',
      title: 'Total Expenses',
      value: '$186,420',
      change: -8.2,
      trend: 'down',
      period: 'This Month',
      icon: Receipt,
      color: 'text-red-600'
    },
    {
      id: 'profit',
      title: 'Net Profit',
      value: '$138,230',
      change: 35.7,
      trend: 'up',
      period: 'This Month',
      icon: TrendingUp,
      color: 'text-blue-600'
    },
    {
      id: 'cash_flow',
      title: 'Cash Flow',
      value: '$92,840',
      change: 18.3,
      trend: 'up',
      period: 'Available',
      icon: Briefcase,
      color: 'text-purple-600'
    },
    {
      id: 'receivables',
      title: 'Accounts Receivable',
      value: '$67,590',
      change: 12.1,
      trend: 'up',
      period: 'Outstanding',
      icon: FileText,
      color: 'text-orange-600'
    },
    {
      id: 'payables',
      title: 'Accounts Payable',
      value: '$34,280',
      change: -15.4,
      trend: 'down',
      period: 'Due',
      icon: CreditCard,
      color: 'text-pink-600'
    }
  ];

  // Recent Transactions
  const recentTransactions: Transaction[] = [
    {
      id: '1',
      date: '2024-10-02',
      description: 'Healthcare Contract Payment',
      category: 'Sales Revenue',
      amount: 45000,
      type: 'income',
      status: 'completed',
      reference: 'INV-2024-1047'
    },
    {
      id: '2',
      date: '2024-10-01',
      description: 'Office Rent Payment',
      category: 'Facilities',
      amount: -8500,
      type: 'expense',
      status: 'completed',
      reference: 'EXP-2024-0892'
    },
    {
      id: '3',
      date: '2024-10-01',
      description: 'Marketing Campaign Investment',
      category: 'Marketing',
      amount: -12300,
      type: 'expense',
      status: 'completed',
      reference: 'EXP-2024-0891'
    },
    {
      id: '4',
      date: '2024-09-30',
      description: 'Construction Project Milestone',
      category: 'Project Revenue',
      amount: 28750,
      type: 'income',
      status: 'completed',
      reference: 'INV-2024-1046'
    },
    {
      id: '5',
      date: '2024-09-29',
      description: 'Employee Salaries',
      category: 'Human Resources',
      amount: -45600,
      type: 'expense',
      status: 'completed',
      reference: 'PAYROLL-2024-09'
    }
  ];

  // Budget Categories
  const budgetCategories: BudgetCategory[] = [
    {
      id: '1',
      name: 'Human Resources',
      allocated: 80000,
      spent: 68500,
      remaining: 11500,
      percentage: 85.6,
      status: 'on-track',
      color: '#3b82f6'
    },
    {
      id: '2',
      name: 'Marketing & Sales',
      allocated: 35000,
      spent: 28200,
      remaining: 6800,
      percentage: 80.6,
      status: 'on-track',
      color: '#10b981'
    },
    {
      id: '3',
      name: 'Operations',
      allocated: 25000,
      spent: 19800,
      remaining: 5200,
      percentage: 79.2,
      status: 'on-track',
      color: '#f59e0b'
    },
    {
      id: '4',
      name: 'Technology',
      allocated: 20000,
      spent: 22100,
      remaining: -2100,
      percentage: 110.5,
      status: 'over-budget',
      color: '#ef4444'
    },
    {
      id: '5',
      name: 'Facilities',
      allocated: 15000,
      spent: 9200,
      remaining: 5800,
      percentage: 61.3,
      status: 'under-budget',
      color: '#8b5cf6'
    }
  ];

  // Sample chart data
  const revenueData = [
    { month: 'Jan', revenue: 285000, expenses: 195000, profit: 90000 },
    { month: 'Feb', revenue: 298000, expenses: 201000, profit: 97000 },
    { month: 'Mar', revenue: 312000, expenses: 188000, profit: 124000 },
    { month: 'Apr', revenue: 324650, expenses: 186420, profit: 138230 },
  ];

  const expenseBreakdown = [
    { name: 'Human Resources', value: 68500, color: '#3b82f6' },
    { name: 'Marketing', value: 28200, color: '#10b981' },
    { name: 'Operations', value: 19800, color: '#f59e0b' },
    { name: 'Technology', value: 22100, color: '#ef4444' },
    { name: 'Facilities', value: 9200, color: '#8b5cf6' },
    { name: 'Other', value: 15680, color: '#6b7280' }
  ];

  const CHART_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'on-track': return 'bg-green-100 text-green-800';
      case 'over-budget': return 'bg-red-100 text-red-800';
      case 'under-budget': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Math.abs(amount));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Financial Management Header */}
      <div className="bg-gradient-to-r from-green-700 via-blue-700 to-green-700 text-white px-4 py-8">
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
              <p className="text-green-100 mt-1 text-sm">🌍 World's First AI-Powered Financial Intelligence</p>
            </div>
            
            <div className="flex gap-2">
              <Button className="btn-on-dark">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button className="btn-on-dark">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold mb-3 flex items-center justify-center gap-3">
              <DollarSign className="w-10 h-10" />
              Financial Management Center
            </h1>
            <p className="text-green-100 text-lg max-w-3xl mx-auto">
              Complete financial oversight with revenue tracking, expense management, and intelligent forecasting
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Financial Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {[
              { id: 'overview', label: 'Financial Overview', icon: BarChart3 },
              { id: 'transactions', label: 'Transactions', icon: Receipt },
              { id: 'budgets', label: 'Budget Management', icon: Target },
              { id: 'reports', label: 'Financial Reports', icon: FileText }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Financial Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Key Financial Metrics */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <BarChart3 className="w-7 h-7 text-green-600" />
                  Financial Performance Overview
                </h2>
                
                <div className="flex gap-2">
                  {['weekly', 'monthly', 'quarterly', 'yearly'].map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedTimeframe(period)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                        selectedTimeframe === period
                          ? 'bg-green-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {financialMetrics.map((metric) => {
                  const IconComponent = metric.icon;
                  return (
                    <Card key={metric.id} className="maycole-card hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-green-100 to-blue-100 flex items-center justify-center`}>
                            <IconComponent className={`w-6 h-6 ${metric.color}`} />
                          </div>
                          <Badge className="bg-gray-100 text-gray-600">{metric.period}</Badge>
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
                                <Briefcase className="w-4 h-4" />
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

            {/* Financial Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Revenue vs Expenses */}
              <Card className="maycole-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Revenue vs Expenses Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value: any) => [`$${value?.toLocaleString()}`, 'Amount']} />
                        <Area 
                          type="monotone" 
                          dataKey="revenue" 
                          stackId="1"
                          stroke="#10b981" 
                          fill="#10b981" 
                          fillOpacity={0.6}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="expenses" 
                          stackId="2"
                          stroke="#ef4444" 
                          fill="#ef4444" 
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Expense Breakdown */}
              <Card className="maycole-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-blue-600" />
                    Expense Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={expenseBreakdown}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {expenseBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: any) => [`$${(value as number)?.toLocaleString()}`, 'Amount']} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Receipt className="w-7 h-7 text-blue-600" />
                Recent Transactions
              </h2>
              
              <div className="flex gap-2">
                <Button className="btn-primary">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Transactions
                </Button>
                <Button className="btn-primary">
                  <Receipt className="w-4 h-4 mr-2" />
                  New Transaction
                </Button>
              </div>
            </div>

            <Card className="maycole-card">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="text-left py-4 px-6 font-medium text-gray-900">Date</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-900">Description</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-900">Category</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-900">Amount</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-900">Reference</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6 text-sm text-gray-900">
                            {new Date(transaction.date).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-6">
                            <div className="font-medium text-gray-900">{transaction.description}</div>
                          </td>
                          <td className="py-4 px-6">
                            <Badge className="bg-blue-100 text-blue-800">{transaction.category}</Badge>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`font-medium ${
                              transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.type === 'income' ? '+' : ''}
                              {formatCurrency(transaction.amount)}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <Badge className={getStatusBadge(transaction.status)}>
                              {transaction.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-600">
                            {transaction.reference || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Budget Management Tab */}
        {activeTab === 'budgets' && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Target className="w-7 h-7 text-purple-600" />
                Budget Management & Tracking
              </h2>
              
              <Button className="btn-primary">
                <Target className="w-4 h-4 mr-2" />
                Create New Budget
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Budget Categories */}
              <Card className="maycole-card">
                <CardHeader>
                  <CardTitle>Budget Categories Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {budgetCategories.map((category) => (
                      <div key={category.id} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{category.name}</h4>
                          <Badge className={getStatusBadge(category.status)}>
                            {category.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            Spent: {formatCurrency(category.spent)} of {formatCurrency(category.allocated)}
                          </span>
                          <span className={`font-medium ${
                            category.percentage > 100 ? 'text-red-600' : 
                            category.percentage > 80 ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {category.percentage.toFixed(1)}%
                          </span>
                        </div>
                        
                        <div className="maycole-progress-bar">
                          <div 
                            className={`maycole-progress-fill ${
                              category.percentage > 100 ? 'bg-red-500' : 
                              category.percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(category.percentage, 100)}%` }}
                          />
                        </div>
                        
                        <div className="text-sm text-gray-600">
                          Remaining: {category.remaining >= 0 ? 
                            formatCurrency(category.remaining) : 
                            `-${formatCurrency(Math.abs(category.remaining))} over budget`
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Budget Alerts & Recommendations */}
              <Card className="maycole-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-orange-600" />
                    Budget Alerts & Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border-l-4 border-red-500 bg-red-50">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <h4 className="font-medium text-red-800">Over Budget Alert</h4>
                      </div>
                      <p className="text-sm text-red-700">
                        Technology budget is 10.5% over allocated amount. Consider reallocating funds or adjusting spending.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg border-l-4 border-green-500 bg-green-50">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <h4 className="font-medium text-green-800">Budget Optimization</h4>
                      </div>
                      <p className="text-sm text-green-700">
                        Facilities budget is 38.7% under-utilized. Consider reallocating to marketing initiatives.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg border-l-4 border-blue-500 bg-blue-50">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-5 h-5 text-blue-600" />
                        <h4 className="font-medium text-blue-800">Performance Insight</h4>
                      </div>
                      <p className="text-sm text-blue-700">
                        Overall budget performance is excellent with 89.2% efficiency across all categories.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Financial Reports Tab */}
        {activeTab === 'reports' && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <FileText className="w-7 h-7 text-green-600" />
                Financial Reports & Analytics
              </h2>
              
              <div className="flex gap-2">
                <Button className="btn-primary">
                  <Download className="w-4 h-4 mr-2" />
                  Export Reports
                </Button>
                <Button className="btn-primary">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Profit & Loss Statement', description: 'Comprehensive P&L analysis', icon: TrendingUp, color: 'from-green-500 to-green-600' },
                { title: 'Cash Flow Report', description: 'Monthly cash flow breakdown', icon: DollarSign, color: 'from-blue-500 to-blue-600' },
                { title: 'Budget vs Actual', description: 'Budget performance analysis', icon: Target, color: 'from-purple-500 to-purple-600' },
                { title: 'Tax Preparation', description: 'Tax documents and filing prep', icon: Receipt, color: 'from-orange-500 to-orange-600' },
                { title: 'Financial Forecast', description: 'Predictive financial modeling', icon: BarChart3, color: 'from-pink-500 to-pink-600' },
                { title: 'Audit Trail', description: 'Complete transaction history', icon: FileText, color: 'from-indigo-500 to-indigo-600' }
              ].map((report, index) => {
                const IconComponent = report.icon;
                return (
                  <Card key={index} className="maycole-card group cursor-pointer hover:scale-105 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${report.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {report.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4">
                        {report.description}
                      </p>
                      
                      <Button className="w-full btn-primary">
                        Generate Report
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Financial Quick Actions */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-3">
            <Zap className="w-8 h-8 text-green-600" />
            Quick Financial Actions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="btn-primary flex items-center justify-center gap-2 h-14">
              <Receipt className="w-5 h-5" />
              Record Expense
            </Button>
            
            <Button className="btn-primary flex items-center justify-center gap-2 h-14">
              <DollarSign className="w-5 h-5" />
              Log Revenue
            </Button>
            
            <Button className="btn-primary flex items-center justify-center gap-2 h-14">
              <Calculator className="w-5 h-5" />
              Financial Calculator
            </Button>
            
            <Button 
              onClick={() => navigate('/analytics')}
              className="btn-primary flex items-center justify-center gap-2 h-14"
            >
              <BarChart3 className="w-5 h-5" />
              Deep Analytics
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}