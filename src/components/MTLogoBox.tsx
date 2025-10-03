/**
 * MT Logo Display - Premium Professional Design
 * Beautiful 4D logo with elegant glass-morphism styling and premium branding
 */

import React from 'react';

interface MTLogoBoxProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'floating' | 'orbiting' | 'magnetic' | 'atomic';
  showEnterpriseText?: boolean;
  className?: string;
}

const MTLogoBox: React.FC<MTLogoBoxProps> = ({
  size = 'medium',
  variant = 'orbiting',
  showEnterpriseText = true,
  className = ''
}) => {
  const getSizeConfig = () => {
    switch (size) {
      case 'small':
        return {
          containerSize: 'w-20 h-20',
          mtTextSize: 'text-2xl',
          enterpriseSize: 'text-xs',
          padding: 'p-3'
        };
      case 'large':
        return {
          containerSize: 'w-40 h-40',
          mtTextSize: 'text-6xl',
          enterpriseSize: 'text-lg',
          padding: 'p-8'
        };
      default:
        return {
          containerSize: 'w-32 h-32',
          mtTextSize: 'text-4xl',
          enterpriseSize: 'text-sm',
          padding: 'p-6'
        };
    }
  };

  const config = getSizeConfig();

  const getVariantStyles = () => {
    const baseStyles = `
      relative rounded-2xl backdrop-blur-lg border border-white/30 
      bg-gradient-to-br from-white/20 via-white/10 to-white/5
      shadow-2xl shadow-blue-500/20 hover:shadow-3xl hover:shadow-purple-500/25
      transition-all duration-700 group cursor-pointer overflow-hidden
    `;
    
    switch (variant) {
      case 'floating':
        return `${baseStyles} hover:transform hover:scale-110 hover:-translate-y-2`;
      case 'magnetic':
        return `${baseStyles} hover:transform hover:scale-115 hover:rotate-2`;
      case 'atomic':
        return `${baseStyles} hover:transform hover:scale-125 hover:rotate-3 animate-pulse`;
      default: // orbiting
        return `${baseStyles} hover:transform hover:scale-108 hover:rotate-1`;
    }
  };

  return (
    <div className={`flex flex-col items-center space-y-6 ${className}`}>
      {/* Premium MT Logo Container */}
      <div className={`
        ${config.containerSize} ${config.padding}
        ${getVariantStyles()}
        flex flex-col items-center justify-center
      `}>
        {/* Animated Background Glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/25 via-purple-600/20 to-emerald-600/25 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
        
        {/* Inner Premium Glow Ring */}
        <div className="absolute inset-3 rounded-xl border-2 border-gradient-to-br from-blue-400/40 via-purple-400/30 to-emerald-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Core Energy Ring */}
        <div className="absolute inset-6 rounded-lg border border-white/50 opacity-20 group-hover:opacity-60 transition-opacity duration-300" />
        
        {/* MT Text with Premium 4D Effect */}
        <div className={`
          relative z-20 font-bold ${config.mtTextSize} 
          bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent
          drop-shadow-2xl group-hover:drop-shadow-3xl transition-all duration-500
          group-hover:scale-125 group-hover:rotate-1
          filter group-hover:brightness-110
        `}>
          &lt;MT&gt;
        </div>
        
        {/* Premium Tech Pattern Overlay */}
        <div className="absolute inset-0 rounded-2xl opacity-15 group-hover:opacity-30 transition-opacity duration-700">
          <div className="absolute top-3 left-3 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          <div className="absolute top-6 right-4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}} />
          <div className="absolute bottom-4 left-5 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{animationDelay: '1s'}} />
          <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" style={{animationDelay: '1.5s'}} />
        </div>

        {/* Premium Corner Accents */}
        <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-blue-400/50 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-purple-400/50 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-emerald-400/50 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-amber-400/50 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      {/* Premium Enterprise Solutions Text */}
      {showEnterpriseText && (
        <div className={`text-center ${config.enterpriseSize} font-medium leading-tight space-y-2`}>
          <div className="bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent font-bold tracking-wider">
            Enterprise
          </div>
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent font-extrabold tracking-widest">
            Solutions
          </div>
          
          {/* Professional Authority Badge */}
          <div className="mt-3 inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/60 shadow-lg">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mr-2 animate-pulse" />
            <span className="text-xs font-bold text-slate-800 tracking-wide">Premium Technology</span>
          </div>
        </div>
      )}
      
      {/* Professional Bottom Accent Line */}
      <div className="w-20 h-1 bg-gradient-to-r from-transparent via-blue-600 via-purple-600 to-transparent rounded-full opacity-60" />
    </div>
  );
};

export default MTLogoBox;