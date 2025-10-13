import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ArrowLeft, Camera, QrCode, Mic, MicOff, Search, Zap } from 'lucide-react';
import { Volume2 } from '@/lib/icons';
import type { RouteKey as AppScreen } from '../types/navigation';
import type { MTInventoryItem as InventoryItem } from '../types/inventory';
import VoiceControl from './VoiceControl';

interface ScannerProps {
  items?: InventoryItem[];
  onNavigate?: (screen: AppScreen) => void;
  onItemFound?: (item: InventoryItem) => void;
  // Modal props
  isOpen?: boolean;
  onClose?: () => void;
  onScanResult?: (result: string) => void;
  onActiveChange?: (isActive: boolean) => void;
}

export function Scanner({ 
  items = [], 
  onNavigate, 
  onItemFound, 
  // Modal props
  isOpen = false,
  onClose,
  onScanResult,
  onActiveChange
}: ScannerProps) {
  const [activeMode, setActiveMode] = useState<'qr' | 'barcode' | 'photo' | 'voice'>('qr');
  const [voiceText, setVoiceText] = useState('');
  const [searchResults, setSearchResults] = useState<InventoryItem[]>([]);
  const [scanResult, setScanResult] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mock scanner functions (in real implementation, these would use actual APIs)
  const startQRScanner = () => {
    setScanResult('');
    // Mock QR scan result after 2 seconds
    setTimeout(() => {
      setScanResult('QR_SALMON_001');
      const foundItem = items.find(item => item.qrCode === 'QR_SALMON_001' || item.name.toLowerCase().includes('salmon'));
      if (foundItem) {
        onItemFound?.(foundItem);
      }
    }, 2000);
  };

  const startBarcodeScanner = () => {
    setScanResult('');
    // Mock barcode scan result
    setTimeout(() => {
      setScanResult('1234567890123');
      const foundItem = items.find(item => item.barcode === '1234567890123' || item.name.toLowerCase().includes('tomato'));
      if (foundItem) {
        onItemFound?.(foundItem);
      }
    }, 2000);
  };

  const startPhotoRecognition = () => {
    setScanResult('Photo analyzing...');
    // Mock photo recognition
    setTimeout(() => {
      setScanResult('Detected: 3 boxes, 2 bags, 1 container');
      setSearchResults(items.slice(0, 3));
    }, 3000);
  };

  // Voice command handler
  const handleVoiceCommand = (command: string, confidence: number) => {
    setVoiceText(command);
    
    // Parse voice command and find relevant items
    const searchTerm = command.toLowerCase();
    
    // Enhanced command parsing
    let results: InventoryItem[] = [];
    
      if (searchTerm.includes('find') || searchTerm.includes('show')) {
      // Search commands
      results = items.filter(item => 
        searchTerm.includes(item.name.toLowerCase()) || 
        searchTerm.includes((item.category ?? '').toLowerCase())
      );
    } else if (searchTerm.includes('add') || searchTerm.includes('log')) {
      // Add/Log commands - show relevant items
      const keywords = searchTerm.split(' ');
      results = items.filter(item => 
        keywords.some(keyword => 
          item.name.toLowerCase().includes(keyword) || 
          (item.category ?? '').toLowerCase().includes(keyword)
        )
      );
    } else if (searchTerm.includes('stock') || searchTerm.includes('level')) {
      // Stock level commands - show low stock items
      results = items.filter(item => (item.quantity ?? 0) <= (item.lowStockThreshold ?? 0));
    } else {
      // General search
      results = items.filter(item => 
        searchTerm.includes(item.name.toLowerCase()) || 
        searchTerm.includes((item.category ?? '').toLowerCase())
      );
    }
    
    setSearchResults(results);
    
    // Provide voice feedback
    if (results.length > 0) {
      speakText(`Found ${results.length} items matching your request`);
    } else {
      speakText('No items found matching your command');
    }
  };

  const handleVoiceTranscript = (transcript: string, isFinal: boolean) => {
    if (!isFinal) {
      setVoiceText(`Hearing: ${transcript}...`);
    }
  };

  const speakText = (text: string) => {
    // Mock text-to-speech
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          onClick={() => onNavigate?.('dashboard')}
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <h1 className="flex items-center gap-2">
          <Zap className="w-6 h-6" />
          🚀 AI Smart Scanner
        </h1>
      </div>

      {/* Scanner Mode Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Scanning Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              variant={activeMode === 'qr' ? 'default' : 'outline'}
              onClick={() => setActiveMode('qr')}
              className="h-20 flex-col gap-2"
            >
              <QrCode className="w-6 h-6" />
              QR Code
            </Button>
            <Button
              variant={activeMode === 'barcode' ? 'default' : 'outline'}
              onClick={() => setActiveMode('barcode')}
              className="h-20 flex-col gap-2"
            >
              <div className="w-6 h-6 border-2 border-current"></div>
              Barcode
            </Button>
            <Button
              variant={activeMode === 'photo' ? 'default' : 'outline'}
              onClick={() => setActiveMode('photo')}
              className="h-20 flex-col gap-2"
            >
              <Camera className="w-6 h-6" />
              Photo AI
            </Button>
            <Button
              variant={activeMode === 'voice' ? 'default' : 'outline'}
              onClick={() => setActiveMode('voice')}
              className="h-20 flex-col gap-2"
            >
              <Mic className="w-6 h-6" />
              Voice AI
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Scanner Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {activeMode === 'qr' && <QrCode className="w-5 h-5" />}
            {activeMode === 'barcode' && <div className="w-5 h-5 border border-current"></div>}
            {activeMode === 'photo' && <Camera className="w-5 h-5" />}
            {activeMode === 'voice' && <Mic className="w-5 h-5" />}
            {activeMode === 'qr' && 'QR Code Scanner'}
            {activeMode === 'barcode' && 'Barcode Scanner'}
            {activeMode === 'photo' && 'Photo Recognition'}
            {activeMode === 'voice' && 'Voice Commands'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* QR Code Scanner */}
          {activeMode === 'qr' && (
            <div className="space-y-4">
              <div className="aspect-square max-w-sm mx-auto bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed">
                <div className="text-center text-muted-foreground">
                  <QrCode className="w-16 h-16 mx-auto mb-2" />
                  <p>Point camera at QR code</p>
                </div>
              </div>
              <div className="text-center space-y-2">
                <Button onClick={startQRScanner} className="w-full">
                  Start QR Scanner
                </Button>
                {scanResult && (
                  <div className="p-2 bg-green-100 text-green-800 rounded">
                    Scanned: {scanResult}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Barcode Scanner */}
          {activeMode === 'barcode' && (
            <div className="space-y-4">
              <div className="aspect-video max-w-sm mx-auto bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed">
                <div className="text-center text-muted-foreground">
                  <div className="w-16 h-8 border-2 border-current mx-auto mb-2"></div>
                  <p>Align barcode in viewfinder</p>
                </div>
              </div>
              <div className="text-center space-y-2">
                <Button onClick={startBarcodeScanner} className="w-full">
                  Start Barcode Scanner
                </Button>
                {scanResult && (
                  <div className="p-2 bg-green-100 text-green-800 rounded">
                    Scanned: {scanResult}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Photo Recognition */}
          {activeMode === 'photo' && (
            <div className="space-y-4">
              <div className="aspect-video max-w-sm mx-auto bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed">
                <div className="text-center text-muted-foreground">
                  <Camera className="w-16 h-16 mx-auto mb-2" />
                  <p>Take photo of inventory</p>
                </div>
              </div>
              <div className="text-center space-y-2">
                <Button onClick={startPhotoRecognition} className="w-full">
                  Capture & Analyze Photo
                </Button>
                {scanResult && (
                  <div className="p-2 bg-blue-100 text-blue-800 rounded">
                    {scanResult}
                  </div>
                )}
              </div>
              <div className="p-3 bg-yellow-50 rounded text-sm text-yellow-800">
                <strong>Photo Tips:</strong> Ensure good lighting, separate items clearly, and keep camera steady for best AI recognition.
              </div>
            </div>
          )}

          {/* Voice Commands */}
          {activeMode === 'voice' && (
            <div className="space-y-4">
              {/* Real Voice Control Component */}
              <VoiceControl
                onCommand={handleVoiceCommand}
                onTranscript={handleVoiceTranscript}
                commands={[
                  "Find atlantic salmon",
                  "Show me seafood items",
                  "Check stock levels",
                  "Add 10 pounds tomatoes",
                  "Log 5 boxes salmon used"
                ]}
                isEnabled={true}
                language="en-US"
              />
              
              {voiceText && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm text-blue-600 font-medium mb-1">Command Result:</div>
                  <div className="text-blue-800">"{voiceText}"</div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => speakText(`Command result: ${voiceText}`)}
                    className="mt-2"
                  >
                    <Volume2 className="w-4 h-4 mr-1" />
                    Repeat
                  </Button>
                </div>
              )}

              <div className="p-3 bg-green-50 rounded text-sm text-green-800">
                <strong>🎤 Advanced Voice Commands:</strong><br />
                • "Find [item name]" - Search for specific items<br />
                • "Show me [category]" - Display category items<br />
                • "Check stock levels" - Show low stock alerts<br />
                • "Add [quantity] [item]" - Quick add to inventory<br />
                • "Log [quantity] [item] used" - Record usage
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Found Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {searchResults.map((item) => (
                <div key={item.id} className="p-3 border rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {(item.quantity ?? 0)} {item.unit} • {item.category}
                      {(item.quantity ?? 0) <= (item.lowStockThreshold ?? 0) && (
                        <Badge variant="destructive" className="ml-2">Low Stock</Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={() => onItemFound?.(item)}
                    size="sm"
                  >
                    Select
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scanner Features Info */}
      <Card>
        <CardHeader>
          <CardTitle>🚀 Scanner Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded">
                <h4 className="font-medium text-blue-800">QR & Barcode Scanning</h4>
                <p className="text-sm text-blue-600">Instant item identification with 99.9% accuracy</p>
              </div>
              <div className="p-3 bg-green-50 rounded">
                <h4 className="font-medium text-green-800">AI Photo Recognition</h4>
                <p className="text-sm text-green-600">Count multiple items simultaneously with computer vision</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-purple-50 rounded">
                <h4 className="font-medium text-purple-800">Voice AI Commands</h4>
                <p className="text-sm text-purple-600">Hands-free operation with natural language processing</p>
              </div>
              <div className="p-3 bg-orange-50 rounded">
                <h4 className="font-medium text-orange-800">Smart Integration</h4>
                <p className="text-sm text-orange-600">Automatically updates inventory and learns patterns</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Button onClick={() => onNavigate?.('dashboard')} variant="outline">
          🏠 Back to Dashboard
        </Button>
        <Button onClick={() => onNavigate?.('inventory')} variant="outline">
          📋 View Inventory
        </Button>
        <Button onClick={() => onNavigate?.('log-usage')} variant="outline">
          📝 Log Usage
        </Button>
      </div>
    </div>
  );
}