import { unstable_cache as cache } from "next/cache";

import { payload } from "@/lib/payload";
import { AGENT_BY_SLUG, AGENTS_TAG } from "@/lib/payload/cache-keys";

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
    [AGENTS_TAG()],
    { tags: [AGENTS_TAG()], revalidate: false }
  )();

export const getAgentBySlug = async (slug: string) =>
  cache(
    async () => {
      const { docs } = await payload.find({
        collection: "agents",
        limit: 1,
        where: { slug: { equals: slug } },
      });

      return docs[0];
    },
    [AGENT_BY_SLUG(slug)],
    {
      tags: [AGENT_BY_SLUG(slug)],
      revalidate: false,
    }
  );
