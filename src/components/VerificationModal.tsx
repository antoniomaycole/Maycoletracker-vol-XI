import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { QrCode, Camera, CheckCircle, UserCheck } from 'lucide-react';
import { Scanner } from './Scanner';

interface VerificationModalProps {
  open: boolean;
  onClose: () => void;
  onVerified: (result?: { scan?: string; face?: string }) => void;
  expectedScan?: string | null; // optional expected QR/barcode to match
  items?: any[];
}

export default function VerificationModal({ open, onClose, onVerified, expectedScan = null, items }: VerificationModalProps) {
  const [scanPassed, setScanPassed] = useState(false);
  const [facePassed, setFacePassed] = useState(false);
  const [scanValue, setScanValue] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Opt-out hook: if app provides global config to skip verification
  const skipVerification = (window as any)?.MAYCOLE_CONFIG?.skipVerification === true;

  useEffect(() => {
    if (!open) {
      setScanPassed(false);
      setFacePassed(false);
      setScanValue(null);
    }
  }, [open]);

  // Simple face capture flow (lightweight): expose a start preview and capture button.
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.warn('Camera access blocked or unavailable', err);
    }
  };

  const captureFace = async () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = video.videoWidth || 320;
    canvas.height = video.videoHeight || 240;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');

    // If app provided a verification hook, use it
    const verifier = (window as any).APP_VERIFY_FACE;
    if (typeof verifier === 'function') {
      try {
        const ok = await verifier(dataUrl);
        setFacePassed(Boolean(ok));
        if (ok) {
          setTimeout(() => { /* allow UI settle */ }, 200);
        }
      } catch (e) {
        console.warn('Face verifier threw', e);
        setFacePassed(false);
      }
    } else {
      // No verifier: provide a friendly manual confirm button for local/testing
      // We'll treat capture as a positive if user clicks "Simulate Face Match"
      // expose the captured image to the UI
      (canvasRef.current || (canvasRef.current = canvas)).toDataURL();
      // leave facePassed false until user simulates
    }
  };

  // Manual mode: fallback when face recognition is unavailable or fails
  const [manualMode, setManualMode] = useState(false);
  const [operatorName, setOperatorName] = useState('');
  const [operatorPin, setOperatorPin] = useState('');

  const handleManualConfirm = () => {
    // Simple local check: if operatorName provided, accept manual confirm
    if (!operatorName) {
      alert('Enter operator name to confirm');
      return;
    }
    setFacePassed(true);
    // Report manual operator in verification result when confirming
    onVerified && onVerified({ scan: scanValue ?? undefined, face: 'manual:' + operatorName });
    onClose();
  };

  // Called when an item is found via embedded Scanner
  const handleItemFound = (item: any) => {
    const code = item?.qrCode || item?.barcode || item?.id || item?.name || null;
    setScanValue(code);
    // If expectedScan provided, require match
    if (!expectedScan) {
      setScanPassed(true);
    } else if (code && expectedScan && code.toString().toLowerCase().includes(expectedScan.toLowerCase())) {
      setScanPassed(true);
    } else {
      setScanPassed(false);
    }
  };

  const handleConfirm = () => {
    if (skipVerification) {
      onVerified({ scan: scanValue ?? undefined, face: 'skipped' });
      onClose();
      return;
    }
    if (scanPassed && facePassed) {
      onVerified({ scan: scanValue ?? undefined, face: 'ok' });
      onClose();
      return;
    }
    // If face verifier is not provided, allow manual simulate
    onVerified({ scan: scanValue ?? undefined, face: facePassed ? 'ok' : undefined });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-w-3xl w-full">
        <Card>
          <CardHeader>
            <CardTitle>Verification Required</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold flex items-center gap-2"> <QrCode /> Scan Item</h4>
                <p className="text-sm text-muted-foreground mb-2">Use the scanner to identify the item being added or removed.</p>
                <div className="border rounded p-2">
                  <Scanner items={items || []} onItemFound={(it: any) => handleItemFound(it)} />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant={scanPassed ? 'default' : 'outline'}>Scan {scanPassed ? 'OK' : 'Pending'}</Badge>
                  {scanValue && <div className="text-sm text-muted-foreground">{scanValue}</div>}
                </div>
              </div>

              <div>
                <h4 className="font-semibold flex items-center gap-2"> <Camera /> Face Verification</h4>
                <p className="text-sm text-muted-foreground mb-2">Capture a quick selfie for identity verification. App may provide a server-side verifier.</p>
                <div className="border rounded p-2 flex flex-col gap-2">
                  <video ref={videoRef} className="w-full rounded bg-black" autoPlay playsInline muted onCanPlay={() => { /* ready */ }} />
                  <canvas ref={canvasRef} style={{ display: 'none' }} />
                  <div className="flex gap-2">
                    <Button onClick={startCamera} size="sm">Start Camera</Button>
                    <Button onClick={captureFace} size="sm">Capture</Button>
                    <Button onClick={() => setFacePassed(true)} variant="outline" size="sm">Simulate Face Match</Button>
                  </div>
                  <div className="mt-2">
                    <Badge variant={facePassed ? 'default' : 'outline'}>Face {facePassed ? 'OK' : 'Pending'}</Badge>
                  </div>

                  <div className="mt-3 border-t pt-3">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={manualMode} onChange={(e) => setManualMode(e.target.checked)} />
                      Manual mode (use when face recognition unavailable)
                    </label>
                    {manualMode && (
                      <div className="mt-2 space-y-2">
                        <input value={operatorName} onChange={(e) => setOperatorName(e.target.value)} placeholder="Operator name" className="w-full p-2 border rounded" />
                        <input value={operatorPin} onChange={(e) => setOperatorPin(e.target.value)} placeholder="PIN (optional)" className="w-full p-2 border rounded" />
                        <div className="flex gap-2">
                          <Button onClick={handleManualConfirm}>Confirm Manually</Button>
                          <Button variant="outline" onClick={() => { setManualMode(false); setOperatorName(''); setOperatorPin(''); }}>Cancel</Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end gap-2">
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
              <Button onClick={handleConfirm} disabled={!skipVerification && !(scanPassed && facePassed)}>Confirm</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
