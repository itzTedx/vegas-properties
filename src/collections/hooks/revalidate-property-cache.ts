// src/collections/hooks/revalidateServicesCache.ts

import { revalidateTag } from "next/cache";

import { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

import { PROPERTIES_TAG, PROPERTY_BY_ID_TAG } from "@/lib/payload/cache-keys";

export const revalidatePropertiesCache: CollectionAfterChangeHook = async ({ doc, previousDoc, operation }) => {
  try {
    // Always revalidate general services tag

    revalidateTag(PROPERTIES_TAG());

    // Revalidate specific service cache
    if (doc.id) {
      revalidateTag(PROPERTY_BY_ID_TAG(doc.id));
    }

    // If slug changed, also revalidate the old slug
    if (operation === "update" && previousDoc?.slug && previousDoc.slug !== doc.slug) {
      revalidateTag(PROPERTY_BY_ID_TAG(previousDoc.id));
    }

    console.log(`Revalidated services cache for: ${doc.title}`);
  } catch (error) {
    console.error("Error revalidating services cache:", error);
  }
};

export const revalidatePropertiesCacheAfterDelete: CollectionAfterDeleteHook = async ({ id, doc }) => {
  try {
    // Always revalidate collection tag
    revalidateTag(PROPERTIES_TAG());

    // Revalidate specific property cache by id
    if (id) {
      revalidateTag(PROPERTY_BY_ID_TAG(Number(id)));
    } else if (doc?.id) {
      revalidateTag(PROPERTY_BY_ID_TAG(doc.id));
    }

    console.log(`Revalidated services cache after delete for id: ${id ?? doc?.id}`);
  } catch (error) {
    console.error("Error revalidating services cache after delete:", error);
  }
};
