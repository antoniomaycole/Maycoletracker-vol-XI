/**
 * MaycoleTracker™ vol. XI - Enterprise Edition
 * PROTECTED LOGO SEAL - Bonded Entry Agent
 * 🔒 PREVENTS 404 ERRORS - Direct Launch System
 */
import IconButton from './IconButton';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// 🔒 SEALED ASSETS - No External Dependencies
// Note: Replace these paths with your actual asset paths
// import logoImage from '../assets/maycole-logo.png'; // ✅ Your kinetic logo
// import iconButtonImage from '../assets/icon-button.png'; // ✅ Your icon button (same design)

const LogoSeal = () => {
  const navigate = useNavigate();

  // 🚀 DIRECT LAUNCH - No 404 Possible
  const launchApp = () => {
    navigate('/dashboard'); // ✅ Launch into bonded system
  };

  return (
    <div
      onClick={launchApp}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#ffffff',
        cursor: 'pointer',
        userSelect: 'none',
        flexDirection: 'column',
        gap: '2rem',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* 🔒 BONDED BRAND UNIT - Icon + Logo as ONE */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          transition: 'all 0.3s ease',
          transform: 'scale(1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {/* 🔒 Icon Button (left of logo) - SEALED */}
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #007BFF 0%, #0056b3 100%)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(0, 123, 255, 0.3)',
            transition: 'all 0.3s ease',
            flexShrink: 0
          }}
        >
          {/* Cross + Document Icon - Sealed SVG */}
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 32 32" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* White Cross */}
            <path 
              d="M16 6V26M6 16H26" 
              stroke="white" 
              strokeWidth="3" 
              strokeLinecap="round"
            />
            {/* Document Box */}
            <rect 
              x="12" 
              y="10" 
              width="8" 
              height="12" 
              rx="1" 
              fill="white" 
              stroke="none"
            />
            {/* Sparkle Dots */}
            <circle cx="8" cy="8" r="1" fill="white" opacity="0.8"/>
            <circle cx="24" cy="10" r="1" fill="white" opacity="0.6"/>
            <circle cx="6" cy="24" r="1" fill="white" opacity="0.7"/>
            <circle cx="26" cy="22" r="1" fill="white" opacity="0.9"/>
          </svg>
        </div>

        {/* 🔒 MaycoleTracker™ Logo - SEALED TEXT */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '700',
              margin: '0',
              color: '#007BFF',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              textShadow: '0 2px 4px rgba(0, 123, 255, 0.2)',
              lineHeight: '1.1'
            }}
          >
            MaycoleTracker<span style={{ fontSize: '0.4em', verticalAlign: 'super', opacity: 0.8 }}>™</span>
          </h1>
          <h2
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              fontWeight: '600',
              margin: '0.25rem 0 0 0',
              color: '#6b7280',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              lineHeight: '1.2'
            }}
          >
            vol. XI - Enterprise Edition
          </h2>
        </div>
      </div>

      {/* 🔒 SEALED KINETIC LOGO - Click to Launch */}
      <div
        style={{
          width: '200px',
          height: '200px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #007BFF 0%, #0056b3 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 12px 48px rgba(0, 123, 255, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 16px 64px rgba(0, 123, 255, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 12px 48px rgba(0, 123, 255, 0.3)';
        }}
      >
        {/* Sealed Kinetic Logo - Rich Blue Circle with Cross */}
        <svg 
          width="120" 
          height="120" 
          viewBox="0 0 120 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Circle Background */}
          <circle 
            cx="60" 
            cy="60" 
            r="55" 
            fill="white" 
            opacity="0.95"
          />
          
          {/* Large Cross */}
          <path 
            d="M60 20V100M20 60H100" 
            stroke="#007BFF" 
            strokeWidth="8" 
            strokeLinecap="round"
          />
          
          {/* Document Box in Center */}
          <rect 
            x="45" 
            y="45" 
            width="30" 
            height="30" 
            rx="3" 
            fill="white" 
            stroke="#007BFF" 
            strokeWidth="2"
          />
          
          {/* Small Cross Inside Document */}
          <path 
            d="M60 52V68M52 60H68" 
            stroke="#007BFF" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
          
          {/* Sporadic Star Dots */}
          <circle cx="30" cy="30" r="2" fill="white" opacity="0.9"/>
          <circle cx="90" cy="35" r="2.5" fill="white" opacity="0.8"/>
          <circle cx="25" cy="85" r="2" fill="white" opacity="0.7"/>
          <circle cx="95" cy="90" r="3" fill="white" opacity="0.85"/>
          <circle cx="35" cy="75" r="1.5" fill="white" opacity="0.6"/>
          <circle cx="85" cy="25" r="2" fill="white" opacity="0.75"/>
          <circle cx="75" cy="85" r="2.5" fill="white" opacity="0.8"/>
          <circle cx="40" cy="40" r="1" fill="white" opacity="0.9"/>
        </svg>
        
        {/* Shine Effect */}
        <div
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
            animation: 'logoShine 3s ease-in-out infinite',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* 🔒 SEALED SYSTEM LABEL */}
      <div
        style={{
          textAlign: 'center',
          marginTop: '1rem'
        }}
      >
        <h3
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            fontWeight: '600',
            margin: '0',
            color: '#6b7280',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            lineHeight: '1.2'
          }}
        >
          Inventory Management System
        </h3>
      </div>

      {/* 🔒 LAUNCH INSTRUCTION */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          opacity: '0.7',
          fontSize: '0.875rem',
          color: '#6b7280',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
      >
        Click anywhere to launch MaycoleTracker™
      </div>

      {/* CSS Animation for Shine Effect */}
      <style>
        {`
          @keyframes logoShine {
            0% {
              transform: translateX(-100%) translateY(-100%) rotate(45deg);
            }
            50% {
              transform: translateX(0%) translateY(0%) rotate(45deg);
            }
            100% {
              transform: translateX(100%) translateY(100%) rotate(45deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default LogoSeal;