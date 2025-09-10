"use client";
import { useState } from "react";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("jose@summitmarinedevelopment.com");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"password" | "magic">("password");
  const [sent, setSent] = useState(false);
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800">
      <div className="absolute inset-0 bg-[url('/logos/Primary%20Summit%20Logo.png')] bg-contain bg-center bg-no-repeat opacity-5" />
      <Container className="relative z-10 py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold tracking-tight">Summit Fusion</h1>
            <p className="mt-4 text-lg text-muted-foreground">Hand built and coded specifically for Jose Morales at Summit Marine Development</p>
            <div className="mt-8 rounded-xl border border-emerald-200 bg-white/80 p-6 backdrop-blur-md dark:border-emerald-800 dark:bg-slate-900/70">
              <div className="mb-4 flex gap-2">
                <Button variant={mode === "password" ? "default" : "secondary"} onClick={() => setMode("password")}>Password</Button>
                <Button variant={mode === "magic" ? "default" : "secondary"} onClick={() => setMode("magic")}>Magic Link</Button>
              </div>
              <h2 className="mb-2 text-xl font-semibold">Sign in</h2>
              <p className="mb-4 text-sm text-muted-foreground">{mode === "magic" ? "We’ll email you a secure sign-in link." : "Use your email and password."}</p>
              <div className="space-y-3">
                <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" />
                {mode === "password" ? (
                  <>
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" />
                    <Button
                      className="w-full"
                      onClick={async () => {
                        setErr(null);
                        const res = await fetch("/api/auth/password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
                        if (res.ok) window.location.href = "/dashboard";
                        else setErr("Invalid credentials");
                      }}
                    >
                      Sign In
                    </Button>
                    <div className="text-right">
                      <a className="text-sm text-emerald-700 hover:underline" href="/auth/forgot">Forgot password?</a>
                    </div>
                  </>
                ) : (
                  <Button
                    className="w-full"
                    onClick={async () => {
                      setErr(null);
                      setFallbackUrl(null);
                      const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
                      if (res.ok) {
                        const data = await res.json().catch(() => ({}));
                        if (data?.loginUrl) setFallbackUrl(data.loginUrl);
                        setSent(true);
                      } else {
                        const data = await res.json().catch(() => ({}));
                        if (data?.loginUrl) {
                          setFallbackUrl(data.loginUrl);
                          setSent(true);
                        } else {
                          setErr("Failed to send link");
                        }
                      }
                    }}
                  >
                    Send Magic Link
                  </Button>
                )}
                {sent && !fallbackUrl && <p className="text-sm text-emerald-700">Check your inbox for the sign-in link.</p>}
                {fallbackUrl && (
                  <div className="space-y-2">
                    <p className="text-sm text-amber-700">Email isn’t configured yet. You can sign in directly:</p>
                    <a className="block w-full rounded-md bg-emerald-600 px-3 py-2 text-center text-white hover:bg-emerald-700" href={fallbackUrl}>Open Magic Link</a>
                  </div>
                )}
                {err && <p className="text-sm text-red-600">{err}</p>}
              </div>
              <p className="mt-6 text-xs text-muted-foreground">By continuing you agree to internal use. Unauthorized access prohibited.</p>
            </div>
          </div>
          <div className="hidden items-center justify-center md:flex">
            <div className="rounded-2xl border border-border bg-card/70 p-8 backdrop-blur-md">
              <img src="/logos/Primary%20Summit%20Logo.png" alt="Summit Marine Development" className="mx-auto w-64" />
              <p className="mt-6 max-w-sm text-center text-muted-foreground">Secure portal for Summit Marine Development. If you need access, contact admin.</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}


