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

---

## SHIP TODAY (Setup Day - 2026-10-13)

### 1. Add Schema.org Structured Data to Homepage ⭐⭐⭐

**Query:** GPU pricing, NVIDIA capacity, AI infrastructure (awareness + discovery)
**Page:** `/`
**Work:** 1–2 hours
**Impact:** AI assistants (ChatGPT, Claude, Perplexity) index and cite the product. Rich snippets in Google SERP for "GPU pricing" and "AI infrastructure."

**What to add:**
- `Organization` schema: name, logo, description, contact
- `LocalBusiness` schema: areas served, pricing model
- `Product` schema: name (B200/B300), description, pricing (indicative), aggregateRating (placeholder)
- `FAQSchema` for "What is ICE Castle?", "How much does it cost?", "Who should use it?"

**Success:** AI answers mention ICE Castle by name + include the $5/GPU-hour claim with attribution. Google SERP shows rich snippet.

---

### 3. Create "B200/B300 GPU Pricing & Specs" Guide ⭐⭐⭐

**Query:** "nvidia b200 pricing", "b200 vs b300", "b200 specifications"
**Page:** `/blog/b200-b300-guide` or `/gpus` (subpage)
**Work:** 1.5–2 hours
**Impact:** Ranks for 5+ product-specific queries (180 monthly searches for "nvidia b200 pricing" alone).

**What to write:**
- B200 vs B300 specs comparison (performance, memory, interconnect, use cases)
- Price per GPU per hour (illustrative ~$5 vs typical ~$10 on-demand)
- Which model for which workload (inference vs training vs multimodal)
- Link to quote form for "check pricing" CTA

**Format:** Blog post (fits editorial style).

**Success:** Ranks in top 10 for "nvidia b200 pricing" and "b300 specifications." 25+ monthly visitors.

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

### 8. Create FAQ Page
**Query:** "how does icecastle pricing work", "what are qualifying deployments", "gpu commitment contract terms"
**Page:** `/faq`
**Priority:** Medium (quick wins for long-tail queries)

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
| Live | 5 articles (blog) |
| Planned (today) | 3 pages |
| Gap (unranked queries) | 20+ keyword gaps |
| Total keywords tracked | 25 |

---

*Last updated: 2026-10-13 10:05 PM EDT*
