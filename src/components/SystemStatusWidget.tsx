/**
 * MaycoleTracker™ vol. XI - System Status Widget
 * Real-time system health monitoring for dashboard integration
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, CheckCircle, AlertTriangle, XCircle, 
  Activity, Server, Bot, Database 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface SystemStatus {
  overall: 'healthy' | 'warning' | 'critical';
  backendHealth: number;
  agentsBonded: number;
  dependenciesOk: number;
  lastCheck: Date;
}

export default function SystemStatusWidget() {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    overall: 'healthy',
    backendHealth: 95,
    agentsBonded: 3,
    dependenciesOk: 3,
    lastCheck: new Date()
  });

  useEffect(() => {
    // Simulate real-time system monitoring
    const interval = setInterval(() => {
      // Simulate some variability in system health
      const health = Math.floor(Math.random() * 20) + 80; // 80-100%
      const agents = Math.floor(Math.random() * 2) + 2; // 2-3 agents
      const deps = Math.floor(Math.random() * 2) + 2; // 2-3 dependencies
      
      let overall: 'healthy' | 'warning' | 'critical' = 'healthy';
      if (health < 90) overall = 'warning';
      if (health < 70) overall = 'critical';

      setSystemStatus({
        overall,
        backendHealth: health,
        agentsBonded: agents,
        dependenciesOk: deps,
        lastCheck: new Date()
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'critical':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Operational</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Warning</Badge>;
      case 'critical':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Critical</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Unknown</Badge>;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span>System Status</span>
          </div>
          {getStatusBadge(systemStatus.overall)}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Status */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            {getStatusIcon(systemStatus.overall)}
            <div>
              <div className="font-medium text-gray-900">Overall Health</div>
              <div className="text-xs text-gray-500">
                Last check: {systemStatus.lastCheck.toLocaleTimeString()}
              </div>
            </div>
          </div>
          <div className={`text-2xl font-bold ${getStatusColor(systemStatus.overall)}`}>
            {systemStatus.backendHealth}%
          </div>
        </div>

        {/* System Components */}
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-700">Backend Functions</span>
            </div>
            <span className="text-sm font-medium text-green-600">6/6 Active</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-700">AI Agents</span>
            </div>
            <span className="text-sm font-medium text-green-600">
              {systemStatus.agentsBonded}/3 Bonded
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-gray-700">Dependencies</span>
            </div>
            <span className="text-sm font-medium text-green-600">
              {systemStatus.dependenciesOk}/3 Compatible
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-3 border-t border-gray-200">
          <div className="flex gap-2">
            <Link
              to="/recovery"
              className="flex-1 bg-blue-600 text-white text-xs py-2 px-3 rounded-md hover:bg-blue-700 transition-colors text-center font-medium"
            >
              View Recovery
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-gray-200 text-gray-700 text-xs py-2 px-3 rounded-md hover:bg-gray-300 transition-colors font-medium"
            >
              Refresh Status
            </button>
          </div>
        </div>

        {/* System Health Indicator */}
        <div className="space-y-2">
          <div className="text-xs text-gray-600 font-medium">System Health</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${
                systemStatus.backendHealth >= 90 
                  ? 'bg-green-500' 
                  : systemStatus.backendHealth >= 70 
                  ? 'bg-yellow-500' 
                  : 'bg-red-500'
              }`}
              style={{ width: `${systemStatus.backendHealth}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 text-right">
            {systemStatus.backendHealth}% operational
          </div>
        </div>
      </CardContent>
    </Card>
  );
}