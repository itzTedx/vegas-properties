import type { Metadata } from "next";

import "@/styles/globals.css";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Providers } from "@/components/providers";

import { dmSerif, neueMontreal, nohemi } from "@/assets/fonts";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Vegas Properties",
  description: "Professional Property Management for your dubai investment",
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
        </Providers>
      </body>
    </html>
  );
}
