import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 });
  try {
    const res = await fetch(url, { headers: { "User-Agent": "SummitBI/1.0" } });
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


