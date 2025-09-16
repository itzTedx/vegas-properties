import { revalidateTag } from "next/cache";

import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

import { AGENT_BY_ID_TAG, AGENT_BY_SLUG, AGENTS_TAG } from "@/lib/payload/cache-keys";

export const revalidateAgentsCache: CollectionAfterChangeHook = async ({ doc, previousDoc, operation }) => {
  try {
    // Always revalidate the agents collection tag
    revalidateTag(AGENTS_TAG());

    // Revalidate specific agent cache by id
    if (typeof (doc as { id?: unknown })?.id === "number") {
      revalidateTag(AGENT_BY_ID_TAG((doc as { id: number }).id));
    }

    // Revalidate specific agent cache by slug
    const currentSlug = (doc as { slug?: unknown })?.slug;
    if (typeof currentSlug === "string" && currentSlug.length > 0) {
      revalidateTag(AGENT_BY_SLUG(currentSlug));
    }

    // If slug changed on update, also revalidate the old slug
    const previousSlug = (previousDoc as { slug?: unknown })?.slug;
    if (
      operation === "update" &&
      typeof previousSlug === "string" &&
      previousSlug.length > 0 &&
      previousSlug !== currentSlug
    ) {
      revalidateTag(AGENT_BY_SLUG(previousSlug));
    }
  } catch (error) {
    console.error("Error revalidating agents cache after change:", error);
  }
};

export const revalidateAgentsCacheAfterDelete: CollectionAfterDeleteHook = async ({ id, doc }) => {
  try {
    // Always revalidate the agents collection tag after delete
    revalidateTag(AGENTS_TAG());

    // Revalidate specific agent cache by id
    if (typeof id === "number") {
      revalidateTag(AGENT_BY_ID_TAG(id));
    } else if (typeof (doc as { id?: unknown })?.id === "number") {
      revalidateTag(AGENT_BY_ID_TAG((doc as { id: number }).id));
    }

    // Revalidate specific agent cache by slug if available
    const deletedSlug = (doc as { slug?: unknown })?.slug;
    if (typeof deletedSlug === "string" && deletedSlug.length > 0) {
      revalidateTag(AGENT_BY_SLUG(deletedSlug));
    }
  } catch (error) {
    console.error("Error revalidating agents cache after delete:", error);
  }
};
