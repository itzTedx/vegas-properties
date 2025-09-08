import type { CollectionConfig } from "payload";

export const Developers: CollectionConfig = {
  slug: "developers",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "website",
      type: "text",
    },
  ],
};
