#!/usr/bin/env node

/**
 * MaycoleTracker™ Navigation Switcher
 * Switch between state-based and React Router navigation
 */

import { readFileSync, writeFileSync } from 'fs';

const args = process.argv.slice(2);
const mode = args[0];

const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  magenta: '\x1b[35m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

console.log(`${colors.cyan}${colors.bold}🧭 MaycoleTracker™ Navigation Switcher${colors.reset}`);
console.log('=' .repeat(50));

if (!mode || !['state', 'router', 'layout'].includes(mode)) {
  console.log(`${colors.yellow}Usage: node switch-navigation.js [state|router|layout]${colors.reset}`);
  console.log('\nOptions:');
  console.log('  state  - Use state-based navigation (original App.tsx)');
  console.log('  router - Use React Router navigation (AppWithRouter.tsx)');
  console.log('  layout - Use Layout + Outlet pattern (AppWithRouterLayout.tsx)');
  console.log('\nCurrent main.tsx configuration:');
  
  try {
    const mainContent = readFileSync('src/main.tsx', 'utf8');
    if (mainContent.includes('AppWithRouterLayout')) {
      console.log(`${colors.magenta}✅ Currently using: Layout + Outlet pattern${colors.reset}`);
    } else if (mainContent.includes('AppWithRouter')) {
      console.log(`${colors.green}✅ Currently using: React Router navigation${colors.reset}`);
    } else if (mainContent.includes('// import App')) {
      console.log(`${colors.blue}ℹ️  Currently using: State-based navigation${colors.reset}`);
    } else {
      console.log(`${colors.blue}ℹ️  Currently using: State-based navigation${colors.reset}`);
    }
  } catch (err) {
    console.log(`${colors.yellow}⚠️  Could not determine current configuration${colors.reset}`);
  }
  
  process.exit(0);
}

try {
  let mainContent = readFileSync('src/main.tsx', 'utf8');
  
  if (mode === 'layout') {
    // Switch to Layout + Outlet pattern
    mainContent = mainContent
      .replace('// import App from', 'import App from')
      .replace('// import AppWithRouter from', 'import AppWithRouter from')
      .replace('import AppWithRouterLayout from', '// import AppWithRouterLayout from')
      .replace('// import App from \'../App.tsx\'                          // State-based navigation (original)', '// import App from \'../App.tsx\'                          // State-based navigation (original)')
      .replace('// import AppWithRouter from \'../AppWithRouter.tsx\'      // React Router navigation', '// import AppWithRouter from \'../AppWithRouter.tsx\'      // React Router navigation')
      .replace('// import AppWithRouterLayout from \'../AppWithRouterLayout.tsx\' // Layout + Outlet pattern (newest)', 'import AppWithRouterLayout from \'../AppWithRouterLayout.tsx\' // Layout + Outlet pattern (newest)')
      .replace('<App />', '<AppWithRouterLayout />')
      .replace('<AppWithRouter />', '<AppWithRouterLayout />');
    
    console.log(`${colors.magenta}✅ Switched to Layout + Outlet pattern${colors.reset}`);
    console.log(`${colors.blue}Features enabled:${colors.reset}`);
    console.log('   • Shared Layout component with <Outlet />');
    console.log('   • Consistent header/footer across routes');
    console.log('   • URL-based navigation (/analytics, /scanner, /camera, /premium)');
    console.log('   • Floating action buttons');
    console.log('   • Mobile bottom navigation');
    console.log('   • Premium feature integration');
    console.log('   • Emergency mode overlay');
    console.log('   • Clean separation of concerns');
    
  } else if (mode === 'router') {
    // Switch to React Router
    mainContent = mainContent
      .replace('// import App from', 'import App from')
      .replace('import AppWithRouterLayout from', '// import AppWithRouterLayout from')
      .replace('// import AppWithRouter from', 'import AppWithRouter from')
      .replace('// import App from \'../App.tsx\'                          // State-based navigation (original)', '// import App from \'../App.tsx\'                          // State-based navigation (original)')
      .replace('// import AppWithRouter from \'../AppWithRouter.tsx\'      // React Router navigation', 'import AppWithRouter from \'../AppWithRouter.tsx\'      // React Router navigation')
      .replace('import AppWithRouterLayout from \'../AppWithRouterLayout.tsx\' // Layout + Outlet pattern (newest)', '// import AppWithRouterLayout from \'../AppWithRouterLayout.tsx\' // Layout + Outlet pattern (newest)')
      .replace('<App />', '<AppWithRouter />')
      .replace('<AppWithRouterLayout />', '<AppWithRouter />');
    
    console.log(`${colors.green}✅ Switched to React Router navigation${colors.reset}`);
    console.log(`${colors.blue}Features enabled:${colors.reset}`);
    console.log('   • URL-based navigation (/analytics, /scanner, /camera, /premium)');
    console.log('   • Individual page components');
    console.log('   • Floating action navigation');
    console.log('   • Mobile bottom navigation');
    console.log('   • Page transitions');
    console.log('   • Breadcrumb navigation');
    console.log('   • Browser back/forward support');
    
  } else if (mode === 'state') {
    // Switch to state-based
    mainContent = mainContent
      .replace('import AppWithRouterLayout from', '// import AppWithRouterLayout from')
      .replace('// import AppWithRouter from', 'import AppWithRouter from')
      .replace('// import App from', 'import App from')
      .replace('// import App from \'../App.tsx\'                          // State-based navigation (original)', 'import App from \'../App.tsx\'                          // State-based navigation (original)')
      .replace('import AppWithRouter from \'../AppWithRouter.tsx\'      // React Router navigation', '// import AppWithRouter from \'../AppWithRouter.tsx\'      // React Router navigation')
      .replace('import AppWithRouterLayout from \'../AppWithRouterLayout.tsx\' // Layout + Outlet pattern (newest)', '// import AppWithRouterLayout from \'../AppWithRouterLayout.tsx\' // Layout + Outlet pattern (newest)')
      .replace('<AppWithRouter />', '<App />')
      .replace('<AppWithRouterLayout />', '<App />');
    
    console.log(`${colors.green}✅ Switched to state-based navigation${colors.reset}`);
    console.log(`${colors.blue}Features enabled:${colors.reset}`);
    console.log('   • Internal state navigation');
    console.log('   • Full onboarding flow');
    console.log('   • Industry selector');
    console.log('   • Business configuration');
    console.log('   • Tab-based interface');
    console.log('   • Back button navigation');
  }
  
  writeFileSync('src/main.tsx', mainContent);
  
  console.log(`\n${colors.cyan}Navigation switched successfully!${colors.reset}`);
  console.log(`${colors.yellow}Run "npm run dev" to test the new navigation mode.${colors.reset}`);
  
  if (mode === 'router') {
    console.log(`${colors.blue}Run "npm run router-verify" to verify router integration.${colors.reset}`);
  } else if (mode === 'layout') {
    console.log(`${colors.magenta}Layout + Outlet pattern provides the cleanest architecture!${colors.reset}`);
    console.log(`${colors.blue}Run "npm run layout-verify" to verify layout integration.${colors.reset}`);
  }
  
} catch (err) {
  console.log(`${colors.red}❌ Error switching navigation: ${err.message}${colors.reset}`);
  process.exit(1);
}