"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Calendar, User, Share2 } from "lucide-react";
import { BLOG_POSTS } from "@/lib/mock-data";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = use(params);
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: "Lakshya Nutrition Research Lab" },
    datePublished: "2026-01-01",
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=1200",
  };

  return (
    <article style={{ background: "var(--bg-primary)", minHeight: "100dvh", paddingTop: "80px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* ── Pattern B: left-aligned article layout ── */}
      <div
        className="w-full px-6 py-16"
        style={{ maxWidth: "720px", marginLeft: "auto", marginRight: "auto" }}
      >
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold mb-12 hover:text-[var(--accent)] transition-colors"
          style={{ color: "var(--text-muted)" }}
        >
          <ArrowLeft size={15} strokeWidth={2} /> Back to Science Library
        </Link>

        {/* Header */}
        <header className="mb-12">
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-5"
            style={{ background: "rgba(127,232,90,0.08)", border: "1px solid rgba(127,232,90,0.15)", color: "var(--accent)" }}
          >
            {post.category}
          </span>

          <h1
            className="font-bold tracking-tight mb-6 leading-[1.05]"
            style={{ color: "var(--text-primary)", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            {post.title}
          </h1>

          <div
            className="flex flex-wrap items-center gap-6 py-6"
            style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", color: "var(--text-muted)" }}
          >
            {[
              { icon: User, label: "Lakshya Lab" },
              { icon: Calendar, label: "Jan 2026" },
              { icon: Clock, label: post.readTime },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                <Icon size={13} strokeWidth={1.5} style={{ color: "var(--accent)" }} />
                {label}
              </div>
            ))}
          </div>
        </header>

        {/* Content */}
        <div className="flex flex-col gap-10">
          <p
            className="text-lg leading-relaxed font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            {post.excerpt}
          </p>

          <div
            className="p-7 rounded-2xl"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <h3 className="text-base font-bold mb-4 flex items-center gap-3" style={{ color: "var(--text-primary)" }}>
              <BookOpen size={17} strokeWidth={1.5} style={{ color: "var(--accent)" }} />
              The Clinical Standard
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Our research team has analyzed over 50 contemporary peer-reviewed studies to synthesize the findings presented in this article. At Lakshya Nutrition, we believe that supplement science should be transparent, evidence-based, and performance-oriented.
            </p>
          </div>

          <div className="flex flex-col gap-6" style={{ color: "var(--text-primary)" }}>
            <h2 className="text-xl font-bold tracking-tight">Abstract</h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              The biological pathways involved in modern performance optimization require a multi-faceted approach. By targeting specific protein synthesis markers and metabolic regulators, athletes can achieve a higher tier of absolute biological efficiency.
            </p>

            <h2 className="text-xl font-bold tracking-tight mt-4">Key Findings</h2>
            <ul className="flex flex-col gap-3 pl-5" style={{ listStyleType: "disc", color: "var(--text-secondary)" }}>
              <li className="text-base leading-relaxed">Optimized amino acid ratios lead to a 14% increase in recovery speed.</li>
              <li className="text-base leading-relaxed">Clinical dosages of nitric oxide precursors correlate with significant vascular expansion.</li>
              <li className="text-base leading-relaxed">Consistency in micronutrient profiles stabilizes insulin sensitivity during heavy training blocks.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <footer
          className="mt-16 pt-8 flex items-center justify-between"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <button
            type="button"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--bg-secondary)]"
            style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
            aria-label="Share article"
          >
            <Share2 size={16} strokeWidth={1.5} />
          </button>
          <Link href="/products" className="btn btn-primary px-7 py-3 text-sm">
            Fuel Your Progress
          </Link>
        </footer>
      </div>
    </article>
  );
}
