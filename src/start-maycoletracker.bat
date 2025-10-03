@echo off
echo 🎯 MaycoleTracker™ Startup Script
echo =================================
echo.

REM Check Node.js
echo 🔍 Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found! Please install from https://nodejs.org
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%

REM Check npm
echo.
echo 🔍 Checking npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm not found!
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm version: %NPM_VERSION%

REM Run diagnostic script
echo.
echo 🔍 Running diagnostics...
if exist "jsx-syntax-check.js" (
    echo Checking JSX syntax...
    node jsx-syntax-check.js
)

if exist "fix-blank-screen.js" (
    echo Running full diagnostic...
    node fix-blank-screen.js
) else (
    echo ⚠️  Diagnostic script not found, continuing...
)

REM Clean and install dependencies
echo.
echo 🧹 Cleaning previous builds...
rmdir /s /q node_modules\.vite 2>nul
rmdir /s /q dist 2>nul
echo ✅ Cache cleared

echo.
echo 📦 Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    echo    Try: rmdir /s /q node_modules ^&^& del package-lock.json ^&^& npm install
    pause
    exit /b 1
)
echo ✅ Dependencies installed successfully

REM Start development server
echo.
echo 🚀 Starting MaycoleTracker™ development server...
echo.
echo 📱 Test URLs:
echo    • Emergency Test: http://localhost:5173?emergency=true
echo    • Diagnostic Test: http://localhost:5173?diagnostic=true
echo    • Simple Test: http://localhost:5173?test=true
echo    • Full App: http://localhost:5173
echo.
echo 🎯 Your MaycoleTracker™ inventory management system is starting...
echo    Press Ctrl+C to stop the server
echo.

REM Start the server
npm run dev