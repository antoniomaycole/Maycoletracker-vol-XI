/**
 * 🎯 MaycoleTracker™ Website Logo Transfer Kit
 * Complete logo and branding components for website integration
 * Copy and paste ready - includes all styles and variations
 */

import React from 'react';

// =============================================
// 1. MAIN LOGO COMPONENT
// =============================================

interface MaycoleTrackerLogoProps {
  size?: 'small' | 'medium' | 'large' | 'hero';
  className?: string;
  showTrademark?: boolean;
}

export function MaycoleTrackerLogo({ 
  size = 'medium', 
  className = '', 
  showTrademark = true 
}: MaycoleTrackerLogoProps) {
  const trademarkClass = {
    small: 'tm-small',
    medium: 'tm-medium', 
    large: 'tm-large',
    hero: 'tm-large'
  }[size];

  return (
    <span className={className}>
      MaycoleTracker{showTrademark && <span className={trademarkClass}>™</span>}
    </span>
  );
}

// =============================================
// 2. CLEAN ROUND ICON COMPONENT (Your exact icon)
// =============================================

interface MaycoleTrackerIconProps {
  size?: number;
  className?: string;
  variant?: 'default' | 'app-store' | 'favicon' | 'button' | 'clean';
  interactive?: boolean;
}

export function MaycoleTrackerIcon({ 
  size = 40, 
  className = '',
  variant = 'clean',
  interactive = false
}: MaycoleTrackerIconProps) {
  const baseClass = interactive 
    ? 'transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer' 
    : '';
  
  const combinedClass = `${baseClass} ${className}`.trim();

  // Your exact color scheme
  const colors = {
    clean: {
      background: '#1e40af', // Rich, deep blue
      accent: '#ffffff',      // Pure white
      shadow: 'rgba(30, 64, 175, 0.3)'
    },
    default: {
      background: '#1e40af',
      accent: '#ffffff',
      shadow: 'rgba(30, 64, 175, 0.3)'
    },
    'app-store': {
      background: 'url(#appStoreGradient)',
      accent: '#ffffff',
      shadow: 'rgba(30, 64, 175, 0.4)'
    },
    favicon: {
      background: '#1e40af',
      accent: '#ffffff', 
      shadow: 'none'
    },
    button: {
      background: '#1e40af',
      accent: '#ffffff',
      shadow: 'rgba(30, 64, 175, 0.35)'
    }
  };

  const currentColors = colors[variant] || colors.clean;
  const isAppStore = variant === 'app-store';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={combinedClass}
      role="img"
      aria-label="MaycoleTracker App Icon"
      style={{ 
        borderRadius: '50%',
        filter: variant !== 'favicon' ? `drop-shadow(0 2px 8px ${currentColors.shadow})` : 'none'
      }}
    >
      {/* Gradient Definition for App Store */}
      {isAppStore && (
        <defs>
          <linearGradient id="appStoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="50%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
      )}

      {/* Perfect Circle Background */}
      <circle
        cx="50"
        cy="50"
        r="49"
        fill={currentColors.background}
        stroke="none"
      />

      {/* Cross Pattern */}
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

      {/* Sporadic White Dots */}
      <circle cx="35" cy="14" r="4" fill={currentColors.accent} opacity="0.95" />
      <circle cx="65" cy="18" r="3.5" fill={currentColors.accent} opacity="0.9" />
      <circle cx="14" cy="38" r="3.5" fill={currentColors.accent} opacity="0.92" />
      <circle cx="86" cy="62" r="4" fill={currentColors.accent} opacity="0.95" />
      <circle cx="35" cy="86" r="3.5" fill={currentColors.accent} opacity="0.9" />
      <circle cx="65" cy="82" r="3" fill={currentColors.accent} opacity="0.88" />
      <circle cx="30" cy="35" r="2.5" fill={currentColors.accent} opacity="0.85" />
      <circle cx="70" cy="32" r="2.8" fill={currentColors.accent} opacity="0.87" />
      <circle cx="32" cy="68" r="2.2" fill={currentColors.accent} opacity="0.82" />
      <circle cx="68" cy="65" r="2.6" fill={currentColors.accent} opacity="0.86" />
      <circle cx="42" cy="28" r="1.8" fill={currentColors.accent} opacity="0.75" />
      <circle cx="58" cy="25" r="1.5" fill={currentColors.accent} opacity="0.7" />
      <circle cx="25" cy="58" r="1.8" fill={currentColors.accent} opacity="0.75" />
      <circle cx="75" cy="55" r="1.6" fill={currentColors.accent} opacity="0.72" />
      <circle cx="45" cy="72" r="1.4" fill={currentColors.accent} opacity="0.68" />
      <circle cx="55" cy="75" r="1.7" fill={currentColors.accent} opacity="0.73" />

      {/* WILD Document Box - Your signature feature */}
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
      
      {/* Document Lines */}
      <line x1="38" y1="38" x2="62" y2="38" stroke="#1e40af" strokeWidth="1.5" opacity="0.9" />
      <line x1="38" y1="43" x2="58" y2="43" stroke="#1e40af" strokeWidth="1.5" opacity="0.85" />
      <line x1="38" y1="48" x2="61" y2="48" stroke="#1e40af" strokeWidth="1.5" opacity="0.9" />
      <line x1="38" y1="53" x2="56" y2="53" stroke="#1e40af" strokeWidth="1.5" opacity="0.8" />
      <line x1="38" y1="58" x2="60" y2="58" stroke="#1e40af" strokeWidth="1.5" opacity="0.85" />
      <line x1="38" y1="63" x2="59" y2="63" stroke="#1e40af" strokeWidth="1.5" opacity="0.8" />

      {/* Premium Highlights */}
      <ellipse
        cx="35"
        cy="30"
        rx="15"
        ry="10"
        fill="rgba(255, 255, 255, 0.2)"
        transform="rotate(-25 35 30)"
        opacity="0.9"
      />
      
      <ellipse
        cx="42"
        cy="38"
        rx="8"
        ry="6"
        fill="rgba(255, 255, 255, 0.1)"
        transform="rotate(15 42 38)"
        opacity="0.7"
      />
    </svg>
  );
}

// =============================================
// 3. CLEAN ICON VARIANTS (Ready to use)
// =============================================

export function CleanIcon({ 
  size = 40, 
  className = '',
  interactive = false 
}: { 
  size?: number; 
  className?: string;
  interactive?: boolean;
}) {
  return (
    <MaycoleTrackerIcon 
      size={size} 
      variant="clean" 
      className={`rounded-full shadow-sm ${className}`.trim()}
      interactive={interactive}
    />
  );
}

export function HeaderIcon({ size = 32 }: { size?: number }) {
  return <CleanIcon size={size} className="shadow-lg" interactive={false} />;
}

export function ButtonIcon({ size = 40, interactive = true }: { size?: number; interactive?: boolean }) {
  return <CleanIcon size={size} interactive={interactive} />;
}

// =============================================
// 4. COMPLETE LOGO WITH ICON COMBINATION
// =============================================

interface LogoWithIconProps {
  iconSize?: number;
  logoSize?: 'small' | 'medium' | 'large' | 'hero';
  layout?: 'horizontal' | 'vertical';
  className?: string;
  showTrademark?: boolean;
  interactive?: boolean;
}

export function LogoWithIcon({
  iconSize = 40,
  logoSize = 'medium',
  layout = 'horizontal',
  className = '',
  showTrademark = true,
  interactive = false
}: LogoWithIconProps) {
  const layoutClass = layout === 'horizontal' ? 'flex items-center gap-3' : 'flex flex-col items-center gap-2';
  const logoTextSize = {
    small: 'text-sm',
    medium: 'text-lg',
    large: 'text-xl',
    hero: 'text-2xl'
  }[logoSize];

  return (
    <div className={`${layoutClass} ${className}`.trim()}>
      <CleanIcon 
        size={iconSize} 
        interactive={interactive}
        className="flex-shrink-0"
      />
      <h1 className={`${logoTextSize} font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent`}>
        <MaycoleTrackerLogo size={logoSize} showTrademark={showTrademark} />
      </h1>
    </div>
  );
}

// =============================================
// 5. TRADEMARK STYLING (CSS-in-JS ready)
// =============================================

export const TrademarkStyles = `
  /* Trademark Symbol Styling */
  .tm-small {
    font-size: 0.6em;
    vertical-align: super;
    line-height: 0;
    margin-left: -0.05em;
    opacity: 0.9;
    font-weight: 400;
    position: relative;
    top: -0.3em;
  }

  .tm-medium {
    font-size: 0.5em;
    vertical-align: super;
    line-height: 0;
    margin-left: -0.1em;
    opacity: 0.85;
    font-weight: 300;
    position: relative;
    top: -0.4em;
  }

  .tm-large {
    font-size: 0.4em;
    vertical-align: super;
    line-height: 0;
    margin-left: -0.15em;
    opacity: 0.8;
    font-weight: 300;
    position: relative;
    top: -0.5em;
  }

  /* Gradient Text Utility */
  .gradient-text {
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% 200%;
    animation: gradient-shift 4s ease infinite;
  }

  @keyframes gradient-shift {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  /* Interactive Hover Effects */
  .logo-interactive:hover {
    transform: translateY(-1px);
    filter: drop-shadow(0 4px 12px rgba(30, 64, 175, 0.2));
    transition: all 0.2s ease;
  }
`;

// =============================================
// 6. WEBSITE INTEGRATION EXAMPLES
// =============================================

// Example 1: Header Logo
export function WebsiteHeader() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <LogoWithIcon 
            iconSize={40}
            logoSize="medium"
            layout="horizontal"
            className="logo-interactive"
            interactive={true}
          />
          {/* Your navigation here */}
        </div>
      </div>
    </header>
  );
}

// Example 2: Hero Section
export function HeroLogo() {
  return (
    <div className="text-center mb-12">
      <LogoWithIcon 
        iconSize={80}
        logoSize="hero"
        layout="vertical"
        className="mb-6"
      />
      <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
        Inventory Management System
      </h1>
      <p className="text-xl text-gray-600">
        Volume XI - Enterprise Edition
      </p>
    </div>
  );
}

// Example 3: Product Card
export function ProductCardLogo() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-4 mb-4">
        <CleanIcon size={48} interactive={true} />
        <div>
          <h3 className="text-lg font-bold">
            <MaycoleTrackerLogo size="medium" />
          </h3>
          <p className="text-sm text-gray-600">Enterprise Inventory System</p>
        </div>
      </div>
      {/* Product details here */}
    </div>
  );
}

// Example 4: Footer Logo
export function FooterLogo() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <LogoWithIcon 
          iconSize={32}
          logoSize="small"
          layout="horizontal"
          className="mb-4"
        />
        <p className="text-gray-400 text-sm">
          © 2024 MaycoleTechnologies™. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// =============================================
// 7. STANDALONE SVG EXPORT (For non-React use)
// =============================================

export const SVGIcon = `
<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="border-radius: 50%; filter: drop-shadow(0 2px 8px rgba(30, 64, 175, 0.3));">
  <!-- Perfect Circle Background -->
  <circle cx="50" cy="50" r="49" fill="#1e40af" stroke="none"/>
  
  <!-- Cross Pattern -->
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
  
  <!-- WILD Document Box -->
  <rect x="35" y="32" width="30" height="36" rx="3" fill="#ffffff" opacity="0.98" stroke="rgba(30, 64, 175, 0.3)" stroke-width="0.5"/>
  <line x1="38" y1="38" x2="62" y2="38" stroke="#1e40af" stroke-width="1.5" opacity="0.9"/>
  <line x1="38" y1="43" x2="58" y2="43" stroke="#1e40af" stroke-width="1.5" opacity="0.85"/>
  <line x1="38" y1="48" x2="61" y2="48" stroke="#1e40af" stroke-width="1.5" opacity="0.9"/>
  <line x1="38" y1="53" x2="56" y2="53" stroke="#1e40af" stroke-width="1.5" opacity="0.8"/>
  <line x1="38" y1="58" x2="60" y2="58" stroke="#1e40af" stroke-width="1.5" opacity="0.85"/>
  <line x1="38" y1="63" x2="59" y2="63" stroke="#1e40af" stroke-width="1.5" opacity="0.8"/>
  
  <!-- Premium Highlights -->
  <ellipse cx="35" cy="30" rx="15" ry="10" fill="rgba(255, 255, 255, 0.2)" transform="rotate(-25 35 30)" opacity="0.9"/>
  <ellipse cx="42" cy="38" rx="8" ry="6" fill="rgba(255, 255, 255, 0.1)" transform="rotate(15 42 38)" opacity="0.7"/>
</svg>
`;

// =============================================
// 8. CSS FOR NON-REACT WEBSITES
// =============================================

export const WebsiteCSS = `
/* MaycoleTracker™ Logo Styles */
.maycoletracker-logo {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 700;
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.maycoletracker-icon {
  border-radius: 50%;
  filter: drop-shadow(0 2px 8px rgba(30, 64, 175, 0.3));
  transition: all 0.2s ease;
}

.maycoletracker-icon:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 4px 12px rgba(30, 64, 175, 0.4));
}

/* Trademark styling */
.tm-small { font-size: 0.6em; vertical-align: super; line-height: 0; margin-left: -0.05em; opacity: 0.9; font-weight: 400; position: relative; top: -0.3em; }
.tm-medium { font-size: 0.5em; vertical-align: super; line-height: 0; margin-left: -0.1em; opacity: 0.85; font-weight: 300; position: relative; top: -0.4em; }
.tm-large { font-size: 0.4em; vertical-align: super; line-height: 0; margin-left: -0.15em; opacity: 0.8; font-weight: 300; position: relative; top: -0.5em; }

/* Logo combinations */
.logo-horizontal { display: flex; align-items: center; gap: 0.75rem; }
.logo-vertical { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }

.logo-interactive:hover {
  transform: translateY(-1px);
  filter: drop-shadow(0 4px 12px rgba(30, 64, 175, 0.2));
  transition: all 0.2s ease;
}
`;

// =============================================
// 9. HTML EXAMPLES FOR WEBSITE
// =============================================

export const HTMLExamples = {
  header: `
<!-- Header with logo -->
<header style="background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1); padding: 1rem 0;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div class="logo-horizontal">
      ${SVGIcon.replace('width="40" height="40"', 'width="40" height="40" class="maycoletracker-icon"')}
      <h1 class="maycoletracker-logo" style="font-size: 1.125rem; margin: 0;">
        MaycoleTracker<span class="tm-medium">™</span>
      </h1>
    </div>
  </div>
</header>
  `,
  
  hero: `
<!-- Hero section -->
<section style="text-align: center; padding: 4rem 1rem;">
  <div class="logo-vertical" style="margin-bottom: 2rem;">
    ${SVGIcon.replace('width="40" height="40"', 'width="80" height="80" class="maycoletracker-icon"')}
    <h1 class="maycoletracker-logo" style="font-size: 2rem; margin: 0;">
      MaycoleTracker<span class="tm-large">™</span>
    </h1>
  </div>
  <h2 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
    Inventory Management System
  </h2>
  <p style="font-size: 1.25rem; color: #6b7280;">
    Volume XI - Enterprise Edition
  </p>
</section>
  `,
  
  productCard: `
<!-- Product card -->
<div style="background: white; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 1.5rem;">
  <div class="logo-horizontal" style="margin-bottom: 1rem;">
    ${SVGIcon.replace('width="40" height="40"', 'width="48" height="48" class="maycoletracker-icon logo-interactive"')}
    <div>
      <h3 class="maycoletracker-logo" style="font-size: 1.125rem; margin: 0;">
        MaycoleTracker<span class="tm-medium">™</span>
      </h3>
      <p style="font-size: 0.875rem; color: #6b7280; margin: 0;">Enterprise Inventory System</p>
    </div>
  </div>
  <!-- Product details here -->
</div>
  `
};

// =============================================
// 10. USAGE INSTRUCTIONS
// =============================================

export const UsageInstructions = `
🎯 MaycoleTracker™ Logo Transfer Instructions:

1. REACT USAGE:
   - Copy the entire component file
   - Import: import { LogoWithIcon, CleanIcon, MaycoleTrackerLogo } from './path/to/logo'
   - Use: <LogoWithIcon iconSize={40} logoSize="medium" />

2. HTML/CSS USAGE:
   - Add the CSS to your stylesheet
   - Use the HTML examples provided
   - Include the SVG icon inline

3. WORDPRESS/CMS:
   - Use the standalone SVG code
   - Apply the CSS classes
   - Follow the HTML structure examples

4. BRANDING CONSISTENCY:
   - Always use #1e40af for icon background
   - Include the ™ trademark symbol
   - Maintain the WILD document box feature
   - Use the gradient text for main headings

5. SIZES AVAILABLE:
   - Icons: 20px, 32px, 40px, 48px, 80px
   - Logo text: small, medium, large, hero
   - Responsive scaling included

6. INTERACTION FEATURES:
   - Set interactive={true} for hover effects
   - Use logo-interactive class for CSS hover
   - Includes scale and shadow animations
`;

export default {
  MaycoleTrackerLogo,
  MaycoleTrackerIcon,
  CleanIcon,
  LogoWithIcon,
  WebsiteHeader,
  HeroLogo,
  ProductCardLogo,
  FooterLogo,
  TrademarkStyles,
  WebsiteCSS,
  SVGIcon,
  HTMLExamples,
  UsageInstructions
};