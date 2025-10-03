/**
 * MaycoleTracker™ DEBUG VERSION
 * Simplified app to test routing issues
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Simple test components
function TestHomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">MaycoleTracker™ vol. XI</h1>
        <h2 className="text-xl mb-6">Enterprise Edition</h2>
        <p className="text-lg mb-4">🚀 System Ready • All Modules Operational</p>
        <button 
          onClick={() => window.location.href = '/main'}
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Enter System
        </button>
      </div>
    </div>
  );
}

function TestMainPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">MaycoleTracker™ Main Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg border">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Inventory</h3>
            <p className="text-blue-700">Manage your inventory</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg border">
            <h3 className="text-xl font-semibold text-green-900 mb-2">Analytics</h3>
            <p className="text-green-700">View reports and analytics</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg border">
            <h3 className="text-xl font-semibold text-purple-900 mb-2">Scanner</h3>
            <p className="text-purple-700">Scan products</p>
          </div>
        </div>
        <div className="mt-8">
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

function TestNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
        <button 
          onClick={() => window.location.href = '/'}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export default function AppDebug() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestHomePage />} />
        <Route path="/main" element={<TestMainPage />} />
        <Route path="*" element={<TestNotFound />} />
      </Routes>
    </Router>
  );
}