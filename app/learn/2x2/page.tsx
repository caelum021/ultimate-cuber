import type { Metadata } from "next";
import Link from "next/link";
import {
  ortegaGuide,
  ortegaOLL,
  ortegaPBL,
  twoByTwoBeginner,
} from "@/lib/learn";
import { AlgList } from "@/components/learn/AlgList";

export const metadata: Metadata = {
  title: "2×2 — Beginner method & Ortega",
  description:
    "Learn to solve the 2×2 cube: a beginner layer-by-layer method, then the Ortega speed method with all 7 OLL and 6 PBL algorithms.",
};

export default function TwoByTwoPage() {
  return (
    <div className="mx-auto max-w-3xl w-full px-4 py-10 flex flex-col gap-8">
      <header>
        <Link href="/learn" className="text-sm text-muted hover:text-foreground transition">
          ← Back to learning hub
        </Link>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">2×2 Cube — full guide</h1>
        <p className="mt-3 text-muted leading-relaxed">
          The 2×2 (Pocket Cube) is the friendliest place to start — just 8 corners, no centers or
          edges. Learn the beginner method first to get your first solve, then speed up with Ortega.
        </p>
      </header>

      {/* Beginner method */}
      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold tracking-tight">{twoByTwoBeginner.title}</h2>
        <ol className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-muted list-decimal pl-5">
          {twoByTwoBeginner.body.slice(1).map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ol>
      </section>

      {/* Ortega method */}
      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold tracking-tight">{ortegaGuide.title}</h2>
        <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-muted">
          {ortegaGuide.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Ortega OLL */}
      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold tracking-tight">{ortegaOLL.title}</h2>
        <p className="text-sm text-muted">{ortegaOLL.summary}</p>
        <AlgList algs={ortegaOLL.algs} />
      </section>

      {/* Ortega PBL */}
      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold tracking-tight">{ortegaPBL.title}</h2>
        <p className="text-sm text-muted">{ortegaPBL.summary}</p>
        <AlgList algs={ortegaPBL.algs} />
      </section>

      <p className="text-xs text-muted border-t border-border pt-6">
        Notation: <span className="font-mono">R U F</span> = clockwise, <span className="font-mono">R&apos;</span>{" "}
        = counter-clockwise, <span className="font-mono">R2</span> = 180°, <span className="font-mono">y</span>{" "}
        = cube rotation. Several valid algorithms may exist per case.
      </p>
    </div>
  );
}
