import type { Metadata } from "next";
import Link from "next/link";
import { ollAllAlgs } from "@/lib/learn";
import { AlgList } from "@/components/learn/AlgList";

export const metadata: Metadata = {
  title: "OLL — all 57 algorithms",
  description:
    "The complete set of 57 OLL (Orientation of the Last Layer) algorithms — orient the entire top face in a single step, the third stage of CFOP.",
};

export default function OllPage() {
  return (
    <div className="mx-auto max-w-3xl w-full px-4 py-10 flex flex-col gap-8">
      <header>
        <Link href="/learn" className="text-sm text-muted hover:text-foreground transition">
          ← Back to learning hub
        </Link>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">OLL · all 57 algorithms</h1>
        <p className="mt-3 text-muted leading-relaxed">
          OLL (Orientation of the Last Layer) makes the whole top face one color in a single
          algorithm. There are 57 cases — most cubers reach sub-20 on 2-look OLL first, then learn
          full OLL case by case. Parentheses group finger-trick triggers and are purely cosmetic.
        </p>
      </header>

      <AlgList algs={ollAllAlgs} />

      <p className="text-xs text-muted border-t border-border pt-6">
        Notation: <span className="font-mono">R U F</span> = clockwise, <span className="font-mono">R&apos;</span>{" "}
        = counter-clockwise, <span className="font-mono">R2</span> = 180°; lowercase (
        <span className="font-mono">r, f</span>), <span className="font-mono">M/S</span> (slices) and{" "}
        <span className="font-mono">x/y</span> (rotations) also appear. Algorithms sourced from{" "}
        <a
          href="https://speedcubedb.com/a/3x3/OLL"
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
