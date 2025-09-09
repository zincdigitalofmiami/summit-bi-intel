import {
  AverageTicketsCreated,
  CustomerSatisfication,
  Metrics,
  TicketByChannels,
} from "@/components/chart-blocks";
import Container from "@/components/container";
import MarineStatusOverview from "@/components/marine-status";
import QuickActions from "@/components/quick-actions";

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Marine Weather & Conditions - CRITICAL TOP PRIORITY */}
      <div className="border-b border-border">
        <Container className="py-4">
          <MarineStatusOverview />
        </Container>
      </div>

      {/* AI Insights - HIGH PRIORITY */}
      <div className="border-b border-border">
        <Container className="py-4">
          <h2 className="text-lg font-semibold mb-4">AI-Powered Marine Intelligence</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* SnapJacket Innovation Opportunity */}
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <h3 className="font-medium text-emerald-900 dark:text-emerald-100 mb-2">🚀 Innovation Opportunity</h3>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                SnapJacket dock piling repair technology could give Summit a 40% time advantage over Panama City competitors. Early adoption window closing.
              </p>
            </div>

            {/* Competitive Intelligence */}
            <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <h3 className="font-medium text-purple-900 dark:text-purple-100 mb-2">🎯 Competitive Edge</h3>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Bay County Marine hasn&apos;t updated seawall methods since 2019. Their backlog suggests capacity issues - opportunity for urgent projects.
              </p>
            </div>

            {/* Weather-Based Timing */}
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">⚡ Timing Advantage</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                3-week weather window opening Nov 15th. Recommend scheduling Miracle Strip seawall project to beat winter storm season.
              </p>
            </div>

            {/* Market Intelligence */}
            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <h3 className="font-medium text-amber-900 dark:text-amber-100 mb-2">📊 Market Trend</h3>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                New waterfront development at St. Andrews Bay = 25+ potential dock projects. Developers accepting bids through December.
              </p>
            </div>

            {/* Resource Optimization */}
            <div className="p-4 bg-rose-50 dark:bg-rose-950/20 rounded-lg border border-rose-200 dark:border-rose-800">
              <h3 className="font-medium text-rose-900 dark:text-rose-100 mb-2">⚙️ Resource Alert</h3>
              <p className="text-sm text-rose-700 dark:text-rose-300">
                Marine equipment rental costs up 15% in Q4. Consider purchasing vs. leasing for Shell Island project.
              </p>
            </div>

            {/* Industry Innovation */}
            <div className="p-4 bg-cyan-50 dark:bg-cyan-950/20 rounded-lg border border-cyan-200 dark:border-cyan-800">
              <h3 className="font-medium text-cyan-900 dark:text-cyan-100 mb-2">🔬 Tech Watch</h3>
              <p className="text-sm text-cyan-700 dark:text-cyan-300">
                New eco-friendly marine concrete reduces permitting time by 2 weeks. First in Panama City to adopt = competitive advantage.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Quick Actions for Mobile */}
      <div className="border-b border-border lg:hidden">
        <Container className="py-4">
          <QuickActions />
        </Container>
      </div>

      {/* Key Metrics */}
      <Metrics />

      {/* Charts Section - Mobile Optimized */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Container className="py-4">
          <AverageTicketsCreated />
        </Container>
        <Container className="py-4">
          <TicketByChannels />
        </Container>
      </div>

      {/* Customer Satisfaction - Full Width on Mobile */}
      <div className="border-b border-border">
        <Container className="py-4">
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
