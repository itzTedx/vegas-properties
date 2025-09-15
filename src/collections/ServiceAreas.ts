import type { CollectionConfig } from "payload";

export const ServiceAreas: CollectionConfig = {
  slug: "service-areas",
  access: { read: () => true },
  admin: { hidden: true },
  fields: [{ name: "title", type: "text", required: true }],
};
