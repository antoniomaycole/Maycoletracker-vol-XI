import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, User, Bell, Shield, Palette, Globe, Database, HelpCircle, 
  Info, Share2, Download, Upload, Mic, Camera, BarChart3, Package,
  Cloud, Smartphone, Monitor, Cpu, RefreshCw, AlertTriangle, CheckCircle,
  MoreVertical, Home, ArrowLeft
} from 'lucide-react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import UniversalBackButton from './UniversalBackButton';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [showAppMenu, setShowAppMenu] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [cloudSync, setCloudSync] = useState(true);
  const [systemAlerts, setSystemAlerts] = useState(true);

  // Handle dropdown menu actions
  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: 'MaycoleTracker™ vol. XI - Enterprise Edition',
        text: 'Check out this amazing universal business management platform!',
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
    setShowAppMenu(false);
  };

  const handleExportData = () => {
    // Mock export functionality
    const data = {
      settings: { notifications, darkMode, autoBackup, analytics },
      timestamp: new Date().toISOString(),
      version: 'vol. XI Enterprise'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'maycoletracker-settings.json';
    a.click();
    URL.revokeObjectURL(url);
    setShowAppMenu(false);
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            // Mock import functionality
            alert('Settings imported successfully!');
          } catch (error) {
            alert('Error importing settings file');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
    setShowAppMenu(false);
  };

  const settingsCategories = [
    {
      icon: User,
      title: 'Account',
      description: 'Manage your profile and account settings',
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Configure alerts and notification preferences',
      color: 'from-green-600 to-green-700'
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Security settings and privacy controls',
      color: 'from-red-600 to-red-700'
    },
    {
      icon: Palette,
      title: 'Appearance',
      description: 'Customize the look and feel of your interface',
      color: 'from-purple-600 to-purple-700'
    },
    {
      icon: Globe,
      title: 'Language & Region',
      description: 'Set your language and regional preferences',
      color: 'from-indigo-600 to-indigo-700'
    },
    {
      icon: Database,
      title: 'Data & Storage',
      description: 'Manage your data and backup settings',
      color: 'from-orange-600 to-orange-700'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Universal Back Button */}
        <UniversalBackButton customBackPath="/logo" showHomeOption={true} />
        
        {/* Header with App Menu Dropdown */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Settings className="w-10 h-10 text-blue-600" />
              MaycoleTracker™ Settings
            </h1>
            <p className="text-gray-600 text-lg">
              Complete system configuration and business management preferences.
            </p>
          </div>
          
          {/* THREE-DOT DROPDOWN MENU (Moved from Logo Page) */}
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowAppMenu(!showAppMenu)}
              className="p-3"
              title="App Options Menu"
            >
              <MoreVertical className="w-5 h-5" />
            </Button>
            
            {/* Enhanced App Menu Dropdown */}
            {showAppMenu && (
              <div className="absolute right-0 top-12 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                <button 
                  onClick={() => { navigate('/about'); setShowAppMenu(false); }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                >
                  <Info className="w-4 h-4 text-blue-600" />
                  About MaycoleTracker™
                </button>
                <button 
                  onClick={handleShareClick}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                >
                  <Share2 className="w-4 h-4 text-green-600" />
                  Share Application
                </button>
                <div className="border-t border-gray-100 my-2"></div>
                <button 
                  onClick={handleExportData}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                >
                  <Download className="w-4 h-4 text-purple-600" />
                  Export Settings
                </button>
                <button 
                  onClick={handleImportData}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                >
                  <Upload className="w-4 h-4 text-orange-600" />
                  Import Settings
                </button>
                <div className="border-t border-gray-100 my-2"></div>
                <button 
                  onClick={() => { navigate('/logo'); setShowAppMenu(false); }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                >
                  <Home className="w-4 h-4 text-blue-500" />
                  Return to Logo Page
                </button>
              </div>
            )}
          </div>
        </div>

        {/* System Status Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Status</p>
                <p className="text-2xl font-bold text-green-600">Operational</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </Card>
          
          <Card className="p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Modules</p>
                <p className="text-2xl font-bold text-blue-600">17+</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </Card>
          
          <Card className="p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Industries</p>
                <p className="text-2xl font-bold text-purple-600">9</p>
              </div>
              <Globe className="w-8 h-8 text-purple-600" />
            </div>
          </Card>
          
          <Card className="p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Uptime</p>
                <p className="text-2xl font-bold text-orange-600">99.9%</p>
              </div>
              <Cpu className="w-8 h-8 text-orange-600" />
            </div>
          </Card>
        </div>

        {/* Core System Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-600" />
              Core System Settings
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Push Notifications</h3>
                  <p className="text-sm text-gray-600">Receive system alerts and updates</p>
                </div>
                <Switch 
                  checked={notifications} 
                  onCheckedChange={setNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Dark Mode</h3>
                  <p className="text-sm text-gray-600">Use dark theme interface</p>
                </div>
                <Switch 
                  checked={darkMode} 
                  onCheckedChange={setDarkMode}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Auto Backup</h3>
                  <p className="text-sm text-gray-600">Automatically backup business data</p>
                </div>
                <Switch 
                  checked={autoBackup} 
                  onCheckedChange={setAutoBackup}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Business Analytics</h3>
                  <p className="text-sm text-gray-600">Enable advanced analytics tracking</p>
                </div>
                <Switch 
                  checked={analytics} 
                  onCheckedChange={setAnalytics}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              Business Features
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Voice Activation</h3>
                  <p className="text-sm text-gray-600">Enable voice commands and alerts</p>
                </div>
                <Switch 
                  checked={voiceEnabled} 
                  onCheckedChange={setVoiceEnabled}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Camera Scanner</h3>
                  <p className="text-sm text-gray-600">Enable barcode and document scanning</p>
                </div>
                <Switch 
                  checked={cameraEnabled} 
                  onCheckedChange={setCameraEnabled}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Cloud Sync</h3>
                  <p className="text-sm text-gray-600">Sync data across all devices</p>
                </div>
                <Switch 
                  checked={cloudSync} 
                  onCheckedChange={setCloudSync}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">System Alerts</h3>
                  <p className="text-sm text-gray-600">Critical system notifications</p>
                </div>
                <Switch 
                  checked={systemAlerts} 
                  onCheckedChange={setSystemAlerts}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Access Buttons */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 h-12"
            >
              <Package className="w-4 h-4" />
              Inventory
            </Button>
            <Button 
              onClick={() => navigate('/analytics')}
              className="flex items-center gap-2 h-12"
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </Button>
            <Button 
              onClick={() => navigate('/camera')}
              className="flex items-center gap-2 h-12"
            >
              <Camera className="w-4 h-4" />
              Scanner
            </Button>
            <Button 
              onClick={() => navigate('/setup')}
              className="flex items-center gap-2 h-12"
            >
              <Settings className="w-4 h-4" />
              Setup
            </Button>
          </div>
        </Card>

        {/* Advanced Settings Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {settingsCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.title}
                className="p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {category.description}
                    </p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      Configure
                    </Badge>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* System Information */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Monitor className="w-5 h-5 text-indigo-600" />
            System Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Application Version</h3>
              <p className="text-sm text-gray-600">MaycoleTracker™ vol. XI</p>
              <Badge className="mt-1">Enterprise Edition</Badge>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Technology Stack</h3>
              <p className="text-sm text-gray-600">React 18+ • TypeScript • Tailwind CSS v4</p>
              <Badge variant="outline" className="mt-1">Production Ready</Badge>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Platform Support</h3>
              <p className="text-sm text-gray-600">Web • Mobile • Desktop PWA</p>
              <Badge variant="outline" className="mt-1">Cross-Platform</Badge>
            </div>
          </div>
        </Card>

        {/* Help & Support Section */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Help & Support</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Complete support for your universal business management platform.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-12 flex items-center gap-2">
              <Database className="w-4 h-4" />
              System Documentation
            </Button>
            <Button variant="outline" className="h-12 flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              System Recovery
            </Button>
            <Button variant="outline" className="h-12 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Report Issue
            </Button>
            <Button className="h-12 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Contact Enterprise Support
            </Button>
          </div>
          
          <div className="border-t border-gray-200 mt-6 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Emergency System Reset</h3>
                <p className="text-sm text-gray-600">Reset all settings to factory defaults</p>
              </div>
              <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset System
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}