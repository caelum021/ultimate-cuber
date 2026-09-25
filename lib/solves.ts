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

// ── Backup files ────────────────────────────────────────────────────────────
// Solves only live in this browser, so export/import is how you keep them safe
// or move them to another device.

const BACKUP_FORMAT = "ultimatecuber-solves";

function isSolve(v: unknown): v is Solve {
  if (!v || typeof v !== "object") return false;
  const s = v as Record<string, unknown>;
  return (
    typeof s.id === "string" &&
    typeof s.ms === "number" &&
    Number.isFinite(s.ms) &&
    s.ms >= 0 &&
    typeof s.scramble === "string" &&
    (s.penalty === "OK" || s.penalty === "+2" || s.penalty === "DNF") &&
    typeof s.createdAt === "number"
  );
}

/** Serialize solves to a backup file's contents. */
export function exportSolves(solves: Solve[]): string {
  return JSON.stringify(
    { format: BACKUP_FORMAT, version: 1, exportedAt: Date.now(), solves },
    null,
    2,
  );
}

/**
 * Parse a backup file. Accepts our own export or a bare array of solves.
 * Returns null if the file isn't a solves backup at all; individual malformed
 * entries are dropped.
 */
export function parseSolvesBackup(text: string): Solve[] | null {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return null;
  }
  const list = Array.isArray(data)
    ? data
    : data && typeof data === "object" && Array.isArray((data as { solves?: unknown }).solves)
      ? (data as { solves: unknown[] }).solves
      : null;
  if (!list) return null;
  return list.filter(isSolve).map(({ id, ms, scramble, penalty, createdAt }) => ({
    id,
    ms,
    scramble,
    penalty,
    createdAt,
  }));
}

/** Merge imported solves into existing ones (skipping duplicate ids), newest first. */
export function mergeSolves(existing: Solve[], incoming: Solve[]): { merged: Solve[]; added: number } {
  const ids = new Set(existing.map((s) => s.id));
  const fresh = incoming.filter((s) => !ids.has(s.id) && ids.add(s.id));
  const merged = [...existing, ...fresh].sort((a, b) => b.createdAt - a.createdAt);
  return { merged, added: fresh.length };
}

export function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
