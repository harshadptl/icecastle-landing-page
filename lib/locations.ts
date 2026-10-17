export type Location = {
  region: string;
  lat: number;
  lng: number;
};

// Pins sit on each region's main data-center hub; the site names regions, not facilities.
export const locations: Location[] = [
  { region: "Texas", lat: 32.78, lng: -96.8 },
  { region: "Ohio", lat: 39.96, lng: -82.99 },
  { region: "Virginia", lat: 39.04, lng: -77.49 },
  { region: "Ontario, Canada", lat: 43.65, lng: -79.38 },
  { region: "Alberta, Canada", lat: 51.05, lng: -114.07 },
];

// Shared by every location.
export const specs = [
  { k: "GPU capacity", v: "100–200 GPUs" },
  { k: "Compliance", v: "HIPAA · SOC 2" },
  { k: "Power", v: "Surge power headroom" },
  { k: "Cooling", v: "Air & liquid cooling" },
];
