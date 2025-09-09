import type { CollectionConfig } from "payload";

import {
  revalidateBookmarksCacheAfterChange,
  revalidateBookmarksCacheAfterDelete,
} from "./hooks/revalidate-bookmarks-cache";

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
  admin: { hidden: true },
  hooks: {
    afterChange: [revalidateBookmarksCacheAfterChange],
    afterDelete: [revalidateBookmarksCacheAfterDelete],
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
