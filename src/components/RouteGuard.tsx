/**
 * MaycoleTracker™ vol. XI — RouteGuard Component
 * Ensures all routes are properly protected and validated
 */

import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

interface RouteGuardProps {
  children: React.ReactNode;
  allowedPaths?: string[];
}

export function RouteGuard({ children, allowedPaths }: RouteGuardProps) {
  const location = useLocation();
  
  // Define all valid routes for MaycoleTracker™
  const validRoutes = [
    '/',
    '/main',
    '/dashboard',
    '/finance',
    '/customers',
    '/projects',
    '/inventory',
    '/analytics',
    '/scanner',
    '/hr',
    '/sales',
    '/compliance'
  ];

  // Check if current path is valid
  const isValidRoute = validRoutes.includes(location.pathname);
  
  // If route is invalid, redirect to main
  if (!isValidRoute) {
    console.log('🛡️ RouteGuard: Invalid route detected:', location.pathname);
    console.log('🔄 RouteGuard: Redirecting to main...');
    return <Navigate to="/main" replace />;
  }

  // Route is valid, render children
  return <>{children}</>;
}

export default RouteGuard;