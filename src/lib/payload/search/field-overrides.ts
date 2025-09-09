import { Field } from "payload";

export const searchFields: Field[] = [
  {
    name: "slug",
    type: "text",
    index: true,
    admin: {
      readOnly: true,
    },
  },
  {
    name: "target",
    label: "Target Document",
    type: "group",
    admin: {
      readOnly: true,
    },
    fields: [
      {
        name: "collection",
        label: "Collection",
        type: "select",
        options: [
          { label: "Properties", value: "properties" },
          { label: "Developers", value: "developers" },
          { label: "Media", value: "media" },
        ],
      },
      {
        name: "id",
        label: "Document ID",
        type: "text",
      },
    ],
  },
  {
    name: "meta",
    label: "Meta",
    type: "group",
    index: true,
    admin: {
      readOnly: true,
    },
    fields: [
      {
        type: "text",
        name: "title",
        label: "Title",
      },
      {
        type: "text",
        name: "description",
        label: "Description",
      },
      {
        name: "image",
        label: "Image",
        type: "upload",
        relationTo: "media",
      },
    ],
  },
  {
    name: "property",
    label: "Property Facets",
    type: "group",
    admin: {
      readOnly: true,
    },
    fields: [
      { name: "location", type: "text", label: "Location" },
      { name: "propertyType", type: "text", label: "Property Type" },
      { name: "priceType", type: "text", label: "Price Type" },
      { name: "developerTitle", type: "text", label: "Developer" },
    ],
  },
  {
    name: "developer",
    label: "Developer Facets",
    type: "group",
    admin: {
      readOnly: true,
    },
    fields: [{ name: "website", type: "text", label: "Website" }],
  },
];
