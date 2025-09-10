"use client";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();
  return (
    <div className="relative min-h-[80vh] overflow-hidden bg-gradient-to-br from-sky-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800">
      <div className="absolute inset-0 bg-[url('/logos/Primary Summit Logo.png')] bg-contain bg-center bg-no-repeat opacity-5" />
      <Container className="relative z-10 py-16">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-white/80 p-10 backdrop-blur-md dark:bg-slate-900/70">
          <h1 className="text-3xl font-bold tracking-tight">Welcome to Fusion</h1>
          <p className="mt-2 text-muted-foreground">
            You’re all set, Jose. Let’s take a quick tour and finish your setup.
          </p>
          <div className="mt-8 flex gap-3">
            <Button onClick={() => router.push('/dashboard')}>Go to Dashboard</Button>
            <Button variant="secondary" onClick={() => router.push('/settings')}>Review Settings</Button>
          </div>
        </div>
      </Container>
    </div>
  );
}


