#!/usr/bin/env node

/**
 * 🚨 EMERGENCY MaycoleTracker™ vol. XI STARTUP TEST
 * CRITICAL BUSINESS RECOVERY VERIFICATION
 * Timestamp: [2025-10-02T02:26EDT]
 */

const { exec } = require('child_process');
const fs = require('fs');

console.log('🚨 EMERGENCY MaycoleTracker™ vol. XI STARTUP TEST');
console.log('📅 Timestamp: [2025-10-02T02:26EDT]');
console.log('🔥 CRITICAL BUSINESS APPLICATION RECOVERY\n');

// Test Configuration
const startupTests = [
  {
    name: 'Dependencies Check',
    command: 'npm list --depth=0',
    description: 'Verify all dependencies are installed',
    critical: true
  },
  {
    name: 'TypeScript Compilation',
    command: 'npx tsc --noEmit',
    description: 'Check for TypeScript compilation errors',
    critical: true
  },
  {
    name: 'Build Test',
    command: 'npm run build',
    description: 'Test if the application builds successfully',
    critical: true
  }
];

let passedTests = 0;
let failedTests = 0;

async function runTest(test) {
  console.log(`🔍 Running: ${test.name}`);
  console.log(`📋 Description: ${test.description}`);
  
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    exec(test.command, { timeout: 60000 }, (error, stdout, stderr) => {
      const duration = Date.now() - startTime;
      
      if (error) {
        console.log(`❌ FAILED: ${test.name} (${duration}ms)`);
        console.log(`📝 Error: ${error.message}`);
        if (stderr) console.log(`🔥 Stderr: ${stderr}`);
        failedTests++;
        resolve(false);
      } else {
        console.log(`✅ PASSED: ${test.name} (${duration}ms)`);
        if (stdout && stdout.length < 500) {
          console.log(`📤 Output: ${stdout.substring(0, 200)}...`);
        }
        passedTests++;
        resolve(true);
      }
      console.log(''); // Add spacing
    });
  });
}

async function runAllTests() {
  console.log('🚀 Starting Emergency Startup Tests...\n');
  
  for (const test of startupTests) {
    await runTest(test);
    
    // If a critical test fails, stop
    if (test.critical && failedTests > passedTests) {
      console.log('🚨 CRITICAL TEST FAILED - Stopping further tests');
      break;
    }
  }
  
  // Final Report
  console.log('=' .repeat(80));
  console.log('🎯 EMERGENCY STARTUP TEST REPORT');
  console.log('=' .repeat(80));
  
  console.log(`📊 Total Tests: ${passedTests + failedTests}`);
  console.log(`✅ Passed: ${passedTests}`);
  console.log(`❌ Failed: ${failedTests}`);
  
  const successRate = Math.round((passedTests / (passedTests + failedTests)) * 100);
  console.log(`📈 Success Rate: ${successRate}%`);
  
  if (failedTests === 0) {
    console.log('\n🎉 SUCCESS: MaycoleTracker™ vol. XI is READY TO START!');
    console.log('✨ All critical startup tests passed');
    console.log('🚀 Your business application should work correctly');
    console.log('\n📋 NEXT STEPS:');
    console.log('1. Run: npm run dev');
    console.log('2. Open: http://localhost:3000');
    console.log('3. Navigate through your application');
    console.log('4. Verify all business features work');
    console.log('\n💼 BUSINESS STATUS: OPERATIONAL ✅');
  } else if (failedTests === 1) {
    console.log('\n⚠️ WARNING: MaycoleTracker™ vol. XI has minor issues');
    console.log('🔧 Most tests passed, but one issue needs attention');
    console.log('\n🛠️ RECOMMENDED ACTIONS:');
    console.log('1. Review the failed test above');
    console.log('2. Try: npm install --force');
    console.log('3. Try: npm run dev (may still work)');
    console.log('4. Check browser console for errors');
    console.log('\n💼 BUSINESS STATUS: DEGRADED ⚠️');
  } else {
    console.log('\n🚨 CRITICAL: MaycoleTracker™ vol. XI needs immediate repair');
    console.log('💥 Multiple critical issues prevent startup');
    console.log('\n🆘 EMERGENCY ACTIONS:');
    console.log('1. Run: npm install --force');
    console.log('2. Clear node_modules: rm -rf node_modules && npm install');
    console.log('3. Check for missing files');
    console.log('4. Contact technical support immediately');
    console.log('\n💼 BUSINESS STATUS: CRITICAL ❌');
  }
  
  console.log('\n🏢 MaycoleTracker™ vol. XI Enterprise Edition');
  console.log('⏰ Timestamp: [2025-10-02T02:26EDT]');
  console.log('🔧 Emergency Recovery System Active');
}

// Check if we can run tests
if (!fs.existsSync('./package.json')) {
  console.log('❌ CRITICAL: package.json not found!');
  console.log('📍 Please ensure you are in the correct directory');
  process.exit(1);
}

// Run all tests
runAllTests().catch(error => {
  console.error('🚨 EMERGENCY TEST RUNNER FAILED:', error);
  process.exit(1);
});