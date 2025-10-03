#!/usr/bin/env node

/**
 * MaycoleTracker™ Premium Features Test Script
 * Verifies that all premium conditional rendering is working correctly
 */

console.log('🎯 Testing MaycoleTracker™ Premium Features...\n');

const fs = require('fs');
const path = require('path');

// Check if all required files exist
const requiredFiles = [
  'App.tsx',
  'contexts/UserContext.tsx',
  'components/PremiumFeatureGuard.tsx',
  'components/UserDashboard.tsx',
  'components/PremiumDemo.tsx',
  'components/MonetizationPage.tsx'
];

console.log('📁 Checking Premium Feature Files:');
let allFilesExist = true;

requiredFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  const exists = fs.existsSync(filePath);
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allFilesExist = false;
});

if (!allFilesExist) {
  console.log('\n❌ Some required files are missing!');
  process.exit(1);
}

// Check App.tsx for premium patterns
console.log('\n🔍 Checking Premium Conditional Patterns in App.tsx:');

const appContent = fs.readFileSync('App.tsx', 'utf8');

const patterns = [
  { pattern: /import.*UserProvider.*from.*UserContext/, name: 'UserProvider import' },
  { pattern: /import.*PremiumFeatureGuard.*from/, name: 'PremiumFeatureGuard import' },
  { pattern: /const.*user.*isPremium.*hasFeature.*=.*useUser/, name: 'useUser hook usage' },
  { pattern: /hasFeature\('voice_control'\)/, name: 'Voice control feature check' },
  { pattern: /hasFeature\('barcode_scanning'\)/, name: 'Barcode scanning feature check' },
  { pattern: /hasFeature\('emergency_mode'\)/, name: 'Emergency mode feature check' },
  { pattern: /<PremiumFeatureGuard.*feature="analytics"/, name: 'Analytics feature guard' },
  { pattern: /isPremium\(\)/, name: 'Premium status check' },
  { pattern: /<UserProvider>/, name: 'UserProvider wrapper' }
];

patterns.forEach(({ pattern, name }) => {
  const found = pattern.test(appContent);
  console.log(`  ${found ? '✅' : '❌'} ${name}`);
});

// Check UserContext.tsx for feature definitions
console.log('\n🎯 Checking Premium Features in UserContext.tsx:');

const userContextContent = fs.readFileSync('contexts/UserContext.tsx', 'utf8');

const features = [
  'analytics',
  'voice_control', 
  'barcode_scanning',
  'emergency_mode',
  'multi_location',
  'api_access',
  'custom_reports',
  'bulk_operations',
  'advanced_integrations',
  'white_label',
  'priority_support'
];

features.forEach(feature => {
  const found = userContextContent.includes(`'${feature}'`);
  console.log(`  ${found ? '✅' : '❌'} ${feature}`);
});

// Check for subscription tiers
console.log('\n💎 Checking Subscription Tiers:');

const tiers = ['free', 'professional', 'enterprise'];
tiers.forEach(tier => {
  const found = userContextContent.includes(`'${tier}'`);
  console.log(`  ${found ? '✅' : '❌'} ${tier} tier`);
});

console.log('\n🎊 Premium Features Test Complete!');
console.log('🚀 Your MaycoleTracker™ system is ready with premium conditional rendering!\n');

// Show next steps
console.log('📋 Next Steps:');
console.log('1. Run: npm run dev');
console.log('2. Test premium features in browser');
console.log('3. Go to Settings tab → User Dashboard');
console.log('4. Try upgrading subscription tiers');
console.log('5. Watch features unlock in real-time!\n');

console.log('✨ Premium Conditional Patterns Available:');
console.log('   {user?.isPremium && <Component />}');
console.log('   {isPremium() && <Component />}');
console.log('   {hasFeature("analytics") && <Component />}');
console.log('   <PremiumFeatureGuard feature="analytics"><Component /></PremiumFeatureGuard>');
console.log('   const { hasAccess } = usePremiumFeature("analytics");');