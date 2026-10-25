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
  if (!category) return {};
  const title = `${category.title} tips`;
  const description = `Explore ${category.tips.length} practical Laravel tips for ${category.title}, with clear examples and copyable PHP code.`;
  const url = `/laravel-tips/${category.slug}/`;
  return {
    title,
    description,
    alternates: { canonical: url },
    keywords: [`Laravel ${category.title}`, `${category.title} examples`, "Laravel tips"],
    openGraph: { type: "website", url, title: `${title} | Laravel Tips`, description },
    twitter: { card: "summary", title: `${title} | Laravel Tips`, description },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const categories = getCategories();
  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <>
      <SiteHeader showSidebarToggle />
      <div className="app-shell">
        <CategorySidebar categories={categories} active={category.slug} />
        <main className="main-content inner-page">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                name: `${category.title} tips`,
                description: `A collection of ${category.tips.length} practical Laravel ${category.title.toLowerCase()} tips.`,
                url: `https://dipeshsukhia.github.io/laravel-tips/${category.slug}/`,
                isPartOf: { "@type": "WebSite", name: "Laravel Tips", url: "https://dipeshsukhia.github.io/laravel-tips/" },
                about: { "@type": "Thing", name: `Laravel ${category.title}` },
                inLanguage: "en",
              }).replace(/</g, "\\u003c"),
            }}
          />
          <div className="breadcrumb"><Link href="/">All tips</Link><span>/</span><span>{category.title}</span></div>
          <div className="category-hero">
            <p className="section-kicker">TOPIC COLLECTION</p>
            <h1>{category.title}<span className="title-period">.</span></h1>
            <p>A collection of {category.tips.length} practical ideas to make everyday Laravel work a little smoother.</p>
            <span className="category-count-pill">{String(category.tips.length).padStart(2, "0")} TIPS</span>
          </div>
          <TipExplorer tips={category.tips} categories={categories} initialCategory={category.slug} />
          <SiteFooter actionHref="/" actionLabel="Browse all topics ↗" />
        </main>
      </div>
    </>
  );
}
