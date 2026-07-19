"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  effectiveMs,
  loadSolves,
  newId,
  saveSolves,
  type Penalty,
  type Solve,
} from "@/lib/solves";
import { generateScramble as makeScramble } from "@/lib/scramble";
import { bestMs, formatMs, parseTypedTime } from "@/lib/stats";
import { scrambleImageUrl } from "@/lib/caseImage";
import { useSettings, useT } from "@/components/SettingsProvider";
import { Confetti } from "@/components/Confetti";
import type { Dict } from "@/lib/i18n";
import { useSpeedTimer, type TimerPhase } from "./useSpeedTimer";
import { StatsBar } from "./StatsBar";
import { SolveList } from "./SolveList";
import { ProgressGraph } from "./ProgressGraph";

export function Timer() {
  const { settings } = useSettings();
  const t = useT();
  const [solves, setSolves] = useState<Solve[]>([]);
  const [scramble, setScramble] = useState<string>("");
  const [hydrated, setHydrated] = useState(false);
  // Personal-best celebration: pbFire is a nonce that re-triggers confetti,
  // pbTime drives the "New PB!" banner.
  const [pbFire, setPbFire] = useState(0);
  const [pbTime, setPbTime] = useState<number | null>(null);

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
      // Celebrate a new personal best — only if there's an earlier time to beat.
      const prevBest = bestMs(solves);
      const newEff = effectiveMs(solve);
      if (prevBest !== null && isFinite(newEff) && newEff < prevBest) {
        setPbFire((n) => n + 1);
        setPbTime(newEff);
      }
      setSolves((prev) => [solve, ...prev]);
      generateScramble();
    },
    [scramble, solves, generateScramble]
  );

  // Auto-dismiss the PB banner shortly after it appears.
  useEffect(() => {
    if (pbTime === null) return;
    const timeout = window.setTimeout(() => setPbTime(null), 3200);
    return () => window.clearTimeout(timeout);
  }, [pbTime, pbFire]);

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
    if (window.confirm(t.timer.clearConfirm)) {
      setSolves([]);
    }
  }, [t]);

  return (
    <div className="mx-auto max-w-3xl w-full px-4 py-6 flex flex-col gap-6">
      <Confetti fire={pbFire} />

      {/* PB banner */}
      {pbTime !== null && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[85] rounded-full bg-accent text-accent-fg px-5 py-2 text-sm font-bold shadow-lg pointer-events-none">
          🎉 New PB! {formatMs(pbTime, settings.showMilliseconds ? 3 : 2)} 🎉
        </div>
      )}

      {/* Scramble */}
      <div className="text-center">
        <p className="text-xs uppercase tracking-wide text-muted mb-1">{t.timer.scramble}</p>
        <p className="font-mono text-lg sm:text-xl leading-relaxed break-words min-h-7">
          {scramble || "…"}
        </p>
        {scramble && (
          <div className="mt-3 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={scrambleImageUrl(scramble)}
              alt="Scramble preview"
              width={150}
              height={150}
              style={{ width: 150, height: 150 }}
              className="select-none"
            />
          </div>
        )}
      </div>

      {/* Timing area: spacebar/tap pad or manual typing */}
      {typingMode ? (
        <TypingPad
          onSubmit={(ms) => handleSolveComplete(ms, "OK")}
          showMilliseconds={settings.showMilliseconds}
          t={t}
        />
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
            decimals={settings.showMilliseconds ? 3 : 2}
          />
          <p className="mt-4 text-xs text-muted">
            {t.timer.holdBefore}{" "}
            <kbd className="px-1.5 py-0.5 rounded bg-background border border-border">space</kbd>{" "}
            {t.timer.holdAfter}
          </p>
        </button>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-3 text-muted">
          {typingMode && <span>{t.timer.typingMode}</span>}
          {!typingMode && settings.inspection && <span>{t.timer.inspectionOn}</span>}
          <Link href="/settings" className="hover:text-foreground transition">
            ⚙ {t.nav.settings}
          </Link>
        </div>
        {solves.length > 0 && (
          <button onClick={clearSession} className="text-muted hover:text-red-400 transition">
            {t.timer.clearSession}
          </button>
        )}
      </div>

      <StatsBar solves={solves} />

      <ProgressGraph
        solves={solves}
        decimals={settings.showMilliseconds ? 3 : 2}
        title={t.timer.progressTitle}
      />

      <div className="rounded-xl border border-border bg-card p-4">
        <SolveList solves={solves} onSetPenalty={setPenalty} onDelete={deleteSolve} />
      </div>
    </div>
  );
}

// Manual time entry — for when you time on a physical/IRL timer and just type
// the result you got. Enter or "Add" records the solve.
function TypingPad({
  onSubmit,
  showMilliseconds,
  t,
}: {
  onSubmit: (ms: number) => void;
  showMilliseconds: boolean;
  t: Dict;
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const decimals = showMilliseconds ? 3 : 2;
  const preview = parseTypedTime(value, showMilliseconds);

  const submit = () => {
    const ms = parseTypedTime(value, showMilliseconds);
    if (ms === null) {
      setError(true);
      return;
    }
    onSubmit(ms);
    setValue("");
    setError(false);
  };

  const digitExample = showMilliseconds ? "12345" : "1234";

  return (
    <div className="rounded-2xl border border-border bg-card/40 py-14 sm:py-20 px-4 flex flex-col items-center justify-center gap-3">
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
        placeholder={showMilliseconds ? "12.345" : "12.34"}
        aria-label="Type your time"
        className="w-full max-w-xs bg-transparent text-center font-mono font-bold tabular-nums text-5xl sm:text-7xl outline-none border-b-2 border-border focus:border-accent pb-2"
      />
      {/* Live preview of the parsed time so digit entry feels predictable */}
      <p className="h-5 text-sm text-muted tabular-nums">
        {value && preview !== null ? (
          <>
            = <span className="text-accent font-semibold font-mono">{formatMs(preview, decimals)}</span>
          </>
        ) : (
          " "
        )}
      </p>
      <button
        onClick={submit}
        className="rounded-full bg-accent text-accent-fg px-5 py-1.5 text-sm font-semibold hover:brightness-110 transition"
      >
        {t.timer.addSolve}
      </button>
      <p className="text-xs text-muted text-center max-w-xs">
        {t.timer.typingHintPre} <span className="font-mono">{digitExample}</span>
        {t.timer.typingHintPost}
      </p>
      {error && (
        <p className="text-xs text-red-400">
          {t.timer.errorPre} <span className="font-mono">{digitExample}</span> /{" "}
          <span className="font-mono">{showMilliseconds ? "12.345" : "12.34"}</span>
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
  decimals,
}: {
  phase: TimerPhase;
  displayMs: number;
  inspectionRemaining: number;
  hideWhileSolving: boolean;
  decimals: number;
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
    if (inspectionRemaining >= 15 && phase !== "inspecting") text = formatLive(0, decimals);
  } else if (phase === "running") {
    // Optionally hide the live time to reduce pressure — revealed on stop.
    text = hideWhileSolving ? "solving…" : formatLive(displayMs, decimals);
  } else {
    text = formatLive(displayMs, decimals);
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

// Live time while running; `decimals` = 2 (centiseconds) or 3 (milliseconds).
function formatLive(ms: number, decimals: number): string {
  const totalSeconds = ms / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;
  if (minutes > 0) return `${minutes}:${seconds.toFixed(decimals).padStart(decimals + 3, "0")}`;
  return seconds.toFixed(decimals);
}
