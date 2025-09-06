import { Badge } from "@/components/ui/badge";

import { getProperties } from "@/modules/properties/actions/query";
import { PropertyCard } from "@/modules/properties/component";

export default async function PropertiesPage() {
  const properties = await getProperties();
  return (
    <main className="container py-6">
      <header className="space-y-4">
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
      </header>
      <article className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {properties.docs.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </article>
    </main>
  );
}
