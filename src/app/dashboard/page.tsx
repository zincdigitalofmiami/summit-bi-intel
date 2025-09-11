"use client";

import AIAgent from "@/components/ai-agent";
import {
  AverageTicketsCreated,
  CustomerSatisfication,
  Metrics,
  TicketByChannels,
} from "@/components/chart-blocks";
import Container from "@/components/container";
import QuickActions from "@/components/quick-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Removed dialog components for Marine Weather popup
import {
  AlertTriangle,
  Anchor,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  DollarSign,
  ExternalLink,
  FileText,
  Hammer,
  MapPin,
  Receipt,
  Waves,
} from "lucide-react";
import Link from "next/link";
// Removed local state previously used for Marine Weather modal

export default function Home() {

  return (
    <div className="space-y-6">
      {/* Header with Greeting only */}
      <div className="border-b border-border">
        <Container className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Good morning, Jose</h1>
              <p className="text-muted-foreground">Monday, {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            {/* Actions removed: Marine Weather and Create button */}
          </div>
        </Container>
      </div>

      {/* Marine Workflow - Core Business Process */}
      <div className="border-b border-border">
        <Container className="py-6">
          <h2 className="text-xl font-semibold mb-6">Marine Construction Workflow</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Requests */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Requests
                  </div>
                  <Link href="/leads">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">$47K</div>
                <div className="space-y-2 mt-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Assessments complete (12)</span>
                    <span className="font-medium">$28.3K</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-orange-600">Due (8)</span>
                    <span className="font-medium">$18.7K</span>
                  </div>
                </div>
                <Link href="/leads">
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    View All Requests
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quotes */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    Quotes
                  </div>
                  <Link href="/proposals">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">$89K</div>
                <div className="space-y-2 mt-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Approved (18)</span>
                    <span className="font-medium">$45.4K</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-orange-600">Draft (7)</span>
                    <span className="font-medium">$23.6K</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-red-600">Changes requested (5)</span>
                    <span className="font-medium">$20K</span>
                  </div>
                </div>
                <Link href="/proposals">
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    View All Quotes
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Projects */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg">
                  <div className="flex items-center gap-2">
                    <Hammer className="h-5 w-5 text-purple-600" />
                    Projects
                  </div>
                  <Link href="/crm?tab=projects">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">$156K</div>
                <div className="space-y-2 mt-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Active (24)</span>
                    <span className="font-medium">$89.4K</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-orange-600">Require invoicing (12)</span>
                    <span className="font-medium">$41.9K</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-red-600">Action required (3)</span>
                    <span className="font-medium">$24.7K</span>
                  </div>
                </div>
                <Link href="/crm?tab=projects">
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    View All Projects
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Invoices */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg">
                  <div className="flex items-center gap-2">
                    <Receipt className="h-5 w-5 text-red-600" />
                    Invoices
                  </div>
                  <Link href="/proposals">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">$34K</div>
                <div className="space-y-2 mt-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-orange-600">Awaiting payment (8)</span>
                    <span className="font-medium">$18.2K</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-red-600">Past due (4)</span>
                    <span className="font-medium">$15.8K</span>
                  </div>
                </div>
                <Link href="/proposals">
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    View All Invoices
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>

      {/* Today's Marine Operations */}
      <div className="border-b border-border">
        <Container className="py-6">
          <h2 className="text-xl font-semibold mb-6">Today's Marine Operations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">24</div>
              <div className="text-sm text-muted-foreground">Total Visits</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">$8,300</div>
              <div className="text-sm text-muted-foreground">Overdue</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">$12,400</div>
              <div className="text-sm text-muted-foreground">Active</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">$15,200</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Today's Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <div>
                        <p className="font-medium">Seawall Inspection - Bay Point</p>
                        <p className="text-sm text-muted-foreground">8:00 AM - 10:00 AM</p>
                      </div>
                    </div>
                    <Badge variant="destructive">OVERDUE</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="font-medium">Dock Repair - Harbor View</p>
                        <p className="text-sm text-muted-foreground">9:00 AM - 11:30 AM</p>
                      </div>
                    </div>
                    <Badge variant="default" className="bg-green-600">ACTIVE</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="font-medium">Piling Installation - Marina Bay</p>
                        <p className="text-sm text-muted-foreground">1:00 PM - 4:00 PM</p>
                      </div>
                    </div>
                    <Badge variant="secondary">UPCOMING</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-purple-600" />
                      <div>
                        <p className="font-medium">Bulkhead Repair - Oceanfront Resort</p>
                        <p className="text-sm text-muted-foreground">2:00 PM - 5:00 PM</p>
                      </div>
                    </div>
                    <Badge variant="default" className="bg-purple-600">COMPLETED</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Today's Tasks & Active Projects */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Today's Priority Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <div>
                        <p className="font-medium">Permit Application Due</p>
                        <p className="text-sm text-muted-foreground">Miracle Strip Project</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-orange-600 text-orange-600">URGENT</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="font-medium">Equipment Inspection</p>
                        <p className="text-sm text-muted-foreground">Crane #3 - Annual Check</p>
                      </div>
                    </div>
                    <Badge variant="secondary">DUE TODAY</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="font-medium">Safety Meeting</p>
                        <p className="text-sm text-muted-foreground">Crew Briefing - 7:00 AM</p>
                      </div>
                    </div>
                    <Badge variant="default" className="bg-green-600">COMPLETED</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>

      {/* Business Performance */}
      <div className="border-b border-border">
        <Container className="py-6">
          <h2 className="text-xl font-semibold mb-6">Business Performance</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Receivables */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Receivables
                  </span>
                  <Link href="/proposals">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">$47,598</div>
                <p className="text-sm text-muted-foreground mb-4">12 clients owe you</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Bayfront Commercial Center</span>
                    </div>
                    <span className="font-medium">$8.5K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Harbor View Apartments</span>
                    </div>
                    <span className="font-medium">$6.2K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Oceanfront Resort Group</span>
                    </div>
                    <span className="font-medium">$12.8K</span>
                  </div>
                </div>
                <Link href="/proposals">
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    View All Receivables
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Upcoming Jobs */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Hammer className="h-5 w-5" />
                    Upcoming Jobs
                  </span>
                  <Link href="/crm?tab=projects">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">$89,400</div>
                <p className="text-sm text-muted-foreground mb-4">This week (Tomorrow - Dec 15)</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Miracle Strip Seawall Project</span>
                    </div>
                    <span className="font-medium">$24.5K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Anchor className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Marina Bay Dock Expansion</span>
                    </div>
                    <span className="font-medium">$18.7K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Waves className="h-4 w-4 text-purple-600" />
                      <span className="text-sm">Crystal Waters Bulkhead Repair</span>
                    </div>
                    <span className="font-medium">$15.2K</span>
                  </div>
                </div>
                <Link href="/crm?tab=projects">
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    View All Upcoming Jobs
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>

      {/* AI Agent & Insights */}
      <div className="border-b border-border">
        <Container className="py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AIAgent context={{ page: 'dashboard' }} />
            </div>
            <div className="space-y-4">
              {/* Quick Actions for Mobile */}
              <div className="lg:hidden">
                <QuickActions />
              </div>

              {/* Market Intelligence Cards */}
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <h3 className="font-medium text-emerald-900 dark:text-emerald-100 mb-2">🚀 Innovation Opportunity</h3>
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                  SnapJacket dock piling repair technology could give Summit a 40% time advantage over Panama City competitors.
                </p>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <h3 className="font-medium text-purple-900 dark:text-purple-100 mb-2">🎯 Competitive Edge</h3>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Bay County Marine hasn&apos;t updated seawall methods since 2019. Their backlog suggests capacity issues.
                </p>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">⚡ Timing Advantage</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  3-week weather window opening Nov 15th. Recommend scheduling Miracle Strip seawall project.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Key Metrics & Charts */}
      <Metrics />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Container className="py-4">
          <AverageTicketsCreated />
        </Container>
        <Container className="py-4">
          <TicketByChannels />
        </Container>
      </div>

      {/* Customer Satisfaction */}
      <div className="border-b border-border">
        <Container className="py-4">
          <CustomerSatisfication />
        </Container>
      </div>
    </div>
  );
}
