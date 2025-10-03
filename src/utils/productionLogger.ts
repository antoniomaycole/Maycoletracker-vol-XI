/**
 * MaycoleTracker™ Production Logger
 * Simple, clean logging for production environment
 * Replaces complex recovery/diagnostic systems
 */

interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  component?: string;
  userId?: string;
}

class ProductionLogger {
  private logs: LogEntry[] = [];
  private readonly maxLogs = 100; // Keep only last 100 logs

  /**
   * Log an informational message
   */
  info(message: string, component?: string): void {
    this.addLog('info', message, component);
  }

  /**
   * Log a warning message
   */
  warn(message: string, component?: string): void {
    this.addLog('warn', message, component);
    console.warn(`⚠️ MaycoleTracker™: ${message}`);
  }

  /**
   * Log an error message
   */
  error(message: string, component?: string): void {
    this.addLog('error', message, component);
    console.error(`❌ MaycoleTracker™: ${message}`);
  }

  /**
   * Get simple system status for support (NO RECOVERY FUNCTIONS)
   */
  getSystemStatus(): { 
    isHealthy: boolean; 
    lastError?: string; 
    timestamp: string;
  } {
    const recentErrors = this.logs.filter(
      log => log.level === 'error' && 
      new Date(log.timestamp).getTime() > Date.now() - 300000 // Last 5 minutes
    );

    return {
      isHealthy: recentErrors.length === 0,
      lastError: recentErrors.length > 0 ? recentErrors[recentErrors.length - 1].message : undefined,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Clear old logs (for memory management)
   */
  clearOldLogs(): void {
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
  }

  private addLog(level: LogEntry['level'], message: string, component?: string): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      component
    };

    this.logs.push(entry);
    this.clearOldLogs();

    // Simple console output for development
    if (process.env.NODE_ENV === 'development') {
      const prefix = level === 'error' ? '❌' : level === 'warn' ? '⚠️' : 'ℹ️';
      console.log(`${prefix} [${component || 'App'}] ${message}`);
    }
  }
}

// Export singleton instance
export const logger = new ProductionLogger();

// Export simple utility functions
export const logInfo = (message: string, component?: string) => logger.info(message, component);
export const logWarn = (message: string, component?: string) => logger.warn(message, component);
export const logError = (message: string, component?: string) => logger.error(message, component);
export const getSystemHealth = () => logger.getSystemStatus();

// NO RECOVERY FUNCTIONS - PRODUCTION CLEAN
export default logger;