"use client";

import Link from "next/link";
import { useT } from "@/components/SettingsProvider";
import { FeedbackButton } from "@/components/FeedbackButton";
import { GibberishUnlock } from "@/components/GibberishUnlock";

export default function Home() {
  const t = useT();
  return (
    <div className="flex-1">
      <FeedbackButton />
      <section className="mx-auto max-w-5xl px-4 py-20 sm:py-28 text-center">
        <p className="text-accent text-sm font-medium tracking-wide uppercase">{t.home.eyebrow}</p>
        <h1 className="mt-3 text-4xl sm:text-6xl font-bold tracking-tight">{t.home.title}</h1>
        <p className="mt-5 mx-auto max-w-xl text-lg text-muted">{t.home.subtitle}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/timer"
            className="h-12 px-6 inline-flex items-center justify-center rounded-full bg-accent text-accent-fg font-semibold hover:brightness-110 transition"
          >
            {t.home.ctaTimer}
          </Link>
          <Link
            href="/learn"
            className="h-12 px-6 inline-flex items-center justify-center rounded-full border border-border hover:bg-card transition"
          >
            {t.home.ctaLearn}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-24 grid gap-4 sm:grid-cols-3">
        <Feature title={t.home.feat1Title} body={t.home.feat1Body} />
        <Feature title={t.home.feat2Title} body={t.home.feat2Body} />
        <Feature title={t.home.feat3Title} body={t.home.feat3Body} />
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-24">
        <div className="rounded-2xl border border-border bg-card p-8 sm:p-10 flex flex-col items-center text-center gap-4">
          <GibberishUnlock />
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{t.home.subTitle}</h2>
          <p className="max-w-md text-muted">{t.home.subBody}</p>
          <a
            href="https://www.youtube.com/@UltimateCuber7?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-red-600 text-white px-6 py-2.5 font-semibold hover:bg-red-500 transition"
          >
            {t.home.subBtn}
            <span aria-hidden>↗</span>
          </a>
        </div>
      </section>
    </div>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted leading-relaxed">{body}</p>
    </div>
  );
}
