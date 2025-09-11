"use client";

import {
  Anchor,
  Calendar,
  Camera,
  DollarSign,
  Mail,
  Phone,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  action: () => void;
  priority?: "high" | "medium" | "low";
}

export default function QuickActions() {
  const [isExpanded, setIsExpanded] = useState(false);

  const actions: QuickAction[] = [
    {
      id: "new-lead",
      title: "New Lead",
      description: "Add potential client",
      icon: Plus,
      color: "bg-blue-500 hover:bg-blue-600",
      action: () => alert("New lead form would open"),
      priority: "high",
    },
    {
      id: "call-client",
      title: "Call Client",
      description: "Quick dial recent client",
      icon: Phone,
      color: "bg-green-500 hover:bg-green-600",
      action: () => window.open("tel:+18505550123", "_self"),
    },
    {
      id: "send-email",
      title: "Send Email",
      description: "Compose professional email",
      icon: Mail,
      color: "bg-purple-500 hover:bg-purple-600",
      action: () => window.open("mailto:client@example.com", "_blank"),
    },
    {
      id: "schedule-site",
      title: "Site Visit",
      description: "Schedule property inspection",
      icon: Calendar,
      color: "bg-orange-500 hover:bg-orange-600",
      action: () => alert("Calendar would open"),
    },
    {
      id: "take-photos",
      title: "Site Photos",
      description: "Document project progress",
      icon: Camera,
      color: "bg-teal-500 hover:bg-teal-600",
      action: () => alert("Camera would open"),
    },
    {
      id: "generate-quote",
      title: "Quick Quote",
      description: "Generate project estimate",
      icon: DollarSign,
      color: "bg-emerald-500 hover:bg-emerald-600",
      action: () => alert("Quote generator would open"),
    },
    {
      id: "emergency-contact",
      title: "Emergency",
      description: "Coast Guard & Police",
      icon: Anchor,
      color: "bg-red-500 hover:bg-red-600",
      action: () => window.open("tel:911", "_self"),
      priority: "high",
    },
  ];

  const urgentActions = actions.filter((action) => action.priority === "high");
  const regularActions = actions.filter((action) => action.priority !== "high");

  return (
    <div className="fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6">
      {/* Main FAB */}
      <Button
        size="lg"
        className="h-14 w-14 rounded-full bg-blue-600 shadow-lg hover:bg-blue-700"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Plus
          className={`h-6 w-6 transition-transform ${isExpanded ? "rotate-45" : ""}`}
        />
      </Button>

      {/* Expanded Actions */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 mb-2">
          <Card className="w-80 border-0 bg-white/95 shadow-xl backdrop-blur-md dark:bg-slate-900/95 md:w-96">
            <CardContent className="p-4">
              {/* Urgent Actions */}
              {urgentActions.length > 0 && (
                <div className="mb-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="destructive" className="text-xs">
                      Urgent
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {urgentActions.map((action) => (
                      <Button
                        key={action.id}
                        variant="outline"
                        size="sm"
                        className="flex h-16 flex-col gap-1 p-2"
                        onClick={action.action}
                      >
                        <action.icon className="h-5 w-5" />
                        <span className="text-xs font-medium">
                          {action.title}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Regular Actions */}
              <div className="grid grid-cols-2 gap-2">
                {regularActions.map((action) => (
                  <Button
                    key={action.id}
                    variant="outline"
                    size="sm"
                    className="flex h-16 flex-col gap-1 p-2 hover:bg-blue-50 dark:hover:bg-blue-950/20"
                    onClick={action.action}
                  >
                    <action.icon className="h-5 w-5" />
                    <span className="text-xs font-medium">{action.title}</span>
                  </Button>
                ))}
              </div>

              {/* Marine Conditions Quick View removed */}

              {/* Close Button */}
              <div className="mt-3 flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Mobile Overlay */}
      {isExpanded && (
        <button
          type="button"
          className="fixed inset-0 -z-10 bg-black/20 md:hidden"
          onClick={() => setIsExpanded(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setIsExpanded(false);
            }
          }}
          aria-label="Close quick actions menu"
        />
      )}
    </div>
  );
}
