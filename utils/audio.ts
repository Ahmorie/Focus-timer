let audioContext: AudioContext | null = null;

export type SoundType = 'complete' | 'bell' | 'chime' | 'digital' | 'soft' | 'none';

export const SOUND_OPTIONS = [
  { value: 'complete' as SoundType, label: 'Classic', description: 'Gentle descending tone' },
  { value: 'bell' as SoundType, label: 'Bell', description: 'Clear chime' },
  { value: 'chime' as SoundType, label: 'Chime', description: 'Harmonious notes' },
  { value: 'digital' as SoundType, label: 'Digital', description: 'Electronic beep' },
  { value: 'soft' as SoundType, label: 'Soft', description: 'Subtle notification' },
  { value: 'none' as SoundType, label: 'None', description: 'Silent mode' },
];

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

export function initAudioContext() {
  if (typeof window === 'undefined') return;
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
}

export function getSelectedSound(): SoundType {
  if (typeof window === 'undefined') return 'complete';
  return (localStorage.getItem('timerSound') as SoundType) || 'complete';
}

export function getVolume(): number {
  if (typeof window === 'undefined') return 0.3;
  const saved = localStorage.getItem('timerVolume');
  return saved ? parseFloat(saved) : 0.3;
}

export function setVolume(volume: number) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('timerVolume', volume.toString());
}

export function playSound(type: SoundType = 'complete', onError?: (error: Error) => void) {
  if (type === 'none') return;

  try {
    const ctx = getAudioContext();

    // Resume AudioContext if suspended (for background tab compatibility)
    if (ctx.state === 'suspended') {
      ctx.resume().catch((err) => {
        if (onError) {
          onError(new Error('Audio playback blocked. Please interact with the page first.'));
        }
      });
    }

    const now = ctx.currentTime;
    const volume = getVolume();

    switch (type) {
      case 'complete':
        playComplete(ctx, now, volume);
        break;
      case 'bell':
        playBell(ctx, now, volume);
        break;
      case 'chime':
        playChime(ctx, now, volume);
        break;
      case 'digital':
        playDigital(ctx, now, volume);
        break;
      case 'soft':
        playSoft(ctx, now, volume);
        break;
    }
  } catch (error) {
    console.error('Error playing sound:', error);
    if (onError && error instanceof Error) {
      onError(error);
    }
  }
}

function playComplete(ctx: AudioContext, now: number, volume: number) {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.frequency.setValueAtTime(800, now);
  oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.3);
  gainNode.gain.setValueAtTime(volume, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

  oscillator.start(now);
  oscillator.stop(now + 0.3);
}

function playBell(ctx: AudioContext, now: number, volume: number) {
  // Create a more realistic mechanical bell sound with harmonics
  const fundamental = 400;
  const harmonics = [1, 2, 3, 4.2, 5.4]; // Non-integer harmonics create metallic quality

  harmonics.forEach((harmonic, i) => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'sine';
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    const freq = fundamental * harmonic;
    oscillator.frequency.setValueAtTime(freq, now);

    // Each harmonic has different amplitude and decay
    const amplitude = volume * (1 / (harmonic * 1.5));
    const decay = 1.2 + (i * 0.2);

    gainNode.gain.setValueAtTime(amplitude, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + decay);

    oscillator.start(now);
    oscillator.stop(now + decay);
  });

  // Add a short "striker" click at the beginning
  const clickOsc = ctx.createOscillator();
  const clickGain = ctx.createGain();
  clickOsc.type = 'triangle';
  clickOsc.connect(clickGain);
  clickGain.connect(ctx.destination);

  clickOsc.frequency.setValueAtTime(2000, now);
  clickGain.gain.setValueAtTime(volume * 0.3, now);
  clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.01);

  clickOsc.start(now);
  clickOsc.stop(now + 0.01);
}

function playChime(ctx: AudioContext, now: number, volume: number) {
  const notes = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C (octave)

  notes.forEach((freq, i) => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'sine';
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(freq, now);
    gainNode.gain.setValueAtTime(volume * 0.67, now + i * 0.15);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + i * 0.15 + 0.5);

    oscillator.start(now + i * 0.15);
    oscillator.stop(now + i * 0.15 + 0.5);
  });
}

function playDigital(ctx: AudioContext, now: number, volume: number) {
  for (let i = 0; i < 3; i++) {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'square';
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(1000, now);
    gainNode.gain.setValueAtTime(volume * 0.33, now + i * 0.2);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + i * 0.2 + 0.1);

    oscillator.start(now + i * 0.2);
    oscillator.stop(now + i * 0.2 + 0.1);
  }
}

function playSoft(ctx: AudioContext, now: number, volume: number) {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = 'sine';
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.frequency.setValueAtTime(600, now);
  oscillator.frequency.exponentialRampToValueAtTime(500, now + 0.4);
  gainNode.gain.setValueAtTime(volume * 0.5, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

  oscillator.start(now);
  oscillator.stop(now + 0.4);
}

export function playClickSound(volume: number = 0.15) {
  if (typeof window === 'undefined') return;

  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // Create a mechanical click sound (short, sharp attack)
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'square';
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // High frequency for sharp click
    oscillator.frequency.setValueAtTime(1200, now);
    oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.02);

    // Very fast attack and decay
    gainNode.gain.setValueAtTime(volume, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

    oscillator.start(now);
    oscillator.stop(now + 0.02);
  } catch (error) {
    console.error('Error playing click sound:', error);
  }
}
