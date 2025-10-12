import React, { useEffect, useRef, useState } from 'react';
import { useToast } from './ui/ToastProvider';

// Small global voice command listener. User must enable it explicitly.
export default function VoiceCommandListener() {
  const toast = useToast();
  const [enabled, setEnabled] = useState(false);
  const recognitionRef = useRef<any | null>(null);

  useEffect(() => {
    // Feature-detect
    const Win: any = window as any;
    const SpeechRecognition = Win.SpeechRecognition || Win.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = true;

  recognition.onresult = (event: any) => {
      try {
        const transcript = Array.from(event.results)
          .map((r: any) => r[0].transcript)
          .join('')
          .toLowerCase()
          .trim();

        // Check for the user phrase(s)
        const matchPhrases = [
          'run report for this week',
          'run weekly report',
          'generate weekly report',
          'run this week report',
        ];

        for (const phrase of matchPhrases) {
          if (transcript.includes(phrase)) {
            // Dispatch a simple global event that other parts of the app can listen to
            window.dispatchEvent(new CustomEvent('voice:run-weekly-report', { detail: { transcript } }));
            toast.push(<span>Voice command recognized: <strong>{phrase}</strong>. Running weekly report...</span>);
            break;
          }
        }
      } catch (err) {
        // swallow
        console.warn('VoiceCommandListener:onresult', err);
      }
    };

    recognition.onerror = (err: any) => {
      console.warn('Speech recognition error', err);
    };

    recognition.onend = () => {
      // Auto-restart when enabled
      if (enabled) {
        try {
          recognition.start();
        } catch (e) {
          // ignore
        }
      }
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.stop();
      } catch (e) {}
      recognitionRef.current = null;
    };
  }, []); // only run once

  useEffect(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (enabled) {
      try {
        recognition.start();
        toast.push('Voice commands enabled');
      } catch (e) {
        toast.push('Unable to start voice commands. Please check microphone permissions.');
      }
    } else {
      try {
        recognition.stop();
        toast.push('Voice commands disabled');
      } catch (e) {
        // ignore
      }
    }
  }, [enabled]);

  // Simple control UI in bottom-left
  return (
    <div className="fixed left-4 bottom-20 z-50">
      <div className="bg-white/90 backdrop-blur-sm border rounded-lg shadow px-3 py-2 flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            aria-label="Enable voice commands"
          />
          Enable Voice Commands
        </label>
      </div>
    </div>
  );
}
