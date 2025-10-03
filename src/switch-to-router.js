#!/usr/bin/env node

/**
 * 🎯 Quick Router Activation
 * Instantly switch to router navigation with your exact routes
 */

const fs = require('fs');

console.log('🚀 Activating Router Navigation...');

try {
  // Update main.tsx to use regular App (which we'll make the router version)
  const mainContent = `/**
 * MaycoleTracker™ Router Navigation - ACTIVATED
 * Your exact routes: /camera, /scanner, /premium
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from '../App.tsx'  // Now router-based
import '../styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)`;

  // Backup current App.tsx (state-based)
  if (fs.existsSync('./App.tsx')) {
    fs.writeFileSync('./App-StateNavigation.tsx', fs.readFileSync('./App.tsx', 'utf8'));
    console.log('✅ Backed up state navigation: App-StateNavigation.tsx');
  }

  // Copy router integration to App.tsx
  fs.writeFileSync('./App.tsx', fs.readFileSync('./AppRouterIntegration.tsx', 'utf8'));
  console.log('✅ Activated router navigation: App.tsx');

  // Update main.tsx
  fs.writeFileSync('./src/main.tsx', mainContent);
  console.log('✅ Updated main.tsx');

  console.log('');
  console.log('🎉 SUCCESS! Router Navigation Activated');
  console.log('');
  console.log('📋 Your Active Routes:');
  console.log('  📷 /camera   → CameraCapture.tsx');
  console.log('  🔍 /scanner  → ScannerModule.tsx');
  console.log('  👑 /premium  → UserDashboard.tsx (PremiumDashboard)');
  console.log('');
  console.log('🧪 Test: npm run dev');
  console.log('🌐 Visit: http://localhost:5173/camera');
  console.log('');
  console.log('↩️  Switch back: node switch-to-state.js');

} catch (error) {
  console.error('❌ Error:', error.message);
}