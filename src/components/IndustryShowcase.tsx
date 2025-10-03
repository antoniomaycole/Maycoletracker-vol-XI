import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
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
  BookOpen
} from 'lucide-react';

const industries = [
  {
    icon: ChefHat,
    name: 'Restaurant',
    items: 'Ingredients',
    example: 'Fresh Salmon, Tomatoes, Rice',
    color: 'text-red-500'
  },
  {
    icon: ShoppingCart,
    name: 'Retail',
    items: 'Products',
    example: 'Clothing, Electronics, Books',
    color: 'text-blue-500'
  },
  {
    icon: Factory,
    name: 'Manufacturing',
    items: 'Materials',
    example: 'Steel, Components, Tools',
    color: 'text-gray-600'
  },
  {
    icon: Warehouse,
    name: 'Warehouse',
    items: 'Stock Items',
    example: 'Packages, Equipment, Supplies',
    color: 'text-amber-600'
  },
  {
    icon: Heart,
    name: 'Healthcare',
    items: 'Medical Supplies',
    example: 'Medications, PPE, Instruments',
    color: 'text-green-500'
  },
  {
    icon: Car,
    name: 'Automotive',
    items: 'Parts',
    example: 'Engine Parts, Tires, Fluids',
    color: 'text-purple-500'
  },
  {
    icon: Cpu,
    name: 'Electronics',
    items: 'Components',
    example: 'Semiconductors, Cables, PCBs',
    color: 'text-cyan-500'
  },
  {
    icon: HardHat,
    name: 'Construction',
    items: 'Materials',
    example: 'Tools, Concrete, Lumber',
    color: 'text-orange-500'
  },
  {
    icon: Building2,
    name: 'Hotel',
    items: 'Supplies',
    example: 'Linens, Amenities, F&B',
    color: 'text-indigo-500'
  },
  {
    icon: Truck,
    name: 'Trucking',
    items: 'Fleet Items',
    example: 'Fuel, Parts, Cargo',
    color: 'text-emerald-500'
  },
  {
    icon: Wrench,
    name: 'Service',
    items: 'Tools & Parts',
    example: 'Equipment, Supplies, Materials',
    color: 'text-slate-500'
  },
  {
    icon: BookOpen,
    name: 'Education',
    items: 'Supplies',
    example: 'Books, Equipment, Materials',
    color: 'text-pink-500'
  }
];

export function IndustryShowcase() {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="font-medium mb-2">Trusted by Every Industry</h3>
        <p className="text-sm text-muted-foreground">
          MaycoleTraker adapts to your business automatically
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {industries.map((industry, index) => {
          const Icon = industry.icon;
          return (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-3 text-center">
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${industry.color}`} />
                  <div className="text-sm font-medium">{industry.name}</div>
                  <div className="text-xs text-muted-foreground mb-1">
                    {industry.items}
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
      
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          ...and many more! Let us know your industry and we'll customize everything for you.
        </p>
      </div>
    </div>
  );
}