import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, FlaskConical } from "lucide-react";
import { getBlogPosts } from "@/lib/data";

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Lakshya Nutrition Science Library",
    description: "Evidence-based insights into performance, recovery, and absolute biological optimization.",
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      author: { "@type": "Organization", name: "Lakshya Nutrition Research Lab" },
    })),
  };

  return (
    <div style={{ background: "var(--bg-primary)", paddingTop: "80px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }} />

      {/* ── Hero — Pattern A ── */}
      <section
        className="relative overflow-hidden py-24"
        style={{ background: "linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            opacity: 0.5,
          }}
        />
        <div
          className="relative z-10 w-full px-6 md:px-12 flex flex-col items-center text-center"
          style={{ maxWidth: "1152px", marginLeft: "auto", marginRight: "auto" }}
        >
          <span
            className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] mb-6"
            style={{ background: "rgba(127,232,90,0.1)", border: "1px solid rgba(127,232,90,0.2)", color: "var(--accent)" }}
          >
            Science Library
          </span>
          <h1 className="font-bold tracking-tight mb-6 text-center" style={{ color: "var(--text-primary)" }}>
            Nutrition Science.
          </h1>
          <p
            className="text-lg md:text-xl leading-relaxed text-center"
            style={{ color: "var(--text-secondary)", maxWidth: "600px" }}
          >
            Evidence-based insights into performance, recovery, and absolute biological optimization.
          </p>
        </div>
      </section>

      {/* ── Blog Grid ── */}
      <section className="py-20">
        <div
          className="w-full px-6 md:px-12"
          style={{ maxWidth: "1152px", marginLeft: "auto", marginRight: "auto" }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="luxury-card group flex flex-col gap-6 p-0 rounded-2xl overflow-hidden"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                {/* Thumbnail — real image, Protocol B */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)" }}
                  />
                  <span
                    className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: "rgba(127,232,90,0.9)", color: "#000" }}
                  >
                    {post.category}
                  </span>
                </div>

                <div className="flex flex-col gap-4 p-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                      {post.readTime} read
                    </span>
                  </div>

                  <div className="flex-1">
                    <h2
                      className="text-lg font-bold mb-2 tracking-tight group-hover:text-[var(--accent)] transition-colors"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {post.title}
                    </h2>
                    <p className="line-clamp-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(127,232,90,0.08)", border: "1px solid var(--border)" }}
                    >
                      <BookOpen size={14} strokeWidth={1.5} style={{ color: "var(--accent)" }} />
                    </div>
                    <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                      Read Full Article
                    </span>
                    <ArrowRight
                      size={14}
                      strokeWidth={2}
                      className="ml-auto group-hover:translate-x-1 transition-transform"
                      style={{ color: "var(--accent)" }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <button className="btn btn-outline px-10 py-3.5 text-sm font-bold rounded-full">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA — Pattern A ── */}
      <section className="py-24" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border)" }}>
        <div
          className="w-full px-6 flex flex-col items-center text-center gap-6"
          style={{ maxWidth: "560px", marginLeft: "auto", marginRight: "auto" }}
        >
          <FlaskConical size={48} strokeWidth={1} style={{ color: "var(--accent)", opacity: 0.3 }} />
          <h2 className="font-bold tracking-tight text-center" style={{ color: "var(--text-primary)" }}>
            Join the Lab.
          </h2>
          <p className="text-base leading-relaxed text-center" style={{ color: "var(--text-secondary)" }}>
            The most advanced performance optimization tips, straight to your inbox monthly.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 w-full">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-5 py-3.5 rounded-xl text-sm"
              style={{
                background: "var(--bg-primary)",
                border: "1.5px solid var(--border-strong)",
                color: "var(--text-primary)",
                outline: "none",
              }}
            />
            <button type="submit" className="btn btn-primary px-7 py-3.5 text-sm font-bold rounded-xl whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
