import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  ChefHat, 
  ShoppingCart, 
  Factory, 
  Warehouse, 
  Heart, 
  Car, 
  Cpu, 
  HardHat, 
  Building2,
  Truck,
  Wrench,
  BookOpen,
  ArrowRight,
  CheckCircle,
  Settings
} from 'lucide-react';
import type { BusinessConfig } from './BusinessConfig';

interface IndustrySelectorProps {
  currentConfig: BusinessConfig | null;
  onIndustryChange: (industryType: string) => void;
  onCustomizeClick: () => void;
  compact?: boolean;
}

const industries = [
  {
    id: 'restaurant',
    name: 'Restaurant',
    icon: ChefHat,
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-950/20',
    borderColor: 'border-red-200 dark:border-red-800',
    selectedColor: 'bg-red-500 text-white',
    description: 'Food inventory & ingredients',
    items: 'Ingredients',
    example: 'Fresh Salmon, Tomatoes, Rice'
  },
  {
    id: 'retail',
    name: 'Retail',
    icon: ShoppingCart,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    selectedColor: 'bg-blue-500 text-white',
    description: 'Products & merchandise',
    items: 'Products',
    example: 'Clothing, Electronics, Books'
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    icon: Factory,
    color: 'text-slate-600',
    bgColor: 'bg-slate-50 dark:bg-slate-950/20',
    borderColor: 'border-slate-200 dark:border-slate-800',
    selectedColor: 'bg-slate-600 text-white',
    description: 'Raw materials & components',
    items: 'Materials',
    example: 'Steel, Components, Tools'
  },
  {
    id: 'warehouse',
    name: 'Warehouse',
    icon: Warehouse,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 dark:bg-amber-950/20',
    borderColor: 'border-amber-200 dark:border-amber-800',
    selectedColor: 'bg-amber-600 text-white',
    description: 'Storage & distribution',
    items: 'Stock Items',
    example: 'Packages, Equipment, Supplies'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: Heart,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    selectedColor: 'bg-emerald-500 text-white',
    description: 'Medical supplies & equipment',
    items: 'Medical Supplies',
    example: 'Medications, PPE, Instruments'
  },
  {
    id: 'automotive',
    name: 'Automotive',
    icon: Car,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    borderColor: 'border-purple-200 dark:border-purple-800',
    selectedColor: 'bg-purple-500 text-white',
    description: 'Parts & maintenance',
    items: 'Parts',
    example: 'Engine Parts, Tires, Fluids'
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: Cpu,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-50 dark:bg-cyan-950/20',
    borderColor: 'border-cyan-200 dark:border-cyan-800',
    selectedColor: 'bg-cyan-500 text-white',
    description: 'Components & devices',
    items: 'Components',
    example: 'Semiconductors, Cables, PCBs'
  },
  {
    id: 'construction',
    name: 'Construction',
    icon: HardHat,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    borderColor: 'border-orange-200 dark:border-orange-800',
    selectedColor: 'bg-orange-500 text-white',
    description: 'Materials & tools',
    items: 'Materials',
    example: 'Tools, Concrete, Lumber'
  }
];

export function IndustrySelector({ currentConfig, onIndustryChange, onCustomizeClick, compact = false }: IndustrySelectorProps) {
  const [showAll, setShowAll] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<string>(currentConfig?.businessType || 'custom');

  const handleIndustrySelect = (industryId: string) => {
  setSelectedIndustry(industryId as any);
    onIndustryChange(industryId);
  };

  const displayIndustries = showAll ? industries : industries.slice(0, 6);

  if (compact) {
    return (
      <div className="space-y-3">
        <div className="text-center">
          <h4 className="font-medium text-sm">Works for Your Business</h4>
          <p className="text-xs text-muted-foreground">
            Choose your industry for optimized experience
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {industries.slice(0, 6).map((industry) => {
            const Icon = industry.icon;
            const isSelected = selectedIndustry === industry.id;
            
            return (
              <motion.button
                key={industry.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleIndustrySelect(industry.id)}
                className={`p-2 rounded-lg border transition-all duration-200 text-center ${
                  isSelected 
                    ? industry.borderColor + ' ' + industry.bgColor + ' shadow-sm' 
                    : 'border-border hover:' + industry.borderColor + ' hover:' + industry.bgColor
                }`}
              >
                <Icon className={`w-4 h-4 mx-auto mb-1 ${isSelected ? 'text-primary' : industry.color}`} />
                <div className="text-xs font-medium">{industry.name}</div>
              </motion.button>
            );
          })}
        </div>
        
        <div className="text-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onCustomizeClick}
            className="text-xs h-7"
          >
            <Settings className="w-3 h-3 mr-1" />
            Customize
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="font-medium">MaycoleTraker Works for Every Business</h3>
        <p className="text-sm text-muted-foreground">
          Select your industry for an optimized experience, or use our universal configuration
        </p>
        <Badge variant="outline" className="text-xs">
          {currentConfig?.businessName || 'Universal Business'} • 
          {selectedIndustry === 'custom' ? 'Custom Configuration' : industries.find(i => i.id === selectedIndustry)?.name}
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {displayIndustries.map((industry, index) => {
          const Icon = industry.icon;
          const isSelected = selectedIndustry === industry.id;
          
          return (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                  isSelected 
                    ? industry.borderColor + ' ' + industry.bgColor + ' shadow-lg scale-105' 
                    : 'border-border hover:' + industry.borderColor + ' hover:' + industry.bgColor
                }`}
                onClick={() => handleIndustrySelect(industry.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-3">
                    <Icon className={`w-6 h-6 ${isSelected ? industry.color : industry.color}`} />
                    {isSelected && (
                      <CheckCircle className={`w-4 h-4 ml-1 ${industry.color}`} />
                    )}
                  </div>
                  <div className="text-sm font-medium mb-1">{industry.name}</div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {industry.description}
                  </div>
                  <div className="text-xs text-muted-foreground opacity-75">
                    {industry.example}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {!showAll && industries.length > 6 && (
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => setShowAll(true)}
            className="gap-2"
          >
            View More Industries
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {showAll && (
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => setShowAll(false)}
            className="gap-2"
          >
            Show Less
          </Button>
        </div>
      )}

      <div className="border-t pt-4">
        <Card className="border-dashed">
          <CardContent className="p-4 text-center">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">Custom Business Configuration</h4>
                <p className="text-sm text-muted-foreground">
                  Don't see your industry? Create a custom configuration for your specific needs.
                </p>
              </div>
              <Button 
                variant={selectedIndustry === 'custom' ? 'default' : 'outline'}
                onClick={() => {
                  setSelectedIndustry('custom');
                  onCustomizeClick();
                }}
                className="gap-2"
              >
                <Settings className="w-4 h-4" />
                {selectedIndustry === 'custom' ? 'Current: Custom Setup' : 'Create Custom Setup'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Quick Industry Pills Component for Header
export function IndustryPills({ currentConfig, onIndustryChange }: { 
  currentConfig: BusinessConfig | null; 
  onIndustryChange: (industryType: string) => void;
}) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>(currentConfig?.businessType || 'custom');

  const handleIndustrySelect = (industryId: string) => {
    setSelectedIndustry(industryId);
    onIndustryChange(industryId);
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-2">
      {industries.slice(0, 8).map((industry) => {
        const Icon = industry.icon;
        const isSelected = selectedIndustry === industry.id;
        
        return (
          <motion.button
            key={industry.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleIndustrySelect(industry.id)}
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs border transition-all duration-200 ${
              isSelected 
                ? industry.selectedColor + ' shadow-sm border-transparent' 
                : industry.borderColor + ' ' + industry.bgColor + ' ' + industry.color + ' hover:shadow-sm'
            }`}
          >
            <Icon className="w-3 h-3" />
            {industry.name}
          </motion.button>
        );
      })}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleIndustrySelect('custom')}
        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs border transition-all duration-200 ${
          selectedIndustry === 'custom'
            ? 'border-primary bg-primary text-primary-foreground shadow-sm' 
            : 'border-border hover:border-primary/50 hover:bg-accent text-muted-foreground hover:text-foreground'
        }`}
      >
        <Settings className="w-3 h-3" />
        Custom
      </motion.button>
    </div>
  );
}