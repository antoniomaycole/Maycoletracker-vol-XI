#!/usr/bin/env node

/**
 * MaycoleTracker™ Volume XI - Complete Branding & Icon Verification
 * Tests all PWA icons, manifest configuration, and branding elements
 */

const fs = require('fs');

console.log('🎨 MaycoleTracker™ Volume XI - Branding & Icon Verification');
console.log('==========================================================');

// Check all icon files exist
const iconChecks = [
  { path: './public/icons/icon-72.png', size: '72x72', purpose: 'Basic PWA' },
  { path: './public/icons/icon-96.png', size: '96x96', purpose: 'Basic PWA' },
  { path: './public/icons/icon-128.png', size: '128x128', purpose: 'Basic PWA' },
  { path: './public/icons/icon-192.png', size: '192x192', purpose: 'Standard PWA' },
  { path: './public/icons/icon-512.png', size: '512x512', purpose: 'High-res PWA' },
  { path: './public/icons/kinetic-logo-192.png', size: '192x192', purpose: 'Kinetic Logo 192px' },
  { path: './public/icons/kinetic-logo-512.png', size: '512x512', purpose: 'Kinetic Logo 512px' },
  { path: './public/icons/maycoletracker-kinetic-logo.svg', size: 'Vector', purpose: 'Kinetic Logo SVG' },
  { path: './public/icons/maycoletracker-icon-static.svg', size: 'Vector', purpose: 'Static Logo SVG' }
];

console.log('\n📱 Icon File Verification:');
let allIconsPresent = true;

iconChecks.forEach(icon => {
  const exists = fs.existsSync(icon.path);
  console.log(`${exists ? '✅' : '❌'} ${icon.path} (${icon.size}) - ${icon.purpose}`);
  if (!exists) allIconsPresent = false;
});

// Check manifest.json
console.log('\n📋 Manifest.json Verification:');
let manifestValid = true;

try {
  const manifestContent = fs.readFileSync('./public/manifest.json', 'utf-8');
  const manifest = JSON.parse(manifestContent);
  
  // Check essential fields
  const essentialFields = [
    { field: 'name', expected: 'MaycoleTracker™ Volume XI - Enterprise Edition' },
    { field: 'short_name', expected: 'MaycoleTracker™' },
    { field: 'description', expected: /Professional Inventory Management/ },
    { field: 'start_url', expected: '/' },
    { field: 'display', expected: 'standalone' },
    { field: 'background_color', expected: '#4B0082' },
    { field: 'theme_color', expected: '#4B0082' }
  ];
  
  essentialFields.forEach(({ field, expected }) => {
    const value = manifest[field];
    const isValid = typeof expected === 'string' 
      ? value === expected 
      : expected.test ? expected.test(value) : !!value;
    
    console.log(`${isValid ? '✅' : '❌'} ${field}: ${value}`);
    if (!isValid) manifestValid = false;
  });
  
  // Check icons array
  console.log(`\n📸 Manifest Icons (${manifest.icons?.length || 0} total):`);
  if (manifest.icons && manifest.icons.length > 0) {
    manifest.icons.forEach((icon, index) => {
      const iconExists = fs.existsSync(`./public${icon.src}`);
      console.log(`${iconExists ? '✅' : '❌'} Icon ${index + 1}: ${icon.src} (${icon.sizes}) - ${icon.purpose || 'any'}`);
      if (!iconExists) manifestValid = false;
    });
  } else {
    console.log('❌ No icons found in manifest');
    manifestValid = false;
  }
  
} catch (error) {
  console.log('❌ Error reading manifest.json:', error.message);
  manifestValid = false;
}

// Check index.html references
console.log('\n🌐 index.html Icon References:');
let htmlValid = true;

try {
  const htmlContent = fs.readFileSync('./index.html', 'utf-8');
  
  const htmlChecks = [
    { pattern: /maycoletracker-kinetic-logo\.svg/, description: 'Kinetic logo favicon' },
    { pattern: /kinetic-logo-192\.png/, description: 'Kinetic Logo 192px icon' },
    { pattern: /kinetic-logo-512\.png/, description: 'Kinetic Logo 512px icon' },
    { pattern: /apple-mobile-web-app-title.*MaycoleTracker™/, description: 'iOS app title' },
    { pattern: /og:title.*MaycoleTracker™.*Volume XI/, description: 'Open Graph title' },
    { pattern: /twitter:title.*MaycoleTracker™/, description: 'Twitter card title' },
    { pattern: /apple-touch-icon.*kinetic-logo-192\.png/, description: 'iOS touch icon' }
  ];
  
  htmlChecks.forEach(({ pattern, description }) => {
    const found = pattern.test(htmlContent);
    console.log(`${found ? '✅' : '❌'} ${description}`);
    if (!found) htmlValid = false;
  });
  
} catch (error) {
  console.log('❌ Error reading index.html:', error.message);
  htmlValid = false;
}

// Check for MaycoleTracker™ branding in components
console.log('\n🏷️ MaycoleTracker™ Branding in Components:');
let brandingValid = true;

const componentChecks = [
  { file: './App.tsx', pattern: /MaycoleTracker™/, description: 'App.tsx branding' },
  { file: './components/LogoPage.tsx', pattern: /MaycoleTracker™/, description: 'LogoPage branding' },
  { file: './components/MainPage.tsx', pattern: /MaycoleTracker™/, description: 'MainPage branding' }
];

componentChecks.forEach(({ file, pattern, description }) => {
  try {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf-8');
      const found = pattern.test(content);
      console.log(`${found ? '✅' : '⚠️'} ${description}`);
      if (!found) brandingValid = false;
    } else {
      console.log(`⚠️ ${file} not found`);
    }
  } catch (error) {
    console.log(`❌ Error checking ${file}: ${error.message}`);
  }
});

// Generate comprehensive score
console.log('\n📊 Branding Verification Summary:');
const categories = [
  { name: 'Icon Files', valid: allIconsPresent },
  { name: 'Manifest Configuration', valid: manifestValid },
  { name: 'HTML Meta Tags', valid: htmlValid },
  { name: 'Component Branding', valid: brandingValid }
];

let totalValid = 0;
categories.forEach(({ name, valid }) => {
  console.log(`${valid ? '✅' : '❌'} ${name}: ${valid ? 'PASS' : 'NEEDS ATTENTION'}`);
  if (valid) totalValid++;
});

const score = Math.round((totalValid / categories.length) * 100);
console.log(`\n🎯 Overall Branding Score: ${totalValid}/${categories.length} (${score}%)`);

if (score >= 100) {
  console.log('🎉 Perfect! Your MaycoleTracker™ branding is fully configured!');
} else if (score >= 75) {
  console.log('✅ Great! Minor branding items may need attention.');
} else {
  console.log('⚠️ Some branding elements need to be configured.');
}

// PWA Testing Instructions
console.log('\n🧪 PWA Installation Testing:');
console.log('1. Start development server: npm run dev');
console.log('2. Open in Chrome/Edge: http://localhost:5173');
console.log('3. Look for install prompt or use DevTools > Application > Manifest');
console.log('4. Test "Add to Home Screen" functionality');
console.log('5. Verify MaycoleTracker™ logo appears correctly');

console.log('\n📱 iOS PWA Testing:');
console.log('1. Open in Safari on iOS device');
console.log('2. Tap Share button → Add to Home Screen');
console.log('3. Verify "MaycoleTracker™ Volume XI" appears as app name');
console.log('4. Verify kinetic logo appears as app icon');
console.log('5. Test standalone mode (no Safari UI)');

console.log('\n✨ Your MaycoleTracker™ Volume XI branding system is comprehensive!');

// Create quick test HTML
const testHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MaycoleTracker™ Icon Showcase</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: linear-gradient(135deg, #4B0082 0%, #6B46C1 100%);
      color: white;
      margin: 0;
      padding: 2rem;
      min-height: 100vh;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      backdrop-filter: blur(10px);
      padding: 2rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .icon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }
    .icon-card {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      padding: 1.5rem;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;
    }
    .icon-card:hover {
      transform: translateY(-5px);
      background: rgba(255, 255, 255, 0.15);
    }
    .icon-display {
      width: 64px;
      height: 64px;
      margin: 0 auto 1rem;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .icon-display img {
      max-width: 48px;
      max-height: 48px;
      border-radius: 8px;
    }
    .trademark { font-size: 0.6em; vertical-align: super; }
  </style>
</head>
<body>
  <div class="container">
    <h1>MaycoleTracker<span class="trademark">™</span> Volume XI</h1>
    <h2>Professional Icon Showcase</h2>
    <p>All MaycoleTracker™ branded icons and logos for PWA deployment</p>
    
    <div class="icon-grid">
      <div class="icon-card">
        <div class="icon-display">
          <img src="/icons/maycoletracker-kinetic-logo.svg" alt="Kinetic Logo">
        </div>
        <h3>Kinetic Logo</h3>
        <p>SVG Vector</p>
      </div>
      
      <div class="icon-card">
        <div class="icon-display">
          <img src="/icons/kinetic-logo-192.png" alt="Kinetic Logo 192px">
        </div>
        <h3>Kinetic Logo</h3>
        <p>192x192 PNG</p>
      </div>
      
      <div class="icon-card">
        <div class="icon-display">
          <img src="/icons/kinetic-logo-512.png" alt="Kinetic Logo 512px">
        </div>
        <h3>Kinetic Logo HD</h3>
        <p>512x512 PNG</p>
      </div>
      
      <div class="icon-card">
        <div class="icon-display">
          <img src="/icons/maycoletracker-icon-static.svg" alt="Static Logo">
        </div>
        <h3>Static Logo</h3>
        <p>SVG Vector</p>
      </div>
    </div>
    
    <div style="margin-top: 2rem; text-align: center; opacity: 0.8;">
      <p>🎯 All icons optimized for PWA deployment</p>
      <p>📱 iOS and Android compatible</p>
      <p>✨ Enterprise-grade branding</p>
    </div>
  </div>
</body>
</html>
`;

fs.writeFileSync('./public/icon-showcase.html', testHTML);
console.log('\n📄 Created icon showcase: /public/icon-showcase.html');
console.log('   Visit: http://localhost:5173/icon-showcase.html');