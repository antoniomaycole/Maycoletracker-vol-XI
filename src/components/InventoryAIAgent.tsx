import React, { useEffect, useState } from 'react';
import { useAgentBus } from '../contexts/AgentBusContext';
import { useToast } from './ui/ToastProvider';
import inventoryLib, { InventoryItem } from '../lib/inventoryTools';

// Small NLP summarizer for inventory data (deterministic, rule-based)
function summarizeInventory(items: InventoryItem[]) {
  const totalItems = items.length;
  const totalQuantity = items.reduce((s, it) => s + (it.quantity || 0), 0);
  const lowStock = items.filter((it) => it.quantity <= 10).slice(0, 6);
  const topFive = [...items].sort((a, b) => b.quantity - a.quantity).slice(0, 5);

  const sentences: string[] = [];
  sentences.push(`Inventory contains ${totalItems} distinct items with a total quantity of ${totalQuantity}.`);
  if (lowStock.length > 0) {
    sentences.push(`Low stock alert: ${lowStock.map((i) => i.name).join(', ')} are critically low.`);
  } else {
    sentences.push('No critical low-stock items detected.');
  }
  sentences.push(`Top stocked items: ${topFive.map((t) => `${t.name} (${t.quantity})`).join(', ')}.`);

  return sentences.join(' ');
}

export default function InventoryAIAgent() {
  const bus = useAgentBus();
  const toast = useToast();
  const [items] = useState<InventoryItem[]>(() => inventoryLib.seedGovernmentSample(12));

  const produceAndPublish = (reason = 'manual') => {
    try {
      const summary = summarizeInventory(items);
      // publish summary on the bus
      bus.publish('inventory:summary-generated', { summary, items, reason, timestamp: new Date().toISOString() });
      // speak and toast
      try {
        const u = new SpeechSynthesisUtterance(summary);
        speechSynthesis.speak(u);
      } catch (e) {
        // ignore speech failures
      }
      toast.push(<div><strong>Inventory AI:</strong> Inventory summary generated ({reason}).</div>);
    } catch (err) {
      console.warn('InventoryAIAgent produce error', err);
    }
  };

  useEffect(() => {
    // Respond to weekly report requests and reports being generated
    const unsub1 = bus.subscribe('request:weekly-report', () => produceAndPublish('request:weekly-report'));
    const unsub2 = bus.subscribe('reports:weekly-generated', () => produceAndPublish('reports:weekly-generated'));

    return () => {
      unsub1();
      unsub2();
    };
  }, [bus]);

  // expose a small, non-intrusive UI anchor in bottom-left to run manually
  return (
    <div className="fixed left-4 bottom-32 z-40">
      <div className="bg-white/90 border rounded-lg p-2 shadow-sm">
        <button
          onClick={() => produceAndPublish('manual')}
          className="text-sm text-slate-700 px-3 py-1 rounded-md hover:bg-slate-100"
        >
          Run Inventory AI Summary
        </button>
      </div>
    </div>
  );
}
