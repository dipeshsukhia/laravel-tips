import type { Metadata } from "next";
import { BackToTop } from "@/components/back-to-top";
import { SidebarProvider } from "@/components/sidebar-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dipeshsukhia.github.io"),
  title: {
    default: "Laravel Tips — Practical tips for Laravel developers",
    template: "%s | Laravel Tips",
  },
  description:
    "Browse 350+ Laravel tips, Eloquent examples, and copyable PHP code snippets covering models, migrations, routing, validation, APIs, and more.",
  applicationName: "Laravel Tips",
  authors: [{ name: "Dipesh Sukhia", url: "https://dipeshsukhia.github.io/" }],
  creator: "Dipesh Sukhia",
  publisher: "Dipesh Sukhia",
  keywords: [
    "Laravel tips",
    "Laravel tutorials",
    "Laravel examples",
    "PHP code snippets",
    "Eloquent ORM",
    "Laravel migrations",
    "Laravel validation",
    "Laravel routing",
  ],
  alternates: { canonical: "/laravel-tips/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/laravel-tips/",
    siteName: "Laravel Tips",
    title: "Laravel Tips — Practical tips for Laravel developers",
    description:
      "Browse practical Laravel tips, Eloquent examples, and copyable PHP snippets for cleaner, more confident development.",
  },
  twitter: {
    card: "summary",
    title: "Laravel Tips — Practical tips for Laravel developers",
    description:
      "Practical Laravel tips, Eloquent examples, and copyable PHP snippets for developers.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta name="google-adsense-account" content="ca-pub-1156764432689204" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1156764432689204"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  name: "Laravel Tips",
                  url: "https://dipeshsukhia.github.io/laravel-tips/",
                  description: metadata.description,
                  inLanguage: "en",
                  author: { "@type": "Person", name: "Dipesh Sukhia", url: "https://dipeshsukhia.github.io/" },
                },
                {
                  "@type": "Person",
                  name: "Dipesh Sukhia",
                  url: "https://dipeshsukhia.github.io/",
                  jobTitle: "Software Developer",
                  knowsAbout: ["Laravel", "PHP", "Eloquent ORM", "Web development"],
                },
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
        <SidebarProvider>{children}</SidebarProvider>
        <BackToTop />
      </body>
    </html>
  );
}
