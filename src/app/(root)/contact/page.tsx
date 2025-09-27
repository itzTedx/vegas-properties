import type { Metadata } from "next";
import Script from "next/script";

import { Cta } from "@/components/layout/cta";

import { ContactForm } from "./form";
import { SectionHeader } from "./section-header";

type SearchParams = Promise<{ message: string | undefined }>;
interface Props {
  searchParams: SearchParams;
}

export const metadata: Metadata = {
  title: "Contact Us | Vegas Properties",
  description:
    "Get in touch with Vegas Properties in Dubai. Questions about our properties or services? Our team is ready to help.",
  alternates: {
    canonical: "/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Contact Us | Vegas Properties",
    description:
      "Get in touch with Vegas Properties in Dubai. Questions about our properties or services? Our team is ready to help.",
    url: "https://vegasproperties.com/contact",
    siteName: "Vegas Properties",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Vegas Properties",
    description:
      "Get in touch with Vegas Properties in Dubai. Questions about our properties or services? Our team is ready to help.",
  },
};

export default async function ContactPage({ searchParams }: Props) {
  const query = await searchParams;

  return (
    <main className="pt-4 sm:pt-9 md:pt-12">
      <Script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            name: "Vegas Properties",
            url: "https://vegasproperties.com",
            email: "info@vegasproperties.com",
            telephone: "+97141234567",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Dubai",
              addressCountry: "AE",
            },
            areaServed: "AE",
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer support",
              email: "info@vegasproperties.com",
              telephone: "+97141234567",
              areaServed: "AE",
              availableLanguage: ["en", "ar"],
            },
          }),
        }}
        id="ld-json-contact"
        strategy="afterInteractive"
        type="application/ld+json"
      />
      <section aria-label="Contact Vegas Properties" className="container relative pb-9 sm:pb-14">
        <SectionHeader
          as="h1"
          hasHighlight
          highlightText="Conversation"
          subtitle=" Have questions about our properties or services? We're here to
          help. Fill out the form below and our team will get back to you
          shortly."
          title={`Let's Start\na Conversation`}
        />
        <div className="mt-8 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-3 lg:gap-8">
          <ContactForm initialMessage={query?.message} />
          <aside className="lg:col-span-1">
            <h2 className="font-jaguar text-2xl sm:text-3xl">Other Ways to Reach Us</h2>
            <ul className="mt-4 grid grid-cols-1 gap-4 sm:gap-6">
              <li className="group rounded-lg border p-4 transition-colors duration-300 hover:border-primary/50 sm:p-6">
                <h3 className="mb-2 font-medium text-lg sm:text-xl">Office Location</h3>
                <address className="text-muted-foreground text-sm not-italic sm:text-base">
                  Dubai, United Arab Emirates
                </address>
              </li>
              <li className="group rounded-lg border p-4 transition-colors duration-300 hover:border-primary/50 sm:p-6">
                <h3 className="mb-2 font-medium text-lg sm:text-xl">Email</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  <a className="transition-colors hover:text-primary" href="mailto:info@vegasproperties.com">
                    info@vegasproperties.com
                  </a>
                </p>
              </li>
              <li className="group rounded-lg border p-4 transition-colors duration-300 hover:border-primary/50 sm:p-6">
                <h3 className="mb-2 font-medium text-lg sm:text-xl">Phone</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  <a className="transition-colors hover:text-primary" href="tel:+97141234567">
                    +971 4 123 4567
                  </a>
                </p>
              </li>
            </ul>
          </aside>
        </div>
      </section>
      <Cta />
    </main>
  );
}
