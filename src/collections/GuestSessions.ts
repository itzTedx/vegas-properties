import type { CollectionConfig } from "payload";

export const GuestSessions: CollectionConfig = {
  slug: "guest-sessions",
  labels: {
    singular: "Guest Session",
    plural: "Guest Sessions",
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: "sessionId",
    defaultColumns: ["sessionId", "updatedAt"],
  },
  fields: [
    {
      name: "sessionId",
      type: "text",
      unique: true,
      required: true,
      admin: {
        description: "Anonymous session identifier stored in client cookie",
      },
    },
    {
      name: "favorites",
      type: "relationship",
      relationTo: "properties",
      hasMany: true,
    },
  ],
};
