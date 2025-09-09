import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const root = process.cwd();
    const kbPath = path.join(root, "KNOWLEDGE_BASE.md");
    const content = await fs.readFile(kbPath, "utf8");

    // Basic segmentation by headings
    const sections = content
      .split(/\n(?=##?\s)/g)
      .map((s) => s.trim())
      .filter(Boolean);

    const summary = sections.slice(0, 6).join("\n\n");

    return NextResponse.json({
      status: "ok",
      size: content.length,
      sections: sections.length,
      preview: summary,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: (error as Error).message },
      { status: 500 },
    );
  }
}


