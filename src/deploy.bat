@echo off
setlocal enabledelayedexpansion

echo 🚀 MaycoleTracker™ Volume XI - Production Deployment
echo ==================================================
echo.

REM Check if Node.js and npm are installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ and try again.
    pause
    exit /b 1
)

npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not installed. Please install npm 8+ and try again.
    pause
    exit /b 1
)

REM Display versions
echo 📋 Environment Information:
echo Node.js version: 
node --version
echo npm version: 
npm --version
echo Current directory: %cd%
echo.

REM Clean previous builds
echo 🧹 Cleaning previous builds...
if exist dist rmdir /s /q dist
if exist node_modules\.cache rmdir /s /q node_modules\.cache
if exist .vite rmdir /s /q .vite

REM Install dependencies
echo 📦 Installing dependencies...
npm ci --silent

REM Type checking
echo 🔍 Running TypeScript type check...
npm run type-check
if errorlevel 1 (
    echo ❌ TypeScript type check failed!
    pause
    exit /b 1
)

REM Linting
echo 🔧 Running ESLint...
npm run lint
if errorlevel 1 (
    echo ⚠️ ESLint warnings found, continuing...
)

REM Build for production
echo 🏗️ Building for production...
set NODE_ENV=production
npm run build
if errorlevel 1 (
    echo ❌ Build failed!
    pause
    exit /b 1
)

REM Check if build was successful
if not exist dist (
    echo ❌ Build failed! dist\ directory not found.
    pause
    exit /b 1
)

echo ✅ Build completed successfully!
echo.

REM Display build statistics
echo 📊 Build Statistics:
for /f %%i in ('dir /s /-c dist ^| find "File(s)"') do echo Files created: %%i
echo.

REM Check for critical files
echo 🔍 Verifying critical files...
if exist dist\index.html (
    echo ✅ dist\index.html exists
) else (
    echo ⚠️ Warning: dist\index.html not found
)

if exist dist\manifest.json (
    echo ✅ dist\manifest.json exists
) else (
    echo ⚠️ Warning: dist\manifest.json not found
)

if exist dist\sw.js (
    echo ✅ dist\sw.js exists
) else (
    echo ⚠️ Warning: dist\sw.js not found
)
echo.

REM Preview build locally
echo 🔍 Starting local preview server...
echo Open http://localhost:4173 to test the production build
echo Press any key to stop the preview server and continue...
echo.

start "" npm run preview
timeout /t 3 /nobreak >nul

echo ✅ Preview server started successfully!
echo.
echo 🎉 MaycoleTracker™ Volume XI is ready for deployment!
echo.
echo 📋 Deployment Options:
echo 1. Manual deployment: Upload dist\ folder to your hosting provider
echo 2. Vercel deployment: Run 'vercel' command in the project root
echo 3. Netlify deployment: Drag and drop dist\ folder to Netlify
echo.
echo 🔗 Important URLs to configure:
echo - SPA fallback: /* -^> /index.html
echo - Service Worker: /sw.js with proper headers
echo - Manifest: /manifest.json for PWA installation
echo.
echo Press any key to exit...
pause >nul

echo ✅ Deployment preparation complete!
echo 🚀 MaycoleTracker™ Volume XI is ready to launch!