import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/lib/articles";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.standfirst,
    openGraph: { type: "article", title: article.title, description: article.standfirst },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const next = getArticle(article.next);

  return (
    <main id="blog-article" className="blog-view" aria-label="Article">
      <div className="wrap">
        <Link className="back-link" href="/blog">
          <span aria-hidden="true">&larr;</span> All articles
        </Link>
        <article className="reveal" data-slug={article.slug}>
          <div className="a-col">
            <span className="mono-kicker">
              <span className="bno">B.{article.index}</span> {article.category}
            </span>
            <h1 className="a-h1">{article.title}</h1>
            <p className="a-stand">{article.standfirst}</p>
            <div className="a-meta">
              <span>{article.date}</span>
              <span className="sep">/</span>
              <span>{article.readTime}</span>
            </div>
            <div className="a-body">{article.body}</div>
            <div className="a-foot">
              {next && (
                <Link className="next-art" href={`/blog/${next.slug}`}>
                  <div>
                    <div className="k">Next article</div>
                    <div className="t">{next.title}</div>
                  </div>
                  <span className="ar" aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
              )}
              <div className="a-ctas">
                <Link href="/#calculator" className="btn btn-primary">
                  Estimate Savings <span className="arr">&rarr;</span>
                </Link>
                <a
                  href="mailto:hello@icecastle.ai?subject=Talk%20to%20ICE%20Castle%20Infrastructure"
                  className="btn btn-ghost"
                >
                  Talk to Infrastructure <span className="arr">&rarr;</span>
                </a>
              </div>
              {article.disclaimer && <p className="a-disc">{article.disclaimer}</p>}
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
