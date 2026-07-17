import type { Metadata } from "next";
import Link from "next/link";
import {
  cfopOverview,
  f2lGuide,
  fullPLLFavorites,
  rouxCMLL,
  rouxGuide,
  twoLookOLL,
  twoLookPLL,
  wvlsAlgs,
  wvlsGuide,
  type AlgSet,
  type Guide,
} from "@/lib/learn";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Learn CFOP: cross, F2L, 2-look OLL and 2-look PLL algorithm sets, and the habits that take you to sub-20.",
};

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-3xl w-full px-4 py-10 flex flex-col gap-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Learning hub</h1>
        <p className="mt-2 text-muted">
          Everything you need to go from a beginner method to a sub-20 CFOP solve. Start with the
          overview, drill F2L, then pick up 2-look OLL and PLL.
        </p>
      </header>

      <GuideBlock guide={cfopOverview} />
      <GuideBlock guide={f2lGuide} />

      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold tracking-tight">2-Look OLL</h2>
        {twoLookOLL.map((set) => (
          <AlgSetCard key={set.id} set={set} />
        ))}
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold tracking-tight">2-Look PLL</h2>
        {twoLookPLL.map((set) => (
          <AlgSetCard key={set.id} set={set} />
        ))}
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold tracking-tight">Level up</h2>
        <AlgSetCard set={fullPLLFavorites} />
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold tracking-tight">Advanced CFOP: WVLS</h2>
        <GuideBlock guide={wvlsGuide} />
        <AlgSetCard set={wvlsAlgs} />
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold tracking-tight">Alternative method: Roux</h2>
        <GuideBlock guide={rouxGuide} />
        <AlgSetCard set={rouxCMLL} />
      </div>

      <p className="text-xs text-muted border-t border-border pt-6">
        Notation: <span className="font-mono">R U F</span> = clockwise face turns,{" "}
        <span className="font-mono">R'</span> = counter-clockwise,{" "}
        <span className="font-mono">R2</span> = 180°. Lowercase (
        <span className="font-mono">r, f</span>) and <span className="font-mono">M</span> are wide/slice
        moves.
      </p>

      <section className="rounded-xl border border-border bg-card p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">
            If you want to learn the Beginner&apos;s Method, click this link below.
          </h2>
        </div>
        <a
          href="https://www.youtube.com/watch?v=HR1HADV5604"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 rounded-full bg-accent text-accent-fg px-5 py-2 text-sm font-semibold hover:brightness-110 transition"
        >
          Watch on YouTube
          <span aria-hidden>↗</span>
        </a>
      </section>
    </div>
  );
}

function GuideBlock({ guide }: { guide: Guide }) {
  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-xl font-semibold tracking-tight">{guide.title}</h2>
      <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-muted">
        {guide.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <LearnMore url={guide.learnMoreUrl} label={guide.learnMoreLabel} />
    </section>
  );
}

function LearnMore({ url, label }: { url?: string; label?: string }) {
  if (!url) return null;
  const isInternal = url.startsWith("/");
  const text = label ?? "Learn more";
  const className =
    "mt-5 inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-sm text-foreground hover:border-accent hover:text-accent transition";

  if (isInternal) {
    return (
      <Link href={url} className={className}>
        {text}
        <span aria-hidden>→</span>
      </Link>
    );
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
      {text}
      <span aria-hidden>↗</span>
    </a>
  );
}

function AlgSetCard({ set }: { set: AlgSet }) {
  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <h3 className="font-semibold">{set.title}</h3>
      <p className="mt-1 text-sm text-muted">{set.summary}</p>
      <ul className="mt-4 flex flex-col divide-y divide-border">
        {set.algs.map((alg) => (
          <li key={alg.name} className="py-3 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
            <span className="w-28 shrink-0 font-medium">{alg.name}</span>
            <div className="flex-1">
              <code className="font-mono text-sm text-foreground break-words">{alg.moves}</code>
              {alg.note && <p className="text-xs text-muted mt-0.5">{alg.note}</p>}
            </div>
          </li>
        ))}
      </ul>
      <LearnMore url={set.learnMoreUrl} label={set.learnMoreLabel} />
    </section>
  );
}
