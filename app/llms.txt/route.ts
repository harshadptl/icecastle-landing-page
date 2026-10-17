import { articles } from "@/lib/articles";
import { gpus } from "@/lib/gpus";
import { SITE_URL } from "@/lib/structured-data";

export function GET() {
  const articleLinks = articles
    .map((a) => `- [${a.title}](${SITE_URL}/blog/${a.slug}/text): ${a.excerpt}`)
    .join("\n");
  const gpuLinks = gpus
    .map((g) => `- [${g.title}](${SITE_URL}/gpus/${g.slug}/text): ${g.standfirst}`)
    .join("\n");
  const body = `# ICE Castle

> Reserved NVIDIA B200/B300 GPU capacity for sustained AI workloads, on 36-month commitments, plus GPU server colocation in Texas, Ohio, Virginia, Ontario (Canada) and Alberta (Canada).

## Pages
- [Home](${SITE_URL}/): Pricing, GPU specs, colocation locations, and the fleet cost calculator.
- [FAQ](${SITE_URL}/faq/text): Procurement questions on demand changes, verification, billing, SLA, and burst capacity.
- [Blog](${SITE_URL}/blog): GPU pricing and AI infrastructure guides.

## GPU specs (plain text)
${gpuLinks}

## Articles (plain text)
${articleLinks}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
