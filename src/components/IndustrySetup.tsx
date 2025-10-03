/**
 * MaycoleTracker™ Volume XI - Enhanced Industry Setup & Configuration
 * Comprehensive industry configuration with essential supplies and materials
 * Features: 15+ industries, custom industry creation, automatic supply provisioning
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Building2, CheckCircle, Settings, Package, Users, TrendingUp, Activity,
  Stethoscope, UtensilsCrossed, HardHat, ShoppingCart, Factory, Hotel, GraduationCap,
  Car, Plane, Home, Briefcase, Heart, Gamepad2, Music, Plus, Edit3, Save, X
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface Industry {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  color: string;
  essentialSupplies: string[];
  materials: string[];
  regulations: string[];
  specialFeatures: string[];
  isConfigured: boolean;
  isCustom?: boolean;
}

interface CustomIndustry {
  name: string;
  description: string;
  essentialSupplies: string[];
  materials: string[];
  regulations: string[];
  specialFeatures: string[];
}

const PREDEFINED_INDUSTRIES: Industry[] = [
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: Stethoscope,
    description: 'Medical facilities, hospitals, clinics',
    color: 'bg-red-50 border-red-200 text-red-800',
    essentialSupplies: [
      'N95 Respirator Masks', 'Surgical Gloves', 'Hand Sanitizer', 'Syringes', 'Bandages',
      'Thermometers', 'Blood Pressure Cuffs', 'IV Bags', 'Catheters', 'Sutures',
      'Gauze Pads', 'Medical Tape', 'Antiseptic Solutions', 'Patient Gowns', 'Face Shields'
    ],
    materials: [
      'Sterilization Equipment', 'Medical Beds', 'Oxygen Tanks', 'Defibrillators', 'X-Ray Film',
      'Laboratory Reagents', 'Disposable Cups', 'Medical Charts', 'Prescription Pads'
    ],
    regulations: ['FDA Compliance', 'HIPAA', 'OSHA Healthcare Standards', 'Joint Commission'],
    specialFeatures: ['Patient Safety Tracking', 'Expiry Date Monitoring', 'Sterilization Logs'],
    isConfigured: false
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    icon: UtensilsCrossed,
    description: 'Food service and dining establishments',
    color: 'bg-orange-50 border-orange-200 text-orange-800',
    essentialSupplies: [
      'Fresh Vegetables', 'Meat Products', 'Dairy Products', 'Cooking Oil', 'Spices',
      'Napkins', 'Disposable Plates', 'Plastic Utensils', 'Cleaning Supplies', 'Coffee Beans',
      'Flour', 'Sugar', 'Salt', 'Food Storage Containers', 'Aluminum Foil'
    ],
    materials: [
      'Kitchen Equipment', 'Refrigeration Units', 'Gas Stoves', 'Dishwashers', 'Tables',
      'Chairs', 'Cash Registers', 'Menu Boards', 'Uniforms'
    ],
    regulations: ['FDA Food Safety', 'ServSafe Certification', 'Local Health Department', 'HACCP'],
    specialFeatures: ['FIFO Rotation', 'Temperature Monitoring', 'Expiry Tracking', 'Menu Planning'],
    isConfigured: false
  },
  {
    id: 'construction',
    name: 'Construction',
    icon: HardHat,
    description: 'Building and construction projects',
    color: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    essentialSupplies: [
      'Safety Hard Hats', 'Safety Vests', 'Steel-Toed Boots', 'Work Gloves', 'Safety Glasses',
      'Concrete Mix', 'Rebar', 'Lumber', 'Nails', 'Screws', 'Power Tools', 'Hand Tools',
      'Measuring Tape', 'Level Tools', 'Safety Harnesses'
    ],
    materials: [
      'Heavy Machinery', 'Scaffolding', 'Cement Mixers', 'Electrical Wire', 'Plumbing Pipes',
      'Insulation Material', 'Roofing Materials', 'Paint', 'Drywall'
    ],
    regulations: ['OSHA Safety Standards', 'Building Codes', 'Environmental Regulations', 'Worker Safety'],
    specialFeatures: ['Safety Compliance Tracking', 'Equipment Maintenance', 'Project Scheduling'],
    isConfigured: false
  },
  {
    id: 'retail',
    name: 'Retail',
    icon: ShoppingCart,
    description: 'Retail stores and shopping centers',
    color: 'bg-green-50 border-green-200 text-green-800',
    essentialSupplies: [
      'Shopping Bags', 'Price Tags', 'Receipt Paper', 'Security Tags', 'Hangers',
      'Display Stands', 'Packaging Materials', 'Cleaning Supplies', 'Uniforms', 'Name Tags',
      'Cash Register Tape', 'Gift Cards', 'Promotional Materials', 'Shopping Carts', 'Baskets'
    ],
    materials: [
      'POS Systems', 'Security Cameras', 'Shelving Units', 'Mannequins', 'Lighting',
      'Mirrors', 'Fitting Rooms', 'Storage Bins', 'Anti-theft Systems'
    ],
    regulations: ['Consumer Protection Laws', 'Sales Tax Compliance', 'Safety Regulations', 'ADA Compliance'],
    specialFeatures: ['Inventory Turnover', 'Season Planning', 'Customer Analytics', 'Loss Prevention'],
    isConfigured: false
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    icon: Factory,
    description: 'Production and manufacturing facilities',
    color: 'bg-blue-50 border-blue-200 text-blue-800',
    essentialSupplies: [
      'Raw Materials', 'Safety Equipment', 'Industrial Lubricants', 'Packaging Materials', 'Labels',
      'Quality Control Tools', 'Protective Gear', 'Machine Parts', 'Cleaning Solvents', 'Work Orders',
      'Maintenance Tools', 'Conveyor Belts', 'Sensors', 'Filters', 'Gaskets'
    ],
    materials: [
      'Production Machinery', 'Assembly Lines', 'Testing Equipment', 'Forklifts', 'Storage Racks',
      'Computer Systems', 'Quality Control Stations', 'Shipping Equipment'
    ],
    regulations: ['ISO Standards', 'OSHA Manufacturing', 'Environmental Protection', 'Quality Standards'],
    specialFeatures: ['Production Planning', 'Quality Assurance', 'Lean Manufacturing', 'Supply Chain'],
    isConfigured: false
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    icon: Hotel,
    description: 'Hotels, resorts, and lodging',
    color: 'bg-purple-50 border-purple-200 text-purple-800',
    essentialSupplies: [
      'Bed Linens', 'Towels', 'Toiletries', 'Cleaning Supplies', 'Room Service Items',
      'Key Cards', 'Welcome Materials', 'Laundry Detergent', 'Bathroom Tissue', 'Mini Bar Items',
      'Coffee Supplies', 'Guest Amenities', 'Maintenance Supplies', 'Safety Equipment'
    ],
    materials: [
      'Furniture', 'Electronics', 'Kitchen Equipment', 'Laundry Machines', 'HVAC Systems',
      'Security Systems', 'Communication Systems', 'Transportation Vehicles'
    ],
    regulations: ['Health Department', 'Fire Safety', 'ADA Compliance', 'Tourism Board Standards'],
    specialFeatures: ['Guest Experience', 'Housekeeping Management', 'Maintenance Scheduling'],
    isConfigured: false
  },
  {
    id: 'education',
    name: 'Education',
    icon: GraduationCap,
    description: 'Schools, universities, and training centers',
    color: 'bg-indigo-50 border-indigo-200 text-indigo-800',
    essentialSupplies: [
      'Textbooks', 'Writing Materials', 'Paper', 'Notebooks', 'Markers', 'Whiteboards',
      'Chalk', 'Educational Software', 'Art Supplies', 'Science Equipment', 'Sports Equipment',
      'Cleaning Supplies', 'First Aid Kits', 'Student Supplies', 'Office Supplies'
    ],
    materials: [
      'Computers', 'Projectors', 'Furniture', 'Laboratory Equipment', 'Library Books',
      'Audio Visual Equipment', 'Playground Equipment', 'Security Systems'
    ],
    regulations: ['Department of Education', 'Safety Standards', 'Accessibility Requirements', 'Child Protection'],
    specialFeatures: ['Academic Planning', 'Student Tracking', 'Resource Management', 'Safety Protocols'],
    isConfigured: false
  },
  {
    id: 'automotive',
    name: 'Automotive',
    icon: Car,
    description: 'Auto repair, dealerships, and services',
    color: 'bg-gray-50 border-gray-200 text-gray-800',
    essentialSupplies: [
      'Motor Oil', 'Brake Fluid', 'Transmission Fluid', 'Air Filters', 'Oil Filters',
      'Spark Plugs', 'Brake Pads', 'Tires', 'Batteries', 'Wiper Blades', 'Coolant',
      'Belts', 'Hoses', 'Gaskets', 'Tools'
    ],
    materials: [
      'Diagnostic Equipment', 'Lifts', 'Tool Sets', 'Tire Machines', 'Alignment Equipment',
      'Parts Storage', 'Service Bay Equipment', 'Computer Systems'
    ],
    regulations: ['EPA Environmental', 'DOT Standards', 'Safety Regulations', 'Emissions Standards'],
    specialFeatures: ['Service Scheduling', 'Parts Tracking', 'Customer History', 'Warranty Management'],
    isConfigured: false
  },
  {
    id: 'aviation',
    name: 'Aviation',
    icon: Plane,
    description: 'Airlines, airports, and aircraft services',
    color: 'bg-sky-50 border-sky-200 text-sky-800',
    essentialSupplies: [
      'Aviation Fuel', 'Aircraft Parts', 'Safety Equipment', 'Navigation Equipment', 'Communication Devices',
      'Maintenance Tools', 'Cleaning Supplies', 'Passenger Supplies', 'Food Service Items', 'Security Equipment'
    ],
    materials: [
      'Aircraft', 'Ground Support Equipment', 'Baggage Handling Systems', 'Maintenance Hangers',
      'Fuel Systems', 'Communication Systems', 'Weather Equipment'
    ],
    regulations: ['FAA Regulations', 'ICAO Standards', 'TSA Security', 'Environmental Standards'],
    specialFeatures: ['Flight Operations', 'Maintenance Tracking', 'Safety Management', 'Compliance Monitoring'],
    isConfigured: false
  },
  {
    id: 'real_estate',
    name: 'Real Estate',
    icon: Home,
    description: 'Property management and real estate',
    color: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    essentialSupplies: [
      'Office Supplies', 'Marketing Materials', 'Signage', 'Keys', 'Lock Boxes', 'Forms',
      'Contracts', 'Business Cards', 'Brochures', 'Cleaning Supplies', 'Maintenance Items'
    ],
    materials: [
      'Office Equipment', 'Vehicles', 'Technology Systems', 'Furniture', 'Communication Systems',
      'Security Systems', 'Maintenance Tools'
    ],
    regulations: ['Real Estate Commission', 'Fair Housing Laws', 'Contract Law', 'Local Ordinances'],
    specialFeatures: ['Property Management', 'Client Tracking', 'Document Management', 'Market Analysis'],
    isConfigured: false
  },
  {
    id: 'legal',
    name: 'Legal Services',
    icon: Briefcase,
    description: 'Law firms and legal practices',
    color: 'bg-stone-50 border-stone-200 text-stone-800',
    essentialSupplies: [
      'Legal Documents', 'Office Supplies', 'Filing Systems', 'Legal Books', 'Research Materials',
      'Court Forms', 'Client Files', 'Communication Equipment', 'Security Equipment'
    ],
    materials: [
      'Computer Systems', 'Legal Software', 'Library Materials', 'Office Furniture',
      'Communication Systems', 'Security Systems', 'Document Storage'
    ],
    regulations: ['Bar Association', 'Client Confidentiality', 'Court Rules', 'Ethics Standards'],
    specialFeatures: ['Case Management', 'Time Tracking', 'Document Control', 'Client Communication'],
    isConfigured: false
  },
  {
    id: 'fitness',
    name: 'Fitness & Wellness',
    icon: Heart,
    description: 'Gyms, spas, and wellness centers',
    color: 'bg-rose-50 border-rose-200 text-rose-800',
    essentialSupplies: [
      'Exercise Equipment', 'Towels', 'Cleaning Supplies', 'Water Bottles', 'Fitness Accessories',
      'First Aid Supplies', 'Locker Supplies', 'Sound Equipment', 'Lighting Equipment'
    ],
    materials: [
      'Gym Equipment', 'Audio Systems', 'Flooring', 'Mirrors', 'Lockers', 'Shower Facilities',
      'Reception Area Equipment', 'Climate Control'
    ],
    regulations: ['Health Department', 'Safety Standards', 'Insurance Requirements', 'Accessibility Standards'],
    specialFeatures: ['Member Management', 'Equipment Maintenance', 'Class Scheduling', 'Health Tracking'],
    isConfigured: false
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: Gamepad2,
    description: 'Entertainment venues and gaming',
    color: 'bg-violet-50 border-violet-200 text-violet-800',
    essentialSupplies: [
      'Gaming Equipment', 'Audio Visual Equipment', 'Lighting Equipment', 'Sound Systems',
      'Concession Supplies', 'Tickets', 'Programs', 'Merchandise', 'Cleaning Supplies'
    ],
    materials: [
      'Entertainment Systems', 'Seating', 'Stage Equipment', 'Security Systems',
      'Concession Equipment', 'Box Office Systems', 'Parking Equipment'
    ],
    regulations: ['Entertainment Commission', 'Fire Safety', 'Noise Ordinances', 'Accessibility Standards'],
    specialFeatures: ['Event Management', 'Ticket Sales', 'Crowd Control', 'Equipment Scheduling'],
    isConfigured: false
  },
  {
    id: 'music',
    name: 'Music & Audio',
    icon: Music,
    description: 'Recording studios and music venues',
    color: 'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-800',
    essentialSupplies: [
      'Audio Equipment', 'Instruments', 'Recording Media', 'Cables', 'Microphones',
      'Speakers', 'Headphones', 'Mixing Boards', 'Software', 'Accessories'
    ],
    materials: [
      'Studio Equipment', 'Sound Proofing', 'Lighting Systems', 'Computer Systems',
      'Storage Systems', 'Climate Control', 'Security Systems'
    ],
    regulations: ['Copyright Laws', 'Noise Ordinances', 'Safety Standards', 'Broadcasting Standards'],
    specialFeatures: ['Session Management', 'Equipment Tracking', 'Project Management', 'Client Scheduling'],
    isConfigured: false
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: Activity,
    description: 'IT services and tech companies',
    color: 'bg-cyan-50 border-cyan-200 text-cyan-800',
    essentialSupplies: [
      'Computer Hardware', 'Software Licenses', 'Networking Equipment', 'Servers', 'Storage Devices',
      'Cables', 'Power Supplies', 'Peripherals', 'Security Equipment', 'Office Supplies'
    ],
    materials: [
      'Data Center Equipment', 'Development Tools', 'Testing Equipment', 'Communication Systems',
      'Backup Systems', 'Security Infrastructure', 'Office Equipment'
    ],
    regulations: ['Data Protection Laws', 'Software Licensing', 'Security Standards', 'Industry Compliance'],
    specialFeatures: ['Asset Management', 'License Tracking', 'Security Monitoring', 'Project Management'],
    isConfigured: false
  }
];

export default function IndustrySetup() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [industries, setIndustries] = useState<Industry[]>(PREDEFINED_INDUSTRIES);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customIndustry, setCustomIndustry] = useState<CustomIndustry>({
    name: '',
    description: '',
    essentialSupplies: [],
    materials: [],
    regulations: [],
    specialFeatures: []
  });
  const [customSupplyInput, setCustomSupplyInput] = useState('');
  const [customMaterialInput, setCustomMaterialInput] = useState('');
  const [customRegulationInput, setCustomRegulationInput] = useState('');
  const [customFeatureInput, setCustomFeatureInput] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const configureIndustry = (industryId: string) => {
    setIndustries(prev => prev.map(industry => 
      industry.id === industryId 
        ? { ...industry, isConfigured: true }
        : industry
    ));
    
    // Store configuration in localStorage for persistence
    const configuredIndustry = industries.find(i => i.id === industryId);
    if (configuredIndustry) {
      localStorage.setItem(`maycoletracker-industry-${industryId}`, JSON.stringify({
        ...configuredIndustry,
        configuredAt: new Date().toISOString()
      }));
      
      // Initialize inventory with essential supplies
      initializeInventoryForIndustry(configuredIndustry);
    }
    
    setSelectedIndustry(null);
  };

  const initializeInventoryForIndustry = (industry: Industry) => {
    const inventoryItems = [
      ...industry.essentialSupplies.map(supply => ({
        id: `${industry.id}-${supply.toLowerCase().replace(/\s+/g, '-')}`,
        name: supply,
        category: 'Essential Supply',
        industry: industry.name,
        quantity: getRandomQuantity(),
        minQuantity: getMinQuantity(),
        supplier: getRandomSupplier(industry.name),
        lastUpdated: new Date().toISOString(),
        isEssential: true
      })),
      ...industry.materials.map(material => ({
        id: `${industry.id}-${material.toLowerCase().replace(/\s+/g, '-')}`,
        name: material,
        category: 'Material',
        industry: industry.name,
        quantity: getRandomQuantity(),
        minQuantity: getMinQuantity(),
        supplier: getRandomSupplier(industry.name),
        lastUpdated: new Date().toISOString(),
        isEssential: true
      }))
    ];
    
    // Store inventory items
    localStorage.setItem(`maycoletracker-inventory-${industry.id}`, JSON.stringify(inventoryItems));
    
    // Show success notification
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `${industry.name} industry configured successfully. ${inventoryItems.length} essential items added to inventory.`
      );
      window.speechSynthesis.speak(utterance);
    }
  };

  const getRandomQuantity = () => Math.floor(Math.random() * 500) + 50;
  const getMinQuantity = () => Math.floor(Math.random() * 50) + 10;
  
  const getRandomSupplier = (industry: string) => {
    const suppliers = {
      'Healthcare': ['MedSupply Corp', 'Healthcare Direct', 'Medical Solutions Inc'],
      'Restaurant': ['Fresh Farm Direct', 'Food Service Supply', 'Culinary Partners'],
      'Construction': ['BuildRight Supply', 'Construction Direct', 'Safety First Materials'],
      'Default': ['Premium Suppliers', 'Quality Direct', 'Professional Supply Co']
    };
    
    const supplierList = suppliers[industry as keyof typeof suppliers] || suppliers.Default;
    return supplierList[Math.floor(Math.random() * supplierList.length)];
  };

  const addCustomSupply = () => {
    if (customSupplyInput.trim()) {
      setCustomIndustry(prev => ({
        ...prev,
        essentialSupplies: [...prev.essentialSupplies, customSupplyInput.trim()]
      }));
      setCustomSupplyInput('');
    }
  };

  const addCustomMaterial = () => {
    if (customMaterialInput.trim()) {
      setCustomIndustry(prev => ({
        ...prev,
        materials: [...prev.materials, customMaterialInput.trim()]
      }));
      setCustomMaterialInput('');
    }
  };

  const addCustomRegulation = () => {
    if (customRegulationInput.trim()) {
      setCustomIndustry(prev => ({
        ...prev,
        regulations: [...prev.regulations, customRegulationInput.trim()]
      }));
      setCustomRegulationInput('');
    }
  };

  const addCustomFeature = () => {
    if (customFeatureInput.trim()) {
      setCustomIndustry(prev => ({
        ...prev,
        specialFeatures: [...prev.specialFeatures, customFeatureInput.trim()]
      }));
      setCustomFeatureInput('');
    }
  };

  const createCustomIndustry = () => {
    if (customIndustry.name.trim() && customIndustry.description.trim()) {
      const newIndustry: Industry = {
        id: `custom-${Date.now()}`,
        name: customIndustry.name,
        icon: Building2,
        description: customIndustry.description,
        color: 'bg-amber-50 border-amber-200 text-amber-800',
        essentialSupplies: customIndustry.essentialSupplies,
        materials: customIndustry.materials,
        regulations: customIndustry.regulations,
        specialFeatures: customIndustry.specialFeatures,
        isConfigured: false,
        isCustom: true
      };
      
      setIndustries(prev => [...prev, newIndustry]);
      setShowCustomForm(false);
      setCustomIndustry({
        name: '',
        description: '',
        essentialSupplies: [],
        materials: [],
        regulations: [],
        specialFeatures: []
      });
    }
  };

  const configuredIndustries = industries.filter(industry => industry.isConfigured);
  const totalSuppliesConfigured = configuredIndustries.reduce(
    (total, industry) => total + industry.essentialSupplies.length + industry.materials.length, 0
  );

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
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowCustomForm(true)}
              className="text-white"
              style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Custom Industry
            </Button>
            
            <div className="text-right text-gray-600">
              <div className="text-sm font-medium">
                {currentTime.toLocaleDateString()}
              </div>
              <div className="text-xs opacity-70">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <Building2 className="w-10 h-10 inline mr-3" style={{ color: '#007BFF' }} />
            Industry Setup & Configuration
          </h1>
          <p className="text-gray-600">Configure your industry to automatically provision essential supplies and materials</p>
        </div>

        {/* Configuration Status */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-gray-200">
            <CardContent className="p-4 text-center">
              <Building2 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{industries.length}</div>
              <div className="text-sm text-gray-600">Available Industries</div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{configuredIndustries.length}</div>
              <div className="text-sm text-gray-600">Configured</div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4 text-center">
              <Package className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{totalSuppliesConfigured}</div>
              <div className="text-sm text-gray-600">Supplies Configured</div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {industries.filter(i => i.isCustom).length}
              </div>
              <div className="text-sm text-gray-600">Custom Industries</div>
            </CardContent>
          </Card>
        </div>

        {/* Industry Grid - Smaller Boxes */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-8">
          {industries.map((industry) => {
            const IconComponent = industry.icon;
            return (
              <Card 
                key={industry.id} 
                className={`border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                  industry.isConfigured 
                    ? 'border-green-300 bg-green-50' 
                    : selectedIndustry === industry.id
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedIndustry(selectedIndustry === industry.id ? null : industry.id)}
              >
                <CardContent className="p-3">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className={`p-2 rounded-lg ${industry.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-gray-900">{industry.name}</h3>
                      <p className="text-xs text-gray-600 leading-tight">{industry.description}</p>
                    </div>
                    {industry.isConfigured && (
                      <Badge className="bg-green-500 text-white text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Configured
                      </Badge>
                    )}
                    {industry.isCustom && (
                      <Badge className="bg-amber-500 text-white text-xs">
                        Custom
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Industry Details Panel */}
        {selectedIndustry && (
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center justify-between">
                <span>{industries.find(i => i.id === selectedIndustry)?.name} Configuration</span>
                <Button
                  onClick={() => configureIndustry(selectedIndustry)}
                  className="text-white"
                  style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
                  disabled={industries.find(i => i.id === selectedIndustry)?.isConfigured}
                >
                  {industries.find(i => i.id === selectedIndustry)?.isConfigured ? 'Configured' : 'Configure Industry'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const industry = industries.find(i => i.id === selectedIndustry);
                if (!industry) return null;
                
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Essential Supplies ({industry.essentialSupplies.length})</h4>
                      <div className="bg-white rounded-lg p-3 max-h-40 overflow-y-auto">
                        <div className="grid grid-cols-1 gap-1">
                          {industry.essentialSupplies.map((supply, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <Package className="w-3 h-3 text-blue-600 flex-shrink-0" />
                              <span className="text-gray-700">{supply}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Materials & Equipment ({industry.materials.length})</h4>
                      <div className="bg-white rounded-lg p-3 max-h-40 overflow-y-auto">
                        <div className="grid grid-cols-1 gap-1">
                          {industry.materials.map((material, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <Settings className="w-3 h-3 text-green-600 flex-shrink-0" />
                              <span className="text-gray-700">{material}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Regulations & Compliance</h4>
                      <div className="bg-white rounded-lg p-3">
                        {industry.regulations.map((regulation, index) => (
                          <Badge key={index} className="bg-yellow-100 text-yellow-800 mr-2 mb-2 text-xs">
                            {regulation}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Special Features</h4>
                      <div className="bg-white rounded-lg p-3">
                        {industry.specialFeatures.map((feature, index) => (
                          <Badge key={index} className="bg-purple-100 text-purple-800 mr-2 mb-2 text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        )}

        {/* Custom Industry Form */}
        {showCustomForm && (
          <Card className="mb-8 border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center justify-between">
                <span>Create Custom Industry</span>
                <Button
                  onClick={() => setShowCustomForm(false)}
                  variant="outline"
                  size="sm"
                  className="border-gray-300 text-gray-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry Name</label>
                    <Input
                      value={customIndustry.name}
                      onChange={(e) => setCustomIndustry(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter industry name"
                      className="border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <Input
                      value={customIndustry.description}
                      onChange={(e) => setCustomIndustry(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief industry description"
                      className="border-gray-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Essential Supplies</label>
                    <div className="flex space-x-2 mb-2">
                      <Input
                        value={customSupplyInput}
                        onChange={(e) => setCustomSupplyInput(e.target.value)}
                        placeholder="Add essential supply"
                        className="border-gray-300"
                        onKeyPress={(e) => e.key === 'Enter' && addCustomSupply()}
                      />
                      <Button onClick={addCustomSupply} size="sm" className="text-white" style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {customIndustry.essentialSupplies.map((supply, index) => (
                        <Badge key={index} className="bg-blue-100 text-blue-800 text-xs">
                          {supply}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Materials & Equipment</label>
                    <div className="flex space-x-2 mb-2">
                      <Input
                        value={customMaterialInput}
                        onChange={(e) => setCustomMaterialInput(e.target.value)}
                        placeholder="Add material/equipment"
                        className="border-gray-300"
                        onKeyPress={(e) => e.key === 'Enter' && addCustomMaterial()}
                      />
                      <Button onClick={addCustomMaterial} size="sm" className="text-white" style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {customIndustry.materials.map((material, index) => (
                        <Badge key={index} className="bg-green-100 text-green-800 text-xs">
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    onClick={() => setShowCustomForm(false)}
                    variant="outline"
                    className="border-gray-300 text-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={createCustomIndustry}
                    className="text-white"
                    style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
                    disabled={!customIndustry.name.trim() || !customIndustry.description.trim()}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Create Industry
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={() => navigate('/inventory')}
            className="h-16 text-white"
            style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
          >
            <Package className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-semibold">View Inventory</div>
              <div className="text-xs opacity-80">Configured supplies</div>
            </div>
          </Button>
          
          <Button
            onClick={() => navigate('/automated-ordering')}
            className="h-16 text-white"
            style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-semibold">Auto-Ordering</div>
              <div className="text-xs opacity-80">Setup suppliers</div>
            </div>
          </Button>
          
          <Button
            onClick={() => navigate('/analytics')}
            className="h-16 text-white"
            style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
          >
            <Activity className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-semibold">Analytics</div>
              <div className="text-xs opacity-80">Industry reports</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}