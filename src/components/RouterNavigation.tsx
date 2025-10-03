/**
 * MaycoleTracker™ Router Navigation Components
 * Enhanced navigation components for React Router integration
 */

import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useUser } from '../contexts/UserContext';
import { 
  Home, 
  BarChart3, 
  QrCode, 
  Camera, 
  Crown, 
  ArrowLeft,
  Menu,
  X
} from 'lucide-react';

// Quick Navigation Component
export const QuickNav = ({ className = "" }: { className?: string }) => {
  const location = useLocation();
  const { hasFeature } = useUser();

  const navItems = [
    { path: '/', icon: Home, label: 'Home', premium: false },
    { path: '/analytics', icon: BarChart3, label: 'Analytics', premium: true, feature: 'analytics' },
    { path: '/scanner', icon: QrCode, label: 'Scanner', premium: true, feature: 'barcode_scanning' },
    { path: '/camera', icon: Camera, label: 'Camera', premium: false },
    { path: '/premium', icon: Crown, label: 'Premium', premium: false },
  ];

  return (
    <nav className={`flex gap-2 ${className}`}>
      {navItems.map(({ path, icon: Icon, label, premium, feature }) => {
        const isActive = location.pathname === path;
        const hasAccess = !premium || !feature || hasFeature(feature as any);
        
        return (
          <Link
            key={path}
            to={path}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg transition-all
              ${isActive 
                ? 'bg-primary text-primary-foreground shadow-md' 
                : 'bg-secondary/50 hover:bg-secondary text-secondary-foreground hover:shadow-sm'
              }
              ${!hasAccess ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            onClick={(e) => {
              if (!hasAccess) {
                e.preventDefault();
              }
            }}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden md:inline">{label}</span>
            {premium && !hasAccess && <Crown className="w-3 h-3" />}
          </Link>
        );
      })}
    </nav>
  );
};

// Floating Action Navigation
export const FloatingNav = () => {
  const location = useLocation();
  const { hasFeature } = useUser();
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { path: '/', icon: Home, label: 'Home', color: 'bg-blue-500' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics', color: 'bg-green-500', feature: 'analytics' },
    { path: '/scanner', icon: QrCode, label: 'Scanner', color: 'bg-purple-500', feature: 'barcode_scanning' },
    { path: '/camera', icon: Camera, label: 'Camera', color: 'bg-orange-500' },
    { path: '/premium', icon: Crown, label: 'Premium', color: 'bg-gradient-to-r from-orange-500 to-pink-500' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="relative"
      >
        {/* Navigation Items */}
        <motion.div
          variants={{
            open: {
              clipPath: "inset(0% 0% 0% 0%)",
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
              }
            },
            closed: {
              clipPath: "inset(50% 50% 50% 50%)",
              transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
              }
            }
          }}
          className="flex flex-col-reverse gap-3 mb-3"
        >
          {navItems.map(({ path, icon: Icon, label, color, feature }) => {
            const isActive = location.pathname === path;
            const hasAccess = !feature || hasFeature(feature as any);
            
            return (
              <motion.div
                key={path}
                variants={{
                  open: { opacity: 1, y: 0, scale: 1 },
                  closed: { opacity: 0, y: 20, scale: 0.3 }
                }}
                className="relative"
              >
                <Link
                  to={path}
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center shadow-lg
                    transition-all duration-200 hover:scale-110
                    ${color}
                    ${isActive ? 'ring-4 ring-white/30' : ''}
                    ${!hasAccess ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                  onClick={(e) => {
                    if (!hasAccess) {
                      e.preventDefault();
                    } else {
                      setIsOpen(false);
                    }
                  }}
                >
                  <Icon className="w-5 h-5 text-white" />
                  {feature && !hasAccess && (
                    <Crown className="w-3 h-3 text-white absolute -top-1 -right-1 bg-orange-500 rounded-full p-0.5" />
                  )}
                </Link>
                
                {/* Label */}
                <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity hover:opacity-100">
                  {label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center"
        >
          <motion.div
            variants={{
              open: { rotate: 45 },
              closed: { rotate: 0 }
            }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  );
};

// Breadcrumb Navigation for Router
export const RouterBreadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const getBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter(x => x);
    
    const breadcrumbs = [
      { path: '/', label: 'Home' }
    ];
    
    let currentPath = '';
    pathnames.forEach(pathname => {
      currentPath += `/${pathname}`;
      
      const label = pathname.charAt(0).toUpperCase() + pathname.slice(1);
      breadcrumbs.push({
        path: currentPath,
        label: label.replace('-', ' ')
      });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.path}>
          {index > 0 && <span>/</span>}
          {index === breadcrumbs.length - 1 ? (
            <span className="text-foreground font-medium">{breadcrumb.label}</span>
          ) : (
            <button
              onClick={() => navigate(breadcrumb.path)}
              className="hover:text-foreground transition-colors"
            >
              {breadcrumb.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

// Mobile Bottom Navigation
export const MobileBottomNav = () => {
  const location = useLocation();
  const { hasFeature } = useUser();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics', feature: 'analytics' },
    { path: '/scanner', icon: QrCode, label: 'Scanner', feature: 'barcode_scanning' },
    { path: '/camera', icon: Camera, label: 'Camera' },
    { path: '/premium', icon: Crown, label: 'Premium' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-40">
      <div className="flex">
        {navItems.map(({ path, icon: Icon, label, feature }) => {
          const isActive = location.pathname === path;
          const hasAccess = !feature || hasFeature(feature as any);
          
          return (
            <Link
              key={path}
              to={path}
              className={`
                flex-1 flex flex-col items-center gap-1 py-3 px-2 transition-colors
                ${isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground'
                }
                ${!hasAccess ? 'opacity-50' : ''}
              `}
              onClick={(e) => {
                if (!hasAccess) {
                  e.preventDefault();
                }
              }}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {feature && !hasAccess && (
                  <Crown className="w-3 h-3 absolute -top-1 -right-1 text-orange-500" />
                )}
              </div>
              <span className="text-xs">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

// Page Transition Wrapper
export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};