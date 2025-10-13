import type { Metadata } from "next";

import { Cta } from "@/components/layout/cta";

import { pluralize } from "@/lib/functions/pluralize";
import { PropertyCard } from "@/modules/properties/component";
import { getPropertiesPriceRange, searchQuery } from "@/modules/search/actions/query";
import { SearchFilter } from "@/modules/search/components/search-filter";

interface Props {
  searchParams: Promise<{
    type: string;
    query: string;
    bedrooms: string;
    priceRange: string;
  }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const query = await searchParams;
  const parts: string[] = ["Search result for"];
  if (query?.type) parts.push(query.type);
  if (query?.bedrooms) parts.push(`${query.bedrooms} bedrooms`);
  if (query?.query) parts.push(`${query.query}`);

  const titleBase = parts.length > 0 ? parts.join(" ") : "Search Results";
  const title = `${titleBase} | Vegas Properties`;

  const desc =
    parts.length > 0
      ? `Browse ${titleBase.toLowerCase()} on Vegas Properties. Explore listings with photos, pricing, and details.`
      : "Browse property search results on Vegas Properties. Explore listings with photos, pricing, and details.";

  const queryString = new URLSearchParams(
    Object.entries(query || {}).reduce<Record<string, string>>((acc, [k, v]) => {
      if (typeof v === "string" && v.length > 0) acc[k] = v;
      return acc;
    }, {})
  ).toString();

  const path = `/search${queryString ? `?${queryString}` : ""}`;

  return {
    title,
    description: desc,
    alternates: {
      canonical: path,
    },

    robots: { index: false, follow: false },
  };
}

export default async function SearchResultPage({ searchParams }: Props) {
  const query = await searchParams;
  const result = await searchQuery(query);
  const { max, min } = await getPropertiesPriceRange();

  const headingParts: string[] = ["Showing results"];
  if (query?.query) headingParts.push(`for ${query.query}`);
  if (query?.type) headingParts.push(`in ${query.type}`);
  if (query?.bedrooms) headingParts.push(`${query.bedrooms} bedrooms`);
  const headingText = headingParts.length > 0 ? headingParts.join(" ") : "Search Results";

  return (
    <main className="space-y-6 pt-4">
      <aside aria-label="Search filters" className="container">
        <SearchFilter
          initialValue={query}
          prices={{
            max,
            min,
          }}
        />
      </aside>
      <header className="container flex items-center justify-between space-y-2">
        <h1 className="text-sm tracking-tight">{headingText}</h1>
        <p className="text-muted-foreground">
          {result.length} {pluralize("result", result.length)}
        </p>
      </header>
      <section aria-labelledby="results-heading" className="container">
        <h2 className="sr-only" id="results-heading">
          Property Results
        </h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {result.map((property) => (
            <li className="list-none" key={property.id}>
              <PropertyCard key={property.id} property={property} />
            </li>
          ))}
        </ul>
      </section>
      <Cta />
    </main>
  );
}
