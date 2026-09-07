// A tiny, dependency-free 3x3 cube simulator used to draw the scramble preview
// as a colour-accurate net. The cube is held in the standard WCA scrambling
// orientation — WHITE on top, GREEN in front — so the net matches what your
// real cube looks like when you set it up to scramble.
//
// Faces are U R F D L B, each 9 stickers indexed 0..8 row-major as seen looking
// straight at that face (F normal; U's row 0 points to B; D's row 0 points to F;
// L/R/B are viewed with U up). Only the six face turns appear in a 3x3 scramble,
// so that's all we implement. The move tables are verified by tests in the
// project scratchpad (move orders, T-perm involution, sexy-move order 6, etc.).

export type Face = "U" | "R" | "F" | "D" | "L" | "B";
export type Color = "W" | "R" | "G" | "Y" | "O" | "B";
export type CubeState = Record<Face, Color[]>;

/** A solved cube: white top, green front, standard Western colour scheme. */
export function solvedCube(): CubeState {
  return {
    U: Array(9).fill("W"),
    R: Array(9).fill("R"),
    F: Array(9).fill("G"),
    D: Array(9).fill("Y"),
    L: Array(9).fill("O"),
    B: Array(9).fill("B"),
  };
}

// 90° clockwise remap of a face's own 9 stickers.
const CW = [6, 3, 0, 7, 4, 1, 8, 5, 2];

type Cell = [Face, number];
const strip = (f: Face, ...idx: number[]): Cell[] => idx.map((i) => [f, i] as Cell);

// Each face turn rotates its own face clockwise, then cycles four 3-sticker
// strips of the neighbouring faces: A→B→C→D→A.
const MOVES: Record<Face, { face: Face; strips: [Cell[], Cell[], Cell[], Cell[]] }> = {
  U: { face: "U", strips: [strip("F", 0, 1, 2), strip("L", 0, 1, 2), strip("B", 0, 1, 2), strip("R", 0, 1, 2)] },
  D: { face: "D", strips: [strip("F", 6, 7, 8), strip("R", 6, 7, 8), strip("B", 6, 7, 8), strip("L", 6, 7, 8)] },
  R: { face: "R", strips: [strip("F", 2, 5, 8), strip("U", 2, 5, 8), strip("B", 6, 3, 0), strip("D", 2, 5, 8)] },
  L: { face: "L", strips: [strip("F", 0, 3, 6), strip("D", 0, 3, 6), strip("B", 8, 5, 2), strip("U", 0, 3, 6)] },
  F: { face: "F", strips: [strip("U", 6, 7, 8), strip("R", 0, 3, 6), strip("D", 2, 1, 0), strip("L", 8, 5, 2)] },
  B: { face: "B", strips: [strip("U", 2, 1, 0), strip("L", 0, 3, 6), strip("D", 6, 7, 8), strip("R", 8, 5, 2)] },
};

function rotateFaceCW(cube: CubeState, f: Face): void {
  const old = cube[f].slice();
  cube[f] = CW.map((i) => old[i]) as Color[];
}

function applyQuarterTurn(cube: CubeState, f: Face): void {
  const m = MOVES[f];
  rotateFaceCW(cube, m.face);
  const [A, B, C, D] = m.strips;
  const read = (st: Cell[]) => st.map(([face, i]) => cube[face][i]);
  const oldA = read(A), oldB = read(B), oldC = read(C), oldD = read(D);
  const write = (st: Cell[], vals: Color[]) => st.forEach(([face, i], k) => (cube[face][i] = vals[k]));
  write(B, oldA);
  write(C, oldB);
  write(D, oldC);
  write(A, oldD);
}

/** Apply one scramble token like "R", "U'", or "F2". Ignores anything else. */
function applyToken(cube: CubeState, token: string): void {
  const face = token[0] as Face;
  if (!MOVES[face]) return;
  const mod = token.slice(1);
  const times = mod === "2" ? 2 : mod === "'" ? 3 : 1;
  for (let n = 0; n < times; n++) applyQuarterTurn(cube, face);
}

/**
 * Apply a full scramble to a solved cube and return the resulting state — i.e.
 * exactly what your (white-top, green-front) cube looks like after scrambling.
 */
export function scrambledCube(scramble: string): CubeState {
  const cube = solvedCube();
  scramble
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .forEach((t) => applyToken(cube, t));
  return cube;
}
