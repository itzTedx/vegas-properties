import { CollectionConfig } from "payload";

import { slugify } from "@/lib/functions/slugify";

import { revalidateAgentsCache, revalidateAgentsCacheAfterDelete } from "./hooks/revalidate-agents-cache";

export const Agents: CollectionConfig = {
  slug: "agents",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "contact.phonePrimary", "contact.email"],
  },
  hooks: {
    afterChange: [revalidateAgentsCache],
    afterDelete: [revalidateAgentsCacheAfterDelete],
  },
  fields: [
    { name: "photo", type: "upload", relationTo: "media" },
    {
      name: "name",
      type: "text",
      required: true,
    },
    { name: "title", type: "text", admin: { description: "e.g., Realtor, Senior Agent" } },
    {
      type: "tabs",
      tabs: [
        {
          label: "Contact",
          fields: [
            {
              name: "contact",
              type: "group",
              fields: [
                { name: "licenseNumber", label: "License / PRL", type: "text" },
                { name: "phonePrimary", label: "Primary Phone", type: "text" },
                { name: "phoneSecondary", label: "Secondary Phone", type: "text" },
                { name: "email", type: "email" },
                { name: "whatsAppNumber", label: "WhatsApp Number", type: "text" },
                {
                  name: "socials",
                  label: "Social Profiles",
                  type: "array",
                  labels: { singular: "Social Profile", plural: "Social Profiles" },
                  admin: { description: "Add links or handles for Instagram, LinkedIn, etc." },
                  fields: [
                    {
                      name: "platform",
                      type: "select",
                      required: true,
                      options: [
                        { label: "Website", value: "website" },
                        { label: "Facebook", value: "facebook" },
                        { label: "Instagram", value: "instagram" },
                        { label: "LinkedIn", value: "linkedin" },
                        { label: "X / Twitter", value: "twitter" },
                        { label: "YouTube", value: "youtube" },
                        { label: "TikTok", value: "tiktok" },
                        { label: "WhatsApp", value: "whatsapp" },
                        { label: "Snapchat", value: "snapchat" },
                        { label: "Telegram", value: "telegram" },
                      ],
                    },
                    { name: "handle", label: "Handle / Username", type: "text" },
                    { name: "url", label: "Profile URL", type: "text", required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Professional",
          fields: [
            {
              name: "professional",
              type: "group",
              fields: [
                { name: "experienceYears", label: "Experience (Years)", type: "number", min: 0 },
                { name: "awards", label: "Realtor Awards", type: "textarea" },
                { name: "mlsNumber", label: "MLS Number", type: "text" },
                {
                  name: "languages",
                  label: "Languages Spoken",
                  type: "array",
                  fields: [{ name: "language", type: "text" }],
                },
                {
                  name: "specialties",
                  label: "Specialties",
                  type: "relationship",
                  relationTo: "specialties",
                  hasMany: true,
                },
                {
                  name: "serviceAreas",
                  label: "Service Areas",
                  type: "relationship",
                  relationTo: "service-areas",
                  hasMany: true,
                },
              ],
            },
          ],
        },
        {
          label: "Content",
          fields: [{ name: "about", label: "About Me", type: "richText" }],
        },
      ],
    },

    {
      name: "slug",
      type: "text",
      unique: true,
      admin: {
        position: "sidebar",
        description: "URL-friendly version of the name",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.name) {
              return slugify(data.name);
            }
            return value;
          },
        ],
      },
    },
  ],
};
