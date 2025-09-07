import Link from "next/link";
import Image from "next/image";

export default function ZincFusion() {
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
          src="https://stg-httpswwwzincdigitalco-zincstage.kinsta.cloud/wp-content/uploads/2025/08/19-600x600.png"
          alt="ZINC Digital"
          width={24}
          height={24}
          className="rounded-full"
        />
        <span className="text-md bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-semibold">
          ZINC Digital
        </span>
      </div>
    </Link>
  );
}
