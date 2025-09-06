import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Media",
    plural: "Media",
  },
  access: {
    read: () => true,
  },

  fields: [
    {
      name: "alt",
      type: "text",

      admin: {
        description: "Describe this image for accessibility",
      },
    },
    {
      name: "caption",
      type: "textarea",
      admin: {
        description: "Optional caption for this image",
      },
    },
  ],
  upload: {
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "medium",
        width: 800,
        height: 600,
        position: "centre",
      },
    ],
    formatOptions: {
      format: "webp",
    },
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
  },
};
