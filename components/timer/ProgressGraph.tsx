"use client";

import { effectiveMs, type Solve } from "@/lib/solves";
import { formatMs } from "@/lib/stats";

const W = 320;
const H = 120;
const PAD_X = 6;
const PAD_Y = 8;

/**
 * A tiny line chart of the session's solve times, oldest → newest. Pure SVG,
 * no dependencies. The fastest solve is highlighted, DNFs break the line.
 * Colours use currentColor so it follows the light/dark theme.
 */
export function ProgressGraph({
  solves,
  decimals = 2,
  title,
}: {
  solves: Solve[];
  decimals?: number;
  title: string;
}) {
  // Stored newest-first; show oldest → newest left to right.
  const times = [...solves].reverse().map((s) => {
    const ms = effectiveMs(s);
    return isFinite(ms) ? ms : null;
  });
  const finite = times.filter((t): t is number => t !== null);
  if (finite.length < 2) return null;

  const min = Math.min(...finite);
  const max = Math.max(...finite);
  const range = max - min || 1;
  const n = times.length;

  const x = (i: number) => PAD_X + (i / (n - 1)) * (W - PAD_X * 2);
  const y = (t: number) => PAD_Y + (1 - (t - min) / range) * (H - PAD_Y * 2);

  // Split into segments so DNFs (null) leave a gap instead of a straight jump.
  const segments: string[] = [];
  let run: string[] = [];
  times.forEach((t, i) => {
    if (t === null) {
      if (run.length > 1) segments.push(run.join(" "));
      run = [];
    } else {
      run.push(`${x(i).toFixed(1)},${y(t).toFixed(1)}`);
    }
  });
  if (run.length > 1) segments.push(run.join(" "));

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs uppercase tracking-wide text-muted">{title}</p>
        <p className="text-xs text-muted tabular-nums">
          <span className="text-accent font-mono">{formatMs(min, decimals)}</span>
          {" – "}
          <span className="font-mono">{formatMs(max, decimals)}</span>
        </p>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={title}>
        {segments.map((pts, i) => (
          <polyline
            key={i}
            points={pts}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            className="text-accent"
          />
        ))}
        {times.map((t, i) =>
          t === null ? null : (
            <circle
              key={i}
              cx={x(i)}
              cy={y(t)}
              r={t === min ? 3.5 : 2}
              fill="currentColor"
              className={t === min ? "text-accent" : "text-muted"}
            />
          ),
        )}
      </svg>
    </div>
  );
}
