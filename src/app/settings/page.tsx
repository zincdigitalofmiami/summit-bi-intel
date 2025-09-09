import Container from "@/components/container";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <Container className="py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Settings</h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Manage connections and application preferences
            </p>
          </div>
        </div>
      </Container>

      <Container className="py-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">Connections</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-border p-4">
              <h3 className="font-medium">Gmail / SMTP</h3>
              <p className="text-sm text-muted-foreground">Use your own SMTP (Gmail app password) to send proposal links without a paid provider.</p>
              <div className="mt-3 space-y-2">
                <div className="text-xs text-muted-foreground">ENV keys expected at deploy:</div>
                <ul className="list-disc pl-5 text-sm">
                  <li>SMTP_HOST</li>
                  <li>SMTP_PORT</li>
                  <li>SMTP_USER</li>
                  <li>SMTP_PASS</li>
                  <li>SMTP_FROM</li>
                </ul>
              </div>
            </div>
            <div className="rounded-lg border border-border p-4">
              <h3 className="font-medium">Google Business Profile</h3>
              <p className="text-sm text-muted-foreground">Pull reviews, calls, directions, and search metrics.</p>
              <div className="mt-3 flex items-center gap-2">
                <a href="/api/auth/google/authorize?provider=gbp" className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent">Connect</a>
                <span className="rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs text-yellow-700">Not Connected</span>
              </div>
            </div>
            <div className="rounded-lg border border-border p-4">
              <h3 className="font-medium">Google Analytics 4</h3>
              <p className="text-sm text-muted-foreground">Sessions, conversions, source/medium and goals.</p>
              <div className="mt-3 flex items-center gap-2">
                <a href="/api/auth/google/authorize?provider=ga4" className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent">Connect</a>
                <span className="rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs text-yellow-700">Not Connected</span>
              </div>
            </div>
            <div className="rounded-lg border border-border p-4">
              <h3 className="font-medium">Google Search Console</h3>
              <p className="text-sm text-muted-foreground">Keywords, impressions, CTR, pages and countries.</p>
              <div className="mt-3 flex items-center gap-2">
                <a href="/api/auth/google/authorize?provider=gsc" className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent">Connect</a>
                <span className="rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs text-yellow-700">Not Connected</span>
              </div>
            </div>
            <div className="rounded-lg border border-border p-4">
              <h3 className="font-medium">Google Ads</h3>
              <p className="text-sm text-muted-foreground">Spend, conversions, cost per lead and search terms.</p>
              <div className="mt-3 flex items-center gap-2">
                <a href="/api/auth/google/authorize?provider=ads" className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent">Connect</a>
                <span className="rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs text-yellow-700">Not Connected</span>
              </div>
            </div>
            <div className="rounded-lg border border-border p-4">
              <h3 className="font-medium">WordPress Media</h3>
              <p className="text-sm text-muted-foreground">Connect to WordPress to upload worksite images from phone to your website.</p>
              <div className="mt-3 space-y-2">
                <div className="text-xs text-muted-foreground">ENV keys expected at deploy:</div>
                <ul className="list-disc pl-5 text-sm">
                  <li>WP_BASE_URL</li>
                  <li>WP_USERNAME</li>
                  <li>WP_APPLICATION_PASSWORD</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}


