/**
 * MaycoleTracker™ vol. XI - Conditional Agent Canvas System
 * Repeating Group / Canvas / Agent Block with Visibility Controls
 * Only renders when isVisible === "yes"
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  debounceRender, 
  MaycoleRenderUtils, 
  globalRenderMonitor,
  globalRenderQueue
} from '../utils/renderingOptimization';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Bot, 
  Brain, 
  Activity, 
  TrendingUp, 
  Eye, 
  EyeOff,
  Zap,
  Settings,
  BarChart3,
  Target,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Users,
  DollarSign,
  Clock,
  Star
} from 'lucide-react';

// Agent Block Data Interface
interface AgentBlock {
  id: string;
  title: string;
  type: 'analytics' | 'automation' | 'intelligence' | 'reporting' | 'monitoring';
  status: 'active' | 'idle' | 'processing' | 'error';
  progress: number;
  metrics: {
    value: string;
    change: string;
    trend: 'up' | 'down' | 'stable';
  };
  description: string;
  icon: React.ComponentType<any>;
  isVisible: 'yes' | 'no';
  agentBonded: 'yes' | 'no'; // NEW: Agent bonding status
  priority: 'high' | 'medium' | 'low';
  lastUpdated: Date;
  groupId?: string; // NEW: Group identifier for bonded agents
}

// Agent Group Interface - NEW
interface AgentGroup {
  id: string;
  name: string;
  description: string;
  agents: AgentBlock[];
  isVisible: 'yes' | 'no';
  bondingStatus: 'active' | 'pending' | 'complete';
  groupMetrics: {
    totalAgents: number;
    bondedAgents: number;
    efficiency: number;
    lastSync: Date;
  };
}

// Mock Agent Data with Bonding Status
const mockAgentBlocks: AgentBlock[] = [
  {
    id: 'agent-001',
    title: 'Business Analytics Agent',
    type: 'analytics',
    status: 'active',
    progress: 87,
    metrics: {
      value: '$45,230',
      change: '+12.5%',
      trend: 'up'
    },
    description: 'Analyzing revenue trends and profit margins',
    icon: BarChart3,
    isVisible: 'yes',
    agentBonded: 'yes', // NEW: This agent is bonded
    priority: 'high',
    lastUpdated: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    groupId: 'group-analytics'
  },
  {
    id: 'agent-002',
    title: 'Inventory Intelligence',
    type: 'intelligence',
    status: 'processing',
    progress: 64,
    metrics: {
      value: '1,247',
      change: '+8.3%',
      trend: 'up'
    },
    description: 'Optimizing stock levels and reorder points',
    icon: Brain,
    isVisible: 'yes',
    agentBonded: 'yes', // NEW: This agent is bonded
    priority: 'medium',
    lastUpdated: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    groupId: 'group-analytics'
  },
  {
    id: 'agent-003',
    title: 'Performance Monitor',
    type: 'monitoring',
    status: 'active',
    progress: 92,
    metrics: {
      value: '99.7%',
      change: '+0.2%',
      trend: 'stable'
    },
    description: 'Monitoring system performance and uptime',
    icon: Activity,
    isVisible: 'no', // This won't be shown
    agentBonded: 'no', // Not bonded
    priority: 'high',
    lastUpdated: new Date(Date.now() - 1 * 60 * 1000) // 1 minute ago
  },
  {
    id: 'agent-004',
    title: 'Customer Insights',
    type: 'analytics',
    status: 'idle',
    progress: 34,
    metrics: {
      value: '4.8★',
      change: '+0.3★',
      trend: 'up'
    },
    description: 'Analyzing customer satisfaction and feedback',
    icon: Users,
    isVisible: 'yes',
    agentBonded: 'no', // Not bonded - won't show in groups
    priority: 'medium',
    lastUpdated: new Date(Date.now() - 10 * 60 * 1000) // 10 minutes ago
  },
  {
    id: 'agent-005',
    title: 'Revenue Automation',
    type: 'automation',
    status: 'processing',
    progress: 78,
    metrics: {
      value: '$8,420',
      change: '+15.2%',
      trend: 'up'
    },
    description: 'Automating billing and payment processes',
    icon: DollarSign,
    isVisible: 'yes',
    agentBonded: 'yes', // Bonded - will show in groups
    priority: 'high',
    lastUpdated: new Date(Date.now() - 3 * 60 * 1000), // 3 minutes ago
    groupId: 'group-automation'
  }
];

// Mock Agent Groups Data - NEW
const mockAgentGroups: AgentGroup[] = [
  {
    id: 'group-analytics',
    name: 'Analytics Intelligence Hub',
    description: 'Bonded agents specializing in business analytics and insights',
    agents: [],
    isVisible: 'yes',
    bondingStatus: 'complete',
    groupMetrics: {
      totalAgents: 2,
      bondedAgents: 2,
      efficiency: 87.5,
      lastSync: new Date(Date.now() - 2 * 60 * 1000)
    }
  },
  {
    id: 'group-automation',
    name: 'Automation Command Center',
    description: 'Bonded agents handling automated processes and workflows',
    agents: [],
    isVisible: 'yes',
    bondingStatus: 'active',
    groupMetrics: {
      totalAgents: 1,
      bondedAgents: 1,
      efficiency: 78.0,
      lastSync: new Date(Date.now() - 1 * 60 * 1000)
    }
  }
];

// Agent Block Component
const AgentBlockCard: React.FC<{ 
  agent: AgentBlock; 
  onToggleVisibility: (id: string) => void;
  onViewDetails: (id: string) => void;
}> = ({ agent, onToggleVisibility, onViewDetails }) => {
  const Icon = agent.icon;
  
  const getStatusColor = () => {
    switch (agent.status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'processing': return 'text-blue-600 bg-blue-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = () => {
    switch (agent.priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const getTrendIcon = () => {
    if (agent.metrics.trend === 'up') return <TrendingUp className="w-3 h-3 text-green-600" />;
    if (agent.metrics.trend === 'down') return <TrendingUp className="w-3 h-3 text-red-600 rotate-180" />;
    return <div className="w-3 h-3 bg-gray-400 rounded-full" />;
  };

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 minute ago';
    return `${minutes} minutes ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4" 
            style={{ borderLeftColor: agent.priority === 'high' ? '#ef4444' : agent.priority === 'medium' ? '#f59e0b' : '#10b981' }}>
        
        {/* Priority Indicator */}
        <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${getPriorityColor()}`} />
        
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-50">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold text-gray-900">
                  {agent.title}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`text-xs ${getStatusColor()}`}>
                    {agent.status}
                  </Badge>
                  {/* NEW: Agent Bonding Status Badge */}
                  {agent.agentBonded === 'yes' ? (
                    <Badge className="text-xs bg-blue-100 text-blue-800 border border-blue-200">
                      <Users className="w-3 h-3 mr-1" />
                      Bonded
                    </Badge>
                  ) : (
                    <Badge className="text-xs bg-gray-100 text-gray-700 border border-gray-200">
                      Individual
                    </Badge>
                  )}
                  <span className="text-xs text-gray-500">
                    {formatTimeAgo(agent.lastUpdated)}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Visibility Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleVisibility(agent.id)}
              className="p-1 h-6 w-6"
            >
              {agent.isVisible === 'yes' ? (
                <Eye className="w-4 h-4 text-green-600" />
              ) : (
                <EyeOff className="w-4 h-4 text-gray-400" />
              )}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Description */}
          <CardDescription className="text-sm text-gray-600">
            {agent.description}
          </CardDescription>

          {/* Metrics */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
                {agent.metrics.value}
              </span>
              <div className="flex items-center gap-1">
                {getTrendIcon()}
                <span className={`text-xs font-medium ${
                  agent.metrics.trend === 'up' ? 'text-green-600' : 
                  agent.metrics.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {agent.metrics.change}
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-xs text-gray-500">Progress</div>
              <div className="text-sm font-semibold text-gray-900">{agent.progress}%</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress 
              value={agent.progress} 
              className="h-2"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Processing...</span>
              <span>{agent.progress}% Complete</span>
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={() => onViewDetails(agent.id)}
            className="w-full btn-primary flex items-center justify-center gap-2"
            size="sm"
          >
            <span>View Details</span>
            <ArrowRight className="w-3 h-3" />
          </Button>
        </CardContent>

        {/* Processing Animation Overlay */}
        {agent.status === 'processing' && (
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-100 overflow-hidden">
            <div className="h-full bg-blue-500 animate-pulse" style={{ width: `${agent.progress}%` }} />
          </div>
        )}
      </Card>
    </motion.div>
  );
};

// NEW: Agent Group Component - Shows when agentBonded is "yes"
const AgentGroupCard: React.FC<{
  group: AgentGroup;
  onViewGroup: (id: string) => void;
}> = ({ group, onViewGroup }) => {
  const getBondingStatusColor = () => {
    switch (group.bondingStatus) {
      case 'complete': return 'text-green-600 bg-green-50';
      case 'active': return 'text-blue-600 bg-blue-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        
        {/* Group Header */}
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 relative">
                <Users className="w-6 h-6 text-blue-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  {group.name}
                  <Badge className="text-xs bg-blue-100 text-blue-800 border border-blue-200">
                    GROUP
                  </Badge>
                </CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`text-xs ${getBondingStatusColor()}`}>
                    {group.bondingStatus}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {group.agents.length} bonded agents
                  </span>
                </div>
              </div>
            </div>
            
            {/* Group Efficiency */}
            <div className="text-right">
              <div className="text-lg font-bold text-blue-600">
                {group.groupMetrics.efficiency.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-500">Efficiency</div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Group Description */}
          <CardDescription className="text-sm text-gray-600">
            {group.description}
          </CardDescription>

          {/* Group Metrics */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-white rounded-lg border">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">{group.groupMetrics.bondedAgents}</div>
              <div className="text-xs text-gray-500">Bonded</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{group.groupMetrics.totalAgents}</div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">
                {Math.round((Date.now() - group.groupMetrics.lastSync.getTime()) / (1000 * 60))}m
              </div>
              <div className="text-xs text-gray-500">Last Sync</div>
            </div>
          </div>

          {/* Bonded Agents Preview */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700 mb-2">Bonded Agents:</div>
            <div className="grid grid-cols-1 gap-2">
              {group.agents.map((agent) => {
                const Icon = agent.icon;
                return (
                  <div key={agent.id} className="flex items-center justify-between p-2 bg-white rounded border">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">{agent.title}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge className={`text-xs ${agent.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {agent.status}
                      </Badge>
                      <div className="text-xs text-gray-500">{agent.progress}%</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* View Group Button */}
          <Button 
            onClick={() => onViewGroup(group.id)}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Manage Group
            <ArrowRight className="w-4 h-4" />
          </Button>
        </CardContent>

        {/* Group Progress Indicator */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-blue-100 overflow-hidden">
          <div className="h-full bg-blue-500" style={{ width: `${group.groupMetrics.efficiency}%` }} />
        </div>
      </Card>
    </motion.div>
  );
};

// Control Panel Component
const AgentControlPanel: React.FC<{
  totalAgents: number;
  visibleAgents: number;
  bondedAgents: number;
  groups: number;
  onToggleAll: () => void;
  onRefresh: () => void;
}> = ({ totalAgents, visibleAgents, bondedAgents, groups, onToggleAll, onRefresh }) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">Agent Canvas</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Total: {totalAgents}</span>
              <span>Visible: {visibleAgents}</span>
              <span>Bonded: {bondedAgents}</span>
              <span>Groups: {groups}</span>
              <span>Hidden: {totalAgents - visibleAgents}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              className="flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleAll}
              className="flex items-center gap-2"
            >
              {visibleAgents === totalAgents ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {visibleAgents === totalAgents ? 'Hide All' : 'Show All'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Conditional Agent Canvas Component
export const ConditionalAgentCanvas: React.FC<{ 
  className?: string;
  showControls?: boolean;
}> = ({ className = '', showControls = true }) => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState<AgentBlock[]>(mockAgentBlocks);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [isRendering, setIsRendering] = useState(false);

  // Optimized debounced rendering functions
  const debouncedRenderAgents = useCallback(
    debounceRender(() => {
      const renderStart = globalRenderMonitor.startRender();
      setIsRendering(true);
      
      // Simulate agent canvas rendering
      globalRenderQueue.add(() => {
        console.log("✅ Agents rendered with debounce optimization");
        setIsRendering(false);
        globalRenderMonitor.endRender(renderStart, 'ConditionalAgentCanvas');
      });
    }, 150),
    []
  );

  const debouncedRefreshAgents = useCallback(
    debounceRender(() => {
      handleRefresh();
    }, 200),
    []
  );

  // Filter visible agents (Only When: [isVisible] is "yes")
  const visibleAgents = useMemo(() => 
    agents.filter(agent => agent.isVisible === 'yes'),
    [agents]
  );

  // NEW: Filter bonded agents (Only When: [agentBonded] is \"yes\")
  const bondedAgents = useMemo(() => 
    visibleAgents.filter(agent => agent.agentBonded === 'yes'),
    [visibleAgents]
  );

  // NEW: Group bonded agents by groupId
  const agentGroups = useMemo(() => {
    const groups = new Map<string, AgentBlock[]>();
    
    bondedAgents.forEach(agent => {
      if (agent.groupId) {
        if (!groups.has(agent.groupId)) {
          groups.set(agent.groupId, []);
        }
        groups.get(agent.groupId)!.push(agent);
      }
    });
    
    return mockAgentGroups.map(group => ({
      ...group,
      agents: groups.get(group.id) || []
    })).filter(group => group.isVisible === 'yes' && group.agents.length > 0);
  }, [bondedAgents]);

  // Individual agents (visible but not bonded)
  const individualAgents = useMemo(() => 
    visibleAgents.filter(agent => agent.agentBonded === 'no'),
    [visibleAgents]
  );

  // Toggle individual agent visibility with debounced rendering
  const handleToggleVisibility = useCallback((agentId: string) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, isVisible: agent.isVisible === 'yes' ? 'no' : 'yes' }
        : agent
    ));
    
    // Trigger debounced re-render
    debouncedRenderAgents();
  }, [debouncedRenderAgents]);

  // Toggle all agents visibility with debounced rendering
  const handleToggleAll = useCallback(() => {
    const allVisible = visibleAgents.length === agents.length;
    setAgents(prev => prev.map(agent => ({
      ...agent,
      isVisible: allVisible ? 'no' : 'yes'
    })));
    
    // Trigger debounced re-render
    debouncedRenderAgents();
  }, [visibleAgents.length, agents.length, debouncedRenderAgents]);

  // Refresh agent data with performance monitoring
  const handleRefresh = useCallback(() => {
    const renderStart = globalRenderMonitor.startRender();
    
    setAgents(prev => prev.map(agent => ({
      ...agent,
      lastUpdated: new Date(),
      progress: Math.min(100, agent.progress + Math.floor(Math.random() * 10))
    })));
    setLastRefresh(new Date());
    
    globalRenderMonitor.endRender(renderStart, 'AgentDataRefresh');
    console.log("✅ Agent data refreshed with performance monitoring");
  }, []);

  // View agent details
  const handleViewDetails = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    if (agent) {
      // Navigate to specific agent detail page or show modal
      navigate(`/ai-agent?id=${agentId}`);
    }
  };

  // NEW: View agent group details
  const handleViewGroup = (groupId: string) => {
    const group = agentGroups.find(g => g.id === groupId);
    if (group) {
      // Navigate to group management page
      navigate(`/agent-canvas/group/${groupId}`);
      console.log(`🤖 Viewing bonded agent group: ${group.name}`);
    }
  };

  // Auto-refresh every 30 seconds with debounced rendering
  useEffect(() => {
    const interval = setInterval(() => {
      debouncedRefreshAgents();
    }, 30000);

    return () => clearInterval(interval);
  }, [debouncedRefreshAgents]);

  // Trigger initial render optimization
  useEffect(() => {
    debouncedRenderAgents();
  }, [visibleAgents.length, debouncedRenderAgents]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Control Panel */}
      {showControls && (
        <AgentControlPanel
          totalAgents={agents.length}
          visibleAgents={visibleAgents.length}
          bondedAgents={bondedAgents.length}
          groups={agentGroups.length}
          onToggleAll={handleToggleAll}
          onRefresh={handleRefresh}
        />
      )}

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{visibleAgents.filter(a => a.status === 'active').length}</div>
            <div className="text-sm text-gray-600">Active Agents</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{visibleAgents.filter(a => a.status === 'processing').length}</div>
            <div className="text-sm text-gray-600">Processing</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-600">{visibleAgents.filter(a => a.status === 'idle').length}</div>
            <div className="text-sm text-gray-600">Idle</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{Math.round(visibleAgents.reduce((acc, a) => acc + a.progress, 0) / visibleAgents.length) || 0}%</div>
            <div className="text-sm text-gray-600">Avg Progress</div>
          </CardContent>
        </Card>
      </div>

      {/* NEW: Agent Groups - Only when agentBonded is "yes" → Show Group */}
      {agentGroups.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Bonded Agent Groups</h3>
            <Badge className="bg-blue-100 text-blue-800 text-xs">
              {agentGroups.length} active groups
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {agentGroups.map((group) => (
                <AgentGroupCard
                  key={group.id}
                  group={group}
                  onViewGroup={handleViewGroup}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Individual Agents - Only non-bonded visible agents */}
      {individualAgents.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Individual Agents</h3>
            <Badge className="bg-gray-100 text-gray-800 text-xs">
              {individualAgents.length} independent agents
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {individualAgents.map((agent) => (
                <AgentBlockCard
                  key={agent.id}
                  agent={agent}
                  onToggleVisibility={handleToggleVisibility}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Empty State - No bonded groups when some agents are visible */}
      {visibleAgents.length > 0 && agentGroups.length === 0 && individualAgents.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8 bg-blue-50 rounded-lg border border-blue-200"
        >
          <Users className="w-12 h-12 text-blue-400 mx-auto mb-3" />
          <h3 className="text-md font-semibold text-blue-900 mb-2">No Agent Groups Found</h3>
          <p className="text-blue-700 text-sm mb-4">
            Agents are visible but none are bonded into groups yet
          </p>
          <Badge className="bg-blue-100 text-blue-800 text-xs">
            {bondedAgents.length} bonded • {individualAgents.length} individual
          </Badge>
        </motion.div>
      )}

      {/* Empty State - No visible agents at all */}
      {visibleAgents.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <EyeOff className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Visible Agents</h3>
          <p className="text-gray-600 mb-4">All agent blocks are currently hidden</p>
          <Button onClick={handleToggleAll} className="btn-primary">
            Show All Agents
          </Button>
        </motion.div>
      )}

      {/* Last Refresh Info */}
      <div className="text-center text-xs text-gray-500 mt-4">
        Last refreshed: {lastRefresh.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default ConditionalAgentCanvas;