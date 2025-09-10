import type { Metadata } from "next";
import { Gabarito } from "next/font/google";
import { cookies } from "next/headers";
import "@/style/globals.css";
import { SideNav } from "@/components/nav";
import Header from "@/components/nav/header";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";

const gabarito = Gabarito({ subsets: ["latin"], variable: "--font-gabarito" });

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
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
  const cookieStore = await cookies();
  const hasAuth = Boolean(cookieStore.get("auth")?.value);
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
