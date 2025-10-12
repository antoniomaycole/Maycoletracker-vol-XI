// Auto-generated shims to reduce TypeScript noise during triage
// Purpose: declare missing modules and provide minimal domain typings

declare module 'motion/react' {
  import * as React from 'react';
  export const motion: any;
  export const AnimatePresence: any;
  export default motion;
}

declare module 'recharts' {
  // Provide loose named exports commonly used in the codebase to reduce TS noise.
  export const AreaChart: any;
  export const Area: any;
  export const LineChart: any;
  export const Line: any;
  export const BarChart: any;
  export const Bar: any;
  export const PieChart: any;
  export const Pie: any;
  export const Cell: any;
  export const XAxis: any;
  export const YAxis: any;
  export const CartesianGrid: any;
  export const Tooltip: any;
  export const ResponsiveContainer: any;
  export const Legend: any;
  const _default: any;
  export default _default;
}

declare module 'sonner' {
  export const toast: any;
  export const Toaster: any;
  export type ToasterProps = any;
}

declare module 'embla-carousel-react' { export type UseEmblaCarouselType = any; const a:any; export default a }
declare module 'react-day-picker' { export const DayPicker: any; export default any }
declare module 'cmdk' { export const Command: any; export default any }
declare module 'vaul' { export const Drawer: any; export default any }
declare module 'input-otp' { export const OTPInput: any; export const OTPInputContext: any; export default any }
declare module 'react-resizable-panels' { const a:any; export = a }
declare module '@radix-ui/react-tooltip' { const a:any; export = a }
declare module 'react-hook-form' {
  export const Controller: any;
  export const FormProvider: any;
  export const useFormContext: any;
  export const useFormState: any;
  export type ControllerProps = any;
  export type FieldPath = any;
  export type FieldValues = any;
}
declare module 'next-themes' { export const useTheme: any; export default any }

// Fallback for many small UI libs used without types
declare module '*';

// Minimal domain types used across components to reduce property-not-found noise
interface RecoveryStats {
  totalRecoveries?: number;
  successfulRecoveries?: number;
  failedRecoveries?: number;
  averageRecoveryTime?: number;
}

interface RecoveryReport {
  id?: string;
  nextMaintenanceDate?: string | number;
  confidenceScore?: number;
  recoveryStats?: RecoveryStats;
  uptime?: string | number;
  recommendations?: string[];
}

interface UsageStats {
  itemsUsed?: number;
  itemsLimit?: number;
  apiCallsUsed?: number;
  apiCallsLimit?: number;
  storageUsed?: number;
  storageLimit?: number;
}

interface SubscriptionInfo {
  tier?: 'enterprise' | 'free' | 'professional';
  status?: 'active' | 'expired' | 'trial';
  monthlyPrice?: number;
  features?: string[];
}

interface User {
  id?: string;
  createdAt?: string | number;
  usage?: UsageStats;
  subscription?: SubscriptionInfo;
}

interface UserContextType {
  loading?: boolean;
  isEnterprise?: boolean;
  getRemainingTrialDays?: () => number;
  upgradeToPremium?: () => void;
  upgradeToEnterprise?: () => void;
  cancelSubscription?: () => void;
  logout?: () => void;
}

// Generic helper to allow indexing with dynamic keys in some legacy code
type LooseObject = { [k: string]: any };
