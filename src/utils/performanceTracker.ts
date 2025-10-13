/**
 * MaycoleTracker™ Performance Monitoring Utility
 * Enterprise-grade performance tracking for production optimization
 */

import React from 'react';

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  category: 'navigation' | 'component' | 'api' | 'user_action';
}

class PerformanceTracker {
  private metrics: PerformanceMetric[] = [];
  private startTimes: Map<string, number> = new Map();

  // Start timing a metric
  startTiming(name: string, category: PerformanceMetric['category'] = 'component') {
    this.startTimes.set(name, performance.now());
  }

  // End timing and record metric
  endTiming(name: string, category: PerformanceMetric['category'] = 'component') {
    const startTime = this.startTimes.get(name);
    if (startTime) {
      const value = performance.now() - startTime;
      this.recordMetric(name, value, category);
      this.startTimes.delete(name);
      return value;
    }
    return null;
  }

  // Record a performance metric
  recordMetric(name: string, value: number, category: PerformanceMetric['category']) {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now(),
      category
    };
    
    this.metrics.push(metric);
    
    // Log performance warnings for slow operations
    if (value > 1000) {
      console.warn(`🐌 Slow operation detected: ${name} took ${value.toFixed(2)}ms`);
    } else if (value > 500) {
      console.log(`⚠️ Moderate delay: ${name} took ${value.toFixed(2)}ms`);
    }

    // Keep only last 100 metrics to prevent memory bloat
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-50);
    }
  }

  // Get performance summary
  getSummary() {
    const byCategory = this.metrics.reduce((acc, metric) => {
      if (!acc[metric.category]) {
        acc[metric.category] = [];
      }
      acc[metric.category].push(metric.value);
      return acc;
    }, {} as Record<PerformanceMetric['category'], number[]>);

    const summary = Object.entries(byCategory).map(([category, values]) => ({
      category,
      count: values.length,
      average: values.reduce((a, b) => a + b, 0) / values.length,
      max: Math.max(...values),
      min: Math.min(...values)
    }));

    return summary;
  }

  // Track Core Web Vitals
  trackWebVitals() {
    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.recordMetric('LCP', entry.startTime, 'navigation');
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay - processingStart exists on specific entry types; guard access
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as any[]) {
        const processingStart = (entry && (entry as any).processingStart) || entry.startTime;
        this.recordMetric('FID', processingStart - entry.startTime, 'user_action');
      }
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    let clsValue = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      this.recordMetric('CLS', clsValue, 'navigation');
    }).observe({ entryTypes: ['layout-shift'] });
  }

  // Track route changes
  trackRouteChange(from: string, to: string) {
    this.startTiming(`route-${to}`, 'navigation');
    console.log(`🧭 Navigation: ${from} → ${to}`);
  }

  // Track component mount times
  trackComponentMount(componentName: string) {
    return {
      start: () => this.startTiming(`mount-${componentName}`, 'component'),
      end: () => {
        const time = this.endTiming(`mount-${componentName}`, 'component');
        if (time && time > 100) {
          console.log(`📊 ${componentName} mounted in ${time.toFixed(2)}ms`);
        }
        return time;
      }
    };
  }

  // Export performance data for analysis
  exportData() {
    return {
      metrics: this.metrics,
      summary: this.getSummary(),
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      connection: (navigator as any).connection ? {
        effectiveType: (navigator as any).connection.effectiveType,
        downlink: (navigator as any).connection.downlink,
        rtt: (navigator as any).connection.rtt
      } : null
    };
  }
}

// Create global instance
export const performanceTracker = new PerformanceTracker();

// Enhanced React hook for component performance tracking
export function usePerformanceTracking(componentName: string) {
  // keep explicit React import usage to avoid UMD/module warnings in some tsconfig setups
  React.useEffect(() => {
    const tracker = performanceTracker.trackComponentMount(componentName);
    tracker.start();
    
    return () => {
      tracker.end();
    };
  }, [componentName]);

  return {
    startTiming: (operation: string) => performanceTracker.startTiming(`${componentName}-${operation}`, 'component'),
    endTiming: (operation: string) => performanceTracker.endTiming(`${componentName}-${operation}`, 'component'),
    recordMetric: (name: string, value: number) => performanceTracker.recordMetric(`${componentName}-${name}`, value, 'component')
  };
}

// Initialize performance tracking if in browser environment
if (typeof window !== 'undefined') {
  performanceTracker.trackWebVitals();
  
  // Track page visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      performanceTracker.recordMetric('page-visible', performance.now(), 'user_action');
    } else {
      performanceTracker.recordMetric('page-hidden', performance.now(), 'user_action');
    }
  });

  // Track errors that might impact performance
  window.addEventListener('error', (event) => {
    performanceTracker.recordMetric('js-error', performance.now(), 'api');
    console.error('JS Error tracked:', event.error);
  });

  // Export to global for debugging
  (window as any).maycolePerformance = performanceTracker;
}

export default performanceTracker;