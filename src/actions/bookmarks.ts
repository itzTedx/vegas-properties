"use server";

import { unstable_cache as cache } from "next/cache";
import { cookies } from "next/headers";

import { payload } from "@/lib/payload";
import { BOOKMARKS_BY_SESSION_TAG } from "@/lib/payload/cache-keys";

import crypto from "node:crypto";

const COOKIE_NAME = "guest_session_id";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

// Server Action to create and set a new guest session
export async function createGuestSession(): Promise<{ sessionId: string }> {
  const jar = await cookies();
  const sessionId = crypto.randomUUID();

  jar.set(COOKIE_NAME, sessionId, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });

  // Create the session in the database
  await payload.create({ collection: "guest-sessions", data: { sessionId } });

  return { sessionId };
}

// Helper function to get session ID without setting cookies
export async function getGuestSessionId(): Promise<string | null> {
  const jar = await cookies();
  return jar.get(COOKIE_NAME)?.value ?? null;
}

// Server Action to ensure guest session exists
export async function ensureGuestSession(): Promise<{ sessionId: string }> {
  const sessionId = await getGuestSessionId();

  if (!sessionId) {
    return await createGuestSession();
  }

  // Check if session exists in database
  const existing = await payload.find({
    collection: "guest-sessions",
    where: { sessionId: { equals: sessionId } },
    depth: 0,
    limit: 1,
  });

  if (!existing.docs[0]) {
    await payload.create({ collection: "guest-sessions", data: { sessionId } });
  }

  return { sessionId };
}

export type MinimalMedia = { id: number; url?: string | null };
export type MinimalProperty = { id: number; title?: string | null; image?: MinimalMedia | number };

function hasPropertyId(doc: unknown): doc is { property: number } {
  return (
    typeof doc === "object" &&
    doc !== null &&
    "property" in doc &&
    typeof (doc as { property?: unknown }).property === "number"
  );
}

export async function getBookmarkedPropertiesBySession() {
  const jar = await cookies();
  const sessionId = jar.get(COOKIE_NAME)?.value ?? "";
  if (!sessionId) return [];

  const fetcher = cache(
    async () => {
      const bookmarks = await payload.find({
        collection: "bookmarks",
        where: { sessionId: { equals: sessionId } },
        depth: 2,
        limit: 100,
      });

      const propertyIds = bookmarks.docs
        .map((doc) => (typeof doc.property === "object" && doc.property !== null ? doc.property.id : doc.property))
        .filter((v: unknown): v is number => typeof v === "number");

      const { docs } = await payload.find({
        collection: "properties",
        where: {
          id: {
            in: propertyIds,
          },
        },
      });

      return docs;
    },
    [BOOKMARKS_BY_SESSION_TAG(sessionId)],
    { tags: [BOOKMARKS_BY_SESSION_TAG(sessionId)], revalidate: false }
  );

  return await fetcher();
}

export async function getBookmarkByPropertyId(propertyId: number): Promise<boolean> {
  const jar = await cookies();
  const sessionId = jar.get(COOKIE_NAME)?.value ?? "";
  if (!sessionId) return false;

  const existing = await payload.find({
    collection: "bookmarks",
    where: { and: [{ sessionId: { equals: sessionId } }, { property: { equals: propertyId } }] },
    depth: 0,
    limit: 1,
  });

  return Boolean(existing.docs[0]);
}

export async function toggleBookmark(propertyId: number): Promise<number[] | undefined> {
  const { sessionId } = await ensureGuestSession();
  if (!sessionId) return [];

  try {
    const existing = await payload.find({
      collection: "bookmarks",
      where: { and: [{ sessionId: { equals: sessionId } }, { property: { equals: propertyId } }] },
      depth: 0,
      limit: 1,
    });

    if (existing.docs[0]) {
      await payload.delete({ collection: "bookmarks", id: existing.docs[0].id as number });
    } else {
      await payload.create({ collection: "bookmarks", data: { sessionId, property: propertyId } });
    }

    const all = await payload.find({
      collection: "bookmarks",
      where: { sessionId: { equals: sessionId } },
      depth: 0,
      limit: 100,
    });

    return (all.docs as unknown[])
      .map((d) => (hasPropertyId(d) ? d.property : undefined))
      .filter((v: unknown): v is number => typeof v === "number");
  } catch (err) {
    console.log(err);
  }
}
