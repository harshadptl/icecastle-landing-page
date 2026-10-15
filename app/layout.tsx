import type { Metadata, Viewport } from "next";
import { Inter, Manrope, IBM_Plex_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SiteEffects from "@/components/SiteEffects";
import StructuredData from "@/components/StructuredData";
import { SITE_URL, organizationSchema } from "@/lib/structured-data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Reserved NVIDIA B200/B300 GPUs at ~$5/GPU-Hour — ICE Castle",
    template: "%s — ICE Castle",
  },
  description:
    "ICE Castle reserves NVIDIA B200/B300 GPUs for sustained AI workloads at a ~$5/GPU-hour target on 36-month terms, vs ~$10 typical on-demand.",
  openGraph: {
    siteName: "ICE Castle",
    type: "website",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
  themeColor: "#05070B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} ${plexMono.variable}`}>
      <head>
        <StructuredData schemas={[organizationSchema]} />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
        <SiteEffects />
      </body>
    </html>
  );
}
