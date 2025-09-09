"use client";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import SignaturePad from "@/components/ui/signature-pad";
import { decodeSignToken } from "@/lib/proposals";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function SignProposalPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const [resolvedParams, setResolvedParams] = useState<{ token: string } | null>(null);
  
  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  const payload = useMemo(() => {
    if (!resolvedParams) return null;
    return decodeSignToken(resolvedParams.token);
  }, [resolvedParams]);
  const [sig, setSig] = useState<string | null>(null);
  const [signed, setSigned] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!payload) return;
    const pdf = await PDFDocument.create();
    const page = pdf.addPage([612, 792]);
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    page.drawText(`Proposal Acceptance`, {
      x: 50,
      y: 740,
      size: 18,
      font,
      color: rgb(0.1, 0.1, 0.4),
    });
    page.drawText(`Project: ${payload.projectName}`, {
      x: 50,
      y: 710,
      size: 12,
      font,
    });
    page.drawText(`Client: ${payload.clientName} <${payload.clientEmail}>`, {
      x: 50,
      y: 692,
      size: 12,
      font,
    });
    page.drawText(`Total: $${payload.total.toFixed(2)}`, {
      x: 50,
      y: 674,
      size: 12,
      font,
    });
    page.drawText(`Date: ${new Date().toLocaleString()}`, {
      x: 50,
      y: 656,
      size: 12,
      font,
    });
    if (sig) {
      const res = await fetch(sig);
      const bytes = await res.arrayBuffer();
      const png = await pdf.embedPng(bytes);
      page.drawImage(png, { x: 50, y: 580, width: 300, height: 90 });
    }
    const file = await pdf.save();
    const blob = new Blob([new Uint8Array(file)], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${payload.projectName}-signed.pdf`;
    a.click();
    URL.revokeObjectURL(url);
    setSigned(true);
  }, [payload, sig]);

  if (!payload) {
    return (
      <Container className="py-10">
        <div className="rounded-lg border border-border p-6">
          <h1 className="text-xl font-semibold">Invalid or expired link</h1>
          <p className="text-muted-foreground">
            Please contact the sender for a new signing link.
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="space-y-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Sign Proposal</h1>
          <p className="text-muted-foreground">
            {payload.projectName} • {payload.clientName}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-white p-6 dark:bg-slate-800">
        <h2 className="mb-2 font-medium">Signature</h2>
        <SignaturePad onChange={setSig} />
        <div className="mt-4 flex gap-3">
          <Button disabled={!sig} onClick={handleDownload}>
            Download Signed PDF
          </Button>
          {signed && (
            <span className="text-sm text-emerald-600">
              Signed PDF generated.
            </span>
          )}
        </div>
      </div>
    </Container>
  );
}
