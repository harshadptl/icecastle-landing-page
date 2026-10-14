# ICE Castle — SEO Context

## Product

**ICE Castle** is a managed NVIDIA B200/B300 GPU capacity provider for sustained AI workloads.

- **What it does:** Offers reserved GPU capacity on long-term commitments (12–24 months) with an indicative ~$5/GPU-hour target rate for qualifying deployments.
- **Who buys:** AI teams with $50K+ monthly GPU spend and a predictable 24/7 baseline (inference, training, fine-tuning, distillation, multimodal workloads).
- **Why it matters:** On-demand GPU rates run ~$10/GPU-hour; a committed $5 rate cuts hourly cost 50% when fully utilized, and eliminates provisioning risk for baseline capacity.

**Source:** app/page.tsx (hero, economics section), app/layout.tsx (metadata).

## Pricing

- **Target rate:** ~$5/GPU-hour on 12–24-month commitments (indicative, deployment-specific).
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

## Known Issues

- Untracked `env` file in repo root (contains secrets per earlier observation).
- Blog title was "Blog" (vague); fixed to "GPU Pricing & Infrastructure Blog" (commit 0b0bad2).
- Article titles are 50-66 chars (over ideal 40-55 range) but not critical.
- No structured data (schema.org) on home page (e.g., LocalBusiness, FAQSchema).
- No open graph images on blog articles.
- No sitemap.xml or robots.txt (Next.js defaults apply).

## Next Steps

1. Build keyword map: 50+ target queries (awareness, consideration, evaluation stages).
2. Crawl site for health: broken links, canonicals, indexing, mobile, speed.
3. Backlog: 3–5 high-ROI fixes to ship in first run (e.g., structured data, comparison pages, alt landing pages).

---
*Setup complete: 2026-10-13 10:03 PM EDT*
