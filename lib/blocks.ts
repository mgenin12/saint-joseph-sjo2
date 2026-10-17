/**
 * Blocs dynamiques insérables dans le Markdown d'un article : un jeton seul sur
 * sa ligne, par exemple `[[budget]]`, est remplacé par un composant interactif.
 */
export const BLOCK_NAMES = ["budget", "equipe", "avancement", "calendrier", "clocher", "faq", "missions"] as const;
export type BlockName = (typeof BLOCK_NAMES)[number];

export type Segment = { type: "markdown"; value: string } | { type: "block"; name: BlockName };

const TOKEN = /^\s*\[\[([a-z-]+)\]\]\s*$/i;

export function isBlockName(name: string): name is BlockName {
  return (BLOCK_NAMES as readonly string[]).includes(name.toLowerCase());
}

/** Découpe le Markdown en segments texte / blocs. Les jetons inconnus restent du texte. */
export function splitBlocks(markdown: string): Segment[] {
  const segments: Segment[] = [];
  let buffer: string[] = [];
  const flush = () => {
    const value = buffer.join("\n").trim();
    if (value) segments.push({ type: "markdown", value });
    buffer = [];
  };
  for (const line of (markdown || "").split(/\r?\n/)) {
    const m = line.match(TOKEN);
    if (m && isBlockName(m[1])) {
      flush();
      segments.push({ type: "block", name: m[1].toLowerCase() as BlockName });
    } else {
      buffer.push(line);
    }
  }
  flush();
  return segments;
}

export function usesBlock(markdown: string, name: BlockName): boolean {
  return splitBlocks(markdown).some((s) => s.type === "block" && s.name === name);
}
