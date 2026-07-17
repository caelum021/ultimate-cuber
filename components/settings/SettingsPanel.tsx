"use client";

import { useSettings } from "@/components/SettingsProvider";
import { SCRAMBLE_MAX, SCRAMBLE_MIN } from "@/lib/settings";

export function SettingsPanel() {
  const { settings, update, reset } = useSettings();

  return (
    <div className="mx-auto max-w-2xl w-full px-4 py-10 flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="mt-2 text-muted">
          Changes save automatically and apply everywhere on this device.
        </p>
      </header>

      {/* Timer */}
      <section className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-2">Timer</h2>
        <div className="rounded-xl border border-border bg-card divide-y divide-border">
          <Row
            title="Timing method"
            desc="Timer: hold space / tap to time on-screen. Typing: use your own physical timer and type the result."
          >
            <Segmented
              value={settings.timingMethod}
              options={[
                { value: "timer", label: "Timer" },
                { value: "typing", label: "Typing" },
              ]}
              onChange={(v) => update({ timingMethod: v })}
            />
          </Row>

          <Row
            title="15-second inspection"
            desc="WCA-style inspection countdown before each solve, with +2 / DNF penalties."
          >
            <Toggle
              checked={settings.inspection}
              onChange={(v) => update({ inspection: v })}
              label="Inspection"
            />
          </Row>

          <Row
            title="Scramble length"
            desc="Number of moves in each generated 3×3 scramble."
          >
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={SCRAMBLE_MIN}
                max={SCRAMBLE_MAX}
                value={settings.scrambleLength}
                onChange={(e) => update({ scrambleLength: Number(e.target.value) })}
                className="accent-accent w-36"
                aria-label="Scramble length"
              />
              <span className="font-mono tabular-nums w-8 text-right">{settings.scrambleLength}</span>
            </div>
          </Row>

          <Row
            title="Hide time while solving"
            desc="Shows “solving…” instead of the running time, then reveals it when you stop."
          >
            <Toggle
              checked={settings.hideWhileSolving}
              onChange={(v) => update({ hideWhileSolving: v })}
              label="Hide time while solving"
            />
          </Row>
        </div>
      </section>

      {/* Appearance */}
      <section className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-2">Appearance</h2>
        <div className="rounded-xl border border-border bg-card divide-y divide-border">
          <Row title="Theme" desc="Switch between dark and light across the whole site.">
            <Segmented
              value={settings.theme}
              options={[
                { value: "dark", label: "Dark" },
                { value: "light", label: "Light" },
              ]}
              onChange={(v) => update({ theme: v })}
            />
          </Row>
        </div>
      </section>

      <div>
        <button
          onClick={reset}
          className="text-sm text-muted hover:text-red-400 transition"
        >
          Reset all settings to defaults
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
