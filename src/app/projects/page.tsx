import Container from "@/components/container";

export default function ProjectsPage() {
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
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-sm sm:text-base self-start sm:self-auto">
            New Project
          </button>
        </div>
      </Container>

      {/* Project Statistics */}
      <Container className="py-4 sm:py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Active Projects</h3>
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-muted-foreground">In progress</p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Completed Projects</h3>
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-muted-foreground">This year</p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
            <p className="text-2xl font-bold">$0</p>
            <p className="text-xs text-muted-foreground">Year to date</p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Avg. Project Value</h3>
            <p className="text-2xl font-bold">$0</p>
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
    </div>
  );
}
