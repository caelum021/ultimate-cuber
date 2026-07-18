// Learning-hub content as data so it's trivial to expand over time.
// Algorithms here are standard, widely-taught sets — verified beginner/2-look
// CFOP. Add full OLL (57) / PLL (21) sets incrementally.

import type { Language } from "./i18n";

export type Algorithm = {
  name: string;
  moves: string;
  note?: string;
};

export type AlgSet = {
  id: string;
  title: string;
  summary: string;
  algs: Algorithm[];
  /** Optional resource for the "Learn more" button. Internal paths start with "/". */
  learnMoreUrl?: string;
  /** Optional custom label for the button (defaults to "Learn more"). */
  learnMoreLabel?: string;
  /** Puzzle size for case diagrams (3 = 3x3 default, 2 = 2x2). */
  pzl?: number;
  /** Show both the top (yellow) and bottom (white) faces (e.g. Ortega PBL). */
  bothFaces?: boolean;
};

export type Guide = {
  id: string;
  title: string;
  body: string[]; // paragraphs
  /** Optional resource for the "Learn more" button. Internal paths start with "/". */
  learnMoreUrl?: string;
  /** Optional custom label for the button (defaults to "Learn more"). */
  learnMoreLabel?: string;
};

export const cfopOverview: Guide = {
  id: "cfop",
  title: "CFOP — the method most sub-20 cubers use",
  body: [
    "CFOP stands for Cross, F2L, OLL, PLL — the four steps you solve in order.",
    "Cross: solve the four edges of one face (usually white) around the correct centers. Aim to plan it during inspection and solve it in ≤8 moves.",
    "F2L (First Two Layers): pair each corner with its matching edge and insert them together, solving the first two layers at once. This is where most of your time savings to reach sub-20 will come from.",
    "OLL (Orient Last Layer): make the whole top face one color. The beginner-friendly '2-look OLL' below does this in two steps with only ~10 algorithms.",
    "PLL (Permute Last Layer): move the last-layer pieces into their correct spots. '2-look PLL' does this with just a handful of algorithms.",
  ],
};

export const f2lGuide: Guide = {
  id: "f2l",
  title: "F2L: pairing intuitively",
  body: [
    "Instead of memorizing 41 cases, learn F2L intuitively: find a corner/edge pair, join them in the top layer, then insert into the correct slot.",
    "Golden rule: if the corner is in the top layer, position it above its target slot, then set up the edge so the pair connects, and insert with a simple U R U' R' (or mirrored) style move.",
    "Look ahead — while finishing one pair, let your eyes track the next one. Slow down turning, speed up recognition. This is the single biggest habit change for breaking sub-20.",
  ],
};

export const twoLookOLL: AlgSet[] = [
  {
    id: "oll-edges",
    title: "2-Look OLL · Step 1: orient edges",
    summary: "Get the yellow cross on top. Look at the yellow edge pattern (dot, L, or line) and apply the matching algorithm.",
    algs: [
      { name: "Line", moves: "F R U R' U' F'", note: "Two edges form a horizontal line." },
      { name: "L-shape", moves: "f R U R' U' f'", note: "Two adjacent edges (an 'L'). Point the L at top-left." },
      { name: "Dot", moves: "F R U R' U' F'  then  f R U R' U' f'", note: "No edges oriented — do Line then L-shape." },
    ],
    learnMoreUrl: "/learn/oll",
  learnMoreLabel: "View all 57 OLL algorithms",
  },
  {
    id: "oll-corners",
    title: "2-Look OLL · Step 2: orient corners (OCLL)",
    summary: "With the cross done, orient the corners so the whole top is yellow. These 7 cases cover it.",
    algs: [
      { name: "Sune", moves: "R U R' U R U2 R'" },
      { name: "Antisune", moves: "R U2 R' U' R U' R'" },
      { name: "H (double Sune)", moves: "R U R' U R U' R' U R U2 R'" },
      { name: "Pi", moves: "R U2 R2 U' R2 U' R2 U2 R" },
      { name: "T", moves: "r U R' U' r' F R F'" },
      { name: "U (headlights)", moves: "R2 D R' U2 R D' R' U2 R'" },
      { name: "L", moves: "F R' F' r U R U' r'" },
    ],
    learnMoreUrl: "/learn/oll",
  learnMoreLabel: "View all 57 OLL algorithms",
  },
];

export const twoLookPLL: AlgSet[] = [
  {
    id: "pll-corners",
    title: "2-Look PLL · Step 1: permute corners",
    summary: "Cycle the last-layer corners into place. Find a face with two matching 'headlight' corners; if none, do the algorithm from any angle first.",
    algs: [
      { name: "Aa perm", moves: "x L2 D2 L' U' L D2 L' U L'" },
      { name: "Ab perm", moves: "x L2 D2 L U L' D2 L U' L" },
      { name: "E perm (diagonal)", moves: "x' L' U L D' L' U' L D L' U' L D' L' U L D" },
    ],
    learnMoreUrl: "/learn/pll",
  learnMoreLabel: "View all 21 PLL algorithms",
  },
  {
    id: "pll-edges",
    title: "2-Look PLL · Step 2: permute edges",
    summary: "With corners solved, cycle the edges. Ua/Ub are 3-edge cycles; H swaps opposite pairs; Z swaps adjacent pairs.",
    algs: [
      { name: "Ua perm", moves: "M2 U M U2 M' U M2" },
      { name: "Ub perm", moves: "M2 U' M U2 M' U' M2" },
      { name: "H perm", moves: "M2 U M2 U2 M2 U M2" },
      { name: "Z perm", moves: "M2 U M2 U M' U2 M2 U2 M'" },
    ],
    learnMoreUrl: "/learn/pll",
  learnMoreLabel: "View all 21 PLL algorithms",
  },
];

export const wvlsGuide: Guide = {
  id: "wvls",
  title: "WVLS (Winter Variation) — orient corners while inserting the last pair",
  body: [
    "WVLS is an advanced CFOP technique that saves you the OLL-corners step. Instead of inserting your last F2L pair and then orienting the last-layer corners separately, you do both at once — the insert itself orients all four top corners.",
    "Prerequisites: it only applies when the final corner-edge pair is already connected in the top layer AND all last-layer edges are already oriented (i.e. you already have the yellow cross / edge orientation done). After WVLS every piece is oriented, so you finish with just a PLL.",
    "There are 27 Winter Variation (WV) cases, one per corner-orientation configuration. It's a lot of algorithms for a small time save, so most cubers pick it up gradually after their F2L look-ahead is solid. Start with the handful below.",
  ],
  learnMoreUrl: "/learn/wvls",
  learnMoreLabel: "View all 27 WV algorithms",
};

export const wvlsAlgs: AlgSet = {
  id: "wvls-set",
  title: "Winter Variation — starter cases",
  summary:
    "A representative subset of the 27 WV cases. The pair is connected in the U layer and all LL edges are oriented; the algorithm inserts the pair and orients the corners. (Verified from Speed Cube Database.)",
  algs: [
    { name: "WV 2", moves: "U R U' R'", note: "Corner already oriented — this is just the free insert." },
    { name: "WV 1", moves: "U L' U2 R U R' U2 L" },
    { name: "WV 3", moves: "R' F R U R U' R' F'" },
    { name: "WV 4", moves: "U R2 D R' U' R D' R2" },
    { name: "WV 5", moves: "U R U' R' U R' U' R U' R' U2 R" },
    { name: "WV 15", moves: "L' U R U' R' L" },
    { name: "WV 27", moves: "U R U R' U' R U R' U' R U' R'" },
  ],
  learnMoreUrl: "/learn/wvls",
  learnMoreLabel: "View all 27 WV algorithms",
};

export const rouxGuide: Guide = {
  id: "roux",
  title: "The Roux method — a low move-count alternative to CFOP",
  body: [
    "Roux is a popular alternative to CFOP that's block-building based and very turn-efficient (often ~45 moves vs CFOP's ~55), with heavy use of the M slice instead of cube rotations. Many top solvers use it — it's a legitimate path to sub-20 and beyond.",
    "Step 1 — First Block (FB): build a 1×2×3 block on the bottom-left (spanning the left face). Fully intuitive, ~7–8 moves. This is the hardest part to learn to plan.",
    "Step 2 — Second Block (SB): build a matching 1×2×3 block on the bottom-right without breaking the first. Now the whole bottom two blocks are solved, leaving the U layer and M slice free to turn.",
    "Step 3 — CMLL: orient AND permute the four top-layer corners in one step, ignoring the M-slice edges. 42 algorithms in full, but many overlap with corner cases you already know (Sune, Anti-Sune, etc.). See the starter set below.",
    "Step 4 — LSE (Last Six Edges): solve the remaining six edges using only M and U moves, in three sub-steps — (4a) orient edges, (4b) place the UL/UR edges, (4c) cycle the last M-slice edges. Almost no memorization; it's mostly intuition + a couple of short M/U sequences.",
  ],
};

export const rouxCMLL: AlgSet = {
  id: "roux-cmll",
  title: "CMLL — starter algorithms",
  summary:
    "Common CMLL cases to begin with (they orient and permute the top corners in one step). Notation includes wide moves like r. (Verified from Speed Cube Database.)",
  algs: [
    { name: "Sune", moves: "U R U R' U R U2 R'" },
    { name: "Anti-Sune", moves: "U R' U' R U' R' U2 R" },
    { name: "H (columns)", moves: "U R U R' U R U' R' U R U2 R'" },
    { name: "Pi", moves: "F R U R' U' R U R' U' F'" },
    { name: "T", moves: "U' R U R' U' R' F R F'" },
    { name: "U", moves: "U' F R U R' U' F'" },
    { name: "L", moves: "U' F' r U r' U' r' F r" },
  ],
  learnMoreUrl: "/learn/cmll",
  learnMoreLabel: "View all 42 CMLL algorithms",
};

export const fullPLLFavorites: AlgSet = {
  id: "pll-1look-starters",
  title: "Handy full PLLs to learn next",
  summary: "Once 2-look is comfortable, these three cover the most common one-look PLL cases and are quick wins toward faster solves.",
  algs: [
    { name: "T perm", moves: "R U R' U' R' F R2 U' R' U' R U R' F'" },
    { name: "Y perm", moves: "F R U' R' U' R U R' F' R U R' U' R' F R F'" },
    { name: "Ja perm", moves: "x R2 F R F' R U2 r' U r U2", note: "Adjacent corner + edge swap." },
  ],
  learnMoreUrl: "/learn/pll",
  learnMoreLabel: "View all 21 PLL algorithms",
};

// ---------------------------------------------------------------------------
// Full reference sets (rendered on dedicated pages: /learn/wvls, /learn/cmll).
// Algorithms sourced from Speed Cube Database (speedcubedb.com). There are
// often several valid algs per case; these are the listed defaults.
// ---------------------------------------------------------------------------

/** All 27 Winter Variation cases. */
export const wvAllAlgs: Algorithm[] = [
  { name: "WV 1", moves: "U L' U2 R U R' U2 L" },
  { name: "WV 2", moves: "U R U' R'", note: "Corner already oriented — free insert." },
  { name: "WV 3", moves: "R' F R U R U' R' F'" },
  { name: "WV 4", moves: "U R2 D R' U' R D' R2" },
  { name: "WV 5", moves: "U R U' R' U R' U' R U' R' U2 R" },
  { name: "WV 6", moves: "R U' R' U2 R U' R' U2 R U R'" },
  { name: "WV 7", moves: "U R U R' U' R U' R'" },
  { name: "WV 8", moves: "U2 R U' R' U R U2 R'" },
  { name: "WV 9", moves: "U2 F' R U2 R' U2 R' F R" },
  { name: "WV 10", moves: "U R U R2 U' R2 U' R2 U2 R" },
  { name: "WV 11", moves: "U2 R' U' R2 U' R2 U2 R" },
  { name: "WV 12", moves: "Lw' U2 Lw F2 U L' U L" },
  { name: "WV 13", moves: "U2 R U2 R2 U' R U' R' U2 R" },
  { name: "WV 14", moves: "U2 R2 D R' U2 R D' R2" },
  { name: "WV 15", moves: "L' U R U' R' L" },
  { name: "WV 16", moves: "U R' D' R U R' D R2 U2 R'" },
  { name: "WV 17", moves: "R' F' R U2 R U2 R' F" },
  { name: "WV 18", moves: "U2 R U2 R'" },
  { name: "WV 19", moves: "R' F2 R2 U' R' U' R U R' F2" },
  { name: "WV 20", moves: "U R U' R' U' R U R' U R U2 R'" },
  { name: "WV 21", moves: "U R U' R2 U2 R U R' U R" },
  { name: "WV 22", moves: "U R U R D R' U2 R D' R2" },
  { name: "WV 23", moves: "R2 U R' U R' U' R U R U2 R2" },
  { name: "WV 24", moves: "U2 R U' R' U R U' R' U R U2 R'" },
  { name: "WV 25", moves: "U2 R U2 R2 U2 R U R' U R" },
  { name: "WV 26", moves: "U R U' R2 U' R U' R' U2 R" },
  { name: "WV 27", moves: "U R U R' U' R U R' U' R U' R'" },
];

export type CmllGroup = { category: string; algs: Algorithm[] };

/** All 42 CMLL cases, grouped by corner-orientation category. */
export const cmllGroups: CmllGroup[] = [
  {
    category: "O",
    algs: [
      { name: "O Adjacent", moves: "R U R' F' R U R' U' R' F R2 U' R'" },
      { name: "O Diagonal", moves: "F R U' R' U' R U R' F' R U R' U' R' F R F'" },
    ],
  },
  {
    category: "H",
    algs: [
      { name: "H Columns", moves: "U R U R' U R U' R' U R U2 R'" },
      { name: "H Rows", moves: "F R U R' U' R U R' U' R U R' U' F'" },
      { name: "H Column", moves: "R' F2 D R2 U R2 D' F2 R" },
      { name: "H Row", moves: "U2 r U' r2 D' r U' r' D r2 U r'" },
    ],
  },
  {
    category: "Pi",
    algs: [
      { name: "Pi Right Bar", moves: "F R U R' U' R U R' U' F'" },
      { name: "Pi Down Slash", moves: "U F R' F' R U2 R U' R' U R U2 R'" },
      { name: "Pi X", moves: "R' F2 D R2 U' R2 D' F2 R" },
      { name: "Pi Up Slash", moves: "R U2 R' U' R U R' U2 R' F R F'" },
      { name: "Pi Columns", moves: "U' r U' r2 D' r U r' D r2 U r'" },
      { name: "Pi Left Bar", moves: "U' R' U' R' F R F' R U' R' U2 R" },
    ],
  },
  {
    category: "U",
    algs: [
      { name: "U Up Slash", moves: "U2 R2 D R' U2 R D' R' U2 R'" },
      { name: "U Down Slash", moves: "R2 D' R U2 R' D R U2 R" },
      { name: "U Bottom Row", moves: "R' U' R U' R' U2 R2 U R' U R U2 R'" },
      { name: "U Rows", moves: "U' F R2 D R' U R D' R2 U' F'" },
      { name: "U X", moves: "U2 r U' r' U r' D' r U' r' D r" },
      { name: "U Upper Row", moves: "U' F R U R' U' F'" },
    ],
  },
  {
    category: "T",
    algs: [
      { name: "T Left Bar", moves: "U' R U R' U' R' F R F'" },
      { name: "T Right Bar", moves: "U L' U' L U L F' L' F" },
      { name: "T Rows", moves: "R U2 R' U' R U' R2 U2 R U R' U R" },
      { name: "T Bottom Row", moves: "r' U r U2 R2 F R F' R" },
      { name: "T Top Row", moves: "r' D' r U r' D r U' r U r'" },
      { name: "T Columns", moves: "U2 r U' r2 D' r U2 r' D r2 U r'" },
    ],
  },
  {
    category: "L",
    algs: [
      { name: "L Best", moves: "U' F' r U r' U' r' F r" },
      { name: "L Good", moves: "U2 F R' F' R U R U' R'" },
      { name: "L Pure", moves: "R U R' U R U' R' U R U' R' U R U2 R'" },
      { name: "L Front Commutator", moves: "U2 R U2 R D R' U2 R D' R2" },
      { name: "L Diagonal", moves: "U2 R U2 R2 F R F' R U2 R'" },
      { name: "L Back Commutator", moves: "U R' U2 R' D' R U2 R' D R2" },
    ],
  },
  {
    category: "Sune",
    algs: [
      { name: "Sune Left Bar", moves: "U R U R' U R U2 R'" },
      { name: "Sune X", moves: "U L' U2 L U2 r U' r' F" },
      { name: "Sune Up Slash", moves: "U F R' F' R U2 R U2 R'" },
      { name: "Sune Columns", moves: "U R U R' U' R' F R F' R U R' U R U2 R'" },
      { name: "Sune Right Bar", moves: "U' R U R' U R' F R F' R U2 R'" },
      { name: "Sune Down Slash", moves: "U r U' r' F R' F' R" },
    ],
  },
  {
    category: "Anti-Sune",
    algs: [
      { name: "Anti Sune Right Bar", moves: "U R' U' R U' R' U2 R" },
      { name: "Anti Sune Columns", moves: "U2 R U R2 F' r F R U' r2 F r" },
      { name: "Anti Sune Down Slash", moves: "U' F' L F L' U2 L' U2 L" },
      { name: "Anti Sune X", moves: "U' R U2 R' U2 R' F R F'" },
      { name: "Anti Sune Up Slash", moves: "U' R' F R F' r U r'" },
      { name: "Anti Sune Left Bar", moves: "U R U2 R' F R' F' R U' R U' R'" },
    ],
  },
];

/** All 21 PLL cases. */
export const pllAllAlgs: Algorithm[] = [
  { name: "Aa", moves: "x R' U R' D2 R U' R' D2 R2 x'" },
  { name: "Ab", moves: "x R2 D2 R U R' D2 R U' R x'" },
  { name: "E", moves: "y x' R U' R' D R U R' D' R U R' D R U' R' D' x" },
  { name: "F", moves: "y R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R" },
  { name: "Ga", moves: "R2 U R' U R' U' R U' R2 D U' R' U R D'" },
  { name: "Gb", moves: "D R' U' R U D' R2 U R' U R U' R U' R2" },
  { name: "Gc", moves: "R2 U' R U' R U R' U R2 D' U R U' R' D" },
  { name: "Gd", moves: "R U R' U' D R2 U' R U' R' U R' U R2 D'" },
  { name: "H", moves: "M2 U' M2 U2 M2 U' M2" },
  { name: "Ja", moves: "y2 x R2 F R F' R U2 r' U r U2 x'" },
  { name: "Jb", moves: "R U R' F' R U R' U' R' F R2 U' R'" },
  { name: "Na", moves: "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'" },
  { name: "Nb", moves: "R' U R U' R' F' U' F R U R' F R' F' R U' R" },
  { name: "Ra", moves: "y R U' R' U' R U R D R' U' R D' R' U2 R'" },
  { name: "Rb", moves: "R' U2 R U2 R' F R U R' U' R' F' R2" },
  { name: "T", moves: "R U R' U' R' F R2 U' R' U' R U R' F'" },
  { name: "Ua", moves: "y2 M2 U M U2 M' U M2" },
  { name: "Ub", moves: "y2 M2 U' M U2 M' U' M2" },
  { name: "V", moves: "R' U R' U' R D' R' D R' U D' R2 U' R2 D R2" },
  { name: "Y", moves: "F R U' R' U' R U R' F' R U R' U' R' F R F'" },
  { name: "Z", moves: "M' U' M2 U' M2 U' M' U2 M2" },
];

/** All 57 OLL cases. Parentheses group finger-trick triggers (cosmetic). */
export const ollAllAlgs: Algorithm[] = [
  { name: "OLL 1", moves: "(R U2 R') (R' F R F') U2 (R' F R F')" },
  { name: "OLL 2", moves: "F (R U R' U') F' f (R U R' U') f'" },
  { name: "OLL 3", moves: "y' f (R U R' U') f' (U') F (R U R' U') F'" },
  { name: "OLL 4", moves: "y' f (R U R' U') f' (U) F (R U R' U') F'" },
  { name: "OLL 5", moves: "r' U2 (R U R' U) r" },
  { name: "OLL 6", moves: "r U2 (R' U' R U') r'" },
  { name: "OLL 7", moves: "r (U R' U R) U2 r'" },
  { name: "OLL 8", moves: "y2 r' (U' R U' R') U2 r" },
  { name: "OLL 9", moves: "y (R U R' U') (R' F R) (R U R' U') F'" },
  { name: "OLL 10", moves: "(R U R' U) (R' F R F') (R U2 R')" },
  { name: "OLL 11", moves: "M (R U R' U R U2 R') U M'" },
  { name: "OLL 12", moves: "y' M' (R' U' R U' R' U2 R) U' M" },
  { name: "OLL 13", moves: "(r U' r') U' (r U r') (F' U F)" },
  { name: "OLL 14", moves: "R' F (R U R') F' R (F U' F')" },
  { name: "OLL 15", moves: "(r' U' r) (R' U' R U) (r' U r)" },
  { name: "OLL 16", moves: "(r U r') (R U R' U') (r U' r')" },
  { name: "OLL 17", moves: "(R U R' U) (R' F R F') U2 (R' F R F')" },
  { name: "OLL 18", moves: "y (R U2 R') (R' F R F') U2 M' (U R U' r')" },
  { name: "OLL 19", moves: "M U (R U R' U') M' (R' F R F')" },
  { name: "OLL 20", moves: "(r U R' U') M2 (U R U' R') U' M'" },
  { name: "OLL 21", moves: "(R U R' U) (R U' R' U) (R U2 R')" },
  { name: "OLL 22", moves: "R U2 (R2 U') (R2 U') (R2 U') U' R" },
  { name: "OLL 23", moves: "R2 D (R' U2 R) D' (R' U2 R')" },
  { name: "OLL 24", moves: "(r U R' U') (r' F R F')" },
  { name: "OLL 25", moves: "y (F' r U R') (U' r' F R)" },
  { name: "OLL 26", moves: "y R U2 (R' U' R U') R'" },
  { name: "OLL 27", moves: "(R U R' U) (R U2 R')" },
  { name: "OLL 28", moves: "(r U R' U') M (U R U' R')" },
  { name: "OLL 29", moves: "y (R U R' U') (R U' R') (F' U' F) (R U R')" },
  { name: "OLL 30", moves: "y2 F U (R U2 R') U' (R U2 R') U' F'" },
  { name: "OLL 31", moves: "(R' U' F) (U R U' R') F' R" },
  { name: "OLL 32", moves: "S (R U R' U') (R' F R f')" },
  { name: "OLL 33", moves: "(R U R' U') (R' F R F')" },
  { name: "OLL 34", moves: "y2 R U R2 U' R' F (R U R U') F'" },
  { name: "OLL 35", moves: "(R U2 R') (R' F R F') (R U2 R')" },
  { name: "OLL 36", moves: "y2 (L' U' L U') (L' U L U) (L F' L' F)" },
  { name: "OLL 37", moves: "F R (U' R' U') (R U R') F'" },
  { name: "OLL 38", moves: "(R U R' U) (R U' R' U') (R' F R F')" },
  { name: "OLL 39", moves: "y L F' (L' U' L U) F U' L'" },
  { name: "OLL 40", moves: "y R' F (R U R' U') F' U R" },
  { name: "OLL 41", moves: "y2 (R U R' U) (R U2 R') F (R U R' U') F'" },
  { name: "OLL 42", moves: "(R' U' R U') (R' U2 R) F (R U R' U') F'" },
  { name: "OLL 43", moves: "y R' U' (F' U F) R" },
  { name: "OLL 44", moves: "f (R U R' U') f'" },
  { name: "OLL 45", moves: "F (R U R' U') F'" },
  { name: "OLL 46", moves: "R' U' (R' F R F') U R" },
  { name: "OLL 47", moves: "F' (L' U' L U) (L' U' L U) F" },
  { name: "OLL 48", moves: "F (R U R' U') (R U R' U') F'" },
  { name: "OLL 49", moves: "y2 r U' (r2 U) (r2 U) (r2) U' r" },
  { name: "OLL 50", moves: "r' U (r2 U') (r2 U') (r2) U r'" },
  { name: "OLL 51", moves: "f (R U R' U') (R U R' U') f'" },
  { name: "OLL 52", moves: "y2 R' (F' U' F U') (R U R' U) R" },
  { name: "OLL 53", moves: "(r' U' R U') (R' U R U') (R' U2 r)" },
  { name: "OLL 54", moves: "(r U R' U) (R U' R' U) (R U2 r')" },
  { name: "OLL 55", moves: "R U2 R2 (U' R U' R') U2 (F R F')" },
  { name: "OLL 56", moves: "(r U r') (U R U' R') (U R U' R') (r U' r')" },
  { name: "OLL 57", moves: "(R U R' U') M' (U R U' r')" },
];

// ---------------------------------------------------------------------------
// 2×2 (Pocket Cube). Beginner (layer-by-layer) + Ortega. Algorithms sourced
// from Speed Cube Database (speedcubedb.com).
// ---------------------------------------------------------------------------

export const twoByTwoBeginner: Guide = {
  id: "2x2-beginner",
  title: "2×2 — Beginner method (Layer by Layer)",
  body: [
    "The 2×2 (Pocket Cube) has no centers or edges — just 8 corners. That makes it the perfect first cube: it's basically the last layer of a 3×3, so everything you learn here carries straight over.",
    "Step 1 — First layer: pick a color and solve all four corners of one face so the whole bottom layer is done, with the side stickers matching. It's intuitive — just place each corner where it belongs, like the corners step on a 3×3.",
    "Step 2 — Orient the top: turn the cube so the unsolved layer is on top, then repeat the Sune algorithm (R U R' U R U2 R') until the entire top face is one solid color.",
    "Step 3 — Permute the top: the top is one color but some corners may be in the wrong spot. Use a permutation algorithm (see Ortega PBL below) to swap them into place. Solved! 🎉",
  ],
};

export const ortegaGuide: Guide = {
  id: "ortega",
  title: "2×2 — Ortega method",
  body: [
    "Ortega is the popular speed method for 2×2 — only about 12 algorithms, and it regularly gets sub-5-second solves. A great next step once the beginner method feels comfortable.",
    "Step 1 — First face: solve one full face (all four corners the same color on top) WITHOUT worrying about the side stickers matching. Faster and more flexible than a full layer.",
    "Step 2 — OLL: orient the last layer so the opposite face becomes one solid color. The 7 cases below cover it — many you already know from 3×3 (Sune, Anti-Sune…).",
    "Step 3 — PBL: permute both layers at once — the corners on top AND bottom drop into place in a single algorithm. The 6 cases below finish the solve.",
  ],
  learnMoreUrl: "/learn/2x2",
  learnMoreLabel: "Open the full 2×2 guide",
};

export const ortegaOLL: AlgSet = {
  id: "ortega-oll",
  title: "Ortega OLL — orient the top (7 cases)",
  summary:
    "Make the top face one solid color. Recognise the pattern of oriented/twisted corners and apply the matching algorithm.",
  algs: [
    { name: "Sune", moves: "R U R' U R U2 R'" },
    { name: "Anti-Sune", moves: "R U2 R' U' R U' R'" },
    { name: "Pi", moves: "F R U R' U' R U R' U' F'" },
    { name: "P (T-shape)", moves: "F R U R' U' F'" },
    { name: "L", moves: "y F' R U R' U' R' F R" },
    { name: "T", moves: "R U R' U' R' F R F'" },
    { name: "H", moves: "R2 U2 R' U2 R2" },
  ],
  learnMoreUrl: "/learn/2x2",
  learnMoreLabel: "View all 2×2 algorithms",
  pzl: 2,
};

export const ortegaPBL: AlgSet = {
  id: "ortega-pbl",
  title: "Ortega PBL — permute both layers (6 cases)",
  summary:
    "With the top oriented, these swap the corners on both layers into place at once — finishing the solve. Case names follow Speed Cube Database's Ortega PBL labels.",
  algs: [
    { name: "Opp / Opp", moves: "R2 F2 R2", note: "The shortest — learn this one first." },
    { name: "Adj", moves: "y R U R' F' R U R' U' R' F R2 U' R'" },
    { name: "Opp", moves: "R U' R' U' F2 U' R U R' U F2" },
    { name: "Adj / Adj", moves: "R2 U' B2 U2 R2 U' R2" },
    { name: "Adj / Opp", moves: "R U' R F2 R' U R'" },
    { name: "Opp / Adj", moves: "y R2 U R2 U' R2 U R2 U' R2" },
  ],
  learnMoreUrl: "/learn/2x2",
  learnMoreLabel: "View all 2×2 algorithms",
  pzl: 2,
  bothFaces: true,
};

// ---------------------------------------------------------------------------
// Translations for the Learn hub PROSE only. Algorithm names and move
// notations are never translated — they come from the arrays above unchanged.
// Keyed by guide/set id; en uses the original objects, others fall back to en.
// ---------------------------------------------------------------------------

type Prose = { title?: string; summary?: string; body?: string[] };
type ProseMap = Partial<Record<string, Prose>>;

const learnProse: Partial<Record<Language, ProseMap>> = {
  ko: {
    cfop: {
      title: "CFOP — Sub 20 큐버들이 쓰는 방법",
      body: [
        "CFOP은 Cross, F2L, OLL, PLL — 순서대로 푸는 네 단계를 뜻해요.",
        "크로스(Cross): 한 면(보통 흰색)의 네 엣지를 센터에 맞춰 풀어요. 인스펙션 때 미리 계획해 8수 이내로 푸는 걸 목표로 하세요.",
        "F2L(첫 두 층): 코너와 짝이 되는 엣지를 짝지어 함께 넣으며 첫 두 층을 동시에 완성해요. Sub 20으로 가는 시간 단축의 대부분이 여기서 나와요.",
        "OLL(마지막 층 방향 맞추기): 윗면 전체를 한 색으로 만들어요. 아래의 초보용 '2-룩 OLL'은 약 10개의 알고리즘으로 두 단계에 걸쳐 해내요.",
        "PLL(마지막 층 위치 맞추기): 마지막 층 조각들을 제자리로 옮겨요. '2-룩 PLL'은 몇 개의 알고리즘만으로 해내요.",
      ],
    },
    f2l: {
      title: "F2L: 직관적으로 짝짓기",
      body: [
        "41개 케이스를 외우는 대신 F2L을 직관적으로 배워보세요: 코너와 엣지 짝을 찾아 윗층에서 합친 뒤, 올바른 슬롯에 넣어요.",
        "핵심 규칙: 코너가 윗층에 있으면 목표 슬롯 위에 두고, 엣지를 맞춰 짝을 연결한 뒤 간단한 U R U' R' 식으로 넣어요.",
        "미리 보기 — 한 짝을 끝내는 동안 눈으로 다음 짝을 찾으세요. 회전은 천천히, 인식은 빠르게. Sub 20을 깨는 가장 큰 습관 변화예요.",
      ],
    },
    "oll-edges": {
      title: "2-룩 OLL · 1단계: 엣지 방향 맞추기",
      summary: "윗면에 노란 십자를 만들어요. 노란 엣지 모양(점, L, 직선)을 보고 맞는 알고리즘을 적용하세요.",
    },
    "oll-corners": {
      title: "2-룩 OLL · 2단계: 코너 방향 맞추기 (OCLL)",
      summary: "십자를 만든 뒤 코너 방향을 맞춰 윗면 전체를 노랗게 만들어요. 이 7개 케이스로 충분해요.",
    },
    "pll-corners": {
      title: "2-룩 PLL · 1단계: 코너 위치 맞추기",
      summary:
        "마지막 층 코너를 제자리로 순환시켜요. 같은 '헤드라이트' 코너 두 개가 있는 면을 찾으세요. 없으면 아무 각도에서 알고리즘을 먼저 한 번 하세요.",
    },
    "pll-edges": {
      title: "2-룩 PLL · 2단계: 엣지 위치 맞추기",
      summary: "코너를 맞춘 뒤 엣지를 순환시켜요. Ua/Ub는 엣지 3개 순환, H는 마주보는 쌍 교환, Z는 인접한 쌍 교환이에요.",
    },
    "pll-1look-starters": {
      title: "다음에 배우면 좋은 풀 PLL",
      summary: "2-룩이 익숙해지면 이 세 개가 가장 흔한 원-룩 PLL 케이스를 커버하고 빠르게 익힐 수 있어요.",
    },
    wvls: {
      title: "WVLS (윈터 배리에이션) — 마지막 짝을 넣으며 코너 방향 맞추기",
      body: [
        "WVLS는 OLL 코너 단계를 생략하게 해주는 고급 CFOP 기술이에요. 마지막 F2L 짝을 넣은 뒤 따로 코너 방향을 맞추는 대신, 넣는 동작 자체로 윗면 코너 네 개의 방향을 한 번에 맞춰요.",
        "전제 조건: 마지막 코너-엣지 짝이 이미 윗층에서 연결되어 있고, 마지막 층 엣지가 모두 방향이 맞아(노란 십자 완성) 있어야 해요. WVLS 후에는 모든 조각의 방향이 맞으니 PLL로 마무리해요.",
        "27개의 윈터 배리에이션(WV) 케이스가 있어요. 작은 시간 단축에 비해 알고리즘이 많으니, F2L 미리 보기가 탄탄해진 뒤 천천히 익히세요. 아래 몇 개부터 시작하세요.",
      ],
    },
    "wvls-set": {
      title: "윈터 배리에이션 — 입문 케이스",
      summary:
        "27개 WV 케이스 중 대표적인 일부예요. 짝이 윗층에서 연결되어 있고 마지막 층 엣지의 방향이 모두 맞은 상태에서, 알고리즘이 짝을 넣으며 코너 방향을 맞춰요. (Speed Cube Database 확인.)",
    },
    roux: {
      title: "루(Roux) 방법 — CFOP의 저(低)회전 대안",
      body: [
        "루는 블록 빌딩 기반의 인기 있는 CFOP 대안으로, 회전 수가 매우 효율적이고(보통 CFOP의 약 55수 대비 45수) 큐브 회전 대신 M 슬라이스를 많이 써요. 많은 톱 큐버가 쓰며 Sub 20 이상으로 가는 훌륭한 길이에요.",
        "1단계 — 첫 블록(FB): 왼쪽 아래에 1×2×3 블록을 만들어요(왼쪽 면 전체). 완전히 직관적이고 약 7~8수예요. 계획하는 법을 배우기가 가장 어려운 부분이에요.",
        "2단계 — 둘째 블록(SB): 첫 블록을 깨지 않고 오른쪽 아래에 짝이 되는 1×2×3 블록을 만들어요. 이제 아래 두 블록이 완성되고 윗층과 M 슬라이스만 자유롭게 돌 수 있어요.",
        "3단계 — CMLL: M 슬라이스 엣지는 무시하고 윗층 코너 네 개의 방향과 위치를 한 단계로 맞춰요. 전체 42개지만 이미 아는 코너 케이스(Sune, Anti-Sune 등)와 많이 겹쳐요. 아래 입문 세트를 보세요.",
        "4단계 — LSE(마지막 여섯 엣지): 남은 여섯 엣지를 M과 U 무브만으로 풀어요. 세 소단계로 — (4a) 엣지 방향, (4b) UL/UR 엣지 배치, (4c) 마지막 M 슬라이스 엣지 순환. 외울 게 거의 없고 대부분 직관이에요.",
      ],
    },
    "roux-cmll": {
      title: "CMLL — 입문 알고리즘",
      summary:
        "시작하기 좋은 흔한 CMLL 케이스예요(윗면 코너의 방향과 위치를 한 단계로 맞춰요). r 같은 와이드 무브가 포함돼요. (Speed Cube Database 확인.)",
    },
    "2x2-beginner": {
      title: "2×2 — 초보 방법 (레이어 바이 레이어)",
      body: [
        "2×2(포켓 큐브)는 센터도 엣지도 없이 코너 8개뿐이에요. 그래서 첫 큐브로 완벽해요: 사실상 3×3의 마지막 층이라 여기서 배운 게 그대로 이어져요.",
        "1단계 — 첫 층: 한 색을 골라 한 면의 네 코너를 모두 풀어 아래층을 완성하고 옆면 스티커도 맞춰요. 3×3의 코너 단계처럼 직관적이에요.",
        "2단계 — 윗면 방향 맞추기: 안 풀린 층을 위로 돌리고, 윗면 전체가 한 색이 될 때까지 Sune 알고리즘(R U R' U R U2 R')을 반복해요.",
        "3단계 — 윗면 위치 맞추기: 윗면은 한 색이지만 코너가 잘못된 자리에 있을 수 있어요. 위치 알고리즘(아래 Ortega PBL)으로 제자리에 맞추면 완성! 🎉",
      ],
    },
    ortega: {
      title: "2×2 — Ortega 방법",
      body: [
        "Ortega는 2×2의 인기 스피드 방법으로 알고리즘이 약 12개뿐이고 서브 5초도 자주 나와요. 초보 방법이 익숙해지면 좋은 다음 단계예요.",
        "1단계 — 첫 면: 옆면 스티커는 신경 쓰지 말고 한 면 전체(윗면 네 코너가 같은 색)를 풀어요. 한 층 전체보다 빠르고 유연해요.",
        "2단계 — OLL: 반대 면이 한 색이 되도록 마지막 층 방향을 맞춰요. 아래 7개 케이스로 모든 경우를 커버하고 많은 게 3×3에서 이미 아는 거예요(Sune, Anti-Sune…).",
        "3단계 — PBL: 두 층을 한 번에 맞춰요 — 윗면과 아랫면 코너가 하나의 알고리즘으로 제자리에 들어가요. 아래 6개 케이스로 마무리해요.",
      ],
    },
    "ortega-oll": {
      title: "Ortega OLL — 윗면 방향 맞추기 (7 케이스)",
      summary: "윗면을 한 색으로 만들어요. 방향이 맞은/틀어진 코너 패턴을 인식하고 맞는 알고리즘을 적용하세요.",
    },
    "ortega-pbl": {
      title: "Ortega PBL — 두 층 위치 맞추기 (6 케이스)",
      summary:
        "윗면 방향을 맞춘 상태에서 두 층의 코너를 한 번에 제자리로 옮겨 풀이를 마무리해요. 케이스 이름은 Speed Cube Database의 Ortega PBL 표기를 따라요.",
    },
  },
  zh: {
    cfop: {
      title: "CFOP —— 大多数 sub-20 玩家使用的方法",
      body: [
        "CFOP 代表 Cross、F2L、OLL、PLL —— 按顺序解决的四个步骤。",
        "十字(Cross)：把一面（通常是白色）的四条棱对准中心还原。争取在观察时提前规划，8 步以内完成。",
        "F2L（前两层）：把每个角块和对应的棱块配对并一起插入，同时完成前两层。迈向 sub-20 的时间节省大多来自这里。",
        "OLL（顶层朝向）：把整个顶面变成一种颜色。下面适合新手的「两步 OLL」只用约 10 个公式分两步完成。",
        "PLL（顶层排列）：把顶层块移动到正确位置。「两步 PLL」只用少数几个公式即可完成。",
      ],
    },
    f2l: {
      title: "F2L：凭直觉配对",
      body: [
        "与其背 41 个情况，不如凭直觉学 F2L：找到一对角块和棱块，在顶层把它们连起来，再插入正确的槽位。",
        "黄金法则：如果角块在顶层，先把它放到目标槽位上方，再调整棱块使它们连接，然后用简单的 U R U' R' 之类插入。",
        "预判 —— 完成一对时用眼睛追踪下一对。转慢一点，识别快一点。这是突破 sub-20 最关键的习惯改变。",
      ],
    },
    "oll-edges": {
      title: "两步 OLL · 第 1 步：调整棱块朝向",
      summary: "在顶面做出黄色十字。观察黄色棱块的形状（点、L、直线）并使用对应公式。",
    },
    "oll-corners": {
      title: "两步 OLL · 第 2 步：调整角块朝向 (OCLL)",
      summary: "十字完成后，调整角块朝向使整个顶面变黄。这 7 个情况即可覆盖。",
    },
    "pll-corners": {
      title: "两步 PLL · 第 1 步：排列角块",
      summary: "把顶层角块循环到正确位置。找到有两个相同「车灯」角块的一面；如果没有，先从任意角度做一次公式。",
    },
    "pll-edges": {
      title: "两步 PLL · 第 2 步：排列棱块",
      summary: "角块归位后循环棱块。Ua/Ub 是三棱循环，H 交换对面两对，Z 交换相邻两对。",
    },
    "pll-1look-starters": {
      title: "接下来值得学的完整 PLL",
      summary: "两步熟练后，这三个覆盖最常见的一步 PLL 情况，是提速的快速收益。",
    },
    wvls: {
      title: "WVLS（Winter Variation）—— 插入最后一对时同时调整角块朝向",
      body: [
        "WVLS 是一项进阶 CFOP 技巧，能省去 OLL 角块步骤。插入最后一对 F2L 时，插入动作本身就同时调整了顶层四个角块的朝向。",
        "前提：最后一对角棱已在顶层连接，且顶层所有棱块已经朝向正确（黄色十字完成）。WVLS 之后所有块都朝向正确，用一个 PLL 收尾即可。",
        "共有 27 个 Winter Variation (WV) 情况。相对小的时间收益需要不少公式，建议在 F2L 预判扎实后再逐步学习。先从下面几个开始。",
      ],
    },
    "wvls-set": {
      title: "Winter Variation —— 入门情况",
      summary:
        "27 个 WV 情况中的代表性一部分。一对已在顶层连接、顶层棱块全部朝向正确时，公式在插入的同时调整角块朝向。（来自 Speed Cube Database。）",
    },
    roux: {
      title: "Roux 方法 —— CFOP 之外的低步数选择",
      body: [
        "Roux 是流行的 CFOP 替代方法，基于搭块、转数很省（通常约 45 步 vs CFOP 约 55 步），大量使用 M 层而非整体转动。许多顶尖玩家使用它，是通往 sub-20 及更快的可靠路线。",
        "第 1 步 —— 第一块(FB)：在左下角搭一个 1×2×3 块（覆盖左面）。完全凭直觉，约 7~8 步。学会规划它是最难的部分。",
        "第 2 步 —— 第二块(SB)：在不破坏第一块的情况下，在右下角搭一个对应的 1×2×3 块。现在下方两块完成，只剩顶层和 M 层可以自由转动。",
        "第 3 步 —— CMLL：忽略 M 层棱块，一步同时调整并排列顶层四个角块。完整 42 个公式，但很多与你已会的角块情况（Sune、Anti-Sune 等）重合。见下面的入门集。",
        "第 4 步 —— LSE（最后六棱）：只用 M 和 U 转动解决剩下六条棱，分三小步 —— (4a) 棱块朝向，(4b) 放置 UL/UR 棱，(4c) 循环最后的 M 层棱。几乎不用记忆，主要靠直觉。",
      ],
    },
    "roux-cmll": {
      title: "CMLL —— 入门公式",
      summary:
        "适合起步的常见 CMLL 情况（一步同时调整并排列顶层角块）。包含 r 等宽层转动。（来自 Speed Cube Database。）",
    },
    "2x2-beginner": {
      title: "2×2 —— 新手方法（逐层法）",
      body: [
        "2×2（口袋方块）没有中心块和棱块，只有 8 个角块。因此它是最适合入门的方块：本质上就是 3×3 的最后一层，学到的东西可以直接延续。",
        "第 1 步 —— 第一层：选一种颜色，把一面的四个角块全部还原，让底层完成，侧面贴纸也对上。就像 3×3 的角块步骤一样凭直觉。",
        "第 2 步 —— 顶面朝向：把未还原的层转到顶部，反复使用 Sune 公式 (R U R' U R U2 R') 直到整个顶面变成一种颜色。",
        "第 3 步 —— 顶面排列：顶面已是一种颜色，但角块可能位置不对。用排列公式（下面的 Ortega PBL）把它们归位，就完成啦！🎉",
      ],
    },
    ortega: {
      title: "2×2 —— Ortega 方法",
      body: [
        "Ortega 是流行的 2×2 速拧方法，只有约 12 个公式，经常能做到 sub-5 秒。熟悉新手方法后，这是很好的下一步。",
        "第 1 步 —— 第一面：不用管侧面贴纸，先做好一整面（顶面四个角块同色）。比做一整层更快更灵活。",
        "第 2 步 —— OLL：调整最后一层朝向，使对面变成一种纯色。下面 7 个情况即可覆盖，很多在 3×3 里你已经会了（Sune、Anti-Sune…）。",
        "第 3 步 —— PBL：一次排列两层 —— 顶层和底层的角块用一个公式同时归位。下面 6 个情况完成还原。",
      ],
    },
    "ortega-oll": {
      title: "Ortega OLL —— 顶面朝向（7 个情况）",
      summary: "把顶面做成一种纯色。识别角块朝向正确/扭转的图案，使用对应公式。",
    },
    "ortega-pbl": {
      title: "Ortega PBL —— 排列两层（6 个情况）",
      summary:
        "顶面朝向完成后，一次把两层角块归位，完成还原。情况名称沿用 Speed Cube Database 的 Ortega PBL 标记。",
    },
  },
  ja: {
    cfop: {
      title: "CFOP — 多くのサブ20キューバーが使う解法",
      body: [
        "CFOP は Cross・F2L・OLL・PLL — 順番に解く4ステップの略です。",
        "クロス(Cross)：一面（通常は白）の4つのエッジをセンターに合わせて揃えます。インスペクションで計画し、8手以内を目指しましょう。",
        "F2L（最初の2層）：コーナーと対応するエッジをペアにして一緒に挿入し、最初の2層を同時に完成させます。サブ20への時間短縮の大半はここから生まれます。",
        "OLL（最終層の向き）：上面全体を一色にします。下の初心者向け「2ルックOLL」は約10手順で2段階に分けて行います。",
        "PLL（最終層の並べ替え）：最終層のパーツを正しい位置へ移動します。「2ルックPLL」はわずかな手順で行えます。",
      ],
    },
    f2l: {
      title: "F2L：直感的にペアを作る",
      body: [
        "41ケースを暗記する代わりに、F2Lを直感的に学びましょう：コーナーとエッジのペアを見つけ、上層でつなげてから正しいスロットへ挿入します。",
        "黄金ルール：コーナーが上層にあるなら目標スロットの上に置き、エッジを合わせてペアをつなげ、シンプルな U R U' R' 系で挿入します。",
        "先読み — 1組を終える間に、目で次の組を追いましょう。回転はゆっくり、認識は速く。サブ20突破の最大の習慣変化です。",
      ],
    },
    "oll-edges": {
      title: "2ルックOLL · ステップ1：エッジの向きを揃える",
      summary: "上面に黄色い十字を作ります。黄色エッジの形（点・L・直線）を見て対応する手順を使いましょう。",
    },
    "oll-corners": {
      title: "2ルックOLL · ステップ2：コーナーの向きを揃える (OCLL)",
      summary: "十字を作った後、コーナーの向きを揃えて上面全体を黄色にします。この7ケースでカバーできます。",
    },
    "pll-corners": {
      title: "2ルックPLL · ステップ1：コーナーを並べ替える",
      summary: "最終層のコーナーを正しい位置へ入れ替えます。同じ「ヘッドライト」のコーナーが2つある面を探しましょう。無ければ任意の角度で一度手順を行います。",
    },
    "pll-edges": {
      title: "2ルックPLL · ステップ2：エッジを並べ替える",
      summary: "コーナーを揃えた後、エッジを入れ替えます。Ua/Ub は3エッジ循環、H は対辺の2組交換、Z は隣接する2組交換です。",
    },
    "pll-1look-starters": {
      title: "次に覚えると便利なフルPLL",
      summary: "2ルックに慣れたら、この3つが最も多い1ルックPLLケースをカバーし、すぐタイム短縮につながります。",
    },
    wvls: {
      title: "WVLS（ウィンターバリエーション）— 最後のペア挿入と同時にコーナーの向きを揃える",
      body: [
        "WVLS は OLL のコーナー工程を省ける上級 CFOP テクニックです。最後の F2L ペアを挿入する動作そのもので、上面4つのコーナーの向きを一度に揃えます。",
        "前提：最後のコーナー・エッジのペアが既に上層でつながっていて、最終層のエッジがすべて向き済み（黄色十字が完成）であること。WVLS 後は全パーツの向きが揃うので、PLL で仕上げます。",
        "ウィンターバリエーション(WV)は27ケースあります。時間短縮の割に手順が多いので、F2Lの先読みが安定してから少しずつ覚えましょう。まずは下のいくつかから。",
      ],
    },
    "wvls-set": {
      title: "ウィンターバリエーション — 入門ケース",
      summary:
        "27の WV ケースのうち代表的な一部です。ペアが上層でつながり、最終層エッジがすべて向き済みの状態で、手順がペアを挿入しつつコーナーの向きを揃えます。（Speed Cube Database より。）",
    },
    roux: {
      title: "Roux（ルー）法 — CFOP の低手数な代替",
      body: [
        "Roux はブロックビルディング型の人気ある CFOP 代替で、手数がとても少なく（通常 CFOP 約55手に対し約45手）、キューブ回転の代わりに M スライスを多用します。多くのトップ選手が使い、サブ20以上への確かな道です。",
        "ステップ1 — ファーストブロック(FB)：左下に 1×2×3 ブロックを作ります（左面全体）。完全に直感的で約7〜8手。計画の仕方を覚えるのが一番難しい部分です。",
        "ステップ2 — セカンドブロック(SB)：最初のブロックを崩さず、右下に対になる 1×2×3 ブロックを作ります。これで下2ブロックが完成し、上層と M スライスだけが自由に回せます。",
        "ステップ3 — CMLL：M スライスのエッジは無視し、上層4コーナーの向きと位置を1ステップで揃えます。全42手順ですが、既に知っているコーナーケース（Sune、Anti-Sune など）と多く重なります。下の入門セットを参照。",
        "ステップ4 — LSE（ラスト6エッジ）：残り6エッジを M と U の動きだけで解きます。3小ステップ — (4a) エッジの向き、(4b) UL/UR エッジ配置、(4c) 最後の M スライスエッジ循環。暗記はほぼ不要で、ほとんど直感です。",
      ],
    },
    "roux-cmll": {
      title: "CMLL — 入門手順",
      summary:
        "始めやすい定番の CMLL ケースです（上面コーナーの向きと位置を1ステップで揃えます）。r などのワイドムーブを含みます。（Speed Cube Database より。）",
    },
    "2x2-beginner": {
      title: "2×2 — 初心者向け解法（レイヤー・バイ・レイヤー）",
      body: [
        "2×2（ポケットキューブ）はセンターもエッジもなく、コーナー8個だけ。だから最初のキューブに最適です：実質3×3の最終層なので、学んだことがそのまま活きます。",
        "ステップ1 — 第1層：色を1つ選び、一面の4コーナーをすべて揃えて下の層を完成させ、側面のステッカーも合わせます。3×3のコーナー工程のように直感的です。",
        "ステップ2 — 上面の向き：未完成の層を上にして、上面全体が一色になるまで Sune 手順 (R U R' U R U2 R') を繰り返します。",
        "ステップ3 — 上面の並べ替え：上面は一色でも、コーナーの位置が違うことがあります。並べ替え手順（下の Ortega PBL）で正しい位置に入れれば完成！🎉",
      ],
    },
    ortega: {
      title: "2×2 — Ortega（オルテガ）法",
      body: [
        "Ortega は 2×2 の人気スピード解法で、手順は約12個だけ、サブ5秒もよく出ます。初心者向け解法に慣れたら良い次のステップです。",
        "ステップ1 — ファーストフェイス：側面のステッカーは気にせず、一面全体（上面4コーナーが同色）を作ります。1層全部より速く柔軟です。",
        "ステップ2 — OLL：反対の面が一色になるよう最終層の向きを揃えます。下の7ケースでカバーでき、多くは3×3で既知です（Sune、Anti-Sune…）。",
        "ステップ3 — PBL：両層を一度に並べ替え — 上面と底面のコーナーが1手順で正しい位置に入ります。下の6ケースで仕上げます。",
      ],
    },
    "ortega-oll": {
      title: "Ortega OLL — 上面の向き（7ケース）",
      summary: "上面を一色にします。向き済み／ねじれたコーナーのパターンを認識し、対応する手順を使いましょう。",
    },
    "ortega-pbl": {
      title: "Ortega PBL — 両層を並べ替え（6ケース）",
      summary:
        "上面の向きを揃えた状態で、両層のコーナーを一度に正しい位置へ入れ、解を仕上げます。ケース名は Speed Cube Database の Ortega PBL 表記に従います。",
    },
  },
};

/** Returns a guide with title/body translated for the language (algorithms untouched). */
export function localizeGuide(g: Guide, lang: Language): Guide {
  const p = learnProse[lang]?.[g.id];
  if (!p) return g;
  return { ...g, title: p.title ?? g.title, body: p.body ?? g.body };
}

/** Returns an alg set with title/summary translated (names & moves untouched). */
export function localizeSet(s: AlgSet, lang: Language): AlgSet {
  const p = learnProse[lang]?.[s.id];
  if (!p) return s;
  return { ...s, title: p.title ?? s.title, summary: p.summary ?? s.summary };
}
