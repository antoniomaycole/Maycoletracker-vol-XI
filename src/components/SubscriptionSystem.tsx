/**
 * MaycoleTracker™ Volume XI - Complete Subscription Management System
 * 7-Day Trial + Professional ($89) + Enterprise ($199) Tiers
 * Features: Trial tracking, credit card processing, subscription management
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CreditCard, Calendar, CheckCircle, AlertTriangle,
  Shield, Star, Zap, Users, Building2, Globe, Clock, DollarSign,
  Lock, Unlock, RefreshCw, Download, Eye, Settings, Gift, Sparkles
} from 'lucide-react';
import { Activity } from 'lucide-react';
import { Crown, Target } from '@/lib/icons';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year';
  features: string[];
  maxUsers: number;
  maxItems: number;
  industries: number;
  support: string;
  analytics: boolean;
  aiAgents: boolean;
  customReports: boolean;
  apiAccess: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface UserSubscription {
  plan: string;
  status: 'trial' | 'active' | 'expired' | 'cancelled';
  startDate: string;
  endDate: string;
  trialDaysRemaining: number;
  paymentMethod?: {
    type: 'credit_card' | 'debit_card' | 'paypal';
    last4: string;
    brand: string;
    expiryMonth: number;
    expiryYear: number;
  };
  usageStats: {
    itemsTracked: number;
    reportsGenerated: number;
    apiCalls: number;
    storageUsed: number;
  };
}

interface CreditCardForm {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  holderName: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free Trial',
    price: 0,
    period: 'month',
    features: [
      '40-day full access trial',
      'Complete system access',
      'Unlimited items',
      'All features included',
      'Priority support'
    ],
    maxUsers: 1,
    maxItems: 100,
    industries: 1,
    support: 'Email',
    analytics: false,
    aiAgents: false,
    customReports: false,
    apiAccess: false,
    priority: 'low'
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 89,
    period: 'month',
    features: [
      'Unlimited inventory items',
      'Advanced analytics dashboard',
      'AI-powered insights',
      'Multi-industry support (8 types)',
      'Custom reports & exports',
      'Voice control system',
      'Camera & scanner integration',
      'Priority support',
      'API access',
      'Weekly automated reports'
    ],
    maxUsers: 5,
    maxItems: -1,
    industries: 8,
    support: 'Priority',
    analytics: true,
    aiAgents: true,
    customReports: true,
    apiAccess: true,
    priority: 'medium'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    period: 'month',
    features: [
      'Everything in Professional',
      'Unlimited users',
      'White-label solution',
      'Custom integrations',
      'Dedicated account manager',
      '24/7 phone support',
      'Advanced AI agents',
      'Real-time analytics',
      'Custom industry configurations',
      'SLA guarantee (99.9% uptime)',
      'Data export & migration',
      'Advanced security features'
    ],
    maxUsers: -1,
    maxItems: -1,
    industries: -1,
    support: '24/7 Phone',
    analytics: true,
    aiAgents: true,
    customReports: true,
    apiAccess: true,
    priority: 'high'
  }
];

export default function SubscriptionSystem() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedPlan, setSelectedPlan] = useState<string>('professional');
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Mock user subscription - in real app this would come from backend
  const [userSubscription, setUserSubscription] = useState<UserSubscription>({
    plan: 'free',
    status: 'trial',
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000).toISOString(),
    trialDaysRemaining: 40,
    usageStats: {
      itemsTracked: 45,
      reportsGenerated: 12,
      apiCalls: 0,
      storageUsed: 2.4
    }
  });

  const [creditCardForm, setCreditCardForm] = useState<CreditCardForm>({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    holderName: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US'
    }
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Update trial days remaining
      if (userSubscription.status === 'trial') {
        const endDate = new Date(userSubscription.endDate);
        const now = new Date();
        const daysRemaining = Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
        setUserSubscription(prev => ({
          ...prev,
          trialDaysRemaining: daysRemaining
        }));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [userSubscription.endDate, userSubscription.status]);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) { // 16 digits + 3 spaces
      setCreditCardForm(prev => ({ ...prev, cardNumber: formatted }));
    }
  };

  const validateCreditCard = (): boolean => {
    const { cardNumber, expiryMonth, expiryYear, cvv, holderName } = creditCardForm;
    
    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
      setPaymentError('Please enter a valid 16-digit card number');
      return false;
    }
    
    if (!expiryMonth || !expiryYear) {
      setPaymentError('Please enter card expiry date');
      return false;
    }
    
    if (!cvv || cvv.length < 3) {
      setPaymentError('Please enter a valid CVV');
      return false;
    }
    
    if (!holderName.trim()) {
      setPaymentError('Please enter cardholder name');
      return false;
    }
    
    // Check if card is expired
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const expYear = parseInt(expiryYear);
    const expMonth = parseInt(expiryMonth);
    
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      setPaymentError('This card has expired');
      return false;
    }
    
    setPaymentError('');
    return true;
  };

  const processPayment = async () => {
    if (!validateCreditCard()) return;
    
    setIsProcessingPayment(true);
    setPaymentError('');
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate payment success/failure
      const success = Math.random() > 0.1; // 90% success rate
      
      if (success) {
        const plan = SUBSCRIPTION_PLANS.find(p => p.id === selectedPlan);
        if (plan) {
          setUserSubscription(prev => ({
            ...prev,
            plan: selectedPlan,
            status: 'active',
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            paymentMethod: {
              type: 'credit_card',
              last4: creditCardForm.cardNumber.slice(-4),
              brand: getCardBrand(creditCardForm.cardNumber),
              expiryMonth: parseInt(creditCardForm.expiryMonth),
              expiryYear: parseInt(creditCardForm.expiryYear)
            }
          }));
          setPaymentSuccess(true);
          setShowCreditCardForm(false);
        }
      } else {
        setPaymentError('Payment failed. Please check your card details and try again.');
      }
    } catch (error) {
      setPaymentError('Payment processing error. Please try again.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const getCardBrand = (cardNumber: string): string => {
    const number = cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return 'Visa';
    if (number.startsWith('5') || number.startsWith('2')) return 'Mastercard';
    if (number.startsWith('3')) return 'American Express';
    return 'Unknown';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'trial':
        return <Badge className="bg-blue-500 text-white">Free Trial</Badge>;
      case 'active':
        return <Badge className="bg-green-500 text-white">Active</Badge>;
      case 'expired':
        return <Badge className="bg-red-500 text-white">Expired</Badge>;
      case 'cancelled':
        return <Badge className="bg-gray-500 text-white">Cancelled</Badge>;
      default:
        return <Badge className="bg-gray-500 text-white">Unknown</Badge>;
    }
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'free': return <Gift className="w-6 h-6 text-blue-600" />;
      case 'professional': return <Star className="w-6 h-6 text-purple-600" />;
      case 'enterprise': return <Crown className="w-6 h-6 text-yellow-600" />;
      default: return <Zap className="w-6 h-6 text-gray-600" />;
    }
  };

  const currentPlan = SUBSCRIPTION_PLANS.find(p => p.id === userSubscription.plan);

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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <Crown className="w-10 h-10 inline mr-3" style={{ color: '#007BFF' }} />
            Subscription Management
          </h1>
          <p className="text-gray-600">Choose your plan and manage your MaycoleTracker™ subscription</p>
        </div>

        {/* Current Subscription Status */}
        <Card className="mb-8 border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" style={{ color: '#007BFF' }} />
                <span>Current Subscription</span>
              </div>
              {getStatusBadge(userSubscription.status)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                {getPlanIcon(userSubscription.plan)}
                <div className="text-lg font-semibold text-gray-900 mt-2">
                  {currentPlan?.name || 'Unknown Plan'}
                </div>
                <div className="text-sm text-gray-600">Current Plan</div>
              </div>
              
              <div className="text-center">
                <Clock className="w-6 h-6 text-orange-600 mx-auto" />
                <div className="text-lg font-semibold text-gray-900 mt-2">
                  {userSubscription.status === 'trial' ? userSubscription.trialDaysRemaining : '30'}
                </div>
                <div className="text-sm text-gray-600">
                  {userSubscription.status === 'trial' ? 'Trial Days Left' : 'Days Remaining'}
                </div>
              </div>
              
              <div className="text-center">
                <DollarSign className="w-6 h-6 text-green-600 mx-auto" />
                <div className="text-lg font-semibold text-gray-900 mt-2">
                  ${currentPlan?.price || 0}/mo
                </div>
                <div className="text-sm text-gray-600">Monthly Cost</div>
              </div>
              
              <div className="text-center">
                <Target className="w-6 h-6 text-blue-600 mx-auto" />
                <div className="text-lg font-semibold text-gray-900 mt-2">
                  {userSubscription.usageStats.itemsTracked}
                </div>
                <div className="text-sm text-gray-600">Items Tracked</div>
              </div>
            </div>

            {userSubscription.status === 'trial' && userSubscription.trialDaysRemaining <= 3 && (
              <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center space-x-2 text-orange-800">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-medium">Trial Ending Soon!</span>
                </div>
                <p className="text-orange-700 text-sm mt-1">
                  Your trial expires in {userSubscription.trialDaysRemaining} days. Upgrade now to continue using all features.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Success Message */}
        {paymentSuccess && (
          <Card className="mb-8 bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 text-green-800">
                <CheckCircle className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold">Payment Successful!</h3>
                  <p className="text-sm text-green-700">Your subscription has been activated. Welcome to MaycoleTracker™ {selectedPlan}!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <Card 
              key={plan.id} 
              className={`border-2 transition-all duration-300 ${
                selectedPlan === plan.id 
                  ? 'border-purple-400 bg-purple-50' 
                  : 'border-gray-200 hover:border-purple-300'
              } ${plan.id === 'professional' ? 'scale-105 shadow-lg' : ''}`}
            >
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {getPlanIcon(plan.id)}
                </div>
                <CardTitle className="text-gray-900">{plan.name}</CardTitle>
                {plan.id === 'professional' && (
                  <Badge className="bg-purple-500 text-white mx-auto">Most Popular</Badge>
                )}
                <div className="text-3xl font-bold text-gray-900">
                  ${plan.price}
                  <span className="text-lg font-normal text-gray-600">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
                  <div>Users: {plan.maxUsers === -1 ? 'Unlimited' : plan.maxUsers}</div>
                  <div>Items: {plan.maxItems === -1 ? 'Unlimited' : plan.maxItems}</div>
                  <div>Industries: {plan.industries === -1 ? 'All' : plan.industries}</div>
                  <div>Support: {plan.support}</div>
                </div>

                <Button
                  onClick={() => {
                    setSelectedPlan(plan.id);
                    if (plan.id !== 'free' && userSubscription.plan !== plan.id) {
                      setShowCreditCardForm(true);
                    }
                  }}
                  disabled={userSubscription.plan === plan.id}
                  className={`w-full ${
                    plan.id === 'free' 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : plan.id === 'professional'
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
                  } text-white`}
                  style={{
                    background: userSubscription.plan === plan.id 
                      ? '#9CA3AF' 
                      : plan.id === 'professional' 
                      ? 'linear-gradient(135deg, #007BFF, #0056b3)' 
                      : plan.id === 'enterprise'
                      ? 'linear-gradient(135deg, #007BFF, #0056b3)'
                      : 'linear-gradient(135deg, #3B82F6, #6366F1)'
                  }}
                >
                  {userSubscription.plan === plan.id ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Current Plan
                    </>
                  ) : plan.id === 'free' ? (
                    <>
                      <Gift className="w-4 h-4 mr-2" />
                      Start Trial
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Upgrade Now
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Credit Card Form */}
        {showCreditCardForm && (
          <Card className="mb-8 border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center space-x-2">
                <CreditCard className="w-5 h-5" style={{ color: '#007BFF' }} />
                <span>Payment Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {paymentError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {paymentError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <Input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={creditCardForm.cardNumber}
                      onChange={handleCardNumberChange}
                      className="w-full"
                      maxLength={19}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Month
                      </label>
                      <select
                        value={creditCardForm.expiryMonth}
                        onChange={(e) => setCreditCardForm(prev => ({ ...prev, expiryMonth: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="">MM</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                            {String(i + 1).padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year
                      </label>
                      <select
                        value={creditCardForm.expiryYear}
                        onChange={(e) => setCreditCardForm(prev => ({ ...prev, expiryYear: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="">YYYY</option>
                        {Array.from({ length: 10 }, (_, i) => {
                          const year = new Date().getFullYear() + i;
                          return (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <Input
                        type="text"
                        placeholder="123"
                        value={creditCardForm.cvv}
                        onChange={(e) => setCreditCardForm(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                        className="w-full"
                        maxLength={4}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      value={creditCardForm.holderName}
                      onChange={(e) => setCreditCardForm(prev => ({ ...prev, holderName: e.target.value }))}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Billing Address</h4>
                  
                  <Input
                    type="text"
                    placeholder="Street Address"
                    value={creditCardForm.billingAddress.street}
                    onChange={(e) => setCreditCardForm(prev => ({ 
                      ...prev, 
                      billingAddress: { ...prev.billingAddress, street: e.target.value }
                    }))}
                    className="w-full"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="text"
                      placeholder="City"
                      value={creditCardForm.billingAddress.city}
                      onChange={(e) => setCreditCardForm(prev => ({ 
                        ...prev, 
                        billingAddress: { ...prev.billingAddress, city: e.target.value }
                      }))}
                    />
                    <Input
                      type="text"
                      placeholder="State"
                      value={creditCardForm.billingAddress.state}
                      onChange={(e) => setCreditCardForm(prev => ({ 
                        ...prev, 
                        billingAddress: { ...prev.billingAddress, state: e.target.value }
                      }))}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="text"
                      placeholder="ZIP Code"
                      value={creditCardForm.billingAddress.zipCode}
                      onChange={(e) => setCreditCardForm(prev => ({ 
                        ...prev, 
                        billingAddress: { ...prev.billingAddress, zipCode: e.target.value }
                      }))}
                    />
                    <select
                      value={creditCardForm.billingAddress.country}
                      onChange={(e) => setCreditCardForm(prev => ({ 
                        ...prev, 
                        billingAddress: { ...prev.billingAddress, country: e.target.value }
                      }))}
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  <Lock className="w-4 h-4 inline mr-1" />
                  Secure 256-bit SSL encryption
                </div>
                
                <div className="flex space-x-3">
                  <Button
                    onClick={() => setShowCreditCardForm(false)}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={processPayment}
                    disabled={isProcessingPayment}
                    className="text-white"
                    style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
                  >
                    {isProcessingPayment ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Subscribe for ${SUBSCRIPTION_PLANS.find(p => p.id === selectedPlan)?.price}/mo
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Usage Statistics */}
        <Card className="mb-8 border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center space-x-2">
              <Activity className="w-5 h-5" style={{ color: '#007BFF' }} />
              <span>Usage Statistics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{userSubscription.usageStats.itemsTracked}</div>
                <div className="text-sm text-gray-600">Items Tracked</div>
                <div className="text-xs text-purple-600">
                  {currentPlan?.maxItems === -1 ? 'Unlimited' : `${currentPlan?.maxItems || 0} limit`}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{userSubscription.usageStats.reportsGenerated}</div>
                <div className="text-sm text-gray-600">Reports Generated</div>
                <div className="text-xs text-green-600">This month</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{userSubscription.usageStats.apiCalls}</div>
                <div className="text-sm text-gray-600">API Calls</div>
                <div className="text-xs text-blue-600">
                  {currentPlan?.apiAccess ? 'Available' : 'Not available'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{userSubscription.usageStats.storageUsed} GB</div>
                <div className="text-sm text-gray-600">Storage Used</div>
                <div className="text-xs text-orange-600">5 GB limit</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={() => navigate('/weekly-reports')}
            className="h-16 text-white"
            style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
          >
            <Download className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-semibold">Download Reports</div>
              <div className="text-xs opacity-80">Export your data</div>
            </div>
          </Button>
          
          <Button
            onClick={() => navigate('/industry-setup')}
            className="h-16 text-white"
            style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
          >
            <Settings className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-semibold">Manage Settings</div>
              <div className="text-xs opacity-80">Configure your account</div>
            </div>
          </Button>
          
          <Button
            onClick={() => navigate('/ai-agent')}
            className="h-16 text-white"
            style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-semibold">AI Insights</div>
              <div className="text-xs opacity-80">View recommendations</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}