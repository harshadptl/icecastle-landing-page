import type { ReactNode } from "react";
import Link from "next/link";

export type Gpu = {
  slug: string;
  name: string;
  title: string;
  standfirst: string;
  disclaimer: string;
  body: ReactNode;
};

const SOURCES =
  "* Specs are per GPU, dense (no sparsity), compiled from public trackers and vendor write-ups (SemiAnalysis InferenceX, DataCrunch, Introl, Vast.ai, Glenn Klockwood), checked October 17, 2026, not from NVIDIA's own datasheets. Sources disagree on some figures — B200 memory is listed as 180GB or 192GB depending on the system, and B300 power from 1,100W to 1,400W. Performance-per-watt figures are our arithmetic from those spec numbers, not measured results; real efficiency depends on model, precision, batch size and cooling. Confirm exact numbers against NVIDIA's datasheets before specifying a deployment.";

export const gpus: Gpu[] = [
  {
    slug: "b200",
    name: "NVIDIA B200",
    title: "NVIDIA B200: power and efficiency vs. A100, H100 and H200",
    standfirst: "The B200 draws more power than any GPU before it — and does far more with each watt. Here's what changed from the A100 and Hopper generations, in plain numbers.",
    disclaimer: SOURCES,
    body: (
      <>
      <p>The B200 is the first data-center GPU of NVIDIA&rsquo;s Blackwell generation, and the workhorse of most new AI deployments in 2026. The short version: it uses about 40% more power than an H100, and in return delivers more than twice the FP8 compute, more than twice the memory, and roughly 2.4&times; the memory bandwidth. For a business, that means more work per server, per rack and per dollar of electricity.</p>
      <h2 className="b-h"><span className="hn">01 / FOUR GENERATIONS SIDE BY SIDE</span></h2>
      <ul className="a-list">
        <li><span className="mk">A1</span><span><strong>A100 (2020):</strong> 80GB HBM2e, 2.0 TB/s, ~400W. No FP8 support &mdash; its fastest AI format is FP16/BF16 at about 312 TFLOPS.</span></li>
        <li><span className="mk">H1</span><span><strong>H100 (2022):</strong> 80GB HBM3, 3.35 TB/s, ~700W. Introduced FP8 at about 1,979 TFLOPS.</span></li>
        <li><span className="mk">H2</span><span><strong>H200 (2024):</strong> 141GB HBM3e, 4.8 TB/s, ~700W. The same compute as the H100, with more and faster memory.</span></li>
        <li><span className="mk">B2</span><span><strong>B200 (2025):</strong> 180&ndash;192GB HBM3e, 8 TB/s, ~1,000W. About 4,500 TFLOPS of FP8, plus a new FP4 format at about 9,000 TFLOPS.*</span></li>
      </ul>
      <h2 className="b-h"><span className="hn">02 / MORE POWER, MORE WORK PER WATT</span></h2>
      <p>Power draw going up is not the same as efficiency going down. Divide FP8 compute by power and the B200 delivers about 4.5 TFLOPS per watt, against about 2.8 for the H100 and H200 &mdash; roughly 1.6&times; the work for every watt. Memory tells the same story: about 0.19GB per watt on the B200, against 0.11 on the H100.</p>
      <aside className="pull-stat">
        <div className="n">~1.6&times; FP8 per watt</div>
        <div className="c">4,500 TFLOPS &divide; 1,000W on the B200 vs. 1,979 TFLOPS &divide; 700W on the H100 and H200. Our arithmetic from public spec figures, not a measured benchmark.*</div>
      </aside>
      <p>FP4 widens the gap further. Models served in FP4 use half the memory of FP8 and run on the B200&rsquo;s fastest math path; Hopper GPUs don&rsquo;t support FP4 at all. Measured results point the same way: in MLPerf Training v4.1, the B200 roughly doubled per-GPU performance on GPT-3 pre-training compared with the H200.</p>
      <h2 className="b-h"><span className="hn">03 / WHAT IT MEANS FOR YOUR BUSINESS</span></h2>
      <p>One 8&times;B200 node holds about 1.5TB of GPU memory, enough to serve a 300-billion-parameter model on a single server where Hopper needed two or more. Fewer servers means fewer racks, less networking and less to operate. The catch is density: around 1,000W per GPU means a B200 node needs more power and cooling per rack than an H100 node did, which is one reason most B200 deployments land in purpose-built data centers rather than older server rooms.</p>
      <p>For most production AI &mdash; inference, fine-tuning, training and standard-context retrieval &mdash; the B200 is the right fit. If your workloads are limited by memory rather than compute, see the <Link href="/gpus/b300">NVIDIA B300</Link> or read <Link href="/blog/b200-vs-b300">which GPU fits your workload</Link>.</p>
      <p className="a-close">The B200 costs more to power than the GPUs before it, and does far more with that power. For sustained AI work, efficiency per watt is the number that compounds.</p>
      </>
    ),
  },
  {
    slug: "b300",
    name: "NVIDIA B300",
    title: "NVIDIA B300: power and efficiency vs. B200 and Hopper",
    standfirst: "Blackwell Ultra adds 50% more memory and roughly 1.5&times; the FP4 compute of the B200. Here's what that costs in power, and what it buys you compared with earlier generations.",
    disclaimer: SOURCES,
    body: (
      <>
      <p>The B300, also called Blackwell Ultra, is the second wave of NVIDIA&rsquo;s Blackwell generation. It isn&rsquo;t a new architecture: it&rsquo;s a B200 rebuilt for the workloads that strain memory most &mdash; long reasoning chains, very long contexts, and large mixture-of-experts models. It is the most power-hungry GPU NVIDIA has shipped, and on the work it&rsquo;s designed for, among the most efficient.</p>
      <h2 className="b-h"><span className="hn">01 / HOW IT COMPARES</span></h2>
      <ul className="a-list">
        <li><span className="mk">H1</span><span><strong>H100 (2022):</strong> 80GB HBM3, 3.35 TB/s, ~700W, no FP4.</span></li>
        <li><span className="mk">H2</span><span><strong>H200 (2024):</strong> 141GB HBM3e, 4.8 TB/s, ~700W, no FP4.</span></li>
        <li><span className="mk">B2</span><span><strong>B200 (2025):</strong> 180&ndash;192GB HBM3e, 8 TB/s, ~1,000W, about 9 PFLOPS of FP4.</span></li>
        <li><span className="mk">B3</span><span><strong>B300 (2025&ndash;26):</strong> 288GB HBM3e, about 8 TB/s, 1,100&ndash;1,400W depending on the system, about 13&ndash;15 PFLOPS of FP4.*</span></li>
      </ul>
      <p>One trade-off to know: the B300 cuts double-precision (FP64) performance sharply compared with the B200. That matters for traditional scientific simulation, not for AI training or inference.</p>
      <h2 className="b-h"><span className="hn">02 / POWER AND EFFICIENCY</span></h2>
      <p>The B300 asks for 10&ndash;40% more power than a <Link href="/gpus/b200">B200</Link>. In return, using the most commonly cited figures (15 PFLOPS at 1,400W), FP4 throughput per watt is about 10.7 TFLOPS, against 9.0 on the B200 &mdash; roughly 1.2&times; better. Across the full range of published figures it lands anywhere from about 9.3 to 13.6. Memory per watt improves more: about 0.21&ndash;0.26GB per watt, against 0.19 on the B200 and 0.11 on the H100.</p>
      <aside className="pull-stat">
        <div className="n">288GB per GPU</div>
        <div className="c">3.6&times; the H100&rsquo;s 80GB and 1.5&times; the B200&rsquo;s 192GB. An 8-GPU node holds about 2.3TB &mdash; enough to keep a trillion-parameter model in FP8 on one server.*</div>
      </aside>
      <p>Against Hopper, the gap is generational. Hopper has no FP4 path, so the fairest comparison is a model served in FP4 on a B300 versus the same model in FP8 on an H100: about 3.8&times; the compute per watt using the most common figures, and 3.6&times; the memory per GPU. Treat that as a ceiling from spec sheets; how close you get depends on whether your model holds its quality at FP4.</p>
      <h2 className="b-h"><span className="hn">03 / WHEN THE EXTRA POWER PAYS OFF</span></h2>
      <p>The B300 earns its premium when memory is the bottleneck: reasoning models that think for thousands of tokens, retrieval over very long documents, large mixture-of-experts models, and high-concurrency inference where each user&rsquo;s context takes memory. Fitting a model on fewer GPUs means less splitting across servers, and less waiting on the network between them. If your workload isn&rsquo;t memory-bound, a B200 usually does the same job for less power and a lower rate &mdash; see <Link href="/blog/b200-vs-b300">which GPU fits your workload</Link>.</p>
      <p>Plan for the power. At up to 1,400W per GPU, B300 racks typically need liquid cooling and far more power per rack than Hopper-era deployments; that is part of what a qualifying deployment specifies before you sign.</p>
      <p className="a-close">The B300 is the most power NVIDIA has put into one GPU. For memory-hungry AI, it turns that power into more work per watt than anything before it.</p>
      </>
    ),
  },
];

export function getGpu(slug: string): Gpu | undefined {
  return gpus.find((g) => g.slug === slug);
}
