import React from 'react'

// Consolidated icon shim that re-exports lucide-react when available
// and provides small neutral fallbacks for historical icon names used
// throughout the codebase (Star, Crown, Target, Award, Volume2, etc.)

type SvgProps = React.SVGProps<SVGSVGElement>

// Attempt to import a few icons from lucide-react. If the installed
// lucide-react package provides these names the import will be used by
// bundler optimization; otherwise our fallbacks below will be used.
let LucideStar: React.FC<SvgProps> | null = null
let LucideCrown: React.FC<SvgProps> | null = null
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, no-eval
  const lucide = require('lucide-react')
  LucideStar = lucide?.Star ?? null
  LucideCrown = lucide?.Crown ?? null
} catch (e) {
  // ignore — we'll use fallbacks
}

export const Star: React.FC<SvgProps> = (props) => {
  if (LucideStar) return <LucideStar {...props} />
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 .587l3.668 7.431L24 9.748l-6 5.848L19.335 24 12 20.201 4.665 24 6 15.596 0 9.748l8.332-1.73L12 .587z" />
    </svg>
  )
}

export const Crown: React.FC<SvgProps> = (props) => {
  if (LucideCrown) return <LucideCrown {...props} />
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M2 20h20v2H2v-2zm2-8l4.5 4 4.5-10 4.5 10L20 12V6l-4 3-4-6-4 6L4 6v6z" />
    </svg>
  )
}

export const Target: React.FC<SvgProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="2" />
  </svg>
)

export const Award: React.FC<SvgProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="8" r="4" />
    <path d="M8 21v-3l4-2 4 2v3" />
  </svg>
)

export const Volume2: React.FC<SvgProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19 8a4 4 0 0 1 0 8" />
  </svg>
)

// Convenience re-exports for legacy names used across the app
export const Drill: React.FC<SvgProps> = (props) => <Target {...props} />
export const Microchip: React.FC<SvgProps> = (props) => <Target {...props} />
export const Bolt: React.FC<SvgProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

export const Trophy: React.FC<SvgProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M6 3v2a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V3H6zM8 21h8v-2H8v2z" />
  </svg>
)

export default {}
