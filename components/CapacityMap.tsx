"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { locations } from "@/lib/locations";

export default function CapacityMap() {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: import("leaflet").Map | undefined;
    let cancelled = false;
    // Leaflet touches window on import, so load it client-side only.
    import("leaflet").then((L) => {
      if (cancelled || !el.current) return;
      map = L.map(el.current, { scrollWheelZoom: false, attributionControl: true });
      L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
        attribution: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ",
        maxZoom: 10,
      }).addTo(map);
      for (const loc of locations) {
        L.circleMarker([loc.lat, loc.lng], { radius: 9, color: "#BDEFFF", weight: 2, fillColor: "#5CA9FF", fillOpacity: 0.85 })
          .bindTooltip(loc.region, { direction: "top", offset: [0, -8] })
          .addTo(map);
      }
      map.fitBounds(L.latLngBounds(locations.map((l) => [l.lat, l.lng])), { padding: [40, 40] });
    });
    return () => {
      cancelled = true;
      map?.remove();
    };
  }, []);

  return <div ref={el} className="cap-map" role="img" aria-label={`Map of ICE Castle GPU locations: ${locations.map((l) => l.region).join(", ")}`} />;
}
