// Site-wide settings, persisted to localStorage and shared via SettingsProvider.

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
  /** Colour theme. */
  theme: Theme;
};

export const DEFAULT_SETTINGS: Settings = {
  timingMethod: "timer",
  inspection: false,
  scrambleLength: 20,
  hideWhileSolving: false,
  theme: "dark",
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
