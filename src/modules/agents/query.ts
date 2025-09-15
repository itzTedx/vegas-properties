import { unstable_cache as cache } from "next/cache";

import { payload } from "@/lib/payload";
import { PROPERTIES_TAG } from "@/lib/payload/cache-keys";

export const getAgents = async () =>
  cache(
    async () => {
      const doc = await payload.find({
        collection: "agents",
        draft: false,
        depth: 2,
        limit: 100,
      });
      return doc.docs;
    },
    [PROPERTIES_TAG()],
    { tags: [PROPERTIES_TAG()], revalidate: false }
  )();
