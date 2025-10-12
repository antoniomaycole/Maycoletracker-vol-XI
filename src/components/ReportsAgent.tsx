/**
 * MaycoleTracker™ vol. XI - Enterprise Edition
 * Reports Agent - Advanced Reporting System
 */

import React, { useState, useEffect } from 'react';
import { useAgentEvent, useAgentBus } from '../contexts/AgentBusContext';
import { FileText, Download, Calendar, TrendingUp, BarChart3, PieChart, Filter, RefreshCw } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Report {
  id: string;
  name: string;
  type: 'inventory' | 'financial' | 'operational' | 'analytics';
  description: string;
  lastGenerated: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  status: 'ready' | 'generating' | 'scheduled';
  size: string;
  format: 'PDF' | 'Excel' | 'CSV';
}

interface ReportTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  estimatedTime: string;
  popularity: number;
}

// Mock reports data
const mockReports: Report[] = [
  {
    id: '1',
    name: 'Inventory Summary Report',
    type: 'inventory',
    description: 'Complete overview of current inventory levels and stock movements',
    lastGenerated: '2024-01-15 09:30',
    frequency: 'daily',
    status: 'ready',
    size: '2.3 MB',
    format: 'PDF'
  },
  {
    id: '2',
    name: 'Financial Performance Dashboard',
    type: 'financial',
    description: 'Revenue, expenses, and profitability analysis',
    lastGenerated: '2024-01-14 18:45',
    frequency: 'weekly',
    status: 'ready',
    size: '1.8 MB',
    format: 'Excel'
  },
  {
    id: '3',
    name: 'Operational Efficiency Metrics',
    type: 'operational',
    description: 'KPIs and performance indicators across all departments',
    lastGenerated: '2024-01-13 14:20',
    frequency: 'monthly',
    status: 'generating',
    size: '3.1 MB',
    format: 'PDF'
  },
  {
    id: '4',
    name: 'Advanced Analytics Report',
    type: 'analytics',
    description: 'Predictive analytics and trend analysis',
    lastGenerated: '2024-01-12 11:15',
    frequency: 'quarterly',
    status: 'scheduled',
    size: '4.7 MB',
    format: 'CSV'
  }
];

const mockTemplates: ReportTemplate[] = [
  {
    id: '1',
    name: 'Inventory Turnover Analysis',
    category: 'Inventory',
    description: 'Analyze inventory turnover rates and identify slow-moving items',
    estimatedTime: '5 minutes',
    popularity: 95
  },
  {
    id: '2',
    name: 'Cost Analysis Report',
    category: 'Financial',
    description: 'Detailed breakdown of operational costs and expense categories',
    estimatedTime: '8 minutes',
    popularity: 87
  },
  {
    id: '3',
    name: 'Customer Behavior Analytics',
    category: 'Analytics',
    description: 'Customer purchasing patterns and behavior insights',
    estimatedTime: '12 minutes',
    popularity: 76
  },
  {
    id: '4',
    name: 'Supply Chain Performance',
    category: 'Operational',
    description: 'Supplier performance and delivery metrics',
    estimatedTime: '10 minutes',
    popularity: 82
  }
];

const ReportsAgent = () => {
  const [reports] = useState<Report[]>(mockReports);
  const [templates] = useState<ReportTemplate[]>(mockTemplates);
  const [activeTab, setActiveTab] = useState<'recent' | 'templates' | 'scheduled'>('recent');

  // Calculate report statistics
  const totalReports = reports.length;
  const readyReports = reports.filter(r => r.status === 'ready').length;
  const generatingReports = reports.filter(r => r.status === 'generating').length;
  const scheduledReports = reports.filter(r => r.status === 'scheduled').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800';
      case 'generating': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'inventory': return <BarChart3 className="w-4 h-4" />;
      case 'financial': return <TrendingUp className="w-4 h-4" />;
      case 'operational': return <PieChart className="w-4 h-4" />;
      case 'analytics': return <BarChart3 className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'text-green-600';
      case 'weekly': return 'text-blue-600';
      case 'monthly': return 'text-purple-600';
      case 'quarterly': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  // Listen for bus events requesting a weekly report
  const bus = useAgentBus();
  useEffect(() => {
    const unsub = bus.subscribe('request:weekly-report', () => {
      // Simple demo: when requested, log and notify (could trigger generation)
      console.info('ReportsAgent: received request:weekly-report');
      bus.publish('reports:weekly-generated', { timestamp: new Date().toISOString() });
    });
    return () => unsub();
  }, [bus]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <FileText className="w-8 h-8" />
                MaycoleTracker™ Reports Agent
              </h1>
              <p className="text-emerald-100 mt-2">
                Advanced reporting and analytics for comprehensive business insights
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-white text-emerald-600 hover:bg-emerald-50">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh All
              </Button>
              <Button className="bg-white text-emerald-600 hover:bg-emerald-50">
                New Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Report Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">{totalReports}</p>
              </div>
              <FileText className="w-8 h-8 text-emerald-600" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ready</p>
                <p className="text-2xl font-bold text-green-600">{readyReports}</p>
              </div>
              <Download className="w-8 h-8 text-green-600" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Generating</p>
                <p className="text-2xl font-bold text-blue-600">{generatingReports}</p>
              </div>
              <RefreshCw className="w-8 h-8 text-blue-600" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-yellow-600">{scheduledReports}</p>
              </div>
              <Calendar className="w-8 h-8 text-yellow-600" />
            </div>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <Card className="p-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('recent')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'recent'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Recent Reports
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'templates'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Report Templates
            </button>
            <button
              onClick={() => setActiveTab('scheduled')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'scheduled'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Scheduled Reports
            </button>
          </div>
        </Card>

        {/* Recent Reports Tab */}
        {activeTab === 'recent' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Recent Reports</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">Export All</Button>
              </div>
            </div>
            
            {reports.map((report) => (
              <Card key={report.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      {getTypeIcon(report.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{report.name}</h3>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                        <span className={`text-sm font-medium ${getFrequencyColor(report.frequency)}`}>
                          {report.frequency}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{report.description}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span>Last generated: {report.lastGenerated}</span>
                        <span>Size: {report.size}</span>
                        <span>Format: {report.format}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {report.status === 'ready' && (
                      <>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">View</Button>
                      </>
                    )}
                    {report.status === 'generating' && (
                      <Button variant="outline" size="sm" disabled>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </Button>
                    )}
                    {report.status === 'scheduled' && (
                      <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Report Templates Tab */}
        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{template.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Est. time: {template.estimatedTime}</span>
                    <span>{template.popularity}% popularity</span>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-600 h-2 rounded-full" 
                      style={{ width: `${template.popularity}%` }}
                    ></div>
                  </div>
                </div>
                <Button className="w-full">Generate Report</Button>
              </Card>
            ))}
          </div>
        )}

        {/* Scheduled Reports Tab */}
        {activeTab === 'scheduled' && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Scheduled Reports</h3>
            <div className="space-y-4">
              {reports.filter(r => r.frequency !== 'daily').map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(report.type)}
                    <div>
                      <p className="font-medium text-gray-900">{report.name}</p>
                      <p className="text-sm text-gray-600">
                        Next run: {report.frequency} schedule
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit Schedule</Button>
                    <Button variant="outline" size="sm">Run Now</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ReportsAgent;