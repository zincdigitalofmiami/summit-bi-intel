"use client";

import { useEffect, useState } from "react";
import Container from "@/components/container";

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [project, setProject] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { id } = await params;
      try {
        const res = await fetch(`/api/projects/${id}`, { cache: "no-store" });
        const data = await res.json();
        if (mounted && res.ok) setProject(data.project);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [params]);

  if (loading) {
    return (
      <Container className="py-6">
        <div className="text-muted-foreground">Loading…</div>
      </Container>
    );
  }

  if (!project) {
    return (
      <Container className="py-6">
        <div className="text-muted-foreground">Project not found</div>
      </Container>
    );
  }

  return (
    <Container className="py-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{project.name}</h1>
        <div className="text-sm text-muted-foreground">
          Client: {project.client?.name ?? "—"}
        </div>
        <div className="text-sm text-muted-foreground">Type: {project.type}</div>
        <div className="text-sm text-muted-foreground">Status: {project.status}</div>
        <div className="text-sm text-muted-foreground">Budget: {project.budget ?? 0}</div>
      </div>
    </Container>
  );
}


