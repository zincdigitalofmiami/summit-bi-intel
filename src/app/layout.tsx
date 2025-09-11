import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/nav/header";
import SideNav from "@/components/nav/side-nav";
import { cn } from "@/lib/utils";
import { gabarito } from "./fonts";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Summit Marine Development - BI Dashboard",
  description: "Business Intelligence Dashboard for Marine Construction Services",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-white.png", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/favicon-white.png", sizes: "180x180" },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TEMP: force authenticated UI visible while app is public
  const hasAuth = true;
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("bg-background font-sans", gabarito.variable)}>
        <Providers>
          <div className="flex min-h-[100dvh]">
            {hasAuth && <SideNav />}
            <div className="flex-grow overflow-auto flex min-h-screen flex-col">
              {hasAuth && <Header title="Summit Intelligence" />}
              <main className="flex-1">{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
