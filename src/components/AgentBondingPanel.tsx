import React, { useEffect, useState } from 'react';
import { listAgents, bondAgent, removeAgent } from '../lib/agentBonding';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

export default function AgentBondingPanel() {
  const [agents, setAgents] = useState(listAgents());
  const [name, setName] = useState('');
  const [purpose, setPurpose] = useState('');

  useEffect(() => {
    setAgents(listAgents());
  }, []);

  const handleBond = () => {
    if (!name) return alert('Provide agent name');
    const newAgent = bondAgent({ name, purpose });
    setAgents(listAgents());
    setName(''); setPurpose('');
    alert(`Bonded agent ${newAgent.name}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Agent Bonding</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Agent name" className="p-2 border rounded" />
            <input value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="Purpose (optional)" className="p-2 border rounded" />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleBond}>Bond Agent</Button>
            <Button variant="outline" onClick={() => { setName(''); setPurpose(''); }}>Reset</Button>
          </div>

          <div className="mt-3">
            <h4 className="font-medium">Bonded Agents</h4>
            <div className="space-y-2">
              {agents.map(a => (
                <div key={a.id} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <div className="font-medium">{a.name}</div>
                    <div className="text-sm text-muted-foreground">{a.purpose}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => { removeAgent(a.id); setAgents(listAgents()); }}>Unbond</Button>
                  </div>
                </div>
              ))}
              {agents.length === 0 && <div className="text-sm text-muted-foreground">No agents bonded yet.</div>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
