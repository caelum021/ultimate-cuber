"use client";

import Image from "next/image";
import Link from "next/link";
import { useT } from "@/components/SettingsProvider";

export function Nav() {
  const t = useT();
  return (
    <header className="border-b border-border bg-card/60 backdrop-blur sticky top-0 z-20">
      <nav className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight flex items-center gap-2">
          <Image
            src="/logo.jpg"
            alt="Ultimate Cuber logo"
            width={28}
            height={28}
            className="rounded-full"
            priority
          />
          <span>
            Ultimate<span className="text-muted">Cuber</span>
          </span>
        </Link>
        <div className="flex items-center gap-1 text-sm">
          <NavLink href="/timer">{t.nav.timer}</NavLink>
          <NavLink href="/learn">{t.nav.learn}</NavLink>
          <NavLink href="/settings">{t.nav.settings}</NavLink>
        </div>
      </nav>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-3 py-1.5 rounded-md text-muted hover:text-foreground hover:bg-border/50 transition-colors"
    >
      {children}
    </Link>
  );
}
