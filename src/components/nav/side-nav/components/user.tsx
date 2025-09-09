"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function User() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const currentTheme = theme === "system" ? systemTheme : theme;

  const logoLight = "/logos/Primary Summit Logo.png"; // dark text for light sidebar
  const logoDark = "/logos/Primary Summit Logo.png"; // fallback if white wordmark not available
  const logoSrc = currentTheme === "dark" ? logoDark : logoLight;

  return (
    <div className="flex h-16 items-center justify-center border-b border-border px-4">
      {mounted && (
        <Link href="/" className="inline-flex">
          <Image
            src={logoSrc}
            alt="Summit Marine Development"
            width={180}
            height={40}
            priority
            className="h-auto max-w-full"
          />
        </Link>
      )}
    </div>
  );
}
