import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { createRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 30; // 30 seconds for web scraping operations

const scrapeLimit = createRateLimit({ interval: 60 * 1000, uniqueTokenPerInterval: 100 });

export async function GET(request: NextRequest) {
  const rateLimitResult = scrapeLimit.check(request);
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      { status: 429, headers: { 'X-RateLimit-Limit': '100', 'X-RateLimit-Remaining': '0' } }
    );
  }

  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 });
  try {
    const res = await fetch(url, { 
      headers: { "User-Agent": "SummitBI/1.0" },
      signal: AbortSignal.timeout(10000)
    });
    const html = await res.text();
    const $ = cheerio.load(html);
    const title = $("title").first().text();
    const h1 = $("h1").first().text();
    const description = $('meta[name="description"]').attr("content") || "";
    const links = Array.from(new Set($("a[href]").map((_, el) => $(el).attr("href")).get().slice(0, 50)));
    return NextResponse.json({ title, h1, description, linksCount: links.length, links });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}


