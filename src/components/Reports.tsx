import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Download, TrendingUp, TrendingDown, FileText, Calendar, Package } from 'lucide-react';

interface BusinessConfig {
  businessName?: string;
  industryType?: string;
  primaryColor?: string;
  categories?: string[];
  units?: string[];
}

interface ReportsProps {
  businessConfig?: BusinessConfig | null;
}

export function Reports({ businessConfig }: ReportsProps) {
  // Generate mock data for demonstration
  const mockItems = [
    { id: '1', name: 'Office Supplies', category: 'General', quantity: 150, unit: 'pcs', minThreshold: 50 },
    { id: '2', name: 'Printer Paper', category: 'Office', quantity: 200, unit: 'boxes', minThreshold: 25 },
    { id: '3', name: 'Cleaning Supplies', category: 'Maintenance', quantity: 75, unit: 'units', minThreshold: 20 },
    { id: '4', name: 'Beverages', category: 'Food & Beverage', quantity: 300, unit: 'bottles', minThreshold: 100 },
    { id: '5', name: 'Safety Equipment', category: 'Safety', quantity: 50, unit: 'units', minThreshold: 15 },
  ];

  const mockUsageLogs = [
    { id: '1', itemName: 'Office Supplies', action: 'Used', quantity: 25, date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
    { id: '2', itemName: 'Printer Paper', action: 'Received', quantity: 50, date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
    { id: '3', itemName: 'Cleaning Supplies', action: 'Used', quantity: 10, date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
    { id: '4', itemName: 'Beverages', action: 'Used', quantity: 75, date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
    { id: '5', itemName: 'Safety Equipment', action: 'Received', quantity: 20, date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() },
  ];

  const weeklyData = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const weeklyLogs = mockUsageLogs.filter(log => new Date(log.date) >= weekAgo);
    
    // Group by item
    const itemUsage = new Map<string, {
      name: string;
      totalUsed: number;
      totalReceived: number;
      netChange: number;
    }>();

    weeklyLogs.forEach(log => {
      const existing = itemUsage.get(log.itemName) || {
        name: log.itemName,
        totalUsed: 0,
        totalReceived: 0,
        netChange: 0
      };

      if (log.action === 'Used') {
        existing.totalUsed += log.quantity;
        existing.netChange -= log.quantity;
      } else {
        existing.totalReceived += log.quantity;
        existing.netChange += log.quantity;
      }

      itemUsage.set(log.itemName, existing);
    });

    return Array.from(itemUsage.values()).map(item => ({
      name: item.name,
      used: item.totalUsed,
      received: item.totalReceived,
      netChange: item.netChange
    }));
  }, []);

  const lowStockItems = mockItems.filter(item => item.quantity <= item.minThreshold);

  const generateExcelReport = () => {
    try {
      // Create CSV content (compatible with Excel)
      const headers = ['Item Name', 'Category', 'Current Stock', 'Unit', 'Min Threshold', 'Status'];
      const csvContent = [
        headers.join(','),
        ...mockItems.map(item => [
          `"${item.name}"`,
          `"${item.category}"`,
          item.quantity,
          `"${item.unit}"`,
          item.minThreshold,
          `"${item.quantity <= item.minThreshold ? 'Low Stock' : 'Normal'}"`
        ].join(','))
      ].join('\n');

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${businessConfig?.businessName || 'MaycoleTracker'}_Inventory_Report_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating Excel report:', error);
      alert('Failed to generate Excel report. Please try again.');
    }
  };

  const generatePDFReport = () => {
    try {
      // Create HTML content for PDF
      const reportDate = new Date().toLocaleDateString();
      const businessName = businessConfig?.businessName || 'MaycoleTracker™ Business';
      
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>${businessName} - Inventory Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #3b82f6; padding-bottom: 20px; }
            .logo { font-size: 24px; font-weight: bold; color: #3b82f6; margin-bottom: 10px; }
            .subtitle { color: #666; font-size: 14px; }
            .section { margin: 30px 0; }
            .section-title { font-size: 18px; font-weight: bold; color: #333; margin-bottom: 15px; border-left: 4px solid #3b82f6; padding-left: 10px; }
            table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
            th { background-color: #f8f9fa; font-weight: bold; }
            .low-stock { background-color: #fee2e2; color: #dc2626; }
            .normal-stock { background-color: #f0fdf4; color: #16a34a; }
            .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
            .stat-card { border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px; text-align: center; }
            .stat-number { font-size: 24px; font-weight: bold; color: #3b82f6; }
            .stat-label { color: #666; font-size: 14px; margin-top: 5px; }
            .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">MaycoleTracker™ Inventory Report</div>
            <div class="subtitle">${businessName}</div>
            <div class="subtitle">Industry: ${businessConfig?.industryType || 'General'} | Generated: ${reportDate}</div>
          </div>

          <div class="section">
            <div class="section-title">📊 Summary Statistics</div>
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-number">${mockItems.length}</div>
                <div class="stat-label">Total Items</div>
              </div>
              <div class="stat-card">
                <div class="stat-number" style="color: #dc2626;">${lowStockItems.length}</div>
                <div class="stat-label">Low Stock Items</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">${new Set(mockItems.map(item => item.category)).size}</div>
                <div class="stat-label">Categories</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">${weeklyData.reduce((sum, item) => sum + item.used, 0)}</div>
                <div class="stat-label">Weekly Usage</div>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">📦 Current Inventory</div>
            <table>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Current Stock</th>
                  <th>Unit</th>
                  <th>Min Threshold</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${mockItems.map(item => `
                  <tr class="${item.quantity <= item.minThreshold ? 'low-stock' : 'normal-stock'}">
                    <td>${item.name}</td>
                    <td>${item.category}</td>
                    <td>${item.quantity}</td>
                    <td>${item.unit}</td>
                    <td>${item.minThreshold}</td>
                    <td>${item.quantity <= item.minThreshold ? '⚠️ Low Stock' : '✅ Normal'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          ${lowStockItems.length > 0 ? `
          <div class="section">
            <div class="section-title">⚠️ Low Stock Alerts</div>
            <table>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Current Stock</th>
                  <th>Minimum Required</th>
                  <th>Shortage</th>
                </tr>
              </thead>
              <tbody>
                ${lowStockItems.map(item => `
                  <tr class="low-stock">
                    <td>${item.name}</td>
                    <td>${item.category}</td>
                    <td>${item.quantity} ${item.unit}</td>
                    <td>${item.minThreshold} ${item.unit}</td>
                    <td>${item.minThreshold - item.quantity} ${item.unit}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          ` : ''}

          <div class="section">
            <div class="section-title">📈 Recent Activity</div>
            <table>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Action</th>
                  <th>Quantity</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                ${mockUsageLogs.map(log => `
                  <tr>
                    <td>${log.itemName}</td>
                    <td style="color: ${log.action === 'Used' ? '#dc2626' : '#16a34a'};">${log.action}</td>
                    <td>${log.quantity}</td>
                    <td>${new Date(log.date).toLocaleDateString()}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="footer">
            <p>Generated by MaycoleTracker™ Inventory Management System v6</p>
            <p>Report Date: ${reportDate} | Business: ${businessName}</p>
          </div>
        </body>
        </html>
      `;

      // Create and download HTML file (can be opened and printed as PDF)
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${businessConfig?.businessName || 'MaycoleTracker'}_Inventory_Report_${new Date().toISOString().split('T')[0]}.html`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Show instructions for PDF conversion
      setTimeout(() => {
        alert('HTML report downloaded! To convert to PDF:\n\n1. Open the downloaded HTML file in your browser\n2. Press Ctrl+P (or Cmd+P on Mac)\n3. Select "Save as PDF" as the destination\n4. Click Save\n\nYour professional PDF report will be ready!');
      }, 500);
    } catch (error) {
      console.error('Error generating PDF report:', error);
      alert('Failed to generate PDF report. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            📊 {businessConfig?.businessName || 'Business'} Reports
          </h1>
          <p className="text-muted-foreground">
            Inventory analysis and usage reports for {businessConfig?.industryType || 'your business'}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={generateExcelReport} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Excel Report
          </Button>
          <Button onClick={generatePDFReport} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            PDF Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockItems.length}</div>
            <p className="text-xs text-muted-foreground">
              Across {new Set(mockItems.map(item => item.category)).size} categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{lowStockItems.length}</div>
            <p className="text-xs text-muted-foreground">
              Need immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Usage</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {weeklyData.reduce((sum, item) => sum + item.used, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Items consumed this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Received</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {weeklyData.reduce((sum, item) => sum + item.received, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Items received this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Usage Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Usage Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="used" fill="#ef4444" name="Used" />
                <Bar dataKey="received" fill="#22c55e" name="Received" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardHeader>
            <CardTitle className="text-red-800 dark:text-red-200 flex items-center gap-2">
              <TrendingDown className="w-5 h-5" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowStockItems.map(item => (
                <div key={item.id} className="flex justify-between items-center p-2 bg-white dark:bg-red-900/10 rounded border">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-muted-foreground ml-2">({item.category})</span>
                  </div>
                  <Badge variant="destructive">
                    {item.quantity} {item.unit} (Min: {item.minThreshold})
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsageLogs.slice(0, 10).map(log => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.itemName}</TableCell>
                  <TableCell>
                    <Badge variant={log.action === 'Used' ? 'destructive' : 'default'}>
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.quantity}</TableCell>
                  <TableCell>{new Date(log.date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default Reports;