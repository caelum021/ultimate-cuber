"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { useSettings } from "@/components/SettingsProvider";

/**
 * Secret quest to unlock the hidden "Brainrot" language. The steps span two
 * pages, so the progress lives in this shared provider (kept in the layout).
 *
 *   1. Tap the ▶ on the homepage YouTube card ......... 2 times
 *   2. Tap the "Practiced" number on the Train page ... 4 times
 *   3. Tap the word "ultimate" in the homepage title .. 7 times
 *   4. Enter the password ............................. 7789
 */

type Step = "play" | "practiced" | "ultimate" | "password" | "done";

const NEEDED: Record<"play" | "practiced" | "ultimate", number> = {
  play: 2,
  practiced: 4,
  ultimate: 7,
};
const PASSWORD = "7789";

type Ctx = {
  tapPlay: () => void;
  tapPracticed: () => void;
  tapUltimate: () => void;
};

const BrainrotContext = createContext<Ctx | null>(null);

export function BrainrotUnlockProvider({ children }: { children: React.ReactNode }) {
  const { settings, update } = useSettings();
  const [step, setStep] = useState<Step>("play");
  const count = useRef(0);
  const [toast, setToast] = useState<string | null>(null);
  const [pwOpen, setPwOpen] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  }, []);

  const advance = useCallback(
    (from: Step, needed: number, next: Step, doneMsg: string) => {
      if (settings.gibberishUnlocked) {
        // Already unlocked — tell the user instead of silently doing nothing.
        showToast("🧠 Brainrot's already unlocked! Reset settings to re-lock it.");
        return;
      }
      if (step !== from) return; // not this step's turn — ignore
      count.current += 1;
      if (count.current >= needed) {
        count.current = 0;
        setStep(next);
        if (next === "password") setPwOpen(true);
        else showToast(doneMsg);
      }
    },
    [settings.gibberishUnlocked, step, showToast],
  );

  const tapPlay = useCallback(
    () => advance("play", NEEDED.play, "practiced", "🔓 1/3 — now find the next clue…"),
    [advance],
  );
  const tapPracticed = useCallback(
    () => advance("practiced", NEEDED.practiced, "ultimate", "🔓 2/3 — one more clue to go…"),
    [advance],
  );
  const tapUltimate = useCallback(
    () => advance("ultimate", NEEDED.ultimate, "password", ""),
    [advance],
  );

  const submitPassword = () => {
    if (pw.trim() === PASSWORD) {
      update({ gibberishUnlocked: true });
      setStep("done");
      setPwOpen(false);
      setPw("");
      setPwError(false);
      showToast("🧠 Brainrot unlocked! Check Settings → Language 🗿");
    } else {
      setPwError(true);
    }
  };

  const value = useMemo<Ctx>(
    () => ({ tapPlay, tapPracticed, tapUltimate }),
    [tapPlay, tapPracticed, tapUltimate],
  );

  return (
    <BrainrotContext.Provider value={value}>
      {children}

      {/* Progress toast */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] rounded-full bg-accent text-accent-fg px-5 py-2.5 text-sm font-semibold shadow-lg text-center max-w-[90vw]">
          {toast}
        </div>
      )}

      {/* Password gate */}
      {pwOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setPwOpen(false)}
        >
          <div
            className="w-full max-w-xs rounded-2xl border border-border bg-card p-5 shadow-xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-3xl">🔐</div>
            <h2 className="mt-2 text-lg font-semibold tracking-tight">Enter the password</h2>
            <p className="mt-1 text-sm text-muted">Final step to unlock Brainrot mode.</p>
            <input
              autoFocus
              value={pw}
              onChange={(e) => {
                setPw(e.target.value);
                if (pwError) setPwError(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  submitPassword();
                }
              }}
              inputMode="numeric"
              autoComplete="off"
              placeholder="••••"
              className={`mt-4 w-full rounded-lg border bg-background px-3 py-2.5 text-center font-mono text-lg tracking-[0.3em] outline-none transition ${
                pwError ? "border-red-500" : "border-border focus:border-accent"
              }`}
            />
            {pwError && <p className="mt-2 text-sm text-red-400">Nope — try again 💀</p>}
            <div className="mt-4 flex justify-center gap-2">
              <button
                onClick={() => setPwOpen(false)}
                className="rounded-full px-4 py-1.5 text-sm text-muted hover:text-foreground transition"
              >
                Cancel
              </button>
              <button
                onClick={submitPassword}
                className="rounded-full bg-accent text-accent-fg px-5 py-1.5 text-sm font-semibold hover:brightness-110 transition"
              >
                Unlock
              </button>
            </div>
          </div>
        </div>
      )}
    </BrainrotContext.Provider>
  );
}

export function useBrainrotUnlock(): Ctx {
  const ctx = useContext(BrainrotContext);
  if (!ctx) throw new Error("useBrainrotUnlock must be used within <BrainrotUnlockProvider>");
  return ctx;
}
