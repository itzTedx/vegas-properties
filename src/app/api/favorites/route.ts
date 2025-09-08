import { NextResponse } from "next/server";

import { payload } from "@/lib/payload";

const COOKIE_NAME = "guest_session_id";

function parseCookie(cookieHeader: string | null): Record<string, string> {
  const jar: Record<string, string> = {};
  if (!cookieHeader) return jar;
  cookieHeader.split(";").forEach((part) => {
    const [k, ...rest] = part.trim().split("=");
    if (!k) return;
    jar[k] = decodeURIComponent(rest.join("="));
  });
  return jar;
}

function toNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const str = String(value ?? "").trim();
  if (!str) return null;
  const num = Number(str);
  return Number.isFinite(num) ? num : null;
}

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie");
  const jar = parseCookie(cookieHeader);
  const sessionId = jar[COOKIE_NAME] ?? "";
  if (!sessionId) return NextResponse.json({ favorites: [] });

  const { docs } = await payload.find({
    collection: "bookmarks",
    where: { sessionId: { equals: sessionId } },
    depth: 2,
    limit: 100,
  });

  const properties = docs.map((b: any) => b.property).filter(Boolean);
  return NextResponse.json({ favorites: properties });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}) as Record<string, unknown>);
  const propertyId = toNumber(body?.propertyId);
  if (propertyId == null) return NextResponse.json({ error: "propertyId is required" }, { status: 400 });

  const cookieHeader = request.headers.get("cookie");
  const jar = parseCookie(cookieHeader);
  const sessionId = jar[COOKIE_NAME] ?? "";
  if (!sessionId) return NextResponse.json({ error: "No guest session" }, { status: 400 });

  const existing = await payload.find({
    collection: "bookmarks",
    where: {
      and: [{ sessionId: { equals: sessionId } }, { property: { equals: propertyId } }],
    },
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

  const ids = all.docs.map((d: any) => d.property).filter((v: unknown): v is number => typeof v === "number");
  return NextResponse.json({ favorites: ids });
}
