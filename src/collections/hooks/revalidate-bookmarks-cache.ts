import { revalidateTag } from "next/cache";

import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

import { BOOKMARKS_BY_SESSION_TAG } from "@/lib/payload/cache-keys";

export const revalidateBookmarksCacheAfterChange: CollectionAfterChangeHook = async ({ doc }) => {
  try {
    const sessionId = (doc as { sessionId?: unknown })?.sessionId;
    if (typeof sessionId === "string" && sessionId.length > 0) {
      revalidateTag(BOOKMARKS_BY_SESSION_TAG(sessionId));
    }
  } catch (error) {
    console.error("Error revalidating bookmarks cache after change:", error);
  }
};

export const revalidateBookmarksCacheAfterDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  try {
    const sessionId = (doc as { sessionId?: unknown })?.sessionId;
    if (typeof sessionId === "string" && sessionId.length > 0) {
      revalidateTag(BOOKMARKS_BY_SESSION_TAG(sessionId));
    }
  } catch (error) {
    console.error("Error revalidating bookmarks cache after delete:", error);
  }
};
