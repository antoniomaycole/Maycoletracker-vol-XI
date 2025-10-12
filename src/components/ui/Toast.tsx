import React from 'react';

type ToastProps = {
  id: string;
  message: React.ReactNode;
  onClose: (id: string) => void;
};

export default function Toast({ id, message, onClose }: ToastProps) {
  return (
    <div className="fixed right-4 bottom-4 z-50 pointer-events-auto max-w-xs">
      <div className="bg-slate-900 text-white px-4 py-3 rounded shadow-lg">
        <div className="flex items-start gap-3">
          <div className="flex-1">{message}</div>
          <button aria-label="close" onClick={() => onClose(id)} className="ml-2 text-sm opacity-80 hover:opacity-100">✕</button>
        </div>
      </div>
    </div>
  );
}
