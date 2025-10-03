#!/bin/bash

echo "🎯 MaycoleTracker™ Startup Script"
echo "================================="
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check Node.js version
echo "🔍 Checking Node.js..."
if command_exists node; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js version: $NODE_VERSION"
    
    # Extract major version number
    MAJOR_VERSION=$(echo $NODE_VERSION | sed 's/v\([0-9]*\).*/\1/')
    if [ "$MAJOR_VERSION" -lt 16 ]; then
        echo "⚠️  Warning: Node.js version should be 16 or higher"
        echo "   Current: $NODE_VERSION"
        echo "   Please update Node.js from https://nodejs.org"
    fi
else
    echo "❌ Node.js not found! Please install from https://nodejs.org"
    exit 1
fi

# Check npm
echo ""
echo "🔍 Checking npm..."
if command_exists npm; then
    NPM_VERSION=$(npm --version)
    echo "✅ npm version: $NPM_VERSION"
else
    echo "❌ npm not found!"
    exit 1
fi

# Run diagnostic script
echo ""
echo "🔍 Running diagnostics..."
if [ -f "jsx-syntax-check.js" ]; then
    echo "Checking JSX syntax..."
    node jsx-syntax-check.js
fi

if [ -f "fix-blank-screen.js" ]; then
    echo "Running full diagnostic..."
    node fix-blank-screen.js
else
    echo "⚠️  Diagnostic script not found, continuing..."
fi

# Clean and install dependencies
echo ""
echo "🧹 Cleaning previous builds..."
rm -rf node_modules/.vite 2>/dev/null
rm -rf dist 2>/dev/null
echo "✅ Cache cleared"

echo ""
echo "📦 Installing dependencies..."
if npm install; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    echo "   Try: rm -rf node_modules package-lock.json && npm install"
    exit 1
fi

# Start development server
echo ""
echo "🚀 Starting MaycoleTracker™ development server..."
echo ""
echo "📱 Test URLs:"
echo "   • Emergency Test: http://localhost:5173?emergency=true"
echo "   • Diagnostic Test: http://localhost:5173?diagnostic=true  "
echo "   • Simple Test: http://localhost:5173?test=true"
echo "   • Full App: http://localhost:5173"
echo ""
echo "🎯 Your MaycoleTracker™ inventory management system is starting..."
echo "   Press Ctrl+C to stop the server"
echo ""

# Start the server
npm run dev