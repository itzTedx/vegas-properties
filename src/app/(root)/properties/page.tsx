import { Badge } from "@/components/ui/badge";

import { IconFire } from "@/assets/icons";

import { getFeaturedProperties, getProperties } from "@/modules/properties/actions/query";
import { PropertyCard } from "@/modules/properties/component";

export default async function PropertiesPage() {
  const properties = await getProperties();
  const featured = await getFeaturedProperties();

  return (
    <main className="container space-y-20 pt-6 pb-12">
      <div className="space-y-4">
        <header className="space-y-4">
          <Badge>
            <IconFire />
            Featured
          </Badge>
          <div className="grid gap-3 md:grid-cols-2">
            <h2 className="text-balance text-center font-serif text-2xl md:text-left md:text-4xl">
              Featured Properties
            </h2>
            <p className="text-balance text-center font-light leading-relaxed md:text-left">
              Discover our handpicked selection of featured properties, each carefully selected for their exceptional
              quality and unique features.
            </p>
          </div>
        </header>
        <article className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </article>
      </div>
      <div className="space-y-4">
        <header className="space-y-4">
          <Badge>Properties</Badge>
          <div className="grid gap-3 md:grid-cols-2">
            <h2 className="text-balance text-center font-serif text-2xl md:text-left md:text-4xl">
              Premium Properties in the <br />
              <span className="text-brand-600">best locations</span>
            </h2>
            <p className="text-balance text-center font-light leading-relaxed md:text-left">
              Discover handpicked Dubai properties for sale and rent, from stunning apartments to luxury villas. Explore
              premium listings with Vegas Properties and find your perfect home in the heart of Dubai.
            </p>
          </div>
        </header>

        <article className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {properties.docs.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </article>
      </div>
    </main>
  );
}
