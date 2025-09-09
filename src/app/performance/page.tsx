"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PerformancePage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border">
        <div className="py-4">
          <h1 className="text-xl font-semibold">Performance</h1>
          <p className="text-sm text-muted-foreground">Financials, operations, projects, and resources performance at a glance.</p>
        </div>
      </div>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="financial" className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="operations">Operations</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="financial" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Metric title="Revenue (MTD)" value="$128,400" trend="▲ 12%" />
                <Metric title="Gross Margin" value="38.9%" trend="▲ 2.1%" />
                <Metric title="AR > 30d" value="$21,750" trend="▼ 8%" />
              </div>
            </TabsContent>

            <TabsContent value="operations" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Metric title="Crew Utilization" value="82%" trend="▲ 5%" />
                <Metric title="Avg. Cycle Time" value="21.4 days" trend="▼ 1.2d" />
                <Metric title="Permits Blocking" value="3" trend="—" />
              </div>
            </TabsContent>

            <TabsContent value="projects" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Metric title="Active Projects" value="14" trend="▲ 2" />
                <Metric title="On-Time Delivery" value="93%" trend="▲ 4%" />
                <Metric title="Change Orders" value="5" trend="▼ 2" />
              </div>
            </TabsContent>

            <TabsContent value="resources" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Metric title="Equipment Uptime" value="97.2%" trend="▲ 0.6%" />
                <Metric title="Fuel Cost / Day" value="$1,240" trend="▲ 6%" />
                <Metric title="Open Positions" value="2" trend="—" />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function Metric({ title, value, trend }: { title: string; value: string; trend: string }) {
  return (
    <div className="p-4 rounded-lg border border-border bg-background">
      <div className="text-xs text-muted-foreground mb-1">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-xs text-summit-light-blue mt-1">{trend}</div>
    </div>
  );
}


