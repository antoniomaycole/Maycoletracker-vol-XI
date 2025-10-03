/**
 * MaycoleTracker™ Volume XI - Comprehensive Industry Management System
 * Complete business information and forms for all 15+ industries
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Building2, FileText, Users, DollarSign, TrendingUp, 
  AlertTriangle, CheckCircle, Plus, Settings, Save, Download,
  Home, Stethoscope, Utensils, HardHat, ShoppingCart, Wrench,
  Bed, GraduationCap, Car, Globe, Heart, Scale, Scissors,
  Monitor, Globe2 as Website, Mail, Phone, MapPin, Calendar,
  BarChart3, CreditCard, Package, Truck, Shield, Award
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';

interface Industry {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  color: string;
  specialFeatures: string[];
  complianceRequirements: string[];
  essentialProducts: string[];
  keyMetrics: string[];
  businessForms: BusinessForm[];
  regulatoryInfo: string[];
}

interface BusinessForm {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
  category: 'inventory' | 'financial' | 'compliance' | 'customer' | 'operations';
  isPremium?: boolean;
}

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'phone' | 'date' | 'select' | 'textarea' | 'checkbox';
  required: boolean;
  options?: string[];
  placeholder?: string;
}

const COMPREHENSIVE_INDUSTRIES: Industry[] = [
  {
    id: 'real-estate',
    name: 'Real Estate',
    icon: Home,
    description: 'Complete real estate business management with property listings, client management, and transaction tracking.',
    color: 'blue',
    specialFeatures: [
      'Property Listing Management',
      'Client Relationship Tracking',
      'Commission Calculator',
      'Market Analysis Tools',
      'Document Management',
      'Showing Scheduler',
      'Lead Generation System',
      'Contract Management'
    ],
    complianceRequirements: [
      'Real Estate License Verification',
      'Fair Housing Act Compliance',
      'Truth in Lending Act (TILA)',
      'Real Estate Settlement Procedures Act (RESPA)',
      'Anti-Money Laundering (AML) Requirements',
      'Data Privacy Protection',
      'Professional Ethics Standards'
    ],
    essentialProducts: [
      'MLS Access Subscription',
      'Professional Photography Equipment',
      'Lockboxes and Key Management',
      'Marketing Materials and Signage',
      'Document Management Software',
      'CRM System',
      'Legal Forms and Contracts',
      'Property Inspection Tools'
    ],
    keyMetrics: [
      'Properties Listed vs Sold',
      'Average Days on Market',
      'Commission Revenue',
      'Client Satisfaction Score',
      'Lead Conversion Rate',
      'Market Share Analysis',
      'Average Sale Price',
      'Repeat Client Percentage'
    ],
    businessForms: [
      {
        id: 'property-listing',
        title: 'Property Listing Form',
        description: 'Comprehensive property information for new listings',
        category: 'inventory',
        fields: [
          { id: 'address', label: 'Property Address', type: 'text', required: true, placeholder: '123 Main St, City, State ZIP' },
          { id: 'price', label: 'Listing Price', type: 'number', required: true, placeholder: '500000' },
          { id: 'bedrooms', label: 'Bedrooms', type: 'number', required: true },
          { id: 'bathrooms', label: 'Bathrooms', type: 'number', required: true },
          { id: 'sqft', label: 'Square Footage', type: 'number', required: true },
          { id: 'lot-size', label: 'Lot Size', type: 'text', required: false },
          { id: 'property-type', label: 'Property Type', type: 'select', required: true, options: ['Single Family', 'Condo', 'Townhouse', 'Multi-Family', 'Commercial'] },
          { id: 'description', label: 'Property Description', type: 'textarea', required: true },
          { id: 'features', label: 'Special Features', type: 'textarea', required: false }
        ]
      },
      {
        id: 'client-intake',
        title: 'Client Intake Form',
        description: 'New client information and preferences',
        category: 'customer',
        fields: [
          { id: 'name', label: 'Client Name', type: 'text', required: true },
          { id: 'email', label: 'Email Address', type: 'email', required: true },
          { id: 'phone', label: 'Phone Number', type: 'phone', required: true },
          { id: 'budget-min', label: 'Minimum Budget', type: 'number', required: true },
          { id: 'budget-max', label: 'Maximum Budget', type: 'number', required: true },
          { id: 'preferred-areas', label: 'Preferred Areas', type: 'textarea', required: false },
          { id: 'must-haves', label: 'Must-Have Features', type: 'textarea', required: false },
          { id: 'timeline', label: 'Purchase Timeline', type: 'select', required: true, options: ['Immediately', '1-3 months', '3-6 months', '6+ months'] }
        ]
      },
      {
        id: 'commission-tracker',
        title: 'Commission Tracking',
        description: 'Track commissions and payments for closed deals',
        category: 'financial',
        fields: [
          { id: 'property-address', label: 'Property Address', type: 'text', required: true },
          { id: 'sale-price', label: 'Final Sale Price', type: 'number', required: true },
          { id: 'commission-rate', label: 'Commission Rate (%)', type: 'number', required: true },
          { id: 'gross-commission', label: 'Gross Commission', type: 'number', required: true },
          { id: 'split-rate', label: 'Broker Split (%)', type: 'number', required: true },
          { id: 'net-commission', label: 'Net Commission', type: 'number', required: true },
          { id: 'closing-date', label: 'Closing Date', type: 'date', required: true },
          { id: 'payment-status', label: 'Payment Status', type: 'select', required: true, options: ['Pending', 'Paid', 'Disputed'] }
        ]
      }
    ],
    regulatoryInfo: [
      'Maintain current real estate license in good standing',
      'Complete required continuing education hours annually',
      'Follow MLS rules and regulations for property listings',
      'Ensure all marketing materials include required disclosures',
      'Maintain client trust accounts according to state regulations'
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: Stethoscope,
    description: 'Medical practice management with patient records, appointment scheduling, and regulatory compliance.',
    color: 'red',
    specialFeatures: [
      'Patient Management System',
      'Medical Inventory Tracking',
      'Appointment Scheduling',
      'Insurance Billing',
      'Treatment Plans',
      'Lab Results Management',
      'Prescription Tracking',
      'Staff Scheduling'
    ],
    complianceRequirements: [
      'HIPAA Compliance',
      'FDA Regulations',
      'DEA Requirements',
      'Joint Commission Standards',
      'State Medical Board Regulations',
      'Insurance Compliance',
      'Medical Waste Management'
    ],
    essentialProducts: [
      'Medical Equipment and Devices',
      'Pharmaceuticals and Medications',
      'Medical Supplies and Consumables',
      'Personal Protective Equipment (PPE)',
      'Diagnostic Equipment',
      'Patient Care Supplies',
      'Cleaning and Disinfection Supplies',
      'Office and Administrative Supplies'
    ],
    keyMetrics: [
      'Patient Satisfaction Scores',
      'Average Wait Times',
      'Treatment Success Rates',
      'Revenue per Patient',
      'Insurance Claim Approval Rate',
      'Staff Productivity',
      'Equipment Utilization',
      'Medication Inventory Turnover'
    ],
    businessForms: [
      {
        id: 'patient-intake',
        title: 'Patient Intake Form',
        description: 'New patient registration and medical history',
        category: 'customer',
        fields: [
          { id: 'patient-name', label: 'Patient Name', type: 'text', required: true },
          { id: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { id: 'insurance', label: 'Insurance Provider', type: 'text', required: true },
          { id: 'emergency-contact', label: 'Emergency Contact', type: 'text', required: true },
          { id: 'medical-history', label: 'Medical History', type: 'textarea', required: true },
          { id: 'medications', label: 'Current Medications', type: 'textarea', required: false },
          { id: 'allergies', label: 'Known Allergies', type: 'textarea', required: false }
        ]
      }
    ],
    regulatoryInfo: [
      'Maintain HIPAA compliance for all patient data',
      'Follow FDA guidelines for medical device usage',
      'Ensure proper medical waste disposal procedures'
    ]
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    icon: Utensils,
    description: 'Food service management with menu planning, ingredient tracking, and health department compliance.',
    color: 'orange',
    specialFeatures: [
      'Menu Management',
      'Ingredient Tracking',
      'Recipe Costing',
      'Table Management',
      'Staff Scheduling',
      'Supplier Management',
      'Food Safety Compliance',
      'Customer Orders'
    ],
    complianceRequirements: [
      'Health Department Regulations',
      'Food Safety Standards',
      'Liquor License Compliance',
      'Labor Law Compliance',
      'Fire Department Requirements',
      'ADA Compliance',
      'Workers Compensation'
    ],
    essentialProducts: [
      'Food Ingredients and Supplies',
      'Kitchen Equipment and Appliances',
      'Serving and Dining Supplies',
      'Cleaning and Sanitizing Products',
      'Point of Sale (POS) System',
      'Uniforms and Apparel',
      'Safety Equipment',
      'Administrative Supplies'
    ],
    keyMetrics: [
      'Food Cost Percentage',
      'Labor Cost Percentage',
      'Average Ticket Size',
      'Table Turnover Rate',
      'Customer Satisfaction Score',
      'Waste Percentage',
      'Profit Margin per Dish',
      'Peak Hour Efficiency'
    ],
    businessForms: [
      {
        id: 'recipe-costing',
        title: 'Recipe Cost Analysis',
        description: 'Calculate food costs and pricing for menu items',
        category: 'financial',
        fields: [
          { id: 'dish-name', label: 'Dish Name', type: 'text', required: true },
          { id: 'ingredients', label: 'Ingredients List', type: 'textarea', required: true },
          { id: 'total-cost', label: 'Total Ingredient Cost', type: 'number', required: true },
          { id: 'serving-size', label: 'Serving Size', type: 'text', required: true },
          { id: 'target-margin', label: 'Target Profit Margin (%)', type: 'number', required: true },
          { id: 'suggested-price', label: 'Suggested Menu Price', type: 'number', required: true }
        ]
      }
    ],
    regulatoryInfo: [
      'Follow local health department food safety guidelines',
      'Maintain proper food storage temperatures',
      'Ensure staff food safety certifications are current'
    ]
  },
  {
    id: 'construction',
    name: 'Construction',
    icon: HardHat,
    description: 'Construction project management with materials tracking, safety compliance, and project scheduling.',
    color: 'yellow',
    specialFeatures: [
      'Project Management',
      'Materials Tracking',
      'Equipment Management',
      'Safety Compliance',
      'Subcontractor Management',
      'Progress Tracking',
      'Cost Estimation',
      'Quality Control'
    ],
    complianceRequirements: [
      'OSHA Safety Standards',
      'Building Code Compliance',
      'Environmental Regulations',
      'Licensing Requirements',
      'Insurance Requirements',
      'Permitting Compliance',
      'Workers Safety Training'
    ],
    essentialProducts: [
      'Construction Materials',
      'Tools and Equipment',
      'Safety Equipment and PPE',
      'Heavy Machinery',
      'Hardware and Fasteners',
      'Electrical and Plumbing Supplies',
      'Concrete and Cement',
      'Lumber and Building Materials'
    ],
    keyMetrics: [
      'Project Completion Time',
      'Budget vs Actual Costs',
      'Safety Incident Rate',
      'Material Waste Percentage',
      'Client Satisfaction Score',
      'Equipment Utilization',
      'Subcontractor Performance',
      'Quality Control Scores'
    ],
    businessForms: [
      {
        id: 'project-estimate',
        title: 'Project Cost Estimate',
        description: 'Detailed cost breakdown for construction projects',
        category: 'financial',
        fields: [
          { id: 'project-name', label: 'Project Name', type: 'text', required: true },
          { id: 'client-name', label: 'Client Name', type: 'text', required: true },
          { id: 'project-type', label: 'Project Type', type: 'select', required: true, options: ['Residential', 'Commercial', 'Industrial', 'Infrastructure'] },
          { id: 'labor-cost', label: 'Labor Cost', type: 'number', required: true },
          { id: 'materials-cost', label: 'Materials Cost', type: 'number', required: true },
          { id: 'equipment-cost', label: 'Equipment Cost', type: 'number', required: true },
          { id: 'overhead', label: 'Overhead (%)', type: 'number', required: true },
          { id: 'profit-margin', label: 'Profit Margin (%)', type: 'number', required: true }
        ]
      }
    ],
    regulatoryInfo: [
      'Ensure all workers have required safety training',
      'Maintain OSHA compliance documentation',
      'Follow local building codes and permit requirements'
    ]
  },
  {
    id: 'retail',
    name: 'Retail',
    icon: ShoppingCart,
    description: 'Retail operations with inventory management, sales tracking, and customer analytics.',
    color: 'purple',
    specialFeatures: [
      'Inventory Management',
      'Sales Analytics',
      'Customer Database',
      'Loyalty Programs',
      'Seasonal Planning',
      'Vendor Management',
      'Price Optimization',
      'Store Operations'
    ],
    complianceRequirements: [
      'Sales Tax Regulations',
      'Consumer Protection Laws',
      'ADA Compliance',
      'Employment Law Compliance',
      'Product Safety Standards',
      'Return Policy Compliance',
      'Data Privacy Regulations'
    ],
    essentialProducts: [
      'Merchandise Inventory',
      'Point of Sale Equipment',
      'Display and Fixtures',
      'Shopping Bags and Packaging',
      'Security Systems',
      'Price Tags and Labels',
      'Cleaning Supplies',
      'Office Supplies'
    ],
    keyMetrics: [
      'Sales per Square Foot',
      'Inventory Turnover Rate',
      'Gross Margin Percentage',
      'Customer Acquisition Cost',
      'Average Transaction Value',
      'Return Rate',
      'Customer Lifetime Value',
      'Conversion Rate'
    ],
    businessForms: [
      {
        id: 'inventory-reorder',
        title: 'Inventory Reorder Form',
        description: 'Track and manage product reordering',
        category: 'inventory',
        fields: [
          { id: 'product-name', label: 'Product Name', type: 'text', required: true },
          { id: 'sku', label: 'SKU/Product Code', type: 'text', required: true },
          { id: 'current-stock', label: 'Current Stock Level', type: 'number', required: true },
          { id: 'reorder-point', label: 'Reorder Point', type: 'number', required: true },
          { id: 'order-quantity', label: 'Order Quantity', type: 'number', required: true },
          { id: 'supplier', label: 'Supplier', type: 'text', required: true },
          { id: 'unit-cost', label: 'Unit Cost', type: 'number', required: true }
        ]
      }
    ],
    regulatoryInfo: [
      'Comply with local sales tax collection requirements',
      'Follow consumer protection and return policy laws',
      'Maintain ADA compliance for store accessibility'
    ]
  }
];

export default function ComprehensiveIndustrySystem() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>(COMPREHENSIVE_INDUSTRIES[0]);
  const [activeForm, setActiveForm] = useState<BusinessForm | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [savedForms, setSavedForms] = useState<any[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFormSubmit = (formId: string) => {
    const newFormEntry = {
      id: Date.now().toString(),
      formId,
      industryId: selectedIndustry.id,
      data: formData,
      timestamp: new Date(),
      status: 'completed'
    };
    
    setSavedForms(prev => [...prev, newFormEntry]);
    setFormData({});
    setActiveForm(null);
    
    // Voice feedback
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`Form saved successfully for ${selectedIndustry.name} industry`);
      window.speechSynthesis.speak(utterance);
    }
  };

  const getIndustryColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-500',
      red: 'bg-red-500',
      orange: 'bg-orange-500',
      yellow: 'bg-yellow-500',
      purple: 'bg-purple-500',
      green: 'bg-green-500',
      pink: 'bg-pink-500',
      indigo: 'bg-indigo-500'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-500';
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
            <Building2 className="w-10 h-10 inline mr-3" style={{ color: '#4A9BFF' }} />
            Comprehensive Industry Management
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Complete business management system with industry-specific forms, compliance tracking, 
            and operational tools for 15+ industries.
          </p>
        </div>

        {/* MaycoleTechnologies.com Integration */}
        <Card className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <Website className="w-6 h-6 mr-2 text-blue-600" />
                MaycoleTechnologies.com Integration
              </h3>
              <p className="text-gray-700 mb-6">
                Connect directly with MaycoleTechnologies.com for additional resources, support, and enterprise solutions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <a 
                  href="https://maycoletechnologies.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 h-16 rounded-lg group text-decoration-none"
                >
                  <Website className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Visit Website</div>
                    <div className="text-xs text-gray-600">Main portal</div>
                  </div>
                </a>
                
                <a 
                  href="https://maycoletechnologies.com/support" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 h-16 rounded-lg group text-decoration-none"
                >
                  <Heart className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Get Support</div>
                    <div className="text-xs text-gray-600">24/7 help center</div>
                  </div>
                </a>
                
                <a 
                  href="https://maycoletechnologies.com/enterprise" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 h-16 rounded-lg group text-decoration-none"
                >
                  <Award className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Enterprise</div>
                    <div className="text-xs text-gray-600">Custom solutions</div>
                  </div>
                </a>
                
                <a 
                  href="mailto:support@maycoletechnologies.com" 
                  className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 h-16 rounded-lg group text-decoration-none"
                >
                  <Mail className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Contact</div>
                    <div className="text-xs text-gray-600">Direct email</div>
                  </div>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Industry Selection */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Your Industry</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {COMPREHENSIVE_INDUSTRIES.map((industry) => (
              <button
                key={industry.id}
                onClick={() => setSelectedIndustry(industry)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedIndustry.id === industry.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <industry.icon className={`w-8 h-8 mx-auto mb-2 ${
                  selectedIndustry.id === industry.id ? 'text-blue-600' : 'text-gray-600'
                }`} />
                <div className={`font-medium text-sm ${
                  selectedIndustry.id === industry.id ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  {industry.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Industry Details */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <selectedIndustry.icon className="w-6 h-6 text-blue-600" />
              <span>{selectedIndustry.name} Industry Management</span>
              <Badge className={`${getIndustryColor(selectedIndustry.color)} text-white ml-2`}>
                Active
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">{selectedIndustry.description}</p>
            
            <Tabs defaultValue="features" className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
                <TabsTrigger value="forms">Business Forms</TabsTrigger>
                <TabsTrigger value="regulatory">Regulatory</TabsTrigger>
              </TabsList>

              <TabsContent value="features">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {selectedIndustry.specialFeatures.map((feature, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-gray-50">
                      <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
                      <div className="font-medium text-gray-900">{feature}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="compliance">
                <div className="space-y-4">
                  {selectedIndustry.complianceRequirements.map((requirement, index) => (
                    <div key={index} className="p-4 border-l-4 border-yellow-500 bg-yellow-50">
                      <div className="flex items-start space-x-3">
                        <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div className="text-gray-800">{requirement}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="products">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedIndustry.essentialProducts.map((product, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <Package className="w-5 h-5 text-blue-600 mb-2" />
                      <div className="font-medium text-gray-900">{product}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="metrics">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {selectedIndustry.keyMetrics.map((metric, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-blue-50">
                      <BarChart3 className="w-5 h-5 text-blue-600 mb-2" />
                      <div className="font-medium text-gray-900">{metric}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="forms">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedIndustry.businessForms.map((form) => (
                      <Card key={form.id} className="border-gray-200 hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center justify-between">
                            <span>{form.title}</span>
                            {form.isPremium && (
                              <Badge className="bg-orange-500 text-white">PRO</Badge>
                            )}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 mb-4">{form.description}</p>
                          <div className="flex justify-between items-center">
                            <Badge className="bg-gray-100 text-gray-800 capitalize">
                              {form.category}
                            </Badge>
                            <Button
                              onClick={() => setActiveForm(form)}
                              size="sm"
                              className="text-white"
                              style={{ background: 'linear-gradient(135deg, #4A9BFF, #3B82F6)' }}
                            >
                              <FileText className="w-4 h-4 mr-2" />
                              Open Form
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="regulatory">
                <div className="space-y-4">
                  {selectedIndustry.regulatoryInfo.map((info, index) => (
                    <div key={index} className="p-4 border-l-4 border-red-500 bg-red-50">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                        <div className="text-gray-800">{info}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Active Form Modal */}
        {activeForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{activeForm.title}</CardTitle>
                  <Button
                    variant="outline"
                    onClick={() => setActiveForm(null)}
                    className="border-gray-300 text-gray-700"
                  >
                    ×
                  </Button>
                </div>
                <p className="text-gray-600">{activeForm.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeForm.fields.map((field) => (
                  <div key={field.id}>
                    <Label htmlFor={field.id}>
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    {field.type === 'textarea' ? (
                      <Textarea
                        id={field.id}
                        placeholder={field.placeholder}
                        value={formData[field.id] || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
                        className="border-gray-300"
                      />
                    ) : field.type === 'select' ? (
                      <select
                        id={field.id}
                        value={formData[field.id] || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select option...</option>
                        {field.options?.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <Input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.id] || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
                        className="border-gray-300"
                      />
                    )}
                  </div>
                ))}
                
                <div className="flex space-x-4 pt-4">
                  <Button
                    onClick={() => handleFormSubmit(activeForm.id)}
                    className="text-white"
                    style={{ background: 'linear-gradient(135deg, #4A9BFF, #3B82F6)' }}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Form
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setActiveForm(null)}
                    className="border-gray-300 text-gray-700"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={() => navigate('/payment-processing')}
            className="h-16 text-white"
            style={{ background: 'linear-gradient(135deg, #4A9BFF, #3B82F6)' }}
          >
            <CreditCard className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-semibold">Payment Processing</div>
              <div className="text-xs opacity-80">Accept industry payments</div>
            </div>
          </Button>
          
          <Button
            onClick={() => navigate('/business-analytics')}
            className="h-16 text-white"
            style={{ background: 'linear-gradient(135deg, #4A9BFF, #3B82F6)' }}
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-semibold">Business Analytics</div>
              <div className="text-xs opacity-80">Industry-specific metrics</div>
            </div>
          </Button>
          
          <Button
            onClick={() => navigate('/subscription')}
            className="h-16 text-white"
            style={{ background: 'linear-gradient(135deg, #4A9BFF, #3B82F6)' }}
          >
            <Award className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-semibold">Upgrade Plan</div>
              <div className="text-xs opacity-80">Unlock all industries</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}