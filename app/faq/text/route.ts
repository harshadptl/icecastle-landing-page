import { faqs } from "@/lib/structured-data";

/** Plain-text rendering of the FAQ, for AI crawlers and llms.txt. */
function faqToText(): string {
  const body = faqs.map((f, i) => `${String(i + 1).padStart(2, "0")}. ${f.q}\n${f.a}`).join("\n\n");
  return `FAQ — Reserved GPU Procurement Questions\n\n${body}`;
}

export function GET() {
  return new Response(faqToText(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
