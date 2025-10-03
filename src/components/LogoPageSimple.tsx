/**
 * LogoPageSimple - MaycoleTracker™ Volume XI Entry Point (Simple Version)
 * Basic version without loading animations - use this if you prefer simplicity
 * 
 * TO USE THIS VERSION: In App.tsx, change the import from:
 * import LogoPage from './components/LogoPage';
 * TO:
 * import LogoPage from './components/LogoPageSimple';
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogoPage.css';
import KineticLogo from './KineticLogo';

export default function LogoPageSimple() {
  const navigate = useNavigate();

  const handleEnterSystem = () => {
    navigate('/main');
  };

  return (
    <div className="logo-page purple-background">
      <h1>MaycoleTracker<span className="tm-large">™</span></h1>
      <h2>Inventory Management System</h2>
      <h3>Volume XI — Enterprise Edition</h3>
      
      <div className="logo-container">
        <div onClick={handleEnterSystem} style={{ cursor: 'pointer' }}>
          <KineticLogo 
            size={220}
          />
        </div>
      </div>
      
      <button 
        className="blue-icon-button" 
        onClick={handleEnterSystem}
        aria-label="Enter MaycoleTracker™ Volume XI System"
      >
        Enter Vol XI
      </button>
      
      <div className="system-status">
        <p>🚀 System Ready • All Modules Operational</p>
      </div>
    </div>
  );
}