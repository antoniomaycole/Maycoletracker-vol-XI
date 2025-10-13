/**
 * MaycoleTracker™ vol. XI - Component Stability Test Suite
 * COMPREHENSIVE STABILITY VERIFICATION FOR ALL COMPONENTS
 */

const fs = require('fs');
const path = require('path');

// Component Stability Test Results
const testResults = {
  total: 0,
  passed: 0,
  failed: 0,
  warnings: 0,
  components: []
};

// Critical Components List
const criticalComponents = [
  'App.tsx',
  'LogoPage.tsx', 
  'MainPage.tsx',
  'KineticLogo.tsx',
  'BusinessDashboard.tsx',
  'FinancialManagement.tsx',
  'CustomerManagement.tsx',
  'ProjectManagement.tsx',
  'InventoryPage.tsx',
  'AnalyticsPage.tsx',
  'ScannerPage.tsx'
];

// Test Patterns for Common Issues
const testPatterns = {
  // React Import Issues
  reactImport: /import\s+React\s*,?\s*\{[^}]*\}\s+from\s+['"]react['"]/,
  reactImportSimple: /import\s+React\s+from\s+['"]react['"]/,
  
  // Hook Issues
  useStatePattern: /useState\s*\(/,
  useEffectPattern: /useEffect\s*\(/,
  useNavigatePattern: /useNavigate\s*\(/,
  useContextPattern: /useContext\s*\(/,
  
  // Component Structure
  defaultExport: /export\s+default\s+/,
  functionComponent: /function\s+\w+\s*\(/,
  arrowComponent: /const\s+\w+\s*=\s*\(/,
  
  // JSX Issues
  jsxReturn: /return\s*\(/,
  jsxFragment: /<[^>]*>/,
  
  // TypeScript Issues
  interfacePattern: /interface\s+\w+/,
  typePattern: /type\s+\w+\s*=/,
  propsPattern: /:\s*\w+Props/,
  
  // CSS Issues
  classNamePattern: /className\s*=/,
  stylePattern: /style\s*=/,
  
  // Router Issues
  navigatePattern: /navigate\s*\(/,
  routerHook: /useNavigate|useLocation|useParams/,
  
  // Critical Syntax Issues
  syntaxErrors: [
    /export\s+default\s+function\s+\w+\s*\(\s*\)\s*\{[^}]*\}/,
    /const\s+\w+\s*=\s*\([^)]*\)\s*=>\s*\{/,
    /return\s*\(\s*<[^>]*>/
  ]
};

// Analyze Component Function
function analyzeComponent(filePath, content) {
  const componentName = path.basename(filePath, '.tsx');
  const result = {
    name: componentName,
    path: filePath,
    status: 'PASSED',
    issues: [],
    warnings: [],
    score: 100,
    critical: criticalComponents.includes(path.basename(filePath))
  };

  console.log(`🔍 Testing ${componentName}...`);

  // Test 1: React Import
  if (!testPatterns.reactImport.test(content) && !testPatterns.reactImportSimple.test(content)) {
    if (content.includes('React.')) {
      result.warnings.push('Missing React import but using React namespace');
      result.score -= 5;
    }
  }

  // Test 2: Export Structure
  if (!testPatterns.defaultExport.test(content)) {
    result.issues.push('Missing default export');
    result.status = 'FAILED';
    result.score -= 25;
  }

  // Test 3: Component Function Structure
  if (!testPatterns.functionComponent.test(content) && !testPatterns.arrowComponent.test(content)) {
    result.issues.push('Invalid component function structure');
    result.status = 'FAILED';
    result.score -= 30;
  }

  // Test 4: JSX Return
  if (!testPatterns.jsxReturn.test(content)) {
    result.issues.push('Missing JSX return statement');
    result.status = 'FAILED';
    result.score -= 20;
  }

  // Test 5: Hook Usage Validation
  const hooks = ['useState', 'useEffect', 'useNavigate', 'useContext'];
  hooks.forEach(hook => {
    if (content.includes(hook) && !content.includes(`import { ${hook} }`)) {
      result.warnings.push(`Using ${hook} without proper import`);
      result.score -= 5;
    }
  });

  // Test 6: Router Integration
  if (content.includes('useNavigate') && !content.includes("from 'react-router-dom'")) {
    result.issues.push('Router hook used without import');
    result.score -= 15;
  }

  // Test 7: TypeScript Props Interface
  if (content.includes('Props') && !testPatterns.interfacePattern.test(content) && !testPatterns.typePattern.test(content)) {
    result.warnings.push('Props usage without proper TypeScript interface');
    result.score -= 5;
  }

  // Test 8: CSS/Styling
  if (testPatterns.classNamePattern.test(content) || testPatterns.stylePattern.test(content)) {
    // Check for CSS import if using external styles
    if (content.includes('.css') && !content.includes("import")) {
      result.warnings.push('CSS usage without proper import');
      result.score -= 5;
    }
  }

  // Test 9: Critical Syntax Check
  let syntaxValid = false;
  testPatterns.syntaxErrors.forEach(pattern => {
    if (pattern.test(content)) {
      syntaxValid = true;
    }
  });

  if (!syntaxValid && content.includes('export default')) {
    result.warnings.push('Potential syntax structure issues');
    result.score -= 10;
  }

  // Test 10: Component Complexity
  const componentLength = content.split('\n').length;
  if (componentLength > 500) {
    result.warnings.push('Large component file - consider splitting');
    result.score -= 5;
  }

  // Test 11: Performance Patterns
  if (content.includes('useEffect') && !content.includes('[]')) {
    result.warnings.push('useEffect without dependency array may cause performance issues');
    result.score -= 5;
  }

  // Final Status
  if (result.issues.length === 0 && result.warnings.length === 0) {
    result.status = 'EXCELLENT';
  } else if (result.issues.length === 0) {
    result.status = 'GOOD';
  }

  return result;
}

// Main Test Function
async function runStabilityTests() {
  console.log('🚀 MaycoleTracker™ vol. XI - Component Stability Test Suite');
  console.log('=========================================================');
  
  const componentsDir = path.join(__dirname, 'components');
  const appFile = path.join(__dirname, 'App.tsx');
  
  // Test App.tsx first
  try {
    const appContent = fs.readFileSync(appFile, 'utf8');
    const appResult = analyzeComponent(appFile, appContent);
    testResults.components.push(appResult);
    testResults.total++;
    
    if (appResult.status === 'FAILED') {
      testResults.failed++;
    } else {
      testResults.passed++;
    }
    
    if (appResult.warnings.length > 0) {
      testResults.warnings += appResult.warnings.length;
    }
    
    console.log(`✅ App.tsx: ${appResult.status} (Score: ${appResult.score}/100)`);
  } catch (error) {
    console.log(`❌ App.tsx: ERROR - ${error.message}`);
    testResults.failed++;
    testResults.total++;
  }

  // Test all components
  try {
    const files = fs.readdirSync(componentsDir)
      .filter(file => file.endsWith('.tsx'))
      .filter(file => !file.includes('.test.') && !file.includes('.spec.'));

    for (const file of files) {
      const filePath = path.join(componentsDir, file);
      
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const result = analyzeComponent(filePath, content);
        
        testResults.components.push(result);
        testResults.total++;
        
        if (result.status === 'FAILED') {
          testResults.failed++;
          console.log(`❌ ${file}: ${result.status} (Score: ${result.score}/100)`);
          if (result.issues.length > 0) {
            result.issues.forEach(issue => console.log(`   ⚠️  ${issue}`));
          }
        } else {
          testResults.passed++;
          console.log(`✅ ${file}: ${result.status} (Score: ${result.score}/100)`);
        }
        
        if (result.warnings.length > 0) {
          testResults.warnings += result.warnings.length;
          result.warnings.forEach(warning => console.log(`   ⚡ ${warning}`));
        }
        
      } catch (error) {
        console.log(`❌ ${file}: ERROR - ${error.message}`);
        testResults.failed++;
        testResults.total++;
      }
    }
  } catch (error) {
    console.log(`❌ Components directory error: ${error.message}`);
  }

  // Generate Report
  console.log('\n📊 STABILITY TEST RESULTS');
  console.log('========================');
  console.log(`Total Components Tested: ${testResults.total}`);
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`⚡ Total Warnings: ${testResults.warnings}`);
  console.log(`📈 Overall Success Rate: ${((testResults.passed / testResults.total) * 100).toFixed(1)}%`);

  // Critical Components Report
  console.log('\n🔥 CRITICAL COMPONENTS STATUS');
  console.log('============================');
  const criticalResults = testResults.components.filter(c => c.critical);
  criticalResults.forEach(component => {
    const status = component.status === 'FAILED' ? '❌' : '✅';
    console.log(`${status} ${component.name}: ${component.status} (${component.score}/100)`);
  });

  // Failed Components Detail
  if (testResults.failed > 0) {
    console.log('\n🚨 FAILED COMPONENTS DETAIL');
    console.log('===========================');
    testResults.components
      .filter(c => c.status === 'FAILED')
      .forEach(component => {
        console.log(`\n❌ ${component.name}:`);
        component.issues.forEach(issue => console.log(`   • ${issue}`));
      });
  }

  // Recommendations
  console.log('\n💡 RECOMMENDATIONS');
  console.log('==================');
  if (testResults.failed === 0) {
    console.log('✨ All components are stable! Excellent work!');
  } else {
    console.log('🔧 Fix failed components before production deployment');
  }
  
  if (testResults.warnings > 0) {
    console.log('⚡ Address warnings to improve code quality');
  }

  console.log('\n🏆 MaycoleTracker™ Component Stability Test Complete');
  
  return testResults;
}

// Run tests if called directly
if (require.main === module) {
  runStabilityTests().catch(console.error);
}

module.exports = { runStabilityTests, analyzeComponent };