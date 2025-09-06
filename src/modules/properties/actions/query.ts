import { payload } from "@/lib/payload";

export async function getFeaturedProperties() {
  const properties = await payload.find({
    collection: "properties",
    draft: false,
    where: {
      isFeatured: {
        equals: true,
      },
    },
  });

  return properties.docs;
}

export async function getLatestProperties() {
  const properties = await payload.find({
    collection: "properties",
    draft: false,
    sort: ["-isFeatured", "-createdAt"],
    limit: 7,
  });

  return properties.docs;
}
