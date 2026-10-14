/**
 * Schema.org structured data for SEO + AI answer discovery.
 * Used in layout metadata and JSON-LD script tags.
 */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ICE Castle",
  url: "https://icecastle.ai",
  logo: "https://icecastle.ai/logo.png",
  description:
    "NVIDIA B200/B300 GPU capacity for sustained AI workloads. 12–24-month commitments with an indicative ~$5/GPU-hour target.",
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

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is ICE Castle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ICE Castle provides reserved NVIDIA B200/B300 GPU capacity on 12–24-month commitments with an indicative ~$5/GPU-hour target for sustained AI workloads like inference, training, and fine-tuning.",
      },
    },
    {
      "@type": "Question",
      name: "Who should use ICE Castle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Best fit: AI teams with $50K+ monthly GPU spend and a predictable 24/7 baseline. Ideal for LLM inference, video generation, training, and other sustained workloads.",
      },
    },
    {
      "@type": "Question",
      name: "How much does it cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Indicative ~$5/GPU-hour on qualifying 12–24-month commitments (deployment-specific). Typical on-demand rates are ~$10/GPU-hour, so a committed rate can cut costs ~50% at full utilization.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between reserved and on-demand?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On-demand GPU rates are higher (~$10/GPU-hour) but you pay only for what you use. Reserved capacity locks in a lower rate (~$5/GPU-hour) for a committed term, reducing cost at the expense of flexibility.",
      },
    },
    {
      "@type": "Question",
      name: "What are qualifying deployments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Qualifying deployments are predictable, sustained 24/7 AI workloads. The ~$5/GPU-hour target applies to long-term commitments (12–24 months) where you can forecast your GPU usage.",
      },
    },
  ],
};
