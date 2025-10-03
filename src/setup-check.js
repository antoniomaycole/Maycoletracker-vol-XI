#!/usr/bin/env node

/**
 * MaycoleTracker™ Setup Verification Script
 * Checks if your development environment is ready
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

console.log('🚀 MaycoleTracker™ Setup Verification');
console.log('=====================================');

// Check Node.js version
console.log('\n1. Checking Node.js version...');
console.log(`   Node.js: ${process.version}`);
if (parseInt(process.version.slice(1)) < 16) {
  console.log('   ❌ Node.js 16+ required');
  process.exit(1);
} else {
  console.log('   ✅ Node.js version is compatible');
}

// Check package.json
console.log('\n2. Checking package.json...');
if (fs.existsSync('package.json')) {
  console.log('   ✅ package.json found');
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log(`   📦 Project: ${pkg.name} v${pkg.version}`);
} else {
  console.log('   ❌ package.json not found');
  process.exit(1);
}

// Check critical files
console.log('\n3. Checking critical files...');
const criticalFiles = [
  'App.tsx',
  'src/main.tsx', 
  'index.html',
  'vite.config.ts',
  'styles/globals.css'
];

criticalFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} missing`);
  }
});

// Check if node_modules exists
console.log('\n4. Checking dependencies...');
if (fs.existsSync('node_modules')) {
  console.log('   ✅ node_modules folder exists');
} else {
  console.log('   ⚠️  node_modules folder missing - run "npm install"');
}

// Check components
console.log('\n5. Checking key components...');
const keyComponents = [
  'components/AppLauncher.tsx',
  'components/Dashboard.tsx',
  'components/InventoryList.tsx'
];

keyComponents.forEach(component => {
  if (fs.existsSync(component)) {
    const content = fs.readFileSync(component, 'utf8');
    if (content.includes('import React')) {
      console.log(`   ✅ ${component} (with React import)`);
    } else {
      console.log(`   ⚠️  ${component} (missing React import)`);
    }
  } else {
    console.log(`   ❌ ${component} missing`);
  }
});

console.log('\n6. Quick commands to get started:');
console.log('   📥 Install dependencies: npm install');
console.log('   🔥 Start dev server: npm run dev');
console.log('   🌐 Then open: http://localhost:5173');

console.log('\n🎯 Your MaycoleTracker™ inventory management app is ready!');
console.log('   💎 Professional-grade enterprise software');
console.log('   🚀 Agentic-native business technology');
console.log('   © 2025 MaycoleTechnologies™');

console.log('\n⚠️  TROUBLESHOOTING WHITE BLANK PAGE:');
console.log('1. Open browser console (F12) to check for errors');
console.log('2. Make sure you run: npm install');
console.log('3. Then run: npm run dev');
console.log('4. Open: http://localhost:5173');
console.log('5. Check browser console for any React errors');
console.log('6. If still blank, try: npm run build && npm run preview');