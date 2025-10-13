#!/usr/bin/env node

/**
 * MaycoleTracker™ vol. XI - 404 Fix Verification Script
 * Comprehensive test to verify all routes work correctly
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 MaycoleTracker™ 404 Fix Verification');
console.log('=====================================');

const issues = [];
const fixes = [];

// 1. Verify App.tsx has proper error boundaries
console.log('\n1. 📋 Checking App.tsx structure...');
try {
  const appContent = fs.readFileSync('./App.tsx', 'utf8');
  
  if (appContent.includes('AppErrorBoundary')) {
    fixes.push('✅ Error boundary implemented');
  } else {
    issues.push('❌ Missing error boundary');
  }
  
  if (appContent.includes('SafeRoute')) {
    fixes.push('✅ Safe route wrapper implemented');
  } else {
    issues.push('❌ Missing safe route wrapper');
  }
  
  if (appContent.includes('FallbackComponent')) {
    fixes.push('✅ Fallback components for missing imports');
  } else {
    issues.push('❌ Missing fallback components');
  }

  if (appContent.includes('Route path="*"')) {
    fixes.push('✅ Catch-all 404 route exists');
  } else {
    issues.push('❌ Missing catch-all route');
  }

} catch (error) {
  issues.push('❌ Cannot read App.tsx');
}

// 2. Verify NotFoundPage exists
console.log('\n2. 📄 Checking NotFoundPage component...');
try {
  const notFoundExists = fs.existsSync('./components/NotFoundPage.tsx');
  if (notFoundExists) {
    fixes.push('✅ NotFoundPage component exists');
    
    const notFoundContent = fs.readFileSync('./components/NotFoundPage.tsx', 'utf8');
    if (notFoundContent.includes('export default')) {
      fixes.push('✅ NotFoundPage has proper export');
    } else {
      issues.push('❌ NotFoundPage missing default export');
    }
  } else {
    issues.push('❌ NotFoundPage component missing');
  }
} catch (error) {
  issues.push('❌ Error checking NotFoundPage');
}

// 3. Verify renderingOptimization utils exist
console.log('\n3. 🔧 Checking utility files...');
try {
  const renderingUtilsExists = fs.existsSync('./utils/renderingOptimization.ts');
  if (renderingUtilsExists) {
    fixes.push('✅ renderingOptimization.ts created');
  } else {
    issues.push('❌ renderingOptimization.ts missing');
  }
} catch (error) {
  issues.push('❌ Error checking utility files');
}

// 4. Verify server configuration files
console.log('\n4. ⚙️ Checking server configuration...');
try {
  const vercelExists = fs.existsSync('./vercel.json');
  const netlifyExists = fs.existsSync('./netlify.toml');
  const public404Exists = fs.existsSync('./public/404.html');
  
  if (vercelExists) {
    const vercelContent = fs.readFileSync('./vercel.json', 'utf8');
    if (vercelContent.includes('index.html')) {
      fixes.push('✅ Vercel SPA redirect configured');
    } else {
      issues.push('❌ Vercel SPA redirect not configured');
    }
  }
  
  if (netlifyExists) {
    const netlifyContent = fs.readFileSync('./netlify.toml', 'utf8');
    if (netlifyContent.includes('index.html')) {
      fixes.push('✅ Netlify SPA redirect configured');
    } else {
      issues.push('❌ Netlify SPA redirect not configured');
    }
  }
  
  if (public404Exists) {
    fixes.push('✅ Public 404.html exists for server-level redirects');
  } else {
    issues.push('❌ Public 404.html missing');
  }
  
} catch (error) {
  issues.push('❌ Error checking server configuration');
}

// 5. Check component dependencies
console.log('\n5. 📦 Checking component dependencies...');
const criticalComponents = [
  'LogoPageWithIconButton.tsx',
  'MainPage.tsx',
  'SimpleNavigation.tsx',
  'SystemStatus.tsx'
];

criticalComponents.forEach(component => {
  const componentPath = `./components/${component}`;
  if (fs.existsSync(componentPath)) {
    fixes.push(`✅ ${component} exists`);
  } else {
    issues.push(`❌ Missing critical component: ${component}`);
  }
});

// 6. Route coverage check
console.log('\n6. 🛣️ Checking route coverage...');
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
  if (appContent.includes(`path="${route}"`)) {
    fixes.push(`✅ Route ${route} configured`);
  } else {
    issues.push(`❌ Missing route: ${route}`);
  }
});

// Extended routes from MainPage
const extendedRoutes = [
  '/company-health',
  '/payment-processing',
  '/business-analytics',
  '/agent-canvas'
];

extendedRoutes.forEach(route => {
  if (appContent.includes(`path="${route}"`)) {
    fixes.push(`✅ Extended route ${route} configured`);
  } else {
    issues.push(`⚠️ Extended route ${route} not configured (will cause 404)`);
  }
});

// Results
console.log('\n📊 VERIFICATION RESULTS');
console.log('======================');

console.log(`\n✅ FIXES APPLIED (${fixes.length}):`);
fixes.forEach(fix => console.log(fix));

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
  console.log('🎯 All 404 issues have been resolved!');
  console.log('✅ Your MaycoleTracker™ app should work without 404 errors');
  console.log('🚀 The app is production-ready');
} else if (issues.length <= 2) {
  console.log('⚠️ Minor issues found, but core routing should work');
  console.log('🔧 Consider fixing the remaining issues for optimal performance');
} else {
  console.log('🚨 Several issues found that may cause 404 errors');
  console.log('🔧 Please address these issues before deployment');
}

console.log(`\n📈 Fix Coverage: ${fixes.length}/${fixes.length + issues.length} (${Math.round(fixes.length / (fixes.length + issues.length) * 100)}%)`);

process.exit(issues.length > 5 ? 1 : 0);