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

---

*This log tracks every SEO change shipped to the live site.*
