import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { gpus, getGpu } from "@/lib/gpus";
import StructuredData from "@/components/StructuredData";
import { gpuSchema } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return gpus.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const gpu = getGpu(slug);
  if (!gpu) return {};
  return {
    title: gpu.title,
    description: gpu.standfirst,
    alternates: {
      canonical: `/gpus/${gpu.slug}`,
      types: { "text/plain": `/gpus/${gpu.slug}/text` },
    },
  };
}

export default async function GpuPage({ params }: Props) {
  const { slug } = await params;
  const gpu = getGpu(slug);
  if (!gpu) notFound();

  return (
    <main id="gpu-page" className="blog-view" aria-label={gpu.name}>
      <StructuredData schemas={[gpuSchema(gpu)]} />
      <div className="wrap">
        <Link className="back-link" href="/#gpus">
          <span aria-hidden="true">&larr;</span> Capacity
        </Link>
        <article className="reveal">
          <div className="a-col">
            <span className="mono-kicker">{gpu.name}</span>
            <h1 className="a-h1">{gpu.title}</h1>
            <p className="a-stand">{gpu.standfirst}</p>
            <div className="a-body">{gpu.body}</div>
            <div className="a-foot">
              <div className="a-ctas">
                <Link href="/#quote" className="btn btn-primary">
                  Check capacity &amp; pricing <span className="arr">&rarr;</span>
                </Link>
              </div>
              <p className="a-disc">{gpu.disclaimer}</p>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
