"use client";

import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  Calendar, 
  Phone, 
  AlertTriangle, 
  CloudRain, 
  Briefcase,
  Users,
  Anchor
} from "lucide-react";
import { logger } from "@/lib/logger";

const quickActions = [
  {
    id: "quote",
    label: "Create Quote",
    icon: Calculator,
    color: "bg-blue-500 hover:bg-blue-600",
    description: "Fast estimate generation"
  },
  {
    id: "schedule",
    label: "Schedule Job",
    icon: Calendar,
    color: "bg-green-500 hover:bg-green-600",
    description: "Book marine project"
  },
  {
    id: "contact",
    label: "Contact Client",
    icon: Phone,
    color: "bg-purple-500 hover:bg-purple-600",
    description: "Quick communication"
  },
  {
    id: "weather",
    label: "Marine Weather",
    icon: CloudRain,
    color: "bg-cyan-500 hover:bg-cyan-600",
    description: "Conditions & tides"
  },
  {
    id: "projects",
    label: "Active Projects",
    icon: Briefcase,
    color: "bg-orange-500 hover:bg-orange-600",
    description: "Current job status"
  },
  {
    id: "crew",
    label: "Crew Status",
    icon: Users,
    color: "bg-indigo-500 hover:bg-indigo-600",
    description: "Team availability"
  },
  {
    id: "equipment",
    label: "Boats & Equipment",
    icon: Anchor,
    color: "bg-teal-500 hover:bg-teal-600",
    description: "Fleet management"
  },
  {
    id: "emergency",
    label: "Emergency",
    icon: AlertTriangle,
    color: "bg-red-500 hover:bg-red-600",
    description: "Safety protocols"
  },
];

export default function QuickActions() {
  const handleAction = (actionId: string) => {
    logger.info(`Quick action triggered: ${actionId}`);
    
    // Handle quick actions based on action ID
    switch (actionId) {
      case 'quote':
        // Navigate to quote creation or open modal
        logger.info('Quote creation action - implementation needed');
        break;
      case 'schedule':
        // Navigate to scheduling or open calendar
        logger.info('Schedule job action - implementation needed');
        break;
      case 'contact':
        // Navigate to contacts or open contact modal
        logger.info('Contact client action - implementation needed');
        break;
      case 'weather':
        // Navigate to weather page or open weather modal
        logger.info('Marine weather action - implementation needed');
        break;
      case 'projects':
        // Navigate to active projects
        logger.info('Active projects action - implementation needed');
        break;
      case 'crew':
        // Navigate to crew status
        logger.info('Crew status action - implementation needed');
        break;
      case 'equipment':
        // Navigate to equipment/fleet management
        logger.info('Equipment management action - implementation needed');
        break;
      case 'emergency':
        // Trigger emergency protocols
        logger.warn('Emergency action triggered - immediate attention required');
        break;
      default:
        logger.warn(`Unknown action ID: ${actionId}`);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.id}
              onClick={() => handleAction(action.id)}
              className={`${action.color} text-white h-auto p-4 flex flex-col items-center space-y-2 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl`}
              variant="default"
            >
              <Icon className="h-6 w-6" />
              <span className="text-sm font-medium text-center leading-tight">
                {action.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
