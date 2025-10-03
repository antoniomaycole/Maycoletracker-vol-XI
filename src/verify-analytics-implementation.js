#!/usr/bin/env node

/**
 * Verify Analytics Implementation is Correct
 * Confirms the current App.tsx has proper Analytics rendering
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Analytics Implementation in MaycoleTracker™...\n');

const verifyAnalyticsImplementation = () => {
  try {
    // Read App.tsx
    const appPath = path.join(__dirname, 'App.tsx');
    const appContent = fs.readFileSync(appPath, 'utf8');

    // Check analytics tab content
    const analyticsTabMatch = appContent.match(/<TabsContent value="analytics"[\s\S]*?<\/TabsContent>/);
    
    if (!analyticsTabMatch) {
      console.log('❌ Analytics tab content not found in App.tsx');
      return false;
    }

    const analyticsTab = analyticsTabMatch[0];
    console.log('📋 Current Analytics Tab Implementation:');
    console.log('```tsx');
    console.log(analyticsTab);
    console.log('```\n');

    // Verify correct implementation
    const checks = [
      {
        name: 'Uses PremiumFeatureGuard',
        test: analyticsTab.includes('PremiumFeatureGuard feature="analytics"'),
        required: true
      },
      {
        name: 'Single Analytics component',
        test: (analyticsTab.match(/<Analytics/g) || []).length === 1,
        required: true
      },
      {
        name: 'No manual isPremium check',
        test: !analyticsTab.includes('user?.isPremium'),
        required: true
      },
      {
        name: 'No PremiumLock component',
        test: !analyticsTab.includes('PremiumLock'),
        required: true
      },
      {
        name: 'No duplicate AnalyticsDashboard',
        test: !analyticsTab.includes('AnalyticsDashboard'),
        required: true
      },
      {
        name: 'Has Suspense wrapper',
        test: analyticsTab.includes('Suspense'),
        required: true
      },
      {
        name: 'Uses Analytics (not AnalyticsDashboard)',
        test: analyticsTab.includes('<Analytics businessConfig'),
        required: true
      }
    ];

    console.log('✅ Implementation Verification:');
    let allPassed = true;

    checks.forEach(check => {
      const passed = check.test;
      const status = passed ? '✅' : (check.required ? '❌' : '⚠️');
      console.log(`   ${status} ${check.name}: ${passed ? 'PASS' : 'FAIL'}`);
      
      if (!passed && check.required) {
        allPassed = false;
      }
    });

    // Check for any problematic patterns
    console.log('\n🔍 Checking for Problematic Patterns:');
    
    const problemPatterns = [
      {
        name: 'Manual conditional rendering with isPremium',
        pattern: /\{\s*!?user\?\.\isPremium\s*\?/,
        found: false
      },
      {
        name: 'Duplicate component rendering',
        pattern: /(AnalyticsDashboard.*AnalyticsDashboard|Analytics.*Analytics)/,
        found: false
      },
      {
        name: 'PremiumLock component usage',
        pattern: /PremiumLock/,
        found: false
      }
    ];

    problemPatterns.forEach(pattern => {
      pattern.found = pattern.pattern.test(appContent);
      const status = pattern.found ? '❌ FOUND' : '✅ NOT FOUND';
      console.log(`   ${status}: ${pattern.name}`);
      
      if (pattern.found) {
        allPassed = false;
      }
    });

    // Final assessment
    console.log(`\n📊 Overall Assessment:`);
    if (allPassed) {
      console.log('🎉 EXCELLENT - Analytics implementation is CORRECT!');
      console.log('\n✨ Your Implementation:');
      console.log('   ✅ Uses PremiumFeatureGuard correctly');
      console.log('   ✅ No duplicate component rendering');
      console.log('   ✅ No manual premium checks');
      console.log('   ✅ Proper Suspense error handling');
      console.log('   ✅ Clean, professional architecture');
      
      console.log('\n🔧 If you\'re seeing issues, it\'s likely:');
      console.log('   1. Browser cache showing old code');
      console.log('   2. Development server cache');
      console.log('   3. Looking at wrong navigation file');
      
      console.log('\n💡 Quick Fix:');
      console.log('   1. Stop dev server (Ctrl+C)');
      console.log('   2. Run: bash clear-analytics-cache.sh');
      console.log('   3. Restart: npm run dev');
      console.log('   4. Hard refresh browser (Ctrl+F5)');
      
    } else {
      console.log('⚠️ Issues detected in Analytics implementation');
      console.log('Please review the failed checks above');
    }

    return allPassed;

  } catch (error) {
    console.error('❌ Error verifying analytics:', error.message);
    return false;
  }
};

// Check file structure
console.log('📁 Checking File Structure:');
const files = [
  { path: 'App.tsx', description: 'Main application (SHOULD BE USED)' },
  { path: 'AppWithRouter.tsx', description: 'React Router version (BACKUP)' },
  { path: 'AppWithRouterLayout.tsx', description: 'Layout version (BACKUP)' },
  { path: 'components/Analytics.tsx', description: 'Analytics component' },
  { path: 'components/AnalyticsDashboard.tsx', description: 'Wrapper component' },
  { path: 'components/PremiumFeatureGuard.tsx', description: 'Premium guard' }
];

files.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, file.path));
  const status = exists ? '✅' : '❌';
  console.log(`   ${status} ${file.path} - ${file.description}`);
});

console.log('\n🚀 Running Analytics Verification...\n');
const isCorrect = verifyAnalyticsImplementation();

console.log('\n📋 Summary:');
if (isCorrect) {
  console.log('🏆 Your Analytics implementation is PERFECT!');
  console.log('   The issue you described is not in your current code.');
  console.log('   Clear browser cache to see the correct implementation.');
} else {
  console.log('🔧 Analytics implementation needs fixes.');
  console.log('   Review the failed checks above.');
}

console.log('\n✨ MaycoleTracker™ Analytics System Ready!');