/**
 * MaycoleTechnologies™ Logo Component
 * Dynamic 4D Corporate Logo with orbital rings and moving elements
 */

import React from 'react';

interface MaycoleLogoProps {
  size?: number;
  className?: string;
  animated?: boolean;
  showText?: boolean;
  centered?: boolean;
}

export const MaycoleLogo: React.FC<MaycoleLogoProps> = ({ 
  size = 40, 
  className = "", 
  animated = true,
  showText = false,
  centered = false
}) => {
  const logoContent = (
    <div className={`relative ${className}`} style={{ width: size * 1.5, height: size * 1.5 }}>
      <svg
        width={size * 1.5}
        height={size * 1.5}
        viewBox="0 0 150 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={animated ? "logo-animate" : ""}
        style={{
          filter: 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.15)) drop-shadow(0 6px 12px rgba(0, 0, 0, 0.1))',
          transform: 'perspective(1500px) rotateX(15deg) rotateY(-5deg) translateZ(20px)',
          transformStyle: 'preserve-3d',
        }}
      >
        <defs>
          {/* Exact MaycoleTechnologies gradient colors */}
          <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#047857" />  {/* emerald-700 */}
            <stop offset="50%" stopColor="#64748b" /> {/* slate-600 */}
            <stop offset="100%" stopColor="#b45309" /> {/* amber-700 */}
          </linearGradient>

          {/* Enhanced 4D gradients matching brand colors */}
          <linearGradient id="leftBracketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />  {/* emerald-500 */}
            <stop offset="50%" stopColor="#047857" /> {/* emerald-700 */}
            <stop offset="100%" stopColor="#065f46" /> {/* emerald-800 */}
          </linearGradient>

          <linearGradient id="rightBracketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />  {/* amber-500 */}
            <stop offset="50%" stopColor="#b45309" /> {/* amber-700 */}
            <stop offset="100%" stopColor="#92400e" /> {/* amber-800 */}
          </linearGradient>

          <radialGradient id="centerCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#e2e8f0" />
            <stop offset="70%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </radialGradient>

          {/* Orbital ring gradients */}
          <linearGradient id="ring1Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(16, 185, 129, 0.8)" />
            <stop offset="50%" stopColor="rgba(100, 116, 139, 0.6)" />
            <stop offset="100%" stopColor="rgba(245, 158, 11, 0.8)" />
          </linearGradient>

          <linearGradient id="ring2Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(245, 158, 11, 0.6)" />
            <stop offset="50%" stopColor="rgba(100, 116, 139, 0.4)" />
            <stop offset="100%" stopColor="rgba(4, 120, 87, 0.6)" />
          </linearGradient>

          {/* Moving orb gradients */}
          <radialGradient id="orb1" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="70%" stopColor="#047857" />
            <stop offset="100%" stopColor="rgba(4, 120, 87, 0.2)" />
          </radialGradient>

          <radialGradient id="orb2" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#b45309" />
            <stop offset="100%" stopColor="rgba(180, 83, 9, 0.2)" />
          </radialGradient>

          <radialGradient id="orb3" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="70%" stopColor="#475569" />
            <stop offset="100%" stopColor="rgba(71, 85, 105, 0.2)" />
          </radialGradient>

          {/* Atomic particle gradients - Sharp contrast colors for header */}
          <radialGradient id="headerAtomicNeon" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#00ffff" />
            <stop offset="70%" stopColor="#0099ff" />
            <stop offset="100%" stopColor="rgba(0, 255, 255, 0.4)" />
          </radialGradient>

          <radialGradient id="headerAtomicPurple" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ff00ff" />
            <stop offset="70%" stopColor="#9900ff" />
            <stop offset="100%" stopColor="rgba(255, 0, 255, 0.4)" />
          </radialGradient>

          <radialGradient id="headerAtomicLime" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#00ff00" />
            <stop offset="70%" stopColor="#33cc00" />
            <stop offset="100%" stopColor="rgba(0, 255, 0, 0.4)" />
          </radialGradient>

          <radialGradient id="headerAtomicRed" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ff0066" />
            <stop offset="70%" stopColor="#cc0033" />
            <stop offset="100%" stopColor="rgba(255, 0, 102, 0.4)" />
          </radialGradient>

          <radialGradient id="headerAtomicYellow" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffff00" />
            <stop offset="70%" stopColor="#ffcc00" />
            <stop offset="100%" stopColor="rgba(255, 255, 0, 0.4)" />
          </radialGradient>

          <radialGradient id="headerAtomicOrange" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ff6600" />
            <stop offset="70%" stopColor="#ff3300" />
            <stop offset="100%" stopColor="rgba(255, 102, 0, 0.4)" />
          </radialGradient>

          {/* Advanced 4D filters */}
          <filter id="shadow4D" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
            <feOffset dx="3" dy="6" result="offset1"/>
            <feFlood floodColor="#000000" floodOpacity="0.3"/>
            <feComposite in2="offset1" operator="in" result="shadow1"/>
            
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
            <feOffset dx="1.5" dy="3" result="offset2"/>
            <feFlood floodColor="#000000" floodOpacity="0.15"/>
            <feComposite in2="offset2" operator="in" result="shadow2"/>
            
            <feMerge>
              <feMergeNode in="shadow1"/>
              <feMergeNode in="shadow2"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="glow4D" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="innerGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur"/>
            <feFlood floodColor="#ffffff" floodOpacity="0.3"/>
            <feComposite in2="blur" operator="in"/>
            <feMerge>
              <feMergeNode in="SourceGraphic"/>
              <feMergeNode/>
            </feMerge>
          </filter>
        </defs>

        {/* 4D Depth base layers */}
        <g transform="translate(3, 6)" opacity="0.1">
          <path d="M45 30 L25 75 L45 120" fill="none" stroke="#065f46" strokeWidth="8" strokeLinecap="round"/>
          <path d="M105 30 L125 75 L105 120" fill="none" stroke="#92400e" strokeWidth="8" strokeLinecap="round"/>
          <circle cx="75" cy="75" r="8" fill="#334155" />
        </g>

        <g transform="translate(2, 4)" opacity="0.2">
          <path d="M45 30 L25 75 L45 120" fill="none" stroke="#047857" strokeWidth="7" strokeLinecap="round"/>
          <path d="M105 30 L125 75 L105 120" fill="none" stroke="#b45309" strokeWidth="7" strokeLinecap="round"/>
          <circle cx="75" cy="75" r="7" fill="#475569" />
        </g>

        {/* Animated orbital rings */}
        <g className="orbital-system" filter="url(#glow4D)">
          {/* Outer ring */}
          <circle
            cx="75" cy="75" r="55"
            fill="none"
            stroke="url(#ring1Gradient)"
            strokeWidth="2"
            strokeDasharray="8 4"
            className="outer-ring"
            opacity="0.6"
          />
          
          {/* Middle ring */}
          <circle
            cx="75" cy="75" r="45"
            fill="none"
            stroke="url(#ring2Gradient)"
            strokeWidth="1.5"
            strokeDasharray="6 3"
            className="middle-ring"
            opacity="0.5"
          />
          
          {/* Inner ring */}
          <circle
            cx="75" cy="75" r="35"
            fill="none"
            stroke="url(#brandGradient)"
            strokeWidth="1"
            strokeDasharray="4 2"
            className="inner-ring"
            opacity="0.4"
          />
        </g>

        {/* Moving orbital balls */}
        <g className="orbital-balls">
          {/* Ball 1 - Emerald */}
          <circle
            cx="130" cy="75" r="4"
            fill="url(#orb1)"
            className="orb-1"
            filter="url(#innerGlow)"
          />
          
          {/* Ball 2 - Amber */}
          <circle
            cx="20" cy="75" r="3.5"
            fill="url(#orb2)"
            className="orb-2"
            filter="url(#innerGlow)"
          />
          
          {/* Ball 3 - Slate */}
          <circle
            cx="75" cy="20" r="3"
            fill="url(#orb3)"
            className="orb-3"
            filter="url(#innerGlow)"
          />

          {/* Atomic particles - Only show when animated */}
          {animated && (
            <>
              {/* Neon Cyan particles */}
              <circle
                cx="100" cy="50" r="1"
                fill="url(#headerAtomicNeon)"
                className="header-atomic-1"
                opacity="0.9"
              />
              <circle
                cx="50" cy="100" r="1.2"
                fill="url(#headerAtomicNeon)"
                className="header-atomic-2"
                opacity="0.8"
              />

              {/* Magenta particles */}
              <circle
                cx="105" cy="95" r="0.8"
                fill="url(#headerAtomicPurple)"
                className="header-atomic-3"
                opacity="0.85"
              />
              <circle
                cx="45" cy="55" r="1.1"
                fill="url(#headerAtomicPurple)"
                className="header-atomic-4"
                opacity="0.75"
              />

              {/* Lime Green particles */}
              <circle
                cx="95" cy="105" r="0.9"
                fill="url(#headerAtomicLime)"
                className="header-atomic-5"
                opacity="0.8"
              />
              <circle
                cx="55" cy="45" r="0.9"
                fill="url(#headerAtomicLime)"
                className="header-atomic-6"
                opacity="0.7"
              />

              {/* Hot Red particles */}
              <circle
                cx="110" cy="75" r="0.7"
                fill="url(#headerAtomicRed)"
                className="header-atomic-7"
                opacity="0.9"
              />
              <circle
                cx="40" cy="75" r="1"
                fill="url(#headerAtomicRed)"
                className="header-atomic-8"
                opacity="0.6"
              />

              {/* Electric Yellow particles */}
              <circle
                cx="75" cy="40" r="0.8"
                fill="url(#headerAtomicYellow)"
                className="header-atomic-9"
                opacity="0.85"
              />
              <circle
                cx="75" cy="110" r="1.1"
                fill="url(#headerAtomicYellow)"
                className="header-atomic-10"
                opacity="0.7"
              />

              {/* Vibrant Orange particles */}
              <circle
                cx="90" cy="60" r="0.7"
                fill="url(#headerAtomicOrange)"
                className="header-atomic-11"
                opacity="0.8"
              />
              <circle
                cx="60" cy="90" r="0.9"
                fill="url(#headerAtomicOrange)"
                className="header-atomic-12"
                opacity="0.75"
              />
            </>
          )}
        </g>

        {/* Main logo elements with 4D effects */}
        <g filter="url(#shadow4D)">
          {/* Left bracket - < symbol (Emerald) */}
          <g filter="url(#glow4D)">
            <path
              d="M45 30 L25 75 L45 120"
              fill="none"
              stroke="url(#leftBracketGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="logo-left"
            />
            <path
              d="M45 30 L25 75 L45 120"
              fill="none"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Right bracket - > symbol (Amber) */}
          <g filter="url(#glow4D)">
            <path
              d="M105 30 L125 75 L105 120"
              fill="none"
              stroke="url(#rightBracketGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="logo-right"
            />
            <path
              d="M105 30 L125 75 L105 120"
              fill="none"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Center authority core */}
          <g filter="url(#glow4D)">
            <circle
              cx="75" cy="75" r="10"
              fill="url(#centerCore)"
              stroke="url(#brandGradient)"
              strokeWidth="3"
              className="logo-center"
            />
            <circle
              cx="75" cy="75" r="7"
              fill="url(#brandGradient)"
              opacity="0.6"
            />
            <circle
              cx="72" cy="72" r="4"
              fill="rgba(255, 255, 255, 0.8)"
              opacity="0.7"
            />
          </g>
        </g>
      </svg>

      {/* Advanced 4D CSS animations */}
      <style jsx>{`
        .logo-animate {
          animation: logo4DFloat 8s ease-in-out infinite;
        }
        
        .logo-animate .logo-left {
          animation: slideInLeft4D 2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .logo-animate .logo-right {
          animation: slideInRight4D 2s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s both;
        }
        
        .logo-animate .logo-center {
          animation: centerPrecisionOrbit 4s ease-in-out infinite 1s;
        }

        /* Orbital ring animations */
        .outer-ring {
          animation: rotateClockwise 20s linear infinite;
          transform-origin: 75px 75px;
        }
        
        .middle-ring {
          animation: rotateCounterClockwise 15s linear infinite;
          transform-origin: 75px 75px;
        }
        
        .inner-ring {
          animation: rotateClockwise 10s linear infinite;
          transform-origin: 75px 75px;
        }

        /* Orbital ball animations */
        .orb-1 {
          animation: orbitLarge 12s linear infinite;
          transform-origin: 75px 75px;
        }
        
        .orb-2 {
          animation: orbitMedium 8s linear infinite reverse;
          transform-origin: 75px 75px;
        }
        
        .orb-3 {
          animation: orbitSmall 6s linear infinite;
          transform-origin: 75px 75px;
        }
        
        @keyframes logo4DFloat {
          0%, 100% { 
            transform: perspective(1500px) rotateX(15deg) rotateY(-5deg) translateZ(20px) scale(1);
          }
          50% {
            transform: perspective(1500px) rotateX(18deg) rotateY(-8deg) translateZ(25px) scale(1.02);
          }
        }
        
        @keyframes slideInLeft4D {
          from {
            opacity: 0;
            transform: translateX(-20px) rotateY(-30deg) translateZ(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotateY(0deg) translateZ(0);
          }
        }
        
        @keyframes slideInRight4D {
          from {
            opacity: 0;
            transform: translateX(20px) rotateY(30deg) translateZ(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotateY(0deg) translateZ(0);
          }
        }
        
        @keyframes centerPrecisionOrbit {
          0% { 
            transform: translateX(0px) translateY(0px) scale(1) translateZ(0); 
            opacity: 1; 
          }
          12.5% { 
            transform: translateX(3px) translateY(-4px) scale(1.02) translateZ(2px); 
            opacity: 0.95; 
          }
          25% { 
            transform: translateX(4px) translateY(-8px) scale(1.05) translateZ(3px); 
            opacity: 0.9; 
          }
          37.5% { 
            transform: translateX(3px) translateY(-10px) scale(1.08) translateZ(4px); 
            opacity: 0.85; 
          }
          50% { 
            transform: translateX(0px) translateY(-12px) scale(1.1) translateZ(5px); 
            opacity: 0.8; 
          }
          62.5% { 
            transform: translateX(-3px) translateY(-10px) scale(1.08) translateZ(4px); 
            opacity: 0.85; 
          }
          75% { 
            transform: translateX(-4px) translateY(-8px) scale(1.05) translateZ(3px); 
            opacity: 0.9; 
          }
          87.5% { 
            transform: translateX(-3px) translateY(-4px) scale(1.02) translateZ(2px); 
            opacity: 0.95; 
          }
          100% { 
            transform: translateX(0px) translateY(0px) scale(1) translateZ(0); 
            opacity: 1; 
          }
        }

        @keyframes rotateClockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes rotateCounterClockwise {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes orbitLarge {
          from { transform: rotate(0deg) translateX(55px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(55px) rotate(-360deg); }
        }
        
        @keyframes orbitMedium {
          from { transform: rotate(0deg) translateX(45px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(45px) rotate(-360deg); }
        }
        
        @keyframes orbitSmall {
          from { transform: rotate(0deg) translateX(35px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(35px) rotate(-360deg); }
        }

        /* Header atomic particle animations - Smaller orbital paths for header */
        .header-atomic-1 {
          animation: headerAtomicOrbit1 2s linear infinite;
          transform-origin: 75px 75px;
        }
        
        .header-atomic-2 {
          animation: headerAtomicOrbit2 2.5s linear infinite reverse;
          transform-origin: 75px 75px;
        }
        
        .header-atomic-3 {
          animation: headerAtomicOrbit3 2.2s linear infinite;
          transform-origin: 75px 75px;
        }
        
        .header-atomic-4 {
          animation: headerAtomicOrbit4 2.8s linear infinite reverse;
          transform-origin: 75px 75px;
        }
        
        .header-atomic-5 {
          animation: headerAtomicOrbit5 1.8s linear infinite;
          transform-origin: 75px 75px;
        }
        
        .header-atomic-6 {
          animation: headerAtomicOrbit6 3s linear infinite reverse;
          transform-origin: 75px 75px;
        }
        
        .header-atomic-7 {
          animation: headerAtomicOrbit7 2.1s linear infinite;
          transform-origin: 75px 75px;
        }
        
        .header-atomic-8 {
          animation: headerAtomicOrbit8 2.6s linear infinite reverse;
          transform-origin: 75px 75px;
        }
        
        .header-atomic-9 {
          animation: headerAtomicOrbit9 1.9s linear infinite;
          transform-origin: 75px 75px;
        }
        
        .header-atomic-10 {
          animation: headerAtomicOrbit10 2.9s linear infinite reverse;
          transform-origin: 75px 75px;
        }
        
        .header-atomic-11 {
          animation: headerAtomicOrbit11 2.3s linear infinite;
          transform-origin: 75px 75px;
        }
        
        .header-atomic-12 {
          animation: headerAtomicOrbit12 2.7s linear infinite reverse;
          transform-origin: 75px 75px;
        }

        /* Header atomic orbital keyframes - Smaller paths suitable for header */
        @keyframes headerAtomicOrbit1 {
          from { transform: rotate(0deg) translateX(15px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(15px) rotate(-360deg); }
        }
        
        @keyframes headerAtomicOrbit2 {
          from { transform: rotate(0deg) translateX(15px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(15px) rotate(-360deg); }
        }
        
        @keyframes headerAtomicOrbit3 {
          from { transform: rotate(0deg) translateX(20px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(20px) rotate(-360deg); }
        }
        
        @keyframes headerAtomicOrbit4 {
          from { transform: rotate(0deg) translateX(20px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(20px) rotate(-360deg); }
        }
        
        @keyframes headerAtomicOrbit5 {
          from { transform: rotate(0deg) translateX(25px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(25px) rotate(-360deg); }
        }
        
        @keyframes headerAtomicOrbit6 {
          from { transform: rotate(0deg) translateX(25px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(25px) rotate(-360deg); }
        }
        
        @keyframes headerAtomicOrbit7 {
          from { transform: rotate(0deg) translateX(12px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(12px) rotate(-360deg); }
        }
        
        @keyframes headerAtomicOrbit8 {
          from { transform: rotate(0deg) translateX(12px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(12px) rotate(-360deg); }
        }
        
        @keyframes headerAtomicOrbit9 {
          from { transform: rotate(0deg) translateX(18px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(18px) rotate(-360deg); }
        }
        
        @keyframes headerAtomicOrbit10 {
          from { transform: rotate(0deg) translateX(18px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(18px) rotate(-360deg); }
        }
        
        @keyframes headerAtomicOrbit11 {
          from { transform: rotate(0deg) translateX(22px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(22px) rotate(-360deg); }
        }
        
        @keyframes headerAtomicOrbit12 {
          from { transform: rotate(0deg) translateX(22px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(22px) rotate(-360deg); }
        }
      `}</style>
    </div>
  );

  if (showText) {
    return (
      <div className={`${centered ? 'flex flex-col items-center text-center' : 'flex items-center space-x-4'}`}>
        {logoContent}
        <div className={centered ? 'mt-4' : ''}>
          <h1 className={`${centered ? 'text-2xl' : 'text-xl'} font-bold bg-gradient-to-r from-emerald-700 via-slate-600 to-amber-700 bg-clip-text text-transparent`}>
            MaycoleTechnologies<span className="text-xs align-super text-slate-500">™</span>
          </h1>
          <p className={`${centered ? 'text-lg mt-2' : 'text-sm'} font-bold bg-gradient-to-r from-emerald-800 via-emerald-600 to-amber-600 bg-clip-text text-transparent`}>
            Changing The Future Product At A Time
          </p>
        </div>
      </div>
    );
  }

  return logoContent;
};

// Text Logo Component
export const MaycoleTextLogo: React.FC<{ className?: string; centered?: boolean; animated?: boolean }> = ({ 
  className = "", 
  centered = false,
  animated = true
}) => {
  return (
    <div className={`${centered ? 'flex flex-col items-center text-center' : 'flex items-center space-x-3'} ${className}`}>
      <MaycoleLogo size={48} animated={animated} showText={false} />
      <div className={centered ? 'mt-4' : ''}>
        <span className={`font-bold ${centered ? 'text-3xl' : 'text-xl'} bg-gradient-to-r from-emerald-700 via-slate-600 to-amber-700 bg-clip-text text-transparent`}>
          MaycoleTechnologies<span className="text-xs align-super text-slate-500">™</span>
        </span>
        <div className={`${centered ? 'text-xl mt-2' : 'text-sm'} bg-gradient-to-r from-emerald-800 via-emerald-600 to-amber-600 bg-clip-text text-transparent font-bold`}>
          Changing The Future Product At A Time
        </div>
      </div>
    </div>
  );
};

// Compact Logo for Mobile
export const MaycoleCompactLogo: React.FC<{ className?: string; animated?: boolean }> = ({ 
  className = "", 
  animated = true
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <MaycoleLogo size={32} animated={animated} />
      <div>
        <span className="font-bold text-lg bg-gradient-to-r from-emerald-700 via-slate-600 to-amber-700 bg-clip-text text-transparent">
          MaycoleTech<span className="text-xs align-super text-slate-500">™</span>
        </span>
        <div className="text-xs bg-gradient-to-r from-emerald-800 via-emerald-600 to-amber-600 bg-clip-text text-transparent font-medium">
          Changing The Future Product At A Time
        </div>
      </div>
    </div>
  );
};

// Centered Hero Logo - Large Version
export const MaycoleCenteredLogo: React.FC<{ className?: string; scale?: number }> = ({ className = "", scale = 1 }) => {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <MaycoleLogo size={120 * scale} animated />
      <div className="mt-6">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-700 via-slate-600 to-amber-700 bg-clip-text text-transparent mb-3">
          MaycoleTechnologies<span className="text-lg align-super text-slate-500">™</span>
        </h1>
        <p className="text-2xl font-bold bg-gradient-to-r from-emerald-800 via-emerald-600 to-amber-600 bg-clip-text text-transparent">
          Changing The Future Product At A Time
        </p>
      </div>
    </div>
  );
};

// Minimalist Footer Logo - Simple geometric design
export const MaycoleFooterLogo: React.FC<{ size?: number; className?: string }> = ({ 
  size = 20, 
  className = "" 
}) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="footer-logo"
        style={{
          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
        }}
      >
        <defs>
          {/* Simple footer gradient */}
          <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />  {/* slate-500 */}
            <stop offset="50%" stopColor="#94a3b8" /> {/* slate-400 */}
            <stop offset="100%" stopColor="#cbd5e1" /> {/* slate-300 */}
          </linearGradient>
        </defs>
        
        {/* Simple geometric square with rounded corners */}
        <rect
          x="4" y="4"
          width="32" height="32"
          rx="6" ry="6"
          fill="url(#footerGradient)"
          stroke="rgba(100, 116, 139, 0.3)"
          strokeWidth="1"
        />
        
        {/* Simple "M" letter in center */}
        <path
          d="M12 28 L12 12 L16 12 L20 20 L24 12 L28 12 L28 28 L24 28 L24 18 L20 24 L20 18 L16 28 L12 28 Z"
          fill="white"
          opacity="0.9"
        />
      </svg>

      <style jsx>{`
        .footer-logo {
          transition: all 0.2s ease;
        }
        
        .footer-logo:hover {
          transform: scale(1.1);
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
        }
      `}</style>
    </div>
  );
};

export default MaycoleLogo;