// Solve model + localStorage persistence. No backend yet — everything lives in
// the browser so the timer works instantly and offline. We can add cloud sync
// (accounts, leaderboards) later without changing this shape much.

export type Penalty = "OK" | "+2" | "DNF";

export type Solve = {
  id: string;
  /** Raw solve time in milliseconds (before penalty). */
  ms: number;
  scramble: string;
  penalty: Penalty;
  /** Unix ms timestamp of when the solve was recorded. */
  createdAt: number;
};

const STORAGE_KEY = "ultimatecuber.solves.v1";

/** Effective time in ms accounting for penalty. DNF returns Infinity. */
export function effectiveMs(solve: Solve): number {
  if (solve.penalty === "DNF") return Infinity;
  if (solve.penalty === "+2") return solve.ms + 2000;
  return solve.ms;
}

export function loadSolves(): Solve[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Solve[];
  } catch {
    return [];
  }
}

export function saveSolves(solves: Solve[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(solves));
  } catch {
    // Storage full or blocked — fail silently rather than crash the timer.
  }
}

export function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
