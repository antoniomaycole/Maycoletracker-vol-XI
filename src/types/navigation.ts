/**
 * Navigation Types for MaycoleTracker™ Volume XI
 * Provides type safety for routing and navigation
 */

export interface RouteConfig {
  path: string;
  name: string;
  icon?: string;
  description?: string;
}

export const ROUTES: Record<string, RouteConfig> = {
  HOME: { path: '/', name: 'MaycoleTracker™', icon: 'home', description: 'MaycoleTracker™ Logo Page' },
  MAIN: { path: '/main', name: 'Dashboard', icon: 'dashboard', description: 'Main Dashboard' },
  SUPPLIES: { path: '/supplies', name: 'Supplies', icon: 'package', description: 'Inventory Management' },
  ANALYTICS: { path: '/analytics', name: 'Analytics', icon: 'chart', description: 'Business Intelligence' },
  SCANNER: { path: '/scanner', name: 'Scanner', icon: 'scan', description: 'Barcode Scanner' },
  AI: { path: '/ai', name: 'AI Insights', icon: 'brain', description: 'AI-Powered Analytics' },
  CAMERA: { path: '/camera', name: 'Camera', icon: 'camera', description: 'Camera Capture Module' },
  SCANNER_MODULE: { path: '/scanner-module', name: 'Scanner Module', icon: 'qr-code', description: 'Advanced Scanner Module' },
  PREMIUM: { path: '/premium', name: 'Premium', icon: 'crown', description: 'Premium Dashboard' },
};

export type RouteKey = keyof typeof ROUTES;

// Backwards-compatible alias for components expecting an `AppScreen` type
export type AppScreen = RouteKey;