import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { ArrowLeft } from 'lucide-react';
import { InventoryItem, UsageLog, AppScreen } from '../App';

interface LogUsageProps {
  items: InventoryItem[];
  onLogUsage: (log: Omit<UsageLog, 'id'>) => void;
  onNavigate: (screen: AppScreen) => void;
  trainingMode: boolean;
}

export function LogUsage({ items, onLogUsage, onNavigate, trainingMode }: LogUsageProps) {
  const [formData, setFormData] = useState({
    action: 'Used' as 'Used' | 'Received',
    itemId: '',
    quantity: 0,
    notes: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.itemId) {
      newErrors.itemId = 'Please select an item';
    }

    if (formData.quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }

    const selectedItem = items.find(item => item.id === formData.itemId);
    if (selectedItem && formData.action === 'Used' && formData.quantity > selectedItem.quantity) {
      newErrors.quantity = `Cannot use more than available (${selectedItem.quantity} ${selectedItem.unit})`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const selectedItem = items.find(item => item.id === formData.itemId);
    if (!selectedItem) return;

    onLogUsage({
      itemId: formData.itemId,
      itemName: selectedItem.name,
      action: formData.action,
      quantity: formData.quantity,
      notes: formData.notes || undefined,
      date: new Date().toISOString(),
    });

    // Reset form
    setFormData({
      action: 'Used',
      itemId: '',
      quantity: 0,
      notes: '',
      date: new Date().toISOString().split('T')[0],
    });

    // Navigate back to dashboard
    onNavigate('dashboard');
  };

  const updateField = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const selectedItem = items.find(item => item.id === formData.itemId);

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
    <div className="p-4 space-y-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          onClick={() => onNavigate('dashboard')}
          variant="ghost"
          size="sm"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1>📆 Log Inventory Action</h1>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Record Usage or Receipt</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Action Toggle */}
            <div className="space-y-2">
              <Label>Action Type *</Label>
              <TrainingTooltip content="Choose 'Used' to reduce inventory, 'Received' to add to inventory">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant={formData.action === 'Used' ? 'default' : 'outline'}
                    onClick={() => updateField('action', 'Used')}
                    className="w-full"
                  >
                    Used
                  </Button>
                  <Button
                    type="button"
                    variant={formData.action === 'Received' ? 'default' : 'outline'}
                    onClick={() => updateField('action', 'Received')}
                    className="w-full"
                  >
                    Received
                  </Button>
                </div>
              </TrainingTooltip>
            </div>

            {/* Item Selection */}
            <div className="space-y-2">
              <Label>Item Name *</Label>
              <Select value={formData.itemId} onValueChange={(value) => updateField('itemId', value)}>
                <SelectTrigger className={errors.itemId ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select an item..." />
                </SelectTrigger>
                <SelectContent>
                  {items.map(item => (
                    <SelectItem key={item.id} value={item.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{item.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          {item.quantity} {item.unit}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.itemId && (
                <p className="text-sm text-destructive">{errors.itemId}</p>
              )}
            </div>

            {/* Current Stock Info */}
            {selectedItem && (
              <div className="p-3 bg-muted rounded-md">
                <div className="text-sm">
                  <strong>Current Stock:</strong> {selectedItem.quantity} {selectedItem.unit}
                </div>
                {formData.action === 'Used' && (
                  <div className="text-sm text-muted-foreground">
                    After usage: {Math.max(0, selectedItem.quantity - formData.quantity)} {selectedItem.unit}
                  </div>
                )}
                {formData.action === 'Received' && (
                  <div className="text-sm text-muted-foreground">
                    After receipt: {selectedItem.quantity + formData.quantity} {selectedItem.unit}
                  </div>
                )}
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                min="0.1"
                step="0.1"
                placeholder="How much was used/received?"
                value={formData.quantity || ''}
                onChange={(e) => updateField('quantity', parseFloat(e.target.value) || 0)}
                className={errors.quantity ? 'border-destructive' : ''}
              />
              {errors.quantity && (
                <p className="text-sm text-destructive">{errors.quantity}</p>
              )}
              {selectedItem && (
                <p className="text-sm text-muted-foreground">Unit: {selectedItem.unit}</p>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Additional details..."
                value={formData.notes}
                onChange={(e) => updateField('notes', e.target.value)}
                rows={3}
              />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => updateField('date', e.target.value)}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onNavigate('dashboard')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={items.length === 0}
              >
                ✅ Log Entry
              </Button>
            </div>
          </form>

          {items.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              <p>No items in inventory to log usage for.</p>
              <Button 
                onClick={() => onNavigate('add-item')}
                className="mt-2"
                size="sm"
              >
                Add Items First
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}