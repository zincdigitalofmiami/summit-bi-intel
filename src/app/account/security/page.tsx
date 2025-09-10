"use client";
import { useState } from "react";

export default function SecurityPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    const res = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) setMessage(data?.error || "Failed to change password");
    else setMessage("Password updated");
  }

  return (
    <div className="mx-auto w-full max-w-xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">Security</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="current-password" className="mb-1 block text-sm">Current password</label>
          <input id="current-password" className="w-full rounded-md border p-2" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </div>
        <div>
          <label htmlFor="new-password" className="mb-1 block text-sm">New password</label>
          <input id="new-password" className="w-full rounded-md border p-2" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <button disabled={saving} className="rounded-md border px-3 py-2 hover:bg-muted" type="submit">
          {saving ? "Saving..." : "Change password"}
        </button>
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </form>
    </div>
  );
}


