import Container from "@/components/container";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <Container className="py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Project Management</h1>
            <p className="text-muted-foreground">
              Track marine construction projects from start to completion
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            New Project
          </button>
        </div>
      </Container>

      {/* Project Statistics */}
      <Container className="py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Active Projects</h3>
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-muted-foreground">In progress</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Completed Projects</h3>
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-muted-foreground">This year</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
            <p className="text-2xl font-bold">$0</p>
            <p className="text-xs text-muted-foreground">Year to date</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Avg. Project Value</h3>
            <p className="text-2xl font-bold">$0</p>
            <p className="text-xs text-muted-foreground">All projects</p>
          </div>
        </div>
      </Container>

      {/* Project Timeline */}
      <Container className="py-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Project Timeline</h2>
            <p className="text-sm text-muted-foreground">
              Current and upcoming marine construction projects
            </p>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No active projects</p>
              <p className="text-sm text-muted-foreground mt-2">
                Create your first project to start tracking progress
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Project Types */}
      <Container className="py-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Project Types</h2>
            <p className="text-sm text-muted-foreground">
              Distribution of projects by construction type
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-medium text-blue-900 dark:text-blue-100">Seawall Construction</h3>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">0</p>
                <p className="text-xs text-blue-700 dark:text-blue-300">projects</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="font-medium text-green-900 dark:text-green-100">Dock Construction</h3>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">0</p>
                <p className="text-xs text-green-700 dark:text-green-300">projects</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <h3 className="font-medium text-purple-900 dark:text-purple-100">Retaining Walls</h3>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">0</p>
                <p className="text-xs text-purple-700 dark:text-purple-300">projects</p>
              </div>
              <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <h3 className="font-medium text-amber-900 dark:text-amber-100">Repairs</h3>
                <p className="text-2xl font-bold text-amber-900 dark:text-amber-100">0</p>
                <p className="text-xs text-amber-700 dark:text-amber-300">projects</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
