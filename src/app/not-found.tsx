import Link from "next/link";
import { AlertCircle, ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center px-6 py-24"
      style={{ background: "var(--bg-primary)", minHeight: "100dvh" }}
    >
      {/* Icon */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-8"
        style={{ background: "rgba(127,232,90,0.08)", border: "2px solid rgba(127,232,90,0.3)" }}
      >
        <AlertCircle size={36} strokeWidth={1.5} style={{ color: "var(--accent)" }} />
      </div>

      {/* Content — Pattern A */}
      <div
        className="flex flex-col items-center text-center gap-5"
        style={{ maxWidth: "520px" }}
      >
        <span
          className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ background: "rgba(127,232,90,0.1)", border: "1px solid rgba(127,232,90,0.2)", color: "var(--accent)" }}
        >
          Error 404
        </span>

        <h1 className="font-bold tracking-tight text-center" style={{ color: "var(--text-primary)" }}>
          Lost Your Way?
        </h1>

        <p className="text-base leading-relaxed text-center" style={{ color: "var(--text-secondary)" }}>
          We couldn&apos;t find the page you&apos;re looking for. Maybe it was moved, or perhaps it&apos;s still being formulated.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Link href="/" className="btn btn-primary px-8 py-3.5 text-sm font-bold rounded-full flex items-center gap-2">
            <Home size={15} strokeWidth={2} /> Back to Home
          </Link>
          <Link href="/products" className="btn btn-outline px-8 py-3.5 text-sm font-bold rounded-full flex items-center gap-2">
            Explore Catalog <ArrowRight size={15} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  );
}
