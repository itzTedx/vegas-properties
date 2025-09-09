import { unstable_cache as cache } from "next/cache";

import { payload } from "@/lib/payload";
import {
  DEVELOPERS_TAG,
  PROPERTIES_TAG,
  PROPERTY_BY_ID_TAG,
  PROPERTY_BY_SLUG_TAG,
} from "@/lib/payload/cache-keys";

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

export const getProperties = cache(
  async () => {
    return await payload.find({
      collection: "properties",
      draft: false,
      sort: ["-createdAt"],
    });
  },
  [PROPERTIES_TAG()],
  { tags: [PROPERTIES_TAG()], revalidate: false }
);

export const getPropertyBySlug = async (slug: string) =>
  cache(
    async () => {
      const res = await payload
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

      return res;
    },
    [PROPERTY_BY_SLUG_TAG(slug)],
    { tags: [PROPERTIES_TAG(), PROPERTY_BY_SLUG_TAG(slug)], revalidate: false }
  )();

export const getPropertiesByDeveloper = cache(
  async (developerId?: number, limit?: number) => {
    if (!developerId) return null;
    const properties = await payload.find({
      collection: "properties",
      draft: false,
      limit,
      where: {
        "propertyDetails.developer": {
          equals: developerId,
        },
      },
    });

    return properties.docs;
  },
  [PROPERTIES_TAG(), DEVELOPERS_TAG()],
  {
    tags: [PROPERTIES_TAG(), DEVELOPERS_TAG()],
    revalidate: false,
  }
);

export const getPropertyById = async (id: number) =>
  cache(
    async () => {
      const doc = await payload.findByID({
        collection: "properties",
        id,
        draft: false,
        depth: 3,
      });
      return doc;
    },
    [PROPERTY_BY_ID_TAG(id)],
    { tags: [PROPERTY_BY_ID_TAG(id)], revalidate: false }
  )();
