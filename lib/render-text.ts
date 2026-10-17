import { isValidElement, type ReactNode } from "react";

const BLOCK_TAGS = new Set(["h1", "h2", "h3", "p", "li", "aside", "div"]);

/** Walks a JSX tree and extracts its text, without rendering through react-dom. */
export function nodeToText(node: ReactNode): string {
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

/** Cleans up the whitespace nodeToText leaves behind. */
export function cleanText(text: string): string {
  return text.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}
