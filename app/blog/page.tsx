import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";
import StructuredData from "@/components/StructuredData";
import { blogSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "GPU Pricing Guides & AI Infrastructure Blog",
  description:
    "GPU pricing guides for AI teams: reserved vs on-demand rates, B200 vs B300 specs, and when a 36-month GPU commitment pays off.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <main id="blog-index" className="blog-view" aria-label="ICE Castle blog">
      <StructuredData schemas={[blogSchema(articles)]} />
      <div className="wrap">
        <span className="mono-kicker reveal">
          <span className="bno">B.00</span> Blog / Index
        </span>
        <h1 className="blog-h reveal">Notes on compute economics.</h1>
        <p className="lede reveal">Plain-English guides to GPU pricing and AI infrastructure.</p>
        <p className="lede reveal">
          This blog answers the questions AI teams ask before they sign a GPU contract. We compare{" "}
          <Link href="/blog/reserved-vs-on-demand-gpu-pricing">reserved and on-demand GPU pricing</Link>, explain{" "}
          <Link href="/blog/b200-vs-b300">NVIDIA B200 vs B300 specs</Link>, and show{" "}
          <Link href="/blog/commitment-question">when a 36-month commitment pays off</Link>. Each guide uses real
          numbers. Want your own figures? Try the <Link href="/#calculator">GPU savings calculator</Link>.
        </p>
        <div className="blog-meta reveal">
          {String(articles.length).padStart(2, "0")} ARTICLES · UPDATED{" "}
          <time dateTime={blogSchema(articles).dateModified}>{articles[0].date}</time>
        </div>
        <ul className="bwall">
          {articles.map((a, i) => (
            <li key={a.slug}>
              <Link className="bcard reveal" data-d={i ? String(i) : undefined} href={`/blog/${a.slug}`}>
                <div>
                  <div className="b-kicker">
                    <span className="b-ix">{a.index}</span>
                    <span>{a.kicker}</span>
                  </div>
                  <h2 className="b-title">{a.title}</h2>
                  <p className="b-stand">{a.excerpt}</p>
                  <div className="b-date">{a.date}</div>
                </div>
                <span className="b-arrow" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
