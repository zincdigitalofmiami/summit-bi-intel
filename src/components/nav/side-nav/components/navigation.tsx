"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigations } from "@/config/site";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-grow flex-col gap-y-0 p-0 mt-6">
      {navigations.map((navigation) => {
        const Icon = navigation.icon;
        const isActive = pathname === navigation.href;
        return (
          <Link
            key={navigation.name}
            href={navigation.href}
            className={cn(
              "flex items-center px-4 py-3 transition-colors duration-200",
              "hover:bg-muted/50",
              isActive
                ? "bg-primary/10 text-primary border-r-2 border-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon
              size={18}
              className={cn(
                "mr-3",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            />
            <span className="text-base font-medium">
              {navigation.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
