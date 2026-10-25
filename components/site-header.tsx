import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarToggle } from "@/components/sidebar-toggle";

export function SiteHeader({ showSidebarToggle = false }: { showSidebarToggle?: boolean }) {
  return (
    <header className="topbar">
      <div className="topbar-leading">
        {showSidebarToggle && <SidebarToggle />}
        <Link className="brand" href="/" aria-label="Laravel Tips home">
          <span className="brand-mark"><img src="/laravel-tips/laravel-mark.svg" alt="" /></span>
          <span>Laravel <b>Tips</b></span>
        </Link>
      </div>
      <div className="topbar-note"><span className="status-dot" /> A field guide for Laravel developers</div>
      <div className="topbar-actions">
        <ThemeToggle />
        <a className="source-link" href="https://dipeshsukhia.github.io/">
          Dipesh Sukhia <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}
