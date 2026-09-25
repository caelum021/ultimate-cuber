import type { Metadata } from "next";
import Link from "next/link";
import { scrambleImageUrl } from "@/lib/caseImage";

export const metadata: Metadata = {
  title: "Notation — how to read algorithms",
  description:
    "A visual guide to Rubik's Cube notation: face turns (R U F L D B), primes and doubles, wide moves, slice moves (M E S) and cube rotations (x y z).",
};

type Move = { move: string; desc: string };
type Section = { title: string; intro: string; moves: Move[] };

const sections: Section[] = [
  {
    title: "Face turns",
    intro:
      "Each letter is one face of the cube. A plain letter means turn that face 90° clockwise — clockwise as if you were looking straight at that face.",
    moves: [
      { move: "R", desc: "Right face" },
      { move: "L", desc: "Left face" },
      { move: "U", desc: "Up (top) face" },
      { move: "D", desc: "Down (bottom) face" },
      { move: "F", desc: "Front face — the one facing you" },
      { move: "B", desc: "Back face" },
    ],
  },
  {
    title: "Primes and doubles",
    intro:
      "An apostrophe (read “prime”) reverses the turn to counter-clockwise. A 2 means turn the face twice (180°) — direction doesn’t matter.",
    moves: [
      { move: "R'", desc: "Right face counter-clockwise" },
      { move: "U'", desc: "Top face counter-clockwise" },
      { move: "R2", desc: "Right face 180°" },
      { move: "U2", desc: "Top face 180°" },
    ],
  },
  {
    title: "Wide moves",
    intro:
      "A lowercase letter (or a w, like Rw) turns the face together with the middle layer next to it — two layers at once.",
    moves: [
      { move: "r", desc: "Right two layers (same as Rw)" },
      { move: "u", desc: "Top two layers (same as Uw)" },
      { move: "f", desc: "Front two layers (same as Fw)" },
    ],
  },
  {
    title: "Slice moves",
    intro:
      "Slice moves turn only a middle layer. M follows L, E follows D, and S follows F — handy for remembering which way they go.",
    moves: [
      { move: "M", desc: "Middle layer between L and R, turned like L" },
      { move: "E", desc: "Equator layer between U and D, turned like D" },
      { move: "S", desc: "Standing layer between F and B, turned like F" },
    ],
  },
  {
    title: "Cube rotations",
    intro:
      "Rotations turn the whole cube in your hands — no layers move relative to each other. x follows R, y follows U, and z follows F.",
    moves: [
      { move: "x", desc: "Whole cube, turned like R" },
      { move: "y", desc: "Whole cube, turned like U" },
      { move: "z", desc: "Whole cube, turned like F" },
    ],
  },
];

const triggers: Move[] = [
  { move: "R U R' U'", desc: "The “sexy move” — the most common trigger in CFOP" },
  { move: "R' F R F'", desc: "The “sledgehammer” — shows up in many OLLs" },
  { move: "R U R'", desc: "Insert a pair — the basic F2L trigger" },
];

export default function NotationPage() {
  return (
    <div className="mx-auto max-w-3xl w-full px-4 py-10 flex flex-col gap-8">
      <header>
        <Link href="/learn" className="text-sm text-muted hover:text-foreground transition">
          ← Back to learning hub
        </Link>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Notation · how to read algorithms</h1>
        <p className="mt-3 text-muted leading-relaxed">
          Every algorithm on this site is written in standard cube notation. Hold the cube with one
          face toward you and the top face up — each picture shows a solved cube right after that one
          move, so you can check you turned it the right way.
        </p>
      </header>

      {sections.map((s) => (
        <section key={s.title} className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold tracking-tight">{s.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{s.intro}</p>
          <ul className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {s.moves.map((m) => (
              <li key={m.move} className="flex flex-col items-center text-center gap-2">
                <MoveImage moves={m.move} />
                <code className="font-mono text-lg font-semibold text-foreground">{m.move}</code>
                <span className="text-xs text-muted">{m.desc}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold tracking-tight">Reading a whole algorithm</h2>
        <div className="mt-2 flex flex-col gap-3 text-sm leading-relaxed text-muted">
          <p>
            Do the moves left to right, one at a time. Parentheses like{" "}
            <span className="font-mono text-foreground">(R U R&apos; U&apos;)</span> just group a
            trigger — a short chunk your hands learn as one motion. They don&apos;t change the moves.
          </p>
          <p>These three triggers show up everywhere, so they&apos;re worth drilling first:</p>
        </div>
        <ul className="mt-4 flex flex-col divide-y divide-border">
          {triggers.map((t) => (
            <li key={t.move} className="py-3 flex items-center gap-3">
              <MoveImage moves={t.move} size={56} />
              <div className="flex-1 min-w-0">
                <code className="font-mono text-sm text-foreground">{t.move}</code>
                <p className="text-xs text-muted mt-0.5">{t.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-xs text-muted border-t border-border pt-6">
        Cube images rendered by{" "}
        <a
          href="https://visualcube.api.cubing.net"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          VisualCube
        </a>
        .
      </p>
    </div>
  );
}

function MoveImage({ moves, size = 96 }: { moves: string; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={scrambleImageUrl(moves)}
      alt={`Cube after ${moves}`}
      loading="lazy"
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className="shrink-0 select-none"
    />
  );
}
