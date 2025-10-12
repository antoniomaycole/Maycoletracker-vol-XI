import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { CheckCircle, Circle, ArrowRight, BookOpen } from 'lucide-react';
import { AppIcon } from './AppIcon';

interface OnboardingProps {
  onComplete: () => void;
  onStartTraining: () => void;
}

export function Onboarding({ onComplete, onStartTraining }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const steps = [
    {
      title: 'Welcome to MaycoleTraker',
      content: (
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <AppIcon size={96} />
          </div>
          <h2>Welcome to MaycoleTraker</h2>
          <p className="text-muted-foreground mb-2">
            Enterprise inventory management by MaycoleTechnologies™
          </p>
          <p className="text-sm text-muted-foreground">
            Join 10,000+ businesses worldwide using our AI-powered platform for intelligent 
            inventory optimization and predictive supply chain management.
          </p>
          <div className="p-4 bg-primary/5 rounded-lg">
            <h3 className="mb-2">What you'll learn:</h3>
            <ul className="text-sm space-y-1 text-left">
              <li>• How to add and track inventory items</li>
              <li>• Recording usage and deliveries</li>
              <li>• Setting up low stock alerts</li>
              <li>• Understanding reports and insights</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'Guided Tour',
      content: (
        <div className="space-y-4">
          <h2>🧭 Key Features Overview</h2>
          
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🏠</span>
                <strong>Dashboard</strong>
              </div>
              <p className="text-sm text-muted-foreground">
                Your home base - see total items, low stock alerts, and quick navigation buttons.
              </p>
            </div>

            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">📋</span>
                <strong>Inventory List</strong>
              </div>
              <p className="text-sm text-muted-foreground">
                View all items with search and filter. Red dots mean low stock - tap items to edit.
              </p>
            </div>

            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">📦</span>
                <strong>Log Usage</strong>
              </div>
              <p className="text-sm text-muted-foreground">
                Record what was used or received. This keeps your inventory counts accurate.
              </p>
            </div>

            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🔔</span>
                <strong>Alerts</strong>
              </div>
              <p className="text-sm text-muted-foreground">
                Get notified when items are running low so you can reorder in time.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Practice Tasks',
      content: (
        <div className="space-y-4">
          <h2>✅ Let's Practice Together</h2>
          <p className="text-muted-foreground mb-4">
            Complete these tasks to get familiar with the app. We've added some sample data to get you started.
          </p>

          <div className="space-y-3">
            {[
              { id: 'view-items', title: 'View sample inventory items', description: 'Check out the 3 sample items we added' },
              { id: 'add-item', title: 'Add your first item', description: 'Try adding a new inventory item' },
              { id: 'log-usage', title: 'Log a usage entry', description: 'Record using or receiving an item' },
              { id: 'check-alerts', title: 'Check low stock alerts', description: 'See which items need attention' },
              { id: 'view-reports', title: 'View the reports screen', description: 'Explore usage trends and data' }
            ].map(task => {
              const isCompleted = completedTasks.has(task.id);
              return (
                <div key={task.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="mt-1">
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-primary" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${isCompleted ? 'text-primary' : ''}`}>
                      {task.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {task.description}
                    </div>
                  </div>
                  {isCompleted && (
                    <Badge variant="default" className="text-xs">
                      Done
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-secondary/5 rounded-lg">
            <p className="text-sm">
              <strong>Don't worry!</strong> You can always access the training manual later from the dashboard, 
              and turn on Training Mode for helpful tooltips.
            </p>
          </div>
        </div>
      )
    }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const handleStartTraining = () => {
    onStartTraining();
    onComplete();
  };

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Content Card */}
        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep].title}</CardTitle>
          </CardHeader>
          <CardContent>
            {steps[currentStep].content}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6">
          <Button
            variant="ghost"
            onClick={handleSkip}
          >
            Skip Setup
          </Button>

          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Back
              </Button>
            )}
            
            {currentStep === steps.length - 1 ? (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleStartTraining}
                  className="gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Start Training Mode
                </Button>
                <Button onClick={handleNext} className="gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button onClick={handleNext} className="gap-2">
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>MaycoleTraker • Developed by MaycoleTechnologies™</p>
        </div>
      </div>
    </div>
  );
}