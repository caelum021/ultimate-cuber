import { effectiveMs, type Solve } from "./solves";

/**
 * Parse a manually typed time into milliseconds. Accepts:
 *   "12.34"  → 12.34s      "12"     → 12s
 *   "1:05.2" → 1m 05.20s    "1:05"  → 1m 05s
 * Returns null if the input isn't a valid time.
 */
export function parseTimeInput(raw: string): number | null {
  const s = raw.trim();
  const m = s.match(/^(?:(\d+):)?(\d{1,2})(?:\.(\d{1,2}))?$/);
  if (!m) return null;
  const minutes = m[1] ? parseInt(m[1], 10) : 0;
  const seconds = parseInt(m[2], 10);
  const centis = m[3] ? parseInt(m[3].padEnd(2, "0"), 10) : 0;
  const ms = (minutes * 60 + seconds) * 1000 + centis * 10;
  return ms > 0 ? ms : null;
}

/** Format milliseconds as a cuber-friendly time string, e.g. 12.34 or 1:05.67. */
export function formatMs(ms: number): string {
  if (!isFinite(ms)) return "DNF";
  const totalSeconds = ms / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;
  if (minutes > 0) {
    return `${minutes}:${seconds.toFixed(2).padStart(5, "0")}`;
  }
  return seconds.toFixed(2);
}

/**
 * WCA average of N: drop the best and worst (or any DNF as worst), take the
 * arithmetic mean of the rest. Returns Infinity if 2+ DNFs (average is DNF),
 * or null if there aren't enough solves. Expects the N most recent solves.
 */
export function averageOfN(solves: Solve[], n: number): number | null {
  if (solves.length < n) return null;
  const window = solves.slice(0, n).map(effectiveMs);
  const dnfCount = window.filter((t) => !isFinite(t)).length;
  if (dnfCount >= 2) return Infinity; // more than one DNF => average is DNF

  const sorted = [...window].sort((a, b) => a - b);
  const trimmed = sorted.slice(1, sorted.length - 1); // drop best + worst
  const sum = trimmed.reduce((acc, t) => acc + t, 0);
  return sum / trimmed.length;
}

/** Simple mean of the N most recent solves (DNF makes it DNF). */
export function meanOfN(solves: Solve[], n: number): number | null {
  if (solves.length < n) return null;
  const window = solves.slice(0, n).map(effectiveMs);
  if (window.some((t) => !isFinite(t))) return Infinity;
  return window.reduce((a, b) => a + b, 0) / n;
}

/** Best (fastest) non-DNF solve time, or null if none. */
export function bestMs(solves: Solve[]): number | null {
  const times = solves.map(effectiveMs).filter(isFinite);
  if (times.length === 0) return null;
  return Math.min(...times);
}

/** Mean of all non-DNF solves in the session. */
export function sessionMean(solves: Solve[]): number | null {
  const times = solves.map(effectiveMs).filter(isFinite);
  if (times.length === 0) return null;
  return times.reduce((a, b) => a + b, 0) / times.length;
}
