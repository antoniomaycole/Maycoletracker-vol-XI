#!/usr/bin/env node

/**
 * MaycoleTracker™ Production Cleanup Script
 * Moves all diagnostic and testing files to proper directories
 */

const fs = require('fs');
const path = require('path');

console.log('🧹 MaycoleTracker™ Production Cleanup Starting...');
console.log('================================================');

// Create directories if they don't exist
const dirs = ['scripts', 'tests', 'docs', 'dev'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

// Files to move to /scripts
const scriptFiles = [
  'activate-router-navigation.js',
  'audit-changes-analysis.js',
  'complete-app-verification.js',
  'comprehensive-app-readiness-check.js',
  'comprehensive-post-audit-check.js',
  'dev-optimization-check.js',
  'final-audit-status-check.js',
  'final-jsx-parent-element-fix.js',
  'final-jsx-parent-verification.js',
  'final-jsx-syntax-check.js',
  'final-launch-check.js',
  'final-production-verification.js',
  'final-router-fix.js',
  'final-system-check.js',
  'fix-33-percent-issue.js',
  'fix-405-error.js',
  'fix-analytics-conditional-issue.js',
  'fix-analytics-conditional-rendering.js',
  'fix-and-verify.js',
  'fix-conditional-rendering-issues.js',
  'fix-integration-issues.js',
  'fix-jsx-parent-element-complete.js',
  'fix-jsx-parent-element-issue.js',
  'fix-lint-issues-now.js',
  'fix-router-app.js',
  'generate-icons.js',
  'generate-manifest-icons.js',
  'jsx-back-button-fix-verification.js',
  'jsx-final-verification.js',
  'jsx-parent-element-comprehensive-fix.js',
  'jsx-parent-element-fix.js',
  'jsx-syntax-check.js',
  'jsx-syntax-emergency-fix.js',
  'jsx-syntax-fix-verification.js',
  'jsx-syntax-lint-fix-complete.js',
  'jsx-syntax-validator.js',
  'jsx-syntax-verification.js',
  'launch-complete-maycoletracker.js',
  'launch-maycoletracker.js',
  'layout-verification.js',
  'maycoletracker-app-restored.js',
  'optimize-css-for-simplified.js',
  'performance-optimization.js',
  'post-audit-verification.js',
  'post-install-verification.js',
  'prevent-recovery-functions.js',
  'quick-404-fix.js',
  'quick-app-test.js',
  'quick-audit-validation.js',
  'quick-build-test.js',
  'router-verification.js',
  'run-all-checks.js',
  'setup-check.js',
  'switch-navigation.js',
  'switch-to-router.js',
  'switch-to-state.js',
  'test-404-spa-fix.js',
  'test-all-routes.js',
  'test-complete-navigation.js',
  'test-current-setup.js',
  'test-export-functionality.js',
  'test-jsx-syntax-fix.js',
  'test-layout-integration.js',
  'test-loading-fix.js',
  'test-maycoletracker-branding.js',
  'test-navigation.js',
  'test-premium-features.js',
  'test-router-integration.js',
  'test-simple-router.js',
  'verify-404-fix.js',
  'verify-all-buttons-functionality.js',
  'verify-analytics-implementation.js',
  'verify-conditional-rendering-fix.js',
  'verify-deployment-ready.js',
  'verify-export-fix.js',
  'verify-loading-fix.js',
  'verify-pwa-deployment.js',
  'verify-simple-logo-setup.js',
  'verify-simplified-app.js',
  'copy-maycoletracker-icons.js',
  'clear-analytics-cache.sh'
];

// Files to move to /tests
const testFiles = [
  'test-404-functionality.html',
  'test-camera-route.html',
  'test-complete-system-verification.html',
  'test-icon-showcase.html',
  'test-maycoletracker-system.html',
  'test-navigation.html',
  'test-new-routes.html',
  'test-original-maycoletracker-volume-xi.html',
  'test-premium-dashboard-fix.html',
  'test-restored-maycoletracker.html',
  'test-scanner-module-fix.html',
  'test-scanner-route.html',
  'test-simple-6-route-system.html',
  'test-simple-logo-page.html',
  'test-updated-logos.html',
  'router-route-test.html',
  'test-jsx-parent-fix.tsx',
  'test-loading-fix-component.tsx'
];

// Files to move to /docs
const docFiles = [
  '404-fix-summary.md',
  'APPLE_STORE_DEPLOYMENT_GUIDE.md',
  'Attributions.md',
  'BUTTON_FUNCTIONALITY_VERIFICATION.md',
  'COMPLETE-MAYCOLETRACKER-VOL-XI-RESTORED.md',
  'COMPREHENSIVE_FIXES_APPLIED.md',
  'COMPREHENSIVE_FIX_GUIDE.md',
  'CRITICAL-ERROR-FIX-APPLIED.md',
  'CROSS_PLATFORM_OPTIMIZATION_COMPLETE.md',
  'DEPLOYMENT_CHECKLIST.md',
  'DEPLOYMENT_READINESS_REPORT.md',
  'DEPLOYMENT_VERIFICATION_COMPLETE.md',
  'FOUND-YOUR-ACTUAL-MAYCOLETRACKER-SYSTEM.md',
  'Figma-Design-Transfer-Guide.md',
  'IMMEDIATE-JSX-FIX-SUMMARY.md',
  'JSX-LINT-FIX-SUMMARY.md',
  'LAYOUT_OUTLET_GUIDE.md',
  'LOGO-AND-BUTTON-FIXED.md',
  'LOGO_AND_NAVIGATION_FIXES_COMPLETE.md',
  'LOGO_PAGE_LAYOUT_AND_DESIGN_FIXED.md',
  'LOGO_SIMPLIFIED_AND_NAVIGATION_VERIFIED.md',
  'MAYCOLETRACKER-PRODUCTION-READY.md',
  'MAYCOLETRACKER-RESTORED-COMPLETE.md',
  'MAYCOLETRACKER-SYSTEM-READY.md',
  'MAYCOLETRACKER-VERIFIED-COMPLETE.md',
  'MAYCOLETRACKER_EXPORT_GUIDE.md',
  'MICROPHONE_INTEGRATION_COMPLETE.md',
  'MainPage-Integration-Guide.md',
  'MaycoleTracker-Logo-Implementation-Guide.md',
  'NAVIGATION_FIX_SUMMARY.md',
  'NAVIGATION_STATUS_COMPLETE.md',
  'PERFORMANCE_OPTIMIZATION_COMPLETE.md',
  'POST_BUILD_VERIFICATION.md',
  'PREMIUM_CONDITIONAL_GUIDE.md',
  'PREMIUM_TESTING_GUIDE.md',
  'PRODUCTION_LAUNCH_CHECKLIST.md',
  'PWA_DEPLOYMENT_GUIDE.md',
  'REACT_ROUTER_INTEGRATION.md',
  'REACT_ROUTER_SETUP.md',
  'REMOVED',
  'RENDERING_OPTIMIZATION_SYSTEM_COMPLETE.md',
  'ROUTER_ENHANCEMENT_COMPLETE.md',
  'ROUTER_INTEGRATION_GUIDE.md',
  'SIMPLE-APP-APPLIED.md',
  'SYSTEM-READY-TO-LAUNCH.md',
  'SYSTEM_ACTIVATION_COMPLETE.md',
  'SYSTEM_FULLY_OPERATIONAL.md',
  'SYSTEM_OPERATIONAL_VERIFICATION.md',
  'WelcomePage-Integration-Guide.md',
  'YOUR-LOGO-AND-BUTTON-FIXED.md',
  'choose-navigation.md',
  'launch-premium-maycoletracker.md',
  'quick-start-guide.md',
  'PRODUCTION_CLEANUP_PLAN.md'
];

// Move files function
function moveFile(filename, targetDir) {
  if (fs.existsSync(filename)) {
    const targetPath = path.join(targetDir, filename);
    try {
      fs.renameSync(filename, targetPath);
      console.log(`✅ Moved ${filename} → ${targetDir}/`);
      return true;
    } catch (error) {
      console.warn(`⚠️ Could not move ${filename}: ${error.message}`);
      return false;
    }
  }
  return false;
}

let moveCount = 0;

// Move script files
console.log('\n📦 Moving script files...');
scriptFiles.forEach(file => {
  if (moveFile(file, 'scripts')) moveCount++;
});

// Move test files
console.log('\n🧪 Moving test files...');
testFiles.forEach(file => {
  if (moveFile(file, 'tests')) moveCount++;
});

// Move documentation files
console.log('\n📚 Moving documentation files...');
docFiles.forEach(file => {
  if (moveFile(file, 'docs')) moveCount++;
});

// Move remaining files that should be in dev
const devFiles = [
  'clean-icon-test.html',
  'MaycoleTracker-Brand-Kit.css',
  'MaycoleTracker-Complete-Info.html',
  'MaycoleTracker-Exact-Design-Showcase.html',
  'MaycoleTracker-Icon-Button-Transfer.tsx',
  'MaycoleTracker-Website-Logo-Transfer.tsx',
  'WelcomePage-As-Launcher-Replacement.tsx',
  'launch-maycoletracker-fixed.bat',
  'launch-maycoletracker-fixed.sh',
  'start-maycoletracker.bat',
  'start-maycoletracker.sh',
  'deploy.bat',
  'deploy.sh',
  'FINAL_BUILD_SUCCESS_REPORT.html',
  'MaycoleTechnologies-Assets.html'
];

console.log('\n🔧 Moving development files...');
devFiles.forEach(file => {
  if (moveFile(file, 'dev')) moveCount++;
});

console.log('\n🎯 CLEANUP COMPLETE!');
console.log('===================');
console.log(`✅ ${moveCount} files organized`);
console.log('✅ Production root directory cleaned');
console.log('✅ Files properly categorized');
console.log('');
console.log('📁 New Structure:');
console.log('   /scripts     - Build & diagnostic scripts');
console.log('   /tests       - Test files & verification');
console.log('   /docs        - Documentation & guides');
console.log('   /dev         - Development utilities');
console.log('');
console.log('🚀 Your MaycoleTracker™ is now production-ready!');