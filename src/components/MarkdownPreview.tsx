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
        "prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none",
        "prose-headings:font-bold prose-a:text-primary",
        className
      )}
    >
      <Markdown>{content}</Markdown>
    </div>
  );
}
