import Link from "next/link";
import { Shield, Target, Users, Zap, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div style={{ background: "var(--bg-primary)", paddingTop: "80px" }}>

      {/* ── Hero — Pattern A (centered) ── */}
      <section
        className="relative overflow-hidden py-24"
        style={{ background: "linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)" }}
      >
        {/* Grid texture */}
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
            Since 2024
          </span>
          <h1 className="font-bold tracking-tight mb-6 text-center" style={{ color: "var(--text-primary)" }}>
            Our Mission.
          </h1>
          <p
            className="text-lg md:text-xl leading-relaxed font-medium text-center"
            style={{ color: "var(--text-secondary)", maxWidth: "640px" }}
          >
            To engineer the most scientifically advanced supplements for the Indian athlete who refuses to compromise on quality or results.
          </p>
        </div>
      </section>

      {/* ── Story Content ── */}
      <section className="py-24">
        <div
          className="w-full px-6 md:px-12 flex flex-col gap-20"
          style={{ maxWidth: "1152px", marginLeft: "auto", marginRight: "auto" }}
        >
          {/* Mission block — Pattern A */}
          <div
            className="flex flex-col items-center text-center gap-5"
            style={{ maxWidth: "720px", marginLeft: "auto", marginRight: "auto" }}
          >
            <h2 className="font-bold tracking-tight text-center" style={{ color: "var(--text-primary)" }}>
              No Proprietary Blends.
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              We founded Lakshya Nutrition because we were tired of the &quot;prop-blend&quot; era. You deserve to know exactly what is going into your body — down to the milligram.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Every batch of our formula is lab-tested and FSSAI-certified, ensuring that what&apos;s on the label is exactly what&apos;s in the tub.
            </p>
          </div>

          {/* Core Values Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Shield, title: "Absolute Purity", desc: "No fillers, no banned substances, only premium ingredients sourced globally." },
              { icon: Target, title: "Scientific Precision", desc: "Formulations based on contemporary clinical research, not marketing hype." },
              { icon: Users, title: "Athlete Focused", desc: "Driven by the needs of 50,000+ elite performers across India." },
              { icon: Zap, title: "Maximum Results", desc: "Optimal absorption rates for peak performance and recovery." },
            ].map((value, i) => (
              <div
                key={i}
                className="luxury-card p-8 rounded-2xl flex flex-col items-center text-center gap-5"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(127,232,90,0.08)", border: "1px solid rgba(127,232,90,0.15)" }}
                >
                  <value.icon size={26} strokeWidth={1.5} style={{ color: "var(--accent)" }} />
                </div>
                <h3 className="font-bold text-base tracking-tight text-center" style={{ color: "var(--text-primary)" }}>
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-center" style={{ color: "var(--text-secondary)" }}>
                  {value.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA — Pattern A */}
          <div className="flex flex-col items-center text-center gap-6">
            <h2 className="font-bold tracking-tight text-center" style={{ color: "var(--text-primary)" }}>
              Join the Elite.
            </h2>
            <Link
              href="/products"
              className="btn btn-primary px-10 py-4 font-bold rounded-full flex items-center gap-3"
            >
              Explore Our Series <ArrowRight size={18} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
