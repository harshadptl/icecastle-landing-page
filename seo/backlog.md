# SEO Backlog

Ordered by expected signups per hour of work. First three marked for Setup day (today).

## SHIPPED

### 2. ~~Create "ICE Castle vs CoreWeave vs AWS: GPU Capacity Comparison"~~ ✅

Shipped 2026-10-13 as `/blog/reserved-vs-on-demand-gpu-pricing`. Scope shifted slightly from
the original "feature grid vs named competitors" plan to a sourced pricing-landscape piece
(CoreWeave/AWS/Lambda numbers, third-party aggregator data, utilization-is-the-real-variable
argument) — named head-to-head "X vs Y" pages are now tracked separately under Monthly,
item 3 (comparison pages), since those need per-competitor claims with individual sources
and "as of" dates that are a bigger lift than one research pass covered.

Internal links added (3, per the skill's new-page rule): `/blog` index (auto), the
`commitment-question` → next-article chain link, and a contextual link from
`baseload-vs-burst`.

### 3. ~~Create "B200/B300 GPU Pricing & Specs" Guide~~ ✅

Shipped 2026-10-13 as `/blog/b200-vs-b300`. Specs sourced from public GPU trackers
(DataCrunch, Civo, TechLoy, Deploybase, SemiAnalysis) with explicit disclaimer that these
aren't NVIDIA's own datasheet numbers and sources disagree on exact figures. Pricing
section stays qualitative (checked for a B300-over-B200 premium figure; aggregator data
ranged from near-parity to ~2x depending on provider — too wide to state as one number, so
left it as a range with a pointer to the pricing article instead of inventing a blended
average).

Internal links added (4): `/blog` index (auto), `commitment-question` → next-article chain,
a contextual link from `qualifying-deployments` (GPU type variable), and a link from the
homepage's `#gpus` section — the first new-page link placed on `/` itself.

**Also fixed while shipping this:** the previous article (`reserved-vs-on-demand-gpu-pricing`)
had been appended to the *end* of the `articles` array, which put it at the bottom of
`/blog` despite being the newest post — the array order is what drives display order, and the
existing convention is newest-first. Reordered the array and renumbered all `index` fields;
fixed the `next` ring to match (now: b200-vs-b300 → reserved-vs-on-demand-gpu-pricing →
gpu-bill-product-economics → baseload-vs-burst → qualifying-deployments →
operating-infrastructure → commitment-question → back to b200-vs-b300).

### 1. ~~Add Schema.org Structured Data to Homepage~~ ✅

Shipped 2026-10-13: `Organization`, `Product` and `WebPage` schema on `/`. `FAQPage` schema
moved with the FAQ content to `/faq` on 2026-10-17 (item 8). No `LocalBusiness` schema added
— ICE Castle isn't a storefront with a service area in that schema's sense; `Organization`
covers it. `Organization.sameAs` now carries the LinkedIn company page.

### 8. ~~Create FAQ Page~~ ✅

Shipped 2026-10-17 as `/faq`, split out of the homepage's FAQ section (same content,
same `FAQPage` schema, now with its own canonical URL). Added a plain-text crawler
version at `/faq/text` and listed it in `/llms.txt`. Nav's "FAQs" link now points to
`/faq` instead of the homepage anchor.

### 11. ~~Create NVIDIA B200 and B300 Spec Pages~~ ✅

Shipped 2026-10-17 as `/gpus/b200` and `/gpus/b300`: power draw and performance-per-watt
vs. A100/H100/H200 (and B200 for the B300), sourced from public trackers (SemiAnalysis
InferenceX, DataCrunch, Introl, Vast.ai) since NVIDIA doesn't publish a public datasheet
with per-watt figures — disclaimer flags the per-watt math as our own arithmetic, not a
measured benchmark. `TechArticle` schema, plain-text versions at `/gpus/[slug]/text`,
listed in `/llms.txt` and `sitemap.xml`.

Internal links: only the first B200/B300 mention per page is linked (homepage prose, and
one mention per blog article) — headings, GPU cards, titles and the footer legal note are
left unlinked so the copy doesn't fill up with repeated links.

---

## BACKLOG (Weekly / Monthly Work)

### 4. Write "How to Evaluate GPU Providers for AI Workloads"
**Query:** "gpu provider selection", "choose gpu infrastructure", "evaluating gpu costs"
**Page:** `/blog/evaluate-gpu-providers`
**Priority:** High (informational, awareness stage)

### 5. Improve Article: "Your GPU Bill is Part of Your Product Economics"
**Query:** "gpu cost optimization", "infrastructure cost allocation"
**Page:** `/blog/gpu-bill-product-economics`
**Priority:** Medium (already live; needs internal links and visibility boost)

### 6. Add Open Graph Images to All Blog Articles
**Query:** (visual CTR on social)
**Page:** `/blog/*`
**Priority:** High (social sharing + preview clicks)

### 7. Create "Operating vs Burst GPU Infrastructure: Cost Model"
**Query:** "baseload vs burst gpu", "reserved vs on-demand"
**Page:** `/blog/baseload-cost-comparison` (expand existing article)
**Priority:** Medium

### 9. Outreach: Guest Posts
**Targets:** Dev.to, Medium, Reddit r/MachineLearning, Hacker News (YC startup context)
**Topics:** "We cut GPU costs 50% with reserved capacity" or "How to forecast AI infrastructure costs"
**Priority:** Low (off-site, requires editorial approval)

### 10. Build Link Bait: GPU Cost Calculator (Standalone Tool)
**Query:** "how much do gpus cost", "ai inference cost calculator"
**Page:** `/calculator` (enhance existing component)
**Priority:** Low (tool-driven, good for backlinks)

---

## Status Summary

| Status | Count |
|--------|-------|
| Live | 10 articles (blog), FAQ page, 2 GPU spec pages |
| Gap (unranked queries) | 20+ keyword gaps |
| Total keywords tracked | 25 |

---

*Last updated: 2026-10-17 1:05 PM EDT*
