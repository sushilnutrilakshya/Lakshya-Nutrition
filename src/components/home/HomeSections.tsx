"use client";

import { ArrowRight, Quote, Star, FlaskConical, ShieldCheck, Microscope } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/commerce/ProductCard";
import { TabbedServices } from "@/components/animations/TabbedServices";
import { BrandMarquee } from "@/components/animations/Marquee";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import type { Product } from "@/types/product";

// ── Types ────────────────────────────────────────────────────────

interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  rating: number;
  text: string;
  avatar: string;
  product: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  imageUrl: string;
}

interface HomeSectionsProps {
  products: Product[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
}

// ── Shared Section Header (Pattern A — centered) ─────────────────

function SectionHeader({
  eyebrow,
  heading,
  sub,
  cta,
}: {
  eyebrow: string;
  heading: string;
  sub?: string;
  cta?: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-col items-center text-center gap-4 mb-14 gsap-reveal"
      style={{ maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}
    >
      <span
        className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em]"
        style={{
          background: "rgba(127,232,90,0.1)",
          border: "1px solid rgba(127,232,90,0.2)",
          color: "var(--accent)",
        }}
      >
        {eyebrow}
      </span>
      <h2 className="font-bold tracking-tight text-center" style={{ color: "var(--text-primary)" }}>
        {heading}
      </h2>
      {sub && (
        <p
          className="text-base leading-relaxed text-center"
          style={{ color: "var(--text-secondary)", maxWidth: "480px" }}
        >
          {sub}
        </p>
      )}
      {cta}
    </div>
  );
}

// ── Featured Stacks ───────────────────────────────────────────────

interface StackCardProps {
  title: string;
  badge: string;
  desc: string;
  price: string;
  borderColor: string;
}

function StackCard({ title, badge, desc, price, borderColor }: StackCardProps) {
  return (
    <div
      className="luxury-card group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col gsap-reveal"
      style={{ border: `2px solid ${borderColor}`, background: "var(--surface)" }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${borderColor}18 0%, transparent 70%)` }}
      />
      <div className="relative z-10 p-6 flex flex-col gap-4 flex-1">
        <span
          className="self-start px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
          style={{ background: `${borderColor}18`, color: borderColor, border: `1px solid ${borderColor}30` }}
        >
          {badge}
        </span>
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2 tracking-tight" style={{ color: "var(--text-primary)" }}>
            {title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {desc}
          </p>
        </div>
        <div
          className="flex justify-between items-center pt-4"
          style={{ borderTop: `1px solid ${borderColor}20` }}
        >
          <span className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{price}</span>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold transition-transform group-hover:scale-110"
            style={{ background: `${borderColor}18`, color: borderColor }}
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedStacks() {
  const ref = useScrollReveal<HTMLDivElement>({ stagger: 0.12, y: 36 });
  return (
    <section className="w-full py-24" style={{ background: "var(--bg-secondary)" }}>
      <div
        ref={ref}
        className="w-full px-6 md:px-12"
        style={{ maxWidth: "1152px", marginLeft: "auto", marginRight: "auto" }}
      >
        <SectionHeader
          eyebrow="Goal-Based Bundles"
          heading="Featured Stacks"
          sub="Curated supplement bundles engineered for your specific performance goals."
        />
        <div className="grid md:grid-cols-3 gap-6">
          <StackCard title="Muscle Mass" badge="Best Seller" desc="Whey Isolate + Creatine + Glutamine for maximum hypertrophy." price="₹3,999" borderColor="var(--accent)" />
          <StackCard title="Endurance Pro" badge="Athlete Choice" desc="Pre-Workout + BCAAs + Electrolytes for sustained performance." price="₹2,499" borderColor="#48c4dd" />
          <StackCard title="Daily Health" badge="Wellness" desc="Multivitamin + Omega 3 + Probiotics for everyday vitality." price="₹1,899" borderColor="#dd48c4" />
        </div>
      </div>
    </section>
  );
}

// ── Featured Products ─────────────────────────────────────────────

function FeaturedProducts({ products }: { products: Product[] }) {
  const featured = products.slice(0, 4);
  const ref = useScrollReveal<HTMLDivElement>({ stagger: 0.1, y: 32 });
  return (
    <section className="w-full py-24" style={{ background: "var(--bg-primary)" }}>
      <div
        ref={ref}
        className="w-full px-6 md:px-12"
        style={{ maxWidth: "1152px", marginLeft: "auto", marginRight: "auto" }}
      >
        <SectionHeader
          eyebrow="Community Favourites"
          heading="Best Sellers"
          sub="Trusted by thousands of Indian athletes. Lab-tested, no fillers, just results."
          cta={
            <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--accent)" }}>
              View Full Catalog <ArrowRight size={14} strokeWidth={2} />
            </Link>
          }
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 2} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Performance Metrics ───────────────────────────────────────────

function PerformanceMetrics() {
  const ref = useScrollReveal<HTMLDivElement>({ stagger: 0.08, y: 24, start: "top 90%" });
  const stats = [
    { label: "Elite Athletes", value: "50k+", sub: "Verified Users" },
    { label: "Purity Grade", value: "100%", sub: "Lab Certified" },
    { label: "Proprietary Blends", value: "0%", sub: "Full Disclosure" },
    { label: "Dispatch Time", value: "24h", sub: "India-Wide" },
  ];
  return (
    <section
      className="w-full py-20"
      style={{ background: "var(--bg-primary)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
    >
      <div
        ref={ref}
        className="w-full px-6 md:px-12"
        style={{ maxWidth: "896px", marginLeft: "auto", marginRight: "auto" }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-2 gsap-reveal">
              <div
                className="text-4xl md:text-5xl font-bold tracking-tighter"
                style={{ color: "var(--text-primary)" }}
              >
                {s.value}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
                {s.label}
              </div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────

function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const ref = useScrollReveal<HTMLDivElement>({ stagger: 0.12, y: 36 });
  return (
    <section className="w-full py-24" style={{ background: "var(--bg-secondary)" }}>
      <div
        ref={ref}
        className="w-full px-6 md:px-12"
        style={{ maxWidth: "1152px", marginLeft: "auto", marginRight: "auto" }}
      >
        <SectionHeader eyebrow="Social Proof" heading="Real Athletes. Real Results." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t) => (
            <div
              key={t.id}
              className="luxury-card rounded-2xl p-6 flex flex-col gap-4 gsap-reveal"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <Quote size={22} strokeWidth={1.5} style={{ color: "var(--accent)", opacity: 0.5 }} />
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={12} fill="var(--accent-gold)" stroke="none" />
                ))}
              </div>
              <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: "var(--accent)", color: "#000" }}
                >
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate" style={{ color: "var(--text-primary)" }}>{t.name}</div>
                  <div className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{t.role} · {t.city}</div>
                </div>
                <span
                  className="text-[10px] px-2 py-1 rounded-full flex-shrink-0"
                  style={{ background: "rgba(127,232,90,0.1)", color: "var(--accent)" }}
                >
                  {t.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Clinical Standards ────────────────────────────────────────────

function ClinicalStandardsSection() {
  const ref = useScrollReveal<HTMLDivElement>({ stagger: 0.14, y: 40 });
  const protocol = [
    {
      title: "Bio-Availability Matrix",
      desc: "Every batch is cold-processed to preserve bioactive protein fractions and ensure >90% absorption efficiency.",
      icon: <FlaskConical size={26} strokeWidth={1.5} style={{ color: "var(--accent)" }} />,
      status: "Lab Verified",
    },
    {
      title: "Clean Label Certification",
      desc: "Absolute disclosure of every milligram. Zero proprietary blends. Zero hidden fillers. 100% Transparency.",
      icon: <ShieldCheck size={26} strokeWidth={1.5} style={{ color: "var(--accent)" }} />,
      status: "FSSAI / GMP",
    },
    {
      title: "Heavy Metal Screening",
      desc: "Rigorous third-party testing for mercury, lead, and arsenic to ensure safety across all elite product lines.",
      icon: <Microscope size={26} strokeWidth={1.5} style={{ color: "var(--accent)" }} />,
      status: "Safety Passed",
    },
  ];
  return (
    <section className="w-full py-24" style={{ background: "var(--bg-primary)" }}>
      <div
        ref={ref}
        className="w-full px-6 md:px-12"
        style={{ maxWidth: "1152px", marginLeft: "auto", marginRight: "auto" }}
      >
        <SectionHeader
          eyebrow="The Gold Standard"
          heading="Clinical Protocols."
          sub="We don't just sell supplements — we engineer performance through rigorous scientific verification."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {protocol.map((step, i) => (
            <div
              key={i}
              className="luxury-card group p-8 rounded-2xl flex flex-col items-center text-center gap-5 gsap-reveal"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                style={{ background: "rgba(127,232,90,0.08)", border: "1px solid rgba(127,232,90,0.15)" }}
              >
                {step.icon}
              </div>
              <div>
                <h3 className="font-bold text-base mb-2 tracking-tight text-center" style={{ color: "var(--text-primary)" }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-center" style={{ color: "var(--text-secondary)" }}>
                  {step.desc}
                </p>
              </div>
              <span
                className="mt-auto px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest"
                style={{ background: "rgba(127,232,90,0.1)", color: "var(--accent)" }}
              >
                {step.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Blog Section ──────────────────────────────────────────────────

function BlogSection({ blogPosts }: { blogPosts: BlogPost[] }) {
  const ref = useScrollReveal<HTMLDivElement>({ stagger: 0.12, y: 32 });
  return (
    <section className="w-full py-24" style={{ background: "var(--bg-secondary)" }}>
      <div
        ref={ref}
        className="w-full px-6 md:px-12"
        style={{ maxWidth: "1152px", marginLeft: "auto", marginRight: "auto" }}
      >
        <SectionHeader
          eyebrow="Learn"
          heading="Nutrition Science"
          cta={
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--accent)" }}>
              Read All Articles <ArrowRight size={14} strokeWidth={2} />
            </Link>
          }
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="luxury-card group rounded-2xl overflow-hidden block gsap-reveal"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              {/* Blog thumbnail — real image via Protocol B */}
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Dark overlay for text legibility */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }}
                />
                {/* Category badge over image */}
                <span
                  className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: "rgba(127,232,90,0.9)", color: "#000" }}
                >
                  {post.category}
                </span>
              </div>
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>{post.readTime} read</span>
                </div>
                <h3
                  className="font-bold text-sm leading-snug group-hover:text-[var(--accent)] transition-colors"
                  style={{ color: "var(--text-primary)" }}
                >
                  {post.title}
                </h3>
                <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--text-muted)" }}>
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-1.5" style={{ color: "var(--accent)" }}>
                  <span className="text-xs font-semibold">Read Article</span>
                  <ArrowRight size={12} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA Section ───────────────────────────────────────────────────

function CTASection() {
  const ref = useScrollReveal<HTMLDivElement>({ stagger: 0.1, y: 28, start: "top 90%" });
  return (
    <section className="w-full py-24 relative overflow-hidden" style={{ background: "var(--accent)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 70%)" }}
      />
      <div
        ref={ref}
        className="relative z-10 w-full px-6 flex flex-col items-center text-center gap-6"
        style={{ maxWidth: "672px", marginLeft: "auto", marginRight: "auto" }}
      >
        <span
          className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] gsap-reveal"
          style={{ background: "rgba(0,0,0,0.12)", color: "rgba(0,0,0,0.65)" }}
        >
          Join 50,000+ Athletes
        </span>
        <h2 className="font-bold tracking-tight text-center gsap-reveal" style={{ color: "#000" }}>
          Ready to Achieve Your Goal?
        </h2>
        <p
          className="text-base leading-relaxed text-center gsap-reveal"
          style={{ color: "rgba(0,0,0,0.65)", maxWidth: "420px" }}
        >
          Premium sports nutrition engineered for peak performance. Lab-tested, FSSAI certified, and trusted by India&apos;s best athletes.
        </p>
        <div className="flex flex-wrap gap-4 justify-center gsap-reveal">
          <Link href="/products" className="btn px-9 py-3.5 text-sm font-bold rounded-full" style={{ background: "#000", color: "var(--accent)" }}>
            Shop All Products
          </Link>
          <Link href="/products?category=stacks" className="btn px-9 py-3.5 text-sm font-bold rounded-full" style={{ background: "rgba(0,0,0,0.12)", color: "#000", border: "1.5px solid rgba(0,0,0,0.15)" }}>
            Find Your Stack →
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Main export ───────────────────────────────────────────────────

export function HomeSections({ products, testimonials, blogPosts }: HomeSectionsProps) {
  return (
    <>
      <FeaturedStacks />
      <TabbedServices />
      <FeaturedProducts products={products} />
      <PerformanceMetrics />
      <BrandMarquee />
      <TestimonialsSection testimonials={testimonials} />
      <ClinicalStandardsSection />
      <BlogSection blogPosts={blogPosts} />
      <CTASection />
    </>
  );
}
