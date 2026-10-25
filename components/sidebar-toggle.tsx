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
      title={label}
      onClick={toggle}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M9 4v16m5-11 2 2-2 2" />
      </svg>
    </button>
  );
}
