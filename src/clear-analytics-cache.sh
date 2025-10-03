#!/bin/bash

echo "🧹 Clearing Analytics Cache and Restarting MaycoleTracker™..."

# Clear Vite cache
echo "Clearing Vite cache..."
rm -rf node_modules/.vite
rm -rf dist
rm -rf .cache

# Clear browser cache instructions
echo "✅ Development cache cleared"
echo ""
echo "📱 Next Steps:"
echo "1. Stop your development server (Ctrl+C)"
echo "2. Restart with: npm run dev"
echo "3. Hard refresh browser:"
echo "   - Chrome/Firefox: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)"
echo "   - Or open Developer Tools > Network tab > check 'Disable cache'"
echo ""
echo "🎯 Expected Result:"
echo "   ✅ Analytics tab shows premium guard correctly"
echo "   ✅ No duplicate components"
echo "   ✅ Clean conditional rendering"
echo ""
echo "🔧 If issue persists, check you're using App.tsx (not AppWithRouter.tsx)"