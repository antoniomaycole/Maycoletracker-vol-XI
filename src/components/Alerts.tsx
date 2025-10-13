import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ArrowLeft, AlertTriangle, Package } from 'lucide-react';
import type { MTInventoryItem as InventoryItem } from '../types/inventory';
import type { AppScreen } from '../types/navigation';

interface AlertsProps {
  lowStockItems: InventoryItem[];
  onRestock: (itemId: string, quantity: number) => void;
  onNavigate: (screen: AppScreen) => void;
}

export function Alerts({ lowStockItems, onRestock, onNavigate }: AlertsProps) {
  const [restockDialogOpen, setRestockDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [restockQuantity, setRestockQuantity] = useState(0);

  const handleRestock = (item: InventoryItem) => {
    setSelectedItem(item);
    setRestockQuantity((item.lowStockThreshold ?? 1) * 2); // Suggest double the threshold
    setRestockDialogOpen(true);
  };

  const confirmRestock = () => {
    if (selectedItem && restockQuantity > 0) {
      onRestock(selectedItem.id, restockQuantity);
      setRestockDialogOpen(false);
      setSelectedItem(null);
      setRestockQuantity(0);
    }
  };

  const getSuggestedReorderAmount = (item: InventoryItem) => {
    const thresh = item.lowStockThreshold ?? 1;
    return Math.max(thresh * 2, thresh + 5);
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
        <h1>🔔 MaycoleTraker Alerts</h1>
      </div>

      {/* Alert Summary */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-destructive/10 rounded-full">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <div className="text-sm font-medium">
                {lowStockItems.length} {lowStockItems.length === 1 ? 'item needs' : 'items need'} attention
              </div>
              <div className="text-xs text-muted-foreground">
                Items below their minimum stock levels
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Low Stock Items */}
      <div className="space-y-3">
        {lowStockItems.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="mb-2">All Good!</h3>
              <p className="text-muted-foreground text-sm">
                No items are currently below their low stock thresholds.
              </p>
              <Button 
                onClick={() => onNavigate('inventory')}
                className="mt-4"
                variant="outline"
              >
                View Inventory
              </Button>
            </CardContent>
          </Card>
        ) : (
          lowStockItems.map(item => (
            <Card key={item.id} className="border-destructive/20">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Item Info */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-destructive rounded-full"></div>
                        <h3>{item.name}</h3>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Category: {item.category}
                      </div>
                      {item.supplier && (
                        <div className="text-sm text-muted-foreground">
                          Supplier: {item.supplier}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stock Info */}
                  <div className="bg-muted/50 p-3 rounded-md">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Current Stock</div>
                          <div className="text-destructive font-medium">
                            {(item.quantity ?? 0)} {item.unit}
                          </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Minimum Level</div>
                        <div>{(item.lowStockThreshold ?? 0)} {item.unit}</div>
                      </div>
                    </div>
                  </div>

                  {/* Suggested Reorder */}
                  <div className="p-3 bg-primary/5 rounded-md">
                    <div className="text-sm text-muted-foreground mb-1">
                      Suggested Reorder Amount
                    </div>
                    <div className="text-primary font-medium">
                      {getSuggestedReorderAmount(item)} {item.unit}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleRestock(item)}
                      className="flex-1 gap-2"
                      size="sm"
                    >
                      <Package className="w-4 h-4" />
                      Restock
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="px-3"
                      onClick={() => {
                        // Mark as ordered (in a real app, this might update a status)
                        // For now, we'll just show a success message
                        alert(`${item.name} marked as ordered`);
                      }}
                    >
                      Mark as Ordered
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Quick Actions */}
      {lowStockItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              onClick={() => onNavigate('add-item')}
              variant="outline"
              className="w-full justify-start gap-2"
            >
              <Package className="w-4 h-4" />
              Add New Items
            </Button>
            <Button
              onClick={() => onNavigate('log-usage')}
              variant="outline"
              className="w-full justify-start gap-2"
            >
              📦 Log New Delivery
            </Button>
            <Button
              onClick={() => onNavigate('reports')}
              variant="outline"
              className="w-full justify-start gap-2"
            >
              📊 View Usage Reports
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Restock Dialog */}
      <Dialog open={restockDialogOpen} onOpenChange={setRestockDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restock Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedItem && (
              <>
                <div>
                  <h4 className="font-medium">{selectedItem.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Current: {selectedItem.quantity} {selectedItem.unit}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quantity to Add</label>
                  <Input
                    type="number"
                    min="1"
                    value={restockQuantity}
                    onChange={(e) => setRestockQuantity(parseInt(e.target.value) || 0)}
                    placeholder="Enter quantity"
                  />
                  <p className="text-xs text-muted-foreground">
                    New total: {(selectedItem.quantity ?? 0) + restockQuantity} {selectedItem.unit}
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setRestockDialogOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={confirmRestock}
                    disabled={restockQuantity <= 0}
                    className="flex-1"
                  >
                    Add Stock
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}