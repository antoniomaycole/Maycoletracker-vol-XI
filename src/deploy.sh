#!/bin/bash

# MaycoleTracker™ Volume XI - Production Deployment Script
# This script prepares and deploys the application for production

echo "🚀 MaycoleTracker™ Volume XI - Production Deployment"
echo "=================================================="
echo ""

# Check if Node.js and npm are installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ and try again."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm 8+ and try again."
    exit 1
fi

# Display versions
echo "📋 Environment Information:"
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"
echo "Current directory: $(pwd)"
echo ""

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/
rm -rf node_modules/.cache/
rm -rf .vite/

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --silent

# Type checking
echo "🔍 Running TypeScript type check..."
npm run type-check

# Linting
echo "🔧 Running ESLint..."
npm run lint

# Build for production
echo "🏗️  Building for production..."
NODE_ENV=production npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed! dist/ directory not found."
    exit 1
fi

echo "✅ Build completed successfully!"
echo ""

# Display build statistics
echo "📊 Build Statistics:"
echo "Build size: $(du -sh dist/ | cut -f1)"
echo "Files created: $(find dist/ -type f | wc -l)"
echo "Assets: $(find dist/assets/ -type f 2>/dev/null | wc -l || echo '0')"
echo ""

# Check for critical files
echo "🔍 Verifying critical files..."
critical_files=("dist/index.html" "dist/manifest.json" "dist/sw.js")
for file in "${critical_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "⚠️  Warning: $file not found"
    fi
done
echo ""

# Preview build locally
echo "🔍 Starting local preview server..."
echo "Open http://localhost:4173 to test the production build"
echo "Press Ctrl+C to stop the preview server"
echo ""

# Test the production build
npm run preview &
PREVIEW_PID=$!

# Wait a moment for server to start
sleep 3

# Check if preview server is running
if kill -0 $PREVIEW_PID 2>/dev/null; then
    echo "✅ Preview server started successfully (PID: $PREVIEW_PID)"
    echo ""
    echo "🎉 MaycoleTracker™ Volume XI is ready for deployment!"
    echo ""
    echo "📋 Deployment Options:"
    echo "1. Manual deployment: Upload dist/ folder to your hosting provider"
    echo "2. Vercel deployment: Run 'vercel' command in the project root"
    echo "3. Netlify deployment: Drag and drop dist/ folder to Netlify"
    echo ""
    echo "🔗 Important URLs to configure:"
    echo "- SPA fallback: /* -> /index.html"
    echo "- Service Worker: /sw.js with proper headers"
    echo "- Manifest: /manifest.json for PWA installation"
    echo ""
    echo "Press Enter to stop preview server and exit..."
    read
    kill $PREVIEW_PID
else
    echo "❌ Preview server failed to start"
    exit 1
fi

echo "✅ Deployment preparation complete!"
echo "🚀 MaycoleTracker™ Volume XI is ready to launch!"