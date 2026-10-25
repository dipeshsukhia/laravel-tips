import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/components/code-block";

export function MarkdownContent({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug, rehypeHighlight]}
      components={{ pre: CodeBlock }}
    >
      {children}
    </ReactMarkdown>
  );
}
