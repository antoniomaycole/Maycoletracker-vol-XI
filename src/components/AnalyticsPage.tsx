/**
 * MaycoleTracker™ vol. XI - Enterprise Edition
 * Analytics Reports System - Professional Implementation
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { BarChart3, TrendingUp, ArrowLeft, FileText, Calendar, Download, Volume2, VolumeX, Users, DollarSign, Package, AlertCircle } from 'lucide-react';
import UniversalBackButton from './UniversalBackButton';

interface ReportData {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

const AnalyticsPage = () => {
  const navigate = useNavigate();
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [reportGenerating, setReportGenerating] = useState<string | null>(null);
  const [lastGenerated, setLastGenerated] = useState<string | null>(null);

  // Enhanced voice synthesis function with your original functionality
  const speak = (text: string) => {
    if (!voiceEnabled) return;
    speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  };

  // Your original report generation functions enhanced
  const generateWeeklyReport = () => {
    setReportGenerating('weekly');
    speak('Weekly report generated');
    
    // Simulate report generation
    setTimeout(() => {
      setReportGenerating(null);
      setLastGenerated('Weekly Report - Generated at ' + new Date().toLocaleString());
    }, 2000);
  };

  const generateMonthlyReport = () => {
    setReportGenerating('monthly');
    speak('Monthly report generated');
    
    // Simulate report generation
    setTimeout(() => {
      setReportGenerating(null);
      setLastGenerated('Monthly Report - Generated at ' + new Date().toLocaleString());
    }, 2500);
  };

  // Sample analytics data
  const analyticsData: ReportData[] = [
    {
      id: '1',
      title: 'Total Revenue',
      value: '$45,678',
      change: '+12.5%',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'text-green-600'
    },
    {
      id: '2',
      title: 'Active Users',
      value: '2,847',
      change: '+8.2%',
      trend: 'up',
      icon: <Users className="w-6 h-6" />,
      color: 'text-blue-600'
    },
    {
      id: '3',
      title: 'Inventory Items',
      value: '1,234',
      change: '-2.1%',
      trend: 'down',
      icon: <Package className="w-6 h-6" />,
      color: 'text-orange-600'
    },
    {
      id: '4',
      title: 'Low Stock Alerts',
      value: '23',
      change: '+5.3%',
      trend: 'up',
      icon: <AlertCircle className="w-6 h-6" />,
      color: 'text-red-600'
    }
  ];

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === 'down') return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
    return <TrendingUp className="w-4 h-4 text-gray-600" />;
  };

  const getTrendColor = (trend: 'up' | 'down' | 'neutral') => {
    if (trend === 'up') return 'text-green-600 bg-green-100';
    if (trend === 'down') return 'text-red-600 bg-red-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h1 className="text-2xl font-bold">
                  MaycoleTracker<span className="text-xs align-super opacity-75">™</span> Analytics Reports
                </h1>
              </div>
              <p className="text-blue-100">
                Comprehensive business analytics with voice-enabled reporting
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`${voiceEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'} text-white`}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4 mr-2" /> : <VolumeX className="w-4 h-4 mr-2" />}
                Voice {voiceEnabled ? 'ON' : 'OFF'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/dashboard')}
                className="btn-on-dark"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Universal Back Button */}
        <UniversalBackButton customBackPath="/logo" showHomeOption={true} />
        
        <div className="space-y-6">
          {/* Analytics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {analyticsData.map((data) => (
              <Card key={data.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{data.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{data.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {getTrendIcon(data.trend)}
                      <span className={`text-sm font-medium ${getTrendColor(data.trend)} px-2 py-1 rounded-full`}>
                        {data.change}
                      </span>
                    </div>
                  </div>
                  <div className={`${data.color}`}>
                    {data.icon}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Report Generation Section */}
          <Card className="p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Generate Reports</h2>
              </div>
              <p className="text-gray-600">
                Generate comprehensive business reports with voice announcements
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weekly Report Card */}
              <Card className="p-6 border-2 border-green-200 bg-green-50">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Weekly Report</h3>
                  <p className="text-gray-600 mb-6">
                    Complete weekly analytics and performance metrics
                  </p>
                  <Button
                    onClick={generateWeeklyReport}
                    disabled={reportGenerating === 'weekly'}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {reportGenerating === 'weekly' ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 mr-2" />
                        Generate Weekly Report
                      </>
                    )}
                  </Button>
                </div>
              </Card>

              {/* Monthly Report Card */}
              <Card className="p-6 border-2 border-blue-200 bg-blue-50">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Monthly Report</h3>
                  <p className="text-gray-600 mb-6">
                    Comprehensive monthly business analysis and trends
                  </p>
                  <Button
                    onClick={generateMonthlyReport}
                    disabled={reportGenerating === 'monthly'}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {reportGenerating === 'monthly' ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Generate Monthly Report
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </div>
          </Card>

          {/* Last Generated Report */}
          {lastGenerated && (
            <Card className="p-6 bg-green-50 border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <Download className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-900">Report Generated Successfully</h4>
                  <p className="text-green-700 text-sm">{lastGenerated}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="w-6 h-6" />
                <span>Return to Dashboard</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2"
                onClick={() => speak('Export functionality activated')}
              >
                <Download className="w-6 h-6" />
                <span>Export Data</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2"
                onClick={() => speak('Advanced analytics mode activated')}
              >
                <TrendingUp className="w-6 h-6" />
                <span>Advanced Analytics</span>
              </Button>
            </div>
          </Card>

          {/* Voice Alert Instructions */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <Volume2 className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Voice Analytics Features</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Voice announcements for report generation completion</li>
                  <li>• Audio feedback for all analytics actions</li>
                  <li>• Toggle voice on/off using the voice button in header</li>
                  <li>• Seamless integration with your existing voice alert system</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;