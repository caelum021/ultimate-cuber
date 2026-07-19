"use client";

import { useEffect, useMemo, useState } from "react";

const COLORS = ["#f43f5e", "#f59e0b", "#22c55e", "#3b82f6", "#a855f7", "#eab308", "#ec4899"];
const PIECE_COUNT = 90;
const DURATION_MS = 3200;

type Piece = {
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
};

/**
 * A one-shot confetti burst. Re-fires whenever `fire` changes to a new non-zero
 * value (a nonce). Pure CSS animation — no dependencies. Cleans itself up.
 */
export function Confetti({ fire }: { fire: number }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (fire === 0) return;
    setActive(true);
    const timeout = window.setTimeout(() => setActive(false), DURATION_MS);
    return () => window.clearTimeout(timeout);
  }, [fire]);

  // New random layout each time it fires.
  const pieces = useMemo<Piece[]>(
    () =>
      Array.from({ length: PIECE_COUNT }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2.2 + Math.random() * 1.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 0.7 + Math.random() * 0.8,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fire],
  );

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[80] pointer-events-none overflow-hidden" aria-hidden>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `scale(${p.size})`,
          }}
        />
      ))}
    </div>
  );
}
