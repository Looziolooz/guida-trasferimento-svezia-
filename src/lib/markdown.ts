import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import GithubSlugger from "github-slugger";
import type { Root } from "mdast";

export type TocEntry = { id: string; text: string; depth: 2 | 3 };

const CALLOUTS = new Set(["note", "tip", "warn", "danger", "who", "cost"]);

/** remark-directive non espone tipi mdast: quel che serve è poco. */
type DirectiveChild = {
  type: string;
  data?: { directiveLabel?: boolean };
  children?: DirectiveChild[];
};

type ContainerDirective = {
  type: string;
  name?: string;
  children?: DirectiveChild[];
  data?: Record<string, unknown>;
};

/**
 * `:::warn[Titolo]` → <aside class="callout callout-warn">.
 * Il blocco `who` è quello che questo sito usa più di tutti:
 * "a chi ci si rivolge davvero".
 */
function remarkCallouts() {
  return (tree: Root) => {
    visit(tree, (node) => {
      const directive = node as unknown as ContainerDirective;
      if (directive.type !== "containerDirective") return;

      const name = String(directive.name ?? "");
      if (!CALLOUTS.has(name)) return;

      const children = directive.children ?? [];
      const first = children[0];
      let title: DirectiveChild[] | null = null;

      if (first?.type === "paragraph" && first.data?.directiveLabel) {
        title = first.children ?? [];
        children.shift();
      }

      if (title) {
        children.unshift({
          type: "paragraph",
          children: title,
          data: { hName: "p", hProperties: { className: ["callout-title"] } },
        } as DirectiveChild);
      }

      directive.data = {
        hName: "aside",
        hProperties: { className: ["callout", `callout-${name}`] },
      };
    });
  };
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkDirective)
  .use(remarkCallouts)
  .use(remarkRehype, { allowDangerousHtml: false })
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, {
    behavior: "wrap",
    properties: { className: ["heading-anchor"] },
  })
  .use(rehypeStringify);

export async function renderMarkdown(source: string): Promise<string> {
  const file = await processor.process(source);
  return String(file);
}

/** Estrae h2/h3 con gli stessi id generati da rehype-slug. */
export function extractToc(source: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const toc: TocEntry[] = [];
  const lines = source.split("\n");
  let inFence = false;

  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const depth = match[1].length as 2 | 3;
    const text = match[2]
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[*_`]/g, "")
      .trim();
    toc.push({ id: slugger.slug(text), text, depth });
  }
  return toc;
}

/** Testo grezzo per indice di ricerca e tempo di lettura. */
export function toPlainText(source: string): string {
  return source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/^:::.*$/gm, " ")
    .replace(/\|/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function readingMinutes(source: string): number {
  const words = toPlainText(source).split(" ").filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
