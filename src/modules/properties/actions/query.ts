import { unstable_cache as cache } from "next/cache";

import { payload } from "@/lib/payload";
import { PROPERTIES_TAG } from "@/lib/payload/cache-keys";

export const getFeaturedProperties = cache(
  async (limit?: number) => {
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
  },
  [PROPERTIES_TAG()],
  {
    tags: [PROPERTIES_TAG()],
    revalidate: false,
  }
);

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
