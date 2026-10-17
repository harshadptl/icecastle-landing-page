# ICE Castle — SEO Context

## Product

**ICE Castle** is a managed NVIDIA B200/B300 GPU capacity provider for sustained AI workloads.

- **What it does:** Offers reserved GPU capacity on 36-month minimum commitments with an indicative ~$5/GPU-hour target rate for qualifying deployments, plus GPU server colocation (Texas, Ohio, Virginia, Ontario, Alberta).
- **Who buys:** AI teams with $50K+ monthly GPU spend and a predictable 24/7 baseline (inference, training, fine-tuning, distillation, multimodal workloads).
- **Why it matters:** On-demand GPU rates run ~$10/GPU-hour; a committed $5 rate cuts hourly cost 50% when fully utilized, and eliminates provisioning risk for baseline capacity. The breakeven vs. paying per token to an open-model inference provider lands around 30% utilization — see `/blog/gpu-lease-breakeven-30-percent`.

**Source:** app/page.tsx (hero, economics section), app/layout.tsx (metadata).

## Pricing

- **Target rate:** ~$5/GPU-hour on 36-month minimum commitments (indicative, deployment-specific).
- **Typical on-demand comparison:** ~$10/GPU-hour with on-demand cloud.
- **Illustrative savings:** 41% spend reduction at 85% on-demand utilization.

**Note:** Pricing is not published on the site. Buyers submit a quote form (`#quote`).

**Source:** app/page.tsx sections "Economics" and "Available capacity".

## Use Cases (from homepage)

1. **LLM Inference** — Production inference with predictable cost.
2. **Video Generation** — High-volume video generation cost.
3. **Audio & Multimodal AI** — Dedicated sustained workloads.
4. **Fine-Tuning & Distillation** — Recurring ML ops.
5. **Model Training** — Training capacity without on-demand risk.

**Source:** app/page.tsx section "Buyer fit".

## Competitors (Research needed)

**Direct competitors** (managed GPU capacity on long-term commitments):
- CoreWeave (enterprise GPU infrastructure)
- Lambda Labs (on-demand + reserved capacity)
- Crusoe Energy (AI infrastructure)
- Salad Technologies (distributed GPU network)

**Indirect competitors** (cloud GPU providers):
- AWS EC2 instances (G4, G5, P3, P5 families) + Savings Plans
- Google Cloud TPU / A100 + Commitments
- Azure AI Compute (Standard_ND96asr_v4, etc.)
- RunPod (spot + on-demand)
- Paperspace / Gradient
- Vast.ai (decentralized)

**Buyers also search for:**
- "GPU capacity" vs cloud
- "Reserved GPU" vs on-demand
- Alternatives to on-demand cloud (spot, reserved, dedicated)
- "GPU leasing" (long-term)
- "AI infrastructure" solutions

**Source:** Inferred from product positioning. Needs verification with web search + Google Search Console.

## Buyer Journey Stages

1. **Awareness:** AI teams realize GPU costs are out of control; search "how to reduce GPU costs" or "GPU pricing alternatives".
2. **Consideration:** Research reserved capacity options; search "reserved GPU capacity" or "GPU lease long-term".
3. **Evaluation:** Compare ICE Castle vs CoreWeave vs AWS Savings Plans; search "CoreWeave vs AWS" or company name + "vs".
4. **Decision:** Fill quote form; call sales.

## Site structure (as of 2026-10-17)

- `/` — homepage. `Organization` (with LinkedIn `sameAs`), `Product`, `WebPage` schema.
- `/faq` — standalone FAQ page (split out of the homepage). `FAQPage` schema. Plain-text crawler version at `/faq/text`.
- `/gpus/b200`, `/gpus/b300` — GPU spec/efficiency pages vs. A100/H100/H200 (and vs. each other for B300). `TechArticle` schema. Plain-text versions at `/gpus/[slug]/text`. Linked from homepage prose and the first B200/B300 mention per blog article — not from every mention.
- `/blog` + 10 articles — newest-first array order in `lib/articles.tsx` drives display order. Each has a plain-text version at `/blog/[slug]/text`.
- `/llms.txt` — discovery endpoint listing Home, FAQ, GPU pages, and all articles in plain text.
- `/sitemap.xml`, `/robots.txt` — present, with explicit `Allow` rules for 13+ AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.).

## Known Issues

- Untracked `env` file in repo root (contains secrets per earlier observation).
- Article titles are 50-66 chars (over ideal 40-55 range) but not critical.
- No open graph images on blog articles (backlog item 6, not shipped).
- `organizationSchema.sameAs` has one entry (LinkedIn); no Twitter/X or other profiles yet.

## Next Steps

1. Build keyword map: 50+ target queries (awareness, consideration, evaluation stages).
2. Crawl site for health: broken links, canonicals, indexing, mobile, speed.
3. Open Graph images for blog articles (backlog item 6).

---
*Last updated: 2026-10-17 1:05 PM EDT*
