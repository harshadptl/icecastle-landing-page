/**
 * Schema.org structured data for SEO + AI answer discovery.
 * Used in layout metadata and JSON-LD script tags.
 */

export const SITE_URL = "https://www.icecastle.si";
/** Bump when homepage copy changes; feeds visible "Updated" line and schema dateModified. */
export const HOME_UPDATED = "2026-10-13";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ICE Castle",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description:
    "NVIDIA B200/B300 GPU capacity for sustained AI workloads. 36-month minimum commitments with an indicative ~$5/GPU-hour target.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Sales",
    email: "hello@icecastle.ai",
  },
  sameAs: [
    // Links to social profiles (add as needed)
  ],
};

export const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "NVIDIA B200/B300 GPU Capacity",
  url: SITE_URL,
  description:
    "Reserved GPU capacity on long-term commitments. B200 and B300 GPUs for LLM inference, training, fine-tuning, and multimodal workloads.",
  brand: {
    "@type": "Brand",
    name: "ICE Castle",
  },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "5",
    highPrice: "10",
    offerCount: 2,
    description: "Indicative pricing range (~$5/GPU-hour for qualifying commitments vs ~$10/GPU-hour on-demand).",
  },
};

/** Single source for the homepage FAQ: rendered on the page and as FAQPage schema, so they never drift. */
export const faqs = [
  {
    q: "What if our GPU demand changes during the term?",
    a: "The offer is a 36-month minimum commitment. The page does not state reduction, cancellation or ramp-down rights. Get those terms written into the agreement before you sign.",
  },
  {
    q: "How do we verify capacity and delivery?",
    a: "Ask for a dated, region-specific quote. It should name the GPU model and count, the configuration, and the provisioning date. We do not publish live inventory or a standard lead time.",
  },
  {
    q: "What is included, and when are we billed?",
    a: "Payment cadence and inclusions are set per deployment. Ask the quote to itemize compute, networking, storage, egress, support, setup fees, invoice timing and any minimums.",
  },
  {
    q: "What SLA and support will we receive?",
    a: "SLA and support are deployment-specific. Require the uptime target, response model, support coverage and remedies to be stated in the contract.",
  },
  {
    q: "Can we keep our existing cloud for burst demand?",
    a: "Yes. Commit only the predictable baseline. Keep cloud for spikes, experiments and workloads you cannot forecast.",
  },
];

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const publisher = { "@type": "Organization", name: "ICE Castle", url: SITE_URL };

/** "OCT 13, 2026" -> "2026-10-13" (article dates are stored display-formatted). */
export function isoDate(display: string): string {
  const d = new Date(display);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Reserved NVIDIA B200/B300 GPU capacity",
  url: SITE_URL,
  dateModified: HOME_UPDATED,
  about: [
    { "@type": "Thing", name: "Nvidia", sameAs: "https://en.wikipedia.org/wiki/Nvidia" },
    { "@type": "Thing", name: "Blackwell (microarchitecture)", sameAs: "https://en.wikipedia.org/wiki/Blackwell_(microarchitecture)" },
    { "@type": "Thing", name: "Graphics processing unit", sameAs: "https://en.wikipedia.org/wiki/Graphics_processing_unit" },
  ],
  publisher,
};

export function blogSchema(posts: { slug: string; title: string; date: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "ICE Castle GPU Pricing & Infrastructure Blog",
    url: `${SITE_URL}/blog`,
    dateModified: isoDate(posts[0].date),
    publisher,
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: isoDate(p.date),
    })),
  };
}

export function articleSchema(a: { slug: string; title: string; standfirst: string; date: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.title,
    description: a.standfirst,
    url: `${SITE_URL}/blog/${a.slug}`,
    mainEntityOfPage: `${SITE_URL}/blog/${a.slug}`,
    datePublished: isoDate(a.date),
    dateModified: isoDate(a.date),
    author: { ...publisher, "@type": "Organization", name: "ICE Castle Infrastructure Team" },
    publisher,
  };
}
