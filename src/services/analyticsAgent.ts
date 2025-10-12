import { ReportAggregate } from '../lib/reports';

export function summarizeReport(aggregates: ReportAggregate[], industryName?: string): string {
  if (!aggregates || aggregates.length === 0) return `No data available for ${industryName || 'selected industry'}.`;
  const lines: string[] = [];
  lines.push(`Inventory report for ${industryName || 'selected industry'}:`);
  for (const a of aggregates) {
    const value = typeof a.totalValue === 'number' ? `, total value ${a.totalValue.toFixed(2)} USD` : '';
    lines.push(`- ${a.period}: ${a.totalItems} items${value}`);
  }
  const totalItems = aggregates.reduce((s, x) => s + (x.totalItems || 0), 0);
  lines.push(`Summary: ${totalItems} items across ${aggregates.length} periods.`);
  return lines.join('\n');
}

export async function speakText(text: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  // Basic TTS using SpeechSynthesis API
  try {
    const synth = window.speechSynthesis;
    if (!synth) return false;
    const utter = new SpeechSynthesisUtterance(text);
    synth.cancel();
    synth.speak(utter);
    return true;
  } catch (err) {
    console.warn('speakText failed', err);
    return false;
  }
}

export function downloadTextFile(filename: string, text: string) {
  if (typeof document === 'undefined') return false;
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  return true;
}
