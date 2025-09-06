import { blurDataUrlsPlugin } from "@oversightstudio/blur-data-urls";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { searchPlugin } from "@payloadcms/plugin-search";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
import { s3Storage } from "@payloadcms/storage-s3";
import { Plugin } from "payload";

import { Media } from "@/collections/Media";

import { env } from "../env/server";
import { beforeSyncWithSearch } from "./search/before-sync";
import { searchFields } from "./search/field-overrides";
import { getServerSideURL } from "./utils/get-url";

const generateTitle: GenerateTitle = ({ doc }) => {
  return doc?.title ? `${doc.title} | Vegas Properties` : "Vegas Properties";
};

const generateURL: GenerateURL = ({ doc }) => {
  const url = getServerSideURL();

  return doc?.slug ? `${url}/${doc.slug}` : url;
};

export const plugins: Plugin[] = [
  payloadCloudPlugin(),
  seoPlugin({
    generateTitle,
    generateURL,
    uploadsCollection: "media",
    generateDescription: ({ doc }) => doc.content.description,
    fields: ({ defaultFields }) => [
      ...defaultFields,
      {
        name: "keyword",
        type: "text",
      },
    ],
  }),
  searchPlugin({
    collections: ["properties"],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields];
      },
      admin: {
        group: "Admin",
      },
    },
  }),
  s3Storage({
    collections: {
      media: true,
    },
    bucket: env.AWS_BUCKET_NAME,
    config: {
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ZMDEALS,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
      region: env.AWS_BUCKET_REGION,
    },
  }),
  blurDataUrlsPlugin({
    enabled: true,
    collections: [Media],
    blurOptions: {
      blur: 4,
      width: 32,
      height: "auto",
    },
  }),
];
