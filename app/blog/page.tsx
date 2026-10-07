import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Pricing mechanics, infrastructure strategy, and honest answers — written for the people who sign the compute bills.",
};

export default function BlogIndexPage() {
  return (
    <main id="blog-index" className="blog-view" aria-label="ICE Castle blog">
      <div className="wrap">
        <span className="mono-kicker reveal">
          <span className="bno">B.00</span> Blog / Index
        </span>
        <h1 className="blog-h reveal">Notes on compute economics.</h1>
        <p className="lede reveal">
          Pricing mechanics, infrastructure strategy, and honest answers — written for the people who sign the
          compute bills. No jargon, and no pricing mystique.
        </p>
        <div className="blog-meta reveal" aria-hidden="true">
          {String(articles.length).padStart(2, "0")} ARTICLES · UPDATED SEP 2026
        </div>
        <div className="bwall">
          {articles.map((a, i) => (
            <Link key={a.slug} className="bcard reveal" data-d={i ? String(i) : undefined} href={`/blog/${a.slug}`}>
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
          ))}
        </div>
      </div>
    </main>
  );
}
