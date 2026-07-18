// Site-wide settings, persisted to localStorage and shared via SettingsProvider.

import type { Language } from "./i18n";

export type Theme = "dark" | "light";

/** How solve times are recorded: the spacebar/tap timer, or manual typing. */
export type TimingMethod = "timer" | "typing";

export type Settings = {
  /** Timer pad vs. typing times in manually. */
  timingMethod: TimingMethod;
  /** WCA 15-second inspection before each solve. */
  inspection: boolean;
  /** Number of moves in a generated scramble. */
  scrambleLength: number;
  /** Hide the running time during a solve (revealed on stop). */
  hideWhileSolving: boolean;
  /** Show 3 decimals (milliseconds, e.g. 12.345) instead of 2 (12.34). */
  showMilliseconds: boolean;
  /** Colour theme. */
  theme: Theme;
  /** UI language. */
  language: Language;
};

export const DEFAULT_SETTINGS: Settings = {
  timingMethod: "timer",
  inspection: true,
  scrambleLength: 20,
  hideWhileSolving: false,
  showMilliseconds: false,
  theme: "dark",
  language: "en",
};

export const SETTINGS_KEY = "ultimatecuber.settings.v1";

// Allowed ranges/options (also enforced by the UI).
export const SCRAMBLE_MIN = 15;
export const SCRAMBLE_MAX = 30;

/** Load settings, merging over defaults so new fields always have a value. */
export function loadSettings(): Settings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw) as Partial<Settings>;
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: Settings): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // ignore quota/availability errors
  }
}
