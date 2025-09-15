import { revalidateTag } from "next/cache";

import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

import { AGENT_BY_SLUG } from "@/lib/payload/cache-keys";

export const revalidateAgentsCache: CollectionAfterChangeHook = async ({ doc }) => {
  try {
    const sessionId = (doc as { sessionId?: unknown })?.sessionId;
    if (typeof sessionId === "string" && sessionId.length > 0) {
      revalidateTag(AGENT_BY_SLUG(sessionId));
    }
  } catch (error) {
    console.error("Error revalidating agents cache after change:", error);
  }
};

export const revalidateAgentsCacheAfterDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  try {
    const sessionId = (doc as { sessionId?: unknown })?.sessionId;
    if (typeof sessionId === "string" && sessionId.length > 0) {
      revalidateTag(AGENT_BY_SLUG(sessionId));
    }
  } catch (error) {
    console.error("Error revalidating agents cache after delete:", error);
  }
};
