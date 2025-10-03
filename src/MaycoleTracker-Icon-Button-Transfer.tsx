/**
 * MaycoleTracker™ Icon Button - Complete Transfer Code
 * Volume XI - Enterprise Edition
 * WILD Document Box Version with Interactive Features
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Download, Share, ExternalLink } from 'lucide-react';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';

// Main MaycoleTracker™ Icon Component with WILD Document Box
export const MaycoleTrackerIcon = ({ 
  size = 60, 
  interactive = true, 
  showTooltip = true,
  className = "",
  onClick = undefined
}: {
  size?: number;
  interactive?: boolean;
  showTooltip?: boolean;
  className?: string;
  onClick?: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const currentColors = {
    primary: '#1e40af',     // Rich blue
    accent: '#ffffff',      // White document box
    dots: '#1e40af'         // Blue dots
  };

  const iconContent = (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-all duration-300 ${interactive ? 'cursor-pointer hover:scale-105' : ''} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Rich Blue Background Circle */}
      <circle 
        cx="50" 
        cy="50" 
        r="49" 
        fill={currentColors.primary} 
        stroke="none"
      />
      
      {/* Logo-style Cross Pattern */}
      <rect 
        x="20" 
        y="46" 
        width="60" 
        height="8" 
        rx="4" 
        fill={currentColors.accent} 
        opacity="0.98"
      />
      <rect 
        x="46" 
        y="20" 
        width="8" 
        height="60" 
        rx="4" 
        fill={currentColors.accent} 
        opacity="0.98"
      />
      
      {/* Bolder Sporadic Blue Dots Close to Cross */}
      <circle cx="35" cy="14" r="4" fill={currentColors.accent} opacity="0.95"/>
      <circle cx="65" cy="18" r="3.5" fill={currentColors.accent} opacity="0.9"/>
      <circle cx="14" cy="38" r="3.5" fill={currentColors.accent} opacity="0.92"/>
      <circle cx="86" cy="62" r="4" fill={currentColors.accent} opacity="0.95"/>
      <circle cx="35" cy="86" r="3.5" fill={currentColors.accent} opacity="0.9"/>
      <circle cx="65" cy="82" r="3" fill={currentColors.accent} opacity="0.88"/>
      <circle cx="30" cy="35" r="2.5" fill={currentColors.accent} opacity="0.85"/>
      <circle cx="70" cy="32" r="2.8" fill={currentColors.accent} opacity="0.87"/>
      <circle cx="32" cy="68" r="2.2" fill={currentColors.accent} opacity="0.82"/>
      <circle cx="68" cy="65" r="2.6" fill={currentColors.accent} opacity="0.86"/>
      <circle cx="42" cy="28" r="1.8" fill={currentColors.accent} opacity="0.75"/>
      <circle cx="58" cy="25" r="1.5" fill={currentColors.accent} opacity="0.7"/>
      <circle cx="25" cy="58" r="1.8" fill={currentColors.accent} opacity="0.75"/>
      <circle cx="75" cy="55" r="1.6" fill={currentColors.accent} opacity="0.72"/>
      <circle cx="45" cy="72" r="1.4" fill={currentColors.accent} opacity="0.68"/>
      <circle cx="55" cy="75" r="1.7" fill={currentColors.accent} opacity="0.73"/>
      
      {/* WILD Centered Document Box with Bold Lines - MASSIVE! */}
      <rect
        x="35"
        y="32"
        width="30"
        height="36"
        rx="3"
        fill={currentColors.accent}
        opacity="0.98"
        stroke="rgba(30, 64, 175, 0.3)"
        strokeWidth="0.5"
      />
      
      {/* Bold Document Lines - Much More Prominent */}
      <line
        x1="38"
        y1="38"
        x2="62"
        y2="38"
        stroke="#1e40af"
        strokeWidth="1.5"
        opacity="0.9"
      />
      <line
        x1="38"
        y1="43"
        x2="58"
        y2="43"
        stroke="#1e40af"
        strokeWidth="1.5"
        opacity="0.85"
      />
      <line
        x1="38"
        y1="48"
        x2="61"
        y2="48"
        stroke="#1e40af"
        strokeWidth="1.5"
        opacity="0.9"
      />
      <line
        x1="38"
        y1="53"
        x2="56"
        y2="53"
        stroke="#1e40af"
        strokeWidth="1.5"
        opacity="0.8"
      />
      <line
        x1="38"
        y1="58"
        x2="60"
        y2="58"
        stroke="#1e40af"
        strokeWidth="1.5"
        opacity="0.85"
      />
      <line
        x1="38"
        y1="63"
        x2="59"
        y2="63"
        stroke="#1e40af"
        strokeWidth="1.5"
        opacity="0.8"
      />
      
      {/* Premium Rich Blue Highlight */}
      <ellipse 
        cx="35" 
        cy="30" 
        rx="15" 
        ry="10" 
        fill="rgba(30, 64, 175, 0.2)" 
        transform="rotate(-25 35 30)" 
        opacity="0.9"
      />
    </svg>
  );

  if (showTooltip && interactive) {
    return (
      <div className="relative group">
        {iconContent}
        
        {/* Tooltip */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
          MaycoleTracker™ Volume XI
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    );
  }

  return iconContent;
};

// Clean Icon Version for Simple Usage
export const CleanIcon = ({ 
  size = 40, 
  interactive = false, 
  className = "" 
}: {
  size?: number;
  interactive?: boolean;
  className?: string;
}) => {
  return (
    <MaycoleTrackerIcon 
      size={size}
      interactive={interactive}
      showTooltip={false}
      className={`${className} shadow-lg`}
    />
  );
};

// Icon Transfer Component with Copy/Download Features
export const IconTransferComponent = () => {
  const [copied, setCopied] = useState('');

  const iconSVGCode = `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Rich Blue Background Circle -->
  <circle cx="50" cy="50" r="49" fill="#1e40af" stroke="none"/>
  
  <!-- Logo-style Cross Pattern -->
  <rect x="20" y="46" width="60" height="8" rx="4" fill="#ffffff" opacity="0.98"/>
  <rect x="46" y="20" width="8" height="60" rx="4" fill="#ffffff" opacity="0.98"/>
  
  <!-- Sporadic White Dots -->
  <circle cx="35" cy="14" r="4" fill="#ffffff" opacity="0.95"/>
  <circle cx="65" cy="18" r="3.5" fill="#ffffff" opacity="0.9"/>
  <circle cx="14" cy="38" r="3.5" fill="#ffffff" opacity="0.92"/>
  <circle cx="86" cy="62" r="4" fill="#ffffff" opacity="0.95"/>
  <circle cx="35" cy="86" r="3.5" fill="#ffffff" opacity="0.9"/>
  <circle cx="65" cy="82" r="3" fill="#ffffff" opacity="0.88"/>
  <circle cx="30" cy="35" r="2.5" fill="#ffffff" opacity="0.85"/>
  <circle cx="70" cy="32" r="2.8" fill="#ffffff" opacity="0.87"/>
  <circle cx="32" cy="68" r="2.2" fill="#ffffff" opacity="0.82"/>
  <circle cx="68" cy="65" r="2.6" fill="#ffffff" opacity="0.86"/>
  <circle cx="42" cy="28" r="1.8" fill="#ffffff" opacity="0.75"/>
  <circle cx="58" cy="25" r="1.5" fill="#ffffff" opacity="0.7"/>
  <circle cx="25" cy="58" r="1.8" fill="#ffffff" opacity="0.75"/>
  <circle cx="75" cy="55" r="1.6" fill="#ffffff" opacity="0.72"/>
  <circle cx="45" cy="72" r="1.4" fill="#ffffff" opacity="0.68"/>
  <circle cx="55" cy="75" r="1.7" fill="#ffffff" opacity="0.73"/>
  
  <!-- WILD Document Box - MASSIVE! -->
  <rect x="35" y="32" width="30" height="36" rx="3" fill="#ffffff" opacity="0.98" stroke="rgba(30, 64, 175, 0.3)" stroke-width="0.5"/>
  <line x1="38" y1="38" x2="62" y2="38" stroke="#1e40af" stroke-width="1.5" opacity="0.9"/>
  <line x1="38" y1="43" x2="58" y2="43" stroke="#1e40af" stroke-width="1.5" opacity="0.85"/>
  <line x1="38" y1="48" x2="61" y2="48" stroke="#1e40af" stroke-width="1.5" opacity="0.9"/>
  <line x1="38" y1="53" x2="56" y2="53" stroke="#1e40af" stroke-width="1.5" opacity="0.8"/>
  <line x1="38" y1="58" x2="60" y2="58" stroke="#1e40af" stroke-width="1.5" opacity="0.85"/>
  <line x1="38" y1="63" x2="59" y2="63" stroke="#1e40af" stroke-width="1.5" opacity="0.8"/>
  
  <!-- Premium Highlight -->
  <ellipse cx="35" cy="30" rx="15" ry="10" fill="rgba(30, 64, 175, 0.2)" transform="rotate(-25 35 30)" opacity="0.9"/>
</svg>`;

  const reactComponentCode = `import React from 'react';

export const MaycoleTrackerIcon = ({ size = 60, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Rich Blue Background Circle */}
    <circle cx="50" cy="50" r="49" fill="#1e40af" stroke="none"/>
    
    {/* Logo-style Cross Pattern */}
    <rect x="20" y="46" width="60" height="8" rx="4" fill="#ffffff" opacity="0.98"/>
    <rect x="46" y="20" width="8" height="60" rx="4" fill="#ffffff" opacity="0.98"/>
    
    {/* Sporadic White Dots */}
    <circle cx="35" cy="14" r="4" fill="#ffffff" opacity="0.95"/>
    <circle cx="65" cy="18" r="3.5" fill="#ffffff" opacity="0.9"/>
    <circle cx="14" cy="38" r="3.5" fill="#ffffff" opacity="0.92"/>
    <circle cx="86" cy="62" r="4" fill="#ffffff" opacity="0.95"/>
    <circle cx="35" cy="86" r="3.5" fill="#ffffff" opacity="0.9"/>
    <circle cx="65" cy="82" r="3" fill="#ffffff" opacity="0.88"/>
    
    {/* WILD Document Box - MASSIVE! */}
    <rect x="35" y="32" width="30" height="36" rx="3" fill="#ffffff" opacity="0.98" stroke="rgba(30, 64, 175, 0.3)" strokeWidth="0.5"/>
    <line x1="38" y1="38" x2="62" y2="38" stroke="#1e40af" strokeWidth="1.5" opacity="0.9"/>
    <line x1="38" y1="43" x2="58" y2="43" stroke="#1e40af" strokeWidth="1.5" opacity="0.85"/>
    <line x1="38" y1="48" x2="61" y2="48" stroke="#1e40af" strokeWidth="1.5" opacity="0.9"/>
    <line x1="38" y1="53" x2="56" y2="53" stroke="#1e40af" strokeWidth="1.5" opacity="0.8"/>
    <line x1="38" y1="58" x2="60" y2="58" stroke="#1e40af" strokeWidth="1.5" opacity="0.85"/>
    <line x1="38" y1="63" x2="59" y2="63" stroke="#1e40af" strokeWidth="1.5" opacity="0.8"/>
    
    {/* Premium Highlight */}
    <ellipse cx="35" cy="30" rx="15" ry="10" fill="rgba(30, 64, 175, 0.2)" transform="rotate(-25 35 30)" opacity="0.9"/>
  </svg>
);`;

  const faviconCode = `<!-- Add to HTML head -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg">

<!-- favicon.svg file content -->
<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="49" fill="#1e40af"/>
  <rect x="20" y="46" width="60" height="8" rx="4" fill="#ffffff" opacity="0.98"/>
  <rect x="46" y="20" width="8" height="60" rx="4" fill="#ffffff" opacity="0.98"/>
  <rect x="35" y="32" width="30" height="36" rx="3" fill="#ffffff" opacity="0.98"/>
  <line x1="38" y1="38" x2="62" y2="38" stroke="#1e40af" stroke-width="1.5"/>
  <line x1="38" y1="43" x2="58" y2="43" stroke="#1e40af" stroke-width="1.5"/>
  <line x1="38" y1="48" x2="61" y2="48" stroke="#1e40af" stroke-width="1.5"/>
  <line x1="38" y1="53" x2="56" y2="53" stroke="#1e40af" stroke-width="1.5"/>
  <line x1="38" y1="58" x2="60" y2="58" stroke="#1e40af" stroke-width="1.5"/>
  <line x1="38" y1="63" x2="59" y2="63" stroke="#1e40af" stroke-width="1.5"/>
</svg>`;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const downloadSVG = () => {
    const blob = new Blob([iconSVGCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MaycoleTracker-Icon-VolumeXI.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <MaycoleTrackerIcon size={80} interactive={false} />
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MaycoleTracker™ Icon Transfer
            </h1>
            <p className="text-lg text-muted-foreground">Volume XI - Enterprise Edition</p>
          </div>
        </div>
        
        <div className="flex justify-center gap-2 mb-6">
          <Badge variant="outline" className="text-blue-600 border-blue-200">
            🔥 WILD Document Box
          </Badge>
          <Badge variant="outline" className="text-purple-600 border-purple-200">
            📄 50% Bigger
          </Badge>
          <Badge variant="outline" className="text-green-600 border-green-200">
            ⚡ Interactive
          </Badge>
        </div>
      </div>

      {/* Live Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5" />
            Live Icon Preview
          </CardTitle>
          <CardDescription>Interactive MaycoleTracker™ icon with WILD document box</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-8 p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Small (40px)</p>
              <MaycoleTrackerIcon size={40} />
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Medium (60px)</p>
              <MaycoleTrackerIcon size={60} />
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Large (100px)</p>
              <MaycoleTrackerIcon size={100} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SVG Code */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Copy className="w-5 h-5" />
              Raw SVG Code
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(iconSVGCode, 'svg')}
              >
                {copied === 'svg' ? '✓ Copied!' : 'Copy SVG'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadSVG}
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
            <code>{iconSVGCode}</code>
          </pre>
        </CardContent>
      </Card>

      {/* React Component */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Copy className="w-5 h-5" />
              React Component
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(reactComponentCode, 'react')}
            >
              {copied === 'react' ? '✓ Copied!' : 'Copy React'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
            <code>{reactComponentCode}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Favicon Code */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Share className="w-5 h-5" />
              Favicon Implementation
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(faviconCode, 'favicon')}
            >
              {copied === 'favicon' ? '✓ Copied!' : 'Copy Favicon'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
            <code>{faviconCode}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Basic Usage:</h4>
              <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                {'<MaycoleTrackerIcon size={60} />'}
              </code>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Interactive with Tooltip:</h4>
              <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                {'<MaycoleTrackerIcon size={80} interactive={true} showTooltip={true} />'}
              </code>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Clean Version:</h4>
              <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                {'<CleanIcon size={40} className="shadow-lg" />'}
              </code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>🔥 WILD Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600">📄 Document Box:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• 50% bigger than previous version</li>
                <li>• Bold 1.5px stroke lines</li>
                <li>• 6 document lines for authenticity</li>
                <li>• Subtle blue border outline</li>
                <li>• Perfect center positioning</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-600">⚡ Interactive Features:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Hover scale animation</li>
                <li>• Professional tooltip</li>
                <li>• Click event support</li>
                <li>• Responsive sizing</li>
                <li>• Dark mode compatible</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IconTransferComponent;