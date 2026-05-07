export type TimerMode = 'clock' | 'pomodoro' | 'countdown';

export interface TimerState {
  mode: TimerMode;
  isRunning: boolean;
  timeLeft: number;
  duration: number;
}

export interface PomodoroConfig {
  workDuration: number;
  breakDuration: number;
  longBreakDuration: number;
  sessionsUntilLongBreak: number;
  currentSession: number;
  isBreak: boolean;
  autoStartBreaks: boolean;
}
