import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategorySidebar } from "@/components/category-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TipExplorer } from "@/components/tip-explorer";
import { getCategories, getCategory } from "@/lib/content";

export function generateStaticParams() {
  return getCategories().map(({ slug }) => ({ category: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  return category ? { title: `${category.title} tips`, description: `${category.tips.length} practical Laravel tips about ${category.title}.` } : {};
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const categories = getCategories();
  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <>
      <SiteHeader />
      <div className="app-shell">
        <CategorySidebar categories={categories} active={category.slug} />
        <main className="main-content inner-page">
          <div className="breadcrumb"><Link href="/">All tips</Link><span>/</span><span>{category.title}</span></div>
          <div className="category-hero">
            <p className="section-kicker">TOPIC COLLECTION</p>
            <h1>{category.title}<span className="title-period">.</span></h1>
            <p>A collection of {category.tips.length} practical ideas to make everyday Laravel work a little smoother.</p>
            <span className="category-count-pill">{String(category.tips.length).padStart(2, "0")} TIPS</span>
          </div>
          <TipExplorer tips={category.tips} categories={categories} initialCategory={category.slug} />
          <SiteFooter actionHref="/laravel-tips/" actionLabel="Browse all topics ↗" />
        </main>
      </div>
    </>
  );
}
