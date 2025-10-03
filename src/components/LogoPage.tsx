/**
 * MaycoleTracker™ vol. XI - Enterprise Edition
 * YOUR PERFECT LOGO PAGE - RESTORED WITH ALL FEATURES
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import KineticLogo from './KineticLogo';
import MaycoleTrackerIconButton from './MaycoleTrackerIconButton';
import './LogoPage.css';

const LogoPage = () => {
  const navigate = useNavigate();

  // Debug console log
  console.log('✅ MaycoleTracker™ Perfect LogoPage is rendering!');

  return (
    <div className="logo-page blue-background">
      
      {/* SPORADIC WHITE DOTS SCATTERED ACROSS THE BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large prominent white dots */}
        <div className="absolute w-3 h-3 bg-white rounded-full opacity-90 animate-pulse" style={{ top: '15%', left: '10%' }}></div>
        <div className="absolute w-4 h-4 bg-white rounded-full opacity-85" style={{ top: '25%', right: '15%' }}></div>
        <div className="absolute w-2 h-2 bg-white rounded-full opacity-80" style={{ bottom: '20%', left: '20%' }}></div>
        <div className="absolute w-5 h-5 bg-white rounded-full opacity-75" style={{ bottom: '30%', right: '25%' }}></div>
        
        {/* Medium scattered dots */}
        <div className="absolute w-2.5 h-2.5 bg-white rounded-full opacity-85" style={{ top: '40%', left: '80%' }}></div>
        <div className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-75" style={{ top: '60%', left: '5%' }}></div>
        <div className="absolute w-3.5 h-3.5 bg-white rounded-full opacity-70" style={{ bottom: '40%', left: '85%' }}></div>
        <div className="absolute w-2 h-2 bg-white rounded-full opacity-90" style={{ top: '70%', right: '30%' }}></div>
        
        {/* Small sporadic dots */}
        <div className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-80" style={{ top: '35%', left: '45%' }}></div>
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-85" style={{ top: '75%', right: '5%' }}></div>
        <div className="absolute w-3 h-3 bg-white rounded-full opacity-70 animate-pulse" style={{ top: '10%', left: '50%' }}></div>
        <div className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-95" style={{ bottom: '10%', right: '50%' }}></div>
        
        {/* Extra sporadic dots for more star-like effect */}
        <div className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-65" style={{ top: '18%', left: '35%' }}></div>
        <div className="absolute w-2.5 h-2.5 bg-white rounded-full opacity-70" style={{ top: '55%', right: '20%' }}></div>
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-85" style={{ bottom: '35%', left: '65%' }}></div>
        <div className="absolute w-3.5 h-3.5 bg-white rounded-full opacity-60 animate-pulse" style={{ bottom: '50%', right: '40%' }}></div>
      </div>



      {/* CENTERED BRAND: ICON BUTTON + MAYCOLETRACKER™ AS ONE UNIT */}
      <div className="centered-brand-container">
        <div className="brand-unit-perfect">
          {/* Icon Button to the LEFT of MaycoleTracker */}
          <MaycoleTrackerIconButton
            size={50}
            onClick={() => navigate('/home')}
            title="Launch MaycoleTrackerTM Business Control Center"
            className="brand-icon-left"
          />
          
          {/* MaycoleTracker™ Name */}
          <h1 className="brand-name-perfect">
            MaycoleTracker<span className="tm-standard">TM</span>
          </h1>
        </div>
        
        {/* vol. XI - DIRECTLY UNDER THE BRAND NAME */}
        <h2 className="brand-subtitle-perfect">
          vol. XI - Enterprise Edition
        </h2>
      </div>

      {/* CENTERED KINETIC LOGO - LAUNCHES THE APP */}
      <div 
        className="centered-logo-container"
        onClick={() => navigate('/home')}
        title="Launch MaycoleTrackerTM Business Control Center"
      >
        <KineticLogo 
          size={180} 
          interactive={true} 
          enable3D={true}
          className="kinetic-logo-centered"
        />
      </div>



      {/* INVENTORY MANAGEMENT SYSTEM LABEL */}
      <div className="perfect-status">
        <h3 className="brand-subtitle-perfect">
          Inventory Management System
        </h3>
      </div>
    </div>
  );
};

export default LogoPage;