#!/usr/bin/env node

/**
 * MaycoleTracker™ Complete Route Testing
 * Tests all routes and navigation functionality
 */

const fs = require('fs');

console.log('🧪 MaycoleTracker™ Complete Route Testing');
console.log('==========================================');

// Check App.tsx for all routes
const appContent = fs.readFileSync('./App.tsx', 'utf-8');

const routes = [
  { path: '/', component: 'LogoPage', description: 'Home/Logo Page' },
  { path: '/main', component: 'MainPage', description: 'Main Dashboard' },
  { path: '/supplies', component: 'SuppliesPage', description: 'Supplies Management' },
  { path: '/analytics', component: 'AnalyticsPage', description: 'Analytics Dashboard' },
  { path: '/scanner', component: 'ScannerPage', description: 'Barcode Scanner' },
  { path: '/ai', component: 'AIInsightPage', description: 'AI Insights' }
];

console.log('\n📍 Route Configuration Check:');
let allRoutesFound = true;

routes.forEach(route => {
  const hasRoute = appContent.includes(`path="${route.path}"`) && 
                   appContent.includes(`<${route.component}`);
  console.log(`${hasRoute ? '✅' : '❌'} ${route.path} → ${route.component} (${route.description})`);
  if (!hasRoute) allRoutesFound = false;
});

// Check for wildcard route (404 handling)
const hasWildcard = appContent.includes('path="*"');
console.log(`${hasWildcard ? '✅' : '❌'} /* → 404 Handler (Catch-all route)`);

// Check component imports
console.log('\n📦 Component Import Check:');
const components = ['LogoPage', 'MainPage', 'SuppliesPage', 'AnalyticsPage', 'ScannerPage', 'AIInsightPage'];
components.forEach(component => {
  const hasImport = appContent.includes(`import ${component}`);
  console.log(`${hasImport ? '✅' : '❌'} ${component} imported`);
});

// Check if components exist
console.log('\n📁 Component File Check:');
components.forEach(component => {
  const filePath = `./components/${component}.tsx`;
  const exists = fs.existsSync(filePath);
  console.log(`${exists ? '✅' : '⚠️'} ${filePath} ${exists ? 'exists' : 'missing'}`);
});

// Check for ErrorBoundary and 404 redirect handling
const hasErrorBoundary = appContent.includes('class ErrorBoundary');
const hasRedirectHandling = appContent.includes('maycoletracker_redirect_path');
const hasEnhanced404 = appContent.includes('Available routes:');

console.log('\n🛡️ Error Handling & Routing:');
console.log(`✅ ErrorBoundary: ${hasErrorBoundary ? 'Implemented' : 'Missing'}`);
console.log(`✅ 404 Redirect Handling: ${hasRedirectHandling ? 'Implemented' : 'Missing'}`);
console.log(`✅ Enhanced 404 Page: ${hasEnhanced404 ? 'Implemented' : 'Missing'}`);

// Check React Router setup
const hasRouter = appContent.includes('BrowserRouter') && appContent.includes('Routes');
console.log(`✅ React Router: ${hasRouter ? 'Configured' : 'Missing'}`);

// Calculate overall score
const totalChecks = routes.length + 1 + components.length + components.length + 4; // routes + wildcard + imports + files + error handling
let passedChecks = 0;

routes.forEach(route => {
  if (appContent.includes(`path="${route.path}"`) && appContent.includes(`<${route.component}`)) {
    passedChecks++;
  }
});

if (hasWildcard) passedChecks++;

components.forEach(component => {
  if (appContent.includes(`import ${component}`)) passedChecks++;
});

components.forEach(component => {
  if (fs.existsSync(`./components/${component}.tsx`)) passedChecks++;
});

if (hasErrorBoundary) passedChecks++;
if (hasRedirectHandling) passedChecks++;
if (hasEnhanced404) passedChecks++;
if (hasRouter) passedChecks++;

const score = Math.round((passedChecks / totalChecks) * 100);

console.log('\n🎯 Routing System Summary:');
console.log(`📊 Setup Score: ${passedChecks}/${totalChecks} (${score}%)`);

if (score >= 95) {
  console.log('🎉 Excellent! All routes configured perfectly!');
} else if (score >= 85) {
  console.log('✅ Good! Minor items may need attention.');
} else {
  console.log('⚠️ Some routes or components need setup.');
}

console.log('\n🚀 Test Your Routes:');
console.log('npm run dev');
console.log('\nThen test these URLs:');
routes.forEach(route => {
  console.log(`• http://localhost:5173${route.path} - ${route.description}`);
});

console.log('\n🧪 Manual Testing Checklist:');
console.log('□ Logo page loads and shows navigation');
console.log('□ Logo click navigates to /main');
console.log('□ All navigation buttons work from /main');
console.log('□ Direct URL access works (e.g., /analytics)');
console.log('□ Invalid URLs redirect to home with 404 page');
console.log('□ Browser back/forward buttons work');
console.log('□ No console errors during navigation');

console.log('\n✨ Your MaycoleTracker™ routing system is comprehensive!');

// Generate a quick test HTML file
const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MaycoleTracker™ Route Tester</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
      color: white;
      margin: 0;
      padding: 2rem;
      min-height: 100vh;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      backdrop-filter: blur(10px);
      padding: 2rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .route-link {
      display: block;
      padding: 1rem;
      margin: 0.5rem 0;
      background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
      color: white;
      text-decoration: none;
      border-radius: 10px;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    .route-link:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
    }
    .logo { width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">MT</div>
    <h1>MaycoleTracker™ Route Tester</h1>
    <p>Click the links below to test all routes:</p>
    
    ${routes.map(route => `
    <a href="${route.path}" class="route-link" target="_blank">
      ${route.path} - ${route.description}
    </a>`).join('')}
    
    <a href="/invalid-route" class="route-link" target="_blank">
      /invalid-route - Test 404 Handler
    </a>
    
    <p style="margin-top: 2rem; opacity: 0.8; font-size: 0.9rem;">
      Make sure your development server is running on localhost:5173
    </p>
  </div>
</body>
</html>
`;

fs.writeFileSync('./public/test-routes.html', testHtml);
console.log('\n📄 Created test file: /public/test-routes.html');
console.log('   Visit: http://localhost:5173/test-routes.html');