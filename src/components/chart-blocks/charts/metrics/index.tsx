"use client";

import { useState, useEffect } from "react";
import Container from "@/components/container";
import { fallbackMetrics } from "@/data/metrics";
import MetricCard from "./components/metric-card";
import { Badge } from "@/components/ui/badge";

interface Metric {
  title: string;
  value: string;
  change: number;
  trend?: "up" | "down";
}

export default function Metrics() {
  const [metrics, setMetrics] = useState<Metric[]>(fallbackMetrics);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/dashboard/metrics');
        if (response.ok) {
          const data = await response.json();
          setMetrics(data.metrics);
        } else {
          setError('Failed to load metrics');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <Container className="grid grid-cols-1 gap-y-6 border-b border-border py-4 phone:grid-cols-2 laptop:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.title} className="relative">
          <MetricCard {...metric} />
          {isLoading && (
            <div className="absolute inset-0 bg-muted/50 rounded-lg flex items-center justify-center">
              <div className="text-sm text-muted-foreground">Loading...</div>
            </div>
          )}
        </div>
      ))}
      {error && (
        <div className="col-span-full flex justify-center">
          <Badge variant="outline" className="text-red-600 dark:text-red-400">
            {error}
          </Badge>
        </div>
      )}
    </Container>
  );
}
