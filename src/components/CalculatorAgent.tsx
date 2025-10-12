/**
 * MaycoleTracker™ vol. XI - Enterprise Edition
 * Calculator Agent - Business Calculation Suite
 */

import React, { useState } from 'react';
import { useAgentBus } from '../contexts/AgentBusContext';
import { Calculator, DollarSign, TrendingUp, Percent, PieChart, BarChart3 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface CalculationResult {
  type: string;
  result: number;
  details: { [key: string]: number };
  timestamp: string;
}

const CalculatorAgent = () => {
  const [activeCalculator, setActiveCalculator] = useState<'roi' | 'breakeven' | 'pricing' | 'inventory' | 'loan'>('roi');
  const [results, setResults] = useState<CalculationResult[]>([]);
  const bus = useAgentBus();

  // ROI Calculator State
  const [roiData, setRoiData] = useState({
    initialInvestment: '',
    finalValue: '',
    timePerod: ''
  });

  // Break-even Calculator State
  const [breakevenData, setBreakevenData] = useState({
    fixedCosts: '',
    variableCosts: '',
    sellingPrice: ''
  });

  // Pricing Calculator State
  const [pricingData, setPricingData] = useState({
    cost: '',
    markup: '',
    margin: ''
  });

  // Inventory Calculator State
  const [inventoryData, setInventoryData] = useState({
    demandRate: '',
    leadTime: '',
    safetyStock: ''
  });

  // Loan Calculator State
  const [loanData, setLoanData] = useState({
    principal: '',
    interestRate: '',
    term: ''
  });

  const calculateROI = () => {
    const initial = parseFloat(roiData.initialInvestment);
    const final = parseFloat(roiData.finalValue);
    
    if (initial && final) {
      const roi = ((final - initial) / initial) * 100;
      const gain = final - initial;
      
      const result: CalculationResult = {
        type: 'ROI',
        result: roi,
        details: {
          'Initial Investment': initial,
          'Final Value': final,
          'Total Gain': gain,
          'ROI Percentage': roi
        },
        timestamp: new Date().toLocaleString()
      };
      
      setResults([result, ...results.slice(0, 4)]);
    }
  };

  const calculateBreakeven = () => {
    const fixed = parseFloat(breakevenData.fixedCosts);
    const variable = parseFloat(breakevenData.variableCosts);
    const selling = parseFloat(breakevenData.sellingPrice);
    
    if (fixed && selling && variable < selling) {
      const breakevenUnits = fixed / (selling - variable);
      const breakevenRevenue = breakevenUnits * selling;
      
      const result: CalculationResult = {
        type: 'Break-even',
        result: breakevenUnits,
        details: {
          'Fixed Costs': fixed,
          'Variable Cost per Unit': variable,
          'Selling Price per Unit': selling,
          'Break-even Units': breakevenUnits,
          'Break-even Revenue': breakevenRevenue
        },
        timestamp: new Date().toLocaleString()
      };
      
      setResults([result, ...results.slice(0, 4)]);
    }
  };

  const calculatePricing = () => {
    const cost = parseFloat(pricingData.cost);
    const markup = parseFloat(pricingData.markup);
    
    if (cost && markup) {
      const sellingPrice = cost * (1 + markup / 100);
      const profit = sellingPrice - cost;
      const margin = (profit / sellingPrice) * 100;
      
      const result: CalculationResult = {
        type: 'Pricing',
        result: sellingPrice,
        details: {
          'Cost': cost,
          'Markup %': markup,
          'Selling Price': sellingPrice,
          'Profit': profit,
          'Margin %': margin
        },
        timestamp: new Date().toLocaleString()
      };
      
      setResults([result, ...results.slice(0, 4)]);
    }
  };

  const calculateInventory = () => {
    const demand = parseFloat(inventoryData.demandRate);
    const leadTime = parseFloat(inventoryData.leadTime);
    const safety = parseFloat(inventoryData.safetyStock);
    
    if (demand && leadTime) {
      const reorderPoint = (demand * leadTime) + (safety || 0);
      const economicOrderQuantity = Math.sqrt((2 * demand * 100) / 5); // Simplified EOQ
      
      const result: CalculationResult = {
        type: 'Inventory',
        result: reorderPoint,
        details: {
          'Demand Rate': demand,
          'Lead Time': leadTime,
          'Safety Stock': safety || 0,
          'Reorder Point': reorderPoint,
          'Economic Order Quantity': economicOrderQuantity
        },
        timestamp: new Date().toLocaleString()
      };
      
      setResults([result, ...results.slice(0, 4)]);
    }
  };

  const calculateLoan = () => {
    const principal = parseFloat(loanData.principal);
    const rate = parseFloat(loanData.interestRate) / 100 / 12;
    const term = parseFloat(loanData.term) * 12;
    
    if (principal && rate && term) {
      const monthlyPayment = (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
      const totalPayment = monthlyPayment * term;
      const totalInterest = totalPayment - principal;
      
      const result: CalculationResult = {
        type: 'Loan',
        result: monthlyPayment,
        details: {
          'Principal': principal,
          'Interest Rate': parseFloat(loanData.interestRate),
          'Term (years)': parseFloat(loanData.term),
          'Monthly Payment': monthlyPayment,
          'Total Payment': totalPayment,
          'Total Interest': totalInterest
        },
        timestamp: new Date().toLocaleString()
      };
      
      setResults([result, ...results.slice(0, 4)]);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2
    }).format(num);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold flex items-center gap-3">
            <Calculator className="w-8 h-8" />
            MaycoleTracker™ Calculator Agent
            </h1>
            <div>
              <button
                onClick={() => {
                  try { bus.publish('request:weekly-report'); } catch (e) { console.warn(e); }
                }}
                className="bg-white text-orange-600 px-3 py-2 rounded-md font-semibold"
              >
                Request Weekly Report
              </button>
            </div>
          </div>
          <p className="text-orange-100 mt-2">
            Advanced business calculations for financial planning and analysis
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calculator Selection */}
          <Card className="lg:col-span-1 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Calculator Types</h2>
            <div className="space-y-2">
              <button
                onClick={() => setActiveCalculator('roi')}
                className={`w-full p-3 text-left rounded-lg transition-colors ${
                  activeCalculator === 'roi'
                    ? 'bg-orange-100 text-orange-800 border border-orange-200'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5" />
                  <div>
                    <p className="font-medium">ROI Calculator</p>
                    <p className="text-sm opacity-75">Return on Investment</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveCalculator('breakeven')}
                className={`w-full p-3 text-left rounded-lg transition-colors ${
                  activeCalculator === 'breakeven'
                    ? 'bg-orange-100 text-orange-800 border border-orange-200'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5" />
                  <div>
                    <p className="font-medium">Break-even Analysis</p>
                    <p className="text-sm opacity-75">Break-even Point</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveCalculator('pricing')}
                className={`w-full p-3 text-left rounded-lg transition-colors ${
                  activeCalculator === 'pricing'
                    ? 'bg-orange-100 text-orange-800 border border-orange-200'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Percent className="w-5 h-5" />
                  <div>
                    <p className="font-medium">Pricing Calculator</p>
                    <p className="text-sm opacity-75">Markup & Margin</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveCalculator('inventory')}
                className={`w-full p-3 text-left rounded-lg transition-colors ${
                  activeCalculator === 'inventory'
                    ? 'bg-orange-100 text-orange-800 border border-orange-200'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <PieChart className="w-5 h-5" />
                  <div>
                    <p className="font-medium">Inventory Calculator</p>
                    <p className="text-sm opacity-75">Reorder Point & EOQ</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveCalculator('loan')}
                className={`w-full p-3 text-left rounded-lg transition-colors ${
                  activeCalculator === 'loan'
                    ? 'bg-orange-100 text-orange-800 border border-orange-200'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5" />
                  <div>
                    <p className="font-medium">Loan Calculator</p>
                    <p className="text-sm opacity-75">Monthly Payments</p>
                  </div>
                </div>
              </button>
            </div>
          </Card>

          {/* Calculator Input */}
          <Card className="lg:col-span-2 p-6">
            {activeCalculator === 'roi' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">ROI Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="initial">Initial Investment ($)</Label>
                    <Input
                      id="initial"
                      type="number"
                      value={roiData.initialInvestment}
                      onChange={(e) => setRoiData({...roiData, initialInvestment: e.target.value})}
                      placeholder="Enter initial investment"
                    />
                  </div>
                  <div>
                    <Label htmlFor="final">Final Value ($)</Label>
                    <Input
                      id="final"
                      type="number"
                      value={roiData.finalValue}
                      onChange={(e) => setRoiData({...roiData, finalValue: e.target.value})}
                      placeholder="Enter final value"
                    />
                  </div>
                  <Button onClick={calculateROI} className="w-full">
                    Calculate ROI
                  </Button>
                </div>
              </div>
            )}

            {activeCalculator === 'breakeven' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Break-even Analysis</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fixed">Fixed Costs ($)</Label>
                    <Input
                      id="fixed"
                      type="number"
                      value={breakevenData.fixedCosts}
                      onChange={(e) => setBreakevenData({...breakevenData, fixedCosts: e.target.value})}
                      placeholder="Enter fixed costs"
                    />
                  </div>
                  <div>
                    <Label htmlFor="variable">Variable Cost per Unit ($)</Label>
                    <Input
                      id="variable"
                      type="number"
                      value={breakevenData.variableCosts}
                      onChange={(e) => setBreakevenData({...breakevenData, variableCosts: e.target.value})}
                      placeholder="Enter variable cost per unit"
                    />
                  </div>
                  <div>
                    <Label htmlFor="selling">Selling Price per Unit ($)</Label>
                    <Input
                      id="selling"
                      type="number"
                      value={breakevenData.sellingPrice}
                      onChange={(e) => setBreakevenData({...breakevenData, sellingPrice: e.target.value})}
                      placeholder="Enter selling price per unit"
                    />
                  </div>
                  <Button onClick={calculateBreakeven} className="w-full">
                    Calculate Break-even
                  </Button>
                </div>
              </div>
            )}

            {activeCalculator === 'pricing' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cost">Cost ($)</Label>
                    <Input
                      id="cost"
                      type="number"
                      value={pricingData.cost}
                      onChange={(e) => setPricingData({...pricingData, cost: e.target.value})}
                      placeholder="Enter product cost"
                    />
                  </div>
                  <div>
                    <Label htmlFor="markup">Markup (%)</Label>
                    <Input
                      id="markup"
                      type="number"
                      value={pricingData.markup}
                      onChange={(e) => setPricingData({...pricingData, markup: e.target.value})}
                      placeholder="Enter markup percentage"
                    />
                  </div>
                  <Button onClick={calculatePricing} className="w-full">
                    Calculate Pricing
                  </Button>
                </div>
              </div>
            )}

            {activeCalculator === 'inventory' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="demand">Demand Rate (units/period)</Label>
                    <Input
                      id="demand"
                      type="number"
                      value={inventoryData.demandRate}
                      onChange={(e) => setInventoryData({...inventoryData, demandRate: e.target.value})}
                      placeholder="Enter demand rate"
                    />
                  </div>
                  <div>
                    <Label htmlFor="leadtime">Lead Time (periods)</Label>
                    <Input
                      id="leadtime"
                      type="number"
                      value={inventoryData.leadTime}
                      onChange={(e) => setInventoryData({...inventoryData, leadTime: e.target.value})}
                      placeholder="Enter lead time"
                    />
                  </div>
                  <div>
                    <Label htmlFor="safety">Safety Stock (units)</Label>
                    <Input
                      id="safety"
                      type="number"
                      value={inventoryData.safetyStock}
                      onChange={(e) => setInventoryData({...inventoryData, safetyStock: e.target.value})}
                      placeholder="Enter safety stock (optional)"
                    />
                  </div>
                  <Button onClick={calculateInventory} className="w-full">
                    Calculate Inventory
                  </Button>
                </div>
              </div>
            )}

            {activeCalculator === 'loan' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="principal">Loan Amount ($)</Label>
                    <Input
                      id="principal"
                      type="number"
                      value={loanData.principal}
                      onChange={(e) => setLoanData({...loanData, principal: e.target.value})}
                      placeholder="Enter loan amount"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rate">Annual Interest Rate (%)</Label>
                    <Input
                      id="rate"
                      type="number"
                      value={loanData.interestRate}
                      onChange={(e) => setLoanData({...loanData, interestRate: e.target.value})}
                      placeholder="Enter annual interest rate"
                    />
                  </div>
                  <div>
                    <Label htmlFor="term">Loan Term (years)</Label>
                    <Input
                      id="term"
                      type="number"
                      value={loanData.term}
                      onChange={(e) => setLoanData({...loanData, term: e.target.value})}
                      placeholder="Enter loan term in years"
                    />
                  </div>
                  <Button onClick={calculateLoan} className="w-full">
                    Calculate Payment
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Calculation History */}
        {results.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculation History</h3>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-900">{result.type} Calculation</h4>
                    <span className="text-sm text-gray-500">{result.timestamp}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    {Object.entries(result.details).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-gray-600">{key}</p>
                        <p className="font-medium">
                          {key.includes('$') || key.includes('Cost') || key.includes('Value') || key.includes('Payment') || key.includes('Investment') || key.includes('Revenue') || key.includes('Profit') || key.includes('Interest') || key.includes('Principal') || key.includes('Price')
                            ? formatCurrency(value) 
                            : key.includes('%') || key.includes('Percentage') || key.includes('Rate') || key.includes('Margin') || key.includes('Markup')
                            ? `${formatNumber(value)}%`
                            : formatNumber(value)
                          }
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CalculatorAgent;