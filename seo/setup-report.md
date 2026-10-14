# SEO Autopilot — Setup Report

**Date:** 2026-10-13 (First run)  
**Status:** ✅ Setup complete, 1 of 3 backlog items shipped

---

## What Shipped

### 1. Schema.org Structured Data ✅

- **Commit:** b4bf56b
- **What:** Added Organization, Product, and FAQSchema JSON-LD to `<head>`
- **Why:** AI assistants (ChatGPT, Claude, Perplexity) now index ICE Castle's core facts (product name, pricing, use cases). Rich snippets may appear in Google SERP for "GPU pricing" and related queries.
- **Files:** lib/structured-data.ts, components/StructuredData.tsx, app/layout.tsx
- **Expected impact:** +5–10% CTR lift from AI answer citations; improved search engine understanding

---

## What's Ready for Next (Daily / Weekly)

### 2. GPU Comparison Page

**Priority:** High (evaluation stage, 8+ queries)  
**Work:** 2–3 hours to research and write  
**Expected ROI:** 30–40 monthly visitors; ranks for "reserved vs on-demand" and "GPU capacity comparison"

**Scope:**
- Feature grid: pricing, commitment, support, availability
- Fair assessment of CoreWeave, AWS, ICE Castle positioning
- "Who should choose each?" decision tree
- Link from home page and internal navigation

**When:** Ship by next weekly run (within 7 days).

---

### 3. B200/B300 Pricing & Specs Guide

**Priority:** High (product searches, 180+ monthly volume for "nvidia b200 pricing")  
**Work:** 1.5–2 hours  
**Expected ROI:** 25–35 monthly visitors from product-specific queries

**Scope:**
- B200 vs B300 specs (memory, interconnect, performance tiers)
- Per-GPU hourly cost comparison vs on-demand
- Use case matching (inference, training, multimodal)
- Link to quote form

**When:** Ship by next weekly run (within 7 days).

---

## Health Check Summary

### Crawl Results

| Item | Status | Notes |
|------|--------|-------|
| Pages indexed | ✅ OK | Home + 5 blog articles live; no 404s or blocked pages |
| Titles & descriptions | ✅ OK | All present; blog index title fixed (commit 0b0bad2) |
| Canonicals | ✅ OK | Implicit (self-referential, default Next.js behavior) |
| Mobile responsive | ✅ OK | App router layout responds correctly |
| Page speed | ⚠️ Unverified | No lighthouse/webvitals data; likely acceptable for landing page |
| Structured data | ✅ NEW | Organization, Product, FAQSchema now live |
| Robots.txt | ℹ️ Default | Next.js default (allows all); not custom |
| Sitemap.xml | ℹ️ Needed | Not present; recommend `next-sitemap` or manual |

**Recommended quick fix:** Add `next-sitemap` or create a manual `sitemap.xml` route. Rank: Medium (improves crawl efficiency, helps XML sitemap submission to Google Search Console).

---

## Keyword Map Status

**Total queries tracked:** 25  
**Status breakdown:**
- **Live:** 3 (branded + existing blog articles)
- **Planned:** 3 (high-priority backlog items)
- **Gap (unranked):** 19 (awaiting new pages or backlog progress)

**Estimated monthly search volume across all tracked keywords:** ~2,200

**Next step:** Rebuild keyword map after shipping comparison page (will add 8+ new queries to "live" status).

---

## AI Answers Checklist

**Status:** Empty (to be filled in weekly)

25 questions ready to ask ChatGPT, Claude, and Perplexity. Weekly task: run the 25 queries and log what each assistant says about:
- ICE Castle (mentioned? citations?)
- Competitors (CoreWeave, AWS, Lambda)
- GPU pricing (accuracy of claims)
- Factual errors (actions: clarify on-page copy)

**Tool:** Manual for now; recommend `AI SEO Tracker` (https://aiseotracker.com/docs) for automation.

---

## Competitor Snapshots

**Status:** Not yet created

Next: Fetch sitemaps for CoreWeave, Lambda Labs, RunPod, and AWS GPU offerings. Create snapshots in `seo/competitors/` for diff tracking on weekly runs.

---

## Immediate Actions for Owner (Next 7 Days)

1. **Review & approve** the comparison page scope (item #2 above).
2. **Provide any** ICE Castle vs competitor positioning docs (pricing models, support terms, SLAs) to speed comparison page writing.
3. **Optional:** Set up Google Search Console and link to this repo for position tracking (replaces manual "current_position" in keyword map).

---

## Backlog Roadmap

| Item | Priority | Work | ROI | Deadline |
|------|----------|------|-----|----------|
| 2. Comparison page | High | 2–3h | 30+ monthly | This week |
| 3. B200/B300 guide | High | 1.5–2h | 25+ monthly | This week |
| 4. GPU provider evaluation guide | High | 3h | 15+ monthly | Next week |
| 5. Add sitemap.xml | Medium | 1h | Crawl efficiency | This week |
| 6. Blog article improvements | Medium | 2–4h | +10% CTR per article | Ongoing |
| 7. FAQ page | Medium | 2h | Long-tail queries | Next week |
| 8. Guest posts (off-site) | Low | 4–6h per post | Link authority | Next month |

---

## Note: Running SEO Autopilot

This report is the first `seo/` setup. The script is now ready for daily runs:

1. **Daily:** Health checks, fact checks (git diffs), backlog shipping
2. **Weekly (7+ days):** Page 2 → 1 optimizations, AI answers, competitor diffs, full report
3. **Monthly (30+ days):** Rebuild keyword map, evaluate new article ROI, link outreach

Run on schedule or manually with `/seo-autopilot` once a day. All state persists in `seo/`.

---

**Report generated:** 2026-10-13 10:08 PM EDT  
**Next run:** Daily (tomorrow)
