import type { Where } from "payload";

import { payload } from "@/lib/payload";

import { SearchFormType } from "./schema";

export async function searchQuery(query: SearchFormType) {
  const conditions: Where[] = [];

  // type -> propertyDetails.propertyType equals
  if (query.type && query.type.trim() !== "") {
    conditions.push({ "propertyDetails.propertyType": { equals: query.type.trim() } });
  }

  // location -> propertyDetails.location partial match
  if (query.location && query.location.trim() !== "") {
    conditions.push({ "propertyDetails.location": { like: query.location.trim() } });
  }

  // bedrooms -> propertyDetails.bedrooms >= value
  if (query.bedrooms && query.bedrooms.trim() !== "") {
    const bedroomsNum = Number.parseInt(query.bedrooms.trim(), 10);
    console.log("bedroomsNum", bedroomsNum);
    if (!Number.isNaN(bedroomsNum)) {
      conditions.push({ "propertyDetails.bedrooms": { equals: bedroomsNum } });
    }
  }

  // priceRange -> pricing.salePrice or pricing.rentalPrice between min and max
  if (query.priceRange && query.priceRange.trim() !== "") {
    const [minStr, maxStr] = query.priceRange.split("-");
    const min = Number.parseFloat(minStr);
    const max = Number.parseFloat(maxStr);

    if (!Number.isNaN(min) && !Number.isNaN(max)) {
      conditions.push({
        or: [
          {
            and: [
              { "pricing.salePrice": { greater_than_equal: min } },
              { "pricing.salePrice": { less_than_equal: max } },
            ],
          },
          {
            and: [
              { "pricing.rentalPrice": { greater_than_equal: min } },
              { "pricing.rentalPrice": { less_than_equal: max } },
            ],
          },
        ],
      });
    }
  }

  const where: Where = conditions.length > 0 ? { and: conditions } : {};

  const { docs } = await payload.find({
    collection: "properties",
    where,
  });
  return docs;
}
