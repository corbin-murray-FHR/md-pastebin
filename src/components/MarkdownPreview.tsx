import Markdown from "react-markdown";
import { cn } from "@/lib/utils";

interface MarkdownPreviewProps {
  content: string;
  className?: string;
}

export function MarkdownPreview({ content, className }: MarkdownPreviewProps) {
  return (
    <div
      className={cn(
        "prose prose-slate dark:prose-invert max-w-none text-left",
        // Base text styling
        "prose-base md:prose-lg",
        // Headings - clear hierarchy
        "prose-headings:font-bold prose-headings:tracking-tight",
        "prose-h1:text-4xl prose-h1:mb-4 prose-h1:mt-8 prose-h1:border-b prose-h1:pb-2",
        "prose-h2:text-3xl prose-h2:mb-3 prose-h2:mt-8 prose-h2:border-b prose-h2:pb-2",
        "prose-h3:text-2xl prose-h3:mb-2 prose-h3:mt-6",
        "prose-h4:text-xl prose-h4:mb-2 prose-h4:mt-4",
        "prose-h5:text-lg prose-h5:mb-2 prose-h5:mt-4",
        "prose-h6:text-base prose-h6:mb-2 prose-h6:mt-4 prose-h6:font-semibold",
        // Paragraphs
        "prose-p:leading-relaxed prose-p:mb-4",
        // Links
        "prose-a:text-primary prose-a:no-underline prose-a:font-medium hover:prose-a:underline",
        // Lists
        "prose-ul:my-4 prose-ol:my-4",
        "prose-li:my-1",
        // Code
        "prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm",
        "prose-code:before:content-none prose-code:after:content-none",
        "prose-pre:bg-muted prose-pre:border prose-pre:rounded-lg prose-pre:p-4",
        // Blockquotes
        "prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic",
        "prose-blockquote:bg-muted/30 prose-blockquote:py-2 prose-blockquote:my-4",
        // Tables
        "prose-table:border-collapse prose-table:w-full",
        "prose-th:border prose-th:p-2 prose-th:bg-muted prose-th:font-semibold",
        "prose-td:border prose-td:p-2",
        // Images
        "prose-img:rounded-lg prose-img:shadow-md",
        // HR
        "prose-hr:my-8 prose-hr:border-border",
        // Strong/Em
        "prose-strong:font-bold prose-strong:text-foreground",
        "prose-em:italic",
        className
      )}
    >
      <Markdown>{content}</Markdown>
    </div>
  );
}
