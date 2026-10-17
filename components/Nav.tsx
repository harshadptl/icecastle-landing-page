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
        <div className="nav-right">
          <a
            href="https://www.linkedin.com/company/143992169/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ICE Castle on LinkedIn"
            className="nav-social"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM3.56 20.45h3.56V9H3.56v11.45Z" />
            </svg>
          </a>
          <Link href={sec("quote")} className="btn btn-ghost btn-sm nav-cta">
            Check capacity &amp; pricing
          </Link>
        </div>
      </div>
    </nav>
  );
}
