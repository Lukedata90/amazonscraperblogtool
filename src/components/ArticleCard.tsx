import { type Article, formatDate } from "@/lib/mock-data";

type Props = {
  article: Article;
  featured?: boolean;
};

export default function ArticleCard({ article, featured = false }: Props) {
  if (featured) {
    return (
      <div
        className="hud-card featured-accent relative overflow-hidden cursor-pointer group"
        style={{ padding: "24px 28px 24px 32px" }}
      >
        {/* Featured tag */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="flex items-center gap-2 px-3 py-1"
            style={{
              background: "rgba(255,102,0,0.15)",
              border: "1px solid rgba(255,102,0,0.5)",
              fontSize: 9,
              letterSpacing: "0.15em",
              color: "#FF6600",
            }}
          >
            <div className="pulse-dot" style={{ width: 5, height: 5 }} />
            FEATURED
          </div>
          <span className="badge">{article.category}</span>
        </div>

        {/* Title */}
        <h2
          className="font-bold mb-4 leading-snug transition-colors group-hover:text-orange-400"
          style={{
            fontSize: 20,
            letterSpacing: "0.03em",
            color: "#fff",
            maxWidth: 680,
          }}
        >
          {article.title}
        </h2>

        {/* Summary */}
        <p
          className="mb-5 leading-relaxed"
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 12,
            maxWidth: 620,
          }}
        >
          {article.summary}
        </p>

        {/* Footer */}
        <div className="flex items-center gap-4 flex-wrap">
          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 10 }}>
            {formatDate(article.publishedAt)}
          </span>
          <span
            style={{
              color: "rgba(255,102,0,0.6)",
              fontSize: 10,
              letterSpacing: "0.08em",
            }}
          >
            ◆ {article.source.toUpperCase()}
          </span>
          <div className="flex gap-2 flex-wrap">
            {article.tags.map((tag) => (
              <span key={tag} className="badge-white">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Corner accent */}
        <div
          className="absolute top-3 right-4"
          style={{ color: "rgba(255,102,0,0.2)", fontSize: 11, letterSpacing: "0.05em" }}
        >
          ID:{article.id.padStart(4, "0")}
        </div>

        {/* Bottom scan line on hover */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: "linear-gradient(90deg, transparent, #FF6600, transparent)" }}
        />
      </div>
    );
  }

  return (
    <div
      className="hud-card relative overflow-hidden cursor-pointer group flex flex-col"
      style={{ padding: "18px 20px" }}
    >
      {/* Category + date */}
      <div className="flex items-center justify-between mb-3">
        <span className="badge">{article.category}</span>
        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 9 }}>
          {formatDate(article.publishedAt).split("—")[0].trim()}
        </span>
      </div>

      {/* Title */}
      <h3
        className="font-bold mb-3 leading-snug flex-1 transition-colors group-hover:text-orange-400"
        style={{ fontSize: 13, color: "#fff", letterSpacing: "0.02em" }}
      >
        {article.title}
      </h3>

      {/* Summary */}
      <p
        className="mb-4 leading-relaxed"
        style={{
          color: "rgba(255,255,255,0.4)",
          fontSize: 11,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {article.summary}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto">
        <span
          style={{ color: "rgba(255,102,0,0.5)", fontSize: 9, letterSpacing: "0.08em" }}
        >
          ◆ {article.source.toUpperCase()}
        </span>
        <div className="flex gap-1 flex-wrap justify-end">
          {article.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="badge-white">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ID watermark */}
      <div
        className="absolute top-3 right-4 opacity-20"
        style={{ color: "#FF6600", fontSize: 9 }}
      >
        #{article.id}
      </div>

      {/* Bottom accent on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: "linear-gradient(90deg, transparent, #FF6600, transparent)" }}
      />
    </div>
  );
}
