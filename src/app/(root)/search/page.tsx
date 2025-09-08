import { PropertyCard } from "@/modules/properties/component";
import { searchQuery } from "@/modules/search/actions/query";
import { SearchFilter } from "@/modules/search/components/search-filter";

interface Props {
  searchParams: Promise<{
    type: string;
    location: string;
    bedrooms: string;
    priceRange: string;
  }>;
}

export default async function SearchResultPage({ searchParams }: Props) {
  const query = await searchParams;
  const result = await searchQuery(query);

  console.log(result);

  return (
    <main className="container space-y-4 pt-8 pb-12">
      <SearchFilter />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {result.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </main>
  );
}
