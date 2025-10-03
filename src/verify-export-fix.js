#!/usr/bin/env node

/**
 * MaycoleTracker™ vol. XI - Export Fix Verification
 * Checks for duplicate export default statements
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 MaycoleTracker™ Export Fix Verification');
console.log('=========================================');

const results = [];
const issues = [];

// Check specific files that were fixed
const filesToCheck = [
  './components/LogoPageWithIconButton.tsx',
  './components/MainPage.tsx'
];

filesToCheck.forEach(filePath => {
  console.log(`\n📋 Checking ${filePath}...`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Count export default occurrences
    const exportDefaultMatches = content.match(/export\s+default\s/g) || [];
    const exportDefaultFunctionMatches = content.match(/export\s+default\s+function\s/g) || [];
    
    console.log(`  - export default statements: ${exportDefaultMatches.length}`);
    console.log(`  - export default function statements: ${exportDefaultFunctionMatches.length}`);
    
    if (exportDefaultMatches.length === 1) {
      results.push(`✅ ${filePath} has exactly 1 export default`);
    } else if (exportDefaultMatches.length === 0) {
      issues.push(`❌ ${filePath} has no export default`);
    } else {
      issues.push(`❌ ${filePath} has ${exportDefaultMatches.length} export default statements (should be 1)`);
    }
    
    // Check for specific patterns
    if (content.includes('export default function')) {
      results.push(`✅ ${filePath} uses inline export default function`);
    }
    
  } catch (error) {
    issues.push(`❌ Error reading ${filePath}: ${error.message}`);
  }
});

// Check App.tsx imports
console.log('\n📦 Checking App.tsx imports...');
try {
  const appContent = fs.readFileSync('./App.tsx', 'utf8');
  
  const imports = [
    'LogoPageWithIconButton',
    'MainPage',
    'InventoryPage',
    'AnalyticsPage',
    'ScannerPage',
    'CameraCapture',
    'VoiceControl',
    'PremiumDashboard',
    'AIInsightPage',
    'AboutPage',
    'NotFoundPage',
    'SystemStatus'
  ];
  
  imports.forEach(importName => {
    if (appContent.includes(`import ${importName} from`)) {
      results.push(`✅ App.tsx imports ${importName}`);
    } else {
      issues.push(`❌ App.tsx missing import for ${importName}`);
    }
  });
  
} catch (error) {
  issues.push(`❌ Error reading App.tsx: ${error.message}`);
}

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
  console.log('🎯 ALL EXPORT ISSUES FIXED!');
  console.log('✅ No duplicate export default statements');
  console.log('✅ All components properly exported');
  console.log('✅ App.tsx imports are correct');
  console.log('🚀 Ready for build!');
} else {
  console.log('🚨 Export issues found');
  console.log('🔧 Please fix the remaining issues');
}

console.log(`\n📈 Success Rate: ${Math.round(results.length / (results.length + issues.length) * 100)}%`);

process.exit(issues.length > 0 ? 1 : 0);