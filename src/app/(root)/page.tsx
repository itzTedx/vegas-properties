import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";

import { Cta } from "@/components/layout/cta";
import { Badge } from "@/components/ui/badge";

import { IconBuilding } from "@/assets/icons";
import { IconFire } from "@/assets/icons/fire";

import { DEVELOPERS } from "@/data/constants";
import { cn } from "@/lib/utils";
import { FeaturedProperties } from "@/modules/properties/sections/featured-properties";
import { LatestProperties } from "@/modules/properties/sections/latest-properties";
import { getPropertiesPriceRange } from "@/modules/search/actions/query";
import { SearchFilter } from "@/modules/search/components/search-filter";
import Testimonials from "@/modules/sections/home/testimonials";
import Features from "@/modules/sections/home/why-choose-us";

export const revalidate = 3600; // invalidate every hour
export const dynamic = "force-static";

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
  alternates: {
    canonical: "https://www.vegasproperties.ae/",
  },
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
};

export default async function Home() {
  const { max, min } = await getPropertiesPriceRange();
  const MAX_WIDTH = "max-w-5xl";
  return (
    <>
      <main id="main-content">
        <section aria-labelledby="home-hero-heading" className="md:px-2 md:py-2" id="home-hero">
          <div className="relative flex h-[calc(100svh-3rem)] items-end overflow-hidden p-6 sm:h-96 md:h-[32rem] md:rounded-2xl lg:h-[40rem]">
            <div className={cn("relative z-50 mx-auto pb-14 text-white", MAX_WIDTH)}>
              <h1 className="font-serif text-3xl md:text-4xl" id="home-hero-heading">
                Find Your Perfect Property in Dubai’s Most Prestigious Communities
              </h1>
              <p className="sm:-tracking-[0.24px] mt-3 leading-relaxed sm:text-sm md:text-lg">
                Discover luxury apartments, villas, and townhouses designed for modern living. Explore exclusive
                neighborhoods with world-class amenities and flexible payment plans.
              </p>
            </div>
            <Image
              alt="Dubai luxury properties skyline at sunset - Vegas Properties"
              className="object-cover"
              fill
              priority
              sizes="100vw"
              src="/images/hero-image.webp"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
          </div>
          <div aria-label="Property search" role="search">
            <SearchFilter
              className="md:-mt-12 mt-6 hidden shadow-xl md:flex"
              prices={{
                max,
                min,
              }}
              width={MAX_WIDTH}
            />
          </div>
        </section>

        <section aria-labelledby="featured-heading" className="container pt-6 pb-14" id="featured">
          <div className="space-y-4">
            <Badge>
              <IconFire aria-hidden="true" focusable="false" />
              Featured
            </Badge>
            <div className="grid gap-3 md:grid-cols-2">
              <h2 className="text-balance font-medium font-serif text-2xl md:text-4xl" id="featured-heading">
                <span className="text-secondary-900">Handpicked</span> Properties for You
              </h2>
              <p className="text-balance leading-relaxed">
                Discover handpicked Dubai properties for sale and rent, from stunning apartments to luxury villas.
                Explore premium listings with Vegas Properties and find your perfect home in the heart of Dubai.
              </p>
            </div>
          </div>

          <FeaturedProperties />
        </section>
        <section aria-labelledby="latest-heading" className="container py-14" id="latest">
          <div className="space-y-4">
            <Badge>
              <IconBuilding aria-hidden="true" focusable="false" />
              Properties
            </Badge>
            <div className="grid gap-3 md:grid-cols-2">
              <h2 className="text-balance font-medium font-serif text-2xl md:text-4xl" id="latest-heading">
                Premium Properties in the <br />
                <span className="text-secondary-900">best locations</span>
              </h2>
              <p className="text-balance leading-relaxed">
                Discover handpicked Dubai properties for sale and rent, from stunning apartments to luxury villas.
                Explore premium listings with Vegas Properties and find your perfect home in the heart of Dubai.
              </p>
            </div>
          </div>

          <LatestProperties />
        </section>
        {/* <section className="container grid grid-cols-2 gap-4 py-14">
          <div className="space-y-4 py-6">
            <h2 className="text-balance font-medium font-sans text-2xl md:text-4xl">
              Your dream property in Dubai might be closer than you think.
            </h2>
            <p className="text-balance leading-relaxed">
              Each Vegas Properties listing offers world-class architecture, unmatched quality, and prime locations
              across Dubai’s most prestigious communities.
            </p>
            <Button>Find the best for you</Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-card p-6">
              <h3 className="mb-2 font-medium text-2xl">Discover a lifestyle upgrade</h3>
              <p>
                From waterfront villas to skyline-view apartments, our properties redefine modern luxury. Designed for
                elegance, comfort, and long-term value.
              </p>
            </div>
            <div className="row-span-2 bg-card p-6">
              <h3 className="mb-2 font-medium text-2xl">Big opportunities in every space.</h3>
              <p>
                With curated layouts and premium finishes, every property maximizes functionality and style—whether for
                investment or personal living.
              </p>
            </div>
            <div className="bg-card p-6">
              <h3 className="mb-2 font-medium text-2xl">Pricing starts at AED 950K</h3>
              <p>
                Your entry into Dubai’s property market begins here. Explore handpicked listings with flexible payment
                options.
              </p>
            </div>
          </div>
        </section> */}
        {/* <FeaturesSection /> */}
        <Features />
        <section aria-labelledby="developers-heading" className="container max-w-7xl py-14" id="developers">
          <div className="space-y-4">
            <Badge variant="outline">Backed by Top Property Developers</Badge>

            <h2 className="max-w-4xl text-balance font-medium font-serif text-2xl md:text-4xl" id="developers-heading">
              Exclusive projects from <span className="text-secondary-900">world-class developers</span> including:
            </h2>
            <ul aria-label="Top real estate developers" className="mt-9 grid grid-cols-3 gap-4 sm:grid-cols-6">
              {DEVELOPERS.map((dev) => (
                <li className="relative flex aspect-video overflow-hidden rounded-md bg-card" key={dev.src}>
                  <Image alt={dev.alt} className="m-auto" height={80} loading="lazy" src={dev.src} width={80} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Testimonials />
        <Cta />

        {/* Structured Data */}
        <Script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Vegas Properties",
              url: "https://www.vegasproperties.ae/",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://www.vegasproperties.ae/search?q={search_term_string}",
                },
                queryInput: "required name=search_term_string",
              },
            }),
          }}
          key="ld-json-website"
          type="application/ld+json"
        />
        <Script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Vegas Properties",
              url: "https://www.vegasproperties.ae/",
              logo: "https://www.vegasproperties.ae/logo.png",
              sameAs: [
                "https://www.facebook.com/",
                "https://www.instagram.com/",
                "https://www.linkedin.com/",
                "https://x.com/",
              ],
            }),
          }}
          key="ld-json-organization"
          type="application/ld+json"
        />
      </main>
    </>
  );
}
