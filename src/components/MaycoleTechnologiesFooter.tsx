/**
 * MaycoleTechnologies™ Footer Component
 * Strategic company promotion without interfering with inventory business
 */

import React from 'react';
import { Globe, Building2, Zap } from 'lucide-react';
import { Star } from '@/lib/icons';

interface MaycoleTechnologiesFooterProps {
  variant?: 'minimal' | 'standard' | 'expanded';
  className?: string;
}

export default function MaycoleTechnologiesFooter({ 
  variant = 'minimal', 
  className = '' 
}: MaycoleTechnologiesFooterProps) {
  
  if (variant === 'minimal') {
    return (
      <div className={`text-center py-4 ${className}`}>
        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
          <Globe className="w-4 h-4" />
          <span>
            Powered by <strong className="text-blue-600">MaycoleTechnologies™</strong> • 
            <span className="text-xs ml-1">maycoletechnologies.com</span>
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'standard') {
    return (
      <div className={`border-t border-gray-100 pt-6 ${className}`}>
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Globe className="w-5 h-5 text-blue-600" />
            <h4 className="text-lg font-bold text-gray-900">MaycoleTechnologies™</h4>
          </div>
          <p className="text-gray-600 mb-4">
            Innovating across Robotics Engineering, Music Production & Film Technology
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              Robotics
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              Music
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4" />
              Film
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            "Contributing and changing the future one product at a time."
          </p>
        </div>
      </div>
    );
  }

  // Expanded variant
  return (
    <div className={`bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-100 ${className}`}>
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Globe className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-900">MaycoleTechnologies™</h3>
        </div>
        
        <p className="text-gray-700 mb-6 leading-relaxed max-w-2xl mx-auto">
          MaycoleTracker™ represents just the beginning of our innovation journey. 
          We're developing groundbreaking solutions across multiple industries to shape the future.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Robotics Engineering</h4>
            <p className="text-sm text-gray-600 text-center">
              Next-generation automation and intelligent robotic systems
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Music Innovation</h4>
            <p className="text-sm text-gray-600 text-center">
              Revolutionary music production and audio technology
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Film Technology</h4>
            <p className="text-sm text-gray-600 text-center">
              Cutting-edge tools for filmmakers and content creators
            </p>
          </div>
        </div>

        <div className="bg-white rounded-md p-4 border border-blue-200">
          <p className="text-sm text-gray-600 mb-2">
            🚀 <strong>Stay Updated:</strong>
          </p>
          <p className="text-xs text-gray-500">
            Visit <strong className="text-blue-600">maycoletechnologies.com</strong> for the latest 
            product announcements and innovation updates.
          </p>
        </div>
        
        <p className="text-xs text-gray-500 mt-4 italic">
          "Contributing and changing the future one product at a time."
        </p>
      </div>
    </div>
  );
}

// Convenience exports for different use cases
export function MaycoleTechMinimal(props: Omit<MaycoleTechnologiesFooterProps, 'variant'>) {
  return <MaycoleTechnologiesFooter {...props} variant="minimal" />;
}

export function MaycoleTechStandard(props: Omit<MaycoleTechnologiesFooterProps, 'variant'>) {
  return <MaycoleTechnologiesFooter {...props} variant="standard" />;
}

export function MaycoleTechExpanded(props: Omit<MaycoleTechnologiesFooterProps, 'variant'>) {
  return <MaycoleTechnologiesFooter {...props} variant="expanded" />;
}