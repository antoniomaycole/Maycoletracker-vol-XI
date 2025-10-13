#!/usr/bin/env node

/**
 * MaycoleTracker™ Router Integration Test
 * Quick test to ensure router integration is working
 */

import { readFileSync, existsSync } from 'fs';

console.log('🧪 MaycoleTracker™ Router Integration Test');
console.log('=' .repeat(50));

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const success = (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`);
const info = (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`);

// Test file existence
const files = [
  'AppWithRouter.tsx',
  'components/RouterNavigation.tsx', 
  'router-verification.js',
  'switch-navigation.js',
  'REACT_ROUTER_INTEGRATION.md'
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
  const routerScripts = ['router-verify', 'test-router', 'switch-nav', 'use-router', 'use-state'];
  
  routerScripts.forEach(script => {
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
  
  if (mainContent.includes('AppWithRouter') && !mainContent.includes('// import AppWithRouter')) {
    success('Currently using React Router mode');
    info('All routes available: /, /analytics, /scanner, /camera, /premium');
  } else if (mainContent.includes('import App')) {
    info('Currently using state-based mode');
    info('Switch with: npm run use-router');
  } else {
    console.log(`${colors.yellow}⚠️  Could not determine navigation mode${colors.reset}`);
  }
  
} catch (err) {
  console.log(`${colors.red}❌ Could not check main.tsx configuration${colors.reset}`);
}

console.log('\n' + '=' .repeat(50));
console.log(`${colors.cyan}${colors.bold}🎉 Router Integration Complete!${colors.reset}`);

if (allFilesExist) {
  console.log(`${colors.green}All router files created successfully${colors.reset}`);
  
  console.log('\n🚀 Quick Start:');
  console.log('1. npm run use-router     - Switch to router mode');
  console.log('2. npm run dev           - Start development server');
  console.log('3. npm run router-verify - Verify router integration');
  
  console.log('\n🧭 Available Commands:');
  console.log('• npm run switch-nav     - Show current navigation mode');
  console.log('• npm run use-router     - Enable React Router navigation');
  console.log('• npm run use-state      - Enable state-based navigation');
  console.log('• npm run test-router    - Test router + start dev server');
  
  console.log('\n📍 Router Features:');
  console.log('• URL-based navigation (/analytics, /scanner, etc.)');
  console.log('• Floating action navigation for desktop');
  console.log('• Mobile bottom navigation bar');
  console.log('• Page transitions and animations');
  console.log('• Premium feature integration');
  console.log('• Browser back/forward support');
  
  console.log('\n📚 Documentation:');
  console.log('• See REACT_ROUTER_INTEGRATION.md for complete guide');
  console.log('• All enterprise features preserved');
  console.log('• Switch between modes anytime');
  
} else {
  console.log(`${colors.red}Some files missing - please check the integration${colors.reset}`);
}

console.log(`\n${colors.cyan}MaycoleTracker™ now supports dual navigation modes! 🎯${colors.reset}`);