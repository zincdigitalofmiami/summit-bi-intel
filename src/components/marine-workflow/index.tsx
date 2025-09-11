"use client";

import {
  AlertTriangle,
  Anchor,
  Camera,
  CheckCircle,
  Clock,
  FileText,
  Phone,
  Waves,
  Wrench
} from "lucide-react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: "completed" | "current" | "pending" | "blocked";
  estimatedDays: number;
  assignedTo?: string;
  checklist: string[];
  automatedActions?: string[];
}

export default function MarineWorkflow({ projectType = "SEAWALL" }: { projectType?: string }) {
  const [selectedStep, setSelectedStep] = useState<string | null>(null);

  const getWorkflowSteps = (type: string): WorkflowStep[] => {
    const baseSteps: WorkflowStep[] = [
      {
        id: "initial-contact",
        title: "Initial Client Contact",
        description: "First meeting with client to understand needs and assess property",
        status: "completed",
        estimatedDays: 1,
        assignedTo: "Sales Team",
        checklist: [
          "Property assessment completed",
          "Client requirements documented",
          "Preliminary budget discussed",
          "Site photos taken"
        ]
      },
      {
        id: "site-survey",
        title: "Site Survey & Assessment",
        description: "Comprehensive survey including water conditions, soil testing, and measurements",
        status: "completed",
        estimatedDays: 3,
        assignedTo: "Project Manager",
        checklist: [
          "Detailed property measurements",
          "Soil composition analysis",
          "Water level monitoring",
          "Existing structure assessment",
          "Utility line identification"
        ],
        automatedActions: ["Schedule soil testing", "Weather monitoring activated"]
      },
      {
        id: "permit-application",
        title: "Permit Application",
        description: "Submit all required permits to local authorities and regulatory bodies",
        status: "current",
        estimatedDays: 14,
        assignedTo: "Administrative Team",
        checklist: [
          "Building department application",
          "Environmental impact assessment",
          "Coastal zone permit",
          "Army Corps of Engineers approval",
          "Local HOA approvals (if applicable)"
        ],
        automatedActions: ["Permit tracking system activated", "Follow-up reminders set"]
      }
    ];

    // Add type-specific steps
    if (type === "SEAWALL") {
      baseSteps.push(
        {
          id: "foundation-work",
          title: "Foundation & Excavation",
          description: "Excavate foundation and prepare base for seawall construction",
          status: "pending",
          estimatedDays: 7,
          assignedTo: "Construction Crew",
          checklist: [
            "Excavation completed safely",
            "Foundation drainage installed",
            "Utility lines protected",
            "Base material compacted",
            "Foundation inspection passed"
          ]
        },
        {
          id: "seawall-construction",
          title: "Seawall Construction",
          description: "Build seawall structure with marine-grade materials",
          status: "pending",
          estimatedDays: 21,
          assignedTo: "Construction Crew",
          checklist: [
            "Marine concrete blocks installed",
            "Reinforcement bars placed",
            "Waterproofing applied",
            "Backfill and drainage",
            "Regular inspections completed"
          ]
        }
      );
    } else if (type === "DOCK") {
      baseSteps.push(
        {
          id: "dock-design",
          title: "Dock Design & Engineering",
          description: "Create detailed dock plans with marine engineering specifications",
          status: "pending",
          estimatedDays: 10,
          assignedTo: "Engineering Team",
          checklist: [
            "Structural calculations completed",
            "Material specifications finalized",
            "Wave load analysis done",
            "Client approval obtained"
          ]
        }
      );
    }

    // Common final steps
    baseSteps.push(
      {
        id: "final-inspection",
        title: "Final Inspection & Approval",
        description: "Final inspection by authorities and client sign-off",
        status: "pending",
        estimatedDays: 3,
        assignedTo: "Project Manager",
        checklist: [
          "Final authority inspection",
          "Client walkthrough completed",
          "Punch list addressed",
          "Certificate of occupancy obtained"
        ]
      },
      {
        id: "project-completion",
        title: "Project Completion",
        description: "Project handover, documentation, and warranty setup",
        status: "pending",
        estimatedDays: 1,
        assignedTo: "Project Manager",
        checklist: [
          "Final documentation compiled",
          "Client training completed",
          "Warranty information provided",
          "Project archived"
        ]
      }
    );

    return baseSteps;
  };

  const steps = getWorkflowSteps(projectType);
  const currentStepIndex = steps.findIndex(step => step.status === "current");
  const completedSteps = steps.filter(step => step.status === "completed").length;
  const totalProgress = Math.round((completedSteps / steps.length) * 100);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "current":
        return <Clock className="h-5 w-5 text-blue-600" />;
      case "blocked":
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "current":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "blocked":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Project Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Anchor className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Marine Construction Workflow</h2>
                <p className="text-sm text-muted-foreground">{projectType} Project</p>
              </div>
            </div>
            <Badge variant="outline">
              Step {currentStepIndex + 1} of {steps.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{totalProgress}%</span>
            </div>
            <Progress value={totalProgress} className="h-3" />
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="text-2xl font-bold text-green-600">{completedSteps}</div>
                <div className="text-muted-foreground">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">1</div>
                <div className="text-muted-foreground">In Progress</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-600">{steps.length - completedSteps - 1}</div>
                <div className="text-muted-foreground">Remaining</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workflow Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <Card
            key={step.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              step.status === "current" ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                {/* Status Icon */}
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(step.status)}
                </div>

                {/* Step Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{step.title}</h3>
                        <Badge className={getStatusColor(step.status)}>
                          {step.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {step.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {step.estimatedDays} days
                        </span>
                        {step.assignedTo && (
                          <span className="flex items-center gap-1">
                            <Wrench className="h-3 w-3" />
                            {step.assignedTo}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="flex-shrink-0 text-right">
                      <div className="text-xs text-muted-foreground mb-1">
                        Step {index + 1}
                      </div>
                      {step.status === "completed" && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {selectedStep === step.id && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium mb-2">Checklist</h4>
                          <div className="space-y-1">
                            {step.checklist.map((item, idx) => (
                              <div key={`${step.id}-checklist-${idx}`} className="flex items-center gap-2 text-sm">
                                <div className="w-4 h-4 rounded border flex items-center justify-center">
                                  {step.status === "completed" && (
                                    <CheckCircle className="h-3 w-3 text-green-600" />
                                  )}
                                </div>
                                <span className={step.status === "completed" ? "line-through text-muted-foreground" : ""}>
                                  {item}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {step.automatedActions && step.automatedActions.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-2">Automated Actions</h4>
                            <div className="space-y-1">
                              {step.automatedActions.map((action, idx) => (
                                <div key={`${step.id}-action-${idx}`} className="flex items-center gap-2 text-sm text-blue-600">
                                  <Wrench className="h-3 w-3" />
                                  <span>{action}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                          {step.status === "current" && (
                            <>
                              <Button size="sm">
                                <Camera className="h-4 w-4 mr-1" />
                                Add Photos
                              </Button>
                              <Button size="sm" variant="outline">
                                <FileText className="h-4 w-4 mr-1" />
                                Update Status
                              </Button>
                            </>
                          )}
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4 mr-1" />
                            Contact Team
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Marine-Specific Tips */}
      <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <Waves className="h-5 w-5" />
            Marine Construction Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Weather Considerations</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Monitor tide schedules for construction timing</li>
                <li>• Avoid work during high wind conditions</li>
                <li>• Schedule inspections during favorable weather</li>
                <li>• Keep materials protected from salt air</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Regulatory Compliance</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Maintain permit documentation</li>
                <li>• Follow Army Corps guidelines</li>
                <li>• Document all environmental protections</li>
                <li>• Keep inspection records current</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
