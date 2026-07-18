"use client";

import Link from "next/link";
import { useSettings, useT } from "@/components/SettingsProvider";
import { CaseDiagram } from "@/components/learn/CaseDiagram";
import {
  cfopOverview,
  f2lGuide,
  fullPLLFavorites,
  localizeGuide,
  localizeSet,
  ortegaGuide,
  ortegaOLL,
  ortegaPBL,
  rouxCMLL,
  rouxGuide,
  twoByTwoBeginner,
  twoLookOLL,
  twoLookPLL,
  wvlsAlgs,
  wvlsGuide,
  type AlgSet,
  type Guide,
} from "@/lib/learn";

export function LearnHub() {
  const { settings } = useSettings();
  const t = useT();
  const lang = settings.language;

  // Map the English "Learn more" labels to translated ones.
  const labelMap: Record<string, string> = {
    "View all 57 OLL algorithms": t.learn.viewAllOLL,
    "View all 21 PLL algorithms": t.learn.viewAllPLL,
    "View all 27 WV algorithms": t.learn.viewAllWVLS,
    "View all 42 CMLL algorithms": t.learn.viewAllCMLL,
    "View all 2×2 algorithms": t.learn.viewAll2x2,
    "Open the full 2×2 guide": t.learn.openFull2x2,
  };
  const label = (raw?: string) => (raw ? labelMap[raw] ?? raw : undefined);

  const guide = (g: Guide) => localizeGuide(g, lang);
  const set = (s: AlgSet) => localizeSet(s, lang);
  const learnMore = t.learn.learnMore;

  return (
    <div className="mx-auto max-w-3xl w-full px-4 py-10 flex flex-col gap-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">{t.learn.hubTitle}</h1>
        <p className="mt-2 text-muted">{t.learn.hubIntro}</p>
      </header>

      <GuideBlock guide={guide(cfopOverview)} label={label(cfopOverview.learnMoreLabel)} fallback={learnMore} />
      <GuideBlock guide={guide(f2lGuide)} label={label(f2lGuide.learnMoreLabel)} fallback={learnMore} />

      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold tracking-tight">{t.learn.secOLL}</h2>
        {twoLookOLL.map((s) => (
          <AlgSetCard key={s.id} set={set(s)} label={label(s.learnMoreLabel)} fallback={learnMore} />
        ))}
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold tracking-tight">{t.learn.secPLL}</h2>
        {twoLookPLL.map((s) => (
          <AlgSetCard key={s.id} set={set(s)} label={label(s.learnMoreLabel)} fallback={learnMore} />
        ))}
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold tracking-tight">{t.learn.secLevelUp}</h2>
        <AlgSetCard
          set={set(fullPLLFavorites)}
          label={label(fullPLLFavorites.learnMoreLabel)}
          fallback={learnMore}
        />
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold tracking-tight">{t.learn.secWVLS}</h2>
        <GuideBlock guide={guide(wvlsGuide)} label={label(wvlsGuide.learnMoreLabel)} fallback={learnMore} />
        <AlgSetCard set={set(wvlsAlgs)} label={label(wvlsAlgs.learnMoreLabel)} fallback={learnMore} />
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold tracking-tight">{t.learn.secRoux}</h2>
        <GuideBlock guide={guide(rouxGuide)} label={label(rouxGuide.learnMoreLabel)} fallback={learnMore} />
        <AlgSetCard set={set(rouxCMLL)} label={label(rouxCMLL.learnMoreLabel)} fallback={learnMore} />
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold tracking-tight">{t.learn.sec2x2}</h2>
        <p className="text-muted -mt-2">{t.learn.sec2x2Intro}</p>
        <GuideBlock
          guide={guide(twoByTwoBeginner)}
          label={label(twoByTwoBeginner.learnMoreLabel)}
          fallback={learnMore}
        />
        <GuideBlock guide={guide(ortegaGuide)} label={label(ortegaGuide.learnMoreLabel)} fallback={learnMore} />
        <AlgSetCard set={set(ortegaOLL)} label={label(ortegaOLL.learnMoreLabel)} fallback={learnMore} />
        <AlgSetCard set={set(ortegaPBL)} label={label(ortegaPBL.learnMoreLabel)} fallback={learnMore} />
      </div>

      <p className="text-xs text-muted border-t border-border pt-6">{t.learn.notation}</p>

      <section className="rounded-xl border border-border bg-card p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{t.learn.watchHeading}</h2>
        </div>
        <a
          href="https://www.youtube.com/watch?v=HR1HADV5604"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 rounded-full bg-accent text-accent-fg px-5 py-2 text-sm font-semibold hover:brightness-110 transition"
        >
          {t.learn.watchBtn}
          <span aria-hidden>↗</span>
        </a>
      </section>
    </div>
  );
}

function GuideBlock({ guide, label, fallback }: { guide: Guide; label?: string; fallback: string }) {
  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-xl font-semibold tracking-tight">{guide.title}</h2>
      <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-muted">
        {guide.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <LearnMore url={guide.learnMoreUrl} label={label} fallback={fallback} />
    </section>
  );
}

function AlgSetCard({ set, label, fallback }: { set: AlgSet; label?: string; fallback: string }) {
  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <h3 className="font-semibold">{set.title}</h3>
      <p className="mt-1 text-sm text-muted">{set.summary}</p>
      <ul className="mt-4 flex flex-col divide-y divide-border">
        {set.algs.map((alg) => (
          <li key={alg.name} className="py-3 flex items-center gap-3">
            <CaseDiagram moves={alg.moves} pzl={set.pzl} size={48} bothFaces={set.bothFaces} />
            <span className="w-24 shrink-0 font-medium text-sm">{alg.name}</span>
            <div className="flex-1 min-w-0">
              <code className="font-mono text-sm text-foreground break-words">{alg.moves}</code>
              {alg.note && <p className="text-xs text-muted mt-0.5">{alg.note}</p>}
            </div>
          </li>
        ))}
      </ul>
      <LearnMore url={set.learnMoreUrl} label={label} fallback={fallback} />
    </section>
  );
}

function LearnMore({ url, label, fallback }: { url?: string; label?: string; fallback: string }) {
  if (!url) return null;
  const isInternal = url.startsWith("/");
  const text = label ?? fallback;
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
