import { NextResponse } from "next/server";
import { competitors } from "@/data/competitors";

export async function GET() {
  try {
    const insights = buildInsights();
    return NextResponse.json({ status: "ok", insights, generatedAt: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ status: "error", message: (error as Error).message }, { status: 500 });
  }
}

function buildInsights() {
  const items: Array<{ title: string; detail: string; severity: "low" | "medium" | "high" }> = [];

  // Simple rules based on seeded competitor data
  for (const c of competitors) {
    if (c.licensing?.status && /inactive/i.test(c.licensing.status)) {
      items.push({
        title: `License check: ${c.name}`,
        detail: `${c.name} licensing appears inactive — verify before procurement.`,
        severity: "high",
      });
    }

    // Heuristic: treat long strengths lists as strong sentiment in absence of reviews field
    if (Array.isArray((c as any).strengths) && (c as any).strengths.length >= 3) {
      items.push({
        title: `Market sentiment: ${c.name}`,
        detail: `${c.name} shows strong positioning based on documented strengths — monitor pricing and messaging.`,
        severity: "medium",
      });
    }
  }

  if (!items.length) {
    items.push({ title: "No insights", detail: "Add competitor data for analysis.", severity: "low" });
  }

  return items.slice(0, 10);
}


