import React, { useState } from 'react';
import React, { useState, useMemo } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { ArrowLeft, Search, AlertTriangle } from 'lucide-react';
import { InventoryItem, AppScreen } from '../App';
import type { BusinessConfig } from './BusinessConfig';

interface InventoryListProps {
  items: InventoryItem[];
  onEditItem: (item: InventoryItem) => void;
  onNavigate: (screen: AppScreen) => void;
  trainingMode: boolean;
  businessConfig: BusinessConfig | null;
}

export function InventoryList({ items, onEditItem, onNavigate, trainingMode, businessConfig }: InventoryListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Use business config categories if available, otherwise derive from items
  const businessCategories = businessConfig?.categories || [];
  const itemCategories = Array.from(new Set(items.map(item => item.category)));
  const categories = ['all', ...businessCategories, ...itemCategories.filter(cat => !businessCategories.includes(cat))];

  const TrainingTooltip = ({ children, content }: { children: React.ReactNode; content: string }) => {
    if (!trainingMode) return <>{children}</>;
    
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {children}
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">{content}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 space-y-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          onClick={() => onNavigate('dashboard')}
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <h1>📋 {businessConfig?.terminology?.items || 'Items'} Inventory</h1>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder={`Search ${businessConfig?.terminology?.items?.toLowerCase() || 'items'}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Items Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredItems.length} of {items.length} items
      </div>

      {/* Item Cards */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              {items.length === 0 ? (
                <div>
                  <p>No items in inventory yet</p>
                  <Button 
                    onClick={() => onNavigate('add-item')}
                    className="mt-3"
                    size="sm"
                  >
                    Add Your First Item
                  </Button>
                </div>
              ) : (
                <p>No items match your search</p>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredItems.map(item => {
            const isLowStock = item.quantity <= item.lowStockThreshold;
            
            return (
              <TrainingTooltip 
                key={item.id}
                content="Red dot means low stock. Tap to edit or view details."
              >
                <Card 
                  className="cursor-pointer hover:bg-accent transition-all duration-200 shadow-md hover:shadow-lg"
                  onClick={() => onEditItem(item)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="truncate">{item.name}</h3>
                          {isLowStock && (
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-destructive rounded-full"></div>
                              <AlertTriangle className="w-4 h-4 text-destructive" />
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`${isLowStock ? 'text-destructive font-medium' : 'text-primary'}`}>
                              {item.quantity} {item.unit}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {item.category}
                            </Badge>
                          </div>
                          
                          <div className="text-xs text-muted-foreground">
                            Updated: {new Date(item.lastUpdated).toLocaleDateString()}
                          </div>
                          
                          {item.supplier && (
                            <div className="text-xs text-muted-foreground">
                              Supplier: {item.supplier}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right text-xs text-muted-foreground">
                        <div>Low at: {item.lowStockThreshold}</div>
                        {item.expiryDate && (
                          <div>Expires: {new Date(item.expiryDate).toLocaleDateString()}</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TrainingTooltip>
            );
          })
        )}
      </div>

      {/* Add Item Button */}
      <div className="pt-4">
        <Button 
          onClick={() => onNavigate('add-item')}
          className="w-full"
          variant="outline"
        >
          ➕ Add New {businessConfig?.terminology?.items?.slice(0, -1) || 'Item'}
        </Button>
      </div>
      </div>
    </div>
  );
}