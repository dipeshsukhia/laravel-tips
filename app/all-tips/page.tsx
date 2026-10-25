import type { Metadata } from "next";
import { CategorySidebar } from "@/components/category-sidebar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TipExplorer } from "@/components/tip-explorer";
import { getAllTips, getCategories } from "@/lib/content";

export const metadata: Metadata = {
  title: "All Laravel Tips",
  description: "Browse and search practical Laravel tips, implementation guides, and code examples.",
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
