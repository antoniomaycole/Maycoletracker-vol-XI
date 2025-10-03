/**
 * Project Management
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Target, ArrowLeft, Calendar, Clock, Users, CheckCircle, AlertTriangle,
  Plus, Search, Filter, Edit, Trash2, Eye, Play, Pause, RotateCcw,
  FileText, BarChart3, Award, Star, Crown, Zap, Building2, Globe,
  User, Flag, MessageSquare, Paperclip, Download, Upload, Settings
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import MaycoleTrackerBrand from './MaycoleTrackerBrand';
import UniversalBackButton from './UniversalBackButton';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  progress: number;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  client: string;
  manager: string;
  team: string[];
  industry: string;
  tags: string[];
  lastUpdate: string;
}

interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee: string;
  dueDate: string;
  estimatedHours: number;
  actualHours?: number;
  dependencies?: string[];
  tags: string[];
}

interface ProjectMetric {
  id: string;
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: any;
  color: string;
}

export default function ProjectManagement() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  // Project Metrics
  const projectMetrics: ProjectMetric[] = [
    {
      id: 'active_projects',
      title: 'Active Projects',
      value: 23,
      change: 15.2,
      trend: 'up',
      icon: Target,
      color: 'text-blue-600'
    },
    {
      id: 'completion_rate',
      title: 'Completion Rate',
      value: '94.2%',
      change: 8.7,
      trend: 'up',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 'on_time_delivery',
      title: 'On-Time Delivery',
      value: '87.5%',
      change: 5.3,
      trend: 'up',
      icon: Clock,
      color: 'text-purple-600'
    },
    {
      id: 'budget_efficiency',
      title: 'Budget Efficiency',
      value: '96.8%',
      change: 3.2,
      trend: 'up',
      icon: Award,
      color: 'text-orange-600'
    },
    {
      id: 'team_utilization',
      title: 'Team Utilization',
      value: '82.3%',
      change: 7.1,
      trend: 'up',
      icon: Users,
      color: 'text-pink-600'
    },
    {
      id: 'client_satisfaction',
      title: 'Client Satisfaction',
      value: '4.9/5',
      change: 4.2,
      trend: 'up',
      icon: Star,
      color: 'text-yellow-600'
    }
  ];

  // Sample Projects Data
  const projects: Project[] = [
    {
      id: '1',
      name: 'Healthcare System Integration',
      description: 'Complete EHR system implementation for regional hospital network',
      status: 'active',
      priority: 'high',
      progress: 68,
      startDate: '2024-08-15',
      endDate: '2024-12-30',
      budget: 150000,
      spent: 87500,
      client: 'Regional Health Network',
      manager: 'Sarah Chen',
      team: ['John Doe', 'Emily Rodriguez', 'Michael Kim', 'Lisa Wang'],
      industry: 'Healthcare',
      tags: ['EHR', 'Integration', 'Healthcare'],
      lastUpdate: '2024-10-01'
    },
    {
      id: '2',
      name: 'Restaurant Chain POS Upgrade',
      description: 'Modernizing point-of-sale systems across 25 restaurant locations',
      status: 'active',
      priority: 'medium',
      progress: 45,
      startDate: '2024-09-01',
      endDate: '2024-11-15',
      budget: 85000,
      spent: 32000,
      client: 'Urban Dining Group',
      manager: 'David Thompson',
      team: ['Alex Johnson', 'Maria Garcia', 'Robert Lee'],
      industry: 'Restaurant',
      tags: ['POS', 'Retail', 'Technology'],
      lastUpdate: '2024-09-30'
    },
    {
      id: '3',
      name: 'Construction Site Management App',
      description: 'Mobile application for construction project tracking and safety compliance',
      status: 'planning',
      priority: 'high',
      progress: 15,
      startDate: '2024-10-15',
      endDate: '2025-03-20',
      budget: 120000,
      spent: 8500,
      client: 'BuildTech Solutions',
      manager: 'Jennifer Martinez',
      team: ['Carlos Rodriguez', 'Amy Zhang', 'Tom Wilson'],
      industry: 'Construction',
      tags: ['Mobile App', 'Safety', 'Compliance'],
      lastUpdate: '2024-10-02'
    },
    {
      id: '4',
      name: 'Manufacturing Process Optimization',
      description: 'Lean manufacturing implementation and workflow optimization',
      status: 'completed',
      priority: 'medium',
      progress: 100,
      startDate: '2024-06-01',
      endDate: '2024-09-25',
      budget: 95000,
      spent: 91200,
      client: 'TechMfg Industries',
      manager: 'Kevin Park',
      team: ['Diana Cooper', 'Steven Brown', 'Rachel Green'],
      industry: 'Manufacturing',
      tags: ['Lean', 'Optimization', 'Process'],
      lastUpdate: '2024-09-25'
    }
  ];

  // Sample Tasks Data
  const tasks: Task[] = [
    {
      id: '1',
      projectId: '1',
      title: 'Database Schema Design',
      description: 'Design and implement the core database schema for patient records',
      status: 'completed',
      priority: 'high',
      assignee: 'John Doe',
      dueDate: '2024-09-15',
      estimatedHours: 40,
      actualHours: 38,
      tags: ['Database', 'Design']
    },
    {
      id: '2',
      projectId: '1',
      title: 'API Integration Testing',
      description: 'Test integration with existing hospital systems via APIs',
      status: 'in-progress',
      priority: 'high',
      assignee: 'Emily Rodriguez',
      dueDate: '2024-10-10',
      estimatedHours: 32,
      actualHours: 24,
      tags: ['API', 'Testing', 'Integration']
    },
    {
      id: '3',
      projectId: '2',
      title: 'POS Hardware Installation',
      description: 'Install new POS terminals at downtown locations',
      status: 'todo',
      priority: 'medium',
      assignee: 'Alex Johnson',
      dueDate: '2024-10-15',
      estimatedHours: 16,
      tags: ['Hardware', 'Installation']
    },
    {
      id: '4',
      projectId: '2',
      title: 'Staff Training Program',
      description: 'Train restaurant staff on new POS system features',
      status: 'todo',
      priority: 'medium',
      assignee: 'Maria Garcia',
      dueDate: '2024-10-20',
      estimatedHours: 24,
      tags: ['Training', 'Staff']
    }
  ];

  const statusOptions = ['all', 'planning', 'active', 'on-hold', 'completed', 'cancelled'];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'todo': return 'bg-gray-100 text-gray-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return AlertTriangle;
      case 'high': return Flag;
      case 'medium': return Clock;
      case 'low': return CheckCircle;
      default: return Target;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const projectTasks = selectedProject ? tasks.filter(task => task.projectId === selectedProject) : tasks;

  return (
    <div className="min-h-screen bg-white">
      {/* Project Management Header */}
      <div className="bg-gradient-to-r from-orange-700 via-purple-700 to-orange-700 text-white px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <UniversalBackButton />
            
            <div className="text-center">
              <MaycoleTrackerBrand 
                variant="light" 
                showSubtitle={true} 
                showAppStoreButton={true}
                iconSize={36}
              />
              <p className="text-orange-100 mt-1 text-sm">🌍 World's First AI-Powered Project Intelligence System</p>
            </div>
            
            <div className="flex gap-2">
              <Button className="btn-on-dark">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
              <Button className="btn-on-dark">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold mb-3 flex items-center justify-center gap-3">
              <Target className="w-10 h-10" />
              Project Management Center
            </h1>
            <p className="text-orange-100 text-lg max-w-3xl mx-auto">
              Streamline project delivery with comprehensive task management, team collaboration, and resource optimization
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Project Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {[
              { id: 'projects', label: 'Projects Overview', icon: Target },
              { id: 'tasks', label: 'Task Management', icon: CheckCircle },
              { id: 'timeline', label: 'Project Timeline', icon: Calendar },
              { id: 'resources', label: 'Resource Planning', icon: Users }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-orange-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Metrics */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <BarChart3 className="w-7 h-7 text-orange-600" />
            Project Performance Metrics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectMetrics.map((metric) => {
              const IconComponent = metric.icon;
              return (
                <Card key={metric.id} className="maycole-card hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-orange-100 to-purple-100 flex items-center justify-center`}>
                        <IconComponent className={`w-6 h-6 ${metric.color}`} />
                      </div>
                      <div className={`flex items-center gap-1 text-green-600`}>
                        <Target className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          +{metric.change}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900">{metric.title}</h3>
                      <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <>
            {/* Project Search & Filters */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex gap-4 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status === 'all' ? 'All Status' : status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>
                
                <Button className="btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Project
                </Button>
              </div>
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProjects.map((project) => {
                const PriorityIcon = getPriorityIcon(project.priority);
                const budgetUsage = (project.spent / project.budget) * 100;
                
                return (
                  <Card key={project.id} className="maycole-card hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg font-bold text-gray-900 mb-2">
                            {project.name}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge className={getStatusBadge(project.status)}>
                            {project.status.replace('-', ' ')}
                          </Badge>
                          <Badge className={getPriorityBadge(project.priority)}>
                            <PriorityIcon className="w-3 h-3 mr-1" />
                            {project.priority}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      {/* Project Progress */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Progress</span>
                          <span className="text-sm font-bold text-gray-900">{project.progress}%</span>
                        </div>
                        <div className="maycole-progress-bar">
                          <div 
                            className="maycole-progress-fill bg-orange-500"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Client</div>
                          <div className="text-sm font-medium text-gray-900">{project.client}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Manager</div>
                          <div className="text-sm font-medium text-gray-900">{project.manager}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Budget</div>
                          <div className="text-sm font-medium text-gray-900">
                            {formatCurrency(project.spent)} / {formatCurrency(project.budget)}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Due Date</div>
                          <div className="text-sm font-medium text-gray-900">
                            {new Date(project.endDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      {/* Budget Usage */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Budget Usage</span>
                          <span className={`text-sm font-bold ${
                            budgetUsage > 90 ? 'text-red-600' : 
                            budgetUsage > 75 ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {budgetUsage.toFixed(1)}%
                          </span>
                        </div>
                        <div className="maycole-progress-bar">
                          <div 
                            className={`maycole-progress-fill ${
                              budgetUsage > 90 ? 'bg-red-500' : 
                              budgetUsage > 75 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(budgetUsage, 100)}%` }}
                          />
                        </div>
                      </div>

                      {/* Team Members */}
                      <div className="mb-4">
                        <div className="text-xs text-gray-500 mb-2">Team ({project.team.length})</div>
                        <div className="flex -space-x-2">
                          {project.team.slice(0, 4).map((member, index) => (
                            <div
                              key={index}
                              className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-purple-400 flex items-center justify-center text-xs font-medium text-white border-2 border-white"
                              title={member}
                            >
                              {member.split(' ').map(n => n[0]).join('')}
                            </div>
                          ))}
                          {project.team.length > 4 && (
                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-700 border-2 border-white">
                              +{project.team.length - 4}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Project Tags */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {project.tags.map((tag, index) => (
                            <Badge key={index} className="bg-gray-100 text-gray-700 text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => setSelectedProject(project.id)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <>
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <CheckCircle className="w-7 h-7 text-green-600" />
                  Task Management
                  {selectedProject && (
                    <Badge className="bg-orange-100 text-orange-800">
                      {projects.find(p => p.id === selectedProject)?.name}
                    </Badge>
                  )}
                </h2>
                
                <div className="flex gap-2">
                  {selectedProject && (
                    <Button 
                      variant="outline"
                      onClick={() => setSelectedProject(null)}
                    >
                      View All Tasks
                    </Button>
                  )}
                  <Button className="btn-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Task
                  </Button>
                </div>
              </div>
            </div>

            {/* Task List */}
            <Card className="maycole-card">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="text-left py-4 px-6 font-medium text-gray-900">Task</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-900">Project</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-900">Assignee</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-900">Priority</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-900">Due Date</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-900">Hours</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectTasks.map((task) => {
                        const project = projects.find(p => p.id === task.projectId);
                        const PriorityIcon = getPriorityIcon(task.priority);
                        
                        return (
                          <tr key={task.id} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-6">
                              <div>
                                <div className="font-medium text-gray-900">{task.title}</div>
                                {task.description && (
                                  <div className="text-sm text-gray-600">{task.description}</div>
                                )}
                                <div className="flex gap-1 mt-1">
                                  {task.tags.map((tag, index) => (
                                    <Badge key={index} className="bg-gray-100 text-gray-600 text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="text-sm font-medium text-gray-900">{project?.name}</div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-purple-400 flex items-center justify-center text-xs font-medium text-white">
                                  {task.assignee.split(' ').map(n => n[0]).join('')}
                                </div>
                                <span className="text-sm font-medium text-gray-900">{task.assignee}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <Badge className={getStatusBadge(task.status)}>
                                {task.status.replace('-', ' ')}
                              </Badge>
                            </td>
                            <td className="py-4 px-6">
                              <Badge className={getPriorityBadge(task.priority)}>
                                <PriorityIcon className="w-3 h-3 mr-1" />
                                {task.priority}
                              </Badge>
                            </td>
                            <td className="py-4 px-6">
                              <div className="text-sm text-gray-900">
                                {new Date(task.dueDate).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="text-sm text-gray-900">
                                {task.actualHours || 0}h / {task.estimatedHours}h
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Play className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Project Quick Actions */}
        <div className="mt-12 bg-gradient-to-r from-orange-50 to-purple-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-3">
            <Zap className="w-8 h-8 text-orange-600" />
            Quick Project Actions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="btn-primary flex items-center justify-center gap-2 h-14">
              <Plus className="w-5 h-5" />
              Create Project
            </Button>
            
            <Button className="btn-primary flex items-center justify-center gap-2 h-14">
              <CheckCircle className="w-5 h-5" />
              Add Task
            </Button>
            
            <Button className="btn-primary flex items-center justify-center gap-2 h-14">
              <Calendar className="w-5 h-5" />
              Schedule Meeting
            </Button>
            
            <Button 
              onClick={() => navigate('/analytics')}
              className="btn-primary flex items-center justify-center gap-2 h-14"
            >
              <BarChart3 className="w-5 h-5" />
              Project Analytics
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}