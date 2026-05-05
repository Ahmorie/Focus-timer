# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Focus Timer is a minimalist productivity timer application with Pomodoro and custom countdown modes. Built with Next.js 15 App Router, it features a luxurious black-and-white design with glass morphism effects.

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## WSL/Node.js Setup

This project runs in WSL (Windows Subsystem for Linux). Node.js must be installed **within WSL**, not Windows:

```bash
# If Node.js issues occur, install nvm in WSL:
./install-node-wsl.sh

# Or manually:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
```

## Architecture

### State Management Pattern

The app uses a **mode-based state architecture** with three timer modes managed by `FocusTimer.tsx`:

- `clock` - Real-time clock display (default)
- `pomodoro` - Pomodoro timer with sessions and breaks
- `countdown` - Custom duration timer

Each mode is a separate component that receives an `onBack` callback to return to clock mode.

### Timer Logic Separation

Timer state management is extracted into custom hooks (`/hooks`):

- **`usePomodoroTimer`** - Manages work/break cycles, session counting, auto-progression between work and breaks, config updates
- **`useCountdownTimer`** - Simpler single-countdown logic

Both hooks:
- Use `setInterval` for countdown logic
- Clean up intervals on unmount
- Call `playSound('complete')` when time expires
- Return `{ timeLeft, isRunning, start, pause, reset, ... }`

### Component Composition

**Shared components** used across both timer modes:
- `TimerDisplay` - Renders MM:SS format
- `TimerControls` - Start/Pause/Reset buttons

**Mode-specific components:**
- `PomodoroSettings` - Custom number inputs with +/- buttons for work/break durations
- `DurationInput` - Preset buttons (15, 30, 45, 50, 60) + manual input with +/-

### Audio System

`utils/audio.ts` uses **Web Audio API** to generate sounds without external files:
- `playSound('complete')` - Descending tone (800Hz → 400Hz) when timer finishes
- `playSound('tick')` - Short beep (600Hz) for potential tick sounds
- Singleton AudioContext pattern for performance

### Hydration Pattern

To avoid Next.js hydration mismatches with time-based data:

```typescript
const [time, setTime] = useState<Date | null>(null);

useEffect(() => {
  setTime(new Date()); // Only set on client
}, []);

if (!time) return <div>--:--</div>; // Server-side placeholder
```

This ensures server HTML matches initial client render before displaying live time.

## Styling System

Tailwind CSS with custom utilities in `app/globals.css`:

- `.glass-effect` - Backdrop blur with semi-transparent background
- `.glow-effect` - Subtle white glow shadow
- Black (`#000000`) background with white (`#ffffff`) text
- Monospace font stack for futuristic aesthetic
- `text-white/40` opacity pattern for secondary text

## Key Design Decisions

1. **No external audio files** - Web Audio API generates all sounds procedurally
2. **Client-only time rendering** - Prevents hydration errors with `Date.now()`
3. **Mode-based routing** - State-driven UI switching, not URL routing
4. **Minimal component props** - Each timer mode is self-contained with its own hooks
5. **Number inputs without browser arrows** - Custom +/- buttons for better UX (arrows were overlapping text)

## TypeScript Types

All timer-related types are in `/types/index.ts`:

```typescript
type TimerMode = 'clock' | 'pomodoro' | 'countdown';

interface PomodoroConfig {
  workDuration: number;        // in seconds
  breakDuration: number;
  longBreakDuration: number;
  sessionsUntilLongBreak: number;
  currentSession: number;
  isBreak: boolean;
}
```

All durations are stored in **seconds**, converted to minutes in UI.

## Vercel Deployment

Project is configured for Vercel with `vercel.json`. Simply connect GitHub repo to Vercel for automatic deployments. No additional environment variables needed.
