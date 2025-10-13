import type { Metadata } from "next";
import Script from "next/script";

import { Badge } from "@/components/ui/badge";

import { IconFire } from "@/assets/icons";

import { getFeaturedProperties, getProperties } from "@/modules/properties/actions/query";
import { PropertyCard } from "@/modules/properties/component";

export const revalidate = 3600; // invalidate every hour
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Dubai Properties for Sale & Rent | Featured Listings | Vegas Properties",
  description:
    "Discover handpicked Dubai properties for sale and rent, from stunning apartments to luxury villas. Explore premium listings with Vegas Properties and find your perfect home in the heart of Dubai.",
  alternates: { canonical: "/properties" },
  openGraph: {
    title: "Dubai Properties for Sale & Rent | Featured Listings | Vegas Properties",
    description:
      "Discover handpicked Dubai properties for sale and rent, from stunning apartments to luxury villas. Explore premium listings with Vegas Properties and find your perfect home in the heart of Dubai.",
    url: "/properties",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dubai Properties for Sale & Rent | Featured Listings | Vegas Properties",
    description:
      "Discover handpicked Dubai properties for sale and rent, from stunning apartments to luxury villas. Explore premium listings with Vegas Properties and find your perfect home in the heart of Dubai.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function PropertiesPage() {
  const properties = await getProperties();
  const featured = await getFeaturedProperties();

  return (
    <main className="container space-y-20 pt-6 pb-12">
      <section aria-labelledby="featured-properties-heading" className="space-y-4" id="featured-properties">
        <nav aria-label="Breadcrumb" className="text-muted-foreground text-sm">
          <ol className="flex items-center gap-2">
            <li>
              <a href="/">Home</a>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              Properties
            </li>
          </ol>
        </nav>
        <header className="space-y-4">
          <Badge aria-hidden="true">
            <IconFire />
            Featured
          </Badge>
          <div className="grid gap-3 md:grid-cols-2">
            <h2
              className="text-balance text-center font-serif text-2xl md:text-left md:text-4xl"
              id="featured-properties-heading"
            >
              Featured Properties
            </h2>
            <p className="text-balance text-center font-light leading-relaxed md:text-left">
              Discover our handpicked selection of featured properties, each carefully selected for their exceptional
              quality and unique features.
            </p>
          </div>
        </header>
        <ul
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4"
          role="list"
        >
          {featured.map((property) => (
            <li className="contents" key={property.id}>
              <PropertyCard property={property} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="all-properties-heading" className="space-y-4" id="all-properties">
        <header className="space-y-4">
          <Badge aria-hidden="true">Properties</Badge>
          <div className="grid gap-3 md:grid-cols-2">
            <h1
              className="text-balance text-center font-serif text-2xl md:text-left md:text-4xl"
              id="all-properties-heading"
            >
              Premium Properties in the <br />
              <span className="text-brand-600">best locations</span>
            </h1>
            <p className="text-balance text-center font-light leading-relaxed md:text-left">
              Discover handpicked Dubai properties for sale and rent, from stunning apartments to luxury villas. Explore
              premium listings with Vegas Properties and find your perfect home in the heart of Dubai.
            </p>
          </div>
        </header>

        <ul
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4"
          role="list"
        >
          {properties.docs.map((property) => (
            <li className="contents" key={property.id}>
              <PropertyCard property={property} />
            </li>
          ))}
        </ul>
      </section>
      <Script id="breadcrumbs-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: "Properties", item: "/properties" },
          ],
        })}
      </Script>
    </main>
  );
}
