import { BeforeSync, DocToSync } from "@payloadcms/plugin-search/types";

export const beforeSyncWithSearch: BeforeSync = async ({ originalDoc, searchDoc }) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc;

  const baseId = (originalDoc as { id: string }).id;
  const baseSlug = (originalDoc as { slug?: string }).slug;

  type TargetRef = { collection: string; id: string };
  type MetaShape = { title?: string; description?: string; image?: string };
  type PropertyFacets = {
    location?: string;
    propertyType?: string;
    priceType?: string;
    developerTitle?: string;
  };
  type DeveloperFacets = { website?: string };

  // Minimal shapes per collection
  type MediaRef = string | { id?: string } | undefined;

  interface PropertiesDoc {
    id: string;
    slug?: string;
    title?: string;
    description?: string;
    image?: MediaRef;
    propertyDetails?: {
      location?: string;
      propertyType?: string;
      developer?: { title?: string } | string;
      developerTitle?: string;
    };
    pricing?: { priceType?: string };
    meta?: { title?: string; description?: string; image?: MediaRef };
  }

  interface DevelopersDoc {
    id: string;
    slug?: string;
    title?: string;
    description?: string;
    logo?: MediaRef;
    website?: string;
  }

  interface MediaDoc {
    id: string;
    slug?: string;
    alt?: string;
    filename?: string;
    caption?: string;
  }

  const isPropertiesDoc = (d: unknown): d is PropertiesDoc => {
    return typeof d === "object" && d !== null && ("propertyDetails" in d || "pricing" in d);
  };
  const isDevelopersDoc = (d: unknown): d is DevelopersDoc => {
    return typeof d === "object" && d !== null && "logo" in d;
  };
  const isMediaDoc = (d: unknown): d is MediaDoc => {
    return typeof d === "object" && d !== null && ("alt" in d || "filename" in d);
  };

  const getMediaId = (m: MediaRef): string | undefined => {
    if (!m) return undefined;
    if (typeof m === "string") return m;
    return m.id;
  };

  const result: DocToSync & {
    target: TargetRef;
    meta: MetaShape;
    property?: PropertyFacets;
    developer?: DeveloperFacets;
  } = {
    ...searchDoc,
    slug: baseSlug,
    target: { collection, id: baseId },
    meta: {},
  };

  const docUnknown: unknown = originalDoc;

  if (collection === "properties" && isPropertiesDoc(docUnknown)) {
    const doc = docUnknown;
    const title = doc.title;
    const description = doc.description ?? doc.meta?.description;
    const image = getMediaId(doc.image) ?? getMediaId(doc.meta?.image);

    result.meta = {
      title: doc.meta?.title || title,
      description,
      image,
    };

    const developerTitle =
      typeof doc.propertyDetails?.developer === "string"
        ? undefined
        : (doc.propertyDetails?.developer?.title ?? doc.propertyDetails?.developerTitle);

    result.property = {
      location: doc.propertyDetails?.location,
      propertyType: doc.propertyDetails?.propertyType,
      priceType: doc.pricing?.priceType,
      developerTitle,
    };
  } else if (collection === "developers" && isDevelopersDoc(docUnknown)) {
    const doc = docUnknown;
    const title = doc.title;
    const description = doc.description;
    const image = getMediaId(doc.logo);

    result.meta = { title, description, image };
    result.developer = { website: doc.website };
  } else if (collection === "media" && isMediaDoc(docUnknown)) {
    const doc = docUnknown;
    const title = doc.alt || doc.filename;
    const description = doc.caption;
    const image = doc.id;

    result.meta = { title, description, image };
  }

  return result;
};
