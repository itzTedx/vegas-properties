// Collection-level cache keys
export const PROPERTIES_TAG = () => "properties";
export const DEVELOPERS_TAG = () => "developers";
export const MEDIA_TAG = () => "media";

export const PROPERTY_BY_SLUG = () => "property-by-slug";
// Item-specific cache keys
export const PROPERTY_BY_ID_TAG = (id: number) => `property-by-id-${id}`;
export const PROPERTY_BY_SLUG_TAG = (slug: string) => `property-by-slug-${slug}`;
export const DEVELOPER_BY_ID_TAG = (developerId: number) => `developer-by-id-${developerId}`;
export const BOOKMARKS_BY_SESSION_TAG = (sessionId: string) => `bookmarks-${sessionId}`;
