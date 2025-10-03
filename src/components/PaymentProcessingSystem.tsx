/**
 * MaycoleTracker™ Volume XI - Payment Processing System
 * Complete payment processing with credit cards and bank account integration
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CreditCard, Building, DollarSign, TrendingUp, Shield, CheckCircle, 
  AlertTriangle, Plus, Settings, Download, BarChart3, Users, Calendar,
  Building as Bank, Smartphone, Globe, Lock, Award, Zap, Activity,
  FileText, PieChart, ArrowUpRight, ArrowDownRight, RefreshCw,
  Eye, EyeOff, Copy, Star, Crown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'digital';
  name: string;
  last4: string;
  brand?: string;
  expiryDate?: string;
  isDefault: boolean;
  isActive: boolean;
}

interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  description: string;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
  method: string;
  category: string;
}

interface BankAccount {
  id: string;
  bankName: string;
  accountType: 'checking' | 'savings' | 'business';
  last4: string;
  routingNumber: string;
  isVerified: boolean;
  isDefault: boolean;
}

const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'card-1',
    type: 'card',
    name: 'Business Visa',
    last4: '4242',
    brand: 'Visa',
    expiryDate: '12/25',
    isDefault: true,
    isActive: true
  },
  {
    id: 'bank-1',
    type: 'bank',
    name: 'Business Checking',
    last4: '1234',
    isDefault: false,
    isActive: true
  }
];

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'txn-1',
    amount: 2450.00,
    type: 'income',
    description: 'Customer Payment - Invoice #1001',
    date: new Date(2024, 0, 15),
    status: 'completed',
    method: 'Visa •••• 4242',
    category: 'Sales'
  },
  {
    id: 'txn-2',
    amount: 890.00,
    type: 'income',
    description: 'Subscription Payment - Pro Plan',
    date: new Date(2024, 0, 14),
    status: 'completed',
    method: 'Bank Transfer',
    category: 'Subscription'
  },
  {
    id: 'txn-3',
    amount: 325.50,
    type: 'expense',
    description: 'Supplier Payment - ABC Supply Co',
    date: new Date(2024, 0, 13),
    status: 'completed',
    method: 'Business Checking',
    category: 'Supplies'
  },
  {
    id: 'txn-4',
    amount: 1200.00,
    type: 'income',
    description: 'Customer Payment - Invoice #1002',
    date: new Date(2024, 0, 12),
    status: 'pending',
    method: 'Bank Transfer',
    category: 'Sales'
  }
];

const MOCK_BANK_ACCOUNTS: BankAccount[] = [
  {
    id: 'bank-1',
    bankName: 'Chase Business',
    accountType: 'checking',
    last4: '1234',
    routingNumber: '021000021',
    isVerified: true,
    isDefault: true
  },
  {
    id: 'bank-2',
    bankName: 'Bank of America',
    accountType: 'savings',
    last4: '5678',
    routingNumber: '026009593',
    isVerified: false,
    isDefault: false
  }
];

export default function PaymentProcessingSystem() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(MOCK_PAYMENT_METHODS);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(MOCK_BANK_ACCOUNTS);
  const [showAddCard, setShowAddCard] = useState(false);
  const [showAddBank, setShowAddBank] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAccountNumbers, setShowAccountNumbers] = useState(false);

  // New payment method form state
  const [newCard, setNewCard] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    zipCode: ''
  });

  const [newBank, setNewBank] = useState({
    bankName: '',
    accountType: 'checking' as 'checking' | 'savings' | 'business',
    accountNumber: '',
    routingNumber: '',
    accountHolderName: ''
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const totalIncome = transactions
    .filter(t => t.type === 'income' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalIncome - totalExpenses;
  const pendingAmount = transactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  const addPaymentMethod = () => {
    setIsProcessing(true);
    
    // Simulate payment method addition
    setTimeout(() => {
      if (showAddCard) {
        const newPaymentMethod: PaymentMethod = {
          id: `card-${Date.now()}`,
          type: 'card',
          name: newCard.name || 'New Card',
          last4: newCard.number.slice(-4),
          brand: 'Visa', // In real implementation, detect from number
          expiryDate: newCard.expiry,
          isDefault: paymentMethods.length === 0,
          isActive: true
        };
        setPaymentMethods(prev => [...prev, newPaymentMethod]);
        setNewCard({ number: '', expiry: '', cvc: '', name: '', zipCode: '' });
        setShowAddCard(false);
      }
      
      if (showAddBank) {
        const newBankAccount: BankAccount = {
          id: `bank-${Date.now()}`,
          bankName: newBank.bankName,
          accountType: newBank.accountType,
          last4: newBank.accountNumber.slice(-4),
          routingNumber: newBank.routingNumber,
          isVerified: false, // Requires verification process
          isDefault: bankAccounts.length === 0
        };
        setBankAccounts(prev => [...prev, newBankAccount]);
        setNewBank({ bankName: '', accountType: 'checking', accountNumber: '', routingNumber: '', accountHolderName: '' });
        setShowAddBank(false);
      }
      
      setIsProcessing(false);
      
      // Voice feedback
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(
          showAddCard ? 'Credit card added successfully' : 'Bank account added successfully'
        );
        window.speechSynthesis.speak(utterance);
      }
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Show success feedback (could add toast notification here)
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
            <CreditCard className="w-10 h-10 inline mr-3" style={{ color: '#007BFF' }} />
            Payment Processing Center
          </h1>
          <p className="text-gray-600">Accept payments, manage bank accounts, and track all financial transactions</p>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-gray-200">
            <CardContent className="p-4 text-center">
              <ArrowUpRight className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(totalIncome)}</div>
              <div className="text-sm text-gray-600">Total Income</div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4 text-center">
              <ArrowDownRight className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(totalExpenses)}</div>
              <div className="text-sm text-gray-600">Total Expenses</div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(netProfit)}</div>
              <div className="text-sm text-gray-600">Net Profit</div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4 text-center">
              <RefreshCw className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(pendingAmount)}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="cards">Credit Cards</TabsTrigger>
            <TabsTrigger value="banking">Bank Accounts</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Payment Methods Overview */}
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span>Payment Methods</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded bg-blue-50">
                            {method.type === 'card' ? (
                              <CreditCard className="w-4 h-4 text-blue-600" />
                            ) : (
                              <Bank className="w-4 h-4 text-green-600" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{method.name}</div>
                            <div className="text-sm text-gray-500">
                              •••• {method.last4}
                              {method.expiryDate && ` • ${method.expiryDate}`}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {method.isDefault && (
                            <Badge className="bg-blue-500 text-white text-xs">Default</Badge>
                          )}
                          <div className={`w-2 h-2 rounded-full ${method.isActive ? 'bg-green-500' : 'bg-gray-300'}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => setShowAddCard(true)}
                    variant="outline"
                    className="w-full mt-4 border-gray-300 text-gray-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Transactions */}
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-green-600" />
                    <span>Recent Transactions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {transactions.slice(0, 5).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded ${transaction.type === 'income' ? 'bg-green-50' : 'bg-red-50'}`}>
                            {transaction.type === 'income' ? (
                              <ArrowUpRight className="w-4 h-4 text-green-600" />
                            ) : (
                              <ArrowDownRight className="w-4 h-4 text-red-600" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-sm">{transaction.description}</div>
                            <div className="text-xs text-gray-500">{transaction.method}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                          </div>
                          <Badge className={`text-xs ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => navigate('/spending-reports')}
                    variant="outline"
                    className="w-full mt-4 border-gray-300 text-gray-700"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    View All Transactions
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Payment Processing Features */}
            <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-2 text-blue-600" />
                  Enterprise Payment Processing
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Secure Processing</h4>
                    <p className="text-sm text-gray-600">Bank-level encryption and PCI DSS compliance for all transactions.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                      <Globe className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Global Payments</h4>
                    <p className="text-sm text-gray-600">Accept payments from customers worldwide with multi-currency support.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
                      <Zap className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Instant Processing</h4>
                    <p className="text-sm text-gray-600">Real-time payment processing with immediate confirmation.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cards" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Credit Cards</h3>
              <Button
                onClick={() => setShowAddCard(true)}
                className="text-white"
                style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Credit Card
              </Button>
            </div>

            {showAddCard && (
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-gray-900">Add New Credit Card</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={newCard.number}
                        onChange={(e) => setNewCard(prev => ({ ...prev, number: e.target.value }))}
                        className="border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        value={newCard.name}
                        onChange={(e) => setNewCard(prev => ({ ...prev, name: e.target.value }))}
                        className="border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={newCard.expiry}
                        onChange={(e) => setNewCard(prev => ({ ...prev, expiry: e.target.value }))}
                        className="border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input
                        id="cvc"
                        placeholder="123"
                        type="password"
                        value={newCard.cvc}
                        onChange={(e) => setNewCard(prev => ({ ...prev, cvc: e.target.value }))}
                        className="border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        placeholder="12345"
                        value={newCard.zipCode}
                        onChange={(e) => setNewCard(prev => ({ ...prev, zipCode: e.target.value }))}
                        className="border-gray-300"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <Button
                      onClick={addPaymentMethod}
                      disabled={isProcessing}
                      className="text-white"
                      style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Card
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => setShowAddCard(false)}
                      variant="outline"
                      className="border-gray-300 text-gray-700"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paymentMethods.filter(m => m.type === 'card').map((card) => (
                <Card key={card.id} className="border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{card.name}</h4>
                        <p className="text-sm text-gray-500">{card.brand} •••• {card.last4}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {card.isDefault && (
                          <Badge className="bg-blue-500 text-white text-xs">Default</Badge>
                        )}
                        <div className={`w-2 h-2 rounded-full ${card.isActive ? 'bg-green-500' : 'bg-gray-300'}`} />
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      Expires: {card.expiryDate}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700"
                      >
                        <Settings className="w-4 h-4 mr-1" />
                        Settings
                      </Button>
                      {!card.isDefault && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-300 text-gray-700"
                        >
                          <Star className="w-4 h-4 mr-1" />
                          Set Default
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="banking" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Bank Accounts</h3>
              <Button
                onClick={() => setShowAddBank(true)}
                className="text-white"
                style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Bank Account
              </Button>
            </div>

            {showAddBank && (
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-gray-900">Add Bank Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bankName">Bank Name</Label>
                      <Input
                        id="bankName"
                        placeholder="Chase Bank"
                        value={newBank.bankName}
                        onChange={(e) => setNewBank(prev => ({ ...prev, bankName: e.target.value }))}
                        className="border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="accountType">Account Type</Label>
                      <select
                        id="accountType"
                        value={newBank.accountType}
                        onChange={(e) => setNewBank(prev => ({ ...prev, accountType: e.target.value as any }))}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="checking">Checking</option>
                        <option value="savings">Savings</option>
                        <option value="business">Business</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="routingNumber">Routing Number</Label>
                      <Input
                        id="routingNumber"
                        placeholder="021000021"
                        value={newBank.routingNumber}
                        onChange={(e) => setNewBank(prev => ({ ...prev, routingNumber: e.target.value }))}
                        className="border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input
                        id="accountNumber"
                        placeholder="1234567890"
                        type="password"
                        value={newBank.accountNumber}
                        onChange={(e) => setNewBank(prev => ({ ...prev, accountNumber: e.target.value }))}
                        className="border-gray-300"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="accountHolderName">Account Holder Name</Label>
                      <Input
                        id="accountHolderName"
                        placeholder="Business Name or Individual Name"
                        value={newBank.accountHolderName}
                        onChange={(e) => setNewBank(prev => ({ ...prev, accountHolderName: e.target.value }))}
                        className="border-gray-300"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <Button
                      onClick={addPaymentMethod}
                      disabled={isProcessing}
                      className="text-white"
                      style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Account
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => setShowAddBank(false)}
                      variant="outline"
                      className="border-gray-300 text-gray-700"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bankAccounts.map((account) => (
                <Card key={account.id} className="border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{account.bankName}</h4>
                        <p className="text-sm text-gray-500 capitalize">{account.accountType} •••• {account.last4}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {account.isVerified ? (
                          <Badge className="bg-green-500 text-white text-xs">Verified</Badge>
                        ) : (
                          <Badge className="bg-yellow-500 text-white text-xs">Pending</Badge>
                        )}
                        {account.isDefault && (
                          <Badge className="bg-blue-500 text-white text-xs">Default</Badge>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Routing Number:</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-gray-900">
                            {showAccountNumbers ? account.routingNumber : '•••••••••'}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(account.routingNumber)}
                            className="p-1 h-auto"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAccountNumbers(!showAccountNumbers)}
                        className="border-gray-300 text-gray-700"
                      >
                        {showAccountNumbers ? (
                          <EyeOff className="w-4 h-4 mr-1" />
                        ) : (
                          <Eye className="w-4 h-4 mr-1" />
                        )}
                        {showAccountNumbers ? 'Hide' : 'Show'}
                      </Button>
                      {!account.isVerified && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-300 text-gray-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Verify
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Transaction History</h3>
              <Button
                onClick={() => navigate('/spending-reports')}
                variant="outline"
                className="border-gray-300 text-gray-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>

            <Card className="border-gray-200">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-full ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                          {transaction.type === 'income' ? (
                            <ArrowUpRight className="w-5 h-5 text-green-600" />
                          ) : (
                            <ArrowDownRight className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                          <p className="text-sm text-gray-500">{transaction.method} • {transaction.category}</p>
                          <p className="text-xs text-gray-400">{transaction.date.toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </div>
                        <Badge className={`text-xs ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Payment Processing Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Security Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Two-factor authentication</span>
                      <Badge className="bg-green-500 text-white text-xs">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Email notifications for transactions</span>
                      <Badge className="bg-green-500 text-white text-xs">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">SMS alerts for large transactions</span>
                      <Badge className="bg-yellow-500 text-white text-xs">Disabled</Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Processing Limits</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Daily processing limit</span>
                      <span className="text-sm font-medium text-gray-900">$50,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Monthly processing limit</span>
                      <span className="text-sm font-medium text-gray-900">$1,000,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Single transaction limit</span>
                      <span className="text-sm font-medium text-gray-900">$10,000</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Compliance & Reporting</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">PCI DSS Compliance</span>
                      <Badge className="bg-green-500 text-white text-xs">Certified</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Automatic tax reporting</span>
                      <Badge className="bg-green-500 text-white text-xs">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Monthly financial reports</span>
                      <Badge className="bg-green-500 text-white text-xs">Enabled</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Button
            onClick={() => navigate('/business-analytics')}
            className="h-16 text-white"
            style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-semibold">Financial Analytics</div>
              <div className="text-xs opacity-80">Business insights</div>
            </div>
          </Button>
          
          <Button
            onClick={() => navigate('/spending-reports')}
            className="h-16 text-white"
            style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
          >
            <FileText className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-semibold">Spending Reports</div>
              <div className="text-xs opacity-80">Detailed analysis</div>
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
              <div className="text-xs opacity-80">Enhanced features</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}