let audioContext: AudioContext | null = null;

export type SoundType = 'complete' | 'bell' | 'chime' | 'digital' | 'soft' | 'none';

export const SOUND_OPTIONS = [
  { value: 'complete' as SoundType, label: 'Classique', description: 'Ton descendant doux' },
  { value: 'bell' as SoundType, label: 'Cloche', description: 'Sonnerie claire' },
  { value: 'chime' as SoundType, label: 'Carillon', description: 'Notes harmonieuses' },
  { value: 'digital' as SoundType, label: 'Digital', description: 'Bip électronique' },
  { value: 'soft' as SoundType, label: 'Doux', description: 'Notification subtile' },
  { value: 'none' as SoundType, label: 'Aucun', description: 'Mode silencieux' },
];

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

export function getSelectedSound(): SoundType {
  if (typeof window === 'undefined') return 'complete';
  return (localStorage.getItem('timerSound') as SoundType) || 'complete';
}

export function playSound(type: SoundType = 'complete') {
  if (type === 'none') return;

  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    switch (type) {
      case 'complete':
        playComplete(ctx, now);
        break;
      case 'bell':
        playBell(ctx, now);
        break;
      case 'chime':
        playChime(ctx, now);
        break;
      case 'digital':
        playDigital(ctx, now);
        break;
      case 'soft':
        playSoft(ctx, now);
        break;
    }
  } catch (error) {
    console.error('Error playing sound:', error);
  }
}

function playComplete(ctx: AudioContext, now: number) {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.frequency.setValueAtTime(800, now);
  oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.3);
  gainNode.gain.setValueAtTime(0.3, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

  oscillator.start(now);
  oscillator.stop(now + 0.3);
}

function playBell(ctx: AudioContext, now: number) {
  const frequencies = [800, 1000, 1200];

  frequencies.forEach((freq, i) => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(freq, now);
    gainNode.gain.setValueAtTime(0.15, now + i * 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.8);

    oscillator.start(now + i * 0.1);
    oscillator.stop(now + i * 0.1 + 0.8);
  });
}

function playChime(ctx: AudioContext, now: number) {
  const notes = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C (octave)

  notes.forEach((freq, i) => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'sine';
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(freq, now);
    gainNode.gain.setValueAtTime(0.2, now + i * 0.15);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + i * 0.15 + 0.5);

    oscillator.start(now + i * 0.15);
    oscillator.stop(now + i * 0.15 + 0.5);
  });
}

function playDigital(ctx: AudioContext, now: number) {
  for (let i = 0; i < 3; i++) {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'square';
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(1000, now);
    gainNode.gain.setValueAtTime(0.1, now + i * 0.2);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + i * 0.2 + 0.1);

    oscillator.start(now + i * 0.2);
    oscillator.stop(now + i * 0.2 + 0.1);
  }
}

function playSoft(ctx: AudioContext, now: number) {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = 'sine';
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.frequency.setValueAtTime(600, now);
  oscillator.frequency.exponentialRampToValueAtTime(500, now + 0.4);
  gainNode.gain.setValueAtTime(0.15, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

  oscillator.start(now);
  oscillator.stop(now + 0.4);
}
