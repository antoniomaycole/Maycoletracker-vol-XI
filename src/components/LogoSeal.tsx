// NOTE: Previously this file used a STAGED-MIGRATION marker and ts-nocheck
// to temporarily bypass TypeScript issues originating from mismatched
// framer-motion/react types. The goal here is to keep the runtime behavior
// unchanged while providing a narrow, explicit typing surface so we can
// remove the suppressed checks.
import React, { FC, KeyboardEvent } from 'react';
import { useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

// Lightweight prop type for the MotionDiv wrapper. We avoid importing
// framer-motion's HTMLMotionProps directly to reduce heavy type resolution
// in this large legacy repo — the wrapper keeps the runtime behavior but
// limits TypeScript surface area.
type DivProps = React.ComponentPropsWithoutRef<'div'> & {
  initial?: unknown
  animate?: unknown
  whileHover?: unknown
  whileTap?: unknown
  transition?: unknown
}

const MotionDiv: React.FC<DivProps> = ({ children, ...rest }) => {
  // Cast to unknown then any for the createElement call to avoid fragile
  // JSX intrinsic typing with motion.div while keeping the runtime value.
  return React.createElement(motion.div as unknown as any, rest, children);
};
import MaycoleTrackerIconButton from './MaycoleTrackerIconButton';

/**
 * LogoSeal.tsx
 * Production-Ready Landing Page and Router Seal.
 * - Uses BrowserRouter for standard local development compatibility.
 * - Implements constant-based routing for maintainability.
 */

// Enterprise Route Constants: Eliminates 'magic strings' in the application logic.
const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
};

// Use the canonical, production-grade MaycoleTrackerIconButton component
// This ensures the exact brand SVG (gradients, starry dots, document box) is used
// and that attributes like data-testid and aria-* are preserved in builds.


// The core visual component, acting as the app's launch button
const LandingPage: FC = () => {
  const navigate = useNavigate();

  const launchApp = () => {
    // Navigates using the defined constant
    navigate(ROUTES.DASHBOARD);
  }

  // Handles 'Enter' or 'Space' key presses for accessibility
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      launchApp();
    }
  }

  // The glare/shimmer is implemented via a CSS class (.logo-glare) defined below.

  return (
    // Reverted to a single root div: the most stable structure.
    <div
      // Added 'transition duration-150' for smooth focus ring animation
      className="flex flex-col items-center justify-center h-screen w-screen bg-white cursor-pointer select-none gap-8 p-8 relative overflow-hidden focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-8 focus:ring-offset-white transition duration-150"
      role="button"
      aria-label="Launch MaycoleTracker vol. XI"
      tabIndex={0}
      onClick={launchApp}
      onKeyDown={handleKeyDown}
      data-bond="maycole:container:v1"
    >
      {/* BRAND UNIT - Contains Logo Icon and Text */}
      <div 
        className="flex items-center justify-center gap-4 transition-transform duration-300 ease-out scale-100"
        data-bond="maycole:brand-unit:v1" 
        data-audit="sealed" 
      >
        {/* Icon Button Wrapper - Decorative/Visual */}
          <MotionDiv
          className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 border-2 border-white/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-lg shadow-blue-500/30 text-white"
          aria-hidden="true"
          tabIndex={-1}
          role="presentation"
          onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
          initial={{ y: -4, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ y: -6, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 220, damping: 20 }}
          data-testid="brand-icon-wrapper"
          >
            {/* Use MaycoleTrackerIconButton so production bundles contain the real SVG */}
            <MaycoleTrackerIconButton size={40} className="maycole-brand-icon" data-testid="brand-icon" aria-hidden="true" />
          </MotionDiv>

        {/* Brand Title Text */}
        <div className="text-left min-w-[220px]" data-testid="brand-title">
          <h1 className="text-4xl sm:text-5xl font-extrabold m-0 text-blue-600 drop-shadow-sm leading-tight font-sans" aria-label="MaycoleTracker trademarked product name">
            MaycoleTracker
            <span className="align-super ml-1 opacity-80 text-xs" aria-hidden="true">
              ™
            </span>
          </h1>
          <h2 className="text-base sm:text-xl font-semibold mt-1 text-gray-500 font-sans">vol. XI - Enterprise Edition</h2>
        </div>
      </div>

      {/* KINETIC LOGO - Visual Seal */}
      <div
        className="w-52 h-52 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center relative overflow-hidden cursor-pointer focus:outline-none transition-all duration-300 translate-y-0 scale-100 shadow-xl shadow-blue-500/30"
        onClick={(e) => {
          e.stopPropagation();
          launchApp();
        }}
      >
        {/* SVG Logo Mark */}
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
          <circle cx="60" cy="60" r="55" fill="white" opacity="0.95" />
          <path d="M60 20V100M20 60H100" stroke="#007BFF" strokeWidth="8" strokeLinecap="round" />
          <rect x="45" y="45" width="30" height="30" rx="3" fill="white" stroke="#007BFF" strokeWidth="2" />
          <path d="M60 52V68M52 60H68" stroke="#007BFF" strokeWidth="2" strokeLinecap="round" />
          <circle cx="30" cy="30" r="2" fill="white" opacity="0.9" />
          <circle cx="90" cy="35" r="2.5" fill="white" opacity="0.8" />
          <circle cx="25" cy="85" r="2" fill="white" opacity="0.7" />
          <circle cx="95" cy="90" r="3" fill="white" opacity="0.85" />
          <circle cx="35" cy="75" r="1.5" fill="white" opacity="0.6" />
          <circle cx="85" cy="25" r="2" fill="white" opacity="0.75" />
          <circle cx="75" cy="85" r="2.5" fill="white" opacity="0.8" />
          <circle cx="40" cy="40" r="1" fill="white" opacity="0.9" />
        </svg>

        {/* Inner Seal Text */}
        <div className="absolute w-[78%] h-[78%] rounded-xl bg-white/10 flex items-center justify-center text-white font-bold tracking-wider text-base text-center p-2">MAYCOLE</div>

        {/* Glare/Shine Effect Element */}
        <div className="logo-glare" aria-hidden="true" />
      </div>

      {/* SYSTEM LABEL */}
      <div className="text-center mt-4">
        <h3 className="text-xl font-semibold m-0 text-gray-500 font-sans">Inventory Management System</h3>
      </div>

      {/* Global animations are defined in `src/styles/globals.css` - no inline styles to keep bundle clean */}
    </div>
  )
}


// The main App component containing the router
// Minimal, production-ready dashboard component (expandable)
const Dashboard: FC = () => {
  return (
    <main className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <section className="max-w-4xl w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome to MaycoleTracker Enterprise Dashboard.</p>
      </section>
    </main>
  );
};

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<LandingPage />} />
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
