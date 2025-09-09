import Parser from "rss-parser";
import { NextResponse } from "next/server";
import { ensureTables, readCache, writeCache } from "@/lib/db";

type FeedItem = { title: string; link: string; pubDate?: string; source: string };

const sources = [
  { name: "MarineLink", url: "https://www.marinelink.com/rss/news" },
  { name: "Marine Construction News", url: "https://news.google.com/rss/search?q=marine+construction+florida" },
  { name: "Seawall News", url: "https://news.google.com/rss/search?q=seawall+construction+florida" },
  { name: "Boat Dock News", url: "https://news.google.com/rss/search?q=boat+dock+construction+florida" },
];

export async function GET() {
  const parser = new Parser();
  const items: FeedItem[] = [];

  try {
    await ensureTables();
    const cached = await readCache("trending");

    // Try network with timeout; fallback to cache
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 5000);
    const results = await Promise.allSettled(
      sources.map(async (s) => {
        const feed = await parser.parseURL(s.url);
        return (feed.items || []).slice(0, 10).map((i) => ({
          title: i.title || "Untitled",
          link: i.link || "",
          pubDate: i.pubDate,
          source: s.name,
        }));
      })
    );
    clearTimeout(t);

    for (const r of results) {
      if (r.status === "fulfilled") items.push(...r.value);
    }

    // Sort by date desc when available
    items.sort((a, b) => {
      const da = a.pubDate ? new Date(a.pubDate).getTime() : 0;
      const db = b.pubDate ? new Date(b.pubDate).getTime() : 0;
      return db - da;
    });
    const payload = { status: "ok", count: items.length, items: items.slice(0, 25) };
    await writeCache("trending", payload);
    return NextResponse.json(payload, { headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=86400" } });
  } catch (error) {
    try {
      const fallback = await readCache("trending");
      if (fallback) {
        return NextResponse.json(fallback, { headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=86400" } });
      }
    } catch {}
    return NextResponse.json({ status: "ok", count: 0, items: [] });
  }
}


