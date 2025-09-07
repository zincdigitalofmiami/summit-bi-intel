import Image from "next/image";

export default function User() {
  return (
    <div className="flex h-16 items-center justify-center border-b border-border px-4">
      <Image
        src="https://www.zincdigital.co/wp-content/uploads/2025/09/DESIGN-7-8.png"
        alt="Summit Marine Development"
        width={160}
        height={40}
        className="max-w-full h-auto"
      />
    </div>
  );
}
