"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useT } from "@/components/SettingsProvider";
import { CaseDiagram } from "@/components/learn/CaseDiagram";
import {
  cmllGroups,
  ollAllAlgs,
  ortegaOLL,
  ortegaPBL,
  pllAllAlgs,
  twoLookOLL,
  twoLookPLL,
  wvAllAlgs,
  type Algorithm,
} from "@/lib/learn";

type TrainSet = {
  id: string;
  label: string;
  algs: Algorithm[];
  pzl: number;
  bothFaces?: boolean;
};

type Item = { alg: Algorithm; setLabel: string; pzl: number; bothFaces?: boolean };

// Only cases that can be diagrammed (single algorithm, no "then" combos).
const diagrammable = (a: Algorithm) => !/\bthen\b/i.test(a.moves);

export function Trainer() {
  const t = useT();

  const sets: TrainSet[] = useMemo(
    () => [
      { id: "pll", label: t.train.setFullPLL, algs: pllAllAlgs, pzl: 3 },
      { id: "oll", label: t.train.setFullOLL, algs: ollAllAlgs, pzl: 3 },
      { id: "2oll", label: t.train.set2LookOLL, algs: [...twoLookOLL[0].algs, ...twoLookOLL[1].algs], pzl: 3 },
      { id: "2pll", label: t.train.set2LookPLL, algs: [...twoLookPLL[0].algs, ...twoLookPLL[1].algs], pzl: 3 },
      { id: "wvls", label: t.train.setWVLS, algs: wvAllAlgs, pzl: 3 },
      { id: "cmll", label: t.train.setCMLL, algs: cmllGroups.flatMap((g) => g.algs), pzl: 3 },
      { id: "2x2oll", label: t.train.set2x2OLL, algs: ortegaOLL.algs, pzl: 2 },
      { id: "2x2pbl", label: t.train.set2x2PBL, algs: ortegaPBL.algs, pzl: 2, bothFaces: true },
    ],
    [t],
  );

  const [selected, setSelected] = useState<string[]>(["pll"]);
  const [current, setCurrent] = useState<Item | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [count, setCount] = useState(0);

  const pool: Item[] = useMemo(() => {
    const picked = sets.filter((s) => selected.includes(s.id));
    return picked.flatMap((s) =>
      s.algs.filter(diagrammable).map((alg) => ({ alg, setLabel: s.label, pzl: s.pzl, bothFaces: s.bothFaces })),
    );
  }, [sets, selected]);

  const pickRandom = useCallback(
    (exclude?: Item | null): Item | null => {
      if (pool.length === 0) return null;
      if (pool.length === 1) return pool[0];
      let next = pool[Math.floor(Math.random() * pool.length)];
      // avoid repeating the same case twice in a row
      let guard = 0;
      while (exclude && next.alg.name === exclude.alg.name && next.setLabel === exclude.setLabel && guard++ < 20) {
        next = pool[Math.floor(Math.random() * pool.length)];
      }
      return next;
    },
    [pool],
  );

  // First case (client only) and whenever the pool changes.
  useEffect(() => {
    setCurrent((c) => (c && pool.some((i) => i.alg.name === c.alg.name && i.setLabel === c.setLabel) ? c : pickRandom()));
    setRevealed(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool]);

  const nextCase = useCallback(() => {
    setCurrent((c) => pickRandom(c));
    setRevealed(false);
    setCount((n) => n + 1);
  }, [pickRandom]);

  const reveal = useCallback(() => setRevealed(true), []);

  const advance = useCallback(() => {
    if (!revealed) reveal();
    else nextCase();
  }, [revealed, reveal, nextCase]);

  // Space / Enter to reveal then advance.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space" && e.code !== "Enter") return;
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;
      e.preventDefault();
      advance();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance]);

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <div className="mx-auto max-w-2xl w-full px-4 py-10 flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">{t.train.title}</h1>
        <p className="mt-2 text-muted">{t.train.subtitle}</p>
      </header>

      {/* Set chooser */}
      <div>
        <p className="text-xs uppercase tracking-wide text-muted mb-2">{t.train.choose}</p>
        <div className="flex flex-wrap gap-2">
          {sets.map((s) => {
            const on = selected.includes(s.id);
            return (
              <button
                key={s.id}
                onClick={() => toggle(s.id)}
                className={`px-3 py-1.5 rounded-full text-sm border transition ${
                  on
                    ? "bg-accent text-accent-fg border-accent font-medium"
                    : "border-border text-muted hover:text-foreground"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Practice card */}
      {pool.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card/40 p-10 text-center text-muted">
          {t.train.selectOne}
        </div>
      ) : current ? (
        <button
          type="button"
          onClick={advance}
          className="rounded-2xl border border-border bg-card/40 p-8 flex flex-col items-center gap-5 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <CaseDiagram moves={current.alg.moves} pzl={current.pzl} bothFaces={current.bothFaces} size={140} />

          {revealed ? (
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg font-semibold">{current.alg.name}</span>
              <code className="font-mono text-base sm:text-lg text-foreground break-words">
                {current.alg.moves}
              </code>
              {current.alg.note && <p className="text-xs text-muted mt-0.5">{current.alg.note}</p>}
              <span className="mt-3 inline-flex rounded-full bg-accent text-accent-fg px-5 py-1.5 text-sm font-semibold">
                {t.train.next}
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm text-muted">{t.train.recall}</p>
              <span className="inline-flex rounded-full border border-border px-5 py-1.5 text-sm font-medium">
                {t.train.reveal}
              </span>
            </div>
          )}
        </button>
      ) : (
        <div className="rounded-2xl border border-border bg-card/40 p-10" aria-hidden />
      )}

      <div className="flex items-center justify-between text-sm text-muted">
        <span>
          {t.train.practiced}: <span className="font-mono text-foreground">{count}</span>
        </span>
        <span className="hidden sm:block text-xs">{t.train.hint}</span>
      </div>
    </div>
  );
}
