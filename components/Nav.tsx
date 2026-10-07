"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const inBlog = pathname.startsWith("/blog");
  // On the landing page, keep plain hash anchors (smooth in-page scroll);
  // elsewhere, route back to the landing page section.
  const sec = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <nav className="nav" aria-label="Primary">
      <div className="nav-inner">
        <Link className="brand" href={onHome ? "#top" : "/"}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 1l7.5 4.5v9L12 19l-7.5-4.5v-9L12 1z" stroke="#BDEFFF" strokeWidth="1.6" />
            <path d="M12 1v9m0 0l7.5 4.5M12 10L4.5 14.5" stroke="#5CA9FF" strokeWidth="1.2" />
          </svg>
          ICE&nbsp;CASTLE
        </Link>
        <div className="nav-links">
          <Link href={sec("who")}>Buyer fit</Link>
          <Link href={sec("economics")}>Economics</Link>
          <Link href={sec("gpus")}>Capacity</Link>
          <Link href={sec("faq")}>FAQs</Link>
          <Link
            href="/blog"
            className={`blog-link${inBlog ? " on" : ""}`}
            aria-current={inBlog ? "page" : undefined}
          >
            Blog
          </Link>
        </div>
        <Link href={sec("quote")} className="btn btn-ghost btn-sm nav-cta">
          Check capacity &amp; pricing
        </Link>
      </div>
    </nav>
  );
}
