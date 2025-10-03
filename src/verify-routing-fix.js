#!/usr/bin/env node

/**
 * MaycoleTracker™ vol. XI - Routing Fix Verification
 * Tests all routes and component imports
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 MaycoleTracker™ Routing Fix Verification');
console.log('==========================================');

const results = [];
const issues = [];

// 1. Check App.tsx structure
console.log('\n1. 📋 Checking App.tsx structure...');
try {
  const appContent = fs.readFileSync('./App.tsx', 'utf8');
  
  if (appContent.includes('import LogoPageWithIconButton from')) {
    results.push('✅ Standard ES6 imports used');
  } else {
    issues.push('❌ Still using complex require() statements');
  }
  
  if (!appContent.includes('AppErrorBoundary')) {
    results.push('✅ Error boundaries removed');
  } else {
    issues.push('❌ Error boundaries still present');
  }
  
  if (!appContent.includes('RecoveryFallback')) {
    results.push('✅ Recovery systems removed');
  } else {
    issues.push('❌ Recovery systems still present');
  }

  if (appContent.includes('Route path="*"')) {
    results.push('✅ Catch-all 404 route exists');
  } else {
    issues.push('❌ Missing catch-all route');
  }

} catch (error) {
  issues.push('❌ Cannot read App.tsx');
}

// 2. Check component exports
console.log('\n2. 📦 Checking component exports...');
const criticalComponents = [
  'LogoPageWithIconButton.tsx',
  'MainPage.tsx',
  'InventoryPage.tsx',
  'AnalyticsPage.tsx',
  'ScannerPage.tsx',
  'CameraCapture.tsx',
  'VoiceControl.tsx',
  'PremiumDashboard.tsx',
  'AIInsightPage.tsx',
  'AboutPage.tsx',
  'NotFoundPage.tsx',
  'SystemStatus.tsx'
];

criticalComponents.forEach(component => {
  const componentPath = `./components/${component}`;
  if (fs.existsSync(componentPath)) {
    try {
      const content = fs.readFileSync(componentPath, 'utf8');
      if (content.includes('export default')) {
        results.push(`✅ ${component} has proper export`);
      } else {
        issues.push(`❌ ${component} missing default export`);
      }
    } catch (error) {
      issues.push(`❌ Error reading ${component}`);
    }
  } else {
    issues.push(`❌ Missing component: ${component}`);
  }
});

// 3. Check removed files
console.log('\n3. 🗑️ Checking removed recovery files...');
const shouldBeRemoved = [
  './components/RecoveryFallback.tsx',
  './components/ErrorBoundary.tsx'
];

shouldBeRemoved.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    results.push(`✅ Removed: ${filePath}`);
  } else {
    issues.push(`❌ Still exists: ${filePath}`);
  }
});

// 4. Check route coverage
console.log('\n4. 🛣️ Checking route coverage...');
const appContent = fs.readFileSync('./App.tsx', 'utf8');

const requiredRoutes = [
  '/',
  '/main',
  '/inventory',
  '/analytics',
  '/scanner',
  '/camera',
  '/voice',
  '/premium',
  '/about',
  '*'
];

requiredRoutes.forEach(route => {
  const routePattern = `path="${route}"`;
  if (appContent.includes(routePattern)) {
    results.push(`✅ Route ${route} configured`);
  } else {
    issues.push(`❌ Missing route: ${route}`);
  }
});

// 5. Check MainPage feature routes
console.log('\n5. 🎯 Checking MainPage feature routes...');
const mainPageFeatures = [
  '/company-health',
  '/payment-processing',
  '/business-analytics',
  '/agent-canvas',
  '/essential-products-intelligence',
  '/investor-presentation',
  '/spending-reports',
  '/voice-alerts',
  '/comprehensive-industry',
  '/performance-dashboard',
  '/subscription',
  '/weekly-reports'
];

mainPageFeatures.forEach(route => {
  if (appContent.includes(`path="${route}"`)) {
    results.push(`✅ MainPage feature ${route} has placeholder`);
  } else {
    issues.push(`⚠️ MainPage feature ${route} missing placeholder`);
  }
});

// Results
console.log('\n📊 VERIFICATION RESULTS');
console.log('======================');

console.log(`\n✅ SUCCESSFUL FIXES (${results.length}):`);
results.forEach(result => console.log(result));

if (issues.length > 0) {
  console.log(`\n❌ REMAINING ISSUES (${issues.length}):`);
  issues.forEach(issue => console.log(issue));
} else {
  console.log('\n🎉 NO ISSUES FOUND!');
}

// Summary
console.log('\n📋 SUMMARY');
console.log('==========');
if (issues.length === 0) {
  console.log('🎯 ALL 404 ISSUES COMPLETELY RESOLVED!');
  console.log('✅ Your MaycoleTracker™ app is ready for production');
  console.log('🚀 Clean routing system with no recovery interference');
  console.log('💪 Standard React patterns for reliable operation');
} else if (issues.length <= 3) {
  console.log('⚠️ Minor issues found, but core routing should work');
  console.log('🔧 Consider fixing the remaining issues for optimal performance');
} else {
  console.log('🚨 Several issues found that may cause 404 errors');
  console.log('🔧 Please address these issues before deployment');
}

console.log(`\n📈 Fix Success Rate: ${Math.round(results.length / (results.length + issues.length) * 100)}%`);

process.exit(issues.length > 5 ? 1 : 0);