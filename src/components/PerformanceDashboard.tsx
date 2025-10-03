/**
 * MaycoleTracker™ vol. XI - Performance Dashboard with Debounced Rendering
 * Real-time performance monitoring with optimized rendering
 * Timestamp: [2025-10-02T02:42EDT]
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import UniversalBackButton from './UniversalBackButton';
import { 
  debounceRender, 
  MaycoleRenderUtils, 
  globalRenderMonitor,
  globalRenderQueue,
  RenderPerformanceMonitor 
} from '../utils/renderingOptimization';
import { 
  Activity, 
  Zap, 
  Monitor, 
  TrendingUp, 
  Clock,
  Cpu,
  MemoryStick,
  Gauge,
  BarChart3,
  Home,
  ArrowLeft,
  RefreshCw
} from 'lucide-react';

interface PerformanceMetrics {
  renderTime: number;
  queueSize: number;
  averageRenderTime: number;
  maxRenderTime: number;
  minRenderTime: number;
  totalRenders: number;
  timestamp: Date;
}

// Performance Metrics Display Component
const PerformanceMetricsCard: React.FC<{ 
  metrics: PerformanceMetrics;
  onRefresh: () => void;
}> = ({ metrics, onRefresh }) => {
  const getPerformanceColor = (renderTime: number) => {
    if (renderTime < 16) return 'text-green-600 bg-green-50';
    if (renderTime < 33) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getPerformanceStatus = (renderTime: number) => {
    if (renderTime < 16) return 'Excellent';
    if (renderTime < 33) return 'Good';
    return 'Needs Optimization';
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-blue-600" />
            Render Performance
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>
        <CardDescription>
          Real-time rendering performance metrics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className={`text-2xl font-bold mb-1 ${getPerformanceColor(metrics.averageRenderTime).split(' ')[0]}`}>
              {metrics.averageRenderTime.toFixed(2)}ms
            </div>
            <div className="text-sm text-gray-600">Average Render</div>
            <Badge className={getPerformanceColor(metrics.averageRenderTime)}>
              {getPerformanceStatus(metrics.averageRenderTime)}
            </Badge>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {metrics.queueSize}
            </div>
            <div className="text-sm text-gray-600">Queue Size</div>
            <Badge variant={metrics.queueSize > 10 ? 'destructive' : 'default'}>
              {metrics.queueSize > 10 ? 'High' : 'Normal'}
            </Badge>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Current Performance</span>
            <span className="text-sm font-medium">
              {Math.min(100, Math.max(0, (60 - metrics.averageRenderTime) * 2)).toFixed(0)}%
            </span>
          </div>
          <Progress 
            value={Math.min(100, Math.max(0, (60 - metrics.averageRenderTime) * 2))} 
            className="h-2"
          />
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div>
            <span className="text-gray-500">Min:</span>
            <span className="ml-1 font-medium">{metrics.minRenderTime.toFixed(1)}ms</span>
          </div>
          <div>
            <span className="text-gray-500">Max:</span>
            <span className="ml-1 font-medium">{metrics.maxRenderTime.toFixed(1)}ms</span>
          </div>
          <div>
            <span className="text-gray-500">Total:</span>
            <span className="ml-1 font-medium">{metrics.totalRenders}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Debounced Function Status Component
const DebouncedFunctionsStatus: React.FC = () => {
  const [lastExecuted, setLastExecuted] = useState<{ [key: string]: Date }>({});
  
  const executeDebouncedFunction = useCallback((functionName: string, fn: () => void) => {
    fn();
    setLastExecuted(prev => ({
      ...prev,
      [functionName]: new Date()
    }));
  }, []);

  const renderFunctions = [
    { name: 'Agents', fn: MaycoleRenderUtils.renderAgents },
    { name: 'Dashboard', fn: MaycoleRenderUtils.renderDashboard },
    { name: 'Analytics', fn: MaycoleRenderUtils.renderAnalytics },
    { name: 'Scanner', fn: MaycoleRenderUtils.renderScanner },
    { name: 'Voice Control', fn: MaycoleRenderUtils.renderVoiceControl }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-600" />
          Debounced Render Functions
        </CardTitle>
        <CardDescription>
          Test and monitor debounced rendering functions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {renderFunctions.map((func, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-sm">{func.name}</div>
                <div className="text-xs text-gray-500">
                  {lastExecuted[func.name] 
                    ? `Last: ${lastExecuted[func.name].toLocaleTimeString()}`
                    : 'Not executed'
                  }
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => executeDebouncedFunction(func.name, func.fn)}
                className="text-xs"
              >
                Test
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Main Performance Dashboard Component
export default function PerformanceDashboard() {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    queueSize: 0,
    averageRenderTime: 0,
    maxRenderTime: 0,
    minRenderTime: 0,
    totalRenders: 0,
    timestamp: new Date()
  });

  // Debounced metrics update
  const debouncedUpdateMetrics = useCallback(
    debounceRender(() => {
      const stats = globalRenderMonitor.getStats();
      const queueSize = globalRenderQueue.size();
      
      setMetrics({
        renderTime: stats.average,
        queueSize,
        averageRenderTime: stats.average,
        maxRenderTime: stats.max,
        minRenderTime: stats.min,
        totalRenders: stats.samples,
        timestamp: new Date()
      });
      
      console.log('✅ Performance metrics updated with debouncing');
    }, 100),
    []
  );

  // Auto-update metrics every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      debouncedUpdateMetrics();
    }, 2000);

    // Initial update
    debouncedUpdateMetrics();

    return () => clearInterval(interval);
  }, [debouncedUpdateMetrics]);

  // Debounced navigation
  const debouncedNavigate = useCallback(
    debounceRender((path: string) => {
      navigate(path);
    }, 50),
    [navigate]
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <UniversalBackButton customBackPath="/main" showHomeOption={true} />
              <div>
                <h1 className="text-3xl font-bold">Performance Dashboard</h1>
                <p className="text-purple-100 mt-1">Real-time rendering optimization monitoring</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-green-500 text-white">
                <Activity className="w-3 h-3 mr-1" />
                Monitoring Active
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => debouncedNavigate('/')}
                className="btn-on-dark"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Performance Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PerformanceMetricsCard 
              metrics={metrics} 
              onRefresh={debouncedUpdateMetrics}
            />
            
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  System Status
                </CardTitle>
                <CardDescription>
                  Current system performance status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm">Debounce System</span>
                    </div>
                    <Badge className="bg-green-500 text-white">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-sm">Render Queue</span>
                    </div>
                    <Badge variant={metrics.queueSize > 5 ? 'destructive' : 'default'}>
                      {metrics.queueSize} items
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-sm">Performance Monitor</span>
                    </div>
                    <Badge className="bg-purple-500 text-white">Recording</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Debounced Functions Testing */}
          <DebouncedFunctionsStatus />

          {/* Performance Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                Performance Optimization Tips
              </CardTitle>
              <CardDescription>
                Recommendations for optimal rendering performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Debounce Benefits</h4>
                  <p className="text-sm text-blue-700">
                    Reduces unnecessary renders by batching updates. Target: &lt;16ms render time for 60fps.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Queue Management</h4>
                  <p className="text-sm text-green-700">
                    Keep render queue size low for optimal performance. Consider increasing debounce delay if queue grows.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Monitoring Active</h4>
                  <p className="text-sm text-purple-700">
                    Performance monitoring tracks all renders. Check console for detailed timing information.
                  </p>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">Best Practices</h4>
                  <p className="text-sm text-orange-700">
                    Use debounced functions for user interactions. Batch DOM updates for better performance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}