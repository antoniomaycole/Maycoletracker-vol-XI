import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Users, Eye, Activity } from 'lucide-react';

export interface UsageStats {
  visitsToday: number;
  activeUsers: number;
  totalUsers: number;
}

interface UsageMonitorProps {
  stats?: UsageStats;
  live?: boolean; // simulate small real-time updates when true
}

export default function UsageMonitor({ stats, live = false }: UsageMonitorProps) {
  const initial: UsageStats = stats ?? { visitsToday: 124, activeUsers: 7, totalUsers: 1340 };
  const [state, setState] = useState<UsageStats>(initial);

  useEffect(() => {
    if (!live) return;
    const t = setInterval(() => {
      setState(prev => ({
        visitsToday: prev.visitsToday + Math.floor(Math.random() * 5),
        activeUsers: Math.max(1, prev.activeUsers + (Math.random() > 0.6 ? 1 : -1)),
        totalUsers: prev.totalUsers + (Math.random() > 0.9 ? 1 : 0),
      }));
    }, 3000);
    return () => clearInterval(t);
  }, [live]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">{<Activity className="w-5 h-5" />} Usage Monitor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 bg-gray-50 rounded">
            <div className="text-xs text-muted-foreground">Visits Today</div>
            <div className="text-lg font-semibold">{state.visitsToday.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1"><Eye className="w-4 h-4" /> live</div>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <div className="text-xs text-muted-foreground">Active Users</div>
            <div className="text-lg font-semibold">{state.activeUsers}</div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1"><Users className="w-4 h-4" /> now</div>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <div className="text-xs text-muted-foreground">Total Users</div>
            <div className="text-lg font-semibold">{state.totalUsers.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">accounts</div>
          </div>
        </div>

        <div className="mt-3 flex justify-between">
          <div className="text-xs text-muted-foreground">Updated: {new Date().toLocaleTimeString()}</div>
          <div>
            <Button size="sm" variant="ghost" onClick={() => setState(initial)}>Reset</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
