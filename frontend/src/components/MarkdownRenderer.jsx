import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

/**
 * Renders GitHub README markdown and makes image paths work.
 * - Rewrites relative image paths to raw.githubusercontent.com
 * - Rewrites GitHub blob/raw links to raw.githubusercontent.com
 */
export default function MarkdownRenderer({
  children,           // the markdown string
  repo,               // e.g. "SushenGrover/P2P-Vault"
  branch = "main",    // "main" or "master"
}) {
  const toRawUrl = (src) => {
    if (!src) return src;

    // Absolute URL cases first
    if (/^https?:\/\//i.test(src)) {
      if (src.includes("github.com/") && src.includes("/blob/")) {
        return src
          .replace("github.com/", "raw.githubusercontent.com/")
          .replace("/blob/", "/");
      }
      if (src.includes("github.com/") && src.includes("/raw/")) {
        return src
          .replace("github.com/", "raw.githubusercontent.com/")
          .replace("/raw/", "/");
      }
      return src;
    }

    // Relative path
    const clean = src.replace(/^\.?\//, "").replace(/^\/+/, "");
    return `https://raw.githubusercontent.com/${repo}/${branch}/${clean}`;
  };

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ inline, className, children: codeChildren, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={dracula}
              PreTag="div"
              language={match[1]}
              {...props}
            >
              {String(codeChildren).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {codeChildren}
            </code>
          );
        },

        p({ children, ...props }) {
          return (
            <p style={{ marginBottom: "0.5rem", whiteSpace: "pre-line" }} {...props}>
              {children}
            </p>
          );
        },

        img({ src, alt, ...props }) {
          const fixed = toRawUrl(src);
          return (
            <img
              src={fixed}
              alt={alt || ""}
              style={{ maxWidth: "100%", borderRadius: 8, margin: "10px 0" }}
              {...props}
            />
          );
        },

        a({ href, children, ...props }) {
          let fixed = href;
          if (href && href.includes("github.com/") && href.includes("/blob/")) {
            fixed = href
              .replace("github.com/", "raw.githubusercontent.com/")
              .replace("/blob/", "/");
          }
          if (href && href.includes("github.com/") && href.includes("/raw/")) {
            fixed = href
              .replace("github.com/", "raw.githubusercontent.com/")
              .replace("/raw/", "/");
          }
          return (
            <a href={fixed} target="_blank" rel="noreferrer" {...props}>
              {children}
            </a>
          );
        },
      }}
    >
      {children}
    </Markdown>
  );
}
