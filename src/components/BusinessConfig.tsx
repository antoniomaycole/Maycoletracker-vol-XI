import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { ArrowLeft, Settings, Building, Factory, Store, Utensils, Wrench, Truck, Package, HardHat, Fuel, Building2 } from 'lucide-react';
import { IndustrySelector } from './IndustrySelector';
import type { RouteKey as AppScreen } from '../types/navigation';

interface BusinessConfigProps {
  onNavigate: (screen: AppScreen) => void;
  onConfigSave: (config: BusinessConfig) => void;
}

export interface BusinessConfig {
  businessType: 'restaurant' | 'retail' | 'manufacturing' | 'warehouse' | 'healthcare' | 'automotive' | 'electronics' | 'trucking' | 'construction' | 'hotel' | 'custom';
  businessName: string;
  categories: string[];
  units: string[];
  terminology: {
    items: string; // "Inventory Items" vs "Products" vs "Parts"
    usage: string; // "Used" vs "Consumed" vs "Sold"
    location: string; // "Kitchen" vs "Warehouse" vs "Shop Floor"
  };
}

const presetConfigs: Record<string, Partial<BusinessConfig>> = {
  restaurant: {
    categories: ['Seafood', 'Produce', 'Dry Goods', 'Dairy', 'Meat', 'Beverages'],
    units: ['Box', 'lb', 'kg', 'pcs', 'gal', 'L', 'cases'],
    terminology: {
      items: 'Ingredients',
      usage: 'Used',
      location: 'Kitchen'
    }
  },
  retail: {
    categories: ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Toys'],
    units: ['pcs', 'units', 'cases', 'boxes', 'pallets'],
    terminology: {
      items: 'Products',
      usage: 'Sold',
      location: 'Store'
    }
  },
  manufacturing: {
    categories: ['Raw Materials', 'Components', 'Assemblies', 'Tools', 'Chemicals', 'Packaging'],
    units: ['kg', 'lb', 'pcs', 'rolls', 'sheets', 'm', 'ft'],
    terminology: {
      items: 'Materials',
      usage: 'Consumed',
      location: 'Production Floor'
    }
  },
  warehouse: {
    categories: ['Electronics', 'Parts', 'Supplies', 'Equipment', 'Materials', 'Packaging'],
    units: ['pcs', 'cases', 'pallets', 'boxes', 'units', 'kg', 'lb'],
    terminology: {
      items: 'Stock Items',
      usage: 'Shipped',
      location: 'Warehouse'
    }
  },
  healthcare: {
    categories: ['Medications', 'Supplies', 'Equipment', 'PPE', 'Instruments', 'Disposables'],
    units: ['pcs', 'boxes', 'cases', 'units', 'vials', 'packages'],
    terminology: {
      items: 'Medical Supplies',
      usage: 'Dispensed',
      location: 'Facility'
    }
  },
  automotive: {
    categories: ['Engine Parts', 'Body Parts', 'Electronics', 'Fluids', 'Tools', 'Tires'],
    units: ['pcs', 'units', 'L', 'gal', 'kg', 'lb', 'sets'],
    terminology: {
      items: 'Parts',
      usage: 'Installed',
      location: 'Shop'
    }
  },
  electronics: {
    categories: ['Components', 'Semiconductors', 'PCBs', 'Cables', 'Connectors', 'Tools'],
    units: ['pcs', 'reels', 'packages', 'strips', 'm', 'ft'],
    terminology: {
      items: 'Components',
      usage: 'Consumed',
      location: 'Assembly Line'
    }
  },
  trucking: {
    categories: ['Fuel', 'Truck Parts', 'Maintenance Supplies', 'Cargo Equipment', 'Safety Equipment', 'Fluids'],
    units: ['gal', 'L', 'pcs', 'units', 'cases', 'bottles', 'boxes'],
    terminology: {
      items: 'Fleet Supplies',
      usage: 'Consumed',
      location: 'Fleet Yard'
    }
  },
  construction: {
    categories: ['Tools', 'Lumber', 'Concrete', 'Hardware', 'Safety Equipment', 'Electrical', 'Plumbing'],
    units: ['pcs', 'boards', 'bags', 'yards', 'ft', 'm', 'boxes', 'cases'],
    terminology: {
      items: 'Materials',
      usage: 'Used',
      location: 'Job Site'
    }
  },
  hotel: {
    categories: ['Linens', 'Amenities', 'Food & Beverage', 'Minibar', 'Housekeeping', 'Guest Supplies', 'Maintenance'],
    units: ['pcs', 'sets', 'bottles', 'cases', 'rolls', 'boxes', 'units'],
    terminology: {
      items: 'Hotel Supplies',
      usage: 'Consumed',
      location: 'Hotel'
    }
  }
};

export function BusinessConfig({ onNavigate, onConfigSave }: BusinessConfigProps) {
  const [config, setConfig] = useState<BusinessConfig>({
    businessType: 'custom',
    businessName: '',
    categories: [],
    units: [],
    terminology: {
      items: 'Items',
      usage: 'Used',
      location: 'Location'
    }
  });

  const [newCategory, setNewCategory] = useState('');
  const [newUnit, setNewUnit] = useState('');

  const businessTypes = [
    { id: 'restaurant', name: 'Restaurant/Food Service', icon: <Utensils className="w-5 h-5" /> },
    { id: 'retail', name: 'Retail Store', icon: <Store className="w-5 h-5" /> },
    { id: 'manufacturing', name: 'Manufacturing', icon: <Factory className="w-5 h-5" /> },
    { id: 'warehouse', name: 'Warehouse/Distribution', icon: <Package className="w-5 h-5" /> },
    { id: 'healthcare', name: 'Healthcare/Medical', icon: <Building className="w-5 h-5" /> },
    { id: 'automotive', name: 'Automotive/Repair', icon: <Wrench className="w-5 h-5" /> },
    { id: 'electronics', name: 'Electronics/Tech', icon: <Settings className="w-5 h-5" /> },
    { id: 'trucking', name: 'Trucking/Logistics', icon: <Truck className="w-5 h-5" /> },
    { id: 'construction', name: 'Construction/Building', icon: <HardHat className="w-5 h-5" /> },
    { id: 'hotel', name: 'Hotel/Hospitality', icon: <Building2 className="w-5 h-5" /> },
    { id: 'custom', name: 'Custom Setup', icon: <Settings className="w-5 h-5" /> }
  ];

  const handleBusinessTypeChange = (type: string) => {
    const preset = presetConfigs[type];
    setConfig(prev => ({
      ...prev,
      businessType: type as BusinessConfig['businessType'],
      ...(preset || {})
    }));
  };

  const addCategory = () => {
    if (newCategory && !config.categories.includes(newCategory)) {
      setConfig(prev => ({
        ...prev,
        categories: [...prev.categories, newCategory]
      }));
      setNewCategory('');
    }
  };

  const removeCategory = (category: string) => {
    setConfig(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c !== category)
    }));
  };

  const addUnit = () => {
    if (newUnit && !config.units.includes(newUnit)) {
      setConfig(prev => ({
        ...prev,
        units: [...prev.units, newUnit]
      }));
      setNewUnit('');
    }
  };

  const removeUnit = (unit: string) => {
    setConfig(prev => ({
      ...prev,
      units: prev.units.filter(u => u !== unit)
    }));
  };

  const handleSave = () => {
    localStorage.setItem('maycoletraker-business-config', JSON.stringify(config));
    onConfigSave(config);
    onNavigate('dashboard');
  };

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          onClick={() => onNavigate('dashboard')}
          variant="ghost"
          size="sm"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="flex items-center gap-2">
          <Settings className="w-6 h-6" />
          🏢 Business Configuration
        </h1>
      </div>

      {/* Industry Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Configure Your Business</CardTitle>
        </CardHeader>
        <CardContent>
          <IndustrySelector
            currentConfig={config}
            onIndustryChange={handleBusinessTypeChange}
            onCustomizeClick={() => {
              // Already on the customize page, just scroll to details
              document.getElementById('business-details')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </CardContent>
      </Card>

      {/* Business Details */}
      <Card id="business-details">
        <CardHeader>
          <CardTitle>Business Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              value={config.businessName}
              onChange={(e) => setConfig(prev => ({ ...prev, businessName: e.target.value }))}
              placeholder="Enter your business name"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Add new category"
              onKeyPress={(e) => e.key === 'Enter' && addCategory()}
            />
            <Button onClick={addCategory}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {config.categories.map((category) => (
              <Badge key={category} variant="secondary" className="cursor-pointer">
                {category}
                <button
                  onClick={() => removeCategory(category)}
                  className="ml-1 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Units Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Measurement Units</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newUnit}
              onChange={(e) => setNewUnit(e.target.value)}
              placeholder="Add new unit (e.g., kg, pcs, boxes)"
              onKeyPress={(e) => e.key === 'Enter' && addUnit()}
            />
            <Button onClick={addUnit}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {config.units.map((unit) => (
              <Badge key={unit} variant="outline" className="cursor-pointer">
                {unit}
                <button
                  onClick={() => removeUnit(unit)}
                  className="ml-1 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Terminology Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Terminology</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="itemsTerm">Items Label</Label>
              <Input
                id="itemsTerm"
                value={config.terminology.items}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  terminology: { ...prev.terminology, items: e.target.value }
                }))}
                placeholder="e.g., Products, Parts, Supplies"
              />
            </div>
            <div>
              <Label htmlFor="usageTerm">Usage Action</Label>
              <Input
                id="usageTerm"
                value={config.terminology.usage}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  terminology: { ...prev.terminology, usage: e.target.value }
                }))}
                placeholder="e.g., Used, Sold, Consumed"
              />
            </div>
            <div>
              <Label htmlFor="locationTerm">Location Term</Label>
              <Input
                id="locationTerm"
                value={config.terminology.location}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  terminology: { ...prev.terminology, location: e.target.value }
                }))}
                placeholder="e.g., Warehouse, Shop, Facility"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div><strong>Business:</strong> {config.businessName || 'Not set'}</div>
            <div><strong>Type:</strong> {config.businessType}</div>
            <div><strong>Categories:</strong> {config.categories.join(', ') || 'None set'}</div>
            <div><strong>Units:</strong> {config.units.join(', ') || 'None set'}</div>
            <div><strong>Terminology:</strong> {config.terminology.items} • {config.terminology.usage} • {config.terminology.location}</div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={handleSave} className="flex-1">
          💾 Save Configuration
        </Button>
        <Button onClick={() => onNavigate('dashboard')} variant="outline">
          Cancel
        </Button>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>Configure MaycoleTraker for your specific business needs</p>
        <p className="mt-1">MaycoleTraker • Developed by MaycoleTechnologies™</p>
      </div>
    </div>
  );
}