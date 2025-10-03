/**
 * MaycoleTracker™ vol. XI — Enterprise Edition
 * PRODUCTION READY VERSION - OPTIMIZED & CLEAN
 * 
 * Features:
 * - ⚡ Optimized performance and error handling
 * - 🛡️ Clean error boundaries
 * - 🚀 Smart component loading
 * - 📱 PWA ready
 * - 🎯 Production architecture
 */

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PerformanceMonitor } from './components/PerformanceMonitor';
import { PerformanceOptimizedApp } from './components/RenderingOptimizationSystem';
import NavigationHeader from './components/NavigationHeader';
import FloatingActionMenu from './components/FloatingActionMenu';
import PWAInstallPrompt, { PWAUpdatePrompt, OfflineIndicator } from './components/PWAInstallPrompt';
import AppRoutes from './components/AppRoutes';
import { useAppInitialization, usePlatformOptimizations } from './components/AppSetup';

// Import global styles
import './styles/globals.css';

export default function App() {
  // Initialize app and platform optimizations
  useAppInitialization();
  usePlatformOptimizations();

  return (
    <ErrorBoundary>
      <PerformanceOptimizedApp>
        <PerformanceMonitor />
        <Router>
          <OfflineIndicator />
          <NavigationHeader />
          <FloatingActionMenu />
          <PWAInstallPrompt />
          <PWAUpdatePrompt />
          <AppRoutes />
        </Router>
      </PerformanceOptimizedApp>
    </ErrorBoundary>
  );
}