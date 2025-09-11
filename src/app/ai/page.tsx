'use client';

import Container from "@/components/container";
import { useState } from "react";

export default function AIAssistantPage() {
  const [showNewChat, setShowNewChat] = useState(false);

  const handleNewChat = () => {
    alert('New Chat functionality will be implemented here. This could open an AI chat interface or navigate to a chat page.');
    setShowNewChat(true);
  };

  const handleCreateEmail = (templateType: string) => {
    alert(`${templateType} email template will be implemented here. This could open an email composer with the selected template.`);
  };
  return (
    <div className="space-y-6">
      {/* Page Header */}
            {/* Page Header */}
      <Container className="py-4 sm:py-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">AI Assistant</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Get intelligent insights and recommendations for your business
            </p>
          </div>
          <button 
            onClick={handleNewChat}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base self-start sm:self-auto"
          >
            New Chat
          </button>
        </div>
      </Container>

      {/* AI Suggestions */}
      <Container className="py-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Smart Recommendations</h2>
            <p className="text-sm text-muted-foreground">
              AI-generated insights to optimize your marine construction business
            </p>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No AI recommendations available</p>
              <p className="text-sm text-muted-foreground mt-2">
                Add project data and client information to receive personalized insights
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Email Templates */}
      <Container className="py-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">AI Email Templates</h2>
            <p className="text-sm text-muted-foreground">
              Pre-built and customizable email templates for client communication
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-medium mb-2">Lead Follow-up</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Professional follow-up emails for new marine construction leads
                </p>
                <button 
                  onClick={() => handleCreateEmail('Lead Follow-up')}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Create Email →
                </button>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-medium mb-2">Project Update</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Keep clients informed about seawall and dock construction progress
                </p>
                <button 
                  onClick={() => handleCreateEmail('Lead Follow-up')}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Create Email →
                </button>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-medium mb-2">Proposal Submission</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Professional proposal delivery with marine construction details
                </p>
                <button 
                  onClick={() => handleCreateEmail('Lead Follow-up')}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Create Email →
                </button>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-medium mb-2">Project Completion</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Celebrate completed projects and request reviews
                </p>
                <button 
                  onClick={() => handleCreateEmail('Lead Follow-up')}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Create Email →
                </button>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-medium mb-2">Maintenance Reminder</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Schedule annual maintenance for seawalls and docks
                </p>
                <button 
                  onClick={() => handleCreateEmail('Lead Follow-up')}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Create Email →
                </button>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-medium mb-2">Emergency Response</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Quick response templates for storm damage and urgent repairs
                </p>
                <button 
                  onClick={() => handleCreateEmail('Lead Follow-up')}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Create Email →
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Business Intelligence */}
      <Container className="py-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Business Intelligence</h2>
            <p className="text-sm text-muted-foreground">
              AI-powered analysis of your marine construction business performance
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium">Predictive Analytics</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">Seasonal Demand Forecasting</h4>
                    <p className="text-xs text-blue-700 dark:text-blue-300">Predict busy seasons for seawall and dock projects</p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="text-sm font-medium text-green-900 dark:text-green-100">Storm Impact Analysis</h4>
                    <p className="text-xs text-green-700 dark:text-green-300">Anticipate repair demand after weather events</p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h4 className="text-sm font-medium text-purple-900 dark:text-purple-100">Client Retention Prediction</h4>
                    <p className="text-xs text-purple-700 dark:text-purple-300">Identify clients likely to need future services</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Optimization Insights</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                    <h4 className="text-sm font-medium text-orange-900 dark:text-orange-100">Resource Allocation</h4>
                    <p className="text-xs text-orange-700 dark:text-orange-300">Optimize crew scheduling and equipment usage</p>
                  </div>
                  <div className="p-3 bg-teal-50 dark:bg-teal-950/20 rounded-lg border border-teal-200 dark:border-teal-800">
                    <h4 className="text-sm font-medium text-teal-900 dark:text-teal-100">Pricing Optimization</h4>
                    <p className="text-xs text-teal-700 dark:text-teal-300">Competitive pricing analysis for marine construction</p>
                  </div>
                  <div className="p-3 bg-rose-50 dark:bg-rose-950/20 rounded-lg border border-rose-200 dark:border-rose-800">
                    <h4 className="text-sm font-medium text-rose-900 dark:text-rose-100">Lead Scoring</h4>
                    <p className="text-xs text-rose-700 dark:text-rose-300">Prioritize leads with highest conversion potential</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Generated Content History */}
      <Container className="py-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">AI Generated Content</h2>
            <p className="text-sm text-muted-foreground">
              History of AI-generated emails and business communications
            </p>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No generated content yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Use the email templates above to create your first AI-generated content
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
