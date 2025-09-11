"use client";
import { useEffect, useState, useMemo } from "react";
import Container from "@/components/container";

type Project = {
  id: string;
  name: string;
  client?: string | null;
  type?: string;
  status?: string;
  budget?: number | null;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", client: "", type: "OTHER" });

  // Calculate real project statistics
  const stats = useMemo(() => {
    const activeProjects = projects.filter(p => p.status === 'ACTIVE' || p.status === 'PLANNING').length;
    const completedProjects = projects.filter(p => p.status === 'COMPLETED').length;
    const totalRevenue = projects.reduce((sum, p) => sum + (Number(p.budget) || 0), 0);
    const avgProjectValue = projects.length > 0 ? Math.round(totalRevenue / projects.length) : 0;

    return {
      activeProjects,
      completedProjects,
      totalRevenue,
      avgProjectValue
    };
  }, [projects]);

  async function load() {
    const res = await fetch("/api/projects", { cache: "no-store" });
    const data = await res.json().catch(() => ({}));
    if (data?.projects) setProjects(data.projects);
  }
  useEffect(() => { load(); }, []);

  async function createProject() {
    if (!form.name.trim()) return;
    const res = await fetch("/api/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) {
      setShowForm(false);
      setForm({ name: "", client: "", type: "OTHER" });
      await load();
    }
  }
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <Container className="py-4 sm:py-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Project Management</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Track marine construction projects from start to completion
            </p>
          </div>
          <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-sm sm:text-base self-start sm:self-auto">
            New Project
          </button>
        </div>
      </Container>

      {/* Project Statistics */}
      <Container className="py-4 sm:py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Active Projects</h3>
            <p className="text-2xl font-bold">{stats.activeProjects}</p>
            <p className="text-xs text-muted-foreground">In progress</p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Completed Projects</h3>
            <p className="text-2xl font-bold">{stats.completedProjects}</p>
            <p className="text-xs text-muted-foreground">This year</p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
            <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Year to date</p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Avg. Project Value</h3>
            <p className="text-2xl font-bold">${stats.avgProjectValue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">All projects</p>
          </div>
        </div>
      </Container>

      {/* Project Timeline */}
      <Container className="py-6">
        <div className="bg-card rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Project Timeline</h2>
            <p className="text-sm text-muted-foreground">
              Current and upcoming marine construction projects
            </p>
          </div>
          <div className="p-6">
            {projects.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No active projects</p>
                <p className="text-sm text-muted-foreground mt-2">Create your first project to start tracking progress</p>
              </div>
            ) : (
              <div className="space-y-3">
                {projects.map(p => (
                  <div key={p.id} className="flex items-center justify-between rounded border border-border p-4">
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-sm text-muted-foreground">{p.client || "—"}</p>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">{p.type || "OTHER"}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Project Types */}
      <Container className="py-6">
        <div className="bg-card rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Project Types</h2>
            <p className="text-sm text-muted-foreground">
              Distribution of projects by construction type
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-summit-light-blue/10 rounded-lg border border-summit-light-blue/30">
                <h3 className="font-medium text-summit-light-blue">Seawall Construction</h3>
                <p className="text-2xl font-bold text-white">0</p>
                <p className="text-xs text-muted-foreground">projects</p>
              </div>
              <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                <h3 className="font-medium text-green-400">Dock Construction</h3>
                <p className="text-2xl font-bold text-white">0</p>
                <p className="text-xs text-muted-foreground">projects</p>
              </div>
              <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                <h3 className="font-medium text-purple-400">Retaining Walls</h3>
                <p className="text-2xl font-bold text-white">0</p>
                <p className="text-xs text-muted-foreground">projects</p>
              </div>
              <div className="p-4 bg-federal-orange/10 rounded-lg border border-federal-orange/30">
                <h3 className="font-medium text-federal-orange">Repairs</h3>
                <p className="text-2xl font-bold text-white">0</p>
                <p className="text-xs text-muted-foreground">projects</p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {showForm && (
        <Container className="py-6">
          <div className="bg-card rounded-lg border border-border p-6 max-w-xl">
            <h2 className="text-xl font-semibold mb-4">New Project</h2>
            <div className="grid gap-3">
              <input className="w-full rounded border border-border bg-background p-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input className="w-full rounded border border-border bg-background p-2" placeholder="Client" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} />
              <select className="w-full rounded border border-border bg-background p-2" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="SEAWALL">Seawall</option>
                <option value="DOCK">Dock</option>
                <option value="RETAINING">Retaining</option>
                <option value="REPAIR">Repair</option>
                <option value="OTHER">Other</option>
              </select>
              <div className="flex gap-2 pt-2">
                <button onClick={createProject} className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">Save</button>
                <button onClick={() => setShowForm(false)} className="px-4 py-2 border rounded">Cancel</button>
              </div>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}
