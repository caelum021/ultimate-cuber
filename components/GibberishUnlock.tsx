"use client";

import { useBrainrotUnlock } from "@/components/BrainrotUnlock";

/**
 * Step 1 of the Brainrot unlock quest, disguised as the decorative ▶ on the
 * homepage YouTube card. Looks purely ornamental — hidden in plain sight. 🤫
 */
export function GibberishUnlock() {
  const { tapPlay } = useBrainrotUnlock();
  return (
    <button
      type="button"
      onClick={tapPlay}
      aria-label="Play"
      className="text-3xl leading-none select-none bg-transparent border-0 p-0 cursor-default"
    >
      ▶
    </button>
  );
}
