import { getFeaturedProperties } from "../actions/featured-properties-query";
import { PropertyCard } from "../component";

export async function FeaturedProperties() {
  const properties = await getFeaturedProperties();

  if (!properties.length) return null;

  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
