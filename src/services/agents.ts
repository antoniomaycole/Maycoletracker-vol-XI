// Safe feature-detection stubs for analytics, agents, voice and camera.
export function enableAnalytics(key?: string) {
  if (typeof window === 'undefined') return false;
  // Placeholder: wire to analytics provider in production (e.g., Segment, GA4)
  // For now, we expose a boolean indicating analytics is enabled when a key is present.
  return Boolean(key);
}

export function enableAgents() {
  // Placeholder for background agent orchestration. Returns true when available.
  return typeof window !== 'undefined';
}

export async function enableVoiceCommands(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  // Basic check for Web Speech API
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
  return Boolean(SpeechRecognition);
}

export async function requestCameraStream(constraints?: MediaStreamConstraints): Promise<MediaStream | null> {
  if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return null;
  try {
    return await navigator.mediaDevices.getUserMedia(constraints || { video: true });
  } catch (err) {
    console.warn('requestCameraStream denied or unavailable', err);
    return null;
  }
}
