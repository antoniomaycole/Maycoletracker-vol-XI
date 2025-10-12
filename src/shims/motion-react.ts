// Lightweight shim to satisfy imports expecting 'motion/react'.
// Re-export the primary framer-motion exports used across the codebase.
// Single re-export keeps types and runtime aligned without duplicate identifiers.
export { motion, AnimatePresence } from 'framer-motion';
