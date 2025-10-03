#!/usr/bin/env node

/**
 * 🔄 Switch Back to State Navigation
 * Restore your original state-based navigation system
 */

const fs = require('fs');

console.log('🔄 Switching back to State Navigation...');

try {
  // Restore original App.tsx
  if (fs.existsSync('./App-StateNavigation.tsx')) {
    fs.writeFileSync('./App.tsx', fs.readFileSync('./App-StateNavigation.tsx', 'utf8'));
    console.log('✅ Restored state navigation: App.tsx');
  } else {
    console.log('⚠️  No state navigation backup found');
  }

  // Update main.tsx back to original
  const mainContent = `/**
 * MaycoleTracker™ State Navigation - RESTORED
 * Enterprise system with tab-based navigation
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '../App.tsx'  // State-based navigation
import '../styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)`;

  fs.writeFileSync('./src/main.tsx', mainContent);
  console.log('✅ Restored main.tsx');

  console.log('');
  console.log('🎉 SUCCESS! State Navigation Restored');
  console.log('');
  console.log('📋 Features Available:');
  console.log('  🏗️  Tab-based navigation');
  console.log('  🎯 Industry selector');
  console.log('  📊 Dashboard interface');
  console.log('  👑 Premium features');
  console.log('');
  console.log('🧪 Test: npm run dev');
  console.log('');
  console.log('↪️  Switch back to router: node switch-to-router.js');

} catch (error) {
  console.error('❌ Error:', error.message);
}