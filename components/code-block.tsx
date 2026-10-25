"use client";

import { useState, type ReactNode } from "react";

function textContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textContent).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textContent((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

export function CodeBlock({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const code = textContent(children).replace(/\n$/, "");
  const codeChild = children as React.ReactElement<{ className?: string }>;
  const language = codeChild?.props?.className?.match(/language-([\w-]+)/)?.[1];

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 1800);
    } catch {
      setCopyStatus("failed");
      window.setTimeout(() => setCopyStatus("idle"), 2400);
    }
  }

  return (
    <div className="code-frame">
      <div className="code-toolbar">
        <span>{language ?? "code"}</span>
        <button className="copy-button" onClick={copyCode} type="button" aria-label="Copy code snippet" aria-live="polite">
          {copyStatus === "copied" ? "Copied" : copyStatus === "failed" ? "Copy failed" : "Copy"}
        </button>
      </div>
      <pre {...props}>{children}</pre>
    </div>
  );
}
