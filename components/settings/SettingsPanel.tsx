"use client";

import { useSettings, useT } from "@/components/SettingsProvider";
import { SCRAMBLE_MAX, SCRAMBLE_MIN } from "@/lib/settings";
import { LANGUAGES } from "@/lib/i18n";

export function SettingsPanel() {
  const { settings, update, reset } = useSettings();
  const t = useT();

  // Gibberish is a hidden easter egg — only show it once unlocked (or already in use).
  const visibleLanguages = LANGUAGES.filter(
    (l) => l.code !== "gib" || settings.gibberishUnlocked || settings.language === "gib",
  );

  return (
    <div className="mx-auto max-w-2xl w-full px-4 py-10 flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">{t.settings.title}</h1>
        <p className="mt-2 text-muted">{t.settings.subtitle}</p>
      </header>

      {/* Timer */}
      <section className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-2">
          {t.settings.timerSection}
        </h2>
        <div className="rounded-xl border border-border bg-card divide-y divide-border">
          <Row title={t.settings.timingMethod} desc={t.settings.timingMethodDesc}>
            <Segmented
              value={settings.timingMethod}
              options={[
                { value: "timer", label: t.settings.timerLabel },
                { value: "typing", label: t.settings.typingLabel },
              ]}
              onChange={(v) => update({ timingMethod: v })}
            />
          </Row>

          <Row title={t.settings.inspection} desc={t.settings.inspectionDesc}>
            <Toggle
              checked={settings.inspection}
              onChange={(v) => update({ inspection: v })}
              label={t.settings.inspection}
            />
          </Row>

          <Row title={t.settings.scrambleLength} desc={t.settings.scrambleLengthDesc}>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={SCRAMBLE_MIN}
                max={SCRAMBLE_MAX}
                value={settings.scrambleLength}
                onChange={(e) => update({ scrambleLength: Number(e.target.value) })}
                className="accent-accent w-36"
                aria-label={t.settings.scrambleLength}
              />
              <span className="font-mono tabular-nums w-8 text-right">{settings.scrambleLength}</span>
            </div>
          </Row>

          <Row title={t.settings.hideWhileSolving} desc={t.settings.hideWhileSolvingDesc}>
            <Toggle
              checked={settings.hideWhileSolving}
              onChange={(v) => update({ hideWhileSolving: v })}
              label={t.settings.hideWhileSolving}
            />
          </Row>

          <Row title={t.settings.showMs} desc={t.settings.showMsDesc}>
            <Toggle
              checked={settings.showMilliseconds}
              onChange={(v) => update({ showMilliseconds: v })}
              label={t.settings.showMs}
            />
          </Row>
        </div>
      </section>

      {/* Appearance */}
      <section className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-2">
          {t.settings.appearanceSection}
        </h2>
        <div className="rounded-xl border border-border bg-card divide-y divide-border">
          <Row title={t.settings.theme} desc={t.settings.themeDesc}>
            <Segmented
              value={settings.theme}
              options={[
                { value: "dark", label: t.settings.dark },
                { value: "light", label: t.settings.light },
              ]}
              onChange={(v) => update({ theme: v })}
            />
          </Row>

          {/* Language: full-width so all options (incl. Gibberish) wrap neatly */}
          <div className="p-4">
            <p className="font-medium">{t.settings.language}</p>
            <p className="text-sm text-muted mt-0.5">{t.settings.languageDesc}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {visibleLanguages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => update({ language: l.code })}
                  className={`px-3 py-1.5 rounded-full text-sm border transition ${
                    settings.language === l.code
                      ? "bg-accent text-accent-fg border-accent font-medium"
                      : "border-border text-muted hover:text-foreground"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div>
        <button onClick={reset} className="text-sm text-muted hover:text-red-400 transition">
          {t.settings.reset}
        </button>
      </div>
    </div>
  );
}

function Row({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted mt-0.5">{desc}</p>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 rounded-full transition-colors ${
        checked ? "bg-accent" : "bg-border"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function Segmented<T extends string | number>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="inline-flex rounded-lg border border-border p-0.5 bg-background">
      {options.map((opt) => (
        <button
          key={String(opt.value)}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1 rounded-md text-sm transition-colors ${
            value === opt.value
              ? "bg-accent text-accent-fg font-medium"
              : "text-muted hover:text-foreground"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
