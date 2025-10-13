// Small typing shims to ease gradual migration for third-party type mismatches
// These intentionally use permissive `any` in a few spots to reduce noise during incremental typing work.

// Recharts: export a couple of commonly used types as any to avoid package version typing differences
import { motion, MotionProps } from 'framer-motion';
import * as React from 'react';

// Minimal Recharts payload item used by legend/tooltip formatters
export type RechartsPayloadItem = {
	dataKey?: string | number;
	name?: string;
	value?: any;
	payload?: Record<string, any>;
};

// Minimal legend props that the codebase uses (permissive optional fields)
export type RechartsLegendProps = {
	payload?: RechartsPayloadItem[];
	onClick?: (entry: RechartsPayloadItem, index?: number) => void;
} & Record<string, any>;

// MotionDiv: typed wrapper for motion.div that accepts normal div props plus MotionProps
export const MotionDiv: React.ForwardRefExoticComponent<
	React.HTMLAttributes<HTMLDivElement> & MotionProps & React.RefAttributes<HTMLDivElement>
> = motion.div as any;

// Helper to cast third-party props when necessary (use sparingly)
export const asAny = (v: unknown) => v as any;
