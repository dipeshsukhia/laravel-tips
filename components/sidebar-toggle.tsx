"use client";

import { useSidebar } from "@/components/sidebar-provider";

export function SidebarToggle() {
  const { isOpen, toggle } = useSidebar();
  const label = isOpen ? "Hide navigation" : "Show navigation";

  return (
    <button
      className="sidebar-toggle"
      type="button"
      aria-label={label}
      aria-expanded={isOpen}
      aria-controls="category-sidebar"
      title={label}
      onClick={toggle}
    >
      <svg className="sidebar-menu-icon" viewBox="0 0 24 24" aria-hidden="true">
        {isOpen ? <path d="M6 6 18 18M18 6 6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
      </svg>
    </button>
  );
}
