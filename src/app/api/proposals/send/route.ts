import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Optional: use fetch to Resend instead of importing the SDK to reduce build deps.
async function sendEmailViaResend({ apiKey, from, to, subject, html }: { apiKey: string; from: string; to: string; subject: string; html: string; }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Resend failed: ${res.status} ${res.statusText} ${text}`);
  }
  return res.json();
}

function getBaseUrl(req: Request) {
  const envUrl = process.env.APP_URL;
  if (envUrl && envUrl.startsWith("http")) {
    return envUrl.replace(/\/+$/, "");
  }
  try {
    const url = new URL(req.url);
    const proto = req.headers.get("x-forwarded-proto") || url.protocol.replace(":", "");
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || url.host;
    return `${proto}://${host}`.replace(/\/+$/, "");
  } catch {
    return "http://localhost:3000";
  }
}

export async function POST(req: Request) {
  try {
    const { proposalId } = await req.json();

    if (!proposalId) {
      return NextResponse.json({ error: "proposalId is required" }, { status: 400 });
    }

    // Pull proposal with client for email details
    const proposal = await prisma.proposal.findUnique({
      where: { id: proposalId },
      include: { client: true, lineItems: true },
    });

    if (!proposal) {
      return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
    }

    const baseUrl = getBaseUrl(req);

    // If you have a token encoder util, swap this line to use it.
    const signPath = `/proposals/sign/${proposal.id}`;
    const signUrl = `${baseUrl}${signPath}`;

    const apiKey = process.env.RESEND_API_KEY || "";
    const from = process.env.EMAIL_FROM || "proposals@no-reply.local";
    const to = proposal.client?.email || process.env.FALLBACK_TO_EMAIL || "";
    const subject = `Proposal: ${proposal.projectName || "Project"} — Review & Sign`;

    const greetingName = proposal.client?.name ? ` ${proposal.client.name}` : "";
    const html = [
      '<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial">',
      '<h2>Proposal ready to sign</h2>',
      `<p>Hello${greetingName},</p>`,
      '<p>Your proposal is ready. Click the button below to review and sign.</p>',
      `<p><a href="${signUrl}" style="display:inline-block;padding:10px 16px;background:#0ea5e9;color:#fff;text-decoration:none;border-radius:6px">Review & Sign</a></p>`,
      `<p>If the button doesn’t work, paste this into your browser:<br/><code>${signUrl}</code></p>`,
      '</div>'
    ].join("");

    if (apiKey && to) {
      await sendEmailViaResend({ apiKey, from, to, subject, html });
      return NextResponse.json({ ok: true, sent: true, signUrl });
    }

    // Graceful fallback: no API key or no recipient
    return NextResponse.json({
      ok: true,
      sent: false,
      reason: !apiKey ? "RESEND_API_KEY missing" : "No recipient email",
      signUrl,
    });
  } catch (err: any) {
    console.error("send proposal failed:", err);
    return NextResponse.json({ error: "Internal error", detail: String(err?.message || err) }, { status: 500 });
  }
}
