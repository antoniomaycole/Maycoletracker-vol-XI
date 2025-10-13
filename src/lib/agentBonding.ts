// Lightweight Bonding AI Agents module

export interface AgentProfile {
  id: string;
  name: string;
  purpose?: string;
  bondedAt?: number;
}

const AGENT_KEY = 'MAYCOLE_AGENTS';

export function listAgents(): AgentProfile[] {
  try {
    const raw = localStorage.getItem(AGENT_KEY) || '[]';
    return JSON.parse(raw) as AgentProfile[];
  } catch (e) {
    console.warn('Failed to read agents', e);
    return [];
  }
}

export function bondAgent(profile: Omit<AgentProfile, 'id' | 'bondedAt'>): AgentProfile {
  const agents = listAgents();
  const newAgent: AgentProfile = { id: Date.now().toString(), ...profile, bondedAt: Date.now() };
  agents.push(newAgent);
  try { localStorage.setItem(AGENT_KEY, JSON.stringify(agents)); } catch (e) { console.warn(e); }
  return newAgent;
}

export function removeAgent(id: string) {
  const agents = listAgents().filter(a => a.id !== id);
  try { localStorage.setItem(AGENT_KEY, JSON.stringify(agents)); } catch (e) { console.warn(e); }
}
