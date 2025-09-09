// Collection-level cache keys
export const PROPERTIES_TAG = () => "properties";
export const TESTIMONIALS_TAG = () => "testimonials";
export const MEDIA_TAG = () => "media";

// Item-specific cache keys
export const PROPERTY_BY_ID_TAG = (id: number) => `property-by-id-${id}`;
export const TESTIMONIAL_BY_ID_TAG = (testimonialId: number) => `testimonial-by-id-${testimonialId}`;
export const BOOKMARKS_BY_SESSION_TAG = (sessionId: string) => `bookmarks-${sessionId}`;
