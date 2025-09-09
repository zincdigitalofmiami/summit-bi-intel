"use client";

import Link from "next/link";

export default function ZincFusion() {
  return (
    <Link
      href="https://www.zincdigital.co"
      target="_blank"
      className="relative mt-auto flex flex-col items-center justify-center px-4 py-4 border-t border-border"
    >
      <div className="dot-matrix absolute left-0 top-0 -z-10 h-full w-full" />
      <div className="text-center">
        <div className="text-xs text-muted-foreground mb-1">Powered by</div>
        <div className="text-sm font-bold">
          <span className="text-white">ZINC </span>
          <span className="text-federal-orange">FUSION</span>
        </div>
      </div>
    </Link>
  );
}
