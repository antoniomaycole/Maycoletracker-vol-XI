/**
 * Customer Management
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, ArrowLeft, TrendingUp, Phone, Mail, MapPin, Calendar,
  Star, Crown, Zap, Target, Award, Building2, Globe, Plus,
  Search, Filter, Edit, Trash2, Eye, MessageSquare, UserPlus,
  FileText, BarChart3, Heart, AlertCircle, CheckCircle, Clock
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import MaycoleTrackerBrand from './MaycoleTrackerBrand';
import UniversalBackButton from './UniversalBackButton';

interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  location: string;
  status: 'active' | 'prospect' | 'inactive' | 'vip';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  totalValue: number;
  lastContact: string;
  nextFollowUp?: string;
  source: string;
  satisfactionScore: number;
  avatar?: string;
}

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  value: number;
  probability: number;
  source: string;
  assignedTo: string;
  createdAt: string;
  lastActivity: string;
}

interface CRMMetric {
  id: string;
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: any;
  color: string;
}

export default function CustomerManagement() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('customers');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  // CRM Metrics
  const crmMetrics: CRMMetric[] = [
    {
      id: 'total_customers',
      title: 'Total Customers',
      value: 1847,
      change: 12.3,
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      id: 'active_leads',
      title: 'Active Leads',
      value: 234,
      change: 18.7,
      trend: 'up',
      icon: Target,
      color: 'text-green-600'
    },
    {
      id: 'conversion_rate',
      title: 'Conversion Rate',
      value: '34.2%',
      change: 5.8,
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      id: 'customer_satisfaction',
      title: 'Avg. Satisfaction',
      value: '4.8/5',
      change: 2.1,
      trend: 'up',
      icon: Star,
      color: 'text-yellow-600'
    },
    {
      id: 'revenue_per_customer',
      title: 'Revenue/Customer',
      value: '$12,450',
      change: 8.9,
      trend: 'up',
      icon: Crown,
      color: 'text-orange-600'
    },
    {
      id: 'pipeline_value',
      title: 'Pipeline Value',
      value: '$847K',
      change: 15.2,
      trend: 'up',
      icon: BarChart3,
      color: 'text-pink-600'
    }
  ];

  // Sample Customers Data
  const customers: Customer[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      company: 'HealthTech Solutions',
      email: 'sarah.johnson@healthtech.com',
      phone: '+1 (555) 0123',
      industry: 'Healthcare',
      location: 'San Francisco, CA',
      status: 'vip',
      tier: 'platinum',
      totalValue: 95000,
      lastContact: '2024-10-01',
      nextFollowUp: '2024-10-05',
      source: 'Referral',
      satisfactionScore: 5.0
    },
    {
      id: '2',
      name: 'Michael Chen',
      company: 'Urban Bistro Group',
      email: 'michael.chen@urbanbistro.com',
      phone: '+1 (555) 0124',
      industry: 'Restaurant',
      location: 'New York, NY',
      status: 'active',
      tier: 'gold',
      totalValue: 52000,
      lastContact: '2024-09-28',
      nextFollowUp: '2024-10-10',
      source: 'Marketing Campaign',
      satisfactionScore: 4.7
    },
    {
      id: '3',
      name: 'Lisa Rodriguez',
      company: 'BuildRight Construction',
      email: 'lisa.rodriguez@buildright.com',
      phone: '+1 (555) 0125',
      industry: 'Construction',
      location: 'Austin, TX',
      status: 'active',
      tier: 'silver',
      totalValue: 78000,
      lastContact: '2024-09-30',
      source: 'Website',
      satisfactionScore: 4.9
    },
    {
      id: '4',
      name: 'David Kim',
      company: 'TechStart Ventures',
      email: 'david.kim@techstart.com',
      phone: '+1 (555) 0126',
      industry: 'Technology',
      location: 'Seattle, WA',
      status: 'prospect',
      tier: 'bronze',
      totalValue: 15000,
      lastContact: '2024-09-25',
      nextFollowUp: '2024-10-08',
      source: 'LinkedIn',
      satisfactionScore: 4.5
    }
  ];

  // Sample Leads Data
  const leads: Lead[] = [
    {
      id: '1',
      name: 'Emma Wilson',
      company: 'GreenLeaf Pharmaceuticals',
      email: 'emma.wilson@greenleaf.com',
      phone: '+1 (555) 0201',
      status: 'qualified',
      value: 125000,
      probability: 75,
      source: 'Trade Show',
      assignedTo: 'Sales Team A',
      createdAt: '2024-09-15',
      lastActivity: '2024-10-01'
    },
    {
      id: '2',
      name: 'Robert Taylor',
      company: 'Metro Manufacturing',
      email: 'robert.taylor@metro-mfg.com',
      phone: '+1 (555) 0202',
      status: 'proposal',
      value: 89000,
      probability: 60,
      source: 'Cold Call',
      assignedTo: 'Sales Team B',
      createdAt: '2024-09-08',
      lastActivity: '2024-09-30'
    },
    {
      id: '3',
      name: 'Jennifer Martinez',
      company: 'Sunny Side Hotels',
      email: 'jennifer.martinez@sunnyside.com',
      status: 'negotiation',
      value: 156000,
      probability: 85,
      source: 'Referral',
      assignedTo: 'Sales Team A',
      createdAt: '2024-08-22',
      lastActivity: '2024-10-02'
    },
    {
      id: '4',
      name: 'Alex Thompson',
      company: 'EduTech Academy',
      email: 'alex.thompson@edutech.edu',
      phone: '+1 (555) 0204',
      status: 'contacted',
      value: 45000,
      probability: 30,
      source: 'Website Form',
      assignedTo: 'Sales Team C',
      createdAt: '2024-09-28',
      lastActivity: '2024-09-29'
    }
  ];

  const industries = ['all', 'Healthcare', 'Restaurant', 'Construction', 'Manufacturing', 'Technology', 'Education', 'Hospitality'];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'vip': return 'bg-purple-100 text-purple-800';
      case 'prospect': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'proposal': return 'bg-purple-100 text-purple-800';
      case 'negotiation': return 'bg-orange-100 text-orange-800';
      case 'closed-won': return 'bg-green-100 text-green-800';
      case 'closed-lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'bg-gray-800 text-white';
      case 'gold': return 'bg-yellow-500 text-white';
      case 'silver': return 'bg-gray-400 text-white';
      case 'bronze': return 'bg-orange-600 text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getLeadStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return Clock;
      case 'contacted': return Phone;
      case 'qualified': return CheckCircle;
      case 'proposal': return FileText;
      case 'negotiation': return MessageSquare;
      case 'closed-won': return Crown;
      case 'closed-lost': return AlertCircle;
      default: return Target;
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === 'all' || customer.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Customer Management Header */}
      <div className="bg-gradient-to-r from-purple-700 via-blue-700 to-purple-700 text-white px-4 py-8">
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
              <p className="text-purple-100 mt-1 text-sm">🌍 World's First Universal Customer Intelligence Platform</p>
            </div>
            
            <div className="flex gap-2">
              <Button className="btn-on-dark">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Customer
              </Button>
              <Button className="btn-on-dark">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold mb-3 flex items-center justify-center gap-3">
              <Users className="w-10 h-10" />
              Customer Management Center
            </h1>
            <p className="text-purple-100 text-lg max-w-3xl mx-auto">
              Build stronger relationships, manage leads, and drive customer success across all touchpoints
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* CRM Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {[
              { id: 'customers', label: 'Customers', icon: Users },
              { id: 'leads', label: 'Sales Pipeline', icon: Target },
              { id: 'analytics', label: 'CRM Analytics', icon: BarChart3 },
              { id: 'communications', label: 'Communications', icon: MessageSquare }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-purple-600 shadow-sm'
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

        {/* CRM Metrics */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <BarChart3 className="w-7 h-7 text-purple-600" />
            Customer Relationship Metrics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {crmMetrics.map((metric) => {
              const IconComponent = metric.icon;
              return (
                <Card key={metric.id} className="maycole-card hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center`}>
                        <IconComponent className={`w-6 h-6 ${metric.color}`} />
                      </div>
                      <div className={`flex items-center gap-1 ${
                        metric.trend === 'up' ? 'text-green-600' : 
                        metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {metric.change > 0 ? '+' : ''}{metric.change}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900">{metric.title}</h3>
                      <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <>
            {/* Customer Search & Filters */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex gap-4 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search customers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry === 'all' ? 'All Industries' : industry}
                      </option>
                    ))}
                  </select>
                </div>
                
                <Button className="btn-primary">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add New Customer
                </Button>
              </div>
            </div>

            {/* Customer List */}
            <Card className="maycole-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Customer Database ({filteredCustomers.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="text-left py-4 px-6 font-medium text-gray-900">Customer</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-900">Company</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-900">Industry</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-900">Value</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-900">Satisfaction</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCustomers.map((customer) => (
                        <tr key={customer.id} className="border-b hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6">
                            <div>
                              <div className="font-medium text-gray-900">{customer.name}</div>
                              <div className="text-sm text-gray-600">{customer.email}</div>
                              <div className="text-sm text-gray-600">{customer.phone}</div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div>
                              <div className="font-medium text-gray-900">{customer.company}</div>
                              <div className="text-sm text-gray-600">{customer.location}</div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <Badge className="bg-blue-100 text-blue-800">{customer.industry}</Badge>
                          </td>
                          <td className="py-4 px-6">
                            <div className="space-y-1">
                              <Badge className={getStatusBadge(customer.status)}>
                                {customer.status}
                              </Badge>
                              <Badge className={getTierBadge(customer.tier)}>
                                {customer.tier}
                              </Badge>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-medium text-green-600">
                              {formatCurrency(customer.totalValue)}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="font-medium">{customer.satisfactionScore.toFixed(1)}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Mail className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Sales Pipeline Tab */}
        {activeTab === 'leads' && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Target className="w-7 h-7 text-green-600" />
                Sales Pipeline & Lead Management
              </h2>
              
              <div className="flex justify-end">
                <Button className="btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Lead
                </Button>
              </div>
            </div>

            {/* Pipeline Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="maycole-card">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">56</div>
                  <div className="text-sm text-gray-600">New Leads</div>
                </CardContent>
              </Card>
              <Card className="maycole-card">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">34</div>
                  <div className="text-sm text-gray-600">Qualified</div>
                </CardContent>
              </Card>
              <Card className="maycole-card">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">18</div>
                  <div className="text-sm text-gray-600">In Negotiation</div>
                </CardContent>
              </Card>
              <Card className="maycole-card">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <div className="text-sm text-gray-600">Closed Won</div>
                </CardContent>
              </Card>
            </div>

            {/* Lead List */}
            <Card className="maycole-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  Active Leads Pipeline
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="text-left py-4 px-6 font-medium text-gray-900">Lead</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-900">Company</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-900">Value</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-900">Probability</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-900">Assigned To</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((lead) => {
                        const StatusIcon = getLeadStatusIcon(lead.status);
                        return (
                          <tr key={lead.id} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-6">
                              <div>
                                <div className="font-medium text-gray-900">{lead.name}</div>
                                <div className="text-sm text-gray-600">{lead.email}</div>
                                {lead.phone && <div className="text-sm text-gray-600">{lead.phone}</div>}
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="font-medium text-gray-900">{lead.company}</div>
                            </td>
                            <td className="py-4 px-6">
                              <span className="font-medium text-green-600">
                                {formatCurrency(lead.value)}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <Badge className={getStatusBadge(lead.status)}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {lead.status.replace('-', ' ')}
                              </Badge>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-green-500 h-2 rounded-full" 
                                    style={{ width: `${lead.probability}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium">{lead.probability}%</span>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <Badge className="bg-purple-100 text-purple-800">{lead.assignedTo}</Badge>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Phone className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* CRM Quick Actions */}
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-3">
            <Zap className="w-8 h-8 text-purple-600" />
            Quick CRM Actions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="btn-primary flex items-center justify-center gap-2 h-14">
              <UserPlus className="w-5 h-5" />
              Add Customer
            </Button>
            
            <Button className="btn-primary flex items-center justify-center gap-2 h-14">
              <Target className="w-5 h-5" />
              Create Lead
            </Button>
            
            <Button className="btn-primary flex items-center justify-center gap-2 h-14">
              <MessageSquare className="w-5 h-5" />
              Send Campaign
            </Button>
            
            <Button 
              onClick={() => navigate('/analytics')}
              className="btn-primary flex items-center justify-center gap-2 h-14"
            >
              <BarChart3 className="w-5 h-5" />
              CRM Analytics
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}