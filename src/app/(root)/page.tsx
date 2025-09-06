import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";

import { DEVELOPERS } from "@/data/constants";
import { cn } from "@/lib/utils";
import { FeaturedProperties } from "@/modules/properties/sections/featured-properties";
import { SearchFilter } from "@/modules/search/components/search-filter";

export default function Home() {
  const MAX_WIDTH = "max-w-4xl";
  return (
    <main>
      <section className="px-8 py-4">
        <div className="relative flex h-96 items-end overflow-hidden rounded-2xl p-6 md:h-[32rem]">
          <div className={cn("relative z-50 mx-auto text-white md:pb-14", MAX_WIDTH)}>
            <h1 className="font-serif text-2xl md:text-4xl">
              Find Your Perfect Property in Dubai’s Most Prestigious Communities
            </h1>
            <p className="-tracking-[0.32px] mt-3 font-light text-sm leading-relaxed md:text-lg">
              Discover luxury apartments, villas, and townhouses designed for modern living. Explore exclusive
              neighborhoods with world-class amenities and flexible payment plans.
            </p>
          </div>
          <Image alt="Hero Background" className="object-cover" fill src="/images/hero-bg.jpg" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
        </div>
        <SearchFilter className="md:-mt-12 mt-6" width={MAX_WIDTH} />
      </section>
      <section className="container py-14">
        <div className="space-y-4">
          <Badge>Featured</Badge>
          <div className="grid gap-3 md:grid-cols-2">
            <h2 className="text-balance font-serif text-2xl md:text-4xl">
              <span className="text-brand-600">Handpicked</span> Properties for You
            </h2>
            <p className="text-balance font-light text-sm leading-relaxed tracking-[-0.32px]">
              Discover handpicked Dubai properties for sale and rent, from stunning apartments to luxury villas. Explore
              premium listings with Vegas Properties and find your perfect home in the heart of Dubai.
            </p>
          </div>
        </div>

        <FeaturedProperties />
      </section>
      <section className="container py-14">
        <div className="space-y-4">
          <Badge>Properties</Badge>
          <div className="grid gap-3 md:grid-cols-2">
            <h2 className="text-balance font-serif text-2xl md:text-4xl">
              Premium Properties in the <br />
              <span className="text-brand-600">best locations</span>
            </h2>
            <p className="text-balance font-light text-sm leading-relaxed tracking-[-0.32px]">
              Discover handpicked Dubai properties for sale and rent, from stunning apartments to luxury villas. Explore
              premium listings with Vegas Properties and find your perfect home in the heart of Dubai.
            </p>
          </div>
        </div>

        {/* <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
        </div> */}
      </section>
      <section className="container py-14">
        <div className="space-y-4">
          <Badge>Backed by Top Property Developers</Badge>

          <ul className="mt-2 grid grid-cols-6 gap-4">
            <li className="col-span-3">
              <h2 className="text-balance font-serif text-2xl md:text-4xl">
                Exclusive projects from <span className="text-brand-600">world-class developers</span> including:
              </h2>
            </li>
            {DEVELOPERS.map((dev) => (
              <li className="relative flex aspect-video bg-card" key={dev.src}>
                <Image alt={dev.alt} className="m-auto" height={120} src={dev.src} width={120} />
              </li>
            ))}

            <li className="relative flex aspect-video bg-card">
              <Link className="m-auto" href="/">
                View All
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
