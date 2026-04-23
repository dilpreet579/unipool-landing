import { NextResponse } from "next/server";

export const runtime = "nodejs";

export function GET(): NextResponse {
  const target = process.env.NEXT_PUBLIC_APK_URL?.trim();

  if (!target) {
    return new NextResponse("APK not configured", { status: 404 });
  }

  const response = NextResponse.redirect(target, 307);
  response.headers.set("Cache-Control", "no-store");
  return response;
}
