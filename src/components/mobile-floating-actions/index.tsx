"use client";

import { Button } from "@/components/ui/button";
import { 
  Plus,
  Phone,
  Calculator,
  Calendar,
  X
} from "lucide-react";
import { useState } from "react";

const mobileQuickActions = [
  {
    id: "emergency",
    label: "Emergency",
    icon: Phone,
    color: "bg-red-500 hover:bg-red-600",
  },
  {
    id: "quote",
    label: "New Quote",
    icon: Calculator,
    color: "bg-blue-500 hover:bg-primary",
  },
  {
    id: "schedule",
    label: "Schedule",
    icon: Calendar,
    color: "bg-green-500 hover:bg-green-600",
  },
];

export default function MobileFloatingActions() {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = (actionId: string) => {
    if (actionId === "emergency") {
      window.open("tel:911", "_self");
    }
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 sm:hidden">
      {/* Action Buttons */}
      {isOpen && (
        <div className="flex flex-col space-y-3 mb-3">
          {mobileQuickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <div
                key={action.id}
                className="flex items-center space-x-3 animate-in slide-in-from-bottom duration-200"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="bg-black/75 text-white text-sm px-3 py-1 rounded-md whitespace-nowrap">
                  {action.label}
                </span>
                <Button
                  onClick={() => handleAction(action.id)}
                  className={`${action.color} text-white rounded-full h-12 w-12 shadow-lg hover:shadow-xl transition-all duration-200`}
                  size="icon"
                >
                  <Icon className="h-5 w-5" />
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {/* Main FAB */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen 
            ? "bg-gray-500 hover:bg-gray-600 rotate-45" 
            : "bg-primary hover:bg-primary/90"
        } text-white rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-200`}
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </Button>
    </div>
  );
}
