import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  // Restaurant/Food Service
  ChefHat, Utensils, Fish, Apple, Beef, Coffee, Wheat, Egg,
  
  // Retail
  ShoppingCart, Tag, Package2, Shirt, Home, Gamepad2, BookOpen,
  
  // Manufacturing 
  Factory, Cog, Wrench, Hammer, /*Drill, Screwdriver, Bolt*/ Zap,
  
  // Warehouse/Distribution
  Truck, Package, Box, Forklift, Warehouse, ClipboardList, Archive,
  
  // Healthcare/Medical
  Heart, Stethoscope, Pill, Syringe, Shield, Cross, Activity,
  
  // Automotive
  Car, Wrench as CarWrench, Settings, Fuel, Battery, Gauge,
  
  // Electronics/Tech
  Cpu, Smartphone, Monitor, Cable, Zap as Electric, HardDrive,
  
  // General/Custom
  Box as GenericBox, Plus, Search, AlertTriangle, BarChart3, Calendar, Circle,
  
  // Trucking specific
  Truck as TruckIcon, MapPin, Route, Clock, Fuel as TruckFuel,
  
  // Construction
  HardHat, Shovel, Ruler,
  
  // Hotel/Hospitality
  Building2, Bed, Wine, UtensilsCrossed, Sparkles, Users, Key, BellRing,
  
  // Additional interactive icons
  Scan, Mic, Camera, TrendingUp, Users2, Settings2, Crown, Mail, MessageSquare
} from 'lucide-react';
import type { RouteKey as AppScreen } from '../types/navigation';
import type { BusinessConfig } from './BusinessConfig';

interface IndustryBottomNavProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  businessConfig: BusinessConfig | null;
  lowStockCount: number;
}

const industryNavigationData = {
  restaurant: {
    primary: [
      { screen: 'dashboard' as AppScreen, icon: <ChefHat className="w-5 h-5" />, label: 'Kitchen', description: 'Kitchen Overview' },
      { screen: 'inventory' as AppScreen, icon: <Utensils className="w-5 h-5" />, label: 'Ingredients', description: 'Ingredient Inventory' },
      { screen: 'log-usage' as AppScreen, icon: <Coffee className="w-5 h-5" />, label: 'Cook Log', description: 'Log Usage' },
      { screen: 'alerts' as AppScreen, icon: <AlertTriangle className="w-5 h-5" />, label: 'Alerts', description: 'Stock Alerts' },
    ],
    tools: [
      { icon: <Fish className="w-4 h-4" />, label: 'Seafood', category: 'Seafood' },
      { icon: <Apple className="w-4 h-4" />, label: 'Produce', category: 'Produce' },
      { icon: <Beef className="w-4 h-4" />, label: 'Meat', category: 'Meat' },
      { icon: <Wheat className="w-4 h-4" />, label: 'Dry Goods', category: 'Dry Goods' },
      { icon: <Egg className="w-4 h-4" />, label: 'Dairy', category: 'Dairy' },
    ]
  },
  
  retail: {
    primary: [
      { screen: 'dashboard' as AppScreen, icon: <ShoppingCart className="w-5 h-5" />, label: 'Store', description: 'Store Overview' },
      { screen: 'inventory' as AppScreen, icon: <Package2 className="w-5 h-5" />, label: 'Products', description: 'Product Inventory' },
      { screen: 'log-usage' as AppScreen, icon: <Tag className="w-5 h-5" />, label: 'Sales Log', description: 'Sales & Restocks' },
      { screen: 'alerts' as AppScreen, icon: <AlertTriangle className="w-5 h-5" />, label: 'Alerts', description: 'Stock Alerts' },
    ],
    tools: [
      { icon: <Shirt className="w-4 h-4" />, label: 'Clothing', category: 'Clothing' },
      { icon: <Home className="w-4 h-4" />, label: 'Home', category: 'Home & Garden' },
      { icon: <Gamepad2 className="w-4 h-4" />, label: 'Sports', category: 'Sports' },
      { icon: <BookOpen className="w-4 h-4" />, label: 'Books', category: 'Books' },
      { icon: <Smartphone className="w-4 h-4" />, label: 'Electronics', category: 'Electronics' },
    ]
  },
  
  manufacturing: {
    primary: [
      { screen: 'dashboard' as AppScreen, icon: <Factory className="w-5 h-5" />, label: 'Production', description: 'Production Floor' },
      { screen: 'inventory' as AppScreen, icon: <Cog className="w-5 h-5" />, label: 'Materials', description: 'Raw Materials' },
      { screen: 'log-usage' as AppScreen, icon: <Wrench className="w-5 h-5" />, label: 'Consumption', description: 'Log Usage' },
      { screen: 'alerts' as AppScreen, icon: <AlertTriangle className="w-5 h-5" />, label: 'Alerts', description: 'Supply Alerts' },
    ],
    tools: [
      { icon: <Hammer className="w-4 h-4" />, label: 'Tools', category: 'Tools' },
  { icon: <Wrench className="w-4 h-4" />, label: 'Components', category: 'Components' },
  { icon: <Zap className="w-4 h-4" />, label: 'Hardware', category: 'Hardware' },
      { icon: <Zap className="w-4 h-4" />, label: 'Chemicals', category: 'Chemicals' },
      { icon: <Box className="w-4 h-4" />, label: 'Packaging', category: 'Packaging' },
    ]
  },
  
  warehouse: {
    primary: [
      { screen: 'dashboard' as AppScreen, icon: <Warehouse className="w-5 h-5" />, label: 'Warehouse', description: 'Warehouse Overview' },
      { screen: 'inventory' as AppScreen, icon: <Package className="w-5 h-5" />, label: 'Stock Items', description: 'Inventory Stock' },
      { screen: 'log-usage' as AppScreen, icon: <Truck className="w-5 h-5" />, label: 'Shipments', description: 'Log Shipments' },
      { screen: 'alerts' as AppScreen, icon: <AlertTriangle className="w-5 h-5" />, label: 'Alerts', description: 'Stock Alerts' },
    ],
    tools: [
      { icon: <Box className="w-4 h-4" />, label: 'Boxes', category: 'Packaging' },
      { icon: <Archive className="w-4 h-4" />, label: 'Equipment', category: 'Equipment' },
      { icon: <Package2 className="w-4 h-4" />, label: 'Electronics', category: 'Electronics' },
      { icon: <ClipboardList className="w-4 h-4" />, label: 'Supplies', category: 'Supplies' },
      { icon: <Forklift className="w-4 h-4" />, label: 'Materials', category: 'Materials' },
    ]
  },
  
  healthcare: {
    primary: [
      { screen: 'dashboard' as AppScreen, icon: <Heart className="w-5 h-5" />, label: 'Facility', description: 'Medical Facility' },
      { screen: 'inventory' as AppScreen, icon: <Stethoscope className="w-5 h-5" />, label: 'Supplies', description: 'Medical Supplies' },
      { screen: 'log-usage' as AppScreen, icon: <Pill className="w-5 h-5" />, label: 'Dispensed', description: 'Log Dispensed' },
      { screen: 'alerts' as AppScreen, icon: <AlertTriangle className="w-5 h-5" />, label: 'Alerts', description: 'Supply Alerts' },
    ],
    tools: [
      { icon: <Pill className="w-4 h-4" />, label: 'Medications', category: 'Medications' },
      { icon: <Syringe className="w-4 h-4" />, label: 'Instruments', category: 'Instruments' },
      { icon: <Shield className="w-4 h-4" />, label: 'PPE', category: 'PPE' },
      { icon: <Cross className="w-4 h-4" />, label: 'Supplies', category: 'Supplies' },
      { icon: <Activity className="w-4 h-4" />, label: 'Equipment', category: 'Equipment' },
    ]
  },
  
  automotive: {
    primary: [
      { screen: 'dashboard' as AppScreen, icon: <Car className="w-5 h-5" />, label: 'Auto Shop', description: 'Auto Shop Overview' },
      { screen: 'inventory' as AppScreen, icon: <CarWrench className="w-5 h-5" />, label: 'Parts', description: 'Auto Parts' },
      { screen: 'log-usage' as AppScreen, icon: <Settings className="w-5 h-5" />, label: 'Installed', description: 'Parts Installed' },
      { screen: 'alerts' as AppScreen, icon: <AlertTriangle className="w-5 h-5" />, label: 'Alerts', description: 'Parts Alerts' },
    ],
    tools: [
      { icon: <Fuel className="w-4 h-4" />, label: 'Fluids', category: 'Fluids' },
      { icon: <Battery className="w-4 h-4" />, label: 'Electronics', category: 'Electronics' },
      { icon: <Gauge className="w-4 h-4" />, label: 'Engine Parts', category: 'Engine Parts' },
      { icon: <Circle className="w-4 h-4" />, label: 'Tires', category: 'Tires' },
      { icon: <Wrench className="w-4 h-4" />, label: 'Tools', category: 'Tools' },
    ]
  },
  
  electronics: {
    primary: [
      { screen: 'dashboard' as AppScreen, icon: <Cpu className="w-5 h-5" />, label: 'Assembly', description: 'Assembly Line' },
  { screen: 'inventory' as AppScreen, icon: <Cpu className="w-5 h-5" />, label: 'Components', description: 'Electronic Components' },
      { screen: 'log-usage' as AppScreen, icon: <Electric className="w-5 h-5" />, label: 'Consumed', description: 'Parts Consumed' },
      { screen: 'alerts' as AppScreen, icon: <AlertTriangle className="w-5 h-5" />, label: 'Alerts', description: 'Component Alerts' },
    ],
    tools: [
  { icon: <Cpu className="w-4 h-4" />, label: 'Semiconductors', category: 'Semiconductors' },
      { icon: <Cable className="w-4 h-4" />, label: 'Cables', category: 'Cables' },
      { icon: <HardDrive className="w-4 h-4" />, label: 'PCBs', category: 'PCBs' },
      { icon: <Monitor className="w-4 h-4" />, label: 'Connectors', category: 'Connectors' },
      { icon: <Cpu className="w-4 h-4" />, label: 'Components', category: 'Components' },
    ]
  },
  
  // Special industries not in main config but requested by user
  trucking: {
    primary: [
      { screen: 'dashboard' as AppScreen, icon: <TruckIcon className="w-5 h-5" />, label: 'Fleet', description: 'Fleet Overview' },
      { screen: 'inventory' as AppScreen, icon: <Package className="w-5 h-5" />, label: 'Cargo', description: 'Cargo Inventory' },
      { screen: 'log-usage' as AppScreen, icon: <Route className="w-5 h-5" />, label: 'Delivered', description: 'Log Deliveries' },
      { screen: 'alerts' as AppScreen, icon: <AlertTriangle className="w-5 h-5" />, label: 'Alerts', description: 'Fleet Alerts' },
    ],
    tools: [
      { icon: <TruckFuel className="w-4 h-4" />, label: 'Fuel', category: 'Fuel' },
      { icon: <MapPin className="w-4 h-4" />, label: 'Parts', category: 'Truck Parts' },
      { icon: <Clock className="w-4 h-4" />, label: 'Maintenance', category: 'Maintenance' },
      { icon: <Package className="w-4 h-4" />, label: 'Cargo', category: 'Cargo' },
      { icon: <Route className="w-4 h-4" />, label: 'Supplies', category: 'Supplies' },
    ]
  },
  
  construction: {
    primary: [
      { screen: 'dashboard' as AppScreen, icon: <HardHat className="w-5 h-5" />, label: 'Site', description: 'Construction Site' },
      { screen: 'inventory' as AppScreen, icon: <Hammer className="w-5 h-5" />, label: 'Materials', description: 'Construction Materials' },
      { screen: 'log-usage' as AppScreen, icon: <Shovel className="w-5 h-5" />, label: 'Used', description: 'Materials Used' },
      { screen: 'alerts' as AppScreen, icon: <AlertTriangle className="w-5 h-5" />, label: 'Alerts', description: 'Material Alerts' },
    ],
    tools: [
      { icon: <Hammer className="w-4 h-4" />, label: 'Tools', category: 'Tools' },
      { icon: <Box className="w-4 h-4" />, label: 'Concrete', category: 'Concrete' },
      { icon: <Ruler className="w-4 h-4" />, label: 'Lumber', category: 'Lumber' },
      { icon: <Shield className="w-4 h-4" />, label: 'Safety', category: 'Safety Equipment' },
      { icon: <Cog className="w-4 h-4" />, label: 'Equipment', category: 'Equipment' },
    ]
  },
  
  hotel: {
    primary: [
      { screen: 'dashboard' as AppScreen, icon: <Building2 className="w-5 h-5" />, label: 'Hotel', description: 'Hotel Overview' },
      { screen: 'inventory' as AppScreen, icon: <Bed className="w-5 h-5" />, label: 'Supplies', description: 'Hotel Supplies' },
      { screen: 'log-usage' as AppScreen, icon: <BellRing className="w-5 h-5" />, label: 'Service Log', description: 'Service Usage' },
      { screen: 'alerts' as AppScreen, icon: <AlertTriangle className="w-5 h-5" />, label: 'Alerts', description: 'Supply Alerts' },
    ],
    tools: [
      { icon: <Bed className="w-4 h-4" />, label: 'Linens', category: 'Linens' },
      { icon: <Sparkles className="w-4 h-4" />, label: 'Amenities', category: 'Amenities' },
      { icon: <UtensilsCrossed className="w-4 h-4" />, label: 'F&B', category: 'Food & Beverage' },
      { icon: <Wine className="w-4 h-4" />, label: 'Minibar', category: 'Minibar' },
      { icon: <Users className="w-4 h-4" />, label: 'Housekeeping', category: 'Housekeeping' },
    ]
  },
  
  // Default/Custom fallback
  custom: {
    primary: [
      { screen: 'dashboard' as AppScreen, icon: <GenericBox className="w-5 h-5" />, label: 'Dashboard', description: 'Overview' },
      { screen: 'inventory' as AppScreen, icon: <Package className="w-5 h-5" />, label: 'Inventory', description: 'Item Inventory' },
      { screen: 'log-usage' as AppScreen, icon: <Plus className="w-5 h-5" />, label: 'Log Usage', description: 'Log Usage' },
      { screen: 'alerts' as AppScreen, icon: <AlertTriangle className="w-5 h-5" />, label: 'Alerts', description: 'Stock Alerts' },
    ],
    tools: [
      { icon: <GenericBox className="w-4 h-4" />, label: 'Items', category: 'General' },
      { icon: <Search className="w-4 h-4" />, label: 'Search', category: 'Search' },
      { icon: <BarChart3 className="w-4 h-4" />, label: 'Reports', category: 'Reports' },
      { icon: <Calendar className="w-4 h-4" />, label: 'Schedule', category: 'Schedule' },
      { icon: <Settings className="w-4 h-4" />, label: 'Settings', category: 'Settings' },
    ]
  }
};

export function IndustryBottomNav({ currentScreen, onNavigate, businessConfig, lowStockCount }: IndustryBottomNavProps) {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [pressedButton, setPressedButton] = useState<string | null>(null);
  
  // Determine which industry navigation to show
  const getIndustryType = () => {
    if (!businessConfig) return 'custom';
    
    // Handle special cases first
    if (businessConfig.businessName?.toLowerCase().includes('trucking') || 
        businessConfig.businessName?.toLowerCase().includes('logistics') ||
        businessConfig.businessName?.toLowerCase().includes('transport')) {
      return 'trucking';
    }
    
    if (businessConfig.businessName?.toLowerCase().includes('construction') ||
        businessConfig.businessName?.toLowerCase().includes('builder') ||
        businessConfig.businessName?.toLowerCase().includes('contractor')) {
      return 'construction';
    }
    
    if (businessConfig.businessName?.toLowerCase().includes('hotel') ||
        businessConfig.businessName?.toLowerCase().includes('resort') ||
        businessConfig.businessName?.toLowerCase().includes('hospitality') ||
        businessConfig.businessName?.toLowerCase().includes('inn') ||
        businessConfig.businessName?.toLowerCase().includes('lodge')) {
      return 'hotel';
    }
    
    return businessConfig.businessType;
  };
  
  const industryType = getIndustryType();
  const navData = industryNavigationData[industryType] || industryNavigationData.custom;
  
  // Animation variants
  const navigationVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  const pulseVariants = {
    idle: { scale: 1 },
    active: { scale: 1 } // No pulsing for active state
  };
  
  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border shadow-2xl z-40"
      variants={navigationVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main Navigation Row */}
      <motion.div className="flex items-center justify-around px-2 py-3">
        {navData.primary.map((item, index) => (
          <motion.div
            key={item.screen}
            variants={itemVariants}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onTapStart={() => setPressedButton(item.screen)}
            onTap={() => setPressedButton(null)}
          >
            <Button
              variant={currentScreen === item.screen ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate(item.screen)}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 relative transition-all duration-200 ${
                currentScreen === item.screen 
                  ? 'shadow-lg shadow-primary/25' 
                  : 'hover:bg-accent/50 hover:shadow-md hover:scale-105'
              } ${pressedButton === item.screen ? 'scale-95' : ''}`}
            >
              <motion.div
                whileHover={{
                  rotate: [0, 5, -5, 0],
                  scale: 1.1
                }}
                transition={{ duration: 0.3 }}
              >
                {item.icon}
              </motion.div>
              <span className="text-xs font-medium">{item.label}</span>
              
              {/* Active indicator */}
              {currentScreen === item.screen && (
                <motion.div
                  className="absolute -bottom-1 left-1/2 w-1 h-1 bg-primary rounded-full"
                  layoutId="activeIndicator"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              
              {/* Alert badge with animation */}
              <AnimatePresence>
                {item.screen === 'alerts' && lowStockCount > 0 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      y: [0, -2, 0]
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ 
                      duration: 0.3,
                      y: { duration: 1, repeat: Infinity }
                    }}
                  >
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-destructive hover:bg-destructive/90 animate-pulse">
                      {lowStockCount}
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Quick Tools Row */}
      <motion.div 
        className="flex items-center justify-center gap-1 px-4 py-2 bg-gradient-to-r from-muted/20 via-muted/30 to-muted/20 border-t border-border/50"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.span 
          className="text-xs text-muted-foreground mr-2 font-medium"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Quick Access:
        </motion.span>
        <div className="flex gap-1 overflow-x-auto scrollbar-hide">
          {navData.tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                y: -1,
                transition: { type: "spring", stiffness: 400 }
              }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setHoveredTool(tool.label)}
              onHoverEnd={() => setHoveredTool(null)}
            >
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center gap-1 h-7 px-2 text-xs whitespace-nowrap transition-all duration-200 ${
                  hoveredTool === tool.label 
                    ? 'bg-accent text-accent-foreground shadow-sm border border-border/50' 
                    : 'hover:bg-accent/50'
                }`}
                onClick={() => {
                  // Navigate to inventory with category filter
                  onNavigate('inventory');
                  // You could add category filtering logic here
                }}
              >
                <motion.div
                  animate={{
                    rotate: hoveredTool === tool.label ? 360 : 0
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {tool.icon}
                </motion.div>
                <span>{tool.label}</span>
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Enhanced Action Buttons Row */}
      <motion.div 
        className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-t border-border/30"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('scanner')}
            className="flex items-center gap-1 h-7 px-2 text-xs hover:bg-primary/10 hover:text-primary transition-all duration-200"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Scan className="w-3 h-3" />
            </motion.div>
            <span>Scan</span>
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('analytics')}
            className="flex items-center gap-1 h-7 px-2 text-xs hover:bg-accent transition-all duration-200"
          >
            <motion.div
              animate={{ y: [0, -1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <TrendingUp className="w-3 h-3" />
            </motion.div>
            <span>Analytics</span>
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('suppliers')}
            className="flex items-center gap-1 h-7 px-2 text-xs hover:bg-accent transition-all duration-200"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Users2 className="w-3 h-3" />
            </motion.div>
            <span>Suppliers</span>
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('contact')}
            className="flex items-center gap-1 h-7 px-2 text-xs hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-400 transition-all duration-200"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <MessageSquare className="w-3 h-3" />
            </motion.div>
            <span>Contact</span>
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="sm"
            onClick={() => onNavigate('subscription')}
            className="flex items-center gap-1 h-7 px-2 text-xs bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-none transition-all duration-200"
          >
            <Crown className="w-3 h-3" />
            <span>Pro</span>
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('business-config')}
            className="flex items-center gap-1 h-7 px-2 text-xs hover:bg-accent transition-all duration-200"
          >
            <motion.div
              animate={{ rotate: [0, 90, 180, 270, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Settings2 className="w-3 h-3" />
            </motion.div>
            <span>Config</span>
          </Button>
        </motion.div>
      </motion.div>
      
      {/* Enhanced Industry Indicator */}
      <motion.div 
        className="text-center py-1 bg-gradient-to-r from-transparent via-primary/5 to-transparent relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          animate={{ x: [-100, 300] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.span 
          className="text-xs text-muted-foreground font-medium relative z-10"
          animate={{ 
            textShadow: [
              "0 0 0px rgba(0,0,0,0)",
              "0 0 5px rgba(0,0,0,0.1)",
              "0 0 0px rgba(0,0,0,0)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🏗️ {businessConfig?.businessName || 'Universal'} • {industryType.charAt(0).toUpperCase() + industryType.slice(1)} Mode
        </motion.span>
      </motion.div>
    </motion.div>
  );
}