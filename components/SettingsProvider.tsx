"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  DEFAULT_SETTINGS,
  loadSettings,
  saveSettings,
  type Settings,
} from "@/lib/settings";
import { translations, type Dict } from "@/lib/i18n";

type SettingsContextValue = {
  settings: Settings;
  /** Whether settings have been read from localStorage yet. */
  loaded: boolean;
  update: (patch: Partial<Settings>) => void;
  reset: () => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  // Hydrate from localStorage on mount.
  useEffect(() => {
    setSettings(loadSettings());
    setLoaded(true);
  }, []);

  // Persist + apply theme/language whenever settings change (after hydration).
  useEffect(() => {
    if (!loaded) return;
    saveSettings(settings);
    document.documentElement.dataset.theme = settings.theme;
    document.documentElement.lang = settings.language;
  }, [settings, loaded]);

  const update = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const reset = useCallback(() => setSettings(DEFAULT_SETTINGS), []);

  return (
    <SettingsContext.Provider value={{ settings, loaded, update, reset }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within <SettingsProvider>");
  return ctx;
}

/** Returns the translation dictionary for the current language. */
export function useT(): Dict {
  const { settings } = useSettings();
  return translations[settings.language];
}
