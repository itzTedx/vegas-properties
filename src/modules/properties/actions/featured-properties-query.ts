import { payload } from "@/lib/payload";

export async function getFeaturedProperties() {
  const properties = await payload.find({
    collection: "properties",
    draft: false,
  });

  return properties.docs;
}
