import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="foot-brand">ICE CASTLE</div>
            <p>
              Your AI infrastructure. Locked in.
              <br />
              Stop renting expensive GPU hours. Start locking in the compute your AI business depends on.
            </p>
            <p>© 2026 ICE Castle. All rights reserved.</p>
            <p>
              <Link href="https://www.icecastle.si/capacity">Capacity</Link> · <Link href="https://www.icecastle.si/contact-us">Contact Us</Link> · <Link href="https://www.icecastle.si/privacy-policy">Privacy Policy</Link>
            </p>
            <a
              href="https://www.linkedin.com/company/143992169/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ICE Castle on LinkedIn"
              className="foot-social"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM3.56 20.45h3.56V9H3.56v11.45Z" />
              </svg>
            </a>
          </div>
          <div>
            <p>
              <strong style={{ color: "var(--text)" }}>Illustrative pricing.</strong> Figures on this page are
              examples based on 24/7 utilization unless noted. Actual pricing depends on GPU type, node
              configuration, commitment length, region, networking and deployment. $5/hr is a target/starting rate
              for qualifying long-term commitments; B200 / B300 capacity is available through qualifying
              deployments.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
