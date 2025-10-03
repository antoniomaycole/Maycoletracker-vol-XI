import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  TrendingUp, 
  DollarSign, 
  AlertTriangle, 
  Users, 
  Target, 
  Brain,
  BarChart3,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from 'lucide-react';

interface AnalyticsProps {
  businessConfig: any;
}

export function Analytics({ businessConfig }: AnalyticsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Generate industry-specific analytics based on business config
  const industryAnalytics = useMemo(() => {
    if (!businessConfig) return null;

    const industryType = businessConfig.industryType || businessConfig.businessType;
    
    switch (industryType) {
      case 'restaurant':
        return {
          metrics: [
            { label: 'Food Cost %', value: '28.5%', trend: 'down', color: 'green' },
            { label: 'Waste Reduction', value: '15%', trend: 'up', color: 'green' },
            { label: 'Menu Engineering Score', value: '87/100', trend: 'up', color: 'blue' },
            { label: 'Supplier Performance', value: '94%', trend: 'up', color: 'purple' }
          ],
          insights: [
            'Peak usage hours: 6-8 PM (45% of daily consumption)',
            'Highest waste category: Fresh produce (12% waste rate)',
            'Most profitable items: Signature dishes with 70% margin',
            'Seasonal trends: 30% increase in seafood during summer'
          ],
          recommendations: [
            'Implement just-in-time ordering for perishables',
            'Negotiate volume discounts with primary suppliers',
            'Optimize portion sizes for high-waste items',
            'Consider alternative suppliers for seasonal items'
          ]
        };

      case 'healthcare':
        return {
          metrics: [
            { label: 'Compliance Score', value: '99.2%', trend: 'up', color: 'green' },
            { label: 'Expiration Tracking', value: '100%', trend: 'stable', color: 'blue' },
            { label: 'Cost Per Patient', value: '$45.20', trend: 'down', color: 'green' },
            { label: 'Supply Availability', value: '98.5%', trend: 'up', color: 'purple' }
          ],
          insights: [
            'Critical supplies maintained at 95% availability',
            'Average expiration waste reduced by 22%',
            'Emergency stock levels optimized for patient safety',
            'Automated reorder points preventing stockouts'
          ],
          recommendations: [
            'Implement predictive analytics for seasonal demand',
            'Enhance cold chain monitoring for pharmaceuticals',
            'Establish backup suppliers for critical items',
            'Review and update emergency stock protocols'
          ]
        };

      case 'construction':
        return {
          metrics: [
            { label: 'Tool Utilization', value: '89%', trend: 'up', color: 'green' },
            { label: 'Safety Compliance', value: '97%', trend: 'up', color: 'blue' },
            { label: 'Project Efficiency', value: '92%', trend: 'up', color: 'purple' },
            { label: 'Equipment ROI', value: '156%', trend: 'up', color: 'green' }
          ],
          insights: [
            'Heavy equipment usage peaks during foundation work',
            'Safety equipment replacement cycle optimized',
            'Material waste reduced through better planning',
            'Tool checkout system improving accountability'
          ],
          recommendations: [
            'Implement IoT tracking for high-value equipment',
            'Schedule preventive maintenance based on usage',
            'Optimize tool allocation across job sites',
            'Enhance safety training and equipment protocols'
          ]
        };

      case 'retail':
        return {
          metrics: [
            { label: 'Inventory Turnover', value: '12.4x', trend: 'up', color: 'green' },
            { label: 'Stockout Rate', value: '2.1%', trend: 'down', color: 'green' },
            { label: 'Gross Margin', value: '42.8%', trend: 'up', color: 'blue' },
            { label: 'Customer Satisfaction', value: '94%', trend: 'up', color: 'purple' }
          ],
          insights: [
            'Fast-moving items drive 80% of revenue',
            'Seasonal patterns show 40% holiday increase',
            'Online sales growing at 25% annually',
            'Customer return rate decreased by 18%'
          ],
          recommendations: [
            'Expand successful product categories',
            'Implement dynamic pricing for seasonal items',
            'Optimize inventory for omnichannel sales',
            'Enhance product bundling strategies'
          ]
        };

      default:
        return {
          metrics: [
            { label: 'Efficiency Score', value: '91%', trend: 'up', color: 'green' },
            { label: 'Cost Reduction', value: '12%', trend: 'up', color: 'green' },
            { label: 'Process Optimization', value: '88%', trend: 'up', color: 'blue' },
            { label: 'ROI Improvement', value: '145%', trend: 'up', color: 'purple' }
          ],
          insights: [
            'Operational efficiency improved across all metrics',
            'Cost optimization strategies showing results',
            'Process automation reducing manual errors',
            'Data-driven decisions improving outcomes'
          ],
          recommendations: [
            'Continue automation of routine processes',
            'Implement predictive maintenance schedules',
            'Optimize resource allocation based on demand',
            'Enhance data collection for better insights'
          ]
        };
    }
  }, [businessConfig]);

  const financialMetrics = useMemo(() => {
    return {
      totalValue: 125420,
      monthlySpend: 18750,
      costSavings: 3420,
      efficiency: 92,
      trends: [
        { period: 'Jan', value: 15200 },
        { period: 'Feb', value: 16800 },
        { period: 'Mar', value: 18750 },
        { period: 'Apr', value: 17300 },
        { period: 'May', value: 19200 },
        { period: 'Jun', value: 18750 }
      ]
    };
  }, []);

  const predictions = useMemo(() => {
    const industryType = businessConfig?.industryType || businessConfig?.businessType || 'general';
    
    return [
      {
        category: businessConfig?.categories?.[0] || 'Primary Category',
        prediction: 'High demand expected next week',
        confidence: 94,
        action: 'Increase stock by 25%',
        timeframe: '3-5 days',
        impact: 'High'
      },
      {
        category: businessConfig?.categories?.[1] || 'Secondary Category', 
        prediction: 'Seasonal decrease anticipated',
        confidence: 87,
        action: 'Reduce orders by 15%',
        timeframe: '1-2 weeks',
        impact: 'Medium'
      },
      {
        category: businessConfig?.categories?.[2] || 'Third Category',
        prediction: 'Stable consumption pattern',
        confidence: 91,
        action: 'Maintain current levels',
        timeframe: 'Ongoing',
        impact: 'Low'
      }
    ];
  }, [businessConfig]);

  if (!businessConfig) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Brain className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">Analytics Loading</h3>
          <p className="text-muted-foreground">Setting up your industry-specific analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ 
                background: `linear-gradient(135deg, ${businessConfig.primaryColor} 0%, ${businessConfig.primaryColor}80 100%)` 
              }}
            >
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            {businessConfig.businessName} • {businessConfig.industryType || businessConfig.businessType} Industry
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Activity className="w-3 h-3 mr-1" />
            Live Data
          </Badge>
          <Badge variant="outline">
            AI Insights: {industryAnalytics?.metrics.length || 0}
          </Badge>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {industryAnalytics?.metrics.map((metric, index) => (
          <Card key={index} className="border-l-4" style={{ borderLeftColor: 
            metric.color === 'green' ? '#10b981' :
            metric.color === 'blue' ? '#3b82f6' :
            metric.color === 'purple' ? '#8b5cf6' : '#f59e0b'
          }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  metric.trend === 'up' ? 'text-green-600' : 
                  metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {metric.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> :
                   metric.trend === 'down' ? <ArrowDownRight className="w-4 h-4" /> :
                   <Clock className="w-4 h-4" />}
                  {metric.trend}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
          <TabsTrigger value="insights">Industry Insights</TabsTrigger>
          <TabsTrigger value="reports">Custom Reports</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Financial Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Financial Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Inventory Value</p>
                    <p className="text-2xl font-bold">${financialMetrics.totalValue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Spend</p>
                    <p className="text-2xl font-bold">${financialMetrics.monthlySpend.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Cost Efficiency</span>
                    <span className="font-medium">{financialMetrics.efficiency}%</span>
                  </div>
                  <Progress value={financialMetrics.efficiency} className="h-2" />
                </div>

                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-medium">Savings This Month</span>
                  </div>
                  <p className="text-green-800 font-bold text-xl">
                    ${financialMetrics.costSavings.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Category Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Category Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {businessConfig.categories?.slice(0, 4).map((category, index) => (
                    <div key={category} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: 
                            ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'][index] || '#6b7280'
                          }}
                        />
                        <span className="font-medium">{category}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${(Math.random() * 5000 + 1000).toFixed(0)}</p>
                        <p className="text-sm text-muted-foreground">
                          {(Math.random() * 30 + 15).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI Predictions Tab */}
        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI-Powered Predictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictions.map((prediction, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{prediction.category}</h4>
                        <p className="text-sm text-muted-foreground">{prediction.prediction}</p>
                      </div>
                      <Badge variant={prediction.confidence > 90 ? 'default' : 'secondary'}>
                        {prediction.confidence}% confidence
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Recommended Action:</span>
                        <p className="font-medium">{prediction.action}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Timeframe:</span>
                        <p className="font-medium">{prediction.timeframe}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Impact:</span>
                        <Badge variant={
                          prediction.impact === 'High' ? 'destructive' :
                          prediction.impact === 'Medium' ? 'default' : 'secondary'
                        }>
                          {prediction.impact}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Industry Insights Tab */}
        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {industryAnalytics?.insights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      <p className="text-sm">{insight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {industryAnalytics?.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                      <p className="text-sm">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Custom Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate Custom Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="p-6 h-auto flex-col">
                  <BarChart3 className="w-8 h-8 mb-2" />
                  <span className="font-medium">Usage Trends</span>
                  <span className="text-sm text-muted-foreground">Analyze consumption patterns</span>
                </Button>
                
                <Button variant="outline" className="p-6 h-auto flex-col">
                  <DollarSign className="w-8 h-8 mb-2" />
                  <span className="font-medium">Cost Analysis</span>
                  <span className="text-sm text-muted-foreground">Financial performance review</span>
                </Button>
                
                <Button variant="outline" className="p-6 h-auto flex-col">
                  <Users className="w-8 h-8 mb-2" />
                  <span className="font-medium">Supplier Report</span>
                  <span className="text-sm text-muted-foreground">Vendor performance metrics</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}