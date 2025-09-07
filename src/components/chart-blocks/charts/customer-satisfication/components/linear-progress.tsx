"use client";

import { numberToPercentage } from "@/lib/utils";

interface LinearProgressProps {
  label: string;
  color: string;
  percentage: number;
  icon?: React.ReactNode;
}

export default function LinearProgress({ label, color, percentage, icon }: LinearProgressProps) {
  const displayPercentage = Math.min(Math.max(percentage, 0), 100);
  
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span className="font-medium text-foreground">{label}</span>
        </div>
        <span className="text-muted-foreground">{numberToPercentage(percentage)}</span>
      </div>
      
      <div className="relative">
        <div 
          className="h-2.5 bg-muted rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={displayPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${label}: ${numberToPercentage(percentage)}`}
        >
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${displayPercentage}%`,
              backgroundColor: color,
            }}
          />
        </div>
      </div>
    </div>
  );
}
