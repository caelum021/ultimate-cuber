import type { Metadata } from "next";
import Link from "next/link";
import { pllAllAlgs } from "@/lib/learn";
import { AlgList } from "@/components/learn/AlgList";

export const metadata: Metadata = {
  title: "PLL — all 21 algorithms",
  description:
    "The complete set of 21 PLL (Permutation of the Last Layer) algorithms — the final CFOP step that positions the last-layer pieces after the top is oriented.",
};

export default function PllPage() {
  return (
    <div className="mx-auto max-w-3xl w-full px-4 py-10 flex flex-col gap-8">
      <header>
        <Link href="/learn" className="text-sm text-muted hover:text-foreground transition">
          ← Back to learning hub
        </Link>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">PLL · all 21 algorithms</h1>
        <p className="mt-3 text-muted leading-relaxed">
          PLL (Permutation of the Last Layer) is the final CFOP step: with the top face already one
          color, these 21 algorithms move the last-layer pieces into their solved positions. Learning
          full PLL (a solve is always exactly one of these) is a big step toward sub-20.
        </p>
      </header>

      <AlgList algs={pllAllAlgs} />

      <NotationNote setUrl="https://speedcubedb.com/a/3x3/PLL" />
    </div>
  );
}

function NotationNote({ setUrl }: { setUrl: string }) {
  return (
    <p className="text-xs text-muted border-t border-border pt-6">
      Notation: <span className="font-mono">R U F</span> = clockwise, <span className="font-mono">R&apos;</span>{" "}
      = counter-clockwise, <span className="font-mono">R2</span> = 180°; lowercase (
      <span className="font-mono">r, f</span>), <span className="font-mono">M/S</span> (slices) and{" "}
      <span className="font-mono">x/y</span> (rotations) also appear. Algorithms sourced from{" "}
      <a href={setUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
        Speed Cube Database
      </a>
      ; several valid algorithms may exist per case.
    </p>
  );
}
