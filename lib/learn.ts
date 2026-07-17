// Learning-hub content as data so it's trivial to expand over time.
// Algorithms here are standard, widely-taught sets — verified beginner/2-look
// CFOP. Add full OLL (57) / PLL (21) sets incrementally.

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
  learnMoreUrl: "https://www.speedsolving.com/wiki/index.php/CFOP_method",
};

export const f2lGuide: Guide = {
  id: "f2l",
  title: "F2L: pairing intuitively",
  body: [
    "Instead of memorizing 41 cases, learn F2L intuitively: find a corner/edge pair, join them in the top layer, then insert into the correct slot.",
    "Golden rule: if the corner is in the top layer, position it above its target slot, then set up the edge so the pair connects, and insert with a simple U R U' R' (or mirrored) style move.",
    "Look ahead — while finishing one pair, let your eyes track the next one. Slow down turning, speed up recognition. This is the single biggest habit change for breaking sub-20.",
  ],
  learnMoreUrl: "https://speedcubedb.com/a/3x3/F2L",
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
  learnMoreUrl: "https://www.speedsolving.com/wiki/index.php/Roux_method",
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
