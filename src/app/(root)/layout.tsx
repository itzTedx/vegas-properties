import type { Metadata } from "next";

import "@/styles/globals.css";

import { Navbar } from "@/components/layout/navbar";
import { Providers } from "@/components/providers";

import { dmSerif, inter, nohemi } from "@/assets/fonts";

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
    <html lang="en">
      <body className={cn(inter.className, dmSerif.variable, nohemi.variable, "antialiased")}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
