#!/usr/bin/env node

/**
 * MaycoleTracker™ vol. XI - Deployment Readiness Verification
 * Comprehensive pre-deployment checklist and validation
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 MaycoleTracker™ vol. XI - Deployment Readiness Check');
console.log('='.repeat(60));

let allChecksPass = true;
const issues = [];
const warnings = [];

// Check 1: Essential files exist
console.log('\n📁 Checking essential files...');
const essentialFiles = [
  'App.tsx',
  'src/main.tsx',
  'index.html',
  'package.json',
  'vite.config.ts',
  'public/manifest.json',
  'public/sw.js',
  'styles/globals.css'
];

essentialFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MISSING`);
    issues.push(`Missing essential file: ${file}`);
    allChecksPass = false;
  }
});

// Check 2: Component files exist
console.log('\n🧩 Checking core components...');
const coreComponents = [
  'components/LogoPageWithIconButton.tsx',
  'components/MainPage.tsx',
  'components/InventoryPage.tsx',
  'components/AnalyticsPage.tsx',
  'components/ScannerPage.tsx',
  'components/AIInsightPage.tsx',
  'components/NavigationHeader.tsx',
  'components/FloatingActionMenu.tsx',
  'components/ErrorBoundary.tsx'
];

coreComponents.forEach(component => {
  if (fs.existsSync(component)) {
    console.log(`  ✅ ${component}`);
  } else {
    console.log(`  ⚠️ ${component} - Missing (may cause runtime errors)`);
    warnings.push(`Component not found: ${component}`);
  }
});

// Check 3: Package.json validation
console.log('\n📦 Validating package.json...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  if (packageJson.name) {
    console.log(`  ✅ Project name: ${packageJson.name}`);
  } else {
    issues.push('Package.json missing name field');
    allChecksPass = false;
  }

  if (packageJson.version) {
    console.log(`  ✅ Version: ${packageJson.version}`);
  } else {
    warnings.push('Package.json missing version field');
  }

  if (packageJson.scripts && packageJson.scripts.build) {
    console.log(`  ✅ Build script: ${packageJson.scripts.build}`);
  } else {
    issues.push('Package.json missing build script');
    allChecksPass = false;
  }

  if (packageJson.dependencies) {
    const keyDeps = ['react', 'react-dom', 'react-router-dom'];
    keyDeps.forEach(dep => {
      if (packageJson.dependencies[dep]) {
        console.log(`  ✅ ${dep}: ${packageJson.dependencies[dep]}`);
      } else {
        issues.push(`Missing critical dependency: ${dep}`);
        allChecksPass = false;
      }
    });
  }
} catch (error) {
  console.log(`  ❌ Error reading package.json: ${error.message}`);
  issues.push('Cannot read or parse package.json');
  allChecksPass = false;
}

// Check 4: TypeScript configuration
console.log('\n🔧 Checking TypeScript configuration...');
if (fs.existsSync('tsconfig.json')) {
  try {
    const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
    console.log('  ✅ tsconfig.json exists and is valid');
    
    if (tsconfig.compilerOptions && tsconfig.compilerOptions.strict) {
      console.log('  ✅ Strict mode enabled');
    } else {
      warnings.push('TypeScript strict mode not enabled');
    }
  } catch (error) {
    warnings.push('tsconfig.json exists but has syntax errors');
  }
} else {
  warnings.push('tsconfig.json not found');
}

// Check 5: Vite configuration
console.log('\n⚡ Checking Vite configuration...');
if (fs.existsSync('vite.config.ts')) {
  console.log('  ✅ vite.config.ts exists');
} else if (fs.existsSync('vite.config.js')) {
  console.log('  ✅ vite.config.js exists');
} else {
  warnings.push('No Vite configuration file found');
}

// Check 6: PWA manifest
console.log('\n📱 Checking PWA configuration...');
if (fs.existsSync('public/manifest.json')) {
  try {
    const manifest = JSON.parse(fs.readFileSync('public/manifest.json', 'utf8'));
    
    const requiredFields = ['name', 'short_name', 'start_url', 'display', 'theme_color', 'icons'];
    requiredFields.forEach(field => {
      if (manifest[field]) {
        console.log(`  ✅ Manifest ${field}: ✓`);
      } else {
        warnings.push(`Manifest missing ${field} field`);
      }
    });

    if (manifest.icons && manifest.icons.length > 0) {
      manifest.icons.forEach(icon => {
        if (fs.existsSync(path.join('public', icon.src))) {
          console.log(`  ✅ Icon ${icon.src}: ✓`);
        } else {
          warnings.push(`Icon file missing: ${icon.src}`);
        }
      });
    }
  } catch (error) {
    warnings.push('manifest.json exists but has syntax errors');
  }
} else {
  warnings.push('PWA manifest.json not found');
}

// Check 7: Service Worker
console.log('\n🔄 Checking Service Worker...');
if (fs.existsSync('public/sw.js')) {
  const swContent = fs.readFileSync('public/sw.js', 'utf8');
  if (swContent.includes('install') && swContent.includes('fetch')) {
    console.log('  ✅ Service Worker has essential event listeners');
  } else {
    warnings.push('Service Worker may be incomplete');
  }
} else {
  warnings.push('Service Worker not found');
}

// Check 8: CSS and styling
console.log('\n🎨 Checking styling...');
if (fs.existsSync('styles/globals.css')) {
  const cssContent = fs.readFileSync('styles/globals.css', 'utf8');
  if (cssContent.includes('tailwind') || cssContent.includes('@layer')) {
    console.log('  ✅ Tailwind CSS configuration detected');
  } else {
    console.log('  ℹ️ Custom CSS styling detected');
  }
} else {
  warnings.push('No global CSS file found');
}

// Check 9: Environment variables
console.log('\n🔐 Checking environment configuration...');
if (fs.existsSync('.env.example')) {
  console.log('  ✅ Environment example file exists');
} else {
  console.log('  ℹ️ No .env.example file (may not be needed)');
}

if (fs.existsSync('.env')) {
  console.log('  ⚠️ .env file exists (ensure it\'s not committed to git)');
} else {
  console.log('  ✅ No .env file in root (good for security)');
}

// Check 10: Build test (if possible)
console.log('\n🏗️ Checking build capability...');
try {
  const { execSync } = require('child_process');
  console.log('  ℹ️ Build test skipped (would require dependencies)');
  console.log('  💡 Run "npm run build" to test build process');
} catch (error) {
  console.log('  ℹ️ Cannot test build without installing dependencies');
}

// Final report
console.log('\n' + '='.repeat(60));
console.log('📊 DEPLOYMENT READINESS REPORT');
console.log('='.repeat(60));

if (allChecksPass && issues.length === 0) {
  console.log('🎉 READY FOR DEPLOYMENT!');
  console.log('✅ All critical checks passed');
} else {
  console.log('❌ DEPLOYMENT BLOCKED - Issues must be resolved:');
  issues.forEach(issue => console.log(`   • ${issue}`));
}

if (warnings.length > 0) {
  console.log('\n⚠️ Warnings (recommended to address):');
  warnings.forEach(warning => console.log(`   • ${warning}`));
}

console.log('\n📋 Next steps:');
if (allChecksPass && issues.length === 0) {
  console.log('1. Run "npm install" to install dependencies');
  console.log('2. Run "npm run build" to create production build');
  console.log('3. Test the build locally');
  console.log('4. Deploy to your hosting platform');
  console.log('5. Verify PWA functionality');
} else {
  console.log('1. Fix all critical issues listed above');
  console.log('2. Re-run this verification script');
  console.log('3. Test thoroughly before deployment');
}

console.log('\n🚀 MaycoleTracker™ vol. XI Enterprise Edition');
console.log('Ready to transform business operations worldwide!');

process.exit(allChecksPass && issues.length === 0 ? 0 : 1);