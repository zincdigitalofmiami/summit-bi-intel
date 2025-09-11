"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Anchor,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Plus,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";

import Container from "@/components/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuickActions from "@/components/quick-actions";
import AIInsightsWidget from "@/components/ai-insights-widget";
import AIAgent from "@/components/ai-agent";

type Client = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  location?: string;
  type?: "RESIDENTIAL" | "COMMERCIAL" | "MARINA";
  createdAt: string;
  status: "active" | "inactive";
  lastContact?: string;
  totalProjects: number;
  totalValue: number;
};

type Lead = {
  id: string;
  name: string;
  contactEmail?: string;
  contactPhone?: string;
  companyName?: string;
  status: "new" | "qualified" | "proposal" | "converted" | "lost";
  source: string;
  createdAt: string;
  value?: number;
  score: number;
};

type Project = {
  id: string;
  name: string;
  client?: string;
  type?: "SEAWALL" | "DOCK" | "RETAINING" | "REPAIR" | "OTHER";
  status: "ACTIVE" | "COMPLETED" | "ON_HOLD";
  budget?: number;
  createdAt: string;
  deadline?: string;
  progress: number;
};

export default function CRMPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [clients, setClients] = useState<Client[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Mock data for demonstration
  const mockData = {
    clients: [
      {
        id: "1",
        name: "John Smith",
        email: "john@panamacondos.com",
        phone: "(850) 555-0123",
        location: "Panama City Beach, FL",
        type: "COMMERCIAL",
        createdAt: "2024-01-15",
        status: "active",
        lastContact: "2024-09-10",
        totalProjects: 3,
        totalValue: 45000
      },
      {
        id: "2",
        name: "Maria Rodriguez",
        email: "maria@oceanfront.com",
        phone: "(850) 555-0456",
        location: "Panama City, FL",
        type: "RESIDENTIAL",
        createdAt: "2024-02-20",
        status: "active",
        lastContact: "2024-09-09",
        totalProjects: 2,
        totalValue: 32000
      }
    ] as Client[],
    leads: [
      {
        id: "1",
        name: "David Wilson",
        contactEmail: "d.wilson@beachresort.com",
        contactPhone: "(850) 555-0789",
        companyName: "Beach Resort Group",
        status: "qualified",
        source: "website",
        createdAt: "2024-09-08",
        value: 25000,
        score: 85
      },
      {
        id: "2",
        name: "Sarah Chen",
        contactEmail: "sarah@marina.com",
        contactPhone: "(850) 555-0321",
        companyName: "Panama City Marina",
        status: "new",
        source: "referral",
        createdAt: "2024-09-10",
        value: 15000,
        score: 72
      }
    ] as Lead[],
    projects: [
      {
        id: "1",
        name: "Seawall Construction - Panama City Beach",
        client: "John Smith",
        type: "SEAWALL",
        status: "ACTIVE",
        budget: 35000,
        createdAt: "2024-08-15",
        deadline: "2024-12-15",
        progress: 65
      },
      {
        id: "2",
        name: "Dock Repair - Marina Bay",
        client: "Maria Rodriguez",
        type: "REPAIR",
        status: "COMPLETED",
        budget: 18000,
        createdAt: "2024-07-01",
        deadline: "2024-09-01",
        progress: 100
      }
    ] as Project[]
  };

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Load data
    setClients(mockData.clients);
    setLeads(mockData.leads);
    setProjects(mockData.projects);
  }, []);

  const stats = useMemo(() => {
    const totalRevenue = projects.reduce((sum, p) => sum + (p.budget || 0), 0);
    const activeProjects = projects.filter(p => p.status === 'ACTIVE').length;
    const qualifiedLeads = leads.filter(l => l.status === 'qualified').length;
    const activeClients = clients.filter(c => c.status === 'active').length;

    return {
      totalRevenue,
      activeProjects,
      qualifiedLeads,
      activeClients,
      monthlyRevenue: Math.round(totalRevenue / 12),
      conversionRate: leads.length > 0 ? Math.round((qualifiedLeads / leads.length) * 100) : 0
    };
  }, [clients, leads, projects]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-border md:hidden">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Anchor className="h-6 w-6 text-blue-600" />
            <h1 className="text-lg font-bold">CRM</h1>
          </div>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>

      <Container className="py-4 md:py-8">
        <div className="space-y-6">
          {/* Desktop Header */}
          <div className="hidden md:flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Anchor className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">CRM Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Marine construction management</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-1" />
                Add Contact
              </Button>
            </div>
          </div>



          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-3' : 'grid-cols-5'} mb-6`}>
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span className={isMobile ? 'hidden' : 'inline'}>Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="leads" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className={isMobile ? 'hidden' : 'inline'}>Leads</span>
              </TabsTrigger>
              <TabsTrigger value="contacts" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className={isMobile ? 'hidden' : 'inline'}>Contacts</span>
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className={isMobile ? 'hidden' : 'inline'}>Projects</span>
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className={isMobile ? 'hidden' : 'inline'}>Calendar</span>
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              {/* AI-Enhanced Dashboard - Salesforce/Jobber Style */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { id: "lead-david", type: "lead", message: "New lead: David Wilson", time: "2 hours ago", icon: TrendingUp },
                        { id: "project-dock", type: "project", message: "Project completed: Dock Repair", time: "1 day ago", icon: CheckCircle },
                        { id: "client-maria", type: "client", message: "Client contacted: Maria Rodriguez", time: "2 days ago", icon: Users },
                        { id: "proposal-seawall", type: "proposal", message: "Proposal sent: Seawall Construction", time: "3 days ago", icon: FileText }
                      ].map((activity) => (
                        <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                            <activity.icon className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.message}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* AI Insights - Salesforce/Jobber Pattern */}
                <AIInsightsWidget />
              </div>

              {/* AI Agent & Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* AI Agent for CRM */}
                <AIAgent context={{ page: 'crm' }} />

                {/* Quick Actions & Intelligence */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="h-16 flex flex-col gap-2">
                          <Plus className="h-5 w-5" />
                          <span className="text-xs">Add Lead</span>
                        </Button>
                        <Button variant="outline" className="h-16 flex flex-col gap-2">
                          <Users className="h-5 w-5" />
                          <span className="text-xs">Add Client</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Lead Intelligence */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Lead Intelligence
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                          <div>
                            <p className="text-sm font-medium">Hot Leads</p>
                            <p className="text-xs text-muted-foreground">Ready to convert</p>
                          </div>
                          <Badge className="bg-red-100 text-red-800">3</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                          <div>
                            <p className="text-sm font-medium">Follow-ups Due</p>
                            <p className="text-xs text-muted-foreground">Today</p>
                          </div>
                          <Badge className="bg-orange-100 text-orange-800">7</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Key Metrics Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="text-center p-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{leads.length}</p>
                      <p className="text-xs text-muted-foreground">Active Leads</p>
                    </div>
                  </div>
                </Card>

                <Card className="text-center p-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{clients.filter(c => c.status === 'active').length}</p>
                      <p className="text-xs text-muted-foreground">Active Clients</p>
                    </div>
                  </div>
                </Card>

                <Card className="text-center p-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                      <FileText className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{projects.filter(p => p.status === 'ACTIVE').length}</p>
                      <p className="text-xs text-muted-foreground">Active Projects</p>
                    </div>
                  </div>
                </Card>

                <Card className="text-center p-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                      <DollarSign className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Total Revenue</p>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Leads Tab */}
            <TabsContent value="leads" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Lead Pipeline
                    </div>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Lead
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leads.map((lead) => (
                      <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{lead.name}</h3>
                            <Badge variant={
                              lead.status === 'qualified' ? 'default' :
                              lead.status === 'new' ? 'secondary' :
                              lead.status === 'converted' ? 'outline' : 'destructive'
                            }>
                              {lead.status}
                            </Badge>
                            <Badge variant="outline">Score: {lead.score}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{lead.contactEmail}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{lead.companyName}</span>
                            <span>Source: {lead.source}</span>
                            {lead.value && <span>${lead.value.toLocaleString()}</span>}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contacts Tab */}
            <TabsContent value="contacts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Clients & Contacts
                    </div>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Contact
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Recent Contacts */}
                    {[...clients.slice(0, 3), ...leads.slice(0, 2)].map((contact, index) => (
                      <div key={`contact-${index}`} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{contact.name}</h3>
                            <Badge variant={'client' in contact ? 'default' : 'secondary'}>
                              {'client' in contact ? 'Client' : 'Lead'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {'email' in contact ? contact.email : ('contactEmail' in contact ? contact.contactEmail : '')}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            {'location' in contact && (
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {contact.location}
                              </span>
                            )}
                            {'companyName' in contact && <span>{contact.companyName}</span>}
                            {'totalProjects' in contact && <span>{contact.totalProjects} projects</span>}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Project Management
                    </div>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      New Project
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div key={project.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{project.name}</h3>
                            <Badge variant={
                              project.status === 'ACTIVE' ? 'default' :
                              project.status === 'COMPLETED' ? 'outline' : 'secondary'
                            }>
                              {project.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Calendar className="h-4 w-4 mr-1" />
                              Timeline
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            {project.client}
                          </span>
                          <span>{project.type}</span>
                          {project.budget && <span>${project.budget.toLocaleString()}</span>}
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>

                        {project.deadline && (
                          <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            Due: {new Date(project.deadline).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Calendar Tab */}
            <TabsContent value="calendar" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Schedule & Follow-ups
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Calendar Integration</h3>
                      <p className="text-sm text-muted-foreground">
                        Schedule follow-ups, site visits, and project deadlines
                      </p>
                      <Button className="mt-4">
                        <Plus className="h-4 w-4 mr-2" />
                        Schedule Event
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

        </div>
      </Container>

      {/* Mobile-Optimized Quick Actions */}
      <QuickActions />
    </div>
  );
}
