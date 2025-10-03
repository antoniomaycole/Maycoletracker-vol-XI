import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, BarChart3, Scan, Brain, ArrowLeft } from 'lucide-react';

interface NavigationProps {
  showBackButton?: boolean;
  variant?: 'main' | 'compact' | 'floating';
}

export default function Navigation({ showBackButton = false, variant = 'main' }: NavigationProps) {
  const location = useLocation();
  
  const routes = [
    { path: '/main', icon: Home, label: 'Dashboard', description: 'Main Dashboard' },
    { path: '/supplies', icon: Package, label: 'Supplies', description: 'Inventory Management' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics', description: 'Data Analytics' },
    { path: '/scanner', icon: Scan, label: 'Scanner', description: 'Barcode Scanner' },
    { path: '/ai', icon: Brain, label: 'AI Insights', description: 'AI Analysis' }
  ];

  const isActive = (path: string) => location.pathname === path;

  if (variant === 'compact') {
    return (
      <nav className="flex gap-2 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
        {showBackButton && location.pathname !== '/main' && (
          <Link
            to="/main"
            className="btn-on-dark flex items-center gap-2 px-3 py-2"
            title="Back to Dashboard"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back</span>
          </Link>
        )}
        
        {routes.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`btn-on-dark flex items-center gap-2 px-3 py-2 transition-all ${
              isActive(path) ? 'bg-white/30 border-white/50' : ''
            }`}
            title={label}
          >
            <Icon size={16} />
            <span className="hidden md:inline text-xs">{label}</span>
          </Link>
        ))}
      </nav>
    );
  }

  if (variant === 'floating') {
    return (
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <nav className="flex gap-2 p-3 bg-black/20 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl">
          {routes.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                isActive(path) 
                  ? 'bg-white/30 border-2 border-white/50 text-white scale-110' 
                  : 'bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 hover:scale-105'
              }`}
              title={label}
            >
              <Icon size={20} />
            </Link>
          ))}
        </nav>
      </div>
    );
  }

  // Main navigation (default)
  return (
    <nav className="w-full max-w-4xl mx-auto p-6">
      {showBackButton && location.pathname !== '/main' && (
        <div className="mb-4">
          <Link
            to="/main"
            className="btn-on-dark inline-flex items-center gap-2 px-4 py-2"
          >
            <ArrowLeft size={18} />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      )}
      
      <div className="nav-button-grid">
        {routes.map(({ path, icon: Icon, label, description }) => (
          <Link
            key={path}
            to={path}
            className={`btn-on-dark group relative overflow-hidden ${
              isActive(path) ? 'bg-white/25 border-white/40 scale-105' : ''
            }`}
            title={description}
          >
            <div className="flex items-center justify-center gap-2">
              <Icon size={18} className="flex-shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-wide">
                {label}
              </span>
            </div>
            
            {/* Active indicator */}
            {isActive(path) && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg animate-pulse" />
            )}
            
            {/* Hover shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </Link>
        ))}
      </div>
    </nav>
  );
}

// Quick access navigation for header/footer
export function QuickNav() {
  return (
    <div className="flex items-center gap-3">
      <Link to="/scanner" className="btn-on-dark px-3 py-1 text-xs">
        <Scan size={14} className="inline mr-1" />
        Scan
      </Link>
      <Link to="/ai" className="btn-on-dark px-3 py-1 text-xs">
        <Brain size={14} className="inline mr-1" />
        AI
      </Link>
    </div>
  );
}

// Breadcrumb navigation
export function Breadcrumb() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  const breadcrumbMap: Record<string, string> = {
    main: 'Dashboard',
    supplies: 'Supplies',
    analytics: 'Analytics', 
    scanner: 'Scanner',
    ai: 'AI Insights'
  };

  if (pathSegments.length === 0) return null;

  return (
    <nav className="flex items-center gap-2 text-sm opacity-80 mb-4">
      <Link to="/" className="hover:text-white transition-colors">
        MaycoleTracker™
      </Link>
      {pathSegments.map((segment, index) => {
        const path = '/' + pathSegments.slice(0, index + 1).join('/');
        const isLast = index === pathSegments.length - 1;
        const label = breadcrumbMap[segment] || segment;
        
        return (
          <React.Fragment key={path}>
            <span>/</span>
            {isLast ? (
              <span className="font-medium text-white">{label}</span>
            ) : (
              <Link to={path} className="hover:text-white transition-colors">
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}