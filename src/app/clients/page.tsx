import Container from "@/components/container";

export default function ClientsPage() {
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
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base self-start sm:self-auto">
            Add New Client
          </button>
        </div>
      </Container>

      {/* Client Statistics */}
      <Container className="py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Total Clients</h3>
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-muted-foreground">All time</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Active Clients</h3>
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-muted-foreground">Current projects</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Repeat Clients</h3>
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-muted-foreground">Multiple projects</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Client Lifetime Value</h3>
            <p className="text-2xl font-bold">$0</p>
            <p className="text-xs text-muted-foreground">Average</p>
          </div>
        </div>
      </Container>

      {/* Client List */}
      <Container className="py-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Client Directory</h2>
            <p className="text-sm text-muted-foreground">
              Waterfront property owners in Panama City and surrounding areas
            </p>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No clients found</p>
              <p className="text-sm text-muted-foreground mt-2">
                Add your first client to start building your customer base
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Client Types */}
      <Container className="py-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-border">
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
                    <span className="font-bold">0</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <span className="text-sm">Commercial Properties</span>
                    <span className="font-bold">0</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <span className="text-sm">Marinas</span>
                    <span className="font-bold">0</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Location</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <span className="text-sm">Panama City</span>
                    <span className="font-bold">0</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-teal-50 dark:bg-teal-950/20 rounded-lg">
                    <span className="text-sm">Panama City Beach</span>
                    <span className="font-bold">0</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-pink-50 dark:bg-pink-950/20 rounded-lg">
                    <span className="text-sm">Surrounding Areas</span>
                    <span className="font-bold">0</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Project History</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                    <span className="text-sm">First Time Clients</span>
                    <span className="font-bold">0</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                    <span className="text-sm">Repeat Clients</span>
                    <span className="font-bold">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
