/**
 * MaycoleTracker™ vol. XI - Home Page Redirect
 * Ensures users always land on the Logo Page first
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to Logo Page (app starts with logo first)
    navigate('/logo', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center">
      <div className="text-center text-white max-w-sm mx-auto px-4">
        <div className="w-16 h-16 mx-auto mb-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <div className="w-8 h-8 bg-white rounded-sm relative">
            <div className="absolute inset-0 bg-blue-600 rounded-sm transform scale-75"></div>
          </div>
        </div>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <h2 className="text-xl font-bold mb-2">MaycoleTracker<span className="tm-standard">TM</span></h2>
        <p className="text-sm font-medium opacity-90">Launching MaycoleTracker™...</p>
      </div>
    </div>
  );
}