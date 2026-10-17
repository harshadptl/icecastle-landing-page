import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How ICE Castle collects, uses, and protects your information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main id="privacy-page" className="blog-view" aria-label="Privacy Policy">
      <div className="wrap">
        <Link className="back-link" href="/">
          <span aria-hidden="true">&larr;</span> Home
        </Link>
        <span className="eyebrow reveal">Legal</span>
        <h1 className="a-h1 reveal">Privacy Policy</h1>
        <p className="lede reveal">Last updated: October 17, 2026</p>

        <h3>Information we collect</h3>
        <p>
          When you submit a quote request or contact form on this site, we collect the information you provide,
          such as your name, email address, company, and workload details. We also use Google Analytics (GA4) to
          collect anonymized usage data, such as pages visited and general location, to understand how visitors use
          this site.
        </p>

        <h3>How we use your information</h3>
        <p>
          We use the information you submit to respond to quote requests, answer questions, and provide information
          about our GPU capacity offerings. We do not sell your personal information to third parties.
        </p>

        <h3>Cookies and analytics</h3>
        <p>
          This site uses Google Analytics to collect aggregated, anonymized traffic data. You can opt out of Google
          Analytics tracking using your browser settings or a browser extension such as Google&rsquo;s
          Analytics Opt-out Add-on.
        </p>

        <h3>Data retention</h3>
        <p>
          We retain information you submit for as long as needed to respond to your inquiry and maintain business
          records, unless you ask us to delete it sooner.
        </p>

        <h3>Contact us</h3>
        <p>
          For questions about this policy or to request access to, correction of, or deletion of your data, contact
          us at <a href="mailto:contactus@icecastle.si">contactus@icecastle.si</a> or see our{" "}
          <Link href="/contact-us">Contact Us</Link> page.
        </p>
      </div>
    </main>
  );
}
