import { caseImageUrl } from "@/lib/caseImage";

function Face({ moves, pzl, size, bottom }: { moves: string; pzl: number; size: number; bottom?: boolean }) {
  const url = caseImageUrl(moves, pzl, bottom);
  if (!url) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt=""
      loading="lazy"
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className="shrink-0 select-none"
    />
  );
}

/**
 * A plan-view diagram of the case an algorithm solves. When `bothFaces` is set
 * (e.g. Ortega PBL, which permutes both layers) it shows the yellow top face and
 * the white bottom face side by side.
 */
export function CaseDiagram({
  moves,
  pzl = 3,
  size = 56,
  bothFaces = false,
}: {
  moves: string;
  pzl?: number;
  size?: number;
  bothFaces?: boolean;
}) {
  if (!bothFaces) return <Face moves={moves} pzl={pzl} size={size} />;
  return (
    <div className="flex items-center gap-1 shrink-0">
      <Face moves={moves} pzl={pzl} size={size} />
      <Face moves={moves} pzl={pzl} size={size} bottom />
    </div>
  );
}
