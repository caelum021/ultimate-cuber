"use client";

import type { Solve } from "@/lib/solves";
import { averageOfN, bestMs, formatMs, sessionMean } from "@/lib/stats";
import { useSettings } from "@/components/SettingsProvider";

/** Solves must be passed newest-first (index 0 = most recent). */
export function StatsBar({ solves }: { solves: Solve[] }) {
  const { settings } = useSettings();
  const decimals = settings.showMilliseconds ? 3 : 2;
  const fmt = (ms: number | null) => (ms === null ? "—" : formatMs(ms, decimals));

  const stats: { label: string; value: string }[] = [
    { label: "solves", value: String(solves.length) },
    { label: "best", value: fmt(bestMs(solves)) },
    { label: "ao5", value: fmt(averageOfN(solves, 5)) },
    { label: "ao12", value: fmt(averageOfN(solves, 12)) },
    { label: "ao100", value: fmt(averageOfN(solves, 100)) },
    { label: "mean", value: fmt(sessionMean(solves)) },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-px rounded-xl overflow-hidden border border-border bg-border">
      {stats.map((s) => (
        <div key={s.label} className="bg-card px-3 py-3 text-center">
          <div className="text-lg font-mono font-semibold tabular-nums">{s.value}</div>
          <div className="text-[11px] uppercase tracking-wide text-muted mt-0.5">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
