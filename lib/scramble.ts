// Local 3x3 scramble generator — pure JS, no dependencies, no network.
// Produces a standard random-move scramble with the usual redundancy rules:
//   • never the same face twice in a row (e.g. no "U U")
//   • never a move on the same axis as both previous moves (no "L R L",
//     which would be reducible since opposite faces commute)

const FACES = ["U", "D", "L", "R", "F", "B"] as const;
const MODIFIERS = ["", "'", "2"] as const;

// Opposite faces share an axis: U/D (y), L/R (x), F/B (z).
const AXIS: Record<string, string> = {
  U: "y",
  D: "y",
  L: "x",
  R: "x",
  F: "z",
  B: "z",
};

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Generate a scramble of `length` moves (20 is the standard for 3x3). */
export function generateScramble(length = 20): string {
  const moves: string[] = [];
  let lastFace = "";
  let secondLastFace = "";

  while (moves.length < length) {
    const face = pick(FACES);
    if (face === lastFace) continue; // no immediate repeat
    if (AXIS[face] === AXIS[lastFace] && face === secondLastFace) continue; // no A B A on one axis

    moves.push(face + pick(MODIFIERS));
    secondLastFace = lastFace;
    lastFace = face;
  }

  return moves.join(" ");
}
