"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useT } from "@/components/SettingsProvider";
import { useBrainrotUnlock } from "@/components/BrainrotUnlock";
import { CaseDiagram } from "@/components/learn/CaseDiagram";
import { invertAlg } from "@/lib/caseImage";
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

type TrainSet = { id: string; label: string; algs: Algorithm[]; pzl: number; bothFaces?: boolean };
type Item = { alg: Algorithm; setLabel: string; pzl: number; bothFaces?: boolean };

const diagrammable = (a: Algorithm) => !/\bthen\b/i.test(a.moves);

/** Normalize a case name for lenient matching: lowercase, drop "perm", punctuation and spaces. */
function normalizeName(s: string): string {
  return s.toLowerCase().replace(/perm/g, "").replace(/[^a-z0-9]/g, "");
}

export function Trainer() {
  const t = useT();
  const { tapPracticed } = useBrainrotUnlock();

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
  const [typed, setTyped] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
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
      let guard = 0;
      while (exclude && next.alg.name === exclude.alg.name && next.setLabel === exclude.setLabel && guard++ < 20) {
        next = pool[Math.floor(Math.random() * pool.length)];
      }
      return next;
    },
    [pool],
  );

  const resetInput = () => {
    setTyped("");
    setStatus("idle");
    setRevealed(false);
  };

  // First case (client only) and whenever the pool changes.
  useEffect(() => {
    setCurrent((c) => (c && pool.some((i) => i.alg.name === c.alg.name && i.setLabel === c.setLabel) ? c : pickRandom()));
    resetInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool]);

  const nextCase = useCallback(() => {
    setCurrent((c) => pickRandom(c));
    resetInput();
    setCount((n) => n + 1);
  }, [pickRandom]);

  const check = useCallback(() => {
    if (!current) return;
    if (normalizeName(typed) === normalizeName(current.alg.name)) {
      setStatus("correct");
      setRevealed(true);
    } else {
      setStatus("wrong");
    }
  }, [current, typed]);

  const reveal = useCallback(() => {
    setRevealed(true);
    setStatus("idle");
  }, []);

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
                  on ? "bg-accent text-accent-fg border-accent font-medium" : "border-border text-muted hover:text-foreground"
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
        <div className="rounded-2xl border border-border bg-card/40 p-6 sm:p-8 flex flex-col items-center gap-5 text-center">
          <CaseDiagram moves={current.alg.moves} pzl={current.pzl} bothFaces={current.bothFaces} size={140} />

          {/* Optional setup scramble to physically make the case on your cube */}
          <SetupScramble
            key={`${current.setLabel}-${current.alg.name}`}
            moves={current.alg.moves}
            label={t.train.setupScramble}
            hint={t.train.setupHint}
          />

          {/* Type-the-alg input */}
          <div className="w-full max-w-sm flex flex-col gap-2">
            <input
              autoFocus
              value={typed}
              onChange={(e) => {
                setTyped(e.target.value);
                if (status === "wrong") setStatus("idle");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (revealed) nextCase();
                  else check();
                }
              }}
              readOnly={status === "correct"}
              placeholder={t.train.typePlaceholder}
              spellCheck={false}
              autoComplete="off"
              className={`w-full rounded-lg border bg-background px-3 py-2.5 text-center font-mono outline-none transition ${
                status === "correct"
                  ? "border-accent text-accent"
                  : status === "wrong"
                    ? "border-red-500"
                    : "border-border focus:border-accent"
              }`}
            />

            {status === "correct" && <p className="text-sm font-medium text-accent">{t.train.correct}</p>}
            {status === "wrong" && <p className="text-sm text-red-400">{t.train.wrong}</p>}

            {/* Reveal the answer once checked/revealed */}
            {revealed && (
              <div className="mt-1 flex flex-col items-center gap-0.5">
                <span className="text-sm font-semibold">{current.alg.name}</span>
                <code className="font-mono text-base text-foreground break-words">{current.alg.moves}</code>
                {current.alg.note && <p className="text-xs text-muted">{current.alg.note}</p>}
              </div>
            )}

            <div className="mt-2 flex justify-center gap-2">
              {!revealed && (
                <>
                  <button
                    onClick={check}
                    disabled={!typed.trim()}
                    className="rounded-full bg-accent text-accent-fg px-5 py-1.5 text-sm font-semibold hover:brightness-110 transition disabled:opacity-40"
                  >
                    {t.train.check}
                  </button>
                  <button
                    onClick={reveal}
                    className="rounded-full border border-border px-5 py-1.5 text-sm text-muted hover:text-foreground transition"
                  >
                    {t.train.reveal}
                  </button>
                </>
              )}
              {revealed && (
                <button
                  onClick={nextCase}
                  className="rounded-full bg-accent text-accent-fg px-5 py-1.5 text-sm font-semibold hover:brightness-110 transition"
                >
                  {t.train.next}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card/40 p-10" aria-hidden />
      )}

      <div className="flex items-center justify-between text-sm text-muted">
        <span>
          {t.train.practiced}:{" "}
          <span onClick={tapPracticed} className="font-mono text-foreground cursor-text select-none">
            {count}
          </span>
        </span>
      </div>
    </div>
  );
}

/**
 * A collapsible "setup scramble" — the inverse of the algorithm. Do it on a
 * solved cube to create the case, then practice solving it with the alg.
 */
function SetupScramble({ moves, label, hint }: { moves: string; label: string; hint: string }) {
  const [open, setOpen] = useState(false);
  const scramble = invertAlg(moves);
  if (!scramble) return null;
  return (
    <div className="w-full max-w-sm">
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-xs text-muted hover:text-foreground transition inline-flex items-center gap-1"
      >
        🧩 {label} {open ? "▲" : "▼"}
      </button>
      {open && (
        <div className="mt-2 rounded-lg border border-border bg-background px-3 py-2 text-left">
          <code className="font-mono text-sm break-words">{scramble}</code>
          <p className="mt-1 text-xs text-muted">{hint}</p>
        </div>
      )}
    </div>
  );
}
