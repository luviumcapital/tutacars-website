import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tuta Cars — The clearer way to buy a car",
  description: "Compare independently inspected cars with real ownership costs and 48-hour test drives from Tuta Cars.",
  keywords: "used cars, inspected cars, car marketplace, test drive, Tuta Cars",
  openGraph: {
    title: "Tuta Cars — The clearer way to buy a car",
    description: "Independent inspections. Real ownership costs. A better way to find your next car.",
    url: "https://tutacars.co.za",
    siteName: "Tuta Cars",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
