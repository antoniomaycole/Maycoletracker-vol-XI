#!/usr/bin/env node

/**
 * MaycoleTracker™ Volume XI - Complete PWA Deployment Verification
 * Comprehensive check for production-ready PWA deployment
 */

const fs = require('fs');

console.log('🚀 MaycoleTracker™ Volume XI - PWA Deployment Verification');
console.log('=========================================================');

// 1. Check PWA Core Files
console.log('\n📱 PWA Core Files:');
const pwaFiles = [
  { path: './public/manifest.json', description: 'PWA Manifest' },
  { path: './public/sw.js', description: 'Service Worker' },
  { path: './public/404.html', description: 'SPA Fallback' },
  { path: './index.html', description: 'Main HTML' }
];

let pwaFilesValid = true;
pwaFiles.forEach(({ path, description }) => {
  const exists = fs.existsSync(path);
  console.log(`${exists ? '✅' : '❌'} ${description}: ${path}`);
  if (!exists) pwaFilesValid = false;
});

// 2. Check Icon Completeness
console.log('\n🎨 PWA Icon Requirements:');
const requiredIcons = [
  { size: '72x72', path: './public/icons/icon-72.png' },
  { size: '96x96', path: './public/icons/icon-96.png' },
  { size: '128x128', path: './public/icons/icon-128.png' },
  { size: '192x192', path: './public/icons/icon-192.png' },
  { size: '512x512', path: './public/icons/icon-512.png' }
];

let iconsValid = true;
requiredIcons.forEach(({ size, path }) => {
  const exists = fs.existsSync(path);
  console.log(`${exists ? '✅' : '❌'} ${size}: ${path}`);
  if (!exists) iconsValid = false;
});

// 3. Check Manifest Content
console.log('\n📋 Manifest Configuration:');
let manifestValid = true;
try {
  const manifest = JSON.parse(fs.readFileSync('./public/manifest.json', 'utf-8'));
  
  const requirements = [
    { field: 'name', check: v => v && v.includes('MaycoleTracker™'), desc: 'App name with branding' },
    { field: 'short_name', check: v => v && v.length <= 12, desc: 'Short name (≤12 chars)' },
    { field: 'start_url', check: v => v === '/', desc: 'Start URL' },
    { field: 'display', check: v => v === 'standalone', desc: 'Standalone display' },
    { field: 'background_color', check: v => /^#[0-9A-Fa-f]{6}$/.test(v), desc: 'Valid background color' },
    { field: 'theme_color', check: v => /^#[0-9A-Fa-f]{6}$/.test(v), desc: 'Valid theme color' },
    { field: 'icons', check: v => Array.isArray(v) && v.length >= 5, desc: 'Multiple icon sizes' },
    { field: 'description', check: v => v && v.length > 20, desc: 'Descriptive text' }
  ];
  
  requirements.forEach(({ field, check, desc }) => {
    const valid = check(manifest[field]);
    console.log(`${valid ? '✅' : '❌'} ${desc}: ${manifest[field]}`);
    if (!valid) manifestValid = false;
  });
  
} catch (error) {
  console.log('❌ Manifest parsing error:', error.message);
  manifestValid = false;
}

// 4. Check HTML Meta Tags
console.log('\n🌐 HTML Meta Tag Requirements:');
let htmlMetaValid = true;
try {
  const html = fs.readFileSync('./index.html', 'utf-8');
  
  const metaRequirements = [
    { pattern: /<meta name="viewport".*width=device-width/, desc: 'Responsive viewport' },
    { pattern: /<meta name="theme-color"/, desc: 'Theme color meta' },
    { pattern: /<link rel="manifest"/, desc: 'Manifest link' },
    { pattern: /<meta name="apple-mobile-web-app-capable"/, desc: 'iOS PWA support' },
    { pattern: /<link rel="apple-touch-icon"/, desc: 'iOS touch icon' },
    { pattern: /<meta property="og:title"/, desc: 'Open Graph title' },
    { pattern: /<meta name="description"/, desc: 'SEO description' }
  ];
  
  metaRequirements.forEach(({ pattern, desc }) => {
    const found = pattern.test(html);
    console.log(`${found ? '✅' : '❌'} ${desc}`);
    if (!found) htmlMetaValid = false;
  });
  
} catch (error) {
  console.log('❌ HTML parsing error:', error.message);
  htmlMetaValid = false;
}

// 5. Check Service Worker
console.log('\n⚙️ Service Worker Configuration:');
let swValid = true;
try {
  if (fs.existsSync('./public/sw.js')) {
    const sw = fs.readFileSync('./public/sw.js', 'utf-8');
    
    const swChecks = [
      { pattern: /cache/i, desc: 'Caching functionality' },
      { pattern: /fetch/i, desc: 'Network request handling' },
      { pattern: /install/i, desc: 'Install event handler' },
      { pattern: /activate/i, desc: 'Activate event handler' }
    ];
    
    swChecks.forEach(({ pattern, desc }) => {
      const found = pattern.test(sw);
      console.log(`${found ? '✅' : '⚠️'} ${desc}`);
      if (!found) swValid = false;
    });
  } else {
    console.log('⚠️ Service worker file not found');
    swValid = false;
  }
} catch (error) {
  console.log('❌ Service worker error:', error.message);
  swValid = false;
}

// 6. Check Routing Configuration
console.log('\n🔄 SPA Routing Configuration:');
let routingValid = true;
try {
  const app = fs.readFileSync('./App.tsx', 'utf-8');
  
  const routingChecks = [
    { pattern: /BrowserRouter/, desc: 'React Router configured' },
    { pattern: /Routes.*Route/s, desc: 'Route definitions' },
    { pattern: /path="\*"/, desc: '404 fallback route' },
    { pattern: /ErrorBoundary/, desc: 'Error boundary' }
  ];
  
  routingChecks.forEach(({ pattern, desc }) => {
    const found = pattern.test(app);
    console.log(`${found ? '✅' : '❌'} ${desc}`);
    if (!found) routingValid = false;
  });
  
  // Check 404.html
  if (fs.existsSync('./public/404.html')) {
    const fallback = fs.readFileSync('./public/404.html', 'utf-8');
    const hasRedirect = /sessionStorage.*redirect/.test(fallback);
    console.log(`${hasRedirect ? '✅' : '❌'} SPA redirect handling in 404.html`);
    if (!hasRedirect) routingValid = false;
  } else {
    console.log('❌ 404.html fallback missing');
    routingValid = false;
  }
  
} catch (error) {
  console.log('❌ Routing check error:', error.message);
  routingValid = false;
}

// 7. Check Deployment Files
console.log('\n🌍 Deployment Configuration:');
let deploymentValid = true;
const deploymentFiles = [
  { path: './netlify.toml', platform: 'Netlify' },
  { path: './vercel.json', platform: 'Vercel' }
];

deploymentFiles.forEach(({ path, platform }) => {
  const exists = fs.existsSync(path);
  console.log(`${exists ? '✅' : '⚠️'} ${platform} config: ${path}`);
});

// 8. Generate Overall Score
console.log('\n📊 PWA Deployment Readiness:');
const categories = [
  { name: 'PWA Core Files', valid: pwaFilesValid, weight: 20 },
  { name: 'Icon Requirements', valid: iconsValid, weight: 15 },
  { name: 'Manifest Config', valid: manifestValid, weight: 20 },
  { name: 'HTML Meta Tags', valid: htmlMetaValid, weight: 15 },
  { name: 'Service Worker', valid: swValid, weight: 10 },
  { name: 'SPA Routing', valid: routingValid, weight: 20 }
];

let totalScore = 0;
let maxScore = 0;

categories.forEach(({ name, valid, weight }) => {
  const score = valid ? weight : 0;
  totalScore += score;
  maxScore += weight;
  console.log(`${valid ? '✅' : '❌'} ${name}: ${score}/${weight} points`);
});

const percentage = Math.round((totalScore / maxScore) * 100);
console.log(`\n🎯 Overall PWA Score: ${totalScore}/${maxScore} (${percentage}%)`);

// Status Message
if (percentage >= 95) {
  console.log('🎉 EXCELLENT! Your MaycoleTracker™ PWA is production-ready!');
} else if (percentage >= 85) {
  console.log('✅ GOOD! Minor optimizations may be needed.');
} else if (percentage >= 70) {
  console.log('⚠️ FAIR! Some important PWA features need attention.');
} else {
  console.log('❌ NEEDS WORK! Several PWA requirements are missing.');
}

// Deployment Instructions
console.log('\n🚀 Deployment Instructions:');
console.log('1. Build the application: npm run build');
console.log('2. Test PWA features: npm run preview');
console.log('3. Deploy to hosting platform (Netlify, Vercel, etc.)');
console.log('4. Test PWA installation on mobile devices');
console.log('5. Verify offline functionality');

console.log('\n📱 PWA Testing Checklist:');
console.log('□ Install prompt appears in supported browsers');
console.log('□ App installs correctly on iOS Safari');
console.log('□ App installs correctly on Android Chrome');
console.log('□ Splash screen shows MaycoleTracker™ branding');
console.log('□ App works offline (cached resources)');
console.log('□ Direct URL navigation works (SPA routing)');
console.log('□ App appears in device app drawer with correct icon');
console.log('□ App runs in standalone mode (no browser UI)');

console.log('\n✨ Your MaycoleTracker™ Volume XI PWA deployment system is comprehensive!');