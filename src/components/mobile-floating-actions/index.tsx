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
  // Disabled per request: remove +create floating action button
  return null;
}
