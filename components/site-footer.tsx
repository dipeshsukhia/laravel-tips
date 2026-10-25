"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

type SiteFooterProps = {
  actionHref?: string;
  actionLabel?: string;
};

export function SiteFooter({ actionHref, actionLabel }: SiteFooterProps) {
  const [year, setYear] = useState(() => new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="site-footer">
      <span className="footer-tagline">Made for the love of Laravel.</span>
      <small className="footer-copyright">
        Copyright © <time dateTime={String(year)} suppressHydrationWarning>{year}</time>{" "}
        <a href="https://dipeshsukhia.github.io/">Dipesh Sukhia.</a> All Rights Reserved.
      </small>
      {actionHref && actionLabel ? <Link className="footer-action" href={actionHref}>{actionLabel}</Link> : <span />}
    </footer>
  );
}
