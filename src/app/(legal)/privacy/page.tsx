import Link from "next/link";
import { ShieldCheck, FileText, Lock, Globe } from "lucide-react";

export default function PrivacyPage() {
  const lastUpdated = "April 7, 2026";

  return (
    <div style={{ background: "var(--bg-primary)", paddingTop: "80px" }}>

      {/* ── Header — Pattern A ── */}
      <section className="py-20 text-center" style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
        <div
          className="w-full px-6 flex flex-col items-center text-center"
          style={{ maxWidth: "672px", marginLeft: "auto", marginRight: "auto" }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
            style={{ background: "rgba(127,232,90,0.08)", border: "1px solid rgba(127,232,90,0.15)" }}
          >
            <ShieldCheck size={26} strokeWidth={1.5} style={{ color: "var(--accent)" }} />
          </div>
          <h1 className="font-bold tracking-tight mb-3 text-center" style={{ color: "var(--text-primary)" }}>
            Privacy Policy
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* ── Content — Pattern B (left-aligned prose) ── */}
      <section className="py-20">
        <div
          className="w-full px-6"
          style={{ maxWidth: "672px", marginLeft: "auto", marginRight: "auto" }}
        >
          <div className="flex flex-col gap-12" style={{ color: "var(--text-secondary)" }}>

            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold flex items-center gap-3" style={{ color: "var(--text-primary)" }}>
                <Globe size={20} strokeWidth={1.5} style={{ color: "var(--accent)" }} />
                1. Data Collection
              </h2>
              <p className="text-base leading-relaxed">
                At Lakshya Nutrition, we collect only the essential information required to deliver your orders and improve your athletic performance. This includes your name, email address, mobile number, and shipping details provided during the secure checkout process.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold flex items-center gap-3" style={{ color: "var(--text-primary)" }}>
                <Lock size={20} strokeWidth={1.5} style={{ color: "var(--accent)" }} />
                2. Security Protocols
              </h2>
              <p className="text-base leading-relaxed">
                Your personal and payment data is encrypted using industry-standard SSL technology. We do not store sensitive payment credentials on our servers — all transactions are processed through our secure, certified payment gateway (Razorpay).
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold flex items-center gap-3" style={{ color: "var(--text-primary)" }}>
                <FileText size={20} strokeWidth={1.5} style={{ color: "var(--accent)" }} />
                3. Usage &amp; Sharing
              </h2>
              <p className="text-base leading-relaxed">
                We strictly do not sell, trade, or rent your personal information to third parties. Your data is used exclusively for order fulfillment, customer support, and (if opted-in) delivering science-backed performance insights via our newsletter.
              </p>
            </div>

            <div
              className="p-8 rounded-2xl text-center"
              style={{ background: "rgba(127,232,90,0.05)", border: "1px solid rgba(127,232,90,0.12)" }}
            >
              <h3 className="font-bold mb-3 text-center" style={{ color: "var(--text-primary)" }}>
                Questions regarding your data?
              </h3>
              <p className="text-sm mb-5 text-center" style={{ color: "var(--text-secondary)" }}>
                Contact our Data Protection Officer at privacy@lakshyanutrition.in
              </p>
              <Link
                href="/contact"
                className="text-sm font-bold uppercase tracking-widest hover:underline"
                style={{ color: "var(--accent)" }}
              >
                Contact Support →
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
