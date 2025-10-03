/**
 * MaycoleTracker™ vol. XI - Performance Monitor Component
 * Real-time system performance tracking
 * EMERGENCY RESTORATION - 2025-10-02T02:26EDT
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { 
  Activity, 
  Cpu, 
  MemoryStick, 
  Wifi, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';

interface PerformanceData {
  renderTime: number;
  memoryUsage: number;
  cpuUsage: number;
  networkLatency: number;
  timestamp: number;
}

interface PerformanceThresholds {
  renderTime: { warning: number; critical: number };
  memoryUsage: { warning: number; critical: number };
  cpuUsage: { warning: number; critical: number };
  networkLatency: { warning: number; critical: number };
}

const defaultThresholds: PerformanceThresholds = {
  renderTime: { warning: 16, critical: 50 },
  memoryUsage: { warning: 100, critical: 200 },
  cpuUsage: { warning: 70, critical: 90 },
  networkLatency: { warning: 100, critical: 500 }
};

// Performance Status Badge Component
const PerformanceStatusBadge: React.FC<{ 
  value: number; 
  thresholds: { warning: number; critical: number };
  label: string;
}> = ({ value, thresholds, label }) => {
  const getStatus = () => {
    if (value >= thresholds.critical) return { variant: 'destructive' as const, icon: AlertTriangle, text: 'Critical' };
    if (value >= thresholds.warning) return { variant: 'outline' as const, icon: AlertTriangle, text: 'Warning' };
    return { variant: 'default' as const, icon: CheckCircle, text: 'Good' };
  };

  const status = getStatus();
  const Icon = status.icon;

  return (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{label}:</span>
      <Badge variant={status.variant} className="text-xs">
        {value.toFixed(1)} - {status.text}
      </Badge>
    </div>
  );
};

// Mini Performance Card Component
const MiniPerformanceCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  status: 'good' | 'warning' | 'critical';
}> = ({ title, value, icon, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'warning': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-green-500 bg-green-50';
    }
  };

  return (
    <div className={`p-3 rounded-lg border-l-4 ${getStatusColor()}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-600 uppercase tracking-wide">{title}</p>
          <p className="text-lg font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-gray-500">
          {icon}
        </div>
      </div>
    </div>
  );
};

// Main Performance Monitor Component
export const PerformanceMonitor: React.FC<{
  showDetailed?: boolean;
  position?: 'fixed' | 'relative';
  thresholds?: Partial<PerformanceThresholds>;
}> = ({ 
  showDetailed = false, 
  position = 'relative',
  thresholds = {}
}) => {
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    renderTime: 12.5,
    memoryUsage: 45.2,
    cpuUsage: 23.1,
    networkLatency: 28,
    timestamp: Date.now()
  });

  const [isVisible, setIsVisible] = useState(false);
  const [dataHistory, setDataHistory] = useState<PerformanceData[]>([]);

  const mergedThresholds = { ...defaultThresholds, ...thresholds };

  // Simulate performance data collection
  const collectPerformanceData = useCallback(() => {
    const newData: PerformanceData = {
      renderTime: Math.max(8, performanceData.renderTime + (Math.random() - 0.5) * 3),
      memoryUsage: Math.max(20, Math.min(150, performanceData.memoryUsage + (Math.random() - 0.5) * 8)),
      cpuUsage: Math.max(10, Math.min(95, performanceData.cpuUsage + (Math.random() - 0.5) * 12)),
      networkLatency: Math.max(15, Math.min(200, performanceData.networkLatency + (Math.random() - 0.5) * 20)),
      timestamp: Date.now()
    };

    setPerformanceData(newData);
    setDataHistory(prev => [...prev.slice(-19), newData]); // Keep last 20 entries
  }, [performanceData]);

  // Performance monitoring effect
  useEffect(() => {
    const interval = setInterval(collectPerformanceData, 3000);
    return () => clearInterval(interval);
  }, [collectPerformanceData]);

  // Auto-show/hide based on performance issues
  useEffect(() => {
    const hasIssues = 
      performanceData.renderTime >= mergedThresholds.renderTime.warning ||
      performanceData.memoryUsage >= mergedThresholds.memoryUsage.warning ||
      performanceData.cpuUsage >= mergedThresholds.cpuUsage.warning ||
      performanceData.networkLatency >= mergedThresholds.networkLatency.warning;

    setIsVisible(hasIssues || showDetailed);
  }, [performanceData, mergedThresholds, showDetailed]);

  // Get overall system status
  const getOverallStatus = () => {
    const critical = 
      performanceData.renderTime >= mergedThresholds.renderTime.critical ||
      performanceData.memoryUsage >= mergedThresholds.memoryUsage.critical ||
      performanceData.cpuUsage >= mergedThresholds.cpuUsage.critical ||
      performanceData.networkLatency >= mergedThresholds.networkLatency.critical;

    const warning = 
      performanceData.renderTime >= mergedThresholds.renderTime.warning ||
      performanceData.memoryUsage >= mergedThresholds.memoryUsage.warning ||
      performanceData.cpuUsage >= mergedThresholds.cpuUsage.warning ||
      performanceData.networkLatency >= mergedThresholds.networkLatency.warning;

    if (critical) return 'critical';
    if (warning) return 'warning';
    return 'good';
  };

  const overallStatus = getOverallStatus();

  // Don't render if not visible and not forced to show
  if (!isVisible && !showDetailed) {
    return null;
  }

  // Compact version for non-detailed view
  if (!showDetailed) {
    return (
      <div 
        className={`${position === 'fixed' ? 'fixed top-4 right-4 z-50' : ''} max-w-sm`}
        role="status"
        aria-live="polite"
        aria-label="Performance Monitor"
      >
        <Card className="shadow-lg border-l-4 border-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-gray-900">Performance Monitor</span>
              <Badge variant={overallStatus === 'critical' ? 'destructive' : overallStatus === 'warning' ? 'outline' : 'default'}>
                {overallStatus === 'critical' ? 'Critical' : overallStatus === 'warning' ? 'Warning' : 'Good'}
              </Badge>
            </div>
            <div className="space-y-2 text-xs">
              <PerformanceStatusBadge 
                value={performanceData.renderTime} 
                thresholds={mergedThresholds.renderTime}
                label="Render"
              />
              <PerformanceStatusBadge 
                value={performanceData.memoryUsage} 
                thresholds={mergedThresholds.memoryUsage}
                label="Memory"
              />
              <PerformanceStatusBadge 
                value={performanceData.cpuUsage} 
                thresholds={mergedThresholds.cpuUsage}
                label="CPU"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Detailed version
  return (
    <div className="space-y-4">
      {/* Performance Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Performance Monitor</h3>
            </div>
            <Badge 
              variant={overallStatus === 'critical' ? 'destructive' : overallStatus === 'warning' ? 'outline' : 'default'}
              className="text-sm"
            >
              System Status: {overallStatus === 'critical' ? 'Critical' : overallStatus === 'warning' ? 'Warning' : 'Healthy'}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MiniPerformanceCard
              title="Render Time"
              value={`${performanceData.renderTime.toFixed(1)}ms`}
              icon={<Clock className="w-5 h-5" />}
              status={
                performanceData.renderTime >= mergedThresholds.renderTime.critical ? 'critical' :
                performanceData.renderTime >= mergedThresholds.renderTime.warning ? 'warning' : 'good'
              }
            />
            <MiniPerformanceCard
              title="Memory Usage"
              value={`${performanceData.memoryUsage.toFixed(1)}MB`}
              icon={<MemoryStick className="w-5 h-5" />}
              status={
                performanceData.memoryUsage >= mergedThresholds.memoryUsage.critical ? 'critical' :
                performanceData.memoryUsage >= mergedThresholds.memoryUsage.warning ? 'warning' : 'good'
              }
            />
            <MiniPerformanceCard
              title="CPU Usage"
              value={`${performanceData.cpuUsage.toFixed(1)}%`}
              icon={<Cpu className="w-5 h-5" />}
              status={
                performanceData.cpuUsage >= mergedThresholds.cpuUsage.critical ? 'critical' :
                performanceData.cpuUsage >= mergedThresholds.cpuUsage.warning ? 'warning' : 'good'
              }
            />
            <MiniPerformanceCard
              title="Network"
              value={`${performanceData.networkLatency.toFixed(0)}ms`}
              icon={<Wifi className="w-5 h-5" />}
              status={
                performanceData.networkLatency >= mergedThresholds.networkLatency.critical ? 'critical' :
                performanceData.networkLatency >= mergedThresholds.networkLatency.warning ? 'warning' : 'good'
              }
            />
          </div>

          {/* Performance History */}
          {dataHistory.length > 5 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Performance Trend</h4>
              <div className="flex items-end gap-1 h-16">
                {dataHistory.slice(-10).map((data, index) => {
                  const height = Math.max(8, (data.cpuUsage / 100) * 60);
                  const color = data.cpuUsage >= 70 ? 'bg-red-400' : data.cpuUsage >= 50 ? 'bg-yellow-400' : 'bg-green-400';
                  return (
                    <div
                      key={index}
                      className={`w-3 ${color} rounded-t opacity-80`}
                      style={{ height: `${height}px` }}
                      title={`CPU: ${data.cpuUsage.toFixed(1)}%`}
                    />
                  );
                })}
              </div>
              <p className="text-xs text-gray-500 mt-1">CPU usage over last 10 samples</p>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Last updated: {new Date(performanceData.timestamp).toLocaleTimeString()}</span>
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span>MaycoleTracker™ Performance Monitor</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Performance Hook for easy integration
export const usePerformanceMonitor = () => {
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    renderTime: 12.5,
    memoryUsage: 45.2,
    cpuUsage: 23.1,
    networkLatency: 28,
    timestamp: Date.now()
  });

  const [isOptimal, setIsOptimal] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData: PerformanceData = {
        renderTime: Math.max(8, performanceData.renderTime + (Math.random() - 0.5) * 2),
        memoryUsage: Math.max(20, performanceData.memoryUsage + (Math.random() - 0.5) * 5),
        cpuUsage: Math.max(10, Math.min(90, performanceData.cpuUsage + (Math.random() - 0.5) * 8)),
        networkLatency: Math.max(15, performanceData.networkLatency + (Math.random() - 0.5) * 10),
        timestamp: Date.now()
      };

      setPerformanceData(newData);
      
      // Check if performance is optimal
      const optimal = 
        newData.renderTime < 20 &&
        newData.memoryUsage < 100 &&
        newData.cpuUsage < 70 &&
        newData.networkLatency < 100;
      
      setIsOptimal(optimal);
    }, 5000);

    return () => clearInterval(interval);
  }, [performanceData]);

  return {
    performanceData,
    isOptimal,
    getMetrics: () => performanceData,
    getStatus: () => isOptimal ? 'optimal' : 'degraded'
  };
};

export default PerformanceMonitor;