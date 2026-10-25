"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Category, Tip } from "@/lib/content";

function excerpt(text: string, maxCharacters: number) {
  const characters = Array.from(text);
  const truncated = characters.slice(0, maxCharacters).join("");
  return characters.length > maxCharacters ? `${truncated}…` : truncated;
}

export function TipExplorer({
  tips,
  categories,
  initialCategory,
}: {
  tips: Tip[];
  categories: Category[];
  initialCategory?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory ?? "all");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return tips.filter((tip) => {
      const matchesCategory = category === "all" || tip.categorySlug === category;
      const matchesQuery = !normalized || `${tip.title} ${tip.category} ${tip.searchableText}`.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [tips, query, category]);

  return (
    <>
      <div className="explorer-tools">
        <label className="search-box">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tips, concepts, code…" aria-label="Search tips" />
          <kbd>⌘ K</kbd>
        </label>
        <select aria-label="Filter by category" value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="all">All categories</option>
          {categories.map((item) => <option key={item.slug} value={item.slug}>{item.title}</option>)}
        </select>
      </div>
      <div className="result-meta"><span>{filtered.length} {filtered.length === 1 ? "tip" : "tips"}</span>{query && <span> matching “{query}”</span>}</div>
      {filtered.length ? (
        <div className="tip-list">
          {filtered.map((tip, index) => (
            <Link className="tip-row" href={`/${tip.categorySlug}/${tip.slug}/`} key={`${tip.categorySlug}-${tip.slug}`}>
              <span className="tip-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="tip-row-content">
                <span className="tip-row-title">{tip.title}</span>
                <span className="tip-row-excerpt">{excerpt(tip.searchableText, 150)}</span>
              </span>
              <span className="tip-row-category">{tip.category}</span>
              <span className="tip-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      ) : <div className="empty-state"><span>⌕</span><strong>No tips found</strong><p>Try a different word or category.</p></div>}
    </>
  );
}
