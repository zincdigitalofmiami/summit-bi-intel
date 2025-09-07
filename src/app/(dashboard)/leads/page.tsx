'use client';

import { useState, useMemo } from 'react';
import Container from "@/components/container";
import { LeadForm } from '@/components/forms/lead-form';
import { ProjectForm } from '@/components/forms/project-form';
import { ErrorBoundary } from '@/components/error-boundary';
import { LoadingState, EmptyState } from '@/components/ui/loading';
import { useLocalStorage, useAsyncOperation } from '@/hooks/use-safe-storage';
import { demoLeads } from '@/data/demo-leads';
import type { Lead, Project } from '@/types/types';

export default function LeadsPage() {
  const [showForm, setShowForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leads, setLeads] = useLocalStorage<Lead[]>('summit-leads', []);
  const { loading: isLoading, execute: executeAsync } = useAsyncOperation<Lead | void>();

  // Use demo data if no real leads exist
  const displayLeads = useMemo(() => {
    return leads.length > 0 ? leads : demoLeads;
  }, [leads]);

  const handleCreateLead = async (leadData: Partial<Lead>) => {
    try {
      await executeAsync(async () => {
        // Here you would typically save to a database
        const newLead: Lead = {
          id: Math.random().toString(36).substr(2, 9),
          name: leadData.name || '',
          contactPerson: leadData.contactPerson || leadData.name || '',
          contactEmail: leadData.contactEmail || '',
          status: leadData.status || 'new',
          source: leadData.source || 'website',
          createdAt: new Date(),
          contactPhone: leadData.contactPhone,
          companyName: leadData.companyName,
          notes: leadData.notes,
        };
        setLeads(prev => [newLead, ...prev]);
        setShowForm(false);
        return newLead;
      });
    } catch {
      // Handle error - in a real app, you'd show a user-friendly message
      alert('Error creating lead. Please try again.');
    }
  };

  const handleConvertToProject = (lead: Lead) => {
    setSelectedLead(lead);
    setShowProjectForm(true);
  };

  const handleCreateProject = async (_projectData: Partial<Project>) => {
    try {
      await executeAsync(async () => {
        // Here you would typically save to a database and update the lead status
        if (selectedLead) {
          // Update lead status to converted
          setLeads(prev => prev.map(lead => 
            lead.id === selectedLead.id 
              ? { ...lead, status: 'converted', conversionDate: new Date() }
              : lead
          ));
        }
        setShowProjectForm(false);
        setSelectedLead(null);
        // In a real app, you'd also save the project and redirect to projects page
        alert('Project created successfully! Lead has been converted.');
      });
    } catch {
      alert('Error creating project. Please try again.');
    }
  };

  const handleUpdateLeadStatus = (leadId: string, newStatus: string) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    ));
  };

  return (
    <ErrorBoundary>
      <div className="space-y-6">
      {/* Page Header */}
      <Container className="py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Lead Management</h1>
            <p className="text-muted-foreground">
              Track and manage potential clients for Summit Marine Development
            </p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add New Lead
          </button>
        </div>
      </Container>

      {/* Project Conversion Form Modal */}
      {showProjectForm && selectedLead && (
        <Container className="py-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-border p-6">
            <h2 className="text-xl font-semibold mb-6">Convert Lead to Project</h2>
            <ProjectForm
              onSubmit={handleCreateProject}
              onCancel={() => {
                setShowProjectForm(false);
                setSelectedLead(null);
              }}
              fromLead={selectedLead}
              isLoading={isLoading}
            />
          </div>
        </Container>
      )}
      {showForm && (
        <Container className="py-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-border p-6">
            <h2 className="text-xl font-semibold mb-6">Add New Lead</h2>
            <LeadForm
              onSubmit={handleCreateLead}
              onCancel={() => setShowForm(false)}
              isLoading={isLoading}
            />
          </div>
        </Container>
      )}

      {/* Lead Statistics */}
      <Container className="py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Total Leads</h3>
            <p className="text-2xl font-bold">{displayLeads.length}</p>
            <p className="text-xs text-muted-foreground">All time</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">New Leads</h3>
            <p className="text-2xl font-bold">{displayLeads.filter(l => l.status === 'new').length}</p>
            <p className="text-xs text-muted-foreground">This month</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Qualified</h3>
            <p className="text-2xl font-bold">{displayLeads.filter(l => l.status === 'qualified').length}</p>
            <p className="text-xs text-muted-foreground">Ready for proposals</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Conversion Rate</h3>
            <p className="text-2xl font-bold">
              {displayLeads.length > 0 ? Math.round((displayLeads.filter(l => l.status === 'converted').length / displayLeads.length) * 100) : 0}%
            </p>
            <p className="text-xs text-muted-foreground">Leads to projects</p>
          </div>
        </div>
      </Container>

      {/* Leads List */}
      <Container className="py-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Recent Leads</h2>
            <p className="text-sm text-muted-foreground">
              Potential clients interested in marine construction services
            </p>
          </div>
          <div className="p-6">
            {isLoading ? (
              <LoadingState message="Processing..." />
            ) : leads.length === 0 && displayLeads.length === 0 ? (
              <EmptyState
                title="No leads yet"
                description="Start capturing leads from your website, referrals, and marketing efforts."
                action={
                  <button 
                    onClick={() => setShowForm(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Your First Lead
                  </button>
                }
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                }
              />
            ) : (
              <div className="space-y-4">
                {leads.length === 0 && (
                  <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Showing demo data to populate the interface. Add your first lead to replace this with real data.
                    </p>
                  </div>
                )}
                {displayLeads.map((lead) => (
                  <div key={lead.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{lead.name}</h3>
                        <p className="text-sm text-muted-foreground">{lead.contactEmail}</p>
                        {lead.contactPhone && (
                          <p className="text-sm text-muted-foreground">{lead.contactPhone}</p>
                        )}
                        {lead.companyName && (
                          <p className="text-sm text-muted-foreground">{lead.companyName}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                          {lead.status === 'new' && (
                            <button
                              onClick={() => handleUpdateLeadStatus(lead.id, 'qualified')}
                              className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                              Mark Qualified
                            </button>
                          )}
                          {lead.status === 'qualified' && (
                            <button
                              onClick={() => handleConvertToProject(lead)}
                              className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                            >
                              Convert to Project
                            </button>
                          )}
                          <span className={`px-2 py-1 text-xs rounded ${
                            lead.status === 'new' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                            lead.status === 'qualified' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                            lead.status === 'proposal' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                            lead.status === 'converted' ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
                            'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                          }`}>
                            {lead.status}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {lead.source}
                        </p>
                      </div>
                    </div>
                    {lead.notes && (
                      <p className="text-sm text-muted-foreground mt-2">{lead.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
    </ErrorBoundary>
  );
}
