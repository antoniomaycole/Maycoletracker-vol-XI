/**
 * SmallLogoShowcase - Demonstration of the improved SmallLogoIcon
 * Shows the logo at different sizes with improved dot positioning
 */

import React from 'react';
import SmallLogoIcon from './SmallLogoIcon';
import MaycoleHeader from './MaycoleHeader';

export default function SmallLogoShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700">
      {/* Demo header */}
      <MaycoleHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            MaycoleTracker™ Small Logo Icon Showcase
          </h1>
          <p className="text-purple-100">
            Improved design with sporadic white dots that don't touch edges or elements
          </p>
        </div>

        {/* Logo size demonstrations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Small size */}
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-4">Small (24px)</h3>
              <div className="flex justify-center">
                <SmallLogoIcon size={24} />
              </div>
              <p className="text-purple-100 text-sm mt-2">Navigation header size</p>
            </div>
          </div>

          {/* Medium size */}
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-4">Medium (48px)</h3>
              <div className="flex justify-center">
                <SmallLogoIcon size={48} />
              </div>
              <p className="text-purple-100 text-sm mt-2">Card header size</p>
            </div>
          </div>

          {/* Large size */}
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-4">Large (72px)</h3>
              <div className="flex justify-center">
                <SmallLogoIcon size={72} />
              </div>
              <p className="text-purple-100 text-sm mt-2">Feature showcase size</p>
            </div>
          </div>
        </div>

        {/* Design improvements list */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 max-w-2xl mx-auto">
          <h3 className="text-white font-semibold mb-4 text-center">Design Improvements</h3>
          <ul className="text-purple-100 space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              White dots positioned sporadically and not touching edges
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Dots only touch blue background (not cross or white box)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Improved cross proportions and positioning
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Better document box with rounded corners
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Optimized document lines for clarity
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              MaycoleTracker text positioned at top with small logo icon
            </li>
          </ul>
        </div>

        {/* Interactive demo */}
        <div className="text-center mt-8">
          <h3 className="text-white font-semibold mb-4">Interactive Demo</h3>
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="btn-on-dark flex items-center gap-2 hover:scale-105 transition-transform">
              <SmallLogoIcon size={20} />
              <span>Button with Logo</span>
            </button>
            <button className="btn-on-dark flex items-center gap-2 hover:scale-105 transition-transform">
              <SmallLogoIcon size={16} />
              <span>Compact Size</span>
            </button>
            <button className="btn-on-dark flex items-center gap-2 hover:scale-105 transition-transform">
              <SmallLogoIcon size={24} />
              <span>Standard Size</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}