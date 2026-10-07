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
