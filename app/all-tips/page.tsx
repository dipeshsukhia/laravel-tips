import type { Metadata } from "next";
import { CategorySidebar } from "@/components/category-sidebar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TipExplorer } from "@/components/tip-explorer";
import { getAllTips, getCategories } from "@/lib/content";

export const metadata: Metadata = {
  title: "All Laravel Tips",
  description: "Browse and search practical Laravel tips, implementation guides, and code examples.",
  alternates: { canonical: "/laravel-tips/all-tips/" },
  openGraph: {
    type: "website",
    url: "/laravel-tips/all-tips/",
    title: "All Laravel Tips | Laravel Tips",
    description: "Browse and search practical Laravel tips, implementation guides, and code examples.",
  },
  twitter: {
    card: "summary",
    title: "All Laravel Tips | Laravel Tips",
    description: "Browse and search practical Laravel tips, implementation guides, and code examples.",
  },
};

export default function AllTipsPage() {
  const categories = getCategories();
  const tips = getAllTips();

  return (
    <>
      <SiteHeader showSidebarToggle />
      <div className="app-shell">
        <CategorySidebar categories={categories} activeAll />
        <main className="main-content inner-page">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                name: "All Laravel Tips",
                description: "Browse and search practical Laravel tips, implementation guides, and code examples.",
                url: "https://dipeshsukhia.github.io/laravel-tips/all-tips/",
                isPartOf: { "@type": "WebSite", name: "Laravel Tips", url: "https://dipeshsukhia.github.io/laravel-tips/" },
                about: { "@type": "Thing", name: "Laravel development" },
                inLanguage: "en",
              }).replace(/</g, "\\u003c"),
            }}
          />
          <section className="category-hero all-tips-hero">
            <p className="section-kicker">THE COMPLETE COLLECTION</p>
            <h1>All Laravel Tips<span className="title-period">.</span></h1>
            <p>Search practical Laravel guidance, patterns, and code examples across every topic.</p>
            <span className="category-count-pill">{String(tips.length).padStart(2, "0")} TIPS</span>
          </section>
          <TipExplorer tips={tips} categories={categories} />
          <SiteFooter />
        </main>
      </div>
    </>
  );
}
