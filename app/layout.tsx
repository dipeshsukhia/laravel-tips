import type { Metadata } from "next";
import { BackToTop } from "@/components/back-to-top";
import { SidebarProvider } from "@/components/sidebar-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Laravel Tips — Practical tips for Laravel developers",
    template: "%s | Laravel Tips",
  },
  description:
    "A searchable collection of practical Laravel tips, examples, and code snippets for developers.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1156764432689204"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <SidebarProvider>{children}</SidebarProvider>
        <BackToTop />
      </body>
    </html>
  );
}
