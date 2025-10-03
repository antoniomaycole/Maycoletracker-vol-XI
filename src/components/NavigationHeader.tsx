/**
 * MaycoleTracker™ Volume XI - Professional Navigation Header
 * Clean, minimal navigation with dropdown operations menus
 */

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MaycoleTrackerBrand from './MaycoleTrackerBrand';
import { 
  Home, Info, FolderOpen, Upload, Download, Settings, ChevronDown,
  Package, BarChart3, Scan, Brain, Camera, Mic, AlertTriangle,
  DollarSign, FileText, Users, Building2, Zap, CreditCard,
  Globe, Award, Target, Activity, Menu, X, Search,
  ArrowLeft, Bookmark, Star, Clock, Bell, User
} from 'lucide-react';

interface DropdownItem {
  label: string;
  icon: React.ComponentType<any>;
  path: string;
  description?: string;
  badge?: string;
  pro?: boolean;
}

interface NavigationDropdown {
  label: string;
  icon: React.ComponentType<any>;
  items: DropdownItem[];
}

const NAVIGATION_ITEMS: NavigationDropdown[] = [
  {
    label: 'Operations',
    icon: FolderOpen,
    items: [
      { label: 'Inventory Management', icon: Package, path: '/inventory', description: 'Manage stock levels' },
      { label: 'Scanner System', icon: Scan, path: '/scanner', description: 'Barcode & QR scanning' },
      { label: 'Camera Capture', icon: Camera, path: '/camera', description: 'Photo documentation' },
      { label: 'Voice Control', icon: Mic, path: '/voice', description: 'Hands-free operations' },
      { label: 'Business Config', icon: Settings, path: '/business-config', description: 'System settings' }
    ]
  },
  {
    label: 'Analytics',
    icon: BarChart3,
    items: [
      { label: 'Company Health', icon: Activity, path: '/company-health', description: 'Visual health dashboard' },
      { label: 'Business Analytics', icon: BarChart3, path: '/business-analytics', description: 'Advanced insights' },
      { label: 'Spending Reports', icon: DollarSign, path: '/spending-reports', description: 'Financial analysis' },
      { label: 'Weekly Reports', icon: FileText, path: '/weekly-reports', description: 'Performance summaries' },
      { label: 'AI Insights', icon: Brain, path: '/ai', description: 'Intelligent recommendations' }
    ]
  },
  {
    label: 'Business',
    icon: Building2,
    items: [
      { label: 'Industry Management', icon: Globe, path: '/comprehensive-industry', description: 'Multi-industry tools' },
      { label: 'Training Manual', icon: FileText, path: '/training', description: 'Learning resources' },
      { label: 'Investor Presentation', icon: Award, path: '/investor-presentation', description: 'Business showcase' },
      { label: 'Payment Processing', icon: CreditCard, path: '/payment-processing', description: 'Financial transactions' },
      { label: 'AI Agent System', icon: Zap, path: '/ai-agent', description: 'Automated assistants' }
    ]
  },
  {
    label: 'Tools',
    icon: Settings,
    items: [
      { label: 'Product Alerts', icon: Bell, path: '/product-alerts', description: 'Smart notifications' },
      { label: 'Voice Alerts', icon: Mic, path: '/voice-alerts', description: 'Audio notifications' },
      { label: 'Essential Products AI', icon: Brain, path: '/essential-products-intelligence', description: 'Product intelligence' },
      { label: 'Subscription Manager', icon: Star, path: '/subscription', description: 'Plan management' },
      { label: 'User Dashboard', icon: User, path: '/dashboard', description: 'Personal overview' }
    ]
  }
];

const MAIN_NAV_ITEMS = [
  { label: 'Home', icon: Home, path: '/main' },
  { label: 'About', icon: Info, path: '/about' }
];

export default function NavigationHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // PROTECTED: Never show header on logo page - keeps logo page completely untouched
  if (location.pathname === '/') {
    return null;
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && dropdownRefs.current[activeDropdown]) {
        const dropdownElement = dropdownRefs.current[activeDropdown];
        if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
          setActiveDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  const handleDropdownToggle = (dropdownKey: string) => {
    setActiveDropdown(activeDropdown === dropdownKey ? null : dropdownKey);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    
    // Voice feedback
    if ('speechSynthesis' in window) {
      const pathName = path.replace('/', '').replace('-', ' ');
      const voiceText = pathName === 'home' ? 'MaycoleTracker Business Control Center' : 
                       pathName === 'logo' ? 'MaycoleTracker' :
                       `Navigating to ${pathName}`;
      const utterance = new SpeechSynthesisUtterance(voiceText);
      utterance.volume = 0.3;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.csv,.xlsx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('Importing file:', file.name);
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(`Importing file: ${file.name}`);
          utterance.volume = 0.3;
          window.speechSynthesis.speak(utterance);
        }
      }
    };
    input.click();
  };

  const handleExport = () => {
    const data = { 
      timestamp: new Date().toISOString(),
      system: 'MaycoleTracker™ Volume XI',
      version: 'Enterprise Edition'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `maycoletracker-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('Data exported successfully');
      utterance.volume = 0.3;
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredItems = searchQuery
    ? NAVIGATION_ITEMS.flatMap(category => 
        category.items.filter(item => 
          item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : [];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand - Universal MaycoleTracker™ Stamp */}
          <div className="flex items-center space-x-4">
            <MaycoleTrackerBrand 
              size="medium"
              variant="horizontal"
              navigateTo="/main"
              iconSize={32}
              className="text-gray-900 hover:text-blue-600 transition-colors"
            />
            
            {/* Breadcrumb */}
            {location.pathname !== '/main' && (
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                <span className="capitalize">
                  {location.pathname.replace('/', '').replace('-', ' ') || 'Dashboard'}
                </span>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* Main Navigation */}
            {MAIN_NAV_ITEMS.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}

            {/* Dropdown Menus */}
            {NAVIGATION_ITEMS.map((dropdown) => (
              <div
                key={dropdown.label}
                className="relative"
                ref={(el) => (dropdownRefs.current[dropdown.label] = el)}
              >
                <button
                  onClick={() => handleDropdownToggle(dropdown.label)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeDropdown === dropdown.label
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <dropdown.icon className="w-4 h-4" />
                  <span>{dropdown.label}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${
                    activeDropdown === dropdown.label ? 'rotate-180' : ''
                  }`} />
                </button>

                {activeDropdown === dropdown.label && (
                  <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="max-h-96 overflow-y-auto">
                      {dropdown.items.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleNavigation(item.path)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors group"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                              <item.icon className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <div className="text-sm font-medium text-gray-900">{item.label}</div>
                                {item.pro && (
                                  <span className="px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                                    PRO
                                  </span>
                                )}
                                {item.badge && (
                                  <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              {item.description && (
                                <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* File Operations */}
            <div className="flex items-center space-x-1 ml-4 pl-4 border-l border-gray-200">
              <button
                onClick={handleImport}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                title="Import Data"
              >
                <Upload className="w-4 h-4" />
                <span className="hidden xl:block">Import</span>
              </button>
              
              <button
                onClick={handleExport}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                title="Export Data"
              >
                <Download className="w-4 h-4" />
                <span className="hidden xl:block">Export</span>
              </button>
            </div>
          </nav>

          {/* Search & Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Search (Desktop) */}
            <div className="hidden md:relative md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Search Results */}
              {searchQuery && filteredItems.length > 0 && (
                <div className="absolute top-full right-0 mt-1 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Search Results
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {filteredItems.slice(0, 6).map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          handleNavigation(item.path);
                          setSearchQuery('');
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className="w-4 h-4 text-blue-600" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.label}</div>
                            {item.description && (
                              <div className="text-xs text-gray-500">{item.description}</div>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="py-4 space-y-2">
              {/* Mobile Search */}
              <div className="px-2 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search features..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Main Navigation */}
              {MAIN_NAV_ITEMS.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}

              {/* Mobile Dropdowns */}
              {NAVIGATION_ITEMS.map((dropdown) => (
                <div key={dropdown.label}>
                  <button
                    onClick={() => handleDropdownToggle(`mobile-${dropdown.label}`)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <dropdown.icon className="w-5 h-5" />
                      <span className="font-medium">{dropdown.label}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${
                      activeDropdown === `mobile-${dropdown.label}` ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  {activeDropdown === `mobile-${dropdown.label}` && (
                    <div className="bg-gray-50 border-t border-gray-200">
                      {dropdown.items.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleNavigation(item.path)}
                          className="w-full flex items-center space-x-3 pl-12 pr-4 py-3 text-left text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          <item.icon className="w-4 h-4" />
                          <div>
                            <div className="text-sm font-medium">{item.label}</div>
                            {item.description && (
                              <div className="text-xs text-gray-500">{item.description}</div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile File Operations */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex space-x-2 px-4">
                  <button
                    onClick={handleImport}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span className="text-sm font-medium">Import</span>
                  </button>
                  
                  <button
                    onClick={handleExport}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-sm font-medium">Export</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}