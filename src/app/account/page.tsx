import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AccountPage() {
  return (
    <div className="mx-auto w-full max-w-3xl p-6">
      <h1 className="mb-2 text-2xl font-semibold">My Account</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Manage your profile and security preferences.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/account/security" className="rounded-lg border p-4 hover:bg-muted">
          <h2 className="mb-1 font-medium">Security</h2>
          <p className="text-sm text-muted-foreground">Change your password and review login settings.</p>
        </Link>
        <Link href="/account/sessions" className="rounded-lg border p-4 hover:bg-muted">
          <h2 className="mb-1 font-medium">Sessions</h2>
          <p className="text-sm text-muted-foreground">See recent sign-ins and revoke active sessions.</p>
        </Link>
      </div>
    </div>
  );
}


