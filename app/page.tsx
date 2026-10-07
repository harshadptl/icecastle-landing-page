import Image from "next/image";
import Calculator from "@/components/Calculator";
import QuoteForm from "@/components/QuoteForm";

export default function HomePage() {
  return (
    <>
      <header className="hero" id="top">
        <canvas id="hero-particles" aria-hidden="true"></canvas>
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <span className="eyebrow reveal">GPU capacity for AI</span>
              <h1 className="reveal">Scale AI without runaway GPU costs.</h1>
              <p className="hero-sub reveal">For AI teams with sustained GPU demand: NVIDIA B200 / B300 capacity, 12–24-month terms, and a <strong>~$5/GPU-hour target</strong> for qualifying deployments. Price is indicative; availability and final terms are deployment-specific.</p>
              <p className="hero-sub reveal">Reserve a predictable baseline; keep cloud for bursts.</p>
              <div className="hero-ctas reveal" data-d="1">
                <a href="#quote" className="btn btn-primary">Check capacity &amp; pricing <span className="arr">→</span></a>
                <a href="#calculator" className="btn btn-ghost">Estimate savings <span className="arr">→</span></a>
              </div>
              <div className="pipeline reveal" data-d="2" id="pipeline" aria-hidden="true">
                <span className="node">GPU</span><span className="pulse"></span>
                <span className="node">NODE</span><span className="pulse" style={{ animationDelay: ".3s" }}></span>
                <span className="node">CLUSTER</span><span className="pulse" style={{ animationDelay: ".6s" }}></span>
                <span className="node">AI WORKLOAD</span>
              </div>
            </div>
            <figure className="hero-fig reveal" data-d="1" style={{ margin: "0" }}>
              <Image src="/images/hero-ice-fortress.webp" alt="A stylized ice fortress built from layered GPU server modules with ice crystals and cyan circuit glow" width={2352} height={1008} priority sizes="(max-width: 980px) 100vw, 540px" />
              <figcaption className="chip chip-a"><b>~$5</b>/GPU-hour* target rate</figcaption>
              <figcaption className="chip chip-b"><b>12–24</b> month commitments</figcaption>
            </figure>
          </div>
          <div className="hero-stats reveal" data-d="2">
            <div className="hero-stat"><div className="n" data-count="41" data-suffix="%">41%</div><div className="l">Illustrative spend reduction: $10 vs. $5/GPU-hour at 85% on-demand utilization*</div></div>
            <div className="hero-stat"><div className="n">B200 / B300</div><div className="l">NVIDIA B200 / B300 capacity</div></div>
            <div className="hero-stat"><div className="n">24/7</div><div className="l">Dedicated capacity for production workloads</div></div>
          </div>
        </div>
      </header>

      <section id="who" aria-labelledby="who-h" style={{ paddingTop: "0" }}>
        <div className="wrap">
          <span className="eyebrow reveal">Buyer fit</span>
          <h2 id="who-h" className="reveal">For AI teams with a steady GPU baseline.</h2>
          <p className="lede reveal">Best fit: 24/7-class workloads, typically $50K+ in monthly GPU spend, and a baseline you can forecast for 12–24 months.</p>
          <div className="cards5">
            <div className="who-card feat reveal">
              <svg viewBox="0 0 24 24" fill="none" stroke="#BDEFFF" strokeWidth="1.6" aria-hidden="true"><path d="M9 2a4 4 0 0 0-4 4c-1.6.8-2.6 2.6-2.5 4.5.1 1.8 1.1 3.2 2.5 4.1A4 4 0 0 0 9 21a4 4 0 0 0 2.9-1.3A4 4 0 0 0 15 22a4 4 0 0 0 4-4c1.4-.9 2.4-2.3 2.5-4.1.1-1.9-.9-3.7-2.5-4.5A4 4 0 0 0 15 2a4 4 0 0 0-2.9 1.3A4 4 0 0 0 9 2z"/><path d="M12 4v16" stroke="#5CA9FF"/></svg>
              <div>
                <h3>LLM Inference</h3>
                <p>Reserve capacity for production inference and forecast spend with greater confidence.</p>
              </div>
            </div>
            <div className="who-card reveal" data-d="1">
              <svg viewBox="0 0 24 24" fill="none" stroke="#BDEFFF" strokeWidth="1.6" aria-hidden="true"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M7 6v12M17 6v12M2 10h5M2 14h5M17 10h5M17 14h5" stroke="#5CA9FF"/><path d="M10 9l5 3-5 3V9z" fill="#BDEFFF" stroke="none"/></svg>
              <h3>Video Generation</h3>
              <p>Manage the compute cost of high-volume video generation.</p>
            </div>
            <div className="who-card reveal" data-d="2">
              <svg viewBox="0 0 24 24" fill="none" stroke="#BDEFFF" strokeWidth="1.6" aria-hidden="true"><path d="M4 14v-3a8 8 0 0 1 16 0v3"/><rect x="2" y="13" width="5" height="9" rx="2"/><rect x="17" y="13" width="5" height="9" rx="2"/><path d="M9 17a.5.5 0 1 0 0 1M15 17a.5.5 0 1 0 0 1" stroke="#5CA9FF"/></svg>
              <h3>Audio &amp; Multimodal AI</h3>
              <p>Plan dedicated capacity for sustained audio and multimodal workloads.</p>
            </div>
            <div className="who-card reveal" data-d="3">
              <svg viewBox="0 0 24 24" fill="none" stroke="#BDEFFF" strokeWidth="1.6" aria-hidden="true"><path d="M9 3h6M10 3v5.5L4.8 17a2.4 2.4 0 0 0 2.1 3.5h10.2a2.4 2.4 0 0 0 2.1-3.5L14 8.5V3"/><path d="M7.5 14.5h9" stroke="#5CA9FF"/><circle cx="12" cy="17.5" r="1.2" fill="#5CA9FF" stroke="none"/></svg>
              <h3>Fine-Tuning &amp; Distillation</h3>
              <p>Support recurring fine-tuning, RL, distillation and evaluation workloads.</p>
            </div>
            <div className="who-card reveal" data-d="4">
              <svg viewBox="0 0 24 24" fill="none" stroke="#BDEFFF" strokeWidth="1.6" aria-hidden="true"><path d="M6.5 6.5v11M17.5 6.5v11M3.5 9.5v5M20.5 9.5v5M6.5 12h11" strokeLinecap="round"/><circle cx="6.5" cy="6.5" r="1.6"/><circle cx="17.5" cy="6.5" r="1.6" stroke="#5CA9FF"/></svg>
              <h3>Model Training</h3>
              <p>Plan training capacity without relying solely on on-demand availability.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="gpus" aria-labelledby="gpu-h" style={{ paddingTop: "0" }}>
        <div className="wrap">
          <span className="eyebrow reveal">Available capacity</span>
          <h2 id="gpu-h" className="reveal">NVIDIA B200 / B300 capacity, confirmed per deployment.</h2>
          <p className="lede reveal">B200 / B300 capacity is offered for qualifying deployments. Availability is subject to confirmation; this page does not publish live inventory by region or standard provisioning lead times.</p>
          <figure className="gpu-fig reveal" data-d="1" style={{ marginLeft: "0", marginRight: "0" }}>
            <Image src="/images/gpu-rack.webp" alt="A frosted ice-blue GPU server module sliding out of a rack in a dark data hall with cyan circuit glow" width={1920} height={1280} sizes="(max-width: 1152px) 100vw, 1104px" />
          </figure>
          <div className="duo">
            <div className="gpu-card reveal">
              <div className="model">NVIDIA</div>
              <h3>B200</h3>
              <div className="tagline">Production AI workloads</div>
              <ul>
                <li>LLM inference</li>
                <li>Training</li>
                <li>Fine-tuning</li>
                <li>Distillation</li>
                <li>High-throughput workloads</li>
              </ul>
            </div>
            <div className="gpu-card reveal" data-d="1">
              <div className="model">NVIDIA</div>
              <h3>B300</h3>
              <div className="tagline">Next-generation AI workloads</div>
              <ul>
                <li>Large-scale inference</li>
                <li>Training</li>
                <li>Reasoning workloads</li>
                <li>Multimodal workloads</li>
                <li>High-density deployments</li>
              </ul>
            </div>
          </div>
          <div className="deployment-proof reveal">
            <h3>Confirm these in the written offer</h3>
            <div className="trust-grid">
              <div className="trust-item"><span className="dot"></span>GPU model and reserved count</div>
              <div className="trust-item"><span className="dot"></span>Node, memory and interconnect</div>
              <div className="trust-item"><span className="dot"></span>Datacenter region and network scope</div>
              <div className="trust-item"><span className="dot"></span>Provisioning date and availability window</div>
              <div className="trust-item"><span className="dot"></span>Uptime SLA and support coverage</div>
              <div className="trust-item"><span className="dot"></span>Included services, fees and payment schedule</div>
              <div className="trust-item flag">The source page does not publish region-level inventory, delivery dates, or standard SLA/payment terms. Treat these as unconfirmed until documented for your deployment.</div>
            </div>
            <div className="center-cta reveal"><a href="#quote" className="btn btn-primary">Check capacity &amp; pricing <span className="arr">→</span></a></div>
          </div>
        </div>
      </section>

      <section id="economics" aria-labelledby="econ-h">
        <div className="wrap">
          <span className="eyebrow reveal">Economics</span>
          <h2 id="econ-h" className="reveal">Model the cost of a committed GPU baseline.</h2>
          <p className="lede reveal">At 24/7 usage, a $10 vs. $5/GPU-hour comparison halves the hourly-rate cost. At lower on-demand utilization, the committed fleet may still be billed for every reserved hour—model both assumptions below.</p>
          <div className="econ-panel reveal" data-d="1">
            <div className="price-duel">
              <div className="price-box">
                <div className="tag">Typical on-demand rate</div>
                <div className="rate">~$10</div>
                <div className="per">per GPU-hour; variable</div>
              </div>
              <div className="econ-arrow" aria-hidden="true">→</div>
              <div className="price-box ice">
                <div className="tag">ICE Castle target rate*</div>
                <div className="rate">~$5</div>
                <div className="per">per GPU-hour on a qualifying commitment</div>
              </div>
            </div>
            <div className="year-duel">
              <div className="year-cell">
                <div className="k">One GPU at $10/hour, 24/7</div>
                <div className="v" data-count="87600" data-prefix="$">$87,600</div>
                <div className="k" style={{ marginTop: "6px" }}>per year</div>
              </div>
              <div className="year-arrow" aria-hidden="true">→</div>
              <div className="year-cell">
                <div className="k">One GPU at $5/hour, 24/7</div>
                <div className="v" data-count="43800" data-prefix="$">$43,800</div>
                <div className="k" style={{ marginTop: "6px" }}>per year</div>
              </div>
              <div className="year-arrow" aria-hidden="true">→</div>
              <div className="year-cell highlight">
                <div className="k">Illustrative annual difference</div>
                <div className="v" data-count="43800" data-prefix="~$">~$43,800</div>
                <div className="k" style={{ marginTop: "6px" }}>per GPU / year</div>
              </div>
            </div>
            <div className="scrub" aria-hidden="true">
              <div className="scrub-top">
                <span className="k">Illustrative rate comparison</span>
                <span className="num" id="scrub-num">~$5.00</span>
              </div>
              <div className="scrub-track"><div className="scrub-fill" id="scrub-fill"></div></div>
              <div className="scrub-ends"><span>~$10 / GPU-HR</span><span>~$5 / GPU-HR*</span></div>
            </div>
          </div>
          <div className="fifty reveal">
            <div className="big" data-count="41" data-suffix="%">41%</div>
            <div className="cap">Illustrative annual spend reduction at 85% on-demand utilization, with reserved hours billed in full.<br /><strong>Estimate depends on utilization and contract billing.</strong></div>
          </div>
          <p className="cta-stat reveal">At 32 GPUs running 24/7, a $5 vs. $10/GPU-hour scenario implies an illustrative <strong>~$1.4M annual difference</strong> in GPU spend—before other infrastructure costs.</p>
          <p className="assume reveal"><strong>*Illustrative only:</strong> $10 vs. $5/GPU-hour. Actual pricing depends on GPU, configuration, quantity, region and term. The ~$5 target applies only to qualifying deployments; it is not a quote.</p>
        </div>

      <div className="calc" id="calculator" aria-labelledby="calc-h">
        <div className="wrap">
          <span className="eyebrow reveal">Fleet cost estimator</span>
          <h2 id="calc-h" className="reveal">Estimate annual spend and savings.</h2>
          <p className="lede reveal">Compare current on-demand spend with reserved capacity billed for every reserved hour. This is an estimate, not a quote.</p>
          <Calculator />
        </div>
      </div>
      </section>

      <section id="faq" aria-labelledby="faq-h">
        <div className="wrap">
          <span className="eyebrow reveal">FAQ</span>
          <h2 id="faq-h" className="reveal">Resolve the key procurement questions.</h2>
          <div className="faq-grid">
            <div className="faq-cell reveal"><div className="ix">01</div><h3>What if our GPU demand changes during the term?</h3><p>The offer describes a 12–24-month commitment. The public page does not state reduction, cancellation or ramp-down rights; have those terms written into the agreement before signing.</p></div>
            <div className="faq-cell reveal" data-d="1"><div className="ix">02</div><h3>How do we verify capacity and delivery?</h3><p>Request a dated, region-specific quote naming GPU model and count, configuration, and provisioning date. The page does not publish live inventory or a standard lead time.</p></div>
            <div className="faq-cell reveal" data-d="2"><div className="ix">03</div><h3>What is included, and when are we billed?</h3><p>Payment cadence and inclusions are not published. Ask the quote to itemize compute, networking, storage, egress, support, setup fees, invoice timing and any minimums.</p></div>
            <div className="faq-cell reveal" data-d="3"><div className="ix">04</div><h3>What SLA and support will we receive?</h3><p>These are deployment-specific in the available copy. Require the uptime target, response model, support coverage and remedies to be stated in the contract.</p></div>
            <div className="faq-cell reveal" data-d="4"><div className="ix">05</div><h3>Can we keep our existing cloud for burst demand?</h3><p>Yes. The intended approach is to commit only the predictable baseline and retain cloud for spikes, experiments and workloads you cannot forecast.</p></div>
          </div>
        </div>
      </section>

      <section className="final" id="quote" aria-labelledby="final-h">
        <div className="wrap">
          <span className="eyebrow reveal">Next step</span>
          <h2 id="final-h" className="reveal">Check capacity and pricing.</h2>
          <p className="lede reveal">Share the basics. We’ll confirm availability and follow up with a deployment-specific quote.</p>
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
