import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/locales";

/** Negozia la lingua solo alla radice: le altre rotte sono già esplicite. */
function negotiate(header: string | null): string {
  if (!header) return defaultLocale;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    const hit = locales.find((l) => l === base);
    if (hit) return hit;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname !== "/") return NextResponse.next();

  const locale = negotiate(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/",
};
