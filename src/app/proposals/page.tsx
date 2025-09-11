'use client';

import Container from "@/components/container";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProposalsPage() {
  const [showCreateProposal, setShowCreateProposal] = useState(false);
  const router = useRouter();

  const handleCreateProposal = () => {
    // For now, just show an alert - could be expanded to open a modal or navigate to a form
    alert('Create Proposal functionality will be implemented here. This could open a proposal form modal or navigate to a proposal creation page.');
    setShowCreateProposal(true);
  };
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <Container className="py-4 sm:py-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Proposal Management</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Create and track proposals for marine construction projects
            </p>
          </div>
          <button 
            onClick={handleCreateProposal}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base self-start sm:self-auto"
          >
            Create Proposal
          </button>
        </div>
      </Container>

      {/* Proposal Statistics */}
      <Container className="py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Total Proposals</h3>
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-muted-foreground">All time</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Pending Proposals</h3>
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Accepted Proposals</h3>
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-muted-foreground">This year</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Win Rate</h3>
            <p className="text-2xl font-bold">0%</p>
            <p className="text-xs text-muted-foreground">Acceptance rate</p>
          </div>
        </div>
      </Container>

      {/* Proposal List */}
      <Container className="py-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Active Proposals</h2>
            <p className="text-sm text-muted-foreground">
              Current proposals for marine construction projects
            </p>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No proposals found</p>
              <p className="text-sm text-muted-foreground mt-2">
                Create your first proposal to start winning projects
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Proposal Types */}
      <Container className="py-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Proposal Breakdown</h2>
            <p className="text-sm text-muted-foreground">
              Proposals by service type and status
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium">By Service Type</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <span className="text-sm">Seawall Construction</span>
                    <span className="font-bold">0</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <span className="text-sm">Dock Construction</span>
                    <span className="font-bold">0</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <span className="text-sm">Retaining Walls</span>
                    <span className="font-bold">0</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <span className="text-sm">Repairs & Maintenance</span>
                    <span className="font-bold">0</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">By Status</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                    <span className="text-sm">Draft</span>
                    <span className="font-bold">0</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <span className="text-sm">Sent</span>
                    <span className="font-bold">0</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <span className="text-sm">Accepted</span>
                    <span className="font-bold">0</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                    <span className="text-sm">Declined</span>
                    <span className="font-bold">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Proposal Value Analysis */}
      <Container className="py-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Proposal Value Analysis</h2>
            <p className="text-sm text-muted-foreground">
              Financial overview of proposals and potential revenue
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <h3 className="font-medium text-emerald-900 dark:text-emerald-100">Total Proposed Value</h3>
                <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">$0</p>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">All active proposals</p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-medium text-blue-900 dark:text-blue-100">Average Proposal Value</h3>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">$0</p>
                <p className="text-xs text-blue-700 dark:text-blue-300">Per proposal</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <h3 className="font-medium text-purple-900 dark:text-purple-100">Pipeline Value</h3>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">$0</p>
                <p className="text-xs text-purple-700 dark:text-purple-300">Potential revenue</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
