/**
 * MaycoleTracker™ vol. XI - Enterprise Edition  
 * 🔒 PROTECTED ENTRY SYSTEM - No 404 Possible
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';

// Import global styles
import './styles/globals.css';

// 🔒 SEALED ENTRY AGENT
import LogoSeal from './components/LogoSeal';

// Core Business Components - ONLY ESSENTIAL ROUTES
import BusinessDashboard from './components/BusinessDashboard';
import FinancialManagement from './components/FinancialManagement';
import CustomerManagement from './components/CustomerManagement';
import ProjectManagement from './components/ProjectManagement';
import InventoryPage from './components/InventoryPage';
import AnalyticsPage from './components/AnalyticsPage';
import ScannerPage from './components/ScannerPage';
import SettingsPage from './components/SettingsPage';

// Layout Components
import AppHeader from './components/AppHeader';

// Layout wrapper for operational pages
const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-white">
      <AppHeader fontSize={20} />
      {children}
    </div>
  );
};

// Error Boundary
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

export default function App() {
  return (
    <ErrorBoundary>
      <UserProvider>
        <Router>
          <Routes>
            {/* 🔒 SEALED ENTRY POINT - No 404 Possible */}
            <Route path="/" element={<LogoSeal />} />
            
            {/* 🏢 CORE BUSINESS OPERATIONS - Protected Routes */}
            <Route path="/dashboard" element={
              <PageLayout>
                <BusinessDashboard />
              </PageLayout>
            } />
            <Route path="/finance" element={
              <PageLayout>
                <FinancialManagement />
              </PageLayout>
            } />
            <Route path="/customers" element={
              <PageLayout>
                <CustomerManagement />
              </PageLayout>
            } />
            <Route path="/projects" element={
              <PageLayout>
                <ProjectManagement />
              </PageLayout>
            } />
            <Route path="/inventory" element={
              <PageLayout>
                <InventoryPage />
              </PageLayout>
            } />
            <Route path="/analytics" element={
              <PageLayout>
                <AnalyticsPage />
              </PageLayout>
            } />
            <Route path="/scanner" element={
              <PageLayout>
                <ScannerPage />
              </PageLayout>
            } />
            <Route path="/settings" element={
              <PageLayout>
                <SettingsPage />
              </PageLayout>
            } />
            
            {/* 🔁 ULTIMATE FALLBACK - Always Return to Sealed Entry */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </UserProvider>
    </ErrorBoundary>
  );
}