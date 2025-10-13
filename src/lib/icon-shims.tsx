import React from 'react';

// Small fallback icon components used when the installed lucide-react
// version doesn't include certain historical icon names used across the
// codebase. These are intentionally minimal and visually neutral so
// they don't alter the canonical brand artwork.

type SvgProps = React.SVGProps<SVGSVGElement>;

export const Crown: React.FC<SvgProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="10" />
  </svg>
);

export const Target: React.FC<SvgProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export const Activity: React.FC<SvgProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

export const Volume2: React.FC<SvgProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19 8a4 4 0 0 1 0 8" />
  </svg>
);

export const Award: React.FC<SvgProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="8" r="4" />
    <path d="M8 21v-3l4-2 4 2v3" />
  </svg>
);

export const ActivityCircle: React.FC<SvgProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="10" />
  </svg>
);

// Export other common historical names as neutral fallbacks
export const Drill: React.FC<SvgProps> = (props) => <Crown {...props} />;
export const Microchip: React.FC<SvgProps> = (props) => <Target {...props} />;
export const Bolt: React.FC<SvgProps> = (props) => <Activity {...props} />;
export const VolumeX: React.FC<SvgProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
  </svg>
);

export default {};
