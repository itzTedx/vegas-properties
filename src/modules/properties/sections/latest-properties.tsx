import { getLatestProperties } from "../actions/query";
import { PropertyCard } from "../component";

export async function LatestProperties() {
  const properties = await getLatestProperties();

  if (!properties.length) return null;

  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {/* <pre className="text-wrap text-xs">{JSON.stringify(properties, null, 2)}</pre> */}
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
