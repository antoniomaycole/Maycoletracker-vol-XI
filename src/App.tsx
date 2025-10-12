/**
 * MaycoleTracker™ vol. XI - Enterprise Edition
 * CLEAN & WORKING VERSION
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { AgentBusProvider } from './contexts/AgentBusContext';
import InventoryAIAgent from './components/InventoryAIAgent';
import DependenciesAIAgent from './components/DependenciesAIAgent';
import PWAInstallPrompt from './components/PWAInstallPrompt';

// Import global styles
import './styles/globals.css';
// Brand overrides must be loaded after the base variables in globals.css
import './styles/brand-override.css';

// Core Business Components
import LogoPage from './components/LogoPage';
import ComprehensiveInventorySystem from './components/ComprehensiveInventorySystem';
import AdvertisementPage from './components/AdvertisementPage';
import TrainingMode from './components/TrainingMode';
import ReportsAgent from './components/ReportsAgent';
import CalculatorAgent from './components/CalculatorAgent';
import RecoveryCheckAgentBonding from './components/RecoveryCheckAgentBonding';

// Industry Configuration Components
import EnhancedIndustrySelector from './components/EnhancedIndustrySelector';
import MultiIndustryInventorySetup from './components/MultiIndustryInventorySetup';
import IndustryConfiguration from './components/IndustryConfiguration';
import QuickIndustryConfig from './components/QuickIndustryConfig';
import SimpleIndustryConfig from './components/SimpleIndustryConfig';

// Camera & Scanner System
import CameraScanner from './components/CameraScanner';

// Analytics System
import AnalyticsPage from './components/AnalyticsPage';

// Settings & About Pages
import SettingsPage from './components/SettingsPage';
import AboutPage from './components/AboutPage';

// Premium Subscription System
import PremiumSubscriptionPage from './components/PremiumSubscriptionPage';

// Main Business Control Center
import BusinessControlCenter from './components/BusinessControlCenter';

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center">
      <div className="text-center text-white max-w-sm mx-auto px-4">
        <div className="w-16 h-16 mx-auto mb-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <div className="w-8 h-8 bg-white rounded-sm relative">
            <div className="absolute inset-0 bg-blue-600 rounded-sm transform scale-75"></div>
          </div>
        </div>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <h2 className="text-xl font-bold mb-2">MaycoleTracker<span className="tm-standard">TM</span></h2>
        <p className="text-sm font-medium opacity-90 mb-3">Loading...</p>
        <p className="text-xs opacity-70">
          Powered by MaycoleTechnologies™ • Innovation Pipeline: Robotics, Music & Film
        </p>
      </div>
    </div>
  );
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('System Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
          <div className="text-center text-white max-w-lg mx-auto px-4">
            <h1 className="text-2xl font-bold mb-4">System Error</h1>
            <p className="mb-4">Application encountered an unexpected error.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Restart Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Layout wrapper component (removed - not needed for current routes)

export default function App() {
  return (
    <ErrorBoundary>
      <UserProvider>
        <AgentBusProvider>
          <PWAInstallPrompt />
          <Router>
          <React.Suspense fallback={<LoadingScreen />}>
              {/* Global Inventory AI Agent - non-invasive */}
              <InventoryAIAgent />
              <DependenciesAIAgent />
            <Routes>
              <Route path="/logo" element={<LogoPage />} /> {/* DO NOT TOUCH */}
              <Route path="/home" element={<BusinessControlCenter />} /> {/* MAIN CONTROL CENTER */}
              <Route index element={<LogoPage />} /> {/* INDEX ROUTE - LOGO PAGE FIRST */}
              <Route path="/dashboard" element={<ComprehensiveInventorySystem />} />
              <Route path="/ads" element={<AdvertisementPage />} />
              <Route path="/training" element={<TrainingMode />} />
              <Route path="/reports" element={<ReportsAgent />} />
              <Route path="/calculator" element={<CalculatorAgent />} />
              <Route path="/recovery" element={<RecoveryCheckAgentBonding />} />
              
              {/* Industry Configuration Routes */}
              <Route path="/industries" element={<EnhancedIndustrySelector />} />
              <Route path="/setup" element={<MultiIndustryInventorySetup />} />
              <Route path="/setup/:industryType" element={<MultiIndustryInventorySetup />} />
              <Route path="/configure/:industryType" element={<IndustryConfiguration />} />
              <Route path="/quick-setup/:industry" element={<QuickIndustryConfig />} />
              <Route path="/simple-setup/:industry" element={<SimpleIndustryConfig />} />
              
              {/* Camera & Scanner System */}
              <Route path="/camera" element={<CameraScanner />} />
              
              {/* Analytics System */}
              <Route path="/analytics" element={<AnalyticsPage />} />
              
              {/* Settings & About Pages */}
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/about" element={<AboutPage />} />
              
              {/* Premium Subscription System */}
              <Route path="/premium" element={<PremiumSubscriptionPage />} />
              
              {/* Default Route - Logo Page First */}
              <Route path="/" element={<Navigate to="/logo" replace />} />
              <Route path="*" element={<Navigate to="/logo" replace />} />
            </Routes>
          </React.Suspense>
          </Router>
        </AgentBusProvider>
      </UserProvider>
    </ErrorBoundary>
  );
}