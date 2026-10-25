import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getAllTips, getCategories } from "@/lib/content";
import { TopicIcon } from "@/components/topic-icon";

export default function HomePage() {
  const categories = getCategories();
  const tips = getAllTips();
  return (
    <>
      <SiteHeader />
      <div className="app-shell home-shell">
        <main className="main-content">
          <div className="eyebrow"><span className="eyebrow-line" /> THE LARAVEL FIELD GUIDE <span className="eyebrow-line" /></div>
          <section className="hero">
            <p className="hero-kicker">A little better, every day.</p>
            <h1>Laravel, <em>well</em> understood.</h1>
            <p className="hero-description">Practical tips and thoughtful shortcuts to help you write cleaner, more confident Laravel code.</p>
            <div className="hero-stats">
              <div><strong>{tips.length}</strong><span>practical tips</span></div>
              <span className="stat-divider" />
              <div><strong>{categories.length}</strong><span>topics to explore</span></div>
              <span className="hero-spark" aria-hidden="true">✳</span>
            </div>
          </section>

          <section className="category-tiles" aria-label="Browse by topic">
            <div className="section-heading compact-heading"><div><p className="section-kicker">EXPLORE BY TOPIC</p><h2>Where to begin</h2></div><span className="section-note">{categories.length + 1} collections</span></div>
            <div className="category-grid">
              <Link className="category-card" href="/all-tips/">
                <span className="category-card-icon"><TopicIcon topic="all-tips" /></span>
                <span className="category-card-title">All Tips</span>
                <span className="category-card-count">{tips.length} tips <span aria-hidden="true">↗</span></span>
              </Link>
              {categories.map((category) => (
                <Link className="category-card" href={`/${category.slug}/`} key={category.slug}>
                  <span className="category-card-icon"><TopicIcon topic={category.slug} /></span>
                  <span className="category-card-title">{category.title}</span>
                  <span className="category-card-count">{category.tips.length} tips <span aria-hidden="true">↗</span></span>
                </Link>
              ))}
            </div>
          </section>
          <SiteFooter />
        </main>
      </div>
    </>
  );
}
