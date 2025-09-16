import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

import { Card, CardContainer, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { TunnelBackground } from "@/assets/tunnel-background";
import { Schema } from "@/modules/seo/schema";
import { addBreadcrumbs } from "@/modules/seo";

export const metadata: Metadata = {
  title: "About Vegas Properties | Dubai Real Estate Experts",
  description:
    "Learn about Vegas Properties — your trusted partner in Dubai real estate. We provide tailored advice, exclusive listings, and end‑to‑end support.",
  keywords: [
    "About Vegas Properties",
    "Dubai real estate experts",
    "Dubai properties",
    "property investment Dubai",
    "off-plan properties Dubai",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Vegas Properties | Dubai Real Estate Experts",
    description:
      "Your trusted partner in Dubai real estate: tailored advice, exclusive listings, and end‑to‑end support.",
    url: "/about",
    siteName: "Vegas Properties",
    locale: "en_AE",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Vegas Properties Dubai real estate" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Vegas Properties | Dubai Real Estate Experts",
    description:
      "Your trusted partner in Dubai real estate: tailored advice, exclusive listings, and end‑to‑end support.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://www.vegasproperties.ae/"),
};

export default function AboutPage() {
  return (
    <main className="container relative min-h-screen space-y-20 pt-6 pb-12">
      <TunnelBackground className="absolute top-0 left-0 w-full" />

      <header className="relative z-20 mx-auto max-w-prose space-y-4 pt-12 text-lg" aria-labelledby="about-page-title">
        <span className="block w-full text-center font-serif text-3xl">About Us</span>
        <h1 id="about-page-title" className="text-center font-medium">
          Your trusted partner in Dubai real estate
        </h1>
      </header>

      <section className="relative z-20 mx-auto max-w-prose space-y-10" aria-labelledby="about-overview-heading">
        <div className="space-y-6 text-lg md:col-span-7">
          <h2 id="about-overview-heading" className="font-medium">
            At Vegas Properties, we don’t just sell homes — we create opportunities.
          </h2>
          <p>
            We create opportunities for people to live, invest, and thrive in one of the world’s most dynamic real
            estate markets. With years of expertise in Dubai and across the UAE, we specialize in connecting clients
            with premium properties that suit their lifestyle, investment goals, and vision for the future.
          </p>
          <p>
            Our team of dedicated professionals is passionate about delivering more than just transactions. We focus on
            building long-term relationships, ensuring every client receives tailored advice, transparent service, and
            unparalleled support throughout their real estate journey.
          </p>
          <p>
            Whether you are searching for a luxury residence, an off-plan investment, or a high-yield commercial space,
            Vegas Properties stands by your side with market insights, exclusive listings, and a commitment to
            excellence.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2" aria-labelledby="mission-vision-heading" role="region">
          <h3 id="mission-vision-heading" className="sr-only">
            Mission and vision
          </h3>
          <Card>
            <CardContent>
              <CardHeader className="pt-3">
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContainer className="pb-2">
                <p>
                  To redefine real estate experiences by combining trust, innovation, and personalized solutions—helping
                  individuals and investors unlock the true potential of Dubai’s property market.
                </p>
              </CardContainer>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <CardHeader className="pt-3">
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContainer className="pb-2">
                <p>
                  To be the most trusted and forward-thinking real estate partner, known for setting new standards in
                  client satisfaction, market expertise, and investment success.
                </p>
              </CardContainer>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="relative z-20 mx-auto max-w-prose space-y-8" aria-labelledby="why-choose-us-heading">
        <div>
          <h2 id="why-choose-us-heading" className="font-serif text-3xl">
            Why Choose Us
          </h2>
          <Separator className="mt-3 w-24" />
        </div>
        <ul className="grid gap-6 md:grid-cols-2" role="list">
          <li className="flex items-start gap-3">
            <CheckCircle2 aria-hidden="true" focusable="false" className="mt-1 h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium">Local Expertise</p>
              <p className="text-muted-foreground">Deep understanding of Dubai’s evolving real estate landscape.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 aria-hidden="true" focusable="false" className="mt-1 h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium">Exclusive Access</p>
              <p className="text-muted-foreground">Priority listings and off-market opportunities.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 aria-hidden="true" focusable="false" className="mt-1 h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium">Tailored Solutions</p>
              <p className="text-muted-foreground">Advice and property options built around your unique goals.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 aria-hidden="true" focusable="false" className="mt-1 h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium">End-to-End Support</p>
              <p className="text-muted-foreground">
                From property search to after-sales services, we’re with you every step.
              </p>
            </div>
          </li>
        </ul>

        <p>
          At Vegas Properties, we believe your next move should be more than a property decision—it should be a
          life-changing investment.
        </p>
      </section>

      <Schema schema={addBreadcrumbs([{ name: "Home", link: "/" }, { name: "About" }])} />
    </main>
  );
}
