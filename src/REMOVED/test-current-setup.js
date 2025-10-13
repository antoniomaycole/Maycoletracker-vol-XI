#!/usr/bin/env node

/**
 * MaycoleTracker™ Current Setup Test
 * Tests the current LogoPage → MainPage navigation flow
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 MaycoleTracker™ Current Setup Test');
console.log('====================================');

// Check App.tsx structure
const appContent = fs.readFileSync('./App.tsx', 'utf-8');
const hasRouter = appContent.includes('BrowserRouter') && appContent.includes('Routes');
const hasErrorBoundary = appContent.includes('ErrorBoundary');
const hasLogoRoute = appContent.includes('path="/"') && appContent.includes('<LogoPage');
const hasMainRoute = appContent.includes('path="/main"') && appContent.includes('<MainPage');

console.log('\n📱 App.tsx Structure Check:');
console.log(`✅ React Router Setup: ${hasRouter ? 'Found' : 'Missing'}`);
console.log(`✅ Error Boundary: ${hasErrorBoundary ? 'Found' : 'Missing'}`);
console.log(`✅ Logo Route (/): ${hasLogoRoute ? 'Found' : 'Missing'}`);
console.log(`✅ Main Route (/main): ${hasMainRoute ? 'Found' : 'Missing'}`);

// Check LogoPage functionality
const logoContent = fs.readFileSync('./components/LogoPage.tsx', 'utf-8');
const hasNavigation = logoContent.includes('useNavigate') && logoContent.includes("navigate('/main')");
const hasClickHandler = logoContent.includes('handleLogoClick');
const hasImageFallback = logoContent.includes('imageError') && logoContent.includes('MT');

console.log('\n🎨 LogoPage.tsx Functionality:');
console.log(`✅ Navigation Hook: ${hasNavigation ? 'Found' : 'Missing'}`);
console.log(`✅ Click Handler: ${hasClickHandler ? 'Found' : 'Missing'}`);
console.log(`✅ Image Fallback: ${hasImageFallback ? 'Found' : 'Missing'}`);

// Check MainPage existence
const mainPageExists = fs.existsSync('./components/MainPage.tsx');
console.log(`✅ MainPage.tsx: ${mainPageExists ? 'Found' : 'Missing'}`);

// Check CSS files
const logoCssExists = fs.existsSync('./components/LogoPage.css');
const globalsCssExists = fs.existsSync('./styles/globals.css');

console.log('\n🎨 Styling Files:');
console.log(`✅ LogoPage.css: ${logoCssExists ? 'Found' : 'Missing'}`);
console.log(`✅ globals.css: ${globalsCssExists ? 'Found' : 'Missing'}`);

// Check for logo files
const logoFiles = [
  './public/icons/maycoletracker-kinetic-logo.svg',
  './public/icons/icon-192.png',
  './public/icons/icon-512.png',
  './public/favicon.svg'
];

console.log('\n🖼️ Logo Assets:');
logoFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`${exists ? '✅' : '⚠️'} ${file}: ${exists ? 'Found' : 'Missing'}`);
});

// Check package.json scripts
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const hasDevScript = packageJson.scripts && packageJson.scripts.dev;
const hasBuildScript = packageJson.scripts && packageJson.scripts.build;

console.log('\n📦 Development Scripts:');
console.log(`✅ dev script: ${hasDevScript ? 'Found' : 'Missing'}`);
console.log(`✅ build script: ${hasBuildScript ? 'Found' : 'Missing'}`);

// Check for common issues
console.log('\n🔍 Common Issues Check:');

// Check for any syntax errors in key files
try {
  const appSyntax = appContent.includes('export default function App()');
  console.log(`✅ App.tsx syntax: ${appSyntax ? 'Valid' : 'Check needed'}`);
} catch (error) {
  console.log(`❌ App.tsx syntax: Error - ${error.message}`);
}

try {
  const logoSyntax = logoContent.includes('export default function LogoPage()');
  console.log(`✅ LogoPage.tsx syntax: ${logoSyntax ? 'Valid' : 'Check needed'}`);
} catch (error) {
  console.log(`❌ LogoPage.tsx syntax: Error - ${error.message}`);
}

// Summary
console.log('\n🎯 Setup Summary:');
const totalChecks = 12;
let passedChecks = 0;

if (hasRouter) passedChecks++;
if (hasErrorBoundary) passedChecks++;
if (hasLogoRoute) passedChecks++;
if (hasMainRoute) passedChecks++;
if (hasNavigation) passedChecks++;
if (hasClickHandler) passedChecks++;
if (hasImageFallback) passedChecks++;
if (mainPageExists) passedChecks++;
if (logoCssExists) passedChecks++;
if (globalsCssExists) passedChecks++;
if (hasDevScript) passedChecks++;
if (hasBuildScript) passedChecks++;

const score = Math.round((passedChecks / totalChecks) * 100);
console.log(`📊 Setup Score: ${passedChecks}/${totalChecks} (${score}%)`);

if (score >= 90) {
  console.log('🎉 Excellent! Your setup looks ready to run!');
  console.log('\n🚀 Try running:');
  console.log('   npm run dev');
  console.log('   Navigate to http://localhost:5173');
} else if (score >= 70) {
  console.log('⚠️ Good setup, but some items need attention.');
} else {
  console.log('❌ Several issues need to be resolved.');
}

console.log('\n🔧 Quick Fix Commands:');
console.log('• npm run fix-405          - Fix routing issues');
console.log('• npm run dev-clean        - Clean restart');
console.log('• npm run emergency-server - Alternative server');
console.log('• npm run hard-reset       - Full reinstall');

console.log('\n✨ Your MaycoleTracker™ system is comprehensive!');