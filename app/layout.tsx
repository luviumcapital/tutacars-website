import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tuta Cars — South Africa's Franchise Dealer Network",
  description: "54 exclusive territories. Technology-backed dealership operations. Floor plan finance from Month 6.",
  keywords: "car dealer franchise South Africa, Tuta Cars, automotive franchise, floor plan finance",
  openGraph: {
    title: "Tuta Cars — South Africa's Franchise Dealer Network",
    description: "54 exclusive territories. Technology-backed operations. Floor plan finance from Month 6.",
    url: "https://tutacars.co.za",
    siteName: "Tuta Cars",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-[#0A0A0A] text-white antialiased">{children}</body>
    </html>
  );
}
