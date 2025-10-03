/**
 * ReportsPage Component - Comprehensive Reporting System
 * JSX-ready component for generating and managing business reports
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  Search,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  FileSpreadsheet,
  Mail,
  Clock,
  Eye,
  Share2,
  Settings,
  Plus,
  RefreshCw,
  Archive,
  Star,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Package,
  Users,
  Target
} from 'lucide-react';

interface Report {
  id: string;
  name: string;
  description: string;
  type: 'inventory' | 'financial' | 'performance' | 'compliance';
  format: 'pdf' | 'excel' | 'csv' | 'json';
  category: string;
  lastGenerated: string;
  status: 'ready' | 'generating' | 'scheduled' | 'error';
  size: string;
  downloads: number;
  isFavorite: boolean;
  isScheduled: boolean;
  schedule?: string;
}

interface ReportsPageProps {
  businessConfig?: any;
  className?: string;
}

export function ReportsPage({ businessConfig, className = '' }: ReportsPageProps) {
  const [currentTab, setCurrentTab] = useState('available');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  const [reports] = useState<Report[]>([
    {
      id: '1',
      name: 'Monthly Inventory Summary',
      description: 'Comprehensive overview of inventory levels, movements, and valuation',
      type: 'inventory',
      format: 'pdf',
      category: 'Inventory Management',
      lastGenerated: '2024-01-15T10:30:00Z',
      status: 'ready',
      size: '2.3 MB',
      downloads: 245,
      isFavorite: true,
      isScheduled: true,
      schedule: 'Monthly'
    },
    {
      id: '2',
      name: 'Financial Performance Dashboard',
      description: 'Revenue, costs, and profitability analysis with trends',
      type: 'financial',
      format: 'excel',
      category: 'Financial Analysis',
      lastGenerated: '2024-01-14T16:45:00Z',
      status: 'ready',
      size: '1.8 MB',
      downloads: 189,
      isFavorite: false,
      isScheduled: true,
      schedule: 'Weekly'
    },
    {
      id: '3',
      name: 'Low Stock Alert Report',
      description: 'Items requiring immediate attention and reordering',
      type: 'inventory',
      format: 'csv',
      category: 'Stock Management',
      lastGenerated: '2024-01-15T09:15:00Z',
      status: 'ready',
      size: '156 KB',
      downloads: 78,
      isFavorite: true,
      isScheduled: false
    },
    {
      id: '4',
      name: 'Supplier Performance Analysis',
      description: 'Delivery times, quality ratings, and cost comparison',
      type: 'performance',
      format: 'pdf',
      category: 'Supplier Management',
      lastGenerated: '2024-01-13T14:20:00Z',
      status: 'ready',
      size: '3.1 MB',
      downloads: 134,
      isFavorite: false,
      isScheduled: true,
      schedule: 'Quarterly'
    },
    {
      id: '5',
      name: 'Compliance Audit Trail',
      description: 'Complete audit trail for regulatory compliance',
      type: 'compliance',
      format: 'pdf',
      category: 'Compliance',
      lastGenerated: '2024-01-12T11:00:00Z',
      status: 'generating',
      size: '4.7 MB',
      downloads: 56,
      isFavorite: false,
      isScheduled: true,
      schedule: 'Monthly'
    },
    {
      id: '6',
      name: 'Custom Analytics Report',
      description: 'User-defined metrics and KPIs dashboard',
      type: 'performance',
      format: 'json',
      category: 'Custom Reports',
      lastGenerated: '2024-01-10T13:30:00Z',
      status: 'error',
      size: '892 KB',
      downloads: 23,
      isFavorite: false,
      isScheduled: false
    }
  ]);

  const reportTypes = [
    { value: 'all', label: 'All Reports', icon: FileText },
    { value: 'inventory', label: 'Inventory', icon: Package },
    { value: 'financial', label: 'Financial', icon: DollarSign },
    { value: 'performance', label: 'Performance', icon: Target },
    { value: 'compliance', label: 'Compliance', icon: CheckCircle }
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || report.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getStatusIcon = (status: Report['status']) => {
    switch (status) {
      case 'ready': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'generating': return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'scheduled': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800 border-green-200';
      case 'generating': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getFormatIcon = (format: Report['format']) => {
    switch (format) {
      case 'pdf': return <FileText className="w-4 h-4 text-red-600" />;
      case 'excel': return <FileSpreadsheet className="w-4 h-4 text-green-600" />;
      case 'csv': return <FileSpreadsheet className="w-4 h-4 text-blue-600" />;
      case 'json': return <FileText className="w-4 h-4 text-purple-600" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleGenerateReport = async (reportId: string) => {
    setIsGenerating(reportId);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(null);
    }, 3000);
  };

  const stats = {
    totalReports: reports.length,
    readyReports: reports.filter(r => r.status === 'ready').length,
    scheduledReports: reports.filter(r => r.isScheduled).length,
    favoriteReports: reports.filter(r => r.isFavorite).length
  };

  return (
    <div className={`reports-page ${className}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Reports & Analytics
            </h1>
            <p className="text-lg text-muted-foreground">
              Generate, schedule, and manage comprehensive business reports
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Templates
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Create Report
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-bold">{stats.totalReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ready</p>
                <p className="text-2xl font-bold text-green-600">{stats.readyReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.scheduledReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Star className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Favorites</p>
                <p className="text-2xl font-bold text-purple-600">{stats.favoriteReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="available">Available Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="custom">Custom Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-2 border rounded-md bg-background"
                  >
                    {reportTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reports Grid */}
          <div className="grid gap-6">
            <AnimatePresence>
              {filteredReports.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            {getFormatIcon(report.format)}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{report.name}</h3>
                              {report.isFavorite && (
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {report.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Category: {report.category}</span>
                              <span>Size: {report.size}</span>
                              <span>Downloads: {report.downloads}</span>
                              <span>Last generated: {formatDate(report.lastGenerated)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(report.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(report.status)}
                              {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                            </div>
                          </Badge>
                          
                          {report.isScheduled && (
                            <Badge variant="outline">
                              {report.schedule}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {report.status === 'generating' && (
                            <div className="flex items-center gap-2">
                              <Progress value={65} className="w-24 h-2" />
                              <span className="text-sm text-muted-foreground">65%</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {report.status === 'ready' && (
                            <>
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Share2 className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Mail className="w-4 h-4" />
                              </Button>
                              <Button size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                            </>
                          )}
                          
                          {report.status === 'error' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleGenerateReport(report.id)}
                              disabled={isGenerating === report.id}
                            >
                              <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating === report.id ? 'animate-spin' : ''}`} />
                              Retry
                            </Button>
                          )}
                          
                          {report.status !== 'ready' && report.status !== 'generating' && (
                            <Button 
                              size="sm"
                              onClick={() => handleGenerateReport(report.id)}
                              disabled={isGenerating === report.id}
                            >
                              <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating === report.id ? 'animate-spin' : ''}`} />
                              Generate
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>Automated report generation and delivery</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.filter(r => r.isScheduled).map(report => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Runs {report.schedule?.toLowerCase()} • Next: Tomorrow 9:00 AM
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{report.schedule}</Badge>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Template Cards */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg w-fit mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Inventory Analysis</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive stock levels and movement analysis
                </p>
                <Button size="sm" className="w-full">Use Template</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg w-fit mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Financial Summary</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Revenue, costs, and profitability overview
                </p>
                <Button size="sm" className="w-full">Use Template</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="p-4 bg-purple-100 dark:bg-purple-900/20 rounded-lg w-fit mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Performance Metrics</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  KPIs and performance indicators dashboard
                </p>
                <Button size="sm" className="w-full">Use Template</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom Report Builder</CardTitle>
              <CardDescription>Create personalized reports with your own metrics and filters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                <div className="text-center text-muted-foreground">
                  <Plus className="w-12 h-12 mx-auto mb-4" />
                  <p className="text-lg font-medium">Custom Report Builder</p>
                  <p className="text-sm">Drag and drop interface for creating custom reports</p>
                  <Button className="mt-4">Start Building</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ReportsPage;