import type { Metadata } from "next";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import { faqSchema, faqs } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "FAQ — Reserved GPU Procurement Questions",
  description: "Key procurement questions on reserved NVIDIA B200/B300 GPU capacity: demand changes, verification, billing, SLA, and burst capacity.",
  alternates: {
    canonical: "/faq",
    types: { "text/plain": "/faq/text" },
  },
};

export default function FaqPage() {
  return (
    <main id="faq-page" className="blog-view" aria-label="FAQ">
      <StructuredData schemas={[faqSchema]} />
      <div className="wrap">
        <Link className="back-link" href="/">
          <span aria-hidden="true">&larr;</span> Home
        </Link>
        <span className="eyebrow reveal">FAQ</span>
        <h1 className="a-h1 reveal">Resolve the key procurement questions.</h1>
        <div className="faq-grid">
          {faqs.map((f, i) => (
            <div key={f.q} className="faq-cell reveal" data-d={i ? String(i) : undefined}>
              <div className="ix">{String(i + 1).padStart(2, "0")}</div>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
        <p className="lede reveal">
          Still deciding? Read <Link href="/blog/commitment-question">how to approach the commitment question</Link> and{" "}
          <Link href="/blog/baseload-vs-burst">how to split baseload from burst</Link>.
        </p>
      </div>
    </main>
  );
}
