# Kimi K3 at 840 tokens/second: what it means for the money

vLLM's new decode path runs Kimi K3 on NVIDIA GB300 GPUs 1.3–1.9× faster than stock vLLM. The hardware is the same. The change is software only.

## Same GPUs, more output

GPU rental is billed by the hour, so getting more tokens out of each hour lowers the cost of every token.

| Setup | Speedup | Cost per token falls by |
|---|---|---|
| 8 GPUs, busy (batch 16–64) | 1.31–1.43× | 24–30% |
| 16 GPUs, busy (batch 16–64) | 1.62–1.71× | 38–42% |
| 16 GPUs, single user | 1.88× | 47% |

For anyone already running K3 on GB300, this is like getting extra capacity for free. You can serve the same traffic on fewer GPUs, or more traffic on the GPUs you have.

## Speed is now a product

At 400+ tokens/s per user, a coding agent finishes its loop about 1.8× sooner. Agents chain dozens of model calls, so the saved time adds up. Faster output means:
- Developers wait less, so they run more tasks per day
- More agent runs fit inside a fixed time budget
- Providers can charge more for a "fast tier"

## The catch: fast for one user is still expensive

The 842 tokens/s headline is one user on 16 GPUs. That is a lot of hardware serving a single person. It only pays off at premium prices. The cheapest cost per token still comes from running many users at once. The interesting change is that the gap between fast and cheap is smaller than it was.

## $ per million output tokens (@$5/hr/GPU)

| Setup | Stock vLLM | Optimized | Savings |
|---|---|---|---|
| 8 GPUs, 1 user | $90.92 | $57.47 | 37% |
| 8 GPUs, batch 16 | $12.47 | $8.72 | 30% |
| 8 GPUs, batch 64 | $6.13 | $4.68 | 24% |
| 16 GPUs, 1 user | $162.90 | $86.67 | 47% |
| 16 GPUs, batch 16 | $21.61 | $12.64 | 41% |
| 16 GPUs, batch 64 | $9.98 | $6.16 | 38% |
| 16 GPUs, 1 user + speculative decoding | $45.54 | $26.39 | 42% |

**Reading it:**
- Best savings happen serving few users at once — ironic, since that's also the most expensive way to run it. Busy batches (16–64) still save 24–41%, and that's the mode that actually matters for margin.
- Speculative decoding (the 842 tok/s row) buys the biggest single jump — 42% off — but assumes a fixed accept rate the post doesn't guarantee under real traffic.
- At batch 64, 16 GPUs beats 8 GPUs on raw $/token ($6.16 vs $4.68 — actually 8 GPUs is cheaper here, since you're not paying for idle NVLink capacity). More GPUs isn't automatically cheaper per token; it buys lower latency per user, not lower cost per token, once you're already batching well.

## Read the fine print

- **The headline uses a lab setting.** The 842 figure assumes a fixed speculative-decoding hit rate, so real traffic may be lower.
- **Generation speed only.** Time spent reading the prompt isn't counted, and long-prompt workloads will see smaller gains.
- **GB300 only.** No results for H100, H200 or B200.
- **The agent comparison isn't like-for-like.** The 1.8× figure compares 16 GPUs against an earlier 8-GPU result.

## Bottom line

For GB300 operators, this is close to free money: one software update, and cost per token drops 25–40% at normal load. For buyers, it means a fast tier for agent workloads at a price that still adds up.

---

**Source:** [vLLM: Kimi K3 Megakernel](https://vllm.ai/blog/2026-10-16-kimi-k3-megakernel)
