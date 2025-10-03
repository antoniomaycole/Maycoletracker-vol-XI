/**
 * MaycoleTracker™ Volume XI - Interactive Training & Manual System
 * Comprehensive user education with interactive tutorials
 * Features: Step-by-step guides, video tutorials, industry-specific training
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, ArrowLeft, Play, Pause, RotateCcw, CheckCircle, Clock,
  User, Award, Target, Brain, Lightbulb, Video, FileText, Download,
  Star, Search, Filter, Bookmark, Share, MessageCircle, Trophy,
  Zap, Camera, Mic, QrCode, BarChart3, Settings, Building2
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';

interface TrainingModule {
  id: string;
  title: string;
  category: string;
  industry: string[];
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
  rating: number;
  description: string;
  icon: string;
  steps: TrainingStep[];
  prerequisites?: string[];
  certification?: boolean;
}

interface TrainingStep {
  id: string;
  title: string;
  description: string;
  type: 'text' | 'video' | 'interactive' | 'quiz';
  content: string;
  completed: boolean;
  duration: number;
}

interface UserProgress {
  totalModules: number;
  completedModules: number;
  totalHours: number;
  certificationsEarned: number;
  currentStreak: number;
  industrySpecialization: string[];
}

const TRAINING_CATEGORIES = [
  { id: 'getting-started', name: 'Getting Started', icon: '🚀', color: 'bg-blue-500' },
  { id: 'inventory-management', name: 'Inventory Management', icon: '📦', color: 'bg-green-500' },
  { id: 'camera-scanning', name: 'Camera & Scanning', icon: '📷', color: 'bg-purple-500' },
  { id: 'voice-control', name: 'Voice Control', icon: '🎤', color: 'bg-red-500' },
  { id: 'analytics', name: 'Analytics & Reports', icon: '📊', color: 'bg-yellow-500' },
  { id: 'industry-specific', name: 'Industry Specific', icon: '🏢', color: 'bg-indigo-500' },
  { id: 'advanced-features', name: 'Advanced Features', icon: '⚡', color: 'bg-pink-500' },
  { id: 'troubleshooting', name: 'Troubleshooting', icon: '🔧', color: 'bg-gray-500' }
];

const SAMPLE_MODULES: TrainingModule[] = [
  {
    id: '1',
    title: 'MaycoleTracker™ Volume XI Quick Start',
    category: 'getting-started',
    industry: ['all'],
    duration: 15,
    difficulty: 'beginner',
    completed: false,
    rating: 4.8,
    description: 'Learn the basics of navigating and using MaycoleTracker™ Volume XI for inventory management.',
    icon: '🚀',
    steps: [
      {
        id: '1-1',
        title: 'Welcome to MaycoleTracker™',
        description: 'Overview of the system and key features',
        type: 'video',
        content: 'Introduction video covering the main dashboard and navigation',
        completed: false,
        duration: 5
      },
      {
        id: '1-2',
        title: 'Dashboard Navigation',
        description: 'Learn to navigate the main dashboard',
        type: 'interactive',
        content: 'Interactive tour of dashboard elements',
        completed: false,
        duration: 5
      },
      {
        id: '1-3',
        title: 'Quick Start Quiz',
        description: 'Test your understanding of basic navigation',
        type: 'quiz',
        content: 'Multiple choice questions about dashboard features',
        completed: false,
        duration: 5
      }
    ],
    certification: true
  },
  {
    id: '2',
    title: 'Healthcare Inventory Management',
    category: 'industry-specific',
    industry: ['healthcare'],
    duration: 45,
    difficulty: 'intermediate',
    completed: false,
    rating: 4.9,
    description: 'Specialized training for healthcare professionals managing medical supplies and equipment.',
    icon: '🏥',
    steps: [
      {
        id: '2-1',
        title: 'Medical Supply Categories',
        description: 'Understanding healthcare inventory classification',
        type: 'text',
        content: 'Detailed explanation of medical supply categories',
        completed: false,
        duration: 15
      },
      {
        id: '2-2',
        title: 'Expiry Date Management',
        description: 'Managing medications and supplies with expiry dates',
        type: 'video',
        content: 'Video tutorial on expiry tracking and alerts',
        completed: false,
        duration: 20
      },
      {
        id: '2-3',
        title: 'Compliance Requirements',
        description: 'Healthcare compliance and reporting requirements',
        type: 'text',
        content: 'Regulatory compliance documentation',
        completed: false,
        duration: 10
      }
    ],
    certification: true,
    prerequisites: ['1']
  },
  {
    id: '3',
    title: 'Advanced Camera Capture Techniques',
    category: 'camera-scanning',
    industry: ['all'],
    duration: 30,
    difficulty: 'advanced',
    completed: false,
    rating: 4.7,
    description: 'Master advanced camera features including OCR, barcode scanning, and AI product recognition.',
    icon: '📸',
    steps: [
      {
        id: '3-1',
        title: 'Camera Setup & Configuration',
        description: 'Optimizing camera settings for different industries',
        type: 'interactive',
        content: 'Hands-on camera configuration',
        completed: false,
        duration: 10
      },
      {
        id: '3-2',
        title: 'Barcode & QR Code Scanning',
        description: 'Advanced scanning techniques and troubleshooting',
        type: 'video',
        content: 'Comprehensive scanning tutorial',
        completed: false,
        duration: 15
      },
      {
        id: '3-3',
        title: 'OCR Text Recognition',
        description: 'Using optical character recognition for data entry',
        type: 'interactive',
        content: 'Practice OCR with sample images',
        completed: false,
        duration: 5
      }
    ],
    certification: true,
    prerequisites: ['1']
  },
  {
    id: '4',
    title: 'Voice Control Mastery',
    category: 'voice-control',
    industry: ['all'],
    duration: 25,
    difficulty: 'intermediate',
    completed: false,
    rating: 4.6,
    description: 'Learn to efficiently use voice commands for hands-free inventory management.',
    icon: '🎤',
    steps: [
      {
        id: '4-1',
        title: 'Voice Command Basics',
        description: 'Essential voice commands for inventory management',
        type: 'video',
        content: 'Voice command demonstration video',
        completed: false,
        duration: 10
      },
      {
        id: '4-2',
        title: 'Advanced Voice Features',
        description: 'Multi-language support and custom commands',
        type: 'text',
        content: 'Advanced voice control documentation',
        completed: false,
        duration: 10
      },
      {
        id: '4-3',
        title: 'Voice Control Practice',
        description: 'Practice session with voice commands',
        type: 'interactive',
        content: 'Interactive voice command practice',
        completed: false,
        duration: 5
      }
    ],
    certification: false
  },
  {
    id: '5',
    title: 'Restaurant Inventory Optimization',
    category: 'industry-specific',
    industry: ['restaurant'],
    duration: 40,
    difficulty: 'intermediate',
    completed: false,
    rating: 4.8,
    description: 'Specialized training for restaurant and food service inventory management.',
    icon: '🍽️',
    steps: [
      {
        id: '5-1',
        title: 'Food Safety & FIFO',
        description: 'First In, First Out principles and food safety',
        type: 'video',
        content: 'Food safety and inventory rotation training',
        completed: false,
        duration: 15
      },
      {
        id: '5-2',
        title: 'Perishable Item Management',
        description: 'Managing fresh ingredients and expiry tracking',
        type: 'text',
        content: 'Perishable inventory best practices',
        completed: false,
        duration: 15
      },
      {
        id: '5-3',
        title: 'Cost Control Analytics',
        description: 'Using analytics to reduce food waste and costs',
        type: 'interactive',
        content: 'Interactive cost analysis tools',
        completed: false,
        duration: 10
      }
    ],
    certification: true,
    prerequisites: ['1']
  }
];

export default function Training() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [modules, setModules] = useState<TrainingModule[]>(SAMPLE_MODULES);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState<TrainingModule | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalModules: SAMPLE_MODULES.length,
    completedModules: 0,
    totalHours: 0,
    certificationsEarned: 0,
    currentStreak: 3,
    industrySpecialization: ['healthcare', 'restaurant']
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredModules = modules.filter(module => {
    const matchesCategory = selectedCategory === 'all' || module.category === selectedCategory;
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const completeStep = (stepId: string) => {
    if (!selectedModule) return;

    const updatedModule = {
      ...selectedModule,
      steps: selectedModule.steps.map(step =>
        step.id === stepId ? { ...step, completed: true } : step
      )
    };

    const allStepsCompleted = updatedModule.steps.every(step => step.completed);
    if (allStepsCompleted) {
      updatedModule.completed = true;
    }

    setSelectedModule(updatedModule);
    setModules(prev => prev.map(m => m.id === updatedModule.id ? updatedModule : m));

    // Update user progress
    if (allStepsCompleted && !selectedModule.completed) {
      setUserProgress(prev => ({
        ...prev,
        completedModules: prev.completedModules + 1,
        totalHours: prev.totalHours + selectedModule.duration / 60,
        certificationsEarned: selectedModule.certification ? prev.certificationsEarned + 1 : prev.certificationsEarned
      }));
    }
  };

  const startModule = (module: TrainingModule) => {
    setSelectedModule(module);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const nextStep = () => {
    if (selectedModule && currentStep < selectedModule.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsPlaying(false);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setIsPlaying(false);
    }
  };

  const resetModule = () => {
    if (selectedModule) {
      const resetModule = {
        ...selectedModule,
        completed: false,
        steps: selectedModule.steps.map(step => ({ ...step, completed: false }))
      };
      setSelectedModule(resetModule);
      setModules(prev => prev.map(m => m.id === resetModule.id ? resetModule : m));
      setCurrentStep(0);
      setIsPlaying(false);
    }
  };

  const downloadCertificate = (module: TrainingModule) => {
    // Simulate certificate download
    alert(`Certificate for "${module.title}" would be downloaded here.`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'text': return <FileText className="w-4 h-4" />;
      case 'interactive': return <Target className="w-4 h-4" />;
      case 'quiz': return <Brain className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  if (selectedModule) {
    const currentStepData = selectedModule.steps[currentStep];
    const progress = ((currentStep + 1) / selectedModule.steps.length) * 100;

    return (
      <div className="purple-background min-h-screen">
        <div className="relative z-10 px-4 py-6">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <button 
                onClick={() => setSelectedModule(null)}
                className="btn-on-dark flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Training</span>
              </button>
              
              <div className="text-white/70 text-sm">
                Step {currentStep + 1} of {selectedModule.steps.length}
              </div>
            </div>

            {/* Module Header */}
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">{selectedModule.icon}</div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {selectedModule.title}
              </h1>
              <p className="text-white/70 mb-4">{selectedModule.description}</p>
              
              {/* Progress Bar */}
              <div className="bg-white/20 rounded-full h-2 mb-4 max-w-md mx-auto">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-white/60 text-sm">
                {Math.round(progress)}% Complete
              </div>
            </div>

            {/* Current Step */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-lg mb-8">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  {getTypeIcon(currentStepData.type)}
                  <span>{currentStepData.title}</span>
                  <Badge className={`${getDifficultyColor(selectedModule.difficulty)} text-white ml-auto`}>
                    {currentStepData.type}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-6">{currentStepData.description}</p>
                
                {/* Content Area */}
                <div className="bg-white/10 rounded-lg p-6 mb-6 min-h-64">
                  {currentStepData.type === 'video' && (
                    <div className="text-center">
                      <div className="bg-black/50 rounded-lg p-8 mb-4">
                        <Video className="w-16 h-16 text-white/50 mx-auto mb-4" />
                        <p className="text-white/70">Video Content: {currentStepData.content}</p>
                        <div className="mt-4">
                          <Button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="btn-primary"
                          >
                            {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                            {isPlaying ? 'Pause' : 'Play'} Video
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {currentStepData.type === 'text' && (
                    <div className="prose prose-invert max-w-none">
                      <div className="text-white/90 leading-relaxed">
                        {currentStepData.content}
                      </div>
                    </div>
                  )}
                  
                  {currentStepData.type === 'interactive' && (
                    <div className="text-center">
                      <Target className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                      <p className="text-white/70 mb-4">Interactive Exercise: {currentStepData.content}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button className="btn-on-dark">
                          <Camera className="w-4 h-4 mr-2" />
                          Open Camera
                        </Button>
                        <Button className="btn-on-dark">
                          <QrCode className="w-4 h-4 mr-2" />
                          Try Scanner
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {currentStepData.type === 'quiz' && (
                    <div>
                      <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                      <div className="text-center mb-6">
                        <p className="text-white/70">Quiz: {currentStepData.content}</p>
                      </div>
                      <div className="space-y-3">
                        <Button className="w-full btn-on-dark text-left">
                          A) Navigate using the main menu
                        </Button>
                        <Button className="w-full btn-on-dark text-left">
                          B) Use voice commands
                        </Button>
                        <Button className="w-full btn-on-dark text-left">
                          C) Both A and B
                        </Button>
                        <Button className="w-full btn-on-dark text-left">
                          D) None of the above
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Step Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button
                      onClick={previousStep}
                      disabled={currentStep === 0}
                      className="btn-on-dark"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    <Button onClick={resetModule} className="btn-on-dark">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => completeStep(currentStepData.id)}
                      disabled={currentStepData.completed}
                      className="btn-primary"
                    >
                      {currentStepData.completed ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Completed
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark Complete
                        </>
                      )}
                    </Button>
                    
                    {currentStep < selectedModule.steps.length - 1 ? (
                      <Button
                        onClick={nextStep}
                        className="btn-primary"
                      >
                        Next
                        <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                      </Button>
                    ) : (
                      selectedModule.certification && selectedModule.completed && (
                        <Button
                          onClick={() => downloadCertificate(selectedModule)}
                          className="btn-primary"
                        >
                          <Award className="w-4 h-4 mr-2" />
                          Get Certificate
                        </Button>
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step Progress */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-lg">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                  {selectedModule.steps.map((step, index) => (
                    <button
                      key={step.id}
                      onClick={() => setCurrentStep(index)}
                      className={`p-3 rounded-lg text-sm transition-all duration-300 ${
                        index === currentStep
                          ? 'bg-blue-500/30 border-2 border-blue-400 text-white'
                          : step.completed
                          ? 'bg-green-500/20 border border-green-400 text-green-400'
                          : 'bg-white/10 border border-white/20 text-white/70 hover:bg-white/15'
                      }`}
                    >
                      <div className="flex items-center justify-center mb-1">
                        {step.completed ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          getTypeIcon(step.type)
                        )}
                      </div>
                      <div className="font-medium truncate">{step.title}</div>
                      <div className="text-xs opacity-70 mt-1">{step.duration}m</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="purple-background min-h-screen">
      <div className="relative z-10 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => navigate('/main')}
              className="btn-on-dark flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
            
            <div className="text-right text-white/80">
              <div className="text-sm font-medium">
                {currentTime.toLocaleDateString()}
              </div>
              <div className="text-xs opacity-70">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <BookOpen className="w-10 h-10 inline mr-3" />
              Training & Manual Center
            </h1>
            <p className="text-white/70">Interactive learning modules and comprehensive documentation</p>
          </div>

          {/* User Progress */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/10 border-white/20 backdrop-blur-lg">
              <CardContent className="p-4 text-center">
                <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{userProgress.completedModules}</div>
                <div className="text-white/70 text-sm">Modules Completed</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 backdrop-blur-lg">
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{userProgress.totalHours.toFixed(1)}h</div>
                <div className="text-white/70 text-sm">Learning Time</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 backdrop-blur-lg">
              <CardContent className="p-4 text-center">
                <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{userProgress.certificationsEarned}</div>
                <div className="text-white/70 text-sm">Certifications</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 backdrop-blur-lg">
              <CardContent className="p-4 text-center">
                <Zap className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{userProgress.currentStreak}</div>
                <div className="text-white/70 text-sm">Day Streak</div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-lg mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                  <Input
                    placeholder="Search training modules..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                >
                  <option value="all" className="text-black">All Categories</option>
                  {TRAINING_CATEGORIES.map((category) => (
                    <option key={category.id} value={category.id} className="text-black">
                      {category.name}
                    </option>
                  ))}
                </select>
                <Button className="btn-primary">
                  <Filter className="w-4 h-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Training Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {TRAINING_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-white/20 border-white/40 text-white'
                    : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/15'
                }`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="font-semibold text-sm">{category.name}</div>
              </button>
            ))}
          </div>

          {/* Training Modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((module) => (
              <Card key={module.id} className="bg-white/10 border-white/20 backdrop-blur-lg hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">{module.icon}</div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getDifficultyColor(module.difficulty)} text-white`}>
                        {module.difficulty}
                      </Badge>
                      {module.completed && (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-white font-semibold text-lg mb-2">{module.title}</h3>
                  <p className="text-white/70 text-sm mb-4 line-clamp-2">{module.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Duration:</span>
                      <span className="text-white">{module.duration} minutes</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Steps:</span>
                      <span className="text-white">{module.steps.length} lessons</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Rating:</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white">{module.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  {module.prerequisites && (
                    <div className="mb-4">
                      <div className="text-white/60 text-xs mb-1">Prerequisites:</div>
                      <div className="text-white/80 text-xs">
                        {module.prerequisites.map(prereq => 
                          modules.find(m => m.id === prereq)?.title
                        ).join(', ')}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => startModule(module)}
                      className="btn-primary flex-1"
                    >
                      {module.completed ? (
                        <>
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Review
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Start
                        </>
                      )}
                    </Button>
                    {module.certification && module.completed && (
                      <Button
                        onClick={() => downloadCertificate(module)}
                        className="btn-on-dark"
                      >
                        <Award className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredModules.length === 0 && (
            <Card className="bg-white/10 border-white/20 backdrop-blur-lg">
              <CardContent className="p-12 text-center">
                <BookOpen className="w-16 h-16 text-white/50 mx-auto mb-4" />
                <h3 className="text-white text-xl font-semibold mb-2">No modules found</h3>
                <p className="text-white/70">
                  Try adjusting your search or filter criteria.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}