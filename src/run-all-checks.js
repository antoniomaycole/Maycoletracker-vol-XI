#!/usr/bin/env node

/**
 * Complete MaycoleTracker™ Development Check
 * Runs all optimization and verification scripts
 */

const { spawn } = require('child_process');

console.log('🚀 Running Complete MaycoleTracker™ System Check');
console.log('================================================');
console.log('');

async function runScript(scriptName, description) {
  return new Promise((resolve) => {
    console.log(`🔍 ${description}...`);
    console.log('='.repeat(description.length + 4));
    
    const child = spawn('node', [scriptName], { stdio: 'inherit' });
    
    child.on('close', (code) => {
      console.log('');
      if (code === 0) {
        console.log(`✅ ${description} completed successfully!`);
      } else {
        console.log(`⚠️  ${description} completed with warnings`);
      }
      console.log('');
      resolve(code);
    });
  });
}

async function runAllChecks() {
  const checks = [
    ['dev-optimization-check.js', 'Development Optimization Analysis'],
    ['optimize-css-for-simplified.js', 'CSS Optimization Analysis'],
    ['final-system-check.js', 'Final System Verification']
  ];

  console.log('🎯 Running 3 comprehensive checks...');
  console.log('');

  for (const [script, description] of checks) {
    if (require('fs').existsSync(script)) {
      await runScript(script, description);
    } else {
      console.log(`⚠️  Skipping ${description} - script not found`);
    }
  }

  console.log('🎉 ALL CHECKS COMPLETE!');
  console.log('=======================');
  console.log('');
  console.log('🚀 Your simplified MaycoleTracker™ is ready for development!');
  console.log('');
  console.log('⚡ Next steps:');
  console.log('   npm run dev     # Start development server');
  console.log('   npm run build   # Build for production');
  console.log('');
  console.log('🌟 Access your app at: http://localhost:5173');
  console.log('');
  console.log('© 2025 MaycoleTechnologies™ - Excellence Simplified');
}

runAllChecks().catch(console.error);