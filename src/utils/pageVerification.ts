/**
 * MaycoleTracker™ vol. XI - Universal Page Verification System
 * Comprehensive page validation for the world's first universal business management platform
 */

export interface PageRoute {
  path: string;
  name: string;
  category: 'primary' | 'secondary' | 'supporting' | 'system';
  requiresAuth?: boolean;
  industrySpecific?: string[];
  description: string;
}

// COMPREHENSIVE BUSINESS PLATFORM ROUTES
export const validBusinessRoutes: PageRoute[] = [
  // CORE PLATFORM ENTRY
  {
    path: '',
    name: 'Logo Page',
    category: 'primary',
    description: 'MaycoleTracker™ Brand Entry Point'
  },
  {
    path: 'main',
    name: 'Main Business Hub',
    category: 'primary',
    description: 'Central Business Management Dashboard'
  },
  {
    path: 'about',
    name: 'About Page',
    category: 'supporting',
    description: 'Complete platform information and details'
  },

  // PRIMARY BUSINESS MANAGEMENT MODULES
  {
    path: 'dashboard',
    name: 'Business Dashboard',
    category: 'primary',
    description: 'Executive Overview & KPI Metrics',
    industrySpecific: ['healthcare', 'restaurants', 'construction', 'retail', 'manufacturing', 'hospitality', 'education', 'automotive', 'real_estate']
  },
  {
    path: 'finance',
    name: 'Financial Management',
    category: 'primary',
    description: 'Accounting, Budgeting, Cash Flow & Revenue Management',
    industrySpecific: ['healthcare', 'restaurants', 'construction', 'retail', 'manufacturing', 'hospitality', 'education', 'automotive', 'real_estate']
  },
  {
    path: 'customers',
    name: 'Customer Management',
    category: 'primary',
    description: 'CRM, Lead Management, Sales Pipeline & Customer Relations',
    industrySpecific: ['healthcare', 'restaurants', 'retail', 'hospitality', 'education', 'automotive', 'real_estate']
  },
  {
    path: 'projects',
    name: 'Project Management',
    category: 'primary',
    description: 'Task Management, Resource Allocation & Team Collaboration',
    industrySpecific: ['construction', 'manufacturing', 'education', 'automotive']
  },

  // SECONDARY SUPPORTING MODULES
  {
    path: 'inventory',
    name: 'Supply Chain & Inventory',
    category: 'secondary',
    description: 'Inventory Management & Supply Chain Operations (Secondary Support)',
    industrySpecific: ['restaurants', 'retail', 'manufacturing', 'hospitality', 'automotive']
  },
  {
    path: 'analytics',
    name: 'Business Analytics',
    category: 'secondary',
    description: 'Advanced Analytics & Business Intelligence',
    industrySpecific: ['healthcare', 'restaurants', 'construction', 'retail', 'manufacturing', 'hospitality', 'education', 'automotive', 'real_estate']
  },
  {
    path: 'scanner',
    name: 'Business Scanner',
    category: 'secondary',
    description: 'Document Scanning, QR Codes & Data Capture',
    industrySpecific: ['healthcare', 'retail', 'manufacturing', 'education']
  },

  // ADVANCED SYSTEM MODULES
  {
    path: 'camera',
    name: 'Camera System',
    category: 'supporting',
    description: 'Image Capture & Visual Documentation'
  },
  {
    path: 'premium',
    name: 'Premium Dashboard',
    category: 'supporting',
    description: 'Advanced Premium Features & Enterprise Tools',
    requiresAuth: true
  },
  {
    path: 'recovery',
    name: 'System Recovery',
    category: 'system',
    description: 'System Health Monitoring & Recovery Tools'
  },
  {
    path: 'recovery-dashboard',
    name: 'Recovery Dashboard',
    category: 'system',
    description: 'Comprehensive System Recovery Management'
  },

  // FUTURE BUSINESS MODULES (redirect to main for now)
  {
    path: 'hr',
    name: 'Human Resources',
    category: 'primary',
    description: 'Staff Management, Payroll & Performance Tracking'
  },
  {
    path: 'sales',
    name: 'Sales & Marketing',
    category: 'primary',
    description: 'Lead Generation, Campaigns & Conversion Management'
  },
  {
    path: 'compliance',
    name: 'Compliance Center',
    category: 'secondary',
    description: 'Regulations, Audits & Legal Documentation'
  }
];

// FALLBACK SYSTEM CONFIGURATION
export const fallbackConfig = {
  primary: '/dashboard',      // Primary business operations
  secondary: '/main',         // Business hub
  system: '/recovery',        // System recovery
  unknown: '/dashboard'       // Default for unknown routes
};

// PAGE VERIFICATION FUNCTIONS
export const verifyCurrentPage = (): { 
  isValid: boolean; 
  route?: PageRoute; 
  suggestion?: string;
  category?: string;
} => {
  const currentPath = window.location.pathname.replace('/', '');
  
  // Find matching route
  const matchedRoute = validBusinessRoutes.find(route => route.path === currentPath);
  
  if (matchedRoute) {
    console.log(`✅ Page "${matchedRoute.name}" verified and operational`);
    console.log(`📂 Category: ${matchedRoute.category.toUpperCase()}`);
    console.log(`📋 Description: ${matchedRoute.description}`);
    
    if (matchedRoute.industrySpecific) {
      console.log(`🏭 Industries: ${matchedRoute.industrySpecific.join(', ')}`);
    }
    
    return {
      isValid: true,
      route: matchedRoute,
      category: matchedRoute.category
    };
  }
  
  // Page not found - determine best fallback
  const suggestion = determineBestFallback(currentPath);
  
  console.warn(`❌ Page "${currentPath}" not found in business platform`);
  console.log(`🏢 MaycoleTracker™ Universal Business Management Platform`);
  console.log(`📍 Redirecting to: ${suggestion}`);
  console.log(`🔄 Maintaining business continuity...`);
  
  return {
    isValid: false,
    suggestion,
    category: 'unknown'
  };
};

export const determineBestFallback = (invalidPath: string): string => {
  // Smart fallback logic based on path patterns
  if (invalidPath.includes('dashboard') || invalidPath.includes('business')) {
    return fallbackConfig.primary;
  }
  
  if (invalidPath.includes('inventory') || invalidPath.includes('supply')) {
    return '/inventory';
  }
  
  if (invalidPath.includes('finance') || invalidPath.includes('money') || invalidPath.includes('revenue')) {
    return '/finance';
  }
  
  if (invalidPath.includes('customer') || invalidPath.includes('client') || invalidPath.includes('crm')) {
    return '/customers';
  }
  
  if (invalidPath.includes('project') || invalidPath.includes('task') || invalidPath.includes('workflow')) {
    return '/projects';
  }
  
  if (invalidPath.includes('analytics') || invalidPath.includes('report') || invalidPath.includes('data')) {
    return '/analytics';
  }
  
  if (invalidPath.includes('scan') || invalidPath.includes('qr') || invalidPath.includes('camera')) {
    return '/scanner';
  }
  
  if (invalidPath.includes('recovery') || invalidPath.includes('system') || invalidPath.includes('health')) {
    return fallbackConfig.system;
  }
  
  if (invalidPath.includes('premium') || invalidPath.includes('pro') || invalidPath.includes('enterprise')) {
    return '/premium';
  }
  
  // Default to primary business dashboard
  return fallbackConfig.primary;
};

export const performPageRedirection = (targetPath: string): void => {
  console.log(`🔄 Redirecting to: ${targetPath}`);
  console.log(`🏢 Maintaining MaycoleTracker™ business operations continuity`);
  
  // Use React Router navigation if available, otherwise use window.location
  if (window.history && window.history.pushState) {
    window.history.pushState({}, '', targetPath);
    window.dispatchEvent(new PopStateEvent('popstate'));
  } else {
    window.location.href = targetPath;
  }
};

export const validateBusinessPlatformAccess = (): void => {
  console.log('🌍 MaycoleTracker™ vol. XI - Page Verification System Active');
  console.log('🚀 World\'s First Universal Business Management Platform');
  console.log('🏢 Primary Focus: Complete Business Operations Management');
  console.log('📦 Secondary Support: Inventory & Supply Chain Integration');
  
  const verification = verifyCurrentPage();
  
  if (!verification.isValid && verification.suggestion) {
    // Allow a brief moment for the user to see the current page if needed
    setTimeout(() => {
      performPageRedirection(verification.suggestion!);
    }, 100);
  }
};

export const getBusinessModulesByCategory = () => {
  const categorized = {
    primary: validBusinessRoutes.filter(route => route.category === 'primary'),
    secondary: validBusinessRoutes.filter(route => route.category === 'secondary'),
    supporting: validBusinessRoutes.filter(route => route.category === 'supporting'),
    system: validBusinessRoutes.filter(route => route.category === 'system')
  };
  
  console.log('📊 MaycoleTracker™ Business Platform Structure:');
  console.log(`🏢 Primary Business Modules: ${categorized.primary.length}`);
  console.log(`📦 Secondary Support Modules: ${categorized.secondary.length}`);
  console.log(`🔧 Supporting Utilities: ${categorized.supporting.length}`);
  console.log(`⚙️ System Modules: ${categorized.system.length}`);
  
  return categorized;
};

export const generateBusinessPlatformReport = () => {
  const verification = verifyCurrentPage();
  const modulesByCategory = getBusinessModulesByCategory();
  
  return {
    timestamp: new Date().toISOString(),
    currentPage: {
      path: window.location.pathname,
      isValid: verification.isValid,
      category: verification.category,
      route: verification.route
    },
    platform: {
      totalModules: validBusinessRoutes.length,
      primaryBusinessModules: modulesByCategory.primary.length,
      secondarySupport: modulesByCategory.secondary.length,
      systemUtilities: modulesByCategory.supporting.length + modulesByCategory.system.length
    },
    businessFocus: {
      primary: 'Universal Business Management (85%)',
      secondary: 'Inventory & Supply Chain Support (15%)',
      industries: 9,
      ready: true
    },
    fallbackSystem: {
      enabled: true,
      smartRouting: true,
      businessContinuity: true,
      no404Pages: true
    }
  };
};

// Initialize the verification system
export const initializePageVerificationSystem = (): void => {
  console.log('🔧 Initializing MaycoleTracker™ Page Verification System...');
  
  // Validate current page
  validateBusinessPlatformAccess();
  
  // Set up navigation monitoring
  if (typeof window !== 'undefined') {
    window.addEventListener('popstate', validateBusinessPlatformAccess);
    
    // Monitor for React Router navigation
    const originalPushState = window.history.pushState;
    window.history.pushState = function(...args) {
      originalPushState.apply(window.history, args);
      setTimeout(validateBusinessPlatformAccess, 50);
    };
    
    const originalReplaceState = window.history.replaceState;
    window.history.replaceState = function(...args) {
      originalReplaceState.apply(window.history, args);
      setTimeout(validateBusinessPlatformAccess, 50);
    };
  }
  
  console.log('✅ Page Verification System: ACTIVE');
  console.log('🏢 Business Platform Monitoring: ENABLED');
  console.log('🚫 404 Prevention: OPERATIONAL');
};

export default {
  validBusinessRoutes,
  fallbackConfig,
  verifyCurrentPage,
  determineBestFallback,
  performPageRedirection,
  validateBusinessPlatformAccess,
  getBusinessModulesByCategory,
  generateBusinessPlatformReport,
  initializePageVerificationSystem
};