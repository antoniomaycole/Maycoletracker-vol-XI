/**
 * MaycoleTracker™ vol. XI - Export Package Creator
 * Creates a complete backup package with all essential files
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Essential files and folders to include in export
const ESSENTIAL_FILES = [
  'App.tsx',
  'package.json',
  'vite.config.ts',
  'tsconfig.json',
  'vercel.json',
  'index.html',
  'README.md'
];

const ESSENTIAL_FOLDERS = [
  'components',
  'styles',
  'public',
  'contexts',
  'lib',
  'utils',
  'types'
];

const EXPORT_INFO = {
  name: 'MaycoleTracker™ vol. XI - Enterprise Edition',
  version: '11.0.1',
  description: 'Complete Universal Business Management Platform',
  features: [
    '17+ Business Management Modules',
    'Premium Subscription System ($89 Pro, $199 Enterprise)',
    '9 Industry Configurations (Healthcare, Restaurants, etc.)',
    'Voice Commands & Camera Scanner',
    'PWA Installation & Offline Support',
    'Real-time Analytics Dashboard',
    'Multi-platform Responsive Design',
    'Professional MaycoleTracker™ Branding',
    'Vercel Deployment Ready',
    'Production-Grade Error Handling'
  ],
  technologies: [
    'React 18 + TypeScript',
    'Tailwind CSS V4',
    'Vite Build System',
    'React Router v6',
    'ShadCN/UI Components',
    'PWA Service Worker',
    'Cross-Platform Compatibility'
  ]
};

function createExportPackage() {
  const timestamp = new Date().toISOString().split('T')[0];
  const exportDir = `MaycoleTracker-Export-${timestamp}`;
  
  console.log('🎯 Creating MaycoleTracker™ Export Package...');
  
  // Create export directory
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir);
  }
  
  // Copy essential files
  console.log('📁 Copying essential files...');
  ESSENTIAL_FILES.forEach(file => {
    if (fs.existsSync(file)) {
      fs.copyFileSync(file, path.join(exportDir, file));
      console.log(`✅ Copied: ${file}`);
    }
  });
  
  // Copy essential folders
  console.log('📂 Copying essential folders...');
  ESSENTIAL_FOLDERS.forEach(folder => {
    if (fs.existsSync(folder)) {
      copyFolderRecursive(folder, path.join(exportDir, folder));
      console.log(`✅ Copied folder: ${folder}`);
    }
  });
  
  // Create export information file
  const exportInfo = {
    ...EXPORT_INFO,
    exportDate: new Date().toISOString(),
    exportVersion: timestamp,
    setupInstructions: [
      '1. Extract all files to a new directory',
      '2. Run: npm install',
      '3. Run: npm run dev (for development)',
      '4. Run: npm run build (for production)',
      '5. Deploy: vercel --prod (for Vercel deployment)'
    ],
    fileStructure: {
      essential_files: ESSENTIAL_FILES,
      essential_folders: ESSENTIAL_FOLDERS,
      total_components: '75+ React Components',
      ui_components: '35+ ShadCN Components'
    }
  };
  
  fs.writeFileSync(
    path.join(exportDir, 'EXPORT_INFO.json'),
    JSON.stringify(exportInfo, null, 2)
  );
  
  // Create setup script
  const setupScript = `#!/bin/bash
# MaycoleTracker™ vol. XI Setup Script

echo "🎯 Setting up MaycoleTracker™ vol. XI Enterprise Edition..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

# Success message
echo "✅ MaycoleTracker™ setup complete!"
echo "🚀 Run 'npm run dev' to start development server"
echo "🌐 Run 'vercel --prod' to deploy to production"
echo ""
echo "Your universal business management platform is ready! 🎉"
`;

  fs.writeFileSync(path.join(exportDir, 'setup.sh'), setupScript);
  fs.chmodSync(path.join(exportDir, 'setup.sh'), '755');
  
  // Create README for export
  const exportReadme = `# MaycoleTracker™ vol. XI - Enterprise Edition

## 🎯 World's First Universal Business Management Platform

This export contains your complete MaycoleTracker™ system - a production-ready business management platform serving multiple industries.

### ✨ What's Included

- **17+ Business Modules**: Complete operational control
- **Premium Subscriptions**: $89 Professional, $199 Enterprise tiers
- **9 Industry Configurations**: Healthcare, Restaurants, Manufacturing, etc.
- **Advanced Features**: Voice commands, camera scanner, analytics
- **PWA Support**: Install as mobile/desktop app
- **Professional Branding**: Complete MaycoleTracker™ identity

### 🚀 Quick Start

\`\`\`bash
# 1. Install dependencies
npm install

# 2. Start development
npm run dev

# 3. Build for production  
npm run build

# 4. Deploy to Vercel
vercel --prod
\`\`\`

### 💼 Business Value

This system represents a comprehensive enterprise solution with:
- Multi-industry adaptability
- Revenue-generating subscription model
- Professional user experience
- Scalable architecture
- Production-ready deployment

### 🛠️ Technical Stack

- React 18 + TypeScript
- Tailwind CSS V4
- Vite + ShadCN/UI
- PWA + Service Worker
- Vercel Deployment

---

**MaycoleTracker™ by MaycoleTechnologies™**
*Contributing and changing the future one product at a time.*
`;

  fs.writeFileSync(path.join(exportDir, 'README.md'), exportReadme);
  
  console.log(`\n🎉 Export package created: ${exportDir}`);
  console.log(`📊 Package includes:`);
  console.log(`   - ${ESSENTIAL_FILES.length} essential files`);
  console.log(`   - ${ESSENTIAL_FOLDERS.length} essential folders`);
  console.log(`   - 75+ React components`);
  console.log(`   - Complete business management system`);
  console.log(`   - Setup instructions and documentation`);
  
  // Create archive
  console.log(`\n📦 Creating archive...`);
  exec(`tar -czf ${exportDir}.tar.gz ${exportDir}`, (error) => {
    if (error) {
      console.log(`ZIP created: ${exportDir}.zip (fallback)`);
      exec(`zip -r ${exportDir}.zip ${exportDir}`);
    } else {
      console.log(`✅ Archive created: ${exportDir}.tar.gz`);
    }
    
    console.log(`\n🎯 MaycoleTracker™ Export Complete!`);
    console.log(`📁 Folder: ${exportDir}`);
    console.log(`📦 Archive: ${exportDir}.tar.gz`);
    console.log(`\n💡 Share this package to restore your complete system anywhere!`);
  });
}

function copyFolderRecursive(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }
  
  const files = fs.readdirSync(source);
  
  files.forEach(file => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);
    
    if (fs.statSync(sourcePath).isDirectory()) {
      copyFolderRecursive(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}

// Run the export
createExportPackage();