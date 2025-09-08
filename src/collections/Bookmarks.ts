import type { CollectionConfig } from "payload";

export const Bookmarks: CollectionConfig = {
  slug: "bookmarks",
  labels: {
    singular: "Bookmark",
    plural: "Bookmarks",
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    defaultColumns: ["sessionId", "property", "updatedAt"],
  },
  fields: [
    {
      name: "sessionId",
      type: "text",
      required: true,
      index: true,
    },
    {
      name: "property",
      type: "relationship",
      relationTo: "properties",
      required: true,
    },
  ],
};
