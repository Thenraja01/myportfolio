import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { CodeBlock } from "./CodeBlock";
import { BookOpen, ExternalLink } from "lucide-react";

export function ProjectReadme({ content, htmlUrl }) {
  if (!content) {
    return (
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 bg-slate-900/40 text-center space-y-4">
        <div className="p-3 rounded-2xl bg-slate-800/80 text-slate-400 inline-block">
          <BookOpen size={24} />
        </div>
        <h3 className="text-lg font-bold text-slate-200 font-mono">
          README Unavailable
        </h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          This project does not currently have a README.md on GitHub or it could not be fetched.
        </p>

        {htmlUrl && (
          <a
            href={htmlUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-semibold text-indigo-400 hover:text-indigo-300 hover:border-indigo-500/40 transition-all"
          >
            <span>View Repository on GitHub</span>
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800/90 bg-slate-950/70 backdrop-blur-xl shadow-2xl space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5 font-mono text-xs sm:text-sm font-bold text-indigo-400 uppercase tracking-wider">
          <BookOpen size={18} />
          <span>PROJECT DOCUMENTATION (README.md)</span>
        </div>

        {htmlUrl && (
          <a
            href={htmlUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-indigo-300 transition-colors"
          >
            <span>View Source</span>
            <ExternalLink size={12} />
          </a>
        )}
      </div>

      {/* Markdown Content */}
      <div className="prose prose-invert max-w-none space-y-4">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSanitize]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono tracking-tight border-b border-slate-800 pb-3 mt-8 mb-4">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl sm:text-2xl font-bold text-indigo-300 font-mono tracking-tight border-b border-slate-800/60 pb-2 mt-8 mb-4">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-bold text-slate-200 font-mono tracking-tight mt-6 mb-3">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-base font-semibold text-slate-300 font-mono mt-4 mb-2">
                {children}
              </h4>
            ),
            p: ({ children }) => (
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans my-3">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm sm:text-base my-4 pl-2 font-sans">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm sm:text-base my-4 pl-2 font-sans">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-slate-300 text-sm sm:text-base leading-relaxed inline-block w-full">
                {children}
              </li>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-indigo-500 bg-slate-900/60 px-5 py-3 rounded-r-2xl my-6 text-slate-300 text-sm italic">
                {children}
              </blockquote>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto my-6 border border-slate-800 rounded-2xl shadow-xl">
                <table className="min-w-full divide-y divide-slate-800 text-sm font-sans">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-slate-900/90 font-mono text-xs uppercase text-indigo-300">
                {children}
              </thead>
            ),
            th: ({ children }) => (
              <th className="px-4 py-3 text-left font-bold tracking-wider">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-4 py-3 text-slate-300 border-t border-slate-800/60">
                {children}
              </td>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 font-medium transition-colors"
              >
                {children}
              </a>
            ),
            img: ({ src, alt }) => (
              <img
                src={src}
                alt={alt || "README diagram or screenshot"}
                className="max-w-full h-auto rounded-2xl border border-slate-800 shadow-2xl my-6 inline-block"
              />
            ),
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const codeString = String(children).replace(/\n$/, "");

              if (!inline && match) {
                return <CodeBlock language={match[1]} code={codeString} />;
              }

              if (!inline && codeString.includes("\n")) {
                return <CodeBlock language="" code={codeString} />;
              }

              return (
                <code
                  className="px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-indigo-300 font-medium"
                  {...props}
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
