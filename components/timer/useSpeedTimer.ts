"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Penalty } from "@/lib/solves";

export type TimerPhase =
  | "idle" // showing last time, waiting
  | "inspecting" // 15s WCA inspection running
  | "holding" // key/touch down, not held long enough yet (red)
  | "ready" // held past threshold (green), release to start
  | "running"; // solve in progress

const DEFAULT_HOLD_THRESHOLD_MS = 300; // how long to hold before "ready"
const INSPECTION_SECONDS = 15;

type Options = {
  useInspection: boolean;
  /** How long to hold before the timer arms (ms). Defaults to 300. */
  holdThresholdMs?: number;
  /** When false, global spacebar handling is disabled (e.g. typing mode). */
  enabled?: boolean;
  onSolveComplete: (ms: number, inspectionPenalty: Penalty) => void;
};

/**
 * WCA-style timer state machine. Drives both keyboard (spacebar) and pointer
 * (tap/touch) input through the same phases:
 *   idle → (tap starts inspection) → inspecting → hold → ready → running → idle
 * Timing uses performance.now() for accuracy; the display is updated via rAF.
 */
export function useSpeedTimer({
  useInspection,
  holdThresholdMs = DEFAULT_HOLD_THRESHOLD_MS,
  enabled = true,
  onSolveComplete,
}: Options) {
  const [phase, setPhase] = useState<TimerPhase>("idle");
  const [displayMs, setDisplayMs] = useState(0);
  const [inspectionRemaining, setInspectionRemaining] = useState(INSPECTION_SECONDS);

  // Refs mirror state so window event handlers never read stale values.
  const phaseRef = useRef<TimerPhase>("idle");
  const inspectionActiveRef = useRef(false);
  const startTimeRef = useRef(0);
  const inspectionStartRef = useRef(0);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const onSolveCompleteRef = useRef(onSolveComplete);

  useEffect(() => {
    onSolveCompleteRef.current = onSolveComplete;
  }, [onSolveComplete]);

  const setPhaseBoth = useCallback((p: TimerPhase) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  const stopRaf = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const inspectionPenalty = useCallback((): Penalty => {
    const elapsed = (performance.now() - inspectionStartRef.current) / 1000;
    if (elapsed > INSPECTION_SECONDS + 2) return "DNF";
    if (elapsed > INSPECTION_SECONDS) return "+2";
    return "OK";
  }, []);

  const startInspection = useCallback(() => {
    inspectionActiveRef.current = true;
    inspectionStartRef.current = performance.now();
    setInspectionRemaining(INSPECTION_SECONDS);
    setPhaseBoth("inspecting");

    const tick = () => {
      if (phaseRef.current !== "inspecting" && phaseRef.current !== "holding" && phaseRef.current !== "ready") {
        return;
      }
      const elapsed = (performance.now() - inspectionStartRef.current) / 1000;
      setInspectionRemaining(Math.max(-2, INSPECTION_SECONDS - elapsed));
      if (inspectionActiveRef.current) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [setPhaseBoth]);

  const startSolve = useCallback(() => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    stopRaf();
    startTimeRef.current = performance.now();
    setPhaseBoth("running");

    const tick = () => {
      setDisplayMs(performance.now() - startTimeRef.current);
      if (phaseRef.current === "running") rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [setPhaseBoth, stopRaf]);

  const stopSolve = useCallback(() => {
    stopRaf();
    const ms = performance.now() - startTimeRef.current;
    setDisplayMs(ms);
    const penalty = inspectionActiveRef.current ? inspectionPenalty() : "OK";
    inspectionActiveRef.current = false;
    setPhaseBoth("idle");
    onSolveCompleteRef.current(ms, penalty);
  }, [inspectionPenalty, setPhaseBoth, stopRaf]);

  const beginHold = useCallback(() => {
    setPhaseBoth("holding");
    if (holdThresholdMs <= 0) {
      // No hold required — arm immediately.
      setPhaseBoth("ready");
      return;
    }
    holdTimerRef.current = setTimeout(() => {
      setPhaseBoth("ready");
    }, holdThresholdMs);
  }, [setPhaseBoth, holdThresholdMs]);

  const cancelHold = useCallback(() => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    setPhaseBoth(inspectionActiveRef.current ? "inspecting" : "idle");
  }, [setPhaseBoth]);

  // Shared "press down" handler for both keyboard and pointer.
  const handleDown = useCallback(() => {
    const p = phaseRef.current;
    if (p === "running") {
      stopSolve();
      return;
    }
    if (p === "holding" || p === "ready") return;
    // p is idle or inspecting
    if (p === "idle" && useInspection && !inspectionActiveRef.current) {
      startInspection();
      return;
    }
    beginHold();
  }, [beginHold, startInspection, stopSolve, useInspection]);

  // Shared "release" handler.
  const handleUp = useCallback(() => {
    const p = phaseRef.current;
    if (p === "ready") {
      startSolve();
      return;
    }
    if (p === "holding") {
      cancelHold();
    }
    // inspecting/idle/running releases are ignored
  }, [cancelHold, startSolve]);

  // Keyboard: spacebar drives the timer globally on the page.
  useEffect(() => {
    if (!enabled) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      if (e.repeat) return; // ignore auto-repeat while holding
      // Don't hijack space when typing in a field.
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }
      e.preventDefault();
      handleDown();
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      e.preventDefault();
      handleUp();
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [handleDown, handleUp, enabled]);

  // Cleanup timers on unmount.
  useEffect(() => {
    return () => {
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /** Overwrite the big number (e.g. to show a freshly loaded PB or reset). */
  const setDisplay = useCallback((ms: number) => setDisplayMs(ms), []);

  return {
    phase,
    displayMs,
    inspectionRemaining,
    // pointer handlers for the tap pad (touch / click)
    onPointerDown: handleDown,
    onPointerUp: handleUp,
    setDisplay,
  };
}
