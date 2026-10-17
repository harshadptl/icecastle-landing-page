import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with ICE Castle by phone, email, or LinkedIn.",
  alternates: { canonical: "/contact-us" },
};

export default function ContactUsPage() {
  return (
    <main id="contact-page" className="blog-view" aria-label="Contact Us">
      <div className="wrap">
        <Link className="back-link" href="/">
          <span aria-hidden="true">&larr;</span> Home
        </Link>
        <span className="eyebrow reveal">Contact</span>
        <h1 className="a-h1 reveal">Get in touch.</h1>
        <p className="lede reveal">
          Phone: <a href="tel:+13023084330">+1-302-308-4330</a>
          <br />
          Email: <a href="mailto:contactus@icecastle.si">contactus@icecastle.si</a>
          <br />
          LinkedIn:{" "}
          <a href="https://www.linkedin.com/company/143992169/" target="_blank" rel="noopener noreferrer">
            ICE Castle on LinkedIn
          </a>
        </p>
      </div>
    </main>
  );
}
