import type { Metadata } from "next";

import "@/styles/globals.css";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

import { dmSerif, neueMontreal, nohemi } from "@/assets/fonts";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dubai Properties for Sale & Rent - Vegas Properties",
  description:
    "Discover luxury villas, apartments, and townhouses in Dubai. Explore premium listings, flexible payment plans, and top communities with Vegas Properties.",
  keywords: [
    "Dubai properties",
    "Dubai real estate",
    "apartments for sale Dubai",
    "villas for sale Dubai",
    "properties for rent Dubai",
    "luxury real estate Dubai",
    "off-plan properties Dubai",
  ],

  openGraph: {
    title: "Dubai Properties for Sale & Rent - Vegas Properties",
    description:
      "Discover luxury villas, apartments, and townhouses in Dubai. Explore premium listings, flexible payment plans, and top communities with Vegas Properties.",
    url: "https://www.vegasproperties.ae/",
    siteName: "Vegas Properties",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Vegas Properties Dubai real estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dubai Properties for Sale & Rent - Vegas Properties",
    description:
      "Discover luxury villas, apartments, and townhouses in Dubai. Explore premium listings, flexible payment plans, and top communities with Vegas Properties.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://www.vegasproperties.ae/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en">
      <body className={cn(neueMontreal.className, dmSerif.variable, nohemi.variable, "antialiased")}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
