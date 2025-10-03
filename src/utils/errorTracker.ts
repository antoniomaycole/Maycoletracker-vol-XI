/**
 * MaycoleTracker™ Error Tracking & Analytics System
 * Enterprise-grade error monitoring for production stability
 */

interface ErrorReport {
  id: string;
  message: string;
  stack?: string;
  component?: string;
  route?: string;
  userAgent: string;
  timestamp: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'component' | 'network' | 'permission' | 'business_logic';
  context?: Record<string, any>;
}

class ErrorTracker {
  private errors: ErrorReport[] = [];
  private readonly maxErrors = 50;

  // Report an error with context
  reportError(
    error: Error | string,
    context: {
      component?: string;
      route?: string;
      severity?: ErrorReport['severity'];
      category?: ErrorReport['category'];
      additionalContext?: Record<string, any>;
    } = {}
  ) {
    const errorReport: ErrorReport = {
      id: this.generateErrorId(),
      message: typeof error === 'string' ? error : error.message,
      stack: typeof error === 'object' ? error.stack : undefined,
      component: context.component || 'unknown',
      route: window.location.pathname,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
      severity: context.severity || 'medium',
      category: context.category || 'component',
      context: {
        url: window.location.href,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        ...context.additionalContext
      }
    };

    this.errors.push(errorReport);

    // Log based on severity
    this.logError(errorReport);

    // Maintain error limit
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors / 2);
    }

    // Auto-report critical errors to console for immediate attention
    if (errorReport.severity === 'critical') {
      this.alertCriticalError(errorReport);
    }

    return errorReport.id;
  }

  // Generate unique error ID
  private generateErrorId(): string {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Log error with appropriate styling
  private logError(error: ErrorReport) {
    const styles = {
      critical: 'background: #dc2626; color: white; padding: 2px 6px; border-radius: 3px;',
      high: 'background: #ea580c; color: white; padding: 2px 6px; border-radius: 3px;',
      medium: 'background: #d97706; color: white; padding: 2px 6px; border-radius: 3px;',
      low: 'background: #65a30d; color: white; padding: 2px 6px; border-radius: 3px;'
    };

    console.group(`%c🚨 ERROR [${error.severity.toUpperCase()}]`, styles[error.severity]);
    console.log('Message:', error.message);
    console.log('Component:', error.component);
    console.log('Route:', error.route);
    console.log('Timestamp:', new Date(error.timestamp).toISOString());
    if (error.stack) {
      console.log('Stack:', error.stack);
    }
    if (error.context) {
      console.log('Context:', error.context);
    }
    console.groupEnd();
  }

  // Alert for critical errors
  private alertCriticalError(error: ErrorReport) {
    // In a real production environment, this would send to monitoring service
    console.error('🔥 CRITICAL ERROR DETECTED - IMMEDIATE ATTENTION REQUIRED:', error);
    
    // Could integrate with services like Sentry, DataDog, etc.
    // this.sendToMonitoringService(error);
  }

  // Get error statistics
  getStatistics() {
    const now = Date.now();
    const last24h = this.errors.filter(e => now - e.timestamp < 24 * 60 * 60 * 1000);
    
    const bySeverity = this.errors.reduce((acc, error) => {
      acc[error.severity] = (acc[error.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byCategory = this.errors.reduce((acc, error) => {
      acc[error.category] = (acc[error.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byComponent = this.errors.reduce((acc, error) => {
      acc[error.component || 'unknown'] = (acc[error.component || 'unknown'] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: this.errors.length,
      last24h: last24h.length,
      bySeverity,
      byCategory,
      byComponent,
      recentErrors: this.errors.slice(-5)
    };
  }

  // Export error data for analysis
  exportErrorReport() {
    return {
      errors: this.errors,
      statistics: this.getStatistics(),
      exportTime: new Date().toISOString(),
      userAgent: navigator.userAgent,
      environment: {
        url: window.location.href,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        connection: (navigator as any).connection ? {
          effectiveType: (navigator as any).connection.effectiveType,
          downlink: (navigator as any).connection.downlink
        } : null
      }
    };
  }

  // Clear all errors (for testing or reset)
  clearErrors() {
    this.errors = [];
    console.log('✅ Error tracker cleared');
  }

  // Get errors by severity
  getErrorsBySeverity(severity: ErrorReport['severity']) {
    return this.errors.filter(error => error.severity === severity);
  }

  // Check if there are any critical errors
  hasCriticalErrors() {
    return this.errors.some(error => error.severity === 'critical');
  }
}

// Create global instance
export const errorTracker = new ErrorTracker();

// React hook for error reporting in components
export function useErrorReporting(componentName: string) {
  return {
    reportError: (
      error: Error | string,
      context?: {
        severity?: ErrorReport['severity'];
        category?: ErrorReport['category'];
        additionalContext?: Record<string, any>;
      }
    ) => {
      return errorTracker.reportError(error, {
        component: componentName,
        ...context
      });
    },
    
    // Wrapper for async operations with error handling
    withErrorHandling: async <T>(
      operation: () => Promise<T>,
      operationName: string
    ): Promise<T | null> => {
      try {
        return await operation();
      } catch (error) {
        errorTracker.reportError(error as Error, {
          component: componentName,
          category: 'business_logic',
          additionalContext: { operationName }
        });
        return null;
      }
    }
  };
}

// Global error handlers setup
if (typeof window !== 'undefined') {
  // Handle unhandled JavaScript errors
  window.addEventListener('error', (event) => {
    errorTracker.reportError(event.error || event.message, {
      category: 'component',
      severity: 'high',
      additionalContext: {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      }
    });
  });

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    errorTracker.reportError(event.reason || 'Unhandled promise rejection', {
      category: 'business_logic',
      severity: 'high',
      additionalContext: {
        promise: event.promise
      }
    });
  });

  // Handle network errors
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    try {
      const response = await originalFetch(...args);
      if (!response.ok) {
        errorTracker.reportError(`Network error: ${response.status} ${response.statusText}`, {
          category: 'network',
          severity: response.status >= 500 ? 'high' : 'medium',
          additionalContext: {
            url: args[0],
            status: response.status,
            statusText: response.statusText
          }
        });
      }
      return response;
    } catch (error) {
      errorTracker.reportError(error as Error, {
        category: 'network',
        severity: 'high',
        additionalContext: {
          url: args[0]
        }
      });
      throw error;
    }
  };

  // Export to global for debugging
  (window as any).maycoleErrorTracker = errorTracker;
  
  // Periodic health check log
  setInterval(() => {
    const stats = errorTracker.getStatistics();
    if (stats.last24h > 0) {
      console.log(`📊 MaycoleTracker™ Health: ${stats.last24h} errors in last 24h`, stats.bySeverity);
    }
  }, 30 * 60 * 1000); // Every 30 minutes
}

export default errorTracker;