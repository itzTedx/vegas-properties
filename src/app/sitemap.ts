import type { MetadataRoute } from "next";

import { getAgents } from "@/modules/agents/query";
import { getProperties } from "@/modules/properties/actions/query";

const BASE_URL = "https://www.vegasproperties.ae";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/properties`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/agents`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/contact`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/search`,
      changeFrequency: "daily",
      priority: 0.5,
    },
  ];

  try {
    const [propertiesRes, agents] = await Promise.all([getProperties(), getAgents()]);

    const propertyEntries: MetadataRoute.Sitemap = (propertiesRes?.docs || []).map((p) => ({
      url: `${BASE_URL}/properties/${p.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : undefined,
    }));

    const agentEntries: MetadataRoute.Sitemap = (agents || []).map((a) => ({
      url: `${BASE_URL}/agents/${a.slug}`,
      changeFrequency: "monthly",
      priority: 0.5,
      lastModified: a.updatedAt ? new Date(a.updatedAt) : undefined,
    }));

    return [...staticRoutes, ...propertyEntries, ...agentEntries];
  } catch {
    return staticRoutes;
  }
}
