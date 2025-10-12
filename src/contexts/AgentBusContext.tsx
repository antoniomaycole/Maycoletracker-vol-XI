import React, { createContext, useContext, useRef, useEffect } from 'react';

type Handler = (payload?: any) => void;

class AgentBus {
  private handlers: Map<string, Set<Handler>> = new Map();

  publish(topic: string, payload?: any) {
    const set = this.handlers.get(topic);
    if (!set) return;
    for (const h of Array.from(set)) {
      try { h(payload); } catch (e) { console.warn('AgentBus handler error', e); }
    }
  }

  subscribe(topic: string, handler: Handler) {
    let set = this.handlers.get(topic);
    if (!set) {
      set = new Set();
      this.handlers.set(topic, set);
    }
    set.add(handler);
    return () => { if (set) { set.delete(handler); } };
  }
}

const ctx = createContext<AgentBus | null>(null);

export function useAgentBus() {
  const a = useContext(ctx);
  if (!a) throw new Error('useAgentBus must be used within AgentBusProvider');
  return a;
}

export function AgentBusProvider({ children }: { children: React.ReactNode }) {
  const busRef = useRef<AgentBus | null>(null);
  if (!busRef.current) busRef.current = new AgentBus();

  return (
    <ctx.Provider value={busRef.current}>
      {children}
    </ctx.Provider>
  );
}

// convenience hook for subscribing inside components
export function useAgentEvent(topic: string, handler: Handler) {
  const bus = useAgentBus();
  useEffect(() => {
    const unsub = bus.subscribe(topic, handler);
    return () => unsub();
  }, [topic, handler, bus]);
}
