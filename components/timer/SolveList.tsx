"use client";

import { effectiveMs, type Penalty, type Solve } from "@/lib/solves";
import { formatMs } from "@/lib/stats";
import { useSettings, useT } from "@/components/SettingsProvider";

type Props = {
  solves: Solve[]; // newest-first
  onSetPenalty: (id: string, penalty: Penalty) => void;
  onDelete: (id: string) => void;
};

export function SolveList({ solves, onSetPenalty, onDelete }: Props) {
  const { settings } = useSettings();
  const t = useT();
  const decimals = settings.showMilliseconds ? 3 : 2;
  if (solves.length === 0) {
    return (
      <p className="text-sm text-muted text-center py-8">
        {t.timer.noSolvesPre}{" "}
        <kbd className="px-1.5 py-0.5 rounded bg-card border border-border">space</kbd>{" "}
        {t.timer.noSolvesPost}
      </p>
    );
  }

  return (
    <ul className="divide-y divide-border">
      {solves.map((solve, i) => {
        const number = solves.length - i;
        return (
          <li key={solve.id} className="flex items-center gap-3 py-2">
            <span className="w-8 text-xs text-muted tabular-nums">{number}.</span>
            <span className="w-20 font-mono font-semibold tabular-nums">
              {formatMs(effectiveMs(solve), decimals)}
              {solve.penalty === "+2" && <span className="text-amber-400 text-xs align-super"> +2</span>}
            </span>
            <div className="flex gap-1 text-xs">
              <PenaltyButton active={solve.penalty === "OK"} onClick={() => onSetPenalty(solve.id, "OK")}>
                OK
              </PenaltyButton>
              <PenaltyButton active={solve.penalty === "+2"} onClick={() => onSetPenalty(solve.id, "+2")}>
                +2
              </PenaltyButton>
              <PenaltyButton active={solve.penalty === "DNF"} onClick={() => onSetPenalty(solve.id, "DNF")}>
                DNF
              </PenaltyButton>
            </div>
            <button
              onClick={() => onDelete(solve.id)}
              className="ml-auto text-muted hover:text-red-400 text-xs px-2 py-1 rounded hover:bg-card transition"
              aria-label={`Delete solve ${number}`}
            >
              ✕
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function PenaltyButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-0.5 rounded border transition ${
        active
          ? "bg-accent text-accent-fg border-accent font-medium"
          : "border-border text-muted hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
