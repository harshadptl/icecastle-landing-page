import type { Metadata } from "next";
import Link from "next/link";
import CapacityMap from "@/components/CapacityMap";
import { locations, specs } from "@/lib/locations";

export const metadata: Metadata = {
  title: "GPU Capacity by Location",
  description:
    "ICE Castle GPU capacity in Texas, Ohio, Virginia, Ontario and Alberta: 100–200 GPUs per site, HIPAA and SOC 2, surge power headroom, air and liquid cooling.",
  alternates: { canonical: "/capacity" },
};

export default function CapacityPage() {
  return (
    <main id="capacity-page" className="blog-view" aria-label="GPU capacity by location">
      <div className="wrap">
        <Link className="back-link" href="/">
          <span aria-hidden="true">&larr;</span> Home
        </Link>
        <span className="eyebrow reveal">Capacity</span>
        <h1 className="a-h1 reveal">GPU capacity by location.</h1>
        <p className="lede reveal">
          Five sites across the US and Canada. Each offers 100–200 GPUs, HIPAA and SOC 2 compliance, surge power
          headroom, and air or liquid cooling. Availability is confirmed per deployment.
        </p>
        <CapacityMap />
        <ul className="cap-grid">
          {locations.map((loc) => (
            <li key={loc.region} className="cap-card">
              <h2>{loc.region}</h2>
              <dl>
                {specs.map((s) => (
                  <div key={s.k}>
                    <dt>{s.k}</dt>
                    <dd>{s.v}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
        <div className="center-cta">
          <Link href="/#quote" className="btn btn-primary">
            Check capacity &amp; pricing <span className="arr">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
