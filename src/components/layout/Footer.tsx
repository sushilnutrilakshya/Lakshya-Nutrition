/**
 * Footer — Server Component.
 * No hooks, no browser APIs, no event handlers → zero client JS bundle cost.
 */
import Link from "next/link";
import { Instagram, Youtube, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { SITE_NAME, SITE_TAGLINE, WHATSAPP_URL } from "@/lib/constants";

const FOOTER_LINKS = {
  Products: [
    { label: "Whey Protein", href: "/products?category=protein" },
    { label: "Pre-Workout", href: "/products?category=pre-workout" },
    { label: "Creatine", href: "/products?category=performance" },
    { label: "Amino Acids", href: "/products?category=amino-acids" },
    { label: "Vitamins & Minerals", href: "/products?category=vitamins-minerals" },
    { label: "All Products", href: "/products" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
  Support: [
    { label: "FAQs", href: "#" },
    { label: "Track Order", href: "#" },
    { label: "Returns & Refunds", href: "#" },
    { label: "Contact Us", href: "/contact" },
    { label: "WhatsApp Us", href: WHATSAPP_URL },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/privacy" },
    { label: "Disclaimer", href: "/terms" },
  ],
};

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/lakshyanutrition", icon: Instagram },
  { label: "YouTube", href: "https://youtube.com/@lakshyanutrition", icon: Youtube },
  { label: "WhatsApp", href: WHATSAPP_URL, icon: MessageCircle },
];

const TRUST_ITEMS = ["FSSAI Certified", "Lab Tested", "No Proprietary Blends", "100% Authentic"];

export function Footer() {
  return (
    <footer id="main-footer" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border)" }}>

      {/* ── Main grid ── */}
      <div
        className="w-full px-6 md:px-12 py-16"
        style={{ maxWidth: "1152px", marginLeft: "auto", marginRight: "auto" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 items-start">

          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link href="/" className="inline-flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold flex-shrink-0"
                style={{ background: "var(--accent)", color: "#000" }}
              >
                LN
              </div>
              <span className="font-bold text-base" style={{ color: "var(--text-primary)" }}>
                {SITE_NAME}
              </span>
            </Link>

            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)", maxWidth: "260px" }}>
              {SITE_TAGLINE}. Premium sports nutrition engineered for peak performance and absolute trust.
            </p>

            <div className="flex gap-2.5">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    style={{ border: "1px solid var(--border-strong)", color: "var(--text-secondary)" }}
                  >
                    <Icon size={15} strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-2">
              {TRUST_ITEMS.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full text-[10px] font-semibold"
                  style={{ background: "rgba(127,232,90,0.1)", border: "1px solid rgba(127,232,90,0.2)", color: "var(--accent)" }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-4">
              <h3
                className="font-bold text-xs uppercase tracking-[0.18em]"
                style={{ color: "var(--text-primary)" }}
              >
                {category}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200 hover:text-[var(--accent)]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact bar */}
        <div
          className="mt-12 pt-8 grid sm:grid-cols-3 gap-5"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {[
            { icon: Phone, label: "+91 98765 43210", href: "tel:+919876543210" },
            { icon: Mail, label: "support@lakshyanutrition.in", href: "mailto:support@lakshyanutrition.in" },
            { icon: MapPin, label: "Mumbai, Maharashtra, India", href: "#" },
          ].map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-3 text-sm group"
              style={{ color: "var(--text-muted)" }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border)" }}
              >
                <Icon size={14} strokeWidth={1.5} style={{ color: "var(--accent)" }} />
              </div>
              <span className="group-hover:text-[var(--accent)] transition-colors duration-200 text-sm">
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: "1px solid var(--border)", background: "var(--bg-primary)" }}>
        <div
          className="w-full px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs"
          style={{ maxWidth: "1152px", marginLeft: "auto", marginRight: "auto", color: "var(--text-muted)" }}
        >
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-[var(--accent)] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[var(--accent)] transition-colors">Terms of Service</Link>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Made with</span>
            <span style={{ color: "var(--accent)" }}>♥</span>
            <span className="font-semibold">in India 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
