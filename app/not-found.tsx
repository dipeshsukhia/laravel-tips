import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><span>404</span><h1>This tip wandered off.</h1><p>It may have moved to a new category.</p><Link href="/">Back to all Laravel tips →</Link></main>;
}
