// Builds cube-case diagram image URLs from an algorithm, using the VisualCube
// renderer (visualcube.api.cubing.net). The `case` param applies the inverse of
// the algorithm to a solved cube, so a top-down ("plan") diagram shows the state
// the algorithm solves — i.e. the case you're looking at, in real colours.

const VISUALCUBE = "https://visualcube.api.cubing.net/visualcube.php";

/**
 * Normalize an algorithm for VisualCube: strip grouping parentheses and collapse
 * whitespace. Returns null for entries that aren't a single algorithm (e.g. the
 * "do X then Y" dot case), which shouldn't get a diagram.
 */
export function cleanAlg(moves: string): string | null {
  if (/\bthen\b/i.test(moves)) return null;
  const cleaned = moves.replace(/[()]/g, " ").replace(/\s+/g, " ").trim();
  return cleaned || null;
}

function invertRotation(t: string): string {
  if (t.endsWith("2")) return t; // x2 is its own inverse
  if (t.endsWith("'")) return t[0]; // x' -> x
  return t + "'"; // x -> x'
}

/**
 * Append moves that cancel the algorithm's net cube rotation (x/y/z), so the
 * diagram always ends with the last layer (yellow) facing up. Without this,
 * algs like the Ab perm (written with a leading `x`) show the wrong face on top.
 */
function keepYellowUp(alg: string): string {
  const rotations = alg.split(/\s+/).filter((t) => /^[xyz][2']?$/.test(t));
  if (rotations.length === 0) return alg;
  const undo = rotations.reverse().map(invertRotation).join(" ");
  return `${alg} ${undo}`;
}

/**
 * Plan-view diagram URL for a case, or null if the alg can't be diagrammed.
 * `bottom` flips the cube (x2) so the white/bottom face is shown instead of the
 * yellow top — used for cases that affect both layers (e.g. Ortega PBL).
 */
export function caseImageUrl(moves: string, pzl = 3, bottom = false): string | null {
  const cleaned = cleanAlg(moves);
  if (!cleaned) return null;
  const alg = keepYellowUp(cleaned) + (bottom ? " x2" : "");
  const params = new URLSearchParams({
    fmt: "svg",
    size: "140",
    bg: "t", // transparent — sits nicely on light/dark cards
    view: "plan",
    pzl: String(pzl),
    case: alg,
  });
  return `${VISUALCUBE}?${params.toString()}`;
}
