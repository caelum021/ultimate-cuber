"use client";

import { useRef, useState } from "react";
import { useSettings } from "@/components/SettingsProvider";

const TAPS_TO_TOGGLE = 5;

/**
 * A secret easter-egg button, disguised as the decorative ▶ on the homepage
 * YouTube card. Tapping it 5 times reveals (or re-hides) the hidden Gibberish
 * language in Settings. Looks purely ornamental — hidden in plain sight. 🤫
 */
export function GibberishUnlock() {
  const { settings, update } = useSettings();
  const taps = useRef(0);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 3500);
  };

  const handleTap = () => {
    taps.current += 1;
    if (taps.current >= TAPS_TO_TOGGLE) {
      taps.current = 0;
      const nowUnlocked = !settings.gibberishUnlocked;
      update({ gibberishUnlocked: nowUnlocked });
      showToast(
        nowUnlocked
          ? "🤪 Gibberish unlocked! Check Settings → Language 🗿"
          : "🙈 Gibberish hidden again.",
      );
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleTap}
        aria-label="Play"
        className="text-3xl leading-none select-none bg-transparent border-0 p-0 cursor-default"
      >
        ▶
      </button>
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 rounded-full bg-accent text-accent-fg px-5 py-2.5 text-sm font-semibold shadow-lg">
          {toast}
        </div>
      )}
    </>
  );
}
