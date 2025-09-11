"use client";

import { useEffect, useMemo, useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

import Container from "@/components/container";
import ProposalForm from "@/components/forms/proposal-form";
import { Button } from "@/components/ui/button";
import type { ProposalLineItem, ProposalRecord } from "@/lib/proposals";
import {
  calculateTotal,
  deleteProposal as deleteProposalLocal,
  encodeSignToken,
  getAllProposals,
  saveProposal as saveProposalLocal,
} from "@/lib/proposals";

function toProposalRecordFromApi(api: any): ProposalRecord {
  const items: ProposalLineItem[] = (api.lineItems || []).map((li: any) => ({
    description: String(li.description ?? ""),
    amount: Number(li.amount ?? 0),
  }));
  return {
    id: String(api.id),
    clientName: String(api.clientName ?? ""),
    clientEmail: String(api.clientEmail ?? ""),
    projectName: String(api.projectName ?? ""),
    notes: api.notes ? String(api.notes) : undefined,
    lineItems: items,
    createdAt: new Date(api.createdAt ?? Date.now()).toISOString(),
  };
}

export default function ProposalsPage() {
  const [showForm, setShowForm] = useState(false);
  const [proposals, setProposals] =
    useState<ProposalRecord[]>(getAllProposals());

  const totalValue = useMemo(
    () => proposals.reduce((sum, p) => sum + calculateTotal(p.lineItems), 0),
    [proposals],
  );

  const createProposal = async (
    data: Omit<ProposalRecord, "id" | "createdAt">
  ) => {
    // Try API first
    try {
      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: data.clientName,
          clientEmail: data.clientEmail,
          projectName: data.projectName,
          notes: data.notes,
          lineItems: data.lineItems.map((li) => ({
            description: li.description,
            amount: Number(li.amount) || 0,
          })),
        }),
      });
      if (res.ok) {
        const json = await res.json();
        const created = toProposalRecordFromApi(json.proposal);
        setProposals((prev) => [created, ...prev]);
        setShowForm(false);
        return;
      }
    } catch {}

    // Fallback to local storage
    const record: ProposalRecord = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...data,
    };
    saveProposalLocal(record);
    setProposals(getAllProposals());
    setShowForm(false);
  };

  const copySignLink = (p: ProposalRecord) => {
    const token = encodeSignToken({
      id: p.id,
      clientName: p.clientName,
      clientEmail: p.clientEmail,
      projectName: p.projectName,
      total: calculateTotal(p.lineItems),
    });
    const url = `${window.location.origin}/proposals/sign/${token}`;
    navigator.clipboard.writeText(url);
    alert("Sign link copied to clipboard");
  };

  const sendProposalEmail = async (p: ProposalRecord) => {
    if (!confirm(`Send proposal to ${p.clientEmail}?`)) return;

    try {
      const response = await fetch('/api/proposals/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proposalId: p.id,
          recipientEmail: p.clientEmail,
          recipientName: p.clientName,
          customMessage: `Thank you for choosing Summit Marine Development. We're excited to provide you with our competitive pricing and expert marine construction services.`
        })
      });

      const result = await response.json();

      if (result.success) {
        alert(`✅ Proposal sent successfully to ${p.clientEmail}!\n\nSign link: ${result.signUrl}`);
      } else {
        alert(`⚠️ Email service unavailable, but you can still use the sign link:\n${result.signUrl}`);
      }
    } catch (error) {
      console.error('Failed to send proposal:', error);
      alert('Failed to send proposal. Please try again.');
    }
  };

  const downloadPdf = async (p: ProposalRecord) => {
    const pdf = await PDFDocument.create();
    const page = pdf.addPage([612, 792]); // Letter
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const title = `Proposal: ${p.projectName}`;
    page.drawText(title, {
      x: 50,
      y: 740,
      size: 18,
      font,
      color: rgb(0.1, 0.1, 0.4),
    });
    page.drawText(`Client: ${p.clientName} <${p.clientEmail}>`, {
      x: 50,
      y: 710,
      size: 12,
      font,
    });
    page.drawText(`Date: ${new Date(p.createdAt).toLocaleString()}`, {
      x: 50,
      y: 690,
      size: 12,
      font,
    });
    let y = 660;
    page.drawText("Line Items:", { x: 50, y, size: 12, font });
    y -= 20;
    p.lineItems.forEach((it) => {
      page.drawText(`- ${it.description}`, { x: 60, y, size: 12, font });
      page.drawText(`$${(Number(it.amount) || 0).toFixed(2)}`, {
        x: 480,
        y,
        size: 12,
        font,
      });
      y -= 18;
    });
    y -= 10;
    page.drawText(`Total: $${calculateTotal(p.lineItems).toFixed(2)}`, {
      x: 50,
      y,
      size: 14,
      font,
    });

    const bytes = await pdf.save();
    const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${p.projectName}-proposal.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Load from API on mount; merge with local storage to avoid flicker
  useEffect(() => {
    let cancelled = false;
    const localAtMount = getAllProposals();
    (async () => {
      try {
        const res = await fetch("/api/proposals", { cache: "no-store" });
        if (!res.ok) return;
        const json = await res.json();
        if (Array.isArray(json.proposals)) {
          const mapped = json.proposals.map(toProposalRecordFromApi);
          const byId = new Map<string, ProposalRecord>();
          for (const p of localAtMount) byId.set(p.id, p);
          for (const p of mapped) byId.set(p.id, p);
          const merged = Array.from(byId.values()).sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
          if (!cancelled) setProposals(merged);
        }
      } catch {
        // ignore; keep localStorage data
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <Container className="py-4 sm:py-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Proposal Management
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Create and track proposals for marine construction projects
            </p>
          </div>
          <Button onClick={() => setShowForm(true)}>Create Proposal</Button>
        </div>
      </Container>

      {showForm && (
        <Container className="py-6">
          <div className="rounded-lg border border-border bg-white p-6 dark:bg-slate-800">
            <h2 className="mb-4 text-xl font-semibold">New Proposal</h2>
            <ProposalForm
              onCancel={() => setShowForm(false)}
              onSubmit={(payload) => createProposal(payload)}
            />
          </div>
        </Container>
      )}

      {/* Proposal Statistics */}
      <Container className="py-6">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-white p-6 dark:bg-slate-800">
            <h3 className="text-sm font-medium text-muted-foreground">
              Total Proposals
            </h3>
            <p className="text-2xl font-bold">{proposals.length}</p>
            <p className="text-xs text-muted-foreground">All time</p>
          </div>
          <div className="rounded-lg border border-border bg-white p-6 dark:bg-slate-800">
            <h3 className="text-sm font-medium text-muted-foreground">
              Pending Proposals
            </h3>
            <p className="text-2xl font-bold">{proposals.length}</p>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </div>
          <div className="rounded-lg border border-border bg-white p-6 dark:bg-slate-800">
            <h3 className="text-sm font-medium text-muted-foreground">
              Accepted Proposals
            </h3>
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-muted-foreground">This year</p>
          </div>
          <div className="rounded-lg border border-border bg-white p-6 dark:bg-slate-800">
            <h3 className="text-sm font-medium text-muted-foreground">
              Win Rate
            </h3>
            <p className="text-2xl font-bold">0%</p>
            <p className="text-xs text-muted-foreground">Acceptance rate</p>
          </div>
        </div>
      </Container>

      {/* Proposal List */}
      <Container className="py-6">
        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border p-6">
            <h2 className="text-xl font-semibold">Active Proposals</h2>
            <p className="text-sm text-muted-foreground">
              Current proposals for marine construction projects
            </p>
          </div>
          <div className="p-6">
            {proposals.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No proposals found</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Create your first proposal to start winning projects
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {proposals.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between rounded-lg border border-border p-4"
                  >
                    <div>
                      <div className="font-medium">{p.projectName}</div>
                      <div className="text-sm text-muted-foreground">
                        {p.clientName} • {p.clientEmail}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="default"
                        onClick={() => sendProposalEmail(p)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        📧 Send Email
                      </Button>
                      <Button variant="outline" onClick={() => copySignLink(p)}>
                        Copy Sign Link
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => downloadPdf(p)}
                      >
                        Download PDF
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={async () => {
                          try {
                            const res = await fetch(`/api/proposals/${p.id}`, {
                              method: "DELETE",
                            });
                            if (res.ok) {
                              setProposals((prev) => prev.filter((x) => x.id !== p.id));
                              return;
                            }
                          } catch {}
                          // Fallback to local
                          deleteProposalLocal(p.id);
                          setProposals(getAllProposals());
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Proposal Types */}
      <Container className="py-6">
        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border p-6">
            <h2 className="text-xl font-semibold">Proposal Breakdown</h2>
            <p className="text-sm text-muted-foreground">
              Proposals by service type and status
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-medium">By Service Type</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3 dark:bg-blue-950/20">
                    <span className="text-sm">Seawall Construction</span>
                    <span className="font-bold">0</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-green-50 p-3 dark:bg-green-950/20">
                    <span className="text-sm">Dock Construction</span>
                    <span className="font-bold">0</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-purple-50 p-3 dark:bg-purple-950/20">
                    <span className="text-sm">Retaining Walls</span>
                    <span className="font-bold">0</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-orange-50 p-3 dark:bg-orange-950/20">
                    <span className="text-sm">Repairs & Maintenance</span>
                    <span className="font-bold">0</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">By Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg bg-yellow-50 p-3 dark:bg-yellow-950/20">
                    <span className="text-sm">Draft</span>
                    <span className="font-bold">0</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3 dark:bg-blue-950/20">
                    <span className="text-sm">Sent</span>
                    <span className="font-bold">0</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-green-50 p-3 dark:bg-green-950/20">
                    <span className="text-sm">Accepted</span>
                    <span className="font-bold">0</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-red-50 p-3 dark:bg-red-950/20">
                    <span className="text-sm">Declined</span>
                    <span className="font-bold">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Proposal Value Analysis */}
      <Container className="py-6">
        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border p-6">
            <h2 className="text-xl font-semibold">Proposal Value Analysis</h2>
            <p className="text-sm text-muted-foreground">
              Financial overview of proposals and potential revenue
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950/20">
                <h3 className="font-medium text-emerald-900 dark:text-emerald-100">
                  Total Proposed Value
                </h3>
                <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
                  ${totalValue.toFixed(2)}
                </p>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  All active proposals
                </p>
              </div>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
                <h3 className="font-medium text-blue-900 dark:text-blue-100">
                  Average Proposal Value
                </h3>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  $
                  {(proposals.length
                    ? totalValue / proposals.length
                    : 0
                  ).toFixed(2)}
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Per proposal
                </p>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-950/20">
                <h3 className="font-medium text-purple-900 dark:text-purple-100">
                  Pipeline Value
                </h3>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  $0
                </p>
                <p className="text-xs text-purple-700 dark:text-purple-300">
                  Potential revenue
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
