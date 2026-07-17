"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  loadSolves,
  newId,
  saveSolves,
  type Penalty,
  type Solve,
} from "@/lib/solves";
import { generateScramble as makeScramble } from "@/lib/scramble";
import { parseTimeInput } from "@/lib/stats";
import { useSettings } from "@/components/SettingsProvider";
import { useSpeedTimer, type TimerPhase } from "./useSpeedTimer";
import { StatsBar } from "./StatsBar";
import { SolveList } from "./SolveList";

export function Timer() {
  const { settings } = useSettings();
  const [solves, setSolves] = useState<Solve[]>([]);
  const [scramble, setScramble] = useState<string>("");
  const [hydrated, setHydrated] = useState(false);

  // Load persisted solves on mount (client only, avoids hydration mismatch).
  useEffect(() => {
    setSolves(loadSolves());
    setHydrated(true);
  }, []);

  // Persist solves whenever they change (after initial hydration).
  useEffect(() => {
    if (hydrated) saveSolves(solves);
  }, [solves, hydrated]);

  const generateScramble = useCallback(() => {
    setScramble(makeScramble(settings.scrambleLength));
  }, [settings.scrambleLength]);

  // First scramble on mount (client only — random must not run during SSR).
  useEffect(() => {
    generateScramble();
  }, [generateScramble]);

  const handleSolveComplete = useCallback(
    (ms: number, inspectionPenalty: Penalty) => {
      const solve: Solve = {
        id: newId(),
        ms,
        scramble,
        penalty: inspectionPenalty,
        createdAt: Date.now(),
      };
      setSolves((prev) => [solve, ...prev]);
      generateScramble();
    },
    [scramble, generateScramble]
  );

  const typingMode = settings.timingMethod === "typing";

  const { phase, displayMs, inspectionRemaining, onPointerDown, onPointerUp } =
    useSpeedTimer({
      useInspection: settings.inspection,
      enabled: !typingMode,
      onSolveComplete: handleSolveComplete,
    });

  const setPenalty = useCallback((id: string, penalty: Penalty) => {
    setSolves((prev) => prev.map((s) => (s.id === id ? { ...s, penalty } : s)));
  }, []);

  const deleteSolve = useCallback((id: string) => {
    setSolves((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const clearSession = useCallback(() => {
    if (window.confirm("Clear all solves in this session? This can't be undone.")) {
      setSolves([]);
    }
  }, []);

  return (
    <div className="mx-auto max-w-3xl w-full px-4 py-6 flex flex-col gap-6">
      {/* Scramble */}
      <div className="text-center">
        <p className="text-xs uppercase tracking-wide text-muted mb-1">Scramble · 3×3</p>
        <p className="font-mono text-lg sm:text-xl leading-relaxed break-words min-h-7">
          {scramble || "…"}
        </p>
      </div>

      {/* Timing area: spacebar/tap pad or manual typing */}
      {typingMode ? (
        <TypingPad onSubmit={(ms) => handleSolveComplete(ms, "OK")} />
      ) : (
        <button
          type="button"
          onPointerDown={(e) => {
            e.preventDefault();
            onPointerDown();
          }}
          onPointerUp={(e) => {
            e.preventDefault();
            onPointerUp();
          }}
          className="no-select select-none rounded-2xl border border-border bg-card/40 py-16 sm:py-24 flex flex-col items-center justify-center touch-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Timer pad — hold to get ready, release to start, tap to stop"
        >
          <BigDisplay
            phase={phase}
            displayMs={displayMs}
            inspectionRemaining={inspectionRemaining}
            hideWhileSolving={settings.hideWhileSolving}
          />
          <p className="mt-4 text-xs text-muted">
            Hold <kbd className="px-1.5 py-0.5 rounded bg-background border border-border">space</kbd> (or
            touch &amp; hold), release to start
          </p>
        </button>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-3 text-muted">
          {typingMode && <span>Typing mode</span>}
          {!typingMode && settings.inspection && <span>15s inspection</span>}
          <Link href="/settings" className="hover:text-foreground transition">
            ⚙ Settings
          </Link>
        </div>
        {solves.length > 0 && (
          <button onClick={clearSession} className="text-muted hover:text-red-400 transition">
            Clear session
          </button>
        )}
      </div>

      <StatsBar solves={solves} />

      <div className="rounded-xl border border-border bg-card p-4">
        <SolveList solves={solves} onSetPenalty={setPenalty} onDelete={deleteSolve} />
      </div>
    </div>
  );
}

// Manual time entry — for when you time on a physical/IRL timer and just type
// the result you got. Enter or "Add" records the solve.
function TypingPad({ onSubmit }: { onSubmit: (ms: number) => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const submit = () => {
    const ms = parseTimeInput(value);
    if (ms === null) {
      setError(true);
      return;
    }
    onSubmit(ms);
    setValue("");
    setError(false);
  };

  return (
    <div className="rounded-2xl border border-border bg-card/40 py-14 sm:py-20 px-4 flex flex-col items-center justify-center gap-4">
      <input
        type="text"
        inputMode="decimal"
        autoFocus
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setError(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
        }}
        placeholder="12.34"
        aria-label="Type your time"
        className="w-full max-w-xs bg-transparent text-center font-mono font-bold tabular-nums text-5xl sm:text-7xl outline-none border-b-2 border-border focus:border-accent pb-2"
      />
      <div className="flex items-center gap-3">
        <button
          onClick={submit}
          className="rounded-full bg-accent text-accent-fg px-5 py-1.5 text-sm font-semibold hover:brightness-110 transition"
        >
          Add solve
        </button>
      </div>
      <p className="text-xs text-muted">
        Time it on your own timer, then type it and press{" "}
        <kbd className="px-1.5 py-0.5 rounded bg-background border border-border">Enter</kbd> — e.g.{" "}
        <span className="font-mono">12.34</span> or <span className="font-mono">1:05.23</span>
      </p>
      {error && (
        <p className="text-xs text-red-400">
          Enter a valid time like <span className="font-mono">12.34</span> or{" "}
          <span className="font-mono">1:05.23</span>.
        </p>
      )}
    </div>
  );
}

function BigDisplay({
  phase,
  displayMs,
  inspectionRemaining,
  hideWhileSolving,
}: {
  phase: TimerPhase;
  displayMs: number;
  inspectionRemaining: number;
  hideWhileSolving: boolean;
}) {
  let color = "text-foreground";
  let text: string;

  if (phase === "inspecting" || phase === "holding" || phase === "ready") {
    // Inspection countdown (if active) governs the shown value while arming.
    if (phase === "holding") color = "text-red-500";
    else if (phase === "ready") color = "text-accent";
    else color = "text-amber-400";
    text = inspectionText(inspectionRemaining);
    // If inspection isn't active, holding/ready should show 0.00 instead.
    if (inspectionRemaining >= 15 && phase !== "inspecting") text = "0.00";
  } else if (phase === "running") {
    // Optionally hide the live time to reduce pressure — revealed on stop.
    text = hideWhileSolving ? "solving…" : formatLive(displayMs);
  } else {
    text = formatLive(displayMs);
  }

  return (
    <span className={`font-mono font-bold tabular-nums text-6xl sm:text-8xl ${color}`}>{text}</span>
  );
}

function inspectionText(remaining: number): string {
  if (remaining > 0) return String(Math.ceil(remaining));
  if (remaining > -2) return "+2";
  return "DNF";
}

// Live time while running is shown to 2 decimals; keep it snappy.
function formatLive(ms: number): string {
  const totalSeconds = ms / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;
  if (minutes > 0) return `${minutes}:${seconds.toFixed(2).padStart(5, "0")}`;
  return seconds.toFixed(2);
}
