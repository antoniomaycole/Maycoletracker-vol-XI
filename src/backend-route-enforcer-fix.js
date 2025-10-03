// backend/enforcers/routeEnforcer.ts - UPDATED FOR MINIMAL LOGO PAGE
// All invalid routes redirect to your clean MaycoleTracker™ logo page

app.use((req, res, next) => {
  const validRoutes = [
    // LOGO PAGE - Your clean, minimal MaycoleTracker™ page
    '/', '/logo', '/landing',
    
    // Main Navigation Pages  
    '/home', '/settings', '/about', '/brand', '/store',
    
    // Business Management Pages
    '/dashboard', '/finance', '/customers', '/projects',
    
    // Supporting Systems
    '/inventory', '/analytics', '/scanner',
    
    // Advanced Features
    '/camera', '/premium', '/recovery',
    
    // Your original backend routes
    '/reports', '/training', '/calculator', '/ads'
  ];
  
  if (!validRoutes.includes(req.path)) {
    console.warn(`[MaycoleTracker™ Route Enforcer] Invalid route: ${req.path} -> Redirecting to clean logo page`);
    return res.redirect('/'); // ✅ Redirect to minimal logo page with circle logo & "M" icon button
  }
  next();
});