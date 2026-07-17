import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1">
      <section className="mx-auto max-w-5xl px-4 py-20 sm:py-28 text-center">
        <p className="text-accent text-sm font-medium tracking-wide uppercase">
          Your road to sub-20 and beyond
        </p>
        <h1 className="mt-3 text-4xl sm:text-6xl font-bold tracking-tight">
          The ultimate speedcubing companion
        </h1>
        <p className="mt-5 mx-auto max-w-xl text-lg text-muted">
          A fast, WCA-style timer that tracks every solve — ao5, ao12, and your
          PB — plus a learning hub to master OLL, PLL, and F2L.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/timer"
            className="h-12 px-6 inline-flex items-center justify-center rounded-full bg-accent text-accent-fg font-semibold hover:brightness-110 transition"
          >
            Start timing →
          </Link>
          <Link
            href="/learn"
            className="h-12 px-6 inline-flex items-center justify-center rounded-full border border-border hover:bg-card transition"
          >
            Explore the learning hub
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-24 grid gap-4 sm:grid-cols-3">
        <Feature
          title="Fresh scrambles"
          body="A new randomized 3×3 scramble on every solve, generated instantly in your browser — no waiting, works offline."
        />
        <Feature
          title="Smart stats"
          body="Live ao5 / ao12 / ao100, session mean, and best — with proper +2 and DNF handling on every solve."
        />
        <Feature
          title="Learn to improve"
          body="Structured guides and algorithm sets for OLL, PLL, and F2L so you always know what to practice next."
        />
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-24">
        <div className="rounded-2xl border border-border bg-card p-8 sm:p-10 flex flex-col items-center text-center gap-4">
          <span className="text-3xl" aria-hidden>▶</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Subscribe to Ultimate Cuber on YouTube
          </h2>
          <p className="max-w-md text-muted">
            Tutorials, algorithm walkthroughs, and tips — from the beginner&apos;s method all the way
            to sub-20. New videos to help you improve.
          </p>
          <a
            href="https://www.youtube.com/@UltimateCuber7?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-red-600 text-white px-6 py-2.5 font-semibold hover:bg-red-500 transition"
          >
            Subscribe on YouTube
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
