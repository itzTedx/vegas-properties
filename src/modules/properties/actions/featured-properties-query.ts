import { payload } from "@/lib/payload";

export async function getFeaturedProperties() {
  const properties = await payload.find({
    collection: "properties",
  });

  return properties.docs;
}
