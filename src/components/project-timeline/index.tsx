"use client";

import {
  AlertTriangle,
  Anchor,
  Calendar,
  Camera,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  MapPin,
  MessageSquare,
  Phone,
  Play,
  Users,
  Waves,
  Wrench
} from "lucide-react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface TimelineEvent {
  id: string;
  type: "milestone" | "update" | "delay" | "completion";
  title: string;
  description: string;
  date: string;
  status: "completed" | "in-progress" | "upcoming" | "delayed";
  assignedTo?: string;
  cost?: number;
  location?: string;
  weather?: string;
  photos?: number;
}

interface ProjectTimelineProps {
  projectId: string;
  projectName: string;
  clientName: string;
  currentProgress: number;
  deadline: string;
  status: "ACTIVE" | "COMPLETED" | "ON_HOLD";
}

export default function ProjectTimeline({
  projectId: _projectId,
  projectName,
  clientName,
  currentProgress,
  deadline,
  status
}: ProjectTimelineProps) {
  const [_selectedPhase, _setSelectedPhase] = useState<string | null>(null);

  // Mock timeline data - in production, this would come from API
  const timelineEvents: TimelineEvent[] = [
    {
      id: "1",
      type: "milestone",
      title: "Initial Site Survey",
      description: "Completed comprehensive survey of Panama City Beach property including water conditions and existing structures",
      date: "2024-08-15",
      status: "completed",
      assignedTo: "Mike Johnson",
      location: "Panama City Beach, FL",
      weather: "Sunny, 82°F",
      photos: 12
    },
    {
      id: "2",
      type: "milestone",
      title: "Permit Application",
      description: "Submitted all required permits to Panama City Building Department for seawall construction",
      date: "2024-08-20",
      status: "completed",
      assignedTo: "Sarah Davis",
      cost: 450
    },
    {
      id: "3",
      type: "milestone",
      title: "Foundation Preparation",
      description: "Excavation and foundation work for seawall base. All utilities marked and protected.",
      date: "2024-09-01",
      status: "completed",
      assignedTo: "Carlos Rodriguez",
      cost: 8500,
      photos: 8
    },
    {
      id: "4",
      type: "update",
      title: "Material Delivery",
      description: "Received concrete blocks and reinforcing materials. Quality inspection passed.",
      date: "2024-09-10",
      status: "completed",
      assignedTo: "Tom Wilson",
      cost: 3200
    },
    {
      id: "5",
      type: "milestone",
      title: "Seawall Construction Phase 1",
      description: "First 50 feet of seawall completed. Water levels monitored throughout construction.",
      date: "2024-09-20",
      status: "in-progress",
      assignedTo: "Carlos Rodriguez",
      weather: "Partly cloudy, 78°F",
      photos: 15
    },
    {
      id: "6",
      type: "milestone",
      title: "Mid-Project Inspection",
      description: "Scheduled inspection by Panama City Building Official",
      date: "2024-10-05",
      status: "upcoming",
      assignedTo: "Building Inspector"
    },
    {
      id: "7",
      type: "milestone",
      title: "Seawall Construction Phase 2",
      description: "Complete remaining seawall construction and finishing work",
      date: "2024-10-15",
      status: "upcoming",
      assignedTo: "Carlos Rodriguez",
      cost: 12500
    },
    {
      id: "8",
      type: "milestone",
      title: "Final Inspection & Approval",
      description: "Final inspection and certificate of occupancy",
      date: "2024-11-01",
      status: "upcoming",
      assignedTo: "Sarah Davis"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "in-progress":
        return <Play className="h-5 w-5 text-blue-600" />;
      case "delayed":
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "delayed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "milestone":
        return <Anchor className="h-4 w-4" />;
      case "update":
        return <Wrench className="h-4 w-4" />;
      case "completion":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
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
                <h2 className="text-xl font-semibold">{projectName}</h2>
                <p className="text-sm text-muted-foreground">Client: {clientName}</p>
              </div>
            </div>
            <Badge variant={status === 'ACTIVE' ? 'default' : status === 'COMPLETED' ? 'outline' : 'secondary'}>
              {status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Due: {new Date(deadline).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Team: 4 members</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Budget: $35,000</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{currentProgress}%</span>
            </div>
            <Progress value={currentProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Project Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {timelineEvents.map((event, index) => (
              <div key={event.id} className="flex gap-4">
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                  <div className={`p-2 rounded-full border-2 ${
                    event.status === 'completed' ? 'bg-green-100 border-green-300' :
                    event.status === 'in-progress' ? 'bg-blue-100 border-blue-300' :
                    event.status === 'delayed' ? 'bg-red-100 border-red-300' :
                    'bg-gray-100 border-gray-300'
                  }`}>
                    {getStatusIcon(event.status)}
                  </div>
                  {index < timelineEvents.length - 1 && (
                    <div className={`w-0.5 h-16 ${
                      event.status === 'completed' ? 'bg-green-300' : 'bg-gray-300'
                    }`} />
                  )}
                </div>

                {/* Event Content */}
                <div className="flex-1 pb-8">
                  <div className="bg-card border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(event.type)}
                        <h3 className="font-semibold">{event.title}</h3>
                      </div>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">{event.description}</p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(event.date).toLocaleDateString()}
                      </span>

                      {event.assignedTo && (
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {event.assignedTo}
                        </span>
                      )}

                      {event.cost && (
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          ${event.cost.toLocaleString()}
                        </span>
                      )}

                      {event.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </span>
                      )}

                      {event.weather && (
                        <span className="flex items-center gap-1">
                          <Waves className="h-3 w-3" />
                          {event.weather}
                        </span>
                      )}

                      {event.photos && (
                        <span className="flex items-center gap-1">
                          <Camera className="h-3 w-3" />
                          {event.photos} photos
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">
                        <FileText className="h-3 w-3 mr-1" />
                        View Details
                      </Button>

                      {event.status === 'in-progress' && (
                        <Button size="sm" variant="outline">
                          <Camera className="h-3 w-3 mr-1" />
                          Add Photos
                        </Button>
                      )}

                      {event.status !== 'completed' && (
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Update Status
                        </Button>
                      )}

                      <Button size="sm" variant="outline">
                        <Phone className="h-3 w-3 mr-1" />
                        Contact Client
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-16 flex flex-col gap-2">
              <Camera className="h-5 w-5" />
              <span className="text-xs">Add Photos</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-2">
              <MessageSquare className="h-5 w-5" />
              <span className="text-xs">Send Update</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-2">
              <Calendar className="h-5 w-5" />
              <span className="text-xs">Schedule Work</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-2">
              <FileText className="h-5 w-5" />
              <span className="text-xs">Generate Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
