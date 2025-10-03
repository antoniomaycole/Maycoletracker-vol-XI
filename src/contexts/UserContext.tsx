/**
 * MaycoleTracker™ vol. XI - BULLETPROOF User Context
 * ✅ Simple, reliable, no complex features that can break
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';

// ✅ SIMPLE USER INTERFACE
export interface User {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
  subscription: {
    tier: 'free' | 'professional' | 'enterprise';
    status: 'active' | 'trial' | 'expired';
  };
}

// ✅ SIMPLE CONTEXT INTERFACE
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isPremium: () => boolean;
  hasFeature: (feature: string) => boolean;
  logUsage: (data: any) => void;
}

// ✅ SIMPLE DEFAULT VALUES
const defaultUser: User = {
  id: 'demo-user',
  email: 'demo@maycoletracker.com',
  name: 'Demo User',
  isPremium: false,
  subscription: {
    tier: 'free',
    status: 'active'
  }
};

// ✅ CREATE CONTEXT
const UserContext = createContext<UserContextType | undefined>(undefined);

// ✅ SIMPLE PROVIDER
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(defaultUser);

  const isPremium = () => {
    return user?.isPremium || user?.subscription?.tier !== 'free';
  };

  const hasFeature = (feature: string) => {
    if (!user) return false;
    if (isPremium()) return true;
    
    // Free tier features
    const freeFeatures = ['basic_inventory', 'basic_analytics'];
    return freeFeatures.includes(feature);
  };

  const logUsage = (data: any) => {
    console.log('📊 Usage logged:', data);
  };

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      isPremium,
      hasFeature,
      logUsage
    }}>
      {children}
    </UserContext.Provider>
  );
}

// ✅ SIMPLE HOOK
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}