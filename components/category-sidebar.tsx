"use client";

import Link from "next/link";
import type { Category } from "@/lib/content";
import { useSidebar } from "@/components/sidebar-provider";

export function CategorySidebar({ categories, active, activeAll = false }: { categories: Category[]; active?: string; activeAll?: boolean }) {
  const { isOpen } = useSidebar();
  return (
    <aside className={`sidebar${isOpen ? "" : " is-collapsed"}`}>
      <p className="sidebar-label">Browse library</p>
      <nav aria-label="Tip categories" className="category-nav">
        <Link className={`nav-link ${activeAll ? "active" : ""}`} href="/all-tips/">
          <span className="nav-icon">⌂</span><span>All tips</span>
        </Link>
        {categories.map((category) => (
          <Link className={`nav-link ${active === category.slug ? "active" : ""}`} href={`/${category.slug}/`} key={category.slug}>
            <span className="nav-icon">#</span><span>{category.title}</span><span className="nav-count">{category.tips.length}</span>
          </Link>
        ))}
      </nav>
      <div className="sidebar-card">
        <span className="sidebar-card-icon">✳</span>
        <strong>Small tips, cleaner code.</strong>
        <p>Small ideas that make a big difference in your next project.</p>
      </div>
    </aside>
  );
}
