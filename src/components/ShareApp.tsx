import React, { useState } from 'react';
import { Share, Copy, Download, QrCode, Mail, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { toast } from 'sonner';

interface ShareAppProps {
  appUrl?: string; // Will be your deployed URL
  onClose?: () => void;
}

export function ShareApp({ appUrl = window.location.origin, onClose }: ShareAppProps) {
  const [copied, setCopied] = useState(false);
  
  const appName = "MaycoleTracker";
  const appDescription = "Universal AI-Powered Inventory Management - Voice control, predictive analytics, and barcode scanning for any business.";
  
  const shareText = `🚀 Check out ${appName}!\n\n${appDescription}\n\n✅ Works offline\n✅ Voice commands\n✅ Barcode scanning\n✅ AI predictions\n✅ Free to start\n\nInstall instantly:`;
  
  const emailSubject = `Amazing inventory app: ${appName}`;
  const emailBody = `Hi!\n\nI found this incredible inventory management app called ${appName} that I think you'd love.\n\n${appDescription}\n\nWhat makes it special:\n✅ Works on any phone/tablet - installs like a regular app\n✅ Voice commands - just say "add 5 boxes of paper"\n✅ Scans barcodes with your camera\n✅ AI predicts when you'll run out\n✅ Works offline - no internet needed\n✅ Free to start!\n\nWorks for ANY business - restaurants, retail, construction, healthcare, you name it.\n\nTry it here: ${appUrl}\n\nJust open the link and tap "Add to Home Screen" when prompted. Takes 2 seconds!\n\nLet me know what you think!`;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const shareViaWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: appName,
          text: shareText,
          url: appUrl,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      copyToClipboard(`${shareText}\n${appUrl}`);
    }
  };

  const openEmailShare = () => {
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoUrl);
  };

  const openWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${appUrl}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  const generateQRCode = () => {
    // Open QR code generator with the app URL
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(appUrl)}`;
    window.open(qrUrl, '_blank');
  };

  const downloadInstaller = () => {
    // Create a blob with the installer HTML
    const installerContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Install MaycoleTracker</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f8f9fa; }
        .installer { max-width: 500px; margin: 50px auto; background: white; border-radius: 15px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; }
        .icon { width: 80px; height: 80px; background: linear-gradient(135deg, #030213, #7c3aed); border-radius: 15px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 40px; }
        h1 { color: #030213; margin: 10px 0; }
        .company { color: #7c3aed; font-size: 14px; margin-bottom: 20px; }
        .description { color: #666; margin: 20px 0; line-height: 1.6; }
        .install-btn { display: block; width: 100%; padding: 15px; background: linear-gradient(135deg, #030213, #7c3aed); color: white; text-decoration: none; border-radius: 10px; font-weight: 600; margin: 20px 0; }
        .features { text-align: left; background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0; }
        .features ul { list-style: none; padding: 0; }
        .features li { padding: 5px 0; color: #444; }
        .features li::before { content: "✅ "; margin-right: 5px; }
    </style>
</head>
<body>
    <div class="installer">
        <div class="icon">📱</div>
        <h1>MaycoleTracker</h1>
        <div class="company">by MaycoleTechnologies™</div>
        <div class="description">${appDescription}</div>
        
        <a href="${appUrl}" class="install-btn">🚀 Install MaycoleTracker</a>
        
        <div class="features">
            <h3>Why You'll Love It:</h3>
            <ul>
                <li>Works offline - no internet needed</li>
                <li>Voice commands - just speak to add items</li>
                <li>Scan barcodes with your camera</li>
                <li>AI predicts when you'll run out</li>
                <li>Professional reports and analytics</li>
                <li>Works for any business type</li>
                <li>Completely free to start</li>
            </ul>
        </div>
        
        <p style="color: #666; font-size: 14px; margin-top: 30px;">
            Shared by a friend • Enterprise-grade software
        </p>
    </div>
</body>
</html>`;

    const blob = new Blob([installerContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Install-MaycoleTracker.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Installer file downloaded! Send this file to your friends.');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share className="w-5 h-5" />
            Share MaycoleTracker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* App URL Display */}
          <div className="space-y-2">
            <label className="text-sm font-medium">App URL:</label>
            <div className="flex gap-2">
              <Input 
                value={appUrl} 
                readOnly 
                className="text-sm"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(appUrl)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Sharing Options */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={shareViaWebShare}
              className="flex items-center gap-2"
            >
              <Share className="w-4 h-4" />
              Quick Share
            </Button>
            
            <Button
              variant="outline"
              onClick={openEmailShare}
              className="flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Email
            </Button>
            
            <Button
              variant="outline"
              onClick={openWhatsAppShare}
              className="flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </Button>
            
            <Button
              variant="outline"
              onClick={generateQRCode}
              className="flex items-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              QR Code
            </Button>
          </div>

          {/* Download Installer */}
          <Button
            onClick={downloadInstaller}
            className="w-full flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Installer File
          </Button>
          
          <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
            <strong>💡 Pro Tip:</strong> The installer file lets friends install your app without clicking links. Just send the downloaded HTML file!
          </div>

          {/* Close Button */}
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full"
          >
            Close
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}