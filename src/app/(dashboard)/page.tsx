import {
  AverageTicketsCreated,
  Conversions,
  CustomerSatisfication,
  Metrics,
  TicketByChannels,
} from "@/components/chart-blocks";
import Container from "@/components/container";

export default function Home() {
  return (
    <div>
      <Metrics />
      <div className="grid grid-cols-1 divide-y border-b border-border xl:grid-cols-3 xl:divide-x xl:divide-y-0 xl:divide-border">
        <Container className="py-4 xl:col-span-1">
          <Conversions />
        </Container>
        <Container className="py-4 xl:col-span-2">
          <AverageTicketsCreated />
        </Container>
      </div>
      <div className="grid grid-cols-1 divide-y border-b border-border lg:grid-cols-2 lg:divide-x lg:divide-y-0 lg:divide-border">
        <Container className="py-4 lg:col-span-1">
          <TicketByChannels />
        </Container>
        <Container className="py-4 lg:col-span-1">
          <CustomerSatisfication />
        </Container>
      </div>
      
      {/* AI Suggestions Section */}
      <div className="border-b border-border">
        <Container className="py-6">
          <h2 className="text-lg font-semibold mb-4">AI-Powered Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">High-Priority Lead</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Bayfront Commercial Center requires immediate attention. 25,000 sq ft project with high conversion potential.
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-medium text-green-900 dark:text-green-100 mb-2">Upsell Opportunity</h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                Oceanfront Resort Group may benefit from an annual maintenance contract based on project history.
              </p>
            </div>
            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <h3 className="font-medium text-amber-900 dark:text-amber-100 mb-2">Resource Optimization</h3>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Consider additional crew for Marina Bay project to complete before hurricane season.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Recent Activity */}
      <div className="border-b border-border">
        <Container className="py-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Crystal Waters Spa project started</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New lead: Tropical Villa Resort</p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Proposal sent to Harbor View Apartments</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
