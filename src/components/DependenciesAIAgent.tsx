import React, { useEffect, useState } from 'react';
import { useAgentBus } from '../contexts/AgentBusContext';
import { useToast } from './ui/ToastProvider';

type DepReport = { name: string; version: string; issue?: string };

function analyzeDeps(pkg: any): DepReport[] {
  const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
  const results: DepReport[] = [];
  Object.keys(deps).forEach((name) => {
    const v = deps[name];
    const r: DepReport = { name, version: v };
    if (typeof v === 'string') {
      if (v.includes('^') || v.includes('~')) {
        // older semver ranges flagged for review
        r.issue = 'Pinned to range; review for latest stable versions';
      }
      if (v.match(/0\./)) {
        r.issue = (r.issue ? r.issue + ' | ' : '') + 'Major version 0 (pre-stable)';
      }
      if (name.toLowerCase().includes('supabase') || name.toLowerCase().includes('bubble')) {
        r.issue = (r.issue ? r.issue + ' | ' : '') + 'Known compatibility risk (requires manual review)';
      }
    }
    results.push(r);
  });
  return results;
}

export default function DependenciesAIAgent() {
  const bus = useAgentBus();
  const toast = useToast();
  const [lastReport, setLastReport] = useState<{ timestamp?: string; items?: DepReport[] }>({});

  const runScan = async () => {
    try {
      const pkg = await fetch('/package.json').then((r) => r.json()).catch(() => null);
      if (!pkg) {
        toast.push('Unable to load package.json via fetch');
        return;
      }
      const findings = analyzeDeps(pkg);
      const report = { timestamp: new Date().toISOString(), items: findings };
      setLastReport(report);
      bus.publish('dependencies:bonding-report', report);
      toast.push('Dependencies AI: bonding report published');
    } catch (err) {
      console.warn('DependenciesAIAgent error', err);
      toast.push('Dependencies AI scan failed');
    }
  };

  useEffect(() => {
    const unsub = bus.subscribe('request:dependency-scan', () => runScan());
    return () => unsub();
  }, [bus]);

  return (
    <div className="fixed right-4 bottom-28 z-40">
      <div className="bg-white/90 border rounded-lg p-2 shadow-sm">
        <button onClick={runScan} className="text-sm text-slate-700 px-3 py-1 rounded-md hover:bg-slate-100">
          Run Dependency Bonding Scan
        </button>
      </div>
    </div>
  );
}
