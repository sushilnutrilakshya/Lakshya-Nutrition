import Link from "next/link";
import { ShieldAlert, Gavel, Scale, HeartPulse } from "lucide-react";

export default function TermsPage() {
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
            <Gavel size={26} strokeWidth={1.5} style={{ color: "var(--accent)" }} />
          </div>
          <h1 className="font-bold tracking-tight mb-3 text-center" style={{ color: "var(--text-primary)" }}>
            Terms of Service
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
                <Scale size={20} strokeWidth={1.5} style={{ color: "var(--accent)" }} />
                1. Operational Scope
              </h2>
              <p className="text-base leading-relaxed">
                By accessing this platform and purchasing Lakshya Nutrition products, you agree to abide by these terms. We provide premium athletic supplements and science-backed information. We reserve the right to limit quantities and refuse service to any user.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold flex items-center gap-3" style={{ color: "var(--text-primary)" }}>
                <HeartPulse size={20} strokeWidth={1.5} style={{ color: "var(--accent)" }} />
                2. Health Disclaimer
              </h2>
              <p className="text-base leading-relaxed">
                Lakshya Nutrition products are designed for healthy athletes. Consult with a qualified healthcare professional before beginning any supplementation protocol. Our products are not intended to diagnose, treat, cure, or prevent any disease. Results vary by individual and adherence to a strict training and nutrition regimen.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold flex items-center gap-3" style={{ color: "var(--text-primary)" }}>
                <ShieldAlert size={20} strokeWidth={1.5} style={{ color: "var(--accent)" }} />
                3. Intellectual Property
              </h2>
              <p className="text-base leading-relaxed">
                All formulations, branding, and scientific content are the exclusive intellectual property of Lakshya Nutrition. Unauthorized reproduction or use of our trademarked properties is strictly prohibited under Indian Law.
              </p>
            </div>

            <div
              className="p-8 rounded-2xl"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
            >
              <h3 className="font-bold mb-3" style={{ color: "var(--text-primary)" }}>
                Elite Standard Guarantees
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                We maintain the highest quality standards in the industry. For returns and exchanges, please refer to our{" "}
                <Link href="#" className="font-semibold hover:underline" style={{ color: "var(--accent)" }}>
                  Returns Policy
                </Link>.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
