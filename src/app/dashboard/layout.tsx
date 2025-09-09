import MobileFloatingActions from "@/components/mobile-floating-actions";
import Header from "@/components/nav/header";
import WeatherAlertBanner from "@/components/weather-alert-banner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <WeatherAlertBanner />
      <Header title="Dashboard" />
      <main className="flex-1">{children}</main>
      <MobileFloatingActions />
    </div>
  );
}
