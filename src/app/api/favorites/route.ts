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

function normalizeIdsAsNumbers(values: unknown): number[] {
  if (!Array.isArray(values)) return [];
  return values
    .map((val) => {
      if (val && typeof val === "object" && "id" in (val as any)) {
        const raw = (val as any).id as unknown;
        return toNumber(raw);
      }
      return toNumber(val);
    })
    .filter((v): v is number => typeof v === "number");
}

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie");
  const jar = parseCookie(cookieHeader);
  const sessionId = jar[COOKIE_NAME] ?? "";
  if (!sessionId) return NextResponse.json({ favorites: [] });

  const { docs } = await payload.find({
    collection: "guest-sessions",
    where: { sessionId: { equals: sessionId } },
    depth: 2,
    limit: 1,
  });
  const session = docs[0] as any;
  if (!session) return NextResponse.json({ favorites: [] });

  return NextResponse.json({ favorites: session.favorites ?? [] });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const propertyIdNum = toNumber(body?.propertyId);
  if (propertyIdNum == null) {
    return NextResponse.json({ error: "propertyId is required" }, { status: 400 });
  }

  const cookieHeader = request.headers.get("cookie");
  const jar = parseCookie(cookieHeader);
  const sessionId = jar[COOKIE_NAME] ?? "";
  if (!sessionId) return NextResponse.json({ error: "No guest session" }, { status: 400 });

  const { docs } = await payload.find({
    collection: "guest-sessions",
    where: { sessionId: { equals: sessionId } },
    depth: 0,
    limit: 1,
  });
  const session = docs[0] as any;
  if (!session) return NextResponse.json({ error: "No guest session" }, { status: 400 });

  const currentIds = normalizeIdsAsNumbers(session.favorites);
  const exists = currentIds.includes(propertyIdNum);
  const updatedFavorites = exists ? currentIds.filter((id) => id !== propertyIdNum) : [...currentIds, propertyIdNum];

  const updated = await payload.update({
    collection: "guest-sessions",
    id: session.id,
    data: { favorites: updatedFavorites },
    depth: 0,
  });

  return NextResponse.json({ favorites: updated.favorites ?? updatedFavorites, toggled: !exists });
}
