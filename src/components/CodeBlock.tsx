import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneLight,
  a11yDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import csharp from "react-syntax-highlighter/dist/esm/languages/prism/csharp";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup";
import powershell from "react-syntax-highlighter/dist/esm/languages/prism/powershell";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";

SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("csharp", csharp);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("markup", markup);
SyntaxHighlighter.registerLanguage("html", markup);
SyntaxHighlighter.registerLanguage("powershell", powershell);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("typescript", typescript);

function useIsDark() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const checkIsDark = () => root.classList.contains("dark");

    setIsDark(checkIsDark());

    const observer = new MutationObserver(() => {
      setIsDark(checkIsDark());
    });

    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return isDark;
}

type CodeBlockProps = ComponentPropsWithoutRef<"code"> & {
  inline?: boolean;
};

export function CodeBlock({
  inline,
  className,
  children,
  ...props
}: CodeBlockProps) {
  const isDark = useIsDark();
  const [isCopied, setIsCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";

  const handleCopy = async () => {
    const text = String(children).replace(/\n$/, "");
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!inline && match) {
    return (
      <div className="relative group">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute right-2 top-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100",
            "bg-background/50 hover:bg-background/80 backdrop-blur-sm"
          )}
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
        <SyntaxHighlighter
          // @ts-expect-error - types mismatch for style prop
          style={isDark ? a11yDark : oneLight}
          language={language}
          PreTag="div"
          showLineNumbers={true}
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    );
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}
