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
      const res = await payload
        .find({
          collection: "agents",
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
    [AGENT_BY_SLUG(slug)],
    { tags: [AGENTS_TAG(), AGENT_BY_SLUG(slug)], revalidate: false }
  )();
