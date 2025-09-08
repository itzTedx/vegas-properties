import { payload } from "@/lib/payload";

export async function getFeaturedProperties(limit?: number) {
  const properties = await payload.find({
    collection: "properties",
    draft: false,
    limit: limit,
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

export async function getProperties() {
  return await payload.find({
    collection: "properties",
    draft: false,
    sort: ["-createdAt"],
  });
}

export const getPropertyBySlug = async (slug: string) => {
  return await payload
    .find({
      collection: "properties",
      draft: false,
      limit: 1,
      where: {
        slug: { equals: slug },
      },

      depth: 3,
    })
    .then((res) => res.docs[0]);
};
