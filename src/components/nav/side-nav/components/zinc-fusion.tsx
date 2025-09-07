"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ZincFusion() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const logoSrc = currentTheme === "dark" 
    ? "https://www.zincdigital.co/wp-content/uploads/2024/12/zinc-white-fusion-icon.png"
    : "https://www.zincdigital.co/wp-content/uploads/2022/09/2.png";

  return (
    <Link
      href="https://www.zincdigital.co"
      target="_blank"
      className="relative my-2 flex flex-col items-center justify-center gap-y-2 px-4 py-4"
    >
      <div className="dot-matrix absolute left-0 top-0 -z-10 h-full w-full" />
      <span className="text-xs text-muted-foreground">Powered by</span>
      <div className="flex items-center space-x-2">
        <Image
          src={logoSrc}
          alt="ZINC Digital"
          width={32}
          height={32}
          className="rounded-lg"
        />
        <span className="text-sm bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-semibold">
          ZINC Digital
        </span>
      </div>
    </Link>
  );
}