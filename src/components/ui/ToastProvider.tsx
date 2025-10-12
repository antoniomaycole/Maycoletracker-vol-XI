import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from './Toast';

type ToastRecord = { id: string; message: React.ReactNode };

const ToastContext = createContext<{
  push: (message: React.ReactNode, ttl?: number) => void;
} | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);

  const push = useCallback((message: React.ReactNode, ttl = 4000) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), ttl);
  }, []);

  const remove = useCallback((id: string) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      {toasts.map((t) => (
        <Toast key={t.id} id={t.id} message={t.message} onClose={remove} />
      ))}
    </ToastContext.Provider>
  );
}
