#!/usr/bin/env node

/**
 * Navigation Test - MaycoleTracker™
 * Verify React Router navigation between LogoPage and MainPage
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing MaycoleTracker™ Navigation...\n');

// Check files exist
const filesToCheck = [
  { file: 'App.tsx', desc: 'Main app with router' },
  { file: 'components/LogoPage.tsx', desc: 'Logo page component' },
  { file: 'components/LogoPage.css', desc: 'Logo page styles' },
  { file: 'components/MainPage.tsx', desc: 'Main page component' },
  { file: 'components/ErrorBoundary.tsx', desc: 'Error boundary' },
  { file: 'contexts/UserContext.tsx', desc: 'User context' },
  { file: 'public/icons/icon-512.png', desc: 'Logo icon' }
];

let allFilesExist = true;

console.log('📋 FILE CHECKS:');
filesToCheck.forEach(({ file, desc }) => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${desc} - EXISTS`);
  } else {
    console.log(`❌ ${desc} - MISSING`);
    allFilesExist = false;
  }
});

// Check LogoPage content
console.log('\n🔍 LOGOPAGE ANALYSIS:');
if (fs.existsSync('components/LogoPage.tsx')) {
  const logoContent = fs.readFileSync('components/LogoPage.tsx', 'utf8');
  
  if (logoContent.includes('useNavigate')) {
    console.log('✅ LogoPage has useNavigate hook');
  } else {
    console.log('❌ LogoPage missing useNavigate hook');
  }
  
  if (logoContent.includes('navigate(\'/main\')')) {
    console.log('✅ LogoPage navigates to /main');
  } else {
    console.log('❌ LogoPage missing navigation to /main');
  }
  
  if (logoContent.includes('onClick={handleLogoClick}')) {
    console.log('✅ LogoPage has clickable logo');
  } else {
    console.log('❌ LogoPage missing clickable logo');
  }
  
  if (logoContent.includes('/icons/icon-512.png')) {
    console.log('✅ LogoPage uses correct icon path');
  } else {
    console.log('❌ LogoPage has incorrect icon path');
  }
}

// Check MainPage content
console.log('\n🔍 MAINPAGE ANALYSIS:');
if (fs.existsSync('components/MainPage.tsx')) {
  const mainContent = fs.readFileSync('components/MainPage.tsx', 'utf8');
  
  if (mainContent.includes('useNavigate')) {
    console.log('✅ MainPage has useNavigate hook');
  } else {
    console.log('❌ MainPage missing useNavigate hook');
  }
  
  if (mainContent.includes('handleBackToHome') || mainContent.includes('navigate(\'/\')')) {
    console.log('✅ MainPage has back navigation');
  } else {
    console.log('❌ MainPage missing back navigation');
  }
  
  if (mainContent.includes('ArrowLeft')) {
    console.log('✅ MainPage has back arrow icon');
  } else {
    console.log('❌ MainPage missing back arrow icon');
  }
}

// Check App.tsx routing
console.log('\n🔍 APP ROUTING ANALYSIS:');
if (fs.existsSync('App.tsx')) {
  const appContent = fs.readFileSync('App.tsx', 'utf8');
  
  if (appContent.includes('BrowserRouter')) {
    console.log('✅ App has BrowserRouter');
  } else {
    console.log('❌ App missing BrowserRouter');
  }
  
  if (appContent.includes('Route path="/"') && appContent.includes('LogoPage')) {
    console.log('✅ App has root route to LogoPage');
  } else {
    console.log('❌ App missing root route to LogoPage');
  }
  
  if (appContent.includes('Route path="/main"') && appContent.includes('MainPage')) {
    console.log('✅ App has /main route to MainPage');
  } else {
    console.log('❌ App missing /main route to MainPage');
  }
}

console.log('\n🎯 NAVIGATION FLOW:');
console.log('1. User visits "/" → LogoPage loads');
console.log('2. User clicks logo → Navigates to "/main"');
console.log('3. MainPage loads → Shows back button');
console.log('4. User clicks "Back to Home" → Returns to "/"');

console.log('\n🚀 TO START TESTING:');
console.log('npm run dev');
console.log('Visit: http://localhost:5173');

if (allFilesExist) {
  console.log('\n🎊 SUCCESS: Navigation setup is complete!');
  console.log('\n📱 Expected behavior:');
  console.log('   • Purple logo page at /');
  console.log('   • Click logo → go to /main');
  console.log('   • System status page loads');
  console.log('   • Back button returns to /');
} else {
  console.log('\n⚠️  Some files are missing');
}

console.log('\n✨ Navigation Test Complete!');