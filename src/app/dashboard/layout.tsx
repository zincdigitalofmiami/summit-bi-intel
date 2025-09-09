import MobileFloatingActions from "@/components/mobile-floating-actions";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
      <MobileFloatingActions />
    </div>
  );
}
