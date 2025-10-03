/**
 * MaycoleTracker™ vol. XI - Enterprise Edition
 * Camera & Scanner System - Professional Implementation
 */

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Camera, QrCode, Scan, ArrowLeft, CheckCircle, AlertCircle, Upload, Download } from 'lucide-react';
import UniversalBackButton from './UniversalBackButton';

const CameraScanner = () => {
  const navigate = useNavigate();
  const [cameraActive, setCameraActive] = useState(false);
  const [scannerActive, setScannerActive] = useState(false);
  const [lastScanned, setLastScanned] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activateCamera = async () => {
    try {
      console.log('Camera activated');
      setCameraActive(true);
      
      // Request camera permission and start video stream
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Use rear camera on mobile
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('Camera access denied or not available:', error);
      setCameraActive(false);
    }
  };

  const deactivateCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const activateScanner = () => {
    console.log('Scanner activated');
    setScannerActive(true);
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setLastScanned('INVENTORY-ITEM-12345');
      setIsScanning(false);
    }, 2000);
  };

  const uploadImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Image uploaded for scanning:', file.name);
      setIsScanning(true);
      
      // Simulate processing uploaded image
      setTimeout(() => {
        setLastScanned(`SCANNED-${file.name.toUpperCase().replace(/\.[^/.]+$/, "")}`);
        setIsScanning(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Camera className="w-5 h-5" />
                </div>
                <h1 className="text-2xl font-bold">
                  MaycoleTracker<span className="text-xs align-super opacity-75">™</span> Camera & Scanner
                </h1>
              </div>
              <p className="text-blue-100">
                Professional inventory scanning and image capture system
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="btn-on-dark"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Universal Back Button */}
        <UniversalBackButton customBackPath="/logo" showHomeOption={true} />
        
        <div className="space-y-6">
          {/* Camera Section */}
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Live Camera</h2>
                <p className="text-gray-600">Capture inventory images in real-time</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Camera View */}
              {cameraActive && (
                <div className="bg-black rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full h-64 object-cover"
                    autoPlay
                    playsInline
                    muted
                  />
                </div>
              )}

              {/* Camera Controls */}
              <div className="flex gap-3">
                {!cameraActive ? (
                  <Button onClick={activateCamera} className="bg-green-600 hover:bg-green-700">
                    <Camera className="w-4 h-4 mr-2" />
                    Activate Camera
                  </Button>
                ) : (
                  <Button onClick={deactivateCamera} variant="outline">
                    <Camera className="w-4 h-4 mr-2" />
                    Stop Camera
                  </Button>
                )}
                
                <Button onClick={uploadImage} variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </Card>

          {/* Scanner Section */}
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <QrCode className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Barcode & QR Scanner</h2>
                <p className="text-gray-600">Scan product codes and inventory labels</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Scanner Status */}
              {scannerActive && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    {isScanning ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                        <span className="text-purple-700 font-medium">Scanning...</span>
                      </>
                    ) : lastScanned ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-green-700 font-medium">Scanned: {lastScanned}</span>
                      </>
                    ) : (
                      <>
                        <Scan className="w-5 h-5 text-purple-600" />
                        <span className="text-purple-700 font-medium">Ready to scan</span>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Scanner Controls */}
              <div className="flex gap-3">
                <Button 
                  onClick={activateScanner} 
                  disabled={isScanning}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Scan className="w-4 h-4 mr-2" />
                  {isScanning ? 'Scanning...' : 'Activate Scanner'}
                </Button>
                
                {lastScanned && (
                  <Button variant="outline" onClick={() => navigate('/dashboard')}>
                    <Download className="w-4 h-4 mr-2" />
                    Add to Inventory
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* Recent Scans */}
          {lastScanned && (
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Recent Scans</h2>
                  <p className="text-gray-600">Successfully scanned items</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <QrCode className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="font-medium">{lastScanned}</div>
                      <div className="text-sm text-gray-500">Just now</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />
                    Process
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="w-6 h-6" />
                <span>Return to Dashboard</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2"
                onClick={() => console.log('Batch scan mode')}
              >
                <Scan className="w-6 h-6" />
                <span>Batch Scan Mode</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2"
                onClick={() => console.log('Export scans')}
              >
                <Download className="w-6 h-6" />
                <span>Export Scans</span>
              </Button>
            </div>
          </Card>

          {/* Instructions */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Scanner Instructions</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Position barcode or QR code within the camera view</li>
                  <li>• Ensure good lighting for best scan results</li>
                  <li>• Hold device steady until scan completes</li>
                  <li>• Use upload option for existing product images</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CameraScanner;