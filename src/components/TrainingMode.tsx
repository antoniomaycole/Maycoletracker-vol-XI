/**
 * MaycoleTracker™ vol. XI - Enterprise Edition
 * COMPREHENSIVE TRAINING SYSTEM - Universal Business Management Platform
 * Multi-Industry Training Hub with Voice Commands & Agent Workflows
 */

import React, { useState } from 'react';
import { BookOpen, Play, CheckCircle, Clock, Users, Award, Target, BarChart, Mic, Camera, Settings, HeadphonesIcon, Zap, Brain, Star, Trophy, ChevronRight } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import UniversalBackButton from './UniversalBackButton';

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  completed: boolean;
  progress: number;
  enrolledUsers: number;
  rating: number;
}

interface TrainingPath {
  id: string;
  name: string;
  description: string;
  modules: number;
  totalDuration: number;
  completionRate: number;
  participants: number;
}

// Enterprise Training Data for MaycoleTracker™ Universal Business Platform
const mockTrainingModules: TrainingModule[] = [
  {
    id: '1',
    title: 'MaycoleTracker™ Universal Platform Fundamentals',
    description: 'Master the world\'s first advanced universal business management platform across 9+ industries',
    duration: 45,
    difficulty: 'Beginner',
    category: 'Platform Basics',
    completed: true,
    progress: 100,
    enrolledUsers: 2856,
    rating: 4.9
  },
  {
    id: '2',
    title: 'Voice Command System & Agent Workflows',
    description: 'Learn voice-activated controls, AI agent interactions, and workflow automation',
    duration: 90,
    difficulty: 'Intermediate',
    category: 'Voice & AI',
    completed: false,
    progress: 65,
    enrolledUsers: 1489,
    rating: 4.8
  },
  {
    id: '3',
    title: 'Multi-Industry Business Operations (85% Focus)',
    description: 'Healthcare, restaurants, construction, retail, manufacturing, hospitality, education, automotive, real estate',
    duration: 120,
    difficulty: 'Advanced',
    category: 'Business Operations',
    completed: false,
    progress: 30,
    enrolledUsers: 3203,
    rating: 4.9
  },
  {
    id: '4',
    title: 'Camera/Scanner System Integration',
    description: 'Advanced scanner technology, QR codes, barcodes, and visual inventory tracking',
    duration: 75,
    difficulty: 'Intermediate',
    category: 'Scanner Technology',
    completed: false,
    progress: 0,
    enrolledUsers: 1145,
    rating: 4.7
  },
  {
    id: '5',
    title: 'Enterprise Analytics Dashboard Mastery',
    description: 'Advanced analytics, real-time reporting, and business intelligence across all modules',
    duration: 100,
    difficulty: 'Advanced',
    category: 'Analytics & Reports',
    completed: false,
    progress: 15,
    enrolledUsers: 891,
    rating: 4.8
  },
  {
    id: '6',
    title: 'Premium Subscription Management',
    description: 'Free, Professional ($89), and Enterprise ($199) tier features and administration',
    duration: 60,
    difficulty: 'Advanced',
    category: 'Subscription Management',
    completed: false,
    progress: 0,
    enrolledUsers: 567,
    rating: 4.6
  },
  {
    id: '7',
    title: 'Inventory Management (15% Supporting Feature)',
    description: 'Traditional inventory as a supporting component of the universal business platform',
    duration: 55,
    difficulty: 'Beginner',
    category: 'Inventory Support',
    completed: true,
    progress: 100,
    enrolledUsers: 2234,
    rating: 4.7
  },
  {
    id: '8',
    title: 'Cross-Platform Integration & API Management',
    description: 'Connect MaycoleTracker™ with existing business systems and third-party applications',
    duration: 110,
    difficulty: 'Advanced',
    category: 'System Integration',
    completed: false,
    progress: 0,
    enrolledUsers: 423,
    rating: 4.8
  }
];

const mockTrainingPaths: TrainingPath[] = [
  {
    id: '1',
    name: 'Universal Business Platform Onboarding',
    description: 'Complete certification for new MaycoleTracker™ Enterprise Edition users',
    modules: 8,
    totalDuration: 480,
    completionRate: 94,
    participants: 5234
  },
  {
    id: '2',
    name: 'Enterprise Administrator Certification',
    description: 'Advanced training for system administrators and power users across all business modules',
    modules: 12,
    totalDuration: 720,
    completionRate: 78,
    participants: 1289
  },
  {
    id: '3',
    name: 'Multi-Industry Specialist Track',
    description: 'Specialized training for healthcare, retail, manufacturing, hospitality, and other industries',
    modules: 9,
    totalDuration: 540,
    completionRate: 85,
    participants: 2156
  },
  {
    id: '4',
    name: 'Voice & AI Integration Mastery',
    description: 'Advanced voice command system, AI agents, and automation workflow training',
    modules: 6,
    totalDuration: 360,
    completionRate: 67,
    participants: 891
  },
  {
    id: '5',
    name: 'Premium Subscription Excellence',
    description: 'Professional and Enterprise tier features, billing, and customer management',
    modules: 7,
    totalDuration: 420,
    completionRate: 72,
    participants: 1456
  }
];

const TrainingMode = () => {
  const [modules] = useState<TrainingModule[]>(mockTrainingModules);
  const [paths] = useState<TrainingPath[]>(mockTrainingPaths);
  const [activeTab, setActiveTab] = useState<'modules' | 'paths' | 'progress' | 'practice'>('modules');
  const [voiceTrainingActive, setVoiceTrainingActive] = useState(false);

  // Calculate training statistics
  const totalModules = modules.length;
  const completedModules = modules.filter(m => m.completed).length;
  const avgProgress = modules.reduce((sum, m) => sum + m.progress, 0) / modules.length;
  const totalUsers = modules.reduce((sum, m) => sum + m.enrolledUsers, 0);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Enterprise Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white p-6 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-96 h-96 rounded-full bg-white -top-48 -right-48"></div>
          <div className="absolute w-64 h-64 rounded-full bg-white -bottom-32 -left-32"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold flex items-center gap-3">
                <Brain className="w-10 h-10" />
                MaycoleTracker<span className="tm-standard">TM</span> Training Academy
              </h1>
              <p className="text-blue-100 mt-2 text-lg">
                World's First Universal Business Management Platform Training Hub
              </p>
              <div className="flex items-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>Enterprise Edition vol. XI</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>9+ Industries Supported</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span>Voice & AI Enabled</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                className={`flex items-center gap-2 ${voiceTrainingActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                onClick={() => setVoiceTrainingActive(!voiceTrainingActive)}
              >
                <Mic className="w-4 h-4" />
                {voiceTrainingActive ? 'Stop Voice Training' : 'Start Voice Training'}
              </Button>
              <Button className="bg-white text-blue-600 hover:bg-blue-50 flex items-center gap-2">
                <Play className="w-4 h-4" />
                Begin Training
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Universal Back Button */}
        <UniversalBackButton customBackPath="/logo" showHomeOption={true} />
        
        {/* Enterprise Training Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Training Modules</p>
                <p className="text-2xl font-bold text-gray-900">{totalModules}</p>
                <p className="text-xs text-gray-500 mt-1">Enterprise Curriculum</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedModules}</p>
                <p className="text-xs text-gray-500 mt-1">Certification Progress</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Platform Mastery</p>
                <p className="text-2xl font-bold text-purple-600">{avgProgress.toFixed(0)}%</p>
                <p className="text-xs text-gray-500 mt-1">Overall Competency</p>
              </div>
              <BarChart className="w-8 h-8 text-purple-600" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Enterprise Users</p>
                <p className="text-2xl font-bold text-orange-600">{totalUsers.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">Active Participants</p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Voice Training</p>
                <p className="text-2xl font-bold text-yellow-600">{voiceTrainingActive ? 'ACTIVE' : 'READY'}</p>
                <p className="text-xs text-gray-500 mt-1">AI Command System</p>
              </div>
              <Mic className={`w-8 h-8 ${voiceTrainingActive ? 'text-red-500' : 'text-yellow-600'}`} />
            </div>
          </Card>
        </div>

        {/* Enhanced Navigation Tabs */}
        <Card className="p-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('modules')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'modules'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Enterprise Modules
            </button>
            <button
              onClick={() => setActiveTab('paths')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'paths'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Target className="w-4 h-4" />
              Certification Paths
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'practice'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Zap className="w-4 h-4" />
              Practice Hub
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'progress'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Trophy className="w-4 h-4" />
              Progress & Achievements
            </button>
          </div>
        </Card>

        {/* Enhanced Training Modules Tab */}
        {activeTab === 'modules' && (
          <div className="space-y-4">
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Star className="w-5 h-5 text-blue-600" />
                MaycoleTracker<span className="tm-standard">TM</span> Enterprise Curriculum
              </h3>
              <p className="text-gray-700 text-sm">
                Comprehensive training modules for the world's first universal business management platform. 
                Focus: <strong>85% Business Operations</strong> | <strong>15% Inventory Support</strong>
              </p>
            </div>

            {modules.map((module) => (
              <Card key={module.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                      <Badge className={getDifficultyColor(module.difficulty)}>
                        {module.difficulty}
                      </Badge>
                      {module.completed && (
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-sm text-green-600 font-medium">Completed</span>
                        </div>
                      )}
                      {module.category === 'Business Operations' && (
                        <Badge className="bg-blue-100 text-blue-800">85% Priority</Badge>
                      )}
                      {module.category === 'Inventory Support' && (
                        <Badge className="bg-gray-100 text-gray-800">15% Support</Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{module.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDuration(module.duration)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {module.enrolledUsers.toLocaleString()} enrolled
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        {module.rating}/5.0 rating
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {module.category}
                      </span>
                    </div>
                    
                    {!module.completed && module.progress > 0 && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <div className="flex justify-between text-sm text-blue-700 mb-2">
                          <span className="font-medium">Learning Progress</span>
                          <span className="font-bold">{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-3" />
                        <p className="text-xs text-blue-600 mt-1">Continue where you left off</p>
                      </div>
                    )}
                  </div>
                  <div className="ml-6 flex flex-col gap-2">
                    <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                      {module.completed ? <CheckCircle className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {module.completed ? 'Review & Certificate' : module.progress > 0 ? 'Continue Training' : 'Start Module'}
                    </Button>
                    {module.category === 'Voice & AI' && (
                      <Button variant="outline" size="sm" className="text-xs">
                        <Mic className="w-3 h-3 mr-1" />
                        Voice Practice
                      </Button>
                    )}
                    {module.category === 'Scanner Technology' && (
                      <Button variant="outline" size="sm" className="text-xs">
                        <Camera className="w-3 h-3 mr-1" />
                        Test Scanner
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Learning Paths Tab */}
        {activeTab === 'paths' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paths.map((path) => (
              <Card key={path.id} className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{path.name}</h3>
                  <p className="text-gray-600 text-sm">{path.description}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Modules</span>
                    <span className="font-medium">{path.modules}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{formatDuration(path.totalDuration)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Participants</span>
                    <span className="font-medium">{path.participants}</span>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Completion Rate</span>
                      <span>{path.completionRate}%</span>
                    </div>
                    <Progress value={path.completionRate} className="h-2" />
                  </div>
                </div>
                <Button className="w-full mt-4">Enroll in Path</Button>
              </Card>
            ))}
          </div>
        )}

        {/* Practice Hub Tab */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 border-l-4 border-green-500">
                <div className="flex items-center gap-3 mb-4">
                  <Mic className="w-8 h-8 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Voice Command Training</h3>
                </div>
                <p className="text-gray-600 mb-4">Practice voice-activated controls and AI agent interactions</p>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Start Voice Practice
                </Button>
              </Card>

              <Card className="p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-4">
                  <Camera className="w-8 h-8 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Scanner & Camera Training</h3>
                </div>
                <p className="text-gray-600 mb-4">Test QR codes, barcodes, and visual inventory tracking</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Test Scanner System
                </Button>
              </Card>

              <Card className="p-6 border-l-4 border-purple-500">
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="w-8 h-8 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Agent Workflow Testing</h3>
                </div>
                <p className="text-gray-600 mb-4">Practice automated workflows and business process agents</p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  Launch Workflow Lab
                </Button>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Brain className="w-6 h-6 text-blue-600" />
                Interactive Training Simulator
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Multi-Industry Scenarios</h4>
                    <p className="text-sm text-gray-600">Practice with realistic business scenarios across healthcare, retail, manufacturing, and more</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Voice Command Testing</h4>
                    <p className="text-sm text-gray-600">Test voice commands in a safe environment with immediate feedback</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Business Process Automation</h4>
                    <p className="text-sm text-gray-600">Learn to set up and manage automated business workflows</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Premium Feature Sandbox</h4>
                    <p className="text-sm text-gray-600">Try Professional ($89) and Enterprise ($199) features</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Enhanced Progress Tab */}
        {activeTab === 'progress' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart className="w-6 h-6 text-blue-600" />
                Training Progress
              </h3>
              <div className="space-y-4">
                <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {completedModules}/{totalModules}
                  </div>
                  <p className="text-gray-600">Enterprise Modules Completed</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {avgProgress.toFixed(0)}%
                  </div>
                  <p className="text-gray-600 text-sm">Platform Mastery Level</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    Business Operations Focus: 85%
                  </div>
                  <p className="text-gray-600 text-sm">Inventory Support: 15%</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-600" />
                Enterprise Achievements
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Award className="w-8 h-8 text-yellow-600" />
                  <div>
                    <p className="font-medium text-gray-900">Platform Pioneer</p>
                    <p className="text-sm text-gray-600">First user to complete universal platform training</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Mic className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Voice Command Expert</p>
                    <p className="text-sm text-gray-600">Mastered AI voice interaction system</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <Users className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Multi-Industry Specialist</p>
                    <p className="text-sm text-gray-600">Certified across 3+ industry verticals</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <Star className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">Enterprise Expert</p>
                    <p className="text-sm text-gray-600">Completed advanced administrator certification</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-green-600" />
                Certification Status
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-green-800">Universal Platform Basics</span>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-sm text-green-700">Certified - Valid until Dec 2025</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-yellow-800">Voice & AI Systems</span>
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <p className="text-sm text-yellow-700">In Progress - 65% Complete</p>
                  <Progress value={65} className="h-2 mt-2" />
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">Enterprise Administration</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600">Available - Prerequisites met</p>
                  <Button size="sm" className="mt-2 w-full" variant="outline">
                    Start Certification
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingMode;