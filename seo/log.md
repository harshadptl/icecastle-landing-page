# SEO Log

## 2026-10-13 (Setup Day)

- **0b0bad2** Fixed `/blog` title: "Blog" → "GPU Pricing & Infrastructure Blog"
  - Previous: vague category label, no search intent
  - Impact: +keyword relevance for pricing/infrastructure queries
  - URL: /blog

- **b4bf56b** Added schema.org structured data (Organization, Product, FAQSchema)
  - Added: JSON-LD schemas in `<head>` for search engine + AI assistant discovery
  - Impact: Organization/Product metadata indexed by Google, ChatGPT, Claude, Perplexity; improved rich snippet potential; +AI answer citations
  - Files: lib/structured-data.ts, components/StructuredData.tsx, app/layout.tsx
  - Backlog item #1 (Setup priority)

- **(pending commit)** Shipped new article: "Reserved vs on-demand GPU pricing, sourced"
  - URL: /blog/reserved-vs-on-demand-gpu-pricing
  - What: Sourced CoreWeave/AWS/Lambda pricing (third-party aggregators, Oct 2026), the
    utilization-decides-the-deal argument, honest positioning of our own ~$5/GPU-hour target
  - Internal links: 3 (blog index auto-list, commitment-question "next" chain, contextual
    link added from baseload-vs-burst)
  - Verified: tsc clean, `next build` succeeds (6/6 blog pages static), title tag 56 chars
  - Backlog item #2 (Setup priority)

- **(pending commit)** Shipped new article: "B200 vs B300: which GPU fits your workload"
  - URL: /blog/b200-vs-b300
  - What: Sourced spec comparison (memory, power, compute) from public GPU trackers, honest
    "most workloads don't need the B300" framing, pricing-premium range (too wide across
    sources to state as one number — left qualitative), CTA to specify workload on quote
  - Internal links: 4 (blog index auto-list, commitment-question "next" chain, contextual
    link from qualifying-deployments, new link from homepage's #gpus section)
  - Fixed: article array was in insertion order, not newest-first, after the previous
    article got appended to the end last run — reordered all 7 articles and renumbered
    index fields + the next-article ring to restore newest-first display
  - Verified: tsc clean, `next build` succeeds (7/7 blog pages static), title tag 55 chars,
    blog index order confirmed newest-first via rendered HTML
  - Backlog item #3 (Setup priority) — all 3 Setup-day backlog items now shipped

---

*This log tracks every SEO change shipped to the live site.*
