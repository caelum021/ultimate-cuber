"use client";

import Image from "next/image";
import Link from "next/link";
import { useT } from "@/components/SettingsProvider";

export function Nav() {
  const t = useT();
  return (
    <header className="border-b border-border bg-card/60 backdrop-blur sticky top-0 z-20">
      <nav className="mx-auto max-w-5xl px-3 sm:px-4 h-14 flex items-center justify-between gap-2">
        <Link href="/" className="font-semibold tracking-tight flex items-center gap-2 shrink-0">
          <Image
            src="/logo.jpg"
            alt="Ultimate Cuber logo"
            width={28}
            height={28}
            className="rounded-full"
            priority
          />
          {/* Wordmark hides on the smallest phones so the tabs never overlap it */}
          <span className="hidden min-[400px]:inline">
            Ultimate<span className="text-muted">Cuber</span>
          </span>
        </Link>
        <div className="flex items-center gap-0.5 sm:gap-1 text-sm">
          <NavLink href="/timer">{t.nav.timer}</NavLink>
          <NavLink href="/learn">{t.nav.learn}</NavLink>
          <NavLink href="/train">{t.nav.train}</NavLink>
          <NavLink href="/settings" ariaLabel={t.nav.settings}>
            <span className="text-lg leading-none" aria-hidden>
              ⚙
            </span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

function NavLink({
  href,
  children,
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      title={ariaLabel}
      className="px-2 sm:px-3 py-1.5 rounded-md text-muted hover:text-foreground hover:bg-border/50 transition-colors whitespace-nowrap"
    >
      {children}
    </Link>
  );
}
