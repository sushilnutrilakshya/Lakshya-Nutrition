import { MessageCircle, Mail, MapPin, Send } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";

export default function ContactPage() {
  return (
    <div style={{ background: "var(--bg-primary)", paddingTop: "80px" }}>

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
            Support Center
          </span>
          <h1 className="font-bold tracking-tight mb-6 text-center" style={{ color: "var(--text-primary)" }}>
            Get in Touch.
          </h1>
          <p
            className="text-lg md:text-xl leading-relaxed text-center"
            style={{ color: "var(--text-secondary)", maxWidth: "560px" }}
          >
            Direct access to our athlete support team and scientific consultants.
          </p>
        </div>
      </section>

      {/* ── Contact methods ── */}
      <section className="py-20">
        <div
          className="w-full px-6 md:px-12"
          style={{ maxWidth: "1152px", marginLeft: "auto", marginRight: "auto" }}
        >
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {[
              { icon: MessageCircle, title: "Order via WhatsApp", value: "+91 98765 43210", href: WHATSAPP_URL, label: "Chat Now", color: "#25D366" },
              { icon: Mail, title: "Email Support", value: "support@lakshyanutrition.in", href: "mailto:support@lakshyanutrition.in", label: "Send Email", color: "var(--accent)" },
              { icon: MapPin, title: "Our Location", value: "Mumbai, Maharashtra, India", href: "#", label: "View Map", color: "var(--text-primary)" },
            ].map((method, i) => (
              <a
                key={i}
                href={method.href}
                className="luxury-card group p-8 rounded-2xl flex flex-col items-center text-center gap-5"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(127,232,90,0.08)", border: "1px solid rgba(127,232,90,0.15)" }}
                >
                  <method.icon size={26} strokeWidth={1.5} style={{ color: method.color }} />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1.5 text-center" style={{ color: "var(--text-primary)" }}>
                    {method.title}
                  </h3>
                  <p className="text-sm text-center" style={{ color: "var(--text-secondary)" }}>
                    {method.value}
                  </p>
                </div>
                <span
                  className="text-xs font-bold uppercase tracking-widest group-hover:text-[var(--accent)] transition-colors"
                  style={{ color: "var(--text-muted)" }}
                >
                  {method.label} →
                </span>
              </a>
            ))}
          </div>

          {/* ── Contact Form — Pattern B (left-aligned within centered container) ── */}
          <div
            className="w-full px-0"
            style={{ maxWidth: "640px", marginLeft: "auto", marginRight: "auto" }}
          >
            <div
              className="rounded-2xl p-8 md:p-12"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div className="mb-8">
                <h2 className="font-bold tracking-tight mb-2" style={{ color: "var(--text-primary)" }}>
                  Submit an Inquiry.
                </h2>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Response time: Under 12 hours.
                </p>
              </div>

              <form className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Arjun Sharma"
                      className="form-input"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                      Mobile No.
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="arjun@email.com"
                    className="form-input"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                    Message / Question
                  </label>
                  <textarea
                    rows={4}
                    placeholder="How can we help you crush your goals?"
                    className="form-input resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full py-4 font-bold rounded-xl flex items-center justify-center gap-3"
                >
                  Submit Message <Send size={16} strokeWidth={2} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
