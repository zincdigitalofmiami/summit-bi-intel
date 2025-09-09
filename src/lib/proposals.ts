export interface ProposalLineItem {
  description: string;
  amount: number;
}

export interface ProposalRecord {
  id: string;
  clientName: string;
  clientEmail: string;
  projectName: string;
  notes?: string;
  lineItems: ProposalLineItem[];
  createdAt: string; // ISO string
}

// Very small helper using localStorage for demo purposes. In production, replace with Postgres/Blob.
const STORAGE_KEY = "summit-proposals";

export function getAllProposals(): ProposalRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProposalRecord[]) : [];
  } catch {
    return [];
  }
}

export function saveProposal(record: ProposalRecord): void {
  if (typeof window === "undefined") return;
  const existing = getAllProposals();
  const next = [record, ...existing.filter(p => p.id !== record.id)];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function deleteProposal(id: string): void {
  if (typeof window === "undefined") return;
  const existing = getAllProposals();
  const next = existing.filter(p => p.id !== id);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

// Token helpers: pack minimal data into URL-safe base64 for a public sign link.
export interface SignTokenPayload {
  id: string;
  clientName: string;
  clientEmail: string;
  projectName: string;
  total: number;
}

function toBase64Url(input: string): string {
  if (typeof window === "undefined") return input;
  return btoa(input).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function fromBase64Url(input: string): string {
  if (typeof window === "undefined") return input;
  const pad = (s: string) => s + "===".slice((s.length + 3) % 4);
  return atob(pad(input.replaceAll("-", "+").replaceAll("_", "/")));
}

export function encodeSignToken(payload: SignTokenPayload): string {
  const json = JSON.stringify(payload);
  return toBase64Url(json);
}

export function decodeSignToken(token: string): SignTokenPayload | null {
  try {
    const json = fromBase64Url(token);
    return JSON.parse(json) as SignTokenPayload;
  } catch {
    return null;
  }
}

export function calculateTotal(items: ProposalLineItem[]): number {
  return items.reduce((sum, it) => sum + (Number(it.amount) || 0), 0);
}


