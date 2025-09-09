import { sql } from "@vercel/postgres";

type CacheTable = "trending" | "permits_cache" | "competitors_cache";

function tableRaw(name: CacheTable) {
  // @vercel/postgres: use raw to inject identifiers safely
  // The set of names is constrained by the CacheTable union
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (sql as any).raw ? (sql as any).raw(name) : name as unknown as TemplateStringsArray;
}

export async function ensureTables() {
  await sql`
    CREATE TABLE IF NOT EXISTS trending (
      id SERIAL PRIMARY KEY,
      payload JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS permits_cache (
      id SERIAL PRIMARY KEY,
      payload JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS competitors_cache (
      id SERIAL PRIMARY KEY,
      payload JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
}

export async function readCache(table: CacheTable) {
  const t = tableRaw(table);
  const { rows } = await sql<{ payload: any }>`SELECT payload FROM ${t} ORDER BY updated_at DESC LIMIT 1;`;
  return rows[0]?.payload ?? null;
}

export async function writeCache(table: CacheTable, payload: any) {
  const t = tableRaw(table);
  await sql`INSERT INTO ${t} (payload) VALUES (${payload});`;
}


