import { isValidElement, type ReactNode } from "react";
import { articles, getArticle, type Article } from "@/lib/articles";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

const BLOCK_TAGS = new Set(["h1", "h2", "h3", "p", "li", "aside", "div"]);

/** Walks a JSX tree and extracts its text, without rendering through react-dom. */
function nodeToText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join("");
  if (isValidElement(node)) {
    const tag = typeof node.type === "string" ? node.type : "";
    const inner = nodeToText((node.props as { children?: ReactNode }).children);
    if (tag === "br") return "\n";
    return BLOCK_TAGS.has(tag) ? `\n\n${inner}` : inner;
  }
  return "";
}

/** Plain-text rendering of an article body, for AI crawlers and llms.txt. */
function articleToText(article: Article): string {
  const text = nodeToText(article.body)
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return `${article.title}\n${article.date} · ${article.readTime}\n\n${article.standfirst}\n\n${text}${
    article.disclaimer ? `\n\n${article.disclaimer}` : ""
  }`;
}

export function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const article = getArticle(slug);
    if (!article) return new Response("Not found", { status: 404 });
    return new Response(articleToText(article), {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  });
}
