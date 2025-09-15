import Image from "next/image";

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

export default async function Home() {
  const { max, min } = await getPropertiesPriceRange();
  const MAX_WIDTH = "max-w-5xl";
  return (
    <main>
      <section className="px-8 py-4">
        <div className="relative flex h-96 items-end overflow-hidden rounded-2xl p-6 md:h-[32rem]">
          <div className={cn("relative z-50 mx-auto text-white md:pb-14", MAX_WIDTH)}>
            <h1 className="font-serif text-2xl md:text-4xl">
              Find Your Perfect Property in Dubai’s Most Prestigious Communities
            </h1>
            <p className="-tracking-[0.32px] mt-3 text-sm leading-relaxed md:text-lg">
              Discover luxury apartments, villas, and townhouses designed for modern living. Explore exclusive
              neighborhoods with world-class amenities and flexible payment plans.
            </p>
          </div>
          <Image alt="Hero Background" className="object-cover" fill src="/images/hero-bg.jpg" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
        </div>
        <SearchFilter
          className="md:-mt-12 mt-6 shadow-xl"
          prices={{
            max,
            min,
          }}
          width={MAX_WIDTH}
        />
      </section>
      {/* <section className="container py-14">
        <div className="grid grid-cols-2 gap-4 space-y-4">
          <h2 className="text-balance font-medium font-sans text-2xl md:text-4xl">
            Your dream property in Dubai might be closer than you think.
          </h2>
          <p className="text-balance text-sm leading-relaxed">
            Each Vegas Properties listing offers world-class architecture, unmatched quality, and prime locations across
            Dubai’s most prestigious communities.
          </p>
        </div>
        <div className="grid grid-cols-4 grid-rows-4 gap-3">
          <div className="col-span-2 row-span-4 bg-card">
            <h3>Discover a lifestyle upgrade</h3>
            <p>
              From waterfront villas to skyline-view apartments, our properties redefine modern luxury. Designed for
              elegance, comfort, and long-term value.
            </p>
          </div>
          <div className="row-span-3 bg-card">
            <h3>Big opportunities in every space.</h3>
            <p>
              With curated layouts and premium finishes, every property maximizes functionality and style—whether for
              investment or personal living.
            </p>
          </div>
          <div className="row-span-3 bg-card">
            <h3>Pricing starts at AED 950K</h3>
            <p>
              Your entry into Dubai’s property market begins here. Explore handpicked listings with flexible payment
              options.
            </p>
          </div>

          <div className="col-span-2 row-span-1 bg-card">
            <h3>Discover a lifestyle upgrade</h3>
            <p>
              From waterfront villas to skyline-view apartments, our properties redefine modern luxury. Designed for
              elegance, comfort, and long-term value.
            </p>
          </div>
        </div>
      </section> */}
      <section className="container pb-14">
        <div className="space-y-4">
          <Badge>
            <IconFire />
            Featured
          </Badge>
          <div className="grid gap-3 md:grid-cols-2">
            <h2 className="text-balance font-medium font-sans text-2xl md:text-4xl">
              <span className="text-brand-600">Handpicked</span> Properties for You
            </h2>
            <p className="text-balance text-sm leading-relaxed">
              Discover handpicked Dubai properties for sale and rent, from stunning apartments to luxury villas. Explore
              premium listings with Vegas Properties and find your perfect home in the heart of Dubai.
            </p>
          </div>
        </div>

        <FeaturedProperties />
      </section>
      <section className="container py-14">
        <div className="space-y-4">
          <Badge>
            <IconBuilding />
            Properties
          </Badge>
          <div className="grid gap-3 md:grid-cols-2">
            <h2 className="text-balance font-medium font-sans text-2xl md:text-4xl">
              Premium Properties in the <br />
              <span className="text-brand-600">best locations</span>
            </h2>
            <p className="text-balance text-sm leading-relaxed">
              Discover handpicked Dubai properties for sale and rent, from stunning apartments to luxury villas. Explore
              premium listings with Vegas Properties and find your perfect home in the heart of Dubai.
            </p>
          </div>
        </div>

        <LatestProperties />
      </section>

      {/* <FeaturesSection /> */}
      <Features />
      <section className="container max-w-7xl py-14">
        <div className="space-y-4">
          <Badge variant="outline">Backed by Top Property Developers</Badge>

          <ul className="mt-2 grid grid-cols-3 gap-4 sm:grid-cols-6">
            <li className="col-span-full sm:col-span-3">
              <h2 className="text-balance font-medium font-sans text-2xl md:text-4xl">
                Exclusive projects from <span className="text-brand-600">world-class developers</span> including:
              </h2>
            </li>
            {DEVELOPERS.map((dev) => (
              <li className="relative flex aspect-video overflow-hidden rounded-md bg-card" key={dev.src}>
                <Image alt={dev.alt} className="m-auto" height={80} src={dev.src} width={80} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Testimonials />
      <Cta />
    </main>
  );
}
