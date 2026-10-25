import type { Metadata } from "next";
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
