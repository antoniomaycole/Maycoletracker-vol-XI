import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { QrCode, Camera, Scan, Package, Home, CheckCircle, AlertCircle, ArrowLeft, BarChart3, Brain } from 'lucide-react';

export default function ScannerPage() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanned, setLastScanned] = useState<string | null>(null);

  const handleStartScan = () => {
    setIsScanning(true);
    // Simulate scanning after 2 seconds
    setTimeout(() => {
      setIsScanning(false);
      setLastScanned('SKU-2024-001234');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6">
      {/* Navigation Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              size="sm"
              className="btn-on-dark"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button 
              onClick={() => navigate('/main')}
              variant="outline"
              size="sm"
              className="btn-on-dark"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </div>
          <div className="nav-button-grid">
            <Button 
              onClick={() => navigate('/inventory')}
              variant="outline"
              size="sm"
              className="btn-on-dark"
            >
              <Package className="w-4 h-4 mr-2" />
              <span className="text-xs">Inventory</span>
            </Button>
            <Button 
              onClick={() => navigate('/analytics')}
              variant="outline"
              size="sm"
              className="btn-on-dark"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              <span className="text-xs">Analytics</span>
            </Button>
            <Button 
              onClick={() => navigate('/ai')}
              variant="outline"
              size="sm"
              className="btn-on-dark"
            >
              <Brain className="w-4 h-4 mr-2" />
              <span className="text-xs">AI Insights</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              MAYCOLETracker™ Scanner
            </h1>
            <p className="text-lg opacity-90">
              Volume XI — Enterprise Edition
            </p>
          </div>
        </div>

        {/* Scanner Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Scanner Camera View */}
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Camera className="w-6 h-6 text-blue-400" />
                  <div>
                    <CardTitle className="text-white">Barcode Scanner</CardTitle>
                    <CardDescription className="text-gray-300">
                      Point camera at barcode or QR code
                    </CardDescription>
                  </div>
                </div>
                <Badge className="pro-badge">Pro</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gray-900 rounded-lg p-8 border-2 border-dashed border-gray-600 min-h-[300px] flex items-center justify-center">
                {isScanning ? (
                  <div className="text-center">
                    <Scan className="w-16 h-16 text-blue-400 mx-auto mb-4 animate-pulse" />
                    <p className="text-lg font-semibold">Scanning...</p>
                    <p className="text-sm text-gray-400">Point camera at barcode</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <QrCode className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-gray-400">Camera Ready</p>
                    <p className="text-sm text-gray-500">Click scan to begin</p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex gap-4">
                <Button 
                  onClick={handleStartScan}
                  disabled={isScanning}
                  className="btn-primary flex-1"
                >
                  <Scan className="w-4 h-4 mr-2" />
                  {isScanning ? 'Scanning...' : 'Start Scan'}
                </Button>
                <Button 
                  onClick={() => {
                    setIsScanning(false);
                    setLastScanned(null);
                  }}
                  className="btn-on-dark"
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Scan Results */}
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Package className="w-6 h-6 text-green-400" />
                <div>
                  <CardTitle className="text-white">Scan Results</CardTitle>
                  <CardDescription className="text-gray-300">
                    Last scanned item information
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {lastScanned ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-green-500/20 rounded-lg border border-green-400/30">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <div>
                      <p className="font-semibold text-green-300">Scan Successful</p>
                      <p className="text-sm text-gray-300">Item found in inventory</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">SKU:</span>
                      <span className="font-mono text-white">{lastScanned}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Product:</span>
                      <span className="text-white">Premium Widget Pro</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Stock Level:</span>
                      <span className="text-green-400 font-semibold">47 units</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Location:</span>
                      <span className="text-white">Warehouse A-12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                        In Stock
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-600">
                    <Button className="w-full btn-primary">
                      View Full Details
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">No items scanned yet</p>
                  <p className="text-sm text-gray-500">Scan a barcode to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Scans */}
        <Card className="bg-white/10 border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Recent Scans</CardTitle>
            <CardDescription className="text-gray-300">
              Last 5 scanned items
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { sku: 'SKU-2024-001233', product: 'Widget Standard', time: '2 min ago', status: 'In Stock' },
                { sku: 'SKU-2024-001232', product: 'Widget Deluxe', time: '5 min ago', status: 'Low Stock' },
                { sku: 'SKU-2024-001231', product: 'Widget Basic', time: '8 min ago', status: 'In Stock' },
                { sku: 'SKU-2024-001230', product: 'Widget Premium', time: '12 min ago', status: 'Out of Stock' },
                { sku: 'SKU-2024-001229', product: 'Widget Pro Max', time: '15 min ago', status: 'In Stock' },
              ].map((scan) => (
                <div key={scan.sku} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center gap-3">
                    <QrCode className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-mono text-sm text-white">{scan.sku}</p>
                      <p className="text-sm text-gray-400">{scan.product}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">{scan.time}</p>
                    <Badge 
                      className={`text-xs ${
                        scan.status === 'In Stock' ? 'bg-green-500/20 text-green-300 border-green-400/30' :
                        scan.status === 'Low Stock' ? 'bg-orange-500/20 text-orange-300 border-orange-400/30' :
                        'bg-red-500/20 text-red-300 border-red-400/30'
                      }`}
                    >
                      {scan.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          <Button 
            onClick={() => navigate('/main')}
            className="btn-on-dark"
          >
            Back to Dashboard
          </Button>
          <Button 
            onClick={() => navigate('/inventory')}
            className="btn-on-dark"
          >
            View Inventory
          </Button>
        </div>
      </div>
    </div>
  );
}