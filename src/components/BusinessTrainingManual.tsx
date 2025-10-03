/**
 * MaycoleTracker™ Volume XI - Business Training Manual
 * Comprehensive training system for business owners and employees
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, BookOpen, Users, Target, CheckCircle, Play, Pause, 
  SkipForward, RotateCcw, Download, Star, Clock, Award, Lightbulb,
  Building2, DollarSign, BarChart3, Mic, Camera, Brain, Package,
  CreditCard, TrendingUp, AlertTriangle, Settings, Globe, Shield,
  Coffee, Presentation, FileText, Video, Headphones, Monitor
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'business' | 'platform' | 'ai' | 'financial' | 'industry';
  icon: React.ComponentType<any>;
  lessons: Lesson[];
  isCompleted?: boolean;
  isPremium?: boolean;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'interactive' | 'quiz' | 'demo';
  isCompleted?: boolean;
}

interface UserProgress {
  completedModules: string[];
  completedLessons: string[];
  totalProgress: number;
  certificationsEarned: string[];
}

const TRAINING_MODULES: TrainingModule[] = [
  // Business Fundamentals
  {
    id: 'business-fundamentals',
    title: 'Business Management Fundamentals',
    description: 'Learn how MaycoleTracker™ transforms your business operations beyond inventory management.',
    duration: '2 hours',
    difficulty: 'Beginner',
    category: 'business',
    icon: Building2,
    lessons: [
      {
        id: 'biz-101',
        title: 'Beyond Inventory: Complete Business Platform',
        description: 'Understanding how MaycoleTracker™ manages your entire business ecosystem.',
        duration: '15 min',
        type: 'video'
      },
      {
        id: 'biz-102',
        title: 'Dashboard Overview & Navigation',
        description: 'Master the main dashboard and navigate efficiently between business modules.',
        duration: '12 min',
        type: 'interactive'
      },
      {
        id: 'biz-103',
        title: 'Setting Up Your Business Profile',
        description: 'Configure your industry settings and business preferences for optimal performance.',
        duration: '20 min',
        type: 'demo'
      },
      {
        id: 'biz-104',
        title: 'Business Fundamentals Quiz',
        description: 'Test your understanding of core business management concepts.',
        duration: '10 min',
        type: 'quiz'
      }
    ]
  },

  // Financial Management
  {
    id: 'financial-management',
    title: 'Financial Operations & Payment Processing',
    description: 'Master financial management, payment processing, and business profitability analysis.',
    duration: '3 hours',
    difficulty: 'Intermediate',
    category: 'financial',
    icon: DollarSign,
    lessons: [
      {
        id: 'fin-101',
        title: 'Setting Up Payment Processing',
        description: 'Configure credit card processing and connect your bank accounts.',
        duration: '25 min',
        type: 'demo'
      },
      {
        id: 'fin-102',
        title: 'Financial Dashboard & Analytics',
        description: 'Understand cash flow, profit margins, and financial health indicators.',
        duration: '30 min',
        type: 'video'
      },
      {
        id: 'fin-103',
        title: 'Automated Invoicing & Collections',
        description: 'Set up automated billing, payment reminders, and collection processes.',
        duration: '20 min',
        type: 'interactive'
      },
      {
        id: 'fin-104',
        title: 'ROI Analysis & Business Spending',
        description: 'Analyze return on investment and optimize business expenditures.',
        duration: '35 min',
        type: 'video'
      },
      {
        id: 'fin-105',
        title: 'Financial Management Assessment',
        description: 'Comprehensive test of financial management skills.',
        duration: '15 min',
        type: 'quiz'
      }
    ]
  },

  // AI & Automation
  {
    id: 'ai-automation',
    title: 'AI Intelligence & Automation Systems',
    description: 'Harness the power of AI for voice control, predictive analytics, and automated business decisions.',
    duration: '2.5 hours',
    difficulty: 'Intermediate',
    category: 'ai',
    icon: Brain,
    lessons: [
      {
        id: 'ai-101',
        title: 'Voice Control Mastery',
        description: 'Learn voice commands for hands-free business management.',
        duration: '18 min',
        type: 'interactive'
      },
      {
        id: 'ai-102',
        title: 'Essential Products Intelligence',
        description: 'Understand AI-powered product recommendations and stock optimization.',
        duration: '22 min',
        type: 'video'
      },
      {
        id: 'ai-103',
        title: 'Automated Ordering Systems',
        description: 'Set up smart supplier management and automated procurement.',
        duration: '28 min',
        type: 'demo'
      },
      {
        id: 'ai-104',
        title: 'Business Analytics Agents',
        description: 'Deploy AI agents for continuous business monitoring and optimization.',
        duration: '25 min',
        type: 'video'
      },
      {
        id: 'ai-105',
        title: 'AI Automation Certification',
        description: 'Earn your AI automation specialist certification.',
        duration: '20 min',
        type: 'quiz'
      }
    ],
    isPremium: true
  },

  // Industry-Specific Training
  {
    id: 'industry-setup',
    title: 'Industry Configuration & Compliance',
    description: 'Configure your specific industry requirements and ensure regulatory compliance.',
    duration: '1.5 hours',
    difficulty: 'Beginner',
    category: 'industry',
    icon: Globe,
    lessons: [
      {
        id: 'ind-101',
        title: 'Choosing Your Industry Configuration',
        description: 'Select and configure your industry from 15+ pre-built templates.',
        duration: '15 min',
        type: 'demo'
      },
      {
        id: 'ind-102',
        title: 'Compliance & Regulatory Requirements',
        description: 'Understand industry-specific compliance (HIPAA, FDA, OSHA, etc.).',
        duration: '25 min',
        type: 'video'
      },
      {
        id: 'ind-103',
        title: 'Custom Industry Creation',
        description: 'Create custom industry configurations for unique business needs.',
        duration: '20 min',
        type: 'interactive'
      },
      {
        id: 'ind-104',
        title: 'Industry Compliance Assessment',
        description: 'Verify your understanding of industry requirements.',
        duration: '10 min',
        type: 'quiz'
      }
    ]
  },

  // Advanced Platform Features
  {
    id: 'advanced-platform',
    title: 'Advanced Platform Features',
    description: 'Master camera integration, scanner systems, and advanced business analytics.',
    duration: '3.5 hours',
    difficulty: 'Advanced',
    category: 'platform',
    icon: Monitor,
    lessons: [
      {
        id: 'adv-101',
        title: 'Camera & Scanner Integration',
        description: 'Use camera and scanner systems for inventory and document management.',
        duration: '30 min',
        type: 'demo'
      },
      {
        id: 'adv-102',
        title: 'Advanced Analytics & Reporting',
        description: 'Create custom reports and advanced business intelligence dashboards.',
        duration: '35 min',
        type: 'video'
      },
      {
        id: 'adv-103',
        title: 'Multi-Location Management',
        description: 'Manage multiple business locations and warehouses.',
        duration: '25 min',
        type: 'interactive'
      },
      {
        id: 'adv-104',
        title: 'API Integration & Custom Workflows',
        description: 'Integrate with external systems and create custom business workflows.',
        duration: '40 min',
        type: 'video'
      },
      {
        id: 'adv-105',
        title: 'Enterprise Master Certification',
        description: 'Final comprehensive assessment for platform mastery.',
        duration: '25 min',
        type: 'quiz'
      }
    ],
    isPremium: true
  }
];

export default function BusinessTrainingManual() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedModule, setSelectedModule] = useState<TrainingModule | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    completedModules: [],
    completedLessons: [],
    totalProgress: 0,
    certificationsEarned: []
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'business': return 'bg-blue-100 text-blue-800';
      case 'financial': return 'bg-green-100 text-green-800';
      case 'ai': return 'bg-purple-100 text-purple-800';
      case 'industry': return 'bg-orange-100 text-orange-800';
      case 'platform': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const startLesson = (module: TrainingModule, lesson: Lesson) => {
    setSelectedModule(module);
    setCurrentLesson(lesson);
    setIsPlaying(true);
    setProgress(0);
  };

  const completeLesson = () => {
    if (currentLesson) {
      setUserProgress(prev => ({
        ...prev,
        completedLessons: [...prev.completedLessons, currentLesson.id],
        totalProgress: prev.totalProgress + 1
      }));
    }
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'interactive': return Monitor;
      case 'quiz': return FileText;
      case 'demo': return Presentation;
      default: return BookOpen;
    }
  };

  return (
    <div className="white-background min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate('/main')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="text-right text-gray-600">
            <div className="text-sm font-medium">{currentTime.toLocaleDateString()}</div>
            <div className="text-xs opacity-70">{currentTime.toLocaleTimeString()}</div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <BookOpen className="w-10 h-10 inline mr-3" style={{ color: '#007BFF' }} />
            Business Training Manual
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Master MaycoleTracker™ Volume XI with our comprehensive training system. 
            From basic business management to advanced AI automation - become an expert user.
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span>Your Learning Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{userProgress.completedModules.length}</div>
                <div className="text-sm text-gray-600">Modules Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{userProgress.completedLessons.length}</div>
                <div className="text-sm text-gray-600">Lessons Finished</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{userProgress.certificationsEarned.length}</div>
                <div className="text-sm text-gray-600">Certifications Earned</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{Math.round(userProgress.totalProgress * 2.5)}%</div>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </div>
            </div>
            <div className="mt-4">
              <Progress value={userProgress.totalProgress * 2.5} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="modules" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="modules">Training Modules</TabsTrigger>
            <TabsTrigger value="quick-start">Quick Start Guide</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
          </TabsList>

          <TabsContent value="modules" className="space-y-6">
            {/* Training Modules Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {TRAINING_MODULES.map((module) => (
                <Card 
                  key={module.id} 
                  className="border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-blue-50">
                          <module.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-gray-900">{module.title}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getCategoryColor(module.category)}>
                              {module.category.toUpperCase()}
                            </Badge>
                            <Badge className={`${getDifficultyColor(module.difficulty)} text-white text-xs`}>
                              {module.difficulty}
                            </Badge>
                            {module.isPremium && (
                              <Badge className="bg-orange-500 text-white text-xs">PRO</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">{module.duration}</div>
                        <div className="text-xs text-gray-400">{module.lessons.length} lessons</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{module.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      {module.lessons.slice(0, 3).map((lesson) => {
                        const LessonIcon = getLessonIcon(lesson.type);
                        return (
                          <div 
                            key={lesson.id} 
                            className="flex items-center justify-between p-2 rounded bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                            onClick={() => startLesson(module, lesson)}
                          >
                            <div className="flex items-center space-x-2">
                              <LessonIcon className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-700">{lesson.title}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500">{lesson.duration}</span>
                              {userProgress.completedLessons.includes(lesson.id) && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                      {module.lessons.length > 3 && (
                        <div className="text-xs text-gray-500 text-center">
                          +{module.lessons.length - 3} more lessons
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={() => setSelectedModule(module)}
                      className="w-full text-white"
                      style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Module
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quick-start" className="space-y-6">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center space-x-2">
                  <Coffee className="w-5 h-5 text-orange-600" />
                  <span>Quick Start Guide - Get Running in 15 Minutes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold text-blue-600">1</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Choose Your Industry</h4>
                      <p className="text-sm text-gray-600">Select from 15+ pre-configured industries or create a custom setup.</p>
                      <Button 
                        className="mt-3 text-white text-xs"
                        style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
                        onClick={() => navigate('/industry-setup')}
                      >
                        Configure Industry
                      </Button>
                    </div>
                    
                    <div className="text-center p-4 border rounded-lg">
                      <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold text-green-600">2</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Set Up Payments</h4>
                      <p className="text-sm text-gray-600">Connect your bank account and enable credit card processing.</p>
                      <Button 
                        className="mt-3 text-white text-xs"
                        style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
                        onClick={() => navigate('/payment-processing')}
                      >
                        Setup Payments
                      </Button>
                    </div>
                    
                    <div className="text-center p-4 border rounded-lg">
                      <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold text-purple-600">3</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Enable AI Features</h4>
                      <p className="text-sm text-gray-600">Activate voice control and essential products intelligence.</p>
                      <Button 
                        className="mt-3 text-white text-xs"
                        style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
                        onClick={() => navigate('/voice-alerts')}
                      >
                        Enable AI
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-900 mb-1">Pro Tip</h4>
                        <p className="text-sm text-yellow-800">
                          Complete these three steps and you'll have a fully functional business management system. 
                          The AI will automatically configure essential products and suppliers for your industry.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certifications" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Business Management Specialist',
                  description: 'Master core business operations and platform navigation',
                  icon: Building2,
                  color: 'blue',
                  requirements: 'Complete Business Fundamentals module'
                },
                {
                  title: 'Financial Operations Expert',
                  description: 'Advanced financial management and payment processing',
                  icon: DollarSign,
                  color: 'green',
                  requirements: 'Complete Financial Management module'
                },
                {
                  title: 'AI Automation Specialist',
                  description: 'Voice control, automation, and AI-powered insights',
                  icon: Brain,
                  color: 'purple',
                  requirements: 'Complete AI & Automation module'
                },
                {
                  title: 'Industry Compliance Officer',
                  description: 'Regulatory compliance and industry-specific configurations',
                  icon: Shield,
                  color: 'orange',
                  requirements: 'Complete Industry Configuration module'
                },
                {
                  title: 'Platform Master',
                  description: 'Advanced features, integrations, and enterprise management',
                  icon: Award,
                  color: 'pink',
                  requirements: 'Complete Advanced Platform module'
                },
                {
                  title: 'MaycoleTracker™ Enterprise Certified',
                  description: 'Ultimate certification - complete mastery of all platform features',
                  icon: Crown,
                  color: 'gold',
                  requirements: 'Complete all modules and pass final assessment'
                }
              ].map((cert, index) => (
                <Card key={index} className="border-gray-200">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 bg-${cert.color}-100 rounded-full flex items-center justify-center`}>
                      <cert.icon className={`w-8 h-8 text-${cert.color}-600`} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{cert.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{cert.description}</p>
                    <div className="text-xs text-gray-500 mb-4">{cert.requirements}</div>
                    <Button
                      variant="outline"
                      className="w-full border-gray-300 text-gray-700"
                      disabled={!userProgress.certificationsEarned.includes(cert.title)}
                    >
                      {userProgress.certificationsEarned.includes(cert.title) ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Certified
                        </>
                      ) : (
                        <>
                          <Award className="w-4 h-4 mr-2" />
                          Not Earned
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Current Lesson Player */}
        {currentLesson && selectedModule && (
          <Card className="fixed bottom-4 right-4 w-96 border-gray-200 shadow-lg z-50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-gray-900">{currentLesson.title}</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentLesson(null)}
                  className="border-gray-300 text-gray-700"
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Progress value={progress} className="h-2" />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="border-gray-300 text-gray-700"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setProgress(0)}
                    className="border-gray-300 text-gray-700"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
                <span className="text-xs text-gray-500">{currentLesson.duration}</span>
              </div>
              <Button
                onClick={completeLesson}
                className="w-full text-white text-sm"
                style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark Complete
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Button
            onClick={() => navigate('/about')}
            className="h-16 text-white"
            style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
          >
            <Star className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-semibold">About Platform</div>
              <div className="text-xs opacity-80">Learn features</div>
            </div>
          </Button>
          
          <Button
            onClick={() => navigate('/business-analytics')}
            className="h-16 text-white"
            style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-semibold">Start Analytics</div>
              <div className="text-xs opacity-80">Apply training</div>
            </div>
          </Button>
          
          <Button
            onClick={() => navigate('/subscription')}
            className="h-16 text-white"
            style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
          >
            <Crown className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-semibold">Upgrade Plan</div>
              <div className="text-xs opacity-80">Access premium training</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}