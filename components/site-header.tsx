import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="topbar">
      <Link className="brand" href="/" aria-label="Laravel Tips home">
        <span className="brand-mark">L</span>
        <span>Laravel <b>Tips</b></span>
      </Link>
      <div className="topbar-note"><span className="status-dot" /> A field guide for Laravel developers</div>
      <a className="source-link" href="https://dipeshsukhia.github.io/">
        Dipesh Sukhia <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}
