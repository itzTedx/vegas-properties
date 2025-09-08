import { NextResponse } from "next/server";

import { payload } from "@/lib/payload";

import crypto from "node:crypto";

const COOKIE_NAME = "guest_session_id";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

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

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie");
  const jar = parseCookie(cookieHeader);
  let sessionId = jar[COOKIE_NAME] ?? "";

  let setNewCookie = false;
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    setNewCookie = true;
  }

  const existing = await payload.find({
    collection: "guest-sessions",
    where: { sessionId: { equals: sessionId } },
    depth: 0,
    limit: 1,
  });

  let session = existing.docs[0];
  if (!session) {
    session = await payload.create({
      collection: "guest-sessions",
      data: { sessionId, favorites: [] },
    });
  }

  const res = NextResponse.json({ sessionId, session });
  if (setNewCookie) {
    res.cookies.set(COOKIE_NAME, sessionId, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });
  }
  return res;
}
