import Container from "@/components/container";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <Container className="py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Business Analytics</h1>
            <p className="text-muted-foreground">
              Performance insights for Summit Marine Development
            </p>
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 border border-border rounded-lg bg-background">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>This year</option>
            </select>
          </div>
        </div>
      </Container>

      {/* Key Performance Indicators */}
      <Container className="py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Monthly Revenue</h3>
            <p className="text-2xl font-bold">$0</p>
            <p className="text-xs text-green-600">+0% from last month</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Projects Completed</h3>
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-green-600">+0 from last month</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">New Clients</h3>
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-green-600">+0 from last month</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Profit Margin</h3>
            <p className="text-2xl font-bold">0%</p>
            <p className="text-xs text-muted-foreground">Average</p>
          </div>
        </div>
      </Container>

      {/* Revenue Trends */}
      <Container className="py-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Revenue Trends</h2>
            <p className="text-sm text-muted-foreground">
              Monthly revenue from marine construction projects
            </p>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No revenue data available</p>
              <p className="text-sm text-muted-foreground mt-2">
                Complete projects to start tracking revenue trends
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Service Performance */}
      <Container className="py-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Service Performance</h2>
            <p className="text-sm text-muted-foreground">
              Revenue and project count by service type
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-medium text-blue-900 dark:text-blue-100">Seawall Construction</h3>
                <p className="text-xl font-bold text-blue-900 dark:text-blue-100">$0</p>
                <p className="text-xs text-blue-700 dark:text-blue-300">0 projects</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="font-medium text-green-900 dark:text-green-100">Dock Construction</h3>
                <p className="text-xl font-bold text-green-900 dark:text-green-100">$0</p>
                <p className="text-xs text-green-700 dark:text-green-300">0 projects</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <h3 className="font-medium text-purple-900 dark:text-purple-100">Retaining Walls</h3>
                <p className="text-xl font-bold text-purple-900 dark:text-purple-100">$0</p>
                <p className="text-xs text-purple-700 dark:text-purple-300">0 projects</p>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <h3 className="font-medium text-orange-900 dark:text-orange-100">Repairs</h3>
                <p className="text-xl font-bold text-orange-900 dark:text-orange-100">$0</p>
                <p className="text-xs text-orange-700 dark:text-orange-300">0 projects</p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Geographic Analysis */}
      <Container className="py-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Geographic Performance</h2>
            <p className="text-sm text-muted-foreground">
              Project distribution across Panama City area
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <h3 className="font-medium text-emerald-900 dark:text-emerald-100">Panama City</h3>
                <p className="text-xl font-bold text-emerald-900 dark:text-emerald-100">0</p>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">projects</p>
              </div>
              <div className="p-4 bg-teal-50 dark:bg-teal-950/20 rounded-lg border border-teal-200 dark:border-teal-800">
                <h3 className="font-medium text-teal-900 dark:text-teal-100">Panama City Beach</h3>
                <p className="text-xl font-bold text-teal-900 dark:text-teal-100">0</p>
                <p className="text-xs text-teal-700 dark:text-teal-300">projects</p>
              </div>
              <div className="p-4 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                <h3 className="font-medium text-indigo-900 dark:text-indigo-100">Surrounding Areas</h3>
                <p className="text-xl font-bold text-indigo-900 dark:text-indigo-100">0</p>
                <p className="text-xs text-indigo-700 dark:text-indigo-300">projects</p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Seasonal Analysis */}
      <Container className="py-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Seasonal Trends</h2>
            <p className="text-sm text-muted-foreground">
              Project activity by season and weather patterns
            </p>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No seasonal data available</p>
              <p className="text-sm text-muted-foreground mt-2">
                Complete projects throughout the year to identify seasonal trends
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
