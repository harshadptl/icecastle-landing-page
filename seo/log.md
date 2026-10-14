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

---

*This log tracks every SEO change shipped to the live site.*
