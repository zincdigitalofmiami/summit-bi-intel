import Container from "@/components/container";

export default function ServicesPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <Container className="py-4 sm:py-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Service Catalog</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Marine construction services offered by Summit Marine Development
            </p>
          </div>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-sm sm:text-base self-start sm:self-auto">
            Add Service
          </button>
        </div>
      </Container>

      {/* Service Overview */}
      <Container className="py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Total Services</h3>
            <p className="text-2xl font-bold">6</p>
            <p className="text-xs text-muted-foreground">Available services</p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Most Popular</h3>
            <p className="text-2xl font-bold">-</p>
            <p className="text-xs text-muted-foreground">Based on projects</p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Avg. Project Value</h3>
            <p className="text-2xl font-bold">$0</p>
            <p className="text-xs text-muted-foreground">All services</p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Revenue YTD</h3>
            <p className="text-2xl font-bold">$0</p>
            <p className="text-xs text-muted-foreground">From all services</p>
          </div>
        </div>
      </Container>

      {/* Core Services */}
      <Container className="py-6">
        <div className="bg-card rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Core Marine Construction Services</h2>
            <p className="text-sm text-muted-foreground">
              Specialized services for waterfront properties in Panama City area
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold">Seawall Construction</h3>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">Construction</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Design and construction of durable seawalls to protect waterfront properties from erosion and storm damage
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Unit:</span>
                    <span>Linear Feet</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Material:</span>
                    <span>Concrete & Steel</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Permits Required:</span>
                    <span>DEP, Corps of Engineers</span>
                  </div>
                </div>
              </div>

              <div className="p-6 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold">Seawall Repair</h3>
                  <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs rounded">Repair</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive repair and reinforcement of existing seawalls
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Unit:</span>
                    <span>Linear Feet</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Material:</span>
                    <span>Concrete & Steel</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Permits Required:</span>
                    <span>Local permits</span>
                  </div>
                </div>
              </div>

              <div className="p-6 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold">Dock Construction</h3>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">Construction</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Custom dock design and construction for residential and commercial waterfront properties
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Unit:</span>
                    <span>Square Feet</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Material:</span>
                    <span>Composite & Aluminum</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Permits Required:</span>
                    <span>DEP, Local building codes</span>
                  </div>
                </div>
              </div>

              <div className="p-6 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold">Dock Repair</h3>
                  <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs rounded">Repair</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Maintenance and repair services for existing dock structures
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Unit:</span>
                    <span>Service Call</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Material:</span>
                    <span>Composite & Aluminum</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Permits Required:</span>
                    <span>Minimal for standard repairs</span>
                  </div>
                </div>
              </div>

              <div className="p-6 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold">Retaining Wall Construction</h3>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">Construction</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Design and construction of retaining walls for waterfront and upland properties
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Unit:</span>
                    <span>Linear Feet</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Material:</span>
                    <span>Concrete Block</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Permits Required:</span>
                    <span>Building permits</span>
                  </div>
                </div>
              </div>

              <div className="p-6 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold">Marine Construction Permitting</h3>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded">Permitting</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Permit acquisition and regulatory compliance services for marine construction projects
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Unit:</span>
                    <span>Per Project</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Material:</span>
                    <span>Documentation</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Authorities:</span>
                    <span>DEP, Corps, Local</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Service Areas */}
      <Container className="py-6">
        <div className="bg-card rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Service Areas</h2>
            <p className="text-sm text-muted-foreground">
              Geographic regions covered by Summit Marine Development
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 border border-border rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Panama City</h3>
                <p className="text-sm text-muted-foreground">
                  Primary service area with full construction capabilities
                </p>
              </div>
              <div className="text-center p-6 border border-border rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Panama City Beach</h3>
                <p className="text-sm text-muted-foreground">
                  Coastal properties and beach-front construction
                </p>
              </div>
              <div className="text-center p-6 border border-border rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Surrounding Areas</h3>
                <p className="text-sm text-muted-foreground">
                  Extended service coverage for larger projects
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
