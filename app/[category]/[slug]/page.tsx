import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategorySidebar } from "@/components/category-sidebar";
import { MarkdownContent } from "@/components/markdown-content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getCategories, getTip } from "@/lib/content";

export function generateStaticParams() {
  return getCategories().flatMap((category) => category.tips.map((tip) => ({ category: category.slug, slug: tip.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
  const { category, slug } = await params;
  const tip = getTip(category, slug);
  return tip ? { title: tip.title, description: tip.searchableText.slice(0, 155) } : {};
}

export default async function TipPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category: categorySlug, slug } = await params;
  const categories = getCategories();
  const tip = getTip(categorySlug, slug);
  if (!tip) notFound();
  const category = categories.find((item) => item.slug === categorySlug)!;
  const index = category.tips.findIndex((item) => item.slug === slug);
  const previous = category.tips[index - 1];
  const next = category.tips[index + 1];

  return (
    <>
      <SiteHeader />
      <div className="app-shell">
        <CategorySidebar categories={categories} active={category.slug} />
        <main className="main-content inner-page article-page">
          <div className="breadcrumb"><Link href="/">All tips</Link><span>/</span><Link href={`/${category.slug}/`}>{category.title}</Link><span>/</span><span>Tip {String(index + 1).padStart(2, "0")}</span></div>
          <article>
            <div className="article-heading">
              <Link className="article-category" href={`/${category.slug}/`}>{category.title}<span aria-hidden="true"> ↗</span></Link>
              <span className="article-index">TIP {String(index + 1).padStart(2, "0")} / {String(category.tips.length).padStart(2, "0")}</span>
              <h1>{tip.title}<span className="title-period">.</span></h1>
              <div className="article-rule"><span /></div>
            </div>
            <div className="markdown-body"><MarkdownContent>{tip.markdown}</MarkdownContent></div>
          </article>
          <nav className="article-pagination" aria-label="Tips in this category">
            {previous ? <Link href={`/${category.slug}/${previous.slug}/`} className="page-step"><span>← PREVIOUS TIP</span><strong>{previous.title}</strong></Link> : <Link href={`/${category.slug}/`} className="page-step"><span>← BACK TO TOPIC</span><strong>{category.title}</strong></Link>}
            {next ? <Link href={`/${category.slug}/${next.slug}/`} className="page-step next-step"><span>NEXT TIP →</span><strong>{next.title}</strong></Link> : <Link href="/" className="page-step next-step"><span>EXPLORE MORE →</span><strong>All Laravel tips</strong></Link>}
          </nav>
          <SiteFooter actionHref={`/${category.slug}/`} actionLabel="Browse this topic ↗" />
        </main>
      </div>
    </>
  );
}
