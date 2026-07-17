"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  DEFAULT_SETTINGS,
  loadSettings,
  saveSettings,
  type Settings,
} from "@/lib/settings";

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

  // Persist + apply theme whenever settings change (after hydration).
  useEffect(() => {
    if (!loaded) return;
    saveSettings(settings);
    document.documentElement.dataset.theme = settings.theme;
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
