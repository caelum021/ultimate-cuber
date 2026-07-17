import type { Metadata } from "next";
import Link from "next/link";
import { wvAllAlgs } from "@/lib/learn";
import { AlgList } from "@/components/learn/AlgList";

export const metadata: Metadata = {
  title: "WVLS — all 27 Winter Variation algorithms",
  description:
    "The complete set of 27 Winter Variation (WV) algorithms — orient your last-layer corners while inserting the final F2L pair, then finish with a PLL.",
};

export default function WvlsPage() {
  return (
    <div className="mx-auto max-w-3xl w-full px-4 py-10 flex flex-col gap-8">
      <header>
        <Link href="/learn" className="text-sm text-muted hover:text-foreground transition">
          ← Back to learning hub
        </Link>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          WVLS · all 27 Winter Variation algorithms
        </h1>
        <p className="mt-3 text-muted leading-relaxed">
          Winter Variation orients all four last-layer corners <em>while</em> you insert your final
          F2L pair, letting you skip OLL-corners and go straight to PLL.
        </p>
        <p className="mt-2 text-sm text-muted leading-relaxed">
          <span className="text-foreground font-medium">Prerequisite:</span> the final corner-edge
          pair is already connected in the U layer, and all last-layer edges are oriented (yellow
          cross done). After WVLS every piece is oriented — finish with a single PLL.
        </p>
      </header>

      <AlgList algs={wvAllAlgs} />

      <SourceNote />
    </div>
  );
}

function SourceNote() {
  return (
    <p className="text-xs text-muted border-t border-border pt-6">
      Notation: <span className="font-mono">R U F</span> = clockwise, <span className="font-mono">R&apos;</span>{" "}
      = counter-clockwise, <span className="font-mono">R2</span> = 180°; lowercase (
      <span className="font-mono">r, Lw</span>) are wide moves. Algorithms sourced from{" "}
      <a
        href="https://speedcubedb.com/a/3x3/WV"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-foreground"
      >
        Speed Cube Database
      </a>
      ; several valid algorithms may exist per case.
    </p>
  );
}
