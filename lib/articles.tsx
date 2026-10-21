import type { ReactNode } from "react";
import Link from "next/link";

export type Article = {
  slug: string;
  index: string;
  title: string;
  category: string;
  /** Kicker shown on the blog index card */
  kicker: string;
  excerpt: string;
  standfirst: string;
  date: string;
  readTime: string;
  next: string;
  disclaimer?: string;
  body: ReactNode;
};

export const articles: Article[] = [
  {
    slug: "deepinfer-reserved-b200-b300",
    index: "01",
    title: "Running DeepSeek's DeepInfer on dedicated B200/B300 GPUs: what it does, what it doesn't, and what it costs",
    category: "AI, deployed",
    kicker: "AI, deployed · 7 min read",
    excerpt: "DeepSeek open-sourced the engine behind its own production service. Paired with reserved B200/B300 capacity, it's a credible way to own the cost line of inference &mdash; with real limits worth knowing upfront.",
    standfirst: "DeepSeek open-sourced the engine behind its own production service. Paired with reserved B200/B300 capacity, it's a credible way to own the cost line of inference &mdash; with real limits worth knowing upfront.",
    date: "OCT 21, 2026",
    readTime: "7 MIN READ",
    next: "kimi-k3-faster-serving",
    disclaimer: "* GitHub star count and release details reflect DeepSeek's DeepInfer repository as checked October 20, 2026, and will have moved on by the time you read this. “SM100” maps to NVIDIA compute capability 10.0 (the B200); B300 (compute capability 10.3) is not named in DeepInfer's README as of this writing, so validate any build on your own target nodes before committing. The ~$5/GPU-hour figure is ICE Castle's target rate for qualifying 36-month commitments against a ~$10 on-demand baseline; actual pricing depends on GPU type, configuration, region and term, and the target applies only to qualifying deployments. The AWS Savings Plans figure is AWS's own published rate as of this writing, cited for context, not as a direct comparison to ICE Castle pricing.",
    body: (
      <>
      <p>Most AI teams discover the same thing about a year into production: the model isn&rsquo;t the hard part. The bill is. Inference runs every hour of every day, on-demand rates move under you, and the engine deciding how many tokens you get per GPU-hour is usually a black box you rent rather than own.</p>
      <p>That is why DeepSeek open-sourcing <a href="https://github.com/deepseek-ai/DeepInfer" rel="noopener">DeepInfer</a> &mdash; the inference framework behind its own large-scale service &mdash; is worth a careful look. Paired with GPUs you reserve rather than rent by the hour, it gives teams a credible way to own both the software and the cost line of their inference stack. It also comes with real limits, and it&rsquo;s better to know them upfront.</p>
      <h2 className="b-h"><span className="hn">01 / WHAT DEEPINFER IS</span></h2>
      <p>DeepSeek describes DeepInfer as the framework that powers its own production service at scale: a single cluster running it serves 155 trillion tokens a day, according to DeepSeek&rsquo;s <a href="https://github.com/deepseek-ai/DeepInfer/blob/main/doc/inference_deployment_qa.md" rel="noopener">deployment Q&amp;A</a>. The repository went public in October 2026 and passed 12,000 GitHub stars within three weeks.*</p>
      <p>Today it supports one model, DeepSeek-V4.1-Flash, on NVIDIA SM100 GPUs and Huawei Ascend 950 NPUs, with attention and context parallelism, MoE expert parallelism with load balancing, speculative decoding, asynchronous CPU/GPU scheduling, batch-invariant inference with deterministic sampling on NVIDIA hardware, and structured output constrained to a JSON schema, regex or grammar. Underneath, it runs on DeepSeek&rsquo;s own open kernel libraries &mdash; FlashMLA, DeepGEMM, DeepEP &mdash; with FP4 for the KV cache and MoE expert weights.</p>
      <p>It&rsquo;s just as important to know what the release leaves out. By DeepSeek&rsquo;s own description, it &ldquo;provides offline inference&rdquo; &mdash; there is no HTTP serving API, no KV cache system, no prefill/decode disaggregation and no load balancing across replicas. The <a href="https://github.com/deepseek-ai/DeepInfer#readme" rel="noopener">README</a> lists those three as required for a complete inference service and explicitly not included. Treat DeepInfer today as a strong engine for batch work and the foundation of a service, not a drop-in replacement for a hosted endpoint.</p>
      <p>On performance, read the README&rsquo;s own <a href="https://github.com/deepseek-ai/DeepInfer#performance-benchmarks" rel="noopener">prefill and decode charts</a> rather than anyone&rsquo;s summary of them &mdash; they were measured on 4 SM100 GPUs for prefill and 64 for decode, each within one scale-up domain. One figure DeepSeek does state directly: confidence-scheduled verification delivers 4&ndash;7% more throughput at the production operating point, compared with always verifying five draft tokens.</p>
      <h2 className="b-h"><span className="hn">02 / WHY DEDICATED, RESERVED BLACKWELL CAPACITY FITS</span></h2>
      <ul className="a-list">
        <li><span className="mk">01</span><span><strong>The hardware matches.</strong> SM100 is NVIDIA&rsquo;s compute capability 10.0 &mdash; the B200, per <a href="https://developer.nvidia.com/cuda-gpus" rel="noopener">NVIDIA&rsquo;s own table</a>. The B300 is a separate compute capability (10.3) and isn&rsquo;t named in DeepInfer&rsquo;s README; if you&rsquo;re planning around B300s, validate the build on your target nodes before you commit. Hopper (H100/H200) isn&rsquo;t supported, and community pull requests to add it were still open as of this writing.</span></li>
        <li><span className="mk">02</span><span><strong>The engine rewards steady load.</strong> Per-GPU throughput climbs as batches fill up in DeepInfer&rsquo;s own benchmarks. An engine that performs best when kept busy pairs naturally with capacity priced for being kept busy &mdash; reserved capacity only pays off at high utilization, because you pay for every reserved hour whether you use it or not.</span></li>
        <li><span className="mk">03</span><span><strong>The cost becomes predictable.</strong> A fixed rate for a fixed term turns inference from a variable bill into a line item finance can plan around. Cloud providers have long traded discounts for commitment &mdash; AWS advertises <a href="https://aws.amazon.com/savingsplans/compute-pricing/" rel="noopener">up to 72% off</a> on-demand EC2 rates for one- to three-year Savings Plans.*</span></li>
        <li><span className="mk">04</span><span><strong>You keep control of your data.</strong> Open weights, an open-source engine and dedicated GPUs mean prompts and outputs stay on infrastructure you control. Our <Link href="/capacity">five sites</Link> in Texas, Ohio, Virginia, Ontario and Alberta each run 100&ndash;200 GPUs under HIPAA and SOC 2.</span></li>
        <li><span className="mk">05</span><span><strong>The capacity is actually yours.</strong> Dedicated GPUs run 24/7 for production workloads &mdash; you aren&rsquo;t competing for them by the hour. Confirm tenancy, SLA and network scope in writing; our <Link href="/faq">FAQ</Link> covers the same ground.</span></li>
      </ul>
      <p>One caution on scale: DeepSeek&rsquo;s Q&amp;A puts the smallest efficient deployment at 64 GPUs of prefill plus 64 of decode, and its decode benchmark ran inside a single scale-up domain. A standard 8-GPU HGX B200 or B300 board is one <a href="https://www.nvidia.com/en-us/data-center/hgx/" rel="noopener">NVLink domain</a> of eight GPUs. On 8-GPU nodes, start with eight-way expert parallelism &mdash; the example&rsquo;s own default &mdash; and treat the Q&amp;A&rsquo;s EP8 figures as your reference, not the EP64 curve.</p>
      <h2 className="b-h"><span className="hn">03 / GETTING STARTED, WITHOUT THE RUNBOOK</span></h2>
      <p>Standing up DeepInfer today is a build-from-source job, not a package install: Linux, GCC 13 or later, Python 3.12 and CUDA 13, with DeepSeek&rsquo;s kernel libraries pulled in as git submodules. The default checkpoint, <a href="https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017" rel="noopener">DeepSeek-V4.1-Flash-1017</a>, downloads from Hugging Face on first run, or points at a local copy for locked-down networks. The <a href="https://github.com/deepseek-ai/DeepInfer/blob/main/examples/README.md" rel="noopener">examples</a> support several parallel layouts out of the box &mdash; expert, data and context parallelism &mdash; and two settings matter most for production: one enables confidence-scheduled speculative decoding, the other enables batch-invariant, reproducible output. DeepSeek also ships an <a href="https://github.com/deepseek-ai/DeepInfer/blob/main/eval/README.md" rel="noopener">evaluation harness</a> against AIME 2026, GPQA Diamond and HLE, so you can check a build against DeepSeek&rsquo;s reference scores before trusting it with real traffic.</p>
      <p>None of this is hard. It&rsquo;s just not a managed service yet &mdash; which is exactly where dedicated infrastructure, and a team that runs GPUs for a living, earns its keep.</p>
      <h2 className="b-h"><span className="hn">04 / WHERE THIS OPENS UP NEW GROUND</span></h2>
      <p><em>These are illustrative patterns, not customer stories.</em> A capable release this early creates room to move before the rest of the market catches up. Three stand out.</p>
      <ul className="a-list">
        <li><span className="mk">01</span><span><strong>Nightly batch processing.</strong> An insurer extracting fields from claims, contracts and correspondence overnight doesn&rsquo;t need a serving API &mdash; the workload is batch by nature, which is exactly what an offline engine suits. JSON-schema structured output keeps results machine-readable, and the GPUs stay busy on a predictable schedule.</span></li>
        <li><span className="mk">02</span><span><strong>Reproducible evaluation and regression testing.</strong> A product team re-running thousands of prompts every time it changes a prompt, retriever or fine-tune gets a real advantage from batch-invariant inference and deterministic sampling: a change in output reflects a change in the system, not a change in batch composition, which makes regressions far easier to trust.</span></li>
        <li><span className="mk">03</span><span><strong>A platform team building its own endpoint.</strong> A company that wants V4.1-Flash behind its own API, for data-residency reasons, can start with DeepInfer on one 8-GPU node for batch jobs while building the pieces the release leaves out &mdash; serving, KV cache storage, load balancing &mdash; then grow toward the prefill/decode layout DeepSeek describes as traffic justifies it.</span></li>
      </ul>
      <h2 className="b-h"><span className="hn">05 / WHAT IT COSTS</span></h2>
      <p>Our own <Link href="/#economics">published figures</Link> use a target rate of about $5 per GPU-hour for qualifying commitments of at least 36 months, against about $10 on-demand.* The best fit is 24/7 workloads with $50K or more in monthly GPU spend. At that rate, 32 GPUs running around the clock cost about $1.4M a year less than the same GPUs rented on-demand.</p>
      <aside className="pull-stat">
        <div className="n">~$1.4M a year</div>
        <div className="c">The reserved-vs-on-demand difference on 32 GPUs run 24/7, at our ~$5 vs. ~$10/GPU-hour figures. At 85% on-demand utilization instead of 100%, the gap narrows to about $981K &mdash; still roughly 41%.*</div>
      </aside>
      <p>All of these are illustrative figures, not quotes. Pricing depends on GPU type, node configuration, quantity, region and term, and the ~$5 target applies only to <Link href="/blog/qualifying-deployments">qualifying deployments</Link>. Commit only to the baseline you&rsquo;re sure of, and keep cloud capacity for spikes.</p>
      <p className="a-close">DeepInfer gives you DeepSeek&rsquo;s production engine for DeepSeek-V4.1-Flash: open, well documented, and tuned for Blackwell-class SM100 GPUs. It&rsquo;s offline-first, so treat it as a strong engine for steady batch work and the core of a service you&rsquo;ll build out &mdash; not a finished product. If that steady work is already costing you $50K or more a month, reserved B200 or B300 capacity is worth modelling against it. <Link href="/#quote">Request a quote</Link> for your GPU count, region and timeline, or reach the team at contactus@icecastle.si.</p>
      </>
    ),
  },
  {
    slug: "kimi-k3-faster-serving",
    index: "02",
    title: "Kimi K3 just got cheaper to serve — no new hardware required",
    category: "GPU economics",
    kicker: "GPU economics · 5 min read",
    excerpt: "A new open-source serving optimization cuts GPU-hours per token for Kimi K3 by 24–41% at production batch sizes. No new silicon, no new contract — just more tokens out of the lease you already have.",
    standfirst: "A new open-source serving optimization cuts GPU-hours per token for Kimi K3 by 24–41% at production batch sizes. No new silicon, no new contract — just more tokens out of the lease you already have.",
    date: "OCT 18, 2026",
    readTime: "5 MIN READ",
    next: "gpu-lease-breakeven-30-percent",
    disclaimer: "* Benchmark figures come from vLLM's October 16, 2026 writeup on an optimized decode path for Kimi K3, checked October 18, 2026. vLLM tested on NVIDIA GB300 rack-scale systems (8 or 16 GPUs in one NVLink domain), a different physical configuration from the standalone B300 we lease; both are Blackwell Ultra generation, but results on a leased deployment will differ and should be benchmarked against your own traffic. The single-user 842 tokens/sec figure assumes a fixed speculative-decoding acceptance rate and is a best case, not a guarantee. Dollar figures use our ~$5/GPU-hour target for qualifying 36-month commitments; your quote depends on GPU type, configuration, region and term.",
    body: (
      <>
      <p>Most of the time, a GPU lease gets cheaper per token in only one way: you fill it with more traffic. This week there was a second way. vLLM shipped a rewritten decode path for Kimi K3 that does more work per GPU-hour on the exact same chips &mdash; no new order, no new contract, just a software update.</p>
      <h2 className="b-h"><span className="hn">01 / WHAT CHANGED</span></h2>
      <p>On October 16, 2026, the vLLM project published a <a href="https://vllm.ai/blog/2026-10-16-kimi-k3-megakernel" rel="noopener">specialized decode path</a> for Kimi K3 on NVIDIA&rsquo;s Blackwell Ultra platform. The change is all software: fusing operations that used to run as separate kernels, cutting the per-layer kernel count roughly in half, and overlapping weight loading with communication instead of waiting on it. Nothing about the model changed and nothing about the hardware changed. Depending on batch size and GPU count, the same GPUs now produce 1.3&times; to 1.9&times; as many decode tokens per second.</p>
      <h2 className="b-h"><span className="hn">02 / WHY THIS MATTERS MORE WHEN YOU OWN THE GPUs</span></h2>
      <p>If you buy tokens from a hosted provider, a speedup like this is the provider&rsquo;s business, not yours &mdash; whether it reaches your invoice as a lower price is their call. If you lease the GPUs yourself, the logic flips. The lease is a fixed bill, set by <Link href="/blog/gpu-lease-breakeven-30-percent">the arithmetic we&rsquo;ve written about before</Link>: the same amount whether the GPUs serve one request or a billion. A serving-stack improvement doesn&rsquo;t touch that bill. It just means every GPU-hour you&rsquo;re already paying for does more work. That is the whole case for owning the stack instead of renting the output: when inference software gets better, the gains land on your side of the ledger automatically.</p>
      <h2 className="b-h"><span className="hn">03 / THE NUMBERS, AT OUR $5/GPU-HOUR TARGET</span></h2>
      <p>Take a 16-GPU deployment running at a realistic production batch size, somewhere between 16 and 64 concurrent requests. At $5/GPU-hour, that lease costs the same whether it&rsquo;s serving the old decode path or the new one. What changes is the cost per million tokens it produces: roughly $21.61 falls to $12.64 at batch 16, and $9.98 falls to $6.16 at batch 64 &mdash; a 38&ndash;41% drop with the lease bill unchanged.</p>
      <aside className="pull-stat">
        <div className="n">24&ndash;41% more tokens / GPU-hour</div>
        <div className="c">At production batch sizes (16&ndash;64 concurrent requests), the same leased GPUs and the same $5/GPU-hour rate now clear more tokens for the same bill &mdash; pure margin, not new traffic.*</div>
      </aside>
      <p>The single-user number is more dramatic &mdash; vLLM reports over 840 tokens per second for one request on 16 GPUs, up from about 490 &mdash; but that configuration is the least efficient use of 16 GPUs regardless of the speedup. The number that moves your bill is the production-batch one.</p>
      <h2 className="b-h"><span className="hn">04 / THE CATCH</span></h2>
      <p>Two honest caveats before you resize anything. First, vLLM benchmarked this on GB300 rack-scale systems, not the standalone B300 we lease &mdash; same Blackwell Ultra generation, different physical configuration, so treat these figures as directional until you benchmark your own traffic. Second, the headline single-user figure assumes a fixed speculative-decoding acceptance rate; real traffic with real prompts will land somewhere else. Decode speed also isn&rsquo;t the whole bill &mdash; prompt processing isn&rsquo;t covered by these figures and won&rsquo;t move as much.</p>
      <h2 className="b-h"><span className="hn">05 / WHAT TO DO WITH THIS</span></h2>
      <ul className="a-list">
        <li><span className="mk">01</span><span><strong>Already leasing?</strong> Update your serving stack and benchmark it against your own traffic before you order more GPUs for growth you may already have headroom for.</span></li>
        <li><span className="mk">02</span><span><strong>Still deciding whether to lease?</strong> Add it to <Link href="/blog/gpu-lease-breakeven-30-percent">the 30% breakeven math</Link>: the leased side of that comparison just got cheaper, which only pulls the breakeven utilization down further. That is the direction serving software keeps moving it.</span></li>
      </ul>
      <p>If you&rsquo;re running <Link href="/blog/kimi-k3-executive-assistant">Kimi K3 as a leadership assistant</Link> or any other large open model on <Link href="/gpus/b300">B300</Link> capacity, <Link href="/#quote">request a quote</Link> and tell us your current traffic. We&rsquo;ll tell you honestly whether a software update covers your next six months of growth, or whether you actually need more GPUs.</p>
      <p className="a-close">Hardware is the expensive, slow-moving part of this stack. Software is the part that keeps getting better underneath you, for free, as long as someone keeps you current.</p>
      </>
    ),
  },
  {
    slug: "gpu-lease-breakeven-30-percent",
    index: "03",
    title: "The 30% rule: when leasing GPUs beats buying tokens from open-model inference providers",
    category: "GPU economics",
    kicker: "GPU economics · 6 min read",
    excerpt: "Paying per token for an open-weight model is the right way to start. But once your own GPUs would be busy about 30% of the time, a financed lease costs the same — and every hour of use above that line is close to free.",
    standfirst: "Paying per token for an open-weight model is the right way to start. But once your own GPUs would be busy about 30% of the time, a financed lease costs the same — and every hour of use above that line is close to free.",
    date: "OCT 17, 2026",
    readTime: "6 MIN READ",
    next: "kimi-k3-executive-assistant",
    disclaimer: "* Breakeven figures are illustrative, not a quote or a guarantee. Assumptions: 16 GPUs (two 8×B200 nodes) at our ~$5/GPU-hour target for qualifying 36-month commitments, running 730 hours a month ($58,400), plus $5,000/month support and a $20,000 one-time setup amortized over 36 months — about $63,960 a month in total. Throughput assumes ~4,200 blended (input + output) tokens per second per GPU for a large open-weight mixture-of-experts model served at FP8 with production batching, or ~177 billion tokens a month across 16 GPUs at full load. Hosted price assumes a blended $1.20 per million tokens; open-model provider prices vary by model, provider, input/output mix and date, so check current price lists. Real throughput depends on model, precision, context length, batch size and latency targets. Your quote depends on GPU type, configuration, region and term.",
    body: (
      <>
      <p>Almost every company that runs AI on open-weight models starts the same way: an API key from an inference provider and a bill that grows with usage. That is the right way to start. You pay only for what you use, you don&rsquo;t have to guess at demand, and nobody has to think about hardware. The question worth asking a few months in isn&rsquo;t whether that was a good decision. It&rsquo;s when it stops being one. Our answer, with the arithmetic shown: at roughly 30% utilization.</p>
      <h2 className="b-h"><span className="hn">01 / TWO WAYS TO PAY FOR THE SAME MODEL</span></h2>
      <p>When you buy tokens from a provider serving an open model &mdash; Kimi, GLM, DeepSeek, Qwen, Llama &mdash; you pay a meter. Twice the usage, twice the bill. When you lease GPUs and run the same open weights yourself, you pay a fixed monthly amount for the capacity, whether it serves one request or a billion. Leasing is a form of financing: instead of finding millions of dollars in capital to buy servers, you spread the cost over a 36-month term as a predictable operating expense.</p>
      <p>Neither model is better in the abstract. A meter is cheaper when usage is low or unpredictable. A fixed bill is cheaper when usage is steady and high. The useful number is the point where they cross.</p>
      <h2 className="b-h"><span className="hn">02 / THE ARITHMETIC</span></h2>
      <p>Take a production-sized deployment: two 8&times;<Link href="/gpus/b200">B200</Link> nodes, 16 GPUs. At our ~$5/GPU-hour target for qualifying 36-month commitments, the lease runs about $58,400 a month. Add $5,000 a month for support and amortize a $20,000 setup over the term, and the all-in bill is about $63,960 a month.</p>
      <p>Now the other side. Serving a large open-weight mixture-of-experts model at FP8, with the batching any production inference stack uses, those 16 GPUs can process on the order of 177 billion tokens a month if they never rest. Bought from a provider at a blended $1.20 per million tokens, that same volume would cost roughly $212,000.</p>
      <aside className="pull-stat">
        <div className="n">~30% utilization</div>
        <div className="c">$63,960 a month all-in &divide; ~$212,000 of equivalent hosted tokens at full load. Below that line, pay per token. Above it, the lease is cheaper.*</div>
      </aside>
      <p>Divide one by the other and the breakeven lands right around 30%. If your workload would keep the GPUs busy about a third of the time &mdash; roughly 53 billion tokens a month in this example &mdash; the lease and the meter cost the same. At 60% utilization, the lease is about half the price of buying tokens. At 90%, it&rsquo;s about a third.</p>
      <h2 className="b-h"><span className="hn">03 / WHY 30% IS A LOWER BAR THAN IT SOUNDS</span></h2>
      <p>Thirty percent sounds like a lot of traffic until you look at what a real AI product does with its day. A customer-support assistant answers questions through business hours in three time zones. A document pipeline processes overnight batches. An internal assistant drafts, summarizes and searches all day for a few hundred employees. Agentic workflows are the biggest change: one task can quietly make dozens of model calls, and token volume grows far faster than the number of people using it.</p>
      <p>Two more things tilt the math further toward leasing. First, once the hardware is yours for the term, idle hours are free to fill: run evaluations, re-index documents, or batch next week&rsquo;s summaries at 3 a.m. at no extra cost. Second, owning the capacity means no rate limits, no per-token surprise when a new feature takes off, and a bill your CFO can put in the plan three years out. That predictability is worth something even before you reach 30%.</p>
      <h2 className="b-h"><span className="hn">04 / WHEN TO KEEP PAYING PER TOKEN</span></h2>
      <p>We&rsquo;d rather tell you this up front than after you sign. Stay on a provider&rsquo;s meter if:</p>
      <ul className="a-list">
        <li><span className="mk">01</span><span><strong>Your volume is small or spiky:</strong> a pilot, a seasonal product, or a feature you haven&rsquo;t found demand for yet. Paying for idle GPUs is the most expensive way to learn.</span></li>
        <li><span className="mk">02</span><span><strong>You switch models every month:</strong> trying five models in a quarter is easier with an API key. Commit once you know which model your product runs on.</span></li>
        <li><span className="mk">03</span><span><strong>You can&rsquo;t defend the 36-month forecast:</strong> if demand three years out is a guess, keep the flexibility. Our post on <Link href="/blog/commitment-question">the commitment question</Link> walks through that decision.</span></li>
      </ul>
      <p>Many teams land on a mix: lease enough capacity for the steady base of traffic and send the occasional spike to a provider. That is the <Link href="/blog/baseload-vs-burst">baseload-versus-burst</Link> split, and it usually beats either extreme.</p>
      <h2 className="b-h"><span className="hn">05 / HOW TO RUN THE NUMBER FOR YOUR TEAM</span></h2>
      <p>You don&rsquo;t need a model of the future, just last month&rsquo;s invoice. Take the tokens you bought from your inference provider, divide by the roughly 177 billion a month a 16-GPU deployment can serve, and you have your utilization today. Divide your monthly provider bill by about $64,000 and you have the same answer in dollars. If either number is near 30% and growing, it&rsquo;s time to talk. When you <Link href="/#quote">request a quote</Link>, send us your monthly token volume, the model you run, and your latency targets, and we&rsquo;ll size it honestly &mdash; including telling you if one node is enough, or if the meter is still the better deal.</p>
      <p className="a-close">Paying per token is how you find out what your AI product needs. Leasing is how you pay for it once you know. The crossover comes sooner than most teams expect: about 30% of the way to full.</p>
      </>
    ),
  },
  {
    slug: "kimi-k3-executive-assistant",
    index: "04",
    title: "Kimi K3 and an agent harness: an AI chief of staff for your leadership team",
    category: "AI, deployed",
    kicker: "AI, deployed · 6 min read",
    excerpt: "Moonshot’s open-weight Kimi K3 is the brain. An agent harness is what turns it into an assistant that drafts memos, triages a calendar, and knows which actions need a human’s yes first — all on hardware your company controls.",
    standfirst: "Moonshot’s open-weight Kimi K3 is the brain. An agent harness is what turns it into an assistant that drafts memos, triages a calendar, and knows which actions need a human’s yes first — all on hardware your company controls.",
    date: "OCT 16, 2026",
    readTime: "6 MIN READ",
    next: "glm-legal-private-law-firm",
    disclaimer: "* Kimi K3 details come from Moonshot AI’s July 2026 open-weight release, its technical report, and independent coverage (Yicai Global, DataCamp, Artificial Analysis), checked October 16, 2026. Moonshot has not published an official active-parameter count; the 104B-active-of-2.8T and 16-of-896-expert figures are independent estimates, not confirmed specs. The agent-harness definition follows Google Cloud’s August 20, 2026 explainer. Cost figures are illustrative: 16 GPUs at our ~$5/GPU-hour target for qualifying 36-month commitments, running 730 hours a month, plus a $20,000 one-time setup and $5,000/month support, split across a 50-person leadership team. Your quote depends on GPU type, configuration, region and term.",
    body: (
      <>
      <p>An open-weight model is just a brain in a jar until something gives it hands. Moonshot AI&rsquo;s new Kimi K3 is the biggest open brain released so far. An agent harness &mdash; the software layer that lets a model read a calendar, pull a file, draft a reply, and know which of those it isn&rsquo;t allowed to do alone &mdash; is what turns it into an assistant your leadership team can actually use. Both halves can run on hardware you control.</p>
      <h2 className="b-h"><span className="hn">01 / WHAT KIMI K3 IS</span></h2>
      <p>On July 27, 2026, Moonshot AI published the full weights for Kimi K3 on Hugging Face, alongside a technical report and three training-infrastructure tools (MoonEP, FlashKDA, AgentEnv). At 2.8 trillion total parameters it is, by Moonshot&rsquo;s account, the largest open-weight model released to date, under a modified MIT license that permits commercial use, fine-tuning and local deployment. It is a mixture-of-experts model with a one-million-token context window and native image understanding, and it is also available hosted through Kimi Code, the Kimi app and Kimi API &mdash; but the open weights mean you don&rsquo;t have to use any of those.</p>
      <aside className="pull-stat">
        <div className="n">2.8T params, 1 license</div>
        <div className="c">Kimi K3 ships under a modified MIT license that permits commercial use, fine-tuning and self-hosting &mdash; the open weights, not a hosted API, are what make a private deployment possible.*</div>
      </aside>
      <p>Moonshot&rsquo;s own benchmarks put K3 ahead of every other open model and most closed ones. Independent analysis is more measured: Artificial Analysis places it around the level of Claude Opus 4.8 and GPT-5.5, behind the newest closed frontier models. That is still a remarkable result for an open model &mdash; and more than enough brain for the work most executives actually delegate.</p>
      <h2 className="b-h"><span className="hn">02 / THE MODEL IS NOT THE ASSISTANT</span></h2>
      <p>A raw model answers questions. An assistant reads your calendar, drafts the reply, checks a number against last quarter&rsquo;s board deck, and asks before it sends anything external. The layer that adds those abilities is what Google Cloud calls an agent harness: software that surrounds a model and gives it tool access, memory across sessions, multi-step execution, and &mdash; critically &mdash; permission checks before it acts. The harness is also where you draw the line between what an assistant can do on its own and what it has to ask a human for first.</p>
      <p>This matters because harness and model are two separate decisions. Point an open harness &mdash; Google&rsquo;s Agent2Agent protocol, LangGraph, CrewAI, or one your team builds &mdash; at an OpenAI-compatible endpoint you run yourself, and you can swap Kimi K3 for whatever model leads next quarter without touching the permission logic, the tool wiring, or the audit trail you already built. That is the real advantage of open weights: not just cost, but not being locked to one vendor&rsquo;s model and one vendor&rsquo;s agent platform at the same time.</p>
      <h2 className="b-h"><span className="hn">03 / WHAT IT TAKES TO HOST IT</span></h2>
      <p>Kimi K3&rsquo;s size is the headline, and it is also the sizing problem. At FP8 &mdash; the precision most providers use to serve a model this large in production &mdash; the weights take roughly 2.8TB of memory. A single 8&times;<Link href="/gpus/b200">B200</Link> node has about 1.5TB of HBM, so two nodes comfortably hold the full set of experts with headroom for the key-value cache a one-million-token context window needs. Run it at full FP16 instead and that doubles to roughly 5.6TB, which pushes you to four nodes. Mixture-of-experts routing means the model only computes with a fraction of its parameters per token &mdash; independent estimates put that at around 104B active parameters across 16 of 896 experts &mdash; but every expert still has to sit in memory somewhere, because any token can route to any of them.</p>
      <aside className="pull-stat">
        <div className="n">2.8TB (FP8) / 5.6TB (FP16)</div>
        <div className="c">Memory Kimi K3&rsquo;s weights need at each precision. Two 8&times;B200 nodes cover the FP8 deployment; four cover full precision.*</div>
      </aside>
      <p>If your team is leaning on the full one-million-token context for things like multi-year contract review or a decade of board minutes, read <Link href="/blog/b200-vs-b300">when the B300 is worth the upgrade</Link> before you commit to a node count.</p>
      <h2 className="b-h"><span className="hn">04 / WHAT IT COSTS FOR A LEADERSHIP TEAM</span></h2>
      <p>Take a two-node FP8 deployment &mdash; 16 GPUs &mdash; serving a 50-person leadership team: the CEO&rsquo;s staff, function heads, and the people who prep board materials. The lease on 16 GPUs at our ~$5/GPU-hour target for qualifying 36-month commitments runs about $58,400 a month. Add a flat $5,000 for support and amortize a $20,000 setup fee (model serving, SSO, the tool integrations your harness needs) over the term, and the bill lands around $63,960 a month.</p>
      <aside className="pull-stat">
        <div className="n">~$1,280 / person / month</div>
        <div className="c">$58,400 GPU lease + $5,000 support + amortized setup, spread across a 50-person leadership team. Half as many seats as our GLM-Legal example sharing the same 16 GPUs roughly doubles the per-seat cost.*</div>
      </aside>
      <p>That per-seat number is higher than it would be for a larger group sharing the same two nodes &mdash; the <Link href="/blog/baseload-vs-burst">baseload economics</Link> are the same whether 50 people use it or 200, only the denominator changes. The number that matters is usage, not seats: a model running on your own nodes has no per-token meter, so an executive assistant drafting board materials at midnight before a filing deadline costs the same as one that sits idle most of the week. For a leadership team, the question isn&rsquo;t whether 50 people can justify two GPU nodes on a seat-by-seat basis &mdash; it&rsquo;s whether faster board prep, cleaner diligence memos, and fewer hours spent hunting for a number in last year&rsquo;s deck are worth it. For most companies that already pay this group&rsquo;s salaries, the answer comes quickly.</p>
      <h2 className="b-h"><span className="hn">05 / HOW TO GET STARTED</span></h2>
      <p>Start with two or three workflows where the harness&rsquo;s permission checks do real work: calendar and inbox triage that drafts but never sends, meeting-prep briefs that pull from your CRM and prior board decks, and financial-model sanity checks that flag a number instead of changing one. Keep a human approving anything that leaves the building &mdash; an email, a filing, a wire instruction &mdash; and let the harness enforce that boundary instead of trusting the model to remember it. Executive communications, cap tables and HR matters are exactly the material most companies don&rsquo;t want flowing through a third-party agent platform&rsquo;s logs; running the model and the harness on infrastructure you control is what keeps that material inside your own boundary. When you <Link href="/#quote">request a quote</Link>, tell us your headcount, context-length needs and which tools your harness has to reach, and we&rsquo;ll size the deployment honestly &mdash; including telling you if two nodes is overkill.</p>
      <p className="a-close">The model is the part everyone talks about. The harness and the hardware are the parts that decide whether your leadership team&rsquo;s actual work &mdash; and its actual secrets &mdash; stay on infrastructure you control.</p>
      </>
    ),
  },
  {
    slug: "glm-legal-private-law-firm",
    index: "05",
    title: "GLM-Legal on private GPUs: a 100-person law firm plan",
    category: "AI, deployed",
    kicker: "AI, deployed · 5 min read",
    excerpt: "Z.ai's new legal model is a real step forward. Here's how a 100-person firm can run frontier-class legal AI on two private B200 nodes, at a fixed monthly cost.",
    standfirst: "Z.ai's new legal model is a real step forward. Here's how a 100-person firm can run frontier-class legal AI on two private B200 nodes, at a fixed monthly cost.",
    date: "OCT 14, 2026",
    readTime: "5 MIN READ",
    next: "b200-vs-b300",
    disclaimer: "* GLM-Legal details come from Z.ai's October 12, 2026 announcement and independent coverage (Vals AI, AlphaSignal, eesel), checked October 14, 2026. As of that date GLM-Legal was a gated API beta with no published weights, license, or on-premises option; the open base model, GLM-5.3-Flash, is MIT-licensed. Cost figures are illustrative: 16 GPUs at our ~$5/GPU-hour target for qualifying 36-month commitments, running 730 hours a month, plus a $20,000 one-time setup and $5,000/month support. Your quote depends on GPU type, configuration, region and term.",
    body: (
      <>
      <p>A law firm can now run frontier-class legal AI entirely on hardware it controls. Two 8&times;<Link href="/gpus/b200">B200</Link> nodes host the model, client documents never leave your environment, and the bill is a fixed number you know three years ahead. Z.ai&rsquo;s new GLM-Legal is the clearest sign yet of where this is going.</p>
      <h2 className="b-h"><span className="hn">01 / WHAT GLM-LEGAL IS</span></h2>
      <p>On October 12, 2026, Z.ai released <a href="https://z.ai/blog/glm-legal" rel="noopener">GLM-Legal</a>, a model trained for the work lawyers actually do: contract review, evidence analysis, and cross-border compliance research. Z.ai built it on GLM-5.3-Flash, a mixture-of-experts model with 320B total parameters (18B active per token) and a 1M-token context window. Z.ai continued its training on legal material, then added reinforcement learning. Z.ai&rsquo;s demos show it marking up a Word contract with tracked changes, building a cited timeline across 40 documents, and drafting a privacy-compliance plan covering three countries.</p>
      <aside className="pull-stat">
        <div className="n">6.7% &rarr; 19.2%</div>
        <div className="c">Score on Harvey&rsquo;s Legal Agent Benchmark, base model vs. GLM-Legal. Vals AI ranked it 7th of 79 models on that benchmark and 14th of 150 on LegalBench.*</div>
      </aside>
      <p>Tripling an agentic legal score is real progress, and it&rsquo;s fair to be excited about it. Read it with perspective, though. Even the best models finish only a minority of these long, multi-step tasks without help. Vals also measured a small drop on Legal Research Bench against the base model (41.83% vs. 45.19%). This is a capable associate&rsquo;s first draft, not a partner&rsquo;s sign-off, and it gives your lawyers more time for the work only they can do.</p>
      <h2 className="b-h"><span className="hn">02 / WHY PRIVATE MATTERS MORE FOR LAW</span></h2>
      <p>Privilege, confidentiality and client consent make sending matter files to a shared public API a hard conversation for most firms. When the model runs on dedicated nodes inside your own security boundary, that conversation gets simpler: prompts, documents, outputs and logs stay in your environment, your retention policy decides what is kept, and your audit trail shows who saw what.</p>
      <p>One honest caveat: on launch day GLM-Legal is a gated API beta, and Z.ai has not yet published weights, a license, or an on-premises option. The base model, GLM-5.3-Flash, is already open under an MIT license. So the sensible plan has two stages:</p>
      <ul className="a-list">
        <li><span className="mk">01</span><span><strong>Start private now:</strong> deploy open GLM-5.3-Flash on your own nodes, build the document pipelines, permissions and review workflows, and get your lawyers using it on real matters.</span></li>
        <li><span className="mk">02</span><span><strong>Upgrade later:</strong> apply to Z.ai as a design partner and ask about private-deployment terms for GLM-Legal. If a self-hosted version becomes available, it is built on the same base model, so it replaces the old one in the stack you already run.</span></li>
      </ul>
      <h2 className="b-h"><span className="hn">03 / WHY TWO 8&times;B200 NODES</span></h2>
      <p>At 16-bit precision, a 320B-parameter model needs roughly 640GB just for its weights. One 8&times;B200 node has about 1.5TB of HBM, so the model fits on a single node with plenty of memory left for the long contexts legal work demands: whole contracts, data rooms, deposition transcripts. Because only 18B parameters are active per token, it also responds quickly enough for many people to use at once.</p>
      <p>The second node turns a single server into a production service. It gives you failover when one node is under maintenance, room for a busy Monday morning when half the firm is drafting at once, and space to test a new model version without taking the current one offline. For 100 employees, where far fewer than 100 are prompting at any given second, two nodes is a comfortable fit. If your workloads lean on very long contexts, see <Link href="/blog/b200-vs-b300">when the B300 is worth the upgrade</Link>.</p>
      <h2 className="b-h"><span className="hn">04 / WHAT IT COSTS, IN PLAIN NUMBERS</span></h2>
      <p>The deal has three parts. A one-time $20,000 inference setup (model serving, document ingestion, single sign-on, logging). A flat $5,000 a month for support. And a 36-month lease on the 16 GPUs. At our ~$5/GPU-hour target for qualifying long-term commitments, the lease runs about $58,400 a month.</p>
      <aside className="pull-stat">
        <div className="n">~$634 / person / month</div>
        <div className="c">$58,400 GPU lease + $5,000 support, spread across 100 employees. The $20,000 setup adds about $6 per person per month over three years.*</div>
      </aside>
      <p>Over the full term that comes to about $2.3M, or roughly $64,000 a month with the setup amortized. Usage doesn&rsquo;t change that number. A model running on your own nodes has no per-token meter, so an associate summarizing 400 documents at 2 a.m. costs the same as one who never logs in. That fixed-bill logic is what <Link href="/blog/baseload-vs-burst">baseload economics</Link> is about: a firm-wide assistant that is busy all day is exactly the workload that should run on committed capacity.</p>
      <p>Is it worth it? For most firms, recovering even an hour or two of billable capacity per lawyer each month covers it. Whether your firm gets there depends on adoption, and that is a matter of workflow and training as much as hardware.</p>
      <h2 className="b-h"><span className="hn">05 / HOW TO GET STARTED</span></h2>
      <p>Pick two or three high-volume workflows to begin with: first-pass contract review, building chronologies from discovery documents, and compliance questions across jurisdictions. Define what &ldquo;good&rdquo; looks like with the partners who own those matters, and keep a lawyer reviewing every output. When you <Link href="/#quote">request a quote</Link>, tell us your headcount, document volumes and confidentiality requirements, and we&rsquo;ll size the deployment honestly. That includes telling you if one node is enough.</p>
      <p className="a-close">Legal AI is getting better fast, and private infrastructure means a firm doesn&rsquo;t have to choose between the best models and its duty of confidentiality. Two nodes, one fixed bill, and your clients&rsquo; files stay on hardware you control.</p>
      </>
    ),
  },
  {
    slug: "b200-vs-b300",
    index: "06",
    title: "B200 vs B300: which GPU fits your workload",
    category: "Hardware, explained",
    kicker: "Hardware, explained · 4 min read",
    excerpt: "Same generation, different memory ceiling. The spec gap between B200 and B300 — and which workloads actually need the upgrade.",
    standfirst: "Same generation, different memory ceiling. The spec gap between B200 and B300 — and which workloads actually need the upgrade.",
    date: "OCT 13, 2026",
    readTime: "4 MIN READ",
    next: "reserved-vs-on-demand-gpu-pricing",
    disclaimer: "* Specs are compiled from public GPU comparison trackers (DataCrunch, Civo, TechLoy, Deploybase, SemiAnalysis), not NVIDIA's own datasheets, and sources disagree on several exact figures — treat the direction (more memory, more power, more low-precision throughput on the B300) as the reliable part. Confirm exact numbers against NVIDIA's Blackwell datasheet before specifying a deployment.",
    body: (
      <>
      <p>If your workload is memory-bound &mdash; long-context reasoning, mixture-of-experts, high-concurrency production inference &mdash; the <Link href="/gpus/b300">B300</Link> is built for you. Everything else usually runs just as well, and cheaper per GPU-hour, on the B200.</p>
      <h2 className="b-h"><span className="hn">01 / THE SPEC GAP IS MOSTLY MEMORY</span></h2>
      <p>Most public trackers put the B300 (Blackwell Ultra) at roughly 288GB of HBM3e per GPU &mdash; about 50% more than the <Link href="/gpus/b200">B200</Link>&rsquo;s 192GB. That memory step-up is the one figure nearly every source agrees on; bandwidth and raw FLOPS numbers vary more by tracker. On low-precision (FP4) compute, most trackers report the B300 running 30&ndash;50% faster than the B200; FP8 throughput comparisons are less consistent across sources. Power draw follows the same direction: the B200 is usually listed around 1,000W, while B300 listings range from 1,100W to 1,400W depending on the source &mdash; so a B300 deployment generally asks for more power and cooling headroom per node.</p>
      <aside className="pull-stat">
        <div className="n">288GB vs 192GB</div>
        <div className="c">HBM3e memory per GPU, B300 vs B200 &mdash; roughly a 50% step up, per public GPU comparison trackers, October 2026.*</div>
      </aside>
      <h2 className="b-h"><span className="hn">02 / WHICH ONE FITS YOUR WORKLOAD</span></h2>
      <p>The honest answer is: most workloads don&rsquo;t need the B300. It earns its keep specifically where memory capacity is the bottleneck, not raw compute.</p>
      <ul className="a-list">
        <li><span className="mk">B2</span><span><strong>B200 fits:</strong> pretraining, fine-tuning, high-throughput inference, and standard-context RAG &mdash; workloads that aren&rsquo;t memory-bound. Generally the lower cost per GPU-hour of the two, with a smaller power and cooling footprint per node.</span></li>
        <li><span className="mk">B3</span><span><strong>B300 fits:</strong> long chain-of-thought reasoning, large-context RAG, mixture-of-experts architectures, and high-concurrency production inference &mdash; plus training runs where big activation tensors or gradient accumulation push against memory limits.</span></li>
      </ul>
      <p>Mapped against the workloads we see most: video generation and multimodal pipelines tend to push into B300 territory because of how much context and intermediate state they hold in memory. Standard LLM inference and routine fine-tuning usually run fine on a B200 unless your context windows or concurrency are unusually high.</p>
      <h2 className="b-h"><span className="hn">03 / THE PRICING PICTURE</span></h2>
      <p>B300 capacity generally prices at a premium over B200 given the memory and power step-up, but the spread we found across public trackers was wide &mdash; anywhere from roughly at-parity to nearly double, depending on provider and tier, and still settling as B300 supply ramps through 2026. We wrote up the sourced detail on <Link href="/blog/reserved-vs-on-demand-gpu-pricing">what the broader GPU market is charging</Link> if you want the numbers behind that range. Confirm the current spread for your deployment with your quote &mdash; we won&rsquo;t ballpark a number we can&rsquo;t stand behind.</p>
      <h2 className="b-h"><span className="hn">04 / HOW TO SPECIFY YOUR DEPLOYMENT</span></h2>
      <p>GPU type is the first of the five variables that move your real rate &mdash; see <Link href="/blog/qualifying-deployments">what &ldquo;qualifying deployments&rdquo; actually means</Link> for the rest. When you request a quote, tell us your context length, concurrency, and whether your pipeline is memory- or compute-bound; that&rsquo;s usually enough for us to tell you which chip actually fits, instead of defaulting you to whichever one we have more of.</p>
      <p className="a-close">The B300 isn&rsquo;t a strictly-better B200 &mdash; it&rsquo;s a different trade, and it costs more to make. Spend the extra only where memory is actually your bottleneck. For everything else, the B200 is the workhorse for a reason.</p>
      </>
    ),
  },
  {
    slug: "reserved-vs-on-demand-gpu-pricing",
    index: "07",
    title: "Reserved vs on-demand GPU pricing, sourced",
    category: "Pricing, explained",
    kicker: "Pricing, explained · 5 min read",
    excerpt: "We pulled the public numbers on CoreWeave, AWS, and Lambda — then show why utilization, not sticker price, decides whether committing saves you money.",
    standfirst: "We pulled the public numbers on CoreWeave, AWS, and Lambda — then show why utilization, not sticker price, decides whether committing saves you money.",
    date: "OCT 13, 2026",
    readTime: "5 MIN READ",
    next: "gpu-bill-product-economics",
    disclaimer: "* Competitor figures are third-party aggregator data (Holori, Devzero, Spheron Network), not official vendor price pages, captured October 2026. Sources disagree with each other, sometimes by double digits, and rates change by region, configuration and term. Confirm current pricing directly with each provider before budgeting. $5/hr is our own target/starting rate for qualifying long-term commitments, not a universal price.",
    body: (
      <>
      <p>Reserved GPU capacity runs 20&ndash;60% cheaper than on-demand across every major provider we checked &mdash; but only if you actually keep the hardware busy. Here&rsquo;s what the market is charging, sourced, and the one number that decides whether a commitment is the right call for you.</p>
      <h2 className="b-h"><span className="hn">01 / WHAT THE MARKET IS CHARGING, RIGHT NOW</span></h2>
      <p>Third-party pricing trackers put an 8-GPU CoreWeave <Link href="/gpus/b200">B200</Link> node at roughly $68.80/hr &mdash; about $8.60 per GPU-hour on demand &mdash; with reserved contracts reported to discount up to 60% depending on term. AWS&rsquo;s P5 instances (8&times;H100) list around $55/hr on demand; aggregator snapshots show 1-year reserved pricing near $41&ndash;43/hr and 3-year terms closer to $24/hr, roughly 55&ndash;57% off sticker. Lambda Labs&rsquo; on-demand H100 pricing is the least consistent of the three &mdash; different trackers show anywhere from $2.49 to $4.29 per GPU-hour for the same instance class &mdash; with reserved discounts estimated, not officially published, at around 20% for one year and 26% for three.</p>
      <aside className="pull-stat">
        <div className="n">20&ndash;60%</div>
        <div className="c">Reported discount range for reserved vs. on-demand GPU pricing across the providers we checked (CoreWeave, AWS, Lambda), per third-party aggregator data, October 2026.*</div>
      </aside>
      <p>None of this comes from the vendors&rsquo; own pricing pages &mdash; it&rsquo;s aggregator data, and the sources frequently disagree with each other by double digits. That disagreement is itself useful information: sticker price is a moving, contested target, and nobody &mdash; us included &mdash; publishes a single rate that survives six months unchanged. If a number matters to your budget, verify it directly with the provider before you model it.</p>
      <h2 className="b-h"><span className="hn">02 / THE NUMBER THAT ACTUALLY DECIDES THE DEAL</span></h2>
      <p>Sticker price isn&rsquo;t what decides reserved vs. on-demand &mdash; utilization is. One widely-cited 2026 analysis found that at 5% utilization, an AWS H100 billed at its on-demand rate effectively costs over $245 per <em>used</em> GPU-hour once idle time is counted against it. Reserved capacity only wins once you&rsquo;re running it most of the time, which is exactly the <Link href="/blog/baseload-vs-burst">baseload math</Link> we&rsquo;ve written about separately: the committed rate is a bet on your floor, not your ceiling.</p>
      <h2 className="b-h"><span className="hn">03 / WHERE THAT LEAVES OUR ~$5/GPU-HOUR TARGET</span></h2>
      <p>We&rsquo;re not claiming to be the cheapest line item on anyone&rsquo;s spreadsheet, and we don&rsquo;t publish a single sticker price &mdash; see <Link href="/blog/qualifying-deployments">what &ldquo;qualifying deployments&rdquo; actually means</Link> for why. What we can say: our ~$5/GPU-hour target for qualifying long-term commitments lands in roughly the same band as the deeper multi-year reserved tiers reported for H100-class capacity elsewhere in the market, and below most on-demand sticker rates for B200-class hardware. The number that applies to you depends on GPU type, node configuration, region, quantity and term &mdash; same as it does everywhere else.</p>
      <h2 className="b-h"><span className="hn">04 / WHEN NONE OF THIS SHOULD MATTER TO YOU</span></h2>
      <p>If your workload is still spiky, seasonal, or you&rsquo;re not yet sure it&rsquo;s staying at this size, none of the reserved rates above are the right comparison &mdash; stay on-demand or spot, and revisit <Link href="/blog/commitment-question">the commitment question</Link> once your utilization chart settles down.</p>
      <p className="a-close">The honest version of this comparison isn&rsquo;t &ldquo;we&rsquo;re cheaper than CoreWeave&rdquo; or &ldquo;we&rsquo;re cheaper than AWS&rdquo; &mdash; none of us publish numbers stable enough to make that claim responsibly. It&rsquo;s that committed pricing, from any provider, only beats on-demand once your utilization crosses the line where flexibility stops being worth its premium.</p>
      </>
    ),
  },
  {
    slug: "gpu-bill-product-economics",
    index: "08",
    title: "Your GPU bill is part of your product economics",
    category: "Unit economics",
    kicker: "Unit economics · 4 min read",
    excerpt: "Inference compute isn’t overhead — it’s cost of goods sold. Once you see it that way, everything about how you buy GPUs changes.",
    standfirst: "Inference compute isn’t overhead — it’s cost of goods sold. Once you see it that way, everything about how you buy GPUs changes.",
    date: "SEP 30, 2026",
    readTime: "4 MIN READ",
    next: "baseload-vs-burst",
    disclaimer: "* Figures are illustrative examples based on 24/7 utilization and a $10/hr vs. $5/hr rate comparison. Actual pricing depends on GPU type, node configuration, commitment length, region, networking and deployment. $5/hr is a target rate for qualifying long-term commitments, not a universal price.",
    body: (
      <>
      <p>Here&rsquo;s a question most AI infrastructure buyers never ask directly: <strong>is your GPU bill a cost center, or is it cost of goods sold?</strong> Read that again, because the answer determines what you&rsquo;re allowed to spend on it &mdash; and how you should negotiate it.</p>
      <p>If GPUs are overhead &mdash; like office internet or developer laptops &mdash; you minimize them and move on. But if GPUs manufacture your product &mdash; if every API response, every generated frame, every inference call consumes GPU time &mdash; then compute sits inside your gross margin. It is one of the primary things that decides what you can charge, and what you get to keep.</p>
      <h2 className="b-h"><span className="hn">01 / THE MARGIN EQUATION</span></h2>
      <p>Classic SaaS companies run gross margins around 70&ndash;80% precisely because the marginal cost of serving one more customer is near zero. AI companies don&rsquo;t get that deal: every additional inference call has a real, measurable GPU cost attached.</p>
      <p>That means unit compute economics compound exactly like gross margin. Consider an API startup running 100 GPUs for production inference, continuously:</p>
      <aside className="pull-stat">
        <div className="n">$4.38M / year</div>
        <div className="c">Illustrative annual difference for a 100-GPU inference fleet at $10 vs. $5/GPU-hour, 24/7 utilization. Not a pricing promise &mdash; the arithmetic that makes margin planning a GPU conversation.</div>
      </aside>
      <p>A $4.38M/year swing on the same fleet, same utilization, same product &mdash; the only variable is the hourly rate. That&rsquo;s the kind of number that changes a pricing meeting. It&rsquo;s also, incidentally, a line item management can actually defend.</p>
      <p>And it scales both directions. At 1,000 GPUs, the illustrative difference crosses $40M a year. At that point the compute bill isn&rsquo;t an infrastructure detail &mdash; it&rsquo;s the single biggest lever on your company&rsquo;s valuation.</p>
      <h2 className="b-h"><span className="hn">02 / PRICING POWER STARTS AT THE UNIT LEVEL</span></h2>
      <p>When you price your product, you are implicitly pricing your compute. A per-token or per-generation price carries a GPU-cost floor; if that floor drops by roughly half, you can lower prices to win deals, hold prices to expand margin, or split the difference. Companies that can&rsquo;t move their compute cost negotiate their product price with one hand tied.</p>
      <h2 className="b-h"><span className="hn">03 / WHY THIS CHANGES HOW YOU BUY COMPUTE</span></h2>
      <p>Treating GPUs as COGS reframes every infrastructure decision. Variable hourly compute becomes a planning problem: finance can&rsquo;t model gross margin on a line item that swings with market availability. Committed, predictable compute becomes finance-friendly infrastructure &mdash; the number your CFO puts in the model is the number you pay.</p>
      <p>It also flips how you read a utilization dashboard. Under on-demand pricing, high utilization is budget pressure. Under a committed model, high utilization is the machine working exactly as designed &mdash; the infrastructure cost is known, and every increment of usage improves unit economics.</p>
      <p className="a-close">The companies that will win the inference market won&rsquo;t necessarily have the best models. They&rsquo;ll be the ones whose compute economics let them scale without flinching at the bill. Your GPU spend isn&rsquo;t a utility invoice to minimize &mdash; it&rsquo;s line one of your product economics. Buy it accordingly.</p>
      </>
    ),
  },
  {
    slug: "baseload-vs-burst",
    index: "09",
    title: "Baseload vs burst: the 80/20 of GPU infrastructure",
    category: "Infrastructure strategy",
    kicker: "Infrastructure strategy · 4 min read",
    excerpt: "Most of your GPU fleet is doing something predictable. Price it accordingly — and keep the cloud for everything else.",
    standfirst: "Most of your GPU fleet is doing something predictable. Price it accordingly — and keep the cloud for everything else.",
    date: "SEP 23, 2026",
    readTime: "4 MIN READ",
    next: "qualifying-deployments",
    body: (
      <>
      <p>Try this with your own numbers: chart your team&rsquo;s GPU-hour consumption week by week for the last quarter, from quietest week to busiest. For most production AI companies, the shape is unmistakable &mdash; a tall, steady floor with spikes stacked on top.</p>
      <p>That floor is your <strong>baseload</strong>: the compute you&rsquo;d need even if the quarter had gone perfectly average &mdash; production inference, always-on API capacity, the training runs baked into your weekly rhythm. The spikes are everything else: launches, experiments, capacity you&rsquo;ve never seen before.</p>
      <h2 className="b-h"><span className="hn">01 / THE POWER GRID FIGURED THIS OUT DECADES AGO</span></h2>
      <p>Electricity grids have run on exactly this logic for a century. Baseload plants &mdash; nuclear, hydro &mdash; generate cheap power constantly, 24 hours a day. Peaker plants sit idle until demand surges, then command premium rates precisely because they exist for flexibility. Nobody runs an industrial plant on peaker pricing and calls it a strategy.</p>
      <p>GPU infrastructure is the same shape with worse labeling. On-demand cloud is peak pricing, charged around the clock, to workloads that were never going to shut off. If your quietest week still burns thousands of GPU-hours, you&rsquo;re buying baseload capacity at peaker prices every single day.</p>
      <aside className="pull-stat">
        <div className="n">8,760</div>
        <div className="c">GPU-hours per GPU per year at continuous utilization. Every one of them billed at whatever rate you picked &mdash; which is exactly why the rate you picked matters so much.</div>
      </aside>
      <h2 className="b-h"><span className="hn">02 / THE 80/20 RULE OF FLEETS</span></h2>
      <p>A typical production fleet lands near an 80/20 split: roughly four-fifths of compute is predictable baseload, one-fifth is variable burst. Lock in the predictable 80 at a committed rate and your entire cost structure shifts &mdash; while the flexible 20 stays on the cloud, exactly where elasticity belongs.</p>
      <p>This is deliberately not all-or-nothing. The companies that hesitate about long-term infrastructure usually imagine committing 100% of future compute. The correct move is narrower: commit the portion you&rsquo;d pay for anyway, and stop paying the flexibility premium on capacity that was never going to be flexible.</p>
      <h2 className="b-h"><span className="hn">03 / HOW TO FIND YOUR BASELOAD</span></h2>
      <p>Look at the last 90 days of GPU-hours per week. Sort ascending. The average of the lowest quartile &mdash; or more conservatively, the 10th-percentile week &mdash; is a defensible estimate of your baseload. That&rsquo;s the compute that is, functionally, permanent. Everything above it is your burst budget.</p>
      <p>Two sanity checks: if your baseload estimate keeps rising month over month, that&rsquo;s demand growth you can actually plan around. And if no week in the last quarter dropped below the estimate, you can trust the number the way finance trusts it &mdash; as a line item, not a guess.</p>
      <p>Before you lock in a rate for that baseload, it&rsquo;s worth knowing what the rest of the market is charging. We pulled the public numbers on <Link href="/blog/reserved-vs-on-demand-gpu-pricing">reserved vs. on-demand pricing across CoreWeave, AWS, and Lambda</Link> — including where the sources disagree.</p>
      <p className="a-close">Compute has the same profile as electricity: mostly steady, sometimes spiky. Price the steady part like it&rsquo;s steady. Keep the cloud for the storms. The 80/20 split isn&rsquo;t a theory &mdash; it&rsquo;s what your utilization chart already says, if you read it honestly.</p>
      </>
    ),
  },
  {
    slug: "qualifying-deployments",
    index: "10",
    title: "What ‘qualifying deployments’ actually means",
    category: "Pricing, explained",
    kicker: "Pricing, explained · 5 min read",
    excerpt: "A plain-English explainer of the ~$5/GPU-hour target rate — and the five things that move your real price.",
    standfirst: "Our target rate is ~$5/GPU-hour for qualifying long-term commitments. This is the plain-English explainer of the asterisks.",
    date: "SEP 16, 2026",
    readTime: "5 MIN READ",
    next: "operating-infrastructure",
    disclaimer: "* $5/hr is a target/starting rate for qualifying long-term commitments, not a universal price. Actual pricing depends on GPU type, node configuration, commitment length, region, networking and deployment.",
    body: (
      <>
      <p>We quote &ldquo;~$5/GPU-hour for qualifying long-term commitments&rdquo; &mdash; and we deliberately do not say &ldquo;all our GPUs cost $5/hr.&rdquo; That honesty is a feature, not a legal department&rsquo;s invention. This article explains exactly what &ldquo;qualifying&rdquo; means, what moves your real price, and how a quote gets built.</p>
      <p>First, the target rate describes deployments that look a certain way: <strong>sustained, multi-GPU baseload workloads committed for 36+ months</strong>, in regions where capacity is secured and contracted. If your deployment matches that profile, ~$5/GPU-hour is the starting point of the conversation &mdash; not the final number, but the anchor.</p>
      <aside className="pull-stat">
        <div className="n">~$5 <span style={{ fontSize: ".45em" }}>/ GPU-hour*</span></div>
        <div className="c">Target starting rate for qualifying deployments: sustained, multi-GPU baseload, committed 36+ months. Final pricing follows the deployment spec below.</div>
      </aside>
      <h2 className="b-h"><span className="hn">01 / THE FIVE THINGS THAT MOVE THE NUMBER</span></h2>
      <p>Five variables dominate real pricing. In order of impact:</p>
      <ul className="a-list">
        <li><span className="mk">01</span><span><strong>GPU type.</strong> A B300 is more compute than a B200 &mdash; more memory, more throughput, denser deployments. The target rate is tiered by the silicon your workload is built on, not blended into one fictional number. See our <Link href="/blog/b200-vs-b300">B200 vs B300 breakdown</Link> if you&rsquo;re not sure which one your workload needs.</span></li>
        <li><span className="mk">02</span><span><strong>Node configuration.</strong> Full 8&times;GPU nodes with high-bandwidth interconnect price differently from smaller builds. The spec we&rsquo;d sign gets quoted against the spec you actually need &mdash; no paying for a node you wouldn&rsquo;t run.</span></li>
        <li><span className="mk">03</span><span><strong>Quantity.</strong> Larger fleets price better per unit: deployment and networking costs amortize over more GPUs. Single-digit GPUss rarely clear the &ldquo;qualifying&rdquo; bar for the target rate.</span></li>
        <li><span className="mk">04</span><span><strong>Region.</strong> Power, cooling, datacenter availability and networking differ by region, and pricing follows the real deployment geography &mdash; wherever your capacity is actually secured.</span></li>
        <li><span className="mk">05</span><span><strong>Commitment.</strong> A longer commitment prices deeper than the 36-month minimum. The longer the horizon we&rsquo;re securing capacity against, the better the economics we can pass through.</span></li>
      </ul>
      <h2 className="b-h"><span className="hn">02 / WHAT THE RATE CLOSES</span></h2>
      <p>The commitment rate covers your dedicated capacity for the full term &mdash; fixed, contracted, known. Node configuration, networking, SLA, uptime target, provisioning time and support model are specified in the agreement <strong>before</strong> you sign, so the number finance models is the number you pay.</p>
      <h2 className="b-h"><span className="hn">03 / HOW A QUOTE ACTUALLY GETS BUILT</span></h2>
      <p>A quote starts with your reality, not our inventory: current GPUs, GPU type, what you&rsquo;re paying per GPU-hour, monthly spend, workload, and commitment preference. We model that against the baseload shape of your fleet. If the deployment doesn&rsquo;t qualify for the target rate, we tell you what it would take to get there &mdash; or that the model isn&rsquo;t the right fit.</p>
      <p>What we will not do: quote a rate we can&rsquo;t sustain, or imply inventory we don&rsquo;t have. <Link href="/gpus/b200">B200</Link>/<Link href="/gpus/b300">B300</Link> capacity is available through qualifying deployments &mdash; if we can&rsquo;t secure the hardware your timeline needs, you&rsquo;ll hear that before anything else.</p>
      <p className="a-close">&ldquo;Qualifying deployments&rdquo; isn&rsquo;t a loophole &mdash; it&rsquo;s the definition of the deployments the model serves. Sustained, multi-GPU, committed compute gets the target rate because that compute is what the whole company is built to deliver.</p>
      </>
    ),
  },
  {
    slug: "operating-infrastructure",
    index: "11",
    title: "If you run GPUs 24/7, you’re operating infrastructure",
    category: "Infrastructure strategy",
    kicker: "Infrastructure strategy · 3 min read",
    excerpt: "On-demand pricing is built for elastic workloads. If nothing about your fleet is elastic, you’re paying the wrong rate.",
    standfirst: "On-demand pricing is built for elastic workloads. If nothing about your fleet is elastic, you’re paying the wrong rate.",
    date: "SEP 09, 2026",
    readTime: "3 MIN READ",
    next: "commitment-question",
    disclaimer: "* Illustrative example based on 24/7 utilization. Actual pricing depends on GPU type, node configuration, commitment length, region, networking and deployment. $5/hr is a target rate for qualifying long-term commitments, not a universal price.",
    body: (
      <>
      <p>On-demand cloud pricing is <strong>a price on uncertainty</strong>. The premium exists because the provider absorbs your variability &mdash; capacity you might need, machines that might sit idle, demand that might vanish. That&rsquo;s a fair trade when your workload is genuinely unpredictable.</p>
      <p>But most AI infrastructure buyers aren&rsquo;t unpredictable. Production inference doesn&rsquo;t dip to zero on weekends. Training calendars don&rsquo;t cancel themselves. The fleet that ran this month is, with boring reliability, the fleet that will run next month. And yet the bill keeps charging peak price for flexibility you&rsquo;re not using.</p>
      <h2 className="b-h"><span className="hn">01 / THE ELASTICITY YOU PAY FOR BUT DON&rsquo;T USE</span></h2>
      <p>Think of it as insurance: on-demand is the price of being able to leave at any time. The premium makes sense for experiments, spikes, and anything you&rsquo;re still discovering. But once a workload runs 24/7 &mdash; once the &ldquo;maybe&rdquo; becomes a &ldquo;definitely, forever&rdquo; &mdash; the insurance is pure overhead. Nobody keeps renting the crane after the building is built.</p>
      <h2 className="b-h"><span className="hn">02 / THE TWO ECONOMIC MODELS</span></h2>
      <p><strong>On-demand:</strong> need GPU &rarr; rent GPU &rarr; pay premium hourly rate &rarr; keep paying &rarr; repeat every month. The rate never improves, the bill never settles, and growth multiplies the premium.</p>
      <p><strong>Committed:</strong> forecast compute &rarr; reserve capacity &rarr; lock the rate for 36+ months &rarr; build the business on known cost. Growth multiplies a number you chose, not a market price you inherited.</p>
      <aside className="pull-stat">
        <div className="n">$87,600 &rarr; $43,800</div>
        <div className="c">One GPU, billed 24/7 for a year &mdash; at a typical ~$10/hr on-demand rate versus our ~$5/GPU-hour target. Same machine. Same utilization. Different economic model.</div>
      </aside>
      <h2 className="b-h"><span className="hn">03 / THE SELF-HONESTY CHECK</span></h2>
      <p>Here&rsquo;s the test: if your average GPU utilization has sat above 80% for three consecutive months, you&rsquo;re not a cloud customer with a burst problem &mdash; you&rsquo;re an infrastructure operator on tourist pricing. If your utilization swings wildly with launches and experiments, stay on the cloud&rsquo;s metered rates; that&rsquo;s exactly what they&rsquo;re for.</p>
      <p>The uncomfortable corollary: running 24/7 on on-demand while forecasting growth is the most expensive possible position &mdash; maximum utilization of the maximum rate. That&rsquo;s the precise workload a commitment model rescues.</p>
      <p className="a-close">There&rsquo;s nothing wrong with the cloud. There&rsquo;s just something suboptimal about paying for elasticity you don&rsquo;t use. If your GPUs never switch off, admit you&rsquo;re operating infrastructure &mdash; and start pricing like it.</p>
      </>
    ),
  },
  {
    slug: "commitment-question",
    index: "12",
    title: "The 3-year commitment question, answered honestly",
    category: "Honest answers",
    kicker: "Honest answers · 5 min read",
    excerpt: "When long-term GPU leasing makes sense, when it doesn’t — and the risks we’d talk you out of signing.",
    standfirst: "When long-term GPU leasing makes sense, when it doesn’t — and the risks we’d talk you out of signing.",
    date: "SEP 02, 2026",
    readTime: "5 MIN READ",
    next: "deepinfer-reserved-b200-b300",
    body: (
      <>
      <p>&ldquo;Why would I commit for three years?&rdquo; is the single best question a buyer can ask us, and we take it as a compliment every time. A company that asks it is already thinking about compute the right way. Here&rsquo;s our honest answer &mdash; including the cases where we&rsquo;d tell you not to sign.</p>
      <p>The core claim is simple: <strong>if you&rsquo;d bet your job that you&rsquo;ll still need these GPUs in month 36, committing is just prepaying a cost you were going to pay &mdash; at a materially lower rate.</strong> Everything else is risk management.</p>
      <h2 className="b-h"><span className="hn">01 / WHEN IT MAKES SENSE</span></h2>
      <ul className="a-list">
        <li><span className="mk">01</span><span><strong>Sustained utilization.</strong> Your fleet runs hot, month after month &mdash; average utilization above 70&ndash;80%, with no meaningful idle weeks.</span></li>
        <li><span className="mk">02</span><span><strong>The bill is real.</strong> You&rsquo;re already spending $50k+/month on GPU compute. At this scale the commitment math usually wins by enough to matter in the board deck.</span></li>
        <li><span className="mk">03</span><span><strong>Production workloads.</strong> The committed capacity serves production inference, recurring training, or steady generation pipelines &mdash; not experiments you&rsquo;re still discovering.</span></li>
        <li><span className="mk">04</span><span><strong>Growth is the shape.</strong> Demand is flat-to-growing over 36+ months, so committed capacity gets absorbed rather than stranded.</span></li>
      </ul>
      <h2 className="b-h"><span className="hn">02 / WHEN IT DOESN&rsquo;T</span></h2>
      <ul className="a-list">
        <li><span className="mk">01</span><span><strong>Still finding fit.</strong> If your workload mix changes every quarter, you need flexibility, not a rate.</span></li>
        <li><span className="mk">02</span><span><strong>Spiky or seasonal.</strong> Bursts that come and go belong on cloud elasticity &mdash; locking in idle capacity is the one way to make this model lose money.</span></li>
        <li><span className="mk">03</span><span><strong>Short runway.</strong> If the next 36 months are uncertain for the business itself, infrastructure commitments are the wrong kind of bet.</span></li>
        <li><span className="mk">04</span><span><strong>Tiny fleets.</strong> A handful of GPUs won&rsquo;t carry commitment economics. The model earns its keep at production scale.</span></li>
      </ul>
      <p>We mean this sincerely: we&rsquo;d rather lose a deal than sell a commitment that strands you. A stranded commitment isn&rsquo;t revenue &mdash; it&rsquo;s a story we don&rsquo;t want told about us.</p>
      <aside className="pull-stat">
        <div className="n">$50K / month</div>
        <div className="c">At this spend level, the economics of a committed baseline usually win by enough that the question flips: what justifies staying on demand at all?</div>
      </aside>
      <h2 className="b-h"><span className="hn">03 / THE RISKS, STATED PLAINLY</span></h2>
      <p><strong>GPU capacity generations.</strong> A three-year commitment could, in theory, strand you on last year&rsquo;s silicon. The practical antidote: commit the baseload you know runs on today&rsquo;s architecture, and keep growth on flexible capacity that can absorb new generations as they ship.</p>
      <p><strong>Forecast error.</strong> You might over-commit. The antidote is baseload math: commit the floor you can prove from trailing data &mdash; the 10th-percentile week, not the average &mdash; so the worst case is that extra demand stays on the cloud.</p>
      <p><strong>Counterparty risk.</strong> You&rsquo;re trusting a provider to be there for 36 months. This is why agreements specify node configuration, networking, SLA, uptime target and support in writing before anything is signed &mdash; and why we publish the spec we&rsquo;d want to read.</p>
      <h2 className="b-h"><span className="hn">04 / THE DECISION RULE</span></h2>
      <p>Forget the spreadsheet for a minute. The rule: if month-36 demand feels like a forecast you would defend to your board, a commitment turns variable spend into a fixed line item at a lower rate. If it feels like a guess, keep the flexibility and revisit when the fog clears.</p>
      <p>Our job is to model the difference with your real numbers &mdash; and when the honest answer is &ldquo;not yet,&rdquo; to say so. The companies that commit when it fits tend to do it again. The ones that commit when it doesn&rsquo;t tend to tell everyone. We know which outcome gets chosen.</p>
      <p className="a-close">Long-term leasing isn&rsquo;t for everyone. For the fleet that&rsquo;s hot, growing, and production-proven, it&rsquo;s simply the arithmetic winning over habit. And when it doesn&rsquo;t make sense, the job of an infrastructure partner is to say that first.</p>
      </>
    ),
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
