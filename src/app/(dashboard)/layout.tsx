import { TopNav } from "@/components/nav";
import MobileFloatingActions from "@/components/mobile-floating-actions";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNav title="Dashboard" />
      <main>{children}</main>
      <MobileFloatingActions />
    </>
  );
}
