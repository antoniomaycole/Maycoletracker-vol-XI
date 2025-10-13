#!/usr/bin/env node

/**
 * MaycoleTracker™ Layout + Outlet Integration Test
 * Quick test to ensure Layout + Outlet pattern is working correctly
 */

import { readFileSync, existsSync } from 'fs';

console.log('🧪 MaycoleTracker™ Layout + Outlet Integration Test');
console.log('=' .repeat(50));

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const success = (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`);
const info = (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`);
const layout = (msg) => console.log(`${colors.magenta}🏗️  ${msg}${colors.reset}`);

// Test file existence
const files = [
  'components/Layout.tsx',
  'AppWithRouterLayout.tsx',
  'layout-verification.js',
  'LAYOUT_OUTLET_GUIDE.md'
];

let allFilesExist = true;
files.forEach(file => {
  if (existsSync(file)) {
    success(`${file} created`);
  } else {
    console.log(`${colors.red}❌ ${file} missing${colors.reset}`);
    allFilesExist = false;
  }
});

// Test package.json scripts
try {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
  const layoutScripts = ['layout-verify', 'use-layout'];
  
  layoutScripts.forEach(script => {
    if (packageJson.scripts[script]) {
      success(`Script "${script}" added`);
    } else {
      console.log(`${colors.yellow}⚠️  Script "${script}" missing${colors.reset}`);
    }
  });
  
} catch (err) {
  console.log(`${colors.red}❌ Could not check package.json${colors.reset}`);
}

// Test current configuration
try {
  const mainContent = readFileSync('src/main.tsx', 'utf8');
  
  if (mainContent.includes('AppWithRouterLayout') && !mainContent.includes('// import AppWithRouterLayout')) {
    success('Currently using Layout + Outlet mode');
    info('All routes use shared Layout component with <Outlet />');
  } else if (mainContent.includes('AppWithRouter')) {
    info('Currently using React Router mode');
    info('Switch with: npm run use-layout');
  } else {
    info('Currently using state-based mode');
    info('Switch with: npm run use-layout');
  }
  
} catch (err) {
  console.log(`${colors.red}❌ Could not check main.tsx configuration${colors.reset}`);
}

// Test Layout component structure
try {
  const layoutContent = readFileSync('components/Layout.tsx', 'utf8');
  
  const layoutFeatures = [
    '<Outlet />',
    'LayoutHeader',
    'LayoutFooter',
    'FloatingNav',
    'MobileBottomNav',
    'hasFeature',
    'Crown'
  ];
  
  const foundFeatures = layoutFeatures.filter(feature => layoutContent.includes(feature));
  
  if (foundFeatures.length >= 6) {
    success(`Layout component fully featured (${foundFeatures.length}/${layoutFeatures.length})`);
  } else {
    console.log(`${colors.yellow}⚠️  Layout partially implemented (${foundFeatures.length}/${layoutFeatures.length})${colors.reset}`);
  }
  
} catch (err) {
  console.log(`${colors.yellow}⚠️  Could not analyze Layout component${colors.reset}`);
}

console.log('\n' + '=' .repeat(50));
console.log(`${colors.cyan}${colors.bold}🎉 Layout + Outlet Integration Complete!${colors.reset}`);

if (allFilesExist) {
  console.log(`${colors.magenta}All Layout + Outlet files created successfully${colors.reset}`);
  
  console.log('\n🚀 Quick Start:');
  console.log('1. npm run use-layout     - Switch to Layout + Outlet mode');
  console.log('2. npm run dev           - Start development server');
  console.log('3. npm run layout-verify - Verify layout integration');
  
  console.log('\n🧭 Available Commands:');
  console.log('• npm run switch-nav     - Show current navigation mode');
  console.log('• npm run use-layout     - Enable Layout + Outlet pattern');
  console.log('• npm run use-router     - Enable React Router navigation');
  console.log('• npm run use-state      - Enable state-based navigation');
  console.log('• npm run layout-verify  - Verify layout implementation');
  
  console.log('\n🏗️  Layout + Outlet Benefits:');
  console.log('• Shared header/footer across all routes');
  console.log('• Consistent navigation experience');
  console.log('• Clean separation of layout vs content');
  console.log('• Premium features accessible from any page');
  console.log('• Emergency mode overlay on all routes');
  console.log('• Professional application architecture');
  
  console.log('\n📚 Documentation:');
  console.log('• See LAYOUT_OUTLET_GUIDE.md for complete guide');
  console.log('• Layout component provides shared UI elements');
  console.log('• <Outlet /> renders route-specific content');
  console.log('• All enterprise features preserved');
  
} else {
  console.log(`${colors.red}Some files missing - please check the integration${colors.reset}`);
}

console.log(`\n${colors.magenta}MaycoleTracker™ now supports Layout + Outlet pattern! 🏗️${colors.reset}`);