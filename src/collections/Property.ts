import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";
import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

import { slugify } from "@/lib/functions/slugify";

export const Property: CollectionConfig = {
  slug: "properties",
  labels: {
    singular: "Property",
    plural: "Properties",
  },
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ["title", "location.city", "pricing.priceType", "status", "updatedAt"],
    useAsTitle: "title",
  },
  defaultPopulate: {
    title: true,
    slug: true,
    location: true,
    pricing: true,
    meta: {
      image: true,
      description: true,
    },
  },
  fields: [
    {
      name: "slug",
      type: "text",
      unique: true,
      admin: {
        position: "sidebar",
        description: "URL-friendly version of the title",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return slugify(data.title);
            }
            return value;
          },
        ],
      },
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      admin: {
        description: "Short property overview",
      },
    },
    { name: "image", type: "upload", relationTo: "media", required: true },

    {
      type: "tabs",
      tabs: [
        {
          label: "Property Details",
          fields: [
            {
              name: "location",
              type: "group",
              fields: [
                {
                  name: "address",
                  type: "text",
                  required: true,
                },
              ],
            },
            {
              name: "propertyDetails",
              type: "group",
              fields: [
                {
                  name: "developer",
                  type: "relationship",
                  relationTo: "developers",
                  hasMany: false,
                },
                {
                  name: "bedrooms",
                  type: "number",
                  required: true,
                  min: 0,
                  admin: {
                    description: "Number of bedrooms",
                  },
                },
                {
                  name: "bathrooms",
                  type: "number",
                  required: true,
                  min: 0,
                  admin: {
                    description: "Number of bathrooms",
                  },
                },
                {
                  name: "area",
                  type: "number",
                  admin: {
                    description: "Property area in square feet",
                  },
                },
                {
                  name: "propertyType",
                  type: "select",
                  options: [
                    {
                      label: "Apartment",
                      value: "apartment",
                    },
                    {
                      label: "House",
                      value: "house",
                    },
                    {
                      label: "Villa",
                      value: "villa",
                    },
                    {
                      label: "Townhouse",
                      value: "townhouse",
                    },
                  ],
                  required: true,
                },
              ],
            },
            {
              name: "pricing",
              type: "group",
              fields: [
                {
                  name: "salePrice",
                  type: "number",
                },
                {
                  name: "rentalPrice",
                  type: "number",
                },

                {
                  name: "priceType",
                  type: "select",
                  options: [
                    {
                      label: "For Sale",
                      value: "sale",
                    },
                    {
                      label: "For Rent",
                      value: "rent",
                    },
                    {
                      label: "Both",
                      value: "both",
                    },
                  ],
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: "Content",
          fields: [
            {
              name: "gallery",
              type: "array",
              fields: [
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
                {
                  name: "alt",
                  type: "text",
                  admin: {
                    description: "Alt text for accessibility",
                  },
                },
              ],
              admin: {
                description: "Property images",
              },
            },
            {
              name: "overview",
              type: "richText",
              admin: {
                description: "Rich text overview of the property",
              },
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({
                      enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
                    }),

                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ];
                },
              }),
            },
            {
              name: "features",
              type: "array",
              fields: [
                {
                  name: "feature",
                  type: "text",
                  required: true,
                },
              ],
              admin: {
                description: "Property features and amenities",
              },
            },
          ],
        },

        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: "media",
            }),

            MetaDescriptionField({}),
            {
              type: "text",
              name: "keyword",
              label: "Keyword",
            },

            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
      ],
    },
    {
      name: "status",
      type: "select",
      options: [
        {
          label: "Available",
          value: "available",
        },
        {
          label: "Sold",
          value: "sold",
        },
        {
          label: "Rented",
          value: "rented",
        },
        {
          label: "Under Contract",
          value: "under_contract",
        },
        {
          label: "Coming Soon",
          value: "coming_soon",
        },
      ],
      defaultValue: "available",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "isFeatured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Feature this property prominently",
      },
    },
  ],
};
