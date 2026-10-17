import { gpus, getGpu, type Gpu } from "@/lib/gpus";
import { cleanText, nodeToText } from "@/lib/render-text";

export const dynamicParams = false;

export function generateStaticParams() {
  return gpus.map((g) => ({ slug: g.slug }));
}

/** Plain-text rendering of a GPU page, for AI crawlers and llms.txt. */
function gpuToText(gpu: Gpu): string {
  const text = cleanText(nodeToText(gpu.body));
  return `${gpu.title}\n\n${gpu.standfirst}\n\n${text}\n\n${gpu.disclaimer}`;
}

export function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const gpu = getGpu(slug);
    if (!gpu) return new Response("Not found", { status: 404 });
    return new Response(gpuToText(gpu), {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  });
}
