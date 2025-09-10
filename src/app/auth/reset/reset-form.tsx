"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetForm() {
  const search = useSearchParams();
  const router = useRouter();
  const token = search.get("token") || "";
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-md rounded-xl border border-border bg-card p-6">
        <h1 className="mb-2 text-2xl font-bold">Reset password</h1>
        <p className="mb-4 text-sm text-muted-foreground">Enter a new password for your account.</p>
        <div className="space-y-3">
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" />
          <Button
            className="w-full"
            onClick={async () => {
              setErr(null);
              const res = await fetch("/api/auth/reset", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, password }) });
              if (res.ok) router.push("/auth/login");
              else setErr("Failed to reset password");
            }}
          >
            Reset password
          </Button>
          {err && <p className="text-sm text-red-600">{err}</p>}
        </div>
      </div>
    </Container>
  );
}


