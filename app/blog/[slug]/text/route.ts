import { articles, getArticle, type Article } from "@/lib/articles";
import { cleanText, nodeToText } from "@/lib/render-text";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

/** Plain-text rendering of an article body, for AI crawlers and llms.txt. */
function articleToText(article: Article): string {
  const text = cleanText(nodeToText(article.body));
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
