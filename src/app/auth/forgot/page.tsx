"use client";
import { useState } from "react";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-md rounded-xl border border-border bg-card p-6">
        <h1 className="mb-2 text-2xl font-bold">Forgot password</h1>
        <p className="mb-4 text-sm text-muted-foreground">Enter your email and we'll send a reset link.</p>
        <div className="space-y-3">
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          <Button
            className="w-full"
            onClick={async () => {
              setErr(null);
              const res = await fetch("/api/auth/forgot", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
              if (res.ok) setSent(true);
              else setErr("Failed to send reset link");
            }}
          >
            Send reset link
          </Button>
          {sent && <p className="text-sm text-emerald-700">If your email exists, you'll receive a reset link.</p>}
          {err && <p className="text-sm text-red-600">{err}</p>}
        </div>
      </div>
    </Container>
  );
}


