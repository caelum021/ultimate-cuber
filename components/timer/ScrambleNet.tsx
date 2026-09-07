import { scrambledCube, type Color, type Face } from "@/lib/cube";

// Standard Western cube colours. White is very slightly off-white so it stays
// visible on a white page background.
const COLORS: Record<Color, string> = {
  W: "#f6f6f4",
  Y: "#ffd500",
  G: "#009b48",
  B: "#0046ad",
  O: "#ff5800",
  R: "#d40000",
};

const CELL = 16; // sticker size
const GAP = 1.5; // gap between stickers
const PITCH = CELL + GAP;
const FACE = CELL * 3 + GAP * 2; // one face's width/height
const FACE_GAP = 4;
const STEP = FACE + FACE_GAP; // top-left to top-left of adjacent faces
const PAD = 4;

// Unfolded "cross" layout — column/row of each face:
//        [U]
//    [L] [F] [R] [B]
//        [D]
const LAYOUT: Record<Face, { col: number; row: number }> = {
  U: { col: 1, row: 0 },
  L: { col: 0, row: 1 },
  F: { col: 1, row: 1 },
  R: { col: 2, row: 1 },
  B: { col: 3, row: 1 },
  D: { col: 1, row: 2 },
};

const WIDTH = PAD * 2 + STEP * 3 + FACE; // 4 faces wide (L F R B)
const HEIGHT = PAD * 2 + STEP * 2 + FACE; // 3 faces tall (U, mid, D)

function FaceGrid({ x, y, stickers }: { x: number; y: number; stickers: Color[] }) {
  return (
    <g>
      {/* cube-body backing so the stickers read as one piece */}
      <rect x={x - 1.5} y={y - 1.5} width={FACE + 3} height={FACE + 3} rx={3} fill="#1b1b1b" />
      {stickers.map((c, i) => {
        const r = Math.floor(i / 3);
        const col = i % 3;
        return (
          <rect
            key={i}
            x={x + col * PITCH}
            y={y + r * PITCH}
            width={CELL}
            height={CELL}
            rx={2}
            fill={COLORS[c]}
            stroke="#1b1b1b"
            strokeWidth={0.5}
          />
        );
      })}
    </g>
  );
}

/** Colour-accurate unfolded net of the cube after a scramble (white top, green front). */
export function ScrambleNet({ scramble, size = 210 }: { scramble: string; size?: number }) {
  if (!scramble.trim()) return null;
  const cube = scrambledCube(scramble);
  const faces = Object.keys(LAYOUT) as Face[];

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      width={size}
      style={{ width: size, maxWidth: "100%", height: "auto" }}
      role="img"
      aria-label="Scramble preview as an unfolded cube net"
    >
      {faces.map((f) => {
        const { col, row } = LAYOUT[f];
        return <FaceGrid key={f} x={PAD + col * STEP} y={PAD + row * STEP} stickers={cube[f]} />;
      })}
    </svg>
  );
}
