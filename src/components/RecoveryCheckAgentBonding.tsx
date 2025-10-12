/**
 * MaycoleTracker™ vol. XI - Enterprise Edition
 * RECOVERY CHECK AGENT BONDING SYSTEM - Universal Business Platform
 * Backend Workflow Validator & AI Agent Bonding Protocol
 */

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Zap, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  RefreshCw, 
  Settings, 
  Activity, 
  Brain, 
  Link,
  Cpu,
  Database,
  Wifi,
  Server,
  Code,
  Bug,
  Wrench,
  Package,
  GitBranch,
  Monitor
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

// Import the new backend enforcers
import { bondingAgent, type BondingReport } from '../utils/bondingAgent';
import { modularizerAgent, type ModularizationReport } from '../utils/modularizerAgent';
import { performSystemHealthCheck, type SystemHealthReport } from '../utils/healthCheck';
import { componentCleaner, type CleanupReport } from '../utils/componentCleaner';
import { routeEnforcer, type RouteEnforcementReport } from '../utils/routeEnforcer';
import { backendFunctionValidator, type FunctionValidationReport } from '../utils/backendFunctionValidator';
import { dependencyPatcher, type DependencyPatchReport } from '../utils/dependencyPatcher';
import { generateRecoveryReport, quickHealthCheck, emergencyRecoverySummary } from '../utils/recoverySummaryModule';
// Mount inventory and dependency/security agents when this page is active so they attach to AgentBus
import InventoryAIAgent from './InventoryAIAgent';
import DependenciesAIAgent from './DependenciesAIAgent';

interface BackendFunction {
  fnName: string;
  status: 'healthy' | 'broken' | 'checking' | 'repaired';
  lastCheck: string;
  error?: string;
  responseTime?: number;
  criticalLevel: 'low' | 'medium' | 'high' | 'critical';
}

interface AIAgent {
  id: string;
  name: string;
  bondedTo: string;
  status: 'bonded' | 'unbonded' | 'rebonding' | 'error';
  lastActivity: string;
  performance: number;
  type: 'inventory' | 'compliance' | 'ui' | 'voice' | 'analytics';
  // optional runtime properties used in UI
  bondStrength?: number;
}

interface Dependency {
  name: string;
  version: string;
  status: 'compatible' | 'outdated' | 'broken' | 'updating';
  requiredVersion?: string;
  lastUpdate: string;
  criticalLevel: 'low' | 'medium' | 'high' | 'critical';
}

interface RecoveryReport {
  // core
  timestamp?: string;
  healthyFunctions: string[];
  repairedFunctions: string[];
  agentBondingStatus?: AIAgent[] | any[];
  dependenciesPatched?: string[];
  overallHealth?: number;
  criticalIssues?: number | string[];
  warnings?: number;

  // extended UI fields (optional) used throughout the component
  reportId?: string;
  overallSystemHealth?: number;
  systemStatus?: string;
  executiveSummary?: string;
  enforcersActive?: number;
  bondedAgents?: number;
  actionPriority?: string;
  enforcerStatus?: Record<string, boolean>;
  performanceMetrics?: {
    avgResponseTime?: number;
    systemLatency?: number;
    errorRate?: number;
    throughput?: number;
    memoryUsage?: number;
    cpuUsage?: number;
  };
  moduleHealth?: Array<{ name?: string; status?: string; type?: string; healthScore?: number; lastCheck?: string; issues?: string[] }>;
  criticalIssuesList?: string[];
  // NOTE: legacy shape variance — prefer an array of issue identifiers for UI mapping
  // during triage we normalize this to a consistent shape in the component state.
  recoveryActions?: string[];
  recommendations?: string[];
  nextMaintenanceDate?: string | number;
  confidenceScore?: number;
  recoveryStats?: RecoveryStats;
  uptime?: string | number;
}

// Normalized runtime shape used for component state to avoid pervasive "possibly undefined" checks
interface NormalizedRecoveryReport extends RecoveryReport {
  timestamp: string;
  healthyFunctions: string[];
  repairedFunctions: string[];
  agentBondingStatus: AIAgent[] | any[];
  dependenciesPatched: string[];
  overallHealth: number;
  criticalIssues: string[];
  warnings: number;
  enforcerStatus: Record<string, boolean>;
  performanceMetrics: {
    avgResponseTime: number;
    systemLatency: number;
    errorRate: number;
    throughput: number;
    memoryUsage: number;
    cpuUsage: number;
  };
  recoveryActions: string[];
  recommendations: string[];
}

const DEFAULT_RECOVERY_REPORT: NormalizedRecoveryReport = {
  timestamp: new Date(0).toISOString(),
  healthyFunctions: [],
  repairedFunctions: [],
  agentBondingStatus: [],
  dependenciesPatched: [],
  overallHealth: 0,
  criticalIssues: [],
  warnings: 0,
  enforcerStatus: {},
  performanceMetrics: {
    avgResponseTime: 0,
    systemLatency: 0,
    errorRate: 0,
    throughput: 0,
    memoryUsage: 0,
    cpuUsage: 0
  },
  recoveryActions: [],
  recommendations: []
};

// Mock backend functions for MaycoleTracker™ Enterprise
const initialBackendFunctions: BackendFunction[] = [
  {
    fnName: 'InventorySync',
    status: 'healthy',
    lastCheck: '2025-01-02T01:11:00Z',
    responseTime: 145,
    criticalLevel: 'high'
  },
  {
    fnName: 'AgentDispatch',
    status: 'healthy',
    lastCheck: '2025-01-02T01:10:45Z',
    responseTime: 89,
    criticalLevel: 'critical'
  },
  {
    fnName: 'UserAuth',
    status: 'broken',
    lastCheck: '2025-01-02T01:09:30Z',
    error: 'Connection timeout after 5000ms',
    criticalLevel: 'critical'
  },
  {
    fnName: 'WebhookListener',
    status: 'healthy',
    lastCheck: '2025-01-02T01:11:15Z',
    responseTime: 234,
    criticalLevel: 'medium'
  },
  {
    fnName: 'DataSanitizer',
    status: 'broken',
    lastCheck: '2025-01-02T01:08:20Z',
    error: 'Invalid schema validation',
    criticalLevel: 'high'
  },
  {
    fnName: 'AgentBondingProtocol',
    status: 'healthy',
    lastCheck: '2025-01-02T01:11:30Z',
    responseTime: 67,
    criticalLevel: 'critical'
  },
  {
    fnName: 'VoiceCommandProcessor',
    status: 'checking',
    lastCheck: '2025-01-02T01:11:40Z',
    criticalLevel: 'high'
  },
  {
    fnName: 'ScannerIntegration',
    status: 'healthy',
    lastCheck: '2025-01-02T01:11:20Z',
    responseTime: 112,
    criticalLevel: 'medium'
  }
];

// AI Agents for universal business platform
const initialAIAgents: AIAgent[] = [
  {
    id: 'agent_inventory',
    name: 'Inventory Intelligence Agent',
    bondedTo: 'InventorySync',
    status: 'bonded',
    lastActivity: '2025-01-02T01:10:00Z',
    performance: 94,
    type: 'inventory'
  },
  {
    id: 'agent_compliance',
    name: 'Business Compliance Agent',
    bondedTo: 'DataSanitizer',
    status: 'unbonded',
    lastActivity: '2025-01-02T01:05:30Z',
    performance: 67,
    type: 'compliance'
  },
  {
    id: 'agent_ui',
    name: 'User Interface Agent',
    bondedTo: 'AgentDispatch',
    status: 'bonded',
    lastActivity: '2025-01-02T01:11:00Z',
    performance: 89,
    type: 'ui'
  },
  {
    id: 'agent_voice',
    name: 'Voice Command Agent',
    bondedTo: 'VoiceCommandProcessor',
    status: 'rebonding',
    lastActivity: '2025-01-02T01:09:45Z',
    performance: 78,
    type: 'voice'
  },
  {
    id: 'agent_analytics',
    name: 'Business Analytics Agent',
    bondedTo: 'WebhookListener',
    status: 'bonded',
    lastActivity: '2025-01-02T01:11:15Z',
    performance: 92,
    type: 'analytics'
  }
];

// Dependencies for enterprise platform
const initialDependencies: Dependency[] = [
  {
    name: 'OpenAI',
    version: '4.0.1',
    status: 'compatible',
    lastUpdate: '2025-01-01T00:00:00Z',
    criticalLevel: 'high'
  },
  {
    name: 'BubbleAPI',
    version: '2.3.0',
    status: 'outdated',
    requiredVersion: '2.4.1',
    lastUpdate: '2024-12-15T00:00:00Z',
    criticalLevel: 'medium'
  },
  {
    name: 'FigmaMakeBridge',
    version: '1.1.2',
    status: 'compatible',
    lastUpdate: '2025-01-01T12:00:00Z',
    criticalLevel: 'low'
  },
  {
    name: 'SupabaseClient',
    version: '2.39.0',
    status: 'broken',
    requiredVersion: '2.39.3',
    lastUpdate: '2024-12-20T00:00:00Z',
    criticalLevel: 'critical'
  },
  {
    name: 'ReactRouter',
    version: '6.8.1',
    status: 'compatible',
    lastUpdate: '2025-01-01T08:00:00Z',
    criticalLevel: 'medium'
  }
];

const RecoveryCheckAgentBonding = () => {
  const [backendFunctions, setBackendFunctions] = useState<BackendFunction[]>(initialBackendFunctions);
  const [aiAgents, setAIAgents] = useState<AIAgent[]>(initialAIAgents);
  const [dependencies, setDependencies] = useState<Dependency[]>(initialDependencies);
  const [isRunningCheck, setIsRunningCheck] = useState(false);
  const [lastReport, setLastReport] = useState<NormalizedRecoveryReport>(DEFAULT_RECOVERY_REPORT);
  const [activeTab, setActiveTab] = useState<'functions' | 'agents' | 'dependencies' | 'report' | 'bonding' | 'components' | 'cleaner' | 'routes' | 'validator' | 'patcher' | 'summary'>('functions');
  
  // New state for backend enforcers
  const [bondingReport, setBondingReport] = useState<BondingReport | null>(null);
  const [modularizerReport, setModularizerReport] = useState<ModularizationReport | null>(null);
  const [healthReport, setHealthReport] = useState<SystemHealthReport | null>(null);
  const [cleanupReport, setCleanupReport] = useState<CleanupReport | null>(null);
  const [routeReport, setRouteReport] = useState<RouteEnforcementReport | null>(null);
  const [validationReport, setValidationReport] = useState<FunctionValidationReport | null>(null);
  const [dependencyReport, setDependencyReport] = useState<DependencyPatchReport | null>(null);
  const [recoveryReport, setRecoveryReport] = useState<NormalizedRecoveryReport>(DEFAULT_RECOVERY_REPORT);
  const [enforcersEnabled, setEnforcersEnabled] = useState(true);
  // AgentBus integration (publish recovery status updates)
  // Importing the bus lazily to avoid heavy coupling in this large component
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { useAgentBus } = (require('../contexts/AgentBusContext') as { useAgentBus: () => { publish: (topic: string, payload: any) => void } });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const bus = useAgentBus() as { publish?: (topic: string, payload: any) => void };

  useEffect(() => {
    // publish a periodic recovery status for monitoring
    const id = setInterval(() => {
      try {
        const status = {
          timestamp: new Date().toISOString(),
          healthyFunctions: backendFunctions.filter(f => f.status === 'healthy').length,
          brokenFunctions: backendFunctions.filter(f => f.status === 'broken').length
        };
        // guard in case the bus is not available in some render environments
        if (bus && typeof bus.publish === 'function') {
          bus.publish('recovery:status', status);
        }
      } catch (e) {
        // ignore
      }
    }, 30000);
    return () => clearInterval(id);
  }, [backendFunctions, bus]);

  // Simulate backend function health check
  const checkFunctionHealth = async (fnName: string): Promise<BackendFunction> => {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000));
    
    const isHealthy = Math.random() > 0.3; // 70% chance of being healthy
    const responseTime = Math.floor(Math.random() * 300 + 50);
    
    return {
      ...backendFunctions.find(f => f.fnName === fnName)!,
      status: isHealthy ? 'healthy' : 'broken',
      lastCheck: new Date().toISOString(),
      responseTime: isHealthy ? responseTime : undefined,
      error: isHealthy ? undefined : 'Service temporarily unavailable'
    };
  };

  // Simulate agent bonding repair
  const repairAgentBonding = (agent: AIAgent): AIAgent => {
    const backendExists = backendFunctions.some(f => f.fnName === agent.bondedTo && f.status === 'healthy');
    
    if (!backendExists) {
      return {
        ...agent,
        bondedTo: 'RecoveryFallback',
        status: 'bonded',
        lastActivity: new Date().toISOString(),
        performance: Math.max(agent.performance - 10, 50)
      };
    }
    
    return {
      ...agent,
      status: 'bonded',
      lastActivity: new Date().toISOString(),
      performance: Math.min(agent.performance + 5, 100)
    };
  };

  // Simulate dependency patching
  const patchDependency = (dep: Dependency): Dependency => {
    if (dep.status === 'outdated' || dep.status === 'broken') {
      return {
        ...dep,
        status: 'compatible',
        version: dep.requiredVersion || dep.version,
        lastUpdate: new Date().toISOString()
      };
    }
    return dep;
  };

  // Enhanced recovery check with backend enforcers
  const runRecoveryCheck = async () => {
    setIsRunningCheck(true);
    
    try {
      // Update function statuses to "checking"
      setBackendFunctions(prev => prev.map(f => ({ ...f, status: 'checking' as const })));
      
      // Run backend enforcers if enabled
      if (enforcersEnabled) {
        try {
          console.log('🔧 Running Backend Enforcers...');
          
          // Run bonding agent
          try {
            const bondingResult = await bondingAgent();
            setBondingReport(bondingResult);
            console.log('✅ Bonding Agent completed successfully');
          } catch (error) {
            console.error('❌ Bonding Agent error:', error);
            setBondingReport(null);
          }
          
          // Run modularizer agent
          try {
            const modularizerResult = modularizerAgent();
            setModularizerReport(modularizerResult);
            console.log('✅ Modularizer Agent completed successfully');
          } catch (error) {
            console.error('❌ Modularizer Agent error:', error);
            setModularizerReport(null);
          }
          
          // Run system health check
          try {
            const healthResult = await performSystemHealthCheck();
            setHealthReport(healthResult);
            console.log('✅ Health Check completed successfully');
          } catch (error) {
            console.error('❌ Health Check error:', error);
            setHealthReport(null);
          }
          
          // Run component cleaner
          try {
            const cleanupResult = componentCleaner();
            setCleanupReport(cleanupResult);
            console.log('✅ Component Cleaner completed successfully');
          } catch (error) {
            console.error('❌ Component Cleaner error:', error);
            setCleanupReport(null);
          }
          
          // Run route enforcer
          try {
            const routeResult = routeEnforcer();
            setRouteReport(routeResult);
            console.log('✅ Route Enforcer completed successfully');
          } catch (error) {
            console.error('❌ Route Enforcer error:', error);
            setRouteReport(null);
          }
          
          // Run backend function validator
          try {
            const validationResult = await backendFunctionValidator();
            setValidationReport(validationResult);
            console.log('✅ Backend Function Validator completed successfully');
          } catch (error) {
            console.error('❌ Backend Function Validator error:', error);
            setValidationReport(null);
          }
          
          // Run dependency patcher
          try {
            const dependencyResult = await dependencyPatcher();
            setDependencyReport(dependencyResult);
            console.log('✅ Dependency Patcher completed successfully');
          } catch (error) {
            console.error('❌ Dependency Patcher error:', error);
            setDependencyReport(null);
          }
          
          // Generate comprehensive recovery summary
          try {
            // Collect all health function results from previous checks
            const allHealthFunctions: any[] = [
              // Add health functions from other enforcers if available
              ...((healthReport as any)?.checks || []).map((check: any) => ({
                fnName: check.module,
                status: check.healthy ? "✅ Healthy" : "❌ Broken",
                responseTime: check.responseTime,
                lastChecked: new Date().toISOString(),
                errorCount: check.errors?.length || 0,
                description: `${check.module} system health check`,
                criticality: 'high',
                module: check.module
              }))
            ];

            // generateRecoveryReport may return a partial or unknown shape from external modules
            const recoveryResult = generateRecoveryReport(allHealthFunctions) as Partial<NormalizedRecoveryReport> | undefined;
            // Merge with defaults to ensure the component always has a normalized shape
            setRecoveryReport({ ...DEFAULT_RECOVERY_REPORT, ...(recoveryResult || {}) } as NormalizedRecoveryReport);
            console.log('✅ Recovery Summary Module completed successfully');
          } catch (error) {
            console.error('❌ Recovery Summary Module error:', error);
            // On error, keep a normalized empty report instead of null
            setRecoveryReport(DEFAULT_RECOVERY_REPORT);
          }
          
          console.log('✅ All Backend Enforcers completed');
        } catch (error) {
          console.error('❌ Backend Enforcers general error:', error);
        }
      }
      
      // Check each backend function
      const updatedFunctions = await Promise.all(
        backendFunctions.map((func: BackendFunction) => checkFunctionHealth(func.fnName))
      );
      
      setBackendFunctions(updatedFunctions);
      
      // Repair broken functions
      const repairedFunctions = updatedFunctions.map((func: BackendFunction) => {
        if (func.status === 'broken') {
          return { ...func, status: 'repaired' as const };
        }
        return func;
      });
      
      setBackendFunctions(repairedFunctions);
      
      // Repair agent bonding
      const repairedAgents = aiAgents.map((agent: AIAgent) => {
        if (agent.status === 'unbonded' || agent.status === 'error') {
          return repairAgentBonding(agent);
        }
        return agent;
      });
      
      setAIAgents(repairedAgents);
      
      // Patch dependencies
  const patchedDependencies = dependencies.map((dep: Dependency) => patchDependency(dep));
      setDependencies(patchedDependencies);
      
      // Generate enhanced recovery report
      const baseHealth = Math.round(
        (repairedFunctions.filter((f: BackendFunction) => f.status === 'healthy' || f.status === 'repaired').length / repairedFunctions.length) * 100
      );
      
      // Factor in backend enforcer results
      let adjustedHealth = baseHealth;
      if (bondingReport) {
        adjustedHealth = Math.round((adjustedHealth + bondingReport.overallHealth) / 2);
      }
      if (healthReport) {
        const healthPercentage = Math.round((healthReport.healthyModules / healthReport.totalModules) * 100);
        adjustedHealth = Math.round((adjustedHealth + healthPercentage) / 2);
      }
      
      const report: RecoveryReport = {
        timestamp: new Date().toISOString(),
        healthyFunctions: repairedFunctions.filter((f: BackendFunction) => f.status === 'healthy').map((f: BackendFunction) => f.fnName),
        repairedFunctions: repairedFunctions.filter((f: BackendFunction) => f.status === 'repaired').map((f: BackendFunction) => f.fnName),
        agentBondingStatus: repairedAgents.map((a: AIAgent) => ({
          id: a.id,
          name: a.name,
          bondedTo: a.bondedTo,
          status: a.status,
          lastActivity: a.lastActivity,
          performance: a.performance,
          type: a.type
        })),
        dependenciesPatched: patchedDependencies.filter((d: Dependency) => d.status === 'compatible').map((d: Dependency) => d.name),
        overallHealth: adjustedHealth,
        criticalIssues: repairedFunctions.filter(f => f.status === 'broken' && f.criticalLevel === 'critical').length,
        warnings: repairedFunctions.filter(f => f.status === 'broken' && f.criticalLevel !== 'critical').length
      };
      
  setLastReport({ ...DEFAULT_RECOVERY_REPORT, ...(report || {}) } as NormalizedRecoveryReport);
      
    } finally {
      setIsRunningCheck(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'bonded':
      case 'compatible':
        return 'bg-green-100 text-green-800';
      case 'broken':
      case 'unbonded':
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'checking':
      case 'rebonding':
      case 'updating':
        return 'bg-blue-100 text-blue-800';
      case 'repaired':
        return 'bg-yellow-100 text-yellow-800';
      case 'outdated':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'bonded':
      case 'compatible':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'broken':
      case 'unbonded':
      case 'error':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'checking':
      case 'rebonding':
      case 'updating':
        return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'repaired':
        return <Wrench className="w-4 h-4 text-yellow-600" />;
      case 'outdated':
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getCriticalLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getAgentTypeIcon = (type: string) => {
    switch (type) {
      case 'inventory': return <Database className="w-4 h-4" />;
      case 'compliance': return <Shield className="w-4 h-4" />;
      case 'ui': return <Settings className="w-4 h-4" />;
      case 'voice': return <Brain className="w-4 h-4" />;
      case 'analytics': return <Activity className="w-4 h-4" />;
      default: return <Cpu className="w-4 h-4" />;
    }
  };

  useEffect(() => {
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      if (!isRunningCheck) {
        runRecoveryCheck();
      }
    }, 300000);

    return () => clearInterval(interval);
  }, [isRunningCheck]);

  return (
    <div className="min-h-screen bg-white">
      {/* Mount related AI agent components (inventory & dependency/security) to ensure they are active while viewing recovery */}
      <div style={{ display: 'none' }} aria-hidden>
        <InventoryAIAgent />
        <DependenciesAIAgent />
      </div>
      {/* Enterprise Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-96 h-96 rounded-full bg-white -top-48 -right-48"></div>
          <div className="absolute w-64 h-64 rounded-full bg-white -bottom-32 -left-32"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold flex items-center gap-3">
                <Shield className="w-10 h-10" />
                MaycoleTracker<span className="tm-standard">TM</span> Recovery System
              </h1>
              <p className="text-gray-300 mt-2 text-lg">
                Backend Workflow Validator & AI Agent Bonding Protocol - Enterprise Edition vol. XI
              </p>
              <div className="flex items-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-green-400" />
                  <span>Backend Functions: {backendFunctions.filter(f => f.status === 'healthy').length}/{backendFunctions.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-blue-400" />
                  <span>AI Agents: {aiAgents.filter(a => a.status === 'bonded').length}/{aiAgents.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link className="w-4 h-4 text-purple-400" />
                  <span>Dependencies: {dependencies.filter(d => d.status === 'compatible').length}/{dependencies.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-yellow-400" />
                  <span>Components: {modularizerReport?.totalComponents || 0}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={() => setEnforcersEnabled(!enforcersEnabled)}
                variant="outline"
                className={`flex items-center gap-2 ${enforcersEnabled ? 'bg-green-600/20 border-green-400' : 'bg-gray-600/20 border-gray-400'}`}
              >
                <Monitor className="w-4 h-4" />
                Enforcers {enforcersEnabled ? 'ON' : 'OFF'}
              </Button>
              <Button 
                onClick={runRecoveryCheck}
                disabled={isRunningCheck}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              >
                {isRunningCheck ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Zap className="w-4 h-4" />
                )}
                {isRunningCheck ? 'Running Check...' : 'Run Recovery Check'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Enhanced System Health Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-11 gap-4">
          <Card className="p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Healthy Functions</p>
                <p className="text-2xl font-bold text-green-600">
                  {backendFunctions.filter(f => f.status === 'healthy').length}
                </p>
                <p className="text-xs text-gray-500 mt-1">/{backendFunctions.length} total</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bonded Agents</p>
                <p className="text-2xl font-bold text-blue-600">
                  {aiAgents.filter(a => a.status === 'bonded').length}
                </p>
                <p className="text-xs text-gray-500 mt-1">/{aiAgents.length} total</p>
              </div>
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Dependencies</p>
                <p className="text-2xl font-bold text-purple-600">
                  {dependencies.filter(d => d.status === 'compatible').length}
                </p>
                <p className="text-xs text-gray-500 mt-1">/{dependencies.length} total</p>
              </div>
              <Link className="w-8 h-8 text-purple-600" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Module Health</p>
                <p className="text-2xl font-bold text-orange-600">
                  {bondingReport ? `${bondingReport.overallHealth}%` : 'N/A'}
                </p>
                <p className="text-xs text-gray-500 mt-1">Bonding Status</p>
              </div>
              <Cpu className="w-8 h-8 text-orange-600" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Components</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {modularizerReport?.activeComponents || 0}
                </p>
                <p className="text-xs text-gray-500 mt-1">/{modularizerReport?.totalComponents || 0} registered</p>
              </div>
              <Package className="w-8 h-8 text-indigo-600" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Component Health</p>
                <p className="text-2xl font-bold text-red-600">
                  {cleanupReport ? `${cleanupReport.healthyComponents}/${cleanupReport.totalComponents}` : 'N/A'}
                </p>
                <p className="text-xs text-gray-500 mt-1">Clean Components</p>
              </div>
              <Wrench className="w-8 h-8 text-red-600" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Route Security</p>
                <p className="text-2xl font-bold text-orange-600">
                  {routeReport ? `${routeReport.securityScore}%` : 'N/A'}
                </p>
                <p className="text-xs text-gray-500 mt-1">Security Score</p>
              </div>
              <Shield className="w-8 h-8 text-orange-600" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Function Health</p>
                <p className="text-2xl font-bold text-purple-600">
                  {validationReport ? `${validationReport.systemHealth.overallScore}%` : 'N/A'}
                </p>
                <p className="text-xs text-gray-500 mt-1">System Health</p>
              </div>
              <Settings className="w-8 h-8 text-purple-600" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-emerald-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Dependencies</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {dependencyReport ? `${dependencyReport.overallCompatibility}%` : 'N/A'}
                </p>
                <p className="text-xs text-gray-500 mt-1">Compatibility</p>
              </div>
              <Package className="w-8 h-8 text-emerald-600" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Health</p>
                <p className="text-2xl font-bold text-orange-600">
                  {recoveryReport ? `${recoveryReport.overallSystemHealth}%` : 'N/A'}
                </p>
                <p className="text-xs text-gray-500 mt-1">Overall Status</p>
              </div>
              <Monitor className="w-8 h-8 text-orange-600" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Health</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {lastReport ? `${lastReport.overallHealth}%` : 'N/A'}
                </p>
                <p className="text-xs text-gray-500 mt-1">Overall Status</p>
              </div>
              <Activity className="w-8 h-8 text-yellow-600" />
            </div>
          </Card>
        </div>

        {/* Enhanced Navigation Tabs */}
        <Card className="p-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto">
            <button
              onClick={() => setActiveTab('functions')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 min-w-max ${
                activeTab === 'functions'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Server className="w-4 h-4" />
              Backend Functions
            </button>
            <button
              onClick={() => setActiveTab('agents')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 min-w-max ${
                activeTab === 'agents'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Brain className="w-4 h-4" />
              AI Agents
            </button>
            <button
              onClick={() => setActiveTab('dependencies')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 min-w-max ${
                activeTab === 'dependencies'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Code className="w-4 h-4" />
              Dependencies
            </button>
            <button
              onClick={() => setActiveTab('bonding')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 min-w-max ${
                activeTab === 'bonding'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Cpu className="w-4 h-4" />
              Module Bonding
            </button>
            <button
              onClick={() => setActiveTab('components')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 min-w-max ${
                activeTab === 'components'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Package className="w-4 h-4" />
              Components
            </button>
            <button
              onClick={() => setActiveTab('cleaner')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 min-w-max ${
                activeTab === 'cleaner'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Wrench className="w-4 h-4" />
              Cleaner
            </button>
            <button
              onClick={() => setActiveTab('routes')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 min-w-max ${
                activeTab === 'routes'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Shield className="w-4 h-4" />
              Routes
            </button>
            <button
              onClick={() => setActiveTab('validator')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 min-w-max ${
                activeTab === 'validator'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Settings className="w-4 h-4" />
              Validator
            </button>
            <button
              onClick={() => setActiveTab('patcher')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 min-w-max ${
                activeTab === 'patcher'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Package className="w-4 h-4" />
              Patcher
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 min-w-max ${
                activeTab === 'summary'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Monitor className="w-4 h-4" />
              Summary
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 min-w-max ${
                activeTab === 'report'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Bug className="w-4 h-4" />
              Recovery Report
            </button>
          </div>
        </Card>

        {/* Backend Functions Tab */}
        {activeTab === 'functions' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Backend Function Health Status</h2>
            {backendFunctions.map((func: BackendFunction) => (
              <Card key={func.fnName} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(func.status)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{func.fnName}</h3>
                      <p className="text-sm text-gray-600">
                        Last checked: {new Date(func.lastCheck).toLocaleString()}
                      </p>
                      {func.responseTime && (
                        <p className="text-sm text-green-600">Response time: {func.responseTime}ms</p>
                      )}
                      {func.error && (
                        <p className="text-sm text-red-600">Error: {func.error}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(func.status)}>
                      {func.status.toUpperCase()}
                    </Badge>
                    <Badge className={getCriticalLevelColor(func.criticalLevel)}>
                      {func.criticalLevel.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* AI Agents Tab */}
        {activeTab === 'agents' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Agent Bonding Status</h2>
            {aiAgents.map((agent: AIAgent) => (
              <Card key={agent.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getAgentTypeIcon(agent.type)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
                      <p className="text-sm text-gray-600">
                        Bonded to: <span className="font-medium">{agent.bondedTo}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Last activity: {new Date(agent.lastActivity).toLocaleString()}
                      </p>
                      <div className="mt-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-gray-600">Performance:</span>
                          <span className="text-sm font-medium">{agent.performance}%</span>
                        </div>
                        <Progress value={agent.performance} className="h-2 w-32" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusIcon(agent.status)}
                    <Badge className={getStatusColor(agent.status)}>
                      {agent.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Dependencies Tab */}
        {activeTab === 'dependencies' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dependency Status</h2>
            {dependencies.map((dep: Dependency) => (
              <Card key={dep.name} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(dep.status)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{dep.name}</h3>
                      <p className="text-sm text-gray-600">
                        Current version: <span className="font-medium">{dep.version}</span>
                      </p>
                      {dep.requiredVersion && (
                        <p className="text-sm text-gray-600">
                          Required version: <span className="font-medium">{dep.requiredVersion}</span>
                        </p>
                      )}
                      <p className="text-sm text-gray-600">
                        Last update: {new Date(dep.lastUpdate).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(dep.status)}>
                      {dep.status.toUpperCase()}
                    </Badge>
                    <Badge className={getCriticalLevelColor(dep.criticalLevel)}>
                      {dep.criticalLevel.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Module Bonding Tab */}
        {activeTab === 'bonding' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Module Bonding Status</h2>
            {bondingReport ? (
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600">{bondingReport.totalModules}</div>
                      <p className="text-sm text-gray-600">Total Modules</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600">{bondingReport.healthyModules}</div>
                      <p className="text-sm text-gray-600">Healthy Modules</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-3xl font-bold text-red-600">{bondingReport.failedModules}</div>
                      <p className="text-sm text-gray-600">Failed Modules</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-3xl font-bold text-yellow-600">{bondingReport.fallbackModules}</div>
                      <p className="text-sm text-gray-600">Fallback Modules</p>
                    </div>
                  </div>
                </Card>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Module Status Details</h3>
                  {bondingReport.results.map((result: any, index: number) => (
                    <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {getStatusIcon(result.status)}
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{result.module}</h4>
                            <p className="text-sm text-gray-600">
                              Last checked: {new Date(result.timestamp).toLocaleString()}
                            </p>
                            {result.responseTime && (
                              <p className="text-sm text-green-600">Response time: {result.responseTime}ms</p>
                            )}
                            {result.error && (
                              <p className="text-sm text-red-600">Error: {result.error}</p>
                            )}
                            {result.retryCount && result.retryCount > 0 && (
                              <p className="text-sm text-yellow-600">Retries: {result.retryCount}</p>
                            )}
                          </div>
                        </div>
                        <Badge className={getStatusColor(result.status)}>
                          {result.status.toUpperCase()}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>

                {bondingReport?.recommendations?.length > 0 && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Bonding Recommendations</h3>
                    <div className="space-y-2">
                      {bondingReport?.recommendations?.map((rec: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <Cpu className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Bonding Report Available</h3>
                <p className="text-gray-600 mb-4">Run a recovery check to generate module bonding report</p>
                <Button onClick={runRecoveryCheck} disabled={isRunningCheck}>
                  Generate Bonding Report
                </Button>
              </Card>
            )}
          </div>
        )}

        {/* Components Tab */}
        {activeTab === 'components' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Component Registry</h2>
            {modularizerReport ? (
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-indigo-50 rounded-lg">
                      <div className="text-3xl font-bold text-indigo-600">{modularizerReport.totalComponents}</div>
                      <p className="text-sm text-gray-600">Total Components</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600">{modularizerReport.activeComponents}</div>
                      <p className="text-sm text-gray-600">Active Components</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-3xl font-bold text-orange-600">{modularizerReport.performanceIssues.length}</div>
                      <p className="text-sm text-gray-600">Performance Issues</p>
                    </div>
                  </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Components by Type</h3>
                    <div className="space-y-3">
                      {Object.entries(modularizerReport.componentsByType).map(([type, count]: [string, number]) => (
                        <div key={type} className="flex items-center justify-between">
                          <span className="capitalize font-medium">{type}</span>
                          <Badge variant="outline">{count}</Badge>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Components by Category</h3>
                    <div className="space-y-3">
                      {Object.entries(modularizerReport.componentsByCategory).map(([category, count]: [string, number]) => (
                        <div key={category} className="flex items-center justify-between">
                          <span className="capitalize font-medium">{category}</span>
                          <Badge variant="outline">{count}</Badge>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {modularizerReport.performanceIssues.length > 0 && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Issues</h3>
                    <div className="space-y-2">
                      {modularizerReport.performanceIssues.map((issue: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-orange-600" />
                          <span className="text-sm">{issue}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {modularizerReport.missingComponents.length > 0 && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Missing Components</h3>
                    <div className="space-y-2">
                      {modularizerReport.missingComponents.map((missing: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-600" />
                          <span className="text-sm">{missing}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {modularizerReport.recommendations.length > 0 && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Component Recommendations</h3>
                    <div className="space-y-2">
                      {modularizerReport.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Component Report Available</h3>
                <p className="text-gray-600 mb-4">Run a recovery check to scan and register all components</p>
                <Button onClick={runRecoveryCheck} disabled={isRunningCheck}>
                  Scan Components
                </Button>
              </Card>
            )}
          </div>
        )}

        {/* Component Cleaner Tab */}
        {activeTab === 'cleaner' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Component Cleaner Status</h2>
            {cleanupReport ? (
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600">{cleanupReport.totalComponents}</div>
                      <p className="text-sm text-gray-600">Total Components</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600">{cleanupReport.healthyComponents}</div>
                      <p className="text-sm text-gray-600">Healthy Components</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-3xl font-bold text-red-600">{cleanupReport.brokenComponents}</div>
                      <p className="text-sm text-gray-600">Broken Components</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-3xl font-bold text-yellow-600">{cleanupReport.repairedComponents}</div>
                      <p className="text-sm text-gray-600">Repaired Components</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600">{cleanupReport.performanceGain}%</div>
                      <p className="text-sm text-gray-600">Performance Gain</p>
                    </div>
                  </div>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Component Health Status</h3>
                    <div className="space-y-3">
                      {cleanupReport.results.slice(0, 10).map((component: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            {component.status === 'healthy' && <CheckCircle className="w-5 h-5 text-green-600" />}
                            {component.status === 'broken' && <XCircle className="w-5 h-5 text-red-600" />}
                            {component.status === 'recovered' && <RefreshCw className="w-5 h-5 text-yellow-600" />}
                            <div>
                              <h4 className="font-medium text-gray-900">{component.name}</h4>
                              <p className="text-sm text-gray-600">{component.issues.length} issues</p>
                            </div>
                          </div>
                          <Badge className={
                            component.status === 'healthy' ? 'bg-green-100 text-green-800' :
                            component.status === 'broken' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }>
                            {component.status.toUpperCase()}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    {cleanupReport.results.length > 10 && (
                      <p className="text-sm text-gray-600 mt-3">
                        And {cleanupReport.results.length - 10} more components...
                      </p>
                    )}
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Cleanup Actions Performed</h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {cleanupReport.cleanupActions.map((action: any, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{action}</span>
                        </div>
                      ))}
                    </div>
                    {cleanupReport.cleanupActions.length === 0 && (
                      <p className="text-sm text-gray-600 italic">No cleanup actions required - all components healthy!</p>
                    )}
                  </Card>
                </div>

                {cleanupReport.recommendations.length > 0 && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Cleanup Recommendations</h3>
                    <div className="space-y-2">
                      {cleanupReport.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Component Issues</h3>
                  <div className="space-y-4">
                    {cleanupReport.results.filter((c: any) => c.issues.length > 0).slice(0, 5).map((component: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{component.name}</h4>
                          <Badge className={getStatusColor(component.status)}>
                            {component.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600">Path: {component.path}</p>
                          <p className="text-sm text-gray-600">Last Checked: {new Date(component.lastChecked).toLocaleString()}</p>
                          {component.size && (
                            <p className="text-sm text-gray-600">Size: {component.size} bytes</p>
                          )}
                        </div>
                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-900 mb-1">Issues:</p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {component.issues.map((issue: any, idx: number) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="w-1 h-1 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                                {issue}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {component.repairActions.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-gray-900 mb-1">Repair Actions:</p>
                            <ul className="text-sm text-green-600 space-y-1">
                              {component.repairActions.map((action: any, idx: number) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                                  {action}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            ) : (
              <Card className="p-8 text-center">
                <Wrench className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Component Cleanup Report Available</h3>
                <p className="text-gray-600 mb-4">Run a recovery check to scan and clean broken components</p>
                <Button onClick={runRecoveryCheck} disabled={isRunningCheck}>
                  Run Component Cleaner
                </Button>
              </Card>
            )}
          </div>
        )}

        {/* Route Enforcer Tab */}
        {activeTab === 'routes' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Route Enforcer Status</h2>
            {routeReport ? (
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600">{routeReport.totalRoutes}</div>
                      <p className="text-sm text-gray-600">Total Routes</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600">{routeReport.validRoutes}</div>
                      <p className="text-sm text-gray-600">Valid Routes</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-3xl font-bold text-red-600">{routeReport.invalidRoutes}</div>
                      <p className="text-sm text-gray-600">Invalid Routes</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-3xl font-bold text-yellow-600">{routeReport.healedRoutes}</div>
                      <p className="text-sm text-gray-600">Healed Routes</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-3xl font-bold text-orange-600">{routeReport.securityScore}%</div>
                      <p className="text-sm text-gray-600">Security Score</p>
                    </div>
                  </div>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Health Status</h3>
                    <div className="space-y-3">
                      {routeReport.routeHealth.slice(0, 10).map((route: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            {route.status === 'valid' && <CheckCircle className="w-5 h-5 text-green-600" />}
                            {route.status === 'invalid' && <XCircle className="w-5 h-5 text-red-600" />}
                            {route.status === 'broken' && <AlertTriangle className="w-5 h-5 text-red-600" />}
                            {route.status === 'healed' && <RefreshCw className="w-5 h-5 text-yellow-600" />}
                            <div>
                              <h4 className="font-medium text-gray-900">{route.path}</h4>
                              <p className="text-sm text-gray-600">{route.accessCount} accesses • {route.errors.length} issues</p>
                            </div>
                          </div>
                          <Badge className={
                            route.status === 'valid' ? 'bg-green-100 text-green-800' :
                            route.status === 'invalid' || route.status === 'broken' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }>
                            {route.status.toUpperCase()}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    {routeReport.routeHealth.length > 10 && (
                      <p className="text-sm text-gray-600 mt-3">
                        And {routeReport.routeHealth.length - 10} more routes...
                      </p>
                    )}
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Average Response Time</span>
                        <span className="text-lg font-bold text-blue-600">{routeReport.performanceMetrics.averageResponseTime}ms</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Total Requests</span>
                        <span className="text-lg font-bold text-green-600">{routeReport.performanceMetrics.totalRequests}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Blocked Requests</span>
                        <span className="text-lg font-bold text-red-600">{routeReport.performanceMetrics.blockedRequests}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Healed Requests</span>
                        <span className="text-lg font-bold text-yellow-600">{routeReport.performanceMetrics.healedRequests}</span>
                      </div>
                    </div>
                  </Card>
                </div>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Enforcement Actions Performed</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {routeReport.enforcementActions.map((action: any, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{action}</span>
                      </div>
                    ))}
                  </div>
                  {routeReport.enforcementActions.length === 0 && (
                    <p className="text-sm text-gray-600 italic">No enforcement actions required - all routes healthy!</p>
                  )}
                </Card>

                {routeReport.recommendations.length > 0 && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Recommendations</h3>
                    <div className="space-y-2">
                      {routeReport.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Route Analysis</h3>
                  <div className="space-y-4">
                    {routeReport.routeHealth.filter((r: any) => r.errors.length > 0 || r.healingActions.length > 0).slice(0, 5).map((route: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{route.path}</h4>
                          <Badge className={getStatusColor(route.status)}>
                            {route.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600">Last Accessed: {new Date(route.lastAccessed).toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Access Count: {route.accessCount}</p>
                          {route.responseTime && (
                            <p className="text-sm text-gray-600">Response Time: {route.responseTime}ms</p>
                          )}
                          {route.redirectTarget && (
                            <p className="text-sm text-gray-600">Redirect Target: {route.redirectTarget}</p>
                          )}
                        </div>
                        {route.errors.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-gray-900 mb-1">Security Issues:</p>
                            <ul className="text-sm text-red-600 space-y-1">
                              {route.errors.map((error: any, idx: number) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="w-1 h-1 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                                  {error}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {route.healingActions.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-gray-900 mb-1">Enforcement Actions:</p>
                            <ul className="text-sm text-green-600 space-y-1">
                              {route.healingActions.map((action: any, idx: number) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                                  {action}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            ) : (
              <Card className="p-8 text-center">
                <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Route Enforcement Report Available</h3>
                <p className="text-gray-600 mb-4">Run a recovery check to scan and secure application routes</p>
                <Button onClick={runRecoveryCheck} disabled={isRunningCheck}>
                  Run Route Enforcer
                </Button>
              </Card>
            )}
          </div>
        )}

        {/* Dependency Patcher Tab */}
        {activeTab === 'patcher' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dependency Patcher Status</h2>
            {dependencyReport ? (
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600">{dependencyReport.totalDependencies}</div>
                      <p className="text-sm text-gray-600">Total Dependencies</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600">{dependencyReport.verifiedDependencies}</div>
                      <p className="text-sm text-gray-600">Verified</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-3xl font-bold text-yellow-600">{dependencyReport.patchedDependencies}</div>
                      <p className="text-sm text-gray-600">Patched</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600">{dependencyReport.updatedDependencies}</div>
                      <p className="text-sm text-gray-600">Updated</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-3xl font-bold text-red-600">{dependencyReport.failedDependencies}</div>
                      <p className="text-sm text-gray-600">Failed</p>
                    </div>
                    <div className="text-center p-4 bg-emerald-50 rounded-lg">
                      <div className="text-3xl font-bold text-emerald-600">{dependencyReport.overallCompatibility}%</div>
                      <p className="text-sm text-gray-600">Compatibility</p>
                    </div>
                  </div>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Dependency Status</h3>
                    <div className="space-y-3">
                      {dependencyReport.results.slice(0, 10).map((result: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            {result.status === 'verified' && <CheckCircle className="w-5 h-5 text-green-600" />}
                            {result.status === 'patched' && <Wrench className="w-5 h-5 text-yellow-600" />}
                            {result.status === 'updated' && <RefreshCw className="w-5 h-5 text-purple-600" />}
                            {result.status === 'failed' && <XCircle className="w-5 h-5 text-red-600" />}
                            {result.status === 'skipped' && <AlertTriangle className="w-5 h-5 text-orange-600" />}
                            <div>
                              <h4 className="font-medium text-gray-900">{result.dependency}</h4>
                              <p className="text-sm text-gray-600">
                                v{result.version} {result.newVersion && `→ v${result.newVersion}`} • {result.duration}ms • {result.compatibilityScore}% compatible
                              </p>
                            </div>
                          </div>
                          <Badge className={
                            result.status === 'verified' ? 'bg-green-100 text-green-800' :
                            result.status === 'patched' ? 'bg-yellow-100 text-yellow-800' :
                            result.status === 'updated' ? 'bg-purple-100 text-purple-800' :
                            result.status === 'failed' ? 'bg-red-100 text-red-800' :
                            'bg-orange-100 text-orange-800'
                          }>
                            {result.status.toUpperCase()}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    {dependencyReport.results.length > 10 && (
                      <p className="text-sm text-gray-600 mt-3">
                        And {dependencyReport.results.length - 10} more dependencies...
                      </p>
                    )}
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health Metrics</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Core Stability</span>
                        <span className="text-lg font-bold text-blue-600">{dependencyReport.systemHealth.coreStability}%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">API Connectivity</span>
                        <span className="text-lg font-bold text-green-600">{dependencyReport.systemHealth.apiConnectivity}%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Bridge Integrity</span>
                        <span className="text-lg font-bold text-purple-600">{dependencyReport.systemHealth.bridgeIntegrity}%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Security Score</span>
                        <span className="text-lg font-bold text-red-600">{dependencyReport.systemHealth.securityScore}%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Performance Impact</span>
                        <span className="text-lg font-bold text-yellow-600">{dependencyReport.systemHealth.performanceImpact}%</span>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Enterprise Dependencies</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-1">OpenAI v4.0.1</h4>
                        <p className="text-sm text-blue-700">AI integration for business intelligence</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-1">BubbleAPI v2.3.0</h4>
                        <p className="text-sm text-green-700">No-code platform workflow automation</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <h4 className="font-medium text-purple-800 mb-1">FigmaMakeBridge v1.1.2</h4>
                        <p className="text-sm text-purple-700">Design-to-code automation bridge</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-1">React v18.2.0</h4>
                        <p className="text-sm text-gray-700">Core UI framework</p>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <h4 className="font-medium text-orange-800 mb-1">TypeScript v5.2.0</h4>
                        <p className="text-sm text-orange-700">Type-safe development</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Patch Actions Performed</h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {dependencyReport.patchActions.map((action: any, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <Package className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{action}</span>
                        </div>
                      ))}
                    </div>
                    {dependencyReport.patchActions.length === 0 && (
                      <p className="text-sm text-gray-600 italic">No patch actions required - all dependencies stable!</p>
                    )}
                  </Card>
                </div>

                {dependencyReport.criticalIssues.length > 0 && (
                  <Card className="p-6 border-l-4 border-red-500">
                    <h3 className="text-lg font-semibold text-red-900 mb-4">Critical Issues</h3>
                    <div className="space-y-2">
                      {dependencyReport.criticalIssues.map((issue: any, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-red-700">{issue}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {dependencyReport.recommendations.length > 0 && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Recommendations</h3>
                    <div className="space-y-2">
                      {dependencyReport.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{rec}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <strong>Next Maintenance:</strong> {new Date(dependencyReport.nextMaintenanceDate).toLocaleDateString()}
                      </p>
                    </div>
                  </Card>
                )}

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Dependency Details</h3>
                  <div className="space-y-4">
                    {dependencyReport.results.filter((r: any) => r.errors.length > 0 || r.patchActions.length > 0).slice(0, 5).map((result: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{result.dependency}</h4>
                          <div className="flex items-center gap-2">
                            <Badge className={`text-xs ${
                              result.compatibilityScore >= 90 ? 'bg-green-100 text-green-800' :
                              result.compatibilityScore >= 70 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {result.compatibilityScore}% Compatible
                            </Badge>
                            <Badge className={getStatusColor(result.status)}>
                              {result.status.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600">Version: {result.version} {result.newVersion && `→ ${result.newVersion}`}</p>
                          <p className="text-sm text-gray-600">Duration: {result.duration}ms</p>
                          <p className="text-sm text-gray-600">Timestamp: {new Date(result.timestamp).toLocaleString()}</p>
                        </div>
                        {result.errors.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-gray-900 mb-1">Errors:</p>
                            <ul className="text-sm text-red-600 space-y-1">
                              {result.errors.map((error: any, idx: number) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="w-1 h-1 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                                  {error}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {result.patchActions.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-gray-900 mb-1">Patch Actions:</p>
                            <ul className="text-sm text-green-600 space-y-1">
                              {result.patchActions.slice(-3).map((action: any, idx: number) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                                  {action}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            ) : (
              <Card className="p-8 text-center">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Dependency Report Available</h3>
                <p className="text-gray-600 mb-4">Run a recovery check to patch all enterprise dependencies</p>
                <Button onClick={runRecoveryCheck} disabled={isRunningCheck}>
                  Run Dependency Patcher
                </Button>
              </Card>
            )}
          </div>
        )}

        {/* Recovery Summary Module Tab */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recovery Summary Module</h2>
            {recoveryReport ? (
              <div className="space-y-6">
                {/* Executive Summary Card */}
                <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Monitor className="w-8 h-8 text-blue-600" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Executive Summary</h3>
                        <p className="text-sm text-gray-600">Report ID: {recoveryReport.reportId}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600">{recoveryReport.overallSystemHealth}%</div>
                      <p className="text-sm text-gray-600 capitalize">{recoveryReport.systemStatus}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">{recoveryReport.executiveSummary}</p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-green-600">{recoveryReport.enforcersActive}</div>
                      <p className="text-xs text-gray-600">Active Enforcers</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-blue-600">{recoveryReport.healthyFunctions.length}</div>
                      <p className="text-xs text-gray-600">Healthy Functions</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-purple-600">{recoveryReport.bondedAgents}</div>
                      <p className="text-xs text-gray-600">Bonded Agents</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-orange-600">{(recoveryReport.actionPriority || '').toUpperCase()}</div>
                      <p className="text-xs text-gray-600">Priority</p>
                    </div>
                  </div>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Backend Enforcers Status */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Backend Enforcers Status</h3>
                    <div className="space-y-3">
                      {Object.entries(recoveryReport.enforcerStatus).map(([enforcer, status]: [string, boolean]) => (
                        <div key={enforcer} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-900 capitalize">
                            {enforcer.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          {status ? (
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                              <span className="text-green-600 font-medium">Active</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <XCircle className="w-5 h-5 text-red-600" />
                              <span className="text-red-600 font-medium">Inactive</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Performance Metrics */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Avg Response Time</span>
                        <span className="font-bold text-blue-600">{recoveryReport.performanceMetrics.avgResponseTime}ms</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">System Latency</span>
                        <span className="font-bold text-blue-600">{recoveryReport.performanceMetrics.systemLatency}ms</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Error Rate</span>
                        <span className="font-bold text-green-600">{(recoveryReport.performanceMetrics.errorRate * 100).toFixed(2)}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Throughput</span>
                        <span className="font-bold text-purple-600">{recoveryReport.performanceMetrics.throughput}/min</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Memory Usage</span>
                        <span className="font-bold text-orange-600">{recoveryReport.performanceMetrics.memoryUsage}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">CPU Usage</span>
                        <span className="font-bold text-orange-600">{recoveryReport.performanceMetrics.cpuUsage}%</span>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Critical Issues */}
                  {recoveryReport?.criticalIssues?.length > 0 && (
                    <Card className="p-6 border-l-4 border-red-500">
                      <h3 className="text-lg font-semibold text-red-900 mb-4">Critical Issues</h3>
                      <div className="space-y-2">
                        {recoveryReport.criticalIssues.map((issue: string, index: number) => (
                          <div key={index} className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-red-700">{issue}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* Recovery Actions */}
                  {recoveryReport?.recoveryActions?.length > 0 && (
                    <Card className="p-6 border-l-4 border-green-500">
                      <h3 className="text-lg font-semibold text-green-900 mb-4">Recovery Actions</h3>
                      <div className="space-y-2">
                        {recoveryReport?.recoveryActions?.map((action: string, index: number) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-green-700">{action}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </div>

                {/* Module Health Analysis */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Module Health Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recoveryReport?.moduleHealth?.map((module: any, index: number) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{module.name}</h4>
                          <div className="flex items-center gap-2">
                            {module.status === 'healthy' && <CheckCircle className="w-5 h-5 text-green-600" />}
                            {module.status === 'degraded' && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
                            {module.status === 'failed' && <XCircle className="w-5 h-5 text-red-600" />}
                            {module.status === 'recovering' && <RefreshCw className="w-5 h-5 text-blue-600" />}
                            <Badge className={
                              module.status === 'healthy' ? 'bg-green-100 text-green-800' :
                              module.status === 'degraded' ? 'bg-yellow-100 text-yellow-800' :
                              module.status === 'failed' ? 'bg-red-100 text-red-800' :
                              'bg-blue-100 text-blue-800'
                            }>
                              {module.status.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600">Type: {module.type}</p>
                          <p className="text-sm text-gray-600">Health Score: {module.healthScore}%</p>
                          <p className="text-sm text-gray-600">Last Check: {new Date(module.lastCheck).toLocaleString()}</p>
                        </div>
                        {module.issues.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-gray-900 mb-1">Issues:</p>
                            <ul className="text-sm text-red-600 space-y-1">
                              {module.issues.map((issue: any, idx: number) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="w-1 h-1 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                                  {issue}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>

                {/* AI Agent Bonding Status */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Agent Bonding Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recoveryReport.agentBondingStatus.map((agent: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{agent.name}</h4>
                          <p className="text-sm text-gray-600">ID: {agent.id}</p>
                          <p className="text-sm text-gray-600">Bonded to: {agent.bondedTo}</p>
                          <div className="mt-2">
                            <p className="text-xs text-gray-500">Bond Strength: {agent.bondStrength ?? 0}%</p>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div 
                                className={`h-2 rounded-full transition-all ${
                                  (agent.bondStrength ?? 0) >= 80 ? 'bg-green-500' :
                                  (agent.bondStrength ?? 0) >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${agent.bondStrength ?? 0}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <Badge className={
                          agent.status === 'bonded' ? 'bg-green-100 text-green-800' :
                          agent.status === 'fallback' ? 'bg-yellow-100 text-yellow-800' :
                          agent.status === 'unbonded' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {(agent.status ?? '').toString().toUpperCase()}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Recommendations */}
                {recoveryReport.recommendations.length > 0 && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
                    <div className="space-y-2">
                      {recoveryReport.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{rec}</span>
                        </div>
                      ))}
                    </div>
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <strong>Next Maintenance:</strong> {new Date(recoveryReport?.nextMaintenanceDate ?? Date.now()).toLocaleDateString()} - 
                        <strong> Confidence Score:</strong> {recoveryReport?.confidenceScore ?? 0}%
                      </p>
                    </div>
                  </Card>
                )}

                {/* Recovery Statistics */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recovery Statistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{recoveryReport?.recoveryStats?.totalRecoveries ?? 0}</div>
                      <p className="text-xs text-gray-600">Total Recoveries</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{recoveryReport?.recoveryStats?.successfulRecoveries ?? 0}</div>
                      <p className="text-xs text-gray-600">Successful</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{recoveryReport?.recoveryStats?.failedRecoveries ?? 0}</div>
                      <p className="text-xs text-gray-600">Failed</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{recoveryReport?.recoveryStats?.averageRecoveryTime ?? 0}min</div>
                      <p className="text-xs text-gray-600">Avg Time</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-600">{recoveryReport.uptime}</div>
                      <p className="text-xs text-gray-600">Uptime</p>
                    </div>
                  </div>
                </Card>
              </div>
            ) : (
              <Card className="p-8 text-center">
                <Monitor className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Recovery Report Available</h3>
                <p className="text-gray-600 mb-4">Run a recovery check to generate comprehensive system summary</p>
                <Button onClick={runRecoveryCheck} disabled={isRunningCheck}>
                  Generate Recovery Summary
                </Button>
              </Card>
            )}
          </div>
        )}

        {/* Backend Function Validator Tab */}
        {activeTab === 'validator' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Backend Function Validator Status</h2>
            {validationReport ? (
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600">{validationReport.totalFunctions}</div>
                      <p className="text-sm text-gray-600">Total Functions</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600">{validationReport.healthyFunctions}</div>
                      <p className="text-sm text-gray-600">Healthy Functions</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-3xl font-bold text-red-600">{validationReport.brokenFunctions}</div>
                      <p className="text-sm text-gray-600">Broken Functions</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-3xl font-bold text-yellow-600">{validationReport.repairedFunctions}</div>
                      <p className="text-sm text-gray-600">Repaired Functions</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600">{validationReport.systemHealth.overallScore}%</div>
                      <p className="text-sm text-gray-600">System Health</p>
                    </div>
                  </div>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Function Health Status</h3>
                    <div className="space-y-3">
                      {validationReport.functionHealth.slice(0, 10).map((func: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            {func.status === 'healthy' && <CheckCircle className="w-5 h-5 text-green-600" />}
                            {func.status === 'broken' && <XCircle className="w-5 h-5 text-red-600" />}
                            {func.status === 'patched' && <RefreshCw className="w-5 h-5 text-yellow-600" />}
                            {func.status === 'warning' && <AlertTriangle className="w-5 h-5 text-orange-600" />}
                            {func.status === 'repairing' && <Wrench className="w-5 h-5 text-blue-600" />}
                            <div>
                              <h4 className="font-medium text-gray-900">{func.fnName}</h4>
                              <p className="text-sm text-gray-600">
                                {func.responseTime}ms • {func.uptime}% uptime • {func.checkCount} checks
                              </p>
                            </div>
                          </div>
                          <Badge className={
                            func.status === 'healthy' ? 'bg-green-100 text-green-800' :
                            func.status === 'broken' ? 'bg-red-100 text-red-800' :
                            func.status === 'patched' ? 'bg-yellow-100 text-yellow-800' :
                            func.status === 'warning' ? 'bg-orange-100 text-orange-800' :
                            'bg-blue-100 text-blue-800'
                          }>
                            {func.status.toUpperCase()}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    {validationReport.functionHealth.length > 10 && (
                      <p className="text-sm text-gray-600 mt-3">
                        And {validationReport.functionHealth.length - 10} more functions...
                      </p>
                    )}
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">System Performance</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Overall Health Score</span>
                        <span className="text-lg font-bold text-purple-600">{validationReport.systemHealth.overallScore}%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">System Uptime</span>
                        <span className="text-lg font-bold text-blue-600">{validationReport.systemHealth.uptime}%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Average Response Time</span>
                        <span className="text-lg font-bold text-green-600">{validationReport.systemHealth.averageResponseTime}ms</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Success Rate</span>
                        <span className="text-lg font-bold text-yellow-600">{validationReport.systemHealth.successRate}%</span>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-1">Fastest Function</h4>
                        <p className="text-sm text-green-700">{validationReport.performanceMetrics.fastestFunction}</p>
                      </div>
                      <div className="p-3 bg-red-50 rounded-lg">
                        <h4 className="font-medium text-red-800 mb-1">Slowest Function</h4>
                        <p className="text-sm text-red-700">{validationReport.performanceMetrics.slowestFunction}</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-1">Most Reliable</h4>
                        <p className="text-sm text-blue-700">{validationReport.performanceMetrics.mostReliable}</p>
                      </div>
                      {validationReport.performanceMetrics.needsAttention.length > 0 && (
                        <div className="p-3 bg-orange-50 rounded-lg">
                          <h4 className="font-medium text-orange-800 mb-1">Needs Attention</h4>
                          <p className="text-sm text-orange-700">
                            {validationReport.performanceMetrics.needsAttention.join(', ')}
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Repair Actions Performed</h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {validationReport.repairActions.map((action: any, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <Settings className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{action}</span>
                        </div>
                      ))}
                    </div>
                    {validationReport.repairActions.length === 0 && (
                      <p className="text-sm text-gray-600 italic">No repair actions required - all functions healthy!</p>
                    )}
                  </Card>
                </div>

                {validationReport.criticalIssues.length > 0 && (
                  <Card className="p-6 border-l-4 border-red-500">
                    <h3 className="text-lg font-semibold text-red-900 mb-4">Critical Issues</h3>
                    <div className="space-y-2">
                      {validationReport.criticalIssues.map((issue: any, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-red-700">{issue}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {validationReport.recommendations.length > 0 && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">System Recommendations</h3>
                    <div className="space-y-2">
                      {validationReport.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Function Analysis</h3>
                  <div className="space-y-4">
                    {validationReport.functionHealth.filter((f: any) => f.errors.length > 0 || f.repairActions.length > 0).slice(0, 5).map((func: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{func.fnName}</h4>
                          <div className="flex items-center gap-2">
                            <Badge className={`text-xs ${
                              func.criticalLevel === 'critical' ? 'bg-red-100 text-red-800' :
                              func.criticalLevel === 'high' ? 'bg-orange-100 text-orange-800' :
                              func.criticalLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {func.criticalLevel.toUpperCase()}
                            </Badge>
                            <Badge className={getStatusColor(func.status)}>
                              {func.status.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600">Last Checked: {new Date(func.lastChecked).toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Check Count: {func.checkCount}</p>
                          <p className="text-sm text-gray-600">Response Time: {func.responseTime}ms</p>
                          <p className="text-sm text-gray-600">Uptime: {func.uptime}%</p>
                          {func.dependencies.length > 0 && (
                            <p className="text-sm text-gray-600">Dependencies: {func.dependencies.join(', ')}</p>
                          )}
                        </div>
                        {func.errors.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-gray-900 mb-1">Function Errors:</p>
                            <ul className="text-sm text-red-600 space-y-1">
                              {func.errors.map((error: any, idx: number) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="w-1 h-1 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                                  {error}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {func.repairActions.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-gray-900 mb-1">Repair Actions:</p>
                            <ul className="text-sm text-green-600 space-y-1">
                              {func.repairActions.slice(-3).map((action: any, idx: number) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                                  {action}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            ) : (
              <Card className="p-8 text-center">
                <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Function Validation Report Available</h3>
                <p className="text-gray-600 mb-4">Run a recovery check to validate all backend functions</p>
                <Button onClick={runRecoveryCheck} disabled={isRunningCheck}>
                  Run Function Validator
                </Button>
              </Card>
            )}
          </div>
        )}

        {/* Recovery Report Tab */}
        {activeTab === 'report' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recovery Report</h2>
            {lastReport ? (
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600">{lastReport.overallHealth}%</div>
                      <p className="text-sm text-gray-600">Overall System Health</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-3xl font-bold text-red-600">{lastReport.criticalIssues}</div>
                      <p className="text-sm text-gray-600">Critical Issues</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-3xl font-bold text-yellow-600">{lastReport.warnings}</div>
                      <p className="text-sm text-gray-600">Warnings</p>
                    </div>
                  </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Healthy Functions</h3>
                    <div className="space-y-2">
                      {lastReport.healthyFunctions.map((fn: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{fn}</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Repaired Functions</h3>
                    <div className="space-y-2">
                      {lastReport.repairedFunctions.map((fn: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <Wrench className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm">{fn}</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Agent Bonding Status</h3>
                    <div className="space-y-2">
                      {lastReport.agentBondingStatus.map((agent: any, index: number) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{agent.id}</span>
                          <Badge className={getStatusColor(agent.status)}>
                            {agent.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Patched Dependencies</h3>
                    <div className="space-y-2">
                      {lastReport.dependenciesPatched.map((dep: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{dep}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Details</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Timestamp:</span> {new Date(lastReport.timestamp).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Recovery Check:</span> Completed successfully
                    </p>
                  </div>
                </Card>
              </div>
            ) : (
              <Card className="p-8 text-center">
                <Bug className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Recovery Report Available</h3>
                <p className="text-gray-600 mb-4">Run a recovery check to generate a comprehensive system report</p>
                <Button onClick={runRecoveryCheck} disabled={isRunningCheck}>
                  Generate Report
                </Button>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecoveryCheckAgentBonding;