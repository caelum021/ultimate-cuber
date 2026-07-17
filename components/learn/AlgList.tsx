import type { Algorithm } from "@/lib/learn";

/** Responsive grid of algorithm cards (name + notation + optional note). */
export function AlgList({ algs }: { algs: Algorithm[] }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {algs.map((alg) => (
        <div key={alg.name} className="rounded-lg border border-border bg-card p-4">
          <span className="text-sm font-semibold">{alg.name}</span>
          <code className="mt-1.5 block font-mono text-sm break-words text-foreground">
            {alg.moves}
          </code>
          {alg.note && <p className="mt-1 text-xs text-muted">{alg.note}</p>}
        </div>
      ))}
    </div>
  );
}
