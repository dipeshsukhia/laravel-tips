const paths: Record<string, React.ReactNode> = {
  "all-tips": <><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></>,
  "db-models-and-eloquent": <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>,
  "models-relations": <><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="m8 7 2.5 8M16 7l-2.5 8M8.5 6h7" /></>,
  migrations: <><path d="M7 7h13l-3-3M17 17H4l3 3" /><path d="M20 7a8 8 0 0 1-13 6M4 17a8 8 0 0 1 13-6" /></>,
  views: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
  routing: <><circle cx="6" cy="5" r="2" /><circle cx="18" cy="19" r="2" /><path d="M6 7v6a4 4 0 0 0 4 4h6M14 5h4v4M14 5l4 4" /></>,
  validation: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
  collections: <><path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5" /></>,
  auth: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 1 1 8 0v3M12 14v3" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  artisan: <><path d="M14 7 7 14l-3 1-1 4 4-1 1-3 7-7M14 7l3-3 4 4-3 3M5 19l-1 1" /></>,
  factories: <><path d="M3 21V9l6 3V9l6 3V5l6 3v13H3Z" /><path d="M7 17h2m3 0h2m3 0h2" /></>,
  "log-and-debug": <><path d="M8 5H5v14h3M16 5h3v14h-3M14 9l-4 6M10 9h.01M14 15h.01" /></>,
  api: <><path d="m8 5-6 7 6 7M16 5l6 7-6 7M14 3l-4 18" /></>,
  other: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" /><path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z" /></>,
};

export function TopicIcon({ topic }: { topic: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[topic] ?? paths.other}</svg>;
}
