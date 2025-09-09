import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { competitors as staticCompetitors } from "@/data/competitors";

export async function GET() {
  try {
    const kbCompetitors = await parseCompetitorsFromKnowledgeBase();
    const merged = mergeCompetitors(staticCompetitors, kbCompetitors);
    return NextResponse.json({ status: "ok", count: merged.length, competitors: merged });
  } catch (error) {
    // Fallback to static on error
    return NextResponse.json({ status: "ok", count: staticCompetitors.length, competitors: staticCompetitors });
  }
}

type KBCompetitor = {
  id: string;
  name: string;
  website?: string;
  phone?: string;
  address?: string;
  services?: string[];
  licensing?: { status: "active" | "inactive" | "unknown"; details?: string; lastVerified?: string };
  strengths?: string[];
  risks?: string[];
  lastUpdated?: string;
};

async function parseCompetitorsFromKnowledgeBase(): Promise<KBCompetitor[]> {
  const kbPath = path.join(process.cwd(), "KNOWLEDGE_BASE.md");
  const md = await fs.readFile(kbPath, "utf8");

  // Find section starting with "Competitor" in the KB
  const sectionMatch = md.match(/(?<=\n|^)#+\s*Competitor[\s\S]*?($|\n#+\s)/i);
  if (!sectionMatch) return [];
  const section = sectionMatch[0];

  // Split crude entries by numbered headings like "1. " or "- " with a name
  const entries = section
    .split(/\n(?=\d+\.|-\s+)/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && /[A-Za-z]/.test(s));

  const parsed: KBCompetitor[] = [];
  for (const e of entries) {
    const nameMatch = e.match(/^(?:\d+\.|-)?\s*([^\n]+?)(?:\s+-|\s+—|\s+\|\s+|$)/);
    if (!nameMatch) continue;
    const name = nameMatch[1].replace(/\*|_/g, "").trim();

    const websiteMatch = e.match(/Website:\s*\[?([^\]\s]+)[^\n]*/i);
    const phoneMatch = e.match(/Phone:\s*([\(\)\d\-\s\+]+)/i);
    const addressMatch = e.match(/Address:\s*([^\n]+)/i);
    const licenseInactive = /inactive/i.test(e);
    const licenseActive = /active/i.test(e) && !licenseInactive;

    const services: string[] = [];
    const servicesMatch = e.match(/Services?:[\s\S]*?(?=\n\n|$)/i);
    if (servicesMatch) {
      const lines = servicesMatch[0].split(/\n|,|\u2022/).map((l) => l.replace(/Services?:/i, "").trim());
      for (const l of lines) if (l.length > 3) services.push(l);
    }

    parsed.push({
      id: slugify(name),
      name,
      website: websiteMatch?.[1]?.replace(/^\[|\]$/g, ""),
      phone: phoneMatch?.[1]?.trim(),
      address: addressMatch?.[1]?.trim(),
      services: services.length ? services : undefined,
      licensing: { status: licenseInactive ? "inactive" : licenseActive ? "active" : "unknown" },
      lastUpdated: new Date().toISOString(),
    });
  }

  // Deduplicate by name
  const dedup = new Map(parsed.map((c) => [c.name.toLowerCase(), c]));
  return Array.from(dedup.values());
}

function mergeCompetitors(staticList: any[], kbList: KBCompetitor[]) {
  const byName = new Map<string, any>();
  for (const c of staticList) byName.set(c.name.toLowerCase(), c);
  for (const k of kbList) {
    const key = k.name.toLowerCase();
    if (!byName.has(key)) byName.set(key, normalize(k));
  }
  return Array.from(byName.values());
}

function normalize(k: KBCompetitor) {
  return {
    id: k.id,
    name: k.name,
    website: k.website ?? "",
    phone: k.phone ?? "",
    address: k.address ?? "",
    services: k.services ?? [],
    licensing: k.licensing ?? { status: "unknown", details: "", lastVerified: new Date().toISOString() },
    strengths: k.strengths ?? [],
    risks: k.risks ?? [],
    lastUpdated: k.lastUpdated ?? new Date().toISOString(),
  };
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}


