import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

function textOf(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(textOf).join("");
  if (children && typeof children === "object" && "props" in children) {
    return textOf((children as { props: { children?: React.ReactNode } }).props.children);
  }
  return "";
}

const components: Components = {
  a: ({ href = "", children, ...rest }) => {
    const external = /^https?:\/\//.test(href);
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener" {...rest}>
          {children}
        </a>
      );
    }
    if (href.startsWith("/")) {
      return <Link href={href}>{children}</Link>;
    }
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  },
  img: ({ src, alt }) => (
    // Images d'articles (Drive, externes) : balise simple, chargement différé.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={typeof src === "string" ? src : undefined} alt={alt ?? ""} loading="lazy" />
  ),
  em: ({ children }) => {
    // Les mentions « [À compléter : …] » sont mises en évidence pour les relecteurs.
    const t = textOf(children);
    if (/^\[À compléter/i.test(t)) {
      return (
        <em>
          <span className="todo">{children}</span>
        </em>
      );
    }
    return <em>{children}</em>;
  },
  table: ({ children }) => (
    <div style={{ overflowX: "auto" }}>
      <table>{children}</table>
    </div>
  ),
};

/** Rendu Markdown (GFM : tableaux, listes de tâches, liens automatiques). */
export default function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
}
