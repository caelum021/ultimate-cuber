import type { Algorithm } from "@/lib/learn";
import { CaseDiagram } from "@/components/learn/CaseDiagram";

/** Responsive grid of algorithm cards (diagram + name + notation + optional note). */
export function AlgList({
  algs,
  pzl = 3,
  bothFaces = false,
}: {
  algs: Algorithm[];
  pzl?: number;
  bothFaces?: boolean;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {algs.map((alg) => (
        <div key={alg.name} className="rounded-lg border border-border bg-card p-4 flex gap-3">
          <CaseDiagram moves={alg.moves} pzl={pzl} size={56} bothFaces={bothFaces} />
          <div className="min-w-0">
            <span className="text-sm font-semibold">{alg.name}</span>
            <code className="mt-1.5 block font-mono text-sm break-words text-foreground">
              {alg.moves}
            </code>
            {alg.note && <p className="mt-1 text-xs text-muted">{alg.note}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
