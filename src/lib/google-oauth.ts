export type GoogleProvider = "ga4" | "gsc" | "gbp" | "ads";

const PROVIDER_SCOPES: Record<GoogleProvider, string[]> = {
  ga4: [
    // Google Analytics Data API
    "https://www.googleapis.com/auth/analytics.readonly",
  ],
  gsc: [
    // Search Console
    "https://www.googleapis.com/auth/webmasters.readonly",
  ],
  gbp: [
    // Business Profile Performance/Management
    "https://www.googleapis.com/auth/business.manage",
  ],
  ads: [
    // Google Ads (read-only)
    "https://www.googleapis.com/auth/adwords.readonly",
  ],
};

function requiredEnv(name: string): string {
  const val = process.env[name];
  if (!val) throw new Error(`Missing env ${name}`);
  return val;
}

export function buildGoogleAuthorizeUrl(provider: GoogleProvider, state?: string) {
  const clientId = requiredEnv("GOOGLE_CLIENT_ID");
  const callback = requiredEnv("GOOGLE_REDIRECT_URI");
  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: callback,
    access_type: "offline",
    include_granted_scopes: "true",
    scope: PROVIDER_SCOPES[provider].join(" "),
    prompt: "consent",
  });
  if (state) params.set("state", state);
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export async function exchangeCodeForTokens(code: string) {
  const clientId = requiredEnv("GOOGLE_CLIENT_ID");
  const clientSecret = requiredEnv("GOOGLE_CLIENT_SECRET");
  const callback = requiredEnv("GOOGLE_REDIRECT_URI");
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: callback,
  });
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token exchange failed: ${res.status} ${text}`);
  }
  return res.json() as Promise<{ access_token: string; refresh_token?: string; expires_in: number; token_type: string; scope?: string; }>;
}


