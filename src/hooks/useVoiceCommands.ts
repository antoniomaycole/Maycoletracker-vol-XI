import { useEffect } from 'react';

export default function useVoiceCommands(enabled = false) {
  useEffect(() => {
    if (!enabled) return;
    // Placeholder: wire Web Speech API or other provider here.
    let mounted = true;
    console.debug('Voice commands enabled (scaffold)');
    return () => { mounted = false; };
  }, [enabled]);
}
