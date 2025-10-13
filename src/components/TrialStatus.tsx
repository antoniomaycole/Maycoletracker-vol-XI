/**
 * MaycoleTracker™ Volume XI - Trial Status Component
 * Tracks 7-day trial period and prompts for subscription
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, AlertTriangle, CheckCircle, Calendar, CreditCard } from 'lucide-react';
import { Crown } from '@/lib/icons';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface TrialInfo {
  startDate: Date;
  endDate: Date;
  daysRemaining: number;
  isExpired: boolean;
  plan: 'trial' | 'professional' | 'enterprise';
}

export default function TrialStatus() {
  const navigate = useNavigate();
  const [trialInfo, setTrialInfo] = useState<TrialInfo>(() => {
    // Check if trial data exists in localStorage
    const savedTrial = localStorage.getItem('maycoletracker-trial');
    if (savedTrial) {
      const parsed = JSON.parse(savedTrial);
      const startDate = new Date(parsed.startDate);
      const endDate = new Date(parsed.endDate);
      const now = new Date();
      const daysRemaining = Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
      
      return {
        startDate,
        endDate,
        daysRemaining,
        isExpired: daysRemaining <= 0,
        plan: parsed.plan || 'trial'
      };
    } else {
      // Start new 40-day trial
      const startDate = new Date();
      const endDate = new Date(startDate.getTime() + 40 * 24 * 60 * 60 * 1000);
      const trialData = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        plan: 'trial'
      };
      localStorage.setItem('maycoletracker-trial', JSON.stringify(trialData));
      
      return {
        startDate,
        endDate,
        daysRemaining: 40,
        isExpired: false,
        plan: 'trial'
      };
    }
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const daysRemaining = Math.max(0, Math.ceil((trialInfo.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
      
      setTrialInfo(prev => ({
        ...prev,
        daysRemaining,
        isExpired: daysRemaining <= 0
      }));
    }, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(timer);
  }, [trialInfo.endDate]);

  const getStatusColor = () => {
    if (trialInfo.plan !== 'trial') return 'bg-green-500 text-white';
    if (trialInfo.isExpired) return 'bg-red-500 text-white';
    if (trialInfo.daysRemaining <= 2) return 'bg-orange-500 text-white';
    return 'bg-blue-500 text-white';
  };

  const getStatusText = () => {
    if (trialInfo.plan === 'professional') return 'Professional';
    if (trialInfo.plan === 'enterprise') return 'Enterprise';
    if (trialInfo.isExpired) return 'Trial Expired';
    return `${trialInfo.daysRemaining} Days Left`;
  };

  const shouldShowWarning = () => {
    return trialInfo.plan === 'trial' && (trialInfo.daysRemaining <= 3 || trialInfo.isExpired);
  };

  if (trialInfo.plan !== 'trial') {
    // User has a paid subscription
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Crown className="w-5 h-5 text-green-600" />
            <div className="flex-1">
              <div className="font-semibold text-green-800">
                MaycoleTracker™ {trialInfo.plan.charAt(0).toUpperCase() + trialInfo.plan.slice(1)}
              </div>
              <div className="text-sm text-green-600">All features unlocked</div>
            </div>
            <Badge className="bg-green-500 text-white">Active</Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className={`border-2 ${
        trialInfo.isExpired ? 'border-red-200 bg-red-50' :
        trialInfo.daysRemaining <= 2 ? 'border-orange-200 bg-orange-50' :
        'border-blue-200 bg-blue-50'
      }`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Clock className={`w-5 h-5 ${
                trialInfo.isExpired ? 'text-red-600' :
                trialInfo.daysRemaining <= 2 ? 'text-orange-600' :
                'text-blue-600'
              }`} />
              <div>
                <div className={`font-semibold ${
                  trialInfo.isExpired ? 'text-red-800' :
                  trialInfo.daysRemaining <= 2 ? 'text-orange-800' :
                  'text-blue-800'
                }`}>
                  Free Trial {trialInfo.isExpired ? 'Expired' : 'Active'}
                </div>
                <div className={`text-sm ${
                  trialInfo.isExpired ? 'text-red-600' :
                  trialInfo.daysRemaining <= 2 ? 'text-orange-600' :
                  'text-blue-600'
                }`}>
                  {trialInfo.isExpired ? 
                    'Upgrade to continue using all features' :
                    `${trialInfo.daysRemaining} day${trialInfo.daysRemaining === 1 ? '' : 's'} remaining`
                  }
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor()}>
                {getStatusText()}
              </Badge>
              
              <Button
                onClick={() => navigate('/subscription')}
                size="sm"
                className="text-white"
                style={{ background: 'linear-gradient(135deg, #4B0082, #6B46C1)' }}
              >
                {trialInfo.isExpired ? (
                  <>
                    <CreditCard className="w-4 h-4 mr-1" />
                    Upgrade Now
                  </>
                ) : (
                  <>
                    <Crown className="w-4 h-4 mr-1" />
                    Upgrade
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warning Banner */}
      {shouldShowWarning() && (
        <Card className={`mt-4 border-2 ${
          trialInfo.isExpired ? 'border-red-300 bg-red-100' : 'border-orange-300 bg-orange-100'
        }`}>
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                trialInfo.isExpired ? 'text-red-600' : 'text-orange-600'
              }`} />
              <div className="flex-1">
                <h3 className={`font-semibold ${
                  trialInfo.isExpired ? 'text-red-800' : 'text-orange-800'
                }`}>
                  {trialInfo.isExpired ? 'Your trial has expired!' : 'Trial ending soon!'}
                </h3>
                <p className={`text-sm mt-1 ${
                  trialInfo.isExpired ? 'text-red-700' : 'text-orange-700'
                }`}>
                  {trialInfo.isExpired ? 
                    'Some features may be limited. Upgrade to a paid plan to restore full access to all MaycoleTracker™ features.' :
                    `Your trial expires in ${trialInfo.daysRemaining} day${trialInfo.daysRemaining === 1 ? '' : 's'}. Choose a plan to continue enjoying all features.`
                  }
                </p>
                
                <div className="flex items-center space-x-3 mt-3">
                  <Button
                    onClick={() => navigate('/subscription')}
                    size="sm"
                    className="text-white"
                    style={{ background: 'linear-gradient(135deg, #4B0082, #6B46C1)' }}
                  >
                    <Crown className="w-4 h-4 mr-1" />
                    View Plans ($89/mo Professional)
                  </Button>
                  
                  <Button
                    onClick={() => navigate('/business-analytics')}
                    variant="outline"
                    size="sm"
                    className="border-gray-300 text-gray-700"
                  >
                    See ROI Calculator
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}