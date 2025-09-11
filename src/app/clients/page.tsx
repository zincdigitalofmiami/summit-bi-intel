"use client";
import { useEffect, useMemo, useState } from "react";
import Container from "@/components/container";

type Client = {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  type?: "RESIDENTIAL" | "COMMERCIAL" | "MARINA";
  createdAt: string;
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", type: "RESIDENTIAL" });

  async function loadClients() {
    setLoading(true);
    try {
      const res = await fetch("/api/clients", { cache: "no-store" });
      const data = await res.json();
      if (data?.clients) setClients(data.clients);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadClients();
  }, []);

  async function createClient() {
    if (!form.name.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email || undefined,
          phone: form.phone || undefined,
          address: form.address || undefined,
          type: form.type,
        }),
      });
      if (res.ok) {
        setShowForm(false);
        setForm({ name: "", email: "", phone: "", address: "", type: "RESIDENTIAL" });
        await loadClients();
      }
    } finally {
      setLoading(false);
    }
  }

  const [projects, setProjects] = useState<any[]>([]);

  // Load projects data to calculate client statistics
  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
        const data = await res.json();
        if (data?.projects) setProjects(data.projects);
      } catch (error) {
        console.warn('Failed to load projects:', error);
      }
    }
    loadProjects();
  }, []);

  const stats = useMemo(() => {
    const total = clients.length;

    // Calculate active clients (have active/ongoing projects)
    const activeClientIds = new Set(
      projects
        .filter(p => p.status === 'ACTIVE')
        .map(p => p.client)
        .filter(client => client) // Remove null/undefined values
    );
    const active = activeClientIds.size;

    // Calculate repeat clients (have completed projects and current/ongoing projects)
    const completedProjectClients = new Set(
      projects
        .filter(p => p.status === 'COMPLETED')
        .map(p => p.client)
        .filter(client => client) // Remove null/undefined values
    );
    const repeat = [...activeClientIds].filter(id => completedProjectClients.has(id)).length;

    // Calculate average lifetime value
    const clientProjectValues: { [key: string]: number } = {};
    projects.forEach(project => {
      if (project.client) { // Only process projects with a client
        if (!clientProjectValues[project.client]) {
          clientProjectValues[project.client] = 0;
        }
        clientProjectValues[project.client] += Number(project.budget) || 0;
      }
    });

    const totalLifetimeValue = Object.values(clientProjectValues).reduce((sum, value) => sum + value, 0);
    const averageLifetimeValue = total > 0 ? Math.round(totalLifetimeValue / total) : 0;

    // Calculate client categories
    const residential = clients.filter(c => c.type === 'RESIDENTIAL').length;
    const commercial = clients.filter(c => c.type === 'COMMERCIAL').length;
    const marina = clients.filter(c => c.type === 'MARINA').length;

    // Calculate location-based stats
    const panamaCity = clients.filter(c => c.location?.toLowerCase().includes('panama city')).length;
    const panamaCityBeach = clients.filter(c => c.location?.toLowerCase().includes('beach')).length;
    const surrounding = clients.filter(c =>
      c.location &&
      !c.location.toLowerCase().includes('panama city') &&
      !c.location.toLowerCase().includes('beach')
    ).length;

    // Calculate project history stats
    const firstTimeClients = clients.filter(c =>
      !projects.some(p => p.client === c.id && p.status === 'COMPLETED')
    ).length;

    const repeatClients = clients.filter(c =>
      projects.some(p => p.client === c.id && p.status === 'COMPLETED')
    ).length;

    return {
      total,
      active,
      repeat,
      averageLifetimeValue,
      categories: {
        residential,
        commercial,
        marina,
        locations: {
          panamaCity,
          panamaCityBeach,
          surrounding
        },
        history: {
          firstTime: firstTimeClients,
          repeat: repeatClients
        }
      }
    };
  }, [clients, projects]);
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <Container className="py-4 sm:py-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Client Management</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Manage relationships with residential and commercial waterfront property owners
            </p>
          </div>
          <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-sm sm:text-base self-start sm:self-auto">
            Add New Client
          </button>
        </div>
      </Container>

      {/* Client Statistics */}
      <Container className="py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Total Clients</h3>
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-xs text-muted-foreground">All time</p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Active Clients</h3>
            <p className="text-2xl font-bold">{stats.active}</p>
            <p className="text-xs text-muted-foreground">Current projects</p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Repeat Clients</h3>
            <p className="text-2xl font-bold">{stats.repeat}</p>
            <p className="text-xs text-muted-foreground">Multiple projects</p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Client Lifetime Value</h3>
            <p className="text-2xl font-bold">${stats.averageLifetimeValue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Average</p>
          </div>
        </div>
      </Container>

      {/* Client List */}
      <Container className="py-6">
        <div className="bg-card rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Client Directory</h2>
            <p className="text-sm text-muted-foreground">
              Waterfront property owners in Panama City and surrounding areas
            </p>
          </div>
          <div className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading…</p>
              </div>
            ) : clients.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No clients found</p>
                <p className="text-sm text-muted-foreground mt-2">Add your first client to start building your customer base</p>
              </div>
            ) : (
              <div className="space-y-3">
                {clients.map((c) => (
                  <div key={c.id} className="flex items-center justify-between rounded border border-border p-4">
                    <div>
                      <p className="font-semibold">{c.name}</p>
                      <p className="text-sm text-muted-foreground">{c.email || "—"}{c.phone ? ` · ${c.phone}` : ""}</p>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">{c.type || "RESIDENTIAL"}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Client Types */}
      <Container className="py-6">
        <div className="bg-card rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Client Categories</h2>
            <p className="text-sm text-muted-foreground">
              Breakdown of clients by property type and location
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium">Property Type</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <span className="text-sm">Residential Waterfront</span>
                    <span className="font-bold">{stats.categories.residential}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <span className="text-sm">Commercial Properties</span>
                    <span className="font-bold">{stats.categories.commercial}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <span className="text-sm">Marinas</span>
                    <span className="font-bold">{stats.categories.marina}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Location</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <span className="text-sm">Panama City</span>
                    <span className="font-bold">{stats.categories.locations.panamaCity}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-teal-50 dark:bg-teal-950/20 rounded-lg">
                    <span className="text-sm">Panama City Beach</span>
                    <span className="font-bold">{stats.categories.locations.panamaCityBeach}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-pink-50 dark:bg-pink-950/20 rounded-lg">
                    <span className="text-sm">Surrounding Areas</span>
                    <span className="font-bold">{stats.categories.locations.surrounding}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Project History</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                    <span className="text-sm">First Time Clients</span>
                    <span className="font-bold">{stats.categories.history.firstTime}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                    <span className="text-sm">Repeat Clients</span>
                    <span className="font-bold">{stats.categories.history.repeat}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {showForm && (
        <Container className="py-6">
          <div className="bg-card rounded-lg border border-border p-6 max-w-xl">
            <h2 className="text-xl font-semibold mb-4">Add New Client</h2>
            <div className="grid gap-3">
              <input className="w-full rounded border border-border bg-background p-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input className="w-full rounded border border-border bg-background p-2" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input className="w-full rounded border border-border bg-background p-2" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <input className="w-full rounded border border-border bg-background p-2" placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              <select className="w-full rounded border border-border bg-background p-2" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="RESIDENTIAL">Residential</option>
                <option value="COMMERCIAL">Commercial</option>
                <option value="MARINA">Marina</option>
              </select>
              <div className="flex gap-2 pt-2">
                <button disabled={loading} onClick={createClient} className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">Save</button>
                <button onClick={() => setShowForm(false)} className="px-4 py-2 border rounded">Cancel</button>
              </div>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}
