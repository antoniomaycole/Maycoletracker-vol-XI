/**
 * MaycoleTracker™ Application Setup
 * Handles PWA, performance, and platform optimizations
 */

import { useEffect, useMemo } from 'react';
import { performanceTracker } from '../utils/performanceTracker';

export function useAppInitialization() {
  // Initialize performance tracking
  useEffect(() => {
    performanceTracker.startTiming('app-initialization', 'navigation');
    console.log('🚀 MaycoleTracker™ vol. XI Enterprise Edition - Initializing...');
    
    return () => {
      performanceTracker.endTiming('app-initialization', 'navigation');
      console.log('✅ MaycoleTracker™ Enterprise Edition - Fully Operational');
    };
  }, []);

  // Intelligent route preloading
  useEffect(() => {
    const preloadCriticalRoutes = async () => {
      try {
        const routesToPreload = [
          () => import('./MainPage'),
          () => import('./InventoryPage'),
          () => import('./AnalyticsPage')
        ];

        setTimeout(async () => {
          for (const loadRoute of routesToPreload) {
            try {
              await loadRoute();
            } catch (error) {
              console.warn('Route preload failed:', error);
            }
          }
          console.log('🚀 Critical routes preloaded for faster navigation');
        }, 3000);
      } catch (error) {
        console.warn('Route preloading initialization failed:', error);
      }
    };

    preloadCriticalRoutes();
  }, []);
}

export function usePWASetup() {
  return useMemo(() => {
    try {
      // PWA Standalone Mode Detection
      if (window.matchMedia('(display-mode: standalone)').matches) {
        document.body.classList.add('pwa-standalone');
        console.log('🚀 MaycoleTracker™ running in standalone PWA mode');
      }

      // Service Worker registration
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none'
        }).then(() => {
          console.log('🔧 Service Worker registered successfully');
        }).catch((error) => {
          console.warn('⚠️ Service Worker registration failed:', error);
        });
      }

      // PWA Install Prompt
      const handleInstallPrompt = (e: Event) => {
        e.preventDefault();
        (window as any).deferredPrompt = e;
        console.log('📱 PWA install prompt ready');
      };

      window.addEventListener('beforeinstallprompt', handleInstallPrompt);

      // Viewport optimization
      const viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
      if (viewport) {
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0, user-scalable=yes, viewport-fit=cover';
      }

      // Theme color
      let themeColor = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
      if (!themeColor) {
        themeColor = document.createElement('meta');
        themeColor.name = 'theme-color';
        themeColor.content = '#007BFF';
        document.head.appendChild(themeColor);
      }

      return () => {
        window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
      };
    } catch (error) {
      console.warn('PWA setup error:', error);
      return () => {};
    }
  }, []);
}

export function usePlatformOptimizations() {
  const pwaCleanup = usePWASetup();

  useEffect(() => {
    const startTime = performance.now();
    
    try {
      document.body.style.overscrollBehavior = 'none';
      document.documentElement.style.overscrollBehavior = 'none';
      document.body.style.touchAction = 'manipulation';
      
      // Enhanced platform detection
      const userAgent = navigator.userAgent;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
      const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
      const isAndroid = /Android/i.test(userAgent);
      const isTablet = /iPad/i.test(userAgent) || (isAndroid && !/Mobile/i.test(userAgent));
      
      // Apply platform-specific classes
      document.body.classList.add(isMobile ? 'platform-mobile' : 'platform-desktop');
      
      if (isTablet) {
        document.body.classList.add('platform-tablet');
      }
      
      if (isMobile && window.innerWidth <= 768) {
        document.body.style.webkitUserSelect = 'none';
        document.body.style.userSelect = 'none';
      }
      
      if (isIOS) {
        document.body.classList.add('platform-ios');
        const setIOSViewport = () => {
          document.documentElement.style.height = '100vh';
          document.documentElement.style.height = '-webkit-fill-available';
        };
        setIOSViewport();
        window.addEventListener('resize', setIOSViewport);
        window.addEventListener('orientationchange', setIOSViewport);
      }
      
      if (isAndroid) {
        document.body.classList.add('platform-android');
        const setViewportHeight = () => {
          const vh = window.innerHeight * 0.01;
          document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);
        window.addEventListener('orientationchange', () => {
          setTimeout(setViewportHeight, 100);
        });
      }
      
      // Enhanced DPI detection
      if (window.devicePixelRatio > 1) {
        document.body.classList.add('high-dpi');
        if (window.devicePixelRatio > 2) {
          document.body.classList.add('ultra-high-dpi');
        }
      }

      // Performance monitoring
      const setupTime = performance.now() - startTime;
      if (setupTime > 50) {
        console.warn(`🐌 Platform setup took ${setupTime.toFixed(2)}ms - consider optimization`);
      } else {
        console.log(`⚡ Platform setup completed in ${setupTime.toFixed(2)}ms`);
      }

      return () => {
        if (pwaCleanup) {
          pwaCleanup();
        }
      };
    } catch (error) {
      console.error('❌ Platform setup failed:', error);
      return () => {
        if (pwaCleanup) {
          pwaCleanup();
        }
      };
    }
  }, [pwaCleanup]);
}