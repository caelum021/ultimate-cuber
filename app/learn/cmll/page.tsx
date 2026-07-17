import type { Metadata } from "next";
import Link from "next/link";
import { cmllGroups } from "@/lib/learn";
import { AlgList } from "@/components/learn/AlgList";

export const metadata: Metadata = {
  title: "CMLL — all 42 algorithms",
  description:
    "The complete set of 42 CMLL algorithms for the Roux method — orient and permute the last-layer corners in one step, grouped by corner-orientation case.",
};

export default function CmllPage() {
  const total = cmllGroups.reduce((sum, g) => sum + g.algs.length, 0);

  return (
    <div className="mx-auto max-w-3xl w-full px-4 py-10 flex flex-col gap-8">
      <header>
        <Link href="/learn" className="text-sm text-muted hover:text-foreground transition">
          ← Back to learning hub
        </Link>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">CMLL · all {total} algorithms</h1>
        <p className="mt-3 text-muted leading-relaxed">
          In the Roux method&apos;s third step, CMLL orients <em>and</em> permutes the four
          last-layer corners in one go, ignoring the M-slice edges. Cases are grouped by their
          corner-orientation pattern — recognise the pattern, then pick the algorithm.
        </p>
      </header>

      {cmllGroups.map((group) => (
        <section key={group.category} className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-tight">
            {group.category}
            <span className="ml-2 text-sm font-normal text-muted">
              {group.algs.length} case{group.algs.length === 1 ? "" : "s"}
            </span>
          </h2>
          <AlgList algs={group.algs} />
        </section>
      ))}

      <p className="text-xs text-muted border-t border-border pt-6">
        Notation: <span className="font-mono">R U F</span> = clockwise, <span className="font-mono">R&apos;</span>{" "}
        = counter-clockwise, <span className="font-mono">R2</span> = 180°; lowercase (
        <span className="font-mono">r</span>) are wide moves. Algorithms sourced from{" "}
        <a
          href="https://speedcubedb.com/a/3x3/CMLL"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          Speed Cube Database
        </a>
        ; several valid algorithms may exist per case.
      </p>
    </div>
  );
}
