// Tiny sound-effects helper for the timer. Instead of loading audio files, we
// synthesise short beeps with the Web Audio API — so there are no downloads and
// the sounds work instantly and offline.

// One shared AudioContext, created lazily on first use. Browsers only allow
// audio to start after a user gesture (a tap or key press), which is exactly
// when we play these, so this is safe.
let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      ctx = new AudioCtx();
    }
    // Resume if the browser suspended it (common until the first gesture).
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

/** Play a single tone. `at` is an offset in seconds so notes can be sequenced. */
function tone(
  freq: number,
  {
    at = 0,
    duration = 0.12,
    type = "sine",
    volume = 0.2,
  }: { at?: number; duration?: number; type?: OscillatorType; volume?: number } = {},
): void {
  const audio = getCtx();
  if (!audio) return;

  const start = audio.currentTime + at;
  const osc = audio.createOscillator();
  const gain = audio.createGain();

  osc.type = type;
  osc.frequency.value = freq;

  // A quick fade-in/out envelope keeps the beep from clicking.
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(volume, start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  osc.connect(gain).connect(audio.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

/** A soft blip when the solve starts. */
export function playStart(): void {
  tone(880, { duration: 0.09, type: "triangle", volume: 0.18 });
}

/** A gentle two-note "done" when the solve stops. */
export function playStop(): void {
  tone(660, { duration: 0.09, type: "triangle", volume: 0.18 });
  tone(440, { at: 0.09, duration: 0.13, type: "triangle", volume: 0.18 });
}

/** A happy rising fanfare for a new personal best. 🎉 */
export function playPB(): void {
  // C5 → E5 → G5 → C6, each a little after the last.
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((freq, i) => {
    tone(freq, { at: i * 0.12, duration: 0.16, type: "triangle", volume: 0.22 });
  });
}
