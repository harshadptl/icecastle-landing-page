import type { ReactNode } from "react";

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
    slug: "gpu-bill-product-economics",
    index: "01",
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
    index: "02",
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
      <p className="a-close">Compute has the same profile as electricity: mostly steady, sometimes spiky. Price the steady part like it&rsquo;s steady. Keep the cloud for the storms. The 80/20 split isn&rsquo;t a theory &mdash; it&rsquo;s what your utilization chart already says, if you read it honestly.</p>
      </>
    ),
  },
  {
    slug: "qualifying-deployments",
    index: "03",
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
      <p>First, the target rate describes deployments that look a certain way: <strong>sustained, multi-GPU baseload workloads committed for 12&ndash;24 months</strong>, in regions where capacity is secured and contracted. If your deployment matches that profile, ~$5/GPU-hour is the starting point of the conversation &mdash; not the final number, but the anchor.</p>
      <aside className="pull-stat">
        <div className="n">~$5 <span style={{ fontSize: ".45em" }}>/ GPU-hour*</span></div>
        <div className="c">Target starting rate for qualifying deployments: sustained, multi-GPU baseload, committed 12&ndash;24 months. Final pricing follows the deployment spec below.</div>
      </aside>
      <h2 className="b-h"><span className="hn">01 / THE FIVE THINGS THAT MOVE THE NUMBER</span></h2>
      <p>Five variables dominate real pricing. In order of impact:</p>
      <ul className="a-list">
        <li><span className="mk">01</span><span><strong>GPU type.</strong> A B300 is more compute than a B200 &mdash; more memory, more throughput, denser deployments. The target rate is tiered by the silicon your workload is built on, not blended into one fictional number.</span></li>
        <li><span className="mk">02</span><span><strong>Node configuration.</strong> Full 8&times;GPU nodes with high-bandwidth interconnect price differently from smaller builds. The spec we&rsquo;d sign gets quoted against the spec you actually need &mdash; no paying for a node you wouldn&rsquo;t run.</span></li>
        <li><span className="mk">03</span><span><strong>Quantity.</strong> Larger fleets price better per unit: deployment and networking costs amortize over more GPUs. Single-digit GPUss rarely clear the &ldquo;qualifying&rdquo; bar for the target rate.</span></li>
        <li><span className="mk">04</span><span><strong>Region.</strong> Power, cooling, datacenter availability and networking differ by region, and pricing follows the real deployment geography &mdash; wherever your capacity is actually secured.</span></li>
        <li><span className="mk">05</span><span><strong>Commitment.</strong> A 24-month commitment prices deeper than a 12-month one. The longer the horizon we&rsquo;re securing capacity against, the better the economics we can pass through.</span></li>
      </ul>
      <h2 className="b-h"><span className="hn">02 / WHAT THE RATE CLOSES</span></h2>
      <p>The commitment rate covers your dedicated capacity for the full term &mdash; fixed, contracted, known. Node configuration, networking, SLA, uptime target, provisioning time and support model are specified in the agreement <strong>before</strong> you sign, so the number finance models is the number you pay.</p>
      <h2 className="b-h"><span className="hn">03 / HOW A QUOTE ACTUALLY GETS BUILT</span></h2>
      <p>A quote starts with your reality, not our inventory: current GPUs, GPU type, what you&rsquo;re paying per GPU-hour, monthly spend, workload, and commitment preference. We model that against the baseload shape of your fleet. If the deployment doesn&rsquo;t qualify for the target rate, we tell you what it would take to get there &mdash; or that the model isn&rsquo;t the right fit.</p>
      <p>What we will not do: quote a rate we can&rsquo;t sustain, or imply inventory we don&rsquo;t have. B200/B300 capacity is available through qualifying deployments &mdash; if we can&rsquo;t secure the hardware your timeline needs, you&rsquo;ll hear that before anything else.</p>
      <p className="a-close">&ldquo;Qualifying deployments&rdquo; isn&rsquo;t a loophole &mdash; it&rsquo;s the definition of the deployments the model serves. Sustained, multi-GPU, committed compute gets the target rate because that compute is what the whole company is built to deliver.</p>
      </>
    ),
  },
  {
    slug: "operating-infrastructure",
    index: "04",
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
      <p><strong>Committed:</strong> forecast compute &rarr; reserve capacity &rarr; lock the rate for 12&ndash;24 months &rarr; build the business on known cost. Growth multiplies a number you chose, not a market price you inherited.</p>
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
    index: "05",
    title: "The 1–2 year commitment question, answered honestly",
    category: "Honest answers",
    kicker: "Honest answers · 5 min read",
    excerpt: "When long-term GPU leasing makes sense, when it doesn’t — and the risks we’d talk you out of signing.",
    standfirst: "When long-term GPU leasing makes sense, when it doesn’t — and the risks we’d talk you out of signing.",
    date: "SEP 02, 2026",
    readTime: "5 MIN READ",
    next: "gpu-bill-product-economics",
    body: (
      <>
      <p>&ldquo;Why would I commit for two years?&rdquo; is the single best question a buyer can ask us, and we take it as a compliment every time. A company that asks it is already thinking about compute the right way. Here&rsquo;s our honest answer &mdash; including the cases where we&rsquo;d tell you not to sign.</p>
      <p>The core claim is simple: <strong>if you&rsquo;d bet your job that you&rsquo;ll still need these GPUs in month 18, committing is just prepaying a cost you were going to pay &mdash; at a materially lower rate.</strong> Everything else is risk management.</p>
      <h2 className="b-h"><span className="hn">01 / WHEN IT MAKES SENSE</span></h2>
      <ul className="a-list">
        <li><span className="mk">01</span><span><strong>Sustained utilization.</strong> Your fleet runs hot, month after month &mdash; average utilization above 70&ndash;80%, with no meaningful idle weeks.</span></li>
        <li><span className="mk">02</span><span><strong>The bill is real.</strong> You&rsquo;re already spending $50k+/month on GPU compute. At this scale the commitment math usually wins by enough to matter in the board deck.</span></li>
        <li><span className="mk">03</span><span><strong>Production workloads.</strong> The committed capacity serves production inference, recurring training, or steady generation pipelines &mdash; not experiments you&rsquo;re still discovering.</span></li>
        <li><span className="mk">04</span><span><strong>Growth is the shape.</strong> Demand is flat-to-growing over 12&ndash;24 months, so committed capacity gets absorbed rather than stranded.</span></li>
      </ul>
      <h2 className="b-h"><span className="hn">02 / WHEN IT DOESN&rsquo;T</span></h2>
      <ul className="a-list">
        <li><span className="mk">01</span><span><strong>Still finding fit.</strong> If your workload mix changes every quarter, you need flexibility, not a rate.</span></li>
        <li><span className="mk">02</span><span><strong>Spiky or seasonal.</strong> Bursts that come and go belong on cloud elasticity &mdash; locking in idle capacity is the one way to make this model lose money.</span></li>
        <li><span className="mk">03</span><span><strong>Short runway.</strong> If the next 12 months are uncertain for the business itself, infrastructure commitments are the wrong kind of bet.</span></li>
        <li><span className="mk">04</span><span><strong>Tiny fleets.</strong> A handful of GPUs won&rsquo;t carry commitment economics. The model earns its keep at production scale.</span></li>
      </ul>
      <p>We mean this sincerely: we&rsquo;d rather lose a deal than sell a commitment that strands you. A stranded commitment isn&rsquo;t revenue &mdash; it&rsquo;s a story we don&rsquo;t want told about us.</p>
      <aside className="pull-stat">
        <div className="n">$50K / month</div>
        <div className="c">At this spend level, the economics of a committed baseline usually win by enough that the question flips: what justifies staying on demand at all?</div>
      </aside>
      <h2 className="b-h"><span className="hn">03 / THE RISKS, STATED PLAINLY</span></h2>
      <p><strong>GPU capacity generations.</strong> A two-year commitment could, in theory, strand you on last year&rsquo;s silicon. The practical antidote: commit the baseload you know runs on today&rsquo;s architecture, and keep growth on flexible capacity that can absorb new generations as they ship.</p>
      <p><strong>Forecast error.</strong> You might over-commit. The antidote is baseload math: commit the floor you can prove from trailing data &mdash; the 10th-percentile week, not the average &mdash; so the worst case is that extra demand stays on the cloud.</p>
      <p><strong>Counterparty risk.</strong> You&rsquo;re trusting a provider to be there for 24 months. This is why agreements specify node configuration, networking, SLA, uptime target and support in writing before anything is signed &mdash; and why we publish the spec we&rsquo;d want to read.</p>
      <h2 className="b-h"><span className="hn">04 / THE DECISION RULE</span></h2>
      <p>Forget the spreadsheet for a minute. The rule: if month-18 demand feels like a forecast you would defend to your board, a commitment turns variable spend into a fixed line item at a lower rate. If it feels like a guess, keep the flexibility and revisit when the fog clears.</p>
      <p>Our job is to model the difference with your real numbers &mdash; and when the honest answer is &ldquo;not yet,&rdquo; to say so. The companies that commit when it fits tend to do it again. The ones that commit when it doesn&rsquo;t tend to tell everyone. We know which outcome gets chosen.</p>
      <p className="a-close">Long-term leasing isn&rsquo;t for everyone. For the fleet that&rsquo;s hot, growing, and production-proven, it&rsquo;s simply the arithmetic winning over habit. And when it doesn&rsquo;t make sense, the job of an infrastructure partner is to say that first.</p>
      </>
    ),
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
