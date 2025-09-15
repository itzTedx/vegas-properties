import type { CollectionConfig } from "payload";

export const Specialties: CollectionConfig = {
  slug: "specialties",
  access: { read: () => true },
  admin: { hidden: true },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea" },
  ],
};
