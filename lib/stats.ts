import { effectiveMs, type Solve } from "./solves";

/**
 * Parse a manually typed time into milliseconds. Accepts:
 *   "12.34"  → 12.34s      "12"     → 12s
 *   "1:05.2" → 1m 05.20s    "1:05"  → 1m 05s
 * Returns null if the input isn't a valid time.
 */
export function parseTimeInput(raw: string): number | null {
  const s = raw.trim();
  // Fraction accepts up to 3 digits and is treated as milliseconds
  // (so "12.34" = 340ms, "12.345" = 345ms).
  const m = s.match(/^(?:(\d+):)?(\d{1,2})(?:\.(\d{1,3}))?$/);
  if (!m) return null;
  const minutes = m[1] ? parseInt(m[1], 10) : 0;
  const seconds = parseInt(m[2], 10);
  const millis = m[3] ? parseInt(m[3].padEnd(3, "0"), 10) : 0;
  const ms = (minutes * 60 + seconds) * 1000 + millis;
  return ms > 0 ? ms : null;
}

/**
 * Parse typed input into milliseconds, StackMat-style. If the text contains a
 * dot or colon it's read literally (via parseTimeInput). Otherwise the digits
 * are filled from the right based on the precision:
 *   showMilliseconds → last 3 digits = ms, then 2 = sec, then min
 *     "12345" → 12.345,  "123456" → 1:23.456
 *   else → last 2 digits = centiseconds, then 2 = sec, then min
 *     "1234"  → 12.34,   "12345"  → 1:23.45
 * The stored value is always exact milliseconds regardless of display precision.
 */
export function parseTypedTime(raw: string, showMilliseconds: boolean): number | null {
  const s = raw.trim();
  if (!s) return null;

  // Literal form (user typed a dot or colon) — parse as-is.
  if (s.includes(".") || s.includes(":")) return parseTimeInput(s);

  // Positional digit entry.
  if (!/^\d+$/.test(s)) return null;
  const fracLen = showMilliseconds ? 3 : 2;
  const frac = s.slice(-fracLen).padStart(fracLen, "0");
  const rest = s.slice(0, Math.max(0, s.length - fracLen));
  const secStr = rest.slice(-2);
  const minStr = rest.slice(0, Math.max(0, rest.length - 2));

  const millis = showMilliseconds ? parseInt(frac, 10) : parseInt(frac, 10) * 10;
  const seconds = secStr ? parseInt(secStr, 10) : 0;
  const minutes = minStr ? parseInt(minStr, 10) : 0;
  const total = (minutes * 60 + seconds) * 1000 + millis;
  return total > 0 ? total : null;
}

/**
 * Format milliseconds as a cuber-friendly time string, e.g. 12.34 or 1:05.67.
 * `decimals` controls precision: 2 = centiseconds (default), 3 = milliseconds.
 */
export function formatMs(ms: number, decimals = 2): string {
  if (!isFinite(ms)) return "DNF";
  const totalSeconds = ms / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;
  if (minutes > 0) {
    return `${minutes}:${seconds.toFixed(decimals).padStart(decimals + 3, "0")}`;
  }
  return seconds.toFixed(decimals);
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
